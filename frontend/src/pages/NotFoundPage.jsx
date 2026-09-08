import { Link } from "react-router-dom";
import Button from "../components/common/Button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-subtle text-center gap-4 px-6">
      <p className="text-6xl font-bold text-primary">404</p>
      <div>
        <p className="text-section-heading text-ink">Page not found</p>
        <p className="text-body text-ink-muted mt-1">The page you're looking for doesn't exist.</p>
      </div>
      <Link to="/dashboard">
        <Button>Back to dashboard</Button>
      </Link>
    </div>
  );
}
