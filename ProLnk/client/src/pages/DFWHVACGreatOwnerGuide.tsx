import { useState } from 'react';

const levels = [
  { id: 'good', label: '✅ Good Owner', desc: 'I do the basics consistently' },
  { id: 'aware', label: '🧠 System Aware', desc: 'I know my system\’s history' },
  { id: 'prepared', label: '🛡️ Fully Prepared', desc: 'I have a plan for everything' },
];

const elevations: Record<string, { title: string; items: string[] }> = {
  good: {
    title: 'What Elevates You From Good to Great',
    items: [
      '📅 Know your system\’s exact age — DFW units average 12-15 years; great owners know their countdown',
      '⚠️ Memorize the 5 DFW warning signs: ice on coils, musty air, short cycling, climbing bills, weak airflow',
      '💰 Maintain a $2,000–$3,500 HVAC emergency fund — average DFW replacement is $8,500–$14,000',
      '📞 Have 2 vetted HVAC techs\’ numbers saved — one books out in August; you need a backup',
      '🌡️ Install a smart thermostat with alerts — catch problems before they become failures',
      '📋 Know your warranty status: compressor, parts, and labor coverage differ by brand',
    ],
  },
  aware: {
    title: 'Turn Awareness Into Proactive Readiness',
    items: [
      '📊 Track SEER rating and compare to current standards — upgrading from SEER 14 to 18 saves 20%+ in DFW',
      '🔬 Get a duct leakage test — DFW homes lose 20–30% of conditioned air through leaky ducts',
      '🌧️ Create a post-storm checklist: check condenser, clear debris, verify drainage after DFW hail events',
      '📱 Use ProLnk to document your system — model, serial, service dates, contractor notes in one place',
      '🔋 Consider a whole-home generator assessment — DFW ice storms knock out power for days',
      '📆 Pre-book March and October tune-ups in January — DFW HVAC calendars fill fast',
    ],
  },
  prepared: {
    title: 'Great Owners Who Are Fully Prepared Do This',
    items: [
      '🚨 You have a 24/7 emergency HVAC contact — great owners don\’t scramble at 10pm on a 104°F day',
      '📖 You\’ve read your equipment manual — you know reset procedures, error codes, and filter specs',
      '💡 You\’ve optimized insulation and air sealing — the HVAC system is only as good as the envelope',
      '🌿 Your landscaping protects the condenser — 3 ft clearance, shade that doesn\’t restrict airflow',
      '🔗 You use ProLnk as a network resource — not just for emergencies but for quality second opinions',
      '🏆 You mentor neighbors — great owners in DFW create communities of great owners',
    ],
  },
};

export default function DFWHVACGreatOwnerGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const content = selected ? elevations[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏆</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>
            What a Great DFW HVAC Owner Looks Like
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto' }}>
            Great owners go beyond good habits. They know their system, anticipate problems, and never get caught unprepared in a DFW summer emergency.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📊 Where are you as an owner?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {levels.map(l => (
              <button
                key={l.id}
                onClick={() => setSelected(l.id)}
                style={{
                  background: selected === l.id ? '#F5E642′ : '#1a2f55',
                  color: selected === l.id ? '#0A1628′ : '#fff',
                  border: 'none', borderRadius: 8, padding: '1rem', cursor: 'pointer',
                  fontWeight: 600, textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '1.1rem' }}>{l.label}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.75, marginTop: 4 }}>{l.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {content && (
          <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.2rem', marginBottom: '1.25rem' }}>🌟 {content.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {content.items.map((item, i) => (
                <div key={i} style={{ background: '#1a2f55', borderRadius: 8, padding: '0.85rem 1rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#0f1f3d', borderRadius: 10, padding: '1rem' }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>⚠️</div>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.95rem' }}>DFW Emergency Fact</div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: 4 }}>August 2023: 40% of DFW HVAC companies had 2+ week wait times during peak failures</div>
          </div>
          <div style={{ background: '#0f1f3d', borderRadius: 10, padding: '1rem' }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>💡</div>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.95rem' }}>Great Owner Impact</div>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: 4 }}>Great owners extend system life by 3–5 years and cut emergency spend by 60%</div>
          </div>
        </div>

        <div style={{ background: '#1a2f55', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>ProLnk elevates great owners</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Access vetted DFW HVAC pros, second opinions, and emergency coverage — the network great owners rely on.</p>
        </div>
      </div>
    </div>
  );
}
