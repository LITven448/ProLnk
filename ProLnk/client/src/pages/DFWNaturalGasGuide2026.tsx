import { useState } from 'react';

const appliances = [
  { id: 'furnace', label: '🔥 Gas Furnace (central heat)', therms: 60 },
  { id: 'wh', label: '🚿 Gas Water Heater', therms: 25 },
  { id: 'range', label: '🍳 Gas Range / Oven', therms: 5 },
  { id: 'dryer', label: '🌀 Gas Dryer', therms: 8 },
  { id: 'fireplace', label: '🪵 Gas Fireplace', therms: 15 },
  { id: 'pool', label: '🏊 Gas Pool Heater', therms: 30 },
];

const safetyTips = [
  { icon: '🚨', tip: 'Install CO detectors on every floor — gas leaks produce carbon monoxide.' },
  { icon: '📞', tip: 'Smell gas? Leave immediately, call Atmos Energy: 800-460-3030.' },
  { icon: '🔧', tip: 'Annual furnace inspection prevents dangerous heat exchanger cracks.' },
  { icon: '📍', tip: 'Know your gas shutoff valve location before an emergency.' },
];

export default function DFWNaturalGasGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (id: string) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const totalTherms = selected.reduce((sum, id) => sum + (appliances.find(a => a.id === id)?.therms || 0), 0);
  const monthlyCost = (totalTherms * 0.85).toFixed(2);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔥</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Natural Gas Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Atmos Energy serves most of DFW — average rate $0.85/therm</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '🏢', label: 'Primary Provider', value: 'Atmos Energy' },
            { icon: '💰', label: 'Average Rate', value: '$0.85/therm' },
            { icon: '📞', label: 'Emergency Line', value: '800-460-3030' },
            { icon: '🌡️', label: 'Gas vs Electric Heat', value: '~40% cheaper' },
          ].map(s => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 12, padding: 16, border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginTop: 2 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 4 }}>💰 Monthly Gas Cost Estimator</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 16 }}>Select your gas appliances:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {appliances.map(a => (
              <label key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', background: '#0A1628', borderRadius: 8, padding: '10px 12px', border: selected.includes(a.id) ? '1px solid #F5E642' : '1px solid #1e3a5f' }}>
                <input type="checkbox" checked={selected.includes(a.id)} onChange={() => toggle(a.id)}
                  style={{ width: 16, height: 16, accentColor: '#F5E642' }} />
                <span style={{ color: '#cbd5e1', fontSize: 14, flex: 1 }}>{a.label}</span>
                <span style={{ color: '#94a3b8', fontSize: 12 }}>~{a.therms} therms/mo</span>
              </label>
            ))}
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center', borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Estimated Monthly Gas Bill</div>
            <div style={{ color: '#F5E642', fontSize: 42, fontWeight: 900 }}>${monthlyCost}</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>{totalTherms} therms × $0.85/therm (avg Atmos rate)</div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🛡️ Pipeline Safety Around Your Home</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {safetyTips.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20 }}>{s.icon}</span>
                <span style={{ color: '#94a3b8', fontSize: 14 }}>{s.tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}