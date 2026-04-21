import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InnerPage, InnerHero, InnerContent } from './InnerPage';
import { Card, Button, Avatar, Divider, StatBox } from '../components/UI';
import { ZONES, AVATAR_COLORS, generateName, validate } from '../data/constants';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const { profile, setProfile, showToast } = useApp();
  const [local, setLocal] = useState({ ...profile });
  const [nameErr, setNameErr] = useState('');
  const [saved, setSaved] = useState(false);

  const set = (k, v) => setLocal(p => ({ ...p, [k]: v }));

  const save = () => {
    const e = validate.name(local.name);
    if (e) { setNameErr(e); return; }
    setNameErr('');
    setProfile({ ...local });
    setSaved(true);
    showToast('Profile saved to your device!', 'success');
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <InnerPage>
      <InnerHero
        eyebrow="🔒 Local only · No server"
        title="Your Profile"
        subtitle="Anonymous in the street. Known in your zone."
      />
      <InnerContent>

        {/* Avatar Preview */}
        <div className={styles.avatarPreview}>
          <div className={styles.avatarRing} style={{ borderColor: local.color }}>
            <Avatar name={local.name} color={local.color} size={88} />
          </div>
          <div className={styles.avatarName}>{local.name || 'Your Name'}</div>
          <div className={styles.avatarZone}>📍 {local.zone}</div>
        </div>

        {/* Name */}
        <Card style={{ marginBottom: 14 }}>
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Display Name</div>
            <div className={styles.nameRow}>
              <div style={{ flex: 1 }}>
                <input
                  className={`${styles.nameInput} ${nameErr ? styles.nameInputErr : ''}`}
                  value={local.name}
                  onChange={e => { set('name', e.target.value); setNameErr(''); }}
                  placeholder="Your anonymous name"
                  maxLength={24}
                />
                {nameErr && <div className={styles.fieldErr}>{nameErr}</div>}
              </div>
              <button
                className={styles.randomBtn}
                onClick={() => set('name', generateName())}
                title="Generate random name"
              >
                🎲
              </button>
            </div>
          </div>
        </Card>

        {/* Colour */}
        <Card style={{ marginBottom: 14 }}>
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Avatar Colour</div>
            <div className={styles.colorRow}>
              {AVATAR_COLORS.map(c => (
                <div
                  key={c}
                  className={`${styles.colorSwatch} ${local.color === c ? styles.colorSwatchSel : ''}`}
                  style={{ background: c }}
                  onClick={() => set('color', c)}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Zone */}
        <Card style={{ marginBottom: 20 }}>
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Your Zone</div>
            <div className={styles.zoneRow}>
              {ZONES.map(z => (
                <button
                  key={z}
                  className={`${styles.zoneChip} ${local.zone === z ? styles.zoneChipSel : ''}`}
                  onClick={() => set('zone', z)}
                >
                  📍 {z}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <Button
          variant="primary"
          size="full"
          onClick={save}
        >
          {saved ? '✓ Profile Saved!' : 'Save Profile'}
        </Button>

        <Divider style={{ margin: '28px 0' }} />

        {/* Stats */}
        <div className={styles.statsTitle}>Your Contributions</div>
        <div className={styles.statsGrid}>
          <StatBox icon="💡" num={local.tips    || 3} label="Tips Shared" />
          <StatBox icon="🛺" num={local.faresAdded || 1} label="Fares Added" />
          <StatBox icon="👍" num={local.votes   || 7} label="Votes Cast" />
          <StatBox icon="⭐" num={`${local.trust || 42}%`} label="Trust Score" />
        </div>

        <Divider style={{ margin: '28px 0' }} />

        {/* Privacy note */}
        <div className={styles.privacyBox}>
          <div className={styles.privacyIcon}>🔒</div>
          <div>
            <div className={styles.privacyTitle}>Your privacy is guaranteed</div>
            <div className={styles.privacySub}>
              No account required. No phone number. All data stays on your device only — nothing is ever sent to any server.
            </div>
          </div>
        </div>

      </InnerContent>
    </InnerPage>
  );
}
