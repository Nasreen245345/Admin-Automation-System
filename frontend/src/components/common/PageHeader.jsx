/**
 * Standard page header: title + description + one primary action.
 * Reused at the top of every module page for consistent structure.
 */
export default function PageHeader({ title, description, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 className="text-page-title text-ink">{title}</h1>
        {description && <p className="text-body text-ink-muted mt-1">{description}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
