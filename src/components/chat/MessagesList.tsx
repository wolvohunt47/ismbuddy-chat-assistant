
import React, { useRef, useEffect } from 'react';
import ChatMessage from '../ChatMessage';
import MultilingualTypingIndicator from '../MultilingualTypingIndicator';
import { Message } from '@/types/chat';
import { Translations } from '@/utils/languageUtils';

interface MessagesListProps {
  messages: Message[];
  isTyping: boolean;
  translations: Translations;
}

const MessagesList: React.FC<MessagesListProps> = ({ messages, isTyping, translations }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 chat-background-pattern chat-scrollbar">
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          type={msg.type}
          message={msg.text}
          timestamp={msg.timestamp}
        />
      ))}
      {isTyping && (
        <div className="flex items-start gap-3 animate-fade-in">
          <div className="rounded-full p-2 flex items-center justify-center bg-ism-blue text-white">
            <div className="text-xs font-bold">IIT</div>
          </div>
          <div className="bg-gray-100 text-ism-dark rounded-lg p-3">
            <MultilingualTypingIndicator translations={translations} />
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesList;
