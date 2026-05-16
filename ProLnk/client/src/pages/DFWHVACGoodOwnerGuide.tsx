import { useState } from 'react';

const situations = [
  { id: 'new', label: '🏠 New to DFW', desc: 'Just moved or bought first home' },
  { id: 'mid', label: '📅 A few years in', desc: 'Getting comfortable with ownership' },
  { id: 'veteran', label: '🌟 Long-time owner', desc: 'Experienced but want to level up' },
];

const guides: Record<string, { title: string; steps: string[] }> = {
  new: {
    title: 'Start Strong in DFW',
    steps: [
      '🔍 Locate your air handler, outdoor condenser, and thermostat today',
      '📦 Buy a 3-month supply of 1-inch MERV-8 filters — DFW dust is relentless',
      '📅 Schedule your first tune-up now, before summer heat hits 100°F+',
      '💧 Find the PVC drain line and flush it monthly with distilled vinegar',
      '📱 Download ProLnk and add your system info — model, age, last service',
      '🤝 Ask neighbors for trusted HVAC tech referrals before you need one',
    ],
  },
  mid: {
    title: 'Sharpen Your Good Owner Habits',
    steps: [
      '🔄 Move from reactive to proactive: schedule tune-ups every March and October',
      '📊 Start tracking your electric bill — DFW summer spikes signal system stress',
      '🌿 Clear 2 feet around your outdoor unit — DFW cedar and oak debris clogs coils',
      '❄️ Know your refrigerant type (R-410A vs R-22) — R-22 is phase-out territory',
      '📞 Build a relationship with one trusted tech before emergency season',
      '🔗 Use ProLnk as your backup network when your tech is booked out',
    ],
  },
  veteran: {
    title: 'From Good to Consistent Excellence',
    steps: [
      '📋 Create a home binder: system manual, service history, warranty docs',
      '🌡️ Use a programmable thermostat — 78°F when home, 82°F when away in DFW summers',
      '🔧 Negotiate an annual maintenance agreement with your preferred HVAC company',
      '💨 Check static pressure annually — DFW homes often have undersized ductwork',
      '🏆 Review your system age — plan replacement 12-15 years in for DFW conditions',
      '🔗 Recommend ProLnk to neighbors — good owners build good communities',
    ],
  },
};

export default function DFWHVACGoodOwnerGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = selected ? guides[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✅</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>
            What a Good DFW HVAC Owner Looks Like
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: 560, margin: '0 auto' }}>
            In DFW, good HVAC ownership isn't luck — it's a set of consistent habits that keep your system running through 110°F summers and ice storms.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📍 What's your situation?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {situations.map(s => (
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

        {guide && (
          <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.2rem', marginBottom: '1.25rem' }}>🏅 {guide.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {guide.steps.map((step, i) => (
                <div key={i} style={{ background: '#1a2f55', borderRadius: 8, padding: '0.85rem 1rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#1a2f55', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>ProLnk is your backup network</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>When your regular tech is booked, ProLnk connects you to vetted DFW HVAC pros in hours — not days.</p>
        </div>
      </div>
    </div>
  );
}
