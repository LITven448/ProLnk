import { useState } from 'react';

const stages = [
  { id: 'day1', label: '🗓️ Day 1 Owner', desc: 'Just got the keys' },
  { id: 'year1', label: '📅 Year 1', desc: 'First full cycle of DFW seasons' },
  { id: 'year3', label: '🌱 Year 3–5', desc: 'Building real knowledge' },
  { id: 'veteran', label: '🏅 Year 10+', desc: 'Seasoned DFW homeowner' },
];

const journeyMap: Record<string, { next: string; learn: string[]; prolnk: string }> = {
  day1: {
    next: 'Year 1: Survive every DFW season with confidence',
    learn: [
      '📍 Where all your HVAC components are located',
      '🔧 How to change your filter and how often',
      '📞 Who to call when something goes wrong',
      '🌡️ What normal thermostat settings look like for DFW heat',
      '💧 Where your drain line is and why it matters in DFW humidity',
    ],
    prolnk: 'ProLnk helps Day 1 owners find vetted techs fast — no Yelp roulette.',
  },
  year1: {
    next: 'Years 3–5: Build real diagnostic intuition',
    learn: [
      '📊 How your electric bill changes seasonally and what\'s normal vs. alarming',
      '🔄 The rhythm of spring and fall tune-ups as DFW\'s two critical prep windows',
      '⚠️ Your first warning signs: short cycling, warm spots, musty smells',
      '💰 That HVAC emergencies are expensive — the $2,000 emergency fund is real',
      '🌧️ How DFW hail, ice, and 100°F+ heat each stress your system differently',
    ],
    prolnk: 'ProLnk gives Year 1 owners a backup network when August locks out every local tech.',
  },
  year3: {
    next: 'Year 10+: Manage your HVAC as a long-term financial asset',
    learn: [
      '🔬 How to read your own system\'s performance patterns',
      '📐 What SEER ratings mean for your DFW energy bill and when to upgrade',
      '🤝 The value of a trusted tech relationship built over multiple seasons',
      '🏠 How HVAC condition affects home value and appraisals in DFW',
      '📋 How to build and maintain a complete system service history',
    ],
    prolnk: 'ProLnk gives Years 3–5 owners market access — compare quotes, vet credentials, get second opinions.',
  },
  veteran: {
    next: 'Expert level: Strategic optimization and community leadership',
    learn: [
      '📈 When to replace vs. repair based on real DFW cost curves',
      '☀️ Whether heat pump conversion, solar, or battery storage makes financial sense',
      '🧭 How to negotiate multi-year maintenance contracts with performance SLAs',
      '🌿 Landscaping and insulation as HVAC performance multipliers in DFW',
      '🏆 How to share knowledge with neighbors and build a community of great owners',
    ],
    prolnk: 'ProLnk connects veteran owners to premium pros, multi-home management, and referral income through the Scout network.',
  },
};

export default function DFWHVACOwnerJourney() {
  const [selected, setSelected] = useState<string | null>(null);
  const map = selected ? journeyMap[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🗺️</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>
            The DFW HVAC Owner Journey
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto' }}>
            Every DFW homeowner travels this path. The best ones know where they are, what they're learning, and what comes next.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📍 Where are you on the journey?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
            {stages.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  background: selected === s.id ? '#F5E642' : '#1a2f55',
                  color: selected === s.id ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 8, padding: '1rem', cursor: 'pointer',
                  fontWeight: 600, textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '1.1rem' }}>{s.label}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.75, marginTop: 4 }}>{s.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {map && (
          <>
            <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.25rem' }}>
              <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1.25rem' }}>📚 What You're Learning Right Now</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {map.learn.map((item, i) => (
                  <div key={i} style={{ background: '#1a2f55', borderRadius: 8, padding: '0.85rem 1rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.25rem', marginBottom: '1.25rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.4rem' }}>🎯 Your Next Stage</div>
              <div style={{ color: '#e2e8f0', fontSize: '0.95rem' }}>{map.next}</div>
            </div>

            <div style={{ background: '#1a2f55', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔗</div>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>ProLnk at your stage</p>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{map.prolnk}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
