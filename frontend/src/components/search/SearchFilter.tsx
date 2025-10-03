import React from 'react';

interface SearchFilterProps {
  label: string;
  options: string[];
  defaultValue: string;
  selectedValue: string;
  onChange: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  label,
  options,
  defaultValue,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="relative inline-block text-left">
      <label htmlFor={`filter-${label}`} className="sr-only">{label}</label>
      <select
        id={`filter-${label}`}
        className="block appearance-none w-full bg-surface_light dark:bg-surface_dark border border-border dark:border-surface_dark text-text_light dark:text-text_dark py-2 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ease-standard"
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value={defaultValue}>{defaultValue}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text_light dark:text-text_dark">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
        </svg>
      </div>
    </div>
  );
};

export default SearchFilter;