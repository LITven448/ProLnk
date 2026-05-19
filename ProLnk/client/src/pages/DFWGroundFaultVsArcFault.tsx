import { useState } from 'react';

const locations = ['Kitchen counter', 'Bathroom', 'Garage', 'Outdoor/patio', 'Bedroom', 'Unfinished basement/utility', 'Living room', 'Attic space'];
const concerns = ['Want to prevent electrocution', 'Worried about electrical fire', 'Breaker keeps tripping', 'Outlet sparks or is hot', 'Adding new outlet or circuit'];

export default function DFWGroundFaultVsArcFault() {
  const [location, setLocation] = useState('');
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<null | { protection: string; why: string; dfwFactor: string; cost: string }>(null);

  function assess() {
    if (!location || !concern) return;
    let protection = ''; let why = ''; let dfwFactor = ''; let cost = '';

    const needsGFCI = ['Kitchen counter', 'Bathroom', 'Garage', 'Outdoor/patio'].includes(location);
    const needsAFCI = ['Bedroom', 'Living room'].includes(location);
    const isFire = concern.includes('fire') || concern.includes('sparks') || concern.includes('hot');
    const isShock = concern.includes('electrocution');
    const isTripping = concern.includes('tripping');

    if (needsGFCI && (isShock || !isFire)) {
      protection = '⚡ GFCI Protection Required';
      why = `${location} has water or wet hands exposure risk. GFCI detects 5mA ground fault and cuts power in 1/40th of a second — faster than heart can fibrillate. NEC requires GFCI at all ${location.toLowerCase()} outlets.`;
      dfwFactor = 'DFW summer humidity makes outdoor and garage outlets especially susceptible — moisture ingress causes nuisance trips. Use weatherproof GFCI covers outdoors.';
      cost = '$35–$75 per GFCI outlet, $150–$300 for GFCI breaker protection';
    } else if (needsAFCI || isFire || concern.includes('fire')) {
      protection = '🔥 AFCI Protection Required';
      why = `${location} has arc fault risk from damaged wiring, loose connections, or worn insulation. AFCI detects the distinctive waveform of dangerous arcing — series arcs and parallel arcs that can ignite insulation at 1400°F. Standard breakers do not detect these.`;
      dfwFactor = 'DFW heat causes insulation to become brittle faster — attic wiring in 140°F summer heat degrades in 15–20 years. DFW has 60+ thunderstorm days/year; surge damage creates arc-prone wiring.';
      cost = '$45–$85 per AFCI breaker at panel, $150–$400 per circuit';
    } else if (isTripping) {
      protection = '🔍 Diagnose Before Replacing';
      why = 'Frequent GFCI trips = moisture ingress, failing appliance, or wiring fault. Frequent AFCI trips = arc fault present or overly sensitive breaker detecting motor noise.';
      dfwFactor = 'DFW clay soil movement can crack underground conduit causing moisture intrusion — outdoor GFCI trips often traced to buried conduit leaks.';
      cost = '$100–$250 for diagnostic + targeted repair';
    } else if (concern.includes('Adding new')) {
      protection = '✅ Both May Be Required for New Circuit';
      why = `New circuits in ${location} must meet current NEC — likely need both AFCI at panel and GFCI where required by location. Combination AFCI/GFCI breakers satisfy both in one device.`;
      dfwFactor = 'DFW permit required for new circuits — inspectors verify AFCI and GFCI compliance. DFW cities adopted 2023 NEC which expanded AFCI to nearly all living areas.';
      cost = '$60–$120 for combination AFCI/GFCI breaker + installation $150–$300';
    } else {
      protection = '🛡️ Dual Protection Recommended';
      why = 'For comprehensive safety: GFCI where water is present, AFCI in living areas. Some locations require both.';
      dfwFactor = 'DFW\’s age of housing stock (many 1970s–1990s homes) means aluminum wiring and original panels are common — both increase arc fault risk significantly.';
      cost = '$200–$600 to upgrade affected circuits';
    }
    setResult({ protection, why, dfwFactor, cost });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem', letterSpacing: 2 }}>DFW ELECTRICAL GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🛡️ Ground Fault vs Arc Fault</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>GFCI vs AFCI — different threats, different solutions. Know which your DFW home needs.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.25rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1rem', marginBottom: '0.75rem' }}>⚡ GFCI — Shock Prevention</h2>
            {[['Threat', 'Current flowing through your body to ground'], ['How it Works', 'Compares hot and neutral current — 5mA difference trips it'], ['Speed', '1/40th second — before cardiac arrest risk'], ['Where Required', 'Bathrooms, kitchens, garages, outdoors, basements, pools']].map(([l, v]) => (
              <div key={l} style={{ marginBottom: '0.5rem', fontSize: '0.88rem' }}><span style={{ color: '#94A3B8' }}>{l}: </span>{v}</div>
            ))}
          </div>
          <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.25rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1rem', marginBottom: '0.75rem' }}>🔥 AFCI — Fire Prevention</h2>
            {[['Threat', 'Electrical arcing in wiring igniting insulation or wood'], ['How it Works', 'Detects arc waveform signature — not just overcurrent'], ['Speed', 'Milliseconds — before temperature ignites material'], ['Where Required', 'Bedrooms, living areas, hallways, all 15/20A circuits (2023 NEC)']].map(([l, v]) => (
              <div key={l} style={{ marginBottom: '0.5rem', fontSize: '0.88rem' }}><span style={{ color: '#94A3B8' }}>{l}: </span>{v}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', marginBottom: '0.75rem' }}>☀️ DFW Summer Heat + Arc Risk</h2>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>DFW attics reach 140–160°F in summer. Wire insulation rated for 90°C (194°F) is stressed continuously. Over 20+ years this causes micro-cracks — the primary cause of arc faults in DFW's older housing stock. Homes built before 2000 rarely have AFCI protection.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1.25rem' }}>🔍 Protection Assessment</h2>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Location in Home</label>
          <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', background: '#1A3050', color: '#E8F0FE', border: '1px solid #2A4060', borderRadius: 8, padding: '0.6rem 0.8rem', marginBottom: '1rem', fontSize: '0.95rem' }}>
            <option value=''>Select location...</option>
            {locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
          <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.9rem' }}>Your Concern</label>
          <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', background: '#1A3050', color: '#E8F0FE', border: '1px solid #2A4060', borderRadius: 8, padding: '0.6rem 0.8rem', marginBottom: '1rem', fontSize: '0.95rem' }}>
            <option value=''>Select concern...</option>
            {concerns.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', cursor: 'pointer', fontSize: '1rem', width: '100%' }}>Find My Protection Type</button>

          {result && (
            <div style={{ marginTop: '1.25rem', background: '#1A3050', borderRadius: 10, padding: '1.25rem' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>{result.protection}</div>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642' }}>Why: </span>{result.why}</div>
              <div style={{ marginBottom: '0.5rem' }}><span style={{ color: '#F5E642' }}>DFW Factor: </span>{result.dfwFactor}</div>
              <div><span style={{ color: '#F5E642' }}>Installation Cost: </span>{result.cost}</div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem' }}>ProLnk · DFW Arc/Ground Fault Guide · Sparking or hot outlets are emergencies — call an electrician immediately</div>
      </div>
    </div>
  );
}
