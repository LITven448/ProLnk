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
  alert: { backgroundColor: '#7c2d1244', border: '1px solid #ef4444', borderRadius: '8px', padding: '16px', marginBottom: '16px' },
  info: { backgroundColor: '#1e3a5f', border: '1px solid #3b82f6', borderRadius: '8px', padding: '16px', marginBottom: '16px' },
};

const cityExpansion: Record<string, { required: boolean; note: string }> = {
  dallas: { required: true, note: 'Dallas Water Utilities installs backflow preventers — closed system = expansion tank required by code' },
  fort_worth: { required: true, note: 'Fort Worth closed system since 2012; expansion tank required on all new heater installations' },
  plano: { required: true, note: 'Plano inspectors enforce expansion tank requirement on all water heater permits' },
  frisco: { required: true, note: 'Frisco requires expansion tank; high-growth areas have consistently closed systems' },
  mckinney: { required: true, note: 'McKinney closed system; expansion tank required and inspected' },
  arlington: { required: true, note: 'Arlington closed system; expansion tank required per current plumbing code' },
  irving: { required: true, note: 'Irving has backflow preventers installed; expansion tank required' },
  garland: { required: true, note: 'Garland closed system; expansion tank required for permit compliance' },
};

export default function DFWExpansionTankGuide() {
  const [homeType, setHomeType] = useState('');
  const [city, setCity] = useState('');
  const [result, setResult] = useState<null | { requirement: string; risk: string; cost: string; urgency: string; color: string }>(null);

  function assess() {
    if (!homeType || !city) return;
    const cityData = cityExpansion[city];
    const required = cityData?.required ?? true;
    const older = homeType === 'pre2000';
    const newer = homeType === 'post2010';

    if (required && older && homeType !== 'post2010') {
      setResult({
        requirement: '🚨 Almost Certainly Missing — Pre-2000 homes rarely have expansion tanks',
        risk: 'High risk: thermal expansion is stressing your water heater and PRV daily; T&P valve may be weeping',
        cost: 'Expansion tank installation: $200–$400 including labor',
        urgency: 'Install within 30 days — required for permit compliance and warranty on new heaters',
        color: '#ef4444',
      });
    } else if (required && !newer) {
      setResult({
        requirement: '⚠️ Likely Required — verify if expansion tank is present at water heater',
        risk: 'Moderate: thermal expansion shortens water heater life and can void manufacturer warranty',
        cost: 'Installation: $180–$350; tank only: $35–$80',
        urgency: 'Verify within 60 days; required if getting new water heater',
        color: '#f97316',
      });
    } else if (required && newer) {
      setResult({
        requirement: '✅ Should Already Have One — post-2010 installs require expansion tank by DFW code',
        risk: 'Low if installed; locate tank near cold water inlet on water heater',
        cost: 'Verify tank pre-charge pressure (should match home water pressure): free self-check with tire gauge',
        urgency: 'Check tank annually; replace every 5–8 years or when waterlogged',
        color: '#22c55e',
      });
    } else {
      setResult({
        requirement: '📋 Consult Local Code — verify your specific city\’s requirements',
        risk: 'Without a closed system, thermal expansion is less critical but still best practice',
        cost: 'Expansion tank: $180–$400 installed',
        urgency: 'Recommended regardless; especially if you have a PRV installed',
        color: '#3b82f6',
      });
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🫙</div>
        <h1 style={styles.title}>DFW Expansion Tank Guide</h1>
        <p style={styles.subtitle}>Why DFW closed plumbing systems require expansion tanks — and what happens without one</p>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📍 The DFW Closed System Problem</h2>
        <p style={styles.text}>Every DFW city now uses backflow preventers on municipal water connections — which creates a "closed system." When your water heater heats water, it expands (water increases volume ~2% when heated from 50°F to 120°F). In an open system, this expansion flows back toward the street. In a closed DFW system, it has nowhere to go.</p>
        <div style={styles.alert}>
          <strong style={{ color: '#fca5a5' }}>🚨 Without an Expansion Tank:</strong>
          <span style={{ color: '#fca5a5' }}> Thermal expansion creates pressure spikes of 150+ PSI daily. This stresses pipe fittings, PRV, and water heater — shortening all three by years and frequently tripping the T&P relief valve.</span>
        </div>
        <div style={styles.grid}>
          <div style={styles.card}><div style={styles.cardTitle}>🏙️ DFW Mandate</div><div style={styles.text}>All major DFW cities require expansion tanks on water heater permits — but millions of pre-code homes are unprotected</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>💰 Cheap Fix</div><div style={styles.text}>$200–$400 installed; one of the highest ROI plumbing upgrades in DFW</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>⏱️ Tank Life</div><div style={styles.text}>5–8 years; waterlogged tanks lose function — test annually by tapping (should sound hollow)</div></div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🔍 How Expansion Tanks Work</h2>
        <p style={styles.text}>A small tank (2–5 gallon) connects to the cold water supply line entering the water heater. Inside is a rubber bladder pre-charged to match your home's water pressure. As the heater runs, expanded water compresses into the tank — pressure is absorbed, not transferred to your pipes and fixtures.</p>
        <div style={styles.grid}>
          <div style={styles.card}><div style={styles.cardTitle}>📍 Location</div><div style={styles.text}>Cold water inlet line, within 18" of water heater — typically mounted vertically or horizontally</div></div>
          <div style={styles.card}><div style={styles.cardTitle}>🎯 Pre-Charge</div><div style={styles.text}>Must match home water pressure (usually 50–80 PSI in DFW); re-check when PRV is adjusted</div></div>
        </div>
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🧮 Expansion Tank Requirement Checker</h2>
        <label style={styles.label}>Home Type / Age</label>
        <select style={styles.select} value={homeType} onChange={e => setHomeType(e.target.value)}>
          <option value="">Select home age...</option>
          <option value="pre2000">Pre-2000 construction</option>
          <option value="2000_2010">2000–2010 construction</option>
          <option value="post2010">Post-2010 construction</option>
          <option value="new_heater">Getting a new water heater now</option>
        </select>
        <label style={styles.label}>DFW City</label>
        <select style={styles.select} value={city} onChange={e => setCity(e.target.value)}>
          <option value="">Select city...</option>
          <option value="dallas">Dallas</option>
          <option value="fort_worth">Fort Worth</option>
          <option value="plano">Plano</option>
          <option value="frisco">Frisco</option>
          <option value="mckinney">McKinney</option>
          <option value="arlington">Arlington</option>
          <option value="irving">Irving</option>
          <option value="garland">Garland</option>
        </select>
        <button style={styles.button} onClick={assess}>Check My Requirement</button>

        {result && (
          <div style={styles.result}>
            <div style={styles.resultTitle}>Expansion Tank Assessment</div>
            <span style={{ ...styles.badge, backgroundColor: result.color + '22', color: result.color, border: `1px solid ${result.color}` }}>{result.requirement}</span>
            <p style={{ color: '#cbd5e1', marginTop: '12px' }}><strong style={{ color: '#F5E642' }}>Risk Without Tank:</strong> {result.risk}</p>
            <p style={{ color: '#cbd5e1', marginTop: '8px' }}><strong style={{ color: '#F5E642' }}>Cost:</strong> {result.cost}</p>
            <p style={{ color: '#cbd5e1', marginTop: '8px' }}><strong style={{ color: '#F5E642' }}>Urgency:</strong> {result.urgency}</p>
            {city && cityExpansion[city] && <p style={{ color: '#94a3b8', marginTop: '12px', fontSize: '0.875rem' }}>📍 {cityExpansion[city].note}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
