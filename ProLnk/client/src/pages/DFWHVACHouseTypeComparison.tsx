import { useState } from 'react';

const houseTypes = [
  {
    id: 'ranch',
    label: 'Ranch / Single-Story',
    emoji: '🏡',
    sqft: '1,200–2,400 sq ft',
    sizing: '2–4 ton unit',
    ductDesign: 'Single-zone radial duct system. Short runs keep static pressure low. Attic ducts face extreme DFW heat — insulate to R-8 minimum.',
    commonProblems: [
      { issue: 'Attic duct overheating', solution: 'Upgrade duct insulation to R-8 or R-10; seal all seams with mastic.' },
      { issue: 'Undersized return air', solution: 'Add return air grill in hallway; ensure at least 1 sq in per 2 CFM.' },
      { issue: 'Hot spots in west-facing rooms', solution: 'Add booster fan or upgrade to 2-zone system with dampers.' },
    ],
  },
  {
    id: 'twostory',
    label: 'Two-Story',
    emoji: '🏠',
    sqft: '2,000–4,500 sq ft',
    sizing: '2 units recommended (1 per floor)',
    ductDesign: 'Dual-zone or dual-unit setup is ideal. Second floor needs its own air handler. Single-unit setups always over-cool downstairs in DFW summers.',
    commonProblems: [
      { issue: 'Second floor too hot', solution: 'Install dedicated upstairs air handler or add zone damper with separate thermostat.' },
      { issue: 'Single unit short-cycling', solution: 'Size correctly — oversized units cool too fast without dehumidifying DFW humid air.' },
      { issue: 'Stairwell stack effect', solution: 'Seal attic hatch, add ceiling fans at top of stairs to push hot air back.' },
    ],
  },
  {
    id: 'townhome',
    label: 'Townhome',
    emoji: '🏘',
    sqft: '1,000–2,200 sq ft',
    sizing: '1.5–3 ton unit',
    ductDesign: 'Shared walls reduce heat load. Vertical duct runs in interior walls. Less attic exposure but tighter spaces complicate equipment access.',
    commonProblems: [
      { issue: 'Neighbor heat transfer through shared walls', solution: 'Add batt insulation to shared walls; check HOA rules on window film.' },
      { issue: 'Cramped utility closet limits airflow', solution: 'Ensure 6-inch clearance on all sides of air handler; clean filter monthly.' },
      { issue: 'Moisture in tightly sealed units', solution: 'Run HVAC fan continuously at low speed to maintain dehumidification.' },
    ],
  },
  {
    id: 'condo',
    label: 'Condo',
    emoji: '🏢',
    sqft: '600–1,800 sq ft',
    sizing: '1–2.5 ton unit (PTACs common)',
    ductDesign: 'Many condos use PTAC units (wall units) or fan coil units tied to building chilled water. Central ducted systems rare. Check HOA rules before replacing.',
    commonProblems: [
      { issue: 'PTAC unit inefficiency in DFW heat', solution: 'Replace with mini-split for 30–40% efficiency gain; no ductwork needed.' },
      { issue: 'Building chilled water pressure drops', solution: 'Report to HOA — building pump or coil issue, not your unit.' },
      { issue: 'Condensate drain clogs in humid months', solution: 'Flush drain with diluted bleach quarterly (April, June, August, October).' },
    ],
  },
];

export default function DFWHVACHouseTypeComparison() {
  const [selected, setSelected] = useState('ranch');
  const profile = houseTypes.find((h) => h.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0′ }}>DFW HVAC by House Type</h1>
          <p style={{ color: '#9BB0CC', margin: 0 }}>Select your DFW home style for a complete HVAC profile</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: 'center' }}>
          {houseTypes.map((h) => (
            <button
              key={h.id}
              onClick={() => setSelected(h.id)}
              style={{
                padding: '0.6rem 1.2rem', borderRadius: 8, border: '2px solid',
                borderColor: selected === h.id ? '#F5E642′ : '#1E3A5F',
                background: selected === h.id ? '#F5E642′ : '#112240',
                color: selected === h.id ? '#0A1628′ : '#fff',
                fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem',
              }}
            >{h.emoji} {h.label}</button>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>{profile.emoji} {profile.label} — HVAC Profile</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#9BB0CC', fontSize: '0.8rem', marginBottom: 4 }}>TYPICAL SIZE</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{profile.sqft}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#9BB0CC', fontSize: '0.8rem', marginBottom: 4 }}>HVAC SIZING</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{profile.sizing}</div>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ color: '#9BB0CC', fontSize: '0.8rem', marginBottom: 4 }}>DUCT DESIGN NOTES</div>
            <p style={{ margin: 0, lineHeight: 1.6 }}>{profile.ductDesign}</p>
          </div>
        </div>

        <div>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>⚠️ Top 3 DFW Issues + Solutions</h3>
          {profile.commonProblems.map((p, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '0.75rem', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>#{i + 1} {p.issue}</div>
              <div style={{ color: '#CBD5E1', lineHeight: 1.6 }}>✅ {p.solution}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

