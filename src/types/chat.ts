
import { MessageType } from '@/components/ChatMessage';
import { Language } from '@/utils/languageUtils';

export interface Message {
  id: string;
  type: MessageType;
  text: string;
  timestamp: Date;
}

export interface ChatWindowProps {
  minimized: boolean;
  onMinimize: () => void;
  onClose: () => void;
}
