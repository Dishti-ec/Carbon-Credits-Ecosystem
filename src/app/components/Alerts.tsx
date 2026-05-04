import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  Calendar,
  FileCheck,
  Shield,
  Clock,
  CheckCircle2,
  Info,
  Filter,
  Eye,
  Search,
  Hourglass,
  Siren,
  Building2,
  Leaf,
  ChevronRight,
  RefreshCw,
  BellOff,
} from "lucide-react";

type AlertSeverity = "critical" | "high" | "medium" | "low";
type AlertType = "critical" | "deadlines" | "inspections" | "updates";
type AlertStatus = "unread" | "in_progress" | "resolved";
type ImpactLevel = "Low" | "Medium" | "High";

type SuggestedActionKind =
  | "resolve"
  | "view_details"
  | "buy_credits"
  | "prepare_documents"
  | "upload_report"
  | "snooze";

interface SuggestedAction {
  id: string;
  label: string;
  kind: SuggestedActionKind;
}

interface AlertMetricRow {
  label: string;
  value: string;
  emphasis?: boolean;
}

interface Alert {
  id: number;
  title: string;
  description: string;
  severity: AlertSeverity;
  type: AlertType;
  status: AlertStatus;
  createdAt: string; // ISO date
  dueDate?: string;
  entity: string;
  sector: string;
  targetRole: "company" | "farmer" | "all";
  impact: ImpactLevel;
  metrics?: AlertMetricRow[];
  suggestedActions: SuggestedAction[];
  snoozedUntil?: string; // ISO date
  remindersEnabled?: boolean;
}

const seedAlerts: Alert[] = [
  {
    id: 1,
    title: "BEE Compliance Audit - Q1 FY2026",
    description: "Bureau of Energy Efficiency scheduled on-site compliance audit for verification of FY2025-26 emission intensity data. Ensure all MRV documentation is prepared.",
    severity: "critical",
    type: "inspections",
    status: "unread",
    createdAt: "2026-03-06",
    dueDate: "2026-03-20",
    entity: "Tata Steel Ltd.",
    sector: "Iron & Steel",
    targetRole: "company",
    impact: "High",
    metrics: [
      { label: "Due date", value: "2026-03-20", emphasis: true },
      { label: "Authority", value: "BEE" },
      { label: "Scope", value: "FY2025-26 emission intensity" },
    ],
    suggestedActions: [
      { id: "prepare-docs", label: "Prepare MRV Documents", kind: "prepare_documents" },
      { id: "view", label: "View Details", kind: "view_details" },
      { id: "resolve", label: "Mark Prepared", kind: "resolve" },
      { id: "snooze", label: "Snooze 24h", kind: "snooze" },
    ],
    remindersEnabled: true,
  },
  {
    id: 2,
    title: "ACVA Audit Notification - Wadi Plant",
    description: "Accredited Carbon Verification Agency (TUV SUD) will conduct independent emissions data audit as per CCTS Phase 1 requirements.",
    severity: "critical",
    type: "inspections",
    status: "unread",
    createdAt: "2026-03-05",
    dueDate: "2026-03-15",
    entity: "ACC Cement Ltd.",
    sector: "Cement",
    targetRole: "company",
    impact: "High",
    metrics: [
      { label: "Due date", value: "2026-03-15", emphasis: true },
      { label: "Verifier", value: "TUV SUD (ACVA)" },
      { label: "Program", value: "CCTS Phase 1" },
    ],
    suggestedActions: [
      { id: "prepare-docs", label: "Prepare Documents", kind: "prepare_documents" },
      { id: "upload", label: "Upload MRV Evidence", kind: "upload_report" },
      { id: "resolve", label: "Mark Scheduled", kind: "resolve" },
      { id: "snooze", label: "Snooze 24h", kind: "snooze" },
    ],
    remindersEnabled: true,
  },
  {
    id: 3,
    title: "MRV Plan Submission Deadline",
    description: "Mandatory submission of Monitoring, Reporting & Verification plan to BEE within 3 months of compliance cycle commencement.",
    severity: "high",
    type: "deadlines",
    status: "unread",
    createdAt: "2026-03-04",
    dueDate: "2026-04-01",
    entity: "Hindalco Industries",
    sector: "Aluminium",
    targetRole: "company",
    impact: "High",
    metrics: [
      { label: "Due date", value: "2026-04-01", emphasis: true },
      { label: "Required", value: "MRV plan submission" },
      { label: "Risk", value: "Non-compliance penalties" },
    ],
    suggestedActions: [
      { id: "upload", label: "Upload MRV Plan", kind: "upload_report" },
      { id: "view", label: "View Submission Guide", kind: "view_details" },
      { id: "resolve", label: "Mark Submitted", kind: "resolve" },
      { id: "snooze", label: "Snooze 24h", kind: "snooze" },
    ],
    remindersEnabled: true,
  },
  {
    id: 4,
    title: "CERC Market Regulation Update",
    description: "Central Electricity Regulatory Commission has updated price corridor limits for CCC trading. New floor price: INR 800, ceiling: INR 2,500 per tCO2e.",
    severity: "medium",
    type: "updates",
    status: "resolved",
    createdAt: "2026-03-03",
    entity: "All Market Participants",
    sector: "All Sectors",
    targetRole: "all",
    impact: "Medium",
    metrics: [
      { label: "Floor price", value: "INR 800 / tCO2e" },
      { label: "Ceiling price", value: "INR 2,500 / tCO2e" },
      { label: "Issuer", value: "CERC" },
    ],
    suggestedActions: [{ id: "view", label: "View Changes", kind: "view_details" }],
  },
  {
    id: 5,
    title: "Soil Carbon Verification Needed",
    description: "Your recently registered plot needs physical verification by the local FPO representative before credits can be issued.",
    severity: "high",
    type: "inspections",
    status: "unread",
    createdAt: "2026-03-01",
    dueDate: "2026-03-10",
    entity: "Local Farm",
    sector: "Agriculture",
    targetRole: "farmer",
    impact: "Medium",
    metrics: [
      { label: "Due date", value: "2026-03-10", emphasis: true },
      { label: "Verification", value: "FPO representative visit" },
      { label: "Impact", value: "Credit issuance blocked" },
    ],
    suggestedActions: [
      { id: "prepare-docs", label: "Prepare Documents", kind: "prepare_documents" },
      { id: "resolve", label: "Mark Visit Scheduled", kind: "resolve" },
      { id: "snooze", label: "Snooze 24h", kind: "snooze" },
    ],
    remindersEnabled: true,
  },
  {
    id: 6,
    title: "Emission Intensity Target Notification",
    description: "MoEFCC has formally notified updated emission intensity targets for textile sector: 3.5-6.2% reduction for Phase 1.",
    severity: "medium",
    type: "updates",
    status: "in_progress",
    createdAt: "2026-02-28",
    entity: "Raymond Textiles",
    sector: "Textiles",
    targetRole: "company",
    impact: "Medium",
    metrics: [
      { label: "Phase", value: "Phase 1" },
      { label: "Target reduction", value: "3.5–6.2%" },
      { label: "Issuer", value: "MoEFCC" },
    ],
    suggestedActions: [
      { id: "view", label: "View Changes", kind: "view_details" },
      { id: "resolve", label: "Acknowledge", kind: "resolve" },
    ],
  },
  {
    id: 7,
    title: "Credit Issuance Approved",
    description: "Your agroforestry project has been successfully verified. 450 Carbon Credits have been issued to your account.",
    severity: "low",
    type: "updates",
    status: "resolved",
    createdAt: "2026-02-25",
    entity: "Your Profile",
    sector: "Agriculture",
    targetRole: "farmer",
    impact: "Low",
    metrics: [
      { label: "Issued credits", value: "450", emphasis: true },
      { label: "Project", value: "Agroforestry" },
      { label: "Status", value: "Verified" },
    ],
    suggestedActions: [{ id: "view", label: "View Details", kind: "view_details" }],
  },
  {
    id: 8,
    title: "Low Carbon Credits",
    description: "You are short of carbon credits required for this compliance cycle. Take action to avoid penalties.",
    severity: "high",
    type: "critical",
    status: "unread",
    createdAt: "2026-03-06",
    dueDate: "2026-03-18",
    entity: "Compliance Account",
    sector: "All Sectors",
    targetRole: "all",
    impact: "High",
    metrics: [
      { label: "Current", value: "8,200 credits" },
      { label: "Required", value: "10,000 credits", emphasis: true },
      { label: "Shortfall", value: "1,800 credits", emphasis: true },
    ],
    suggestedActions: [
      { id: "buy", label: "Buy Credits", kind: "buy_credits" },
      { id: "upload", label: "Upload Offset Report", kind: "upload_report" },
      { id: "resolve", label: "Mark Resolved", kind: "resolve" },
      { id: "snooze", label: "Snooze 24h", kind: "snooze" },
    ],
    remindersEnabled: true,
  },
  {
    id: 9,
    title: "Compliance Deadline Missed",
    description: "Emission report submission overdue by 2 days. Immediate action required to reduce penalty risk.",
    severity: "critical",
    type: "deadlines",
    status: "unread",
    createdAt: "2026-03-06",
    dueDate: "2026-03-04",
    entity: "Quarterly Emissions",
    sector: "All Sectors",
    targetRole: "all",
    impact: "High",
    metrics: [
      { label: "Status", value: "Overdue", emphasis: true },
      { label: "Overdue by", value: "2 days", emphasis: true },
      { label: "Risk", value: "Penalty + audit escalation" },
    ],
    suggestedActions: [
      { id: "upload", label: "Upload Report", kind: "upload_report" },
      { id: "resolve", label: "Mark Submitted", kind: "resolve" },
      { id: "snooze", label: "Snooze 24h", kind: "snooze" },
    ],
    remindersEnabled: true,
  },
  {
    id: 10,
    title: "Govt Inspection Scheduled",
    description: "Inspection scheduled on 12 May 2026. Ensure documentation is ready and internal teams are aligned.",
    severity: "medium",
    type: "inspections",
    status: "unread",
    createdAt: "2026-03-02",
    dueDate: "2026-05-12",
    entity: "Facility Site",
    sector: "All Sectors",
    targetRole: "all",
    impact: "Medium",
    metrics: [
      { label: "Inspection date", value: "2026-05-12", emphasis: true },
      { label: "Checklist", value: "Documents + site walkthrough" },
      { label: "Owner", value: "Compliance team" },
    ],
    suggestedActions: [
      { id: "prepare-docs", label: "Prepare Documents", kind: "prepare_documents" },
      { id: "resolve", label: "Mark Prepared", kind: "resolve" },
      { id: "snooze", label: "Snooze 24h", kind: "snooze" },
    ],
    remindersEnabled: false,
  },
];

import { useUserRole } from "../context/UserProvider";

export function Alerts() {
  const { role } = useUserRole();
  const [tab, setTab] = useState<"all" | "unread" | AlertType>("all");
  const [filterSeverity, setFilterSeverity] = useState<"all" | AlertSeverity>("all");
  const [filterStatus, setFilterStatus] = useState<"all" | AlertStatus>("all");
  const [filterDate, setFilterDate] = useState<"all" | "7d" | "30d">("all");
  const [search, setSearch] = useState("");

  const [alertList, setAlertList] = useState<Alert[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "info"; text: string } | null>(null);
  const messageTimer = useRef<number | null>(null);

  useEffect(() => {
    const roleAlerts = seedAlerts.filter((a) => a.targetRole === "all" || a.targetRole === role);
    setAlertList(roleAlerts);
    setSelectedId((prev) => {
      if (prev && roleAlerts.some((a) => a.id === prev)) return prev;
      const firstOpen = roleAlerts.find((a) => a.status !== "resolved")?.id ?? roleAlerts[0]?.id ?? null;
      return firstOpen;
    });
  }, [role]);

  useEffect(() => {
    if (!message) return;
    if (messageTimer.current) window.clearTimeout(messageTimer.current);
    messageTimer.current = window.setTimeout(() => setMessage(null), 2800);
    return () => {
      if (messageTimer.current) window.clearTimeout(messageTimer.current);
    };
  }, [message]);

  const colors = {
    page: "#0F172A",
    panel: "#111827",
    border: "#1F2937",
    text: "#E5E7EB",
    subtext: "#9CA3AF",
    critical: "#EF4444",
    warning: "#F59E0B",
    info: "#3B82F6",
    success: "#10B981",
  } as const;

  const severityMeta: Record<AlertSeverity, { label: string; color: string }> = {
    critical: { label: "Critical", color: colors.critical },
    high: { label: "High", color: colors.warning },
    medium: { label: "Medium", color: colors.info },
    low: { label: "Low", color: colors.subtext },
  };

  const typeMeta: Record<AlertType, { label: string; icon: typeof Bell }> = {
    critical: { label: "Critical", icon: Siren },
    deadlines: { label: "Deadlines", icon: Hourglass },
    inspections: { label: "Inspections", icon: Shield },
    updates: { label: "Updates", icon: FileCheck },
  };

  const getEntityIcon = (entity: string) => {
    const lower = entity.toLowerCase();
    if (lower.includes("farm") || lower.includes("agro") || lower.includes("fpo")) return Leaf;
    if (lower.includes("ltd") || lower.includes("industries") || lower.includes("cement") || lower.includes("steel")) return Building2;
    return Bell;
  };

  const formatRelativeTime = (iso: string) => {
    const now = Date.now();
    const t = new Date(iso).getTime();
    const diff = now - t;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
    const days = Math.floor(hrs / 24);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  };

  const getDaysUntil = (dateStr?: string) => {
    if (!dateStr) return null;
    const now = new Date();
    const due = new Date(dateStr);
    const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

  const calcPriorityScore = (a: Alert) => {
    const severityBase: Record<AlertSeverity, number> = {
      critical: 80,
      high: 60,
      medium: 40,
      low: 20,
    };
    const impactBoost: Record<ImpactLevel, number> = { High: 12, Medium: 6, Low: 0 };
    const statusBoost: Record<AlertStatus, number> = { unread: 8, in_progress: 3, resolved: -25 };
    const dueDays = getDaysUntil(a.dueDate);
    const deadlineBoost =
      dueDays === null
        ? 0
        : dueDays < 0
          ? 18 + clamp(Math.abs(dueDays) * 2, 0, 22)
          : dueDays <= 1
            ? 22
            : dueDays <= 7
              ? 14
              : dueDays <= 14
                ? 7
                : 0;
    const snoozePenalty = a.snoozedUntil ? -10 : 0;
    const score =
      severityBase[a.severity] +
      impactBoost[a.impact] +
      statusBoost[a.status] +
      deadlineBoost +
      snoozePenalty;
    return clamp(Math.round(score), 0, 100);
  };

  const unreadCount = useMemo(() => alertList.filter((a) => a.status === "unread").length, [alertList]);

  const summaryCounts = useMemo(() => {
    const open = alertList.filter((a) => a.status !== "resolved");
    const critical = open.filter((a) => a.type === "critical" || a.severity === "critical").length;
    const deadlines = open.filter((a) => a.type === "deadlines").length;
    const inspections = open.filter((a) => a.type === "inspections").length;
    const updates = open.filter((a) => a.type === "updates").length;
    return { critical, deadlines, inspections, updates };
  }, [alertList]);

  const filteredAlerts = useMemo(() => {
    const now = Date.now();
    const cutoff =
      filterDate === "7d" ? now - 7 * 24 * 60 * 60 * 1000 : filterDate === "30d" ? now - 30 * 24 * 60 * 60 * 1000 : null;

    const q = search.trim().toLowerCase();

    const list = alertList
      .filter((a) => a.status !== "resolved")
      .filter((a) => {
        if (tab === "all") return true;
        if (tab === "unread") return a.status === "unread";
        return a.type === tab;
      })
      .filter((a) => (filterSeverity === "all" ? true : a.severity === filterSeverity))
      .filter((a) => (filterStatus === "all" ? true : a.status === filterStatus))
      .filter((a) => (cutoff === null ? true : new Date(a.createdAt).getTime() >= cutoff))
      .filter((a) => {
        if (!q) return true;
        return (
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.entity.toLowerCase().includes(q) ||
          a.sector.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => calcPriorityScore(b) - calcPriorityScore(a));

    return list;
  }, [alertList, tab, filterSeverity, filterStatus, filterDate, search]);

  const resolvedAlerts = useMemo(() => {
    return [...alertList]
      .filter((a) => a.status === "resolved")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [alertList]);

  const selectedAlert = useMemo(() => {
    if (selectedId === null) return null;
    return alertList.find((a) => a.id === selectedId) ?? null;
  }, [alertList, selectedId]);

  const markAllAsRead = () => {
    setAlertList((prev) => prev.map((a) => (a.status === "unread" ? { ...a, status: "in_progress" } : a)));
    setMessage({ type: "info", text: "All alerts marked as read." });
  };

  const resolveAlert = (id: number) => {
    setAlertList((prev) => prev.map((a) => (a.id === id ? { ...a, status: "resolved" } : a)));
    setMessage({ type: "success", text: "Alert resolved successfully." });
    setSelectedId((prev) => {
      if (prev !== id) return prev;
      const next = filteredAlerts.find((a) => a.id !== id)?.id ?? null;
      return next;
    });
  };

  const toggleReminders = (id: number) => {
    setAlertList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, remindersEnabled: !a.remindersEnabled } : a))
    );
  };

  const snooze24h = (id: number) => {
    const until = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    setAlertList((prev) => prev.map((a) => (a.id === id ? { ...a, snoozedUntil: until } : a)));
    setMessage({ type: "info", text: "Alert snoozed for 24 hours." });
  };

  const performAction = (alert: Alert, action: SuggestedAction) => {
    if (action.kind === "resolve") return resolveAlert(alert.id);
    if (action.kind === "snooze") return snooze24h(alert.id);
    setMessage({ type: "info", text: `${action.label} (simulated)` });
  };

  const markSelectedAsInProgress = (id: number) => {
    setAlertList((prev) => prev.map((a) => (a.id === id && a.status === "unread" ? { ...a, status: "in_progress" } : a)));
  };

  const tabItems: Array<{ id: "all" | "unread" | AlertType; label: string; count?: number; icon?: typeof Bell }> = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread", count: unreadCount },
    { id: "critical", label: "Critical", icon: Siren },
    { id: "deadlines", label: "Deadlines", icon: Hourglass },
    { id: "inspections", label: "Inspections", icon: Shield },
    { id: "updates", label: "Updates", icon: FileCheck },
  ];

  const metricCards: Array<{ id: AlertType; label: string; value: number; icon: typeof Bell; accent: string }> = [
    { id: "critical", label: "Critical Alerts", value: summaryCounts.critical, icon: Siren, accent: colors.critical },
    { id: "deadlines", label: "Upcoming Deadlines", value: summaryCounts.deadlines, icon: Hourglass, accent: colors.warning },
    { id: "inspections", label: "Inspections", value: summaryCounts.inspections, icon: Shield, accent: colors.info },
    { id: "updates", label: "Updates", value: summaryCounts.updates, icon: FileCheck, accent: colors.success },
  ];

  return (
    <div
      className="min-h-full"
      style={{
        backgroundColor: colors.page,
        color: colors.text,
      }}
    >
      <div className="p-6 space-y-5">
        {/* Top Bar */}
        <div
          className="rounded-2xl border p-4 md:p-5"
          style={{
            backgroundColor: colors.panel,
            borderColor: colors.border,
          }}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h1 className="text-xl md:text-2xl" style={{ fontWeight: 700 }}>
                  Alerts &amp; Notifications
                </h1>
                {unreadCount > 0 && (
                  <span
                    className="px-2.5 py-1 rounded-full text-xs"
                    style={{
                      backgroundColor: `${colors.critical}20`,
                      color: colors.critical,
                      border: `1px solid ${colors.critical}50`,
                      fontWeight: 700,
                    }}
                  >
                    {unreadCount} unread
                  </span>
                )}
              </div>
              <p className="text-sm mt-1" style={{ color: colors.subtext }}>
                Compliance risks, deadlines, inspections, and policy updates — triaged and actionable.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <div
                className="flex items-center gap-2 rounded-xl border px-3 py-2"
                style={{ backgroundColor: "#0B1220", borderColor: colors.border }}
              >
                <Search className="w-4 h-4" style={{ color: colors.subtext }} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search alerts..."
                  className="bg-transparent outline-none border-none text-sm w-full placeholder:opacity-70"
                  style={{ color: colors.text }}
                />
              </div>

              <button
                onClick={markAllAsRead}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm transition-transform active:scale-[0.98]"
                style={{
                  backgroundColor: `${colors.info}22`,
                  border: `1px solid ${colors.info}55`,
                  color: colors.text,
                  fontWeight: 700,
                }}
              >
                <RefreshCw className="w-4 h-4" />
                Mark all as read
              </button>
            </div>
          </div>

          {/* Tabs + Filters */}
          <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {tabItems.map((t) => {
                const isActive = tab === t.id;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-transform active:scale-[0.98]"
                    style={{
                      backgroundColor: isActive ? "#0B1220" : "transparent",
                      border: `1px solid ${isActive ? colors.info : colors.border}`,
                      color: colors.text,
                      fontWeight: 700,
                    }}
                  >
                    {Icon && <Icon className="w-4 h-4" style={{ color: isActive ? colors.info : colors.subtext }} />}
                    <span>{t.label}</span>
                    {typeof t.count === "number" && t.count > 0 && (
                      <span
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{
                          backgroundColor: `${colors.critical}25`,
                          border: `1px solid ${colors.critical}55`,
                          color: colors.critical,
                          fontWeight: 800,
                        }}
                      >
                        {t.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 text-xs" style={{ color: colors.subtext }}>
                <Filter className="w-4 h-4" />
                Filters
              </div>

              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value as typeof filterDate)}
                className="rounded-xl px-3 py-2 text-sm outline-none"
                style={{ backgroundColor: "#0B1220", border: `1px solid ${colors.border}`, color: colors.text }}
              >
                <option value="all">Date: Any</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </select>

              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value as typeof filterSeverity)}
                className="rounded-xl px-3 py-2 text-sm outline-none"
                style={{ backgroundColor: "#0B1220", border: `1px solid ${colors.border}`, color: colors.text }}
              >
                <option value="all">Severity: Any</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                className="rounded-xl px-3 py-2 text-sm outline-none"
                style={{ backgroundColor: "#0B1220", border: `1px solid ${colors.border}`, color: colors.text }}
              >
                <option value="all">Status: Any</option>
                <option value="unread">Unread</option>
                <option value="in_progress">In progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {metricCards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.id}
                onClick={() => setTab(card.id)}
                className="rounded-2xl border p-4 text-left transition-transform hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  backgroundColor: colors.panel,
                  borderColor: colors.border,
                }}
                title={`Show ${card.label}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl" style={{ fontWeight: 800 }}>
                      {card.value}
                    </div>
                    <div className="text-xs mt-1" style={{ color: colors.subtext, fontWeight: 700 }}>
                      {card.label}
                    </div>
                  </div>
                  <div
                    className="w-10 h-10 rounded-xl border flex items-center justify-center"
                    style={{ borderColor: `${card.accent}55`, backgroundColor: `${card.accent}1A` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: card.accent }} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Success / Info Message */}
        {message && (
          <div
            className="rounded-2xl border px-4 py-3 text-sm flex items-center gap-3"
            style={{
              backgroundColor: message.type === "success" ? `${colors.success}14` : `${colors.info}14`,
              borderColor: message.type === "success" ? `${colors.success}55` : `${colors.info}55`,
              color: colors.text,
              fontWeight: 700,
            }}
          >
            {message.type === "success" ? (
              <CheckCircle2 className="w-4 h-4" style={{ color: colors.success }} />
            ) : (
              <Info className="w-4 h-4" style={{ color: colors.info }} />
            )}
            <span className="min-w-0">{message.text}</span>
          </div>
        )}

        {/* Main 70/30 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-4 items-start">
          {/* Alerts Feed */}
          <div className="space-y-3">
            {filteredAlerts.map((a) => {
              const sev = severityMeta[a.severity];
              const TypeIcon = typeMeta[a.type].icon;
              const EntityIcon = getEntityIcon(a.entity);
              const dueDays = getDaysUntil(a.dueDate);
              const score = calcPriorityScore(a);
              const isActive = selectedId === a.id;
              const isUnread = a.status === "unread";
              const isSnoozed = Boolean(a.snoozedUntil);

              const dueLabel =
                dueDays === null
                  ? null
                  : dueDays < 0
                    ? `Overdue ${Math.abs(dueDays)}d`
                    : dueDays === 0
                      ? "Due today"
                      : `${dueDays}d left`;

              const dueColor =
                dueDays === null
                  ? colors.subtext
                  : dueDays < 0
                    ? colors.critical
                    : dueDays <= 7
                      ? colors.warning
                      : colors.subtext;

              return (
                <button
                  key={a.id}
                  onClick={() => {
                    setSelectedId(a.id);
                    markSelectedAsInProgress(a.id);
                  }}
                  className="w-full text-left rounded-2xl border p-4 transition-transform hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    backgroundColor: isActive ? "#0B1220" : colors.panel,
                    borderColor: isActive ? `${colors.info}77` : colors.border,
                    boxShadow: isUnread ? `0 0 0 1px ${sev.color}33 inset` : undefined,
                    borderLeftWidth: 4,
                    borderLeftColor: sev.color,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col gap-2 pt-0.5">
                      <div
                        className="w-10 h-10 rounded-xl border flex items-center justify-center"
                        style={{ backgroundColor: `${sev.color}14`, borderColor: `${sev.color}44` }}
                      >
                        <TypeIcon className="w-5 h-5" style={{ color: sev.color }} />
                      </div>
                      <div
                        className="w-10 h-10 rounded-xl border flex items-center justify-center"
                        style={{ backgroundColor: "#0B1220", borderColor: colors.border }}
                        title="Entity"
                      >
                        <EntityIcon className="w-5 h-5" style={{ color: colors.subtext }} />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="text-sm md:text-base truncate" style={{ fontWeight: isUnread ? 800 : 700 }}>
                              {a.title}
                            </div>
                            {isSnoozed && (
                              <span
                                className="px-2 py-0.5 rounded-full text-[11px] border"
                                style={{
                                  color: colors.subtext,
                                  borderColor: colors.border,
                                  backgroundColor: "#0B1220",
                                  fontWeight: 800,
                                }}
                              >
                                Snoozed
                              </span>
                            )}
                          </div>
                          <div className="text-xs mt-1 line-clamp-2" style={{ color: colors.subtext }}>
                            {a.description}
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <div className="text-xs" style={{ color: colors.subtext, fontWeight: 700 }}>
                            {formatRelativeTime(a.createdAt)}
                          </div>
                          {dueLabel && (
                            <div className="inline-flex items-center gap-1 text-xs mt-1" style={{ color: dueColor, fontWeight: 800 }}>
                              <Clock className="w-3 h-3" />
                              {dueLabel}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs border"
                          style={{
                            borderColor: `${sev.color}55`,
                            backgroundColor: `${sev.color}12`,
                            color: colors.text,
                            fontWeight: 800,
                          }}
                        >
                          {sev.label}
                        </span>

                        <span
                          className="px-2 py-0.5 rounded-full text-xs border"
                          style={{
                            borderColor: colors.border,
                            backgroundColor: "#0B1220",
                            color: colors.subtext,
                            fontWeight: 800,
                          }}
                        >
                          {a.status === "unread" ? "Unread" : a.status === "in_progress" ? "In Progress" : "Resolved"}
                        </span>

                        <span
                          className="px-2 py-0.5 rounded-full text-xs border"
                          style={{
                            borderColor: `${colors.info}44`,
                            backgroundColor: `${colors.info}12`,
                            color: colors.text,
                            fontWeight: 800,
                          }}
                          title="Priority Score"
                        >
                          Score: {score}/100
                        </span>

                        <span className="ml-auto text-xs truncate" style={{ color: colors.subtext, fontWeight: 700 }}>
                          {a.entity} · {a.sector}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <span
                          className="inline-flex items-center gap-1 text-xs"
                          style={{ color: colors.subtext, fontWeight: 800 }}
                        >
                          <ChevronRight className="w-4 h-4" />
                          View Details
                        </span>

                        <div className="ml-auto flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              resolveAlert(a.id);
                            }}
                            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs transition-transform hover:scale-[1.02] active:scale-[0.98]"
                            style={{
                              backgroundColor: `${colors.success}22`,
                              border: `1px solid ${colors.success}55`,
                              color: colors.text,
                              fontWeight: 900,
                            }}
                            title="Resolve now"
                          >
                            <CheckCircle2 className="w-4 h-4" style={{ color: colors.success }} />
                            Resolve Now
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setMessage({ type: "info", text: "View details (simulated)" });
                            }}
                            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs transition-transform hover:scale-[1.02] active:scale-[0.98]"
                            style={{
                              backgroundColor: "#0B1220",
                              border: `1px solid ${colors.border}`,
                              color: colors.text,
                              fontWeight: 900,
                            }}
                            title="View details"
                          >
                            <Eye className="w-4 h-4" style={{ color: colors.subtext }} />
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}

            {filteredAlerts.length === 0 && (
              <div
                className="rounded-2xl border p-10 text-center"
                style={{ backgroundColor: colors.panel, borderColor: colors.border }}
              >
                <CheckCircle2 className="w-12 h-12 mx-auto mb-3" style={{ color: colors.subtext }} />
                <p className="text-sm" style={{ color: colors.subtext, fontWeight: 700 }}>
                  No alerts match the current filters.
                </p>
              </div>
            )}
          </div>

          {/* Action Panel */}
          <div
            className="rounded-2xl border p-4 lg:sticky lg:top-20"
            style={{
              backgroundColor: colors.panel,
              borderColor: colors.border,
            }}
          >
            {!selectedAlert || selectedAlert.status === "resolved" ? (
              <div className="text-center py-10">
                <Bell className="w-12 h-12 mx-auto mb-3" style={{ color: colors.subtext }} />
                <div className="text-sm" style={{ color: colors.text, fontWeight: 800 }}>
                  Select an alert
                </div>
                <div className="text-xs mt-1" style={{ color: colors.subtext, fontWeight: 700 }}>
                  Click an alert card to see details and actions.
                </div>
              </div>
            ) : (
              (() => {
                const a = selectedAlert;
                const sev = severityMeta[a.severity];
                const score = calcPriorityScore(a);
                const dueDays = getDaysUntil(a.dueDate);
                const dueLabel =
                  dueDays === null
                    ? "No due date"
                    : dueDays < 0
                      ? `Overdue by ${Math.abs(dueDays)} day(s)`
                      : dueDays === 0
                        ? "Due today"
                        : `Due in ${dueDays} day(s)`;
                const TypeIcon = typeMeta[a.type].icon;

                return (
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-9 h-9 rounded-xl border flex items-center justify-center"
                            style={{ backgroundColor: `${sev.color}14`, borderColor: `${sev.color}44` }}
                          >
                            <TypeIcon className="w-5 h-5" style={{ color: sev.color }} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm md:text-base truncate" style={{ fontWeight: 900 }}>
                              {a.title}
                            </div>
                            <div className="text-xs mt-0.5" style={{ color: colors.subtext, fontWeight: 700 }}>
                              {a.entity} · {a.sector}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <div className="text-xs" style={{ color: colors.subtext, fontWeight: 700 }}>
                          Priority
                        </div>
                        <div className="text-lg" style={{ color: colors.text, fontWeight: 900 }}>
                          {score}
                          <span className="text-xs" style={{ color: colors.subtext, fontWeight: 800 }}>
                            /100
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="rounded-2xl border p-3"
                      style={{ borderColor: colors.border, backgroundColor: "#0B1220" }}
                    >
                      <div className="text-xs" style={{ color: colors.subtext, fontWeight: 800 }}>
                        Why it matters
                      </div>
                      <div className="text-sm mt-1" style={{ color: colors.text, fontWeight: 700 }}>
                        {a.description}
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs border"
                          style={{
                            borderColor: `${sev.color}55`,
                            backgroundColor: `${sev.color}12`,
                            color: colors.text,
                            fontWeight: 900,
                          }}
                        >
                          {sev.label}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs border"
                          style={{
                            borderColor: colors.border,
                            backgroundColor: colors.panel,
                            color: colors.subtext,
                            fontWeight: 900,
                          }}
                        >
                          Impact: {a.impact}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs border"
                          style={{
                            borderColor: dueDays !== null && dueDays < 0 ? `${colors.critical}66` : colors.border,
                            backgroundColor: colors.panel,
                            color: dueDays !== null && dueDays < 0 ? colors.critical : colors.subtext,
                            fontWeight: 900,
                          }}
                        >
                          {dueLabel}
                        </span>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="space-y-2">
                      <div className="text-xs" style={{ color: colors.subtext, fontWeight: 900 }}>
                        Metrics
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {(a.metrics?.length ? a.metrics : [{ label: "Status", value: a.status }]).map((m) => (
                          <div
                            key={`${m.label}-${m.value}`}
                            className="rounded-xl border px-3 py-2 flex items-center justify-between gap-3"
                            style={{ backgroundColor: "#0B1220", borderColor: colors.border }}
                          >
                            <div className="text-xs" style={{ color: colors.subtext, fontWeight: 800 }}>
                              {m.label}
                            </div>
                            <div
                              className="text-xs text-right"
                              style={{ color: colors.text, fontWeight: m.emphasis ? 900 : 800 }}
                            >
                              {m.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Smart features */}
                    <div className="rounded-2xl border p-3" style={{ backgroundColor: "#0B1220", borderColor: colors.border }}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-xs" style={{ color: colors.subtext, fontWeight: 900 }}>
                            Reminders
                          </div>
                          <div className="text-sm mt-0.5" style={{ color: colors.text, fontWeight: 800 }}>
                            {a.remindersEnabled ? "Enabled" : "Disabled"}
                          </div>
                        </div>
                        <button
                          onClick={() => toggleReminders(a.id)}
                          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs transition-transform hover:scale-[1.02] active:scale-[0.98]"
                          style={{
                            backgroundColor: a.remindersEnabled ? `${colors.success}22` : `${colors.subtext}16`,
                            border: `1px solid ${a.remindersEnabled ? colors.success : colors.border}`,
                            color: colors.text,
                            fontWeight: 900,
                          }}
                          title="Toggle reminders"
                        >
                          {a.remindersEnabled ? (
                            <Bell className="w-4 h-4" style={{ color: colors.success }} />
                          ) : (
                            <BellOff className="w-4 h-4" style={{ color: colors.subtext }} />
                          )}
                          Toggle
                        </button>
                      </div>
                      {a.snoozedUntil && (
                        <div className="text-xs mt-2" style={{ color: colors.subtext, fontWeight: 800 }}>
                          Snoozed until: <span style={{ color: colors.text }}>{a.snoozedUntil}</span>
                        </div>
                      )}
                    </div>

                    {/* Suggested Actions */}
                    <div className="space-y-2">
                      <div className="text-xs" style={{ color: colors.subtext, fontWeight: 900 }}>
                        Suggested actions
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        {a.suggestedActions.map((act) => {
                          const isResolve = act.kind === "resolve";
                          const isSnooze = act.kind === "snooze";
                          const accent = isResolve ? colors.success : isSnooze ? colors.warning : colors.info;
                          const Icon =
                            act.kind === "resolve"
                              ? CheckCircle2
                              : act.kind === "buy_credits"
                                ? Calendar
                                : act.kind === "prepare_documents"
                                  ? Shield
                                  : act.kind === "upload_report"
                                    ? FileCheck
                                    : act.kind === "view_details"
                                      ? Eye
                                      : Clock;
                          return (
                            <button
                              key={act.id}
                              onClick={() => performAction(a, act)}
                              className="rounded-2xl border px-4 py-3 flex items-center justify-between gap-3 transition-transform hover:scale-[1.01] active:scale-[0.99]"
                              style={{ backgroundColor: colors.panel, borderColor: `${accent}55`, color: colors.text }}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <div
                                  className="w-9 h-9 rounded-xl border flex items-center justify-center"
                                  style={{ backgroundColor: `${accent}14`, borderColor: `${accent}44` }}
                                >
                                  <Icon className="w-5 h-5" style={{ color: accent }} />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm truncate" style={{ fontWeight: 900 }}>
                                    {act.label}
                                  </div>
                                  <div className="text-xs mt-0.5" style={{ color: colors.subtext, fontWeight: 800 }}>
                                    {isResolve ? "Mark as resolved and archive" : isSnooze ? "Temporarily hide from focus" : "Simulated action"}
                                  </div>
                                </div>
                              </div>
                              <ChevronRight className="w-5 h-5" style={{ color: colors.subtext }} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </div>

        {/* Archive / History */}
        <div
          className="rounded-2xl border p-4"
          style={{ backgroundColor: colors.panel, borderColor: colors.border }}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm" style={{ fontWeight: 900 }}>
                History / Archive
              </div>
              <div className="text-xs mt-0.5" style={{ color: colors.subtext, fontWeight: 800 }}>
                Resolved alerts (for compliance proof and audit trails)
              </div>
            </div>
            <div className="text-xs" style={{ color: colors.subtext, fontWeight: 900 }}>
              {resolvedAlerts.length} resolved
            </div>
          </div>

          <div className="mt-3 space-y-2">
            {resolvedAlerts.length === 0 ? (
              <div className="text-sm py-6 text-center" style={{ color: colors.subtext, fontWeight: 800 }}>
                No resolved alerts yet.
              </div>
            ) : (
              resolvedAlerts.slice(0, 8).map((a) => {
                const sev = severityMeta[a.severity];
                return (
                  <div
                    key={a.id}
                    className="rounded-2xl border p-3 flex items-start justify-between gap-3"
                    style={{ backgroundColor: "#0B1220", borderColor: colors.border, borderLeftWidth: 4, borderLeftColor: sev.color }}
                  >
                    <div className="min-w-0">
                      <div className="text-sm truncate" style={{ color: colors.text, fontWeight: 900 }}>
                        {a.title}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: colors.subtext, fontWeight: 800 }}>
                        {a.entity} · {a.sector} · {a.createdAt}
                      </div>
                    </div>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs border shrink-0"
                      style={{ borderColor: `${colors.success}55`, backgroundColor: `${colors.success}12`, color: colors.text, fontWeight: 900 }}
                    >
                      Resolved
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
