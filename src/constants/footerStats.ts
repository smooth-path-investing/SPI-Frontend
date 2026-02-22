export type FooterStatIconKey = 'settings' | 'shield' | 'users' | 'search' | 'smartphone';

export interface FooterStatItem {
  title: string;
  description: string;
  icon: FooterStatIconKey;
}

export const FOOTER_STATS: FooterStatItem[] = [
  {
    title: 'Dynamic Management',
    description:
      'Ramy Sukarieh trades the exact same stock recommendations with his own capital and instantly relays every move via our AI, Ras.',
    icon: 'settings',
  },
  {
    title: 'Risk-aligned Strategy',
    description:
      'We only use hyper-liquid universes (S&P 500, IWM, …) and cap tracking error to a pre-set band (6–12%).',
    icon: 'shield',
  },
  {
    title: 'Independence & Acceptance',
    description:
      'Proprietary SigGA model built in-house. Once we’re in, we stay in — and double down when the market gives us the chance.',
    icon: 'users',
  },
  {
    title: 'Full Transparency',
    description:
      'Methodology, live positions, performance, and the original academic papers (downloadable on the Approach page).',
    icon: 'search',
  },
  {
    title: 'No Upselling',
    description:
      'Research + experience matter. Clear plan pricing, zero hidden costs, no nonsense — ever.',
    icon: 'shield',
  },
  {
    title: 'Mobile First',
    description:
      'Designed from day one to be fast and beautiful on your phone — no zooming, no clutter.',
    icon: 'smartphone',
  },
];
