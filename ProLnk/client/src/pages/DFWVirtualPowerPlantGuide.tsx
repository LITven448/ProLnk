import { useState } from 'react';

const systemSizes = ['5 kW solar + 13.5 kWh battery', '10 kW solar + 27 kWh battery', '15 kW solar + 40 kWh battery', '20 kW solar + 54 kWh battery'];
const dallasZones = ['Dallas (central)', 'Fort Worth (west)', 'Plano / Frisco (north)', 'Arlington / Mansfield (mid-cities)', 'McKinney / Allen (far north)'];

type VPPResult = { eligible: string; programs: string; annualEarnings: string; peakRate: string; enrollmentTime: string; notes: string };

const vppMap: Record<string, VPPResult> = {
  '5 kW solar + 13.5 kWh battery':  { eligible: 'Yes — minimum threshold met', programs: 'Tesla VPP, Swell Energy, OhmConnect', annualEarnings: '$200–$450/yr', peakRate: '$0.50–$1.20/kWh during ERCOT peaks', enrollmentTime: '2–4 weeks', notes: 'Qualifies for summer demand response events, ~8–15 dispatch events/yr' },
  '10 kW solar + 27 kWh battery':   { eligible: 'Yes — solid mid-tier participant', programs: 'Tesla VPP, Swell, Sunrun GridRewards, OhmConnect', annualEarnings: '$450–$900/yr', peakRate: '$0.75–$1.50/kWh during ERCOT peaks', enrollmentTime: '2–4 weeks', notes: 'Best balance of export capacity and home backup retention' },
  '15 kW solar + 40 kWh battery':   { eligible: 'Yes — high-value participant', programs: 'All major VPPs + direct ERCOT demand response', annualEarnings: '$900–$1,600/yr', peakRate: '$1.00–$2.00/kWh during ERCOT peaks', enrollmentTime: '4–6 weeks + ERCOT registration', notes: 'May qualify for direct ERCOT Demand Response (DR) aggregator programs' },
  '20 kW solar + 54 kWh battery':   { eligible: 'Yes — premium VPP asset', programs: 'Direct ERCOT aggregator, all VPP platforms, custom contracts', annualEarnings: '$1,600–$3,000/yr', peakRate: '$1.50–$3.00/kWh during scarcity events', enrollmentTime: '6–8 weeks + utility approval', notes: 'At this size, you can negotiate direct contracts with ERCOT aggregators' },
};

const programDetails = [
  { name: 'Tesla Virtual Power Plant', pay: '$200–$800/yr', req: 'Powerwall required, TX eligible', howItWorks: 'Tesla dispatches your battery during ERCOT peaks. You set minimum backup reserve.' },
  { name: 'Swell Energy GridRewards', pay: '$300–$1,200/yr', req: 'Any UL-listed battery 7kWh+', howItWorks: 'Aggregates DFW battery fleet. Earns capacity payments + energy arbitrage.' },
  { name: 'OhmConnect', pay: '$150–$600/yr', req: 'Smart meter + any connected device', howItWorks: 'Reduce usage during ERCOT emergencies, earn OhmHours redeemable for cash.' },
  { name: 'Sunrun GridRewards', pay: '$250–$900/yr', req: 'Sunrun-installed battery system', howItWorks: 'Managed export during demand events. Sunrun handles all ERCOT coordination.' },
];

export default function DFWVirtualPowerPlantGuide() {
  const [systemSize, setSystemSize] = useState('');
  const [zone, setZone] = useState('');
  const [showResult, setShowResult] = useState(false);

  const result = systemSize ? vppMap[systemSize] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏘️💸⚡</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Virtual Power Plant Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16 }}>Get Paid to Export Power — How ERCOT Pays DFW Solar+Battery Homeowners</p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚡ What Is a Virtual Power Plant?</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: 16 }}>A Virtual Power Plant (VPP) aggregates thousands of home solar+battery systems across DFW into a single dispatchable resource. During ERCOT demand peaks — usually summer afternoons and winter cold snaps — the VPP operator exports your stored energy to the grid. <strong style={{ color: '#F5E642′ }}>You get paid at premium rates</strong>, the grid stays stable.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['📅', 'ERCOT Peak Events', '8–20 events/year, mostly June–Sept + winter cold snaps'],
              ['💰', 'Peak Energy Prices', 'Up to $9,000/MWh during scarcity — you earn a share'],
              ['🔋', 'Your Control', 'Set minimum reserve so your home is never left without backup'],
              ['📱', 'How to Enroll', 'Sign up with VPP aggregator — takes 2–6 weeks to go live'],
            ].map(([icon, label, desc]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{label}</div>
                <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 4 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 DFW VPP Programs Compared</h2>
          {programDetails.map(p => (
            <div key={p.name} style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                <div style={{ background: '#1E3A5F', padding: '4px 10px', borderRadius: 20, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>{p.pay}</div>
              </div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Requirement: {p.req}</div>
              <div style={{ color: '#E8EDF5', fontSize: 13 }}>{p.howItWorks}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 VPP Eligibility Checker</h2>
          {[{ label: 'Your Solar + Battery System', val: systemSize, opts: systemSizes, setter: setSystemSize },
            { label: 'DFW Location', val: zone, opts: dallasZones, setter: setZone }].map(({ label, val, opts, setter }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ color: '#94A3B8', fontSize: 14, display: 'block', marginBottom: 8 }}>{label}</label>
              <select value={val} onChange={e => { setter(e.target.value); setShowResult(false); }}
                style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
                <option value="">Select...</option>
                {opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <button onClick={() => setShowResult(true)} disabled={!systemSize || !zone}
            style={{ width: '100%', background: systemSize && zone ? '#F5E642′ : '#1E3A5F', color: systemSize && zone ? '#0A1628' : '#4A6FA5', border: ’none', borderRadius: 8, padding: '12px 0', fontSize: 16, fontWeight: 700, cursor: systemSize && zone ? 'pointer' : 'default' }}>
            Check My VPP Eligibility + Earnings →
          </button>
        </div>

        {showResult && result && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>💰 Your DFW VPP Opportunity</h3>
            {[
              ['✅', 'VPP Eligible', result.eligible],
              ['📋', 'Eligible Programs', result.programs],
              ['💰', 'Estimated Annual Earnings', result.annualEarnings],
              ['⚡', 'Your Export Rate', result.peakRate],
              ['📅', 'Enrollment Timeline', result.enrollmentTime],
              ['📍', 'DFW Zone', zone],
              ['💡', 'DFW Notes', result.notes],
            ].map(([icon, label, val]) => (
              <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 14, padding: 14, background: '#0A1628', borderRadius: 8 }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <div><div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{label}</div><div style={{ fontWeight: 600 }}>{val}</div></div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
