import React from 'react';
import { Target, Users, TrendingUp, Shield, Globe, Award, Lightbulb, Heart } from 'lucide-react';
import { textContent } from '@/constants/textContent';

export const AboutUsSection: React.FC = () => {
  return (
    <div className="py-20">
      {/* Mission & Vision - Expanded */}
      <section className="mb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">{textContent["about-mission-title"]}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {textContent["about-mission-text-1"]}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {textContent["about-mission-text-2"]}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {textContent["about-mission-text-3"]}
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">{textContent["about-sets-apart-title"]}</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Target className="w-6 h-6 text-foreground mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">{textContent["about-sets-apart-transparency-title"]}</h4>
                    <p className="text-muted-foreground text-sm">{textContent["about-sets-apart-transparency-description"]}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="w-6 h-6 text-foreground mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">{textContent["about-sets-apart-results-title"]}</h4>
                    <p className="text-muted-foreground text-sm">{textContent["about-sets-apart-results-description"]}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-foreground mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">{textContent["about-sets-apart-agenda-title"]}</h4>
                    <p className="text-muted-foreground text-sm">{textContent["about-sets-apart-agenda-description"]}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-6 h-6 text-foreground mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">{textContent["about-sets-apart-design-title"]}</h4>
                    <p className="text-muted-foreground text-sm">{textContent["about-sets-apart-design-description"]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Statement */}
          <div className="bg-card rounded-lg p-12 border border-border text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">{textContent["about-vision-title"]}</h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              {textContent["about-vision-text"]}
            </p>
          </div>
        </div>
      </section>

      {/* Company Values - Expanded */}
      <section className="mb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">{textContent["about-values-title"]}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-card p-8 rounded-lg border border-border">
              <Target className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-foreground">{textContent["about-values-simplicity-title"]}</h3>
              <p className="text-muted-foreground">
                {textContent["about-values-simplicity-description"]}
              </p>
            </div>
            <div className="text-center bg-card p-8 rounded-lg border border-border">
              <Shield className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-foreground">{textContent["about-values-integrity-title"]}</h3>
              <p className="text-muted-foreground">
                {textContent["about-values-integrity-description"]}
              </p>
            </div>
            <div className="text-center bg-card p-8 rounded-lg border border-border">
              <TrendingUp className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-foreground">{textContent["about-values-performance-title"]}</h3>
              <p className="text-muted-foreground">
                {textContent["about-values-performance-description"]}
              </p>
            </div>
            <div className="text-center bg-card p-8 rounded-lg border border-border">
              <Lightbulb className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-foreground">{textContent["about-values-innovation-title"]}</h3>
              <p className="text-muted-foreground">
                {textContent["about-values-innovation-description"]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Principles */}
      <section className="mb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">{textContent["about-operate-title"]}</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Globe className="w-8 h-8 text-foreground mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{textContent["about-operate-global-title"]}</h3>
                  <p className="text-muted-foreground">
                    {textContent["about-operate-global-description"]}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Award className="w-8 h-8 text-foreground mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{textContent["about-operate-quality-title"]}</h3>
                  <p className="text-muted-foreground">
                    {textContent["about-operate-quality-description"]}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Heart className="w-8 h-8 text-foreground mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{textContent["about-operate-user-first-title"]}</h3>
                  <p className="text-muted-foreground">
                    {textContent["about-operate-user-first-description"]}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-xl font-semibold mb-6 text-foreground">{textContent["about-commitment-title"]}</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{textContent["about-commitment-1"]}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{textContent["about-commitment-2"]}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{textContent["about-commitment-3"]}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{textContent["about-commitment-4"]}</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{textContent["about-commitment-5"]}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="mb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-lg p-12 border border-border">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-6 text-foreground">{textContent["about-story-title"]}</h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {textContent["about-story-text-1"]}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {textContent["about-story-text-2"]}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {textContent["about-story-text-3"]}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {textContent["about-story-text-4"]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards and Recognition */}
      <section className="mb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">{textContent["about-awards-title"]}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border text-center">
              <Award className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">{textContent["about-awards-fintech-title"]}</h3>
              <p className="text-muted-foreground mb-2">{textContent["about-awards-fintech-year"]}</p>
              <p className="text-sm text-muted-foreground">{textContent["about-awards-fintech-description"]}</p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border text-center">
              <Users className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">{textContent["about-awards-ux-title"]}</h3>
              <p className="text-muted-foreground mb-2">{textContent["about-awards-ux-year"]}</p>
              <p className="text-sm text-muted-foreground">{textContent["about-awards-ux-description"]}</p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border text-center">
              <TrendingUp className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">{textContent["about-awards-performance-title"]}</h3>
              <p className="text-muted-foreground mb-2">{textContent["about-awards-performance-year"]}</p>
              <p className="text-sm text-muted-foreground">{textContent["about-awards-performance-description"]}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-muted rounded-lg p-12 border border-border">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-foreground">{textContent["about-contact-title"]}</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {textContent["about-contact-subtitle"]}
              </p>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{textContent["about-contact-general-label"]}</h3>
                  <p className="text-muted-foreground">{textContent["about-contact-general-email"]}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{textContent["about-contact-research-label"]}</h3>
                  <p className="text-muted-foreground">{textContent["about-contact-research-email"]}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{textContent["about-contact-partnerships-label"]}</h3>
                  <p className="text-muted-foreground">{textContent["about-contact-partnerships-email"]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};