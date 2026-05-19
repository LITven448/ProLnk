import { useState } from 'react';

const stakeholders = [
  { id: 'investor', label: '💼 Investor', metrics: ['5,440+ indexed DFW content pages live', 'Waitlist approaching 500 Charter pros (closes at 500)', '47 AI agents operational — 80% platform automation', 'TiDB Cloud DB: 130+ tables, production-ready schema', 'Render deployment live: prolnk-v2.onrender.com', 'Seed round narrative: demand validated, data moat growing'] },
  { id: 'pro', label: '🔧 Charter Pro Applicant', metrics: ['Charter tier: $149/mo, locked for life', '25 Charter slots reserved — waitlist is real, closes at 500 apps', 'First match queue goes live at full platform launch', '5,440+ homeowner content pages = organic lead funnel', '47 AI agents handle dispatch, matching, and comms', 'ProLnk covers DFW first, Houston next'] },
  { id: 'homeowner', label: '🏠 Homeowner', metrics: ['Platform live at prolnk-v2.onrender.com', '5,440+ DFW-specific home service guides published', 'Charter pros vetted before launch — no fly-by-night', 'Match delivered within 4 hours of request (at launch)', 'Home Health Vault captures job history for your home', 'No fees to homeowners — pros pay per match'] },
  { id: 'team', label: '👥 Team / Engineer', metrics: ['React 19 + TypeScript + tRPC monorepo', 'TiDB Cloud MySQL-compatible — 130+ table schema', '47 AI agents (Claude API) — most operational', 'Render deployment — env vars set, live', '438 TS errors outstanding — non-blocking for waitlist', '9 unrouted backend routers, 26 unrouted pages remaining'] },
];

export default function DFWProLnkMayNumbers2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = stakeholders.find(s => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '6px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>
          📊 PROLNK MAY 2026 NUMBERS
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>ProLnk DFW Platform — May 2026 Metrics</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          Key numbers for the ProLnk DFW platform as of May 2026. Select your stakeholder type to see what matters most to you.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            { val: '5,440+', label: 'DFW content pages' },
            { val: '500', label: 'Charter pro limit' },
            { val: '47', label: 'AI agents running' },
            { val: '130+', label: 'Database tables' },
          ].map(m => (
            <div key={m.val} style={{ background: '#112240', borderRadius: 10, padding: 18, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642′ }}>{m.val}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{m.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Select your stakeholder view:</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {stakeholders.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{
                background: selected === s.id ? '#F5E642′ : '#112240',
                color: selected === s.id ? '#0A1628′ : '#fff',
                border: 'none', borderRadius: 8, padding: '14px 18px',
                textAlign: 'left', cursor: 'pointer', fontSize: 15, fontWeight: 600,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {match && (
          <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 24, borderLeft: '4px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: 12 }}>Key May 2026 Numbers for You</h3>
            <ul style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 2.2, paddingLeft: 20 }}>
              {match.metrics.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 16, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>🚀 ProLnk DFW — Building the home services network of 2026</p>
          <p style={{ color: '#0A1628', fontSize: 13, marginTop: 4 }}>prolnk-v2.onrender.com — Platform live now</p>
        </div>
      </div>
    </div>
  );
}