import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  Bell,
  Camera,
  ChevronRight,
  FileUp,
  GraduationCap,
  Leaf,
  MapPin,
  Sprout,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link } from "react-router";
import { useUserRole } from "../context/UserProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type WalletTab = "available" | "pending" | "sold" | "history";
type TrendMetric = "credits" | "earnings" | "co2";

type CreditStatus = "verified" | "pending" | "rejected";
type TransactionKind = "earned" | "sold" | "payment_received" | "payment_pending";

interface WalletEntry {
  id: string;
  date: string;
  title: string;
  deltaCredits?: number;
  deltaRupees?: number;
  status?: CreditStatus;
  kind: TransactionKind;
  note?: string;
}

interface ProjectCard {
  id: string;
  title: string;
  status: "Active" | "Completed";
  creditsGenerated: number;
  start: string;
  end?: string;
  progress: number; // 0-100
}

interface ActivityEvent {
  id: string;
  title: string;
  date: string;
  status: "Verified" | "Pending" | "Rejected";
  note?: string;
}

const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export function FarmerPortfolio() {
  const { fullName } = useUserRole();
  const [walletTab, setWalletTab] = useState<WalletTab>("available");
  const [metric, setMetric] = useState<TrendMetric>("credits");

  const colors = {
    page: "#0B1220",
    card: "#111827",
    border: "#1F2937",
    text: "#E5E7EB",
    subtext: "#9CA3AF",
    green: "#16A34A",
    blue: "#2563EB",
    amber: "#F59E0B",
    red: "#EF4444",
  } as const;

  // --- Mock Portfolio Overview ---
  const totals = {
    totalCreditsEarned: 12450,
    creditsSold: 2980,
    creditsAvailable: 320,
    creditsLocked: 80,
    totalEarnings: 24500,
    earningsChangePct: 18,
    activeProjects: 3,
  };

  const farmProfile = {
    sizeAcres: 7.5,
    crops: ["Wheat", "Mustard", "Pulses"],
    location: "Punjab (Ludhiana region)",
    practices: ["Organic", "Drip irrigation", "Mulching"],
  };

  const trendData = [
    { month: "Jan", credits: 140, earnings: 2400, co2: 1.6 },
    { month: "Feb", credits: 180, earnings: 3100, co2: 2.1 },
    { month: "Mar", credits: 220, earnings: 3800, co2: 2.6 },
    { month: "Apr", credits: 260, earnings: 4400, co2: 3.2 },
    { month: "May", credits: 320, earnings: 5200, co2: 3.9 },
  ];

  const trendMeta: Record<TrendMetric, { label: string; unit: string; color: string }> = {
    credits: { label: "Credits", unit: "credits", color: colors.green },
    earnings: { label: "Earnings", unit: "₹", color: colors.blue },
    co2: { label: "CO₂ Reduced", unit: "tonnes", color: colors.amber },
  };

  const yoyChange = { value: 12.4, label: "+12.4% improvement from last season" };

  const walletEntries: WalletEntry[] = [
    { id: "w1", date: "2026-05-01", title: "Agroforestry Project", deltaCredits: 120, status: "verified", kind: "earned", note: "Verified ✅" },
    { id: "w2", date: "2026-04-20", title: "Soil Carbon Check", deltaCredits: 80, status: "pending", kind: "earned", note: "Verification pending ⏳" },
    { id: "w3", date: "2026-04-10", title: "Sold Credits", deltaCredits: -50, deltaRupees: 5000, status: "verified", kind: "sold", note: "Sold → payment settled" },
    { id: "w4", date: "2026-03-28", title: "Payment Received", deltaRupees: 4200, kind: "payment_received", note: "UPI payout completed" },
    { id: "w5", date: "2026-03-16", title: "Payment Pending", deltaRupees: 1800, kind: "payment_pending", note: "Expected in 2–3 days" },
    { id: "w6", date: "2026-03-10", title: "Field Evidence Review", deltaCredits: 20, status: "rejected", kind: "earned", note: "Need clearer geo-tagged photo ❌" },
  ];

  const projects: ProjectCard[] = [
    { id: "p1", title: "🌳 Agroforestry Project", status: "Active", creditsGenerated: 120, start: "Jan 2026", progress: 70 },
    { id: "p2", title: "🌱 Soil Carbon Program", status: "Active", creditsGenerated: 80, start: "Feb 2026", progress: 55 },
    { id: "p3", title: "♻️ Regenerative Practices", status: "Completed", creditsGenerated: 210, start: "Aug 2025", end: "Dec 2025", progress: 100 },
  ];

  const proofTimeline: ActivityEvent[] = [
    { id: "a1", title: "Planted 200 trees", date: "Mar 2026", status: "Verified", note: "Agroforestry evidence approved" },
    { id: "a2", title: "Uploaded soil data", date: "Apr 2026", status: "Pending", note: "Lab report under review" },
    { id: "a3", title: "Geo-tagged field photos", date: "May 2026", status: "Verified", note: "Location verified" },
  ];

  const smartAlerts = [
    { id: "al1", severity: "critical", title: "Verification pending", text: "Upload documents to unlock 80 credits.", cta: "Upload Now" },
    { id: "al2", severity: "warning", title: "Action required", text: "Add crop data for this month to earn more credits.", cta: "Upload Crop Data" },
    { id: "al3", severity: "success", title: "New opportunity", text: "Join a tree plantation project nearby to earn faster.", cta: "Join Project" },
  ] as const;

  const insights = [
    { id: "i1", text: "You can earn ~15% more by switching more area to drip irrigation." },
    { id: "i2", text: "Planting trees on 1 acre can increase credits over the next season." },
    { id: "i3", text: "Uploading monthly crop + irrigation data improves verification speed." },
  ];

  const availableCredits = totals.creditsAvailable;
  const lockedCredits = totals.creditsLocked;
  const soldCredits = totals.creditsSold;
  const verifiedCredits = walletEntries.filter((e) => e.status === "verified" && (e.deltaCredits ?? 0) > 0).reduce((s, e) => s + (e.deltaCredits ?? 0), 0);
  const pendingCredits = walletEntries.filter((e) => e.status === "pending" && (e.deltaCredits ?? 0) > 0).reduce((s, e) => s + (e.deltaCredits ?? 0), 0);

  const walletFiltered = useMemo(() => {
    const byTab: Record<WalletTab, (e: WalletEntry) => boolean> = {
      available: (e) => (e.deltaCredits ?? 0) > 0 && e.status === "verified",
      pending: (e) => (e.deltaCredits ?? 0) > 0 && e.status === "pending",
      sold: (e) => e.kind === "sold",
      history: () => true,
    };
    return walletEntries.filter(byTab[walletTab]).slice(0, 8);
  }, [walletEntries, walletTab]);

  const trendKey = metric;
  const meta = trendMeta[metric];

  const headerName = (fullName?.split(" ")[0] || "Farmer").trim();

  return (
    <div className="min-h-full" style={{ backgroundColor: colors.page, color: colors.text }}>
      <div className="p-6 md:p-8 space-y-6 max-w-[1400px] mx-auto">
        {/* Top App Bar */}
        <div
          className="sticky top-0 z-30 rounded-2xl border px-4 py-3 backdrop-blur"
          style={{
            backgroundColor: `${colors.page}CC`,
            borderColor: colors.border,
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-10 h-10 rounded-xl border flex items-center justify-center"
                style={{ backgroundColor: colors.card, borderColor: colors.border }}
              >
                <Leaf className="w-5 h-5" style={{ color: colors.green }} />
              </div>
              <div className="min-w-0">
                <div className="text-sm md:text-base truncate" style={{ fontWeight: 900 }}>
                  Farmer Portfolio
                </div>
                <div className="text-xs mt-0.5 truncate" style={{ color: colors.subtext, fontWeight: 700 }}>
                  Welcome, {headerName}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/app/alerts"
                className="relative w-10 h-10 rounded-xl border flex items-center justify-center transition-transform active:scale-[0.98]"
                style={{ backgroundColor: colors.card, borderColor: colors.border }}
                title="Alerts"
              >
                <Bell className="w-5 h-5" style={{ color: colors.subtext }} />
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full border flex items-center justify-center text-[10px]"
                  style={{ backgroundColor: colors.red, borderColor: colors.page, color: "white", fontWeight: 900 }}
                >
                  3
                </span>
              </Link>
              <Link
                to="/app/settings"
                className="w-10 h-10 rounded-xl border flex items-center justify-center transition-transform active:scale-[0.98]"
                style={{ backgroundColor: colors.card, borderColor: colors.border }}
                title="Profile"
              >
                <Sprout className="w-5 h-5" style={{ color: colors.subtext }} />
              </Link>
            </div>
          </div>
        </div>

        {/* Wealth Snapshot (Hero) */}
        <div
          className="rounded-3xl border p-6 md:p-7"
          style={{
            background: `radial-gradient(1200px 400px at 10% 0%, ${colors.green}22 0%, transparent 55%), radial-gradient(900px 360px at 100% 10%, ${colors.blue}22 0%, transparent 60%), ${colors.card}`,
            borderColor: colors.border,
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <div className="text-3xl md:text-4xl" style={{ fontWeight: 950, letterSpacing: "-0.02em" }}>
                {formatINR(totals.totalEarnings)}
              </div>
              <div className="text-sm mt-1" style={{ color: colors.subtext, fontWeight: 800 }}>
                Total Earnings
              </div>
              <div
                className="inline-flex items-center gap-1 mt-3 px-3 py-1 rounded-full border text-xs"
                style={{ backgroundColor: `${colors.green}18`, borderColor: `${colors.green}55`, fontWeight: 900 }}
              >
                <ArrowUpRight className="w-4 h-4" style={{ color: colors.green }} />
                <span style={{ color: colors.text }}>+{totals.earningsChangePct}%</span>
                <span style={{ color: colors.subtext }}>this season</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
              <div className="rounded-2xl border p-3" style={{ backgroundColor: "#0F172A", borderColor: colors.border }}>
                <div className="text-lg" style={{ fontWeight: 950 }}>
                  {availableCredits}
                </div>
                <div className="text-xs" style={{ color: colors.subtext, fontWeight: 800 }}>
                  Available
                </div>
              </div>
              <div className="rounded-2xl border p-3" style={{ backgroundColor: "#0F172A", borderColor: colors.border }}>
                <div className="text-lg" style={{ fontWeight: 950 }}>
                  {lockedCredits}
                </div>
                <div className="text-xs" style={{ color: colors.subtext, fontWeight: 800 }}>
                  Locked
                </div>
              </div>
              <div className="rounded-2xl border p-3" style={{ backgroundColor: "#0F172A", borderColor: colors.border }}>
                <div className="text-lg" style={{ fontWeight: 950 }}>
                  {totals.totalCreditsEarned}
                </div>
                <div className="text-xs" style={{ color: colors.subtext, fontWeight: 800 }}>
                  Earned
                </div>
              </div>
              <div className="rounded-2xl border p-3" style={{ backgroundColor: "#0F172A", borderColor: colors.border }}>
                <div className="text-lg" style={{ fontWeight: 950 }}>
                  {totals.activeProjects}
                </div>
                <div className="text-xs" style={{ color: colors.subtext, fontWeight: 800 }}>
                  Projects
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <button
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm transition-transform active:scale-[0.99]"
              style={{ backgroundColor: colors.green, color: "white", fontWeight: 900 }}
              title="Withdraw (simulated)"
            >
              <Banknote className="w-5 h-5" />
              Withdraw Funds
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm border transition-transform active:scale-[0.99]"
              style={{ backgroundColor: "#0F172A", borderColor: colors.border, color: colors.text, fontWeight: 900 }}
              title="Sell credits (simulated)"
            >
              <Wallet className="w-5 h-5" style={{ color: colors.subtext }} />
              Sell Credits
            </button>
          </div>
        </div>

        {/* Quick Action Strip */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { icon: Camera, label: "Upload Activity", hint: "Proof photos & logs" },
            { icon: FileUp, label: "Upload Data", hint: "Crop/soil reports" },
            { icon: TrendingUp, label: "View Reports", hint: "Trends & payouts" },
            { icon: Sprout, label: "Join Project", hint: "Earn faster" },
          ].map((a) => (
            <button
              key={a.label}
              className="shrink-0 rounded-2xl border px-4 py-3 text-left min-w-[220px] transition-transform hover:scale-[1.01] active:scale-[0.99]"
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
              title={`${a.label} (simulated)`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl border flex items-center justify-center"
                    style={{ backgroundColor: "#0F172A", borderColor: colors.border }}
                  >
                    <a.icon className="w-5 h-5" style={{ color: colors.subtext }} />
                  </div>
                  <div>
                    <div className="text-sm" style={{ fontWeight: 900 }}>
                      {a.label}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: colors.subtext, fontWeight: 700 }}>
                      {a.hint}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5" style={{ color: colors.subtext }} />
              </div>
            </button>
          ))}
        </div>

        {/* Portfolio Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Carbon Credits Earned", value: totals.totalCreditsEarned.toLocaleString("en-IN"), icon: Leaf, accent: colors.green },
            { label: "CO₂ Reduced", value: "3.9 t", icon: TrendingUp, accent: colors.amber },
            { label: "Verified Credits", value: verifiedCredits.toLocaleString("en-IN"), icon: BadgeCheck, accent: colors.blue },
            { label: "Pending Verification", value: pendingCredits.toLocaleString("en-IN"), icon: FileUp, accent: colors.amber },
          ].map((c) => (
            <div
              key={c.label}
              className="rounded-2xl border p-4"
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-2xl" style={{ fontWeight: 950 }}>
                    {c.value}
                  </div>
                  <div className="text-xs mt-1" style={{ color: colors.subtext, fontWeight: 800 }}>
                    {c.label}
                  </div>
                </div>
                <div
                  className="w-10 h-10 rounded-xl border flex items-center justify-center"
                  style={{ backgroundColor: `${c.accent}14`, borderColor: `${c.accent}44` }}
                >
                  <c.icon className="w-5 h-5" style={{ color: c.accent }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Farm Profile + Impact Tracker */}
        <div className="grid grid-cols-1 xl:grid-cols-10 gap-4">
          {/* Farm Profile */}
          <div className="xl:col-span-4 rounded-3xl border p-5" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
            <div className="flex items-center justify-between">
              <div className="text-sm" style={{ fontWeight: 950 }}>
                Farm Profile
              </div>
              <div className="text-xs" style={{ color: colors.subtext, fontWeight: 800 }}>
                Simple, personal overview
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3">
              <div className="rounded-2xl border p-4" style={{ backgroundColor: "#0F172A", borderColor: colors.border }}>
                <div className="text-xs" style={{ color: colors.subtext, fontWeight: 800 }}>
                  Farm size
                </div>
                <div className="text-sm mt-1" style={{ fontWeight: 950 }}>
                  {farmProfile.sizeAcres} acres
                </div>
              </div>
              <div className="rounded-2xl border p-4" style={{ backgroundColor: "#0F172A", borderColor: colors.border }}>
                <div className="text-xs" style={{ color: colors.subtext, fontWeight: 800 }}>
                  Crops
                </div>
                <div className="text-sm mt-1" style={{ fontWeight: 950 }}>
                  {farmProfile.crops.join(", ")}
                </div>
              </div>
              <div className="rounded-2xl border p-4 flex items-start gap-3" style={{ backgroundColor: "#0F172A", borderColor: colors.border }}>
                <div
                  className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0"
                  style={{ borderColor: colors.border, backgroundColor: colors.card }}
                >
                  <MapPin className="w-5 h-5" style={{ color: colors.subtext }} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs" style={{ color: colors.subtext, fontWeight: 800 }}>
                    Location
                  </div>
                  <div className="text-sm mt-1" style={{ fontWeight: 950 }}>
                    {farmProfile.location}
                  </div>
                  <div className="text-xs mt-1" style={{ color: colors.subtext, fontWeight: 700 }}>
                    Map view (optional) can be added here.
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border p-4" style={{ backgroundColor: "#0F172A", borderColor: colors.border }}>
                <div className="text-xs" style={{ color: colors.subtext, fontWeight: 800 }}>
                  Practices
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {farmProfile.practices.map((p) => (
                    <span
                      key={p}
                      className="px-2.5 py-1 rounded-full border text-xs"
                      style={{ backgroundColor: colors.card, borderColor: colors.border, color: colors.text, fontWeight: 900 }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Carbon Impact Tracker */}
          <div className="xl:col-span-6 rounded-3xl border p-5" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <div className="text-sm" style={{ fontWeight: 950 }}>
                  Carbon Impact Tracker
                </div>
                <div className="text-xs mt-0.5" style={{ color: colors.subtext, fontWeight: 800 }}>
                  Visual trends — simple and clear
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["credits", "earnings", "co2"] as TrendMetric[]).map((m) => {
                  const active = metric === m;
                  const c = trendMeta[m].color;
                  return (
                    <button
                      key={m}
                      onClick={() => setMetric(m)}
                      className="px-3 py-2 rounded-2xl border text-xs transition-transform active:scale-[0.99]"
                      style={{
                        backgroundColor: active ? "#0F172A" : colors.card,
                        borderColor: active ? `${c}66` : colors.border,
                        color: colors.text,
                        fontWeight: 900,
                      }}
                    >
                      {trendMeta[m].label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs"
              style={{ backgroundColor: `${colors.blue}14`, borderColor: `${colors.blue}55`, fontWeight: 900 }}
            >
              <ArrowUpRight className="w-4 h-4" style={{ color: colors.blue }} />
              <span style={{ color: colors.text }}>{yoyChange.label}</span>
            </div>

            <div className="mt-4 h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="farmerTrendFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={meta.color} stopOpacity={0.35} />
                      <stop offset="95%" stopColor={meta.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: colors.subtext }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: colors.subtext }} axisLine={false} tickLine={false} />
                  <RechartsTooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: `1px solid ${colors.border}`,
                      background: colors.card,
                      color: colors.text,
                    }}
                    formatter={(value: number) => {
                      if (metric === "earnings") return [formatINR(value), "Earnings"];
                      if (metric === "co2") return [`${value} t`, "CO₂"];
                      return [`${value}`, "Credits"];
                    }}
                  />
                  <Area type="monotone" dataKey={trendKey} stroke={meta.color} strokeWidth={3} fill="url(#farmerTrendFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { label: "CO₂ reduced", value: "3.9 tonnes" },
                { label: "Monthly growth", value: `+${clamp(yoyChange.value, 0, 99).toFixed(1)}%` },
                { label: "Active projects", value: `${totals.activeProjects}` },
              ].map((x) => (
                <div key={x.label} className="rounded-2xl border px-3 py-2" style={{ backgroundColor: "#0F172A", borderColor: colors.border }}>
                  <div className="text-[11px]" style={{ color: colors.subtext, fontWeight: 800 }}>
                    {x.label}
                  </div>
                  <div className="text-sm mt-0.5" style={{ fontWeight: 950 }}>
                    {x.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Earnings & Payments + Credit Wallet */}
        <div className="grid grid-cols-1 xl:grid-cols-10 gap-4">
          {/* Earnings & Payments */}
          <div className="xl:col-span-4 rounded-3xl border p-5" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
            <div className="flex items-center justify-between">
              <div className="text-sm" style={{ fontWeight: 950 }}>
                Earnings &amp; Payments
              </div>
              <div className="text-xs" style={{ color: colors.subtext, fontWeight: 800 }}>
                Money-first view
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border p-4" style={{ backgroundColor: "#0F172A", borderColor: colors.border }}>
                <div className="text-xs" style={{ color: colors.subtext, fontWeight: 800 }}>
                  Total earnings from credits
                </div>
                <div className="text-xl mt-1" style={{ fontWeight: 950 }}>
                  {formatINR(totals.totalEarnings)}
                </div>
              </div>

              <div className="rounded-2xl border p-4" style={{ backgroundColor: "#0F172A", borderColor: colors.border }}>
                <div className="text-xs" style={{ color: colors.subtext, fontWeight: 800 }}>
                  Recent transactions
                </div>
                <div className="mt-3 space-y-2">
                  {walletEntries
                    .filter((e) => e.kind === "sold" || e.kind === "payment_received" || e.kind === "payment_pending")
                    .slice(0, 4)
                    .map((e) => {
                      const amountText = e.deltaRupees ? formatINR(Math.abs(e.deltaRupees)) : "-";
                      const label =
                        e.kind === "sold"
                          ? "Sold credits"
                          : e.kind === "payment_received"
                            ? "Payment received"
                            : "Pending payment";
                      const accent = e.kind === "payment_received" ? colors.green : e.kind === "payment_pending" ? colors.amber : colors.blue;
                      return (
                        <div key={e.id} className="flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-sm truncate" style={{ fontWeight: 900 }}>
                              {label}
                            </div>
                            <div className="text-xs mt-0.5" style={{ color: colors.subtext, fontWeight: 700 }}>
                              {e.title} · {e.date}
                            </div>
                          </div>
                          <div className="text-sm shrink-0" style={{ color: accent, fontWeight: 950 }}>
                            {e.kind === "payment_pending" ? `+${amountText}` : `+${amountText}`}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <button
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm transition-transform active:scale-[0.99]"
                style={{ backgroundColor: colors.green, color: "white", fontWeight: 950 }}
                title="Withdraw (simulated)"
              >
                <Banknote className="w-5 h-5" />
                Withdraw money
              </button>
            </div>
          </div>

          {/* Credit Wallet */}
          <div className="xl:col-span-6 rounded-3xl border p-5" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm" style={{ fontWeight: 950 }}>
                  Credits Portfolio
                </div>
                <div className="text-xs mt-0.5" style={{ color: colors.subtext, fontWeight: 800 }}>
                  Mini wallet + ledger
                </div>
              </div>
              <div className="text-xs" style={{ color: colors.subtext, fontWeight: 900 }}>
                Available: <span style={{ color: colors.text }}>{availableCredits}</span> · Locked:{" "}
                <span style={{ color: colors.text }}>{lockedCredits}</span> · Sold:{" "}
                <span style={{ color: colors.text }}>{soldCredits}</span>
              </div>
            </div>

            <div className="mt-4">
              <Tabs value={walletTab} onValueChange={(v) => setWalletTab(v as WalletTab)}>
                <TabsList className="bg-transparent p-0 gap-2">
                  {[
                    { id: "available", label: "Available" },
                    { id: "pending", label: "Pending" },
                    { id: "sold", label: "Sold" },
                    { id: "history", label: "History" },
                  ].map((t) => (
                    <TabsTrigger
                      key={t.id}
                      value={t.id}
                      className="rounded-2xl border px-3 py-2 text-xs"
                      style={{
                        backgroundColor: walletTab === t.id ? "#0F172A" : colors.card,
                        borderColor: walletTab === t.id ? `${colors.blue}66` : colors.border,
                        color: colors.text,
                        fontWeight: 950,
                      }}
                    >
                      {t.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={walletTab} className="mt-4">
                  <div className="space-y-2">
                    {walletFiltered.map((e) => {
                      const credits = e.deltaCredits ?? 0;
                      const rupees = e.deltaRupees ?? 0;
                      const status = e.status;
                      const statusMeta: Record<CreditStatus, { label: string; color: string; bg: string }> = {
                        verified: { label: "Verified ✅", color: colors.green, bg: `${colors.green}14` },
                        pending: { label: "Pending ⏳", color: colors.amber, bg: `${colors.amber}14` },
                        rejected: { label: "Rejected ❌", color: colors.red, bg: `${colors.red}14` },
                      };
                      return (
                        <div
                          key={e.id}
                          className="rounded-2xl border p-4 flex items-center justify-between gap-3"
                          style={{ backgroundColor: "#0F172A", borderColor: colors.border }}
                        >
                          <div className="min-w-0">
                            <div className="text-sm truncate" style={{ fontWeight: 950 }}>
                              {e.title}
                            </div>
                            <div className="text-xs mt-0.5" style={{ color: colors.subtext, fontWeight: 800 }}>
                              {e.date} {e.note ? `· ${e.note}` : ""}
                            </div>
                          </div>

                          <div className="shrink-0 text-right">
                            {credits !== 0 && (
                              <div className="text-sm" style={{ fontWeight: 950, color: credits > 0 ? colors.green : colors.red }}>
                                {credits > 0 ? `+${credits}` : `${credits}`} credits
                              </div>
                            )}
                            {rupees !== 0 && (
                              <div className="text-sm" style={{ fontWeight: 950, color: rupees > 0 ? colors.green : colors.red }}>
                                {rupees > 0 ? `+${formatINR(rupees)}` : `-${formatINR(Math.abs(rupees))}`}
                              </div>
                            )}
                            {status && (
                              <div
                                className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full border text-[11px]"
                                style={{
                                  backgroundColor: statusMeta[status].bg,
                                  borderColor: `${statusMeta[status].color}55`,
                                  color: colors.text,
                                  fontWeight: 950,
                                }}
                              >
                                {statusMeta[status].label}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Active Projects + Proof Timeline */}
        <div className="grid grid-cols-1 xl:grid-cols-10 gap-4">
          {/* Projects */}
          <div className="xl:col-span-6 rounded-3xl border p-5" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm" style={{ fontWeight: 950 }}>
                  Project Participation
                </div>
                <div className="text-xs mt-0.5" style={{ color: colors.subtext, fontWeight: 800 }}>
                  What you’re part of (simple cards)
                </div>
              </div>
              <button
                className="rounded-2xl border px-3 py-2 text-xs"
                style={{ backgroundColor: "#0F172A", borderColor: colors.border, color: colors.text, fontWeight: 950 }}
                title="Join project (simulated)"
              >
                Join project
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              {projects.map((p) => {
                const dot = p.status === "Active" ? colors.green : colors.subtext;
                return (
                  <div key={p.id} className="rounded-3xl border p-5" style={{ backgroundColor: "#0F172A", borderColor: colors.border }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm truncate" style={{ fontWeight: 950 }}>
                          {p.title}
                        </div>
                        <div className="text-xs mt-1 flex items-center gap-2" style={{ color: colors.subtext, fontWeight: 800 }}>
                          <span className="inline-flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dot }} />
                            {p.status}
                          </span>
                          <span>•</span>
                          <span>
                            {p.start}
                            {p.end ? ` → ${p.end}` : ""}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg" style={{ fontWeight: 950 }}>
                          {p.creditsGenerated}
                        </div>
                        <div className="text-[11px]" style={{ color: colors.subtext, fontWeight: 900 }}>
                          credits
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-[11px]" style={{ color: colors.subtext, fontWeight: 900 }}>
                        <span>Progress</span>
                        <span>{p.progress}%</span>
                      </div>
                      <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ backgroundColor: colors.border }}>
                        <div
                          className="h-2 rounded-full"
                          style={{ width: `${clamp(p.progress, 0, 100)}%`, backgroundColor: p.status === "Active" ? colors.green : colors.subtext }}
                        />
                      </div>
                    </div>

                    <button
                      className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-2 text-xs transition-transform active:scale-[0.99]"
                      style={{ backgroundColor: colors.card, borderColor: colors.border, color: colors.text, fontWeight: 950 }}
                      title="Open project details (simulated)"
                    >
                      View project analytics <ChevronRight className="w-4 h-4" style={{ color: colors.subtext }} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity / Proof */}
          <div className="xl:col-span-4 rounded-3xl border p-5" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm" style={{ fontWeight: 950 }}>
                  Activity / Proof
                </div>
                <div className="text-xs mt-0.5" style={{ color: colors.subtext, fontWeight: 800 }}>
                  Evidence builds trust
                </div>
              </div>
              <button
                className="rounded-2xl px-3 py-2 text-xs"
                style={{ backgroundColor: colors.blue, color: "white", fontWeight: 950 }}
                title="Upload proof (simulated)"
              >
                Upload proof
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {proofTimeline.map((e, idx) => {
                const statusColor = e.status === "Verified" ? colors.green : e.status === "Pending" ? colors.amber : colors.red;
                return (
                  <div key={e.id} className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className="w-10 h-10 rounded-xl border flex items-center justify-center"
                        style={{ backgroundColor: `${statusColor}14`, borderColor: `${statusColor}44` }}
                      >
                        <Camera className="w-5 h-5" style={{ color: statusColor }} />
                      </div>
                      {idx < proofTimeline.length - 1 && <div className="w-px h-10" style={{ backgroundColor: colors.border }} />}
                    </div>
                    <div className="min-w-0 flex-1 rounded-2xl border p-4" style={{ backgroundColor: "#0F172A", borderColor: colors.border }}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-sm truncate" style={{ fontWeight: 950 }}>
                            {e.title}
                          </div>
                          <div className="text-xs mt-0.5" style={{ color: colors.subtext, fontWeight: 800 }}>
                            {e.date} {e.note ? `· ${e.note}` : ""}
                          </div>
                        </div>
                        <span
                          className="px-2 py-0.5 rounded-full border text-[11px] shrink-0"
                          style={{ backgroundColor: `${statusColor}14`, borderColor: `${statusColor}55`, color: colors.text, fontWeight: 950 }}
                        >
                          {e.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Smart Alerts + Insights + Learning */}
        <div className="grid grid-cols-1 xl:grid-cols-10 gap-4 pb-10">
          {/* Smart Alerts */}
          <div className="xl:col-span-4 rounded-3xl border p-5" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
            <div className="flex items-center justify-between">
              <div className="text-sm" style={{ fontWeight: 950 }}>
                Smart Alerts
              </div>
              <Link to="/app/alerts" className="text-xs" style={{ color: colors.subtext, fontWeight: 900 }}>
                View all
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {smartAlerts.map((a) => {
                const severityColor =
                  a.severity === "critical" ? colors.red : a.severity === "warning" ? colors.amber : colors.green;
                const icon = a.severity === "critical" ? FileUp : a.severity === "warning" ? TrendingUp : Sprout;
                const Icon = icon;
                return (
                  <div
                    key={a.id}
                    className="rounded-3xl border p-4"
                    style={{ backgroundColor: "#0F172A", borderColor: colors.border, borderLeftWidth: 4, borderLeftColor: severityColor }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${severityColor}14`, borderColor: `${severityColor}44` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: severityColor }} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm truncate" style={{ fontWeight: 950 }}>
                            {a.title}
                          </div>
                          <div className="text-xs mt-0.5" style={{ color: colors.subtext, fontWeight: 800 }}>
                            {a.text}
                          </div>
                        </div>
                      </div>
                      <button
                        className="rounded-2xl px-3 py-2 text-xs shrink-0"
                        style={{ backgroundColor: severityColor, color: "white", fontWeight: 950 }}
                        title={`${a.cta} (simulated)`}
                      >
                        {a.cta}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Simple AI-like Insights */}
          <div className="xl:col-span-3 rounded-3xl border p-5" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
            <div className="text-sm" style={{ fontWeight: 950 }}>
              Performance Insights
            </div>
            <div className="text-xs mt-0.5" style={{ color: colors.subtext, fontWeight: 800 }}>
              Simple, actionable tips
            </div>
            <div className="mt-4 space-y-3">
              {insights.map((i) => (
                <div key={i.id} className="rounded-3xl border p-4" style={{ backgroundColor: "#0F172A", borderColor: colors.border }}>
                  <div className="text-sm" style={{ fontWeight: 900 }}>
                    “{i.text}”
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning / Guidance */}
          <div className="xl:col-span-3 rounded-3xl border p-5" style={{ backgroundColor: colors.card, borderColor: colors.border }}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm" style={{ fontWeight: 950 }}>
                  Learning / Guidance
                </div>
                <div className="text-xs mt-0.5" style={{ color: colors.subtext, fontWeight: 800 }}>
                  Quick guides for farmers
                </div>
              </div>
              <GraduationCap className="w-5 h-5" style={{ color: colors.subtext }} />
            </div>

            <div className="mt-4 space-y-3">
              {[
                { title: "How carbon credits work", desc: "Simple explanation in 3 minutes" },
                { title: "How to increase earnings", desc: "Best practices that raise credits" },
                { title: "Upload proof correctly", desc: "Geo-tagging, photos, logs" },
              ].map((c) => (
                <div key={c.title} className="rounded-3xl border p-4" style={{ backgroundColor: "#0F172A", borderColor: colors.border }}>
                  <div className="text-sm" style={{ fontWeight: 950 }}>
                    {c.title}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: colors.subtext, fontWeight: 800 }}>
                    {c.desc}
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/app/education"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm"
              style={{ backgroundColor: colors.blue, color: "white", fontWeight: 950 }}
            >
              Go to Education Hub <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

