import { useEffect } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import clsx from "clsx";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

/**
 * Base modal used by every add/edit form and detail panel. Renders via
 * portal so it always sits above the layout regardless of caller depth.
 */
export default function Modal({ open, onClose, title, description, size = "md", children, footer }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 transition-opacity duration-150"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={clsx(
          "relative w-full bg-white rounded-card shadow-elevated flex flex-col max-h-[90vh] animate-[fadeIn_150ms_ease-out]",
          sizeClasses[size]
        )}
      >
        <div className="flex items-start justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="text-section-heading text-ink">{title}</h2>
            {description && <p className="text-body text-ink-muted mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="h-8 w-8 rounded-md flex items-center justify-center text-ink-muted hover:bg-surface-subtle hover:text-ink transition-colors duration-150"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-border">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
