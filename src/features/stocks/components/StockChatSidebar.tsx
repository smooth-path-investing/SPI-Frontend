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
        className="fixed bottom-5 right-5 z-50 h-12 w-12 rounded-full border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] text-[var(--foreground)] shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl hover:border-[var(--accent)]/60 hover:bg-[var(--accent)] hover:text-black sm:bottom-8 sm:right-8 sm:h-14 sm:w-14"
        size="icon"
      >
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </Button>

      <div
        className={`fixed right-0 z-40 w-[min(100vw,400px)] border-l border-white/12 bg-[linear-gradient(180deg,rgba(17,24,39,0.98),rgba(8,11,18,0.96))] shadow-[0_26px_52px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-transform duration-300 ease-in-out lg:w-[min(1000px,82vw)] ${panelPositionClass} ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="border-b border-white/10 p-4">
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
