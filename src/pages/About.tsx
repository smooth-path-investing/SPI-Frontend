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
            About Ramy Sukarieh
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Applied mathematician and Managing Director at EyeLand Capital Management, specializing in quantitative investment strategies using machine learning, artificial intelligence, and advanced risk management.
          </p>
        </div>

        {/* Professional Summary */}
        <div className="mb-16 bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Professional Summary</h2>
          <div className="space-y-4 text-muted-foreground">
            <p className="leading-relaxed">
              Applied mathematician with expertise in market & credit risk (CCR CVA CCAR), coding/debugging expert in Python, Matlab, R, SQL, and various financial platforms including Barra, FactSet, Bloomberg, and Aladdin.
            </p>
            <p className="leading-relaxed">
              Developer of innovative stock selection models using signatures from rough path theory with genetic algorithms. For the 10-year period analyzed, the SigGA portfolios returned 191% vs. S&P500 68% with a Sharpe ratio of 3.3.
            </p>
            <div className="flex items-center gap-2 text-primary">
              <span>GitHub:</span>
              <a href="https://github.com/ecoramy/signature-genetic-algorithm" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary/80">
                signature-genetic-algorithm
              </a>
            </div>
          </div>
        </div>

        {/* Current Role */}
        <div className="mb-16 bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Current Position</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-foreground">Managing Director</h3>
                <p className="text-primary font-medium">EyeLand Capital Management, LLC</p>
                <p className="text-muted-foreground">September 2023 – Present</p>
              </div>
            </div>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Built quantitative investment strategies using machine learning and artificial intelligence to manage $6 million portfolio of stocks and debt securities</li>
              <li>• Coded stock ranking models using signatures from rough path theory and genetic algorithm</li>
              <li>• Computed stress tests, scenario analysis, risk measures ES, stressVaR, VaR, backtesting</li>
              <li>• Built fundamental U.S. trading strategy using polynomials and vector autoregressive models</li>
              <li>• Led execution and review of enterprise and operational risk management programs</li>
            </ul>
          </div>
        </div>

        {/* Education */}
        <div className="mb-16 bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Education</h2>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-foreground">M.Sc. Mathematics</h3>
                <p className="text-primary">Courant Institute, New York University</p>
                <p className="text-muted-foreground text-sm">December 2014</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">M.A. Mathematical Finance</h3>
                <p className="text-primary">Boston University</p>
                <p className="text-muted-foreground text-sm">May 2005</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">M.A. International Economics & Finance</h3>
                <p className="text-primary">Brandeis University</p>
                <p className="text-muted-foreground text-sm">May 2003</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">B.Sc. Economics</h3>
                <p className="text-primary">Lebanese University</p>
                <p className="text-muted-foreground text-sm">May 2002</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Experience */}
        <div className="mb-16 bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Key Professional Experience</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Senior Risk Manager</h3>
                  <p className="text-primary font-medium">United Nations Pension Fund</p>
                </div>
                <span className="text-muted-foreground text-sm">Jan 2013 – Jun 2022</span>
              </div>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• Managed investment risk budgets of $60+ billion on behalf of the UN Secretary-General</li>
                <li>• Developed quantitative models for asset allocation leading to billions in investments</li>
                <li>• Created Bayesian ML private equity VaR models for $1+ billion investments</li>
                <li>• Led market-risk due diligence using AI/ML to rank funds</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Risk Consultant</h3>
                  <p className="text-primary font-medium">Citibank</p>
                </div>
                <span className="text-muted-foreground text-sm">Mar 2023 – Aug 2023</span>
              </div>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• Assisted in regulatory comprehensive capital analysis CCAR review</li>
                <li>• Calculated credit risks for MBS, loans, swaps, CDO, CLO</li>
                <li>• Resolved mispricing of assets related to stress-testing and hedges</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Senior Risk Manager Consultant</h3>
                  <p className="text-primary font-medium">MSCI (Riskmetrics & BarraOne)</p>
                </div>
                <span className="text-muted-foreground text-sm">Feb 2011 – Jul 2012</span>
              </div>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• Helped institutional clients including World Bank, CPPIB, UN manage risk</li>
                <li>• Developed VaR and ES solutions for investments over $100 billion</li>
                <li>• Built risk dashboards and explained analytics to major institutions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div 
              key={member.id}
              className="group relative bg-card/50 backdrop-blur-sm rounded-2xl p-8 min-h-[320px] border border-border/50 hover:border-primary/20 transition-all duration-300 cursor-pointer hover:bg-card/70"
              onClick={() => handleMemberClick(member)}
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center group-hover:border-primary/30 transition-colors duration-300">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10"></div>
                </div>
                <div className="absolute inset-0 rounded-full bg-primary/5 scale-0 group-hover:scale-110 transition-transform duration-500 ease-out"></div>
              </div>

              {/* Content */}
              <div className="text-center space-y-3">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-primary/80">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              </div>

              {/* Hover Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-1 text-xs text-primary">
                  <span>View Profile</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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