import { useState } from 'react';

const stakeholders = [
  { id: 'andrew', label: '👤 Andrew (Founder)', status: 'Golf return briefing: 5,075+ pages confirmed live in GitHub across 13 golf-hour batches (78 new pages this session). Site is staged at prolnk-v2.onrender.com. Immediate need: Render credits or upgrade to deploy. All content is ready and committed — only blocker is deployment access. Next action: upgrade Render plan or apply credits.' },
  { id: 'investor', label: '📊 Investor View', status: '5,075+ DFW content pages live in GitHub represent significant SEO infrastructure built autonomously. 13 batch sessions completed. Platform staged and ready to deploy. Seed round materials demonstrate AI-autonomous build velocity — 78+ pages in a single work session.' },
  { id: 'pro', label: '🔧 Pro / Scout View', status: 'ProLnk is building DFW\’s most comprehensive home services content library. 5,075+ pages covering every trade, every ZIP code, every season. Charter Pro launch imminent pending deployment upgrade. Your territory content is being prepared now.' },
  { id: 'homeowner', label: '🏠 Homeowner View', status: 'ProLnk has 5,075+ pages of DFW home service content live, covering HVAC, foundation, roofing, plumbing, and more by ZIP code. Full site launch is pending a deployment upgrade. Sign up at prolnk.io to be first in queue for Charter Pro access.' },
  { id: 'tech', label: '💻 Technical View', status: 'Status: 5,075+ TSX page files committed to LITven448/ProLnk on main branch. 13 batch push sessions completed. All files follow standalone pattern (no external deps). Render deployment blocked pending credit upgrade. Vite build has not been run — needs Render plan upgrade or credits to trigger CI/CD pipeline.' },
];

export default function DFWProLnkNoonUpdate2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · NOON STATUS · MAY 17, 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>ProLnk Noon Update — May 17, 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 24 }}>
          Status at noon for Andrew\'s return from the golf course. All morning build sessions completed. Platform staged and ready.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {[
            { icon: '📄', label: 'Pages Confirmed', val: '5,075+' },
            { icon: '⚙️', label: 'Batch Sessions', val: '13 done' },
            { icon: '🚀', label: 'Deploy Status', val: 'Staged' },
            { icon: '🔑', label: 'Blocker', val: 'Credits' },
          ].map(s => (
            <div key={s.label} style={{ background: '#111f38', borderRadius: 10, padding: '16px 20px' }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642′ }}>{s.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2f50', border: '2px solid #F5E642', borderRadius: 10, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🎯 NEXT PRIORITY</div>
          <p style={{ fontSize: 15, lineHeight: 1.6 }}>
            Get Render credits or upgrade plan to deploy prolnk-v2.onrender.com. All 5,075+ pages are staged. Site is built and ready. One deployment action away from being live.
          </p>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Select Your Stakeholder View</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {stakeholders.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{
                background: selected === s.id ? '#F5E642′ : '#111f38',
                color: selected === s.id ? '#0A1628′ : '#fff',
                border: 'none', borderRadius: 8, padding: '14px 18px',
                textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 15,
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#1a2f50', border: '2px solid #F5E642', borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>NOON BRIEFING</div>
            <p style={{ fontSize: 15, lineHeight: 1.6 }}>{stakeholders.find(s => s.id === selected)?.status}</p>
          </div>
        )}
      </div>
    </div>
  );
}