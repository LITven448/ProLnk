import { useState } from 'react';

const months = [
  { id: '2', label: 'February', actions: ['Cedar and oak pollen season — pollen coats shingles and collects in gutters', 'Check gutters for pollen paste buildup before spring rains', 'Clear any winter debris from valleys and around chimney', 'Look for lifted or curled shingles from winter wind events'] },
  { id: '4', label: 'April–June', actions: ['DFW hail season is active — inspect after every significant storm', 'Check for granule loss in gutters (sign of hail impact)', 'Look for bruised or cracked shingles — subtle dents indicate damage', 'Call a pro for a post-storm inspection before filing insurance claim'] },
  { id: '7', label: 'July', actions: ['Peak attic heat — check ventilation is working (ridge + soffit vents)', 'Attic temps above 150°F accelerate shingle degradation', 'Inspect ridge cap for cracking in heat', 'Ensure solar attic fans or powered vents are operational'] },
  { id: '10', label: 'October', actions: ['Oak leaf drop begins — gutters fill fast in DFW', 'Clean gutters by mid-October before major leaf fall peak', 'Check that downspouts are directing water away from foundation', 'Trim overhanging limbs before winter ice storm risk'] },
  { id: '11', label: 'November', actions: ['Before first freeze: inspect all flashing around chimney, skylights, vents', 'Seal any lifted flashing with roofing cement before ice season', 'Check pipe boots (plumbing vent seals) — common DFW leak point', 'Schedule roof inspection if 5+ years since last professional check'] },
];

export default function DFWRoofMonthByMonth2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const month = months.find(m => m.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: '0.5rem' }}>DFW Roof Guide 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>Month-by-Month Roof Care for DFW</h1>
        <p style={{ color: '#9BA3B2', marginBottom: '2rem', lineHeight: 1.6 }}>DFW roofs face hail in spring, extreme heat in summer, pollen in winter, and freeze risks December–February. Knowing what to watch each month prevents leaks and insurance claim surprises.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🌩️ DFW Roof Risk Calendar</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[['Feb–Mar', 'Pollen gutters', '🌿'], ['Apr–Jun', 'Hail season', '⛈️'], ['Jul–Sep', 'Heat degradation', '☀️'], ['Oct–Nov', 'Leaf clogs + freeze prep', '🍂'], ['Dec–Jan', 'Ice dam & wind risk', '❄️']].map(([period, risk, icon]) => (
              <div key={period} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', borderLeft: '3px solid #F5E642' }}>
                <div style={{ fontSize: '1.2rem' }}>{icon} <span style={{ color: '#F5E642', fontWeight: 700 }}>{period}</span></div>
                <div style={{ fontSize: '0.85rem', color: '#C5CAD8', marginTop: '0.25rem' }}>{risk}</div>
              </div>
            ))}
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontSize: '1.2rem' }}>🔥 <span style={{ color: '#F5E642', fontWeight: 700 }}>Year-round</span></div>
              <div style={{ fontSize: '0.85rem', color: '#C5CAD8', marginTop: '0.25rem' }}>Attic ventilation issues</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📅 Select Your Month → Roof Care Actions</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {months.map(m => (
              <button key={m.id} onClick={() => setSelected(m.id)} style={{ background: selected === m.id ? '#F5E642' : '#0A1628', color: selected === m.id ? '#0A1628' : '#E8EAF0', border: '1px solid #F5E642', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}>{m.label}</button>
            ))}
          </div>
          {month && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>🏠 {month.label} Roof Actions</div>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 2, color: '#C5CAD8' }}>
                {month.actions.map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🚨 Call a Roofer Immediately If You See</h2>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 2, color: '#C5CAD8' }}>
            <li>Active interior leak or water stains on ceiling</li>
            <li>Missing shingles after any storm</li>
            <li>Sagging deck between rafters</li>
            <li>Granule accumulation filling a coffee cup or more from downspout</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', color: '#9BA3B2', fontSize: '0.85rem' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> — DFW's hail and roofing specialist network
        </div>
      </div>
    </div>
  );
}