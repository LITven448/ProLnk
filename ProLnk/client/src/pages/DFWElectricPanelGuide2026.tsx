import { useState } from 'react';

export default function DFWElectricPanelGuide2026() {
  const [sqft, setSqft] = useState('');
  const [hasEV, setHasEV] = useState(false);
  const [hasPool, setHasPool] = useState(false);
  const [hvacZones, setHvacZones] = useState('1');
  const [hasHotTub, setHasHotTub] = useState(false);
  const [result, setResult] = useState<{ amps: number; cost: string; reason: string } | null>(null);

  function calculate() {
    let score = 0;
    const sf = parseInt(sqft) || 0;
    if (sf > 4000) score += 3;
    else if (sf > 2500) score += 2;
    else if (sf > 1500) score += 1;
    if (hasEV) score += 3;
    if (hasPool) score += 2;
    if (hasHotTub) score += 2;
    const zones = parseInt(hvacZones) || 1;
    if (zones >= 3) score += 2;
    else if (zones === 2) score += 1;
    let amps = 100;
    let cost = '$1,500 - $3,000';
    let reason = 'A 100A panel is sufficient for a modest DFW home with standard loads.';
    if (score >= 8) {
      amps = 400; cost = '$8,000 - $15,000';
      reason = 'Your DFW home has multiple high-draw loads (EV, pool, hot tub, large HVAC). A 400A service is strongly recommended.';
    } else if (score >= 4) {
      amps = 200; cost = '$3,500 - $6,500';
      reason = 'A 200A panel handles most DFW homes with EV or pool - the sweet spot for modern energy demand.';
    }
    setResult({ amps, cost, reason });
  }

  const panelData = [
    { size: '100A', homes: 'Pre-1990 homes under 1,500 sq ft', cost: '$1,500-$3,000', note: 'Likely needs upgrade for modern DFW loads' },
    { size: '200A', homes: 'Most DFW homes built after 1990', cost: '$3,500-$6,500', note: 'Standard for new construction in DFW since 2000′ },
    { size: '400A', homes: '4,000+ sq ft, EV + pool + hot tub', cost: '$8,000-$15,000', note: 'Dual-meter setup; required for heavy electrification' },
  ];
  const smartPanels = [
    { name: 'Span Smart Panel', price: '$3,500-$5,500 installed', feature: 'Circuit-level control via app, EV scheduling, solar-ready' },
    { name: 'Leviton Load Center', price: '$2,500-$4,000 installed', feature: 'Arc-fault protection, energy monitoring per circuit' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW ELECTRICAL GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>Electric Panel Guide for DFW Homes</h1>
        <p style={{ color: '#8A9BBE', marginBottom: 36, lineHeight: 1.6 }}>100A vs 200A vs 400A - what your DFW home actually needs in 2026 as EV chargers, pools, and smart HVAC reshape electrical demand.</p>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Panel Size Comparison</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
          {panelData.map(p => (
            <div key={p.size} style={{ background: '#111E35', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#F5E642′ }}>{p.size}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{p.cost}</span>
              </div>
              <div style={{ color: '#C8D5E8', marginBottom: 4 }}>{p.homes}</div>
              <div style={{ color: '#8A9BBE', fontSize: 13 }}>{p.note}</div>
            </div>
          ))}
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Smart Panels for DFW Homes</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
          {smartPanels.map(s => (
            <div key={s.name} style={{ background: '#111E35', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontWeight: 700, color: '#E8EDF5', marginBottom: 4 }}>{s.name}</div>
              <div style={{ color: '#F5E642', fontSize: 14, marginBottom: 4 }}>{s.price}</div>
              <div style={{ color: '#8A9BBE', fontSize: 13 }}>{s.feature}</div>
            </div>
          ))}
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Permit Process</h2>
        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F', marginBottom: 40 }}>
          <ul style={{ color: '#C8D5E8', lineHeight: 2, paddingLeft: 20, margin: 0 }}>
            <li>Licensed electrician pulls permit with your city (Dallas, Plano, Frisco, McKinney)</li>
            <li>Oncor must approve any service upgrade - coordination adds 1-3 weeks</li>
            <li>Inspection required before energizing upgraded service</li>
            <li>400A requires Oncor transformer upgrade in some DFW neighborhoods</li>
            <li>Total timeline: 3-6 weeks for full 400A upgrade with inspections</li>
          </ul>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Panel Size Calculator</h2>
        <div style={{ background: '#111E35', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F', marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#8A9BBE', fontSize: 13, marginBottom: 6 }}>Home Size (sq ft)</label>
              <input value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 3200″ style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#8A9BBE', fontSize: 13, marginBottom: 6 }}>HVAC Zones</label>
              <select value={hvacZones} onChange={e => setHvacZones(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="1″>1 zone</option>
                <option value="2″>2 zones</option>
                <option value="3″>3+ zones</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 20, flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#C8D5E8′ }}>
              <input type="checkbox" checked={hasEV} onChange={e => setHasEV(e.target.checked)} style={{ accentColor: '#F5E642', width: 16, height: 16 }} />
              EV Charger
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#C8D5E8′ }}>
              <input type="checkbox" checked={hasPool} onChange={e => setHasPool(e.target.checked)} style={{ accentColor: '#F5E642', width: 16, height: 16 }} />
              Pool
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#C8D5E8′ }}>
              <input type="checkbox" checked={hasHotTub} onChange={e => setHasHotTub(e.target.checked)} style={{ accentColor: '#F5E642', width: 16, height: 16 }} />
              Hot Tub
            </label>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Calculate My Panel Size</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #F5E642′ }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>{result.amps}A Service Recommended</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Estimated Cost: {result.cost}</div>
              <div style={{ color: '#C8D5E8', lineHeight: 1.6 }}>{result.reason}</div>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', background: '#111E35', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F' }}>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Get a Panel Upgrade Quote in DFW</div>
          <p style={{ color: '#8A9BBE', marginBottom: 16 }}>ProLnk connects you with licensed DFW electricians - get 3 quotes in 24 hours.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Get Free Quotes</button>
        </div>
      </div>
    </div>
  );
}
