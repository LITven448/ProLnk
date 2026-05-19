import { useState } from 'react';

const warrantyData: Record<string, { label: string; covered: string[]; actions: string[] }> = {
  '2020': { label: '2020 Build — Structural Still Active (10-yr)', covered: ['Major structural defects (foundation, framing)', 'Plumbing rough-in defects', 'Electrical rough-in defects'], actions: ['File structural warranty claims before 2030 expiry', 'Document all foundation movement with dated photos', 'ProLnk connects to warranty-compliant contractors only', 'Submit workmanship items before 2021 window (may be expired)', 'HVAC likely out of 1-yr warranty — schedule inspection'] },
  '2022': { label: '2022 Build — Active Warranties', covered: ['Structural defects (10-yr, through 2032)', 'Workmanship (1-yr, likely expired)', 'Mechanical systems (2-yr, expires 2024)'], actions: ['Verify mechanical (HVAC/plumbing) 2-yr warranty status', 'Structural warranty fully active — document any issues now', 'ProLnk uses only warranty-compliant contractors', 'HOA exterior compliance critical — Celina HOA very active', 'Construction dust/traffic still common — HVAC filter monthly'] },
  '2024': { label: '2024 Build — Full Warranty Window', covered: ['Structural defects (10-yr, through 2034)', 'Workmanship (1-yr, through 2025)', 'Mechanical systems (2-yr, through 2026)'], actions: ['All warranties likely active — use builder first for defects', 'Document EVERYTHING now — photos, dates, written notices', 'Workmanship window closing in 2025 — act fast', 'ProLnk contractors are warranty-safe (won\’t void coverage)', 'Community still under construction — seal/filter for dust'] },
  '2026': { label: '2026 Build — Brand New', covered: ['Full structural warranty (10-yr)', 'Full workmanship warranty (1-yr)', 'Full mechanical warranty (2-yr)'], actions: ['Use builder for ALL defects — do not hire outside yet', 'Create a defect log from day one', 'ProLnk pre-registers your home for post-warranty service', 'Understand HOA rules before any exterior modification', 'Connect irrigation, test all zones, document with video'] },
};

export default function CellinaHomeownerGuide2026() {
  const [year, setYear] = useState('');
  const profile = year ? warrantyData[year] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🌆</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>Celina TX Homeowner Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 560, margin: '0 auto' }}>
            Brand new master-planned community. Most homes 2020–2026 vintage. Active warranties, active HOA, active construction. Know what's covered.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          {[
            { icon: '🏗️', label: 'Still Building', desc: 'Heavy construction traffic and dust. Protect HVAC filters.' },
            { icon: '📋', label: 'Strict HOA', desc: 'Pre-approval required for almost all exterior changes.' },
            { icon: '🔒', label: 'Active Warranties', desc: 'Most Celina homes have structural warranties still running.' },
            { icon: '🔗', label: 'ProLnk Safe', desc: 'Our contractors are vetted to not void your warranties.' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📅 When Was Your Home Built?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[{ v: '2020', l: '🗓️ 2020–2021' }, { v: '2022', l: '🗓️ 2022–2023' }, { v: '2024', l: '🗓️ 2024–2025' }, { v: '2026', l: '🆕 2026' }].map(opt => (
              <button key={opt.v} onClick={() => setYear(opt.v)}
                style={{ background: year === opt.v ? '#F5E642' : '#1a2f50', color: year === opt.v ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {opt.l}
              </button>
            ))}
          </div>
        </div>

        {profile ? (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 8 }}>{profile.label}</h3>
            <div style={{ marginBottom: 12 }}>
              <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 6 }}>LIKELY STILL COVERED:</p>
              {profile.covered.map((c, i) => <div key={i} style={{ color: '#4ade80', fontSize: 13, marginBottom: 4 }}>✅ {c}</div>)}
            </div>
            <div>
              <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 6 }}>YOUR ACTION ITEMS:</p>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                {profile.actions.map((a, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 8 }}>{a}</li>)}
              </ul>
            </div>
          </div>
        ) : (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
            Select your build year to check warranty coverage and get action items.
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32 }}>🛡️</div>
          <h3 style={{ color: '#0A1628', fontSize: 18, margin: '8px 0 6px' }}>Warranty-Safe Celina Contractors</h3>
          <p style={{ color: '#1a2f50', fontSize: 13, margin: '0 0 14px' }}>ProLnk only sends contractors who understand new-build warranties and HOA requirements.</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Get Warranty-Safe Quotes →</button>
        </div>
      </div>
    </div>
  );
}
