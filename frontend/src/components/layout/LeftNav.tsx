import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavItemProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center p-2 rounded-md transition-colors duration-normal ease-standard
          ${isActive
            ? 'bg-primary text-white shadow-sm'
            : 'text-text_light dark:text-text_dark hover:bg-bg_light dark:hover:bg-bg_dark'
          }`
        }
      >
        {icon && <span className="mr-3">{icon}</span>}
        {label}
      </NavLink>
    </li>
  );
};

const LeftNav: React.FC = () => {
  return (
    <nav className="w-80 bg-surface_light dark:bg-surface_dark shadow-md h-full flex flex-col p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-text_light dark:text-text_dark">FlakeHunter</h2>
      </div>
      <ul className="space-y-2">
        <NavItem to="/" label="Dashboard" icon="📊" />
        <NavItem to="/flakes" label="Flakes" icon="🐛" />
        <NavItem to="/solutions" label="Solutions" icon="💡" />
        <NavItem to="/search" label="Search" icon="🔍" />
        <NavItem to="/profile" label="Profile" icon="👤" />
        <NavItem to="/settings" label="Settings" icon="⚙️" />
      </ul>
    </nav>
  );
};

export default LeftNav;