import { useState } from 'react';

export default function DFWHVACDuctedHeatPump2026() {
  const [system, setSystem] = useState('');
  const [result, setResult] = useState('');

  const systems = [
    'Old gas furnace + AC',
    'Electric furnace + AC',
    'Window units',
    'No central system',
  ];

  const guide: Record<string, string> = {
    'Old gas furnace + AC': 'Replace both with a 3-4 ton ducted heat pump. Use existing ductwork. Add 10kW backup heat strips for the 10-15 freezing nights DFW gets. Efficiency gain: 30-40% vs gas in DFW mild winters. ROI: 5-7 years.',
    'Electric furnace + AC': 'Direct swap to heat pump is ideal. Your ductwork is already sized correctly. Heat pump will cut heating costs 50-60% since electric resistance heat is expensive. No backup strips needed if rated to 0°F.',
    'Window units': 'Ducted heat pump requires duct installation — budget $4,000-8,000 extra. Consider mini-split heat pumps per zone as alternative. Central ducted is still more efficient at DFW scale with whole-home conditioning.',
    'No central system': 'New construction opportunity. Run 8" ducts, size unit at 1 ton per 500 sq ft for DFW climate. Install variable-speed compressor (inverter) for best efficiency. Total project: $12,000-18,000 installed.',
  };

  function handleCheck() {
    if (!system) return;
    setResult(guide[system] || '');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>❄️🔥</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 4 }}>DFW Central Ducted Heat Pump Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Heat pumps are the smart choice for DFW — one system cools in summer and heats in winter at 2-3x the efficiency of electric resistance heat.</p>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>⚡ How DFW Heat Pumps Work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '☀️', label: 'Summer Mode', desc: 'Runs as AC — moves heat outside' },
              { icon: '🌬️', label: 'Winter Mode', desc: 'Extracts heat from outdoor air' },
              { icon: '🌡️', label: 'Backup Heat', desc: 'Strips activate below 35°F' },
              { icon: '📊', label: 'DFW Efficiency', desc: '300% efficient vs 100% gas' },
            ].map(item => (
              <div key={item.label} style={{ background: '#0d2137', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 20 }}>{item.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{item.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🏠 Current System → Heat Pump Guide</h2>
          <select
            value={system}
            onChange={e => { setSystem(e.target.value); setResult(''); }}
            style={{ width: '100%', padding: '10px 12px', background: '#0d2137', color: '#fff', border: '1px solid #2d4a6b', borderRadius: 8, fontSize: 14, marginBottom: 12 }}
          >
            <option value="">Select your current system...</option>
            {systems.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <button
            onClick={handleCheck}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
          >
            Get Heat Pump Guide
          </button>
          {result && (
            <div style={{ background: '#0d2137', borderRadius: 8, padding: 16, marginTop: 16, color: '#e2e8f0', lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📋 DFW Cold-Climate Tips</h2>
          {[
            'DFW gets below 35°F only 10-15 nights/year — backup heat strips handle this efficiently',
            'Look for HSPF2 rating of 8.1+ for DFW climate zone',
            'Variable-speed (inverter) compressors save 20-30% over single-speed in DFW',
            'Size correctly: oversized units short-cycle and fail to dehumidify in DFW summers',
            'Rebates: Oncor and CoServ offer $200-600 rebates for qualifying heat pumps',
          ].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ color: '#F5E642' }}>✓</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
