import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Home, Search, Bug, Lightbulb, Settings, User } from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isActive }) => (
  <Link
    to={to}
    className={clsx(
      'flex items-center p-3 rounded-md transition-colors duration-200',
      isActive ? 'bg-primary text-white' : 'text-text_light hover:bg-gray-100 dark:text-text_dark dark:hover:bg-surface_dark'
    )}
    aria-current={isActive ? 'page' : undefined}
  >
    <Icon className="h-5 w-5 mr-3" />
    <span className="font-medium">{label}</span>
  </Link>
);

const LeftNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/search', icon: Search, label: 'Search' },
    { to: '/flakes', icon: Bug, label: 'Flaky Tests' },
    { to: '/solutions', icon: Lightbulb, label: 'Solutions' },
    { to: '/profile', icon: User, label: 'Profile' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="w-80 bg-surface_light dark:bg-surface_dark shadow-md p-4 flex flex-col" data-testid="leftnav" aria-label="Main navigation"> {/* Changed w-sidebar_width_px to w-80 and added dark mode classes */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary">FlakeHunter</h2>
      </div>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.label}>
            <NavItem {...item} isActive={location.pathname === item.to} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LeftNav;
