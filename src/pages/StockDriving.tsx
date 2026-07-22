import { useState } from 'react';
import Chat from '@/components/stockDriving/Chat';
import StockMechanicPanel from '@/components/stockDriving/StockMechanicPanel';
import FactorCorrelationPanel from '@/components/stockDriving/FactorCorrelationPanel';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const TABS = [
  { id: 'chat', label: 'Chat', sub: 'Ask RAS' },
  { id: 'stockmechanic', label: 'Stock Mechanic', sub: 'Portfolio & Stock Data' },
  { id: 'factorcorrelation', label: 'Factor Correlation', sub: 'Macro & Market Factors' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export const StockDriving: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-56 shrink-0 flex-col gap-1 border-r border-white/10 px-3 py-6 sm:flex">
          <p className="mb-3 px-2 text-xs uppercase tracking-[0.12em] text-[var(--muted-text)]">
            RAS System
          </p>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-3 py-2 text-left transition-colors ${
                activeTab === tab.id
                  ? 'bg-[var(--accent)]/12 text-[var(--foreground)]'
                  : 'text-[var(--muted-text)] hover:bg-white/[0.04] hover:text-[var(--foreground)]'
              }`}
            >
              <span className="block text-sm font-medium">{tab.label}</span>
              <span className="block text-xs text-[var(--muted-text)]/70">{tab.sub}</span>
            </button>
          ))}

          {activeTab === 'chat' && messages.length > 0 && (
            <button
              onClick={() => setMessages([])}
              className="mt-auto rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-[var(--muted-text)] hover:text-[var(--foreground)]"
            >
              Clear Chat
            </button>
          )}
        </aside>

        {/* Mobile tab bar */}
        <div className="fixed inset-x-0 top-16 z-10 flex gap-1 overflow-x-auto border-b border-white/10 bg-[var(--background)] px-3 py-2 sm:hidden">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
                activeTab === tab.id
                  ? 'bg-[var(--accent)]/15 text-[var(--accent)]'
                  : 'text-[var(--muted-text)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <main className="flex-1 overflow-hidden pt-10 sm:pt-0">
          {activeTab === 'chat' && <Chat messages={messages} setMessages={setMessages} />}
          {activeTab === 'stockmechanic' && <StockMechanicPanel />}
          {activeTab === 'factorcorrelation' && <FactorCorrelationPanel />}
        </main>
      </div>
    </div>
  );
};

export default StockDriving;
