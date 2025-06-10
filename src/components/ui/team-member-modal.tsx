
import React from 'react';
import { ITeamMember } from '../../types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './dialog';
import { Button } from './button';
import { ExternalLink } from 'lucide-react';

interface TeamMemberModalProps {
  member: ITeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  member,
  isOpen,
  onClose,
}) => {
  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border w-[calc(100%-32px)] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground">
            {member.name}
          </DialogTitle>
          <DialogDescription className="text-base sm:text-lg text-muted-foreground">
            {member.role}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            <div className="flex-shrink-0">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover border border-border"
              />
            </div>
            <div className="flex-grow">
              <p className="text-sm sm:text-base text-foreground leading-relaxed">{member.portfolio.description}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-4">Key Achievements</h3>
              <ul className="space-y-2">
                {member.portfolio.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-muted-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-4">Experience</h3>
              <ul className="space-y-2">
                {member.portfolio.experience.map((exp, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-muted-foreground">{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-4">Connect</h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {member.portfolio.websites.map((website, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm border-border text-foreground hover:bg-accent"
                  onClick={() => window.open(website.url, '_blank')}
                >
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  {website.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
