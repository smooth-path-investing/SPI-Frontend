import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { KeywordInfo } from '@/constants/keywords';

interface KeywordModalProps {
  keyword: KeywordInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export const KeywordModal: React.FC<KeywordModalProps> = ({ keyword, isOpen, onClose }) => {
  if (!keyword) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          sm:max-w-[700px] max-w-full
          max-h-[85vh] sm:max-h-[80vh]
          overflow-y-auto
          px-4 sm:px-6 lg:px-8
          py-6 sm:py-8
          bg-[var(--card-bg)]
          border border-[var(--card-border)]
          rounded-xl
        "
      >
        <DialogHeader className="space-y-4 sm:space-y-5">
          {/* Title */}
          <DialogTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight">
            {keyword.title}
          </DialogTitle>

          {/* Description */}
          <DialogDescription className="text-base sm:text-lg md:text-xl text-[var(--foreground)] leading-relaxed">
            {keyword.description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
