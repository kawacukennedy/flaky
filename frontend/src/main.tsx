import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './index.css';
import App from './App.tsx';
import ThemeInitializer from './ThemeInitializer.tsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Import page components
import DashboardPage from './pages/DashboardPage';
import FlakesPage from './pages/FlakesPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';
import SolutionsPage from './pages/SolutionsPage';
import TestDetailPage from './pages/TestDetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "flakes",
        element: <FlakesPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "solutions",
        element: <SolutionsPage />,
      },
      {
        path: "tests/:id",
        element: <TestDetailPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeInitializer>
        <RouterProvider router={router} />
      </ThemeInitializer>
    </Provider>
  </StrictMode>,
);
