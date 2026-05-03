import React, { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

type Role = "farmer" | "company" | null;

interface UserRoleContextType {
  user: User | null;
  session: Session | null;
  role: Role;
  fullName: string | null;
  loading: boolean;
}

const UserRoleContext = createContext<UserRoleContextType>({
  user: null,
  session: null,
  role: null,
  fullName: null,
  loading: true,
});

export function UserRoleProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("role, full_name")
      .eq("id", userId)
      .single();

    if (!error && data) {
      setRole(data.role as Role);
      setFullName(data.full_name);
    } else {
      setRole(null);
      setFullName(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Initial fetch
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setRole(null);
        setFullName(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <UserRoleContext.Provider value={{ user, session, role, fullName, loading }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export const useUserRole = () => useContext(UserRoleContext);
