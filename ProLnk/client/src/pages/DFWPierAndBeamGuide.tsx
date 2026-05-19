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
  col: { flex: 1, backgroundColor: '#0d1a2e', borderRadius: '10px', padding: '18px' },
  row: { display: 'flex', gap: '16px', marginBottom: '24px' },
  colTitle: { fontWeight: '700', marginBottom: '10px', fontSize: '15px' },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  listItem: { padding: '8px 0', borderBottom: '1px solid #1e3a5f', color: '#cbd5e1', display: 'flex', gap: '10px', fontSize: '14px' },
  label: { color: '#94a3b8', fontSize: '14px', marginBottom: '8px', display: 'block' },
  select: { width: '100%', backgroundColor: '#0d1a2e', color: '#ffffff', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', marginBottom: '16px' },
  btn: { backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%' },
  result: { backgroundColor: '#0d1a2e', borderRadius: '10px', padding: '20px', marginTop: '16px', border: '2px solid #F5E642′ },
  costTag: { backgroundColor: '#0d2e1a', color: '#86efac', borderRadius: '8px', padding: '10px 14px', fontSize: '15px', fontWeight: '700', margin: '6px 0′ },
  warnNote: { backgroundColor: '#2d1000', border: '1px solid #9a3412', borderRadius: '8px', padding: '14px 18px', color: '#fdba74', fontSize: '14px', marginTop: '16px' },
  greenNote: { backgroundColor: '#0d2e1a', border: '1px solid #166534', borderRadius: '8px', padding: '14px 18px', color: '#86efac', fontSize: '14px', marginTop: '16px' },
  problemCard: { backgroundColor: '#0d1a2e', borderRadius: '8px', padding: '14px', marginBottom: '10px' },
};

const problems = [
  { icon: '🪵', name: 'Wood Rot', desc: 'Moisture under pier and beam homes attacks wooden beams and joists. Look for soft spots in floors.', severity: 'High' },
  { icon: '💧', name: 'Moisture Accumulation', desc: 'Inadequate ventilation traps humidity under the home. DFW summers make this worse.', severity: 'High' },
  { icon: '📐', name: 'Pier Settling', desc: 'Individual concrete or block piers sink unevenly, causing sloping floors.', severity: 'Medium' },
  { icon: '🐜', name: 'Pest Intrusion', desc: 'Open crawl space attracts termites, rodents, and insects — all of which damage wood framing.', severity: 'High' },
  { icon: '🔩', name: 'Beam Deterioration', desc: 'Main beams lose load capacity over decades, especially without treatment.', severity: 'Medium' },
];

const repairTypes: Record<string, { type: string; cost: string; desc: string }> = {
  old_rot_settle: { type: 'Full Releveling + Wood Replacement', cost: '$8,000 – $20,000+', desc: 'Replace rotted joists, sister beams, and relevel all piers. Most extensive repair for older pier and beam homes.' },
  old_settle: { type: 'Pier Releveling', cost: '$3,000 – $8,000', desc: 'Shim or replace settling piers to bring floors back to level. Often done without touching wood framing.' },
  old_rot: { type: 'Wood Repair + Moisture Control', cost: '$4,000 – $12,000', desc: 'Replace rotted beams and joists, add vapor barrier, improve ventilation.' },
  mid_settle: { type: 'Partial Releveling', cost: '$1,500 – $4,000', desc: 'Address specific settling piers — common in 1970s–1990s pier and beam homes.' },
  mid_rot: { type: 'Spot Repair + Treatment', cost: '$2,000 – $6,000', desc: 'Treat and reinforce affected wood, add dehumidification.' },
  mid_none: { type: 'Preventive Treatment', cost: '$500 – $2,000', desc: 'Moisture barrier, ventilation improvement, and annual inspection to prevent issues.' },
  new_any: { type: 'Inspection + Minor Fixes', cost: '$300 – $1,500', desc: 'Newer pier and beam homes rarely need major work. Inspection-first approach.' },
};

export default function DFWPierAndBeamGuide() {
  const [houseAge, setHouseAge] = useState('');
  const [problems2, setProblems2] = useState<string[]>([]);
  const [result, setResult] = useState<null | { type: string; cost: string; desc: string }>(null);

  function toggleProblem(p: string) {
    setProblems2(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  }

  function calculate() {
    let key = '';
    if (houseAge === 'post90') key = 'new_any';
    else if (houseAge === '70to90') {
      if (problems2.includes('settle') && problems2.includes('rot')) key = 'old_rot_settle';
      else if (problems2.includes('settle')) key = 'mid_settle';
      else if (problems2.includes('rot')) key = 'mid_rot';
      else key = 'mid_none';
    } else {
      if (problems2.includes('settle') && problems2.includes('rot')) key = 'old_rot_settle';
      else if (problems2.includes('settle')) key = 'old_settle';
      else if (problems2.includes('rot')) key = 'old_rot';
      else key = 'mid_none';
    }
    setResult(repairTypes[key] || repairTypes['mid_none']);
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.badge}>📍 DFW Foundation Guide</div>
        <h1 style={styles.h1}>Pier and Beam <span style={styles.accent}>Foundation Guide</span> for DFW</h1>
        <p style={styles.lead}>Most DFW homes built before 1970 sit on pier and beam foundations. Understanding what you have — and how to maintain it — can save you tens of thousands in repairs.</p>

        <div style={styles.grid2}>
          <div style={styles.statBox}><div style={styles.statNum}>~40%</div><div style={styles.statLabel}>Pre-1970 DFW homes with pier and beam foundations</div></div>
          <div style={styles.statBox}><div style={styles.statNum}>$1.5K–$20K</div><div style={styles.statLabel}>Typical repair cost range depending on condition</div></div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>⚖️</span> Pier and Beam vs. Slab Foundation</div>
          <div style={styles.row}>
            <div style={styles.col}>
              <div style={{ ...styles.colTitle, color: '#F5E642′ }}>✅ Pier & Beam Pros</div>
              <ul style={styles.list}>
                {['Easier access to plumbing and wiring underneath', 'Individual piers can be releveled without major excavation', 'Less affected by sudden soil shifts — more flexible', 'Crawl space provides natural buffer from ground moisture'].map((t, i) => <li key={i} style={styles.listItem}><span>•</span><span>{t}</span></li>)}
              </ul>
            </div>
            <div style={styles.col}>
              <div style={{ ...styles.colTitle, color: '#ef4444′ }}>❌ Pier & Beam Cons</div>
              <ul style={styles.list}>
                {['Wood components vulnerable to rot and pests', 'Requires active moisture and ventilation management', 'Can feel "bouncy" — less solid than slab', 'More maintenance than modern slab construction'].map((t, i) => <li key={i} style={styles.listItem}><span>•</span><span>{t}</span></li>)}
              </ul>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>🔍</span> Common Problems in DFW Pier and Beam Homes</div>
          {problems.map((p, i) => (
            <div key={i} style={styles.problemCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>{p.icon} {p.name}</div>
                <div style={{ color: p.severity === 'High' ? '#ef4444′ : '#f59e0b', fontSize: '12px', fontWeight: '700' }}>{p.severity} Risk</div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '14px' }}>{p.desc}</div>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>📅</span> When to Relevel a Pier and Beam Foundation</div>
          <ul style={styles.list}>
            {[
              'Floors feel noticeably sloped or bouncy when walking',
              'Doors or windows stick and won\’t close properly',
              'Visible gaps between walls and ceiling or floor',
              'You can see daylight or large gaps under the home',
              'During purchase inspection on a home over 30 years old',
            ].map((item, i) => <li key={i} style={styles.listItem}><span>🔸</span><span>{item}</span></li>)}
          </ul>
          <div style={styles.greenNote}>✅ Pier and beam releveling is generally less invasive and cheaper than slab repair — don't put it off.</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>🧮</span> Repair Type Estimator</div>
          <label style={styles.label}>House age (when built)</label>
          <select style={styles.select} value={houseAge} onChange={e => setHouseAge(e.target.value)}>
            <option value=''>Select age...</option>
            <option value='pre70'>Before 1970</option>
            <option value='70to90'>1970–1990</option>
            <option value='post90'>After 1990</option>
          </select>
          <label style={styles.label}>Detected problems (select all that apply)</label>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' as const, marginBottom: '16px' }}>
            {[{ key: 'settle', label: '📐 Pier Settling / Sloped Floors' }, { key: 'rot', label: '🪵 Wood Rot or Soft Spots' }, { key: 'pest', label: '🐜 Pest Evidence' }, { key: 'moisture', label: '💧 Moisture / Humidity' }].map(p => (
              <div key={p.key} onClick={() => toggleProblem(p.key)} style={{ padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', backgroundColor: problems2.includes(p.key) ? '#F5E642′ : '#0d1a2e', color: problems2.includes(p.key) ? '#0A1628' : '#ffffff', border: '1px solid #1e3a5f' }}>{p.label}</div>
            ))}
          </div>
          <button style={styles.btn} onClick={calculate}>Get Repair Recommendation</button>
          {result && (
            <div style={styles.result}>
              <div style={{ color: '#F5E642', fontWeight: '800', fontSize: '18px', marginBottom: '8px' }}>{result.type}</div>
              <div style={styles.costTag}>💰 Estimated Cost: {result.cost}</div>
              <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '10px' }}>{result.desc}</div>
              <div style={styles.warnNote}>⚠️ Always get 2–3 quotes from licensed foundation contractors. Get a structural engineer report first for repairs over $5,000.</div>
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
