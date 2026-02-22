import { useRef } from 'react';

export const MainTitleComponent = (): JSX.Element => {
  const headerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={headerRef}
      className="relative z-10 flex flex-col items-center text-center max-w-[92%]"
    >
      <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-white tracking-tight leading-[1.02]">
        Structure and Symmetry
        <span className="block mt-3">For Investment</span>
      </h1>
    </div>
  );
};
