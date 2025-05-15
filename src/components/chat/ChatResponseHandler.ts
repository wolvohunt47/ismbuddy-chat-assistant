
import { Message } from '@/types/chat';
import { Translations } from '@/utils/languageUtils';
import { enhanceResponseWithVectorSearch } from '@/utils/llmUtils';

export const simulateBotResponse = (
  userMessage: string,
  translations: Translations,
  setIsTyping: (typing: boolean) => void,
  setMessages: (messagesFn: (prev: Message[]) => Message[]) => void
) => {
  setIsTyping(true);
  
  // First try to get an enhanced response using vector search
  enhanceResponseWithVectorSearch(userMessage)
    .then(enhancedResponse => {
      // If we got a valid response from the vector search
      if (enhancedResponse && enhancedResponse !== "I don't have specific information about that in my database.") {
        const newBotMessage: Message = {
          id: Date.now().toString(),
          type: 'bot',
          text: enhancedResponse,
          timestamp: new Date(),
        };
        
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, newBotMessage]);
        }, 1500);
      } else {
        // Fall back to keyword-based responses if vector search didn't find anything relevant
        setTimeout(() => {
          setIsTyping(false);
          
          let botResponse = '';
          
          // Simple response logic based on keywords
          if (userMessage.toLowerCase().includes('admission')) {
            botResponse = translations.admissionResponse;
          } else if (userMessage.toLowerCase().includes('course') || userMessage.toLowerCase().includes('program')) {
            botResponse = translations.courseResponse;
          } else if (userMessage.toLowerCase().includes('faculty') || userMessage.toLowerCase().includes('professor')) {
            botResponse = translations.facultyResponse;
          } else if (userMessage.toLowerCase().includes('hostel') || userMessage.toLowerCase().includes('accommodation')) {
            botResponse = translations.hostelResponse;
          } else {
            botResponse = translations.defaultResponse;
          }
      
          const newBotMessage: Message = {
            id: Date.now().toString(),
            type: 'bot',
            text: botResponse,
            timestamp: new Date(),
          };
      
          setMessages((prev) => [...prev, newBotMessage]);
        }, 1500);
      }
    })
    .catch(error => {
      console.error('Error with vector search:', error);
      
      // Fall back to default response on error
      setTimeout(() => {
        setIsTyping(false);
        
        const newBotMessage: Message = {
          id: Date.now().toString(),
          type: 'bot',
          text: translations.errorResponse || translations.defaultResponse,
          timestamp: new Date(),
        };
        
        setMessages((prev) => [...prev, newBotMessage]);
      }, 1500);
    });

};
