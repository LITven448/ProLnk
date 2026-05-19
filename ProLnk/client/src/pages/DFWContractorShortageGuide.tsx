import { useState } from 'react';

const trades = [
  { name: 'HVAC', waitTime: { low: '2-4 weeks', medium: '4-8 weeks', high: '8-14 weeks' }, tip: 'Book tune-ups in November for spring readiness.' },
  { name: 'Electrician', waitTime: { low: '1-2 weeks', medium: '2-5 weeks', high: '5-10 weeks' }, tip: 'Panel upgrades book fastest in summer — schedule in winter.' },
  { name: 'Plumber', waitTime: { low: '3-7 days', medium: '1-3 weeks', high: '3-6 weeks' }, tip: 'Emergency slots exist but cost 40-80% premium.' },
  { name: 'Roofer', waitTime: { low: '2-4 weeks', medium: '4-10 weeks', high: '10-20 weeks' }, tip: 'Post-storm demand spikes 300%. Inspect proactively each March.' },
  { name: 'General Contractor', waitTime: { low: '4-6 weeks', medium: '6-14 weeks', high: '14-24 weeks' }, tip: 'GCs book projects 3-6 months out in DFW. Plan accordingly.' },
];

export default function DFWContractorShortageGuide() {
  const [selectedTrade, setSelectedTrade] = useState('');
  const [urgency, setUrgency] = useState('');
  const [result, setResult] = useState<null | { wait: string; priority: string; interim: string }>(null);

  function calculate() {
    if (!selectedTrade || !urgency) return;
    const trade = trades.find(t => t.name === selectedTrade);
    if (!trade) return;
    const wait = trade.waitTime[urgency as keyof typeof trade.waitTime];
    const priority = urgency === 'high'
      ? 'Call 5+ contractors same day. Offer to pay deposit upfront. Ask for cancellation slots.'
      : 'Use ProLnk to match instantly. Book 2-3 quotes simultaneously to secure fastest slot.';
    const interim = urgency === 'high'
      ? 'Use temporary fixes if safe. Document damage for insurance. Run fans to prevent moisture buildup.'
      : 'Monitor the issue weekly. Take photos to track progression. Avoid DIY that voids warranties.';
    setResult({ wait, priority, interim });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW HOME SERVICES</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16, lineHeight: 1.2 }}>DFW Contractor Shortage Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 17, marginBottom: 40, lineHeight: 1.7 }}>
          DFW added 130,000 residents in 2025 alone — but the skilled trades workforce grew only 12%. The result: wait times that can derail renovation plans and leave critical systems unrepaired. Here's what’s driving the gap and how to navigate it.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            { icon: '🏗️', label: 'Population Growth', value: '+130K residents/yr', sub: 'Outpacing trade training pipelines' },
            { icon: '👷', label: 'Workforce Gap', value: '18,000 unfilled roles', sub: 'Across DFW metro trade sectors' },
            { icon: '⏱️', label: 'Avg Wait (HVAC)', value: '6-8 weeks', sub: 'Peak season May–September' },
            { icon: '📈', label: 'Labor Cost Increase', value: '+34% since 2021', sub: 'Driven by competition for workers' },
          ].map(card => (
            <div key={card.label} style={{ backgroundColor: '#111f3a', borderRadius: 12, padding: '20px 18px', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{card.value}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{card.label}</div>
              <div style={{ color: '#64748b', fontSize: 13 }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 16, padding: '32px 28px', marginBottom: 40, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>📊 Seasonal Planning Guide</h2>
          <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 20 }}>DFW contractor availability follows predictable seasonal cycles. Book off-season to avoid peak wait times.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
            {[
              { season: '❄️ Winter', best: 'Best for: HVAC, Roofing', avoid: 'Avoid booking: Spring demand spike' },
              { season: '🌸 Spring', best: 'Best for: Landscaping, Painting', avoid: 'Avoid booking: HVAC, Roofing' },
              { season: '☀️ Summer', best: 'Best for: Plumbing, Electrical', avoid: 'Avoid booking: AC service (overbooked)' },
              { season: '🍂 Fall', best: 'Best for: Roofing, Windows', avoid: 'Avoid booking: Holiday gaps in Dec' },
            ].map(s => (
              <div key={s.season} style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '14px 12px' }}>
                <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 15 }}>{s.season}</div>
                <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 4 }}>{s.best}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>{s.avoid}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#111f3a', borderRadius: 16, padding: '32px 28px', border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🔧 Wait Time Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Trade Type</label>
              <select value={selectedTrade} onChange={e => setSelectedTrade(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0d1b30', border: '1px solid #1e3a5f', borderRadius: 8, padding: '12px 14px', color: '#fff', fontSize: 15 }}>
                <option value=''>Select trade...</option>
                {trades.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>Project Urgency</label>
              <select value={urgency} onChange={e => setUrgency(e.target.value)}
                style={{ width: '100%', backgroundColor: '#0d1b30', border: '1px solid #1e3a5f', borderRadius: 8, padding: '12px 14px', color: '#fff', fontSize: 15 }}>
                <option value=''>Select urgency...</option>
                <option value='low'>Low — Planning ahead (3+ months)</option>
                <option value='medium'>Medium — Need within 4-8 weeks</option>
                <option value='high'>High — Urgent, within 2 weeks</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer', marginBottom: 24 }}>
            Calculate Wait Time
          </button>
          {result && (
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '18px 16px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>⏱️ Realistic Wait Time</div>
                <div style={{ fontSize: 20, fontWeight: 800 }}>{result.wait}</div>
              </div>
              <div style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '18px 16px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🚀 How to Get Priority</div>
                <div style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.6 }}>{result.priority}</div>
              </div>
              <div style={{ backgroundColor: '#0d1b30', borderRadius: 10, padding: '18px 16px' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🛡️ While You Wait</div>
                <div style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.6 }}>{result.interim}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
