import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import Button from "../components/common/Button";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface-subtle text-center gap-4 px-6">
      <span className="h-14 w-14 rounded-full bg-status-errorBg flex items-center justify-center">
        <ShieldAlert className="h-7 w-7 text-status-error" />
      </span>
      <div>
        <p className="text-section-heading text-ink">You don't have access to this page</p>
        <p className="text-body text-ink-muted mt-1">
          Your account doesn't have the required permission. Contact an administrator if you think this is a mistake.
        </p>
      </div>
      <Link to="/dashboard">
        <Button variant="secondary">Back to dashboard</Button>
      </Link>
    </div>
  );
}
