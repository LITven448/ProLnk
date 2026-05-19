import { useState } from 'react';

const elements = [
  { icon: '📸', label: 'Professional Photo', tips: 'Clear headshot, good lighting, work attire or uniform. Pros with photos get 3x more clicks.' },
  { icon: '🔧', label: 'Complete Trade List', tips: 'List every trade you are licensed for. Broader coverage = more match opportunities.' },
  { icon: '🗺', label: 'Service Area Setup', tips: 'Set your actual travel radius, not aspirational. Accurate areas improve match quality.' },
  { icon: '⚡', label: 'Response Time Under 1 Hour', tips: 'Enable push notifications. Responding fast is the single biggest match priority factor.' },
  { icon: '⭐', label: 'Minimum 5 Reviews', tips: 'Ask every customer to rate after job completion. Five reviews unlocks trust badge.' },
  { icon: '📊', label: 'Performance Score 4.5+', tips: 'Score is weighted average of quality, timeliness, communication, and value ratings.' },
  { icon: '💬', label: 'Bio & Credentials', tips: 'Write 2-3 sentences: years of experience, specialty, and why homeowners choose you.' },
];

export default function ProLnkProfileOptimizationGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏆</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>Profile Optimization Guide</h1>
          <p style={{ color: '#8899AA', fontSize: 15 }}>What separates top-earning pros from the rest. Tap any element to see tips.</p>
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {elements.map((el, i) => (
            <div key={i} onClick={() => setSelected(selected === i ? null : i)} style={{
              background: selected === i ? '#1A2F4A' : '#0F2035',
              border: selected === i ? '1.5px solid #F5E642′ : '1.5px solid transparent',
              borderRadius: 12, padding: '18px 24px', cursor: 'pointer', transition: 'all 0.2s'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ fontSize: 28 }}>{el.icon}</span>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{el.label}</span>
                <span style={{ marginLeft: 'auto', color: '#F5E642′ }}>{selected === i ? '▲' : '▼'}</span>
              </div>
              {selected === i && (
                <div style={{ marginTop: 14, color: '#B0C4D8', fontSize: 14, lineHeight: 1.7, paddingLeft: 42 }}>
                  💡 {el.tips}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>📈 Profile Completion Score</div>
          <div style={{ color: '#8899AA', fontSize: 14 }}>
            Pros with 100% complete profiles earn <span style={{ color: '#F5E642′ }}>2.7x more</span> per month than incomplete profiles.
          </div>
        </div>
      </div>
    </div>
  );
}