import { ApproachSection } from '@/components/home/Approach';
import { HeroSection } from '@/components/home/HeroSection';
import { MethodologySection } from '@/components/home/MethodologySection';
import { MissionSection } from '@/components/home/MissionSection';
import { StatsSection } from '@/components/home/StatsSection';
import { SuccessStories } from '@/components/home/Stories';

export const Home: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.08),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_44%)]"
      />
      <div className="relative">
        <HeroSection />
        <MissionSection />
        <MethodologySection />
        <ApproachSection />
        <SuccessStories />
        <StatsSection />
      </div>
    </div>
  );
};
