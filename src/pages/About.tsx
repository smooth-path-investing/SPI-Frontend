
import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../constants';
import { TeamMemberModal } from '../components/ui/team-member-modal';
import { ITeamMember } from '../types';

export const About: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<ITeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMemberClick = (member: ITeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="text-xl text-white/80">
            Democratizing sophisticated investment strategies through transparency and technology
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-white/5 rounded-lg p-8 border border-white/10">
            <h2 className="text-3xl font-bold mb-6 text-blue-400">Our Vision</h2>
            <p className="text-lg text-white/90 leading-relaxed mb-4">
              We believe that sophisticated investment strategies shouldn't be exclusive to Wall Street. 
              Our mission is to democratize access to institutional-quality stock analysis through 
              transparent methodology and cutting-edge technology.
            </p>
            <p className="text-lg text-white/90 leading-relaxed">
              Unlike traditional financial platforms that overwhelm users with noise and aggressive 
              upselling, we focus on what matters: clear insights, proven performance, and honest communication.
            </p>
          </section>

          <section className="bg-white/5 rounded-lg p-8 border border-white/10">
            <h2 className="text-3xl font-bold mb-6 text-purple-400">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Simplicity</h3>
                <p className="text-white/70">Clean, intuitive design that makes complex analysis accessible to everyone</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                <p className="text-white/70">Open methodology and honest communication about risks and limitations</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Performance</h3>
                <p className="text-white/70">Data-driven strategies backed by rigorous testing and validation</p>
              </div>
            </div>
          </section>

          <section className="bg-white/5 rounded-lg p-8 border border-white/10">
            <h2 className="text-3xl font-bold mb-6 text-green-400">Our Team</h2>
            <p className="text-lg text-white/90 mb-8">
              Meet the experts behind our cutting-edge investment strategies
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {TEAM_MEMBERS.map((member) => (
                <div
                  key={member.id}
                  onClick={() => handleMemberClick(member)}
                  className="bg-white/5 rounded-lg p-6 border border-white/10 cursor-pointer hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-white/20"
                    />
                    <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                    <p className="text-blue-400 font-medium mb-3">{member.role}</p>
                    <p className="text-white/70 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white/5 rounded-lg p-8 border border-white/10">
            <h2 className="text-3xl font-bold mb-6 text-green-400">Why We're Different</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">No Clutter, No Noise</h3>
                  <p className="text-white/70">Clean interface focused on what matters most to your investment decisions</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">No Aggressive Upselling</h3>
                  <p className="text-white/70">Soft CTAs and genuine value, not constant pop-ups and pressure tactics</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Mobile-First Design</h3>
                  <p className="text-white/70">Responsive, fast-loading interface that works perfectly on any device</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <TeamMemberModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};
