
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import ChatInput from '../ChatInput';
import MessagesList from './MessagesList';
import ChatHeader from './ChatHeader';
import { simulateBotResponse } from './ChatResponseHandler';
import { 
  Language, 
  getInitialLanguage, 
  saveLanguagePreference, 
  getTranslations 
} from '@/utils/languageUtils';
import { ChatWindowProps, Message } from '@/types/chat';

const ChatWindow: React.FC<ChatWindowProps> = ({ minimized, onMinimize, onClose }) => {
  // Language state
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const translations = getTranslations(language);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: translations.welcomeMessage,
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Update initial message when language changes
  useEffect(() => {
    setMessages([
      {
        id: '1',
        type: 'bot',
        text: translations.welcomeMessage,
        timestamp: new Date(),
      },
    ]);
  }, [language]);

  const handleSendMessage = (text: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    simulateBotResponse(text, translations, setIsTyping, setMessages);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    saveLanguagePreference(newLanguage);
  };

  if (minimized) {
    return null;
  }

  const availableLanguages: Language[] = ['en', 'hi', 'fr', 'es'];

  return (
    <Card className="flex flex-col w-full h-full max-w-sm rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <ChatHeader 
        onMinimize={onMinimize} 
        onClose={onClose}
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
        availableLanguages={availableLanguages}
      />

      <MessagesList 
        messages={messages}
        isTyping={isTyping}
        translations={translations}
      />

      <ChatInput 
        onSend={handleSendMessage}
        disabled={isTyping}
        translations={translations}
      />
    </Card>
  );
};

export default ChatWindow;
