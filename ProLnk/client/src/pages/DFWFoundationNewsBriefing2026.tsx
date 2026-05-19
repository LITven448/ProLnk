import { useState } from 'react';

export default function DFWFoundationNewsBriefing2026() {
  const [location, setLocation] = useState('');
  const [concern, setConcern] = useState('');

  const stories = [
    { emoji: '🧱', title: 'Clay Soil PI Readings Trending Higher North DFW', body: 'Plasticity index readings across Collin, Denton, and north Dallas counties are running above 2024 baselines — indicating more expansive soil conditions entering summer 2026.', relevance: 'settlement' },
    { emoji: '📞', title: 'Foundation Repair Companies Report 30% More Calls vs 2025', body: 'Demand surge across DFW metro: repair firms are booking 3–5 weeks out in many areas. ProLnk Charter foundation pros maintain priority scheduling windows for platform users.', relevance: 'repair' },
    { emoji: '🌵', title: 'Drier-Than-Normal Spring = More Settlement Cases', body: 'Below-average rainfall March–May 2026 has accelerated soil shrinkage under slabs. Homeowners should inspect perimeter for gaps and watch for sticking doors.', relevance: 'settlement' },
    { emoji: '📊', title: 'Insurance Carriers Increasing Scrutiny of Foundation Claims', body: 'Several major Texas home insurers added pre-claim inspection requirements in Q1 2026. Documentation from a licensed engineer is increasingly required before claim approval.', relevance: 'insurance' },
    { emoji: '🔍', title: 'ProLnk Charter Foundation Pros Available Now', body: 'Get matched with a verified, licensed foundation specialist before summer wait times peak. Charter pros on ProLnk are pre-screened with active TDLR credentials.', relevance: 'all' },
  ];

  const filtered = concern
    ? stories.filter(s => s.relevance === concern || s.relevance === 'all')
    : stories;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW Foundation News Briefing
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>May 2026 — What's happening in the DFW foundation space</p>
        </div>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 14 }}>🎯 Filter by Your Situation</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[['all', 'All News', ''], ['settlement', 'Settlement / Sinking', 'settlement'], ['repair', 'Need Repair', 'repair'], ['insurance', 'Insurance Claim', 'insurance']].map(([, label, val]) => (
              <button key={val} onClick={() => setConcern(val)}
                style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  backgroundColor: concern === val ? '#F5E642′ : '#1a2d50', color: concern === val ? '#0A1628' : '#94a3b8' }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <input placeholder='Your city or zip (e.g. Frisco, 75034)' value={location}
            onChange={e => setLocation(e.target.value)}
            style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid #1e3a5f', backgroundColor: '#111d35', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filtered.map((s, i) => (
            <div key={i} style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 28 }}>{s.emoji}</span>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{s.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, backgroundColor: '#1a2d50', borderRadius: 12, padding: 24, textAlign: 'center', border: '2px solid #F5E642′ }}>
          <div style={{ fontSize: 32 }}>🛡️</div>
          <p style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Get Matched with a Charter Foundation Pro</p>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>
            ProLnk Charter foundation specialists are vetted, licensed, and available before the summer rush.
          </p>
          <a href='https://prolnk.io' style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>
            Join ProLnk Waitlist →
          </a>
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 20 }}>
          DFW Foundation News · May 2026 · ProLnk — Verified Pros, Documented Work
        </p>
      </div>
    </div>
  );
}