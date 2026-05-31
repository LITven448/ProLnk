import { useState } from 'react';

export default function DFWHVACBurnerGuide2026() {
  const [behavior, setBehavior] = useState('short_cycle');

  const guide = {
    short_cycle: { label: 'Furnace cycles on/off quickly', cause: 'Overheating or limit switch tripping', urgency: 'High', urgencyColor: '#ef4444', action: 'Check air filter, inspect heat exchanger for cracks' },
    no_ignite: { label: `Burner won''t ignite`, cause: 'Failed hot surface ignitor or gas valve issue', urgency: 'High', urgencyColor: '#ef4444', action: 'Check ignitor glow, verify gas supply valve open' },
    delayed_ignite: { label: 'Delayed ignition (booming sound)', cause: 'Gas building up before lighting — dirty burner ports', urgency: 'Critical', urgencyColor: '#dc2626', action: 'Shut off furnace, call tech immediately — safety risk' },
    intermittent: { label: 'Furnace runs intermittently', cause: 'Normal DFW operation — DFW winters are mild', urgency: 'Normal', urgencyColor: '#22c55e', action: 'DFW furnaces run far less than AC — this is expected' },
    blower_only: { label: 'Blower runs, no heat', cause: 'Burner not firing — check inducer, pressure switch', urgency: 'Moderate', urgencyColor: '#f59e0b', action: 'Inspect condensate drain and pressure switch hose' },
  };

  const sel = guide[behavior as keyof typeof guide];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', marginBottom: '0.5rem' }}>DFW Gas Furnace Burner Guide 2026</h1>
          <p style={{ color: '#94a3b8' }}>Diagnose your furnace behavior - DFW-specific guidance</p>
        </div>

        <div style={{ backgroundColor: '#0d2137', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>What is your furnace doing?</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {Object.entries(guide).map(([k, v]) => (
              <button key={k} onClick={() => setBehavior(k)}
                style={{ padding: '0.75rem 1rem', borderRadius: '8px', textAlign: 'left',
                  border: behavior === k ? '2px solid #F5E642' : '2px solid #1e3a5f',
                  backgroundColor: behavior === k ? '#1e3a5f' : '#0A1628',
                  color: behavior === k ? '#F5E642' : '#94a3b8', cursor: 'pointer' }}>{v.label}</button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0d2137', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div><span style={{ color: '#94a3b8' }}>Likely Cause</span><div style={{ color: '#fff' }}>{sel.cause}</div></div>
            <div><span style={{ color: '#94a3b8' }}>Urgency</span><div style={{ color: sel.urgencyColor, fontWeight: 'bold' }}>{sel.urgency}</div></div>
          </div>
          <div style={{ backgroundColor: '#0A1628', padding: '0.75rem', borderRadius: '8px', color: '#22c55e' }}>🔧 {sel.action}</div>
        </div>

        <div style={{ backgroundColor: '#0d2137', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔥 How DFW Gas Furnaces Work</h3>
          <ul style={{ color: '#94a3b8', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
            <li>Inshot burners fire gas horizontally into the heat exchanger - most DFW models</li>
            <li>Hot surface ignitor glows orange, then gas valve opens to light burners</li>
            <li>Heat transfers through primary + secondary heat exchangers to air stream</li>
            <li>Induced draft blower pulls combustion gases out before supply blower starts</li>
            <li>DFW furnaces run far less than AC - intermittent cycling in winter is normal</li>
            <li>Single-speed blowers blast at 100% vs. multi-speed ramping gradually</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
