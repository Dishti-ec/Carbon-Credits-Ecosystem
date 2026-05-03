import {
  Leaf,
  TrendingUp,
  Sprout,
  Factory,
  ArrowUpRight,
  ArrowDownRight,
  Map,
  CheckCircle2,
  AlertCircle,
  Info,
  ArrowRight,
  BookOpen,
  Lightbulb,
  X,
  ChevronRight
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { useUserRole } from "../context/UserProvider";

// --- DUMMY DATA ---

const farmerStats = [
  { title: "Total Credits", value: "12,450", change: "+12%", trend: "up", icon: Leaf, color: "#2d6a4f", bgColor: "#d8f3dc" },
  { title: "Active Farms", value: "5", change: "+1", trend: "up", icon: Sprout, color: "#52b788", bgColor: "#e8f5e9" },
  { title: "Monthly Growth", value: "12%", change: "+2.4%", trend: "up", icon: TrendingUp, color: "#40916c", bgColor: "#d4e7d0" },
  { title: "Estimated Earnings", value: "₹32,000", change: "+8%", trend: "up", icon: TrendingUp, color: "#1b4332", bgColor: "#b7e4c7" },
];

const companyStats = [
  { title: "Credits Purchased", value: "8,500", change: "+15%", trend: "up", icon: Leaf, color: "#2d6a4f", bgColor: "#d8f3dc" },
  { title: "Compliance Status", value: "Compliant", change: "Verified", trend: "up", icon: CheckCircle2, color: "#52b788", bgColor: "#e8f5e9" },
  { title: "Carbon Offset Impact", value: "12,000t", change: "+5%", trend: "up", icon: Factory, color: "#40916c", bgColor: "#d4e7d0" },
  { title: "Cost Savings", value: "₹54,000", change: "+12%", trend: "up", icon: TrendingUp, color: "#1b4332", bgColor: "#b7e4c7" },
];

const publicStats = [
  { title: "Market Volume", value: "245k", change: "+18%", trend: "up", icon: TrendingUp, color: "#2d6a4f", bgColor: "#d8f3dc" },
  { title: "Active Projects", value: "1,204", change: "+45", trend: "up", icon: Leaf, color: "#52b788", bgColor: "#e8f5e9" },
  { title: "Registered Entities", value: "847", change: "+12", trend: "up", icon: Factory, color: "#40916c", bgColor: "#d4e7d0" },
  { title: "Avg Credit Price", value: "₹1,245", change: "-2%", trend: "down", icon: TrendingUp, color: "#1b4332", bgColor: "#b7e4c7" },
];

const creditTrends = [
  { month: "Jan", credits: 1000 },
  { month: "Feb", credits: 2000 },
  { month: "Mar", credits: 3500 },
  { month: "Apr", credits: 5000 },
  { month: "May", credits: 7000 },
];

const sectorData = [
  { name: "Agriculture", value: 40, color: "#2d6a4f" },
  { name: "Energy", value: 25, color: "#40916c" },
  { name: "Transport", value: 20, color: "#52b788" },
  { name: "Others", value: 15, color: "#74c69d" },
];

const alertsData = [
  { type: "urgent", text: "Compliance deadline approaching in 5 days", icon: AlertCircle, color: "text-red-600", bg: "bg-red-50" },
  { type: "warning", text: "New high-yield farmland listing available", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
  { type: "info", text: "Government subsidy announced for agroforestry", icon: Info, color: "text-blue-600", bg: "bg-blue-50" },
];

const aiTips = [
  "You can increase your carbon credits by 15% using mixed cropping techniques.",
  "Switch to organic fertilizers to boost soil carbon retention significantly.",
  "Partner with verified companies to ensure higher credit returns on the market.",
];

const farms = [
  { name: "Farm A - Wheat & Mustard", credits: 1200 },
  { name: "Farm B - Rice AWD", credits: 800 },
];

// --- SUB-COMPONENTS ---

function SnapshotCard({ title, desc, icon: Icon, link }: { title: string, desc: string, icon: any, link: string }) {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group flex flex-col justify-between h-full">
      <div>
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm mb-6">{desc}</p>
      </div>
      <Link to={link} className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
        View More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

function FloatingAIPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % aiTips.length);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-card border border-border rounded-2xl shadow-2xl p-5 mb-2 animate-in slide-in-from-bottom-4 fade-in">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-primary font-bold">
              <Lightbulb className="w-5 h-5 fill-primary/20" />
              <span>Smart Suggestion</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:bg-muted p-1 rounded-md transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-foreground/90 mb-5 leading-relaxed">
            "{aiTips[tipIndex]}"
          </p>
          <div className="flex items-center gap-2">
            <button className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              Apply Insight
            </button>
            <button onClick={nextTip} className="px-3 py-2 bg-muted text-muted-foreground hover:text-foreground rounded-lg text-sm font-medium transition-colors">
              Next Tip
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:scale-105 hover:bg-primary/90 transition-all relative group"
      >
        <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping group-hover:hidden"></span>
        <Lightbulb className="w-6 h-6 relative z-10" />
      </button>
    </div>
  );
}

// --- MAIN DASHBOARD LAYOUT ---

export function Dashboard() {
  const { role, fullName } = useUserRole();
  const stats = role === "farmer" ? farmerStats : role === "company" ? companyStats : publicStats;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1400px] mx-auto pb-28 relative font-[Inter,DM_Sans,sans-serif]">
      {/* 1. INTRO HEADER */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 text-foreground">
          {role === "farmer"
            ? `Welcome back, ${fullName?.split(" ")[0] || "Farmer"} 🌱`
            : role === "company"
            ? `Enterprise Dashboard: ${fullName || "Company"} 🏭`
            : "Market Overview 🌍"}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-muted-foreground text-lg">
            {role === "farmer"
              ? "Here's your carbon impact overview."
              : role === "company"
              ? "Track your sustainability performance and compliance."
              : "Global carbon market analytics and trading summary."}
          </p>
          <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground bg-card px-4 py-2 rounded-xl border border-border shadow-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Active
            </span>
            <span className="text-border">|</span>
            <span>Last updated: Today</span>
          </div>
        </div>
      </div>

      {/* 2. STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
        {stats.map((card) => (
          <div
            key={card.title}
            className="bg-card rounded-2xl border border-border p-5 md:p-6 shadow-sm hover:shadow-md hover:border-primary/20 hover:-translate-y-1 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: card.bgColor }}
              >
                <card.icon className="w-6 h-6" style={{ color: card.color }} />
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                  card.trend === "up" ? "bg-[#d8f3dc] text-[#2d6a4f]" : "bg-red-50 text-red-600"
                }`}
              >
                {card.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {card.change}
              </span>
            </div>
            <p className="text-3xl font-bold tracking-tight mb-1 text-foreground">{card.value}</p>
            <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
          </div>
        ))}
      </div>

      {/* 3. VISUAL ANALYTICS */}
      <div className="grid grid-cols-1 xl:grid-cols-10 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
        {/* Line Chart */}
        <div className="xl:col-span-7 bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground">Carbon Credit Trends</h3>
            <p className="text-sm text-muted-foreground">Monthly credit generation and volume</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={creditTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#888" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#888" }} axisLine={false} tickLine={false} />
              <RechartsTooltip
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }}
              />
              <Area type="monotone" dataKey="credits" stroke="#2d6a4f" strokeWidth={3} fill="url(#colorCredits)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="xl:col-span-3 bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col">
          <div className="mb-2">
            <h3 className="text-xl font-bold text-foreground">Sector Distribution</h3>
            <p className="text-sm text-muted-foreground">Credits by industry</p>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={sectorData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(value: number) => `${value}%`}
                  contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-4 px-2">
              {sectorData.map((s) => (
                <div key={s.name} className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: s.color }}></span>
                  <span className="truncate text-muted-foreground font-medium">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. FEATURE SNAPSHOTS */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
        <h2 className="text-xl font-bold mb-4 px-1 text-foreground">Platform Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <SnapshotCard title="Map Overview" desc="Explore active carbon zones" icon={Map} link="/app/map" />
          <SnapshotCard title="Companies" desc="View compliance entities" icon={Factory} link="/app/companies" />
          <SnapshotCard title="Farmlands" desc="Browse active projects" icon={Sprout} link="/app/farmlands" />
        </div>
      </div>

      {/* 5 & 6. ALERTS & EDUCATION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400 fill-mode-both">
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-foreground">Latest Updates</h2>
            <Link to="/app/alerts" className="text-sm font-medium text-primary hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {alertsData.map((alert, i) => (
              <div key={i} className={`flex items-start gap-3 p-4 rounded-xl border border-border/50 ${alert.bg} transition-colors`}>
                <alert.icon className={`w-5 h-5 shrink-0 mt-0.5 ${alert.color}`} />
                <p className="text-sm font-medium text-foreground/90">{alert.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-foreground">Education Hub</h2>
            <Link to="/app/education" className="text-sm font-medium text-primary hover:underline">Browse Courses</Link>
          </div>
          <div className="flex-1 border border-border rounded-xl p-5 bg-gradient-to-br from-card to-muted/30">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-2">
              {role === "farmer" ? "Agroforestry for Carbon Credits" : "CCTS Compliance Framework"}
            </h3>
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2 text-muted-foreground font-medium">
                <span>Progress</span>
                <span>40%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                <div className="bg-primary h-2.5 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
            <Link to="/app/education" className="inline-flex items-center justify-center w-full bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              Continue Learning
            </Link>
          </div>
        </div>
      </div>

      {/* 7 & 8. PORTFOLIO / COMPLIANCE */}
      {(role === "farmer" || role === "company") && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-500 fill-mode-both">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-xl font-bold text-foreground">
              {role === "farmer" ? "Portfolio Preview" : "Compliance Snapshot"}
            </h2>
          </div>
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
            {role === "farmer" ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  {farms.map((farm, i) => (
                    <div key={i} className="p-4 border border-border rounded-xl flex justify-between items-center bg-muted/20">
                      <div>
                        <p className="font-bold text-foreground">{farm.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1"><Leaf className="w-3 h-3 text-primary"/> {farm.credits} Credits</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                <Link to="/app/portfolio" className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-2.5 bg-secondary text-secondary-foreground border border-border rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors">
                  View Full Portfolio <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-1 bg-muted/30 p-5 rounded-xl border border-border flex items-center justify-between w-full">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">Credits Used</p>
                    <p className="text-2xl font-bold text-foreground">5,000 <span className="text-sm font-normal text-muted-foreground">tCO2e</span></p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Factory className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1 bg-green-50 p-5 rounded-xl border border-green-100 flex items-center justify-between w-full">
                  <div>
                    <p className="text-sm text-green-700 font-medium mb-1">Current Status</p>
                    <p className="text-2xl font-bold text-green-800 flex items-center gap-2"><CheckCircle2 className="w-6 h-6"/> Compliant</p>
                  </div>
                </div>
                <div className="w-full sm:w-auto">
                  <Link to="/app/compliance" className="inline-flex items-center justify-center w-full px-6 py-3 bg-secondary text-secondary-foreground border border-border rounded-xl text-sm font-medium hover:bg-secondary/80 transition-colors">
                    View Reports <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 9. FLOATING AI PANEL */}
      <FloatingAIPanel />
    </div>
  );
}
