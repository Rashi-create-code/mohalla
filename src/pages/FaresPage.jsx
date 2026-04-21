import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InnerPage, InnerHero, InnerContent } from './InnerPage';
import { Card, Button, Badge, AccuracyBar } from '../components/UI';
import { FARES, validate } from '../data/constants';
import styles from './FaresPage.module.css';

function FareCard({ fare, vote, voted }) {
  const acc = Math.round(fare.upvotes / ((fare.upvotes + fare.downvotes) || 1) * 100);
  return (
    <div className={styles.fareRow}>
      <div className={styles.fareTop}>
        <div className={styles.fareRoute}>
          <span className={styles.farePoint}>{fare.from}</span>
          <span className={styles.fareArrow}>→</span>
          <span className={styles.farePoint}>{fare.to}</span>
        </div>
        <Badge type={fare.mode.toLowerCase()}>{fare.mode}</Badge>
      </div>

      <div className={styles.fareMiddle}>
        <div className={styles.fareAmount}>₹{fare.price}</div>
        <div className={styles.fareAccuracy}>
          <div className={styles.fareAccLabels}>
            <span className={styles.fareAccLabel}>Accuracy</span>
            <span className={styles.fareAccVal}>{acc}%</span>
          </div>
          <AccuracyBar value={acc} />
          <div className={styles.fareVoteCount}>{fare.upvotes + fare.downvotes} votes cast</div>
        </div>
      </div>

      <div className={styles.fareVotes}>
        <button
          className={`${styles.voteBtn} ${voted === 'up' ? styles.votedUp : ''}`}
          onClick={() => vote(fare.id, 'up')}
          disabled={!!voted}
        >
          👍 {fare.upvotes}
        </button>
        <button
          className={`${styles.voteBtn} ${voted === 'down' ? styles.votedDown : ''}`}
          onClick={() => vote(fare.id, 'down')}
          disabled={!!voted}
        >
          👎 {fare.downvotes}
        </button>
        {voted && <span className={styles.votedMsg}>Vote recorded ✓</span>}
      </div>
    </div>
  );
}

function AddFareForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({ from: '', to: '', mode: 'Auto', price: '' });
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const errs = {};
    if (!form.from.trim())         errs.from  = 'Starting point required';
    if (!form.to.trim())           errs.to    = 'Destination required';
    const pe = validate.fare(form.price);
    if (pe)                        errs.price = pe;
    setErrors(errs);
    if (Object.keys(errs).length)  return;
    onSubmit({ ...form, price: parseFloat(form.price) });
  };

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); };

  return (
    <Card style={{ marginBottom: 20, overflow: 'visible' }}>
      <div className={styles.formWrap}>
        <div className={styles.formTitle}>Submit a Fare</div>
        <div className={styles.formGrid}>
          <div className={styles.formField}>
            <label className={styles.formLabel}>From</label>
            <input
              className={`${styles.formInput} ${errors.from ? styles.formInputErr : ''}`}
              placeholder="e.g. Bus Stand"
              value={form.from}
              onChange={e => set('from', e.target.value)}
              maxLength={40}
            />
            {errors.from && <div className={styles.formError}>{errors.from}</div>}
          </div>
          <div className={styles.formField}>
            <label className={styles.formLabel}>To</label>
            <input
              className={`${styles.formInput} ${errors.to ? styles.formInputErr : ''}`}
              placeholder="e.g. Civil Hospital"
              value={form.to}
              onChange={e => set('to', e.target.value)}
              maxLength={40}
            />
            {errors.to && <div className={styles.formError}>{errors.to}</div>}
          </div>
          <div className={styles.formField}>
            <label className={styles.formLabel}>Mode</label>
            <select
              className={styles.formInput}
              value={form.mode}
              onChange={e => set('mode', e.target.value)}
            >
              {['Auto', 'Rickshaw', 'E-Rickshaw', 'Cab'].map(m => <option key={m}>{m}</option>)}
            </select>
          </div>
          <div className={styles.formField}>
            <label className={styles.formLabel}>Amount (₹)</label>
            <input
              className={`${styles.formInput} ${errors.price ? styles.formInputErr : ''}`}
              placeholder="e.g. 40"
              type="number" min="1" max="999"
              value={form.price}
              onChange={e => set('price', e.target.value)}
            />
            {errors.price && <div className={styles.formError}>{errors.price}</div>}
          </div>
        </div>
        <div className={styles.formActions}>
          <Button variant="primary" onClick={handleSubmit}>Submit Fare</Button>
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </Card>
  );
}

export default function FaresPage() {
  const { showToast } = useApp();
  const [fares, setFares]   = useState(FARES);
  const [votes, setVotes]   = useState({});
  const [showForm, setShowForm] = useState(false);

  const vote = (id, dir) => {
    if (votes[id]) return;
    setVotes(v => ({ ...v, [id]: dir }));
    setFares(f => f.map(r => r.id === id
      ? { ...r, upvotes: r.upvotes + (dir === 'up' ? 1 : 0), downvotes: r.downvotes + (dir === 'down' ? 1 : 0) }
      : r
    ));
    showToast(dir === 'up' ? 'Fare confirmed — thanks!' : 'Fare flagged for review!', 'success');
  };

  const addFare = (data) => {
    setFares(f => [{ id: Date.now(), ...data, upvotes: 1, downvotes: 0 }, ...f]);
    setShowForm(false);
    showToast('Fare submitted! Thanks for contributing.', 'success');
  };

  return (
    <InnerPage>
      <InnerHero
        eyebrow="🛺 Crowd-sourced"
        title="Auto Fares"
        subtitle="Verified by locals. Upvote accurate fares, flag wrong ones."
        action={
          <button className={styles.addBtn} onClick={() => setShowForm(s => !s)}>
            + Add Fare
          </button>
        }
      />
      <InnerContent>
        {showForm && (
          <AddFareForm
            onSubmit={addFare}
            onCancel={() => setShowForm(false)}
          />
        )}
        <Card>
          {fares.map(f => (
            <FareCard key={f.id} fare={f} vote={vote} voted={votes[f.id]} />
          ))}
        </Card>
      </InnerContent>
    </InnerPage>
  );
}
