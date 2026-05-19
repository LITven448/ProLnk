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

const decadePriorities: Record<string, { maintenance: string[]; tradeoffs: string[] }> = {
  '1910s-1930s': {
    maintenance: ['Knob-and-tube wiring replacement (fire hazard, uninsurable)', 'Plaster wall repair or replacement', 'Original hardwood floor refinishing — assess for structural damage', 'Foundation pier inspection — 90+ year settling likely'],
    tradeoffs: ['Restore: preserve plaster crown molding, original fir floors, period hardware', 'Modernize: open floor plan requires removing structural walls — get engineer approval first', 'Hybrid approach: restore character elements, modernize systems (HVAC, electric, plumbing)'],
  },
  '1940s-1950s': {
    maintenance: ['Lead paint test if painting or renovating', 'Cast iron drain pipe inspection for root intrusion', 'Chimney liner inspection — coal and wood fire era damage', 'Porch column and beam structural check'],
    tradeoffs: ['Restore: original oak floors often salvageable, built-in cabinetry worth preserving', 'Modernize: galley kitchens can be opened with careful structural planning', 'Hybrid: update electrical and HVAC while keeping original woodwork and hardware'],
  },
  '1950s-1960s': {
    maintenance: ['Attic insulation upgrade — R-30 minimum for DFW heat', 'Single-pane window replacement for energy efficiency', 'HVAC replacement — original systems incompatible with modern refrigerants', 'Concrete foundation crack monitoring — era of slab construction begins'],
    tradeoffs: ['Restore: MCM crossover elements (clerestory windows, open beams) add value', 'Modernize: full kitchen and bath gut is often most cost-effective', 'Hybrid: keep original terrazzo or hardwood, update mechanicals entirely'],
  },
  'pre-1910': {
    maintenance: ['Full structural assessment — balloon frame construction era', 'Foundation underpinning evaluation', 'Full electrical and plumbing replacement before habitation', 'Roof decking inspection — original board sheathing near end of life'],
    tradeoffs: ['Restore: historic preservation value in Oak Cliff — check for landmark status', 'Modernize: cost-prohibitive without full gut — budget -350/sqft', 'Hybrid: stabilize structure, modernize systems, restore facade only'],
  },
};

export default function DFWCraftsmanHomeGuide() {
  const [decade, setDecade] = useState('1940s-1950s');

  const data = decadePriorities[decade];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.badge}>DFW Home Guide</div>
        <h1 style={styles.h1}>Craftsman Bungalows in DFW</h1>
        <p style={styles.subtitle}>Oak Cliff. East Dallas. Old Garland. Richardson. Pre-1960 character homes with specific needs.</p>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>What Makes DFW Craftsmans Unique 🏠</div>
          <div style={styles.grid}>
            <div style={styles.card}><div style={styles.cardIcon}>🪵</div><div style={styles.cardTitle}>Original Hardwood Floors</div><div style={styles.cardText}>Fir and oak floors from this era are thicker than modern — often refinishable 4-5 more times if undamaged.</div></div>
            <div style={styles.card}><div style={styles.cardIcon}>🏺</div><div style={styles.cardTitle}>Plaster Walls</div><div style={styles.cardText}>More durable than drywall but cracks over time. Skilled plaster repair is rare — budget premium labor costs.</div></div>
            <div style={styles.card}><div style={styles.cardIcon}>⚡</div><div style={styles.cardTitle}>Knob-and-Tube Risk</div><div style={styles.cardText}>Pre-1940 homes may have original wiring. Insurance companies often refuse to cover — replacement is non-negotiable.</div></div>
            <div style={styles.card}><div style={styles.cardIcon}>🛖</div><div style={styles.cardTitle}>Porch Integrity</div><div style={styles.cardText}>Craftsman porches are character-defining. Column bases rot, porch decking warps — inspect annually in DFW humidity swings.</div></div>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🔧 Era-Specific Maintenance Planner</div>
          <label style={styles.label}>Home Construction Decade</label>
          <select style={styles.select} value={decade} onChange={e => setDecade(e.target.value)}>
            <option value="pre-1910″>Pre-1910</option>
            <option value="1910s-1930s">1910s – 1930s</option>
            <option value="1940s-1950s">1940s – 1950s</option>
            <option value="1950s-1960s">1950s – 1960s</option>
          </select>
          <div style={styles.result}>
            <div style={styles.resultTitle}>Priority Maintenance for This Era</div>
            {data.maintenance.map((m, i) => <div key={i} style={styles.bullet}>{m}</div>)}
            <div style={{ ...styles.resultTitle, marginTop: '20px' }}>Restore vs. Modernize Trade-offs</div>
            {data.tradeoffs.map((t, i) => <div key={i} style={styles.bullet}>{t}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
