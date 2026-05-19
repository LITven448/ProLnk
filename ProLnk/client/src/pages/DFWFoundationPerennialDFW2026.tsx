import { useState } from 'react';

export default function DFWFoundationPerennialDFW2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const issues = [
    {
      id: 'seasonal',
      label: '📅 Seasonal Crack Opening/Closing',
      title: 'Normal Clay Movement — Monitor Annually',
      body: 'DFW expansive clay shrinks in summer (cracks open 1/8–1/4″) and swells in winter (cracks close). Horizontal cracks are fine. Stair-step cracks at corners need assessment. ProLnk Vault tracks crack width over time — critical for distinguishing normal vs progressive movement.',
    },
    {
      id: 'releveling',
      label: '⚖️ Re-Leveling After Repair',
      title: 'Too Few Piers — The #1 DFW Foundation Mistake',
      body: 'If your foundation settles back within 2–5 years of repair, the contractor used too few piers or wrong placement. Industry standard: piers every 6–8 ft at perimeter, interior piers for large spans. DFW clay requires pier depth of 10–15 ft to reach stable stratum. Check your warranty — most cover re-leveling 1x.',
    },
    {
      id: 'newmovement',
      label: '🌊 New Movement After Stable Years',
      title: 'Check Drainage Changes First',
      body: 'New foundation movement after 5+ stable years almost always traces to a drainage change: new neighbor grading, changed downspout routing, new tree removal (roots no longer drinking), or municipal water main break. ProLnk dispatches foundation assessment within 48 hours. Vault notes the drainage event alongside the movement record.',
    },
    {
      id: 'insurance',
      label: '📋 Insurance & Documentation',
      title: 'Pattern Documentation = Coverage Evidence',
      body: 'Texas homeowner policies exclude foundation settlement but may cover sudden collapse or drain leaks causing movement. ProLnk Vault creates dated photographic and measurement records. When you file a claim, a 3-year Vault record showing sudden acceleration vs gradual movement is the difference between approval and denial.',
    },
    {
      id: 'vault',
      label: '🏠 ProLnk Vault Pattern Tracking',
      title: 'Permanent Foundation History in Your Vault',
      body: 'Every ProLnk foundation inspection adds: crack locations, measurements, photos, pier count/depth if repaired, drainage notes, and contractor info. DFW buyers increasingly request Vault foundation history. Documented stable foundation = $8,000–$15,000 buyer confidence premium.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>FOUNDATION GUIDE · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🏗️ DFW Perennial Foundation Issues Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW foundation problems recur because the cause is never fixed — expansive clay, drainage, or under-engineered repairs. Learn how to break the cycle and document every issue in your Home Health Vault.
        </p>

        <div style={{ backgroundColor: '#0f2240', borderRadius: 8, padding: 20, marginBottom: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🔴 DFW Foundation Warning Signs</div>
          {['Doors/windows sticking in summer but fine in winter = clay movement', 'Cracks returning within 2 years of repair = too few piers', 'New cracks after storm or drought = drainage change', 'Sloping floors >1″ per 10 ft = active settlement'].map((f, i) => (
            <div key={i} style={{ color: '#cbd5e1', fontSize: 14, padding: '6px 0', borderBottom: '1px solid #1e3a5f' }}>{f}</div>
          ))}
        </div>

        <div style={{ color: '#94a3b8', marginBottom: 16 }}>Select recurring issue type:</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
          {issues.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
              style={{ backgroundColor: selected === s.id ? '#F5E642′ : '#1e3a5f', color: selected === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 6, padding: '10px 16px', cursor: 'pointer', fontSize: 14 }}>
              {s.label}
            </button>
          ))}
        </div>

        {selected && (() => {
          const s = issues.find(x => x.id === selected)!;
          return (
            <div style={{ backgroundColor: '#0f2240', border: '1px solid #F5E642', borderRadius: 8, padding: 24, marginBottom: 24 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>{s.title}</div>
              <div style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{s.body}</div>
            </div>
          );
        })()}

        <div style={{ backgroundColor: '#F5E642', borderRadius: 8, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18, marginBottom: 6 }}>🏗️ Get a DFW Foundation Assessment</div>
          <div style={{ color: '#0A1628', fontSize: 14 }}>ProLnk matches you with Charter-tier structural engineers and foundation specialists. All findings documented in your Vault permanently.</div>
        </div>
      </div>
    </div>
  );
}
