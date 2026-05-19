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
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' },
  statBox: { backgroundColor: '#0d1a2e', borderRadius: '10px', padding: '20px', textAlign: 'center' as const },
  statNum: { fontSize: '32px', fontWeight: '800', color: '#F5E642' },
  statLabel: { color: '#94a3b8', fontSize: '13px', marginTop: '4px' },
  list: { listStyle: 'none', padding: 0, margin: 0 },
  listItem: { padding: '10px 0', borderBottom: '1px solid #1e3a5f', color: '#cbd5e1', display: 'flex', gap: '10px' },
  label: { color: '#94a3b8', fontSize: '14px', marginBottom: '8px', display: 'block' },
  select: { width: '100%', backgroundColor: '#0d1a2e', color: '#ffffff', border: '1px solid #1e3a5f', borderRadius: '8px', padding: '10px 14px', fontSize: '14px', marginBottom: '16px' },
  btn: { backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%' },
  result: { backgroundColor: '#0d1a2e', borderRadius: '10px', padding: '20px', marginTop: '16px', border: '2px solid #F5E642' },
  scoreHigh: { color: '#ef4444', fontSize: '28px', fontWeight: '800' },
  scoreMed: { color: '#f59e0b', fontSize: '28px', fontWeight: '800' },
  scoreLow: { color: '#22c55e', fontSize: '28px', fontWeight: '800' },
  tag: { backgroundColor: '#1e3a5f', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', display: 'inline-block', margin: '3px' },
  sectionNote: { backgroundColor: '#0d2e1a', border: '1px solid #166534', borderRadius: '8px', padding: '14px 18px', color: '#86efac', fontSize: '14px', marginTop: '16px' },
  warningNote: { backgroundColor: '#2d1000', border: '1px solid #9a3412', borderRadius: '8px', padding: '14px 18px', color: '#fdba74', fontSize: '14px', marginTop: '16px' },
};

const seasonSchedule = [
  { season: '🌸 Spring (Mar–May)', freq: 'Every 2–3 days', notes: 'Moderate — soil dries quickly in March' },
  { season: '☀️ Summer (Jun–Aug)', freq: 'Daily or every other day', notes: 'Critical — DFW heat accelerates moisture loss' },
  { season: '🍂 Fall (Sep–Nov)', freq: '2–3x per week', notes: 'Taper off as temps drop' },
  { season: '❄️ Winter (Dec–Feb)', freq: 'Weekly if no rain', notes: 'Do not skip — winter droughts are common in DFW' },
];

const drainageItems = [
  { icon: '📐', text: 'Grade soil 6 inches drop per 10 feet away from foundation' },
  { icon: '🌿', text: 'Keep flower beds below brick weep holes' },
  { icon: '🔧', text: 'Extend downspouts at least 4 feet from foundation' },
  { icon: '🪨', text: 'Use gravel or rock mulch near foundation, not wood mulch' },
  { icon: '💧', text: 'Install French drain if yard pools after rain' },
];

export default function DFWFoundationMoistureGuide() {
  const [age, setAge] = useState('');
  const [cracks, setCracks] = useState('');
  const [watering, setWatering] = useState('');
  const [result, setResult] = useState<null | { score: number; label: string; actions: string[] }>(null);

  function calculate() {
    let score = 0;
    if (age === 'over30') score += 2;
    else if (age === '15to30') score += 1;
    if (cracks === 'wide') score += 3;
    else if (cracks === 'hairline') score += 1;
    else if (cracks === 'stair') score += 2;
    if (watering === 'rarely') score += 3;
    else if (watering === 'inconsistent') score += 2;
    else if (watering === 'consistent') score += 0;

    const actions =
      score >= 6
        ? ['Schedule structural engineer inspection within 30 days', 'Begin daily soaker hose program immediately', 'Check and clear all gutters and downspouts', 'Document all cracks with photos and dates']
        : score >= 3
        ? ['Start consistent soaker hose schedule this week', 'Monitor cracks monthly with tape markers', 'Improve drainage grading around perimeter', 'Consider annual foundation inspection']
        : ['Maintain current watering schedule — you\’re doing well', 'Inspect drainage annually', 'Monitor any hairline cracks seasonally'];

    setResult({ score, label: score >= 6 ? 'High Risk' : score >= 3 ? 'Moderate Risk' : 'Low Risk', actions });
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.badge}>📍 DFW Foundation Guide</div>
        <h1 style={styles.h1}>Foundation <span style={styles.accent}>Moisture Management</span> in DFW</h1>
        <p style={styles.lead}>DFW sits on some of the most expansive clay soil in the country. Moisture consistency — not just quantity — is the single biggest factor in whether your foundation stays level for decades or starts moving.</p>

        <div style={styles.grid}>
          <div style={styles.statBox}><div style={styles.statNum}>85%</div><div style={styles.statLabel}>DFW foundations at risk from clay expansion</div></div>
          <div style={styles.statBox}><div style={styles.statNum}>6"</div><div style={styles.statLabel}>How much clay soil can expand/contract per year in DFW</div></div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>💧</span> Why Consistent Moisture = Healthy Foundation</div>
          <p style={{ color: '#94a3b8', lineHeight: '1.7', marginBottom: '12px' }}>DFW's black and gray clay soil (Blackland Prairie) swells when wet and shrinks dramatically when dry. This seasonal movement is what causes most foundation problems — not a single flood or drought event, but years of uneven cycles.</p>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7' }}>The goal is to keep the soil at a <strong style={{ color: '#F5E642' }}>consistent moisture level</strong> year-round. This means watering during droughts and ensuring drainage during heavy rains — opposite actions, same goal.</p>
          <div style={styles.sectionNote}>✅ Foundation engineers call this "maintaining moisture equilibrium" — and it's cheaper than any repair.</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>🌀</span> The Soaker Hose Method for DFW Clay</div>
          <ul style={styles.list}>
            {[
              'Place soaker hose 12–18 inches from foundation perimeter',
              'Run hose on a timer — 30–45 minutes per session is typical',
              'Water slowly and deeply so moisture penetrates clay layers',
              'Never water directly against the foundation slab',
              'Use a soil moisture meter ($15–30) to calibrate frequency',
            ].map((item, i) => (
              <li key={i} style={styles.listItem}><span>🔸</span><span>{item}</span></li>
            ))}
          </ul>
          <div style={styles.warningNote}>⚠️ Do NOT water with sprinklers pointed at the foundation — rapid saturation then fast drying is worse than no watering.</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>📅</span> Watering Schedule by Season</div>
          <div style={{ overflowX: 'auto' as const }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' as const }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e3a5f' }}>
                  {['Season', 'Frequency', 'Notes'].map(h => <th key={h} style={{ textAlign: 'left' as const, padding: '8px 0', color: '#F5E642', fontSize: '13px' }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {seasonSchedule.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1e3a5f' }}>
                    <td style={{ padding: '12px 0', color: '#ffffff', fontSize: '14px' }}>{r.season}</td>
                    <td style={{ padding: '12px 0', color: '#F5E642', fontSize: '14px' }}>{r.freq}</td>
                    <td style={{ padding: '12px 0', color: '#94a3b8', fontSize: '13px' }}>{r.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>🏗️</span> Proper Drainage Setup</div>
          <ul style={styles.list}>
            {drainageItems.map((item, i) => (
              <li key={i} style={styles.listItem}><span>{item.icon}</span><span>{item.text}</span></li>
            ))}
          </ul>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}><span>🧮</span> Foundation Moisture Risk Calculator</div>
          <label style={styles.label}>Foundation age</label>
          <select style={styles.select} value={age} onChange={e => setAge(e.target.value)}>
            <option value=''>Select age...</option>
            <option value='under15'>Under 15 years</option>
            <option value='15to30'>15–30 years</option>
            <option value='over30'>Over 30 years</option>
          </select>
          <label style={styles.label}>Visible cracks?</label>
          <select style={styles.select} value={cracks} onChange={e => setCracks(e.target.value)}>
            <option value=''>Select crack type...</option>
            <option value='none'>No visible cracks</option>
            <option value='hairline'>Hairline cracks (under 1/8")</option>
            <option value='stair'>Stair-step cracks in brick</option>
            <option value='wide'>Wide cracks (over 1/4") or horizontal</option>
          </select>
          <label style={styles.label}>Current watering practice</label>
          <select style={styles.select} value={watering} onChange={e => setWatering(e.target.value)}>
            <option value=''>Select practice...</option>
            <option value='consistent'>Consistent soaker hose year-round</option>
            <option value='inconsistent'>Occasional — only when I remember</option>
            <option value='rarely'>Rarely or never water around foundation</option>
          </select>
          <button style={styles.btn} onClick={calculate}>Calculate Risk Score</button>
          {result && (
            <div style={styles.result}>
              <div style={result.score >= 6 ? styles.scoreHigh : result.score >= 3 ? styles.scoreMed : styles.scoreLow}>{result.label}</div>
              <div style={{ color: '#94a3b8', marginBottom: '12px', fontSize: '13px' }}>Risk score: {result.score}/8</div>
              <div style={{ fontWeight: '700', marginBottom: '8px', color: '#F5E642' }}>Recommended Actions:</div>
              {result.actions.map((a, i) => <div key={i} style={{ color: '#cbd5e1', padding: '6px 0', borderBottom: '1px solid #1e3a5f', fontSize: '14px' }}>• {a}</div>)}
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
