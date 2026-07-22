import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { RUNTIME_CONFIG, buildApiUrl } from '@/lib/runtimeConfig';

const SECTION_RE = /<!--SECTION:(summary|stability|trading)-->\s*/;
const SUGGEST_RE = /<!--TICKER_SUGGEST:([A-Z]{1,5}):([A-Z]{1,5})-->/;
const DOWNLOAD_OFFER = 'Would you like this analysis as a downloadable';

interface LivetradingSectionsData {
  summary?: string;
  details?: string;
}

function parseLivetradingSections(content: string): LivetradingSectionsData | null {
  if (!content.includes('<!--SECTION:summary-->')) return null;
  const parts = content.split(SECTION_RE);
  const sections: LivetradingSectionsData = {};
  for (let i = 1; i < parts.length - 1; i += 2) {
    sections[parts[i] as keyof LivetradingSectionsData] = parts[i + 1].trim();
  }
  return sections.summary ? sections : null;
}

function parseSuggestion(content: string) {
  const m = SUGGEST_RE.exec(content);
  return m ? { suggested: m[1], original: m[2] } : null;
}

const chipClass =
  'rounded-full border border-[var(--accent)]/35 bg-[var(--accent)]/10 px-3 py-1.5 text-xs font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/20';

function TickerSuggestion({
  suggested,
  original,
  onAccept,
}: {
  suggested: string;
  original: string;
  onAccept: (text: string) => void;
}) {
  return (
    <div className="text-sm text-[var(--foreground)]/85">
      Did you mean <strong>{suggested}</strong> instead of <em>{original}</em>?
      <div className="mt-2">
        <button className={chipClass} onClick={() => onAccept(suggested)}>
          Yes, search {suggested}
        </button>
      </div>
    </div>
  );
}

function HtmlArtifact({ html }: { html: string }) {
  const [expanded, setExpanded] = useState(false);
  const height = expanded ? '85vh' : '520px';

  const isFactor = html.includes('factorfree') || html.includes('FACTOR_CORRELATION');
  const tickerMatch = html.match(/(?:INIT_TICKER|INITIAL_TICKER)\s*=\s*"([A-Z]{1,5})"/);
  const ticker = tickerMatch ? tickerMatch[1] : null;

  const src =
    isFactor && ticker
      ? buildApiUrl(`/api/factorapp/${ticker}`, RUNTIME_CONFIG.stockAssetsApiBaseUrl)
      : null;

  return (
    <div>
      <div className="mb-1.5 flex justify-end">
        <button className={chipClass} onClick={() => setExpanded((v) => !v)}>
          {expanded ? 'Collapse' : 'Expand'}
        </button>
      </div>
      {src ? (
        <iframe
          src={src}
          style={{ height }}
          className="block w-full rounded-lg border-0 bg-black transition-[height] duration-200"
          title="Factor App"
        />
      ) : (
        <iframe
          srcDoc={html}
          style={{ height }}
          className="block w-full rounded-lg border-0 bg-black transition-[height] duration-200"
          sandbox="allow-scripts allow-forms allow-popups"
          title="App"
        />
      )}
    </div>
  );
}

function DownloadButtons({ content }: { content: string }) {
  const body = content.split(DOWNLOAD_OFFER)[0].trim();

  const download = async (fmt: string) => {
    try {
      const res = await fetch(buildApiUrl(`/api/export?fmt=${fmt}`, RUNTIME_CONFIG.stockAssetsApiBaseUrl));
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analysis.${fmt}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert(`Export failed: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  return (
    <div>
      <ReactMarkdown>{body}</ReactMarkdown>
      <div className="mt-3 flex gap-2">
        <button className={chipClass} onClick={() => download('docx')}>
          Download Word
        </button>
        <button className={chipClass} onClick={() => download('pdf')}>
          Download PDF
        </button>
      </div>
    </div>
  );
}

function LivetradingSections({ sections }: { sections: LivetradingSectionsData }) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div>
      <ReactMarkdown>{sections.summary ?? ''}</ReactMarkdown>
      <button className={`${chipClass} mt-2`} onClick={() => setShowDetails((v) => !v)}>
        {showDetails ? 'Hide' : 'Show'} Volatility Risk Profile & Trading Implications
      </button>
      {showDetails && sections.details && (
        <div className="mt-2">
          <ReactMarkdown>{sections.details}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

interface MessageRendererProps {
  content: string;
  role: 'user' | 'assistant';
  onSend: (text: string) => void;
}

export default function MessageRenderer({ content, role, onSend }: MessageRendererProps) {
  if (role === 'user') {
    return <ReactMarkdown>{content}</ReactMarkdown>;
  }

  const suggestion = parseSuggestion(content);
  if (suggestion) {
    return (
      <TickerSuggestion suggested={suggestion.suggested} original={suggestion.original} onAccept={onSend} />
    );
  }

  if (content.trim().startsWith('<!DOCTYPE html>')) {
    return <HtmlArtifact html={content} />;
  }

  if (content.includes(DOWNLOAD_OFFER)) {
    return <DownloadButtons content={content} />;
  }

  const sections = parseLivetradingSections(content);
  if (sections) {
    return <LivetradingSections sections={sections} />;
  }

  return <ReactMarkdown>{content}</ReactMarkdown>;
}
