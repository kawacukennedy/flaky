import React, { useState, useEffect, useRef } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface TopNavProps {
  onSearch: (query: string) => void;
}

const TopNav: React.FC<TopNavProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === '/' && searchInputRef.current) {
        event.preventDefault();
        searchInputRef.current.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-6 bg-surface_light shadow-sm"
      data-testid="topnav"
      role="banner"
    >
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-text_light">FlakeHunter</h1>
      </div>

      <div className="flex-1 max-w-md mx-auto" role="search">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search flaky tests, logs, or errors..."
            className="w-full h-12 pl-10 pr-4 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-fast ease-standard"
            value={searchQuery}
            onChange={handleSearchChange}
            ref={searchInputRef}
            aria-label="Search"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
        </form>
      </div>

      <div className="flex items-center space-x-4" role="navigation" aria-label="Account menu">
        {/* Placeholder for account menu/profile */}
        <button className="text-sm font-medium text-text_light hover:text-primary transition-colors duration-fast ease-standard">
          Account
        </button>
      </div>
    </header>
  );
};

export default TopNav;
