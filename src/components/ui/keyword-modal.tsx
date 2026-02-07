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
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader className="space-y-4 pb-6">
          <DialogTitle className="text-3xl sm:text-4xl font-bold text-primary leading-tight">
            {keyword.title}
          </DialogTitle>
          <DialogDescription className="text-lg sm:text-xl text-foreground leading-relaxed pt-2">
            {keyword.description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
