import { Home, Search, BarChart, Settings, Lightbulb, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const LeftNav = () => {
  const activeLinkClasses = "bg-primary text-white";
  const inactiveLinkClasses = "text-text_light dark:text-text_dark hover:bg-gray-200 dark:hover:bg-gray-700";

  return (
    <aside className="w-80 bg-surface_light dark:bg-surface_dark shadow-md p-4 flex flex-col">
      <div className="mb-6">
        <span className="text-2xl font-bold text-primary">FlakeHunter</span>
      </div>
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md ${isActive ? activeLinkClasses : inactiveLinkClasses}`
          }
        >
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md ${isActive ? activeLinkClasses : inactiveLinkClasses}`
          }
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </NavLink>
        <NavLink
          to="/flakes"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md ${isActive ? activeLinkClasses : inactiveLinkClasses}`
          }
        >
          <BarChart className="w-5 h-5" />
          <span>Flakes</span>
        </NavLink>
        <NavLink
          to="/solutions"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md ${isActive ? activeLinkClasses : inactiveLinkClasses}`
          }
        >
          <Lightbulb className="w-5 h-5" />
          <span>Solutions</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md ${isActive ? activeLinkClasses : inactiveLinkClasses}`
          }
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md ${isActive ? activeLinkClasses : inactiveLinkClasses}`
          }
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default LeftNav;
