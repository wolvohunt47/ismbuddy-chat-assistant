
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
    <div className="flex gap-2 p-3 border-t bg-white">
      <Input
        placeholder={translations.inputPlaceholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex-grow"
      />
      <Button 
        onClick={handleSend} 
        disabled={disabled || inputValue.trim() === ''}
        variant="default"
        className="bg-ism-maroon hover:bg-ism-maroon/90"
      >
        <SendHorizontal size={18} />
      </Button>
    </div>
  );
};

export default ChatInput;
