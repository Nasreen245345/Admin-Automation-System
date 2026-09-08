import clsx from "clsx";

/**
 * Base surface used for cards, panels, and content blocks throughout the app.
 */
export default function Card({ children, className, padding = true, ...rest }) {
  return (
    <div
      className={clsx(
        "bg-white border border-border rounded-card shadow-card",
        padding && "p-5",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
