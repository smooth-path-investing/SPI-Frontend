import React from 'react';
import { Target, Users, TrendingUp, Shield, Globe, Award, Lightbulb, Heart } from 'lucide-react';

export const AboutUsSection: React.FC = () => {
  return (
    <div className="py-20">
      {/* Mission & Vision - Expanded */}
      <section className="mb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To democratize sophisticated investment research by making institutional-grade 
                analysis accessible to every investor, regardless of their experience level.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We believe that transparency, rigorous methodology, and user-friendly design 
                should be the foundation of modern investment platforms.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our goal is to level the playing field between retail and institutional investors 
                by providing the same caliber of research and analysis tools.
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
                <div className="flex items-start">
                  <Users className="w-6 h-6 text-foreground mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-foreground">User-Centric Design</h4>
                    <p className="text-muted-foreground text-sm">Built for investors, by investors who understand your needs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Statement */}
          <div className="bg-card rounded-lg p-12 border border-border text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">Our Vision</h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              To become the most trusted source of investment research globally, where every recommendation 
              is backed by rigorous data analysis and where transparency isn't just a promise—it's our 
              fundamental operating principle.
            </p>
          </div>
        </div>
      </section>

      {/* Company Values - Expanded */}
      <section className="mb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            <div className="text-center bg-card p-8 rounded-lg border border-border">
              <Lightbulb className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-foreground">Innovation</h3>
              <p className="text-muted-foreground">
                Continuously pushing boundaries in financial technology and investment research.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Principles */}
      <section className="mb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">How We Operate</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Globe className="w-8 h-8 text-foreground mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Global Perspective</h3>
                  <p className="text-muted-foreground">
                    We analyze markets worldwide, incorporating global trends and cross-market insights 
                    to provide comprehensive investment recommendations.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Award className="w-8 h-8 text-foreground mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Quality Over Quantity</h3>
                  <p className="text-muted-foreground">
                    We focus on fewer, higher-conviction picks rather than overwhelming users with 
                    hundreds of mediocre recommendations.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Heart className="w-8 h-8 text-foreground mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">User-First Approach</h3>
                  <p className="text-muted-foreground">
                    Every decision we make is evaluated through the lens of user benefit, not 
                    short-term revenue maximization.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Our Commitment to You</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Never charge hidden fees or surprise costs</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Provide complete transparency in our methodology</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Continuously improve based on user feedback</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Maintain the highest standards of data security</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Support responsible investing practices</span>
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
              <h2 className="text-3xl font-bold mb-6 text-foreground">Our Story</h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded by a team of quantitative analysts and technology experts who were frustrated 
                with the existing landscape of investment research platforms. We saw too many services 
                that prioritized marketing over methodology, complexity over clarity.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Smooth Path Investing was born from a simple idea: what if investment research could be both 
                sophisticated and accessible? What if transparency wasn't just a buzzword, but the 
                foundation of everything we do?
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                After years in traditional finance, seeing how the best research was hoarded by 
                institutions, we decided to build something different. A platform where retail 
                investors could access the same quality of analysis that was previously reserved 
                for hedge funds and pension funds.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we're proud to serve thousands of investors worldwide, from beginners taking 
                their first steps into the market to experienced traders looking for an edge. Our 
                commitment remains the same: provide the best possible research with complete transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards and Recognition */}
      <section className="mb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Awards & Recognition</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border text-center">
              <Award className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">FinTech Innovation Award</h3>
              <p className="text-muted-foreground mb-2">2023</p>
              <p className="text-sm text-muted-foreground">Recognized for democratizing institutional-grade investment research</p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border text-center">
              <Users className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Best User Experience</h3>
              <p className="text-muted-foreground mb-2">Investment Platform Awards 2023</p>
              <p className="text-sm text-muted-foreground">Leading in user interface design and accessibility</p>
            </div>
            <div className="bg-card p-8 rounded-lg border border-border text-center">
              <TrendingUp className="w-12 h-12 text-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Top Performance</h3>
              <p className="text-muted-foreground mb-2">Independent Research Review 2023</p>
              <p className="text-sm text-muted-foreground">Highest risk-adjusted returns among peer platforms</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-muted rounded-lg p-12 border border-border">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6 text-foreground">Get in Touch</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Have questions about our methodology, want to partner with us, or just want to say hello? 
                We'd love to hear from you.
              </p>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">General Inquiries</h3>
                  <p className="text-muted-foreground">hello@smoothpathinvesting.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Research Team</h3>
                  <p className="text-muted-foreground">research@smoothpathinvesting.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Partnerships</h3>
                  <p className="text-muted-foreground">partners@smoothpathinvesting.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};