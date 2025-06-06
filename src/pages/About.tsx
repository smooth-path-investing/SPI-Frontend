
import React, { useState } from 'react';
import { TeamMemberModal } from '../components/ui/team-member-modal';
import { TEAM_MEMBERS } from '../constants';
import { ITeamMember } from '../types';
import { Target, Users, TrendingUp, Shield } from 'lucide-react';

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
            About StockPicks
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're revolutionizing investment research with transparent, data-driven stock analysis
          </p>
        </div>

        {/* Mission & Vision */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To democratize sophisticated investment research by making institutional-grade 
                analysis accessible to every investor, regardless of their experience level.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that transparency, rigorous methodology, and user-friendly design 
                should be the foundation of modern investment platforms.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">What Sets Us Apart</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Target className="w-6 h-6 text-foreground mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">Transparency First</h4>
                    <p className="text-muted-foreground text-sm">Complete methodology disclosure and real performance tracking</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="w-6 h-6 text-foreground mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">Proven Results</h4>
                    <p className="text-muted-foreground text-sm">Rigorous backtesting with 10+ years of validated performance</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-foreground mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">No Hidden Agenda</h4>
                    <p className="text-muted-foreground text-sm">No aggressive upselling or cluttered interfaces</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-card p-8 rounded-lg border border-border">
              <Target className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-foreground">Simplicity</h3>
              <p className="text-muted-foreground">
                Complex strategies made simple. We believe powerful tools should be easy to understand and use.
              </p>
            </div>
            <div className="text-center bg-card p-8 rounded-lg border border-border">
              <Shield className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-foreground">Integrity</h3>
              <p className="text-muted-foreground">
                Honest reporting, transparent methodology, and putting our users' interests first, always.
              </p>
            </div>
            <div className="text-center bg-card p-8 rounded-lg border border-border">
              <TrendingUp className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-foreground">Performance</h3>
              <p className="text-muted-foreground">
                Results speak louder than promises. Every recommendation is backed by rigorous data analysis.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our diverse team combines decades of financial expertise with cutting-edge technology
            </p>
          </div>

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

        {/* Company Story */}
        <section className="bg-card rounded-lg p-12 border border-border">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Our Story</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Founded by a team of quantitative analysts and technology experts who were frustrated 
                with the existing landscape of investment research platforms. We saw too many services 
                that prioritized marketing over methodology, complexity over clarity.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                StockPicks was born from a simple idea: what if investment research could be both 
                sophisticated and accessible? What if transparency wasn't just a buzzword, but the 
                foundation of everything we do?
              </p>
            </div>
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
