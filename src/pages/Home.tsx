import { ApproachSection } from '@/components/home/Approach';
import { HeroSection } from '@/components/home/HeroSection';
import { MethodologySection } from '@/components/home/MethodologySection';
import { MissionSection } from '@/components/home/MissionSection';
import { PerformanceSection } from '@/components/home/PerformanceSection';
import { StatsSection } from '@/components/home/StatsSection';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <MissionSection />
      <MethodologySection />
      <ApproachSection />
      <PerformanceSection />
      <StatsSection />
    </div>
  );
};
