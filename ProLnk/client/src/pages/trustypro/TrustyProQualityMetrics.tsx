import { useState } from 'react';

const concerns = [
  {
    label: 'My Score Seems Low',
    icon: '📉',
    cause: 'Low scores usually result from photo quality issues — poor lighting, blurry images, or incomplete coverage of a zone.',
    improvements: [
      'Shoot in daylight with as much natural light as possible',
      'Hold the camera steady or use a tripod for sharp images',
      'Cover all four sides of the exterior and all rooms inside',
      'Get close enough to fill the frame but not so close you lose context',
    ],
    accuracy: 'Rescanning with better photos typically improves score accuracy by 15-25 points.',
  },
  {
    label: 'Photos Are Too Dark',
    icon: '🌑',
    cause: 'Dark photos prevent the AI from detecting fine details like hairline cracks, moisture staining, or granule loss on shingles.',
    improvements: [
      'Scan exterior between 9am and 4pm for optimal lighting',
      'For interior rooms, open all blinds and turn on all overhead lights',
      'Avoid scanning on heavily overcast days for roof and exterior',
      'Use your phone flashlight for dark crawl spaces or utility areas',
    ],
    accuracy: 'Lighting is the single biggest factor in scan accuracy — worth reshooting if images are dim.',
  },
  {
    label: 'Blurry or Shaky Images',
    icon: '📷',
    cause: 'Motion blur prevents edge detection, which is critical for identifying crack patterns, boundary conditions, and surface wear.',
    improvements: [
      'Tap to focus before shooting each photo',
      'Brace your elbows against your body when shooting handheld',
      'Use the 2-second timer if your phone supports it',
      'If shooting video, move slowly and deliberately — no sudden turns',
    ],
    accuracy: 'Sharp images are required for crack and moisture detection. Reshoot if images are visibly blurry.',
  },
  {
    label: 'Missing Coverage Areas',
    icon: '🗺️',
    cause: 'If a zone is missing photos, the AI scores that zone lower by default since it cannot assess what it cannot see.',
    improvements: [
      'Walk a complete loop around the exterior — all four sides plus corners',
      'Include roofline photos from the ground at multiple angles',
      'Photograph all rooms: kitchen, bathrooms, basement, attic hatch',
      'Do not skip utility areas — HVAC unit, electrical panel, water heater',
    ],
    accuracy: 'Missing the attic, crawl space, or one exterior side reduces overall scan completeness significantly.',
  },
  {
    label: 'Unexpected Flagged Area',
    icon: '🚩',
    cause: 'The AI flagged something you did not expect. This can be a shadow, a decorative element, or a real concern that was not visible to you.',
    improvements: [
      'Reshoot the specific area flagged with better lighting and angle',
      'Compare the flagged image to what you see in person',
      'If it persists after rescan, treat it as a real finding and investigate',
      'You can add notes to your scan to provide context for flagged areas',
    ],
    accuracy: 'False positives do occur. A second scan of just the flagged zone usually clarifies the finding.',
  },
];

export default function TrustyProQualityMetrics() {
  const [selected, setSelected] = useState(0);
  const concern = concerns[selected];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050d1a', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📸</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px' }}>Scan Quality Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto' }}>
            Better photos mean more accurate results. Here is how TrustyPro rates image quality and how to improve your scan.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '32px' }}>
          {concerns.map((c, i) => (
            <button key={i} onClick={() => setSelected(i)}
              style={{ padding: '12px', borderRadius: '10px', border: `2px solid ${selected === i ? '#4F46E5' : '#1e2d45'}`, backgroundColor: selected === i ? '#4F46E5′ : '#0d1f35', color: '#fff', cursor: ’pointer', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' }}>
              {c.icon}<br />{c.label}
            </button>
          ))}
        </div>
        <div style={{ backgroundColor: '#0d1f35', borderRadius: '16px', padding: '32px', border: '1px solid #1e2d45', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px' }}>{concern.icon} {concern.label}</h2>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Why This Happens</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{concern.cause}</p>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>How to Improve</div>
            <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
              {concern.improvements.map((tip, i) => (
                <li key={i} style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: '6px' }}>{tip}</li>
              ))}
            </ul>
          </div>
          <div style={{ backgroundColor: '#4F46E522', borderRadius: '10px', padding: '16px', border: '1px solid #4F46E5′ }}>
            <div style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.8rem', marginBottom: '6px' }}>ACCURACY IMPACT</div>
            <p style={{ color: '#c7d2fe', fontSize: '0.9rem', margin: 0 }}>{concern.accuracy}</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { icon: '☀️', label: 'Lighting', weight: 'Highest impact' },
            { icon: '🎯', label: 'Focus', weight: 'High impact' },
            { icon: '🗂️', label: 'Coverage', weight: 'High impact' },
          ].map((m, i) => (
            <div key={i} style={{ backgroundColor: '#0d1f35', borderRadius: '12px', padding: '20px', textAlign: 'center', border: '1px solid #1e2d45′ }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{m.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: '4px' }}>{m.label}</div>
              <div style={{ color: '#FACC15', fontSize: '0.8rem' }}>{m.weight}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
