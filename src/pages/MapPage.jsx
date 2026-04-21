import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InnerPage, InnerHero, InnerContent } from './InnerPage';
import { Card, Button, Avatar, Badge, LiveDot } from '../components/UI';
import { MAP_PINS, validate } from '../data/constants';
import styles from './MapPage.module.css';

function MapCanvas({ selectedPin, onPinClick }) {
  return (
    <div className={styles.mapWrap}>
      <div className={styles.mapCanvas}>
        {/* SVG Grid */}
        <svg className={styles.mapGrid} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#888" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Roads */}
        <div className={styles.roadH} />
        <div className={styles.roadV} />
        <div className={styles.roadD} />

        {/* Safe zone */}
        <div className={styles.safeZone} style={{ left: '26%', top: '38%', width: 110, height: 110, marginLeft: -55, marginTop: -55 }} />

        {/* Unsafe zone */}
        <div className={styles.unsafeZone} style={{ left: '75%', top: '65%', width: 88, height: 88, marginLeft: -44, marginTop: -44 }} />

        {/* Pins */}
        {MAP_PINS.map(p => (
          <div
            key={p.id}
            className={`${styles.pin} ${selectedPin?.id === p.id ? styles.pinActive : ''}`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            onClick={() => onPinClick(p)}
          >
            <div className={styles.pinIcon}>{p.icon}</div>
            {selectedPin?.id === p.id && (
              <div className={styles.pinLabel}>{p.label}</div>
            )}
          </div>
        ))}

        {/* Legend */}
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={styles.legendDotGreen} /> Safe zone
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendDotRed} /> Caution
          </div>
        </div>
      </div>
    </div>
  );
}

function ZoneChat({ profile }) {
  const { showToast } = useApp();
  const [msgs, setMsgs] = useState([
    { id: 1, author: 'SwiftPanda', color: '#e8581a', text: 'Water supply off tomorrow 10am–2pm!', time: '2m ago' },
    { id: 2, author: 'QuietFinch', color: '#1a9e6e', text: 'Fresh paneer at Sharma store today.', time: '8m ago' },
    { id: 3, author: 'BoldMaple',  color: '#185fa5', text: 'Sector 12 gate road is still blocked.', time: '15m ago' },
  ]);
  const [input, setInput] = useState('');
  const [err, setErr] = useState('');

  const send = () => {
    const e = validate.chat(input);
    if (e) { setErr(e); return; }
    setErr('');
    setMsgs(m => [{ id: Date.now(), author: profile.name, color: profile.color, text: input, time: 'now' }, ...m]);
    setInput('');
    showToast('Message sent!', 'success');
  };

  return (
    <Card>
      <div className={styles.chatHeader}>
        <LiveDot />
        <span className={styles.chatTitle}>Zone Chat</span>
        <span className={styles.chatCount}>{msgs.length} messages</span>
      </div>
      <div className={styles.chatMsgs}>
        {msgs.map(m => (
          <div key={m.id} className={styles.chatMsg}>
            <Avatar name={m.author} color={m.color} size={30} />
            <div className={styles.chatMsgBody}>
              <span className={styles.chatAuthor}>{m.author}</span>
              <span className={styles.chatTime}>{m.time}</span>
              <div className={styles.chatText}>{m.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.chatInputRow}>
        <input
          className={`${styles.chatInput} ${err ? styles.chatInputErr : ''}`}
          placeholder="Ask locals something…"
          value={input}
          onChange={e => { setInput(e.target.value); setErr(''); }}
          onKeyDown={e => e.key === 'Enter' && send()}
          maxLength={240}
        />
        <Button variant="primary" size="sm" onClick={send}>→</Button>
      </div>
      {err && <div className={styles.chatErr}>{err}</div>}
    </Card>
  );
}

export default function MapPage() {
  const { profile } = useApp();
  const [selectedPin, setSelectedPin] = useState(null);

  const handlePinClick = (p) => setSelectedPin(prev => prev?.id === p.id ? null : p);

  return (
    <InnerPage>
      <InnerHero
        eyebrow={profile.zone}
        title="Zone Map"
        subtitle="Live pins, safe routes & community alerts"
        live
      />

      <MapCanvas selectedPin={selectedPin} onPinClick={handlePinClick} />

      {selectedPin && (
        <div className={styles.pinDetail}>
          <div className={styles.pinDetailLeft}>
            <span className={styles.pinDetailIcon}>{selectedPin.icon}</span>
            <div>
              <div className={styles.pinDetailName}>{selectedPin.label}</div>
              <div className={styles.pinDetailSub}>Tap map to see nearby info · <Badge type="info">{selectedPin.type}</Badge></div>
            </div>
          </div>
          <button className={styles.pinDetailClose} onClick={() => setSelectedPin(null)}>✕</button>
        </div>
      )}

      <InnerContent>
        <ZoneChat profile={profile} />
      </InnerContent>
    </InnerPage>
  );
}
