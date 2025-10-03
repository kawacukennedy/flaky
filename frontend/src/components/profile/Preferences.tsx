import React, { useState } from 'react';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out
            ${checked ? 'translate-x-6 bg-primary' : 'bg-gray-400'}`}
        ></div>
      </div>
      <div className="ml-3 text-text_light dark:text-text_dark font-medium">
        {label}
      </div>
    </label>
  );
};

const Preferences: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-2">General</h4>
        <div className="space-y-3">
          <Toggle
            label="Dark Mode"
            checked={darkMode}
            onChange={setDarkMode}
          />
          <Toggle
            label="Notifications"
            checked={notifications}
            onChange={setNotifications}
          />
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Integrations</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center bg-bg_light dark:bg-bg_dark p-3 rounded-md shadow-sm">
            <img src="https://via.placeholder.com/24" alt="GitHub" className="w-6 h-6 mr-3" />
            <span>GitHub</span>
          </div>
          <div className="flex items-center bg-bg_light dark:bg-bg_dark p-3 rounded-md shadow-sm">
            <img src="https://via.placeholder.com/24" alt="Slack" className="w-6 h-6 mr-3" />
            <span>Slack</span>
          </div>
          <div className="flex items-center bg-bg_light dark:bg-bg_dark p-3 rounded-md shadow-sm">
            <img src="https://via.placeholder.com/24" alt="VS Code" className="w-6 h-6 mr-3" />
            <span>VS Code</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;