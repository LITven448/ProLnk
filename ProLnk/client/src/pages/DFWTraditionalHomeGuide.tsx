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
  cardText: { fontSize: '13px', color: '#94A3B8', lineHeight: '1.6' },
  label: { display: 'block', fontSize: '14px', fontWeight: 600, color: '#94A3B8', marginBottom: '8px' },
  select: { width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #1E2D4A', backgroundColor: '#0A1628', color: '#E8EDF5', fontSize: '14px', marginBottom: '20px' },
  result: { backgroundColor: '#0A1628', borderRadius: '10px', padding: '20px', border: '1px solid #F5E642' },
  resultTitle: { fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' },
  bullet: { fontSize: '14px', color: '#94A3B8', marginBottom: '8px', paddingLeft: '16px', borderLeft: '2px solid #F5E642' },
  costTag: { display: 'inline-block', backgroundColor: '#1E2D4A', color: '#F5E642', borderRadius: '6px', padding: '2px 8px', fontSize: '12px', fontWeight: 700, marginLeft: '8px' },
};

const decadeData: Record<string, { priorities: string[]; costs: string[] }> = {
  '1980s': {
    priorities: ['HVAC replacement — R-22 systems past end of life, retrofit required', 'Roof replacement — original shingles at 35-40 years', 'Upstairs AC separate zone or additional unit — two-story DFW problem', 'Foundation inspection — 40 years of DFW clay movement', 'Electrical panel upgrade from 100A to 200A for modern loads'],
    costs: ['HVAC replacement: $8,000 – $16,000 depending on tonnage', 'Roof: $12,000 – $25,000 for typical DFW two-story', 'Foundation piers: $400 – $800 per pier, 10-20 piers typical', 'Panel upgrade: $2,500 – $4,500 with permits'],
  },
  '1990s': {
    priorities: ['Upstairs AC performance audit — #1 complaint in DFW two-story', 'Water heater replacement (25+ years old)', 'HVAC efficiency upgrade — R-22 phase-out impacts older units', 'Windows: single-pane or early low-E nearing end of efficiency life', 'Foundation watering system to manage DFW clay'],
    costs: ['HVAC upstairs zone add: $3,000 – $6,000', 'Water heater: $1,200 – $1,800 (tank) or $3,500 – $5,500 (tankless)', 'Window replacement: $400 – $800 per window installed', 'Foundation monitoring system: $1,000 – $2,500'],
  },
  '2000s': {
    priorities: ['HVAC system at or approaching 20-year replacement window', 'Upstairs comfort audit — insulation, radiant barrier, attic ventilation', 'Roofing inspection — original shingles at 20+ years', 'Appliance refresh cycle beginning', 'Smart irrigation to protect foundation in DFW clay'],
    costs: ['HVAC full replacement: $8,000 – $16,000', 'Radiant barrier + insulation: $2,000 – $4,000', 'Roof inspection: $200 – $400; replacement if needed: $12,000 – $25,000', 'Smart irrigation: $2,500 – $4,500 installed'],
  },
  '2010s': {
    priorities: ['HVAC filter and coil maintenance program', 'Upstairs efficiency check — DFW heat exposure accelerates early wear', 'Foundation watering during drought periods', 'Exterior caulking and paint inspection', 'Water heater approaching mid-life — inspect anode rod'],
    costs: ['Annual HVAC tune-up: $100 – $200', 'Exterior paint refresh: $3,000 – $6,000', 'Water heater anode rod: $150 – $300 service call', 'Foundation watering system: $1,000 – $2,500 installed'],
  },
};

export default function DFWTraditionalHomeGuide() {
  const [decade, setDecade] = useState('1990s');

  const data = decadeData[decade];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.badge}>DFW Home Guide</div>
        <h1 style={styles.h1}>Traditional Two-Story Homes in DFW</h1>
        <p style={styles.subtitle}>1980s–2000s brick two-stories — the dominant DFW housing stock. Know what to expect by decade.</p>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>The DFW Two-Story Reality 🏠</div>
          <div style={styles.grid}>
            <div style={styles.card}><div style={styles.cardIcon}>🌡️</div><div style={styles.cardTitle}>Upstairs AC Always an Issue</div><div style={styles.cardText}>Heat rises. DFW hits 105°F. Upstairs in a two-story can be 10-15° hotter than thermostat setting. This is structural, not a malfunction.</div></div>
            <div style={styles.card}><div style={styles.cardIcon}>🧱</div><div style={styles.cardTitle}>Brick Exterior Durability</div><div style={styles.cardText}>Brick holds up well in DFW. Inspect mortar joints every 15-20 years. Look for efflorescence (white staining) as moisture indicator.</div></div>
            <div style={styles.card}><div style={styles.cardIcon}>🌍</div><div style={styles.cardTitle}>Foundation Clay Movement</div><div style={styles.cardText}>DFW soil shrinks in drought, swells in rain. Two-story homes have more foundation perimeter — monitor all corners for differential settling.</div></div>
            <div style={styles.card}><div style={styles.cardIcon}>📅</div><div style={styles.cardTitle}>Maintenance Decades</div><div style={styles.cardText}>Year 15-20: HVAC. Year 20-25: Roof. Year 25-30: Water heater, windows. Year 30+: Foundation, electrical panel. Know your timeline.</div></div>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🔧 Decade-Based Maintenance Planner</div>
          <label style={styles.label}>Home Build Decade</label>
          <select style={styles.select} value={decade} onChange={e => setDecade(e.target.value)}>
            <option value="1980s">1980s</option>
            <option value="1990s">1990s</option>
            <option value="2000s">2000s</option>
            <option value="2010s">2010s</option>
          </select>
          <div style={styles.result}>
            <div style={styles.resultTitle}>Priority Maintenance for This Era</div>
            {data.priorities.map((p, i) => <div key={i} style={styles.bullet}>{p}</div>)}
            <div style={{ ...styles.resultTitle, marginTop: '20px' }}>Typical DFW Repair Costs</div>
            {data.costs.map((c, i) => <div key={i} style={styles.bullet}>{c}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
