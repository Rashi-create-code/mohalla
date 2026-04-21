import React, { useState, useCallback } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Splash } from './components/Splash';
import { Navbar, BottomNav } from './components/Navbar';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Toast } from './components/UI';
import HomePage    from './pages/HomePage';
import MapPage     from './pages/MapPage';
import ShopsPage   from './pages/ShopsPage';
import FaresPage   from './pages/FaresPage';
import ChatPage    from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import './styles/globals.css';

const PAGES = {
  home:    HomePage,
  map:     MapPage,
  shops:   ShopsPage,
  fares:   FaresPage,
  chat:    ChatPage,
  profile: ProfilePage,
};

function AppInner() {
  const { page, toast } = useApp();
  const PageComponent = PAGES[page] || HomePage;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)' }}>
      <Navbar />
      <ErrorBoundary>
        <PageComponent key={page} />
      </ErrorBoundary>
      <BottomNav />
      <Toast toast={toast} />
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashDone = useCallback(() => setShowSplash(false), []);

  if (showSplash) return <Splash onDone={handleSplashDone} />;

  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
