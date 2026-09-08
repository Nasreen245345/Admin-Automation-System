import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

/**
 * Shared select. `options` is [{ value, label }]. Pass `placeholder` for an
 * empty first option.
 */
const Select = forwardRef(function Select(
  { label, id, error, helperText, required, options = [], placeholder, className, ...rest },
  ref
) {
  const selectId = id || rest.name;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-body font-medium text-ink-secondary">
          {label}
          {required && <span className="text-status-error ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          ref={ref}
          className={clsx(
            "w-full h-10 rounded-md border bg-white pl-3 pr-9 text-sm text-ink appearance-none transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
            error ? "border-status-error" : "border-border",
            rest.disabled && "bg-surface-subtle text-ink-muted cursor-not-allowed",
            className
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted pointer-events-none" />
      </div>
      {error ? (
        <p className="text-helper text-status-error">{error}</p>
      ) : helperText ? (
        <p className="text-helper text-ink-muted">{helperText}</p>
      ) : null}
    </div>
  );
});

export default Select;
