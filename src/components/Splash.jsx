import React, { useState, useEffect } from 'react';
import styles from './Splash.module.css';

export function Splash({ onDone }) {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setExit(true), 2400);
    const t2 = setTimeout(onDone, 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className={`${styles.splash} ${exit ? styles.exit : ''}`}>
      {/* Background grain */}
      <div className={styles.grain} />

      {/* Decorative orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      <div className={styles.content}>
        <div className={styles.logo}>
          Mohalla<span className={styles.dot}>.</span>
        </div>
        <div className={styles.tagline}>Your street knows best</div>
        <div className={styles.bar} />
      </div>
    </div>
  );
}
