import { useState } from 'react';

const ISSUES = [
  { issue: 'Heaving / cracking at street edge', cause: 'DFW clay soil expansion — most common issue in DFW', fix: 'Full curb cut replacement with rebar-reinforced concrete + expansion joints', cost: '$1,500–$4,500', permit: 'Required in most DFW cities — must match city curb spec' },
  { issue: 'Steep angle / scraping low cars', cause: 'Original driveway grade too steep or settled unevenly', fix: 'Grinding high spots + asphalt overlay, or full re-pour with grade correction', cost: '$800–$3,000', permit: 'Usually not required for overlay, required for full re-pour' },
  { issue: 'Crumbling asphalt approach', cause: 'Age, sun damage, tree roots', fix: 'Remove and replace with concrete (preferred in DFW for longevity) or new asphalt', cost: '$1,200–$3,500', permit: 'Permit required if touching city curb or sidewalk' },
  { issue: 'Missing or broken curb cut', cause: 'Original home had no formal curb cut, or HOA/city change', fix: 'Cut and pour new curb cut per city spec — must match pavement width', cost: '$2,000–$5,500', permit: 'Required — city issues curb cut permit, may require city inspector sign-off' },
  { issue: 'Drainage issue at driveway entry', cause: 'Water pools at street edge during DFW rain events', fix: 'French drain + regrading, or channel drain at driveway mouth', cost: '$1,000–$4,000', permit: 'May require drainage permit depending on city' },
];

const DFW_CITIES = ['Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney', 'Allen', 'Garland', 'Irving', 'Arlington', 'Denton', 'Carrollton', 'Richardson', 'Lewisville', 'Other DFW City'];

const MATERIAL_COMPARE = [
  { material: 'Concrete', pros: 'Lasts 30–40 years in DFW, resists clay heave better, city preferred', cons: 'Higher upfront cost, cracks still occur with extreme clay movement', cost: '$6–$10/sq ft' },
  { material: 'Asphalt', pros: 'Lower cost, flexible (handles some clay movement)', cons: 'Requires sealing every 3–5 years, DFW summer heat softens asphalt', cost: '$3–$6/sq ft' },
];

export default function DFWCarRampGuide() {
  const [issue, setIssue] = useState('');
  const [city, setCity] = useState('');
  const [result, setResult] = useState<typeof ISSUES[0] | null>(null);

  function calculate() {
    const found = ISSUES.find((i) => i.issue === issue);
    setResult(found || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>Driveway Approach & Curb Cut Guide</h1>
        <p style={{ color: '#8A9BC0', fontSize: 15, marginBottom: 32 }}>
          DFW clay soil heaves driveways at the street edge more than almost anywhere in Texas. Here's what to do about it.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>⚠️ Why DFW Driveways Fail at the Street</h2>
          <p style={{ fontSize: 13, color: '#8A9BC0', marginBottom: 0 }}>
            DFW sits on expansive black clay soil (Blackland Prairie). This soil swells when wet and shrinks when dry — causing driveway edges to heave upward, crack, or create lips that catch car bumpers. Summer drought (June–September) causes major shrinkage; winter rains cause swelling. Expansion joints and proper sub-base are critical.
          </p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔩 Material Comparison</h2>
          {MATERIAL_COMPARE.map((m) => (
            <div key={m.material} style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{m.material} <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 400 }}>— {m.cost}</span></div>
              <div style={{ fontSize: 12, color: '#4ADE80', marginBottom: 2 }}>✅ {m.pros}</div>
              <div style={{ fontSize: 12, color: '#F87171′ }}>⚠️ {m.cons}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔧 Diagnose Your Issue</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, color: '#8A9BC0', display: 'block', marginBottom: 6 }}>Current Issue</label>
              <select value={issue} onChange={(e) => setIssue(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2F4A', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="">Select your issue</option>
                {ISSUES.map((i) => <option key={i.issue} value={i.issue}>{i.issue}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#8A9BC0', display: 'block', marginBottom: 6 }}>Your DFW City</label>
              <select value={city} onChange={(e) => setCity(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2F4A', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="">Select city</option>
                {DFW_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Get Repair Plan →
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>🔩 {result.fix}</div>
              <div style={{ fontSize: 13, color: '#8A9BC0', marginBottom: 4 }}>🌧️ Cause: {result.cause}</div>
              <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 4 }}>💰 Est. Cost: {result.cost}</div>
              <div style={{ fontSize: 13, color: '#6B7FA0′ }}>📋 Permit: {result.permit}</div>
              {city && <div style={{ fontSize: 12, color: '#4ADE80', marginTop: 10 }}>📍 {city}: Check city public works or permitting portal for curb cut spec requirements before work begins.</div>}
            </div>
          )}
        </div>

        <div style={{ fontSize: 12, color: '#4A5A70', textAlign: 'center' }}>
          Curb cuts touch city ROW — always pull the required permit and confirm contractor is licensed in your DFW city.
        </div>
      </div>
    </div>
  );
}
