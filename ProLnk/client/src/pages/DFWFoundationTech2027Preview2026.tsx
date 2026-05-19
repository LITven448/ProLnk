import { useState } from 'react';

const technologies = [
  { id: 'soil', icon: '📡', title: 'Wireless Soil Moisture Sensors', desc: 'Real-time moisture readings connected directly to ProLnk Vault', eta: 'Q1 2027' },
  { id: 'ai', icon: '🤖', title: 'AI Movement Prediction', desc: 'Historical pattern data forecasts foundation shift weeks before visible damage', eta: 'Q2 2027' },
  { id: 'water', icon: '💧', title: 'Automated Watering Response', desc: 'Smart irrigation responds to live soil readings — prevents shrink-swell cycles', eta: 'Q2 2027' },
  { id: 'survey', icon: '📐', title: 'Digital Elevation Survey', desc: 'Baseline scan at install plus annual tracking to detect drift over time', eta: 'Q3 2027' },
  { id: 'vault', icon: '🏠', title: 'ProLnk Vault Monitoring Log', desc: 'Every reading, survey, and alert logged — permanent home health record', eta: 'Live Now' },
];

const interests = [
  { label: 'Crack Prevention', match: ['soil', 'water', 'ai'] },
  { label: 'Early Warning System', match: ['ai', 'soil', 'vault'] },
  { label: 'Smart Irrigation', match: ['water', 'soil'] },
  { label: 'Resale Documentation', match: ['survey', 'vault'] },
];

export default function DFWFoundationTech2027Preview2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<typeof technologies | null>(null);

  function handleInterest(interest: typeof interests[0]) {
    setSelected(interest.label);
    setResult(technologies.filter(t => interest.match.includes(t.id)));
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '.25rem' }}>🏗️</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0 0 .5rem' }}>DFW Foundation Technology 2027 Preview</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>What is coming to DFW foundation monitoring by 2027 — clay soil meets AI-powered sensors.</p>

        <h2 style={{ color: '#F5E642', fontSize: '1rem', marginBottom: '1rem' }}>What is your monitoring interest?</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', marginBottom: '2rem' }}>
          {interests.map(i => (
            <button key={i.label} onClick={() => handleInterest(i)}
              style={{ background: selected === i.label ? '#F5E642' : '#1e3a5f', color: selected === i.label ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '.6rem 1.1rem', cursor: 'pointer', fontWeight: 600 }}>
              {i.label}
            </button>
          ))}
        </div>

        {result && (
          <div>
            <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>Your 2027 Foundation Technology Preview</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {result.map(t => (
                <div key={t.id} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1.2rem', borderLeft: '4px solid #F5E642' }}>
                  <div style={{ fontSize: '1.5rem' }}>{t.icon}</div>
                  <div style={{ fontWeight: 700, marginTop: '.4rem' }}>{t.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: '.9rem', marginTop: '.3rem' }}>{t.desc}</div>
                  <div style={{ color: '#F5E642', fontSize: '.8rem', marginTop: '.5rem' }}>ETA: {t.eta}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1.5rem', background: '#F5E64220', borderRadius: 10, padding: '1rem', color: '#F5E642' }}>
              🏠 ProLnk Vault starts your foundation baseline today — every future sensor plugs right in.
            </div>
          </div>
        )}

        {!result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            {technologies.map(t => (
              <div key={t.id} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{t.icon}</span>
                <div>
                  <div style={{ fontWeight: 600 }}>{t.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: '.85rem' }}>{t.desc}</div>
                </div>
                <span style={{ marginLeft: 'auto', color: '#F5E642', fontSize: '.8rem', whiteSpace: 'nowrap' }}>{t.eta}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}