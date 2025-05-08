
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MinimizeIcon, X } from 'lucide-react';
import ISMBuddyLogo from '../ISMBuddyLogo';
import LanguageSelector from '../LanguageSelector';
import { Language } from '@/utils/languageUtils';

interface ChatHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  availableLanguages: Language[];
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  onMinimize,
  onClose,
  currentLanguage,
  onLanguageChange,
  availableLanguages
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-ism-maroon text-white border-b">
      <div className="flex items-center gap-2">
        <ISMBuddyLogo size="sm" />
      </div>
      <div className="flex items-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <LanguageSelector 
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
                languages={availableLanguages}
              />
            </TooltipTrigger>
            <TooltipContent>Change Language</TooltipContent>
          </Tooltip>
        </TooltipProvider>

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
  );
};

export default ChatHeader;
