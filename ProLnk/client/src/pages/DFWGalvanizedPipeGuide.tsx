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
};

export default function DFWGalvanizedPipeGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [pressure, setPressure] = useState('');
  const [result, setResult] = useState<null | { likelihood: string; urgency: string; cost: string; color: string }>(null);

  function assess() {
    if (!homeAge || !pressure) return;
    const old = homeAge === 'pre1960';
    const lowPressure = pressure === 'low';
    const medPressure = pressure === 'medium';

    if (old && lowPressure) {
      setResult({ likelihood: 'Very High', urgency: '🚨 Immediate — schedule inspection now', cost: '$8,000–$15,000 full repipe', color: '#ef4444′ });
    } else if (old && medPressure) {
      setResult({ likelihood: 'High', urgency: '⚠️ Within 12 months', cost: '$6,000–$12,000 full repipe', color: '#f97316′ });
    } else if (old) {
      setResult({ likelihood: 'Moderate–High', urgency: '📅 Monitor, plan for 2–3 years', cost: '$5,000–$10,000 repipe', color: '#eab308′ });
    } else if (homeAge === '1960_1980′ && lowPressure) {
      setResult({ likelihood: 'Moderate', urgency: '⚠️ Inspect within 6 months', cost: '$4,000–$9,000 partial or full repipe', color: '#f97316′ });
    } else {
      setResult({ likelihood: 'Low', urgency: '✅ No immediate action needed', cost: 'Inspection only: $150–$300', color: '#22c55e' });
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔧</div>
        <h1 style={styles.title}>DFW Galvanized Pipe Guide</h1>
        <p style={styles.subtitle}>Understanding galvanized plumbing in Dallas-Fort Worth homes</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📍 DFW Context</h2>
        <p style={styles.text}>Homes built before 1960 in Dallas-Fort Worth commonly used galvanized steel pipes. DFW's hard water (high mineral content) accelerates interior corrosion, making galvanized pipes especially problematic in this region.</p>
        <div style={styles.grid}>
          <div style={styles.card}><div style={styles.cardTitle}>🏠 Affected Era</div><div style={styles.text}>Pre-1960 construction throughout DFW metroplex</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>💧 DFW Hard Water</div><div style={styles.text}>150–250 mg/L hardness accelerates galvanized corrosion</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>⏱️ Lifespan</div><div style={styles.text}>40–70 years — most DFW galvanized is past or near end of life</div></div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>⚙️ How Galvanized Fails</h2>
        <p style={styles.text}>Zinc coating corrodes first, then iron oxidizes from inside out. DFW mineral deposits accelerate buildup. Flow restriction precedes leaks by years — you'll notice low pressure before you see water damage.</p>
        <div style={styles.grid}>
          <div style={styles.card}><div style={styles.cardTitle}>🔴 Stage 1</div><div style={styles.text}>Interior rust buildup — slight discoloration in water</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>🟠 Stage 2</div><div style={styles.text}>Significant flow restriction — weak shower pressure</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>🔴 Stage 3</div><div style={styles.text}>Pinhole leaks → wall damage → full repipe required</div></div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🧮 Galvanized Risk Assessment</h2>
        <label style={styles.label}>Home Age</label>
        <select style={styles.select} value={homeAge} onChange={e => setHomeAge(e.target.value)}>
          <option value="">Select home age...</option>
          <option value="pre1960″>Before 1960</option>
          <option value="1960_1980″>1960–1980</option>
          <option value="post1980″>After 1980</option>
        </select>
        <label style={styles.label}>Water Pressure Issue</label>
        <select style={styles.select} value={pressure} onChange={e => setPressure(e.target.value)}>
          <option value="">Select pressure level...</option>
          <option value="low">Low pressure throughout home</option>
          <option value="medium">Slightly reduced in some fixtures</option>
          <option value="normal">Normal pressure</option>
        </select>
        <button style={styles.button} onClick={assess}>Assess My Risk</button>

        {result && (
          <div style={styles.result}>
            <div style={styles.resultTitle}>Assessment Result</div>
            <span style={{ ...styles.badge, backgroundColor: result.color + '22', color: result.color, border: `1px solid ${result.color}` }}>{result.likelihood} Likelihood</span>
            <p style={{ color: '#cbd5e1', marginTop: '12px' }}><strong style={{ color: '#F5E642′ }}>Urgency:</strong> {result.urgency}</p>
            <p style={{ color: '#cbd5e1′ }}><strong style={{ color: '#F5E642' }}>Estimated Cost:</strong> {result.cost}</p>
          </div>
        )}
      </div>
    </div>
  );
}
