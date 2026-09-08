import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "../components/common/Loading";

/**
 * Wraps a set of routes so they require authentication. Pass `permission`
 * to also require a specific permission (frontend UX only — the backend
 * independently re-checks the same permission on every request).
 */
export default function ProtectedRoute({ permission }) {
  const { isAuthenticated, loading, hasPermission } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-subtle">
        <LoadingSpinner label="Loading your session..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (permission && !hasPermission(permission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
