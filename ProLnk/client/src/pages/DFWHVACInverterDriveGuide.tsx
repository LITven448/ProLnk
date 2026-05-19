import { useState } from 'react';

const homeTypes = ['1970s ranch (1,400 sq ft)', '1990s two-story (2,800 sq ft)', 'New construction (3,500 sq ft)', 'Older craftsman (1,800 sq ft)', 'Large estate (5,000 sq ft)'];
const problems = ['High summer electric bills', 'Humidity never feels right', 'Uneven cooling room to room', 'System short-cycles constantly', 'Noisy operation'];

const benefitMatrix: Record<string, Record<string, { benefit: string; cost: string }>> = {
  '1970s ranch (1,400 sq ft)': {
    'High summer electric bills': { benefit: 'Variable-speed compressor runs at 40–60% capacity most DFW summer days instead of blasting full power. Typical savings: $35–55/mo June–Sept.', cost: '$4,200–$5,800 installed (vs $2,800 for single-stage)' },
    'Humidity never feels right': { benefit: 'Inverter runs longer at low speed, pulling far more moisture per BTU. DFW summers average 75% RH — inverter keeps indoor RH at 45–50%.', cost: '$4,200–$5,800 installed' },
    'Uneven cooling room to room': { benefit: 'Consistent low-speed airflow eliminates the blast-and-stop cycle that creates hot pockets. Pairs well with zoning.', cost: '$4,200–$5,800 installed' },
    'System short-cycles constantly': { benefit: 'Inverter modulates to match actual load — no more 8-minute cycles. Compressor life extends 5–7 years.', cost: '$4,200–$5,800 installed' },
    'Noisy operation': { benefit: 'At 40% speed, inverter outdoor units run at ~55 dB vs 72 dB for single-stage. Noticeable difference.', cost: '$4,200–$5,800 installed' },
  },
  '1990s two-story (2,800 sq ft)': {
    'High summer electric bills': { benefit: 'Two-story DFW homes have brutal upstairs heat load. Inverter matches load precisely — saves $70–110/mo in peak cooling season.', cost: '$6,500–$9,500 installed' },
    'Humidity never feels right': { benefit: 'Longer run times at lower capacity are ideal for DFW\’s sticky spring and fall. Humidity control improves dramatically on two-story layouts.', cost: '$6,500–$9,500 installed' },
    'Uneven cooling room to room': { benefit: 'Upstairs/downstairs delta is the #1 complaint. Inverter reduces supply air temperature swings that cause stratification.', cost: '$6,500–$9,500 installed' },
    'System short-cycles constantly': { benefit: 'Oversized single-stage systems short-cycle in two-stories constantly. Inverter self-corrects to actual load within minutes.', cost: '$6,500–$9,500 installed' },
    'Noisy operation': { benefit: 'Variable speed means quieter nights even when DFW temps are still 90°F at midnight.', cost: '$6,500–$9,500 installed' },
  },
  'New construction (3,500 sq ft)': {
    'High summer electric bills': { benefit: 'Better insulation + inverter = dramatic efficiency. Expect SEER2 ratings of 20–26 vs 14–16 for base systems. Savings: $90–140/mo peak.', cost: '$8,500–$13,000 installed' },
    'Humidity never feels right': { benefit: 'New construction is often over-insulated and under-ventilated. Inverter\’s longer run times and variable CFM improve fresh air mixing.', cost: '$8,500–$13,000 installed' },
    'Uneven cooling room to room': { benefit: 'Open floor plans with high ceilings need consistent airflow — inverter\’s modulating fan handles this far better than staged systems.', cost: '$8,500–$13,000 installed' },
    'System short-cycles constantly': { benefit: 'Builders often oversize systems. Inverter solves short-cycling without needing a smaller unit.', cost: '$8,500–$13,000 installed' },
    'Noisy operation': { benefit: 'Premium inverter compressors use scroll technology with vibration dampening — near-silent at part load.', cost: '$8,500–$13,000 installed' },
  },
  'Older craftsman (1,800 sq ft)': {
    'High summer electric bills': { benefit: 'Older homes leak more. Inverter compensates by running continuously at low speed rather than cycling against heat infiltration. Saves $45–70/mo.', cost: '$5,200–$7,000 installed' },
    'Humidity never feels right': { benefit: 'Craftsman homes with original windows and doors let in DFW humidity. Inverter\’s extended run time is the best single upgrade for comfort.', cost: '$5,200–$7,000 installed' },
    'Uneven cooling room to room': { benefit: 'Original ductwork in older homes is often undersized. Inverter\’s lower static pressure at part load partially compensates.', cost: '$5,200–$7,000 installed' },
    'System short-cycles constantly': { benefit: 'Short-cycling destroys comfort in smaller older homes. Inverter eliminates the problem without expensive duct work.', cost: '$5,200–$7,000 installed' },
    'Noisy operation': { benefit: 'Old single-stage units are notoriously loud. Modern inverter replacement is a dramatic improvement.', cost: '$5,200–$7,000 installed' },
  },
  'Large estate (5,000 sq ft)': {
    'High summer electric bills': { benefit: 'At this size, inverter savings are substantial: $150–250/mo during DFW cooling season. Payback period 4–6 years.', cost: '$14,000–$22,000 installed (multi-unit)' },
    'Humidity never feels right': { benefit: 'Large homes with multiple zones need independent humidity control. Multi-head inverter systems handle this room by room.', cost: '$14,000–$22,000 installed (multi-unit)' },
    'Uneven cooling room to room': { benefit: 'At 5,000 sq ft, single-system zoning fails. Multi-unit inverter architecture is the correct solution.', cost: '$14,000–$22,000 installed (multi-unit)' },
    'System short-cycles constantly': { benefit: 'Large homes with single oversized units short-cycle severely. Multi-unit inverter design eliminates this completely.', cost: '$14,000–$22,000 installed (multi-unit)' },
    'Noisy operation': { benefit: 'Multiple smaller, quieter inverter units replace one massive loud unit. Night-and-day difference in large homes.', cost: '$14,000–$22,000 installed (multi-unit)' },
  },
};

const topSystems = [
  { name: 'Mitsubishi Hyper-Heat MXZ', seer: '24–28 SEER2', note: 'Best humidity control, quiet, premium price' },
  { name: 'Daikin Fit (DX20VC)', seer: '20–24 SEER2', note: 'Compact footprint, excellent for DFW heat loads' },
  { name: 'Carrier Infinity 26', seer: '26 SEER2', note: 'Top efficiency, best rebate availability in DFW' },
  { name: 'Lennox XC25', seer: '26 SEER2', note: 'Industry-leading efficiency, premium cost' },
  { name: 'Trane XV21', seer: '21 SEER2', note: 'Reliable, widespread DFW service network' },
];

export default function DFWHVACInverterDriveGuide() {
  const [homeType, setHomeType] = useState('');
  const [problem, setProblem] = useState('');

  const result = homeType && problem ? benefitMatrix[homeType]?.[problem] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Inverter Drive Systems</h1>
        <p style={{ color: '#A0AEC0', marginBottom: '2rem', fontSize: '0.97rem' }}>Variable-speed compressor technology — why it matters more in DFW than almost anywhere else.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>⚡ What Is an Inverter Drive?</h2>
          <p style={{ color: '#CBD5E0', fontSize: '0.93rem', lineHeight: 1.7 }}>Traditional HVAC compressors are binary — full on or full off. An inverter drive continuously varies compressor speed from ~25% to 100% of capacity. In DFW, where the cooling season runs March through October, a system that can operate at 40% capacity on a 90°F day (instead of blasting full power) cuts energy use dramatically and controls humidity far better than any fixed-speed system.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>🏆 Top Inverter Systems for DFW</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {topSystems.map(s => (
              <div key={s.name} style={{ background: '#162035', borderRadius: 8, padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{s.name}</div>
                  <div style={{ color: '#A0AEC0', fontSize: '0.82rem' }}>{s.note}</div>
                </div>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '0.2rem 0.7rem', fontWeight: 700, fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{s.seer}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>🔍 Your DFW Situation → Inverter Benefit</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#A0AEC0', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>HOME TYPE</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', background: '#162035', color: '#E8EDF5', border: '1px solid #2D4A6E', borderRadius: 8, padding: '0.6rem 0.8rem', fontSize: '0.88rem' }}>
                <option value=''>Select home type...</option>
                {homeTypes.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#A0AEC0', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.4rem' }}>YOUR PROBLEM</label>
              <select value={problem} onChange={e => setProblem(e.target.value)} style={{ width: '100%', background: '#162035', color: '#E8EDF5', border: '1px solid #2D4A6E', borderRadius: 8, padding: '0.6rem 0.8rem', fontSize: '0.88rem' }}>
                <option value=''>Select problem...</option>
                {problems.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#162035', borderRadius: 10, padding: '1.2rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>INVERTER BENEFIT FOR YOUR SITUATION</div>
              <p style={{ color: '#CBD5E0', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>{result.benefit}</p>
              <div style={{ color: '#A0AEC0', fontSize: '0.82rem' }}>💰 <strong style={{ color: '#F5E642' }}>Typical installed cost:</strong> {result.cost}</div>
            </div>
          )}
        </div>
        <div style={{ color: '#4A6080', fontSize: '0.78rem', textAlign: 'center' }}>ProLnk • DFW HVAC Inverter Drive Guide • Costs are 2026 DFW market estimates</div>
      </div>
    </div>
  );
}
