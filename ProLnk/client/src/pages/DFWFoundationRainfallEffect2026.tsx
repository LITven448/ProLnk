import { useState } from 'react';

const scenarios = [
  { id: 'spring-wet', label: '🌧️ After heavy DFW spring rains', response: 'Clay under your DFW slab is absorbing water and expanding. Expect upward heave of interior sections (interior higher than perimeter). This is not damage yet — it\’s the soil doing what DFW clay does. Begin supplemental watering at the perimeter NOW to prevent the extreme drying that follows.' },
  { id: 'summer-dry', label: '☀️ After DFW summer drought', response: 'Clay has contracted after losing moisture. Interior slab sections drop as soil pulls away. Gaps at doors and windows are classic signs. The cure is slow, consistent perimeter watering (drip system or soaker hose) every 3 days during drought. Do not flood — gradual rehydration prevents differential movement.' },
  { id: 'crack-appear', label: '🪟 New cracks appeared after rain+dry cycle', response: 'Annual DFW heave-and-settle cycle. Hairline cracks under 1/4" are normal stress relief. Cracks over 1/4" wide, horizontal displacement, or stepped cracks along brick mortar require foundation engineer evaluation. Document with photos and dates.' },
  { id: 'watering', label: '💧 Starting a watering program', response: 'Best practice for DFW foundations: maintain consistent soil moisture year-round. Drip line placed 12–18 inches from foundation, running 20–30 minutes every 3 days in summer, every 7 days in cooler months. The goal is to prevent extremes — not to keep soil wet, but to buffer the DFW swing.' },
  { id: 'plumbing', label: '🚰 Plumbing leak suspicion under slab', response: 'A slow plumbing leak under a DFW slab can cause localized clay expansion — heaving one section while the rest settles in summer. Signs: soft spots, unusual cracks in a pattern, high water bill. Order a slab leak detection before any foundation repair.' },
];

export default function DFWFoundationRainfallEffect2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState<'guide' | 'tool'>('guide');

  const match = scenarios.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em' }}>
          PROLNK · DFW FOUNDATION GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', lineHeight: 1.2 }}>
          🌧️ DFW Rainfall Effect on Foundation Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '0.95rem' }}>
          DFW's clay soil expands with rain and contracts in drought — every year, repeatedly. Understanding this cycle is the foundation of DFW home maintenance.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          {(['guide', 'tool'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '0.5rem 1.2rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem',
              background: tab === t ? '#F5E642' : '#1e3a5f', color: tab === t ? '#0A1628' : '#94a3b8'
            }}>{t === 'guide' ? '📖 Guide' : '🌦️ My Situation'}</button>
          ))}
        </div>

        {tab === 'guide' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: '🌧️', title: 'Spring Rains: Expansion Phase', body: 'DFW averages 15+ inches of rain in spring. Expansive Blackland Prairie clay absorbs this moisture and swells — pushing slabs upward (heave). Interior sections of the slab often rise more than the perimeter, causing doors to stick and floors to feel uneven.' },
              { icon: '☀️', title: 'Summer Drought: Contraction Phase', body: 'DFW summers are brutal — 100°F+ days with minimal rain. Clay dries out and shrinks dramatically. Slabs settle downward, perimeter first, as moisture evaporates from outer edges. This is when most DFW foundation calls happen.' },
              { icon: '🔄', title: 'The Annual Cycle', body: 'Wet → heave → dry → settle → wet → heave. This repeats every year. The cumulative effect of decades of cycling is what causes differential settlement in DFW homes. Houses built in 1980 have experienced 45+ cycles of this movement.' },
              { icon: '💧', title: 'The Watering Buffer Strategy', body: 'You cannot stop DFW weather, but you can buffer extremes. A drip irrigation system placed 12–18 inches from the foundation perimeter, running consistently, prevents the severe drying that causes rapid contraction. This is the #1 DFW foundation maintenance action.' },
              { icon: '🚨', title: 'Warning Signs After Rain Events', body: 'Doors and windows sticking after heavy rain = temporary heave (normal). Cracks over 1/4" wide = evaluate immediately. Floors sloping more than 1" over 10 feet = engineer review needed. Document changes seasonally with photos.' },
            ].map(card => (
              <div key={card.title} style={{ background: '#132240', borderRadius: '0.75rem', padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.4rem', fontSize: '1rem' }}>{card.icon} {card.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{card.body}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tool' && (
          <div>
            <p style={{ color: '#94a3b8', marginBottom: '1.2rem', fontSize: '0.9rem' }}>Select your DFW weather situation to understand the foundation response:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {scenarios.map(s => (
                <button key={s.id} onClick={() => setSelected(s.id)} style={{
                  background: selected === s.id ? '#1e3a5f' : '#132240', border: selected === s.id ? '2px solid #F5E642' : '2px solid transparent',
                  borderRadius: '0.75rem', padding: '0.9rem 1.2rem', color: '#e2e8f0', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem', fontWeight: 600
                }}>{s.label}</button>
              ))}
            </div>
            {match && (
              <div style={{ background: '#132240', borderRadius: '0.75rem', padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>🌍 Foundation Response</div>
                <div style={{ color: '#e2e8f0', lineHeight: 1.7, fontSize: '0.95rem' }}>{match.response}</div>
                <div style={{ marginTop: '1rem', padding: '0.8rem', background: '#0A1628', borderRadius: '0.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                  📞 Connect with a DFW foundation specialist through ProLnk for a seasonal evaluation.
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: '2.5rem', padding: '1rem 1.5rem', background: '#132240', borderRadius: '0.75rem', fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
          ProLnk connects DFW homeowners with vetted foundation professionals · prolnk.io
        </div>
      </div>
    </div>
  );
}