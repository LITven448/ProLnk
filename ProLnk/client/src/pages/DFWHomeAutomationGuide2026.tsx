import { useState } from 'react';

const goals = [
  { label: 'Energy savings', icon: '⚡', protocol: 'Matter', hub: 'Hub-free (Matter native)', starter: 'Smart thermostat (Ecobee/Nest)', note: 'Matter enables direct cloud savings with no hub dependency' },
  { label: 'Whole-home integration', icon: '🏠', protocol: 'Z-Wave', hub: 'SmartThings or Hubitat', starter: 'Z-Wave hub + smart locks', note: 'Z-Wave excels in larger DFW properties — 2,500+ sq ft mesh range' },
  { label: 'Lighting ambiance', icon: '💡', protocol: 'Zigbee', hub: 'Hue Bridge or IKEA hub', starter: 'Smart bulbs + dimmer switches', note: 'Zigbee best for dense lighting networks with low latency' },
  { label: 'Security & access', icon: '🔐', protocol: 'Z-Wave', hub: 'Ring Alarm or SmartThings', starter: 'Smart locks + video doorbell', note: 'Z-Wave locks lead in DFW for reliability on 900MHz band' },
  { label: 'HVAC control', icon: '🌡️', protocol: 'Matter', hub: 'Hub-free', starter: 'Matter thermostat + smart vents', note: 'Matter works natively with Google/Apple/Amazon for HVAC control' },
];

export default function DFWHomeAutomationGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const rec = selected !== null ? goals[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🤖</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW Home Automation Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Z-Wave vs Zigbee vs Matter — what DFW homeowners need to know</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 28 }}>
          {[
            { name: 'Z-Wave', icon: '📡', freq: '908 MHz', range: '100 ft mesh', best: 'Locks, sensors' },
            { name: 'Zigbee', icon: '🔵', freq: '2.4 GHz', range: '30–65 ft mesh', best: 'Lights, outlets' },
            { name: 'Matter', icon: '✨', freq: 'Wi-Fi/Thread', range: 'Cloud + LAN', best: 'Cross-brand unification' },
          ].map(p => (
            <div key={p.name} style={{ background: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{p.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>{p.freq}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>{p.range}</div>
              <div style={{ fontSize: 12, color: '#cbd5e1', marginTop: 6 }}>Best for: {p.best}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🎯 What's your automation goal?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {goals.map((g, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#e2e8f0', border: 'none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {g.icon} {g.label}
              </button>
            ))}
          </div>
          {rec && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Recommended: {rec.protocol}</div>
              <div style={{ fontSize: 13, color: '#cbd5e1', marginBottom: 4 }}>Hub: {rec.hub}</div>
              <div style={{ fontSize: 13, color: '#cbd5e1', marginBottom: 4 }}>Start with: {rec.starter}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>💡 {rec.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 10 }}>🏡 DFW-Specific Considerations</h2>
          <ul style={{ paddingLeft: 18, margin: 0, color: '#cbd5e1', fontSize: 14, lineHeight: 1.8 }}>
            <li>Larger DFW homes (3,000+ sq ft) need mesh protocols — Z-Wave or Zigbee over plain Wi-Fi</li>
            <li>ERCOT grid volatility makes battery-backup hubs (Hubitat) worth the investment</li>
            <li>Matter adoption is accelerating — Tier 1 DFW builders now installing Matter wiring</li>
            <li>Hub-free Matter works for smaller homes; Z-Wave hub recommended for 4+ bed properties</li>
          </ul>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 20, marginBottom: 6 }}>🔗</div>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>ProLnk connects you with certified smart home installers in DFW</div>
          <div style={{ color: '#1a2f4a', fontSize: 13, marginTop: 4 }}>Get matched with a local automation pro — no cold calls, vetted & insured</div>
        </div>
      </div>
    </div>
  );
}
