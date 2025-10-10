import React, { useState } from "react";
import { Github, Slack, Code } from "lucide-react";

interface PreferencesProps {}

const Preferences: React.FC<PreferencesProps> = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-text_light dark:text-text_dark mb-2">
          General
        </h4>
        <div className="flex items-center justify-between">
          <span className="text-text_light dark:text-text_dark">Dark Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={darkModeEnabled}
              onChange={() => setDarkModeEnabled(!darkModeEnabled)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary dark:peer-focus:ring-primary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-text_light dark:text-text_dark">
            Notifications
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary dark:peer-focus:ring-primary rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-text_light dark:text-text_dark mb-2">
          Integrations
        </h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Github className="h-5 w-5 mr-2 text-muted" />
              <span className="text-text_light dark:text-text_dark">
                GitHub
              </span>
            </div>
            <button className="text-primary hover:underline text-sm">
              Connect
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Slack className="h-5 w-5 mr-2 text-muted" />
              <span className="text-text_light dark:text-text_dark">Slack</span>
            </div>
            <button className="text-primary hover:underline text-sm">
              Connect
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Code className="h-5 w-5 mr-2 text-muted" />
              <span className="text-text_light dark:text-text_dark">
                VS Code
              </span>
            </div>
            <button className="text-primary hover:underline text-sm">
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
