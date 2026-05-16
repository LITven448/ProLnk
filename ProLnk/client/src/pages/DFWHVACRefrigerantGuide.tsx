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
  warn: { backgroundColor: '#2d1b00', border: '1px solid #f59e0b', borderRadius: '8px', padding: '12px 16px', color: '#fbbf24', fontSize: '0.9rem', marginBottom: '12px' },
  badge: { display: 'inline-block', backgroundColor: '#1e3a5f', borderRadius: '6px', padding: '4px 10px', color: '#F5E642', fontSize: '0.8rem', marginRight: '8px', marginBottom: '8px' },
};

export default function DFWHVACRefrigerantGuide() {
  const [sysAge, setSysAge] = useState('');
  const [refrigerant, setRefrigerant] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState<null | { decision: string; urgency: string; cost: string; note: string }>(null);

  function calculate() {
    if (!sysAge || !refrigerant || !symptoms) return;
    const age = parseInt(sysAge);
    let decision = 'Repair — find and fix leak, recharge refrigerant';
    let urgency = 'Schedule within 1–2 weeks';
    let cost = '$200–$600 for leak repair + recharge';
    let note = 'If system is under 10 years and using R-410A, repair is the right call.';

    if (refrigerant === 'r22') {
      if (age > 15 || symptoms === 'warm') {
        decision = 'Replace — R-22 is phased out; repair costs exceed value';
        urgency = '🚨 Replace this season — R-22 recharge costs $100+/lb and rising';
        cost = '$5,500–$12,000 for new system';
        note = 'R-22 was phased out in 2020. No new R-22 is manufactured — only reclaimed stock. Each recharge costs more than the last. Replacement is the economical choice.';
      } else {
        decision = 'Evaluate — small R-22 top-off may be worth it short-term';
        urgency = 'Get quote for both repair and replacement';
        cost = '$400–$1,200 for R-22 recharge (expensive) vs $5.5K–$12K replace';
        note = 'With an R-22 system under 15 years old and mild symptoms, get two quotes — repair vs replace — and compare 5-year cost projections.';
      }
    } else if (symptoms === 'warm' && age > 12) {
      decision = 'Repair + start planning replacement';
      urgency = 'Repair now, budget for replacement in 2–3 years';
      cost = '$250–$700 for leak repair; plan $6K–$13K replacement';
      note = 'An R-410A system over 12 years old with a refrigerant leak is showing age. Fix now but start budgeting for a new system.';
    }

    setResult({ decision, urgency, cost, note });
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.heading}>❄️ DFW HVAC Refrigerant Guide</div>
        <div style={styles.sub}>R-22 phase-out, R-410A, and what DFW heat means for leaks</div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🌡️ Why DFW Heat Reveals Leaks Fast</div>
          <p style={styles.text}>In most climates, a slow refrigerant leak might go unnoticed for months. In DFW, your AC runs at 100% capacity for weeks at a time — 100°F days with high humidity demand maximum performance. A refrigerant-low system that might cope in a milder climate will blow warm air within days in North Texas.</p>
          <p style={styles.text}>This means DFW homeowners catch leaks faster, but also face higher urgency — you can't limp through the summer on low refrigerant when it's 105°F outside and you have a family at home.</p>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>📋 Refrigerant Types Explained</div>
          <div><span style={styles.badge}>R-22</span><span style={styles.badge}>R-410A</span><span style={styles.badge}>R-32</span><span style={styles.badge}>R-454B</span></div>
          <div style={styles.row}><span>R-22 (Freon)</span><span>Phased out 2020 — legacy systems only, expensive</span></div>
          <div style={styles.row}><span>R-410A (Puron)</span><span>Current standard — being phased down by 2025</span></div>
          <div style={styles.row}><span>R-32 / R-454B</span><span>New low-GWP refrigerants in 2025+ systems</span></div>
          <div style={styles.warn} style={{ marginTop: '12px' }}>⚠️ Refrigerant handling requires EPA 608 certification. Never attempt DIY recharge — it is illegal and dangerous.</div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🔍 Leak Signs to Watch For</div>
          <div style={styles.row}><span>Warm air from vents</span><span>Refrigerant too low to cool effectively</span></div>
          <div style={styles.row}><span>Ice on refrigerant lines</span><span>Low pressure causes freezing at expansion valve</span></div>
          <div style={styles.row}><span>Hissing near air handler</span><span>Active refrigerant leak — call tech today</span></div>
          <div style={styles.row}><span>Higher electric bills</span><span>System running longer to compensate</span></div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🧮 Repair vs Replace Decision Tool</div>
          <label style={styles.label}>System age</label>
          <select style={styles.select} value={sysAge} onChange={e => setSysAge(e.target.value)}>
            <option value="">Select age</option>
            <option value="5">Under 7 years</option>
            <option value="10">7–12 years</option>
            <option value="15">12–18 years</option>
            <option value="20">18+ years</option>
          </select>
          <label style={styles.label}>Refrigerant type</label>
          <select style={styles.select} value={refrigerant} onChange={e => setRefrigerant(e.target.value)}>
            <option value="">Select type</option>
            <option value="r22">R-22 (Freon) — system is pre-2010</option>
            <option value="r410a">R-410A (Puron) — system is 2010–2024</option>
            <option value="new">R-32 or R-454B — system is 2024+</option>
          </select>
          <label style={styles.label}>Symptoms</label>
          <select style={styles.select} value={symptoms} onChange={e => setSymptoms(e.target.value)}>
            <option value="">Select option</option>
            <option value="warm">Blowing warm air or struggling to cool</option>
            <option value="ice">Ice on refrigerant lines / air handler</option>
            <option value="bills">Higher bills, no obvious cooling problem</option>
          </select>
          <button style={styles.btn} onClick={calculate}>Get Repair vs Replace Decision →</button>
          {result && (
            <div style={styles.result}>
              <div style={styles.resultTitle}>✅ Refrigerant Decision</div>
              <div style={styles.row}><span>Recommendation</span><span style={{ textAlign: 'right', maxWidth: '60%' }}>{result.decision}</span></div>
              <div style={styles.row}><span>Urgency</span><span>{result.urgency}</span></div>
              <div style={styles.row}><span>Cost Range</span><span style={{ textAlign: 'right', maxWidth: '55%' }}>{result.cost}</span></div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '12px' }}>{result.note}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
