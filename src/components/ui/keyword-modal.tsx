import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface KeywordInfo {
  title: string;
  description: string;
  details: string[];
}

interface KeywordModalProps {
  keyword: KeywordInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export const KeywordModal: React.FC<KeywordModalProps> = ({
  keyword,
  isOpen,
  onClose,
}) => {
  if (!keyword) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-primary">
            {keyword.title}
          </DialogTitle>
          <DialogDescription className="text-base text-foreground mt-2">
            {keyword.description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <ul className="space-y-2">
            {keyword.details.map((detail, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};