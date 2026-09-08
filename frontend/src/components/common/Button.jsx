import { Loader2 } from "lucide-react";
import clsx from "clsx";

const variantClasses = {
  primary:
    "bg-primary text-white hover:bg-primary-dark disabled:bg-blue-300",
  secondary:
    "bg-white text-ink border border-border hover:bg-surface-subtle disabled:text-ink-muted",
  ghost:
    "bg-transparent text-ink-secondary hover:bg-surface-blue disabled:text-ink-muted",
  danger:
    "bg-status-error text-white hover:bg-red-700 disabled:bg-red-300",
  link: "bg-transparent text-primary hover:text-primary-dark underline-offset-2 hover:underline px-0",
};

const sizeClasses = {
  sm: "h-8 px-3 text-[13px] gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-11 px-5 text-sm gap-2",
};

/**
 * Shared Button primitive. Always use this instead of a raw <button> so
 * color, radius, and states stay consistent app-wide.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  className,
  type = "button",
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-150 disabled:cursor-not-allowed whitespace-nowrap",
        variantClasses[variant],
        variant !== "link" && sizeClasses[size],
        className
      )}
      {...rest}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        Icon && iconPosition === "left" && <Icon className="h-4 w-4" />
      )}
      {children}
      {!loading && Icon && iconPosition === "right" && (
        <Icon className="h-4 w-4" />
      )}
    </button>
  );
}
