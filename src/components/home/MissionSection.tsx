import React, { useState, useEffect } from 'react';
import { KeywordModal } from '@/components/ui/keyword-modal';
import { MissionPoint } from './MissionPoint';
import { KEYWORD_DATA, KeywordInfo } from '@/constants/keywords';
import { getMissionPoints } from '@/constants/mission';
import { textContent } from '@/constants/textContent';

export const MissionSection: React.FC = () => {
  const [selectedKeyword, setSelectedKeyword] = useState<KeywordInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleKeywordClick = (keyword: string) => {
    const keywordInfo = KEYWORD_DATA[keyword];
    if (keywordInfo) {
      setSelectedKeyword(keywordInfo);
      setIsModalOpen(true);
    }
  };

  const missionPoints = getMissionPoints(handleKeywordClick);

  return (
    <>
      <KeywordModal 
        keyword={selectedKeyword}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
              {textContent["home-mission-title"]}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {textContent["home-mission-subtitle"]}
            </p>
          </div>
          
          {/* Mission Points Grid */}
          <div className="grid gap-8 md:gap-10">
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
    </>
  );
};