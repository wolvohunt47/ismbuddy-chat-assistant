
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
        className="floating-button-effect h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-ism-maroon to-ism-maroon/90 hover:bg-ism-maroon/90"
      >
        <MessageCircle size={24} className="text-white" />
      </Button>
      <div className="bg-white/90 backdrop-blur-sm p-1 px-3 rounded-full shadow-md border border-gray-100">
        <ISMBuddyLogo size="sm" />
      </div>
    </div>
  );
};

export default ChatButton;
