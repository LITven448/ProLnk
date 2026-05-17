import { useState } from 'react';

const areas = [
  { id: 'westfw', label: '🏘️ West Fort Worth / Weatherford Corridor', risk: 'HIGHEST RISK', desc: 'The western edge of the DFW metro sits directly in the path where most tornado-producing supercells enter the region. Aledo, Weatherford, and west Fort Worth see frequent tornado warnings and occasional confirmed touchdowns.', shelter: 'If you are in this corridor, a reinforced safe room or storm shelter is worth serious consideration. FEMA offers grants for safe room installation in high-risk areas.', roomTip: 'Interior closet or bathroom on the lowest floor, away from all windows. Protect your head with a mattress or blankets.' },
  { id: 'arlington', label: '🏙️ Arlington / Mid-Cities', risk: 'HIGH RISK', desc: 'The mid-cities corridor (Arlington, Grand Prairie, Irving) sits in the heart of the traditional DFW storm track. Multiple significant tornadoes have touched down across this area, including the 2000 Fort Worth tornado outbreak.', shelter: 'Know in advance which room is your shelter. Practice getting there in under 60 seconds. During active warnings, shelter immediately — do not wait for confirmation.', roomTip: 'Interior hallway, interior bathroom, or closet on lowest floor. Stay away from garage — it has no structural support for tornado winds.' },
  { id: 'northdallas', label: '🏢 North Dallas / Garland / Mesquite', risk: 'HIGH RISK', desc: 'North and east Dallas suburbs sit in the exit path of many DFW tornado events. The 2019 Dallas tornado outbreak caused over $2B in losses across this zone, striking populated areas with little warning time.', shelter: 'Northeast suburbs can see tornadoes with minimal warning time as storms accelerate. A NOAA weather radio alarm is essential — phone alerts may lag by several minutes.', roomTip: 'Lowest floor, interior room. If in an apartment building, go to the lowest floor interior hallway or a designated shelter.' },
  { id: 'mobile', label: '🚗 Mobile Home / Manufactured Housing', risk: 'EXTREME RISK', desc: 'Mobile and manufactured homes offer essentially no protection in a tornado — even EF0 and EF1 tornadoes can destroy them completely. DFW has a significant manufactured housing population in outer ring communities.', shelter: 'Never shelter in a mobile home during a tornado warning. Identify your nearest permanent structure shelter in advance — community centers, schools, brick buildings. Leave immediately when a warning is issued.', roomTip: 'Evacuate before the storm. If caught outside, lie flat in a low ditch away from trees and cars. Do not stay in the vehicle.' },
];

export default function DFWTornadoRiskByAreaGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = areas.find(a => a.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '0.4rem 1rem', display: 'inline-block', fontWeight: 700, fontSize: '0.8rem', marginBottom: '1rem' }}>DFW SAFETY GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🌪️ DFW Tornado Risk by Area Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>DFW sits in one of the most tornado-active regions in the country. The traditional storm path runs west Fort Worth to northeast Dallas — but no area is fully immune. Know your risk and your safe room before storm season.</p>

        <div style={{ background: '#1e0a0a', border: '1px solid #ef4444', borderRadius: 12, padding: '1.2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#ef4444', fontSize: '1rem', marginBottom: '0.5rem' }}>🚨 Universal Safe Room Rule</h2>
          <p style={{ color: '#fca5a5', margin: 0, lineHeight: 1.6 }}>Interior room, lowest floor, away from all windows and exterior walls. A small interior bathroom or closet with no windows is ideal. Put as many walls between you and the outside as possible.</p>
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>Select your DFW area for tornado risk profile:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {areas.map(a => (
            <button key={a.id} onClick={() => setSelected(selected === a.id ? null : a.id)} style={{ background: selected === a.id ? '#F5E642' : '#112240', color: selected === a.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '0.9rem', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '0.85rem', transition: 'all 0.2s' }}>{a.label}</button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#112240', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: '#F5E642', margin: 0, fontSize: '1rem' }}>{active.label}</h3>
              <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 20, padding: '0.2rem 0.7rem', fontWeight: 800, fontSize: '0.8rem' }}>{active.risk}</span>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: '1rem' }}>{active.desc}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.8rem', marginBottom: '0.75rem' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>🏠 Shelter Strategy: </span>
              <span style={{ color: '#94a3b8' }}>{active.shelter}</span>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.8rem' }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>🚪 Safe Room Tip: </span>
              <span style={{ color: '#94a3b8' }}>{active.roomTip}</span>
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>🔧 Storm Damage Repairs via ProLnk</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>After a tornado event, only use licensed, local contractors. ProLnk verifies every pro — no out-of-state plates, no door-knockers, no cash-only schemes.</p>
        </div>
      </div>
    </div>
  );
}