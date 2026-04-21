import React from 'react';
import styles from './UI.module.css';

// ─── BUTTON ──────────────────────────────────────────────────────────────────
export function Button({ variant = 'primary', children, onClick, style = {}, disabled = false, size = 'md' }) {
  return (
    <button
      className={`${styles.btn} ${styles[`btn_${variant}`]} ${styles[`btn_${size}`]}`}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

// ─── BADGE ───────────────────────────────────────────────────────────────────
export function Badge({ type = 'info', children }) {
  return (
    <span className={`${styles.badge} ${styles[`badge_${type.toLowerCase()}`]}`}>
      {children}
    </span>
  );
}

// ─── LIVE DOT ─────────────────────────────────────────────────────────────────
export function LiveDot() {
  return <span className={styles.liveDot} />;
}

// ─── AVATAR ──────────────────────────────────────────────────────────────────
export function Avatar({ name, color, size = 40 }) {
  return (
    <div
      className={styles.avatar}
      style={{
        background: color,
        width: size,
        height: size,
        fontSize: size * 0.38,
        flexShrink: 0,
      }}
    >
      {name ? name[0].toUpperCase() : '?'}
    </div>
  );
}

// ─── EYEBROW / SECTION TAG ────────────────────────────────────────────────────
export function SectionTag({ children, dark = false }) {
  return (
    <div className={`${styles.sectionTag} ${dark ? styles.sectionTagDark : ''}`}>
      {children}
    </div>
  );
}

// ─── FORM INPUT ──────────────────────────────────────────────────────────────
export function FormInput({ label, error, ...props }) {
  return (
    <div className={styles.formField}>
      {label && <label className={styles.formLabel}>{label}</label>}
      <input className={`${styles.formInput} ${error ? styles.formInputErr : ''}`} {...props} />
      {error && <div className={styles.formError}>{error}</div>}
    </div>
  );
}

export function FormSelect({ label, error, children, ...props }) {
  return (
    <div className={styles.formField}>
      {label && <label className={styles.formLabel}>{label}</label>}
      <select className={`${styles.formInput} ${error ? styles.formInputErr : ''}`} {...props}>
        {children}
      </select>
      {error && <div className={styles.formError}>{error}</div>}
    </div>
  );
}

export function FormTextarea({ label, error, ...props }) {
  return (
    <div className={styles.formField}>
      {label && <label className={styles.formLabel}>{label}</label>}
      <textarea className={`${styles.formInput} ${styles.formTextarea} ${error ? styles.formInputErr : ''}`} {...props} />
      {error && <div className={styles.formError}>{error}</div>}
    </div>
  );
}

// ─── CARD ────────────────────────────────────────────────────────────────────
export function Card({ children, style = {}, className = '' }) {
  return (
    <div className={`${styles.card} ${className}`} style={style}>
      {children}
    </div>
  );
}

// ─── DIVIDER ─────────────────────────────────────────────────────────────────
export function Divider({ style = {} }) {
  return <div className={styles.divider} style={style} />;
}

// ─── CIRCLE BUTTON ───────────────────────────────────────────────────────────
export function CircleBtn({ children, onClick, accent = false, style = {} }) {
  return (
    <button
      className={`${styles.circleBtn} ${accent ? styles.circleBtnAccent : ''}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}

// ─── ACCURACY BAR ─────────────────────────────────────────────────────────────
export function AccuracyBar({ value }) {
  return (
    <div className={styles.accBar}>
      <div className={styles.accFill} style={{ width: `${value}%` }} />
    </div>
  );
}

// ─── PRICE CHIP ──────────────────────────────────────────────────────────────
export function PriceChip({ children }) {
  return <span className={styles.priceChip}>{children}</span>;
}

// ─── STAT BOX ────────────────────────────────────────────────────────────────
export function StatBox({ icon, num, label }) {
  return (
    <div className={styles.statBox}>
      <div className={styles.statIcon}>{icon}</div>
      <div className={styles.statNum}>{num}</div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}

// ─── TOAST ───────────────────────────────────────────────────────────────────
export function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className={`${styles.toast} ${styles[`toast_${toast.type}`]}`}>
      {toast.msg}
    </div>
  );
}

// ─── EMPTY STATE ─────────────────────────────────────────────────────────────
export function EmptyState({ icon, title, subtitle }) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>{icon}</div>
      <div className={styles.emptyTitle}>{title}</div>
      {subtitle && <div className={styles.emptySub}>{subtitle}</div>}
    </div>
  );
}
