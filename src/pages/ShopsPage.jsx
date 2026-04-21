import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { InnerPage, InnerHero, InnerContent } from './InnerPage';
import { Card, Badge, PriceChip, EmptyState } from '../components/UI';
import { SHOPS, validate } from '../data/constants';
import styles from './ShopsPage.module.css';

const TRUST_FILTERS = ['All', 'Trusted', 'Fair', 'Costly'];
const TYPE_FILTERS = ['All', 'Grocery', 'Electronics', 'Produce', 'Medicine', 'Mobile', 'Food', 'Salon', 'Stationery'];

function ShopRow({ shop, isOpen, onToggle, onReport }) {
  return (
    <>
      <div className={styles.shopRow} onClick={onToggle}>
        <div className={styles.shopIcon}>{shop.icon}</div>
        <div className={styles.shopInfo}>
          <div className={styles.shopTop}>
            <div className={styles.shopName}>{shop.name}</div>
            <Badge type={shop.trust.toLowerCase()}>{shop.trust}</Badge>
          </div>
          <div className={styles.shopMeta}>
            {shop.type} · ⭐ {shop.rating} ({shop.reviews} reviews) · Open {shop.open}
          </div>
          <div className={styles.shopPrices}>
            {shop.prices.map(p => <PriceChip key={p}>{p}</PriceChip>)}
          </div>
        </div>
        <div className={styles.shopChevron} style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</div>
      </div>

      {isOpen && (
        <div className={styles.shopDetail}>
          <div className={styles.shopDetailRow}>
            <span className={styles.shopDetailLabel}>About</span>
            <p className={styles.shopDetailText}>{shop.desc}</p>
          </div>
          <div className={styles.shopDetailRow}>
            <span className={styles.shopDetailLabel}>Since</span>
            <span className={styles.shopDetailText}>{shop.since} in locality</span>
          </div>
          <button className={styles.shopReport} onClick={e => { e.stopPropagation(); onReport(); }}>
            ⚑ Report inaccurate info
          </button>
        </div>
      )}
    </>
  );
}

export default function ShopsPage() {
  const { showToast } = useApp();
  const [trust, setTrust] = useState('All');
  const [type, setType] = useState('All');
  const [search, setSearch] = useState('');
  const [searchErr, setSearchErr] = useState('');
  const [openId, setOpenId] = useState(null);

  const filtered = useMemo(() => SHOPS.filter(s => {
    if (trust !== 'All' && s.trust !== trust) return false;
    if (type !== 'All' && s.type !== type) return false;
    if (search.length >= 2) {
      const q = search.toLowerCase();
      if (!s.name.toLowerCase().includes(q) && !s.type.toLowerCase().includes(q)) return false;
    }
    return true;
  }), [trust, type, search]);

  const handleSearch = v => {
    setSearch(v);
    setSearchErr(v.length > 0 && v.length < 2 ? 'Type at least 2 characters to search' : '');
  };

  return (
    <InnerPage>
      <InnerHero
        eyebrow="📍 Your Zone"
        title="Local Shops"
        subtitle="Crowd-sourced trust ratings & live prices from real locals"
      />
      <InnerContent>
        {/* Search */}
        <div className={styles.searchWrap}>
          <div className={styles.searchIcon}>🔍</div>
          <input
            className={`${styles.searchInput} ${searchErr ? styles.searchInputErr : ''}`}
            placeholder="Search shops or categories…"
            value={search}
            onChange={e => handleSearch(e.target.value)}
            maxLength={50}
          />
        </div>
        {searchErr && <div className={styles.searchErr}>{searchErr}</div>}

        {/* Trust filter */}
        <div className={styles.filterRow}>
          {TRUST_FILTERS.map(t => (
            <button
              key={t}
              className={`${styles.filterBtn} ${trust === t ? styles.filterBtnActive : ''}`}
              onClick={() => setTrust(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Type filter */}
        <div className={styles.filterRow} style={{ marginBottom: 20 }}>
          {TYPE_FILTERS.map(t => (
            <button
              key={t}
              className={`${styles.filterBtn} ${styles.filterBtnSm} ${type === t ? styles.filterBtnActive : ''}`}
              onClick={() => setType(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Count */}
        <div className={styles.resultCount}>
          {filtered.length} shop{filtered.length !== 1 ? 's' : ''} found
        </div>

        {/* List */}
        <Card>
          {filtered.length === 0 ? (
            <EmptyState
              icon="🔍"
              title="No shops found"
              subtitle="Try a different filter or search term"
            />
          ) : (
            filtered.map(s => (
              <ShopRow
                key={s.id}
                shop={s}
                isOpen={openId === s.id}
                onToggle={() => setOpenId(openId === s.id ? null : s.id)}
                onReport={() => showToast("Thanks for the report – we'll review it.", "success")}
              />
            ))
          )}
        </Card>
      </InnerContent>
    </InnerPage>
  );
}
