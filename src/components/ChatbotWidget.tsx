
import React, { useState } from 'react';
import ChatWindow from './chat/ChatWindow';
import ChatButton from './ChatButton';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col items-end gap-4">
        {isOpen && (
          <div 
            className={`w-[350px] sm:w-[380px] h-[500px] transition-all duration-300 ease-in-out ${
              isMinimized ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
            }`}
          >
            <ChatWindow 
              minimized={isMinimized} 
              onMinimize={handleMinimize} 
              onClose={handleClose} 
            />
          </div>
        )}
        {(!isOpen || isMinimized) && <ChatButton onClick={handleOpen} />}
      </div>
    </div>
  );
};

export default ChatbotWidget;
