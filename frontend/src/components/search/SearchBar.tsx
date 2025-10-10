import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import SearchFilter from "./SearchFilter";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filterName: string, value: string) => void;
  currentFilters: Record<string, string>;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onFilterChange, currentFilters }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filtersConfig = [
    {
      label: "status",
      options: ["", "pass", "fail", "skipped"],
      defaultValue: "",
    },
    {
      label: "environment",
      options: ["", "local", "ci", "staging"],
      defaultValue: "",
    },
    {
      label: "project",
      options: ["", "project1", "project2"], // dummy
      defaultValue: "",
    },
  ];

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query, onSearch]);

  const handleFilterChange = (filterName: string, value: string) => {
    onFilterChange(filterName, value);
  };

  return (
    <div
      className={`flex flex-col md:flex-row items-center bg-surface_light dark:bg-surface_dark rounded-md shadow-sm p-2 border-2 ${isError ? "border-danger animate-shake" : isFocused ? "border-primary animate-glow" : "border-transparent"} transition-all duration-200`}
      style={{ height: "48px" }} // height_px: 48
    >
      <Search className="text-muted mx-2" size={20} />
      <input
        type="text"
        placeholder="Search flaky tests, logs, or errors..."
        className="flex-grow p-2 bg-transparent outline-none text-text_light dark:text-text_dark"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label="Search input"
      />

      <div className="flex space-x-2 mt-2 md:mt-0 md:ml-4">
        {filtersConfig.map((filter) => (
          <SearchFilter
            key={filter.label}
            label={filter.label}
            options={filter.options}
            defaultValue={currentFilters[filter.label] || filter.defaultValue}
            onChange={(value) => handleFilterChange(filter.label, value)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
