import { useState } from 'react';

const SOLAR_SETUPS = ['No solar yet', 'Solar panels only', 'Solar + battery (Powerwall)', 'Solar + battery + EV charger'];
const LOCATIONS = ['Dallas', 'Fort Worth', 'Arlington', 'Plano', 'Frisco', 'McKinney', 'Irving', 'Garland'];

interface SolarResult {
  programs: string[];
  annualEstimate: number;
  note: string;
}

const PROGRAMS: Record<string, { programs: string[]; base: number; note: string }> = {
  'No solar yet': {
    programs: ['None available yet — see installation incentives below'],
    base: 0,
    note: 'Average DFW solar install pays back in 7-9 years. $0-down leases available.',
  },
  'Solar panels only': {
    programs: ['Oncor net metering credit (~$0.08/kWh)', 'TXU/Reliant export credits (varies)', 'ERCOT excess export during peak hours'],
    base: 420,
    note: 'Oncor issues bill credits, not cash. Export rates vary by retail provider.',
  },
  'Solar + battery (Powerwall)': {
    programs: ['Oncor net metering credit', 'Tesla Virtual Power Plant (earn ~$1,500/yr)', 'ERCOT demand response events ($50-200/event)', 'Summer peak load reduction incentives'],
    base: 1950,
    note: 'Tesla VPP pays real cash — not bill credits. ERCOT demand response events are highest value.',
  },
  'Solar + battery + EV charger': {
    programs: ['All Powerwall programs above', 'V2G vehicle-to-grid (coming 2026 via Ford Pro)', 'Oncor EV demand response credit', 'Time-of-use arbitrage (charge cheap, export peak)'],
    base: 2600,
    note: 'V2G programs are emerging in DFW. Ford F-150 Lightning and Chevy Silverado EV eligible.',
  },
};

const LOCATION_MULT: Record<string, number> = {
  Dallas: 1.05, Frisco: 1.08, Plano: 1.07, McKinney: 1.06,
  'Fort Worth': 1.0, Arlington: 1.02, Irving: 1.03, Garland: 0.98,
};

export default function DFWSolarRentalIncomeGuide() {
  const [setup, setSetup] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<SolarResult | null>(null);

  function calculate() {
    if (!setup || !location) return;
    const prog = PROGRAMS[setup];
    const mult = LOCATION_MULT[location] ?? 1.0;
    setResult({
      programs: prog.programs,
      annualEstimate: Math.round(prog.base * mult),
      note: prog.note,
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>☀️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', color: '#F5E642' }}>DFW Solar Income Opportunities</h1>
          <p style={{ margin: 0, opacity: 0.8, lineHeight: 1.6 }}>DFW homeowners with solar and battery storage can earn real cash — not just bill credits. Tesla Powerwall's Virtual Power Plant pays ~$1,500/yr. ERCOT demand response events add more.</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>⚡ How DFW Net Metering Works</h2>
          <ul style={{ lineHeight: 2, paddingLeft: 20, margin: 0, opacity: 0.9 }}>
            <li>Oncor distributes electricity in DFW — they offer net metering credits (~$0.08/kWh)</li>
            <li>Credits offset your bill but Oncor does NOT write you a check</li>
            <li>Retail providers (TXU, Reliant, Green Mountain) set buyback rates — shop annually</li>
            <li>Battery storage unlocks ERCOT demand response — actual cash payments</li>
            <li>ERCOT pays grid operators to reduce load during peak demand (summer afternoons)</li>
          </ul>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>💰 Income Calculator</h2>
          <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Your Current Solar Setup</label>
              <select value={setup} onChange={e => setSetup(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.2)', background: '#0A1628', color: '#fff', fontSize: 15 }}>
                <option value="">Select setup</option>
                {SOLAR_SETUPS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>DFW Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid rgba(255,255,255,0.2)', background: '#0A1628', color: '#fff', fontSize: 15 }}>
                <option value="">Select city</option>
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}>Show My Opportunities</button>
          {result && (
            <div style={{ marginTop: 20, background: 'rgba(245,230,66,0.1)', border: '1.5px solid #F5E642', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>
                {result.annualEstimate > 0 ? `~$${result.annualEstimate.toLocaleString()}/year` : 'No direct income programs yet'}
              </div>
              <div style={{ marginBottom: 12, opacity: 0.85 }}>Available programs:</div>
              <ul style={{ paddingLeft: 20, margin: '0 0 12px', lineHeight: 1.9 }}>
                {result.programs.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
              <div style={{ opacity: 0.75, fontSize: 13, fontStyle: 'italic' }}>{result.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔋 Solar Lease & Rental Models in DFW</h2>
          <ul style={{ lineHeight: 2, paddingLeft: 20, margin: 0, opacity: 0.9 }}>
            <li>$0-down solar leases: Sunrun, SunPower, and Tesla offer DFW leases — you use power, they own panels</li>
            <li>Power Purchase Agreement (PPA): Pay per kWh at locked rate (typically 20-40% below Oncor)</li>
            <li>Solar loan: Own the panels, claim 30% federal tax credit, keep all income</li>
            <li>Community solar: Subscribe to a DFW solar farm — no panels on your roof, bill credits only</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
