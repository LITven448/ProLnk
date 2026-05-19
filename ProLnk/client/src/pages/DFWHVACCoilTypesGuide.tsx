import { useState } from 'react';

const coilScenarios = [
  { coil: 'A-coil in DFW attic — dirty, reduced cooling', cleaning: 'Coil cleaner spray (Nu-Calgon Evap-Fresh) + rinse. DFW pollen clogs in 1–2 seasons.', replacement: 'If more than 30% surface blocked and cleaning fails: $800–1,400 replacement.', cost: 'Cleaning: $150–250 | Replacement: $800–1,400′ },
  { coil: 'Slant coil — low airflow across coil', cleaning: 'Slant coils harder to access in attic. May need pull-out service. Annual cleaning critical in DFW.', replacement: 'Higher labor due to access. Budget extra $100–200 for attic slant coil work.', cost: 'Cleaning: $200–350 | Replacement: $900–1,600′ },
  { coil: 'Vertical coil — freezing up in DFW summer', cleaning: 'First check filter and airflow before cleaning. Freeze = restricted airflow or undercharge.', replacement: 'If coil leaking: dye test to confirm, then replace. R-410A coil: $900–1,800 installed.', cost: 'Diagnosis: $75–150 | Coil: $900–1,800′ },
  { coil: 'Spine fin coil — concerned about DFW pollen clogging', cleaning: 'Spine fin (Lennox/Carrier specific) self-sheds some debris. Gentle rinse only — no stiff brush.', replacement: 'Spine fin is efficient but proprietary. Match OEM spec exactly for replacement.', cost: 'Cleaning: $150–200 | Replacement: $1,000–2,000′ },
];

export default function DFWHVACCoilTypesGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const result = selected !== null ? coilScenarios[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>Evaporator Coil Types — DFW Attic Systems</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28 }}>
          Most DFW homes have air handlers in 130°F+ attics. The evaporator coil type determines how well it survives DFW heat, handles DFW pollen loads, and performs in tight attic configurations.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
          {[
            { name: '▲ A-Coil', desc: 'Most common in DFW. Two angled coil sections forming an A. Good for vertical air handler. Standard corrugated aluminum.', note: 'DFW: Pollen and cottonwood clog the apex — clean every 1–2 seasons.' },
            { name: '↗ Slant Coil', desc: 'Single angled coil. Common in horizontal attic air handlers. Easier to clean but lower surface area.', note: 'DFW: Horizontal attic installs very common. Confirm access before service.' },
            { name: '| Vertical Coil', desc: 'Straight vertical plate coil. Used in vertical cabinet configurations. High efficiency when clean.', note: 'DFW: Attic heat causes faster coil degradation — expect 12–15 year life.' },
            { name: '⊕ Spine Fin', desc: 'Lennox/Carrier proprietary design. Aluminum spines instead of fins. Better self-cleaning in breezy installs.', note: 'DFW: Performs well but requires OEM parts for replacement — budget accordingly.' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#111D35', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{c.name}</div>
              <div style={{ color: '#CBD5E1', fontSize: 14, marginBottom: 6 }}>{c.desc}</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>⚡ {c.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🌿 DFW Pollen & Dust Impact</div>
          <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, margin: '0 0 10px' }}>
            DFW ranks among the worst pollen regions in the US — cedar fever (mountain cedar), oak, and cottonwood create heavy coil fouling. A 1mm layer of debris on evaporator fins reduces heat transfer by 20–30%. Most DFW systems need coil cleaning every 1–2 seasons, not just filter changes.
          </p>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, fontSize: 14, color: '#94A3B8′ }}>
            Corrugated aluminum (standard) clogs faster than spine fin in DFW. Consider coil coating (Hy-Per lube or similar) after professional cleaning to slow debris adhesion.
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🔍 DFW Coil Situation — What To Do</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {coilScenarios.map((s, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{ background: selected === i ? '#F5E642′ : '#0A1628', color: selected === i ? '#0A1628' : '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', textAlign: ’left', cursor: 'pointer', fontSize: 14, fontWeight: selected === i ? 700 : 400 }}>
                {s.coil}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#1A2030', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Cleaning Approach</div>
              <div style={{ color: '#CBD5E1', fontSize: 14, marginBottom: 10 }}>{result.cleaning}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Replacement Consideration</div>
              <div style={{ color: '#CBD5E1', fontSize: 14, marginBottom: 8 }}>{result.replacement}</div>
              <div style={{ color: '#F5E642', fontSize: 13 }}>💰 {result.cost}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
