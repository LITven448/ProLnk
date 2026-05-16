import { useState } from 'react';

const situations = [
  { label: 'Air handler in attic (standard)', needsPump: false, note: 'Gravity drain to roof or soffit — no pump needed.' },
  { label: 'Air handler in finished garage below drain line', needsPump: true, note: 'Pump required — handler sits below nearest drain.' },
  { label: 'Air handler in closet with no nearby drain', needsPump: true, note: 'Pump routes condensate to exterior or utility sink.' },
  { label: 'Air handler in crawl space', needsPump: true, note: 'Pump required — gravity drain not feasible.' },
];

const sizes = [
  { capacity: 'Up to 3-ton system', pump: '1/30 HP mini pump (Diversitech CP-22N or similar)' },
  { capacity: '3–5 ton system', pump: '1/25 HP standard pump — handle DFW peak condensate load' },
  { capacity: '5-ton+ commercial or dual systems', pump: 'Dual-port or 1/12 HP heavy-duty pump' },
];

export default function DFWHVACPumpsGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  const result = selected !== null ? situations[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>Condensate Pump Guide — DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28 }}>
          DFW summers push AC systems to remove 2–5 gallons of moisture per hour. When gravity drainage isn't possible, condensate pumps move that water safely away. Here's what DFW homeowners need to know.
        </p>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>💧 Why DFW Creates So Much Condensate</div>
          <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            DFW's summer dew points regularly hit 65–72°F. Your evaporator coil runs at ~40°F, causing massive moisture extraction. A 4-ton system can produce 3–4 gallons per hour on a July afternoon. Condensate pumps must handle this continuous load without overheating or clogging.
          </p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🔧 Pump Sizing by System</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sizes.map((s, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{s.capacity}</div>
                <div style={{ color: '#94A3B8', fontSize: 13 }}>{s.pump}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>🗓️ Annual Maintenance (DFW Schedule)</div>
          <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.8 }}>
            <div>✅ <strong>March:</strong> Flush reservoir with diluted white vinegar (prevents algae before season)</div>
            <div>✅ <strong>June:</strong> Check float switch triggers shutoff properly</div>
            <div>✅ <strong>August:</strong> Acid flush if slow drainage detected (Nu-Calgon tablets)</div>
            <div>✅ <strong>November:</strong> Inspect tubing for cracks after summer heat cycling</div>
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🔍 Do I Need a Condensate Pump? (DFW Checker)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {situations.map((s, i) => (
              <button key={i} onClick={() => setSelected(i)}
                style={{ background: selected === i ? '#F5E642' : '#0A1628', color: selected === i ? '#0A1628' : '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontSize: 14, fontWeight: selected === i ? 700 : 400 }}>
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: result.needsPump ? '#1A2F1A' : '#1A1A2F', borderRadius: 8, padding: 16, borderLeft: `4px solid ${result.needsPump ? '#22C55E' : '#F5E642'}` }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{result.needsPump ? '✅ Condensate Pump Required' : '⚡ No Pump Needed'}</div>
              <div style={{ color: '#CBD5E1', fontSize: 14 }}>{result.note}</div>
              {result.needsPump && <div style={{ color: '#F5E642', fontSize: 13, marginTop: 8 }}>Typical DFW install cost: $150–$300 including pump + labor</div>}
            </div>
          )}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⚠️ Signs Your DFW Pump Is Failing</div>
          <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.8 }}>
            <div>• Water pooling near air handler or furnace</div>
            <div>• AC shuts off unexpectedly (float switch triggered)</div>
            <div>• Gurgling or grinding noise from pump reservoir</div>
            <div>• Musty smell from standing water in pan</div>
          </div>
        </div>
      </div>
    </div>
  );
}
