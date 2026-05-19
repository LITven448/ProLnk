import { useState } from 'react';

const SECTIONS = [
  { id: 'timing', label: '📅 Fair Timing', content: 'The State Fair of Texas runs late September through mid-October at Fair Park in Dallas. Plan all major home projects to finish before or after this 24-day window.' },
  { id: 'parking', label: '🚗 Parking Income', content: 'Homes within 1-3 miles of Fair Park can earn $20-$60/day renting driveways during the Fair. Use SpotHero or Neighbor.com to list your space with zero effort.' },
  { id: 'traffic', label: '🚦 Traffic Strategy', content: 'I-30, I-45, and US-175 see severe congestion during peak Fair hours (11am-10pm). Schedule contractor visits before 9am or after 11pm during Fair weeks.' },
  { id: 'history', label: '🏛️ Fair Park History', content: 'Fair Park is a National Historic Landmark built for the 1936 Texas Centennial. The surrounding East Dallas neighborhoods have seen consistent appreciation tied to the venue\’s cultural draw.' },
  { id: 'november', label: '🔨 November Deals', content: 'November is a DFW contractor\’s slow season. Book HVAC tune-ups, roofing inspections, and exterior painting 2-4 weeks post-Fair for 10-20% better pricing and faster scheduling.' },
];

const PROXIMITY_TIPS: Record<string, string> = {
  close: 'You are in the prime parking income zone. List your driveway now — fairs sell out parking fast. Budget extra time for all deliveries and contractor visits during Fair weeks.',
  mid: 'You will feel moderate traffic impact on I-30 and Hwy 80 corridors. Your home value benefits from Fair Park cultural prestige without the peak congestion.',
  far: 'Minimal direct traffic impact. Watch for spillover contractor demand — pros book up fast across DFW in October. Lock in your fall service dates by August.',
};

export default function DFWStateFairHomeGuide() {
  const [active, setActive] = useState<string | null>(null);
  const [proximity, setProximity] = useState<'close' | 'mid' | 'far' | ''>('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🎡</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW State Fair Home Guide
          </h1>
          <p style={{ color: '#8A9BB5', fontSize: 15, margin: 0 }}>
            How the State Fair of Texas shapes your DFW homeowner experience
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
          {SECTIONS.map(s => (
            <div key={s.id}>
              <button
                onClick={() => setActive(active === s.id ? null : s.id)}
                style={{ width: '100%', textAlign: 'left', background: active === s.id ? '#1E3A5F' : '#0F2340', border: '1px solid', borderColor: active === s.id ? '#F5E642' : '#1E3A5F', borderRadius: 10, padding: '14px 18px', color: '#E8EDF5', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
              >
                {s.label}
              </button>
              {active === s.id && (
                <div style={{ background: '#0F2340', border: '1px solid #1E3A5F', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '16px 18px', fontSize: 14, color: '#B8C8DC', lineHeight: 1.6 }}>
                  {s.content}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2340', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: '0 0 16px' }}>
            📍 How Far Are You From Fair Park?
          </h2>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            {(['close', 'mid', 'far'] as const).map(p => (
              <button
                key={p}
                onClick={() => setProximity(p)}
                style={{ flex: 1, minWidth: 140, padding: '10px 0', background: proximity === p ? '#F5E642' : '#1E3A5F', color: proximity === p ? '#0A1628' : '#E8EDF5', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}
              >
                {p === 'close' ? 'Under 3 miles' : p === 'mid' ? '3-10 miles' : '10+ miles'}
              </button>
            ))}
          </div>
          {proximity && (
            <div style={{ background: '#1E3A5F', borderRadius: 8, padding: 16, fontSize: 14, color: '#B8C8DC', lineHeight: 1.6 }}>
              {PROXIMITY_TIPS[proximity]}
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', color: '#3A5070', fontSize: 12, marginTop: 32 }}>
          ProLnk — DFW Home Intelligence
        </p>
      </div>
    </div>
  );
}
