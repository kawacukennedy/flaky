import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import FlakesPage from './pages/FlakesPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import { ThemeProvider } from './ThemeInitializer';
import GlobalToast from './components/layout/GlobalToast';
import LeftNav from './components/layout/LeftNav';
import TopNav from './components/layout/TopNav';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex h-screen bg-gray-100">
          <LeftNav />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopNav />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/flakes" element={<FlakesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                {/* Add more routes as needed */}
              </Routes>
            </main>
          </div>
        </div>
        <GlobalToast />
      </Router>
    </ThemeProvider>
  );
}

export default App;