
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import ISMBuddyLogo from './ISMBuddyLogo';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center gap-2 cursor-pointer animate-fade-in"
    >
      <Button 
        className="h-14 w-14 rounded-full shadow-lg bg-ism-blue hover:bg-ism-blue/90 transition-all duration-300 hover:scale-105"
      >
        <MessageCircle size={24} />
      </Button>
      <div className="bg-white p-1 px-3 rounded-full shadow-md">
        <ISMBuddyLogo size="sm" />
      </div>
    </div>
  );
};

export default ChatButton;
