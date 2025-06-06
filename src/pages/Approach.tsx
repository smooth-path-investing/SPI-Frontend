
import React from 'react';
import { Button } from '@/components/ui/button';
import { APPROACH_SECTIONS } from '../constants';
import { BarChart3, Brain, TrendingUp, Database, Cpu, LineChart, Shield, Clock } from 'lucide-react';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case '📊': return <BarChart3 className="w-8 h-8 text-foreground" />;
    case '🤖': return <Brain className="w-8 h-8 text-foreground" />;
    case '📈': return <TrendingUp className="w-8 h-8 text-foreground" />;
    default: return <BarChart3 className="w-8 h-8 text-foreground" />;
  }
};

export const Approach: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-foreground">
            Our Investment Approach
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how we combine cutting-edge technology with proven investment principles 
            to identify winning stocks with institutional-grade precision
          </p>
        </div>

        {/* Philosophy Section - New */}
        <section className="mb-20">
          <div className="bg-card rounded-lg p-12 border border-border">
            <h2 className="text-3xl font-bold text-center mb-8 text-foreground">Investment Philosophy</h2>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  We believe that successful investing requires a systematic, data-driven approach that 
                  combines quantitative rigor with qualitative insights. Our methodology is built on 
                  three core principles:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-muted-foreground"><strong>Evidence-Based Decisions:</strong> Every recommendation is backed by statistical evidence and historical performance</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-muted-foreground"><strong>Risk-Adjusted Returns:</strong> We prioritize sustainable, risk-adjusted performance over short-term gains</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-muted-foreground"><strong>Continuous Improvement:</strong> Our models evolve with market conditions and new research findings</span>
                  </li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-muted p-6 rounded-lg border border-border text-center">
                  <Database className="w-8 h-8 text-foreground mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">10+ Years</h3>
                  <p className="text-sm text-muted-foreground">Historical Data</p>
                </div>
                <div className="bg-muted p-6 rounded-lg border border-border text-center">
                  <Cpu className="w-8 h-8 text-foreground mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">50+ Factors</h3>
                  <p className="text-sm text-muted-foreground">Analyzed Per Stock</p>
                </div>
                <div className="bg-muted p-6 rounded-lg border border-border text-center">
                  <LineChart className="w-8 h-8 text-foreground mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Daily Updates</h3>
                  <p className="text-sm text-muted-foreground">Model Refreshes</p>
                </div>
                <div className="bg-muted p-6 rounded-lg border border-border text-center">
                  <Shield className="w-8 h-8 text-foreground mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">95% Confidence</h3>
                  <p className="text-sm text-muted-foreground">Statistical Significance</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Three Pillars - Expanded */}
        <div className="space-y-16">
          {APPROACH_SECTIONS.map((section, index) => (
            <section key={index} className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="mr-4">{getIcon(section.icon)}</div>
                  <div>
                    <h2 className="text-3xl font-bold text-foreground">{section.title}</h2>
                    <p className="text-lg text-muted-foreground mt-2">{section.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Key Features</h3>
                    <ul className="space-y-3">
                      {section.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-muted-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="bg-muted rounded-lg p-8 border border-border text-center">
                      <div className="mb-4">{getIcon(section.icon)}</div>
                      <Button variant="outline" className="border-border text-foreground hover:bg-accent">
                        View Research Paper
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Detailed Methodology - New */}
        <section className="mt-20 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Detailed Methodology</h2>
          
          <div className="space-y-12">
            {/* Data Collection */}
            <div className="bg-card p-8 rounded-lg border border-border">
              <div className="flex items-center mb-6">
                <Database className="w-8 h-8 text-foreground mr-4" />
                <h3 className="text-2xl font-semibold text-foreground">Data Collection & Processing</h3>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-foreground">Data Sources</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Real-time market data from major exchanges</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Fundamental data from SEC filings and earnings reports</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Alternative data including news sentiment and social media</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Macroeconomic indicators and sector-specific metrics</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-foreground">Quality Assurance</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Automated data validation and anomaly detection</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Cross-verification across multiple data providers</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Historical data integrity checks and corrections</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Real-time monitoring for data quality issues</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Model Development */}
            <div className="bg-card p-8 rounded-lg border border-border">
              <div className="flex items-center mb-6">
                <Brain className="w-8 h-8 text-foreground mr-4" />
                <h3 className="text-2xl font-semibold text-foreground">Model Development Process</h3>
              </div>
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-muted p-4 rounded-lg border border-border mb-4">
                      <h4 className="font-semibold text-foreground">1. Feature Engineering</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Transform raw data into predictive features using domain expertise and statistical methods</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-muted p-4 rounded-lg border border-border mb-4">
                      <h4 className="font-semibold text-foreground">2. Model Training</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Train ensemble models using advanced machine learning techniques and cross-validation</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-muted p-4 rounded-lg border border-border mb-4">
                      <h4 className="font-semibold text-foreground">3. Validation</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Rigorous out-of-sample testing and walk-forward analysis to ensure robustness</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Management */}
            <div className="bg-card p-8 rounded-lg border border-border">
              <div className="flex items-center mb-6">
                <Shield className="w-8 h-8 text-foreground mr-4" />
                <h3 className="text-2xl font-semibold text-foreground">Risk Management Framework</h3>
              </div>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-foreground">Portfolio Construction</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Diversification across sectors and market caps</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Correlation analysis to minimize overlap</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Position sizing based on conviction and risk</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-foreground">Monitoring & Control</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Real-time risk metrics and alerts</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Stress testing under various market scenarios</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground">Dynamic rebalancing triggers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Attribution - New */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Performance Attribution</h2>
          <div className="bg-card p-8 rounded-lg border border-border">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-foreground mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Stock Selection</h3>
                <div className="text-2xl font-bold text-foreground">+15.2%</div>
                <p className="text-sm text-muted-foreground">Annual alpha contribution</p>
              </div>
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-foreground mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Sector Allocation</h3>
                <div className="text-2xl font-bold text-foreground">+3.8%</div>
                <p className="text-sm text-muted-foreground">Annual alpha contribution</p>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-foreground mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Timing</h3>
                <div className="text-2xl font-bold text-foreground">+2.1%</div>
                <p className="text-sm text-muted-foreground">Annual alpha contribution</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-foreground mx-auto mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Risk Management</h3>
                <div className="text-2xl font-bold text-foreground">+2.3%</div>
                <p className="text-sm text-muted-foreground">Drawdown reduction</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Complete Picture - Enhanced */}
        <div className="mt-16 text-center bg-muted rounded-lg p-12 border border-border">
          <h2 className="text-3xl font-bold mb-6">The Complete Picture</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-4xl mx-auto">
            Our three-pillar approach creates a comprehensive view of each stock's potential. 
            By combining quantitative factors, AI-driven insights, and rigorous backtesting, 
            we identify opportunities that others miss while managing downside risk.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">Systematic Process</h3>
              <p className="text-sm text-muted-foreground">Removes emotional bias and ensures consistent application of proven strategies</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">Adaptive Learning</h3>
              <p className="text-sm text-muted-foreground">Models continuously improve by learning from new market data and patterns</p>
            </div>
            <div className="bg-card p-6 rounded-lg border border-border">
              <h3 className="font-semibold text-foreground mb-2">Transparent Results</h3>
              <p className="text-sm text-muted-foreground">Full disclosure of methodology and real-time tracking of all recommendations</p>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              See Our Performance
            </Button>
            <Button variant="outline" className="border-border text-foreground hover:bg-accent">
              View All Research
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
