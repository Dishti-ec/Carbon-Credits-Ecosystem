import { Bell, Search, User as UserIcon, LogOut, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useUserRole } from "../context/UserProvider";

interface TopBarProps {
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export function TopBar({ setIsMobileMenuOpen }: TopBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return true;
    if (saved === "light") return false;
    // Default to light mode on first load
    return false;
  });
  const { user, role, fullName, logout } = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-40 relative">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu */}
        <button 
          className="p-2 -ml-2 rounded-lg hover:bg-muted md:hidden"
          onClick={() => setIsMobileMenuOpen?.(true)}
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center gap-3 bg-input-background rounded-lg px-3 py-2 w-[360px]">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search credits, farmers, companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile Search Toggle */}
        <button 
          className="p-2 rounded-lg hover:bg-muted transition-colors md:hidden"
          onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
        >
          <Search className="w-5 h-5 text-muted-foreground" />
        </button>

        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="relative p-2 rounded-lg hover:bg-muted transition-colors"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun className="w-5 h-5 text-muted-foreground" /> : <Moon className="w-5 h-5 text-muted-foreground" />}
        </button>

        <button className="relative p-2 rounded-lg hover:bg-muted transition-colors hidden sm:block">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </button>
        <div className="h-6 w-px bg-border hidden sm:block"></div>
        <div className="flex items-center gap-3">
          <Link to="/app/settings" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity cursor-pointer">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm" style={{ fontWeight: 500 }}>
                {role === 'farmer' ? `Farmer: ${fullName || user?.email?.split('@')[0]}` : 
                 role === 'company' ? `Enterprise: ${fullName || user?.email?.split('@')[0]}` :
                 fullName || user?.email?.split('@')[0] || "Guest User"}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {role || "Public View"}
              </p>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 sm:ml-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {isMobileSearchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-card border-b border-border p-4 md:hidden z-30 shadow-md animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3 bg-input-background rounded-lg px-3 py-2 w-full">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              autoFocus
              placeholder="Search credits, farmers, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
            />
            <button onClick={() => setIsMobileSearchOpen(false)}>
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
