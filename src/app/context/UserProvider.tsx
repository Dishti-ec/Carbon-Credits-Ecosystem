import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Role = "farmer" | "company" | null;

interface UserRoleContextType {
  user: any | null;
  session: any | null;
  role: Role;
  fullName: string | null;
  loading: boolean;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const UserRoleContext = createContext<UserRoleContextType>({
  user: null,
  session: null,
  role: null,
  fullName: null,
  loading: true,
  logout: async () => { },
  refreshProfile: async () => { },
});

export function UserRoleProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    if (session?.user?.id || user?.id) {
      try {
        const userId = session?.user?.id || user?.id;
        const { data: profile } = await supabase
          .from("profiles")
          .select("role, full_name")
          .eq("id", userId)
          .single();

        if (profile) {
          setRole(profile.role);
          setFullName(profile.full_name);
        }
      } catch (error) {
        console.error("Error refreshing profile:", error);
      }
    }
  };

  useEffect(() => {
    // Prevent infinite loading
    const fallbackTimeout = setTimeout(() => {
      setLoading(false);
    }, 5000);

    const ensureProfile = async (sessionUser: any) => {
      if (!sessionUser) return;
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("role, full_name")
          .eq("id", sessionUser.id)
          .single();

        if (error && error.code === 'PGRST116') {
          // Profile not found -> insert it using metadata
          const { error: insertError } = await supabase.from("profiles").insert([{
            id: sessionUser.id,
            full_name: sessionUser.user_metadata?.full_name || null,
            role: sessionUser.user_metadata?.role || "farmer",
          }]);
          
          if (!insertError) {
             setRole(sessionUser.user_metadata?.role || "farmer");
             setFullName(sessionUser.user_metadata?.full_name || null);
          }
        } else if (profile) {
          setRole(profile.role || null);
          setFullName(profile.full_name || null);
        }
      } catch (err) {
        console.error("Error in ensureProfile:", err);
      }
    };

    const getSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const session = data.session;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await ensureProfile(session.user);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
        clearTimeout(fallbackTimeout);
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await ensureProfile(session.user);
        } else {
          setRole(null);
          setFullName(null);
        }
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
      clearTimeout(fallbackTimeout);
    };
  }, []);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
      // Supabase failed to clear the session remotely, so we MUST forcefully clear it locally
      // Otherwise the user is permanently stuck in the app!
      try {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('sb-')) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));
      } catch (e) {
        // ignore
      }
    }

    // Let onAuthStateChange handle state reset (if successful) or force redirect
    window.location.href = "/login";
  };

  return (
    <UserRoleContext.Provider value={{ user, session, role, fullName, loading, logout, refreshProfile }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export const useUserRole = () => useContext(UserRoleContext);