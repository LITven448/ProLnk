import { useState } from 'react';

const PLATFORMS = [
  { name: 'Google Search', emoji: '🔍', pro: 'Widest reach, free, fast', con: 'No vetting — unlicensed contractors rank equally', best: 'Research & price checks only' },
  { name: 'Angi (Angie’s List)', emoji: '🏷️', pro: 'Large contractor network, background checks', con: 'Pay-to-play rankings, spam calls common', best: 'Non-urgent jobs with time to compare' },
  { name: 'Thumbtack', emoji: '📌', pro: 'Fast quotes, wide trade coverage', con: 'Contractor quality varies widely in DFW', best: 'Simple, lower-risk jobs' },
  { name: 'Nextdoor', emoji: '🏘️', pro: 'Real neighbor recommendations', con: 'Anecdotal, no license verification', best: 'Handyman, landscaping, low-stakes tasks' },
  { name: 'HomeAdvisor', emoji: '🏡', pro: 'Instant match to multiple contractors', con: 'Heavy upsell, contractor lead fees passed to you', best: 'Speed over price or quality' },
  { name: 'ProLnk', emoji: '🔗', pro: 'Pre-vetted DFW pros, fair pricing, job documentation', con: 'Newer platform — smaller contractor pool in 2026', best: 'Any job requiring trust, documentation, or fair pricing' },
];

const SCENARIOS: Record<string, string> = {
  emergency_high: 'ProLnk — vetted pros on-call, or call your saved pro directly from your network',
  emergency_low: 'Nextdoor — fast neighbor recs for minor tasks; Google for after-hours availability',
  planned_high: 'ProLnk — documentation + fair pricing + warranty tracking for major jobs',
  planned_low: 'Thumbtack or Angi — multiple quotes for routine, lower-stakes services',
};

export default function DFWHomeServicePlatformGuide() {
  const [need, setNeed] = useState('');
  const [urgency, setUrgency] = useState('');
  const [rec, setRec] = useState('');

  function calcRec() {
    if (!need || !urgency) return;
    const key = `${need}_${urgency}`;
    setRec(SCENARIOS[key] || 'ProLnk for vetted quality; Thumbtack for speed.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW PLATFORM GUIDE 2026</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, margin: '0 0 14px' }}>Every Way to Find a Contractor in DFW — <span style={{ color: '#F5E642′ }}>Compared</span></h1>
        <p style={{ color: '#8FA3BF', fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>DFW homeowners have more platform options than ever in 2026. Here's an honest breakdown of each — what they do well, where they fall short, and when to use them.</p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 36 }}>
          {PLATFORMS.map(p => (
            <div key={p.name} style={{ background: '#111E35', borderRadius: 14, padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 26 }}>{p.emoji}</span>
                <span style={{ fontWeight: 700, fontSize: 18 }}>{p.name}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 10 }}>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, borderLeft: '3px solid #22C55E' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#22C55E', marginBottom: 4 }}>PRO</div>
                  <div style={{ fontSize: 13, color: '#C5D5E8′ }}>{p.pro}</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, borderLeft: '3px solid #EF4444′ }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#EF4444', marginBottom: 4 }}>CON</div>
                  <div style={{ fontSize: 13, color: '#C5D5E8′ }}>{p.con}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600 }}>Best for: {p.best}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 20 }}>🎯 Which Platform is Right for Your Situation?</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ fontSize: 13, color: '#8FA3BF', display: 'block', marginBottom: 6 }}>Service type</label>
              <select value={need} onChange={e => setNeed(e.target.value)} style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', padding: '10px 14px', fontSize: 14, width: '100%' }}>
                <option value="">Select...</option>
                <option value="emergency">Emergency / urgent repair</option>
                <option value="planned">Planned / scheduled job</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ fontSize: 13, color: '#8FA3BF', display: 'block', marginBottom: 6 }}>DFW urgency level</label>
              <select value={urgency} onChange={e => setUrgency(e.target.value)} style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EDF5', padding: '10px 14px', fontSize: 14, width: '100%' }}>
                <option value="">Select...</option>
                <option value="high">High — significant risk or cost</option>
                <option value="low">Low — routine or minor task</option>
              </select>
            </div>
          </div>
          <button onClick={calcRec} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', width: '100%', marginBottom: 16 }}>Get My Platform Recommendation</button>
          {rec && <div style={{ padding: 18, background: '#0A1628', borderRadius: 10, borderLeft: '4px solid #F5E642', fontSize: 15, color: '#E8EDF5′ }}>📌 {rec}</div>}
        </div>
      </div>
    </div>
  );
}
