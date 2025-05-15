# LLM-Enhanced Database for ISMBuddy Chat Assistant

This document provides information about the LLM-enhanced database integration for the ISMBuddy Chat Assistant.

## Overview

The database has been enhanced with vector embedding capabilities to enable semantic search functionality. This allows the chatbot to find relevant information based on the meaning of user queries rather than just keyword matching.

## Features

- **Vector Embeddings**: Document sections are converted to vector embeddings using the `all-MiniLM-L6-v2` model from Sentence Transformers.
- **Semantic Search**: User queries are matched against document sections based on semantic similarity.
- **Multilingual Support**: The chatbot interface supports multiple languages (English, Hindi, French, Spanish).

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Initialize the Database

```bash
python initialize_database.py
```

This script will:
- Create the necessary database tables
- Import document data from JSON files in the `src/data` directory
- Generate vector embeddings for all document sections

### 3. Start the API Server

```bash
python run_api_server.py
```

This will start a FastAPI server on http://localhost:8000 that provides endpoints for vector search.

### 4. Run the Frontend

```bash
npm run dev
```

## API Endpoints

- `GET /`: Welcome message
- `POST /search`: Search for relevant sections based on a query
- `GET /documents`: List all documents in the database
- `GET /sections/{document_id}`: Get sections for a specific document

## How It Works

1. When a user sends a message to the chatbot, the frontend calls the vector search API.
2. The API converts the user's query into a vector embedding.
3. The embedding is compared to all section embeddings in the database using cosine similarity.
4. The most relevant sections are returned to the frontend.
5. The frontend formats the results and displays them to the user.

## Files

- `initialize_database.py`: Sets up the database and generates embeddings
- `api.py`: FastAPI server for vector search
- `run_api_server.py`: Helper script to run the API server
- `src/utils/llmUtils.ts`: Frontend utilities for interacting with the API
- `src/components/chat/ChatResponseHandler.ts`: Integrates vector search with the chat interface

## Customization

To add more documents to the database:

1. Add JSON files to the `src/data` directory following the existing format
2. Run `python initialize_database.py` to process the new files and generate embeddings

## Troubleshooting

- If you encounter errors related to missing dependencies, ensure you've installed all requirements with `pip install -r requirements.txt`
- If the API server fails to start, check that the database file exists and is properly initialized
- If vector search returns no results, try rephrasing your query or adding more content to the database