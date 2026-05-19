import { useState } from 'react';

const styles = {
  page: { backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' },
  container: { maxWidth: '860px', margin: '0 auto' },
  badge: { backgroundColor: '#1a2d4a', color: '#F5E642', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', display: 'inline-block', marginBottom: '16px' },
  h1: { fontSize: '36px', fontWeight: '800', marginBottom: '12px', lineHeight: '1.2′ },
  accent: { color: '#F5E642′ },
  lead: { color: '#94a3b8', fontSize: '18px', marginBottom: '40px', lineHeight: '1.6′ },
  card: { backgroundColor: '#111f38', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' },
  cardTitle: { fontSize: '20px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' },
  statBox: { backgroundColor: '#0d1a2e', borderRadius: '10px', padding: '20px', textAlign: 'center' as const },
  statNum: { fontSize: '32px', fontWeight: '800', color: '#F5E642′ },
  statLabel: { color: '#94a3b8', fontSize: '13px', marginTop: '4px' },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  listItem: { padding: '10px 0', borderBottom: '1px solid #1e3a5f', color: '#cbd5e1', display: 'flex', gap: '10px', fontSize: '14px' },
  label: { color: '#94a3b8', fontSize: '14px', marginBottom: '8px', display: 'block' },
  checkLabel: { display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #1e3a5f', cursor: 'pointer', color: '#cbd5e1', fontSize: '14px' },
  btn: { backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%' },
  result: { backgroundColor: '#0d1a2e', borderRadius: '10px', padding: '20px', marginTop: '16px', border: '2px solid #F5E642′ },
  redFlag: { backgroundColor: '#2d0000', border: '1px solid #ef4444', borderRadius: '8px', padding: '10px 14px', color: '#fca5a5', marginBottom: '8px', fontSize: '14px' },
  greenNote: { backgroundColor: '#0d2e1a', border: '1px solid #166534', borderRadius: '8px', padding: '14px 18px', color: '#86efac', fontSize: '14px', marginTop: '16px' },
  warnNote: { backgroundColor: '#2d1000', border: '1px solid #9a3412', borderRadius: '8px', padding: '14px 18px', color: '#fdba74', fontSize: '14px', marginTop: '16px' },
  compRow: { display: 'flex', gap: '16px', marginBottom: '16px' },
  compBox: { flex: 1, backgroundColor: '#0d1a2e', borderRadius: '10px', padding: '16px' },
  compTitle: { fontWeight: '700', marginBottom: '10px', fontSize: '15px', color: '#F5E642′ },
};

const whenToInspect = [
  { icon: '🏠', trigger: 'Buying a home', detail: 'Always get a foundation inspection before closing — it\’s separate from a standard home inspection.' },
  { icon: '🌩️', trigger: 'After a major storm', detail: 'Heavy rains, hail, or tornado events can shift DFW clay soil rapidly.' },
  { icon: '📐', trigger: 'Seeing new cracks', detail: 'Any crack wider than 1/8″ or horizontal cracks in brick or drywall.' },
  { icon: '🚪', trigger: 'Doors/windows sticking', detail: 'Sudden difficulty opening or closing interior doors is a classic early sign.' },
  { icon: '📅', trigger: 'Every 5–7 years proactively', detail: 'Even without visible symptoms — especially on homes over 20 years old in DFW.' },
];

const inspectorLooks = [
  'Elevation measurements across the slab to detect differential movement',
  'Crack patterns — length, width, direction, and location',
  'Drainage and soil grading around the perimeter',
  'Plumbing under-slab leaks (may require separate plumber)',
  'Door and window alignment — gaps and sticking points',
  'Brick veneer for stair-step or horizontal cracking',
  'Interior walls and ceilings for diagonal cracks at corners',
];

const redFlags = [
  'Horizontal cracks in foundation wall (structural emergency)',
  'Multiple wide cracks (over 1/4″) radiating from corners',
  'Gaps between walls and ceiling/floor over 1/2″',
  'Slab showing upward "heaving" or domed areas',
  'Active water intrusion through foundation cracks',
];

const symptomLogic: Record<string, { rec: string; urgency: string; why: string }> = {
  high: { rec: 'Structural Engineer', urgency: '🔴 Urgent — Within 2 Weeks', why: 'Multiple or severe symptoms indicate potential structural risk requiring a licensed PE report for insurance or remediation.' },
  med: { rec: 'Certified Foundation Inspector', urgency: '🟡 Within 60 Days', why: 'Moderate symptoms warrant professional measurement. Inspector can determine if movement is active or historical.' },
  low: { rec: 'Certified Foundation Inspector', urgency: '🟢 Routine — Within 6 Months', why: 'Minor or single symptom likely warrants monitoring. An inspector can establish a baseline for comparison.' },
  none: { rec: 'No Inspection Needed Yet', urgency: '🟢 Continue Monitoring', why: 'No current symptoms. Focus on preventive moisture management and schedule a baseline inspection after year 5.' },
};

const checkItems = [
  { key: 'wideCrack', label: 'Cracks wider than 1/4″ in drywall, brick, or slab', weight: 3 },
  { key: 'horizontal', label: 'Horizontal cracks in any wall or foundation', weight: 4 },
  { key: 'sticking', label: 'Multiple doors or windows suddenly sticking', weight: 2 },
  { key: 'floors', label: 'Visible floor slope or unevenness', weight: 2 },
  { key: 'ceiling', label: 'Diagonal cracks from corners of doors/windows', weight: 1 },
  { key: 'gaps', label: 'Gaps between walls and ceiling or floor', weight: 2 },
  { key: 'water', label: 'Water intrusion or moisture inside foundation', weight: 3 },
];

export default function DFWFoundationInspectionGuide() {
  const [checked, setChecked] = useState<string[]>([]);
  const [result, setResult] = useState<null | { rec: string; urgency: string; why: string }>(null);

  function toggle(key: string) {
    setChecked(prev => prev.includes(key) ? prev.filter(x => x !== key) : [...prev, key]);
  }

  function evaluate() {
    const score = checkItems.filter(i => checked.includes(i.key)).reduce((acc, i) => acc + i.weight, 0);
    if (score >= 6) setResult(symptomLogic.high);
    else if (score >= 3) setResult(symptomLogic.med);
    else if (score >= 1) setResult(symptomLogic.low);
    else setResult(symptomLogic.none);
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.badge}>📍 DFW Foundation Guide</div>
        <h1 style={styles.h1}>Foundation <span style={styles.accent}>Inspection Guide</span> for DFW Homeowners</h1>
        <p style={styles.lead}>Knowing when to get an inspection — and who to hire — can be the difference between a $500 report and a $30,000 surprise. This guide tells you exactly what to do.</p>

        <div style={styles.grid2}>
          <div style={styles.statBox}><div style={styles.statNum}>$200–500</div><div style={styles.statLabel}>Typical DFW foundation inspection cost</div></div>
          <div style={styles.statBox}><div style={styles.statNum}>$500–2K</div><div style={styles.statLabel}>Structural engineer report (when needed)</div></div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>📋</span> When to Get a Foundation Inspection</div>
          <ul style={styles.list}>
            {whenToInspect.map((item, i) => (
              <li key={i} style={{ ...styles.listItem, flexDirection: 'column' as const, gap: '4px' }}>
                <div style={{ fontWeight: '700', color: '#ffffff' }}>{item.icon} {item.trigger}</div>
                <div style={{ color: '#94a3b8′ }}>{item.detail}</div>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>🔎</span> What Inspectors Look For</div>
          <ul style={styles.list}>
            {inspectorLooks.map((item, i) => <li key={i} style={styles.listItem}><span>🔸</span><span>{item}</span></li>)}
          </ul>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>👷</span> Certified Inspector vs. Structural Engineer</div>
          <div style={styles.compRow}>
            <div style={styles.compBox}>
              <div style={styles.compTitle}>🏗️ Foundation Inspector</div>
              <ul style={styles.list}>
                {['Cost: $200–$500', 'Trained to evaluate foundations specifically', 'Provides repair recommendations', 'Usually affiliated with repair company', 'Good for most residential situations'].map((t, i) => <li key={i} style={{ ...styles.listItem, fontSize: '13px' }}><span>•</span><span>{t}</span></li>)}
              </ul>
            </div>
            <div style={styles.compBox}>
              <div style={{ ...styles.compTitle, color: '#a78bfa' }}>📐 Structural Engineer (PE)</div>
              <ul style={styles.list}>
                {['Cost: $500–$2,000', 'Licensed Professional Engineer', 'Stamped report accepted by insurers/lenders', 'No repair conflict of interest', 'Required for permits and major claims'].map((t, i) => <li key={i} style={{ ...styles.listItem, fontSize: '13px' }}><span>•</span><span>{t}</span></li>)}
              </ul>
            </div>
          </div>
          <div style={styles.greenNote}>✅ Get a structural engineer when: buying a home with visible problems, filing an insurance claim, or preparing for a repair over $10,000.</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>🚨</span> Red Flag Findings That Mean Immediate Action</div>
          {redFlags.map((flag, i) => <div key={i} style={styles.redFlag}>🚨 {flag}</div>)}
          <div style={styles.warnNote}>⚠️ If an inspector identifies any of these findings, do not delay. Get a PE report and remediation estimate within 30 days.</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>🧮</span> Symptom Checklist — Inspector or Engineer?</div>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '16px' }}>Check all symptoms you're currently observing:</p>
          {checkItems.map(item => (
            <label key={item.key} style={styles.checkLabel} onClick={() => toggle(item.key)}>
              <div style={{ width: '20px', height: '20px', borderRadius: '4px', backgroundColor: checked.includes(item.key) ? '#F5E642′ : '#0d1a2e', border: '2px solid #1e3a5f', flexShrink: 0, display: ’flex', alignItems: 'center', justifyContent: 'center', color: '#0A1628', fontWeight: '800', fontSize: '13px' }}>{checked.includes(item.key) ? '✓' : ''}</div>
              <span>{item.label}</span>
            </label>
          ))}
          <button style={{ ...styles.btn, marginTop: '16px' }} onClick={evaluate}>Get My Recommendation</button>
          {result && (
            <div style={styles.result}>
              <div style={{ color: '#F5E642', fontWeight: '800', fontSize: '20px', marginBottom: '4px' }}>{result.rec}</div>
              <div style={{ fontSize: '16px', marginBottom: '12px' }}>{result.urgency}</div>
              <div style={{ color: '#94a3b8', fontSize: '14px' }}>{result.why}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center' as const, color: '#475569', fontSize: '13px', marginTop: '32px' }}>
          ProLnk — Connecting DFW homeowners with licensed foundation specialists
        </div>
      </div>
    </div>
  );
}
