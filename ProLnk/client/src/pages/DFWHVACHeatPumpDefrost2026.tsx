import { useState } from 'react';

export default function DFWHVACHeatPumpDefrost2026() {
  const [behavior, setBehavior] = useState('');
  const [result, setResult] = useState('');

  const behaviors = [
    'Steam coming from outdoor unit',
    'System blows cool air briefly in winter',
    'Outdoor unit coated in ice',
    'AUX HEAT light on frequently',
    'System runs but no heat produced',
  ];

  const guide: Record<string, string> = {
    'Steam coming from outdoor unit': 'NORMAL — this is the defrost cycle working correctly. Your heat pump reversed briefly to melt ice off the outdoor coil. Steam is water vapor from that melted ice. Defrost cycles last 3-10 minutes and occur every 30-90 minutes during DFW cold snaps. No action needed.',
    'System blows cool air briefly in winter': 'NORMAL — during defrost cycle, the heat pump temporarily acts as AC to defrost the coil. Backup heat strips should engage to compensate but you may feel a brief temperature drop. If cool air lasts more than 15 minutes, call an HVAC tech — backup heat strips may not be working.',
    'Outdoor unit coated in ice': 'POTENTIALLY ABNORMAL. Light frost on outdoor coil is normal in DFW winter. Solid ice block covering the entire unit is not normal — it means the defrost cycle is failing. Causes: low refrigerant, faulty defrost board, bad defrost sensor. Call HVAC tech — do not run system with solid ice block.',
    'AUX HEAT light on frequently': 'MONITOR — in DFW, AUX heat should only run during defrost cycles and when temps drop below 35°F (rare). If it runs constantly above 40°F, your heat pump may have low refrigerant or a refrigerant leak. DFW winters rarely need heavy AUX heat — high usage means something is wrong.',
    'System runs but no heat produced': 'PROBLEM — call an HVAC tech. Possible causes: refrigerant leak (most common in DFW), reversing valve stuck in cooling mode, compressor failure. Do not run system without heat output — you risk damaging the compressor. Average repair: $300-1,200 depending on cause.',
  };

  function handleCheck() {
    if (!behavior) return;
    setResult(guide[behavior] || '');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>❄️💨</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 4 }}>DFW Heat Pump Defrost Cycle Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Heat pumps behave differently in winter — most DFW homeowners mistake normal defrost activity for a problem. Know what is normal vs what needs a technician.</p>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔄 How Defrost Works in DFW</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { step: '1', label: 'Ice forms on outdoor coil', desc: 'Happens when outdoor temp drops below 40°F in DFW (10-20 nights/year)' },
              { step: '2', label: 'Defrost board detects ice', desc: 'Sensor triggers defrost mode automatically' },
              { step: '3', label: 'System reverses briefly', desc: 'Heat pump acts as AC to melt ice — lasts 3-10 min' },
              { step: '4', label: 'Steam rises from unit', desc: 'Melted ice evaporates — totally normal sight' },
              { step: '5', label: 'Normal heating resumes', desc: 'Backup heat strips run during defrost to maintain comfort' },
            ].map(item => (
              <div key={item.step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: '#0d2137', borderRadius: 8, padding: 12 }}>
                <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.step}</div>
                <div>
                  <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 14 }}>{item.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔍 What I See → Normal or Problem?</h2>
          <select
            value={behavior}
            onChange={e => { setBehavior(e.target.value); setResult(''); }}
            style={{ width: '100%', padding: '10px 12px', background: '#0d2137', color: '#fff', border: '1px solid #2d4a6b', borderRadius: 8, fontSize: 14, marginBottom: 12 }}
          >
            <option value="">Select what you are seeing...</option>
            {behaviors.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <button
            onClick={handleCheck}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}
          >
            Diagnose
          </button>
          {result && (
            <div style={{ background: '#0d2137', borderRadius: 8, padding: 16, marginTop: 16, color: '#e2e8f0', lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📋 DFW Defrost Facts</h2>
          {[
            'DFW averages only 10-20 freezing nights/year — defrost cycles are infrequent here',
            'Backup electric heat strips cost 3x more to run than heat pump mode — minimize their use',
            'If AUX heat runs all winter, get a refrigerant check — low charge is common cause',
            'Do not put covers or blankets over outdoor unit — blocks airflow and prevents defrost',
            'Annual HVAC tune-up includes checking defrost board and sensors ($89-150 in DFW)',
          ].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <span style={{ color: '#F5E642′ }}>✓</span>
              <span style={{ color: '#cbd5e1', fontSize: 14 }}>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
