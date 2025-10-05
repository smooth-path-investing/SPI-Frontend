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
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader className="space-y-4 pb-6">
          <DialogTitle className="text-3xl sm:text-4xl font-bold text-primary leading-tight">
            {keyword.title}
          </DialogTitle>
          <DialogDescription className="text-lg sm:text-xl text-foreground leading-relaxed pt-2">
            {keyword.description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-8 pb-4">
          <ul className="space-y-6">
            {keyword.details.map((detail, index) => (
              <li key={index} className="flex items-start gap-4 text-base sm:text-lg text-muted-foreground leading-relaxed group">
                <span className="text-primary mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform duration-200"></span>
                <span className="flex-1">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};