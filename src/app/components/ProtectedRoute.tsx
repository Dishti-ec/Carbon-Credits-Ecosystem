import { useUserRole } from "../context/UserProvider";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute({ children, role }: { children?: React.ReactNode, role?: "farmer" | "company" }) {
  const { session, role: userRole, loading } = useUserRole();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center font-[Inter,DM_Sans,sans-serif]">
        Loading...
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (role && role !== userRole) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
