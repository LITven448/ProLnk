import { useState } from 'react';

const styles: Record<string, React.CSSProperties> = {
  page: { backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' },
  container: { maxWidth: '860px', margin: '0 auto' },
  badge: { backgroundColor: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, display: 'inline-block', marginBottom: '16px' },
  h1: { fontSize: '36px', fontWeight: 800, color: '#F5E642', marginBottom: '8px' },
  subtitle: { color: '#94A3B8', fontSize: '16px', marginBottom: '40px' },
  section: { backgroundColor: '#111E35', borderRadius: '12px', padding: '28px', marginBottom: '24px', border: '1px solid #1E2D4A' },
  sectionTitle: { fontSize: '20px', fontWeight: 700, color: '#F5E642', marginBottom: '16px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' },
  card: { backgroundColor: '#0A1628', borderRadius: '10px', padding: '18px', border: '1px solid #1E2D4A' },
  cardIcon: { fontSize: '28px', marginBottom: '10px' },
  cardTitle: { fontSize: '15px', fontWeight: 700, color: '#E8EDF5', marginBottom: '6px' },
  cardText: { fontSize: '13px', color: '#94A3B8', lineHeight: '1.6′ },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  label: { display: 'block', fontSize: '14px', fontWeight: 600, color: '#94A3B8', marginBottom: '8px' },
  select: { width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #1E2D4A', backgroundColor: '#0A1628', color: '#E8EDF5', fontSize: '14px', marginBottom: '20px' },
  result: { backgroundColor: '#0A1628', borderRadius: '10px', padding: '20px', border: '1px solid #F5E642′ },
  resultTitle: { fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' },
  bullet: { fontSize: '14px', color: '#94A3B8', marginBottom: '8px', paddingLeft: '16px', borderLeft: '2px solid #F5E642′ },
};

const yearIssues: Record<string, string[]> = {
  '2010-2015': ['HVAC entering 10-year service zone — schedule full tune-up', 'Water heater mid-life — inspect anode rod, flush sediment', 'Smart home pre-wire may be outdated — CAT5 vs CAT6 vs Wi-Fi 6 evaluation', 'Foundation first settling cycle in DFW clay — monitor all corners', 'Exterior caulking around large windows beginning to deteriorate'],
  '2015-2020': ['Roof approaching 10-year inspection window', 'Smart home hub technology may be obsolete — Z-Wave vs Matter', 'HVAC filter and coil maintenance critical in DFW heat', 'Open floor plan HVAC efficiency audit — large volumes harder to cool', 'Garage door opener replacement if builder-grade'],
  '2020-2026': ['Builder-grade appliances at end of warranty — assess upgrade timing', 'Foundation watering system essential for new DFW builds', 'Paint touch-up cycle begins at 3-5 years', 'Smart home ecosystem integration — consolidate or standardize platforms', 'Landscape grading inspection — improper slope causes foundation issues'],
};

const featureWatchlist: Record<string, string[]> = {
  'large-windows': ['UV film application to prevent floor and furniture fading', 'Annual seal inspection — large glass = more linear feet of potential failure', 'Window cleaning access planning for second-story banks'],
  'open-floor-plan': ['HVAC zoning review — open plans lose conditioned air faster', 'Acoustic panel or rug consideration — hard surfaces amplify sound', 'Lighting design review — large open spaces need layered lighting'],
  'flat-low-pitch': ['Annual drainage inspection before DFW storm season (May-September)', 'TPO or modified bitumen membrane condition check', 'Parapet wall flashing inspection on flat roof sections'],
  'smart-pre-wire': ['Document all wire runs before drywall touch-ups cover access', 'Test all drops — builder installs often have unfinished terminations', 'Upgrade to Wi-Fi 6E access points if pre-2020 build'],
};

export default function DFWContemporaryHomeGuide() {
  const [buildYear, setBuildYear] = useState('2015-2020');
  const [feature, setFeature] = useState('open-floor-plan');

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.badge}>DFW Home Guide</div>
        <h1 style={styles.h1}>Contemporary DFW Homes</h1>
        <p style={styles.subtitle}>2010–2026 new construction in DFW. Modern features, emerging maintenance needs, and what to watch for.</p>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>Contemporary DFW Home Features 🏙️</div>
          <div style={styles.grid}>
            <div style={styles.card}><div style={styles.cardIcon}>🪟</div><div style={styles.cardTitle}>Large Window Banks</div><div style={styles.cardText}>Maximize natural light and views — but DFW sun exposure accelerates UV fading and seal failure. Annual inspection matters.</div></div>
            <div style={styles.card}><div style={styles.cardIcon}>🏠</div><div style={styles.cardTitle}>Open Floor Plans</div><div style={styles.cardText}>DFW homes trend open — but large connected volumes challenge HVAC efficiency at 100°F+. Zoning is key.</div></div>
            <div style={styles.card}><div style={styles.cardIcon}>📱</div><div style={styles.cardTitle}>Smart Home Pre-Wire</div><div style={styles.cardText}>Post-2012 builds increasingly pre-wired for security, audio, and networking — but technology cycles faster than homes.</div></div>
            <div style={styles.card}><div style={styles.cardIcon}>🏗️</div><div style={styles.cardTitle}>Flat & Low Pitch Elements</div><div style={styles.cardText}>Contemporary design trends toward low slope — which requires different maintenance than traditional DFW pitched roofs.</div></div>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🔧 Year & Feature Planner</div>
          <div style={styles.row}>
            <div>
              <label style={styles.label}>Build Year Range</label>
              <select style={styles.select} value={buildYear} onChange={e => setBuildYear(e.target.value)}>
                <option value="2010-2015″>2010 – 2015</option>
                <option value="2015-2020″>2015 – 2020</option>
                <option value="2020-2026″>2020 – 2026</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>Home Feature Focus</label>
              <select style={styles.select} value={feature} onChange={e => setFeature(e.target.value)}>
                <option value="large-windows">Large Windows</option>
                <option value="open-floor-plan">Open Floor Plan</option>
                <option value="flat-low-pitch">Flat / Low-Pitch Roof</option>
                <option value="smart-pre-wire">Smart Home Pre-Wire</option>
              </select>
            </div>
          </div>
          <div style={styles.result}>
            <div style={styles.resultTitle}>Emerging Maintenance Needs</div>
            {yearIssues[buildYear].map((y, i) => <div key={i} style={styles.bullet}>{y}</div>)}
            <div style={{ ...styles.resultTitle, marginTop: '20px' }}>Feature-Specific Watchlist</div>
            {featureWatchlist[feature].map((f, i) => <div key={i} style={styles.bullet}>{f}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
