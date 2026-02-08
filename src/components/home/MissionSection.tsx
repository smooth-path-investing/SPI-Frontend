import React, { useState } from 'react';
import { KeywordModal } from '@/components/ui/keyword-modal';
import { MissionPoint } from './MissionPoint';
import { KEYWORD_DATA, KeywordInfo } from '@/constants/keywords';
import { getMissionPoints } from '@/constants/mission';

export const MissionSection: React.FC = () => {
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleKeywordClick = (keyword: string) => {
    // Normalize key for lookup
    const keywordInfo = KEYWORD_DATA[keyword] || KEYWORD_DATA[keyword.toLowerCase()];

    if (keywordInfo) {
      setSelectedKeyword(keywordInfo);
      setIsModalOpen(true);
    }
  };

  const missionPoints = getMissionPoints(handleKeywordClick);

  return (
    <div className="bg-black">
      <KeywordModal
        keyword={selectedKeyword}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header: wall street font weight and tight tracking */}
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-[1.05]">
              Wall Street Horsepower <br className="hidden sm:block" /> for Main Street
            </h2>
          </div>

          {/* Balanced 2x2 Grid with tight gap for luxury feel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {missionPoints.map((point, index) => (
              <MissionPoint
                key={index}
                point={point}
                index={index}
                onKeywordClick={handleKeywordClick}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
