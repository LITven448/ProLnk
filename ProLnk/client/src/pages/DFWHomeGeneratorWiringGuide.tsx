import { useState } from 'react';

type TransferResult = {
  type: string;
  safety: string;
  permit: string;
  cost: string;
  note: string;
  color: string;
};

const dfwCityPermits: Record<string, string> = {
  dallas: 'Dallas: Electrical permit required; inspected by City of Dallas Building Inspection',
  fortworth: 'Fort Worth: Electrical permit required; submit to Development Services',
  plano: 'Plano: Electrical permit required; generator over 25kW needs mechanical permit too',
  frisco: 'Frisco: Electrical permit required; automatic transfer switches require inspection',
  mckinney: 'McKinney: Electrical permit required; submit online via EnerGov portal',
  allen: 'Allen: Electrical permit required; $75–$200 fee range',
  arlington: 'Arlington: Electrical permit required; inspected by Development Services',
  garland: 'Garland: Electrical permit required; same-day scheduling available',
  irving: 'Irving: Electrical permit required; contact Building Inspection Division',
  other: 'Your city: Electrical permit almost certainly required — call your city building department before installation',
};

function getTransferRecommendation(size: string, circuits: string): TransferResult {
  if (size === 'portable' && circuits === 'few') {
    return { type: 'Manual Transfer Switch (6–10 circuit)', safety: 'Safe — physically disconnects utility', permit: 'Required', cost: '$400 – $900 installed', note: 'Best for portable generators running 6–10 essential circuits. Electrician installs a subpanel with manual switch — you flip circuits to generator manually during outage.', color: '#44BB44' };
  }
  if (size === 'portable' && circuits === 'many') {
    return { type: 'Interlock Kit + Main Breaker', safety: 'Safe — utility disconnect enforced by interlock', permit: 'Required — interlock must be listed for your panel', cost: '$200 – $600 installed', note: 'Interlock kit is code-legal in Texas if properly listed for your panel brand. Allows any circuit to run on generator power. Lower cost than full transfer switch but requires careful load management.', color: '#F5E642' };
  }
  if (size === 'standby') {
    return { type: 'Automatic Transfer Switch (ATS)', safety: 'Highest safety — utility locks out automatically', permit: 'Required — also requires gas permit if gas-fueled', cost: '$2,500 – $6,000 installed (transfer switch + wiring)', note: 'Standby generators require ATS for code compliance and practical use. ATS senses utility outage and transfers load within seconds. Whole-home ATS is standard for 20kW+ standby units.', color: '#44BB44' };
  }
  return { type: 'Automatic Transfer Switch recommended', safety: 'Transfer switch is always the safest option', permit: 'Required', cost: '$1,500 – $5,000', note: 'When in doubt, choose a properly installed automatic or manual transfer switch over an interlock kit. Backfeed kills linemen — proper isolation is non-negotiable.', color: '#8899BB' };
}

export default function DFWHomeGeneratorWiringGuide() {
  const [genSize, setGenSize] = useState('');
  const [circuits, setCircuits] = useState('');
  const [city, setCity] = useState('');
  const [result, setResult] = useState<TransferResult | null>(null);
  const [permitInfo, setPermitInfo] = useState('');

  function assess() {
    if (!genSize || !circuits) return;
    setResult(getTransferRecommendation(genSize, circuits));
    if (city) setPermitInfo(dfwCityPermits[city] || dfwCityPermits['other']);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏭⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 700, margin: 0 }}>DFW Home Generator Wiring Guide</h1>
          <p style={{ color: '#8899BB', marginTop: 12, fontSize: 16 }}>Transfer switch vs interlock kit, sizing, permits, and installation costs for DFW homeowners</p>
        </div>

        <div style={{ background: '#FF1111', borderRadius: 12, padding: 20, marginBottom: 24, border: '2px solid #FF4444' }}>
          <p style={{ color: '#FFFFFF', margin: 0, fontWeight: 700, fontSize: 15 }}>🚨 NEVER plug a generator directly into a wall outlet (backfeed). This kills utility linemen restoring power and is a federal crime. A proper transfer switch is the only safe, legal connection method.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔄 Transfer Switch vs Interlock Kit</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, border: '1px solid #2A4070' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔒 Transfer Switch</div>
              <ul style={{ color: '#C8D8EE', margin: 0, paddingLeft: 20, lineHeight: 1.8, fontSize: 14 }}>
                <li>Physically isolates utility from generator</li>
                <li>Manual or automatic versions</li>
                <li>Safer — no operator error possible</li>
                <li>Pre-selected essential circuits</li>
                <li>Higher cost but cleaner installation</li>
              </ul>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, border: '1px solid #2A4070' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🔗 Interlock Kit</div>
              <ul style={{ color: '#C8D8EE', margin: 0, paddingLeft: 20, lineHeight: 1.8, fontSize: 14 }}>
                <li>Mechanical slide blocks utility + generator breaker from both being on</li>
                <li>Legal in Texas if panel-listed</li>
                <li>Lower cost — uses existing panel</li>
                <li>Requires careful load management by homeowner</li>
                <li>All circuits accessible — risk of overload</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>📏 Sizing the Transfer Switch</h2>
          <p style={{ color: '#C8D8EE', lineHeight: 1.7 }}>Match your transfer switch amperage to your generator's output — not your home's main panel. A 7,500W portable generator outputs ~31A at 240V. A 20kW standby needs a 100A or larger ATS. Essential circuits for DFW outages: HVAC (critical in summer), refrigerator, lights, medical equipment, and garage door.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🧮 Transfer Switch Recommender</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#8899BB', display: 'block', marginBottom: 6 }}>Generator type / size</label>
            <select value={genSize} onChange={e => setGenSize(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #2A4070', color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select...</option>
              <option value="portable">Portable generator (under 12,000W)</option>
              <option value="standby">Standby generator (12kW+, auto-start)</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#8899BB', display: 'block', marginBottom: 6 }}>Essential circuits to back up</label>
            <select value={circuits} onChange={e => setCircuits(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #2A4070', color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select...</option>
              <option value="few">A few essentials (fridge, lights, fans)</option>
              <option value="many">Many circuits (HVAC, kitchen, whole home)</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#8899BB', display: 'block', marginBottom: 6 }}>Your DFW city (for permit info)</label>
            <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, background: '#0A1628', border: '1px solid #2A4070', color: '#E8EDF5', fontSize: 15 }}>
              <option value="">Select city...</option>
              {Object.keys(dfwCityPermits).map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get My Recommendation →</button>
          {result && (
            <div style={{ marginTop: 20, padding: 20, borderRadius: 10, border: `2px solid ${result.color}`, background: '#0A1628' }}>
              <div style={{ color: result.color, fontWeight: 700, fontSize: 18, marginBottom: 8 }}>✅ Recommended: {result.type}</div>
              <div style={{ color: '#C8D8EE', marginBottom: 6 }}>🛡️ Safety: {result.safety}</div>
              <div style={{ color: '#C8D8EE', marginBottom: 6 }}>💰 Cost: {result.cost}</div>
              <p style={{ color: '#8899BB', margin: '0 0 10px 0', fontSize: 13, lineHeight: 1.6 }}>{result.note}</p>
              {permitInfo && <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, borderTop: '1px solid #2A4070', paddingTop: 10 }}>📋 {permitInfo}</div>}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🏭</div>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: 0 }}>Get Generator Wiring Quotes from Vetted DFW Electricians via ProLnk</p>
        </div>
      </div>
    </div>
  );
}
