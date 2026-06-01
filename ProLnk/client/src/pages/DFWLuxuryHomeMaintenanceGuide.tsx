import { useState } from 'react';

const styles: Record<string, React.CSSProperties> = {
  page: { backgroundColor: '#F8F9FA', minHeight: '100vh', color: '#1A1A2E', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' },
  container: { maxWidth: '860px', margin: '0 auto' },
  badge: { backgroundColor: '#1A1A2E', color: '#F5E642', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, display: 'inline-block', marginBottom: '16px' },
  h1: { fontSize: '36px', fontWeight: 800, color: '#1A1A2E', marginBottom: '8px' },
  subtitle: { color: '#6B7280', fontSize: '16px', marginBottom: '40px' },
  section: { backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '28px', marginBottom: '24px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  sectionTitle: { fontSize: '20px', fontWeight: 700, color: '#1A1A2E', marginBottom: '16px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' },
  card: { backgroundColor: '#F8F9FA', borderRadius: '10px', padding: '18px', border: '1px solid #E5E7EB' },
  cardIcon: { fontSize: '28px', marginBottom: '10px' },
  cardTitle: { fontSize: '15px', fontWeight: 700, color: '#1A1A2E', marginBottom: '6px' },
  cardText: { fontSize: '13px', color: '#6B7280', lineHeight: '1.6' },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  label: { display: 'block', fontSize: '14px', fontWeight: 600, color: '#6B7280', marginBottom: '8px' },
  select: { width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', color: '#1A1A2E', fontSize: '14px', marginBottom: '20px' },
  result: { backgroundColor: '#F8F9FA', borderRadius: '10px', padding: '20px', border: '2px solid #1A1A2E' },
  resultTitle: { fontSize: '17px', fontWeight: 700, color: '#1A1A2E', marginBottom: '12px' },
  bullet: { fontSize: '14px', color: '#374151', marginBottom: '8px', paddingLeft: '16px', borderLeft: '3px solid #F5E642' },
  budgetBox: { backgroundColor: '#1A1A2E', borderRadius: '10px', padding: '20px', marginTop: '20px' },
  budgetTitle: { fontSize: '16px', fontWeight: 700, color: '#F5E642', marginBottom: '12px' },
  budgetLine: { fontSize: '14px', color: '#E8EDF5', marginBottom: '6px' },
};

const homeValues: Record<string, { needs: string[]; specialists: string[] }> = {
  '750k-1m': {
    needs: ['Carrier or Trane HVAC system — annual preventive maintenance contract', 'Whole-home water filtration system annual filter service', 'Smart home system (Control4, Savant) — requires certified technician', 'Pool and outdoor kitchen quarterly service', 'Landscape and irrigation bi-monthly service'],
    specialists: ['HVAC: Commercial-grade residential specialist (not standard residential)', 'Smart home: Certified Control4 or Savant integrator', 'Pool: Weekly pool service company + annual equipment inspection', 'Landscape: Licensed irrigator + landscape architect for design changes'],
  },
  '1m-2m': {
    needs: ['Generator maintenance — quarterly load test, annual service', 'Wine room climate control system — dedicated monitoring', 'Home theater calibration and equipment maintenance', 'Security system and cameras — professional monitoring + quarterly inspection', 'Custom millwork maintenance — wood movement in DFW humidity swings'],
    specialists: ['Generator: Kohler or Generac certified dealer', 'Wine room: HVAC specialist with humidity control experience', 'AV/Theater: Certified Crestron or Control4 dealer', 'Security: Commercial-grade residential security integrator', 'Millwork: Custom cabinet and woodwork restoration specialist'],
  },
  '2m-plus': {
    needs: ['Whole-home automation system: full annual audit and software update', 'Multiple HVAC zones: dedicated commercial maintenance contract', 'Elevator or lift: annual certification required in Texas', 'Smart glass or motorized shade system: annual calibration', 'Rooftop terrace or green roof: quarterly inspection and drainage clearance'],
    specialists: ['Automation: Savant or Crestron certified Premier dealer', 'Elevator: Texas-licensed elevator company (legally required inspections)', 'HVAC: Commercial systems contractor familiar with VRF systems', 'Roofing: Specialty flat and green roof contractor', 'Plumbing: Licensed master plumber for whole-home manifold systems'],
  },
};

const featureBudgets: Record<string, string[]> = {
  'generator': ['Annual service contract: varies by provider, billed yearly', 'Transfer switch inspection: included or billed separately', 'Fuel (propane/natural gas): up to $1,200/year operational cost'],
  'smart-home': ['Annual monitoring/support contract: $1,200 – $3,600/year', 'Software licensing (Savant, Control4): varies by platform, billed yearly', 'Hardware refresh cycle: budget $5,000 – $15,000 every 5 years'],
  'wine-room': ['Climate control service: varies by system, billed yearly', 'Cooling unit replacement cycle: $3,000 – $8,000 every 8-12 years', 'Humidity sensor calibration: included in service contract'],
  'pool': ['Weekly pool service: varies by pool size, billed monthly', 'Annual equipment inspection: varies by equipment', 'Filter and pump replacement cycle: $1,500 – $5,000 every 5-8 years'],
};

export default function DFWLuxuryHomeMaintenanceGuide() {
  const [homeValue, setHomeValue] = useState('1m-2m');
  const [feature, setFeature] = useState('smart-home');

  const data = homeValues[homeValue];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.badge}>DFW Luxury Home Guide</div>
        <h1 style={styles.h1}>Luxury DFW Home Maintenance</h1>
        <p style={styles.subtitle}>$750K+ DFW homes have premium systems, different expectations, and specialist contractor requirements.</p>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>Premium Systems in DFW Luxury Homes 🏛️</div>
          <div style={styles.grid}>
            <div style={styles.card}><div style={styles.cardIcon}>❄️</div><div style={styles.cardTitle}>Carrier Infinity / Lennox Elite HVAC</div><div style={styles.cardText}>Variable-speed systems require certified technicians. Standard HVAC companies lack training for luxury systems — require dealer-certified service.</div></div>
            <div style={styles.card}><div style={styles.cardIcon}>⚡</div><div style={styles.cardTitle}>Whole-Home Generator</div><div style={styles.cardText}>22kW+ standby generators require quarterly load tests and annual professional service. Texas requires annual elevator inspection (separate requirement).</div></div>
            <div style={styles.card}><div style={styles.cardIcon}>🎬</div><div style={styles.cardTitle}>Home Theater Systems</div><div style={styles.cardText}>Crestron, Savant, Control4 ecosystems require certified integrators — not general AV contractors. Budget for annual calibration and software updates.</div></div>
            <div style={styles.card}><div style={styles.cardIcon}>🍷</div><div style={styles.cardTitle}>Wine Room Climate Control</div><div style={styles.cardText}>Dedicated cooling units must maintain 55°F and 60-70% humidity — challenging in DFW heat. Requires specialist, not standard HVAC contractor.</div></div>
          </div>
        </div>

        <div style={styles.section}>
          <div style={styles.sectionTitle}>🔧 Luxury Maintenance Planner</div>
          <div style={styles.row}>
            <div>
              <label style={styles.label}>Home Value Range</label>
              <select style={styles.select} value={homeValue} onChange={e => setHomeValue(e.target.value)}>
                <option value="750k-1m">$750K – $1M</option>
                <option value="1m-2m">$1M – $2M</option>
                <option value="2m-plus">$2M+</option>
              </select>
            </div>
            <div>
              <label style={styles.label}>Premium Feature Budget</label>
              <select style={styles.select} value={feature} onChange={e => setFeature(e.target.value)}>
                <option value="generator">Whole-Home Generator</option>
                <option value="smart-home">Smart Home System</option>
                <option value="wine-room">Wine Room</option>
                <option value="pool">Pool & Outdoor Kitchen</option>
              </select>
            </div>
          </div>
          <div style={styles.result}>
            <div style={styles.resultTitle}>Priority Maintenance Needs</div>
            {data.needs.map((n, i) => <div key={i} style={styles.bullet}>{n}</div>)}
            <div style={{ ...styles.resultTitle, marginTop: '20px' }}>Specialist Contractor Types Required</div>
            {data.specialists.map((s, i) => <div key={i} style={styles.bullet}>{s}</div>)}
            <div style={styles.budgetBox}>
              <div style={styles.budgetTitle}>Annual Budget for {feature === 'generator' ? 'Generator' : feature === 'smart-home' ? 'Smart Home' : feature === 'wine-room' ? 'Wine Room' : 'Pool'} System</div>
              {featureBudgets[feature].map((b, i) => <div key={i} style={styles.budgetLine}>• {b}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
