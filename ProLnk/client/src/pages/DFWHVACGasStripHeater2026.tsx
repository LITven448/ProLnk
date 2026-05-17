import { useState } from 'react';

export default function DFWHVACGasStripHeater2026() {
  const [systemType, setSystemType] = useState('gas');

  const costs = {
    gas: { monthly: 80, description: 'Gas Furnace', efficiency: '80-98% AFUE', heatup: 'Fast (30-60 sec)', verdict: 'Best for DFW winters' },
    strip: { monthly: 240, description: 'Electric Strip Heat', efficiency: '100% but expensive', heatup: 'Moderate (2-3 min)', verdict: 'Avoid — 3x cost of gas' },
    heatpump: { monthly: 90, description: 'Heat Pump Heating', efficiency: '200-300% COP', heatup: 'Slow (5-10 min)', verdict: 'Efficient above 35°F' },
  };

  const selected = costs[systemType as keyof typeof costs];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔥</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', marginBottom: '0.5rem' }}>DFW Gas vs Electric Strip Heat Guide 2026</h1>
          <p style={{ color: '#94a3b8' }}>Comparing heating sources for DFW homes</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { key: 'gas', icon: '🔥', label: 'Gas Furnace' },
            { key: 'strip', icon: '⚡', label: 'Electric Strip' },
            { key: 'heatpump', icon: '♻️', label: 'Heat Pump' },
          ].map(item => (
            <button key={item.key} onClick={() => setSystemType(item.key)}
              style={{ padding: '1rem', borderRadius: '8px', border: systemType === item.key ? '2px solid #F5E642' : '2px solid #1e3a5f',
                backgroundColor: systemType === item.key ? '#1e3a5f' : '#0d2137', color: '#fff', cursor: 'pointer', fontSize: '1rem' }}>
              <div style={{ fontSize: '1.5rem' }}>{item.icon}</div>
              <div style={{ color: systemType === item.key ? '#F5E642' : '#94a3b8' }}>{item.label}</div>
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: '#0d2137', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>{selected.description}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div><span style={{ color: '#94a3b8' }}>Est. Monthly Cost</span><div style={{ fontSize: '1.8rem', color: '#F5E642' }}>${selected.monthly}</div></div>
            <div><span style={{ color: '#94a3b8' }}>Efficiency</span><div style={{ color: '#fff' }}>{selected.efficiency}</div></div>
            <div><span style={{ color: '#94a3b8' }}>Heat-Up Time</span><div style={{ color: '#fff' }}>{selected.heatup}</div></div>
            <div><span style={{ color: '#94a3b8' }}>DFW Verdict</span><div style={{ color: '#22c55e' }}>{selected.verdict}</div></div>
          </div>
        </div>

        <div style={{ backgroundColor: '#0d2137', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🌡️ DFW Climate Context</h3>
          <ul style={{ color: '#94a3b8', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
            <li>DFW winters rarely drop below 25°F — heat pumps work well most of the season</li>
            <li>Electric strip kicks in below 35°F as backup — very expensive to run</li>
            <li>Gas furnaces provide fast, powerful heat during cold snaps</li>
            <li>2021 freeze showed gas supply vulnerabilities; dual-fuel systems ideal</li>
            <li>Strip heat in a heat pump backup costs ~3x more than gas per BTU</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
