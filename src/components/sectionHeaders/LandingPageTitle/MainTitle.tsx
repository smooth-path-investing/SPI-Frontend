import { useRef } from 'react';

export const MainTitleComponent = (): JSX.Element => {
  const headerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div ref={headerRef} className="relative z-10 flex flex-col items-center text-center max-w-[92%]">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.06]">
        Structure and Symmetry
        <span className="block mt-2">For Investment</span>
      </h1>
    </div>
  );
};
