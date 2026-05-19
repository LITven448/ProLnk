import { useState } from 'react';

const styles = {
  page: { backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' },
  container: { maxWidth: '860px', margin: '0 auto' },
  badge: { backgroundColor: '#1a2d4a', color: '#F5E642', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', display: 'inline-block', marginBottom: '16px' },
  h1: { fontSize: '36px', fontWeight: '800', marginBottom: '12px', lineHeight: '1.2' },
  accent: { color: '#F5E642' },
  lead: { color: '#94a3b8', fontSize: '18px', marginBottom: '40px', lineHeight: '1.6' },
  card: { backgroundColor: '#111f38', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' },
  cardTitle: { fontSize: '20px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' },
  grid3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' },
  statBox: { backgroundColor: '#0d1a2e', borderRadius: '10px', padding: '20px', textAlign: 'center' as const },
  statNum: { fontSize: '32px', fontWeight: '800', color: '#F5E642' },
  statLabel: { color: '#94a3b8', fontSize: '13px', marginTop: '4px' },
  matCard: { backgroundColor: '#0d1a2e', borderRadius: '10px', padding: '16px' },
  matTitle: { fontWeight: '700', fontSize: '15px', marginBottom: '6px' },
  matCost: { color: '#F5E642', fontSize: '14px', fontWeight: '700', marginBottom: '6px' },
  matDesc: { color: '#94a3b8', fontSize: '13px' },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  listItem: { padding: '10px 0', borderBottom: '1px solid #1e3a5f', color: '#cbd5e1', display: 'flex', gap: '10px', fontSize: '14px' },
  label: { color: '#94a3b8', fontSize: '14px', marginBottom: '8px', display: 'block' },
  select: { width: '100%', backgroundColor: '#0d1a2e', color: '#ffffff', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', marginBottom: '16px' },
  input: { width: '100%', backgroundColor: '#0d1a2e', color: '#ffffff', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', marginBottom: '16px', boxSizing: 'border-box' as const },
  btn: { backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%' },
  result: { backgroundColor: '#0d1a2e', borderRadius: '10px', padding: '20px', marginTop: '16px', border: '2px solid #F5E642' },
  warnNote: { backgroundColor: '#2d1000', border: '1px solid #9a3412', borderRadius: '8px', padding: '14px 18px', color: '#fdba74', fontSize: '14px', marginTop: '16px' },
  greenNote: { backgroundColor: '#0d2e1a', border: '1px solid #166534', borderRadius: '8px', padding: '14px 18px', color: '#86efac', fontSize: '14px', marginTop: '16px' },
  costLine: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1e3a5f', fontSize: '14px', color: '#cbd5e1' },
  total: { display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: '18px', fontWeight: '800', color: '#F5E642' },
};

const materials = [
  { icon: '🧱', name: 'Concrete Block (CMU)', range: '$20–40/LF', desc: 'Most common in DFW. Durable, takes any height, integrates drainage easily. Requires rebar and footing.' },
  { icon: '🪵', name: 'Timber / Railroad Tie', range: '$10–20/LF', desc: 'Budget option, good for low walls (under 4 ft). Degrades faster in DFW heat. Not for water contact.' },
  { icon: '🪨', name: 'Natural Stone', range: '$35–60/LF', desc: 'Premium look, naturally porous (good drainage). Higher labor cost. Great for pool areas and landscaping.' },
  { icon: '⚙️', name: 'Steel/Galvanized Corten', range: '$30–55/LF', desc: 'Modern aesthetic, extremely durable. Excellent for slopes and pool decks. Requires professional install.' },
  { icon: '🏗️', name: 'Poured Concrete', range: '$40–80/LF', desc: 'Strongest option for tall walls or heavy load (pool, driveway). Requires forms and engineering for walls over 6 ft.' },
];

const drainageReqs = [
  { icon: '🪨', text: 'Gravel backfill (3/4" crushed stone) directly behind wall for drainage path' },
  { icon: '🔧', text: 'Perforated drain pipe at base of wall — required for DFW clay soil' },
  { icon: '💧', text: 'Weep holes every 6–8 feet for concrete block walls' },
  { icon: '📐', text: 'Geotextile fabric between soil and gravel to prevent clay migration' },
  { icon: '🌧️', text: 'Top drainage swale to divert surface water away from wall' },
];

const permitRules = [
  'Walls under 3 ft in DFW typically require no permit',
  'Walls 3 ft and over require a permit in most DFW cities',
  'Engineered drawings required for walls over 4 ft in most jurisdictions',
  'HOA approval required regardless of city permits in most subdivisions',
  'Pool-adjacent walls often require separate structural review',
];

const matCostPerLF: Record<string, [number, number]> = {
  block: [20, 40], timber: [10, 20], stone: [35, 60], steel: [30, 55], concrete: [40, 80],
};
const drainageAddOn = 8;

export default function DFWRetainingWallGuide() {
  const [height, setHeight] = useState('');
  const [length, setLength] = useState('');
  const [material, setMaterial] = useState('');
  const [result, setResult] = useState<null | { low: number; high: number; drainage: number; total_low: number; total_high: number; note: string }>(null);

  function calculate() {
    const h = parseFloat(height);
    const l = parseFloat(length);
    if (!h || !l || !material || !matCostPerLF[material]) return;
    const [low, high] = matCostPerLF[material];
    const drainage = l * drainageAddOn;
    const base_low = l * low;
    const base_high = l * high;
    const permit = h >= 3 ? 500 : 0;
    const total_low = base_low + drainage + permit;
    const total_high = base_high + drainage + permit;
    const note = h >= 6 ? 'Walls over 6 ft require a licensed structural engineer and engineered drawings. Add $1,000–2,500 to estimates above.' : h >= 3 ? 'A permit is required. Budget 4–6 weeks for city approval before construction can begin.' : 'No permit typically required, but always verify with your city and HOA.';
    setResult({ low: base_low, high: base_high, drainage, total_low, total_high, note });
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.badge}>📍 DFW Retaining Wall Guide</div>
        <h1 style={styles.h1}>Retaining Wall Guide <span style={styles.accent}>for DFW Homeowners</span></h1>
        <p style={styles.lead}>DFW's sloped lots, erosion-prone clay soil, and strict HOA requirements make retaining walls one of the most permit-sensitive projects homeowners face. Here's everything you need to know before hiring anyone.</p>

        <div style={styles.grid2}>
          <div style={styles.statBox}><div style={styles.statNum}>$10–80</div><div style={styles.statLabel}>Per linear foot depending on material and height</div></div>
          <div style={styles.statBox}><div style={styles.statNum}>3 ft</div><div style={styles.statLabel}>Height threshold requiring a permit in most DFW cities</div></div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>🏔️</span> When You Need a Retaining Wall in DFW</div>
          <ul style={styles.list}>
            {['Your lot has a slope over 2 feet of elevation change', 'Soil is eroding from your yard after heavy rains', 'You\’re adding a pool deck and need level ground', 'You want to create terraced garden beds on a hillside', 'A neighbor\’s drainage is pushing water onto your property', 'Building a driveway cut that exposes a soil face'].map((item, i) => <li key={i} style={styles.listItem}><span>🔸</span><span>{item}</span></li>)}
          </ul>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>🧱</span> Material Options for DFW</div>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
            {materials.map((m, i) => (
              <div key={i} style={styles.matCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={styles.matTitle}>{m.icon} {m.name}</div>
                  <div style={styles.matCost}>{m.range}</div>
                </div>
                <div style={styles.matDesc}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>💧</span> DFW Clay Soil Drainage Requirements</div>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '16px', lineHeight: '1.6' }}>DFW's heavy clay soil holds water and generates enormous pressure (hydrostatic pressure) behind retaining walls. Without proper drainage, even a well-built wall will fail within 5–10 years.</p>
          <ul style={styles.list}>
            {drainageReqs.map((item, i) => <li key={i} style={styles.listItem}><span>{item.icon}</span><span>{item.text}</span></li>)}
          </ul>
          <div style={styles.warnNote}>⚠️ Do not skip drainage on DFW clay. A $2,000 drainage system prevents a $15,000 wall failure.</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>📋</span> Permit Requirements in DFW</div>
          <ul style={styles.list}>
            {permitRules.map((item, i) => <li key={i} style={styles.listItem}><span>🔸</span><span>{item}</span></li>)}
          </ul>
          <div style={styles.greenNote}>✅ Always call your city's building department before starting. Violations can result in forced removal at your expense.</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>🧮</span> Retaining Wall Cost Estimator</div>
          <label style={styles.label}>Wall height (feet)</label>
          <input style={styles.input} type='number' placeholder='e.g., 4' value={height} onChange={e => setHeight(e.target.value)} />
          <label style={styles.label}>Wall length (linear feet)</label>
          <input style={styles.input} type='number' placeholder='e.g., 50' value={length} onChange={e => setLength(e.target.value)} />
          <label style={styles.label}>Material type</label>
          <select style={styles.select} value={material} onChange={e => setMaterial(e.target.value)}>
            <option value=''>Select material...</option>
            <option value='block'>Concrete Block (CMU)</option>
            <option value='timber'>Timber / Railroad Tie</option>
            <option value='stone'>Natural Stone</option>
            <option value='steel'>Steel / Corten</option>
            <option value='concrete'>Poured Concrete</option>
          </select>
          <button style={styles.btn} onClick={calculate}>Calculate Estimate</button>
          {result && (
            <div style={styles.result}>
              <div style={{ fontWeight: '700', color: '#F5E642', marginBottom: '12px', fontSize: '16px' }}>Cost Breakdown</div>
              <div style={styles.costLine}><span>Wall construction</span><span>${result.low.toLocaleString()} – ${result.high.toLocaleString()}</span></div>
              <div style={styles.costLine}><span>Drainage system (recommended)</span><span>+${result.drainage.toLocaleString()}</span></div>
              {parseFloat(height) >= 3 && <div style={styles.costLine}><span>Permit (estimated)</span><span>+$500</span></div>}
              <div style={styles.total}><span>Total Estimate</span><span>${result.total_low.toLocaleString()} – ${result.total_high.toLocaleString()}</span></div>
              <div style={styles.warnNote}>⚠️ {result.note}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center' as const, color: '#475569', fontSize: '13px', marginTop: '32px' }}>
          ProLnk — Connecting DFW homeowners with licensed retaining wall contractors
        </div>
      </div>
    </div>
  );
}
