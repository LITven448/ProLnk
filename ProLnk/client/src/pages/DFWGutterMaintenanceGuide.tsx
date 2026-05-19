import { useState } from 'react';

const homeSize = ['Under 1,500 sq ft', '1,500–2,500 sq ft', '2,500–4,000 sq ft', '4,000+ sq ft'];
const treeCoverage = ['Minimal — few or no trees', 'Moderate — some trees within 30 ft', 'Heavy — multiple live oaks or elms overhead'];
const gutterType = ['Standard 5″ K-Style Aluminum', 'Larger 6″ K-Style', 'Half-Round Aluminum', 'Copper', 'Vinyl'];

export default function DFWGutterMaintenanceGuide() {
  const [size, setSize] = useState('');
  const [trees, setTrees] = useState('');
  const [gutter, setGutter] = useState('');
  const [result, setResult] = useState<null | { frequency: string; cost: string; guards: string }>(null);

  function calculate() {
    const isHeavyTree = trees.includes('Heavy');
    const isModTree = trees.includes('Moderate');
    const isLarge = size.includes('4,000') || size.includes('2,500');
    const isCopper = gutter.includes('Copper');

    const cleaningsPerYear = isHeavyTree ? 4 : isModTree ? 3 : 2;
    const dfwNote = 'DFW live oaks drop pollen Feb–April + seeds May–June — schedule cleaning after each drop.';
    const frequency = `${cleaningsPerYear}x per year recommended. ${dfwNote} Also clean within 2 weeks after any major storm.`;

    const perCleaning = isLarge ? 280 : 180;
    const annual = perCleaning * cleaningsPerYear;
    const cost = `$${perCleaning}–$${Math.round(perCleaning * 1.3)} per cleaning. Annual total: $${annual}–$${Math.round(annual * 1.3)}.`;

    const guardsROI = isHeavyTree
      ? '✅ Guards recommended — heavy oak coverage means 4+ cleanings/year; guards pay back in 2–3 years. Choose micro-mesh for DFW seed/pollen size.'
      : isModTree
        ? '🟡 Guards optional — moderate coverage at 3 cleanings/year; evaluate based on budget. Micro-mesh handles DFW oak seeds.'
        : '🔴 Guards likely not worth it — 2 cleanings/year at low tree density; guard cost takes 5+ years to recover.';

    setResult({ frequency, cost, guards: guardsROI });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>
          🏡 DFW HOME HEALTH VAULT
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Gutter Maintenance Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32 }}>
          DFW live oaks drop pollen and seeds constantly. Combined with flash storms, clogged gutters destroy DFW foundations fast.
        </p>

        <div style={{ display: 'grid', gap: 20, marginBottom: 36 }}>
          {[
            { icon: '🌳', title: 'Live Oaks Drop Year-Round in DFW', body: 'DFW live oaks and elms drop pollen Feb–April, acorns and seeds May–June, and old leaves in spring (they\’re semi-evergreen). Homeowners with live oaks overhead need gutters cleaned 3–4 times per year minimum, not the 2x national standard.' },
            { icon: '⛈️', title: 'Storm Season Deposits and Debris', body: 'DFW averages 50+ inches of rain per year with heavy spring concentration. Flash storms dump leaves, twigs, and debris into gutters in hours. Inspect gutters within a week after any storm exceeding 2 inches. Clogged gutters during heavy rain overflow against foundation.' },
            { icon: '📐', title: 'Proper Gutter Slope for Flash Rains', body: 'DFW rain often comes at 2–3 inches/hour in severe events. Gutters must slope 1/4″ per 10 feet toward downspouts. Flat or low-slope gutters overflow before water drains. Check slope annually — DFW clay soil movement shifts fascia boards over time.' },
            { icon: '💧', title: 'Downspout Extensions Protect Foundations', body: 'The #1 gutter-related mistake in DFW: downspouts terminating within 3 feet of foundation. DFW clay soil absorbs and holds water against foundation. Extend downspouts 6–10 feet minimum, or add underground drain pipes. This single change prevents most DFW foundation movement.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#111F3A', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{card.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111F3A', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Gutter Cleaning Calculator</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Home Size', state: size, set: setSize, opts: homeSize },
              { label: 'Tree Coverage Near Roofline', state: trees, set: setTrees, opts: treeCoverage },
              { label: 'Gutter Type', state: gutter, set: setGutter, opts: gutterType },
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>{f.label}</label>
                <select value={f.state} onChange={e => f.set(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15 }}>
                  <option value="">Select...</option>
                  {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', width: '100%' }}>
            Get Cleaning Schedule + Guard Analysis
          </button>
          {result && (
            <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
              {[
                { label: '📅 Cleaning Frequency', value: result.frequency },
                { label: '💰 Cost Estimate', value: result.cost },
                { label: '🛡️ Gutter Guards Worth It?', value: result.guards },
              ].map(r => (
                <div key={r.label} style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16 }}>
                  <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{r.label}</div>
                  <div style={{ fontSize: 14, color: '#E2E8F0′ }}>{r.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
