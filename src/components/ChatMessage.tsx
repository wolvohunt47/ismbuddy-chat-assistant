
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
        "flex items-start gap-3 animate-fade-in py-2",
        isBot ? "justify-start" : "flex-row-reverse"
      )}
    >
      <div 
        className={cn(
          "rounded-full p-2 flex items-center justify-center",
          isBot ? "bg-ism-blue text-white" : "bg-ism-gold text-ism-dark"
        )}
      >
        {isBot ? (
          <div className="text-xs font-bold">IIT</div>
        ) : (
          <User size={16} />
        )}
      </div>
      <div 
        className={cn(
          "rounded-lg p-3 max-w-[80%]",
          isBot ? "bg-gray-100 text-ism-dark" : "bg-ism-maroon text-white"
        )}
      >
        <div>{message}</div>
        <div className={cn(
          "text-xs mt-1",
          isBot ? "text-gray-500" : "text-gray-300"
        )}>
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
