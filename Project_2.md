import { Link } from "react-router";
import { Home } from "lucide-react";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <p className="text-6xl mb-4" style={{ fontWeight: 700, color: "var(--muted-foreground)" }}>404</p>
      <p className="text-muted-foreground mb-6">Page not found</p>
      <Link
        to="/"
        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
      >
        <Home className="w-4 h-4" />
        Back to Dashboard
      </Link>
    </div>
  );
}
