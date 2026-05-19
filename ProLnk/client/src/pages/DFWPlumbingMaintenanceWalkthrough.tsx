import { useState } from 'react';

const standardChecks = [
  { item: 'All shut-off valves', detail: 'Main, individual supply stops — verify they turn and don\’t leak under operation' },
  { item: 'Water pressure test', detail: 'DFW target 60–80 PSI; high pressure (>80) damages appliances and joints over time' },
  { item: 'Water heater', detail: 'Anode rod condition, sediment flush, T&P valve test, sacrificial metal check' },
  { item: 'Drain line flow', detail: 'Camera or dye test on older drains to find root intrusion, scale buildup, or belly' },
  { item: 'Under-sink connections', detail: 'Hot and cold supply braided hoses (replace if over 7 years), P-trap condition' },
  { item: 'Hose bibs', detail: 'Outside faucets — check for drip, backflow preventer presence, vacuum breaker' },
  { item: 'Toilet internals', detail: 'Flapper, fill valve, shut-off, wax ring — running toilets waste 200+ gallons per day' },
];

const dfwSpecific = [
  { item: '🏗️ Slab access points', detail: 'DFW homes are slab-on-grade — ask inspector to note access clean-outs and last known slab leak history' },
  { item: '💧 Water softener', detail: 'DFW water is hard (300–500 ppm TDS). Check softener salt bridge, resin condition, and bypass valve' },
  { item: '🪨 Hard water scale', detail: 'Inspect aerators, showerheads, and appliance inlets for calcium buildup — reduces flow and appliance life' },
  { item: '🌡️ Expansion tank', detail: 'Required by DFW code when pressure-reducing valve is present — check if sized correctly for water heater' },
];

export default function DFWPlumbingMaintenanceWalkthrough() {
  const [homeAge, setHomeAge] = useState(15);
  const [issues, setIssues] = useState({ slowDrain: false, waterStain: false, highBill: false, lowPressure: false });
  const [showResult, setShowResult] = useState(false);

  const toggle = (key: keyof typeof issues) => setIssues(prev => ({ ...prev, [key]: !prev[key] }));

  const issueCount = Object.values(issues).filter(Boolean).length;
  const urgency = issueCount >= 2 ? '🔴 Multiple symptoms — schedule within 2 weeks' : issueCount === 1 ? '🟡 One symptom — schedule within 30 days' : homeAge >= 20 ? '🟡 Older home — schedule this quarter' : '🟢 Preventive — schedule annually';
  const focus = [
    issues.slowDrain && 'Camera drain inspection — root intrusion likely in DFW clay soil',
    issues.waterStain && 'Pinhole leak detection — especially around slab penetrations',
    issues.highBill && 'Running toilet check + meter test for hidden slab leak',
    issues.lowPressure && 'PRV (pressure reducing valve) check + scale buildup at fixtures',
    homeAge >= 30 && 'Galvanized pipe assessment — may need repiping if original',
  ].filter(Boolean);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Plumbing Maintenance Walkthrough</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.7 }}>
          DFW clay soil shifts constantly — slab plumbing leaks are common. Hard water destroys fixtures early. Here's what a real plumbing inspection covers.
        </p>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>🔧 Standard Inspection Checklist</h2>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {standardChecks.map((c, i) => (
              <div key={i} style={{ background: '#1e293b', borderRadius: 8, padding: '0.9rem 1.1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', minWidth: 160, fontSize: '0.85rem' }}>{c.item}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>{c.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>🌵 DFW-Specific Items</h2>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {dfwSpecific.map((c, i) => (
              <div key={i} style={{ background: '#F5E64210', border: '1px solid #F5E64230', borderRadius: 8, padding: '0.9rem 1.1rem' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: '0.9rem', marginBottom: '0.3rem' }}>{c.item}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>{c.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>🧮 Your Plumbing Inspection Plan</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Home age (years)</label>
            <input type="number" min={1} max={80} value={homeAge} onChange={e => setHomeAge(+e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: '1rem' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Known issues (check all that apply)</div>
            {[['slowDrain', '🚿 Slow drains in multiple fixtures'], ['waterStain', '💧 Water stains on walls or ceiling'], ['highBill', '💸 Unexplained high water bill'], ['lowPressure', '📉 Low water pressure at fixtures']].map(([key, label]) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={issues[key as keyof typeof issues]} onChange={() => toggle(key as keyof typeof issues)} style={{ width: 18, height: 18 }} />
                {label}
              </label>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', cursor: 'pointer', fontSize: '0.95rem' }}>Build My Checklist →</button>
          {showResult && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642' }}>
              <div style={{ marginBottom: '0.5rem' }}><strong>Schedule:</strong> {urgency}</div>
              {focus.length > 0 && <div style={{ marginBottom: '0.25rem' }}><strong>Priority focus areas:</strong></div>}
              {focus.map((f, i) => <div key={i} style={{ color: '#cbd5e1', fontSize: '0.85rem', paddingLeft: '1rem', marginBottom: '0.3rem' }}>→ {f}</div>)}
              <div style={{ marginTop: '0.5rem' }}><strong>DFW market cost:</strong> $150–$350 standard inspection; $400–$800 with camera drain inspection</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
