
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizontal } from 'lucide-react';
import { Translations } from '@/utils/languageUtils';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  translations: Translations;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false, translations }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim() !== '') {
      onSend(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-container flex gap-2 p-4 border-t rounded-b-lg">
      <Input
        placeholder={translations.inputPlaceholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex-grow bg-white/70 backdrop-blur-sm border-gray-200 focus:border-ism-blue"
      />
      <Button 
        onClick={handleSend} 
        disabled={disabled || inputValue.trim() === ''}
        variant="default"
        className="bg-ism-maroon hover:bg-ism-maroon/90 shadow-md transition-all duration-300"
      >
        <SendHorizontal size={18} />
      </Button>
    </div>
  );
};

export default ChatInput;
