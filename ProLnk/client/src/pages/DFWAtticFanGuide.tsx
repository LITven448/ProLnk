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
};

export default function DFWAtticFanGuide() {
  const [atticSize, setAtticSize] = useState('');
  const [atticTemp, setAtticTemp] = useState('');
  const [ventilation, setVentilation] = useState('');
  const [result, setResult] = useState<null | { type: string; cfm: number; cost: string; rec: string }>(null);

  function calculate() {
    if (!atticSize || !atticTemp || !ventilation) return;
    const sqft = parseInt(atticSize);
    const temp = parseInt(atticTemp);
    const cfm = Math.round(sqft * 0.7 * (temp > 140 ? 1.3 : 1));
    let type = 'Solar Attic Fan';
    let cost = '$400–$800 installed';
    let rec = 'DFW sun makes solar ideal — no operating cost and great ROI.';
    if (sqft > 2500 || temp > 155) {
      type = 'Whole House Fan';
      cost = '$900–$1,800 installed';
      rec = 'Large attic with extreme temps — whole house fan dramatically cuts AC load.';
    } else if (ventilation === 'none') {
      type = 'Electric Attic Fan + Vents';
      cost = '$300–$600 installed';
      rec = 'Add ridge/soffit vents first, then power fan for full airflow path.';
    }
    setResult({ type, cfm, cost, rec });
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.heading}>🌡️ DFW Attic Fan Guide</div>
        <div style={styles.sub}>Why attic temps hit 150°F in DFW — and how to fix it</div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>☀️ Why Attic Fans Matter in DFW</div>
          <p style={styles.text}>North Texas summers are brutal. Your attic can reach 150–160°F on a 100°F day. That superheated attic radiates heat directly into your living space, forcing your AC to work 30–40% harder. A proper attic ventilation system can lower attic temps by 30–50°F.</p>
          <p style={styles.text}>DFW homes are especially vulnerable — most have dark asphalt shingles and attic ductwork that bakes in that heat. Investing in attic cooling often delivers faster ROI than upgrading the AC unit itself.</p>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🔄 Fan Types Compared</div>
          <div><span style={styles.badge}>Whole House Fan</span><span style={styles.badge}>Electric Attic Fan</span><span style={styles.badge}>Solar Attic Fan</span></div>
          <div style={styles.row}><span>Whole House Fan</span><span>Best for evening cooling, large homes</span></div>
          <div style={styles.row}><span>Electric Attic Fan</span><span>Reliable, works any time, $6–10/mo electric</span></div>
          <div style={styles.row}><span>Solar Attic Fan</span><span>Zero operating cost, perfect for sunny DFW</span></div>
          <div style={styles.row}><span>Ridge + Soffit Passive</span><span>Free after install, less powerful</span></div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🧮 Get Your Fan Recommendation</div>
          <label style={styles.label}>Attic square footage</label>
          <select style={styles.select} value={atticSize} onChange={e => setAtticSize(e.target.value)}>
            <option value="">Select size</option>
            <option value="1000">Under 1,500 sq ft</option>
            <option value="1800">1,500–2,000 sq ft</option>
            <option value="2500">2,000–3,000 sq ft</option>
            <option value="3500">3,000+ sq ft</option>
          </select>
          <label style={styles.label}>Peak attic temperature (summer)</label>
          <select style={styles.select} value={atticTemp} onChange={e => setAtticTemp(e.target.value)}>
            <option value="">Select range</option>
            <option value="130">120–135°F</option>
            <option value="145">135–150°F</option>
            <option value="155">150–160°F</option>
            <option value="165">160°F+</option>
          </select>
          <label style={styles.label}>Current ventilation</label>
          <select style={styles.select} value={ventilation} onChange={e => setVentilation(e.target.value)}>
            <option value="">Select option</option>
            <option value="none">None / unknown</option>
            <option value="passive">Passive only (ridge/soffit)</option>
            <option value="powered">Existing powered fan</option>
          </select>
          <button style={styles.btn} onClick={calculate}>Calculate My Fan Needs →</button>
          {result && (
            <div style={styles.result}>
              <div style={styles.resultTitle}>✅ Recommendation</div>
              <div style={styles.row}><span>Fan Type</span><span>{result.type}</span></div>
              <div style={styles.row}><span>CFM Needed</span><span>{result.cfm.toLocaleString()} CFM</span></div>
              <div style={styles.row}><span>Install Cost</span><span>{result.cost}</span></div>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '12px' }}>{result.rec}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
