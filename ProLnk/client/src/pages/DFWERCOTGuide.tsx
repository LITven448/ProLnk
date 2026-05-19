import { useState } from 'react';

const backupRecs: Record<string, Record<string, { rec: string; cost: string; savings: string; notes: string[] }>> = {
  small: {
    central: { rec: 'Portable Generator (7,500W) + Smart Thermostat', cost: '$800–$1,200', savings: '$15–$30/mo via demand response', notes: ['7,500W powers AC, fridge, lights, and phone charging', 'Smart thermostat qualifies for Oncor demand response rebate', 'Pre-cool home to 68°F before peak hours (4–9 PM)', 'Sign up for Reliant or TXU Energy Saver rewards'] },
    window: { rec: 'Battery Backup (2kWh) + Demand Response Enrollment', cost: '$600–$900', savings: '$20–$40/mo via demand response', notes: ['Window units use less power — battery backup is feasible', 'Bluetti or EcoFlow 2kWh runs window unit ~4–6 hours', 'Enroll in Griddy-style real-time pricing plan for savings', 'Pre-cool in mornings when grid demand is lowest'] },
    mini: { rec: 'Whole-Home Battery (10kWh) + Solar Ready', cost: '$8,000–$15,000', savings: '$40–$80/mo with solar', notes: ['Mini-split systems are most efficient for battery pairing', 'Powerwall 3 or Enphase IQ Battery ideal for DFW homes', 'ERCOT net metering allows selling excess back to grid', 'Austin Energy / Oncor solar rebates reduce upfront cost'] },
  },
  medium: {
    central: { rec: 'Standby Generator (20kW) + Whole-Home Surge Protector', cost: '$4,000–$8,000 installed', savings: '$25–$50/mo demand response', notes: ['20kW standby auto-starts within 10 seconds of outage', 'Powers entire home including 3-ton HVAC during winter storms', 'Briggs & Stratton or Generac most common in DFW', 'Annual maintenance: $150–$300 per year'] },
    window: { rec: 'Portable Generator (12,000W) + Battery Backup (5kWh)', cost: '$1,500–$3,500', savings: '$20–$35/mo', notes: ['Combo approach: battery for short outages, generator for extended', 'Never run generator inside or in garage — CO poisoning risk', 'Install transfer switch ($500–$800) for safe generator hookup', 'Pre-position fuel (10–20 gallons stabilized gasoline)'] },
    mini: { rec: 'Whole-Home Battery (20kWh) + Solar Array (8kW)', cost: '$20,000–$35,000', savings: '$80–$150/mo with solar', notes: ['20kWh stores full day of energy for medium home', 'Federal 30% solar tax credit applies in 2026', 'DFW averages 229 sunny days — excellent solar ROI', 'Payback period: 7–10 years with battery + solar combined'] },
  },
  large: {
    central: { rec: 'Standby Generator (25kW+) + Smart Panel + Battery', cost: '$8,000–$18,000', savings: '$50–$100/mo', notes: ['25kW+ required for 4,000+ sq ft with 5-ton HVAC', 'Smart panel (Span or Lumin) lets you shed non-critical loads', 'Natural gas generator preferred — fuel stored on-site', 'Critical circuit backup: consider partial-home battery for bridge power'] },
    window: { rec: 'Portable Generator (12,000W) + Multiple Battery Backups', cost: '$2,000–$5,000', savings: '$30–$55/mo', notes: ['Multiple window units = multiple backup requirements', 'Prioritize master bedroom and main living area circuits', 'Invest in whole-home surge protection ($300–$500)', 'ERCOT peak hours 4–9 PM — raise thermostat during this window'] },
    mini: { rec: 'Whole-Home Solar + Battery (30kWh+) + EV Charger', cost: '$35,000–$60,000', savings: '$150–$300/mo with solar + V2H', notes: ['Vehicle-to-home (V2H) tech: use EV as backup power source', 'Ford F-150 Lightning and Rivian R1T support V2H in Texas', 'Large homes benefit most from solar — higher usage = better ROI', 'Combine with demand response for maximum monthly savings'] },
  },
};

export default function DFWERCOTGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [hvacType, setHvacType] = useState('');
  const [result, setResult] = useState<null | { rec: string; cost: string; savings: string; notes: string[] }>(null);

  function calculate() {
    if (homeSize && hvacType) setResult(backupRecs[homeSize]?.[hvacType] ?? null);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>⚡</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW ERCOT Power Grid Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Why your power grid is different — and how to protect your home</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🗺️ Why ERCOT Is Different</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['🏝️ Island Grid', 'ERCOT is isolated from national grids — cannot import power from neighboring states during emergencies'], ['❄️ Winter Vulnerability', 'Feb 2021 Uri caused 246 deaths and $195B in damages — ERCOT reforms underway but vulnerabilities remain'], ['🌡️ Summer Peaks', 'DFW summers push ERCOT to capacity — conservation notices (ERCOT Watch) can occur July–September'], ['💡 Deregulated Market', 'You choose your electricity provider — this means you can enroll in demand response for bill credits']].map(([t, d]) => (
              <div key={t as string} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ fontWeight: 600, marginBottom: 6, color: '#F5E642′ }}>{t}</div>
                <div style={{ fontSize: 14, color: '#94a3b8′ }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>💡 Demand Response Programs in DFW</h2>
          {[['Oncor Smart Thermostat Rebate', '$100 rebate + $1.25/event during summer peaks', '🏠'], ['Reliant Energy Saver', 'Credits for reducing usage 4–9 PM weekdays', '💰'], ['TXU Free Nights & Weekends', 'Free power nights 9 PM–6 AM and all weekend', '🌙'], ['Prepaid Electric Plans', 'Real-time pricing — save by shifting usage off-peak', '📊']].map(([name, detail, icon]) => (
            <div key={name as string} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: '1px solid #0A1628', alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24 }}>{icon}</span>
              <div><div style={{ fontWeight: 600, color: '#e2e8f0′ }}>{name}</div><div style={{ fontSize: 13, color: '#94a3b8', marginTop: 3 }}>{detail}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔧 Backup Power Recommendation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Home Size</label>
            <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', fontSize: 15 }}>
              <option value="">Select size...</option>
              <option value="small">Small (under 1,500 sq ft)</option>
              <option value="medium">Medium (1,500–3,000 sq ft)</option>
              <option value="large">Large (3,000+ sq ft)</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8′ }}>Primary HVAC Type</label>
            <select value={hvacType} onChange={e => setHvacType(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, background: '#0A1628', color: '#e2e8f0', border: '1px solid #334155', fontSize: 15 }}>
              <option value="">Select HVAC type...</option>
              <option value="central">Central Air (ducted)</option>
              <option value="window">Window / Portable Units</option>
              <option value="mini">Mini-Split System</option>
            </select>
          </div>
          <button onClick={calculate} style={{ width: '100%', padding: 14, background: '#F5E642', color: '#0A1628', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get My Recommendation →</button>

          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>⚡ {result.rec}</div>
              <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <span style={{ background: '#1e3a5f', borderRadius: 6, padding: '4px 10px', fontSize: 13, color: '#e2e8f0′ }}>💰 {result.cost}</span>
                <span style={{ background: '#1e3a5f', borderRadius: 6, padding: '4px 10px', fontSize: 13, color: '#22c55e' }}>📉 {result.savings}</span>
              </div>
              {result.notes.map((n, i) => <div key={i} style={{ padding: '6px 0', color: '#cbd5e1', borderBottom: '1px solid #1e3a5f', fontSize: 14 }}>• {n}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📞 ERCOT & Power Resources</h2>
          {[['⚡ ERCOT Grid Status', 'ercot.com/gridmktinfo/dashboards/gridconditions'], ['🏠 Oncor Outage Map', 'outagemap.oncor.com'], ['💡 Power to Choose TX', 'powertochoose.org'], ['🌡️ NWS Fort Worth (Weather)', 'weather.gov/fwd']].map(([label, val]) => (
            <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #0A1628', color: '#cbd5e1', fontSize: 13, flexWrap: 'wrap', gap: 4 }}>
              <span>{label}</span><span style={{ color: '#F5E642', fontWeight: 600 }}>{val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
