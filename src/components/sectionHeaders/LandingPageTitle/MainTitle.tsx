import { useRef } from 'react';

export const MainTitleComponent = (): JSX.Element => {
  const headerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={headerRef}
      className="relative z-10 mx-auto flex max-w-[92%] flex-col items-center text-center"
    >
      <h1 className="text-5xl font-semibold leading-[0.96] tracking-[-0.04em] text-white [text-shadow:0_18px_40px_rgba(0,0,0,0.45)] sm:text-7xl lg:text-8xl xl:text-9xl">
        Structure and Symmetry
        <span className="block mt-3">In Investment</span>
      </h1>
      <span className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent sm:w-32" />
    </div>
  );
};
