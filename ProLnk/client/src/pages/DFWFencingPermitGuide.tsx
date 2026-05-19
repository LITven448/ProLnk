import { useState } from 'react';

const DFW_CITIES = [
  { name: 'Allen', permitRequired: true, threshold: 'Any height', fee: '$75–$150', setback: '5 ft from property line', notes: 'HOA likely stricter — check first' },
  { name: 'Arlington', permitRequired: true, threshold: 'Over 6 ft', fee: '$100–$200', setback: '3 ft rear/side', notes: 'Under 6 ft still requires zoning compliance' },
  { name: 'Carrollton', permitRequired: true, threshold: 'Any height', fee: '$50–$125', setback: '5 ft from property line', notes: 'Corner lots require 15 ft side street setback' },
  { name: 'Dallas', permitRequired: true, threshold: 'Over 4 ft front, any rear', fee: '$75–$250', setback: 'Varies by district', notes: 'Older neighborhoods may have deed restrictions' },
  { name: 'Fort Worth', permitRequired: true, threshold: 'Over 7 ft', fee: '$75–$150', setback: '5 ft from property line', notes: 'Most common: 6 ft wood privacy fence no permit needed' },
  { name: 'Frisco', permitRequired: true, threshold: 'Any height', fee: '$100–$200', setback: '5 ft rear, 5 ft side', notes: 'HOA approval required for most neighborhoods' },
  { name: 'Garland', permitRequired: true, threshold: 'Over 6 ft', fee: '$50–$100', setback: '5 ft from property line', notes: 'Aluminum/wrought iron front yard OK under 4 ft' },
  { name: 'Grand Prairie', permitRequired: true, threshold: 'Over 6 ft', fee: '$75–$125', setback: '3 ft rear/side', notes: 'Masonry/brick fences always require permit' },
  { name: 'Irving', permitRequired: true, threshold: 'Any masonry fence', fee: '$100–$175', setback: '5 ft from property line', notes: 'Wood fence under 6 ft may not require permit' },
  { name: 'McKinney', permitRequired: true, threshold: 'Any height', fee: '$75–$200', setback: '5 ft all sides', notes: 'New developments — check subdivision rules' },
  { name: 'Plano', permitRequired: true, threshold: 'Any height', fee: '$50–$150', setback: '5 ft from property line', notes: 'HOA governs most of Plano — city is secondary' },
  { name: 'Richardson', permitRequired: true, threshold: 'Over 6 ft', fee: '$75–$125', setback: '5 ft rear/side', notes: 'Front yard max 4 ft; decorative only' },
];

const FENCE_HEIGHTS = [
  { label: '4 ft or under', value: 4 },
  { label: '6 ft (standard privacy)', value: 6 },
  { label: '7 ft', value: 7 },
  { label: '8 ft or taller', value: 8 },
];

export default function DFWFencingPermitGuide() {
  const [selectedCity, setSelectedCity] = useState(DFW_CITIES[5]);
  const [height, setHeight] = useState(FENCE_HEIGHTS[1]);
  const [hasHOA, setHasHOA] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const permitNeeded = selectedCity.permitRequired && (height.value >= 7 || selectedCity.threshold === 'Any height');
  const hoaNote = hasHOA ? '⚠️ HOA approval is required BEFORE city permit. HOA may be more restrictive.' : '';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 6, display: 'inline-block', fontWeight: 700, fontSize: 12, marginBottom: 12 }}>
          🏗️ DFW FENCING PERMIT GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Fencing Permits in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Building a fence without a required permit can result in forced removal and fines. Know your city's rules before you dig a single post.</p>

        <div style={{ background: '#ef444420', border: '1px solid #ef4444', borderRadius: 12, padding: 18, marginBottom: 20 }}>
          <h2 style={{ color: '#ef4444', fontSize: 16, marginBottom: 8 }}>⚠️ Build Without a Permit = Forced Removal</h2>
          <p style={{ color: '#fca5a5', fontSize: 14, lineHeight: 1.6, margin: 0 }}>DFW cities actively enforce fence permit violations through neighbor complaints and Google Street View audits. If you build without a required permit, the city can issue a stop-work order, require full removal at your cost, and fine you up to $500/day until resolved. Always pull the permit.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[
            { icon: '📏', label: 'Typical Height Limit', value: '6 ft (rear/side)' },
            { icon: '📐', label: 'Typical Setback', value: '5 ft from line' },
            { icon: '🏡', label: 'HOA vs City', value: 'HOA governs first' },
          ].map(item => (
            <div key={item.label} style={{ background: '#112240', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{item.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 6 }}>{item.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4 }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>🔍 City-by-City Lookup</h2>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Select Your DFW City</label>
          <select value={selectedCity.name} onChange={e => setSelectedCity(DFW_CITIES.find(c => c.name === e.target.value) || DFW_CITIES[5])} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', width: '100%', marginBottom: 14 }}>
            {DFW_CITIES.map(c => <option key={c.name}>{c.name}</option>)}
          </select>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Permit Required', value: selectedCity.permitRequired ? '✅ Yes' : '❌ No' },
                { label: 'When Required', value: selectedCity.threshold },
                { label: 'Typical Permit Fee', value: selectedCity.fee },
                { label: 'Setback Requirement', value: selectedCity.setback },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ color: '#64748b', fontSize: 12 }}>{item.label}</div>
                  <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 2 }}>{item.value}</div>
                </div>
              ))}
            </div>
            {selectedCity.notes && <div style={{ marginTop: 10, color: '#94a3b8', fontSize: 13, borderTop: '1px solid #334155', paddingTop: 10 }}>📌 {selectedCity.notes}</div>}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔢 Do I Need a Permit?</h2>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Fence Height</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
            {FENCE_HEIGHTS.map(h => (
              <div key={h.label} onClick={() => setHeight(h)} style={{ background: height.value === h.value ? '#1e3a5f' : '#0A1628', border: `2px solid ${height.value === h.value ? '#F5E642' : '#334155'}`, borderRadius: 8, padding: 12, cursor: 'pointer', textAlign: 'center', fontWeight: 600 }}>
                {h.label}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <input type="checkbox" id="hoa" checked={hasHOA} onChange={e => setHasHOA(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#F5E642' }} />
            <label htmlFor="hoa" style={{ color: '#cbd5e1', cursor: 'pointer' }}>My property is in an HOA</label>
          </div>
          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 800, cursor: 'pointer', width: '100%', fontSize: 16 }}>
            Check Permit Requirement
          </button>
          {showResult && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginTop: 14, border: `2px solid ${permitNeeded ? '#ef4444' : '#22c55e'}` }}>
              <div style={{ fontWeight: 800, fontSize: 18, color: permitNeeded ? '#ef4444' : '#22c55e', marginBottom: 8 }}>
                {permitNeeded ? '⚠️ Permit Required' : '✅ Likely No Permit Required'}
              </div>
              {permitNeeded && <div style={{ color: '#cbd5e1', fontSize: 14 }}>In {selectedCity.name}, your {height.label} fence requires a permit. Estimated fee: {selectedCity.fee}. Setback: {selectedCity.setback}.</div>}
              {!permitNeeded && <div style={{ color: '#cbd5e1', fontSize: 14 }}>In {selectedCity.name}, a {height.label} fence typically does not require a permit. Always verify with your city's building dept before starting.</div>}
              {hoaNote && <div style={{ marginTop: 10, color: '#fbbf24', fontSize: 13 }}>{hoaNote}</div>}
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📋 What to Submit for a Fence Permit</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              'Completed permit application form',
              'Survey/plot plan showing property lines',
              'Fence location drawn on survey',
              'Fence height and material description',
              'Contractor license (if using a pro)',
              'HOA approval letter (if applicable)',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ color: '#F5E642', fontWeight: 800 }}>{i + 1}.</span>
                <span style={{ color: '#cbd5e1', fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
