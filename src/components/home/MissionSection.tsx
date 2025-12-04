import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Wall Street Horsepower for Main Street
            </h2>
          </div>

          {/* Mission Points Grid */}
          <div className="grid gap-5 md:gap-6 mb-12">
            {missionPoints.map((point, index) => (
              <MissionPoint
                key={index}
                point={point}
                index={index}
                onKeywordClick={handleKeywordClick}
              />
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in">
            <Link to="/stocks" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto text-xl px-16 py-7 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-primary/25 font-semibold rounded-lg"
              >
                View Recommended Stocks
              </Button>
            </Link>
            <span className="text-base text-muted-foreground font-medium hidden sm:block">or</span>
            <Link to="/approach" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-xl px-16 py-7 border-2 border-border text-foreground hover:bg-accent transition-all duration-300 hover:shadow-lg font-semibold rounded-lg"
              >
                View Historical Stocks
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
