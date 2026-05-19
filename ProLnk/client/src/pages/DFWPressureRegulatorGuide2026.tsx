import { useState } from 'react';

const symptoms = ['Low Pressure', 'High Pressure', 'Pressure Swings', 'No Issues'];
const assessments: Record<string, string> = {
  'Low Pressure': '🔴 PRV may be set too low or clogged with scale. DFW hard water clogs PRV diaphragms. Call a plumber to test and adjust (50–80 PSI target after PRV).',
  'High Pressure': '🔴 PRV may have failed open. High pressure (>80 PSI) destroys water heaters, ice makers, and dishwashers. Replace PRV immediately — $250–400.',
  'Pressure Swings': '⚠️ PRV diaphragm is worn. Inconsistent pressure is often pre-failure. Schedule inspection within 30 days.',
  'No Issues': '✅ Still check PRV age. If home is 7+ years old and PRV was never replaced, proactive replacement prevents sudden failure.',
};

export default function DFWPressureRegulatorGuide2026() {
  const [symptom, setSymptom] = useState<string>('No Issues');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.25rem' }}>🔧 DFW Water Pressure Regulator Guide 2026</div>
        <div style={{ color: '#8899AA', marginBottom: '2rem' }}>The most overlooked component in DFW plumbing.</div>

        <div style={{ background: '#111E35', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>⚙️ What Is a PRV and Why DFW Homes Have Them</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { icon: '📍', title: 'Location', desc: 'Near main water shutoff, typically in garage or utility closet. Bell-shaped brass fitting on incoming water line.' },
              { icon: '📏', title: 'What It Does', desc: 'Reduces city street pressure (100–150 PSI) down to safe home pressure (50–80 PSI). Required in most DFW municipalities.' },
              { icon: '⏱️', title: 'Lifespan: 7–12 Years', desc: 'DFW hard water accelerates wear on the diaphragm. Most homeowners never replace it until failure.' },
              { icon: '💸', title: 'Replacement Cost: $250–400', desc: 'Includes labor. Parts alone $40–80. Worth doing proactively — appliance damage from high pressure costs thousands.' },
              { icon: '🧪', title: 'Test It Yourself', desc: '$15 pressure gauge at Lowes. Attach to hose bib. Normal: 50–80 PSI. Above 80 = PRV failing.' },
            ].map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div><div style={{ fontWeight: 600 }}>{item.title}</div><div style={{ color: '#8899AA', fontSize: '0.9rem' }}>{item.desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🔍 Pressure Symptoms → PRV Assessment</div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#8899AA', fontSize: '0.85rem', marginBottom: '0.4rem' }}>What Are You Experiencing?</div>
            <select value={symptom} onChange={(e) => setSymptom(e.target.value)} style={{ background: '#0A1628', border: '1px solid #2A3A55', borderRadius: '8px', padding: '0.5rem 1rem', color: '#E8EDF5′ }}>
              {symptoms.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid #F5E642', color: '#E8EDF5′ }}>{assessments[symptom]}</div>
        </div>
      </div>
    </div>
  );
}
