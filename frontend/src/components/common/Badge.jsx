import { statusStyles, colors } from "../../config/theme";

/**
 * Status pill used across attendance, inventory, generator, and approval
 * tables. Pass a `status` key from config/theme.js's statusStyles, or
 * `color`/`bg`/`children` directly for a one-off label.
 */
export default function Badge({ status, children, color, bg, dot = true }) {
  const style = status ? statusStyles[status] : null;
  const resolvedColor = color || style?.color || colors.textMuted;
  const resolvedBg = bg || style?.bg || "#F8FAFC";
  const label = children || style?.label || status;

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-helper font-medium"
      style={{ color: resolvedColor, backgroundColor: resolvedBg }}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: resolvedColor }}
        />
      )}
      {label}
    </span>
  );
}
