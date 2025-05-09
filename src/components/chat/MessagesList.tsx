
import React, { useRef, useEffect } from 'react';
import ChatMessage from '../ChatMessage';
import MultilingualTypingIndicator from '../MultilingualTypingIndicator';
import { Message } from '@/types/chat';
import { Translations } from '@/utils/languageUtils';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  }, [messages, isTyping]);

  return (
    <ScrollArea className="flex-1 px-4 py-2 chat-background-pattern">
      <div className="space-y-2 pb-2">
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
            <div className="bot-avatar rounded-full p-2 flex items-center justify-center shadow-md">
              <div className="text-xs font-bold text-white">IIT</div>
            </div>
            <div className="message-bubble message-bubble-bot">
              <MultilingualTypingIndicator translations={translations} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessagesList;
