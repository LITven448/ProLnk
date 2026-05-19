import { useState } from 'react';

const wireGauges = [
  { awg: '14 AWG', amps: '15A', emoji: '💡', color: '#94a3b8', uses: ['Bedroom lighting', 'Living room outlets', 'Bathroom lights', 'Hallways'], note: 'White-sheathed Romex. Most common in DFW bedrooms and light circuits. Cannot use on 20A breaker.' },
  { awg: '12 AWG', amps: '20A', emoji: '🍳', color: '#fbbf24', uses: ['Kitchen outlets', 'Bathroom outlets', 'Garage outlets', 'Dishwasher'], note: 'Yellow-sheathed Romex. Required for all kitchen counter and bathroom outlets in DFW per NEC 210.11.' },
  { awg: '10 AWG', amps: '30A', emoji: '🌊', color: '#f97316', uses: ['Electric dryer', 'Water heater', 'Mini-split HVAC', 'Hot tub (small)'], note: 'Orange-sheathed Romex. Typical for 30A 240V appliance circuits in DFW homes.' },
  { awg: '8 AWG', amps: '40A', emoji: '🔥', color: '#ef4444', uses: ['Small range', 'Subpanel feeder', 'Large HVAC unit', 'Workshop subpanel'], note: 'Black-sheathed Romex or THHN in conduit. Required for 40A circuits — less common in DFW homes.' },
  { awg: '6 AWG', amps: '50A', emoji: '⚡', color: '#F5E642', uses: ['Electric range/oven', 'EV charger (Level 2)', 'Hot tub', 'Large A/C unit'], note: 'Must use THHN in conduit or 6/3 cable. Most EV charger installs in DFW require 6 AWG to a 50A breaker.' },
];

const applianceGuide: Record<string, { wire: string; breaker: string; note: string }> = {
  'ev': { wire: '6 AWG', breaker: '50A 240V', note: 'Tesla, Rivian, and most EV chargers use 6 AWG / 50A. NEMA 14-50 outlet or hardwired EVSE.' },
  'dryer': { wire: '10 AWG', breaker: '30A 240V', note: 'Electric dryers use 30A. Gas dryers only need 15A 120V for the motor/igniter.' },
  'range': { wire: '6 AWG', breaker: '50A 240V', note: 'Electric ranges in DFW homes require 50A / 6 AWG. Use 6/3 NM-B or THHN in conduit.' },
  'waterheat': { wire: '10 AWG', breaker: '30A 240V', note: 'Standard 40-50 gallon electric water heaters. Heat pump water heaters also use 30A.' },
  'microwave': { wire: '12 AWG', breaker: '20A 120V', note: 'Dedicated 20A circuit required for built-in microwaves per NEC. Over-range microwaves share circuit.' },
  'dishwasher': { wire: '12 AWG', breaker: '20A 120V', note: 'Dedicated 20A circuit required for dishwashers in DFW per NEC 210.11.' },
  'hvac': { wire: '8–4 AWG', breaker: '40–60A 240V', note: 'DFW HVAC units vary widely. Check equipment nameplate for MCA and MOCP — wire accordingly.' },
};

export default function DFWElectricalWireGuide2026() {
  const [appliance, setAppliance] = useState<string>('\);
  const [activeGauge, setActiveGauge] = useState<string>('\);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔌</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Electrical Wire Sizing Guide 2026</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Right wire gauge for every circuit in your DFW home</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🔍 Appliance → Wire Size Lookup</h2>
          <select
            value={appliance}
            onChange={e => setAppliance(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}
          >
            <option value="">Select your appliance...</option>
            <option value="ev">EV Charger (Level 2)</option>
            <option value="dryer">Electric Dryer</option>
            <option value="range">Electric Range / Oven</option>
            <option value="waterheat">Water Heater (Electric)</option>
            <option value="microwave">Built-in Microwave</option>
            <option value="dishwasher">Dishwasher</option>
            <option value="hvac">Central A/C or Heat Pump</option>
          </select>
          {appliance && applianceGuide[appliance] && (
            <div style={{ marginTop: 14, padding: 14, background: '#0f172a', borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>
              <div style={{ display: 'flex', gap: 24, marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>Wire: {applianceGuide[appliance].wire}</span>
                <span style={{ color: '#60a5fa', fontWeight: 700 }}>Breaker: {applianceGuide[appliance].breaker}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>{applianceGuide[appliance].note}</p>
            </div>
          )}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 14 }}>Wire Gauge Reference</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {wireGauges.map(g => (
            <div
              key={g.awg}
              onClick={() => setActiveGauge(activeGauge === g.awg ? '' : g.awg)}
              style={{ background: activeGauge === g.awg ? '#1e3a5f' : '#1e293b', borderRadius: 10, padding: 14, cursor: 'pointer', border: `2px solid ${activeGauge === g.awg ? g.color : '#334155'}` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>{g.emoji}</span>
                <span style={{ fontWeight: 700, fontSize: 16, color: g.color }}>{g.awg}</span>
                <span style={{ background: g.color, color: '#0A1628', padding: '2px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{g.amps}</span>
                <span style={{ marginLeft: 'auto', color: '#64748b' }}>{activeGauge === g.awg ? '▲' : '▼'}</span>
              </div>
              {activeGauge === g.awg && (
                <div style={{ marginTop: 10 }}>
                  <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 8px' }}>{g.note}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {g.uses.map(u => <span key={u} style={{ background: '#0A1628', color: '#F5E642', padding: '3px 10px', borderRadius: 20, fontSize: 12 }}>{u}</span>)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 10, padding: 14, borderLeft: '3px solid #ef4444′ }}>
          <p style={{ color: '#fca5a5', fontSize: 13, margin: '0 0 4px', fontWeight: 700 }}>⚠️ Aluminum Wiring Warning</p>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>DFW homes built 1965–1973 may have aluminum branch circuit wiring. This is a fire hazard — look for outlets that feel warm, flickering lights, or a burning smell. Remediation options: COPALUM crimp connectors or AlumiConn lugs at every device. Do not use copper pigtails alone.</p>
        </div>
      </div>
    </div>
  );
}
