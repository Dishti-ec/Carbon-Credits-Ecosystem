import { User, Bell, Shield, Globe, Save, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useUserRole } from "../context/UserProvider";

export function Settings() {
  const { session, refreshProfile } = useUserRole();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    email: "",
    role: "User",
  });

  useEffect(() => {
    async function loadUser() {
      try {
        if (session?.user) {
          // Fetch from profiles table
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("full_name, role, organization")
            .eq("id", session.user.id)
            .single();

          if (error && error.code !== 'PGRST116') {
             console.error("Error fetching profile:", error);
          }

          setFormData({
            fullName: profile?.full_name || "",
            organization: profile?.organization || "",
            email: session.user.email || "",
            role: profile?.role || "User",
          });
        }
      } catch (err) {
        console.error("Error in loadUser:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    if (!session?.user) return;
    setSaving(true);
    setMessage(null);
    
    // Update the profiles table instead of auth metadata
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.fullName,
        organization: formData.organization,
        role: formData.role,
      })
      .eq("id", session.user.id);
    
    if (error) {
      setMessage({ text: error.message, type: 'error' });
    } else {
      setMessage({ text: "Profile updated successfully!", type: 'success' });
      // Tell UserProvider to update its global state
      await refreshProfile();
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-full">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-primary" />
            <h3 className="text-base" style={{ fontWeight: 600 }}>Profile Settings</h3>
          </div>
          <button 
            onClick={handleSaveProfile}
            disabled={saving}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-sm mb-4 ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-[#d8f3dc] text-[#2d6a4f]'}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Rajesh Kumar"
              className="w-full px-3 py-2 bg-input-background rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Organization</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="e.g. Bureau of Energy Efficiency"
              className="w-full px-3 py-2 bg-input-background rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full px-3 py-2 bg-input-background/50 rounded-lg border border-border text-sm text-muted-foreground cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground block mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              readOnly
              className="w-full px-3 py-2 bg-input-background/50 rounded-lg border border-border text-sm text-muted-foreground cursor-not-allowed"
              title="Role cannot be changed directly"
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
