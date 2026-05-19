import { useState } from 'react';

const legalInfo = [
  { icon: '📜', title: 'Texas SB 769 — Rainwater Is Legal', desc: 'Texas Senate Bill 769 explicitly permits residential rainwater harvesting for outdoor and indoor non-potable uses. Some municipalities even offer rebates.' },
  { icon: '🏛️', title: 'DFW Municipal Rules', desc: 'Dallas and Fort Worth allow rainwater harvesting. Always check if your HOA has additional rules. Potable use requires filtration and health department approval.' },
  { icon: '🚫', title: 'What You Cannot Do', desc: 'Cannot divert stormwater runoff from neighbors\’ properties. Cannot use untreated water for drinking without certified filtration and testing.' },
];

const systemTypes = [
  { name: 'Rain Barrel', capacity: '50–100 gallons', cost: '$50–$200', use: 'Garden / lawn watering', pros: 'Low cost, easy install, no permits', cons: 'Limited capacity, mosquito risk if not sealed' },
  { name: 'Above-Ground Cistern', capacity: '250–2,500 gallons', cost: '$500–$2,500', use: 'Irrigation, toilet flushing', pros: 'Good capacity, scalable, moveable', cons: 'Visible, needs UV protection' },
  { name: 'Underground Cistern', capacity: '1,000–10,000+ gallons', cost: '$3,000–$15,000', use: 'Full irrigation, potential indoor non-potable', pros: 'Hidden, temperature stable, large capacity', cons: 'Excavation cost, requires pump' },
  { name: 'Potable System', capacity: '1,000–5,000 gallons', cost: '$8,000–$25,000', use: 'Drinking, cooking, all indoor uses', pros: 'Complete water independence possible', cons: 'Requires multi-stage filtration, testing, permits' },
];

const uses = [
  { icon: '🌱', label: 'Garden & Landscaping', potable: false },
  { icon: '🚗', label: 'Car Washing', potable: false },
  { icon: '🚽', label: 'Toilet Flushing', potable: false },
  { icon: '👕', label: 'Laundry (with filter)', potable: false },
  { icon: '🍳', label: 'Cooking & Drinking', potable: true },
  { icon: '🚿', label: 'Showering', potable: true },
];

export default function DFWRainwaterHarvestingGuide() {
  const [roofSqFt, setRoofSqFt] = useState('');
  const [rainfallTarget, setRainfallTarget] = useState('37');
  const [result, setResult] = useState<{ gallons: number; tankSize: number; tankType: string; cost: string } | null>(null);

  function calculate() {
    const roof = parseFloat(roofSqFt);
    const rainfall = parseFloat(rainfallTarget);
    if (!roof || !rainfall) return;
    const gallons = Math.round(roof * (rainfall / 12) * 7.48 * 0.85);
    const peakMonth = Math.round(gallons / 12 * 1.5);
    let tankType = 'Rain Barrel (50–100 gal)';
    let cost = '$50–$200';
    if (peakMonth > 100 && peakMonth <= 500) { tankType = 'Above-Ground Cistern'; cost = '$500–$1,500'; }
    else if (peakMonth > 500 && peakMonth <= 2500) { tankType = 'Above-Ground Cistern (large)'; cost = '$1,500–$2,500'; }
    else if (peakMonth > 2500) { tankType = 'Underground Cistern'; cost = '$3,000–$8,000'; }
    setResult({ gallons, tankSize: peakMonth, tankType, cost });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg,#0A1628 0%,#0d2137 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>💧</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Rainwater Harvesting Guide</h1>
        <p style={{ fontSize: 18, color: '#94A3B8', maxWidth: 640, margin: '0 auto' }}>Texas law allows it. DFW gets 37 inches of rain per year. Here's how to capture and use it legally and effectively.</p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: 'linear-gradient(135deg,#1a3a1a,#0f2a0f)', border: '1px solid #2d5a2d', borderRadius: 16, padding: 24, margin: '40px 0 0' }}>
          <h2 style={{ color: '#4ADE80', fontSize: 20, fontWeight: 700, margin: '0 0 8px' }}>✅ Texas SB 769: Rainwater Harvesting Is Legal & Encouraged</h2>
          <p style={{ color: '#86EFAC', margin: 0 }}>Texas not only allows rainwater harvesting — state law requires that HOAs and deed restrictions cannot prohibit it. Some Texas cities offer rebates of $50–$500 for rain barrel and cistern installations.</p>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 20px' }}>Legal Framework</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
          {legalInfo.map(l => (
            <div key={l.title} style={{ background: '#1E2D45', borderRadius: 16, padding: 20, border: '1px solid #2A3F5C' }}>
              <span style={{ fontSize: 28 }}>{l.icon}</span>
              <div style={{ fontWeight: 700, color: '#E8EDF5', margin: '8px 0 6px' }}>{l.title}</div>
              <p style={{ color: '#94A3B8', fontSize: 14, margin: 0 }}>{l.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 20px' }}>System Types</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
          {systemTypes.map(s => (
            <div key={s.name} style={{ background: '#1E2D45', borderRadius: 16, padding: 20, border: '1px solid #2A3F5C' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 16, marginBottom: 4 }}>{s.name}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>{s.capacity} • {s.cost}</div>
              <div style={{ color: '#E8EDF5', fontSize: 13, marginBottom: 8 }}><strong>Use:</strong> {s.use}</div>
              <div style={{ color: '#4ADE80', fontSize: 13, marginBottom: 4 }}>✅ {s.pros}</div>
              <div style={{ color: '#F87171', fontSize: 13 }}>⚠️ {s.cons}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 16px' }}>Permitted Uses</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12 }}>
          {uses.map(u => (
            <div key={u.label} style={{ background: '#1E2D45', borderRadius: 12, padding: '14px 16px', border: `1px solid ${u.potable ? '#7C3AED' : '#2A3F5C'}`, textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{u.icon}</div>
              <div style={{ color: '#E8EDF5', fontWeight: 600, fontSize: 14, margin: '6px 0 4px' }}>{u.label}</div>
              <div style={{ fontSize: 12, color: u.potable ? '#A78BFA' : '#4ADE80' }}>{u.potable ? '🧪 Requires filtration' : '✅ Non-potable OK'}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F5E642', margin: '48px 0 8px' }}>Annual Harvest Calculator</h2>
        <p style={{ color: '#94A3B8', marginBottom: 20 }}>Estimate how much rainwater your DFW roof can capture annually.</p>
        <div style={{ background: '#1E2D45', borderRadius: 16, padding: 28, border: '1px solid #2A3F5C', maxWidth: 520 }}>
          <label style={{ color: '#94A3B8', fontSize: 14, display: 'block', marginBottom: 6 }}>Roof Collection Area (sq ft)</label>
          <input type="number" value={roofSqFt} onChange={e => setRoofSqFt(e.target.value)} placeholder="e.g. 2000"
            style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5C', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 16, marginBottom: 16, boxSizing: 'border-box' }} />
          <label style={{ color: '#94A3B8', fontSize: 14, display: 'block', marginBottom: 6 }}>Target Annual Rainfall (inches) — DFW avg is 37</label>
          <input type="number" value={rainfallTarget} onChange={e => setRainfallTarget(e.target.value)}
            style={{ width: '100%', background: '#0A1628', border: '1px solid #2A3F5C', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 16, marginBottom: 16, boxSizing: 'border-box' }} />
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>
            Calculate My Harvest Potential
          </button>
        </div>
        {result && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginTop: 24 }}>
            <div style={{ background: '#1E2D45', borderRadius: 12, padding: '20px 24px', border: '1px solid #2A3F5C' }}>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Annual Harvest Potential</div>
              <div style={{ color: '#4ADE80', fontSize: 32, fontWeight: 800 }}>{result.gallons.toLocaleString()}</div>
              <div style={{ color: '#64748B', fontSize: 13 }}>gallons/year</div>
            </div>
            <div style={{ background: '#1E2D45', borderRadius: 12, padding: '20px 24px', border: '1px solid #2A3F5C' }}>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Recommended Storage</div>
              <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 800 }}>{result.tankSize.toLocaleString()} gal</div>
              <div style={{ color: '#64748B', fontSize: 13 }}>{result.tankType}</div>
            </div>
            <div style={{ background: '#1E2D45', borderRadius: 12, padding: '20px 24px', border: '1px solid #2A3F5C' }}>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Estimated System Cost</div>
              <div style={{ color: '#60A5FA', fontSize: 28, fontWeight: 800 }}>{result.cost}</div>
              <div style={{ color: '#64748B', fontSize: 13 }}>installed</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
