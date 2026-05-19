import { useState } from 'react';

const styles = {
  page: { backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' },
  container: { maxWidth: '800px', margin: '0 auto' },
  heading: { fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '8px' },
  sub: { color: '#94a3b8', fontSize: '1rem', marginBottom: '32px' },
  section: { backgroundColor: '#0f2040', borderRadius: '12px', padding: '24px', marginBottom: '20px', border: '1px solid #1e3a5f' },
  sectionTitle: { fontSize: '1.2rem', fontWeight: 700, color: '#F5E642', marginBottom: '12px' },
  text: { color: '#cbd5e1', lineHeight: 1.7, marginBottom: '10px' },
  label: { display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px', marginTop: '16px' },
  select: { width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1e3a5f', borderRadius: '8px', color: '#fff', fontSize: '0.95rem' },
  btn: { marginTop: '20px', width: '100%', padding: '14px', backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: '1rem', border: 'none', borderRadius: '10px', cursor: 'pointer' },
  result: { backgroundColor: '#0A1628', borderRadius: '10px', padding: '20px', marginTop: '16px', border: '1px solid #F5E642' },
  resultTitle: { color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px' },
  row: { display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e3a5f', padding: '8px 0', color: '#cbd5e1', fontSize: '0.9rem' },
  badge: { display: 'inline-block', backgroundColor: '#1e3a5f', borderRadius: '6px', padding: '4px 10px', color: '#F5E642', fontSize: '0.8rem', marginRight: '8px', marginBottom: '8px' },
  urgencyHigh: { backgroundColor: '#3b1515', border: '1px solid #ef4444', borderRadius: '8px', padding: '10px 14px', color: '#fca5a5', fontSize: '0.9rem', marginBottom: '10px' },
  urgencyNorm: { backgroundColor: '#132010', border: '1px solid #22c55e', borderRadius: '8px', padding: '10px 14px', color: '#86efac', fontSize: '0.9rem', marginBottom: '10px' },
};

export default function DFWHVACCoilCleaningGuide() {
  const [sysAge, setSysAge] = useState('');
  const [lastClean, setLastClean] = useState('');
  const [performance, setPerformance] = useState('');
  const [result, setResult] = useState<null | { urgency: string; isHigh: boolean; cost: string; efficiencyGain: string; note: string }>(null);

  function calculate() {
    if (!sysAge || !lastClean || !performance) return;
    const age = parseInt(sysAge);
    const cleanYrs = parseInt(lastClean);
    let urgency = 'Schedule before this summer (April ideal)';
    let isHigh = false;
    let efficiencyGain = '10–15%';
    let note = 'Annual cleaning before DFW summer is standard best practice.';

    if (cleanYrs > 2 || performance === 'poor') {
      isHigh = true;
      urgency = '🚨 Schedule immediately — coils likely heavily fouled';
      efficiencyGain = '20–30%';
      note = 'Heavily fouled coils can reduce system capacity by 30%+ during peak DFW heat. Schedule professional cleaning ASAP.';
    } else if (cleanYrs > 1 || performance === 'fair') {
      urgency = 'Schedule within 2–3 weeks';
      efficiencyGain = '15–20%';
      note = 'Coils likely have meaningful buildup — DFW cottonwood and pollen accumulate fast.';
    }

    const cost = age > 10 ? '$150–$300 (older systems may need extra care)' : '$100–$200 for standard coil clean';
    setResult({ urgency, isHigh, cost, efficiencyGain, note });
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.heading}>🧹 DFW HVAC Coil Cleaning Guide</div>
        <div style={styles.sub}>Dirty coils cost DFW homeowners 25%+ efficiency in peak heat</div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🌳 DFW's Coil-Clogging Problem</div>
          <p style={styles.text}>Every spring, cottonwood fluff, oak pollen, and construction dust blanket DFW. Your outdoor condenser pulls air through its coils constantly — and that debris packs in. Even 1/10 inch of buildup can reduce heat transfer by 20–25%, which means your system runs longer, uses more power, and delivers less cooling.</p>
          <p style={styles.text}>The indoor evaporator coil faces a different threat: mold and dust bypassing a clogged filter. A dirty evaporator coil causes icing, freezes up the system, and can damage the compressor if ignored.</p>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🔧 Indoor vs Outdoor Coil</div>
          <div><span style={styles.badge}>Evaporator (Indoor)</span><span style={styles.badge}>Condenser (Outdoor)</span></div>
          <div style={styles.row}><span>Evaporator coil</span><span>Cools air — dirty = icing, reduced airflow</span></div>
          <div style={styles.row}><span>Condenser coil</span><span>Rejects heat — dirty = overheating, less cooling</span></div>
          <div style={styles.row}><span>DIY condenser</span><span>Gentle hose rinse from inside out — never pressure wash</span></div>
          <div style={styles.row}><span>Professional clean</span><span>Chemical flush, check refrigerant, full inspection</span></div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>📅 Best Time to Clean in DFW</div>
          <p style={styles.text}>Clean both coils in March or April — before cottonwood peaks and before your system hits full summer load. Waiting until July means you've already run a degraded system through the worst weeks. Most DFW HVAC techs book up April–May, so schedule early.</p>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🧮 Get Your Cleaning Urgency Score</div>
          <label style={styles.label}>System age</label>
          <select style={styles.select} value={sysAge} onChange={e => setSysAge(e.target.value)}>
            <option value="">Select age</option>
            <option value="4">Under 5 years</option>
            <option value="8">5–10 years</option>
            <option value="13">10–15 years</option>
            <option value="18">15+ years</option>
          </select>
          <label style={styles.label}>Last professional coil cleaning</label>
          <select style={styles.select} value={lastClean} onChange={e => setLastClean(e.target.value)}>
            <option value="">Select timeframe</option>
            <option value="0">Within the last year</option>
            <option value="1">1–2 years ago</option>
            <option value="2">2–3 years ago</option>
            <option value="5">Never / unknown</option>
          </select>
          <label style={styles.label}>Current system performance</label>
          <select style={styles.select} value={performance} onChange={e => setPerformance(e.target.value)}>
            <option value="">Select option</option>
            <option value="good">Good — cools quickly, runs normally</option>
            <option value="fair">Fair — takes longer to cool, higher bills</option>
            <option value="poor">Poor — struggles to keep up or ices up</option>
          </select>
          <button style={styles.btn} onClick={calculate}>Check My Cleaning Urgency →</button>
          {result && (
            <div style={styles.result}>
              <div style={styles.resultTitle}>✅ Coil Cleaning Assessment</div>
              <div style={result.isHigh ? styles.urgencyHigh : styles.urgencyNorm}>{result.urgency}</div>
              <div style={styles.row}><span>Efficiency Gain After Clean</span><span>{result.efficiencyGain}</span></div>
              <div style={styles.row}><span>Professional Clean Cost</span><span>{result.cost}</span></div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '12px' }}>{result.note}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
