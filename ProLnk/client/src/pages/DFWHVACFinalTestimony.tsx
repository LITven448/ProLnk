import { useState } from 'react';

const situations = [
  { id: 'firstsummer', label: '🌞 First DFW Summer', desc: 'About to face the heat' },
  { id: 'breakdown', label: '🔥 Survived a Breakdown', desc: 'System failed at worst time' },
  { id: 'longterm', label: '🏠 Long-Time Owner', desc: 'Decades of DFW experience' },
  { id: 'moving', label: '📦 New to the Area', desc: 'Relocating to DFW' },
];

const testimonies: Record<string, { opening: string; body: string[]; closing: string }> = {
  firstsummer: {
    opening: 'To you, heading into your first DFW summer:',
    body: [
      'Nothing prepares you for 108°F with 60% humidity. Nothing. The first time your AC struggles to hold 80°F inside while it\’s 104°F outside, you\’ll understand why every HVAC page you\’ve read kept saying "DFW is different."',
      'Here\’s what we learned from 3,100+ pages of HVAC knowledge distilled for this exact moment: change your filter now, clear your drain line, and have two HVAC numbers in your phone before July.',
      'Your system is about to work harder than it ever has. The best thing you can do is not wait for it to fail. ProLnk exists because the average DFW homeowner calls us the day the system dies — we want to meet you before that day.',
    ],
    closing: 'Your first DFW summer will teach you more about your home than any other season. Let ProLnk help you learn it without a $9,000 lesson.',
  },
  breakdown: {
    opening: 'To you who\’ve already been through it:',
    body: [
      'You know the feeling. 11pm on an August Tuesday, 104°F outside, thermostat climbing. You\’ve already called three companies. Two didn\’t answer. One said "two weeks." You slept at a hotel.',
      'That experience is exactly why we built ProLnk. Not to sell you fear — but because that night revealed something true: the DFW HVAC market wasn\’t built for homeowners. It was built for contractors.',
      'From 3,100+ pages of HVAC data, the clearest finding: homeowners who maintain relationships before emergencies spend 70% less during them. The network matters before it\’s needed.',
    ],
    closing: 'You\’ve already paid the tuition. ProLnk is how you make sure you never pay it again.',
  },
  longterm: {
    opening: 'To you who\’ve lived through decades of DFW summers:',
    body: [
      'You\’ve seen HVAC technology change. Freon to 410A. 8 SEER to 20 SEER. Window units to variable-speed communicating systems. You remember when a tech came out for $35.',
      'What hasn\’t changed: DFW\’s heat is unforgiving. The homes are getting bigger. The systems are getting more complex. And finding a tech who actually knows what they\’re doing is harder than it\’s ever been.',
      'Here\’s what 3,100+ pages confirmed for long-time owners: the knowledge you\’ve built is genuinely rare. The market desperately needs homeowners who ask good questions, hold contractors accountable, and share what they\’ve learned.',
    ],
    closing: 'ProLnk was built with people like you in mind. Your experience isn\’t just valuable — it\’s the foundation this platform stands on.',
  },
  moving: {
    opening: 'To you arriving in DFW from somewhere else:',
    body: [
      'Welcome. You\’re moving to one of the most demanding HVAC climates in North America — and most people don\’t find that out until their first August utility bill hits $400.',
      'DFW\’s climate is unique: summers that last 5 months, winter ice storms that freeze outdoor coils, spring thunderstorms with hail that dents condensers, and spring cedar pollen that clogs filters in weeks.',
      'From 3,100+ pages of DFW-specific HVAC knowledge: the single most important thing a new arrival can do is get a pre-purchase or pre-season inspection from a local tech who knows DFW conditions. Not a national chain. A local expert.',
    ],
    closing: 'ProLnk helps you find that expert before you need one desperately. That\’s the DFW welcome gift we wish everyone got.',
  },
};

export default function DFWHVACFinalTestimony() {
  const [selected, setSelected] = useState<string | null>(null);
  const testimony = selected ? testimonies[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📖</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>
            The Final DFW HVAC Testimony
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto' }}>
            From 3,100+ pages of DFW HVAC knowledge — the most important things every homeowner needs to hear, told as a personal story.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🎯 Which testimony speaks to you?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
            {situations.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  background: selected === s.id ? '#F5E642′ : '#1a2f55',
                  color: selected === s.id ? '#0A1628′ : '#fff',
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

        {testimony && (
          <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '2rem', marginBottom: '1.5rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.05rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>
              {testimony.opening}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {testimony.body.map((para, i) => (
                <p key={i} style={{ color: '#cbd5e1', lineHeight: 1.7, fontSize: '0.97rem', margin: 0 }}>{para}</p>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#1a2f55', borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>
              <p style={{ color: '#F5E642', fontStyle: 'italic', margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>{testimony.closing}</p>
            </div>
          </div>
        )}

        <div style={{ background: '#1a2f55', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>This is why ProLnk exists</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Every story above is a DFW homeowner we built this platform for. Join the network that knows your climate, your seasons, and your stakes.</p>
        </div>
      </div>
    </div>
  );
}
