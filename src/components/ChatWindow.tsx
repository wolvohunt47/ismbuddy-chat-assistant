
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MinimizeIcon, MaximizeIcon, X, Bot } from 'lucide-react';
import ISMBuddyLogo from './ISMBuddyLogo';
import ChatMessage, { MessageType } from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';

interface Message {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
}

interface ChatWindowProps {
  minimized: boolean;
  onMinimize: () => void;
  onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ minimized, onMinimize, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Hello! I am ISMBUDDY, your virtual assistant for IIT ISM Dhanbad. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    simulateBotResponse(text);
  };

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      let botResponse = '';
      
      // Simple response logic based on keywords
      if (userMessage.toLowerCase().includes('admission')) {
        botResponse = 'For admission inquiries, please visit the Admissions section on our website or contact the Admissions Office at admissions@iitism.ac.in';
      } else if (userMessage.toLowerCase().includes('course') || userMessage.toLowerCase().includes('program')) {
        botResponse = 'IIT ISM Dhanbad offers various undergraduate, postgraduate, and doctoral programs across multiple disciplines. You can find detailed information on our Academics page.';
      } else if (userMessage.toLowerCase().includes('faculty') || userMessage.toLowerCase().includes('professor')) {
        botResponse = 'Our institute has distinguished faculty members across various departments. You can find their profiles on the respective department pages.';
      } else if (userMessage.toLowerCase().includes('hostel') || userMessage.toLowerCase().includes('accommodation')) {
        botResponse = 'IIT ISM Dhanbad provides hostel facilities for students. For specific queries about accommodation, please contact the Hostel Administration Office.';
      } else {
        botResponse = 'Thank you for your message. As a demo chatbot, I have limited responses. When connected to the database and LLM, I will be able to provide more accurate and helpful information about IIT ISM Dhanbad.';
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

  if (minimized) {
    return null;
  }

  return (
    <Card className="flex flex-col w-full h-full max-w-sm rounded-lg shadow-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-ism-maroon text-white border-b">
        <div className="flex items-center gap-2">
          <ISMBuddyLogo size="sm" />
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onMinimize}
                  className="h-8 w-8 rounded-full hover:bg-white/10 text-white"
                >
                  <MinimizeIcon size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Minimize</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onClose}
                  className="h-8 w-8 rounded-full hover:bg-white/10 text-white"
                >
                  <X size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Close</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 chat-scrollbar">
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
            <div className="rounded-full p-2 flex items-center justify-center bg-ism-maroon text-white">
              <Bot size={16} />
            </div>
            <div className="bg-gray-100 text-ism-dark rounded-lg p-3">
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={handleSendMessage} disabled={isTyping} />
    </Card>
  );
};

export default ChatWindow;
