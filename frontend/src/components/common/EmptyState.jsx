import { Inbox } from "lucide-react";
import Button from "./Button";

/**
 * Friendly empty state for tables/lists with no data. actionLabel + onAction
 * are optional — omit to show a plain message.
 */
export default function EmptyState({
  icon: Icon = Inbox,
  title = "Nothing to show yet",
  description = "There is currently no data to display.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 py-14 px-6">
      <span className="h-12 w-12 rounded-full bg-surface-blue flex items-center justify-center">
        <Icon className="h-6 w-6 text-primary" />
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-card-heading text-ink">{title}</p>
        <p className="text-body text-ink-muted max-w-sm">{description}</p>
      </div>
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction} className="mt-1">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
