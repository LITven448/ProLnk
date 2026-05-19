import { useState } from 'react';

const extremes = [
  {
    type: 'Hottest Recorded Day',
    record: '113°F (June 26, 1980)',
    hvacImpact: 'Units designed for 100°F struggle — compressors overheat, refrigerant pressure spikes, efficiency drops 30-40%.',
    prep: ['Verify compressor amperage draw', 'Check refrigerant charge at peak heat', 'Add UV-resistant insulation to refrigerant lines', 'Install surge protector'],
  },
  {
    type: 'Longest Heat Wave',
    record: '42 consecutive days above 100°F (Summer 1980)',
    hvacImpact: 'Sustained extremes cause cumulative wear — capacitors fail, contactors burn, drain lines clog from continuous condensation.',
    prep: ['Inspect capacitors before June 1', 'Clean drain lines monthly during summer', 'Lubricate all moving parts', 'Schedule mid-summer tune-up'],
  },
  {
    type: 'Coldest Event (Winter Storm Uri)',
    record: '-2°F (February 16, 2021)',
    hvacImpact: 'Heat pumps fail below 25°F — emergency heat strips overloaded, pipes burst inside air handlers, condensate lines freeze.',
    prep: ['Insulate condensate drain lines', 'Verify auxiliary heat capacity', 'Wrap refrigerant lines on north-facing units', 'Test thermostat freeze protection'],
  },
  {
    type: 'Most Power Outages',
    record: '4.5M Texans without power (Uri, 2021)',
    hvacImpact: 'Voltage irregularities on restoration damage compressors — brown-out conditions cause motor winding failure in 15-30 minutes.',
    prep: ['Install whole-home surge protector', 'Add compressor hard-start kit', 'Consider generator transfer switch', 'Delay restart 30 min after power returns'],
  },
];

export default function DFWHVACDFWRecord2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const item = selected !== null ? extremes[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ color: '#fff', fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>DFW Weather Extremes & HVAC Reliability</h1>
        <p style={{ color: '#94a3b8', fontSize: 15, margin: '0 0 32px' }}>
          DFW holds some of the nation's most punishing weather records. Understanding them helps you prepare your HVAC system before extremes strike again.
        </p>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '20px 24px', marginBottom: 28, border: '1px solid #334155′ }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>📊 Why Records Matter for HVAC</div>
          <p style={{ color: '#cbd5e1', margin: 0, fontSize: 14, lineHeight: 1.6 }}>
            HVAC equipment is rated for ASHRAE design conditions — not record extremes. When DFW breaks records, systems run at 130-150% of design load. Knowing historical extremes lets you spec and maintain equipment for worst-case survival.
          </p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Select a weather extreme to see HVAC implications:</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
            {extremes.map((e, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642′ : '#1e293b', color: selected === i ? '#0A1628' : '#cbd5e1', border: '1px solid ' + (selected === i ? '#F5E642' : '#334155'), borderRadius: 8, padding: '12px 14px', cursor: ’pointer', textAlign: 'left', fontSize: 13, fontWeight: 600 }}>
                {e.type}
              </button>
            ))}
          </div>
        </div>

        {item && (
          <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, border: '1px solid #F5E642', marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{item.type}</div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Record: {item.record}</div>
            <div style={{ color: '#fff', fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>🔥 HVAC Impact: {item.hvacImpact}</div>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>✅ Preparation Steps:</div>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {item.prep.map((p, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 6 }}>{p}</li>)}
            </ul>
          </div>
        )}

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, border: '1px solid #334155′ }}>
          <div style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>🛡️ Bottom Line for DFW Homeowners</div>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
            Size and maintain for the extremes, not the averages. A system that fails at 110°F in August or -2°F in February costs far more than preventive preparation. ProLnk connects you with DFW HVAC pros who understand local weather history.
          </p>
        </div>
      </div>
    </div>
  );
}
