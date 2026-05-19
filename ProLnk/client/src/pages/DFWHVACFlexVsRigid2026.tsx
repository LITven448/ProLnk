import { useState } from 'react';

const ductTypes = [
  { id: 'flex', label: 'Flexible Duct', icon: '🌀' },
  { id: 'rigid', label: 'Rigid Sheet Metal', icon: '🔩' },
  { id: 'both', label: 'Hybrid System', icon: '⚙️' },
];

const concerns = [
  { id: 'cost', label: 'Budget-Conscious', type: 'flex', detail: 'Flexible duct costs 30–40% less on material + labor. Most DFW installers default to flex for residential installs.' },
  { id: 'perf', label: 'Maximum Airflow', type: 'rigid', detail: 'Rigid sheet metal minimizes friction loss and delivers superior CFM. Best for large custom DFW homes or high-performance systems.' },
  { id: 'custom', label: 'Custom Home Build', type: 'rigid', detail: 'High-end DFW custom builds typically spec rigid trunk lines with flex branch runs for quiet, efficient delivery.' },
  { id: 'replace', label: 'Replacing Old Ductwork', type: 'flex', detail: 'For attic re-duct in existing DFW homes, flex is the practical choice — easier to route around existing structure.' },
  { id: 'allergy', label: 'Air Quality / Allergies', type: 'rigid', detail: 'Rigid duct interior is smoother and less likely to harbor dust or mold than flex liner material. Preferred for allergy-sensitive households.' },
];

export default function DFWHVACFlexVsRigid2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = concerns.find(c => c.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🌬️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW Flexible vs Rigid Ductwork Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            Which ductwork system is right for your DFW home? Compare flex and rigid options with local installer insight.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {ductTypes.map(d => (
            <div key={d.id} style={{ background: '#0f2040', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 32 }}>{d.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginTop: 8 }}>{d.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 16, padding: 28, marginBottom: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📊 DFW Ductwork Facts</h2>
          {[
            ['🏡', '~85% of DFW residential installs use flexible ductwork'],
            ['💲', 'Flex duct runs $1–2/ft vs rigid at $3–5/ft installed'],
            ['⚡', 'Rigid metal reduces static pressure loss by up to 30%'],
            ['🌡️', 'DFW attic temps hit 140°F — proper insulation on flex is critical'],
            ['🔧', 'ProLnk Charter HVAC techs are trained on both systems'],
          ].map(([icon, text], i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{text}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 16, padding: 28, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 What Matters Most to You?</h2>
          <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id)}
                style={{ background: selected === c.id ? '#F5E642′ : '#162236', color: selected === c.id ? '#0A1628' : '#fff', border: '1px solid #1e3a5f', borderRadius: 10, padding: '12px 16px', textAlign: ’left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {c.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#162236', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>Recommended: {ductTypes.find(d => d.id === result.type)?.label}</div>
              <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{result.detail}</p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <p style={{ color: '#64748b', fontSize: 13 }}>Matched with ProLnk Charter HVAC pros who know DFW ductwork codes and attic conditions.</p>
        </div>
      </div>
    </div>
  );
}