import { useState } from 'react';

const causes: Record<string, Record<string, { cause: string; solutions: { label: string; cost: string }[] }>> = {
  hot: {
    small: { cause: 'Likely duct leakage or undersized supply register near exterior walls', solutions: [{ label: 'Seal duct leaks (DIY mastic)', cost: '$50–$150' }, { label: 'Add booster fan to supply', cost: '$80–$200' }, { label: 'Mini-split supplemental', cost: '$1,800–$3,500' }] },
    large: { cause: 'Common in DFW large homes — single-zone system can\’t serve all areas equally; west-facing rooms worst', solutions: [{ label: 'Add zoning board + dampers', cost: '$1,500–$3,000' }, { label: 'Mini-split for hot zone', cost: '$2,000–$4,500' }, { label: 'ERV for fresh air balance', cost: '$1,200–$2,500' }] },
  },
  cold: {
    small: { cause: 'Oversized supply or damper too open; cold air dumping near return', solutions: [{ label: 'Partially close supply damper', cost: 'DIY free' }, { label: 'Rebalance duct system', cost: '$300–$600' }, { label: 'Install zone damper control', cost: '$800–$1,500' }] },
    large: { cause: 'Return air starved in other zones causing overcooling in room nearest return', solutions: [{ label: 'Add return air grilles', cost: '$200–$500 each' }, { label: 'Zoning control board', cost: '$1,500–$3,000' }, { label: 'Dual-zone system upgrade', cost: '$4,000–$8,000' }] },
  },
};

export default function DFWHVACBalancingGuide() {
  const [problem, setProblem] = useState('hot');
  const [homeSize, setHomeSize] = useState('large');

  const result = causes[problem]?.[homeSize];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>HVAC Balancing in DFW Homes</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          Hot or cold rooms are the #1 HVAC complaint in DFW — especially in homes over 2,500 sq ft with a single-system setup. DFW's extreme summer heat magnifies any balancing flaw.
        </p>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🌡️ Why DFW Makes This Worse</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: 12 }}>
            In mild climates, a slightly unbalanced system is tolerable. In DFW summers hitting 105°F, a room with a 3°F temperature variance becomes an 80°F room when setpoint is 75°F. West-facing master bedrooms and upstairs bonus rooms are the most common problem zones.
          </p>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>
            Single-zone central systems cool from one thermostat location — usually a central hallway — and have no feedback from the rooms farthest from the air handler. This creates natural hot and cold pockets.
          </p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🏠 Diagnose Your Situation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94A3B8' }}>Problem Room Is</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {['hot', 'cold'].map(opt => (
                  <button key={opt} onClick={() => setProblem(opt)}
                    style={{ flex: 1, padding: '12px', borderRadius: 10, border: `2px solid ${problem === opt ? '#F5E642' : '#1E3A5F'}`, background: problem === opt ? '#F5E642' : 'transparent', color: problem === opt ? '#0A1628' : '#E8EAF0', fontWeight: 700, cursor: 'pointer', textTransform: 'capitalize', fontSize: 15 }}>
                    {opt === 'hot' ? '🔥 Too Hot' : '🧊 Too Cold'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94A3B8' }}>Home Size</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {[['small', 'Under 2,500 sq ft'], ['large', 'Over 2,500 sq ft']].map(([val, label]) => (
                  <button key={val} onClick={() => setHomeSize(val)}
                    style={{ flex: 1, padding: '12px', borderRadius: 10, border: `2px solid ${homeSize === val ? '#F5E642' : '#1E3A5F'}`, background: homeSize === val ? '#F5E642' : 'transparent', color: homeSize === val ? '#0A1628' : '#E8EAF0', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 6 }}>Likely Cause</div>
              <div style={{ color: '#E8EAF0', fontWeight: 600, marginBottom: 20, lineHeight: 1.6 }}>{result.cause}</div>
              <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 12 }}>Recommended Solutions</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {result.solutions.map((s, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111D35', borderRadius: 10, padding: '12px 16px' }}>
                    <span style={{ fontSize: 15 }}>{s.label}</span>
                    <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', marginLeft: 12 }}>{s.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111D35', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>⚙️ Long-Term Solutions</h2>
          <ul style={{ color: '#94A3B8', lineHeight: 1.9, paddingLeft: 20 }}>
            <li><strong style={{ color: '#E8EAF0' }}>Zoning boards</strong> — motorized dampers controlled by room sensors; most effective fix</li>
            <li><strong style={{ color: '#E8EAF0' }}>Mini-splits</strong> — independent cooling for problem rooms, highest upfront cost, best result</li>
            <li><strong style={{ color: '#E8EAF0' }}>ERV/HRV units</strong> — improve whole-home air circulation, helps balance temps</li>
            <li><strong style={{ color: '#E8EAF0' }}>Duct sealing</strong> — often recovers 20–30% of lost capacity before adding equipment</li>
          </ul>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 14, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#0A1628', marginBottom: 6 }}>Get a Balancing Assessment</div>
          <div style={{ fontSize: 14, color: '#1E3A5F' }}>A DFW HVAC tech can run airflow measurements and recommend the right fix for your specific layout.</div>
        </div>
      </div>
    </div>
  );
}
