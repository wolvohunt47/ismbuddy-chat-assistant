import axios from 'axios';

interface SearchResult {
  section_id: number;
  heading: string;
  content: string;
  doc_title: string;
  similarity: number;
}

interface QueryResponse {
  results: SearchResult[];
  query: string;
}

// API endpoint for vector search
const API_URL = 'https://chat-bot-iit-ism-backend.vercel.app';

/**
 * Search for relevant information using vector similarity
 * @param query The user's query
 * @param topK Number of results to return (default: 5)
 * @returns Promise with search results
 */
export const searchVectorDatabase = async (query: string, topK: number = 5): Promise<SearchResult[]> => {
  try {
    const response = await axios.post<QueryResponse>(`${API_URL}/search`, {
      query,
      top_k: topK
    });
    
    return response.data.results;
  } catch (error) {
    console.error('Error searching vector database:', error);
    return [];
  }
};

/**
 * Format search results into a readable response
 * @param results The search results from the vector database
 * @returns Formatted string with the most relevant information
 */
export const formatSearchResults = (results: SearchResult[]): string => {
  if (!results || results.length === 0) {
    return "I couldn't find any relevant information about that.";
  }

  // Use the top result as the main response
  const topResult = results[0];
  let response = `${topResult.content}`;

  // Add additional context from other results if they're relevant enough
  if (results.length > 1 && results[1].similarity > 0.7) {
    response += `\n\nAdditionally: ${results[1].content}`;
  }

  // Add source information
  response += `\n\nSource: ${topResult.doc_title} - ${topResult.heading}`;

  return response;
};

/**
 * Enhance a chatbot response with relevant information from the vector database
 * @param userQuery The user's original query
 * @param llmResponse The initial response from the LLM
 * @returns Enhanced response with relevant information from the database
 */
export const enhanceResponseWithVectorSearch = async (userQuery: string): Promise<string> => {
  try {
    // Search for relevant information
    const searchResults = await searchVectorDatabase(userQuery);
    
    if (searchResults.length === 0) {
      return "I don't have specific information about that in my database.";
    }
    
    // Format the search results into a response
    return formatSearchResults(searchResults);
  } catch (error) {
    console.error('Error enhancing response:', error);
    return "I'm having trouble retrieving information from my database right now.";
  }
};