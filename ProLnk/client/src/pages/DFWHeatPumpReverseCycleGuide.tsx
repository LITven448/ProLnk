import { useState } from 'react';

const sections = [
  {
    emoji: '🔄',
    title: 'How Heat Pumps Reverse Refrigerant Flow',
    body: 'A heat pump uses a reversing valve to flip refrigerant direction. In cooling mode, refrigerant absorbs indoor heat and rejects it outside. In heating mode, the valve reverses the flow — the outdoor coil absorbs ambient heat from outside air and the indoor coil releases that heat into your home. One system, two seasons.',
  },
  {
    emoji: '🌤️',
    title: 'Why DFW Winters Make Heat Pumps Excellent',
    body: "Dallas-Fort Worth winters are mild by any standard. Average January lows hover 33–38°F, with only a handful of nights dipping below 25°F. Heat pumps extract heat efficiently down to 20°F — and DFW rarely reaches that threshold. This means DFW heat pumps spend almost all winter in efficient heat-pump mode, not expensive auxiliary-heat mode.",
  },
  {
    emoji: '⚡',
    title: 'Auxiliary Heat Activation',
    body: 'When outdoor temperatures fall below the system balance point (typically 30–35°F in DFW), auxiliary electric resistance strips or a gas furnace automatically supplement the heat pump. In DFW this happens rarely — maybe 10–20 days per year — so aux heat adds minimal cost. The key is ensuring aux heat activates correctly and does not run continuously.',
  },
  {
    emoji: '🔍',
    title: 'Signs Your Reversing Valve Has Failed',
    body: '1) System heats in cooling mode or cools in heating mode. 2) System stuck in one mode regardless of thermostat setting. 3) Refrigerant pressures equalizing rapidly on gauge set. 4) Unusual hissing noise from outdoor unit when mode changes. 5) System defaults to aux heat only — never enters heat-pump mode.',
  },
];

type ModeResult = { mode: string; explanation: string; verdict: string; color: string };

function assessMode(tempF: number, symptom: string): ModeResult {
  if (symptom === 'blowing-cold-heat') return { mode: 'Reversing Valve Issue', explanation: 'System may be stuck in cooling mode during a heating call.', verdict: 'Service call needed — reversing valve or thermostat wiring fault.', color: '#EF4444' };
  if (symptom === 'aux-only') {
    if (tempF <= 30) return { mode: 'Aux Heat Normal', explanation: 'Below balance point — aux heat running alone is expected.', verdict: 'Operating correctly for these conditions.', color: '#10B981' };
    return { mode: 'Heat Pump Not Engaging', explanation: 'Above balance point but only aux heat running — possible heat pump fault.', verdict: 'Service call recommended — heat pump should be carrying the load.', color: '#EF4444' };
  }
  if (tempF <= 20) return { mode: 'Aux Heat + Heat Pump', explanation: 'Near heat pump efficiency floor — both systems running together is correct.', verdict: 'Normal for these extreme temps (rare in DFW).', color: '#F59E0B' };
  if (tempF <= 35) return { mode: 'Heat Pump + Possible Aux', explanation: 'Near balance point — aux heat may cycle on briefly.', verdict: 'Normal DFW winter operation.', color: '#3B82F6' };
  return { mode: 'Heat Pump Only', explanation: 'Well above balance point — heat pump should carry all load efficiently.', verdict: 'No aux heat expected. System operating correctly.', color: '#10B981' };
}

export default function DFWHeatPumpReverseCycleGuide() {
  const [temp, setTemp] = useState(42);
  const [symptom, setSymptom] = useState('normal');
  const result = assessMode(temp, symptom);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔄</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Heat Pump Reverse Cycle Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>How heat pumps provide both cooling and heating — and why DFW winters are perfect for them</p>
        </div>
        {sections.map((s) => (
          <div key={s.title} style={{ background: '#0F2140', borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.emoji}</div>
            <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 600, margin: '0 0 8px' }}>{s.title}</h2>
            <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{s.body}</p>
          </div>
        ))}
        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 20px' }}>🌡️ Operating Mode Checker</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Outdoor Temp: {temp}°F</label>
              <input type="range" min={10} max={65} value={temp} onChange={e => setTemp(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>What You Are Observing</label>
              <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: '100%', background: '#1E3A5F', color: '#E2E8F0', border: '1px solid #334155', borderRadius: 8, padding: '8px 12px', fontSize: 14 }}>
                <option value="normal">System heating normally</option>
                <option value="aux-only">Only auxiliary heat running</option>
                <option value="blowing-cold-heat">Blowing cold air in heat mode</option>
              </select>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, borderLeft: `4px solid ${result.color}` }}>
            <div style={{ color: result.color, fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{result.mode}</div>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>{result.explanation}</div>
            <div style={{ color: '#CBD5E1', fontSize: 14 }}>Assessment: {result.verdict}</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 28, background: '#0F2140', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 28 }}>🔗</div>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: '8px 0 12px' }}>Need a DFW heat pump specialist? ProLnk connects you with vetted HVAC pros.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>Find a Heat Pump Pro →</button>
        </div>
      </div>
    </div>
  );
}
