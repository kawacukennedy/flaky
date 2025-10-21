import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/store";
import { logout } from "../../app/slices/userSlice";
import { useTheme } from "../../ThemeInitializer";

interface TopNavProps {
  onSearch: (query: string) => void;
}

const TopNav: React.FC<TopNavProps> = ({ onSearch }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.data);
  const { theme, toggleTheme } = useTheme();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header
      data-testid="topnav"
      role="banner"
      className="bg-white dark:bg-background-dark shadow-sm p-4 flex items-center justify-between h-16"
    >
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-text_primary dark:text-text_primary-dark">FlakeHunter</h1>
      </div>
      <div className="flex-grow mx-4 max-w-md">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded-md border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-text_primary-dark focus:ring-2 focus:ring-primary"
          onChange={handleSearchChange}
          aria-label="Search flaky tests, logs, or errors"
        />
      </div>
      <nav
        role="navigation"
        aria-label="Account menu"
        className="flex items-center space-x-4"
      >
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        {user ? (
          <>
            <span className="text-text_primary dark:text-text_primary-dark">{user.username}</span>
            <button
              onClick={() => navigate("/profile")}
              className="text-primary hover:underline"
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="text-error hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="text-primary hover:underline"
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default TopNav;
