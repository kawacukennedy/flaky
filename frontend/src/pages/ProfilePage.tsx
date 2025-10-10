// Purpose: User profile management

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { updateProfile } from "../app/slices/userSlice";
import Button from "../components/Button";
import Input from "../components/Input";

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.data);
  const { loading, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        Please log in to view your profile.
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
    setUsername(user.username);
    setEmail(user.email);
  };

  const handleSave = async () => {
    const result = await dispatch(updateProfile({ username, email }));
    if (updateProfile.fulfilled.match(result)) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUsername(user.username);
    setEmail(user.email);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-h1 font-bold mb-6">User Profile</h1>
      <div className="bg-white shadow-md rounded-2xl p-6">
        <div className="mb-4">
          <label className="block text-text_secondary text-sm font-medium mb-2">
            Username:
          </label>
          {isEditing ? (
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          ) : (
            <p className="text-text_primary text-lg">{user.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-text_secondary text-sm font-medium mb-2">
            Email:
          </label>
          {isEditing ? (
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          ) : (
            <p className="text-text_primary text-lg">{user.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-text_secondary text-sm font-medium mb-2">
            Role:
          </label>
          <p className="text-text_primary text-lg">{user.role}</p>
        </div>
        {error && <p className="text-error mb-4">{error}</p>}
        <div className="flex gap-4">
          {isEditing ? (
            <>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button onClick={handleCancel} variant="secondary">
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={handleEdit}>Edit Profile</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
