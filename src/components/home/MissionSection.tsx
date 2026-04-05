import React from 'react';
import { MissionPoint } from '../Cards/missionPoint/MissionPoint';
import { MISSION_POINTS } from '@/constants/mission';
import { ScrollSection } from '../animations/scrollSection';
import { SectionHeader } from '../sectionHeaders/reusableHeaders/sectionHeader';
import { TooltipProvider } from '@/components/ui/tooltip';

export const MissionSection: React.FC = () => {
  return (
    <div className="bg-[var(--background)]">
      <ScrollSection
        className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 text-[var(--foreground)]"
        triggerClass="mission-content"
      >
        <div className="mx-auto max-w-7xl mission-content">
          <TooltipProvider delayDuration={140} skipDelayDuration={80}>
            <SectionHeader mainText="Wall Street Horsepower for Main Street." subText="" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {MISSION_POINTS.map((point, index) => (
                <div key={index}>
                  <MissionPoint point={point} index={index} />
                </div>
              ))}
            </div>
          </TooltipProvider>
        </div>
      </ScrollSection>
    </div>
  );
};
