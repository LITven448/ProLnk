import { useState } from 'react';

export default function DFWHVACCFMRooms2026() {
  const [roomType, setRoomType] = useState('');
  const [sqft, setSqft] = useState('200');
  const [result, setResult] = useState<{ cfm: number; notes: string } | null>(null);

  const roomTypes = [
    { id: 'master', label: '🛏️ Master Bedroom', multiplier: 1.15, note: 'Master bedrooms in DFW often sit at end of duct run — add 15% for friction loss over long runs. Oversized rooms common in DFW construction.' },
    { id: 'bedroom', label: '🚪 Standard Bedroom', multiplier: 1.0, note: 'Standard bedrooms use base 1 CFM/sqft. Ensure supply register faces longest wall for even distribution. Two registers for rooms over 180 sqft.' },
    { id: 'living', label: '🛋️ Open Living Area', multiplier: 1.1, note: 'Open-concept DFW homes require 10% more CFM — heat rises and stratifies. Consider zoning for dual-zone systems if over 400 sqft open area.' },
    { id: 'kitchen', label: '🍳 Kitchen', multiplier: 1.3, note: 'Kitchen HVAC fights cooking heat loads. Add 30% above base CFM. Ensure range hood is exhausted outside — recirculating hoods do not reduce HVAC load.' },
    { id: 'office', label: '💻 Home Office', multiplier: 1.2, note: 'Home offices have high internal heat gains from electronics. Add 20% for computer/monitor loads. Consider dedicated mini-split for offices over 150 sqft.' },
  ];

  const handleCalculate = () => {
    const rt = roomTypes.find(r => r.id === roomType);
    if (!rt || !sqft) return;
    const base = parseInt(sqft) * rt.multiplier;
    setResult({ cfm: Math.round(base), notes: rt.note });
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🌡️ DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>Room CFM Requirements Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Properly sized supply registers are critical in DFW — undersized CFM means rooms that never reach setpoint at 105°F. Calculate your room requirements here.</p>

        <div style={{ background: '#0f2035', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem' }}>📐 DFW CFM Fundamentals</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['📏','1 CFM Per Square Foot','Base rule for DFW residential. Manual J load calculations may revise this, but 1 CFM/sqft is the starting point for supply register sizing in Dallas-Fort Worth climate.'],
              ['🏠','DFW Oversized Rooms','DFW homes built 1990-2010 often have large master suites (300-500 sqft) at end of duct runs. These rooms need extra CFM and may require booster fans or dedicated branch.'],
              ['🌬️','Open vs Closed Concept','Open-concept reduces compartmentalization — air mixes more freely. Closed rooms trap heat faster. Adjust register placement and CFM based on wall configuration.'],
              ['🔧','Register Sizing','CFM determines register size: 4x10 handles ~75 CFM, 6x10 handles ~100 CFM, 6x14 handles ~150 CFM. Velocity should stay under 600 FPM to avoid noise.'],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                <div><div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{title}</div><div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem' }}>🧮 CFM Calculator</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Room Type</label>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {roomTypes.map(r => (
                <button key={r.id} onClick={() => setRoomType(r.id)} style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: '1px solid', borderColor: roomType === r.id ? '#F5E642′ : '#1e3a5f', background: roomType === r.id ? '#1a2f4a' : '#0A1628', color: '#fff', textAlign: ’left', cursor: 'pointer', fontSize: '0.9rem' }}>{r.label}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>Room Size (sq ft)</label>
            <input type="number" value={sqft} onChange={e => setSqft(e.target.value)} min="50″ max="2000" style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: '0.95rem' }} />
          </div>
          <button onClick={handleCalculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>Calculate CFM</button>
          {result && (
            <div style={{ marginTop: '1.25rem', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #F5E642', background: '#0A1628′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.4rem', marginBottom: '0.4rem' }}>{result.cfm} CFM Required</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{result.notes}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: '0.4rem' }}>🏠 Get a DFW HVAC Pro</div>
          <div style={{ color: '#0A1628', fontSize: '0.9rem' }}>ProLnk connects you with DFW HVAC techs who perform proper Manual J load calculations and register sizing.</div>
        </div>
      </div>
    </div>
  );
}
