import React from 'react';
import { useToast } from '../../context/ToastContext';
import './Toast.css';

const ICONS = { success: '✓', error: '✕', info: 'ℹ' };

export default function ToastContainer() {
  const { toasts, remove } = useToast();
  return (
    <div className="toast-root" role="region" aria-label="Notifications" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`} role="status">
          <span className="toast-icon" aria-hidden="true">{ICONS[t.type] || ICONS.info}</span>
          <span className="toast-msg">{t.message}</span>
          <button className="toast-close" onClick={() => remove(t.id)} aria-label="Dismiss notification">✕</button>
        </div>
      ))}
    </div>
  );
}
