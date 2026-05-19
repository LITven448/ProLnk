import { useState } from 'react';

const propertyTypes = {
  'Single Family (Slab)': ['General Inspection', 'Foundation Inspection (Separate)', 'Roof Inspection', 'HVAC Inspection', 'Electrical Panel Review'],
  'Single Family (Pier & Beam)': ['General Inspection', 'Foundation/Crawl Space Inspection', 'Roof Inspection', 'Plumbing Under-Floor Check', 'Termite/Wood Destroying Insect'],
  'With Pool/Spa': ['General Inspection', 'Foundation Inspection', 'Pool & Spa Inspection (Separate)', 'Electrical Bonding Test', 'Sewer Camera Scope'],
  'Acreage/Rural': ['General Inspection', 'Septic Inspection', 'Well Water Inspection', 'Foundation Inspection', 'Survey/Fence Line Review'],
  'Older Home (Pre-1980)': ['General Inspection', 'Foundation Inspection', 'Asbestos Testing', 'Lead Paint Testing', 'Electrical/Knob-and-Tube Review', 'Sewer Camera Scope'],
};

const specialists = [
  { role: '🏠 General Inspector', cost: '$400–600', note: 'Texas TREC licensed required' },
  { role: '🏗️ Structural/Foundation Engineer', cost: '$400–800', note: 'PE stamp matters — not same as repair company' },
  { role: '🏊 Pool Inspector', cost: '$200–350', note: 'Separate from general inspection' },
  { role: '📷 Sewer Camera', cost: '$150–250', note: 'Lateral lines only — city main not included' },
  { role: '💧 Plumber (full scope)', cost: '$250–400', note: 'If sewer cam shows issues' },
  { role: '🌿 Septic Inspector', cost: '$300–600', note: 'Outer county properties' },
];

export default function DFWBuyerDueDiligenceGuide2026() {
  const [selectedType, setSelectedType] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '0 0 8px' }}>DFW Buyer Due Diligence Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Texas 10-day option period is everything — use every day of it</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20, borderLeft: '4px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 10px' }}>⏱️ The Texas Option Period</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>Standard 7–10 days. Pay a non-refundable option fee ($100–500) for the unrestricted right to cancel. This is your entire inspection window — don't waste a single day scheduling.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 14px' }}>📋 Select Your Property Type → Get Your Checklist</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {Object.keys(propertyTypes).map(type => (
              <button key={type} onClick={() => setSelectedType(type)}
                style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid', cursor: 'pointer', fontSize: 13,
                  borderColor: selectedType === type ? '#F5E642' : '#334155',
                  background: selectedType === type ? '#F5E642' : 'transparent',
                  color: selectedType === type ? '#0A1628' : '#94a3b8', fontWeight: selectedType === type ? 700 : 400 }}>
                {type}
              </button>
            ))}
          </div>
          {selectedType && (
            <div style={{ background: '#0d1e36', borderRadius: 10, padding: 16 }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>Required Inspections: {selectedType}</p>
              {propertyTypes[selectedType].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid #1e3a5f' }}>
                  <span style={{ color: '#22c55e', fontSize: 16 }}>✓</span>
                  <span style={{ color: '#e2e8f0', fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 14px' }}>👷 Specialist Inspector Directory + Costs</h2>
          {specialists.map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #1e3a5f' }}>
              <div>
                <div style={{ color: '#e2e8f0', fontWeight: 600, fontSize: 14 }}>{s.role}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>{s.note}</div>
              </div>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, whiteSpace: 'nowrap' }}>{s.cost}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, margin: '0 0 10px' }}>⚠️ Day-by-Day Option Period Strategy</h2>
          {['Day 1–2: Book ALL inspectors immediately (they fill fast)', 'Day 3–5: Conduct all inspections', 'Day 6–7: Review reports, identify repair requests', 'Day 8–9: Submit Amendment to Contract (repair or price reduction)', 'Day 10: Decision day — proceed, renegotiate, or cancel'].map((d, i) => (
            <div key={i} style={{ color: '#cbd5e1', fontSize: 13, padding: '5px 0', borderBottom: '1px solid #1e3a5f' }}>📍 {d}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
