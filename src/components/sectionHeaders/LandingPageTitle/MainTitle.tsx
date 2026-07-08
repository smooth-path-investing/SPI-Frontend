import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HERO_CTA, HERO_HEADLINE, HERO_SUBHEAD } from '@/constants/hero';

export const MainTitleComponent = (): JSX.Element => {
  return (
    <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
      <h1 className="text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white [text-shadow:0_18px_40px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-7xl xl:text-8xl">
        {HERO_HEADLINE.lineOne}
        <span className="mt-2 block sm:mt-3">{HERO_HEADLINE.lineTwo}</span>
      </h1>

      <span className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent sm:mt-8 sm:w-32" />

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.6)] sm:mt-8 sm:text-lg sm:leading-8">
        {HERO_SUBHEAD}
      </p>

      <Button
        asChild
        size="lg"
        className="mt-8 h-12 border border-[var(--accent)] bg-[var(--accent)] px-7 text-base font-semibold text-black shadow-[0_12px_32px_rgba(250,204,21,0.22)] transition-all hover:bg-[var(--accent-light)] hover:shadow-[0_16px_40px_rgba(250,204,21,0.28)] sm:mt-10"
      >
        <Link to={HERO_CTA.href}>
          {HERO_CTA.label}
          <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </Link>
      </Button>
    </div>
  );
};
