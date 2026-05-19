import { useState } from 'react';

const features = [
  { id: 'ev', label: 'EV Charger (Level 2)', watts: 9600 },
  { id: 'hvac1', label: 'HVAC Unit #1 (3-ton)', watts: 5400 },
  { id: 'hvac2', label: 'HVAC Unit #2 (4-ton)', watts: 7200 },
  { id: 'waterheater', label: 'Electric Water Heater', watts: 4500 },
  { id: 'dryer', label: 'Electric Dryer', watts: 5000 },
  { id: 'range', label: 'Electric Range/Oven', watts: 6000 },
  { id: 'hotub', label: 'Hot Tub / Spa', watts: 5500 },
  { id: 'workshop', label: 'Workshop (240V tools)', watts: 3000 },
  { id: 'pool', label: 'Pool Pump', watts: 1500 },
  { id: 'addition', label: 'Home Addition (1,000 sqft)', watts: 3000 },
];

export default function DFWElectricalLoadCalc2026() {
  const [selected, setSelected] = useState<string[]>(['hvac1', 'waterheater', 'dryer']);
  const [panelSize, setPanelSize] = useState(200);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  const totalWatts = features.filter(f => selected.includes(f.id)).reduce((sum, f) => sum + f.watts, 0);
  const baseLoad = 5000;
  const totalWithBase = totalWatts + baseLoad;
  const demandFactor = 0.7;
  const demandWatts = Math.round(totalWithBase * demandFactor);
  const demandAmps = Math.round(demandWatts / 240);
  const panelCapacityWatts = panelSize * 240 * 0.8;
  const headroom = panelCapacityWatts - demandWatts;
  const adequate = headroom > 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW ELECTRICAL LOAD GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>Calculate Your DFW Home Electrical Load</h1>
        <p style={{ color: '#9BA3AF', fontSize: 15, marginBottom: 32 }}>Adding an EV charger, home addition, or second HVAC unit? Calculate if your panel can handle it before you pay an electrician to find out.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⚡ Current Panel Size</div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
            {[100, 150, 200, 400].map(p => (
              <button key={p} onClick={() => setPanelSize(p)} style={{ background: panelSize === p ? '#F5E642′ : '#1A2F50', color: panelSize === p ? '#0A1628' : '#E8EAF0', border: ’none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontWeight: 700 }}>{p}A</button>
            ))}
          </div>
          <div style={{ color: '#9BA3AF', fontSize: 12, marginTop: 6 }}>Most DFW homes built after 1990 have 200A. Pre-1980 often have 100-150A.</div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🏠 Select Your High-Draw Appliances</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {features.map(f => (
              <button key={f.id} onClick={() => toggle(f.id)} style={{ background: selected.includes(f.id) ? '#1A3A20′ : '#1A2F50', border: selected.includes(f.id) ? '1px solid #4ADE80' : '1px solid #2A3F60', borderRadius: 8, padding: '10px 12px', cursor: ’pointer', textAlign: 'left' }}>
                <div style={{ color: selected.includes(f.id) ? '#4ADE80′ : '#E8EAF0', fontWeight: 600, fontSize: 13 }}>{selected.includes(f.id) ? '✓ ' : ''}{f.label}</div>
                <div style={{ color: '#9BA3AF', fontSize: 12 }}>{(f.watts / 1000).toFixed(1)} kW</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: adequate ? '#0F2A15′ : '#2A0F0F', borderRadius: 12, padding: 24, borderLeft: `4px solid ${adequate ? '#4ADE80' : '#EF4444'}`, marginBottom: 24 }}>
          <div style={{ color: adequate ? '#4ADE80′ : '#EF4444', fontWeight: 800, fontSize: 20, marginBottom: 12 }}>{adequate ? '✅ Panel Likely Adequate' : '⚠️ Panel Upgrade Recommended'}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#9BA3AF', fontSize: 12 }}>Total Installed</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{(totalWithBase / 1000).toFixed(1)} kW</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#9BA3AF', fontSize: 12 }}>Demand Load (70%)</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{demandAmps}A</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
              <div style={{ color: '#9BA3AF', fontSize: 12 }}>Panel Headroom</div>
              <div style={{ color: adequate ? '#4ADE80′ : '#EF4444', fontWeight: 800, fontSize: 18 }}>{adequate ? '+' : ''}{Math.round(headroom / 240)}A</div>
            </div>
          </div>
          {!adequate && <div style={{ color: '#CBD5E1', fontSize: 14, marginTop: 12 }}>Your demand load exceeds 80% of panel capacity. A 400A upgrade or load management system is recommended.</div>}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>📋 DFW Electrical Load Facts</div>
          {['NEC 220 demand factor calculation: 70% of total connected load for first 10kW', '200A panel at 80% capacity = 38,400W usable — enough for most DFW homes', 'EV Level 2 charger is the #1 reason DFW homeowners need panel upgrades in 2026', 'DFW electricians: panel upgrade cost $2,500-6,000 depending on scope', 'Charter ProLnk electricians provide free load calculations with any panel quote'].map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ color: '#F5E642′ }}>✓</span>
              <span style={{ color: '#CBD5E1', fontSize: 14 }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}