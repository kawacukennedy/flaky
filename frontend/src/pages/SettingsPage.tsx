// Purpose: Application settings

import React from 'react';
import { useTheme } from '../ThemeInitializer';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-h1 font-bold mb-6">Settings</h1>
      <div className="bg-white shadow-md rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        <div className="mb-4">
          <label htmlFor="theme" className="block text-text_secondary text-sm font-medium mb-2">Theme:</label>
          <select
            id="theme"
            value={theme}
            onChange={(e) => {
              if (e.target.value === 'dark' && theme === 'light') toggleTheme();
              if (e.target.value === 'light' && theme === 'dark') toggleTheme();
            }}
            className="shadow appearance-none border rounded-md w-full py-2 px-3 text-text_primary leading-tight focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="notifications" className="block text-text_secondary text-sm font-medium mb-2">Email Notifications:</label>
          <input type="checkbox" id="notifications" className="mr-2 leading-tight" />
          <span className="text-sm text-text_primary">Receive email updates</span>
        </div>
        {/* Add more settings options here */}
      </div>
    </div>
  );
};

export default SettingsPage;