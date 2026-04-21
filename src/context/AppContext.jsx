import { createContext, useContext, useState, useCallback } from 'react';
import { AVATAR_COLORS, ZONES, generateName } from '../data/constants';

const AppContext = createContext(null);

const getInitialProfile = () => {
  try {
    const stored = localStorage.getItem('mohalla_profile_v4');
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    name: generateName(),
    color: AVATAR_COLORS[0],
    zone: ZONES[0],
    trust: 42,
    tips: 3,
    faresAdded: 1,
    votes: 7,
  };
};

export function AppProvider({ children }) {
  const [page, setPageState]   = useState('home');
  const [profile, setProfileState] = useState(getInitialProfile);
  const [toast, setToast]      = useState(null);
  const [toastTimer, setToastTimer] = useState(null);

  const setPage = useCallback((p) => {
    setPageState(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const setProfile = useCallback((p) => {
    setProfileState(p);
    try { localStorage.setItem('mohalla_profile_v4', JSON.stringify(p)); } catch {}
  }, []);

  const showToast = useCallback((msg, type = 'default') => {
    if (toastTimer) clearTimeout(toastTimer);
    setToast({ msg, type });
    const t = setTimeout(() => setToast(null), 3000);
    setToastTimer(t);
  }, [toastTimer]);

  return (
    <AppContext.Provider value={{ page, setPage, profile, setProfile, showToast, toast }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
