import { useState } from 'react';

const symptoms = [
  { id: 'crack', label: 'New Cracks After Repair', icon: '🔍' },
  { id: 'door', label: 'Doors Sticking Again', icon: '🚪' },
  { id: 'settled', label: 'Visibly Settled Area', icon: '📉' },
  { id: 'water', label: 'Water Near Pier Locations', icon: '💧' },
];

const assessments: Record<string, { title: string; cause: string; action: string; severity: string; color: string }> = {
  crack: {
    title: 'Pier May Not Be Reaching Competent Soil',
    cause: 'DFW has variable geology — some areas have soft caliche or poorly compacted fill beneath. If the pier tip is in a soft layer rather than stable soil, it will continue to move with load.',
    action: 'Request the original pier depth report. Compare to soil boring data for your address (Dallas County has public records). If pier depth is under 10 ft in suspect areas, deeper helical piers may be needed.',
    severity: 'High',
    color: '#ef4444',
  },
  door: {
    title: 'Lateral Clay Movement May Be Affecting Piers',
    cause: 'DFW\'s expansive black clay doesn\'t just move vertically — it moves laterally. This lateral force can push piers sideways, breaking the bracket connection or tilting the pier column.',
    action: 'Have an engineer assess pier bracket connections. Look for bracket separation or pier lean. This is common in DFW homes on filled lots or near slopes. Document movement direction.',
    severity: 'Medium-High',
    color: '#f59e0b',
  },
  settled: {
    title: 'Pier Pulling Away From Bracket',
    cause: 'The bracket connecting the pier to the foundation beam can separate if the pier tip settles further or the soil shifts. Once bracket contact is lost, there is no load transfer.',
    action: 'Do not ignore a visible settled area. Get an engineer on-site within 30 days. Bracket separation typically requires either restoring the pier or installing adjacent new piers with load transfer.',
    severity: 'Critical',
    color: '#ef4444',
  },
  water: {
    title: 'Saturated Soil Reducing Pier Friction',
    cause: 'DFW pier systems rely partly on soil friction along the pier shaft. When the clay is fully saturated (after extended rain), friction capacity drops — temporarily reducing the pier\'s load capacity.',
    action: 'Monitor the settled area for 2–4 weeks after soil dries. If it recovers fully, the piers may be adequate but marginally sized. If it does not recover, the piers likely did not reach stable soil depth.',
    severity: 'Medium',
    color: '#f59e0b',
  },
  default: {
    title: 'Select Post-Repair Symptom',
    cause: '',
    action: 'Choose the symptom you\'re experiencing after a previous foundation repair to assess if your DFW piers may be failing.',
    severity: '',
    color: '#64748b',
  },
};

export default function DFWFoundationPierSinking2026() {
  const [selected, setSelected] = useState<string>('');
  const assess = selected ? (assessments[selected] || assessments['default']) : assessments['default'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>⚠️</span>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Foundation Pier Sinking & Failure Guide 2026</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 15 }}>
          Not all DFW foundation repairs last. Here's why piers fail and what post-repair symptoms mean for your home.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[['Root Cause #1', '📏', 'Pier not reaching competent soil depth'], ['Root Cause #2', '🪨', 'Pier tip in soft layer (caliche, fill, clay pocket)'], ['Root Cause #3', '↔️', 'Lateral clay expansion pushing pier sideways'], ['Root Cause #4', '🔩', 'Bracket separation — pier loses contact with beam']].map(([label, icon, desc]) => (
            <div key={label as string} style={{ background: '#0f2040', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{label}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔍 Post-Repair Symptoms</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {symptoms.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#F5E642' : '#1a2f4e', color: selected === s.id ? '#0A1628' : '#fff', border: '2px solid ' + (selected === s.id ? '#F5E642' : '#334155'), borderRadius: 10, padding: '14px 12px', cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left', transition: 'all 0.15s' }}>
              <span style={{ marginRight: 8 }}>{s.icon}</span>{s.label}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#1a2f4e', borderRadius: 12, padding: 22, borderLeft: `4px solid ${assess.color}`, marginBottom: 20 }}>
            {assess.severity && <div style={{ color: assess.color, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Severity: {assess.severity}</div>}
            <h3 style={{ color: '#F5E642', margin: '0 0 10px', fontSize: 17 }}>{assess.title}</h3>
            <div style={{ color: '#94a3b8', fontWeight: 600, fontSize: 12, marginBottom: 4 }}>WHY THIS HAPPENS</div>
            <p style={{ color: '#cbd5e1', margin: '0 0 14px', lineHeight: 1.6, fontSize: 14 }}>{assess.cause}</p>
            <div style={{ color: '#94a3b8', fontWeight: 600, fontSize: 12, marginBottom: 4 }}>RECOMMENDED ACTION</div>
            <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.6, fontSize: 14 }}>{assess.action}</p>
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 10, padding: 16 }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 8px', fontSize: 15 }}>💡 Why Some DFW Homes Need Re-Repair</h3>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: 14, lineHeight: 1.6 }}>DFW's geology varies block by block. Original pier installations done before proper soil boring data, or by contractors cutting corners on depth, frequently fail within 5–10 years. Always get an independent structural engineer evaluation before authorizing re-repair.</p>
        </div>

        <p style={{ color: '#475569', fontSize: 12, marginTop: 24, textAlign: 'center' }}>ProLnk DFW Home Intelligence · 2026</p>
      </div>
    </div>
  );
}