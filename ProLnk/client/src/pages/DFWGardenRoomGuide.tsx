import { useState } from 'react';

const ROOM_TYPES = [
  { type: 'Glass Sunroom', pros: 'Max light, views, year-round use', cons: 'Expensive, DFW summer heat requires strong AC/shade', cost: '$20,000–$60,000', hvac: 'Dedicated mini-split required' },
  { type: 'Polycarbonate Panel Room', pros: 'Diffuses light (better for plants), lighter structure, less expensive', cons: 'Less elegant, some UV degradation', cost: '$10,000–$30,000', hvac: 'Mini-split or powered ventilation' },
  { type: 'Screened Garden Room', pros: 'Airflow, natural DFW breezes Mar–May and Oct–Nov, low cost', cons: 'Not usable in DFW summer (100°F+) without misting', cost: '$4,000–$15,000', hvac: 'Ceiling fans + misting system recommended' },
];

const CLIMATE_NEEDS = [
  { label: 'Year-round growing', note: 'DFW freezes are rare but real — Jan–Feb lows can hit 20°F. Climate control essential.' },
  { label: 'Spring/fall only', note: 'Screened room or polycarbonate with fans works well. DFW seasons Mar–May and Sep–Nov are ideal.' },
  { label: 'Summer tropicals', note: 'Must have cooling — DFW July averages 98°F. Mini-split is non-negotiable for summer plants.' },
];

const SIZES = ['Small (under 100 sq ft)', 'Medium (100–200 sq ft)', 'Large (200+ sq ft)'];
const SUN = ['South-facing (full DFW sun)', 'East-facing (morning sun)', 'West-facing (afternoon heat)', 'North-facing (low light)'];

export default function DFWGardenRoomGuide() {
  const [size, setSize] = useState('');
  const [sun, setSun] = useState('');
  const [climateNeed, setClimateNeed] = useState('');
  const [result, setResult] = useState<typeof ROOM_TYPES[0] | null>(null);
  const [climateNote, setClimateNote] = useState('');

  function calculate() {
    let pick = ROOM_TYPES[1];
    if (climateNeed === 'Year-round growing') pick = ROOM_TYPES[0];
    if (climateNeed === 'Spring/fall only') pick = ROOM_TYPES[2];
    const note = CLIMATE_NEEDS.find((c) => c.label === climateNeed)?.note || '';
    setResult(pick);
    setClimateNote(note);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>Garden Room & Sunroom Guide</h1>
        <p style={{ color: '#8A9BC0', fontSize: 15, marginBottom: 32 }}>
          DFW's long growing season (Mar–Nov) is ideal for a garden room — if you plan for the brutal summer heat.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🌿 DFW Garden Room Types</h2>
          {ROOM_TYPES.map((r) => (
            <div key={r.type} style={{ borderBottom: '1px solid #1E2F4A', paddingBottom: 16, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{r.type}</div>
              <div style={{ fontSize: 13, color: '#4ADE80', marginBottom: 2 }}>✅ {r.pros}</div>
              <div style={{ fontSize: 13, color: '#F87171', marginBottom: 4 }}>⚠️ {r.cons}</div>
              <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
                <span style={{ color: '#F5E642' }}>💰 {r.cost}</span>
                <span style={{ color: '#8A9BC0' }}>❄️ {r.hvac}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#F5E642' }}>☀️ DFW Climate Reality</h2>
          <p style={{ fontSize: 13, color: '#8A9BC0', marginBottom: 12 }}>
            DFW summers are brutal — 95–105°F for 3+ months. Any garden room without climate control becomes a plant oven from June–September.
          </p>
          {CLIMATE_NEEDS.map((c) => (
            <div key={c.label} style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>🌡️ {c.label}</div>
              <div style={{ fontSize: 12, color: '#6B7FA0' }}>{c.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔧 Find Your Garden Room</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, color: '#8A9BC0', display: 'block', marginBottom: 6 }}>Room Size</label>
              <select value={size} onChange={(e) => setSize(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2F4A', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="">Select size</option>
                {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#8A9BC0', display: 'block', marginBottom: 6 }}>Sun Exposure</label>
              <select value={sun} onChange={(e) => setSun(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2F4A', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="">Select exposure</option>
                {SUN.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#8A9BC0', display: 'block', marginBottom: 6 }}>Climate Control Need</label>
              <select value={climateNeed} onChange={(e) => setClimateNeed(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2F4A', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="">Select growing season</option>
                {CLIMATE_NEEDS.map((c) => <option key={c.label} value={c.label}>{c.label}</option>)}
              </select>
            </div>
            <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Get Recommendation →
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🌿 {result.type}</div>
              <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 4 }}>💰 Est. Cost: {result.cost}</div>
              <div style={{ fontSize: 13, color: '#8A9BC0', marginBottom: 8 }}>❄️ HVAC: {result.hvac}</div>
              {climateNote && <div style={{ fontSize: 13, color: '#6B7FA0', borderTop: '1px solid #1E2F4A', paddingTop: 10 }}>🌡️ {climateNote}</div>}
            </div>
          )}
        </div>

        <div style={{ fontSize: 12, color: '#4A5A70', textAlign: 'center' }}>
          DFW city permits vary — check your municipality before construction begins.
        </div>
      </div>
    </div>
  );
}
