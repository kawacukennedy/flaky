import React from "react";
import { ChevronDown } from "lucide-react";

interface SearchFilterProps {
  label: string;
  options: string[];
  defaultValue: string;
  onChange: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  label,
  options,
  defaultValue,
  onChange,
}) => {
  return (
    <div className="relative">
      <select
        className="appearance-none bg-bg_light dark:bg-bg_dark border border-border dark:border-muted rounded-md pl-3 pr-8 py-1 text-sm text-text_light dark:text-text_dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        value={defaultValue}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`${label} filter`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        size={16}
      />
    </div>
  );
};

export default SearchFilter;
