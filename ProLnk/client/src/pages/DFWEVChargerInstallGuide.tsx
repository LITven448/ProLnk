import { useState } from 'react';

const vehicles = [
  { brand: 'Tesla', models: ['Model 3', 'Model Y', 'Model S', 'Model X'], chargerType: 'Level 2 recommended' },
  { brand: 'Ford', models: ['F-150 Lightning', 'Mustang Mach-E'], chargerType: 'Level 2 recommended' },
  { brand: 'Chevrolet', models: ['Bolt EV', 'Bolt EUV', 'Silverado EV'], chargerType: 'Level 2 recommended' },
  { brand: 'Rivian', models: ['R1T', 'R1S'], chargerType: 'Level 2 recommended' },
  { brand: 'Hyundai/Kia', models: ['Ioniq 5', 'EV6', 'Ioniq 6'], chargerType: 'Level 2 recommended' },
];

const panelOptions = ['100A or less', '150A', '200A', '200A+'];
const garageOptions = ['Attached garage', 'Detached garage', 'Carport', 'No covered parking'];

function getComplexity(panel: string, garage: string): { level: string; cost: string; notes: string[] } {
  const needsUpgrade = panel === '100A or less';
  const longRun = garage === 'Detached garage';
  const notes: string[] = [];

  if (needsUpgrade) {
    notes.push('Panel upgrade to 200A required — adds $1,500–$3,000');
    notes.push('Permit required for panel work in all DFW cities');
  }
  if (longRun) {
    notes.push('Trenching required for detached garage — adds $500–$1,200');
  }
  if (garage === 'No covered parking') {
    notes.push('Weatherproof EVSE required — outdoor-rated unit adds ~$200');
    notes.push('Consider pedestal mount or wall post installation');
  }
  notes.push('EVSE permit required in most DFW municipalities');
  notes.push('Oncor EV rate plan can save $200–$400/year on charging');

  const isComplex = needsUpgrade || longRun;
  return {
    level: isComplex ? 'High Complexity' : 'Standard Install',
    cost: needsUpgrade ? '$2,500–$6,000 total' : longRun ? '$1,200–$3,500 total' : '$500–$2,500',
    notes,
  };
}

export default function DFWEVChargerInstallGuide() {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedPanel, setSelectedPanel] = useState('');
  const [selectedGarage, setSelectedGarage] = useState('');
  const [result, setResult] = useState<ReturnType<typeof getComplexity> | null>(null);

  function handleEstimate() {
    if (!selectedPanel || !selectedGarage) return;
    setResult(getComplexity(selectedPanel, selectedGarage));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>⚡</span>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: 0 }}>
            DFW EV Charger Installation Guide
          </h1>
        </div>
        <p style={{ color: '#8A9AB5', fontSize: 16, marginBottom: 40 }}>
          EV adoption in North Texas is accelerating. Get the right charger setup the first time.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '🔌', title: 'Level 1 (120V)', detail: '3–5 miles/hr of charge. Uses standard outlet. Best for PHEVs or low-mileage drivers. No install needed.', cost: '$0′ },
            { icon: '⚡', title: 'Level 2 (240V)', detail: '20–30 miles/hr of charge. Requires dedicated 50A circuit. Most common home setup. EVSE unit required.', cost: '$500–$2,500′ },
            { icon: '🚀', title: 'DC Fast (Not Home)', detail: 'DC fast charging is commercial only. Home installations are not feasible — requires 480V 3-phase power.', cost: 'N/A (commercial)' },
          ].map(c => (
            <div key={c.title} style={{ background: '#111E35', borderRadius: 12, padding: 20, border: '1px solid #1E2D4A' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 15, marginBottom: 6 }}>{c.title}</div>
              <p style={{ color: '#8A9AB5', fontSize: 13, lineHeight: 1.6, margin: '0 0 8px' }}>{c.detail}</p>
              <div style={{ color: '#4ECDC4', fontWeight: 700, fontSize: 14 }}>{c.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>🚗 Fastest-Growing EVs in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {vehicles.map(v => (
              <div key={v.brand} style={{ background: '#0A1628', borderRadius: 8, padding: 14, border: '1px solid #1E2D4A' }}>
                <div style={{ fontWeight: 700, color: '#E8EDF5', marginBottom: 4 }}>{v.brand}</div>
                <div style={{ color: '#8A9AB5', fontSize: 12, marginBottom: 6 }}>{v.models.join(', ')}</div>
                <div style={{ color: '#4ECDC4', fontSize: 12, fontWeight: 600 }}>✓ {v.chargerType}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #1E2D4A' }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 8px' }}>💰 Oncor Rebates & Incentives</h2>
          <p style={{ color: '#8A9AB5', fontSize: 14, marginBottom: 16 }}>Oncor serves 10M+ customers in DFW and offers EV-specific programs:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { label: 'EV Rate Plan (TOU)', value: 'Charge at night for ~$0.04–0.06/kWh vs $0.13+ peak' },
              { label: 'Federal Tax Credit', value: '30% of charger + install cost (up to $1,000)' },
              { label: 'TX No Sales Tax', value: 'EV charging equipment exempt from TX sales tax' },
              { label: 'Utility Rebate', value: 'Check local co-op — some offer $200–$500 rebates' },
            ].map(r => (
              <div key={r.label} style={{ background: '#0A1628', borderRadius: 8, padding: 14, border: '1px solid #1E2D4A' }}>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{r.label}</div>
                <div style={{ color: '#8A9AB5', fontSize: 12 }}>{r.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 28, border: '1px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, margin: '0 0 20px' }}>🔧 Get Your Install Estimate</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#8A9AB5', fontSize: 13, display: 'block', marginBottom: 6 }}>EV Brand (optional)</label>
              <select value={selectedVehicle} onChange={e => setSelectedVehicle(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Any EV</option>
                {vehicles.map(v => <option key={v.brand} value={v.brand}>{v.brand}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8A9AB5', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Panel Size</label>
              <select value={selectedPanel} onChange={e => setSelectedPanel(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select panel</option>
                {panelOptions.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8A9AB5', fontSize: 13, display: 'block', marginBottom: 6 }}>Parking Situation</label>
              <select value={selectedGarage} onChange={e => setSelectedGarage(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D4A', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select type</option>
                {garageOptions.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
          <button onClick={handleEstimate} disabled={!selectedPanel || !selectedGarage}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '12px 28px', borderRadius: 8, border: 'none', cursor: 'pointer', opacity: !selectedPanel || !selectedGarage ? 0.5 : 1 }}>
            Calculate Install Complexity →
          </button>

          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #1E2D4A' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ color: result.level === 'High Complexity' ? '#FF6B6B' : '#4ECDC4', fontWeight: 700, fontSize: 18 }}>
                  {result.level === 'High Complexity' ? '⚠️' : '✅'} {result.level}
                </span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{result.cost}</span>
              </div>
              <ul style={{ margin: 0, padding: '0 0 0 18px' }}>
                {result.notes.map((n, i) => (
                  <li key={i} style={{ color: '#8A9AB5', fontSize: 13, marginBottom: 6, lineHeight: 1.5 }}>{n}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ color: '#8A9AB5', fontSize: 13 }}>Get quotes from licensed DFW electricians on ProLnk</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, padding: '14px 36px', borderRadius: 8, border: 'none', cursor: 'pointer', marginTop: 12 }}>
            Get Free Quotes →
          </button>
        </div>
      </div>
    </div>
  );
}
