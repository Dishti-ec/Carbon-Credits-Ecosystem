import { 
  ShieldCheck, AlertTriangle, XCircle, TrendingUp, TrendingDown,
  Calendar, FileText, CheckCircle2, AlertCircle, Clock,
  UploadCloud, ArrowRight, Activity, Zap, Check, FileBadge,
  AlertOctagon, History
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from "recharts";
import { useState } from "react";
import { useUserRole } from "../context/UserProvider";

// --- MOCK DATA ---

const emissionsData = [
  { month: "Jan", limit: 5000, actual: 4800 },
  { month: "Feb", limit: 5000, actual: 4950 },
  { month: "Mar", limit: 4800, actual: 5100 },
  { month: "Apr", limit: 4800, actual: 4700 },
  { month: "May", limit: 4600, actual: 4500 },
  { month: "Jun", limit: 4600, actual: 4550 },
];

const creditUsageData = [
  { month: "Jan", bought: 1000, retired: 800 },
  { month: "Feb", bought: 500, retired: 600 },
  { month: "Mar", bought: 2000, retired: 1500 },
  { month: "Apr", bought: 0, retired: 1000 },
  { month: "May", bought: 1200, retired: 500 },
];

const ledgerData = [
  { id: "TX-902", date: "2024-05-12", type: "Bought", credits: 1500, source: "Boreal Forest Project", status: "Verified" },
  { id: "TX-901", date: "2024-04-28", type: "Retired", credits: 1000, source: "Internal Offset", status: "Verified" },
  { id: "TX-900", date: "2024-03-15", type: "Issued", credits: 5000, source: "Registry Allocation", status: "Verified" },
  { id: "TX-899", date: "2024-03-10", type: "Bought", credits: 500, source: "Solar Initiative Alpha", status: "Pending" },
  { id: "TX-898", date: "2024-02-15", type: "Retired", credits: 2100, source: "Internal Offset", status: "Verified" },
];

const docsData = [
  { name: "Q1 Emission Report.pdf", type: "Emission Report", date: "2024-04-05", status: "Approved" },
  { name: "Annual Audit 2023.pdf", type: "Audit", date: "2024-01-15", status: "Approved" },
  { name: "Project Justification.docx", type: "Project Doc", date: "2024-05-01", status: "Pending review" },
];

const deadlinesData = [
  { task: "Q2 Emission Report", date: "15 Jul 2024", status: "Pending" },
  { task: "Mid-Year Audit Submission", date: "30 Aug 2024", status: "Not Started" },
  { task: "Q1 Emission Report", date: "15 Apr 2024", status: "Submitted" },
];

const auditLogsData = [
  { date: "2023-12-10", finding: "Minor discrepancy in Scope 2 calculation", status: "Resolved", action: "Updated factors" },
  { date: "2024-05-02", finding: "Missing supplier emission data", status: "In Progress", action: "Collect supplier DB" },
];

export function Compliance() {
  const { fullName } = useUserRole();

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1600px] mx-auto pb-28 font-[Inter,DM_Sans,sans-serif]">
      
      {/* HEADER */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-foreground">
            Compliance Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor {fullName || "your company"}'s regulatory health, emission limits, and credit ledgers.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/90 transition-colors flex items-center gap-2">
            <UploadCloud className="w-4 h-4" />
            Upload Report
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            Buy Credits
          </button>
        </div>
      </div>

      {/* 1. COMPLIANCE OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75 fill-mode-both">
        {/* Compliance Score */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col justify-between">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Compliance Score</h3>
          <div className="flex items-end gap-3">
            <span className="text-4xl font-black text-green-600">78%</span>
            <span className="text-sm text-green-600 font-medium mb-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +2%</span>
          </div>
          <div className="w-full bg-muted h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-green-600 h-full rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>

        {/* Total Credits */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col justify-between">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Total Credits</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Issued</span>
              <span className="font-medium">10,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Used</span>
              <span className="font-medium text-amber-600">4,600</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-border">
              <span className="font-bold">Remaining</span>
              <span className="font-bold text-primary">5,400</span>
            </div>
          </div>
        </div>

        {/* Emission Status */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col justify-between">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Emission Status</h3>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Activity className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">4,550 <span className="text-sm text-muted-foreground font-normal">tCO2e</span></p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Current month emissions</p>
          <p className="text-xs font-medium text-amber-600 mt-1">Limit: 4,600 tCO2e (98% capacity)</p>
        </div>

        {/* Pending Actions */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col justify-between">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Pending Actions</h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertOctagon className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-3xl font-bold">3</span>
          </div>
          <p className="text-xs text-muted-foreground mt-4">2 Documents, 1 Audit Fix</p>
        </div>

        {/* Next Deadline */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col justify-between">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Next Deadline</h3>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-lg font-bold">15 Jul 2024</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Q2 Emission Report</p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-amber-100 text-amber-700 text-xs font-medium w-fit">
            <Clock className="w-3 h-3" /> 72 days left
          </div>
        </div>
      </div>

      {/* 2. CHARTS + ALERTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150 fill-mode-both">
        {/* Charts (Left 2/3) */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Emissions vs Limits</h2>
            <select className="bg-input-background border border-border rounded-lg px-3 py-1.5 text-sm">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={emissionsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#40916c" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#40916c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="actual" name="Actual Emissions" stroke="#40916c" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                <Area type="step" dataKey="limit" name="Emission Limit" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts Panel (Right 1/3) */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-bold">Risk & Alerts</h2>
          </div>
          <div className="flex-1 space-y-4">
            <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 transition-colors hover:bg-red-100/50 cursor-pointer">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-red-900">Emission Limit Approaching</h4>
                <p className="text-xs text-red-700 mt-1">May emissions are at 98% of the regulatory limit. Reduce output or procure additional offset credits.</p>
              </div>
            </div>
            
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3 transition-colors hover:bg-amber-100/50 cursor-pointer">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-900">Expiring Credits</h4>
                <p className="text-xs text-amber-700 mt-1">500 credits (TX-899) will expire in 45 days if not retired. Action required.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3 transition-colors hover:bg-blue-100/50 cursor-pointer">
              <FileBadge className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-blue-900">Audit Action Pending</h4>
                <p className="text-xs text-blue-700 mt-1">Supplier emission data is still in progress for the Q1 audit. Ensure completion by May 30.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. LEDGER + REQUIREMENTS TRACKER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200 fill-mode-both">
        
        {/* Carbon Credit Ledger (Left 2/3) */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold">Carbon Credit Ledger</h2>
            </div>
            <button className="text-sm font-medium text-primary hover:underline">View All Transactions</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Date</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Credits</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3 rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {ledgerData.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{row.date}</td>
                    <td className="px-4 py-3 font-medium">
                      <span className={`px-2 py-1 rounded text-xs ${
                        row.type === 'Bought' ? 'bg-blue-100 text-blue-700' :
                        row.type === 'Retired' ? 'bg-amber-100 text-amber-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {row.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-foreground">
                      {row.type === 'Retired' ? '-' : '+'}{row.credits.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{row.source}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {row.status === 'Verified' ? (
                          <><CheckCircle2 className="w-3.5 h-3.5 text-green-500"/> <span className="text-green-600 font-medium text-xs">Verified</span></>
                        ) : (
                          <><Clock className="w-3.5 h-3.5 text-amber-500"/> <span className="text-amber-600 font-medium text-xs">Pending</span></>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Requirements Tracker (Right 1/3) */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col h-full">
          <h2 className="text-lg font-bold mb-6">Requirements Tracker</h2>
          
          <div className="space-y-6 flex-1">
            {/* Required vs Owned */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Required Credits for EOY</span>
                <span className="font-bold">10,000</span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-muted-foreground">Owned & Verified</span>
                <span className="font-medium">8,200</span>
              </div>
              <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '82%' }}></div>
              </div>
              <p className="text-xs text-red-600 mt-2 font-medium flex items-center gap-1">
                <AlertTriangle className="w-3 h-3"/> Shortfall: 1,800 credits
              </p>
            </div>

            <div className="w-full h-px bg-border"></div>

            {/* Target Reduction vs Achieved */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Target Reduction 2024</span>
                <span className="font-bold">15%</span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-muted-foreground">Achieved YTD</span>
                <span className="font-medium">12.5%</span>
              </div>
              <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '83%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">On track to meet target by November.</p>
            </div>
          </div>

          <button className="w-full mt-6 py-3 bg-red-50 text-red-700 rounded-xl font-bold text-sm border border-red-200 hover:bg-red-100 transition-colors">
            Procure Shortfall Credits
          </button>
        </div>

      </div>

      {/* 4. BOTTOM ROW: DOCUMENTS, DEADLINES, AUDIT LOGS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both">
        
        {/* Documents */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold flex items-center gap-2"><FileText className="w-4 h-4 text-primary"/> Documents</h2>
            <button className="text-xs bg-muted px-2 py-1 rounded font-medium hover:bg-muted/80">Upload</button>
          </div>
          <div className="space-y-3">
            {docsData.map((doc, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/20 transition-colors">
                <div className="flex items-start gap-3 overflow-hidden">
                  <div className="bg-primary/10 p-2 rounded text-primary shrink-0">
                    <FileBadge className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <p className="text-sm font-medium truncate">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.date} • {doc.type}</p>
                  </div>
                </div>
                <div className="shrink-0 ml-2">
                  {doc.status === 'Approved' ? (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-100 px-2 py-0.5 rounded-full">Approved</span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Pending</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deadlines Tracker */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-center mb-5 gap-2">
            <Calendar className="w-4 h-4 text-blue-500"/>
            <h2 className="text-base font-bold">Filing & Deadlines</h2>
          </div>
          <div className="relative border-l border-border ml-3 space-y-6">
            {deadlinesData.map((item, i) => (
              <div key={i} className="relative pl-6">
                <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${
                  item.status === 'Submitted' ? 'bg-green-500' :
                  item.status === 'Pending' ? 'bg-amber-500 ring-4 ring-amber-100' :
                  'bg-muted-foreground'
                }`}></div>
                <p className="text-xs font-bold text-muted-foreground mb-0.5">{item.date}</p>
                <p className="text-sm font-medium text-foreground">{item.task}</p>
                <span className={`inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  item.status === 'Submitted' ? 'text-green-700 bg-green-100' :
                  item.status === 'Pending' ? 'text-amber-700 bg-amber-100' :
                  'text-muted-foreground bg-muted'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Logs */}
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <div className="flex items-center mb-5 gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-500"/>
            <h2 className="text-base font-bold">Audit & Inspections</h2>
          </div>
          <div className="space-y-4">
            {auditLogsData.map((log, i) => (
              <div key={i} className="border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-xs text-muted-foreground">{log.date}</p>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    log.status === 'Resolved' ? 'text-green-700 bg-green-100' : 'text-amber-700 bg-amber-100'
                  }`}>
                    {log.status}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground mb-1">{log.finding}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ArrowRight className="w-3 h-3"/> {log.action}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
