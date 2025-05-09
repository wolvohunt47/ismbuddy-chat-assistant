
import React from 'react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

export type MessageType = 'user' | 'bot';

interface ChatMessageProps {
  type: MessageType;
  message: string;
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ type, message, timestamp }) => {
  const isBot = type === 'bot';
  const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div 
      className={cn(
        "flex items-start gap-3 message-pop py-3",
        isBot ? "justify-start" : "flex-row-reverse"
      )}
    >
      <div 
        className={cn(
          "rounded-full p-2 flex items-center justify-center shadow-md",
          isBot ? "bot-avatar" : "user-avatar"
        )}
      >
        {isBot ? (
          <div className="text-xs font-bold text-white">IIT</div>
        ) : (
          <User size={16} className="text-ism-dark" />
        )}
      </div>
      <div 
        className={cn(
          "message-bubble max-w-[80%]",
          isBot ? "message-bubble-bot" : "message-bubble-user"
        )}
      >
        <div className="whitespace-pre-wrap">{message}</div>
        <div className={cn(
          "text-xs mt-2",
          isBot ? "text-gray-500" : "text-gray-300"
        )}>
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
