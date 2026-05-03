import { useState } from "react";
import {
  Bell,
  AlertTriangle,
  Calendar,
  FileCheck,
  Shield,
  Clock,
  CheckCircle2,
  Info,
  ChevronDown,
  Filter,
  Eye,
  X,
} from "lucide-react";

type AlertPriority = "critical" | "high" | "medium" | "low";
type AlertCategory = "inspection" | "deadline" | "compliance" | "notification";

interface Alert {
  id: number;
  title: string;
  description: string;
  priority: AlertPriority;
  category: AlertCategory;
  date: string;
  dueDate?: string;
  entity: string;
  sector: string;
  isRead: boolean;
  action?: string;
  targetRole: "company" | "farmer" | "all";
}

const alerts: Alert[] = [
  {
    id: 1,
    title: "BEE Compliance Audit - Q1 FY2026",
    description: "Bureau of Energy Efficiency scheduled on-site compliance audit for verification of FY2025-26 emission intensity data. Ensure all MRV documentation is prepared.",
    priority: "critical",
    category: "inspection",
    date: "2026-03-06",
    dueDate: "2026-03-20",
    entity: "Tata Steel Ltd.",
    sector: "Iron & Steel",
    isRead: false,
    action: "Prepare MRV Documentation",
    targetRole: "company",
  },
  {
    id: 2,
    title: "ACVA Audit Notification - Wadi Plant",
    description: "Accredited Carbon Verification Agency (TUV SUD) will conduct independent emissions data audit as per CCTS Phase 1 requirements.",
    priority: "critical",
    category: "inspection",
    date: "2026-03-05",
    dueDate: "2026-03-15",
    entity: "ACC Cement Ltd.",
    sector: "Cement",
    isRead: false,
    action: "Schedule Audit Team",
    targetRole: "company",
  },
  {
    id: 3,
    title: "MRV Plan Submission Deadline",
    description: "Mandatory submission of Monitoring, Reporting & Verification plan to BEE within 3 months of compliance cycle commencement.",
    priority: "high",
    category: "deadline",
    date: "2026-03-04",
    dueDate: "2026-04-01",
    entity: "Hindalco Industries",
    sector: "Aluminium",
    isRead: false,
    action: "Submit MRV Plan",
    targetRole: "company",
  },
  {
    id: 4,
    title: "CERC Market Regulation Update",
    description: "Central Electricity Regulatory Commission has updated price corridor limits for CCC trading. New floor price: INR 800, ceiling: INR 2,500 per tCO2e.",
    priority: "medium",
    category: "notification",
    date: "2026-03-03",
    entity: "All Market Participants",
    sector: "All Sectors",
    isRead: true,
    targetRole: "all",
  },
  {
    id: 5,
    title: "Soil Carbon Verification Needed",
    description: "Your recently registered plot needs physical verification by the local FPO representative before credits can be issued.",
    priority: "high",
    category: "inspection",
    date: "2026-03-01",
    dueDate: "2026-03-10",
    entity: "Local Farm",
    sector: "Agriculture",
    isRead: false,
    action: "Schedule Visit",
    targetRole: "farmer",
  },
  {
    id: 6,
    title: "Emission Intensity Target Notification",
    description: "MoEFCC has formally notified updated emission intensity targets for textile sector: 3.5-6.2% reduction for Phase 1.",
    priority: "medium",
    category: "compliance",
    date: "2026-02-28",
    entity: "Raymond Textiles",
    sector: "Textiles",
    isRead: true,
    targetRole: "company",
  },
  {
    id: 7,
    title: "Credit Issuance Approved",
    description: "Your agroforestry project has been successfully verified. 450 Carbon Credits have been issued to your account.",
    priority: "low",
    category: "notification",
    date: "2026-02-25",
    entity: "Your Profile",
    sector: "Agriculture",
    isRead: true,
    targetRole: "farmer",
  },
];

const priorityConfig: Record<AlertPriority, { label: string; color: string; bg: string; border: string }> = {
  critical: { label: "Critical", color: "#c62828", bg: "#fecaca", border: "#ef4444" },
  high: { label: "High", color: "#b45309", bg: "#fef3c7", border: "#f59e0b" },
  medium: { label: "Medium", color: "#0369a1", bg: "#dbeafe", border: "#3b82f6" },
  low: { label: "Low", color: "#5a6b5a", bg: "#e8ede5", border: "#9ca3af" },
};

const categoryConfig: Record<AlertCategory, { label: string; icon: typeof Bell; color: string }> = {
  inspection: { label: "Government Inspection", icon: Shield, color: "#c62828" },
  deadline: { label: "Compliance Deadline", icon: Calendar, color: "#b45309" },
  compliance: { label: "Regulatory Update", icon: FileCheck, color: "#0369a1" },
  notification: { label: "System Notification", icon: Info, color: "#5a6b5a" },
};

import { useUserRole } from "../context/UserProvider";

export function Alerts() {
  const { role } = useUserRole();
  const [filterPriority, setFilterPriority] = useState<"all" | AlertPriority>("all");
  const [filterCategory, setFilterCategory] = useState<"all" | AlertCategory>("all");
  const [expandedAlert, setExpandedAlert] = useState<number | null>(null);
  
  const roleAlerts = alerts.filter(a => a.targetRole === "all" || a.targetRole === role);
  const [alertList, setAlertList] = useState(roleAlerts);

  const unreadCount = alertList.filter((a) => !a.isRead).length;

  const filteredAlerts = alertList.filter((a) => {
    const matchesPriority = filterPriority === "all" || a.priority === filterPriority;
    const matchesCategory = filterCategory === "all" || a.category === filterCategory;
    return matchesPriority && matchesCategory;
  });

  const markAsRead = (id: number) => {
    setAlertList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a))
    );
  };

  const markAllAsRead = () => {
    setAlertList((prev) => prev.map((a) => ({ ...a, isRead: true })));
  };

  const getDaysUntil = (dateStr?: string) => {
    if (!dateStr) return null;
    const now = new Date("2026-03-06");
    const due = new Date(dateStr);
    const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl" style={{ fontWeight: 600 }}>Alerts & Notifications</h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-1 bg-destructive text-destructive-foreground rounded-full text-xs" style={{ fontWeight: 600 }}>
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Government inspections, compliance deadlines, and regulatory updates
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 text-sm text-primary hover:bg-secondary rounded-lg transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(["inspection", "deadline", "compliance", "notification"] as AlertCategory[]).map((cat) => {
          const config = categoryConfig[cat];
          const count = alertList.filter((a) => a.category === cat).length;
          const unread = alertList.filter((a) => a.category === cat && !a.isRead).length;
          const Icon = config.icon;
          return (
            <button
              key={cat}
              onClick={() => setFilterCategory(filterCategory === cat ? "all" : cat)}
              className={`bg-card rounded-xl border p-4 text-left transition-all ${
                filterCategory === cat ? "border-primary shadow-md" : "border-border hover:shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5" style={{ color: config.color }} />
                {unread > 0 && (
                  <span className="w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center" style={{ fontWeight: 600 }}>
                    {unread}
                  </span>
                )}
              </div>
              <p className="text-xl" style={{ fontWeight: 600 }}>{count}</p>
              <p className="text-xs text-muted-foreground">{config.label}</p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <div className="relative">
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as typeof filterPriority)}
            className="appearance-none bg-card border border-border rounded-lg px-3 py-2 pr-8 text-sm cursor-pointer"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as typeof filterCategory)}
            className="appearance-none bg-card border border-border rounded-lg px-3 py-2 pr-8 text-sm cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="inspection">Inspections</option>
            <option value="deadline">Deadlines</option>
            <option value="compliance">Compliance</option>
            <option value="notification">Notifications</option>
          </select>
          <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => {
          const prioConfig = priorityConfig[alert.priority];
          const catConfig = categoryConfig[alert.category];
          const CatIcon = catConfig.icon;
          const daysUntil = getDaysUntil(alert.dueDate);
          const isExpanded = expandedAlert === alert.id;

          return (
            <div
              key={alert.id}
              className={`bg-card rounded-xl border overflow-hidden transition-all ${
                !alert.isRead ? "border-l-4" : "border"
              }`}
              style={{
                borderLeftColor: !alert.isRead ? prioConfig.border : undefined,
              }}
            >
              <button
                onClick={() => {
                  setExpandedAlert(isExpanded ? null : alert.id);
                  if (!alert.isRead) markAsRead(alert.id);
                }}
                className="w-full p-4 text-left"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${catConfig.color}15` }}
                  >
                    <CatIcon className="w-5 h-5" style={{ color: catConfig.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4
                            className="text-sm"
                            style={{ fontWeight: alert.isRead ? 400 : 600 }}
                          >
                            {alert.title}
                          </h4>
                          <span
                            className="px-2 py-0.5 rounded-full text-xs"
                            style={{
                              backgroundColor: prioConfig.bg,
                              color: prioConfig.color,
                              fontWeight: 500,
                            }}
                          >
                            {prioConfig.label}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {alert.entity} &middot; {alert.sector}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-muted-foreground">{alert.date}</p>
                        {daysUntil !== null && daysUntil >= 0 && (
                          <span
                            className="inline-flex items-center gap-1 text-xs mt-1"
                            style={{
                              color: daysUntil <= 7 ? "#c62828" : daysUntil <= 14 ? "#b45309" : "#5a6b5a",
                              fontWeight: 500,
                            }}
                          >
                            <Clock className="w-3 h-3" />
                            {daysUntil === 0 ? "Due today" : `${daysUntil} days left`}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-border pt-3 ml-14">
                  <p className="text-sm text-muted-foreground mb-4">{alert.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Category</p>
                      <p className="text-sm" style={{ fontWeight: 500 }}>{catConfig.label}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Entity</p>
                      <p className="text-sm" style={{ fontWeight: 500 }}>{alert.entity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Sector</p>
                      <p className="text-sm" style={{ fontWeight: 500 }}>{alert.sector}</p>
                    </div>
                    {alert.dueDate && (
                      <div>
                        <p className="text-xs text-muted-foreground">Due Date</p>
                        <p className="text-sm" style={{ fontWeight: 500 }}>{alert.dueDate}</p>
                      </div>
                    )}
                  </div>
                  {alert.action && (
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                        {alert.action}
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm hover:bg-accent transition-colors">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredAlerts.length === 0 && (
          <div className="bg-card rounded-xl border border-border p-12 text-center">
            <CheckCircle2 className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">No alerts matching the current filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
