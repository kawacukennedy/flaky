// Purpose: User profile management

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.data);

  if (!user) {
    return <div className="container mx-auto p-4">Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
          <p className="text-gray-900 text-lg">{user.username}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <p className="text-gray-900 text-lg">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
          <p className="text-gray-900 text-lg">{user.role}</p>
        </div>
        {/* Add more profile details or an edit form here */}
      </div>
    </div>
  );
};

export default ProfilePage;