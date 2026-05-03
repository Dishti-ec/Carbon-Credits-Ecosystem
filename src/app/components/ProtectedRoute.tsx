import { useUserRole } from "../context/UserProvider";
import { Auth } from "./Auth";
import { Outlet } from "react-router";

export function ProtectedRoute() {
  const { session, loading } = useUserRole();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center font-[Inter,DM_Sans,sans-serif]">
        Loading...
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return <Outlet />;
}
