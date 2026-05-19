import { useState } from 'react';

const wireData = [
  { gauge: '14 AWG', amps: '15A', breaker: '15A breaker', uses: 'Lighting, outlets, bedroom circuits', dfwNote: 'Most common in DFW tract homes built 1980s–2000s' },
  { gauge: '12 AWG', amps: '20A', breaker: '20A breaker', uses: 'Kitchen outlets, bathroom GFCI, garage circuits', dfwNote: 'Required for DFW kitchen countertop receptacles per NEC' },
  { gauge: '10 AWG', amps: '30A', breaker: '30A breaker', uses: 'Dryers, water heaters, A/C disconnect feeds', dfwNote: 'A/C systems in DFW often require 10 AWG due to high start loads' },
  { gauge: '8 AWG', amps: '40A', breaker: '40A breaker', uses: 'Electric ranges, large A/C units, subpanels', dfwNote: 'DFW 5-ton+ A/C units may require 8 AWG — verify nameplate' },
  { gauge: '6 AWG', amps: '50A', breaker: '50A breaker', uses: 'EV chargers (Level 2), electric dryer/range combos, hot tubs', dfwNote: 'EV charger installs surging in DFW — most require 6 AWG + 50A circuit' },
];

const applianceOptions = [
  { label: 'Bedroom lighting / outlets', gauge: '14 AWG', reason: 'Standard 15A circuit handles typical bedroom loads safely.' },
  { label: 'Kitchen countertop outlet', gauge: '12 AWG', reason: 'NEC requires 20A small appliance circuits; 12 AWG mandatory.' },
  { label: 'Bathroom GFCI outlet', gauge: '12 AWG', reason: '20A circuit required; DFW inspectors flag 14 AWG in bathrooms.' },
  { label: 'Central A/C disconnect', gauge: '10 AWG', reason: 'DFW A/C units draw high start-up current — 10 AWG protects the run.' },
  { label: 'Electric clothes dryer', gauge: '10 AWG', reason: '30A dedicated circuit; standard for DFW homes.' },
  { label: 'Electric range / oven', gauge: '8 AWG', reason: '40–50A circuit required; 8 AWG for most residential ranges.' },
  { label: 'Level 2 EV charger', gauge: '6 AWG', reason: '50A circuit; 6 AWG handles the continuous 48A draw safely in DFW heat.' },
  { label: 'Hot tub / spa', gauge: '6 AWG', reason: 'DFW backyard hot tubs require 50A GFCI-protected circuit with 6 AWG.' },
];

export default function DFWElectricalWireGuide() {
  const [selectedAppliance, setSelectedAppliance] = useState('');
  const result = applianceOptions.find(a => a.label === selectedAppliance);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642′ }}>⚡ DFW ELECTRICAL GUIDE</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', color: '#FFFFFF' }}>Wire Gauge Guide for DFW Homeowners</h1>
        <p style={{ color: '#9BA3B5', fontSize: '15px', marginBottom: '32px', lineHeight: '1.6′ }}>
          Choosing the wrong wire gauge is a fire hazard. DFW homes run high electrical loads — especially A/C — so proper sizing is critical. Here's what every gauge handles.
        </p>

        <div style={{ marginBottom: '32px' }}>
          {wireData.map((w) => (
            <div key={w.gauge} style={{ background: '#111D33', borderRadius: '10px', padding: '18px 20px', marginBottom: '12px', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: '700', color: '#F5E642′ }}>{w.gauge}</span>
                <span style={{ background: '#1E2D47', padding: '2px 10px', borderRadius: '20px', fontSize: '13px', color: '#A8B4C8′ }}>{w.amps} max</span>
                <span style={{ fontSize: '13px', color: '#6B7A94′ }}>{w.breaker}</span>
              </div>
              <div style={{ fontSize: '14px', color: '#C8D0DC', marginBottom: '6px' }}>✅ {w.uses}</div>
              <div style={{ fontSize: '13px', color: '#F5E642', opacity: 0.85 }}>🌡️ DFW Note: {w.dfwNote}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D33', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#FFFFFF' }}>🔌 What gauge do I need?</h2>
          <select
            value={selectedAppliance}
            onChange={e => setSelectedAppliance(e.target.value)}
            style={{ width: '100%', background: '#1E2D47', border: '1px solid #2A3F5F', borderRadius: '8px', padding: '12px', color: '#E8EAF0', fontSize: '15px', marginBottom: '16px' }}
          >
            <option value="">Select your DFW application...</option>
            {applianceOptions.map(a => <option key={a.label}>{a.label}</option>)}
          </select>
          {result && (
            <div style={{ background: '#0D1F35', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '22px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>Use {result.gauge}</div>
              <div style={{ fontSize: '14px', color: '#C8D0DC', lineHeight: '1.6′ }}>📋 {result.reason}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1A1200', border: '1px solid #F5E642', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontWeight: '600', color: '#F5E642', marginBottom: '6px' }}>⚠️ DFW Safety Reminder</div>
          <div style={{ fontSize: '13px', color: '#C8D0DC', lineHeight: '1.6′ }}>
            Never upsize a breaker to match a smaller wire. The wire is the safety limit. In DFW, electrical permits are required for new circuits — always pull a permit to protect your home sale value.
          </div>
        </div>
      </div>
    </div>
  );
}
