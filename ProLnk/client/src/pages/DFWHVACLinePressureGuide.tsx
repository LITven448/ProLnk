import { useState } from 'react';

const pressureScenarios = [
  { ambient: '75°F (spring/fall)', suction: '110–125 PSI', discharge: '280–320 PSI', status: 'normal', note: 'Normal DFW off-season pressures. System running efficiently.' },
  { ambient: '95°F (summer baseline)', suction: '130–145 PSI', discharge: '360–400 PSI', status: 'normal', note: 'Expected DFW summer pressures. Monitor subcooling/superheat.' },
  { ambient: '105°F (DFW peak)', suction: '140–155 PSI', discharge: '400–450 PSI', status: 'high-normal', note: 'High but expected for DFW 105°F days. Verify condenser coil is clean.' },
  { ambient: '105°F — discharge >480 PSI', suction: '140–160 PSI', discharge: '>480 PSI', status: 'abnormal', note: 'High discharge: dirty condenser coil, overcharge, or failed condenser fan motor.' },
  { ambient: 'Any temp — suction <80 PSI', suction: '<80 PSI', discharge: 'any', status: 'abnormal', note: 'Low suction: undercharge (leak), restricted filter, or failing TXV.' },
];

const statusColor: Record<string, string> = { normal: '#22C55E', 'high-normal': '#F59E0B', abnormal: '#EF4444' };
const statusLabel: Record<string, string> = { normal: '✅ Normal', 'high-normal': '⚠️ Monitor', abnormal: '🚨 Abnormal' };

export default function DFWHVACLinePressureGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const result = selected !== null ? pressureScenarios[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>Refrigerant Line Pressure Guide — DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28 }}>
          R-410A pressures in a DFW system are significantly higher than the national baseline due to extreme ambient temperatures. Knowing what's normal helps you spot problems — and avoid unnecessary refrigerant charges.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div style={{ background: '#111D35', borderRadius: 12, padding: 20 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📉 Suction (Low-Side)</div>
            <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7 }}>
              <div>Normal DFW summer: <strong>130–155 PSI</strong></div>
              <div>Correlates to ~40°F evap temp</div>
              <div>Low = undercharge or restriction</div>
              <div>High = overcharge or poor airflow</div>
            </div>
          </div>
          <div style={{ background: '#111D35', borderRadius: 12, padding: 20 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📈 Discharge (High-Side)</div>
            <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.7 }}>
              <div>Normal DFW summer: <strong>360–450 PSI</strong></div>
              <div>Rises ~2 PSI per °F ambient</div>
              <div>High = dirty coil or overcharge</div>
              <div>Low = undercharge or bad compressor</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>🌡️ DFW Ambient Effect on Discharge Pressure</div>
          <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            For every 1°F increase in ambient temperature, discharge pressure rises approximately 2–3 PSI (R-410A). DFW regularly sees 105–110°F in July — this pushes discharge pressure 20–30 PSI higher than a system designed for a 95°F baseline. A "high pressure fault" at 450 PSI on a 108°F DFW day may be completely normal; the same reading at 85°F indicates a real problem.
          </p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🔍 Pressure Reading Interpreter — DFW</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {pressureScenarios.map((s, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{ background: selected === i ? '#F5E642' : '#0A1628', color: selected === i ? '#0A1628' : '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontSize: 14, fontWeight: selected === i ? 700 : 400 }}>
                {s.ambient}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#1A2030', borderRadius: 8, padding: 16, borderLeft: `4px solid ${statusColor[result.status]}` }}>
              <div style={{ fontWeight: 700, marginBottom: 6, color: statusColor[result.status] }}>{statusLabel[result.status]}</div>
              <div style={{ fontSize: 14, marginBottom: 6 }}>Suction: <strong>{result.suction}</strong> | Discharge: <strong>{result.discharge}</strong></div>
              <div style={{ color: '#CBD5E1', fontSize: 14 }}>{result.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⚠️ When High Pressure Is Not the Refrigerant</div>
          <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.8 }}>
            <div>• Condenser coil clogged with DFW cottonwood/pollen (hose out annually)</div>
            <div>• Condenser fan motor failing — reduced airflow over coil</div>
            <div>• System overcharged during previous service (common DFW issue)</div>
            <div>• Non-condensable gases (air/nitrogen) in refrigerant circuit</div>
          </div>
        </div>
      </div>
    </div>
  );
}
