import { useState } from 'react';

export default function DFWHomeStagingGuide2026() {
  const [style, setStyle] = useState('traditional');

  const guides: Record<string, { room: string; tips: string[] }[]> = {
    traditional: [
      { room: 'Living Room', tips: ['Neutral slipcovers over dated furniture', 'Remove family photos', 'Add fresh white throw pillows'] },
      { room: 'Kitchen', tips: ['Clear all counters except 1-2 items', 'Fresh flowers or green plant', 'Replace dated hardware if budget allows'] },
      { room: 'Outdoor/Patio', tips: ['Stage outdoor seating (DFW buyers love it)', 'Add string lights if screened porch', 'Power wash concrete'] },
    ],
    modern: [
      { room: 'Living Room', tips: ['Minimal furniture — remove 30% of pieces', 'Single bold art piece', 'Warm gray or greige palette'] },
      { room: 'Kitchen', tips: ['All appliances stored away', 'Single designer item on counter', 'Matte black hardware staging'] },
      { room: 'Outdoor/Patio', tips: ['Modern outdoor furniture set', 'Potted succulents (drought-friendly for DFW)', 'Clean fire pit staging if present'] },
    ],
    ranch: [
      { room: 'Living Room', tips: ['Open the flow between rooms', 'Warm wood tones, remove clutter', 'Fresh neutral paint if needed'] },
      { room: 'Pool Area', tips: ['Stage pool area — huge in DFW summers', 'Clean furniture + colorful towels', 'Add plants around pool edge'] },
      { room: 'Curb Appeal', tips: ['Texas-appropriate landscaping (drought resistant)', 'Fresh mulch in beds', 'Paint front door a bold color'] },
    ],
    luxury: [
      { room: 'Primary Suite', tips: ['Hotel-style white bedding', 'Clear nightstands completely', 'Fresh orchid or roses'] },
      { room: 'Pool/Outdoor Living', tips: ['Fully staged outdoor kitchen', 'Cabana chairs + side tables', 'Evening lighting for twilight photos'] },
      { room: 'Entry/Foyer', tips: ['Statement art or mirror', 'Fresh flowers on entry table', 'Perfectly clean floors, no rugs'] },
    ],
  };

  const steps = guides[style] ?? [];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>🛋️</div>
          <h1 style={{ fontSize: '1.8rem', color: '#F5E642', margin: '0.5rem 0' }}>DFW Home Staging Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Staged DFW homes sell 73% faster at 6% higher price</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '⚡', label: 'Sell 73% Faster', sub: 'Staged vs. unstaged' },
            { icon: '💵', label: '6% Higher Price', sub: 'Avg premium in DFW' },
            { icon: '☀️', label: 'Outdoor Living Key', sub: 'DFW buyers prioritize it' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 12, padding: '1rem', border: '1px solid #1e3a5f', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem', marginTop: 4 }}>{s.label}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginTop: 0 }}>🏡 Staging Priority Guide by Home Style</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '1rem' }}>Select your home style:</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {['traditional', 'modern', 'ranch', 'luxury'].map((s) => (
              <button key={s} onClick={() => setStyle(s)} style={{ padding: '0.4rem 1rem', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', background: style === s ? '#F5E642' : '#1e3a5f', color: style === s ? '#0A1628' : '#fff' }}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          {steps.map((section, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem' }}>🏠 {section.room}</div>
              {section.tips.map((tip, j) => (
                <div key={j} style={{ color: '#94a3b8', fontSize: '0.85rem', padding: '0.25rem 0', paddingLeft: '1rem', borderLeft: '2px solid #1e3a5f', marginBottom: '0.25rem' }}>✓ {tip}</div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', border: '1px solid #F5E642', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem' }}>🌊</div>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0.5rem 0 0.25rem' }}>Pool Staging in DFW Summer</p>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', margin: 0 }}>Clean pool + staged outdoor furniture adds $10-25K perceived value in DFW summer listings. Professional twilight photos of pool area are essential.</p>
        </div>
      </div>
    </div>
  );
}

