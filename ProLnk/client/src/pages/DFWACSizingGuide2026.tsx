import { useState } from 'react';

export default function DFWACSizingGuide2026() {
  const [sqft, setSqft] = useState(2000);
  const [insulation, setInsulation] = useState('average');

  const getTons = () => {
    const base = insulation === 'poor' ? 400 : insulation === 'average' ? 500 : 600;
    const raw = sqft / base;
    const options = [1.5, 2, 2.5, 3, 3.5, 4, 5];
    return options.find(t => t >= raw) || 5;
  };

  const tons = getTons();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 14, marginBottom: 8 }}>❄️ ProLnk DFW AC Guide 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>DFW AC Sizing Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>How to properly size an AC system for the DFW climate — Manual J required for accuracy.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '📐', title: 'Manual J Calculation', desc: 'Required by code in TX — accounts for insulation, windows, orientation, and DFW heat load' },
            { icon: '🌡️', title: 'Climate Zone 3', desc: 'DFW sits in hot-humid zone 3 — design temperatures reach 102°F with high dew points' },
            { icon: '⚠️', title: 'Oversizing Problems', desc: 'Short cycling causes humidity issues — DFW summers demand right-sized equipment' },
            { icon: '🏠', title: 'Attic Insulation Impact', desc: 'DFW attic temps hit 150°F+ — R-38 minimum insulation dramatically affects sizing' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#1e3a5f', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔢 DFW AC Sizing Calculator</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 6 }}>Home Size: {sqft.toLocaleString()} sq ft</label>
            <input type="range" min={800} max={5000} step={100} value={sqft} onChange={e => setSqft(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F5E642' }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8 }}>Attic Insulation Level</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {['poor', 'average', 'good'].map(level => (
                <button key={level} onClick={() => setInsulation(level)}
                  style={{ flex: 1, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, textTransform: 'capitalize',
                    backgroundColor: insulation === level ? '#F5E642' : '#0A1628', color: insulation === level ? '#0A1628' : '#fff' }}>
                  {level === 'poor' ? '⬇️ Poor (<R-19)' : level === 'average' ? '➡️ Average (R-25)' : '⬆️ Good (R-38+)'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 4 }}>Recommended AC Size for DFW</div>
            <div style={{ fontSize: 48, fontWeight: 700, color: '#F5E642' }}>{tons} Tons</div>
            <div style={{ fontSize: 14, color: '#94a3b8', marginTop: 4 }}>Always confirm with a licensed Manual J calculation</div>
          </div>
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Get a Properly Sized AC in DFW</div>
          <div style={{ color: '#0A1628', marginBottom: 16 }}>Connect with vetted DFW HVAC pros who perform proper Manual J load calculations</div>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>
            Get Free Sizing Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
