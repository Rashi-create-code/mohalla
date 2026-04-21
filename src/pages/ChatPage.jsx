import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { InnerPage, InnerHero } from './InnerPage';
import { Badge, Avatar, LiveDot, EmptyState } from '../components/UI';
import { INITIAL_MESSAGES, validate } from '../data/constants';
import styles from './ChatPage.module.css';

const MSG_TYPES = ['tip', 'question', 'alert', 'info'];

function MessageBubble({ msg }) {
  const badgeType = msg.type === 'alert' ? 'alert' : msg.type === 'tip' ? 'tip' : msg.type === 'question' ? 'question' : 'info';
  return (
    <div className={styles.msg}>
      <Avatar name={msg.author} color={msg.color} size={42} />
      <div className={styles.msgBody}>
        <div className={styles.msgMeta}>
          <span className={styles.msgAuthor}>{msg.author}</span>
          <Badge type={badgeType}>{msg.type}</Badge>
          <span className={styles.msgTime}>{msg.time}</span>
        </div>
        <div className={styles.msgBubble}>{msg.text}</div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const { profile, showToast } = useApp();
  const [msgs, setMsgs]       = useState(INITIAL_MESSAGES);
  const [input, setInput]     = useState('');
  const [msgType, setMsgType] = useState('tip');
  const [filter, setFilter]   = useState('all');
  const [err, setErr]         = useState('');
  const bottomRef = useRef(null);

  const filtered = filter === 'all' ? msgs : msgs.filter(m => m.type === filter);

  const send = () => {
    const e = validate.chat(input);
    if (e) { setErr(e); return; }
    setErr('');
    const newMsg = {
      id: Date.now(),
      author: profile.name,
      color: profile.color,
      type: msgType,
      text: input,
      time: 'now',
    };
    setMsgs(m => [newMsg, ...m]);
    setInput('');
    showToast('Posted to zone!', 'success');
  };

  return (
    <InnerPage>
      <InnerHero
        eyebrow={profile.zone}
        title="Zone Chat"
        subtitle="Anonymous. Real. Yours."
        live
      />

      {/* Filter bar */}
      <div className={styles.filterBar}>
        {['all', ...MSG_TYPES].map(t => (
          <button
            key={t}
            className={`${styles.filterBtn} ${filter === t ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter(t)}
          >
            {t === 'all' ? 'All' : t}
          </button>
        ))}
        <span className={styles.filterCount}>{filtered.length} messages</span>
      </div>

      {/* Messages */}
      <div className={styles.msgs}>
        {filtered.length === 0 ? (
          <EmptyState
            icon="💬"
            title={`No ${filter} messages yet`}
            subtitle="Be the first to share one!"
          />
        ) : (
          filtered.map((m, i) => (
            <div
              key={m.id}
              style={{ animationDelay: `${Math.min(i, 6) * 0.04}s` }}
              className={styles.msgWrap}
            >
              <MessageBubble msg={m} />
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Composer */}
      <div className={styles.composer}>
        {/* Type picker */}
        <div className={styles.typePicker}>
          {MSG_TYPES.map(t => (
            <button
              key={t}
              className={`${styles.typeBtn} ${msgType === t ? styles.typeBtnActive : ''}`}
              onClick={() => setMsgType(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className={styles.composerRow}>
          <Avatar name={profile.name} color={profile.color} size={42} />
          <div className={styles.composerInput}>
            <textarea
              className={`${styles.textarea} ${err ? styles.textareaErr : ''}`}
              rows={2}
              placeholder={`Share a ${msgType} with your mohalla…`}
              value={input}
              onChange={e => { setInput(e.target.value); if (err) setErr(''); }}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
              }}
              maxLength={240}
            />
            <div className={styles.composerFooter}>
              <div>
                {err
                  ? <span className={styles.composerErr}>{err}</span>
                  : <span className={styles.charCount}>{input.length}/240</span>
                }
              </div>
              <button className={styles.postBtn} onClick={send}>Post →</button>
            </div>
          </div>
        </div>
      </div>
    </InnerPage>
  );
}
