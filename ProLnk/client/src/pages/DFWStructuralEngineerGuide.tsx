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
  select: { width: '100%', backgroundColor: '#0d1a2e', color: '#ffffff', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', marginBottom: '16px' },
  btn: { backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%' },
  result: { backgroundColor: '#0d1a2e', borderRadius: '10px', padding: '20px', marginTop: '16px', border: '2px solid #F5E642′ },
  warnNote: { backgroundColor: '#2d1000', border: '1px solid #9a3412', borderRadius: '8px', padding: '14px 18px', color: '#fdba74', fontSize: '14px', marginTop: '16px' },
  greenNote: { backgroundColor: '#0d2e1a', border: '1px solid #166534', borderRadius: '8px', padding: '14px 18px', color: '#86efac', fontSize: '14px', marginTop: '16px' },
  roleRow: { display: 'flex', gap: '16px', marginBottom: '16px' },
  roleBox: { flex: 1, backgroundColor: '#0d1a2e', borderRadius: '10px', padding: '16px' },
  roleTitle: { fontWeight: '700', marginBottom: '10px', fontSize: '14px' },
  reportItem: { backgroundColor: '#0d1a2e', borderRadius: '8px', padding: '14px', marginBottom: '10px', borderLeft: '3px solid #F5E642′ },
  reportTitle: { fontWeight: '700', fontSize: '14px', marginBottom: '4px', color: '#F5E642′ },
  reportDesc: { color: '#94a3b8', fontSize: '13px' },
  needTag: { fontSize: '22px', fontWeight: '800', marginBottom: '8px' },
  needYes: { color: '#22c55e' },
  needNo: { color: '#94a3b8′ },
  needMaybe: { color: '#f59e0b' },
};

const whenToHire = [
  { icon: '🏗️', reason: 'Foundation concerns', detail: 'Wide cracks, significant settling, or before a major foundation repair. Engineer provides a stamped report for insurance and contractors.' },
  { icon: '🚪', reason: 'Removing a load-bearing wall', detail: 'Contractors cannot legally determine if a wall is load-bearing without an engineer. A PE specifies beam size, connections, and post requirements.' },
  { icon: '🛏️', reason: 'Adding a room addition or second story', detail: 'New loads must be calculated against existing structure capacity. Required for permits in all DFW cities.' },
  { icon: '🏠', reason: 'Buying an older home (pre-1980)', detail: 'Protect yourself before closing. An engineer finds structural issues a home inspector isn\’t licensed to assess.' },
  { icon: '🌩️', reason: 'Storm or wind damage', detail: 'Insurance adjusters respect PE reports. Ensures you get full claim value for structural repairs.' },
  { icon: '🏊', reason: 'Adding a pool', detail: 'Pools affect soil loading and drainage. Engineered plans required for permits in most DFW jurisdictions.' },
];

const vsContractor = [
  { aspect: 'Can determine if wall is load-bearing', eng: '✅ Yes (licensed to assess)', cont: '❌ No (not legally qualified)' },
  { aspect: 'Provides stamped engineering drawings', eng: '✅ Required for permits', cont: '❌ Cannot stamp drawings' },
  { aspect: 'Insurance claim support', eng: '✅ Reports accepted by insurers', cont: '❌ Reports not typically accepted' },
  { aspect: 'Performs the actual repair', eng: '❌ Design only, not construction', cont: '✅ Builds the work' },
  { aspect: 'Conflicts of interest', eng: '✅ None — fee-only advice', cont: '⚠️ Profit motive in repair scope' },
];

const reportSections = [
  { name: 'Site Observations', desc: 'Documented conditions observed during site visit — crack locations, measurements, drainage, soil conditions.' },
  { name: 'Structural Assessment', desc: 'Engineering analysis of observed conditions. Identifies structural risk level and likely cause.' },
  { name: 'Recommendations', desc: 'Specific repair or remediation recommendations with methodology. Contractors bid against this scope.' },
  { name: 'Engineer\’s Stamp & Signature', desc: 'PE license number and stamp — required for permit applications and insurance claims.' },
  { name: 'Drawings (when applicable)', desc: 'Engineered plans for beam sizing, connection details, or foundation repair specs.' },
];

const projectLogic: Record<string, { need: string; label: string; cost: string; expect: string }> = {
  foundation: { need: 'yes', label: '✅ Yes — Engineer Required', cost: '$600–1,500', expect: 'Elevation survey, crack analysis, drainage assessment, repair scope. Stamped report for contractor bids and insurance.' },
  wall_removal: { need: 'yes', label: '✅ Yes — Engineer Required', cost: '$500–1,200', expect: 'Load path analysis, beam sizing, post and connection specifications. Drawings for permit application.' },
  room_addition: { need: 'yes', label: '✅ Yes — Engineer Required', cost: '$800–2,000', expect: 'Structural calculations for new loads, foundation adequacy review, framing plans. Required for DFW building permits.' },
  buying_older: { need: 'maybe', label: '🟡 Recommended If Issues Found', cost: '$500–1,000', expect: 'Pre-purchase structural review. Hire after standard home inspection if inspector flags concerns. Negotiation leverage for repairs.' },
  storm_damage: { need: 'yes', label: '✅ Yes — Strongly Recommended', cost: '$600–1,500', expect: 'Damage documentation for insurance claim. PE report maximizes claim value and ensures full scope is covered.' },
  pool: { need: 'maybe', label: '🟡 Check With Your City', cost: '$500–1,000', expect: 'Many DFW cities require engineered plans for pools. Pool builder should confirm permit requirements before you hire.' },
  roof: { need: 'no', label: '❌ Typically Not Needed', cost: 'N/A', expect: 'Standard roof replacement doesn\’t require a structural engineer unless there\’s underlying structural damage to rafters or trusses.' },
  hvac: { need: 'no', label: '❌ Not Needed', cost: 'N/A', expect: 'HVAC replacement is a mechanical trade, not structural. Licensed HVAC contractor handles permits independently.' },
};

export default function DFWStructuralEngineerGuide() {
  const [project, setProject] = useState('');
  const [result, setResult] = useState<null | { need: string; label: string; cost: string; expect: string }>(null);

  function evaluate() {
    if (!project) return;
    setResult(projectLogic[project] || null);
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.badge}>📍 DFW Structural Engineering Guide</div>
        <h1 style={styles.h1}>When to Hire a <span style={styles.accent}>Structural Engineer</span> in DFW</h1>
        <p style={styles.lead}>Most DFW homeowners don't know when they need a structural engineer vs. a contractor — and that gap can cost them thousands in insurance claims, permit rejections, or botched repairs.</p>

        <div style={styles.grid2}>
          <div style={styles.statBox}><div style={styles.statNum}>$500–2K</div><div style={styles.statLabel}>Typical DFW structural engineer report cost</div></div>
          <div style={styles.statBox}><div style={styles.statNum}>PE</div><div style={styles.statLabel}>Licensed Professional Engineer — the only title that can stamp structural drawings</div></div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>📋</span> When DFW Homeowners Need a Structural Engineer</div>
          <ul style={styles.list}>
            {whenToHire.map((item, i) => (
              <li key={i} style={{ ...styles.listItem, flexDirection: 'column' as const, gap: '4px' }}>
                <div style={{ fontWeight: '700', color: '#ffffff' }}>{item.icon} {item.reason}</div>
                <div style={{ color: '#94a3b8′ }}>{item.detail}</div>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>⚖️</span> Structural Engineer vs. Contractor — Key Differences</div>
          <div style={{ overflowX: 'auto' as const }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #1e3a5f' }}>
                  <th style={{ textAlign: 'left' as const, padding: '8px 0', color: '#94a3b8', fontSize: '13px' }}>Capability</th>
                  <th style={{ textAlign: 'left' as const, padding: '8px 0', color: '#F5E642', fontSize: '13px' }}>Structural Engineer (PE)</th>
                  <th style={{ textAlign: 'left' as const, padding: '8px 0', color: '#a78bfa', fontSize: '13px' }}>Contractor</th>
                </tr>
              </thead>
              <tbody>
                {vsContractor.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1e3a5f' }}>
                    <td style={{ padding: '12px 0 12px 0', color: '#cbd5e1', fontSize: '13px', paddingRight: '16px' }}>{row.aspect}</td>
                    <td style={{ padding: '12px 0', color: '#cbd5e1', fontSize: '13px' }}>{row.eng}</td>
                    <td style={{ padding: '12px 0', color: '#cbd5e1', fontSize: '13px' }}>{row.cont}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={styles.greenNote}>✅ Best practice: hire an engineer for the assessment, then get contractor bids based on the engineer's scope. Eliminates conflicts of interest.</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>📄</span> What's Included in a Structural Engineering Report</div>
          {reportSections.map((item, i) => (
            <div key={i} style={styles.reportItem}>
              <div style={styles.reportTitle}>{item.name}</div>
              <div style={styles.reportDesc}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>🧮</span> Do I Need a Structural Engineer?</div>
          <label style={styles.label}>What type of project or situation?</label>
          <select style={styles.select} value={project} onChange={e => setProject(e.target.value)}>
            <option value=''>Select your project...</option>
            <option value='foundation'>Foundation cracks or settling</option>
            <option value='wall_removal'>Removing a wall (possible load-bearing)</option>
            <option value='room_addition'>Adding a room or second story</option>
            <option value='buying_older'>Buying a home built before 1980</option>
            <option value='storm_damage'>Storm or wind damage</option>
            <option value='pool'>Adding a swimming pool</option>
            <option value='roof'>Roof replacement (no damage)</option>
            <option value='hvac'>HVAC replacement</option>
          </select>
          <button style={styles.btn} onClick={evaluate}>Get My Answer</button>
          {result && (
            <div style={styles.result}>
              <div style={{ ...(result.need === 'yes' ? styles.needYes : result.need === 'maybe' ? styles.needMaybe : styles.needNo), ...styles.needTag }}>{result.label}</div>
              {result.cost !== 'N/A' && <div style={{ color: '#86efac', fontWeight: '700', fontSize: '15px', marginBottom: '12px' }}>💰 Typical Cost: {result.cost}</div>}
              <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6′ }}><strong style={{ color: '#F5E642' }}>What to expect:</strong> {result.expect}</div>
              {result.need === 'yes' && <div style={styles.warnNote}>⚠️ Do not proceed with construction or repairs until you have a PE report in hand. Permits cannot be issued without stamped drawings where required.</div>}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center' as const, color: '#475569', fontSize: '13px', marginTop: '32px' }}>
          ProLnk — Connecting DFW homeowners with licensed structural engineers and foundation specialists
        </div>
      </div>
    </div>
  );
}
