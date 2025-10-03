import { Outlet } from 'react-router-dom';
import TopNav from './components/layout/TopNav';
import LeftNav from './components/layout/LeftNav';
import { useTheme } from './ThemeInitializer';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`flex h-screen text-text_light bg-bg_light dark:text-text_dark dark:bg-bg_dark font-sans ${theme === 'dark' ? 'dark' : ''}`}>
      <LeftNav />
      <div className="flex-1 flex flex-col">
        <TopNav onSearch={(query) => console.log('Search from TopNav:', query)} />
        <main className="flex-1 p-6 overflow-y-auto mx-auto w-full max-w-content-max">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;

export default App;