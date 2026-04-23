import { Link } from "react-router";
import { Leaf, ArrowRight, TrendingUp, Trees, DollarSign, LocateFixed, TreePine, Calculator, ShieldCheck } from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-[Inter,DM_Sans,sans-serif] text-foreground scroll-smooth flex flex-col">
      {/* Navbar for Landing Page */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/60 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-lg font-bold tracking-wide text-foreground">CarbonBridge</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
          <a href="#calculator" className="text-sm font-medium hover:text-primary transition-colors">Calculation</a>
          <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
          <Link to="/dashboard" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
            Go to Dashboard
          </Link>
        </div>
      </nav>

      {/* News Marquee */}
      <div className="bg-primary text-primary-foreground py-2 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex gap-8">
          <span>🚨 Latest: CERC Notifies 2026 Regulations To Formalize India's Carbon Credit Trading Market</span>
          <span>•</span>
          <span>📈 Carbon Market Trends: Cement Sector sets target for 2.8% – 7.6% Phase 1 Reduction</span>
          <span>•</span>
          <span>🌱 Agriculture Update: RS 20,000 Crore Carbon Credit Programme introduced to Boost Farmers' Incomes</span>
          <span>•</span>
          <span>🏭 Obligated entities tracking Scope 1 & Scope 2 Emissions via MRV Plan</span>
          <span>•</span>
          {/* duplicate for seamless sliding */}
          <span>🚨 Latest: CERC Notifies 2026 Regulations To Formalize India's Carbon Credit Trading Market</span>
          <span>•</span>
          <span>📈 Carbon Market Trends: Cement Sector sets target for 2.8% – 7.6% Phase 1 Reduction</span>
          <span>•</span>
          <span>🌱 Agriculture Update: RS 20,000 Crore Carbon Credit Programme introduced to Boost Farmers' Incomes</span>
          <span>•</span>
          <span>🏭 Obligated entities tracking Scope 1 & Scope 2 Emissions via MRV Plan</span>
          <span>•</span>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative pt-24 pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6 border border-border">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            Unified Indian Carbon Market (ICM)
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl text-foreground">
          Bridging the gap between <span className="text-primary">Ecology</span> and <span className="text-primary">Economy</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
          The global imperative to mitigate climate change has transitioned from peripheral CSR to a core economic driver. Join the Carbon Credit Trading Scheme (CCTS) today.
        </p>
        <div className="flex sm:flex-row flex-col gap-4">
          <a href="#features" className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
            Explore Ecosystem <ArrowRight className="w-5 h-5"/>
          </a>
          <Link to="/dashboard" className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-all flex items-center justify-center gap-2 border border-border">
            Login / Register
          </Link>
        </div>
      </header>

      {/* What are Carbon Credits */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl font-bold mb-6">What are Carbon Credits?</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                        A carbon credit serves as a standardized financial instrument, representing the removal or avoidance of one metric tonne of carbon dioxide equivalent (<strong className="text-foreground">CO₂e</strong>) from the atmosphere.
                    </p>
                    <p>
                        These credits function as <em>"pollution permits"</em> within a regulated framework, creating a market price for carbon that incentivizes cost-effective emission reductions. For India, this transition is crystallized in the Carbon Credit Trading Scheme (CCTS).
                    </p>
                    <p>
                        For the corporate sector, carbon credits are essential for managing residual emissions that cannot be eliminated through current technological means, providing stakeholders with audited proof of their decarbonization claims.
                    </p>
                </div>
            </div>
            <div className="bg-card border border-border p-8 rounded-3xl shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-xl">Economic Imperative</h3>
                        <p className="text-sm text-muted-foreground">Competitiveness & Compliance</p>
                    </div>
                </div>
                <ul className="space-y-4 text-sm font-medium text-foreground p-0">
                    <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-primary shrink-0"/> Helps avoid penalizations like the EU's Carbon Border Adjustment Mechanism (CBAM).</li>
                    <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-primary shrink-0"/> Fulfills India’s NDCs targeting a 45% reduction in emission intensity by 2030.</li>
                    <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-primary shrink-0"/> Operationalizes the unified Indian Carbon Market (ICM).</li>
                </ul>
            </div>
        </div>
      </section>

      {/* Process happens & the calculation */}
      <section id="calculator" className="py-20 px-6 bg-secondary/30 border-y border-border w-full">
          <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold mb-4">Carbon Sequestration Calculation</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">Robust, scientifically validated calculation engines for both industrial and nature-based credits to generate "High-Integrity" credits.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                      <div className="w-10 h-10 bg-primary/20 text-primary rounded-lg flex items-center justify-center mb-4">
                          <TreePine className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold mb-2">1. Biomass Estimation</h3>
                      <p className="text-sm text-muted-foreground mb-4">Utilizing allometric equations based on Diameter at Breast Height (DBH) and Total Height (H) to compute Above-Ground Biomass.</p>
                  </div>
                  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                      <div className="w-10 h-10 bg-primary/20 text-primary rounded-lg flex items-center justify-center mb-4">
                          <Calculator className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold mb-2">2. Dry Weight & Content</h3>
                      <p className="text-sm text-muted-foreground mb-4">Accounting for the root system (Total Biomass), multiplying by 0.725 to remove moisture, standardizing Carbon Content at 50% of the dry weight.</p>
                  </div>
                  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
                      <div className="w-10 h-10 bg-primary/20 text-primary rounded-lg flex items-center justify-center mb-4">
                          <DollarSign className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold mb-2">3. CO₂e Conversion</h3>
                      <p className="text-sm text-muted-foreground mb-4">Multiplying the carbon weight by the ratio of molecular weights (44/12) to calculate the final amount of CO₂ sequestered.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* Compliance Cycle & Roles */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">The Compliance Mechanism Cycle</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Obligated entities must adhere to a comprehensive cycle of target setting, monitoring, and verification.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
              <div className="p-6 border border-border rounded-2xl relative overflow-hidden bg-card shadow-sm">
                  <div className="text-5xl font-black text-primary/5 absolute -top-2 -right-2">01</div>
                  <h3 className="font-bold mb-2 relative z-10">Baseline Verification</h3>
                  <p className="text-sm text-muted-foreground relative z-10">Established using FY 2023-24 emissions data as the benchmark.</p>
              </div>
              <div className="p-6 border border-border rounded-2xl relative overflow-hidden bg-card shadow-sm">
                  <div className="text-5xl font-black text-primary/5 absolute -top-2 -right-2">02</div>
                  <h3 className="font-bold mb-2 relative z-10">MRV Plan</h3>
                  <p className="text-sm text-muted-foreground relative z-10">Detailed Monitoring & Verification plan for Scope 1 and Scope 2 emissions.</p>
              </div>
              <div className="p-6 border border-border rounded-2xl relative overflow-hidden bg-card shadow-sm">
                  <div className="text-5xl font-black text-primary/5 absolute -top-2 -right-2">03</div>
                  <h3 className="font-bold mb-2 relative z-10">Audit by ACVA</h3>
                  <p className="text-sm text-muted-foreground relative z-10">Independent auditing by an Accredited Carbon Verification Agency.</p>
              </div>
              <div className="p-6 border border-border rounded-2xl relative overflow-hidden bg-card shadow-sm">
                  <div className="text-5xl font-black text-primary/5 absolute -top-2 -right-2">04</div>
                  <h3 className="font-bold mb-2 relative z-10">Issuance/Surrender</h3>
                  <p className="text-sm text-muted-foreground relative z-10">BEE issues CCCs if target is beaten; otherwise, credits must be purchased.</p>
              </div>
          </div>

          <div className="mt-20">
              <h2 className="text-3xl font-bold mb-8 text-center">Ecosystem Ecosystem Focus</h2>
              <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex gap-4 p-6 bg-card border border-border rounded-2xl shadow-sm">
                      <div className="bg-primary/20 p-3 rounded-lg h-fit text-primary"><Trees className="w-6 h-6"/></div>
                      <div>
                          <h4 className="font-bold text-lg mb-2 text-foreground">Farmer Integration (FPOs)</h4>
                          <p className="text-sm text-muted-foreground">Empowering farmers through land aggregation, agroforestry knowledge transfer, digital KYC onboarding, and Direct Benefit Transfer (DBT) of credit revenue.</p>
                      </div>
                  </div>
                  <div className="flex gap-4 p-6 bg-card border border-border rounded-2xl shadow-sm">
                      <div className="bg-primary/20 p-3 rounded-lg h-fit text-primary"><LocateFixed className="w-6 h-6"/></div>
                      <div>
                          <h4 className="font-bold text-lg mb-2 text-foreground">Geospatial Intelligence</h4>
                          <p className="text-sm text-muted-foreground">Integrated Map Systems leveraging India’s Bhuvan Geoportal (LULC, NDVI) to provide spatial transparency and predictive Carbon Scores.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border bg-card">
          <p>© 2026 CarbonBridge - Indian Carbon Market. All rights reserved.</p>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}} />
    </div>
  );
}
