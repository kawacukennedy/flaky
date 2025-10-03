import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import TestDetailPage from './pages/TestDetailPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">FlakeHunter</h1>
            <nav className="flex gap-4">
              <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-700">Dashboard</Link>
              <Link to="/settings" className="text-sm font-medium text-gray-500 hover:text-gray-700">Settings</Link>
            </nav>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tests/:id" element={<TestDetailPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
