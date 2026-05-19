import { useState } from 'react';

export default function DFWBackupPowerGuide() {
  const [homeSize, setHomeSize] = useState('medium');
  const [mustHaveCircuits, setMustHaveCircuits] = useState<string[]>([]);
  const [budget, setBudget] = useState('medium');
  const [result, setResult] = useState<{ system: string; cost: string; fuel: string; runtime: string; pros: string[]; cons: string[] } | null>(null);

  function toggleCircuit(c: string) {
    setMustHaveCircuits(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  }

  function calculate() {
    const circuits = mustHaveCircuits;
    const needsHVAC = circuits.includes('hvac');
    const needsWhole = circuits.length >= 4 || homeSize === 'large';

    if (budget === 'low') {
      setResult({
        system: 'Portable Generator + Transfer Switch',
        cost: '$800 - $2,500 installed',
        fuel: 'Gasoline (store 10-15 gallons) - run outside only',
        runtime: '8-12 hours per tank, must manually start and refuel',
        pros: ['Lowest upfront cost', 'Powers essential circuits during ERCOT events', 'Portable - take with you if you evacuate'],
        cons: ['Requires fuel storage (gas degrades in 30 days without stabilizer)', 'Manual operation - must be home to start', 'Noisy, outdoor operation only', 'Cannot run whole home HVAC efficiently'],
      });
    } else if (budget === 'medium' && !needsWhole) {
      setResult({
        system: 'Standby Generator (10-14kW) - Partial Home',
        cost: '$5,500 - $9,000 installed',
        fuel: 'Natural gas preferred in DFW - always on, no fuel storage needed',
        runtime: 'Unlimited on natural gas - runs as long as utility gas flows',
        pros: ['Automatic start within 10-30 seconds of outage', 'No fuel storage or manual intervention', 'Powers essential circuits: fridge, lights, some HVAC', 'Natural gas almost never interrupted in DFW (unlike power)'],
        cons: ['Does not cover entire home at once with 10-14kW', 'Requires annual maintenance ($200-400/year)', 'Permit + transfer switch installation adds to cost'],
      });
    } else if (needsWhole || homeSize === 'large') {
      setResult({
        system: 'Whole-Home Standby Generator (20-26kW)',
        cost: '$10,000 - $18,000 installed',
        fuel: 'Natural gas - connect to existing DFW natural gas line',
        runtime: 'Unlimited - runs entire home indefinitely during power outage',
        pros: ['Runs 100% of home loads simultaneously', 'Automatic start, no manual action needed', 'Pool pump, HVAC, all appliances covered', 'Natural gas in DFW is extremely reliable even during Uri'],
        cons: ['Higher upfront cost', 'Requires 18-24 inch clearance from windows/doors (DFW code)', 'HOA may require screening or approval in some DFW communities'],
      });
    } else {
      setResult({
        system: 'Battery Backup System (Powerwall 3 or equivalent)',
        cost: '$12,000 - $15,000 installed',
        fuel: 'No fuel - charges from grid or solar panels',
        runtime: '8-12 hours on essential loads, 4-6 hours with HVAC',
        pros: ['Silent operation - HOA friendly', 'Works with solar for extended outage protection', 'Instant switchover (no 10-30 second gap like generators)', 'App monitoring and control'],
        cons: ['Limited runtime without solar recharge', 'HVAC significantly reduces runtime', 'Higher cost per kWh of backup power vs natural gas generator'],
      });
    }
  }

  const outageData = [
    { event: 'Winter Storm Uri (Feb 2021)', duration: '4-7 days for millions of DFW homes', impact: 'Hundreds of deaths, $200B+ economic damage - the event that changed everything' },
    { event: 'ERCOT Summer Scarcity Events', duration: '2-8 hour rolling blackouts', impact: 'Occur during heat waves when demand exceeds generation capacity' },
    { event: 'Ice Storm Outages', duration: '12-72 hours typical', impact: 'DFW averages 2-3 significant ice events per decade; frequency increasing' },
    { event: 'Thunderstorm / Tornado Damage', duration: '4-24 hours typical', impact: 'Localized distribution damage; affects individual neighborhoods' },
  ];

  const circuits = [
    { id: 'hvac', label: 'HVAC / Heat' },
    { id: 'fridge', label: 'Refrigerator' },
    { id: 'lights', label: 'Lights' },
    { id: 'well', label: 'Well Pump' },
    { id: 'medical', label: 'Medical Equipment' },
    { id: 'wifi', label: 'WiFi / Electronics' },
    { id: 'garage', label: 'Garage Door' },
    { id: 'pool', label: 'Pool Equipment' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW BACKUP POWER GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>Backup Power Guide for DFW Homes</h1>
        <p style={{ color: '#8A9BBE', marginBottom: 16, lineHeight: 1.6 }}>Winter Storm Uri proved what DFW homeowners suspected: the Texas grid cannot always be relied upon. Here is every backup power option - and how to choose the right one for your home and budget.</p>

        <div style={{ background: '#1A2F4E', borderRadius: 12, padding: 20, border: '1px solid #F5E642', marginBottom: 36 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Why Natural Gas Wins in DFW</div>
          <p style={{ color: '#C8D5E8', lineHeight: 1.7, margin: 0 }}>During Uri, Atmos Energy kept gas flowing to 97% of DFW homes even as the electric grid collapsed. Natural gas standby generators are the #1 recommended backup solution for DFW because your fuel supply is almost never interrupted - even during multi-day grid failures.</p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>DFW Outage History</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 40 }}>
          {outageData.map(o => (
            <div key={o.event} style={{ background: '#111E35', borderRadius: 10, padding: 16, border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, gap: 12 }}>
                <span style={{ fontWeight: 700, color: '#E8EDF5' }}>{o.event}</span>
                <span style={{ color: '#F5E642', fontSize: 13, whiteSpace: 'nowrap' }}>{o.duration}</span>
              </div>
              <div style={{ color: '#8A9BBE', fontSize: 13 }}>{o.impact}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Find Your Backup Power Solution</h2>
        <div style={{ background: '#111E35', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F', marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#8A9BBE', fontSize: 13, marginBottom: 6 }}>Home Size</label>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="small">Small (under 1,800 sq ft)</option>
                <option value="medium">Medium (1,800-3,500 sq ft)</option>
                <option value="large">Large (3,500+ sq ft)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#8A9BBE', fontSize: 13, marginBottom: 6 }}>Budget Range</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', color: '#E8EDF5', fontSize: 15 }}>
                <option value="low">Low ($1,000 - $4,000)</option>
                <option value="medium">Medium ($4,000 - $10,000)</option>
                <option value="high">High ($10,000+)</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#8A9BBE', fontSize: 13, marginBottom: 10 }}>Must-Have Circuits During Outage</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {circuits.map(c => (
                <button key={c.id} onClick={() => toggleCircuit(c.id)} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid', borderColor: mustHaveCircuits.includes(c.id) ? '#F5E642' : '#1E3A5F', background: mustHaveCircuits.includes(c.id) ? '#F5E642' : '#0A1628', color: mustHaveCircuits.includes(c.id) ? '#0A1628' : '#C8D5E8', fontWeight: mustHaveCircuits.includes(c.id) ? 700 : 400, cursor: 'pointer', fontSize: 13 }}>{c.label}</button>
              ))}
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>Get My Backup Power Recommendation</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #F5E642' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>{result.system}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div><div style={{ color: '#8A9BBE', fontSize: 12 }}>Installed Cost</div><div style={{ color: '#E8EDF5', fontWeight: 700 }}>{result.cost}</div></div>
                <div><div style={{ color: '#8A9BBE', fontSize: 12 }}>Fuel</div><div style={{ color: '#E8EDF5', fontWeight: 700, fontSize: 13 }}>{result.fuel}</div></div>
              </div>
              <div style={{ marginBottom: 12, padding: 10, background: '#111E35', borderRadius: 8 }}>
                <div style={{ color: '#8A9BBE', fontSize: 12, marginBottom: 2 }}>Runtime</div>
                <div style={{ color: '#C8D5E8', fontSize: 13 }}>{result.runtime}</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <div style={{ color: '#4ADE80', fontWeight: 600, marginBottom: 6, fontSize: 13 }}>Pros</div>
                  {result.pros.map((p, i) => <div key={i} style={{ color: '#C8D5E8', fontSize: 13, marginBottom: 4 }}>+ {p}</div>)}
                </div>
                <div>
                  <div style={{ color: '#F87171', fontWeight: 600, marginBottom: 6, fontSize: 13 }}>Cons</div>
                  {result.cons.map((c, i) => <div key={i} style={{ color: '#C8D5E8', fontSize: 13, marginBottom: 4 }}>- {c}</div>)}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#111E35', borderRadius: 16, padding: 28, border: '1px solid #1E3A5F' }}>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Get Generator Quotes in DFW</div>
          <p style={{ color: '#8A9BBE', marginBottom: 16 }}>ProLnk connects you with Generac and Kohler certified installers across DFW - get 3 quotes in 24 hours.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Get Free Generator Quotes</button>
        </div>
      </div>
    </div>
  );
}
