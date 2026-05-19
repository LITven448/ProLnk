import { useState } from 'react';

const styles = {
  container: { backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' },
  header: { textAlign: 'center' as const, marginBottom: '40px' },
  title: { fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '8px' },
  subtitle: { color: '#94a3b8', fontSize: '1.1rem' },
  section: { backgroundColor: '#1a2740', borderRadius: '12px', padding: '24px', marginBottom: '24px' },
  sectionTitle: { fontSize: '1.25rem', fontWeight: 600, color: '#F5E642', marginBottom: '16px' },
  text: { color: '#cbd5e1', lineHeight: 1.7, marginBottom: '12px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' },
  card: { backgroundColor: '#0f1f38', borderRadius: '8px', padding: '16px' },
  cardTitle: { color: '#F5E642', fontWeight: 600, marginBottom: '8px' },
  label: { color: '#94a3b8', fontSize: '0.875rem', marginBottom: '6px', display: 'block' },
  select: { width: '100%', padding: '10px', backgroundColor: '#0f1f38', border: '1px solid #334155', borderRadius: '6px', color: '#fff', marginBottom: '16px' },
  button: { backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' },
  result: { backgroundColor: '#0f1f38', borderRadius: '8px', padding: '20px', marginTop: '20px' },
  resultTitle: { color: '#F5E642', fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px' },
  badge: { display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, marginRight: '8px', marginBottom: '8px' },
  alert: { backgroundColor: '#7c2d1244', border: '1px solid #ef4444', borderRadius: '8px', padding: '16px', marginBottom: '16px' },
};

const cityPressures: Record<string, string> = {
  dallas: '80–110 PSI — PRV strongly recommended',
  fort_worth: '75–105 PSI — PRV required in most areas',
  plano: '90–120 PSI — PRV critical; very high municipal pressure',
  frisco: '85–115 PSI — PRV required; rapid growth strains pressure zones',
  mckinney: '80–110 PSI — PRV required',
  arlington: '70–100 PSI — PRV recommended above 80 PSI',
  irving: '75–100 PSI — PRV recommended',
  garland: '80–110 PSI — PRV required in most zones',
};

export default function DFWPressureRegulatorGuide() {
  const [pressure, setPressure] = useState('');
  const [city, setCity] = useState('');
  const [result, setResult] = useState<null | { assessment: string; setting: string; cost: string; color: string }>(null);

  function assess() {
    if (!pressure || !city) return;
    const cityInfo = cityPressures[city] || '75–105 PSI — PRV recommended';
    const high = pressure === 'over100';
    const mid = pressure === '80_100';
    const low = pressure === 'under80';

    if (high) {
      setResult({ assessment: '🚨 Critical — Pipe and appliance damage risk', setting: 'Set PRV to 60–65 PSI immediately; at this pressure fixtures fail prematurely', cost: 'New PRV install: $350–$650; replacement only: $200–$450', color: '#ef4444′ });
    } else if (mid) {
      setResult({ assessment: '⚠️ Above Recommended — PRV needed or needs adjustment', setting: 'Target 55–65 PSI; many DFW plumbers set to 60 PSI for appliance longevity', cost: 'Adjustment: $75–$150; new PRV if no existing unit: $350–$600', color: '#f97316′ });
    } else if (low && pressure === 'under50') {
      setResult({ assessment: '✅ Below normal — check PRV is not over-restricting', setting: 'PRV may be set too low or failing; ideal range is 50–65 PSI for DFW homes', cost: 'PRV adjustment: $75–$150; replacement if failed: $250–$500', color: '#3b82f6′ });
    } else {
      setResult({ assessment: '✅ Ideal Range — 50–80 PSI is optimal for DFW homes', setting: 'Current pressure is protecting your pipes and appliances; test annually', cost: 'Annual pressure test: $50–$75; no PRV action needed currently', color: '#22c55e' });
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>⚙️</div>
        <h1 style={styles.title}>DFW Pressure Regulator Guide</h1>
        <p style={styles.subtitle}>Managing DFW's notoriously high municipal water pressure</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📍 The DFW Pressure Problem</h2>
        <p style={styles.text}>Dallas-Fort Worth municipalities deliver water at 80–120 PSI — significantly above the 50–80 PSI safe range for residential plumbing. Without a properly functioning Pressure Regulating Valve (PRV), this excess pressure silently destroys pipe fittings, appliance valves, water heaters, and washing machine hoses.</p>
        <div style={styles.alert}>
          <strong style={{ color: '#fca5a5′ }}>⚠️ DFW Insurance Note:</strong>
          <span style={{ color: '#fca5a5′ }}> Several DFW insurers now ask about PRV status during home inspections. A missing or failed PRV can affect coverage for water damage claims.</span>
        </div>
        <div style={styles.grid}>
          <div style={styles.card}><div style={styles.cardTitle}>📊 DFW City Pressures</div><div style={styles.text}>Plano and Frisco often exceed 100 PSI during peak delivery hours — among the highest in DFW</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>🔧 PRV Location</div><div style={styles.text}>Typically at the main shutoff near the meter or where the main enters the home</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>⏱️ PRV Lifespan</div><div style={styles.text}>7–12 years; DFW's hard water deposits on diaphragm can shorten to 5–8 years</div></div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🚨 Signs Your DFW PRV Is Failing</h2>
        <div style={styles.grid}>
          <div style={styles.card}><div style={styles.cardTitle}>💧 Banging Pipes</div><div style={styles.text}>Water hammer when closing faucets — pressure surges when PRV loses response time</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>🔊 Toilet Noise</div><div style={styles.text}>Toilets running or humming after flush = pressure fluctuation through failed PRV diaphragm</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>🚿 Spitting Faucets</div><div style={styles.text}>Faucet aerators spitting or erratic flow = high pressure cycling through fixtures</div></div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🧮 PRV Assessment Tool</h2>
        <label style={styles.label}>Current Measured Water Pressure (test with $15 gauge at hose bib)</label>
        <select style={styles.select} value={pressure} onChange={e => setPressure(e.target.value)}>
          <option value="">Select pressure range...</option>
          <option value="under50″>Under 50 PSI</option>
          <option value="50_80″>50–80 PSI (optimal)</option>
          <option value="80_100″>80–100 PSI (above recommended)</option>
          <option value="over100″>Over 100 PSI (critical)</option>
        </select>
        <label style={styles.label}>DFW City</label>
        <select style={styles.select} value={city} onChange={e => setCity(e.target.value)}>
          <option value="">Select city...</option>
          <option value="plano">Plano</option>
          <option value="frisco">Frisco</option>
          <option value="mckinney">McKinney</option>
          <option value="dallas">Dallas</option>
          <option value="fort_worth">Fort Worth</option>
          <option value="arlington">Arlington</option>
          <option value="irving">Irving</option>
          <option value="garland">Garland</option>
        </select>
        <button style={styles.button} onClick={assess}>Assess My PRV</button>

        {result && (
          <div style={styles.result}>
            <div style={styles.resultTitle}>PRV Assessment</div>
            <span style={{ ...styles.badge, backgroundColor: result.color + '22', color: result.color, border: `1px solid ${result.color}` }}>{result.assessment}</span>
            <p style={{ color: '#cbd5e1', marginTop: '12px' }}><strong style={{ color: '#F5E642′ }}>Optimal Setting:</strong> {result.setting}</p>
            <p style={{ color: '#cbd5e1', marginTop: '8px' }}><strong style={{ color: '#F5E642′ }}>Cost Estimate:</strong> {result.cost}</p>
            {city && <p style={{ color: '#94a3b8', marginTop: '8px', fontSize: '0.875rem' }}>📍 {cityPressures[city]}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
