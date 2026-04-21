import React from 'react';
import { LiveDot } from '../components/UI';
import styles from './InnerPage.module.css';

export function InnerHero({ eyebrow, title, subtitle, action, live = false }) {
  return (
    <div className={styles.hero}>
      <div className={styles.heroGrain} />
      <div className={styles.heroOrb} />
      <div className={styles.heroContent}>
        <div className={styles.heroEye}>
          {live && <LiveDot />}
          {eyebrow}
        </div>
        <h1 className={styles.heroTitle}>{title}</h1>
        {subtitle && <p className={styles.heroSub}>{subtitle}</p>}
        {action}
      </div>
    </div>
  );
}

export function InnerContent({ children }) {
  return <div className={styles.content}>{children}</div>;
}

export function InnerPage({ children }) {
  return <div className={styles.page}>{children}</div>;
}
