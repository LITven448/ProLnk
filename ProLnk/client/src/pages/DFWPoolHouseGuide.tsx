import { useState } from 'react';

const SCOPES = [
  { label: 'Basic (Bath + Storage)', cost: '$25,000–$50,000', sqft: '150–250 sq ft', permits: 'Building permit, plumbing permit', features: 'Half bath, changing area, equipment storage' },
  { label: 'Standard (Full Bath + Lounge)', cost: '$50,000–$100,000', sqft: '250–400 sq ft', permits: 'Building, plumbing, electrical permits', features: 'Full bath, changing room, mini-fridge, covered lounge area' },
  { label: 'Premium (Full Amenities + Outdoor Kitchen)', cost: '$100,000–$200,000+', sqft: '400–700 sq ft', permits: 'Building, plumbing, electrical, gas permits', features: 'Full bath, lounge, outdoor kitchen, mini-split AC, smart controls' },
];

const POOL_TYPES = ['In-ground concrete', 'In-ground fiberglass', 'Above-ground', 'No pool yet (planning both)'];
const LOT_SIZES = ['Under 1/4 acre', '1/4 to 1/2 acre', '1/2 to 1 acre', 'Over 1 acre'];
const HOA = ['No HOA', 'HOA — pool house allowed', 'HOA — approval required', 'HOA — restrictions unclear'];
const BUDGETS = ['Under $50K', '$50K–$100K', '$100K–$200K', '$200K+'];

function getScope(budget: string, hoa: string) {
  if (budget === 'Under $50K') return SCOPES[0];
  if (budget === '$50K–$100K') return SCOPES[1];
  return SCOPES[2];
}

export default function DFWPoolHouseGuide() {
  const [poolType, setPoolType] = useState('');
  const [lotSize, setLotSize] = useState('');
  const [hoa, setHoa] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<typeof SCOPES[0] | null>(null);
  const [hoaNote, setHoaNote] = useState('');

  function calculate() {
    if (!budget) return;
    const scope = getScope(budget, hoa);
    const note = hoa === 'HOA — approval required'
      ? '⚠️ Submit architectural review to HOA before any construction. Typical DFW HOA approval takes 30–60 days.'
      : hoa === 'HOA — restrictions unclear'
      ? '⚠️ Pull your CC&Rs and check for outbuilding height, setback, and appearance rules before proceeding.'
      : hoa === 'No HOA'
      ? '✅ No HOA restrictions — check city zoning for setback and height requirements.'
      : '✅ HOA allows pool houses — confirm specific size and appearance requirements.';
    setResult(scope);
    setHoaNote(note);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>Pool House Guide for DFW</h1>
        <p style={{ color: '#8A9BC0', fontSize: 15, marginBottom: 32 }}>
          Pool houses add value and function in DFW — a market where backyard entertaining is part of the lifestyle. Permits, HOA, and budget all factor in.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🏊 Pool House Scope Options</h2>
          {SCOPES.map((s) => (
            <div key={s.label} style={{ borderBottom: '1px solid #1E2F4A', paddingBottom: 16, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 13, color: '#8A9BC0', marginBottom: 4 }}>📐 {s.sqft} &nbsp;|&nbsp; 💰 {s.cost}</div>
              <div style={{ fontSize: 13, color: '#6B7FA0', marginBottom: 4 }}>📋 {s.permits}</div>
              <div style={{ fontSize: 13, color: '#4ADE80′ }}>✅ {s.features}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>📋 DFW Permit & HOA Notes</h2>
          <ul style={{ fontSize: 13, color: '#8A9BC0', paddingLeft: 18, margin: 0 }}>
            <li style={{ marginBottom: 8 }}>Most DFW cities require a building permit for any structure over 120 sq ft</li>
            <li style={{ marginBottom: 8 }}>Plumbing and electrical permits are separate from the building permit</li>
            <li style={{ marginBottom: 8 }}>Setback requirements vary — typically 5–10 ft from property lines in DFW</li>
            <li style={{ marginBottom: 8 }}>HOA approval can take 30–90 days — plan ahead</li>
            <li>DFW HOAs often restrict roof height, exterior materials, and color to match main home</li>
          </ul>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔧 Get Your Pool House Plan</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'Pool Type', val: poolType, set: setPoolType, opts: POOL_TYPES },
              { label: 'Lot Size', val: lotSize, set: setLotSize, opts: LOT_SIZES },
              { label: 'HOA Status', val: hoa, set: setHoa, opts: HOA },
              { label: 'Budget', val: budget, set: setBudget, opts: BUDGETS },
            ].map(({ label, val, set, opts }) => (
              <div key={label}>
                <label style={{ fontSize: 13, color: '#8A9BC0', display: 'block', marginBottom: 6 }}>{label}</label>
                <select value={val} onChange={(e) => set(e.target.value)}
                  style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2F4A', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                  <option value="">Select {label.toLowerCase()}</option>
                  {opts.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Get Pool House Plan →
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏊 {result.label}</div>
              <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 4 }}>💰 {result.cost} &nbsp;|&nbsp; 📐 {result.sqft}</div>
              <div style={{ fontSize: 13, color: '#8A9BC0', marginBottom: 8 }}>📋 {result.permits}</div>
              <div style={{ fontSize: 13, color: '#4ADE80', marginBottom: 10 }}>✅ {result.features}</div>
              {hoaNote && <div style={{ fontSize: 13, color: '#6B7FA0', borderTop: '1px solid #1E2F4A', paddingTop: 10 }}>{hoaNote}</div>}
            </div>
          )}
        </div>

        <div style={{ fontSize: 12, color: '#4A5A70', textAlign: 'center' }}>
          Costs are DFW metro estimates. Get 3 contractor bids and verify permits with your local city.
        </div>
      </div>
    </div>
  );
}
