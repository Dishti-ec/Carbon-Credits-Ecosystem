import { Link } from "react-router";
import { Leaf, ArrowRight, TrendingUp, Trees, DollarSign, LocateFixed, TreePine, Calculator, ShieldCheck, BadgeCheck, FileText, FlaskConical, Satellite, Map, Check, RefreshCw, Clock } from "lucide-react";

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
          <a href="#features" className="hidden md:block text-sm font-medium hover:text-primary transition-colors">Features</a>
          <a href="#calculator" className="hidden md:block text-sm font-medium hover:text-primary transition-colors">Calculation</a>
          <a href="#projects" className="hidden md:block text-sm font-medium hover:text-primary transition-colors">Projects</a>
          <Link to="/login" className="hidden md:block text-sm font-medium hover:text-primary transition-colors">Login</Link>
          <Link to="/app/dashboard" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
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
          <Link to="/login" className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-all flex items-center justify-center gap-2 border border-border">
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

      {/* Projects Section */}
      <section id="projects" className="w-full flex flex-col items-center border-t border-border bg-background">
        {/* Project Hero */}
        <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" alt="Boreal Forest" src="https://lh3.googleusercontent.com/aida/ADBb0ugGAlrbQJiPMrRxuea8zmpf-fecPpQ8pzEUmr6IKBZHcQgpyTrhXhzXFpv38VKRb0I1uWcV0ZJD79m1NxObaGEAFge070T9ob9hCPP3_acWmeXb5SE3iJ7-9nbPnqxKxgcLcns3HFhfw2xTbAAhZTQVWoUrYYvZiPQIJ_Kxs810te8hJSpEPoPzxt7q-vu-xdN4D53ep7Wqg1Uqu1qn_5BpnDUkRIxHNSwNVw9-zJJWok00NtzuW_bb812o3DYCfH6nD3x4Rz-JUQ" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-16 w-full">
            <div className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-md border border-border px-4 py-1.5 rounded-full mb-6 w-fit text-secondary-foreground">
              <BadgeCheck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Registry Verified: VER-2024-089</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 max-w-3xl">Boreal Forest Conservation & Biodiversity Corridor</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">A high-integrity nature-based solution focused on the permanent protection of 145,000 hectares of primary carbon-rich peatlands in the Northern Hemisphere.</p>
          </div>
        </div>

        {/* Project Details Grid */}
        <div className="max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Details & Methodology */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Overview Card */}
              <div className="bg-card/40 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="text-primary w-6 h-6" />
                  <h2 className="text-2xl font-bold text-foreground">Project Narrative</h2>
                </div>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>The Boreal Forest Conservation project serves as a critical carbon sink and biodiversity sanctuary. Situated across the subarctic landscape, this initiative prevents the degradation of ancient peatlands which store three times more carbon per hectare than tropical rainforests.</p>
                  <p>By establishing a legally binding conservation easement, CarbonBridge ensures that this landscape remains untouched by industrial logging or mining operations for the next 100 years, securing a projected sequestration of 1.2M tonnes of CO2e annually.</p>
                </div>
              </div>
              
              {/* Methodology Bento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card/40 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm border-l-4 border-l-secondary">
                  <FlaskConical className="text-secondary w-6 h-6 mb-4" />
                  <h3 className="font-bold text-foreground mb-2">Scientific Methodology</h3>
                  <p className="text-sm text-muted-foreground">Utilizing Lidar-based biomass estimation coupled with ground-truthed soil organic carbon (SOC) sampling protocols established by the IPCC.</p>
                </div>
                <div className="bg-card/40 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-sm border-l-4 border-l-primary">
                  <Satellite className="text-primary w-6 h-6 mb-4" />
                  <h3 className="font-bold text-foreground mb-2">Remote Monitoring</h3>
                  <p className="text-sm text-muted-foreground">Bi-weekly satellite imagery analysis provides real-time alerts for any unauthorized canopy disturbance or landscape changes.</p>
                </div>
              </div>

              {/* Map Integration Placeholder */}
              <div className="bg-card/40 backdrop-blur-xl border border-border rounded-2xl h-[400px] relative overflow-hidden shadow-sm">
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                  <div className="bg-background/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-foreground shadow-sm uppercase tracking-tighter">Live Geospatial Layer</div>
                  <div className="bg-background/90 backdrop-blur p-2 rounded-lg flex flex-col gap-2 shadow-sm border border-border">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-secondary"></div><span className="text-[10px] font-medium text-foreground">Verified Boundary</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary"></div><span className="text-[10px] font-medium text-foreground">Core Sequestration Zone</span></div>
                  </div>
                </div>
                <div className="w-full h-full bg-muted flex items-center justify-center relative">
                  <img className="w-full h-full object-cover opacity-60" alt="Map" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJjxnBDZKyPlnyh7cw_r2UmZlHRPZavG9bwa1mQjVJOJfCD_mkdsezQLhFVrGbfWuIexn5xsJzCJmhzXf8xvkEAyjb6I6gF0UmlZZe8XUJ1_IkhsUiDA2itZxqZSLnX4NOiyEpseI60TOq4-MTI2GbDIb5Qv_xU65qnfVNInzESXEpgfcdLcE-dLbBorInEZBoRXO_gQhXUF8n7tpyFlnYbPZ9mvAe6BmLQBNLmfKSg7U55RvWLP1G9SOMBR8Cqrai2unLKu1N-1U" />
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="bg-background/60 backdrop-blur-xl p-4 rounded-full border border-border shadow-sm">
                      <Map className="text-primary w-8 h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Stats & Timeline */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              {/* Performance Metrics Card */}
              <div className="bg-primary text-primary-foreground rounded-2xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>
                <h3 className="text-sm font-bold mb-8 opacity-80 uppercase tracking-widest">Impact Metrics</h3>
                <div className="space-y-8 relative z-10">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-4xl font-black">1.2M</span>
                      <span className="text-sm opacity-70 mb-1">tCO2e / yr</span>
                    </div>
                    <div className="w-full bg-primary-foreground/20 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full w-[85%]"></div>
                    </div>
                    <p className="text-[10px] mt-2 opacity-60">Annual Emission Reductions (Projected)</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-2xl font-bold">145k</div>
                      <p className="text-[10px] opacity-60 uppercase">Hectares Protected</p>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">A+</div>
                      <p className="text-[10px] opacity-60 uppercase">Integrity Rating</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Timeline */}
              <div className="bg-card/40 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-sm">
                <h3 className="text-sm font-bold text-foreground mb-8 uppercase tracking-widest">Verification Journey</h3>
                <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border">
                  {/* Step 1 */}
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-secondary flex items-center justify-center z-10 border-[3px] border-card">
                      <Check className="text-secondary-foreground w-3 h-3" />
                    </div>
                    <div className="font-bold text-primary text-xs mb-1">June 2023</div>
                    <h4 className="font-bold text-sm text-foreground">Initial Feasibility Audit</h4>
                    <p className="text-xs text-muted-foreground mt-1">Third-party baseline assessment completed by EcoCert International.</p>
                  </div>
                  {/* Step 2 */}
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-secondary flex items-center justify-center z-10 border-[3px] border-card">
                      <Check className="text-secondary-foreground w-3 h-3" />
                    </div>
                    <div className="font-bold text-primary text-xs mb-1">Oct 2023</div>
                    <h4 className="font-bold text-sm text-foreground">Validation Statement</h4>
                    <p className="text-xs text-muted-foreground mt-1">Methodology approval and formal registry listing finalized.</p>
                  </div>
                  {/* Step 3 */}
                  <div className="relative pl-10">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center z-10 border-[3px] border-card">
                      <RefreshCw className="text-primary-foreground w-3 h-3 animate-pulse" />
                    </div>
                    <div className="font-bold text-primary text-xs mb-1">Current Phase</div>
                    <h4 className="font-bold text-sm text-foreground">Verification Round #1</h4>
                    <p className="text-xs text-muted-foreground mt-1">Satellite data reconciliation in progress. Expected issuance in 14 days.</p>
                  </div>
                  {/* Step 4 */}
                  <div className="relative pl-10 opacity-50">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-muted flex items-center justify-center z-10 border-[3px] border-card">
                      <Clock className="text-muted-foreground w-3 h-3" />
                    </div>
                    <div className="font-bold text-muted-foreground text-xs mb-1">Jan 2025</div>
                    <h4 className="font-bold text-sm text-foreground">First Credit Issuance</h4>
                    <p className="text-xs text-muted-foreground mt-1">Minting of inaugural vintage conservation credits.</p>
                  </div>
                </div>
              </div>

              {/* Action Card */}
              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20 flex flex-col gap-4">
                <p className="text-sm text-primary font-medium text-center italic">"Direct institutional funding for this project supports the protection of endemic caribou populations."</p>
                <button className="w-full bg-secondary text-secondary-foreground py-3 rounded-xl font-bold text-sm hover:bg-secondary/90 transition-colors shadow-sm">
                  Download Audit Documents
                </button>
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
