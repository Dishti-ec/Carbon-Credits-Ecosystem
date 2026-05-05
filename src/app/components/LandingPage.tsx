import React from "react";
import { Link } from "react-router";
import { Leaf, ArrowRight, TrendingUp, Trees, DollarSign, LocateFixed, TreePine, Calculator, ShieldCheck, BadgeCheck, FileText, FlaskConical, Satellite, Map, Check, RefreshCw, Clock, Target, Users, Search, Globe } from "lucide-react";

export function LandingPage() {
  const heroBg = new URL(
    "../../assets/images/Landing_Page-header.jpeg",
    import.meta.url,
  ).toString();
  const cmcBg = new URL(
    "../../assets/images/Landing_Page_CMC-bg.png",
    import.meta.url,
  ).toString();

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
          <a href="#about-us" className="hidden md:block text-sm font-medium hover:text-primary transition-colors">About Us</a>
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
      <header className="relative pt-24 pb-32 px-6 flex flex-col items-start justify-start text-left overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          {/* Subtle contrast for readability without “glass” */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />
        </div>
        <div className="relative z-10 max-w-2xl w-full pt-10 md:pt-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 text-white text-sm font-medium mb-6 border border-white/20">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            Unified Indian Carbon Market (ICM)
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.45)]">
            Bridging the gap between <span className="text-primary">Ecology</span> and <span className="text-primary">Economy</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-xl mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
            The global imperative to mitigate climate change has transitioned from peripheral CSR to a core economic driver. Join the Carbon Credit Trading Scheme (CCTS) today.
          </p>
          <div className="flex sm:flex-row flex-col gap-4">
            <a href="#features" className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
              Explore Ecosystem <ArrowRight className="w-5 h-5"/>
            </a>
            <Link to="/login" className="px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/15 transition-all flex items-center justify-center gap-2 border border-white/25">
              Login / Register
            </Link>
          </div>
        </div>
      </header>

      {/* How Carbon Credits Work - Refined High Fidelity Section */}
      <section id="about" className="py-28 px-6 w-full bg-[#fdfdfd] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider border border-emerald-100 mb-6 shadow-sm">
              <Leaf className="w-3.5 h-3.5" />
              Carbon Credits 101
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#1a4332] mb-4 tracking-tight">
              How Carbon Credits Work
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto">
              A simple 4-step cycle driving climate action
            </p>
            <div className="flex items-center gap-4 mt-8">
              <div className="w-12 h-[1px] bg-emerald-200"></div>
              <Leaf className="w-5 h-5 text-emerald-700/40" />
              <div className="w-12 h-[1px] bg-emerald-200"></div>
            </div>
          </div>

          {/* The Loop Container */}
          <div className="relative max-w-5xl mx-auto pt-6 pb-20 px-8">
            {/* The Track (Continuous Loop) */}
            <div className="absolute inset-0 border-[32px] border-emerald-50 rounded-[150px] -z-10 shadow-[inset_0_4px_12px_rgba(0,0,0,0.03)]"></div>
            
            {/* Top Dark Segment (Unified with Loop) */}
            <div className="absolute -top-[32px] left-0 right-0 h-[70px] bg-[#1a4332] rounded-t-[150px] flex items-center justify-between px-20 text-white text-[11px] font-black tracking-[0.25em] z-20 shadow-lg">
              <div className="flex items-center gap-4">
                <span className="bg-white text-[#1a4332] w-6 h-6 rounded-full flex items-center justify-center text-[10px]">01</span>
                MEASURE
              </div>
              <ArrowRight className="w-4 h-4 text-white/30" />
              <div className="flex items-center gap-4">
                <span className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px]">02</span>
                REDUCE
              </div>
              <ArrowRight className="w-4 h-4 text-white/30" />
              <div className="flex items-center gap-4">
                <span className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px]">03</span>
                VERIFY
              </div>
              <ArrowRight className="w-4 h-4 text-white/30" />
              <div className="flex items-center gap-4">
                <span className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px]">04</span>
                ISSUE & TRADE
              </div>
            </div>

            {/* Decorative Icons on curves */}
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white border-[7px] border-[#1a4332] flex items-center justify-center text-[#1a4332] shadow-xl z-30">
              <Leaf className="w-6 h-6 fill-[#1a4332]" />
            </div>
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white border-[7px] border-emerald-50 flex items-center justify-center text-emerald-300 shadow-xl z-30">
              <TrendingUp className="w-6 h-6" />
            </div>

            {/* Steps Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-24 relative z-10">
              {/* Step 1: Measure */}
              <div className="flex flex-col items-center text-center px-4">
                <div className="relative mb-8 group">
                  <div className="w-24 h-24 rounded-3xl bg-emerald-50/30 flex items-center justify-center border border-emerald-100/50 group-hover:bg-emerald-50 transition-colors shadow-sm">
                    <div className="relative">
                      <Calculator className="w-12 h-12 text-emerald-800/80" />
                      <Search className="absolute -bottom-1 -right-1 w-5 h-5 text-emerald-900 bg-white rounded-full p-0.5 border border-emerald-100 shadow-sm" />
                    </div>
                  </div>
                </div>
                <div className="w-7 h-[2px] bg-emerald-100 mb-5"></div>
                <p className="text-[14px] font-bold text-slate-500 leading-relaxed max-w-[170px]">
                  Measure emissions to establish a baseline.
                </p>
              </div>

              {/* Step 2: Reduce */}
              <div className="flex flex-col items-center text-center px-4 border-l border-slate-100/50">
                <div className="relative mb-8 group">
                  <div className="w-24 h-24 rounded-3xl bg-emerald-50/30 flex items-center justify-center border border-emerald-100/50 group-hover:bg-emerald-50 transition-colors shadow-sm">
                    <div className="relative">
                      <FileText className="w-12 h-12 text-emerald-800/80" />
                      <Leaf className="absolute -bottom-1 -right-1 w-5 h-5 text-emerald-600 bg-white rounded-full p-0.5 border border-emerald-100 shadow-sm" />
                    </div>
                  </div>
                </div>
                <div className="w-7 h-[2px] bg-emerald-100 mb-5"></div>
                <p className="text-[14px] font-bold text-slate-500 leading-relaxed max-w-[170px]">
                  Implement actions to reduce emissions.
                </p>
              </div>

              {/* Step 3: Verify */}
              <div className="flex flex-col items-center text-center px-4 border-l border-slate-100/50">
                <div className="relative mb-8 group">
                  <div className="w-24 h-24 rounded-3xl bg-emerald-50/30 flex items-center justify-center border border-emerald-100/50 group-hover:bg-emerald-50 transition-colors shadow-sm">
                    <ShieldCheck className="w-12 h-12 text-emerald-800/80" />
                  </div>
                </div>
                <div className="w-7 h-[2px] bg-emerald-100 mb-5"></div>
                <p className="text-[14px] font-bold text-slate-500 leading-relaxed max-w-[170px]">
                  Independent third parties verify the emissions reductions.
                </p>
              </div>

              {/* Step 4: Issue & Trade */}
              <div className="flex flex-col items-center text-center px-4 border-l border-slate-100/50">
                <div className="relative mb-8 group">
                  <div className="w-24 h-24 rounded-3xl bg-emerald-50/30 flex items-center justify-center border border-emerald-100/50 group-hover:bg-emerald-50 transition-colors shadow-sm">
                    <div className="relative">
                      <FileText className="w-12 h-12 text-emerald-800/80" />
                      <BadgeCheck className="absolute -bottom-1 -right-1 w-6 h-6 text-emerald-600 bg-white rounded-full border border-emerald-100 shadow-sm" />
                    </div>
                  </div>
                </div>
                <div className="w-7 h-[2px] bg-emerald-100 mb-5"></div>
                <p className="text-[14px] font-bold text-slate-500 leading-relaxed max-w-[170px]">
                  Verified reductions are issued as credits and can be traded.
                </p>
              </div>
            </div>

            {/* Bottom Summary Bubble (Sits on Loop Track) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[95%] md:w-[620px] z-40">
              <div className="bg-white border border-emerald-50 rounded-[40px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-[#1a4332] text-white flex items-center justify-center shrink-0 shadow-lg">
                  <RefreshCw className="w-7 h-7 animate-spin-slow" />
                </div>
                <p className="text-sm font-bold text-[#1a4332] leading-snug">
                  A transparent cycle that turns climate commitment into real, measurable impact.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Badges */}
          <div className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-all shadow-sm border border-emerald-100">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] group-hover:text-emerald-900 transition-colors">Drives real climate impact</span>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-all shadow-sm border border-emerald-100">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] group-hover:text-emerald-900 transition-colors">Supports net zero goals</span>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-all shadow-sm border border-emerald-100">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] group-hover:text-emerald-900 transition-colors">Creates market value</span>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-all shadow-sm border border-emerald-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] group-hover:text-emerald-900 transition-colors">Builds a sustainable future</span>
            </div>
          </div>
        </div>
      </section>

      {/* Process happens & the calculation — Roadmap visual matching supplied image */}
      <section id="calculator" className="py-20 px-6 bg-[#fbfff9] w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">How Carbon Credits Are Calculated</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">From tree growth to carbon credits — a simple, science-backed process.</p>
          </div>

          <div className="relative mt-12 pt-10 pb-16">
            <div className="relative max-w-6xl mx-auto">
              {/* Central vertical track */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-2 md:w-3 bg-gradient-to-b from-emerald-400 to-emerald-200 rounded-full shadow-inner" aria-hidden />

              {/* Zig-zag steps - responsive: stacked on small screens, alternating on md+ */}
              <div className="flex flex-col gap-12 mt-6">
                {/* Step 1 - left */}
                <div className="flex w-full items-center md:justify-start justify-center">
                  <div className="flex items-center gap-6 max-w-lg md:pl-6">
                    <div className="flex-shrink-0 z-20">
                      <div className="w-14 h-14 rounded-full bg-white border-4 border-emerald-500 text-emerald-700 flex items-center justify-center font-bold">1</div>
                    </div>
                    <div className="bg-white/95 p-5 rounded-2xl shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-700"><TreePine className="w-4 h-4"/></div>
                        <h4 className="font-bold">Measure Tree Growth</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Measure tree size (DBH, height).</p>
                    </div>
                  </div>
                </div>

                {/* Step 2 - right */}
                <div className="flex w-full items-center md:justify-end justify-center">
                  <div className="flex items-center gap-6 max-w-lg md:pr-6">
                    <div className="bg-white/95 p-5 rounded-2xl shadow-md text-right">
                      <div className="flex items-center justify-end gap-3">
                        <h4 className="font-bold">Estimate Biomass</h4>
                        <div className="w-10 h-10 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-700"><Trees className="w-4 h-4"/></div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Calculate the total organic mass.</p>
                    </div>
                    <div className="flex-shrink-0 z-20">
                      <div className="w-14 h-14 rounded-full bg-white border-4 border-emerald-500 text-emerald-700 flex items-center justify-center font-bold">2</div>
                    </div>
                  </div>
                </div>

                {/* Step 3 - left */}
                <div className="flex w-full items-center md:justify-start justify-center">
                  <div className="flex items-center gap-6 max-w-lg md:pl-6">
                    <div className="flex-shrink-0 z-20">
                      <div className="w-14 h-14 rounded-full bg-white border-4 border-emerald-500 text-emerald-700 flex items-center justify-center font-bold">3</div>
                    </div>
                    <div className="bg-white/95 p-5 rounded-2xl shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-700"><FileText className="w-4 h-4"/></div>
                        <h4 className="font-bold">Dry Weight</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Remove moisture to get dry biomass.</p>
                    </div>
                  </div>
                </div>

                {/* Step 4 - right */}
                <div className="flex w-full items-center md:justify-end justify-center">
                  <div className="flex items-center gap-6 max-w-lg md:pr-6">
                    <div className="bg-white/95 p-5 rounded-2xl shadow-md text-right">
                      <div className="flex items-center justify-end gap-3">
                        <h4 className="font-bold">Calculate Carbon</h4>
                        <div className="w-10 h-10 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-700"><Leaf className="w-4 h-4"/></div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">About 50% of the dry biomass is carbon.</p>
                    </div>
                    <div className="flex-shrink-0 z-20">
                      <div className="w-14 h-14 rounded-full bg-white border-4 border-emerald-500 text-emerald-700 flex items-center justify-center font-bold">4</div>
                    </div>
                  </div>
                </div>

                {/* Step 5 - left */}
                <div className="flex w-full items-center md:justify-start justify-center">
                  <div className="flex items-center gap-6 max-w-lg md:pl-6">
                    <div className="flex-shrink-0 z-20">
                      <div className="w-14 h-14 rounded-full bg-white border-4 border-emerald-500 text-emerald-700 flex items-center justify-center font-bold">5</div>
                    </div>
                    <div className="bg-white/95 p-5 rounded-2xl shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-700"><Globe className="w-4 h-4"/></div>
                        <h4 className="font-bold">Convert to CO₂e</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Convert stored carbon to CO₂ equivalent.</p>
                    </div>
                  </div>
                </div>

                {/* Step 6 - right */}
                <div className="flex w-full items-center md:justify-end justify-center">
                  <div className="flex items-center gap-6 max-w-lg md:pr-6">
                    <div className="bg-white/95 p-5 rounded-2xl shadow-md text-right">
                      <div className="flex items-center justify-end gap-3">
                        <h4 className="font-bold">Generate Credits</h4>
                        <div className="w-10 h-10 rounded-md bg-emerald-50 flex items-center justify-center text-emerald-700"><BadgeCheck className="w-4 h-4"/></div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">1 Carbon Credit = 1 ton of CO₂ removed.</p>
                    </div>
                    <div className="flex-shrink-0 z-20">
                      <div className="w-14 h-14 rounded-full bg-white border-4 border-emerald-500 text-emerald-700 flex items-center justify-center font-bold">6</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom mini legend */}
              <div className="mt-10 pt-6 mb-24">
                <div className="mx-auto max-w-3xl relative z-40 bg-white border border-emerald-50 rounded-3xl px-6 py-6 shadow-sm flex items-center justify-between gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center"><Leaf className="w-5 h-5"/></div>
                    <div>
                      <div className="text-sm font-bold text-foreground">Tree Growth</div>
                      <div className="text-xs text-muted-foreground">→ Biomass → Dry Weight → Carbon → CO₂e → Credits</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">From measurement to tradable credits — science-backed.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Cycle & Roles */}
      <section id="features" className="relative py-20 px-6 w-full overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src={cmcBg}
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover opacity-100"
            />
            <div className="absolute inset-0 z-10 bg-transparent pointer-events-none" />
          </div>

          <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">The Compliance Mechanism Cycle</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Obligated entities must adhere to a comprehensive cycle of target setting, monitoring, and verification.</p>
          </div>

          <div className="relative">
            {/* subtle background wash removed to reveal background image */}
            <div className="absolute inset-0 -z-10 bg-transparent rounded-[40px]" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 place-items-center">
              {/* Step 01 */}
              <div className="relative w-[260px]">
                <div
                  className="relative mx-auto h-[240px] w-[240px] rounded-full p-[10px] shadow-sm"
                  style={{
                    background:
                      "conic-gradient(from 210deg, rgba(34,197,94,0.95) 0 80deg, rgba(34,197,94,0.18) 80deg 360deg)",
                  }}
                >
                  <div className="relative h-full w-full rounded-full bg-card/90 backdrop-blur border border-border flex flex-col items-center justify-center text-center px-6">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-bold border border-primary/30 shadow-sm">
                      01
                    </div>
                    <div className="w-14 h-14 rounded-full bg-primary/15 text-primary flex items-center justify-center mb-4">
                      <FileText className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-sm text-foreground">Baseline Verification</h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      Established using FY 2023-24 emissions data as the benchmark.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 02 */}
              <div className="relative w-[260px]">
                <div
                  className="relative mx-auto h-[240px] w-[240px] rounded-full p-[10px] shadow-sm"
                  style={{
                    background:
                      "conic-gradient(from 210deg, rgba(34,197,94,0.95) 0 115deg, rgba(34,197,94,0.18) 115deg 360deg)",
                  }}
                >
                  <div className="relative h-full w-full rounded-full bg-card/90 backdrop-blur border border-border flex flex-col items-center justify-center text-center px-6">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-bold border border-primary/30 shadow-sm">
                      02
                    </div>
                    <div className="w-14 h-14 rounded-full bg-primary/15 text-primary flex items-center justify-center mb-4">
                      <Satellite className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-sm text-foreground">MRV Plan</h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      Detailed Monitoring & Verification plan for Scope 1 and Scope 2 emissions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 03 */}
              <div className="relative w-[260px]">
                <div
                  className="relative mx-auto h-[240px] w-[240px] rounded-full p-[10px] shadow-sm"
                  style={{
                    background:
                      "conic-gradient(from 210deg, rgba(34,197,94,0.95) 0 155deg, rgba(34,197,94,0.18) 155deg 360deg)",
                  }}
                >
                  <div className="relative h-full w-full rounded-full bg-card/90 backdrop-blur border border-border flex flex-col items-center justify-center text-center px-6">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-bold border border-primary/30 shadow-sm">
                      03
                    </div>
                    <div className="w-14 h-14 rounded-full bg-primary/15 text-primary flex items-center justify-center mb-4">
                      <ShieldCheck className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-sm text-foreground">Audit by ACVA</h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      Independent auditing by an Accredited Carbon Verification Agency.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 04 */}
              <div className="relative w-[260px]">
                <div
                  className="relative mx-auto h-[240px] w-[240px] rounded-full p-[10px] shadow-sm"
                  style={{
                    background:
                      "conic-gradient(from 210deg, rgba(34,197,94,0.95) 0 200deg, rgba(34,197,94,0.18) 200deg 360deg)",
                  }}
                >
                  <div className="relative h-full w-full rounded-full bg-card/90 backdrop-blur border border-border flex flex-col items-center justify-center text-center px-6">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-bold border border-primary/30 shadow-sm">
                      04
                    </div>
                    <div className="w-14 h-14 rounded-full bg-primary/15 text-primary flex items-center justify-center mb-4">
                      <BadgeCheck className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-sm text-foreground">Issuance / Surrender</h3>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      BEE issues CCCs if target is beaten; otherwise, credits must be purchased.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 mx-auto max-w-2xl">
              <div className="bg-card/80 backdrop-blur border border-border rounded-2xl px-6 py-4 text-center shadow-sm">
                <p className="text-sm text-muted-foreground">
                  A transparent cycle ensuring accountability, accuracy, and environmental integrity.
                </p>
              </div>
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
          </div>
      </section>

      {/* About Us */}
      <section id="about-us" className="w-full border-t border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold uppercase tracking-widest border border-border">
              Meet the Team
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-foreground">MEET THE TEAM</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              The minds behind CarbonBridge—designing a clear, trustworthy experience for the Indian Carbon Market ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Dishti */}
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-5">
                <div className="h-20 w-20 rounded-full border-2 border-primary/30 bg-primary/10 flex items-center justify-center text-primary font-black text-2xl">
                  D
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    The Mind Behind the Website
                  </p>
                  <h3 className="text-2xl font-extrabold text-foreground mt-1">Dishti</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Product vision, information architecture, and overall experience design.
                  </p>
                </div>
              </div>
            </div>

            {/* Nand */}
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-5">
                <div className="h-20 w-20 rounded-full border-2 border-primary/30 bg-primary/10 flex items-center justify-center text-primary font-black text-2xl">
                  N
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    The Eyes Infront of Website
                  </p>
                  <h3 className="text-2xl font-extrabold text-foreground mt-1">Nand</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Front-end execution, visual polish, and ensuring every screen feels effortless.
                  </p>
                </div>
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
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .clip-path-left {
          clip-path: inset(0 50% 0 0);
        }
      `}} />
    </div>
  );
}