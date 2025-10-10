import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import FlakesPage from "./pages/FlakesPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import TestDetailPage from "./pages/TestDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SearchPage from "./pages/SearchPage";
import SolutionsPage from "./pages/SolutionsPage";
import { ThemeProvider } from "./ThemeInitializer";
import GlobalToast from "./components/layout/GlobalToast";
import LeftNav from "./components/layout/LeftNav";
import TopNav from "./components/layout/TopNav";

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
                <Route path="/tests/:test_id" element={<TestDetailPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/solutions" element={<SolutionsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
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
