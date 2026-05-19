import { useState } from 'react';

const APPS = [
  { name: 'TaskEasy', emoji: '🌿', strength: 'Recurring lawn care, automated scheduling', cost: '$29–$79/visit', dfwNote: 'Good coverage in suburban DFW zip codes', best: ['lawn', 'recurring'] },
  { name: 'Thumbtack', emoji: '📌', strength: 'Wide trade variety, competitive quotes', cost: 'Varies by job', dfwNote: 'Large DFW contractor pool but quality varies', best: ['onetime', 'compare'] },
  { name: 'HomeZada', emoji: '🏠', strength: 'Home inventory, maintenance calendar, document storage', cost: '$5–$15/mo', dfwNote: 'Great for tracking your DFW home’s maintenance history', best: ['tracking', 'organize'] },
  { name: 'BrightNest', emoji: '✨', strength: 'Personalized maintenance reminders, DIY tips', cost: 'Free', dfwNote: 'Seasonal reminders tuned to DFW climate helpful', best: ['diy', 'reminders'] },
  { name: 'ProLnk', emoji: '🔗', strength: 'Vetted DFW pros + Home Health Vault + income opportunity', cost: 'Free for homeowners', dfwNote: 'Built specifically for DFW market with local pro vetting', best: ['vetted', 'onetime', 'track', 'income'] },
];

const NEED_MAP: Record<string, string[]> = {
  vetted: ['ProLnk'],
  track: ['HomeZada', 'ProLnk'],
  recurring: ['TaskEasy', 'ProLnk'],
  diy: ['BrightNest'],
  compare: ['Thumbtack', 'ProLnk'],
  income: ['ProLnk'],
};

export default function DFWHomeMaintenanceApp() {
  const [need, setNeed] = useState('');
  const [recs, setRecs] = useState<string[]>([]);

  function calcRec() {
    if (!need) return;
    setRecs(NEED_MAP[need] || ['ProLnk']);
  }

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', color: '#1A2940', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#1A4FBF', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW HOME MAINTENANCE APPS</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, margin: '0 0 14px', color: '#0A1628′ }}>The Best Home Maintenance Apps for <span style={{ color: '#1A4FBF' }}>DFW Homeowners in 2026</span></h1>
        <p style={{ color: '#4A6280', fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>From automated lawn care to contractor matching, there's an app for every home maintenance need. Here’s how the leading options stack up for Dallas-Fort Worth homeowners.</p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 36 }}>
          {APPS.map(app => (
            <div key={app.name} style={{ background: '#FFFFFF', borderRadius: 14, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #E2EAF4′ }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <span style={{ fontSize: 26 }}>{app.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#0A1628′ }}>{app.name}</div>
                  <div style={{ fontSize: 13, color: '#1A4FBF', fontWeight: 600 }}>Cost: {app.cost}</div>
                </div>
              </div>
              <div style={{ fontSize: 14, color: '#4A6280', marginBottom: 8 }}><strong>Best at:</strong> {app.strength}</div>
              <div style={{ fontSize: 13, color: '#2D6A4F', background: '#F0FAF4', borderRadius: 6, padding: '6px 10px' }}>📍 DFW: {app.dfwNote}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 28, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #E2EAF4′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 20, color: '#0A1628′ }}>🎯 Which App Fits Your Homeowner Need?</h2>
          <select value={need} onChange={e => setNeed(e.target.value)} style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: 8, color: '#1A2940', padding: '11px 16px', fontSize: 15, width: '100%', marginBottom: 16 }}>
            <option value="">Select your primary need...</option>
            <option value="vetted">I want vetted, trusted contractors only</option>
            <option value="track">I want to track my home maintenance history</option>
            <option value="recurring">I need recurring services (lawn, cleaning)</option>
            <option value="diy">I prefer DIY with guided reminders</option>
            <option value="compare">I want to compare multiple quotes</option>
            <option value="income">I want to earn from my home ownership</option>
          </select>
          <button onClick={calcRec} style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '13px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', width: '100%', marginBottom: 16 }}>Find My Best App Match</button>
          {recs.length > 0 && (
            <div style={{ padding: 18, background: '#F0F7FF', borderRadius: 10, borderLeft: '4px solid #1A4FBF' }}>
              <div style={{ fontWeight: 700, marginBottom: 8, color: '#0A1628′ }}>Recommended for you:</div>
              {recs.map(r => <div key={r} style={{ color: '#1A4FBF', fontWeight: 600, fontSize: 15 }}>✓ {r}</div>)}
              {recs.includes('ProLnk') && <div style={{ marginTop: 10, fontSize: 13, color: '#4A6280′ }}>ProLnk is free for DFW homeowners and includes vetted pros, job history, and optional income from your home network.</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
