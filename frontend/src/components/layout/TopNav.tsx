import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../ThemeInitializer'; // Assuming ThemeInitializer exports useTheme

interface TopNavProps {
  onSearch?: (query: string) => void;
}

const TopNav: React.FC<TopNavProps> = ({ onSearch }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { toggleTheme } = useTheme(); // Use the useTheme hook

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <header
      className="bg-surface_light dark:bg-surface_dark shadow-sm h-16 flex items-center px-4 z-10 transition-colors duration-normal ease-standard"
      data-testid="topnav"
      role="banner"
    >
      <div className="max-w-[1200px] mx-auto w-full flex justify-between items-center">
        <div className="flex-grow">
          <h1 className="text-lg font-semibold text-text_light dark:text-text_dark">FlakeHunter</h1>
        </div>
        <div className="flex items-center space-x-4">
          <form onSubmit={handleSearchSubmit} role="search">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search flaky tests, logs, or errors..."
              className="px-3 py-2 rounded-md border border-border dark:border-surface_dark bg-bg_light dark:bg-bg_dark text-text_light dark:text-text_dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ease-standard"
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search"
            />
          </form>
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-primary text-white shadow-lg hover:scale-105 transition-transform duration-fast ease-soft"
            aria-label="Toggle dark mode"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591M12 12a9 9 0 110 18 9 9 0 010-18z" />
            </svg>
          </button>
          {/* User menu placeholder */}
          <div role="menu" aria-label="Account menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-text_light dark:text-text_dark">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;