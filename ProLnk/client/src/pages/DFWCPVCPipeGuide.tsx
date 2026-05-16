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

export default function DFWCPVCPipeGuide() {
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState<null | { status: string; action: string; timeline: string; color: string }>(null);

  function assess() {
    if (!age || !condition) return;
    const old = age === 'over25';
    const mid = age === '15_25';
    const brittle = condition === 'brittle';
    const exposed = condition === 'exposed';

    if (old && brittle) {
      setResult({ status: 'Critical', action: '🚨 Replace immediately — failure risk is high', timeline: 'Within 30 days', color: '#ef4444' });
    } else if (old && exposed) {
      setResult({ status: 'High Risk', action: '⚠️ Replace UV-exposed sections now, full repipe plan 12 months', timeline: '6–12 months', color: '#f97316' });
    } else if (mid && brittle) {
      setResult({ status: 'Elevated', action: '📅 Inspect all joints; replace brittle sections', timeline: '3–6 months', color: '#eab308' });
    } else if (old) {
      setResult({ status: 'Moderate', action: '🔍 Annual inspection; replace if any cracking noted', timeline: '1–3 years', color: '#eab308' });
    } else {
      setResult({ status: 'Low', action: '✅ Monitor annually; avoid UV exposure', timeline: 'No immediate action', color: '#22c55e' });
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🏗️</div>
        <h1 style={styles.title}>DFW CPVC Pipe Guide</h1>
        <p style={styles.subtitle}>Chlorinated PVC plumbing in DFW's heat and hard water environment</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📍 DFW Context</h2>
        <p style={styles.text}>CPVC (Chlorinated Polyvinyl Chloride) was the go-to alternative to copper in DFW construction from the late 1980s through the early 2000s. Affordable and easy to install, it became widespread in suburban DFW tracts — but DFW's unique environment creates specific vulnerabilities.</p>
        <div style={styles.grid}>
          <div style={styles.card}><div style={styles.cardTitle}>☀️ DFW UV Exposure</div><div style={styles.text}>Attic temperatures reach 140–160°F in summer, degrading CPVC near supply lines</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>💧 Hard Water Impact</div><div style={styles.text}>DFW mineral content causes scale buildup inside CPVC, stressing pipe walls</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>⏱️ Expected Life</div><div style={styles.text}>25–40 years; DFW conditions can cut this to 20–25 years</div></div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>⚙️ How DFW Conditions Affect CPVC</h2>
        <p style={styles.text}>CPVC becomes brittle when exposed to UV light and repeated thermal cycling. DFW attics with CPVC supply lines are especially vulnerable — the plastic loses flexibility and joints crack under normal water pressure fluctuations.</p>
        <div style={styles.grid}>
          <div style={styles.card}><div style={styles.cardTitle}>🌡️ Thermal Cycling</div><div style={styles.text}>DFW's 40°F winter–110°F summer swing stresses all CPVC connections over time</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>🪟 Window Proximity</div><div style={styles.text}>Sunlit wall pipes degrade faster; check pipes near south-facing windows</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>🔩 Joint Failure</div><div style={styles.text}>Solvent-welded joints are the first failure point in aging DFW CPVC systems</div></div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🧮 CPVC Condition Assessment</h2>
        <label style={styles.label}>CPVC System Age</label>
        <select style={styles.select} value={age} onChange={e => setAge(e.target.value)}>
          <option value="">Select age...</option>
          <option value="under15">Under 15 years</option>
          <option value="15_25">15–25 years</option>
          <option value="over25">Over 25 years</option>
        </select>
        <label style={styles.label}>Current DFW Condition Observed</label>
        <select style={styles.select} value={condition} onChange={e => setCondition(e.target.value)}>
          <option value="">Select observed condition...</option>
          <option value="normal">No visible issues</option>
          <option value="exposed">UV-exposed or attic-routed pipes</option>
          <option value="brittle">Visible cracking or brittleness</option>
        </select>
        <button style={styles.button} onClick={assess}>Get Assessment</button>

        {result && (
          <div style={styles.result}>
            <div style={styles.resultTitle}>CPVC Assessment</div>
            <span style={{ ...styles.badge, backgroundColor: result.color + '22', color: result.color, border: `1px solid ${result.color}` }}>{result.status}</span>
            <p style={{ color: '#cbd5e1', marginTop: '12px' }}><strong style={{ color: '#F5E642' }}>Action:</strong> {result.action}</p>
            <p style={{ color: '#cbd5e1' }}><strong style={{ color: '#F5E642' }}>Timeline:</strong> {result.timeline}</p>
          </div>
        )}
      </div>
    </div>
  );
}
