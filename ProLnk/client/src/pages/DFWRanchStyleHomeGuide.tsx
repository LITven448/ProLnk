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
  label: { display: 'block', fontSize: '14px', fontWeight: 600, color: '#94A3B8', marginBottom: '8px' },
  select: { width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #1E2D4A', backgroundColor: '#0A1628', color: '#E8EDF5', fontSize: '14px', marginBottom: '20px' },
  result: { backgroundColor: '#0A1628', borderRadius: '10px', padding: '20px', border: '1px solid #F5E642′ },
  resultTitle: { fontSize: '17px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' },
  bullet: { fontSize: '14px', color: '#94A3B8', marginBottom: '8px', paddingLeft: '16px', borderLeft: '2px solid #F5E642′ },
};

const priorities: Record<string, string[]> = {
  'pre-1970': ['Original plumbing inspection (galvanized pipe risk)', 'Roof decking check — older OSB or board sheathing', 'Attic insulation upgrade for DFW heat', 'HVAC sizing review — original systems undersized'],
  '1970-1990': ['Foundation pier inspection (expansive DFW clay)', 'Roof age check — likely at or past lifespan', 'Single-pane window replacement for energy savings', 'Electrical panel upgrade if original 100A'],
  '1990-2005': ['HVAC system efficiency upgrade (R-22 phase-out)', 'Water heater replacement if 15+ years old', 'Deck/porch board inspection and refinishing', 'Gutter guard installation — large ranch roof = heavy runoff'],
  '2005-present': ['Smart irrigation system to protect foundation', 'HVAC filter and coil maintenance', 'Exterior caulking and paint touchup', 'Annual foundation watering system check'],
};

const renovations: Record<string, string[]> = {
  'excellent': ['Kitchen open-concept expansion', 'Master bath addition or expansion', 'Outdoor entertainment area build-out', 'Smart home system integration'],
  'good': ['Kitchen cabinet and countertop refresh', 'HVAC variable-speed upgrade', 'Bathroom tile and fixture update', 'Attic insulation and radiant barrier'],
  'fair': ['Foundation repair if needed first', 'Roof replacement before cosmetic work', 'Electrical and plumbing system updates', 'HVAC full replacement'],
  'needs-work': ['Foundation stabilization', 'Roof and structural assessment', 'Plumbing and electrical safety audit', 'HVAC replacement before occupancy'],
};

export default function DFWRanchStyleHomeGuide() {
  const [age, setAge] = useState('1990-2005');
  const [condition, setCondition] = useState('good');

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.badge}>DFW Home Guide</div>
        <h1 style={styles.h1}>Ranch Style Homes in DFW</h1>
        <p style={styles.subtitle}>Single-story, sprawling, brick — the most common home style across the Metroplex.</p>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>Why Ranch Homes Dominate DFW 🏡</div>
          <div style={styles.grid}>
            <div style={styles.card}><div style={styles.cardIcon}>📐</div><div style={styles.cardTitle}>Single Story Advantage</div><div style={styles.cardText}>Aging-in-place friendly. No stairs, easier HVAC zoning, and lower renovation costs per square foot.</div></div>
            <div style={styles.card}><div style={styles.cardIcon}>🧱</div><div style={styles.cardTitle}>Brick Exterior</div><div style={styles.cardText}>DFW brick weathers well. Less exterior maintenance than wood siding — but mortar joints need inspection every 15-20 years.</div></div>
            <div style={styles.card}><div style={styles.cardIcon}>☀️</div><div style={styles.cardTitle}>Larger Roof Surface</div><div style={styles.cardText}>More accessible for repairs, but larger area means more shingles, more gutters, and higher replacement cost.</div></div>
            <div style={styles.card}><div style={styles.cardIcon}>🌿</div><div style={styles.cardTitle}>Sprawling Lot Use</div><div style={styles.cardText}>Ranch homes use lot depth efficiently. Foundation footprint is wider — monitor all corners for differential settling.</div></div>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🔧 Personalized Maintenance Planner</div>
          <label style={styles.label}>Home Build Era</label>
          <select style={styles.select} value={age} onChange={e => setAge(e.target.value)}>
            <option value="pre-1970″>Pre-1970</option>
            <option value="1970-1990″>1970 – 1990</option>
            <option value="1990-2005″>1990 – 2005</option>
            <option value="2005-present">2005 – Present</option>
          </select>
          <label style={styles.label}>Current Condition</label>
          <select style={styles.select} value={condition} onChange={e => setCondition(e.target.value)}>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="needs-work">Needs Work</option>
          </select>
          <div style={styles.result}>
            <div style={styles.resultTitle}>Priority Maintenance</div>
            {priorities[age].map((p, i) => <div key={i} style={styles.bullet}>{p}</div>)}
            <div style={{ ...styles.resultTitle, marginTop: '20px' }}>Popular DFW Ranch Renovations</div>
            {renovations[condition].map((r, i) => <div key={i} style={styles.bullet}>{r}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
