import React from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StockChatSidebarProps {
  isOpen: boolean;
  ticker: string;
  panelPositionClass: string;
  onToggle: () => void;
}

export const StockChatSidebar: React.FC<StockChatSidebarProps> = ({
  isOpen,
  ticker,
  panelPositionClass,
  onToggle,
}) => {
  return (
    <>
      <Button
        onClick={onToggle}
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 rounded-full w-12 h-12 sm:w-14 sm:h-14 shadow-lg bg-[var(--accent)] text-black border border-[var(--accent)] hover:bg-[var(--accent-light)]"
        size="icon"
      >
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </Button>

      <div
        className={`fixed right-0 w-[min(100vw,400px)] lg:w-[min(1000px,82vw)] bg-[var(--card-bg)] border-l border-[var(--card-border)] shadow-xl transition-transform duration-300 ease-in-out z-40 ${panelPositionClass} ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-[var(--card-border)]">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">Ask AI About {ticker}</h3>
          </div>
          <div className="flex-1 p-4 flex items-center justify-center">
            <p className="text-[var(--muted-text)]">AI Chatbot - Coming Soon</p>
          </div>
        </div>
      </div>
    </>
  );
};
