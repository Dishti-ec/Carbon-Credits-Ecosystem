import { useState } from "react";
import {
  Leaf,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Filter,
  ChevronDown,
  TreePine,
  Factory,
  Droplets,
  Sprout,
} from "lucide-react";

type CreditStatus = "verified" | "pending" | "rejected";

interface CarbonCredit {
  id: string;
  projectName: string;
  type: "farmer" | "corporate";
  method: string;
  credits: number;
  status: CreditStatus;
  verifier: string;
  date: string;
  location: string;
  icon: typeof TreePine;
}

const credits: CarbonCredit[] = [
  {
    id: "CCC-2026-001245",
    projectName: "Rajasthan Agroforestry Initiative",
    type: "farmer",
    method: "Agroforestry",
    credits: 3400,
    status: "verified",
    verifier: "DNV GL India",
    date: "2026-02-28",
    location: "Rajasthan",
    icon: TreePine,
  },
  {
    id: "CCC-2026-001198",
    projectName: "Tata Steel - Jamshedpur Plant",
    type: "corporate",
    method: "Energy Efficiency",
    credits: 12800,
    status: "verified",
    verifier: "Bureau Veritas",
    date: "2026-02-15",
    location: "Jharkhand",
    icon: Factory,
  },
  {
    id: "CCC-2026-001302",
    projectName: "Punjab AWD Rice Program",
    type: "farmer",
    method: "Alternate Wetting & Drying",
    credits: 1850,
    status: "pending",
    verifier: "SGS India",
    date: "2026-03-01",
    location: "Punjab",
    icon: Droplets,
  },
  {
    id: "CCC-2026-001156",
    projectName: "ACC Cement - Wadi Works",
    type: "corporate",
    method: "Process Optimization",
    credits: 8200,
    status: "verified",
    verifier: "TUV SUD",
    date: "2026-01-20",
    location: "Karnataka",
    icon: Factory,
  },
  {
    id: "CCC-2026-001378",
    projectName: "Maharashtra Biochar Project",
    type: "farmer",
    method: "Biochar Application",
    credits: 2100,
    status: "pending",
    verifier: "CRISIL Verification",
    date: "2026-03-04",
    location: "Maharashtra",
    icon: Sprout,
  },
  {
    id: "CCC-2026-001089",
    projectName: "Hindalco Aluminium - Renukoot",
    type: "corporate",
    method: "Smelting Optimization",
    credits: 5600,
    status: "rejected",
    verifier: "DNV GL India",
    date: "2026-01-10",
    location: "Uttar Pradesh",
    icon: Factory,
  },
];

const statusConfig: Record<CreditStatus, { label: string; color: string; bg: string; icon: typeof CheckCircle2 }> = {
  verified: { label: "Verified", color: "#2d6a4f", bg: "#d8f3dc", icon: CheckCircle2 },
  pending: { label: "Pending", color: "#b45309", bg: "#fef3c7", icon: Clock },
  rejected: { label: "Rejected", color: "#c62828", bg: "#fecaca", icon: XCircle },
};

export function CarbonCredits() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "farmer" | "corporate">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | CreditStatus>("all");
  const [checkerOpen, setCheckerOpen] = useState(false);
  const [checkerInput, setCheckerInput] = useState("");
  const [checkerResult, setCheckerResult] = useState<CarbonCredit | null>(null);
  const [checkerNotFound, setCheckerNotFound] = useState(false);

  const filteredCredits = credits.filter((c) => {
    const matchesSearch =
      c.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || c.type === filterType;
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCheck = () => {
    const found = credits.find((c) => c.id.toLowerCase() === checkerInput.toLowerCase());
    if (found) {
      setCheckerResult(found);
      setCheckerNotFound(false);
    } else {
      setCheckerResult(null);
      setCheckerNotFound(true);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl" style={{ fontWeight: 600 }}>Carbon Credits</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track, verify, and manage Carbon Credit Certificates (CCCs)
          </p>
        </div>
        <button
          onClick={() => setCheckerOpen(!checkerOpen)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Leaf className="w-4 h-4" />
          Credit Checker
        </button>
      </div>

      {/* Credit Checker Panel */}
      {checkerOpen && (
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-base mb-3" style={{ fontWeight: 600 }}>
            Carbon Credit Verification Checker
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Enter a CCC ID to verify its authenticity and check status on the Grid-India registry.
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={checkerInput}
              onChange={(e) => setCheckerInput(e.target.value)}
              placeholder="Enter CCC ID (e.g., CCC-2026-001245)"
              className="flex-1 px-4 py-2.5 bg-input-background rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            />
            <button
              onClick={handleCheck}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
            >
              Verify
            </button>
          </div>

          {checkerResult && (
            <div className="mt-4 p-4 bg-[#d8f3dc]/50 rounded-lg border border-[#2d6a4f]/20">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-[#2d6a4f]" />
                <span className="text-sm" style={{ fontWeight: 600, color: "#2d6a4f" }}>
                  Credit Found & Verified on Registry
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Certificate ID</p>
                  <p className="text-sm" style={{ fontWeight: 500 }}>{checkerResult.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Project</p>
                  <p className="text-sm" style={{ fontWeight: 500 }}>{checkerResult.projectName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Credits (tCO2e)</p>
                  <p className="text-sm" style={{ fontWeight: 500 }}>{checkerResult.credits.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                    style={{
                      backgroundColor: statusConfig[checkerResult.status].bg,
                      color: statusConfig[checkerResult.status].color,
                    }}
                  >
                    {statusConfig[checkerResult.status].label}
                  </span>
                </div>
              </div>
            </div>
          )}

          {checkerNotFound && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm" style={{ fontWeight: 500, color: "#c62828" }}>
                  No credit found with this ID. Please verify and try again.
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-card rounded-lg border border-border px-3 py-2 flex-1 max-w-sm">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by project or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as typeof filterType)}
              className="appearance-none bg-card border border-border rounded-lg px-3 py-2 pr-8 text-sm cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="farmer">Farmer</option>
              <option value="corporate">Corporate</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              className="appearance-none bg-card border border-border rounded-lg px-3 py-2 pr-8 text-sm cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Credits Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs text-muted-foreground" style={{ fontWeight: 500 }}>
                  Project
                </th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground" style={{ fontWeight: 500 }}>
                  CCC ID
                </th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground" style={{ fontWeight: 500 }}>
                  Method
                </th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground" style={{ fontWeight: 500 }}>
                  Credits
                </th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground" style={{ fontWeight: 500 }}>
                  Status
                </th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground" style={{ fontWeight: 500 }}>
                  Verifier
                </th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground" style={{ fontWeight: 500 }}>
                  
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCredits.map((credit) => {
                const StatusIcon = statusConfig[credit.status].icon;
                return (
                  <tr key={credit.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                          <credit.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm" style={{ fontWeight: 500 }}>{credit.projectName}</p>
                          <p className="text-xs text-muted-foreground">{credit.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-mono text-muted-foreground">{credit.id}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm">{credit.method}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm" style={{ fontWeight: 600 }}>{credit.credits.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground ml-1">tCO2e</span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs"
                        style={{
                          backgroundColor: statusConfig[credit.status].bg,
                          color: statusConfig[credit.status].color,
                          fontWeight: 500,
                        }}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[credit.status].label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm text-muted-foreground">{credit.verifier}</span>
                    </td>
                    <td className="px-5 py-4">
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors">
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
