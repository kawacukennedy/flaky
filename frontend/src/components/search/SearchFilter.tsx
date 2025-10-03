import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface SearchFilterProps {
  label: string;
  options: string[];
  defaultValue: string;
  currentValue: string;
  onChange: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ label, options, defaultValue, currentValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={clsx(
          'flex items-center justify-between px-4 py-2 rounded-md border',
          'bg-bg_light dark:bg-surface_dark text-text_light dark:text-text_dark border-border',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{label}: <span className="font-medium">{currentValue || defaultValue}</span></span>
        <ChevronDown className={clsx('h-4 w-4 ml-2 transition-transform duration-200', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-48 bg-surface_light dark:bg-surface_dark rounded-md shadow-lg border border-border py-1"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={`filter-button-${label}`}
        >
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                className={clsx(
                  'block w-full text-left px-4 py-2 text-sm',
                  'text-text_light dark:text-text_dark hover:bg-bg_light dark:hover:bg-bg_dark',
                  currentValue === option && 'bg-primary text-white hover:bg-primary dark:hover:bg-primary'
                )}
                role="menuitem"
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchFilter;