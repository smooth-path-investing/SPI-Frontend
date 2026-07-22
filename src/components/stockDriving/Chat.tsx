import { useEffect, useRef, useState } from 'react';
import MessageRenderer from './MessageRenderer';
import { RUNTIME_CONFIG, buildApiUrl } from '@/lib/runtimeConfig';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'Tell me about AAPL',
  'Indicators for TSLA',
  'Live trading overview',
  'Analyze GOOGL predictions',
];

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-xs font-semibold text-[var(--accent)]">
        R
      </div>
      <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--muted-text)]"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

interface ChatProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

export default function Chat({ messages, setMessages }: ChatProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent, loading]);

  const sendMessage = async (text?: string) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setLoading(true);
    setStreamingContent('');

    try {
      const res = await fetch(buildApiUrl('/api/chat', RUNTIME_CONFIG.stockAssetsApiBaseUrl), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, stream: false }),
      });

      if (res.headers.get('content-type')?.includes('text/event-stream') && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let full = '';

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value);
          const lines = text.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.chunk) {
                  full += data.chunk;
                  setStreamingContent(full);
                }
              } catch {
                // ignore malformed SSE chunks
              }
            }
          }
        }

        setStreamingContent('');
        setMessages((prev) => [...prev, { role: 'assistant', content: full }]);
      } else {
        const data = await res.json();
        setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Error connecting to backend: ${err instanceof Error ? err.message : String(err)}.`,
        },
      ]);
    } finally {
      setLoading(false);
      setStreamingContent('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-5 overflow-y-auto px-2 py-4 sm:px-4">
        {messages.length === 0 && !loading && (
          <div className="mx-auto max-w-xl pt-10 text-center">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">Research Analytics System</h2>
            <p className="mt-2 text-sm text-[var(--muted-text)]">
              Ask about stocks, indicators, predictions, and live trading signals.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-[var(--muted-text)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--foreground)]"
                  onClick={() => void sendMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className="flex gap-3">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                msg.role === 'user'
                  ? 'bg-white/10 text-[var(--foreground)]'
                  : 'bg-[var(--accent)]/15 text-[var(--accent)]'
              }`}
            >
              {msg.role === 'user' ? 'U' : 'R'}
            </div>
            <div className="max-w-[85%] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-[var(--foreground)]/90">
              <MessageRenderer content={msg.content} role={msg.role} onSend={sendMessage} />
            </div>
          </div>
        ))}

        {streamingContent && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15 text-xs font-semibold text-[var(--accent)]">
              R
            </div>
            <div className="max-w-[85%] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-[var(--foreground)]/90">
              <MessageRenderer content={streamingContent} role="assistant" onSend={sendMessage} />
            </div>
          </div>
        )}

        {loading && !streamingContent && <TypingIndicator />}

        <div ref={bottomRef} />
      </div>

      <div className="flex items-end gap-3 border-t border-white/10 px-2 py-3 sm:px-4">
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder="Ask about a stock, indicator, or prediction..."
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="max-h-[140px] flex-1 resize-none rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-text)]/70 focus:border-[var(--accent)]/50 focus:outline-none"
        />
        <button
          onClick={() => void sendMessage()}
          disabled={loading || !input.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--accent)] bg-[var(--accent)] text-black transition-all hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ↑
        </button>
      </div>
    </div>
  );
}
