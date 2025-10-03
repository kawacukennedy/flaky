import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from './components/layout/TopNav';
import LeftNav from './components/layout/LeftNav';
import GlobalToast from './components/layout/GlobalToast'; // Added import

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches &&
      localStorage.getItem('theme') !== 'light')
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex h-screen text-text_light bg-bg_light dark:text-text_dark dark:bg-bg_dark font-sans">
      <LeftNav />
      <div className="flex-1 flex flex-col">
        <TopNav onSearch={(query) => console.log('Search from TopNav:', query)} />
        <main className="flex-1 p-6 overflow-y-auto mx-auto w-full max-w-content-max"> {/* Modified */}
          <Outlet />
        </main>
        <GlobalToast /> {/* Added */}
      </div>
    </div>
  );
}

export default App;