import { NavLink, Link } from "react-router";
import {
  LayoutDashboard,
  Leaf,
  Map,
  GraduationCap,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Factory,
  Sprout,
  X,
  MapPin,
  Briefcase
} from "lucide-react";
import { useState } from "react";
import { useUserRole } from "../context/UserProvider";

const allNavItems = [
  { to: "/app/dashboard", icon: LayoutDashboard, label: "Dashboard", public: true },
  { to: "/app/portfolio", icon: Briefcase, label: "Portfolio", role: "farmer" },
  { to: "/app/compliance", icon: LayoutDashboard, label: "Compliance", role: "company" },
  { to: "/app/carbon-credits", icon: Leaf, label: "Carbon Credits", public: true },
  { to: "/app/companies", icon: Factory, label: "Companies", public: true },
  { to: "/app/farmlands", icon: Sprout, label: "Farmlands", public: true },
  { to: "/app/map", icon: Map, label: "Map View", public: true },
  { to: "/app/education", icon: GraduationCap, label: "Education Hub", public: true },
  { to: "/app/alerts", icon: Bell, label: "Alerts", public: true },
];

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const { role } = useUserRole();

  const navItems = allNavItems.filter((item) => item.public || item.role === role);

  return (
    <aside
      className={`
        ${collapsed ? "w-[260px] md:w-[72px]" : "w-[260px]"}
        bg-sidebar text-sidebar-foreground flex flex-col h-screen fixed md:sticky top-0 transition-all duration-300 z-50
        ${isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between border-b border-sidebar-border px-4 py-5 hover:bg-sidebar-accent/50 transition-colors">
        <Link to="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen?.(false)}>
          <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center shrink-0">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          {(!collapsed || isMobileMenuOpen) && (
            <div className="overflow-hidden">
              <p className="text-sm tracking-wide opacity-90" style={{ fontWeight: 600 }}>
                CarbonBridge
              </p>
              <p className="text-xs opacity-60">Indian Carbon Market</p>
            </div>
          )}
        </Link>
        {/* Mobile Close Button */}
        <button 
          className="md:hidden p-2 -mr-2 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          onClick={() => setIsMobileMenuOpen?.(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/app/dashboard"}
            onClick={() => setIsMobileMenuOpen?.(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {(!collapsed || isMobileMenuOpen) && <span className="text-sm">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-sidebar-border p-2">
        <NavLink
          to="/app/settings"
          onClick={() => setIsMobileMenuOpen?.(false)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all"
        >
          <Settings className="w-5 h-5 shrink-0" />
          {(!collapsed || isMobileMenuOpen) && <span className="text-sm">Settings</span>}
        </NavLink>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all w-full"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 shrink-0" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5 shrink-0" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
