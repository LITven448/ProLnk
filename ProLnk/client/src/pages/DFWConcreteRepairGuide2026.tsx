import { useState } from 'react';

const issues = [
  { label: 'Driveway Cracks', icon: '🛣️', repair: 'Expansion joint failure is the #1 cause in DFW. For cracks under 1/4″, apply polyurethane caulk. Over 1/4″ wide or deep — saw-cut and replace the joint. Full slab replacement needed when cracks exceed 1/2″ width or slab has shifted.' },
  { label: 'Sidewalk Trip Hazard', icon: '🚶', repair: 'Mudjacking lifts sunken slabs by pumping slurry underneath — costs -8/sq ft. Replacement runs -12/sq ft. Mudjacking works when slab is intact; if crumbling or severely cracked, replace. DFW clay soil movement makes recurrence common without root barrier.' },
  { label: 'Patio Cracks', icon: '🏡', repair: 'DFW foundation movement telegraphs into patios. Hairline cracks: seal with concrete caulk + paint. Structural cracks with offset: requires slab lifting or partial demo. Always address foundation drainage before patching or cracks recur within 1-2 seasons.' },
  { label: 'Sealant Application', icon: '🧴', repair: 'Apply penetrating silane-siloxane sealer every 2-3 years in DFW. Best applied in fall (50-85°F range). DFW freeze-thaw cycles (rare but real) cause spalling without sealer. Avoid film-forming sealers on driveways — they trap moisture and peel in DFW heat.' },
  { label: 'Surface Spalling', icon: '❄️', repair: 'Spalling (surface flaking) from freeze-thaw or deicing salts. Shallow spalling: apply concrete resurfacer at 3/16″ min thickness. Deep spalling exposing aggregate: full slab section replacement. In DFW, salt damage is rare but occurs after ice storms — rinse immediately after any salt application.' },
];

export default function DFWConcreteRepairGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏗️</div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>DFW Concrete Repair Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '15px', maxWidth: '560px', margin: '0 auto' }}>DFW clay soil and temperature swings create unique concrete challenges. Select your issue for repair guidance.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {issues.map((issue, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ backgroundColor: selected === i ? '#F5E642′ : '#0f2040', color: selected === i ? '#0A1628' : '#ffffff', border: '1px solid', borderColor: selected === i ? '#F5E642' : '#1e3a5f', borderRadius: '10px', padding: '18px 14px', cursor: ’pointer', textAlign: 'left', transition: 'all 0.2s' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{issue.icon}</div>
              <div style={{ fontWeight: '600', fontSize: '14px' }}>{issue.label}</div>
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ backgroundColor: '#0f2040', border: '1px solid #F5E642', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '32px' }}>{issues[selected].icon}</span>
              <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700′ }}>{issues[selected].label}</h2>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '15px' }}>{issues[selected].repair}</p>
          </div>
        )}

        <div style={{ marginTop: '40px', backgroundColor: '#0f2040', borderRadius: '12px', padding: '20px', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>🌡️ DFW Climate Facts</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[['Clay Soil', 'Expands 10-15% when wet, contracts when dry — major concrete movement driver'],['Temp Range', '0°F winter lows to 110°F summer highs stress concrete year-round'],['Freeze Events', '2-5 freeze events per year — rare but cause spalling without sealer'],['Drainage', 'Poor drainage + DFW clay = #1 root cause of all concrete problems']].map(([k,v],i) => (
              <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '12px' }}>
                <div style={{ color: '#F5E642', fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>{k}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px', padding: '20px', backgroundColor: '#0f2040', borderRadius: '12px', border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>Need a concrete contractor in DFW?</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 28px', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>Get Free Quotes via ProLnk 🔗</button>
        </div>
      </div>
    </div>
  );
}