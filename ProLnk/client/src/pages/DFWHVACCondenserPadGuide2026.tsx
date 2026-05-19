import { useState } from 'react';

const padSituations = [
  { id: 'level', label: 'Pad looks level', icon: '✅', advice: 'Great — check annually and after heavy rain. Clay soil can shift even when things look fine. Use a 4-foot level to confirm every spring.' },
  { id: 'tilted', label: 'Pad tilted slightly', icon: '⚠️', advice: 'If tilt is under 1/4 inch over 4 feet, you are within acceptable range. Monitor refrigerant lines for stress and listen for unusual vibration. DFW clay commonly causes minor settling.' },
  { id: 'severe', label: 'Pad tilted severely', icon: '🚨', advice: 'Over 1/4 inch tilt requires correction. Compressor stress, refrigerant pooling, and vibration damage are real risks. Call a DFW HVAC contractor immediately — pad releveling or replacement needed.' },
  { id: 'cracked', label: 'Pad is cracked', icon: '🔧', advice: 'Cracked concrete pads should be evaluated for replacement. Cracks allow moisture intrusion under the unit and can worsen with DFW freeze-thaw cycles. Composite pads are a modern alternative.' },
  { id: 'composite', label: 'Considering composite pad', icon: '💡', advice: 'Composite pads resist DFW clay movement better than poured concrete. They are lighter, do not absorb moisture, and can be releveled more easily. Cost is $150-$300 installed vs $200-$500 for concrete.' },
];

export default function DFWHVACCondenserPadGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = padSituations.find(s => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>ProLnk DFW · HVAC Guides 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW AC Condenser Pad Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          The concrete or composite pad under your outdoor AC unit plays a critical role in system longevity. DFW clay soil shifts unevenly — especially after drought and heavy rain cycles — making pad settling one of the most common causes of compressor stress in North Texas.
        </p>

        <div style={{ background: '#0f2037', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 12 }}>🔍 Key Facts: DFW Condenser Pads</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Maximum acceptable tilt: <strong style={{ color: '#fff' }}>1/4 inch over 4 feet</strong></li>
            <li>DFW Blackland Prairie clay shrinks and swells with moisture — pads shift every season</li>
            <li>Settled pads cause refrigerant oil pooling, compressor vibration, and line stress</li>
            <li>Composite pads outlast poured concrete in expansive clay soil conditions</li>
            <li>Leveling a pad costs $75-$200 vs $3,000+ compressor replacement</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 18, marginBottom: 12 }}>📋 What is your pad situation?</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {padSituations.map(s => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              style={{
                background: selected === s.id ? '#1a3a5c' : '#0f2037',
                border: selected === s.id ? '2px solid #F5E642′ : '2px solid #1e3a5f',
                borderRadius: 8, padding: '12px 16px', color: '#fff',
                textAlign: 'left', cursor: 'pointer', fontSize: 15,
              }}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        {result && (
          <div style={{ background: '#0f2037', border: '1px solid #F5E642', borderRadius: 10, padding: 20, marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>{result.icon} Guidance for Your Situation</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{result.advice}</p>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🏠 Get a DFW HVAC Pro Assessment</div>
          <p style={{ color: '#0A1628', fontSize: 14 }}>ProLnk connects you with vetted DFW HVAC contractors who specialize in North Texas soil conditions and system care.</p>
        </div>
      </div>
    </div>
  );
}
