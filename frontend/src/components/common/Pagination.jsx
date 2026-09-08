import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

/**
 * Shared pagination footer for tables. `page` is 1-indexed.
 */
export default function Pagination({ page, totalPages, totalItems, pageSize, onPageChange }) {
  if (totalPages <= 0) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border">
      <p className="text-helper text-ink-muted">
        Showing <span className="font-medium text-ink">{start}</span>–
        <span className="font-medium text-ink">{end}</span> of{" "}
        <span className="font-medium text-ink">{totalItems}</span>
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-ink-secondary hover:bg-surface-subtle disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {pages.map((p, i) => {
          const prev = pages[i - 1];
          const showEllipsis = prev && p - prev > 1;
          return (
            <span key={p} className="flex items-center gap-1">
              {showEllipsis && <span className="px-1 text-ink-muted text-helper">…</span>}
              <button
                onClick={() => onPageChange(p)}
                className={clsx(
                  "h-8 w-8 rounded-md text-helper font-medium",
                  p === page
                    ? "bg-primary text-white"
                    : "text-ink-secondary hover:bg-surface-subtle border border-border"
                )}
              >
                {p}
              </button>
            </span>
          );
        })}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-ink-secondary hover:bg-surface-subtle disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
