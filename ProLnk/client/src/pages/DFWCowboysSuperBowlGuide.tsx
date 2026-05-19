import { useState } from 'react';

const SECTIONS = [
  { id: 'hosting', label: '🏟️ AT&T Stadium & Super Bowl', content: 'AT&T Stadium in Arlington has hosted Super Bowl XLV (2011) and is a perennial candidate. DFW\’s 13M+ metro population and hotel capacity make it a top NFL choice for marquee events.' },
  { id: 'parking', label: '🚗 Parking Income Potential', content: 'Homes within 2 miles of AT&T Stadium can earn $75-$200/day during Super Bowl weekend. List on Neighbor.com or SpotHero 60 days before the event for maximum exposure.' },
  { id: 'rental', label: '🏠 Short-Term Rental Surge', content: 'Super Bowl weeks trigger 300-500% Airbnb price spikes in Arlington, Grand Prairie, and Irving. A 3BR home near the stadium can generate $3,000-$8,000 for a single week.' },
  { id: 'prep', label: '🔧 Pre-Event Home Prep', content: 'Deep clean, minor repairs, and professional photography 8 weeks before the event maximizes rental income. HVAC servicing is critical — guests expect perfect climate control.' },
  { id: 'neighbors', label: '📣 What Nearby Homeowners Experience', content: 'Event weeks bring helicopter traffic, road closures on Collins St and AT&T Way, and temporary no-parking zones. Plan grocery runs and contractor visits for off-peak hours.' },
];

type Proximity = 'ultra' | 'near' | 'mid' | 'far' | '';
type Size = 'small' | 'medium' | 'large' | '';

interface Assessment {
  parking: string;
  rental: string;
  score: string;
}

const ASSESSMENTS: Record<string, Record<string, Assessment>> = {
  ultra: {
    small: { parking: '$150-$250/day', rental: '$2,500-$4,000/week', score: '⭐⭐⭐⭐' },
    medium: { parking: '$150-$250/day', rental: '$4,000-$6,500/week', score: '⭐⭐⭐⭐⭐' },
    large: { parking: '$150-$250/day', rental: '$6,000-$10,000/week', score: '⭐⭐⭐⭐⭐' },
  },
  near: {
    small: { parking: '$75-$125/day', rental: '$1,500-$2,500/week', score: '⭐⭐⭐⭐' },
    medium: { parking: '$75-$125/day', rental: '$2,500-$4,500/week', score: '⭐⭐⭐⭐' },
    large: { parking: '$75-$125/day', rental: '$4,000-$7,000/week', score: '⭐⭐⭐⭐⭐' },
  },
  mid: {
    small: { parking: '$20-$50/day', rental: '$800-$1,500/week', score: '⭐⭐⭐' },
    medium: { parking: '$20-$50/day', rental: '$1,500-$3,000/week', score: '⭐⭐⭐' },
    large: { parking: '$20-$50/day', rental: '$2,500-$5,000/week', score: '⭐⭐⭐⭐' },
  },
  far: {
    small: { parking: 'Minimal', rental: '$500-$900/week', score: '⭐⭐' },
    medium: { parking: 'Minimal', rental: '$900-$1,800/week', score: '⭐⭐' },
    large: { parking: 'Minimal', rental: '$1,500-$3,000/week', score: '⭐⭐⭐' },
  },
};

export default function DFWCowboysSuperBowlGuide() {
  const [active, setActive] = useState<string | null>(null);
  const [proximity, setProximity] = useState<Proximity>('');
  const [size, setSize] = useState<Size>('');

  const assessment = proximity && size ? ASSESSMENTS[proximity]?.[size] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏈</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>
            DFW Cowboys Super Bowl Home Guide
          </h1>
          <p style={{ color: '#8A9BB5', fontSize: 15, margin: 0 }}>
            Turn AT&T Stadium events into homeowner income opportunities
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
          <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, margin: '0 0 20px' }}>
            💰 Event Hosting Opportunity Calculator
          </h2>
          <div style={{ marginBottom: 16 }}>
            <p style={{ color: '#8A9BB5', fontSize: 13, margin: '0 0 10px' }}>Distance from AT&T Stadium:</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {(['ultra', 'near', 'mid', 'far'] as const).map(p => (
                <button key={p} onClick={() => setProximity(p)} style={{ flex: 1, minWidth: 100, padding: '9px 0', background: proximity === p ? '#F5E642' : '#1E3A5F', color: proximity === p ? '#0A1628' : '#E8EDF5', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                  {p === 'ultra' ? 'Under 1 mi' : p === 'near' ? '1-3 miles' : p === 'mid' ? '3-8 miles' : '8+ miles'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <p style={{ color: '#8A9BB5', fontSize: 13, margin: '0 0 10px' }}>Home size:</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {(['small', 'medium', 'large'] as const).map(s => (
                <button key={s} onClick={() => setSize(s)} style={{ flex: 1, padding: '9px 0', background: size === s ? '#F5E642' : '#1E3A5F', color: size === s ? '#0A1628' : '#E8EDF5', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                  {s === 'small' ? '1-2 BR' : s === 'medium' ? '3-4 BR' : '5+ BR'}
                </button>
              ))}
            </div>
          </div>
          {assessment && (
            <div style={{ background: '#1E3A5F', borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 22, marginBottom: 12 }}>{assessment.score}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ background: '#0F2340', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#8A9BB5', fontSize: 12, marginBottom: 4 }}>Parking/day</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 16 }}>{assessment.parking}</div>
                </div>
                <div style={{ background: '#0F2340', borderRadius: 8, padding: 12 }}>
                  <div style={{ color: '#8A9BB5', fontSize: 12, marginBottom: 4 }}>Rental/week</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 16 }}>{assessment.rental}</div>
                </div>
              </div>
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
