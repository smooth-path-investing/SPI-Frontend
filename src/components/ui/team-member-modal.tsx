
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {member.name}
          </DialogTitle>
          <DialogDescription className="text-lg text-muted-foreground">
            {member.role}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-lg object-cover border border-border"
              />
            </div>
            <div className="flex-grow">
              <p className="text-foreground leading-relaxed">{member.portfolio.description}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Key Achievements</h3>
              <ul className="space-y-2">
                {member.portfolio.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Experience</h3>
              <ul className="space-y-2">
                {member.portfolio.experience.map((exp, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{exp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {member.portfolio.websites.map((website, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="border-border text-foreground hover:bg-accent"
                  onClick={() => window.open(website.url, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
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
