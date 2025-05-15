
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizontal } from 'lucide-react';
import { Translations } from '@/utils/languageUtils';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  translations: Translations;
  onFileUpload?: (file: File) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled = false, translations, onFileUpload }) => {
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      if (onFileUpload) {
        onFileUpload(e.target.files[0]);
      }
    }
  };

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
      <input
        type="file"
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
        id="chat-file-upload"
      />
      <label htmlFor="chat-file-upload" className="cursor-pointer flex items-center px-2">
        <span role="img" aria-label="Attach file">📎</span>
      </label>
      <Button
        type="button"
        onClick={handleSend}
        disabled={disabled || inputValue.trim() === ''}
        size="icon"
        className="rounded-full"
        aria-label={translations.sendButtonLabel}
      >
        <SendHorizontal className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default ChatInput;
