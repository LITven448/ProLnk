import { useState } from 'react';

const homeAges = ['New (after 2012)', '2000–2012', '1985–2000', 'Before 1985'];
const billRanges = ['Under $150/mo', '$150–$250/mo', '$250–$400/mo', 'Over $400/mo'];

const leakageData: Record<string, Record<string, { level: string; locations: string[]; diy: string[]; pro: string[]; cost: string; savings: string }>> = {
  'New (after 2012)': {
    'Under $150/mo': { level: 'Low (3–5 ACH50)', locations: ['Recessed lights', 'Plumbing penetrations'], diy: ['Weatherstripping doors', 'Outlet gaskets'], pro: ['Blower door test'], cost: '$200–$600', savings: '5–8%' },
    '$150–$250/mo': { level: 'Low-Moderate (4–6 ACH50)', locations: ['Recessed lights', 'Bath fans', 'Top plates'], diy: ['Weatherstripping', 'Caulk windows'], pro: ['Attic air sealing'], cost: '$500–$1,200', savings: '8–12%' },
    '$250–$400/mo': { level: 'Moderate (5–7 ACH50)', locations: ['Top plates', 'Duct boots', 'Electrical boxes'], diy: ['Outlet gaskets', 'Door sweeps'], pro: ['Full attic seal', 'Duct sealing'], cost: '$1,000–$2,500', savings: '12–18%' },
    'Over $400/mo': { level: 'High (7+ ACH50)', locations: ['Multiple zones', 'Crawlspace', 'Attic'], diy: ['Visible gaps', 'Door sweeps'], pro: ['Diagnostic blower door', 'Whole-house sealing'], cost: '$2,000–$4,000', savings: '18–25%' },
  },
  '2000–2012': {
    'Under $150/mo': { level: 'Low-Moderate', locations: ['Top plates', 'Recessed lights'], diy: ['Weatherstripping', 'Caulk trim'], pro: ['Attic foam sealing'], cost: '$600–$1,500', savings: '10–15%' },
    '$150–$250/mo': { level: 'Moderate (6–8 ACH50)', locations: ['Top plates', 'Electrical boxes', 'Plumbing'], diy: ['Outlet gaskets', 'Door sweeps'], pro: ['Attic + duct sealing'], cost: '$1,200–$3,000', savings: '15–22%' },
    '$250–$400/mo': { level: 'Moderate-High', locations: ['Attic bypasses', 'Duct boots', 'Fireplace'], diy: ['Accessible gaps'], pro: ['Full diagnostic + seal'], cost: '$2,000–$5,000', savings: '20–28%' },
    'Over $400/mo': { level: 'High (8–12 ACH50)', locations: ['Multiple major bypasses'], diy: ['Door/window seals'], pro: ['Comprehensive blower door + remediation'], cost: '$3,500–$7,000', savings: '25–35%' },
  },
  '1985–2000': {
    'Under $150/mo': { level: 'Moderate', locations: ['Top plates', 'Recessed lights', 'Attic door'], diy: ['Attic hatch insulation', 'Caulking'], pro: ['Attic air sealing'], cost: '$1,000–$2,500', savings: '12–18%' },
    '$150–$250/mo': { level: 'Moderate-High (8–10 ACH50)', locations: ['Top plates', 'Plumbing walls', 'Fireplace'], diy: ['Door sweeps', 'Outlet gaskets'], pro: ['Dense-pack walls', 'Attic sealing'], cost: '$2,500–$6,000', savings: '20–28%' },
    '$250–$400/mo': { level: 'High', locations: ['Walls', 'Attic', 'Slab penetrations'], diy: ['Visible cracks'], pro: ['Full house sealing'], cost: '$4,000–$9,000', savings: '28–35%' },
    'Over $400/mo': { level: 'Very High (12+ ACH50)', locations: ['Everywhere'], diy: ['Weatherstripping'], pro: ['Whole-home blower door + foam'], cost: '$6,000–$14,000', savings: '35–45%' },
  },
  'Before 1985': {
    'Under $150/mo': { level: 'High', locations: ['Top plates', 'Knob & tube areas', 'Sill plates'], diy: ['Door/window weatherstrip'], pro: ['Blower door + attic sealing'], cost: '$1,500–$4,000', savings: '15–22%' },
    '$150–$250/mo': { level: 'Very High (12–15 ACH50)', locations: ['Sill plates', 'Rim joists', 'Attic'], diy: ['Caulk visible gaps'], pro: ['Dense-pack + spray foam'], cost: '$4,000–$10,000', savings: '25–35%' },
    '$250–$400/mo': { level: 'Severe', locations: ['Whole structure'], diy: ['Basic weatherstripping'], pro: ['Full retrofit air barrier'], cost: '$8,000–$18,000', savings: '35–45%' },
    'Over $400/mo': { level: 'Severe (15+ ACH50)', locations: ['Full envelope failure'], diy: ['Visible gaps only'], pro: ['Complete encapsulation'], cost: '$12,000–$25,000', savings: '40–55%' },
  },
};

export default function DFWAirSealingGuide() {
  const [age, setAge] = useState('');
  const [bill, setBill] = useState('');
  const result = age && bill ? leakageData[age]?.[bill] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME EFFICIENCY</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Air Sealing Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW homes lose massive amounts of conditioned air through hidden gaps. Find your leakage level and what to do about it.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '💨', title: 'Attic Penetrations', desc: 'Top plates and recessed lights are the #1 source of air loss in DFW homes.' },
            { icon: '🔌', title: 'Electrical Boxes', desc: 'Outlet and switch boxes on exterior walls leak directly to the outside.' },
            { icon: '🌡️', title: 'Blower Door Test', desc: 'A $300–$500 diagnostic test that pinpoints exactly where your home leaks.' },
            { icon: '💰', title: 'ROI', desc: 'Air sealing typically delivers the best dollar-for-dollar ROI of any upgrade.' },
          ].map(f => (
            <div key={f.title} style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{f.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🔍 Leakage Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Age</label>
              <select value={age} onChange={e => setAge(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value=''>Select age...</option>
                {homeAges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Summer Electric Bill</label>
              <select value={bill} onChange={e => setBill(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value=''>Select range...</option>
                {billRanges.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <div><div style={{ color: '#94A3B8', fontSize: 12 }}>Leakage Level</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{result.level}</div></div>
                <div><div style={{ color: '#94A3B8', fontSize: 12 }}>Sealing Cost</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{result.cost}</div></div>
                <div><div style={{ color: '#94A3B8', fontSize: 12 }}>Est. Savings</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{result.savings}</div></div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 6 }}>Priority Locations</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{result.locations.map(l => <span key={l} style={{ background: '#1E3A5F', borderRadius: 20, padding: '3px 10px', fontSize: 13 }}>📍 {l}</span>)}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 6 }}>DIY Opportunities</div>{result.diy.map(d => <div key={d} style={{ fontSize: 13, color: '#A7F3D0′ }}>✅ {d}</div>)}</div>
                <div><div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 6 }}>Professional Work</div>{result.pro.map(p => <div key={p} style={{ fontSize: 13, color: '#93C5FD' }}>🔧 {p}</div>)}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
