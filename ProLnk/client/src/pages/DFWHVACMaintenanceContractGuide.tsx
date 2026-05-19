import { useState } from 'react';

const systemCounts = [1, 2, 3, 4];
const homeSizes = ['Under 1,500 sqft', '1,500–2,500 sqft', '2,500–4,000 sqft', '4,000+ sqft'];
const systemAges = ['New (0–3 years)', 'Moderate (4–8 years)', 'Aging (9–14 years)', 'Old (15+ years)'];

type ContractType = { name: string; frequency: string; includes: string[]; excludes: string[]; annualCost: [number, number] };

const getRecommendation = (count: number, size: string, age: string): { type: string; cost: [number, number]; note: string } => {
  const isOld = age.includes('15+') || age.includes('9–14');
  const isLarge = size.includes('4,000') || size.includes('2,500');
  if (count >= 3 || (isLarge && isOld)) return { type: 'Premium Multi-System Plan', cost: [450, 750], note: 'With 3+ systems in DFW heat, a premium plan with priority scheduling is essential. Summer breakdowns are 3–5x more expensive without a contract.' };
  if (count === 2 || isLarge) return { type: 'Standard Biannual Plan', cost: [280, 450], note: 'Two systems require coordinated spring and fall tune-ups. DFW biannual service is non-negotiable — one missed cycle can void manufacturer warranty.' };
  return { type: 'Basic Biannual Plan', cost: [180, 300], note: 'Spring tune-up before DFW summer heat and fall tune-up before cold snaps. Single system homes should still service biannually in this climate.' };
};

const contracts: ContractType[] = [
  {
    name: 'Basic Biannual Plan',
    frequency: '2x/year (spring + fall)',
    includes: ['Filter replacement', 'Coil cleaning', 'Refrigerant check', 'Electrical inspection', 'Thermostat calibration'],
    excludes: ['Parts and labor for repairs', 'Emergency after-hours calls', 'Duct cleaning'],
    annualCost: [180, 300],
  },
  {
    name: 'Standard Biannual Plan',
    frequency: '2x/year + 1 priority call',
    includes: ['All Basic items', 'Condensate drain flush', 'Blower cleaning', 'One priority service call/year', 'UV light check'],
    excludes: ['Major repairs', 'Compressor replacement', 'Duct work'],
    annualCost: [280, 450],
  },
  {
    name: 'Premium Multi-System Plan',
    frequency: '2x/year per system + unlimited priority',
    includes: ['All Standard items', 'Unlimited priority calls', 'Discounted parts (15%)', 'Annual duct inspection', 'Dedicated tech assignment'],
    excludes: ['Full system replacement', 'Structural duct repair'],
    annualCost: [450, 750],
  },
];

export default function DFWHVACMaintenanceContractGuide() {
  const [count, setCount] = useState(1);
  const [size, setSize] = useState('1,500–2,500 sqft');
  const [age, setAge] = useState('Moderate (4–8 years)');

  const rec = getRecommendation(count, size, age);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, fontWeight: 600 }}>🏠 DFW Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>HVAC Maintenance Contract Guide for DFW</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          In DFW, biannual HVAC service isn't optional — it’s a requirement. Spring prep before triple-digit summers and fall service before cold snaps protect your system and keep manufacturer warranties valid.
        </p>

        <div style={{ background: 'rgba(245,230,66,0.08)', border: '1.5px solid rgba(245,230,66,0.25)', borderRadius: 12, padding: 16, marginBottom: 24, fontSize: 14, color: '#fde68a' }}>
          ⚡ <strong>DFW Rule:</strong> Annual tune-ups may void manufacturer warranties. Most require biannual service documentation. Always check your unit's warranty terms.
        </div>

        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🔧 Contract Recommender</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#cbd5e1′ }}>Number of HVAC Systems</label>
              <div style={{ display: 'flex', gap: 10 }}>
                {systemCounts.map(n => (
                  <button key={n} onClick={() => setCount(n)} style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: '1.5px solid', borderColor: count === n ? '#F5E642′ : '#334155', background: count === n ? '#F5E642' : ’transparent', color: count === n ? '#0A1628′ : '#fff', fontWeight: 700, fontSize: 16, cursor: ’pointer' }}>{n}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#cbd5e1′ }}>Home Size</label>
              <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #334155', fontSize: 15, background: '#0f2040', color: '#fff' }}>
                {homeSizes.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#cbd5e1′ }}>System Age</label>
              <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #334155', fontSize: 15, background: '#0f2040', color: '#fff' }}>
                {systemAges.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(245,230,66,0.1)', border: '1.5px solid rgba(245,230,66,0.3)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: '#F5E642′ }}>📋 {rec.type}</div>
          <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>${rec.cost[0]}–${rec.cost[1]}<span style={{ fontSize: 16, fontWeight: 400, color: '#94a3b8′ }}>/year</span></div>
          <p style={{ color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>{rec.note}</p>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {contracts.map(c => (
            <div key={c.name} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 22, border: c.name === rec.type ? '1.5px solid rgba(245,230,66,0.4)' : '1.5px solid rgba(255,255,255,0.07)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{c.name} {c.name === rec.type && <span style={{ color: '#F5E642', fontSize: 12, marginLeft: 8 }}>★ RECOMMENDED</span>}</div>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>🗓️ {c.frequency}</div>
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#F5E642′ }}>${c.annualCost[0]}–${c.annualCost[1]}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#22c55e', marginBottom: 6 }}>INCLUDES</div>
                  {c.includes.map(i => <div key={i} style={{ fontSize: 13, color: '#94a3b8', marginBottom: 3 }}>✓ {i}</div>)}
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', marginBottom: 6 }}>EXCLUDES</div>
                  {c.excludes.map(e => <div key={e} style={{ fontSize: 13, color: '#94a3b8', marginBottom: 3 }}>✗ {e}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
