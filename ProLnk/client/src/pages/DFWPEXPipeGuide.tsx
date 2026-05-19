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

export default function DFWPEXPipeGuide() {
  const [pexType, setPexType] = useState('');
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<null | { verdict: string; notes: string; tip: string; color: string }>(null);

  function assess() {
    if (!pexType || !concern) return;

    if (concern === 'freeze' && pexType === 'pex_a') {
      setResult({ verdict: '✅ Excellent Freeze Resistance', notes: 'PEX-A (Wirsbo/Uponor) has the best expansion memory — expands during freeze and returns to shape. Best choice for DFW freeze events.', tip: 'Still insulate pipes in unconditioned spaces and exterior walls.', color: '#22c55e' });
    } else if (concern === 'freeze') {
      setResult({ verdict: '✅ Good Freeze Resistance', notes: 'PEX-B and PEX-C also resist freezing far better than copper or CPVC. DFW freezes (2021 Uri-type events) are well-handled by all PEX.', tip: 'Insulate at slab penetrations where DFW cold air infiltrates.', color: '#22c55e' });
    } else if (concern === 'heat' && pexType === 'pex_a') {
      setResult({ verdict: '⚠️ Monitor Attic Routing', notes: 'PEX-A rated to 200°F but DFW attics can hit 160°F. Sustained exposure near max rating reduces lifespan. Re-route away from direct radiant heat where possible.', tip: 'Add attic insulation above PEX runs; consider spray foam baffles.', color: '#eab308′ });
    } else if (concern === 'heat') {
      setResult({ verdict: '⚠️ Manage Heat Exposure', notes: 'PEX-B and PEX-C have similar temp ratings. DFW attic heat is within spec but at the upper range. Prioritize insulation upgrades.', tip: 'Radiant barrier in attic reduces temperature by 20–30°F.', color: '#eab308′ });
    } else if (concern === 'compatibility') {
      setResult({ verdict: '🔧 Check Fitting Types', notes: 'PEX-A uses expansion fittings (best flow); PEX-B/C use crimp or clamp. Do NOT mix fitting systems. DFW pros often use push-fit (SharkBite) for repairs — compatible with all PEX types.', tip: 'Label your PEX type at the manifold for future service.', color: '#3b82f6′ });
    } else {
      setResult({ verdict: '✅ Standard Maintenance', notes: 'Flush manifold valves annually. Check push-fit fittings every 3–5 years. PEX systems in DFW typically last 40–50+ years with normal maintenance.', tip: 'Install whole-home water softener to maximize PEX and fixture lifespan in DFW hard water.', color: '#22c55e' });
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🌊</div>
        <h1 style={styles.title}>DFW PEX Pipe Guide</h1>
        <p style={styles.subtitle}>The modern DFW plumbing standard — flexible, freeze-resistant, and durable</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📍 Why PEX Dominates DFW New Construction</h2>
        <p style={styles.text}>PEX (cross-linked polyethylene) became the DFW standard in the 2000s and now dominates all new residential construction in the metroplex. Its flexibility makes it ideal for DFW's expansive clay soils and its freeze resistance proved critical after Winter Storm Uri in 2021.</p>
        <div style={styles.grid}>
          <div style={styles.card}><div style={styles.cardTitle}>❄️ Freeze Events</div><div style={styles.text}>PEX expands up to 8× its diameter during freeze — returns to shape without bursting</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>🌱 Clay Soil Movement</div><div style={styles.text}>DFW's expansive clay shifts seasonally; PEX flexibility absorbs movement that cracks rigid pipe</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>⚡ Installation Speed</div><div style={styles.text}>Manifold + home-run system reduces fittings and failure points vs. trunk-and-branch</div></div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🔩 PEX Types — Which Is In Your DFW Home?</h2>
        <div style={styles.grid}>
          <div style={styles.card}><div style={styles.cardTitle}>PEX-A (Best)</div><div style={styles.text}>Uponor/Wirsbo brand; expansion fittings; most flexible; best freeze memory; premium cost</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>PEX-B (Common)</div><div style={styles.text}>Most common in DFW tract homes; crimp or clamp fittings; reliable and cost-effective</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>PEX-C (Less Common)</div><div style={styles.text}>Irradiation-crosslinked; stiffest of the three; less common in DFW residential</div></div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🧮 DFW PEX Maintenance Guide</h2>
        <label style={styles.label}>Your PEX System Type</label>
        <select style={styles.select} value={pexType} onChange={e => setPexType(e.target.value)}>
          <option value="">Select PEX type...</option>
          <option value="pex_a">PEX-A (Uponor/Wirsbo expansion fittings)</option>
          <option value="pex_b">PEX-B (Crimp or clamp fittings)</option>
          <option value="pex_c">PEX-C or Unknown</option>
        </select>
        <label style={styles.label}>Primary DFW Concern</label>
        <select style={styles.select} value={concern} onChange={e => setConcern(e.target.value)}>
          <option value="">Select your concern...</option>
          <option value="freeze">Winter freeze protection (post-Uri)</option>
          <option value="heat">DFW summer attic heat exposure</option>
          <option value="compatibility">Fitting compatibility / repair work</option>
          <option value="maintenance">General maintenance guidance</option>
        </select>
        <button style={styles.button} onClick={assess}>Get My Guide</button>

        {result && (
          <div style={styles.result}>
            <div style={styles.resultTitle}>{result.verdict}</div>
            <p style={{ color: '#cbd5e1', marginTop: '8px' }}>{result.notes}</p>
            <p style={{ color: '#F5E642', marginTop: '12px' }}>💡 DFW Tip: {result.tip}</p>
          </div>
        )}
      </div>
    </div>
  );
}
