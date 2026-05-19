import { useState } from 'react';

const symptoms = [
  { id: 'hissing', label: '🔊 Constant hissing sound', cause: 'Fill valve failure or calcium buildup', fix: 'Replace fill valve ($8-15 at Home Depot). DFW hard water clogs valve seat — flush with white vinegar first.', parts: 'Fluidmaster 400A fill valve kit', diy: '$12-25', plumber: '$95-150′ },
  { id: 'running', label: '💧 Water runs intermittently', cause: 'Worn flapper (DFW hard water accelerates deterioration)', fix: 'Replace flapper ($4-8). DFW chloramines degrade rubber 2x faster — use Korky 100BP chloramine-resistant flapper.', parts: 'Korky 100BP chloramine-resistant flapper', diy: '$5-10', plumber: '$85-130′ },
  { id: 'ghost', label: '👻 Toilet refills without flushing', cause: 'Slow flapper leak — water loses pressure until fill valve kicks on', fix: 'Add food coloring to tank. If bowl turns colored in 15min — replace flapper immediately.', parts: 'Korky flapper + float adjustment', diy: '$8-15', plumber: '$90-140′ },
  { id: 'overflow', label: '🚽 Water spills into overflow tube', cause: 'Float set too high or fill valve stuck open', fix: 'Adjust float arm downward or replace fill valve. Water should sit 1 inch below overflow tube.', parts: 'Replacement fill valve', diy: '$12-20', plumber: '$95-150′ },
];

export default function DFWToiletRunningGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const symptom = symptoms.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW PLUMBING GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>🚽 Running Toilet Troubleshooting<br /><span style={{ color: '#F5E642′ }}>Dallas-Fort Worth Guide</span></h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, fontSize: 15 }}>Running toilets are the #1 plumbing complaint in DFW — DFW hard water (8-12 grains hardness) destroys rubber flappers and clogs fill valves faster than anywhere in Texas. A running toilet wastes 200+ gallons/day, spiking your DFW water bill by <strong style={{ color: '#F5E642′ }}>$40-90/month</strong>.</p>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 12 }}>💸 DFW WATER COST REALITY</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[['Daily Waste', '200 gal/day', '🚰'], ['Monthly Bill Spike', '+$40-90', '💰'], ['Annual Cost', '$480-1,080', '📅']].map(([label, val, icon]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 20 }}>{icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{val}</div>
                <div style={{ color: '#64748b', fontSize: 11 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#cbd5e1′ }}>SELECT YOUR SYMPTOM</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {symptoms.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id === selected ? null : s.id)}
                style={{ background: selected === s.id ? '#1a3a5c' : '#1e2d47', border: `2px solid ${selected === s.id ? '#F5E642' : '#2d3f5a'}`, borderRadius: 10, padding: '14px 18px', color: '#e2e8f0', fontSize: 14, textAlign: 'left', cursor: 'pointer', fontWeight: selected === s.id ? 600 : 400 }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {symptom && (
          <div style={{ background: '#1e2d47', borderRadius: 12, padding: 24, border: '1px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🔍 Diagnosis: {symptom.cause}</div>
            <p style={{ color: '#cbd5e1', marginBottom: 16 }}>{symptom.fix}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>PARTS NEEDED</div><div style={{ color: '#e2e8f0', fontSize: 13 }}>{symptom.parts}</div></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>DIY COST</div><div style={{ color: '#22c55e', fontWeight: 700 }}>{symptom.diy}</div></div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}><div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>PLUMBER COST</div><div style={{ color: '#f97316', fontWeight: 700 }}>{symptom.plumber}</div></div>
            </div>
          </div>
        )}

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20, marginTop: 24 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>🏠 DFW Hard Water Tip</div>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: 0 }}>DFW water hardness averages 200-350 mg/L. Replace toilet flappers every 2-3 years (vs 5 years in soft-water cities). Use chloramine-resistant Korky brand flappers for DFW water chemistry.</p>
        </div>
      </div>
    </div>
  );
}
