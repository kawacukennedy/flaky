import React from 'react';
import Preferences from '../components/profile/Preferences';
import ActivityFeed from '../components/profile/ActivityFeed';

const ProfilePage: React.FC = () => {
  return (
    <div className="flex justify-center py-8 px-4">
      <div className="bg-surface_light dark:bg-surface_dark rounded-lg shadow-md p-6 w-full max-w-[600px]">
        <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>

        {/* Summary Section */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://via.placeholder.com/96"
            alt="User Avatar"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-lg font-bold text-text_light dark:text-text_dark mb-1">John Doe</h2>
          <p className="text-sm text-muted mb-2">Software Engineer</p>
          <p className="text-center text-text_light dark:text-text_dark max-w-md">
            Passionate about building scalable and maintainable frontend applications.
            Always looking for new challenges and learning opportunities.
          </p>
        </div>

        {/* Preferences Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Preferences</h3>
          <Preferences />
        </div>

        {/* Activity Feed Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Activity Feed</h3>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;