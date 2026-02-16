import { useRef } from 'react';

export const MainTitleComponent = (): JSX.Element => {
  const headerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={headerRef}
      className="relative z-10 flex flex-col items-center text-center max-w-[90%]"
    >
      <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[1.05]">
        Structure and Symmetry
        <span className="block mt-2">For Investment</span>
      </h1>
    </div>
  );
};
