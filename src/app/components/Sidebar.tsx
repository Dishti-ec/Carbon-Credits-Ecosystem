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
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/dashboard/carbon-credits", icon: Leaf, label: "Carbon Credits" },
  { to: "/dashboard/companies", icon: Factory, label: "Companies" },
  { to: "/dashboard/farmlands", icon: Sprout, label: "Farmlands" },
  { to: "/dashboard/map", icon: Map, label: "Map View" },
  { to: "/dashboard/education", icon: GraduationCap, label: "Education Hub" },
  { to: "/dashboard/alerts", icon: Bell, label: "Alerts" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-[72px]" : "w-[260px]"
      } bg-sidebar text-sidebar-foreground flex flex-col h-screen sticky top-0 transition-all duration-300 z-50`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border hover:bg-sidebar-accent/50 transition-colors">
        <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center shrink-0">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm tracking-wide opacity-90" style={{ fontWeight: 600 }}>
              CarbonBridge
            </p>
            <p className="text-xs opacity-60">Indian Carbon Market</p>
          </div>
        )}
      </Link>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`
            }
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-sidebar-border p-2">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all"
        >
          <Settings className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm">Settings</span>}
        </NavLink>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground transition-all w-full"
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
