import { useState } from 'react';

export default function DFWHVACCoilCleaningGuide2026() {
  const [selection, setSelection] = useState('');
  const [result, setResult] = useState('');

  const options = [
    { id: 'condenser-cottonwood', label: '🌱 Outdoor condenser — cottonwood/debris clogged (spring)' },
    { id: 'condenser-dirty', label: '🌀 Outdoor condenser — generally dirty, reduced airflow' },
    { id: 'evaporator-frozen', label: '🧊 Indoor evaporator coil — freezing up' },
    { id: 'evaporator-musty', label: '👃 Indoor evaporator coil — musty smell from vents' },
    { id: 'efficiency-loss', label: '📉 Noticeably higher electric bills, same usage' },
    { id: 'post-inspection', label: '🔍 Tech said coils are dirty during tune-up' },
  ];

  const recommendations: Record<string, string> = {
    'condenser-cottonwood': '🌿 DIY SAFE — Condenser coil clogged with cottonwood is the most common DFW spring HVAC problem. Turn off power at disconnect. Use a garden hose to spray from inside the unit outward (top to bottom, inside-out) to push debris out. Do not use a pressure washer. Repeat as needed during May–June cottonwood season.',
    'condenser-dirty': '🔧 DIY OR PRO — A dirty condenser coil reduces efficiency 30–40%. DIY: rinse with garden hose inside-out after cutting power. Pro: apply coil cleaner foam (– at HVAC supply), let soak, rinse. Annual cleaning extends compressor life significantly in DFW heat.',
    'evaporator-frozen': '⚠️ PRO REQUIRED — A frozen evaporator coil indicates either low refrigerant or restricted airflow (dirty coil or filter). Turn off AC, run fan to thaw, change filter. If it refreezes, call an HVAC tech — accessing the evaporator coil requires removing the air handler or furnace panel and applying no-rinse coil cleaner. DIY risk of bending delicate fins.',
    'evaporator-musty': '🦠 PRO RECOMMENDED — Musty smell from evaporator coil indicates mold or bacteria growth on the wet coil surface. No-rinse antibacterial coil cleaner is applied by spraying onto the coil while the unit runs. A tech can access and treat without full disassembly. Also clean the condensate drain pan.',
    'efficiency-loss': '📋 CHECK COILS FIRST — A 30–40% efficiency loss often traces to dirty condenser or evaporator coils. Start with condenser (DIY rinse). If bills stay high, have a tech check evaporator coil and refrigerant charge. DFW summer adds 10–15% to bills vs. spring — rule out rate changes first.',
    'post-inspection': '💬 VERIFY BEFORE SPENDING — If a tech says coils are dirty, ask to see photos. Condenser cleaning (–) is often part of a tune-up. Evaporator cleaning (–) should come with before/after evidence. Do not approve refrigerant top-off without a leak check first.',
  };

  const handleCheck = () => {
    if (selection) setResult(recommendations[selection] || '');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DFW Home Guide 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>DFW HVAC Coil Cleaning Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: '2rem', fontSize: '1.05rem' }}>Dirty coils are a major efficiency killer in DFW. Cottonwood season (May–June) clogs condensers fast. Know which coil needs attention and whether it is DIY or pro territory.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🌀', label: 'Condenser Coil', value: 'Outdoor — DIY rinseable' },
            { icon: '❄️', label: 'Evaporator Coil', value: 'Indoor — pro recommended' },
            { icon: '📉', label: 'Efficiency Loss', value: '30–40% with dirty coils' },
            { icon: '🌱', label: 'DFW Peak Risk', value: 'Cottonwood May–June' },
          ].map(item => (
            <div key={item.label} style={{ backgroundColor: '#0f2040', border: '1px solid #1e3a5f', borderRadius: '10px', padding: '1.2rem' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>{item.label}</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2040', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>🔍 Coil Type + Condition → Cleaning Guide</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
            {options.map(o => (
              <button key={o.id} onClick={() => setSelection(o.id)}
                style={{ textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '8px', border: selection === o.id ? '2px solid #F5E642' : '1px solid #1e3a5f', backgroundColor: selection === o.id ? '#1a3060' : '#0A1628', color: '#fff', cursor: 'pointer', fontSize: '0.9rem' }}>
                {o.label}
              </button>
            ))}
          </div>
          <button onClick={handleCheck} disabled={!selection}
            style={{ backgroundColor: selection ? '#F5E642' : '#2a3a50', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', cursor: selection ? 'pointer' : 'not-allowed', fontSize: '0.95rem', width: '100%' }}>
            Get Cleaning Guidance →
          </button>
          {result && (
            <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0A1628', borderRadius: '8px', border: '1px solid #F5E642', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0f2040', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>📌 Annual DFW Coil Schedule</h2>
          <p style={{ color: '#a0aec0', fontSize: '0.88rem', lineHeight: 1.7 }}>March: Check condenser before cooling season. May–June: Rinse condenser weekly during cottonwood peak. October: Pre-heating season tune-up, inspect evaporator. Annual professional service should include evaporator coil inspection and condensate drain flush — critical in DFW humidity season.</p>
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#0f2040', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: '#a0aec0', fontSize: '0.8rem' }}>Need a DFW HVAC tech? <span style={{ color: '#F5E642', fontWeight: 700 }}>ProLnk</span> connects you with vetted local pros.</p>
        </div>
      </div>
    </div>
  );
}