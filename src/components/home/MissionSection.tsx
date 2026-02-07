import React, { useState } from 'react';
import { KeywordModal } from '@/components/ui/keyword-modal';
import { MissionPoint } from './MissionPoint';
import { KEYWORD_DATA, KeywordInfo } from '@/constants/keywords';
import { getMissionPoints } from '@/constants/mission';
export const MissionSection: React.FC = () => {
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleKeywordClick = (keyword: string) => {
    const keywordInfo = KEYWORD_DATA[keyword.toLowerCase()];

    if (keywordInfo) {
      setSelectedKeyword(keywordInfo);
      setIsModalOpen(true);
    }
  };
  const missionPoints = getMissionPoints(handleKeywordClick);

  return (
    <div className="bg-black">
      {' '}
      {/* Ensure wrapper is pure black */}
      <KeywordModal
        keyword={selectedKeyword}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 sm:mb-24">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tighter leading-[1.1]">
              Wall Street Horsepower <br className="hidden sm:block" /> for Main Street
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12">
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
