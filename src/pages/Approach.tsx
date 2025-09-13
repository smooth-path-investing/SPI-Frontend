import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { APPROACH_SECTIONS } from '../constants';
import { BarChart3, Brain, TrendingUp, Database, Cpu, LineChart, Shield, Clock, FileText, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import turtleFoxImg from '@/assets/turtle-fox-illustration.png';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case '📊': return <BarChart3 className="w-8 h-8 text-foreground" />;
    case '🤖': return <Brain className="w-8 h-8 text-foreground" />;
    case '📈': return <TrendingUp className="w-8 h-8 text-foreground" />;
    default: return <BarChart3 className="w-8 h-8 text-foreground" />;
  }
};

export const Approach: React.FC = () => {
  const [expandedStories, setExpandedStories] = useState<Set<number>>(new Set());

  const toggleStory = (storyNumber: number) => {
    setExpandedStories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(storyNumber)) {
        newSet.delete(storyNumber);
      } else {
        newSet.add(storyNumber);
      }
      return newSet;
    });
  };

  const stories = [
    {
      title: "The Stock-Data Story",
      content: `What data should you use to understand stock behavior? At SPI we start from the most basic and essential set of information: 
      a) indicators affecting each stock independently such as accounting information like balance sheet, income statement, and cash flows (non-traded indicators); 
      b) indicators impacting the overall economy such as GDP, inflation, and housing sales (non-traded indicators); 
      c) indicators influencing companies, economies, and stocks such as gold, silver, and global/international equities or bonds (traded indicators). 
      Every stock is influenced by three layers of context: the company itself, the broader economy, and the overall market. We examine the quarterly movements of all three to gain a full understanding using three sets of information: company-specific/unique, country-specific/common, and market-specific/common.`
    },
    {
      title: "The Stock-Human Story",
      content: `What models should you use to understand stocks' behavior? There are three types of investment behaviors: 1) people who follow, 2) people who rebel, and 3) people who stay neutral. 
      EyeLand Capital Management uses math to identify patterns, trends, and paths that align with investment themes like behavior, now labeled 1) Trend, 2) Contrarian or mean-reverting, and 3) Linear. 
      We apply 1) highly nonlinear models, such as recurrent neural networks like LSTM, for trend-following stocks, 2) moderately nonlinear models, like polynomials, for mean-reverting, contrarian stocks, and 3) dynamical system models, such as VARX, for neutral, linear-trending stocks. 
      Our investment approach concentrates stock picks into a concise, high-confidence, 10-stock list per quarter.`
    },
    {
      title: "The Stock-Tracker Story",
      content: `When and how do you sell/buy a stock? Trade based on pre-determined levels and targeted risk metrics, implementing trades in 2-3 measured stages to reduce regret and capitalize on momentum. 
      Only sell when at least one of these conditions is met: a) (relative basis) the stock rises 15-25% above the S&P 500, b) (absolute basis) it gains 25-40% from entry, or c) (risk management) it falls 15-20% below average cost or significantly underperforms for extended periods. 
      We combine systematic rules with prudent and clear risk management targets, acknowledging that no strategy eliminates all risks, but disciplined execution can help stack the odds in your favor while protecting your capital when markets don't cooperate.`
    },
    {
      title: "The Stock-Speed Story",
      content: `How do you know a stock has reached its upside or downside potential? Consider how people behave (followers, rebels, or neutrals) within each group, stocks move to their own rhythm, advancing, retreating, or wandering across a wide spectrum of paths, leaving behind rough, smooth, irregular, long, or short traces (signatures) along the way. 
      These dynamics influence the speed at which a stock may reach its upside or downside potential. We measure the uncertainties surrounding these potentials by analyzing historical behavior through the lenses of both simplicity and complexity, defining boundaries and corners to guide the pace of entries and exits.`
    },
    {
      title: "The Stock-Bump Story",
      content: `Which stocks have the biggest drop/loss potential and which have the biggest increase/gain potential? Stocks move with wild, unpredictable swings—others glide along steadily. We help you figure out which stocks fit into each group, so you're never caught off guard. 
      SPI stock picks will let you know which stocks might see sudden shifts, moderate changes, or slow moves, using tools like stress-VaR, VaR, CVaR, maximum drawdowns to gauge the large/sudden swings. Plus, we consider the direction, so you can decide to trade them long or short.`
    },
    {
      title: "The Stock-Limit Story",
      content: `What number of stocks should you hold in your portfolio? We actively adjust your portfolio size to fit your needs. For risk takers, always keep 10-12 stocks in your portfolio. 
      Those with a moderate risk appetite should aim for 17-30 stocks. If you prefer a conservative approach, plan for at least 30 stocks but keep the total under 40-45. 
      Suggested allocations: Risk takers: 7–13 stocks, Moderate risk: 13–27 stocks, Conservative: 27–40 stocks. As a rule of thumb, at least have 2.5% with no more than 20% allocation to a given stock.`
    },
    {
      title: "The Stock-Slice Story",
      content: `Which stocks you can trade actively during the quarter and which ones you hold longer? Stocks don't all move to the same beat, and they tend to shift in groups over different time frames. 
      SPI stock picks' approach encodes, through the indicators, features like increments, interactions, and higher-order effects. This temporal structure guides stocks' classification into short-term versus long-term signals. 
      We'll tell you which stocks in your portfolio you can hold past a quarter and which ones you should wrap up by quarter's end, always selling or buying at the right price or moment.`
    },
    {
      title: "The Stock-Theme Story",
      content: `Each SPI pick has a theme: macro-driven, fundamentally strong, or hybrid. We classify stocks by traits: corporate-driven, economy-sensitive, market-driven, or neutral. 
      Each SPI stock recommendation comes with a DNA classification: a) Fundamental - Companies that move based on corporate performance, b) Macroeconomic - Stocks influenced by economic cycles, c) Market-driven - Securities that respond primarily to trading patterns, d) Hybrid - Stocks influenced by multiple factors, e) Neutral - Securities with no clear dominant pattern. 
      This classification helps align recommendations with investor goals.`
    },
    {
      title: "The Stock-Model Story",
      content: `Our recommendations come from a data-driven model that adjusts to changing conditions—based on solid signals, not hype or trends. 
      At SPI, we blend this challenge with common sense, simplicity, and investment know-how. We start by noting that investors tend to fall into three moves: contrarians, followers, or doing nothing neutral. 
      Then, we pick math models that fit these styles: polynomials, LSTM, and VARX. The SPI approach manages to dynamically create a unique model for each stock, edging close to the max of 500 models for the S&P 500.`
    },
    {
      title: "The Stock-Independence Story",
      content: `Once we pick a stock, we don't flip-flop on a whim. Our confidence comes from data, not media hype. We tolerate short-term ups and downs for the sake of long-term sense. 
      The worst move you can make is selling when a stock dips. The SPI way of picking stocks is all about independence and sticking it out: form your own views, hold firm even if the stock drops—especially if it drops big, because that's when you should buy more. 
      We base conviction on data—not noise. Long-term conviction matters more than short-term volatility.`
    },
    {
      title: "The Stock-Success Story",
      content: `Success depends on perspective; failure is often a decision you make. Alongside our recommended list, we always keep a watchlist—stocks with big potential we're ready to jump on when the timing's right. 
      With every stock pick recommendation at the end of the quarter, we include a watchlist of stocks to buy, designed to catch any model slip-ups. If a stock looks like it's in a never-ending dive, we'll have a solid replacement ready to swap in, keeping your losses low and your portfolio's growth potential steady. 
      Success is relative; failure is often impatience.`
    },
    {
      title: "The Stock-Hunter Story",
      content: `Our philosophy blends patience with power. Like a hunter, we wait for the right moment. Like a steelmaker, we forge stronger positions in downturns. 
      If a stock we believe in drops—we add more. Fire intensifies conviction. This approach requires discipline and long-term thinking, but it's how we build substantial positions in quality companies at attractive prices.`
    },
    {
      title: "The Stock-Anchor Story",
      content: `We create a stock investment portfolio by combining two sub-portfolios: "Anchor & Twin," which can be seen as strategic and tactical components. 
      The anchor portfolio usually includes 5-7 of your favorite or strategic stocks, closely tied to the broader economy, with large-cap companies that carry significant weight in the index—think Apple, Amazon, Google, NVIDIA, Microsoft, and maybe the IVV ETF itself—holding about 15% to 25% of the total portfolio. 
      The twin, or tactical portfolio, reflects your dynamic bets or views on the economy, focusing on overall or pockets of growth, specific sectors, or industries, and is refreshed quarterly with the stocks we recommend.`
    },
    {
      title: "The Stock-Child Story",
      content: `What should you do at the end of each quarter when the new recommended stock list is released? The aim is to: 1) hold the anchor portfolio long-term, 2) trade as little as possible, 3) maximize returns, keep volatility under control, while avoiding steep losses. 
      Treat every stock pick like adopting a child. You don't adopt a child with a clear agenda to give them up shortly later. We expect you to give every stock we recommend a chance (3-6 months). We also expect you to give the stock ideas we share enough time to prove themselves vs. rushing to make judgments. 
      Your job is to be patient, nurturing and to protect each stock in your portfolio when times get tough (for your stocks). We will help, via updated reports, but many times the challenge is to hold on and add more. 
      The worst case for any stock we recommend is -20% to -25%. If a stock is doing much worse, either the whole market is melting down (then everything is moving in the same direction), or we made a mistake (in this case, we will tell you). This approach puts your long-term capital growth ahead of short-term performance.`
    },
    {
      title: "The Stock-Timing Story",
      content: `Stocks don't just move up or down—they dance to different rhythms. The SPI approach captures the 'tempo' of each stock using signatures that tell us how fast it might reach targets or hit stops. 
      When you know how long a stock typically takes to mature or 'ripen,' you can better time your entries and exits. This 'timing signature' helps distinguish between quick wins and long holds, giving you the patience needed for each type of investment.`
    }
  ];

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

        {/* Our Approach Section with Background Image */}
        <section className="mb-20">
          <div 
            className="relative bg-card rounded-lg p-12 border border-border overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${turtleFoxImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-center mb-8 text-white">Our Approach</h2>
              <div className="text-center text-white/80 text-lg">
                <p>...</p>
              </div>
            </div>
          </div>
        </section>

        {/* Research Documents Links */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Research Documents</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center mb-4">
                <FileText className="w-8 h-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-foreground">SPI Stock Stories</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Real-world case studies and practical applications of our SPI methodology
              </p>
              <Button variant="outline" className="w-full" disabled>
                <ExternalLink className="w-4 h-4 mr-2" />
                View Document
                <span className="text-xs ml-2">(Coming Soon)</span>
              </Button>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center mb-4">
                <FileText className="w-8 h-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-foreground">Research Paper #1</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Academic research supporting our quantitative methodology
              </p>
              <Button variant="outline" className="w-full" disabled>
                <ExternalLink className="w-4 h-4 mr-2" />
                View Paper
                <span className="text-xs ml-2">(Coming Soon)</span>
              </Button>
            </div>
            
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="flex items-center mb-4">
                <FileText className="w-8 h-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold text-foreground">Research Paper #2</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Technical analysis and validation of our AI-driven signals
              </p>
              <Button variant="outline" className="w-full" disabled>
                <ExternalLink className="w-4 h-4 mr-2" />
                View Paper
                <span className="text-xs ml-2">(Coming Soon)</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Practical Implications of SPI Implementations */}
        <section className="mb-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Practical Implications of SPI Implementations
            </h2>
            <div className="max-w-6xl mx-auto space-y-4">
              {stories.map((story, index) => (
                <div key={index + 1} className="bg-card/80 backdrop-blur-sm rounded-lg border border-border overflow-hidden">
                  <div 
                    className="p-6 cursor-pointer flex items-center justify-between hover:bg-card/60 transition-colors"
                    onClick={() => toggleStory(index + 1)}
                  >
                    <h3 className="text-2xl font-bold text-primary">{index + 1}. {story.title}</h3>
                    {expandedStories.has(index + 1) ? (
                      <ChevronDown className="w-6 h-6 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="w-6 h-6 text-muted-foreground" />
                    )}
                  </div>
                  {expandedStories.has(index + 1) && (
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground leading-relaxed">
                        {story.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

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
