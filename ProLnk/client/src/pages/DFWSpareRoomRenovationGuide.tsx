import { useState } from 'react';

const CONVERSIONS = [
  {
    use: 'Home Office',
    permits: 'None (under 120 sq ft), electrical permit if adding circuits',
    cost: '$3,000–$12,000',
    valueImpact: '+$8,000–$20,000',
    notes: 'Dedicated circuit, closet conversion to storage, sound insulation recommended',
  },
  {
    use: 'Nursery',
    permits: 'None typically',
    cost: '$1,500–$6,000',
    valueImpact: '+$2,000–$5,000',
    notes: 'Low-VOC paint required, outlet covers, blackout shades for DFW summer sun',
  },
  {
    use: 'Guest Room',
    permits: 'None typically',
    cost: '$2,000–$8,000',
    valueImpact: '+$5,000–$15,000',
    notes: 'Egress window may be required by code in some DFW cities',
  },
  {
    use: 'Workout Room',
    permits: 'None typically',
    cost: '$2,500–$10,000',
    valueImpact: '+$3,000–$8,000',
    notes: 'Rubber flooring, mirror wall, extra ventilation for DFW heat',
  },
  {
    use: 'Rental / ADU',
    permits: 'Building + zoning permit required, separate entrance may be needed',
    cost: '$15,000–$45,000',
    valueImpact: '+$30,000–$80,000',
    notes: 'Check HOA rules, rental income $800–$1,800/mo in DFW market',
  },
];

const TIERS = ['Under $300K', '$300K–$500K', '$500K–$750K', '$750K+'];

export default function DFWSpareRoomRenovationGuide() {
  const [currentUse, setCurrentUse] = useState('');
  const [targetUse, setTargetUse] = useState('');
  const [tier, setTier] = useState('');
  const [result, setResult] = useState<typeof CONVERSIONS[0] | null>(null);

  function calculate() {
    const found = CONVERSIONS.find((c) => c.use === targetUse);
    setResult(found || null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>Spare Room Renovation Guide</h1>
        <p style={{ color: '#8A9BC0', fontSize: 15, marginBottom: 32 }}>
          Convert your unused spare bedroom into a high-value space — DFW permits, costs, and ROI by use.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🏠 Conversion Options</h2>
          {CONVERSIONS.map((c) => (
            <div key={c.use} style={{ borderBottom: '1px solid #1E2F4A', paddingBottom: 16, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{c.use}</div>
              <div style={{ fontSize: 13, color: '#8A9BC0', marginBottom: 4 }}>📋 Permits: {c.permits}</div>
              <div style={{ display: 'flex', gap: 16, fontSize: 13 }}>
                <span style={{ color: '#F5E642' }}>💰 {c.cost}</span>
                <span style={{ color: '#4ADE80' }}>📈 {c.valueImpact}</span>
              </div>
              <div style={{ fontSize: 12, color: '#6B7FA0', marginTop: 4 }}>{c.notes}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔧 Get Your Recommendation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, color: '#8A9BC0', display: 'block', marginBottom: 6 }}>Current Room Use</label>
              <input value={currentUse} onChange={(e) => setCurrentUse(e.target.value)} placeholder="e.g. Empty / Storage / Old office"
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2F4A', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#8A9BC0', display: 'block', marginBottom: 6 }}>Target Use</label>
              <select value={targetUse} onChange={(e) => setTargetUse(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2F4A', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="">Select target use</option>
                {CONVERSIONS.map((c) => <option key={c.use} value={c.use}>{c.use}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#8A9BC0', display: 'block', marginBottom: 6 }}>DFW Home Value Tier</label>
              <select value={tier} onChange={(e) => setTier(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2F4A', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="">Select tier</option>
                {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Get Recommendation →
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>✅ {result.use} Conversion</div>
              <div style={{ fontSize: 13, color: '#8A9BC0', marginBottom: 6 }}>📋 {result.permits}</div>
              <div style={{ fontSize: 14, color: '#F5E642', marginBottom: 4 }}>Est. Cost: {result.cost}</div>
              <div style={{ fontSize: 14, color: '#4ADE80', marginBottom: 8 }}>Value Impact: {result.valueImpact}</div>
              <div style={{ fontSize: 13, color: '#6B7FA0' }}>💡 {result.notes}</div>
            </div>
          )}
        </div>

        <div style={{ fontSize: 12, color: '#4A5A70', textAlign: 'center' }}>
          Estimates based on DFW metro averages. Consult local city permit office for exact requirements.
        </div>
      </div>
    </div>
  );
}
