import { useState } from 'react';

const ISSUES = ['Window/door gap', 'Control joint crack', 'Around penetration', 'Corner separation', 'Above window sill'];
const LOCATIONS = ['Exterior brick', 'Stone facade', 'Stucco surface', 'Foundation line', 'Chimney'];
const TEMPS = ['Below 60°F', '60–80°F (ideal)', '80–90°F', 'Above 90°F'];

function getCaulkRecommendation(issue: string, location: string, temp: string) {
  const tooHot = temp.includes('Above 90');
  const isChimney = location.includes('Chimney');
  const isFoundation = location.includes('Foundation');

  if (tooHot) {
    return {
      type: 'Do Not Apply',
      note: 'Above 90°F, caulk skins over before bonding — common mistake in DFW. Wait for morning temps or fall weather.',
      tips: 'Schedule caulking before 9am or after a cold front passes. Apply in shade if possible.',
      cost: 'N/A — delay application',
    };
  }
  if (isChimney) {
    return {
      type: 'High-Temp Silicone (650°F rated)',
      note: 'Standard caulk fails around chimney heat. Use high-temp silicone rated for chimney crowns and flashings.',
      tips: 'Also apply elastomeric masonry sealer to crown. Inspect annually before DFW fireplace season (Nov).',
      cost: '$40–$120 DIY | $200–$500 professional',
    };
  }
  if (isFoundation) {
    return {
      type: 'Polyurethane Sealant',
      note: 'DFW clay soil movement requires flexible, high-adhesion polyurethane at foundation lines — not acrylic.',
      tips: 'Clean joint thoroughly. Prime porous masonry. Tool within 5 min in DFW heat.',
      cost: '$60–$180 DIY | $300–$800 professional',
    };
  }
  return {
    type: temp.includes('ideal') ? 'Silicone or Urethane' : 'Siliconized Acrylic (faster cure)',
    note: 'Silicone for areas with water exposure; urethane for structural movement; acrylic for paintable interior-adjacent joints.',
    tips: 'DFW brick homes: caulk above every window and at control joints every 10–15 ft. Check after each freeze/thaw.',
    cost: '$30–$100 DIY | $150–$400 professional',
  };
}

export default function DFWMasonryCaulkingGuide() {
  const [issue, setIssue] = useState('');
  const [location, setLocation] = useState('');
  const [temp, setTemp] = useState('');
  const result = issue && location && temp ? getCaulkRecommendation(issue, location, temp) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🧱</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Masonry Caulking Guide</h1>
        <p style={{ color: '#9BA3B8', marginBottom: 32 }}>DFW's brick homes need proper sealing at joints and penetrations. The wrong caulk — or wrong timing — leads to failed bonds, water intrusion, and costly repairs.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>⚠️ DFW Caulking Pitfalls</h2>
          <ul style={{ color: '#9BA3B8', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Never apply above 90°F — caulk skins before bonding in DFW summers</li>
            <li>DFW clay movement cracks rigid caulks — always use flexible sealants</li>
            <li>Silicone cannot be painted — use siliconized acrylic near painted surfaces</li>
            <li>Mortar joints need re-pointing, not caulking — different repair process</li>
          </ul>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>🔧 Caulk Type Finder</h2>
          {[{ label: 'Masonry Issue', value: issue, set: setIssue, options: ISSUES },
            { label: 'Surface Location', value: location, set: setLocation, options: LOCATIONS },
            { label: 'Current Temperature', value: temp, set: setTemp, options: TEMPS }].map(({ label, value, set, options }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ color: '#9BA3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>{label}</label>
              <select value={value} onChange={e => set(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select...</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, marginTop: 8, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{result.type}</div>
              <div style={{ color: '#9BA3B8', fontSize: 14, marginBottom: 12 }}>{result.note}</div>
              <div style={{ background: '#111E35', borderRadius: 8, padding: '10px 16px', marginBottom: 10 }}>
                <div style={{ color: '#9BA3B8', fontSize: 11 }}>APPLICATION TIPS</div>
                <div style={{ color: '#E8EAF0', fontSize: 14 }}>{result.tips}</div>
              </div>
              <div style={{ background: '#111E35', borderRadius: 8, padding: '10px 16px' }}>
                <div style={{ color: '#9BA3B8', fontSize: 11 }}>EST. COST</div>
                <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 700 }}>{result.cost}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 600, marginBottom: 12 }}>📋 Caulk Type Reference</h2>
          {[['Silicone', '50-year life, waterproof, flexible — can\’t be painted. Use at windows, wet areas.'],
            ['Polyurethane', 'Paintable, best adhesion, handles DFW movement well. Best for foundations.'],
            ['Siliconized Acrylic', 'Paintable, decent flexibility, fast cure. Good for interior-adjacent brick.'],
            ['High-Temp Silicone', 'Chimney, fireplace surrounds — rated 650°F+. Required around heat sources.']].map(([type, desc]) => (
            <div key={type} style={{ borderBottom: '1px solid #1E3A5F', paddingBottom: 12, marginBottom: 12 }}>
              <span style={{ color: '#F5E642', fontWeight: 600 }}>{type}: </span>
              <span style={{ color: '#9BA3B8', fontSize: 14 }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
