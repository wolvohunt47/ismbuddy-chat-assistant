
import React from 'react';
import { CircleDot } from 'lucide-react';
import { Translations } from '@/utils/languageUtils';

interface MultilingualTypingIndicatorProps {
  translations: Translations;
}

const MultilingualTypingIndicator: React.FC<MultilingualTypingIndicatorProps> = ({ translations }) => {
  return (
    <div className="flex items-center">
      <div className="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span className="ml-2 text-sm text-gray-500">{translations.typingIndicator}</span>
    </div>
  );
};

export default MultilingualTypingIndicator;
