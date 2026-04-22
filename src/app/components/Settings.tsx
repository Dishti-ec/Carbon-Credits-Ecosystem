import { User, Bell, Shield, Globe } from "lucide-react";

export function Settings() {
  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl" style={{ fontWeight: 600 }}>Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account, notifications, and platform preferences
        </p>
      </div>

      {/* Profile */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-5 h-5 text-primary" />
          <h3 className="text-base" style={{ fontWeight: 600 }}>Profile Settings</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Full Name</label>
            <input
              type="text"
              defaultValue="Rajesh Kumar"
              className="w-full px-3 py-2 bg-input-background rounded-lg border border-border text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Organization</label>
            <input
              type="text"
              defaultValue="Bureau of Energy Efficiency"
              className="w-full px-3 py-2 bg-input-background rounded-lg border border-border text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Email</label>
            <input
              type="email"
              defaultValue="rajesh.kumar@bee.gov.in"
              className="w-full px-3 py-2 bg-input-background rounded-lg border border-border text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Role</label>
            <input
              type="text"
              defaultValue="Market Administrator"
              className="w-full px-3 py-2 bg-input-background rounded-lg border border-border text-sm"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="text-base" style={{ fontWeight: 600 }}>Notification Preferences</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: "Government inspection alerts", desc: "Critical audit and inspection notifications", default: true },
            { label: "Compliance deadlines", desc: "MRV, GHG report submission reminders", default: true },
            { label: "Market price alerts", desc: "CCC price corridor changes", default: true },
            { label: "System maintenance", desc: "Registry downtime notifications", default: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors">
              <div>
                <p className="text-sm" style={{ fontWeight: 500 }}>{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={item.default} className="sr-only peer" />
                <div className="w-10 h-6 bg-switch-background rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-4"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="text-base" style={{ fontWeight: 600 }}>Security</h3>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors">
          Change Password
        </button>
      </div>

      {/* Language */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-5 h-5 text-primary" />
          <h3 className="text-base" style={{ fontWeight: 600 }}>Language & Region</h3>
        </div>
        <select className="bg-input-background border border-border rounded-lg px-3 py-2 text-sm">
          <option>English</option>
          <option>Hindi</option>
          <option>Tamil</option>
          <option>Marathi</option>
          <option>Gujarati</option>
        </select>
      </div>
    </div>
  );
}
