import React from "react";

const LeftNav: React.FC = () => {
  return (
    <nav className="w-80 bg-surface_light dark:bg-surface_dark shadow-md p-4">
      <ul className="space-y-2">
        <li>
          <a
            href="/"
            className="block p-2 rounded-md text-text_light dark:text-text_dark hover:bg-bg_light dark:hover:bg-bg_dark"
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="/flakes"
            className="block p-2 rounded-md text-text_light dark:text-text_dark hover:bg-bg_light dark:hover:bg-bg_dark"
          >
            Flakes
          </a>
        </li>
        <li>
          <a
            href="/solutions"
            className="block p-2 rounded-md text-text_light dark:text-text_dark hover:bg-bg_light dark:hover:bg-bg_dark"
          >
            Solutions
          </a>
        </li>
        <li>
          <a
            href="/search"
            className="block p-2 rounded-md text-text_light dark:text-text_dark hover:bg-bg_light dark:hover:bg-bg_dark"
          >
            Search
          </a>
        </li>
        <li>
          <a
            href="/profile"
            className="block p-2 rounded-md text-text_light dark:text-text_dark hover:bg-bg_light dark:hover:bg-bg_dark"
          >
            Profile
          </a>
        </li>
        <li>
          <a
            href="/settings"
            className="block p-2 rounded-md text-text_light dark:text-text_dark hover:bg-bg_light dark:hover:bg-bg_dark"
          >
            Settings
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default LeftNav;
