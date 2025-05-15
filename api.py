import sqlite3
import os
import json
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from sentence_transformers import SentenceTransformer
import numpy as np
from initialize_database import EMBEDDING_MODEL, DATABASE_NAME, search_similar_sections

app = FastAPI(title="ISMBuddy Chat API", description="API for ISMBuddy Chat Assistant with LLM integration")

# Add CORS middleware to allow frontend to access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get database path
project_root = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(project_root, DATABASE_NAME)

# Models for request/response
class QueryRequest(BaseModel):
    query: str
    top_k: Optional[int] = 5

class SearchResult(BaseModel):
    section_id: int
    heading: str
    content: str
    doc_title: str
    similarity: float

class QueryResponse(BaseModel):
    results: List[SearchResult]
    query: str

@app.get("/")
async def root():
    return {"message": "Welcome to ISMBuddy Chat API"}

@app.post("/search", response_model=QueryResponse)
async def search(request: QueryRequest):
    try:
        conn = sqlite3.connect(db_path)
        results = search_similar_sections(conn, request.query, request.top_k)
        conn.close()
        
        return QueryResponse(
            results=results,
            query=request.query
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/documents", response_model=List[Dict[str, Any]])
async def get_documents():
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT id, doc_id, title FROM documents")
        documents = [{
            "id": row[0],
            "doc_id": row[1],
            "title": row[2]
        } for row in cursor.fetchall()]
        conn.close()
        
        return documents
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/sections/{document_id}", response_model=List[Dict[str, Any]])
async def get_sections(document_id: int):
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, heading, content_snippet, parent_section_id 
            FROM sections 
            WHERE document_id = ?
        """, (document_id,))
        
        sections = [{
            "id": row[0],
            "heading": row[1],
            "content": row[2],
            "parent_section_id": row[3]
        } for row in cursor.fetchall()]
        conn.close()
        
        return sections
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)