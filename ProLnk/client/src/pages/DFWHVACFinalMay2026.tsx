import { useState } from 'react';

const situations = [
  { id: 'no-service', label: 'Haven’t had HVAC service in 12+ months', priority: 'URGENT: Book tune-up now — May window closing fast. Summer premium pricing starts June 1.' },
  { id: 'recent-service', label: 'Had service within last 6 months', priority: 'You’re set for AC season. Check filter monthly. Monitor for unusual sounds or warm spots.' },
  { id: 'old-system', label: 'System is 12+ years old', priority: 'Pre-summer inspection critical. SEER2 upgrades now qualify for federal tax credits through 2026.' },
  { id: 'new-system', label: 'New system (under 3 years)', label2: '', priority: 'Low risk. Confirm warranty is registered. Change filter. You’re ready for summer.' },
  { id: 'issues', label: 'Noticing issues (warm rooms, noise, high bills)', priority: 'Don’t wait. DFW techs book out 2–3 weeks in June. Get diagnosed in May before it gets worse.' },
];

export default function DFWHVACFinalMay2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
          🌡️ DFW HVAC · May 2026
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.15, marginBottom: 16, color: '#fff' }}>
          Your May 2026 HVAC Guide for DFW
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
          AC season is here. The pre-summer tune-up window is closing. SEER2 standards are now in full effect across Texas. Here's what every DFW homeowner needs to know right now.
        </p>

        <div style={{ display: 'grid', gap: 12, marginBottom: 40 }}>
          {[
            { icon: '📅', title: 'Tune-Up Window Closing', body: 'Most DFW HVAC companies book out 2–3 weeks by late May. If you wait until June, you\’re paying emergency rates and waiting in the heat.' },
            { icon: '⚡', title: 'SEER2 Now Required', body: 'All new HVAC systems installed in Texas must meet SEER2 efficiency standards. If you\’re replacing, your contractor must install SEER2-rated equipment.' },
            { icon: '💨', title: 'May = High Pollen = Dirty Filters', body: 'North Texas pollen is at its peak in May. Check your filter now — a clogged filter in 95°F weather can cause system failure.' },
            { icon: '💧', title: 'Drain Line Check Before Humidity', body: 'Summer humidity is starting. A clogged condensate drain will shut your system down. Flush it with vinegar now.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0f2040', borderRadius: 12, padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{card.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 4 }}>{card.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{card.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 16, padding: '32px' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 20 }}>
            Your Situation → Your May 2026 HVAC Priority
          </div>
          <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
            {situations.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                style={{
                  background: selected === s.id ? '#F5E642' : '#1a3050',
                  color: selected === s.id ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 10, padding: '14px 18px',
                  textAlign: 'left', cursor: 'pointer', fontSize: 14, fontWeight: 500,
                  transition: 'all 0.15s',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: '20px 24px', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>YOUR MAY 2026 PRIORITY</div>
              <div style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.7 }}>{result.priority}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center', color: '#475569', fontSize: 13 }}>
          ProLnk connects DFW homeowners with verified HVAC pros · prolnk.io
        </div>
      </div>
    </div>
  );
}
