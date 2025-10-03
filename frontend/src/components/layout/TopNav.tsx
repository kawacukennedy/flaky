import React from 'react';

interface TopNavProps {
  onSearch: (query: string) => void;
}

const TopNav: React.FC<TopNavProps> = ({ onSearch }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <header data-testid="topnav" role="banner" className="bg-surface_light dark:bg-surface_dark shadow-sm p-4 flex items-center justify-between h-16">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-text_light dark:text-text_dark">FlakeHunter</h1>
      </div>
      <div className="flex-grow mx-4 max-w-md">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded-md border border-border dark:border-muted bg-bg_light dark:bg-bg_dark text-text_light dark:text-text_dark"
          onChange={handleSearchChange}
          aria-label="Search flaky tests, logs, or errors"
          onKeyDown={(e) => {
            if (e.key === '/') {
              e.preventDefault();
              e.currentTarget.focus();
            }
          }}
        />
      </div>
      <nav role="navigation" aria-label="Account menu">
        {/* Account menu items will go here */}
        <button className="text-text_light dark:text-text_dark">Profile</button>
      </nav>
    </header>
  );
};

export default TopNav;