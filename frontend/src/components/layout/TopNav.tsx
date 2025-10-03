import React, { useState, useEffect, useRef } from 'react';

interface TopNavProps {
  onSearch: (query: string) => void;
}

const TopNav: React.FC<TopNavProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === '/') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <header data-testid="topnav" className="bg-surface_light dark:bg-surface_dark shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo/App Name */}
        <div className="flex-shrink-0 flex items-center">
          <span className="text-xl font-bold text-text_light dark:text-text_dark">FlakeHunter</span>
        </div>

        {/* Search Input */}
        <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end" role="search">
          <div className="max-w-lg w-full lg:max-w-xs">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* Search icon */}
                <svg className="h-5 w-5 text-muted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="search"
                ref={searchInputRef}
                name="search"
                className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-surface_light dark:bg-surface_dark text-text_light dark:text-text_dark placeholder-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Search..."
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>

        {/* Account Menu/Theme Toggle (Placeholder) */}
        <div className="ml-4 flex items-center md:ml-6">
          {/* Theme Toggle will go here */}
          <button className="p-1 rounded-full text-muted hover:text-text_light dark:hover:text-text_dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            {/* Icon for theme toggle */}
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12H2m8.06-8.06l.707-.707M1.025 1.025l.707.707m12.728 0l.707-.707M1.757 17.243l.707.707M12 20.25a8.25 8.25 0 110-16.5 8.25 8.25 0 010 16.5z" />
            </svg>
          </button>

          {/* User dropdown */}
          <div className="ml-3 relative">
            <div>
              <button type="button" className="max-w-xs bg-surface_light dark:bg-surface_dark rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
