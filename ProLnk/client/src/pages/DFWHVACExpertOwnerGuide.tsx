import { useState } from 'react';

const masteryLevels = [
  { id: 'systems', label: '⚙️ Systems Knowledge', desc: 'I understand how HVAC works' },
  { id: 'diagnostic', label: '🔬 Diagnostic Fluency', desc: 'I can read what my system tells me' },
  { id: 'strategic', label: '🧭 Strategic Owner', desc: 'I manage HVAC like an asset' },
];

const mastery: Record<string, { title: string; insights: string[] }> = {
  systems: {
    title: 'What Expert System Knowledge Looks Like in DFW',
    insights: [
      '🌡️ You understand the refrigeration cycle: compression → condensation → expansion → evaporation',
      '💨 You know airflow dynamics — CFM requirements, static pressure limits, duct sizing principles',
      '⚡ You\'re literate in electrical basics: capacitor failure symptoms, contactor wear, blower motor draws',
      '🌧️ You understand humidity management — DFW humidity swings make latent load as critical as sensible load',
      '🔧 You know the difference between a tune-up, a diagnostic, a repair, and a replacement consult',
      '📐 You\'ve reviewed a Manual J load calculation and understand what it means for your home',
    ],
  },
  diagnostic: {
    title: 'Expert Diagnostic Fluency in DFW Conditions',
    insights: [
      '🌡️ You interpret thermostat data: temperature differential, cycle time, recovery rate all tell a story',
      '💧 You spot early refrigerant issues: low delta-T, iced coils, hissing sounds — before a tech visit',
      '📊 You track energy usage patterns — a 15% efficiency drop triggers investigation, not assumption',
      '🔊 You know your system\'s sound signatures: normal hum vs. capacitor buzz vs. contactor chatter',
      '🌿 Post-DFW storm, you assess condenser fin damage, check drain line integrity, verify airflow',
      '📱 You use ProLnk to log observations and get expert interpretation before committing to a repair',
    ],
  },
  strategic: {
    title: 'Expert Strategic Ownership in the DFW Market',
    insights: [
      '📈 You track replacement cost curves — DFW HVAC prices rise 6-8% annually; timing matters',
      '🏠 You factor HVAC into home value: an efficient, documented system adds $5,000–$10,000 at appraisal',
      '⚡ You\'ve modeled a heat pump conversion — DFW\'s mild winters make hybrid heat pump ROI 4–6 years',
      '☀️ You\'ve assessed solar + battery storage integration with your HVAC load profile',
      '🤝 You negotiate multi-year maintenance contracts with performance SLAs — not just "come when called"',
      '🔗 You use ProLnk\'s network as a market intelligence layer — comparing quotes, vetting credentials',
    ],
  },
};

export default function DFWHVACExpertOwnerGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const content = selected ? mastery[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎓</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>
            What an Expert DFW HVAC Owner Looks Like
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto' }}>
            Expert owners don't just maintain systems — they understand them, read them, and manage them as long-term assets in the unique DFW climate.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🧭 What area of mastery defines you?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {masteryLevels.map(m => (
              <button
                key={m.id}
                onClick={() => setSelected(m.id)}
                style={{
                  background: selected === m.id ? '#F5E642' : '#1a2f55',
                  color: selected === m.id ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 8, padding: '1rem', cursor: 'pointer',
                  fontWeight: 600, textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '1.1rem' }}>{m.label}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.75, marginTop: 4 }}>{m.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {content && (
          <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.15rem', marginBottom: '1.25rem' }}>🎯 {content.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {content.insights.map((item, i) => (
                <div key={i} style={{ background: '#1a2f55', borderRadius: 8, padding: '0.85rem 1rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>🏅 The Expert Owner's DFW Edge</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[
              ['💰', 'Saves $1,200–$2,400/yr', 'vs. average DFW homeowner'],
              ['📅', 'System lasts 18–22 yrs', 'vs. 12–15 yr avg with neglect'],
              ['⚡', '20–35% lower energy use', 'through optimization, not luck'],
              ['🤝', 'Never waits in emergency', 'vetted network always ready'],
            ].map(([icon, stat, sub], i) => (
              <div key={i} style={{ background: '#1a2f55', borderRadius: 8, padding: '0.85rem' }}>
                <div style={{ fontSize: '1.3rem' }}>{icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem', marginTop: 4 }}>{stat}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1a2f55', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>Expert owners choose ProLnk for market access</p>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Compare credentials, review service histories, and access DFW\'s vetted HVAC network — the platform expert owners trust.</p>
        </div>
      </div>
    </div>
  );
}
