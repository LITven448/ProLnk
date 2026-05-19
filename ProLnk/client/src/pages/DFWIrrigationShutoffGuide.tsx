import { useState } from 'react';

const dfwCities = ['Dallas', 'Fort Worth', 'Plano', 'Frisco', 'McKinney', 'Arlington', 'Irving', 'Garland', 'Denton', 'Allen', 'Other DFW'];
const systemTypes = ['In-Ground Sprinkler (Standard)', 'In-Ground Sprinkler (Smart Controller)', 'Drip Irrigation Only', 'No Irrigation System'];

const restrictions: Record<string, string> = {
  'Dallas': 'Stage 1: 2 days/week. Stage 2: 1 day/week. Check DallasWater.org for current stage.',
  'Fort Worth': 'Odd/even watering schedule based on address. Check FortWorthTexas.gov/Water.',
  'Plano': '2 days/week year-round. No watering 10am–6pm. PlanoTX.gov/Water.',
  'Frisco': 'Two-day schedule. Check FriscoTexas.gov for seasonal restrictions.',
  'McKinney': 'Alternate day schedule. McKinneyTexas.net/Water.',
  'Arlington': 'Stage-based. Check ArlingtonTX.gov for active restrictions.',
  'Irving': 'Twice-weekly schedule. IrvingWater.com.',
  'Garland': 'Follows NTMWD guidelines. Garlandtx.gov/Water.',
  'Denton': '2 days/week spring-fall, 1 day/week winter. DentonTexas.com.',
  'Allen': 'Twice-weekly schedule. AllenTX.gov.',
  'Other DFW': 'Check your city\’s water utility website for current restrictions.',
};

function getSteps(city: string, system: string) {
  if (system === 'No Irrigation System') return null;
  const steps = system === 'In-Ground Sprinkler (Smart Controller)'
    ? ['1. Access smart controller app or panel', '2. Set to "Rain Delay" or "Off" mode', '3. Locate backflow preventer (typically outside near foundation)', '4. Turn both ball valves 90° to closed position', '5. After freeze: re-enable in app and check all zones']
    : system === 'Drip Irrigation Only'
    ? ['1. Locate inline shutoff at drip system connection point', '2. Turn clockwise to close', '3. Drip lines rarely need winterizing in DFW — partial freeze exposure is low', '4. Check emitters for clogs after cold events']
    : ['1. Turn off controller (switch to "Off" or "Rain" mode)', '2. Locate backflow preventer outside — usually 2 brass valves', '3. Close both valves on backflow preventer (turn 90°)', '4. DFW rarely needs full blow-out — partial shutoff is usually sufficient', '5. Monitor forecast: if below 28°F sustained, shut off main irrigation supply'];
  return { steps, restriction: restrictions[city] || restrictions['Other DFW'] };
}

export default function DFWIrrigationShutoffGuide() {
  const [city, setCity] = useState('');
  const [system, setSystem] = useState('');
  const result = city && system ? getSteps(city, system) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🌿 DFW Home Health Vault</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>Irrigation Shut-Off Guide — DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, fontSize: 15 }}>DFW winters are typically mild — most irrigation systems don't need a full air blow-out. But freeze events (below 28°F) can burst backflow preventers and exposed pipes. Know how to shut down fast.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🌡️', title: 'DFW Freeze Threshold', body: 'Shut off irrigation when forecast shows sustained temps below 28°F. Brief dips to 32°F rarely damage DFW systems.' },
            { icon: '🔒', title: 'Backflow Preventer', body: 'Located outside near the foundation. Two brass ball valves — turn both 90° to close. Exposed unit is your highest freeze risk.' },
            { icon: '⏰', title: 'Optimal Watering Window', body: 'Water 6am–10am in DFW — reduces evaporation and complies with most DFW city restrictions.' },
            { icon: '🌊', title: 'Water Restriction Stages', body: 'DFW cities escalate watering restrictions during droughts. Fines can be $200–$1,000 per violation.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>❄️ Winterization & Compliance Checker</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>DFW City</label>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', background: '#1A2F50', border: '1px solid #2A4A70', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select city</option>
                {dfwCities.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94A3B8', marginBottom: 6 }}>Irrigation System Type</label>
              <select value={system} onChange={e => setSystem(e.target.value)} style={{ width: '100%', background: '#1A2F50', border: '1px solid #2A4A70', borderRadius: 8, color: '#E8EDF5', padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select system type</option>
                {systemTypes.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          {result === null && system === 'No Irrigation System' && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, color: '#94A3B8', fontSize: 14 }}>✅ No irrigation system — no winterization needed. Check your outdoor hose bibs before freezes.</div>
          )}
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>❄️ WINTERIZATION STEPS</div>
                {result.steps.map((s, i) => <div key={i} style={{ color: '#E8EDF5', fontSize: 14, marginBottom: 6 }}>{s}</div>)}
              </div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>💧 {city.toUpperCase()} WATER RESTRICTIONS</div>
                <div style={{ color: '#94A3B8', fontSize: 14 }}>{result.restriction}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
