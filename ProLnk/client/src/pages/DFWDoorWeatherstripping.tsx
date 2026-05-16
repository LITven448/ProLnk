import { useState } from 'react';

const weatherstrippingTypes = [
  { type: 'Compression Bulb', emoji: '🔵', material: 'EPDM rubber', lifespan: '2-3 yrs DFW', cost: '$8-18/door', best: 'Front/back entry doors with regular use' },
  { type: 'V-Strip (Tension Seal)', emoji: '📐', material: 'Metal or vinyl', lifespan: '3-4 yrs DFW', cost: '$5-12/door', best: 'Door sides and top — DFW temp cycling' },
  { type: 'Door Sweep', emoji: '🔲', material: 'Rubber/brush', lifespan: '2-3 yrs DFW', cost: '$10-25/door', best: 'Bottom gap — DFW slab shifting causes gaps' },
  { type: 'Foam Tape', emoji: '🟡', material: 'Closed-cell foam', lifespan: '1-2 yrs DFW', cost: '$3-8/door', best: 'Temporary or low-traffic doors' },
];

const locations = ['Front Entry Door', 'Back Door / Patio', 'Garage Entry Door', 'Side Door', 'Storm Door'];
const issues = ['Visible gap around door', 'Drafts felt in summer/winter', 'Insects getting inside', 'High energy bills', 'Door sticks or rubs'];

export default function DFWDoorWeatherstripping() {
  const [location, setLocation] = useState('');
  const [issue, setIssue] = useState('');
  const [rec, setRec] = useState(null);

  const getRecommendation = () => {
    if (!location || !issue) return;
    const isEntry = location.includes('Front') || location.includes('Back');
    const isBottom = issue.includes('Insects') || issue.includes('gap');
    if (isBottom) {
      setRec({ ...weatherstrippingTypes[2], replaceFreq: 'Every 2 years in DFW', install: 'Remove door, attach sweep to bottom, rehang' });
    } else if (isEntry) {
      setRec({ ...weatherstrippingTypes[0], replaceFreq: 'Every 2-3 years — DFW heat degrades rubber', install: 'Press into door stop groove, cut to length' });
    } else {
      setRec({ ...weatherstrippingTypes[1], replaceFreq: 'Every 3-4 years in DFW', install: 'Peel and stick into door frame channel' });
    }
  };

  const reset = () => { setLocation(''); setIssue(''); setRec(null); };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🚪</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Door Weatherstripping Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16 }}>DFW temperature swings from 20°F to 110°F constantly expand and contract door frames — weatherstripping wears 2x faster than northern climates.</p>
        </div>

        <div style={{ background: '#1E293B', borderRadius: 16, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>DFW-Specific Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[['🌡️', 'Replacement Frequency', 'Every 2-3 years in DFW vs. 5 years in northern states'], ['🏠', 'Slab Movement', 'DFW clay soil shifts foundations — bottom gaps appear seasonally'], ['💸', 'Energy Loss', 'A 1/8-inch gap under your door equals a 2.4-inch hole in your wall'], ['🦟', 'Pest Entry', 'DFW insects exploit even tiny gaps — sweep quality matters']].map(([icon, label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{label}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1E293B', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🎯 Find Your Solution</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Door Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, padding: '10px 12px', color: '#E2E8F0', fontSize: 14 }}>
                <option value=''>Select door location</option>
                {locations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Current Issue</label>
              <select value={issue} onChange={e => setIssue(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, padding: '10px 12px', color: '#E2E8F0', fontSize: 14 }}>
                <option value=''>Select issue</option>
                {issues.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Get Recommendation</button>
            <button onClick={reset} style={{ background: 'transparent', color: '#94A3B8', border: '1px solid #334155', borderRadius: 8, padding: '12px 20px', cursor: 'pointer', fontSize: 15 }}>Reset</button>
          </div>
          {rec && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 12 }}>{rec.emoji} Recommended: {rec.type}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 12 }}>
                {[['Material', rec.material], ['DFW Lifespan', rec.lifespan], ['Cost', rec.cost], ['Replace Frequency', rec.replaceFreq]].map(([k, v]) => (
                  <div key={k} style={{ background: '#1E293B', borderRadius: 8, padding: 12 }}>
                    <div style={{ color: '#64748B', fontSize: 12 }}>{k}</div>
                    <div style={{ color: '#E2E8F0', fontWeight: 600, fontSize: 13, marginTop: 4 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>🔧 Install: {rec.install}</div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16 }}>
          {weatherstrippingTypes.map(w => (
            <div key={w.type} style={{ background: '#1E293B', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{w.emoji}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{w.type}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 4 }}>{w.material} — {w.lifespan}</div>
              <div style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 600 }}>{w.cost}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
