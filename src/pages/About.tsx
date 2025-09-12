import React, { useState } from 'react';
import { TeamMemberModal } from '../components/ui/team-member-modal';
import { TEAM_MEMBERS } from '../constants';
import { ITeamMember } from '../types';

export const About: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<ITeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMemberClick = (member: ITeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            Meet Our Team
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Our diverse team combines decades of financial expertise with cutting-edge technology
          </p>
          <p className="text-muted-foreground">
            Each team member brings unique perspectives from top-tier institutions, ensuring our 
            research methodology reflects the best practices from academia and industry.
          </p>
        </div>

        <section className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div 
                key={member.id}
                className="bg-card rounded-lg p-8 border border-border hover:bg-accent/50 transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => handleMemberClick(member)}
              >
                <div className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-border"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{member.name}</h3>
                  <p className="text-muted-foreground mb-4">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                  <p className="text-xs text-muted-foreground mt-4">Click to view portfolio</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <TeamMemberModal 
        member={selectedMember} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};