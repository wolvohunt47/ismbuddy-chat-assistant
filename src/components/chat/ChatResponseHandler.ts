
import { Message } from '@/types/chat';
import { Translations } from '@/utils/languageUtils';

export const simulateBotResponse = (
  userMessage: string,
  translations: Translations,
  setIsTyping: (typing: boolean) => void,
  setMessages: (messagesFn: (prev: Message[]) => Message[]) => void
) => {
  setIsTyping(true);
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
};
