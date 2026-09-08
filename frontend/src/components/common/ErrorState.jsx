import { AlertTriangle } from "lucide-react";
import Button from "./Button";

/**
 * Shown when a fetch/mutation fails. Keep the message factual — the
 * interface explains what happened, it doesn't apologize.
 */
export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this information. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 py-14 px-6">
      <span className="h-12 w-12 rounded-full bg-status-errorBg flex items-center justify-center">
        <AlertTriangle className="h-6 w-6 text-status-error" />
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-card-heading text-ink">{title}</p>
        <p className="text-body text-ink-muted max-w-sm">{description}</p>
      </div>
      {onRetry && (
        <Button size="sm" variant="secondary" onClick={onRetry} className="mt-1">
          Try again
        </Button>
      )}
    </div>
  );
}
