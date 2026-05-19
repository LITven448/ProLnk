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

const vintageIssues: Record<string, string[]> = {
  '1950s': ['Flat roof ponding water — DFW summer storms overwhelm original drainage', 'Asbestos in floor tile, insulation wrap, and ceiling texture', 'Original single-pane steel frame windows — replacement is complex but necessary', 'Attic insulation nonexistent or inadequate for 100°F+ DFW summers'],
  '1960s': ['Terrazzo floors — beautiful but requires specialist sealing and repair', 'Post-tension slab monitoring — era of early concrete experimentation', 'Original radiant ceiling heat (some models) — incompatible with DFW cooling needs', 'Aluminum wiring in some models — requires pigtailing at all outlets'],
  '1970s': ['HVAC system radically undersized for modern DFW summers', 'Polybutylene plumbing in some late-70s builds — replacement recommended', 'Flat/shed roof age — original materials at or past lifespan', 'Foundation watering system critical — expansive clay soil active in DFW'],
};

const goals: Record<string, string[]> = {
  'preserve': ['Restore terrazzo with professional grinding and sealing', 'Maintain original window frames with weatherstripping upgrade', 'Source period-appropriate light fixtures and hardware', 'Consult preservation architect before any exterior changes'],
  'modernize': ['HVAC upgrade to multi-zone mini-split for DFW heat management', 'Full window replacement — improve efficiency without destroying character', 'Kitchen and bath update with MCM-compatible materials (teak, Formica-look quartz)', 'Smart home integration — MCM homes have open plans ideal for whole-home audio'],
  'sell-ready': ['Address flat roof drainage first — biggest buyer objection', 'Asbestos abatement disclosure or remediation before listing', 'Fresh interior paint in period-neutral palette', 'HVAC service and certification for buyer confidence'],
};

export default function DFWMCMHomeGuide() {
  const [vintage, setVintage] = useState('1960s');
  const [goal, setGoal] = useState('modernize');

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.badge}>DFW Home Guide</div>
        <h1 style={styles.h1}>Mid-Century Modern Homes in DFW</h1>
        <p style={styles.subtitle}>1950s – 1970s DFW homes with flat roofs, large windows, and terrazzo floors. Beautiful — and specific.</p>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>MCM Home Characteristics in DFW 🏛️</div>
          <div style={styles.grid}>
            <div style={styles.card}><div style={styles.cardIcon}>🪟</div><div style={styles.cardTitle}>Large Window Banks</div><div style={styles.cardText}>Signature feature — but original single-pane glass kills energy efficiency in DFW heat. Replacement while preserving look requires specialty contractors.</div></div>
            <div style={styles.card}><div style={styles.cardIcon}>🏗️</div><div style={styles.cardTitle}>Flat or Low-Pitch Roofs</div><div style={styles.cardText}>DFW summer storms = ponding water risk. Drainage scuppers and TPO/EPDM membrane condition are critical annual checks.</div></div>
            <div style={styles.card}><div style={styles.cardIcon}>🪨</div><div style={styles.cardTitle}>Terrazzo Floors</div><div style={styles.cardText}>Marble chip and concrete floors are durable and valuable. Avoid harsh cleaners. Specialist sealing every 3-5 years preserves finish.</div></div>
            <div style={styles.card}><div style={styles.cardIcon}>⚠️</div><div style={styles.cardTitle}>Asbestos Awareness</div><div style={styles.cardText}>Popcorn ceilings, floor tile adhesive, and pipe insulation in this era often contain asbestos. Test before any renovation work.</div></div>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🔧 Era & Goal Planner</div>
          <div style={styles.row}>
            <div>
              <label style={styles.label}>Home Vintage</label>
              <select style={styles.select} value={vintage} onChange={e => setVintage(e.target.value)}>
                <option value="1950s">1950s</option>
                <option value="1960s">1960s</option>
                <option value="1970s">1970s</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>Renovation Goal</label>
              <select style={styles.select} value={goal} onChange={e => setGoal(e.target.value)}>
                <option value="preserve">Preserve Original</option>
                <option value="modernize">Modernize</option>
                <option value="sell-ready">Sell-Ready</option>
              </select>
            </div>
          </div>
          <div style={styles.result}>
            <div style={styles.resultTitle}>Era-Specific Issues to Address</div>
            {vintageIssues[vintage].map((v, i) => <div key={i} style={styles.bullet}>{v}</div>)}
            <div style={{ ...styles.resultTitle, marginTop: '20px' }}>Recommended Approach for DFW Climate</div>
            {goals[goal].map((g, i) => <div key={i} style={styles.bullet}>{g}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
