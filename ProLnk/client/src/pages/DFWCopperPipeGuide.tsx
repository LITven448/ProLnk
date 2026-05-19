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
  warning: { backgroundColor: '#7c2d1244', border: '1px solid #ef4444', borderRadius: '8px', padding: '16px', marginBottom: '16px' },
};

export default function DFWCopperPipeGuide() {
  const [copperAge, setCopperAge] = useState('');
  const [waterType, setWaterType] = useState('');
  const [result, setResult] = useState<null | { condition: string; pinholeRisk: string; maintenance: string; color: string }>(null);

  function assess() {
    if (!copperAge || !waterType) return;
    const old = copperAge === 'over40';
    const mid = copperAge === '20_40';
    const aggressive = waterType === 'aggressive';
    const moderate = waterType === 'moderate';

    if (old && aggressive) {
      setResult({ condition: '🔴 High Risk', pinholeRisk: 'Very High — inspect walls/ceilings for staining immediately', maintenance: 'Install whole-home water softener + pH neutralizer; budget $10K–$18K for full copper repipe to PEX', color: '#ef4444′ });
    } else if (old && moderate) {
      setResult({ condition: '🟠 Elevated', pinholeRisk: 'Moderate — schedule borescope inspection of horizontal runs', maintenance: 'Flush water softener annually; inspect solder joints every 2 years; budget for eventual repipe', color: '#f97316′ });
    } else if (mid && aggressive) {
      setResult({ condition: '🟡 Watch Closely', pinholeRisk: 'Moderate — aggressive water accelerates pitting even in newer copper', maintenance: 'Test water pH quarterly (target 7.0–8.5); install inline pH neutralizer if below 7.0', color: '#eab308′ });
    } else if (mid) {
      setResult({ condition: '🟢 Good', pinholeRisk: 'Low — copper in good range with normal DFW water', maintenance: 'Annual water test; flush aerators semi-annually; no immediate action needed', color: '#22c55e' });
    } else {
      setResult({ condition: '✅ Excellent', pinholeRisk: 'Very Low', maintenance: 'Standard annual inspection; copper at this age is performing well in DFW conditions', color: '#22c55e' });
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🪙</div>
        <h1 style={styles.title}>DFW Copper Pipe Guide</h1>
        <p style={styles.subtitle}>Premium plumbing — but DFW's water chemistry requires attention</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📍 Copper in DFW — Excellent But Not Invincible</h2>
        <p style={styles.text}>Copper remains the gold standard for plumbing durability and water quality — when DFW water conditions cooperate. The critical variable is water pH. DFW municipal water varies significantly by city and even by season, and aggressive (low pH) water causes the infamous pinhole leak phenomenon.</p>
        <div style={styles.warning}>
          <strong style={{ color: '#fca5a5′ }}>⚠️ DFW Pinhole Alert:</strong>
          <span style={{ color: '#fca5a5′ }}> Several DFW cities — particularly Plano, Frisco, and McKinney — have documented pinhole leak clusters in copper pipes due to water chemistry. Test your water pH before assuming copper is safe.</span>
        </div>
        <div style={styles.grid}>
          <div style={styles.card}><div style={styles.cardTitle}>💰 Cost Premium</div><div style={styles.text}>Copper costs 3–5× more than PEX but adds resale value and lasts 50–70+ years in good conditions</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>🧪 pH Sensitivity</div><div style={styles.text}>pH below 7.0 = aggressive water that pits copper from inside; test annually in DFW</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>🏠 DFW Era</div><div style={styles.text}>Common in 1960–2000 DFW construction; still specified for luxury new builds</div></div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>⚙️ Pinhole Leak Mechanics</h2>
        <p style={styles.text}>Aggressive water (low pH or high chloramine content) creates localized electrochemical cells on copper's interior surface. These pit through the pipe wall over 5–15 years, appearing as slow seeps inside walls — often undetected until significant water damage occurs.</p>
        <div style={styles.grid}>
          <div style={styles.card}><div style={styles.cardTitle}>🔬 Detection</div><div style={styles.text}>Infrared thermal imaging can find wet spots in walls before visible damage; cost $200–$400</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>🛡️ Prevention</div><div style={styles.text}>pH neutralizer + water softener combo significantly extends copper life in aggressive DFW water</div></div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🧮 Copper Condition Assessment</h2>
        <label style={styles.label}>Copper Pipe Age</label>
        <select style={styles.select} value={copperAge} onChange={e => setCopperAge(e.target.value)}>
          <option value="">Select age...</option>
          <option value="under20″>Under 20 years</option>
          <option value="20_40″>20–40 years</option>
          <option value="over40″>Over 40 years</option>
        </select>
        <label style={styles.label}>DFW Water Type (test your water or check city reports)</label>
        <select style={styles.select} value={waterType} onChange={e => setWaterType(e.target.value)}>
          <option value="">Select water type...</option>
          <option value="soft">Treated / Softened (pH 7.0–8.5)</option>
          <option value="moderate">Moderate (pH 7.0–8.0, standard DFW municipal)</option>
          <option value="aggressive">Aggressive (pH below 7.0 or high chloramines)</option>
        </select>
        <button style={styles.button} onClick={assess}>Assess My Copper</button>

        {result && (
          <div style={styles.result}>
            <div style={styles.resultTitle}>Copper Assessment</div>
            <span style={{ ...styles.badge, backgroundColor: result.color + '22', color: result.color, border: `1px solid ${result.color}` }}>{result.condition}</span>
            <p style={{ color: '#cbd5e1', marginTop: '12px' }}><strong style={{ color: '#F5E642′ }}>Pinhole Risk:</strong> {result.pinholeRisk}</p>
            <p style={{ color: '#cbd5e1', marginTop: '8px' }}><strong style={{ color: '#F5E642′ }}>Maintenance Plan:</strong> {result.maintenance}</p>
          </div>
        )}
      </div>
    </div>
  );
}
