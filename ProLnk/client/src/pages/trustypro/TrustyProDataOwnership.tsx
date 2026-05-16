import { useState } from 'react';

const dataTypes = [
  {
    id: 'scan',
    label: 'Scan Reports',
    emoji: '📋',
    whoCanSee: ['You (always)', 'Contractors you explicitly invite', 'TrustyPro AI for scoring only — never sold'],
    control: ['Revoke contractor access any time from your dashboard', 'Set report expiry (30/60/90 days)', 'Download full PDF before deleting'],
    deleteSteps: ['Go to Settings → My Data', 'Select the scan report', 'Click Delete Report — removed within 24 hours from all servers'],
  },
  {
    id: 'photos',
    label: 'Photos & Video',
    emoji: '📷',
    whoCanSee: ['You only by default', 'Contractors you share a specific report with', 'Anonymized thumbnails used for AI model improvement (opt out available)'],
    control: ['Opt out of AI training use in Privacy Settings', 'Share individual photos without sharing full report', 'Original files always downloadable in full resolution'],
    deleteSteps: ['Settings → My Media', 'Select files or bulk-select', 'Permanently deleted from CDN within 72 hours'],
  },
  {
    id: 'property',
    label: 'Property Details',
    emoji: '🏠',
    whoCanSee: ['You and any co-owners you add', 'ProLnk matching engine (anonymized for lead routing only)', 'Never shared with third-party data brokers'],
    control: ['Edit address, square footage, age at any time', 'Mark property as inactive to pause all matching', 'Transfer ownership to new owner when selling'],
    deleteSteps: ['Settings → Properties → Select property → Delete', 'All linked scans and media deleted in cascade', 'ProLnk removes from matching index within 48 hours'],
  },
  {
    id: 'contractor',
    label: 'Contractor Access Logs',
    emoji: '🔑',
    whoCanSee: ['Only you can see who has accessed your data', 'Contractors see only what you shared, not the log itself', 'TrustyPro compliance team for audit purposes only'],
    control: ['Full access log with timestamps in Settings → Access History', 'Alert settings for any new access event', 'Export log as CSV for your records'],
    deleteSteps: ['Logs are retained 2 years for legal compliance', 'You can request log anonymization after 90 days', 'Contact privacy@trustypro.io for expedited requests'],
  },
];

export default function TrustyProDataOwnership() {
  const [selected, setSelected] = useState(dataTypes[0]);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1e293b', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, color: '#1e293b' }}>You Own Your Data</h1>
          <p style={{ color: '#64748b', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>
            TrustyPro is built on a simple principle: your home data belongs to you. Here's exactly what that means, what you control, and how to exercise those rights.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { emoji: '✅', title: 'Right to Access', desc: 'Download every byte of your data at any time — reports, photos, logs, and raw AI scores.' },
            { emoji: '🗑️', title: 'Right to Delete', desc: 'Request deletion of any data type. Completed within 24–72 hours across all systems.' },
            { emoji: '📤', title: 'Right to Export', desc: 'Full data export in JSON and PDF. Take your home history anywhere.' },
            { emoji: '🚫', title: 'Right to Restrict', desc: 'Opt out of AI training use, anonymized analytics, or contractor visibility at any level.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', borderTop: '4px solid #4F46E5' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.emoji}</div>
              <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: 15, color: '#1e293b' }}>{card.title}</h3>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 32, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#1e293b' }}>Select a Data Type</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
            {dataTypes.map(d => (
              <button key={d.id} onClick={() => setSelected(d)} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, background: selected.id === d.id ? '#4F46E5' : '#e2e8f0', color: selected.id === d.id ? '#fff' : '#1e293b' }}>
                {d.emoji} {d.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            <div style={{ background: '#f1f5f9', borderRadius: 12, padding: 20 }}>
              <h3 style={{ fontWeight: 700, color: '#4F46E5', marginBottom: 12, fontSize: 15 }}>👁️ Who Can See This</h3>
              <ul style={{ paddingLeft: 18 }}>
                {selected.whoCanSee.map(w => <li key={w} style={{ fontSize: 14, color: '#475569', marginBottom: 6 }}>{w}</li>)}
              </ul>
            </div>
            <div style={{ background: '#f1f5f9', borderRadius: 12, padding: 20 }}>
              <h3 style={{ fontWeight: 700, color: '#4F46E5', marginBottom: 12, fontSize: 15 }}>🎛️ How to Control Access</h3>
              <ul style={{ paddingLeft: 18 }}>
                {selected.control.map(c => <li key={c} style={{ fontSize: 14, color: '#475569', marginBottom: 6 }}>{c}</li>)}
              </ul>
            </div>
            <div style={{ background: '#fef3c7', borderRadius: 12, padding: 20 }}>
              <h3 style={{ fontWeight: 700, color: '#92400e', marginBottom: 12, fontSize: 15 }}>🗑️ How to Delete</h3>
              <ol style={{ paddingLeft: 18 }}>
                {selected.deleteSteps.map(s => <li key={s} style={{ fontSize: 14, color: '#78350f', marginBottom: 6 }}>{s}</li>)}
              </ol>
            </div>
          </div>
        </div>

        <div style={{ background: '#4F46E5', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 10 }}>📬</div>
          <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: '#fff' }}>Privacy Team Contact</h3>
          <p style={{ color: '#c7d2fe', fontSize: 15 }}>For CCPA / GDPR requests, data exports, or deletion confirmation: <strong style={{ color: '#fff' }}>privacy@trustypro.io</strong></p>
          <p style={{ color: '#a5b4fc', fontSize: 13, marginTop: 8 }}>Response within 5 business days. Expedited 24-hour option for urgent cases.</p>
        </div>
      </div>
    </div>
  );
}
