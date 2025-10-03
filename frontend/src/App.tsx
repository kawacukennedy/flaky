import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNav from './components/layout/TopNav';
import LeftNav from './components/layout/LeftNav';
import GlobalToast from './components/layout/GlobalToast';
import DashboardPage from './pages/DashboardPage';
import SearchPage from './pages/SearchPage';
import FlakesPage from './pages/FlakesPage';
import SolutionsPage from './pages/SolutionsPage';
import ProfilePage from './pages/ProfilePage';
import TestDetailPage from './pages/TestDetailPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement actual search logic or navigation later
  };

  return (
    <Router>
      <div className="bg-bg_light dark:bg-bg_dark min-h-screen flex">
        <LeftNav />
        <div className="flex-1 flex flex-col">
          <TopNav onSearch={handleSearch} />
          <main className="flex-1 p-6 pt-20"> {/* pt-20 (80px) to account for TopNav height (64px) + some spacing */}
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/flakes" element={<FlakesPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/tests/:id" element={<TestDetailPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
        <GlobalToast />
      </div>
    </Router>
  );
}

export default App;