import { TrendingUp, TrendingDown } from "lucide-react";
import clsx from "clsx";
import Card from "./Card";

/**
 * Compact metric card used on the dashboard and module summary rows.
 * trend: { value: "+5.2%", direction: "up" | "down", label: "from yesterday" }
 */
export default function StatCard({ label, value, icon: Icon, trend, iconColor = "text-primary", iconBg = "bg-surface-blue" }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-body text-ink-secondary">{label}</span>
        {Icon && (
          <span className={clsx("h-8 w-8 rounded-md flex items-center justify-center", iconBg)}>
            <Icon className={clsx("h-4 w-4", iconColor)} />
          </span>
        )}
      </div>
      <div className="text-2xl font-semibold text-ink leading-none">{value}</div>
      {trend && (
        <div className="flex items-center gap-1 text-helper">
          {trend.direction === "up" ? (
            <TrendingUp className="h-3.5 w-3.5 text-status-success" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-status-error" />
          )}
          <span
            className={clsx(
              "font-medium",
              trend.direction === "up" ? "text-status-success" : "text-status-error"
            )}
          >
            {trend.value}
          </span>
          <span className="text-ink-muted">{trend.label}</span>
        </div>
      )}
    </Card>
  );
}
