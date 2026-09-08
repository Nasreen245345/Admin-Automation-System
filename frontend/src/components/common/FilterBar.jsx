import { RotateCcw } from "lucide-react";
import SearchInput from "./SearchInput";
import Button from "./Button";

/**
 * Consistent row of search + filter controls above tables.
 * `filters` accepts arbitrary already-built control elements (Select, DatePicker, etc.)
 * so each module decides which filters it needs while keeping the layout identical.
 */
export default function FilterBar({ search, onSearchChange, searchPlaceholder, filters, onReset, actions }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-wrap">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
        {onSearchChange && (
          <SearchInput value={search} onChange={onSearchChange} placeholder={searchPlaceholder} />
        )}
        {filters}
        {onReset && (
          <Button variant="ghost" size="sm" icon={RotateCcw} onClick={onReset}>
            Reset
          </Button>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
