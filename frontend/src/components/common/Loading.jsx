import { Loader2 } from "lucide-react";
import clsx from "clsx";

export function LoadingSpinner({ size = 20, className, label }) {
  return (
    <div className={clsx("flex items-center justify-center gap-2 py-10", className)}>
      <Loader2 className="animate-spin text-primary" style={{ width: size, height: size }} />
      {label && <span className="text-body text-ink-muted">{label}</span>}
    </div>
  );
}

export function Skeleton({ className }) {
  return <div className={clsx("animate-pulse rounded-md bg-slate-200/70", className)} />;
}

export function CardSkeleton() {
  return (
    <div className="bg-white border border-border rounded-card p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
      <Skeleton className="h-7 w-16" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 5 }) {
  return (
    <div className="w-full">
      <div className="flex gap-4 px-4 py-3 border-b border-border">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-3 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 px-4 py-4 border-b border-border">
          {Array.from({ length: columns }).map((_, c) => (
            <Skeleton key={c} className="h-3 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}
