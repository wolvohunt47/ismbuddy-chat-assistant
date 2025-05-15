
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
  
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chatMessages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return [
      {
        id: '1',
        type: 'bot',
        text: translations.welcomeMessage,
        timestamp: new Date(),
      },
    ];
  });
  const [isTyping, setIsTyping] = useState(false);

  // Update initial message when language changes
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);
  useEffect(() => {
    setMessages([
      {
        id: '1',
        type: 'bot',
        text: translations.welcomeMessage,
        timestamp: new Date(),
      },
    ]);
    localStorage.removeItem('chatMessages');
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

  const handleFileUpload = (file: File) => {
    const newFileMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: `Sent a file: ${file.name}`,
      timestamp: new Date(),
      fileUrl: URL.createObjectURL(file),
      fileName: file.name,
      fileType: file.type,
    } as any;
    setMessages((prev) => [...prev, newFileMessage]);
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
        onFileUpload={handleFileUpload}
      />
    </Card>
  );
};

export default ChatWindow;
