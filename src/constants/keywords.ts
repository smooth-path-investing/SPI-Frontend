export interface KeywordInfo {
  title: string;
  description: string;
}

// 1. Map lowercase keys to the data
export const KEYWORD_DATA: Record<string, KeywordInfo> = {
  'rigorous math': {
    title: 'Proprietary in-house SigGA Model',
    description:
      'Rough Path Signatures + Genetic Algorithms + Behaviorally-linked Machine Learning...',
  },
  'risk budget': {
    title: 'Risk Budget Management & Portfolio Allocation',
    description: 'Guide investors to dial up or down risks in their portfolio...',
  },
  'az2→sp∈p': {
    title: 'Smooth Path Investing Framework',
    description: 'Encapsulates our complete investment framework from A to Z...',
  },
};

// 2. Keep the display strings for the Regex search
export const KEYWORDS = ['Rigorous Math', 'Risk Budget', 'Az2→Sp∈P'];
