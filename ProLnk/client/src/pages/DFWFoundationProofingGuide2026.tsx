import { useState } from 'react';

const homeAges = ['New (under 10 yrs)', 'Mid-Age (10-25 yrs)', 'Older (25-40 yrs)', 'Vintage (40+ yrs)'];
const states = ['No Issues', 'Minor Cracks', 'Active Movement', 'Previous Repair'];

const checklist: Record<string, string[]> = {
  'New (under 10 yrs)-No Issues': ['💧 Establish watering schedule before problems start', '🔍 Ensure drainage slopes away from foundation 6+ inches', '📸 Photograph foundation corners annually in February', '🌱 Maintain consistent soil moisture — consistency = stability', '📋 ProLnk tracks your service history for future reference'],
  'New (under 10 yrs)-Minor Cracks': ['🔍 Have engineer assess cracks before they progress', '💧 Increase watering frequency during July-August', '🚿 Check gutters drain 6+ feet from foundation', '📸 Photograph cracks with ruler for change tracking'],
  'Mid-Age (10-25 yrs)-No Issues': ['💧 Soaker hose or drip system 18 inches from foundation', '🌱 Maintain consistent moisture — especially May-September', '🔍 Annual visual inspection — check doors and window frames', '🚿 Clean gutters twice yearly — spring and fall', '📸 Annual foundation photo documentation'],
  'Mid-Age (10-25 yrs)-Minor Cracks': ['🔍 SLAB FOUNDATION: Engineer inspection within 60 days', '💧 Begin consistent watering program immediately', '🚿 Ensure all drainage slopes away from house', '📸 Document crack size, location, and direction', '⚠️ Remediation costs: $5K-$30K — prevention far cheaper'],
  'Older (25-40 yrs)-No Issues': ['🔍 Annual professional inspection — DFW clay shifts a lot', '💧 Year-round watering required — not just summer', '🚿 Grade check — settled soil reduces drainage slope', '🌱 Avoid large trees within 20 feet of foundation', '📋 Log all door/window sticking events — early warning signs'],
  'Older (25-40 yrs)-Active Movement': ['🚨 Active movement requires immediate engineer assessment', '🔍 Structural engineer — not just a foundation company', '💧 Emergency: begin daily foundation watering now', '📸 Full documentation before any repair attempts', '📋 Get 3 contractor bids — prices vary 40%+ in DFW'],
  'Vintage (40+ yrs)-No Issues': ['🔍 Bi-annual professional inspection', '💧 Consistent year-round irrigation program essential', '🚿 Re-grade soil around perimeter if settled', '🌱 Remove trees over 30 ft within 15 feet of house'],
  'Vintage (40+ yrs)-Previous Repair': ['🔍 Annual inspection by original repair engineer', '💧 Maintain watering program permanently', '📋 Keep repair warranty documents accessible', '📸 Annual post-repair photo comparison'],
};

const defaultItems = ['💧 Establish consistent foundation watering schedule', '🔍 Ensure drainage slopes away 6+ inches', '📸 Annual foundation photo documentation', '🌱 Consistency in soil moisture = foundation stability', '📋 ProLnk tracks your home service history'];

export default function DFWFoundationProofingGuide2026() {
  const [homeAge, setHomeAge] = useState('');
  const [state, setState] = useState('');

  const key = `${homeAge}-${state}`;
  const items = checklist[key] || (homeAge && state ? defaultItems : []);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏗️ PROLNK DFW GUIDES 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Foundation-Proofing Complete Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Make your DFW foundation last a lifetime — prevention costs $500/yr, repairs cost $15,000+.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[{label:'🏠 Home Age', val: homeAge, set: setHomeAge, opts: homeAges},{label:'🔍 Current Foundation State', val: state, set: setState, opts: states}].map(({label, val, set, opts}) => (
            <div key={label}>
              <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 6 }}>{label}</div>
              <select value={val} onChange={e => set(e.target.value)} style={{ width: '100%', background: '#1e3a5f', border: '1px solid #2d4a6e', color: '#fff', padding: '10px', borderRadius: 6, fontSize: 14 }}>
                <option value="">Select...</option>
                {opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div style={{ background: '#132035', borderRadius: 10, padding: 24, marginBottom: 32 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>Your Foundation-Proofing Guide</div>
            {items.map((item, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #1e3a5f', fontSize: 15 }}>{item}</div>
            ))}
          </div>
        )}

        <div style={{ background: '#132035', borderRadius: 10, padding: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🏗️ DFW Foundation Key Facts</div>
          {['DFW black clay soil shrinks 30% in drought — most expansive in North America','Consistent watering matters more than quantity — wet-dry cycles cause damage','Soaker hose 18 inches from foundation = ideal delivery method','Foundation repair averages $15,000-$30,000 in DFW — prevention is $300-500/yr','Sticking doors and windows are the first sign of foundation movement'].map((f,i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}><span style={{ color: '#F5E642' }}>▸</span><span style={{ color: '#cbd5e1', fontSize: 14 }}>{f}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
