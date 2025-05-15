import uvicorn
import os
import sys

def check_dependencies():
    try:
        import fastapi
        import sentence_transformers
        import numpy
        return True
    except ImportError as e:
        print(f"Error: Missing dependency - {e.name}")
        print("Please install required dependencies using:")
        print("pip install -r requirements.txt")
        return False

def main():
    # Check if database exists
    if not os.path.exists('chatbot_knowledge_base.db'):
        print("Database not found. Running initialize_database.py first...")
        try:
            import initialize_database
            initialize_database.main()
            print("Database initialization complete.")
        except Exception as e:
            print(f"Error initializing database: {e}")
            return
    
    # Start the API server
    print("Starting ISMBuddy API server...")
    print("API will be available at http://localhost:8000")
    print("Press Ctrl+C to stop the server")
    
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    if check_dependencies():
        main()