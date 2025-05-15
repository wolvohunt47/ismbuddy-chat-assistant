import sqlite3
import json
import os
import numpy as np
from sentence_transformers import SentenceTransformer
import time

DATABASE_NAME = 'chatbot_knowledge_base.db'
# Assuming the script is in the project root, and 'src/data' is a subdirectory
DATA_DIR_RELATIVE_TO_SCRIPT = os.path.join('src', 'data')
# Model for generating embeddings
EMBEDDING_MODEL = 'all-MiniLM-L6-v2'

def create_tables(conn):
    cursor = conn.cursor()
    # Create documents table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            doc_id TEXT UNIQUE NOT NULL,
            title TEXT
        )
    ''')
    # Create sections table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS sections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            document_id INTEGER,
            heading TEXT,
            content_snippet TEXT, -- Can be NULL, e.g., for parent sections that only group subsections
            parent_section_id INTEGER, -- NULL for top-level sections
            FOREIGN KEY (document_id) REFERENCES documents (id) ON DELETE CASCADE,
            FOREIGN KEY (parent_section_id) REFERENCES sections (id) ON DELETE CASCADE
        )
    ''')
    
    # Create embeddings table for vector search
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS embeddings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            section_id INTEGER NOT NULL,
            embedding BLOB NOT NULL, -- Store embedding as binary blob
            embedding_model TEXT NOT NULL, -- Store model name used for embedding
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (section_id) REFERENCES sections (id) ON DELETE CASCADE
        )
    ''')
    
    # Create index on section_id for faster lookups
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_embeddings_section_id ON embeddings(section_id)')
    
    conn.commit()

def populate_data_from_json(conn, file_path):
    cursor = conn.cursor()
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        doc_id_json = data.get('doc_id')
        doc_title_json = data.get('title')

        if not doc_id_json:
            print(f"Skipping {file_path} due to missing 'doc_id'.")
            return

        # Insert or get document_id
        cursor.execute("SELECT id FROM documents WHERE doc_id = ?", (doc_id_json,))
        row = cursor.fetchone()
        if row:
            document_pk = row[0]
        else:
            cursor.execute("INSERT INTO documents (doc_id, title) VALUES (?, ?)", (doc_id_json, doc_title_json))
            document_pk = cursor.lastrowid

        # Insert sections
        for section_data in data.get('sections', []):
            heading = section_data.get('heading')
            content = section_data.get('content_snippet') # This can be None

            # Insert the main section (which might just be a container for subsections)
            cursor.execute('''
                INSERT INTO sections (document_id, heading, content_snippet, parent_section_id)
                VALUES (?, ?, ?, NULL)
            ''', (document_pk, heading, content))
            parent_section_pk = cursor.lastrowid # Get the ID of the section just inserted

            # Handle subsections if they exist (expected as an array of strings/headings)
            if 'subsections' in section_data and isinstance(section_data['subsections'], list):
                for subsection_heading_or_obj in section_data['subsections']:
                    subsection_heading = None
                    subsection_content = None # Initialize subsection content
                    # The faculty_handbook.json has subsections as strings (headings)
                    # Other files might have them as objects if structure changes.
                    if isinstance(subsection_heading_or_obj, str):
                        subsection_heading = subsection_heading_or_obj
                        # For string subsections, content remains NULL as per current data structure
                    elif isinstance(subsection_heading_or_obj, dict):
                        subsection_heading = subsection_heading_or_obj.get('heading')
                        subsection_content = subsection_heading_or_obj.get('content_snippet') # Attempt to get content
                    
                    if subsection_heading:
                        # Insert subsection, now with potential content
                        cursor.execute('''
                            INSERT INTO sections (document_id, heading, content_snippet, parent_section_id)
                            VALUES (?, ?, ?, ?)
                        ''', (document_pk, subsection_heading, subsection_content, parent_section_pk))
        
        conn.commit()
        print(f"Successfully processed {file_path}")

    except json.JSONDecodeError:
        print(f"Error decoding JSON from {file_path}")
    except sqlite3.Error as e:
        print(f"SQLite error while processing {file_path}: {e}")
        conn.rollback() # Rollback changes for this file on error
    except Exception as e:
        print(f"An unexpected error occurred while processing {file_path}: {e}")
        conn.rollback()

def generate_embeddings(conn):
    """Generate embeddings for all sections with content"""
    cursor = conn.cursor()
    
    # Load the embedding model
    try:
        print(f"Loading embedding model {EMBEDDING_MODEL}...")
        model = SentenceTransformer(EMBEDDING_MODEL)
        print("Model loaded successfully.")
    except Exception as e:
        print(f"Error loading embedding model: {e}")
        return
    
    # Get sections that need embeddings
    cursor.execute('''
        SELECT s.id, s.heading, s.content_snippet, d.title 
        FROM sections s
        JOIN documents d ON s.document_id = d.id
        WHERE s.content_snippet IS NOT NULL
        AND NOT EXISTS (SELECT 1 FROM embeddings e WHERE e.section_id = s.id AND e.embedding_model = ?)
    ''', (EMBEDDING_MODEL,))
    
    sections = cursor.fetchall()
    total_sections = len(sections)
    print(f"Generating embeddings for {total_sections} sections...")
    
    start_time = time.time()
    for i, (section_id, heading, content, doc_title) in enumerate(sections):
        try:
            # Combine heading, content and document title for better context
            text_to_embed = f"{doc_title} - {heading}: {content}"
            
            # Generate embedding
            embedding = model.encode(text_to_embed)
            
            # Store embedding as binary blob
            embedding_blob = embedding.tobytes()
            
            # Insert into embeddings table
            cursor.execute('''
                INSERT INTO embeddings (section_id, embedding, embedding_model)
                VALUES (?, ?, ?)
            ''', (section_id, embedding_blob, EMBEDDING_MODEL))
            
            # Commit every 10 embeddings to avoid large transactions
            if i % 10 == 0:
                conn.commit()
                print(f"Progress: {i+1}/{total_sections} sections processed ({((i+1)/total_sections)*100:.1f}%)")
                
        except Exception as e:
            print(f"Error generating embedding for section {section_id}: {e}")
    
    # Final commit
    conn.commit()
    elapsed_time = time.time() - start_time
    print(f"Embedding generation complete. Processed {total_sections} sections in {elapsed_time:.2f} seconds.")

def search_similar_sections(conn, query, top_k=5):
    """Search for sections similar to the query using vector similarity"""
    cursor = conn.cursor()
    
    try:
        # Load the embedding model
        model = SentenceTransformer(EMBEDDING_MODEL)
        
        # Generate embedding for the query
        query_embedding = model.encode(query)
        
        # Get all embeddings from the database
        cursor.execute('''
            SELECT e.id, e.section_id, e.embedding, s.heading, s.content_snippet, d.title
            FROM embeddings e
            JOIN sections s ON e.section_id = s.id
            JOIN documents d ON s.document_id = d.id
            WHERE e.embedding_model = ?
        ''', (EMBEDDING_MODEL,))
        
        results = []
        for row in cursor.fetchall():
            embedding_id, section_id, embedding_blob, heading, content, doc_title = row
            
            # Convert blob back to numpy array
            db_embedding = np.frombuffer(embedding_blob, dtype=np.float32)
            
            # Calculate cosine similarity
            similarity = np.dot(query_embedding, db_embedding) / (
                np.linalg.norm(query_embedding) * np.linalg.norm(db_embedding)
            )
            
            results.append({
                'section_id': section_id,
                'heading': heading,
                'content': content,
                'doc_title': doc_title,
                'similarity': float(similarity)
            })
        
        # Sort by similarity (highest first) and return top_k results
        results.sort(key=lambda x: x['similarity'], reverse=True)
        return results[:top_k]
        
    except Exception as e:
        print(f"Error searching similar sections: {e}")
        return []

def main():
    # The script is assumed to be in the project root directory
    project_root = os.path.dirname(os.path.abspath(__file__))
    
    db_path = os.path.join(project_root, DATABASE_NAME)
    data_folder_abs_path = os.path.join(project_root, DATA_DIR_RELATIVE_TO_SCRIPT)

    conn = None
    try:
        conn = sqlite3.connect(db_path)
        print(f"Database connection established to '{db_path}'.") 
        create_tables(conn)
        print("Tables created or already exist.")

        json_files_to_process = [
            "examination_rules.json",
            "faculty_handbook.json",
            "hostel_rules.json",
            "international_hostel_rules.json"
        ]

        if not os.path.isdir(data_folder_abs_path):
            print(f"Error: Data directory not found at {data_folder_abs_path}")
            return

        for file_name in json_files_to_process:
            full_file_path = os.path.join(data_folder_abs_path, file_name)
            if os.path.exists(full_file_path):
                print(f"Processing {full_file_path}...")
                populate_data_from_json(conn, full_file_path)
            else:
                print(f"File not found: {full_file_path}. Skipping.")
        
        # Generate embeddings for all sections
        generate_embeddings(conn)
        
        # Example search (uncomment to test)
        # results = search_similar_sections(conn, "What are the examination rules?", top_k=3)
        # for i, result in enumerate(results):
        #     print(f"Result {i+1}: {result['doc_title']} - {result['heading']}")
        #     print(f"Similarity: {result['similarity']:.4f}")
        #     print(f"Content: {result['content']}\n")
            
        print(f"Database '{DATABASE_NAME}' setup complete.")

    except sqlite3.Error as e:
        print(f"A SQLite error occurred: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    finally:
        if conn:
            conn.close()
            print("Database connection closed.")

if __name__ == '__main__':
    main()