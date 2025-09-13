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
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight">
            Meet Our Team
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Our diverse team combines decades of financial expertise with cutting-edge technology
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
          {TEAM_MEMBERS.map((member) => (
            <div 
              key={member.id}
              className="group relative bg-card/50 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-border/50 hover:border-primary/20 transition-all duration-300 cursor-pointer hover:bg-card/70"
              onClick={() => handleMemberClick(member)}
            >
              {/* Profile Image */}
              <div className="relative mb-8">
                <div className="w-24 h-24 lg:w-28 lg:h-28 mx-auto rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/10"></div>
                </div>
                <div className="absolute inset-0 rounded-full bg-primary/5 scale-0 group-hover:scale-110 transition-transform duration-500 ease-out"></div>
              </div>

              {/* Content */}
              <div className="text-center space-y-4">
                <h3 className="text-xl lg:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-sm lg:text-base font-medium text-primary/80">
                  {member.role}
                </p>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed line-clamp-4">
                  {member.bio}
                </p>
              </div>

              {/* Hover Indicator */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-1 text-sm text-primary">
                  <span>View Profile</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-20 text-center">
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Each team member brings unique perspectives from top-tier institutions, ensuring our 
            research methodology reflects the best practices from academia and industry.
          </p>
        </div>
      </div>

      <TeamMemberModal 
        member={selectedMember} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};