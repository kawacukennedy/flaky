// Purpose: Application settings

import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        <div className="mb-4">
          <label htmlFor="theme" className="block text-gray-700 text-sm font-bold mb-2">Theme:</label>
          <select
            id="theme"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="notifications" className="block text-gray-700 text-sm font-bold mb-2">Email Notifications:</label>
          <input type="checkbox" id="notifications" className="mr-2 leading-tight" />
          <span className="text-sm">Receive email updates</span>
        </div>
        {/* Add more settings options here */}
      </div>
    </div>
  );
};

export default SettingsPage;