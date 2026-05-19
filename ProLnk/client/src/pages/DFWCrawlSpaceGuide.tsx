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
  statBox: { backgroundColor: '#0d1a2e', borderRadius: '10px', padding: '20px', textAlign: 'center' as const },
  statNum: { fontSize: '32px', fontWeight: '800', color: '#F5E642' },
  statLabel: { color: '#94a3b8', fontSize: '13px', marginTop: '4px' },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  listItem: { padding: '10px 0', borderBottom: '1px solid #1e3a5f', color: '#cbd5e1', display: 'flex', gap: '10px', fontSize: '14px' },
  label: { color: '#94a3b8', fontSize: '14px', marginBottom: '8px', display: 'block' },
  select: { width: '100%', backgroundColor: '#0d1a2e', color: '#ffffff', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', marginBottom: '16px' },
  btn: { backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%' },
  result: { backgroundColor: '#0d1a2e', borderRadius: '10px', padding: '20px', marginTop: '16px', border: '2px solid #F5E642' },
  warnNote: { backgroundColor: '#2d1000', border: '1px solid #9a3412', borderRadius: '8px', padding: '14px 18px', color: '#fdba74', fontSize: '14px', marginTop: '16px' },
  greenNote: { backgroundColor: '#0d2e1a', border: '1px solid #166534', borderRadius: '8px', padding: '14px 18px', color: '#86efac', fontSize: '14px', marginTop: '16px' },
  typeCard: { backgroundColor: '#0d1a2e', borderRadius: '10px', padding: '16px', marginBottom: '12px', borderLeft: '3px solid #F5E642' },
  typeTitle: { fontWeight: '700', fontSize: '15px', marginBottom: '6px', color: '#F5E642' },
  typeDesc: { color: '#94a3b8', fontSize: '13px', lineHeight: '1.6' },
  typeVerdict: { color: '#cbd5e1', fontSize: '13px', marginTop: '8px', fontWeight: '600' },
  costRow: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1e3a5f', color: '#cbd5e1', fontSize: '14px' },
};

const crawlTypes = [
  {
    icon: '💨', name: 'Vented Crawl Space',
    desc: 'Traditional design — vents in foundation walls allow outdoor air to circulate. Meant to dry out moisture.',
    verdict: 'NOT recommended for DFW — outdoor humidity in summer (65–80% RH) makes vented crawl spaces a moisture trap. Mold grows within months.',
    dfwNote: '⚠️ Problem for DFW',
  },
  {
    icon: '🧱', name: 'Encapsulated Crawl Space',
    desc: 'All vents sealed. Heavy-duty vapor barrier (20 mil) covers floor and walls. Dehumidifier keeps RH below 55%.',
    verdict: 'Best practice for DFW — eliminates moisture, mold risk, and improves HVAC efficiency. Standard recommendation from foundation pros.',
    dfwNote: '✅ Recommended for DFW',
  },
  {
    icon: '❄️', name: 'Conditioned Crawl Space',
    desc: 'Encapsulated AND connected to your home\’s HVAC system. Heated/cooled like interior space.',
    verdict: 'Premium option — warmest floors, best air quality. Higher HVAC operating cost but lowest moisture risk long-term.',
    dfwNote: '✅ Premium Option',
  },
];

const components = [
  { icon: '🧱', name: 'Vapor Barrier', detail: '20-mil polyethylene sheeting covering all soil surfaces and walls. The foundation of any encapsulation project.' },
  { icon: '💧', name: 'Dehumidifier', detail: 'Crawl-space rated unit (not a portable home unit). Maintains 45–55% RH year-round. Drains to outside or condensate pump.' },
  { icon: '🔒', name: 'Vent Seals', detail: 'Magnetic or foam vent covers to block outdoor humid air entry. Installed in all existing foundation vents.' },
  { icon: '🚰', name: 'Drainage Mat', detail: 'Dimple mat under vapor barrier to handle minor groundwater and allow drainage to sump or exterior.' },
  { icon: '🏗️', name: 'Sump Pump', detail: 'If water actively intrudes — collects water and pumps it outside. Required for wet or flooded crawl spaces.' },
  { icon: '🔩', name: 'Structural Piers', detail: 'If settling has occurred, screw or concrete piers can be installed through encapsulated crawl space to relevel floors.' },
];

const solutionMap: Record<string, { solution: string; cost: string; steps: string[] }> = {
  small_dry: { solution: 'Preventive Encapsulation', cost: '$3,000 – $6,000', steps: ['Install 20-mil vapor barrier', 'Seal foundation vents', 'Add commercial-grade dehumidifier', 'Annual inspection'] },
  small_damp: { solution: 'Full Encapsulation + Dehumidifier', cost: '$4,500 – $8,000', steps: ['Treat any existing mold first ($500–2K)', 'Install 20-mil vapor barrier', 'Seal all vents and access doors', 'Install dehumidifier with auto-drain'] },
  small_wet: { solution: 'Encapsulation + Sump Pump', cost: '$6,000 – $12,000', steps: ['Identify and fix water source first', 'Install drainage mat + sump pump', 'Full encapsulation', 'Dehumidifier + monitoring system'] },
  small_flooded: { solution: 'Emergency Remediation + Full Rebuild', cost: '$8,000 – $18,000', steps: ['Emergency water extraction', 'Structural inspection for damage', 'Mold remediation', 'Full encapsulation system with sump', 'Possible structural pier work'] },
  large_dry: { solution: 'Preventive Encapsulation', cost: '$5,000 – $10,000', steps: ['Install 20-mil vapor barrier (larger area = more material)', 'Seal all vents', 'Install 2 dehumidifiers for larger space', 'Monitor with hygrometer'] },
  large_damp: { solution: 'Full Encapsulation + Multi-Unit Dehumidifier', cost: '$7,000 – $13,000', steps: ['Mold assessment and treatment if needed', 'Full barrier installation', 'Multi-unit or high-capacity dehumidifier', 'Vent sealing and access door replacement'] },
  large_wet: { solution: 'Encapsulation + Drainage System', cost: '$9,000 – $18,000', steps: ['French drain or sump pump system', 'Full encapsulation', 'Industrial dehumidifier', 'Automatic monitoring sensors'] },
  large_flooded: { solution: 'Full Emergency Restoration', cost: '$12,000 – $25,000+', steps: ['Emergency water removal', 'Structural and mold inspection', 'Complete remediation', 'Full encapsulation with drainage + sump', 'Consider conditioned crawl space upgrade'] },
};

export default function DFWCrawlSpaceGuide() {
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState<null | { solution: string; cost: string; steps: string[] }>(null);

  function calculate() {
    if (!size || !condition) return;
    const key = `${size}_${condition}`;
    setResult(solutionMap[key] || null);
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.badge}>📍 DFW Crawl Space Guide</div>
        <h1 style={styles.h1}>Crawl Space Guide <span style={styles.accent}>for DFW Homeowners</span></h1>
        <p style={styles.lead}>DFW's hot, humid summers make vented crawl spaces a moisture disaster waiting to happen. Encapsulation is the standard solution — here's what it costs, what it includes, and what you actually need.</p>

        <div style={styles.grid2}>
          <div style={styles.statBox}><div style={styles.statNum}>75%</div><div style={styles.statLabel}>DFW summer outdoor RH — too high for vented crawl space</div></div>
          <div style={styles.statBox}><div style={styles.statNum}>$3K–$15K</div><div style={styles.statLabel}>Typical DFW crawl space encapsulation range</div></div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>🏗️</span> Three Types of Crawl Spaces — DFW Reality Check</div>
          {crawlTypes.map((type, i) => (
            <div key={i} style={{ ...styles.typeCard, borderLeftColor: type.dfwNote.startsWith('⚠️') ? '#ef4444' : '#22c55e' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <div style={styles.typeTitle}>{type.icon} {type.name}</div>
                <div style={{ fontSize: '12px', color: type.dfwNote.startsWith('⚠️') ? '#ef4444' : '#22c55e', fontWeight: '700' }}>{type.dfwNote}</div>
              </div>
              <div style={styles.typeDesc}>{type.desc}</div>
              <div style={styles.typeVerdict}>{type.verdict}</div>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>🔧</span> What Goes Into a DFW Crawl Space Encapsulation</div>
          <ul style={styles.list}>
            {components.map((c, i) => (
              <li key={i} style={{ ...styles.listItem, flexDirection: 'column' as const, gap: '2px' }}>
                <div style={{ fontWeight: '700', color: '#ffffff' }}>{c.icon} {c.name}</div>
                <div style={{ color: '#94a3b8' }}>{c.detail}</div>
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>💰</span> What Does It Cost in DFW?</div>
          <div style={styles.costRow}><span>Small crawl space ({'<'}1,000 sq ft) — basic encapsulation</span><span>$3,000–6,000</span></div>
          <div style={styles.costRow}><span>Medium (1,000–2,000 sq ft) — full encapsulation</span><span>$5,000–10,000</span></div>
          <div style={styles.costRow}><span>Large ({'>'} 2,000 sq ft) — full + dehumidifier</span><span>$8,000–15,000</span></div>
          <div style={styles.costRow}><span>Sump pump add-on</span><span>+$1,500–3,000</span></div>
          <div style={styles.costRow}><span>Mold remediation (if needed)</span><span>+$500–4,000</span></div>
          <div style={styles.greenNote}>✅ Encapsulation pays back: lower HVAC costs, higher home value, no mold remediation bills.</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>🧮</span> Find Your Solution</div>
          <label style={styles.label}>Crawl space size</label>
          <select style={styles.select} value={size} onChange={e => setSize(e.target.value)}>
            <option value=''>Select size...</option>
            <option value='small'>Small (under 1,000 sq ft)</option>
            <option value='large'>Large (1,000+ sq ft)</option>
          </select>
          <label style={styles.label}>Current condition</label>
          <select style={styles.select} value={condition} onChange={e => setCondition(e.target.value)}>
            <option value=''>Select condition...</option>
            <option value='dry'>Dry — no visible moisture or issues</option>
            <option value='damp'>Damp — musty smell, condensation, minor mold</option>
            <option value='wet'>Wet — standing water after rain, mold present</option>
            <option value='flooded'>Flooded — major water, structural concerns</option>
          </select>
          <button style={styles.btn} onClick={calculate}>Get Recommendation</button>
          {result && (
            <div style={styles.result}>
              <div style={{ color: '#F5E642', fontWeight: '800', fontSize: '18px', marginBottom: '4px' }}>{result.solution}</div>
              <div style={{ color: '#86efac', fontWeight: '700', fontSize: '16px', marginBottom: '16px' }}>💰 {result.cost}</div>
              <div style={{ fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>Recommended Steps:</div>
              {result.steps.map((s, i) => <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid #1e3a5f', color: '#cbd5e1', fontSize: '14px' }}>{i + 1}. {s}</div>)}
              <div style={styles.warnNote}>⚠️ Always get 2–3 quotes from licensed crawl space contractors. Verify they use commercial-grade 20-mil liner, not 6-mil plastic.</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center' as const, color: '#475569', fontSize: '13px', marginTop: '32px' }}>
          ProLnk — Connecting DFW homeowners with licensed crawl space specialists
        </div>
      </div>
    </div>
  );
}
