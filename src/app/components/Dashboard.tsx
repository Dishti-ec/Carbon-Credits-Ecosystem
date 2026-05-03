import {
  Leaf,
  TrendingUp,
  Users,
  Factory,
  ArrowUpRight,
  ArrowDownRight,
  Sprout,
  BarChart3,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useUserRole } from "../context/UserProvider";

const baseStatsCards = [
  {
    title: "Total Credits Issued",
    value: "2,45,800",
    change: "+12.5%",
    trend: "up",
    icon: Leaf,
    color: "#2d6a4f",
    bgColor: "#d8f3dc",
  },
  {
    title: "Active Farmers",
    value: "1,28,450",
    change: "+8.3%",
    trend: "up",
    icon: Users,
    color: "#52b788",
    bgColor: "#e8f5e9",
  },
  {
    title: "Compliant Companies",
    value: "847",
    change: "+3.2%",
    trend: "up",
    icon: Factory,
    color: "#40916c",
    bgColor: "#d4e7d0",
  },
  {
    title: "Avg Credit Price",
    value: "INR 1,245",
    change: "-2.1%",
    trend: "down",
    icon: TrendingUp,
    color: "#1b4332",
    bgColor: "#b7e4c7",
  },
];

const creditTrendData = [
  { month: "Jul", issued: 18500, traded: 12400, retired: 3200 },
  { month: "Aug", issued: 21200, traded: 15600, retired: 4100 },
  { month: "Sep", issued: 19800, traded: 14200, retired: 3800 },
  { month: "Oct", issued: 24500, traded: 18900, retired: 5200 },
  { month: "Nov", issued: 22800, traded: 17400, retired: 4600 },
  { month: "Dec", issued: 26100, traded: 20100, retired: 5800 },
  { month: "Jan", issued: 28300, traded: 22500, retired: 6200 },
  { month: "Feb", issued: 31200, traded: 24800, retired: 7100 },
  { month: "Mar", issued: 29800, traded: 23600, retired: 6800 },
];

const sectorData = [
  { name: "Cement", value: 32, color: "#2d6a4f" },
  { name: "Iron & Steel", value: 24, color: "#40916c" },
  { name: "Aluminium", value: 15, color: "#52b788" },
  { name: "Petroleum", value: 18, color: "#74c69d" },
  { name: "Textiles", value: 11, color: "#95d5b2" },
];

const farmingMethodsData = [
  { method: "Agroforestry", credits: 42000 },
  { method: "AWD Rice", credits: 28500 },
  { method: "Cover Crops", credits: 22800 },
  { method: "Biochar", credits: 18200 },
  { method: "Min. Tillage", credits: 15600 },
];

const recentActivities = [
  { type: "credit", message: "1,200 CCCs issued to Tata Steel cluster", time: "2h ago", icon: Leaf },
  { type: "farmer", message: "FPO Rajasthan onboarded 340 new farmers", time: "4h ago", icon: Sprout },
  { type: "audit", message: "ACVA audit completed for ACC Cement", time: "6h ago", icon: BarChart3 },
  { type: "trade", message: "5,800 credits traded on ICM Exchange", time: "8h ago", icon: TrendingUp },
  { type: "farmer", message: "Soil carbon verification in Maharashtra", time: "12h ago", icon: Sprout },
];

export function Dashboard() {
  const { role } = useUserRole();

  let displayedCards = baseStatsCards;

  if (role === "farmer") {
    displayedCards = [
      {
        title: "Total Credits Issued",
        value: "450", // Mock for sum(credits) where farmer_id = auth.uid()
        change: "+15%",
        trend: "up",
        icon: Leaf,
        color: "#2d6a4f",
        bgColor: "#d8f3dc",
      },
      {
        title: "Audit Progress",
        value: "75%",
        change: "Verified",
        trend: "up",
        icon: BarChart3,
        color: "#52b788",
        bgColor: "#e8f5e9",
      },
      baseStatsCards[2], // Compliant Companies
      baseStatsCards[3], // Avg Credit Price
    ];
  } else if (role === "company") {
    displayedCards = [
      {
        title: "Carbon Offset",
        value: "12,450 tCO2e",
        change: "+5.2%",
        trend: "up",
        icon: Leaf,
        color: "#2d6a4f",
        bgColor: "#d8f3dc",
      },
      baseStatsCards[1], // Active Farmers
      baseStatsCards[2], // Compliant Companies
      {
        title: "Market Savings",
        value: "INR 45,200",
        change: "+12.1%",
        trend: "up",
        icon: TrendingUp,
        color: "#1b4332",
        bgColor: "#b7e4c7",
      },
    ];
  }

  return (
    <div className="p-6 space-y-6">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden h-[200px]">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1657348477443-df0e64783d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjBncmVlbiUyMGZpZWxkJTIwYWdyaWN1bHR1cmV8ZW58MXx8fHwxNzcyNzk2NjgzfDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Green fields"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b4332]/90 via-[#1b4332]/60 to-transparent"></div>
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <h1 className="text-white text-2xl mb-1" style={{ fontWeight: 600 }}>
              Indian Carbon Market Dashboard
            </h1>
            <p className="text-white/80 text-sm max-w-lg">
              Bridging industrial compliance, agricultural empowerment, and geospatial verification
              under the Carbon Credit Trading Scheme (CCTS).
            </p>
            <div className="flex gap-3 mt-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                Phase 1 - FY 2026
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                9 Sectors Active
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                45% Emission Target
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedCards.map((card) => (
          <div
            key={card.title}
            className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: card.bgColor }}
              >
                <card.icon className="w-5 h-5" style={{ color: card.color }} />
              </div>
              <span
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                  card.trend === "up"
                    ? "bg-[#d8f3dc] text-[#2d6a4f]"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {card.trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {card.change}
              </span>
            </div>
            <p className="text-2xl mb-1" style={{ fontWeight: 600 }}>{card.value}</p>
            <p className="text-sm text-muted-foreground">{card.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Credit Trends */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base" style={{ fontWeight: 600 }}>Credit Issuance Trends</h3>
              <p className="text-sm text-muted-foreground">Monthly CCC activity overview</p>
            </div>
            <div className="flex gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2d6a4f]"></span> Issued
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#52b788]"></span> Traded
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#95d5b2]"></span> Retired
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={creditTrendData}>
              <defs>
                <linearGradient id="colorIssued" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTraded" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#52b788" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#52b788" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,106,79,0.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#5a6b5a" />
              <YAxis tick={{ fontSize: 12 }} stroke="#5a6b5a" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid rgba(45,106,79,0.15)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="issued" stroke="#2d6a4f" fill="url(#colorIssued)" strokeWidth={2} />
              <Area type="monotone" dataKey="traded" stroke="#52b788" fill="url(#colorTraded)" strokeWidth={2} />
              <Area type="monotone" dataKey="retired" stroke="#95d5b2" fill="transparent" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sector Distribution */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-base mb-1" style={{ fontWeight: 600 }}>Sector Distribution</h3>
          <p className="text-sm text-muted-foreground mb-4">Credits by industrial sector</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={sectorData}
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {sectorData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `${value}%`}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid rgba(45,106,79,0.15)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {sectorData.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }}></span>
                  {s.name}
                </span>
                <span style={{ fontWeight: 500 }}>{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Farming Methods */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-base mb-1" style={{ fontWeight: 600 }}>Carbon Farming Methods</h3>
          <p className="text-sm text-muted-foreground mb-4">Credits generated by practice type</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={farmingMethodsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,106,79,0.1)" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="#5a6b5a" />
              <YAxis type="category" dataKey="method" tick={{ fontSize: 12 }} width={90} stroke="#5a6b5a" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid rgba(45,106,79,0.15)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="credits" fill="#52b788" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-base mb-1" style={{ fontWeight: 600 }}>Recent Activity</h3>
          <p className="text-sm text-muted-foreground mb-4">Latest market & verification events</p>
          <div className="space-y-3">
            {recentActivities.map((activity, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <activity.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
