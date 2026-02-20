import React, { useState } from 'react';
import { KeywordModal } from '@/components/ui/keyword-modal';
import { MissionPoint } from '../Cards/missionPoint/MissionPoint';
import { KEYWORD_DATA, KeywordInfo } from '@/constants/keywords';
import { getMissionPoints } from '@/constants/mission';
import { ScrollSection } from '../animations/scrollSection';
import { SectionHeader } from '../sectionHeaders/reusableHeaders/sectionHeader';

export const MissionSection: React.FC = () => {
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleKeywordClick = (keyword: string) => {
    const keywordInfo = KEYWORD_DATA[keyword] || KEYWORD_DATA[keyword.toLowerCase()];
    if (keywordInfo) {
      setSelectedKeyword(keywordInfo);
      setIsModalOpen(true);
    }
  };

  const missionPoints = getMissionPoints(handleKeywordClick);

  return (
    <div className="bg-[var(--background)]">
      <KeywordModal
        keyword={selectedKeyword}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ScrollSection
        className="py-20 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 text-[var(--foreground)]"
        triggerClass="mission-content"
      >
        <div className="max-w-6xl mx-auto mission-content">
          {/* Header */}
          <SectionHeader mainText="Wall Street Horsepower for Main Street." subText="" />

          {/* Grid of MissionPoints */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {missionPoints.map((point, index) => (
              <div key={index}>
                <MissionPoint point={point} index={index} onKeywordClick={handleKeywordClick} />
              </div>
            ))}
          </div>
        </div>
      </ScrollSection>
    </div>
  );
};
