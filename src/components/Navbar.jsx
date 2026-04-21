import React from 'react';
import { useApp } from '../context/AppContext';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { id: 'home',    label: 'Home' },
  { id: 'map',     label: 'Map' },
  { id: 'shops',   label: 'Shops' },
  { id: 'fares',   label: 'Fares' },
  { id: 'chat',    label: 'Chat' },
];

const BOTTOM_ITEMS = [
  { id: 'home',    icon: '⌂', label: 'Home' },
  { id: 'map',     icon: '◎', label: 'Map' },
  { id: 'shops',   icon: '🏪', label: 'Shops' },
  { id: 'fares',   icon: '🛺', label: 'Fares' },
  { id: 'chat',    icon: '◈', label: 'Chat' },
  { id: 'profile', icon: '◉', label: 'Me' },
];

export function Navbar() {
  const { page, setPage } = useApp();

  return (
    <nav className={styles.navbar}>
      <button className={styles.logo} onClick={() => setPage('home')}>
        Mohalla<span className={styles.dot}>.</span>
      </button>

      <div className={styles.links}>
        {NAV_LINKS.map(l => (
          <button
            key={l.id}
            className={`${styles.link} ${page === l.id ? styles.linkActive : ''}`}
            onClick={() => setPage(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>

      <button className={styles.cta} onClick={() => setPage('profile')}>
        My Profile
      </button>

      <button className={styles.mobMenu} onClick={() => setPage('profile')}>☰</button>
    </nav>
  );
}

export function BottomNav() {
  const { page, setPage } = useApp();

  return (
    <nav className={styles.bottomNav}>
      {BOTTOM_ITEMS.map(it => (
        <button
          key={it.id}
          className={`${styles.bottomItem} ${page === it.id ? styles.bottomItemActive : ''}`}
          onClick={() => setPage(it.id)}
        >
          <span className={styles.bottomIcon}>{it.icon}</span>
          <span className={styles.bottomLabel}>{it.label}</span>
        </button>
      ))}
    </nav>
  );
}
