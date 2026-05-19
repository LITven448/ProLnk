import { useState } from 'react';

const conditions = [
  { id: 'cottonwood', label: 'White fluff clogging the coil (May)', diagnosis: 'Cottonwood season in DFW — peaks in May. Cottonwood fibers pack condenser fins solid in days, causing refrigerant pressure to spike and compressor to overheat. Check and rinse condenser every 2-3 days during peak cottonwood. A simple garden hose from inside-out clears it.' },
  { id: 'grass', label: 'Grass clippings stuck in fins', diagnosis: 'Lawn mowing blows clippings directly into condenser. Always mow away from unit or cover temporarily. Clippings compact faster than dust. Rinse immediately after mowing with hose on gentle setting. Never use pressure washer — bends fins permanently.' },
  { id: 'dust', label: 'Thick dust layer, DFW dust storm aftermath', diagnosis: 'DFW dust storms (haboobs) coat condenser fins with fine clay. Dry brushing spreads it deeper. Wet rinse with hose only. Apply condenser coil cleaner spray ($15 at hardware store), let foam for 5 minutes, rinse. Annual professional cleaning after dust season recommended.' },
  { id: 'bent', label: 'Bent or flattened fins visible', diagnosis: 'Bent fins restrict airflow same as debris. Fin combs ($10-15) straighten most damage. If more than 30% of fins are bent or corroded through, replacement efficiency gains may justify new coil. Ask tech to assess corrosion depth during next service.' },
  { id: 'corrosion', label: 'Green or white corrosion on fins', diagnosis: 'Formicary corrosion — common in DFW due to air quality and pool chemicals in some areas. Pinhole leaks develop, releasing refrigerant slowly. If corrosion is widespread, coil replacement ($800-1,500) is the only fix. Coil guard coatings ($200) prevent future corrosion on new coils.' },
];

export default function DFWCondenserCoilGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = conditions.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🌬️ Condenser Coil Guide</h1>
        <p style={{ color: '#9BA3B4', fontSize: 15, marginBottom: 28 }}>
          Your outdoor condenser coil faces DFW's unique threats: cottonwood season, dust storms, lawn equipment, and summer heat that pushes refrigerant pressure to the limit.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🌿', title: 'Cottonwood Season (May)', body: 'Cottonwood trees shed white fibers every May across DFW. These fibers are perfect condenser cloggers — lightweight, sticky, and voluminous. During peak season, inspect and rinse your condenser every 2-3 days. This single habit prevents the #1 May service call in DFW.' },
            { icon: '🌾', title: 'Grass Clippings', body: 'Mowing direction matters. Blower or discharge aimed at condenser packs fins solid in one session. Redirect discharge away from unit or use a simple plywood shield during mowing. Rinse immediately if exposed. Packed grass clippings also trap moisture and accelerate corrosion.' },
            { icon: '🌪️', title: 'DFW Dust Storms', body: 'DFW dust storms deposit fine clay particles deep into condenser fins. Unlike cottonwood, clay does not rinse easily dry. Wet application of foaming coil cleaner is the only effective solution. One major dust storm can drop system efficiency 15-20%.' },
            { icon: '🛠️', title: 'Fin Bending & Replacement', body: 'Fins bent more than 45 degrees restrict airflow significantly. Fin combs straighten most. If corrosion has eaten through fin walls, replacement is the only option. Aluminum fins corrode faster than copper — check your system type. Protective coatings on new coils are worth the upcharge in DFW.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0F2040', borderRadius: 10, padding: '18px 20px', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{card.icon} <span style={{ fontSize: 16, fontWeight: 700, color: '#F5E642′ }}>{card.title}</span></div>
              <p style={{ color: '#B0B8CC', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔍 Condenser Condition Guide</h2>
          <p style={{ color: '#9BA3B4', fontSize: 14, marginBottom: 16 }}>Select your condenser condition for cleaning vs service guidance:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
            {conditions.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#F5E642′ : '#162035', color: selected === s.id ? '#0A1628' : '#E8EAF0', border: ’none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#162035', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642′ }}>
              <p style={{ color: '#E8EAF0', fontSize: 14, margin: 0, lineHeight: 1.7 }}>{result.diagnosis}</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: 28, background: '#F5E642', borderRadius: 10, padding: '18px 22px', textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0A1628', marginBottom: 4 }}>🏠 Schedule a DFW Condenser Cleaning</div>
          <div style={{ fontSize: 13, color: '#1A2A4A' }}>ProLnk connects you with vetted DFW HVAC pros — free, no commitment.</div>
        </div>
      </div>
    </div>
  );
}