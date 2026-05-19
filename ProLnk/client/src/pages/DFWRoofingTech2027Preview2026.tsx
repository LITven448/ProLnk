import { useState } from 'react';

const technologies = [
  { id: 'drone', icon: '🚁', title: 'Drone Post-Storm Assessment', desc: 'Full roof documented before you get home — automated dispatch after hail events', eta: 'Q1 2027' },
  { id: 'class5', icon: '🛡️', title: 'Class 5 Impact Shingles', desc: 'Beyond current Class 4 — next-gen impact resistance arriving in DFW market', eta: 'Q3 2027' },
  { id: 'solar', icon: '☀️', title: 'Integrated Solar Shingles', desc: 'Installed cost dropping toward conventional roofing — DFW sun economics work', eta: 'Q2 2027' },
  { id: 'ai', icon: '🤖', title: 'AI Damage Assessment', desc: 'Upload photos — instant damage estimate before the adjuster arrives', eta: 'Q1 2027' },
  { id: 'vault', icon: '🏠', title: 'ProLnk Vault Hail Event Documentation', desc: 'Automatic hail event records tied to your address — forever', eta: 'Live Now' },
];

const interests = [
  { label: 'Hail Damage Protection', match: ['drone', 'class5', 'ai', 'vault'] },
  { label: 'Solar + Roofing Bundle', match: ['solar', 'vault'] },
  { label: 'Insurance Claims', match: ['drone', 'ai', 'vault'] },
  { label: 'Maximum Durability', match: ['class5', 'drone'] },
];

export default function DFWRoofingTech2027Preview2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<typeof technologies | null>(null);

  function handleInterest(interest: typeof interests[0]) {
    setSelected(interest.label);
    setResult(technologies.filter(t => interest.match.includes(t.id)));
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '.25rem' }}>🏠</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0 0 .5rem' }}>DFW Roofing Technology 2027 Preview</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>What is coming to DFW roofing by 2027 — drones, Class 5, solar shingles, and AI damage AI.</p>

        <h2 style={{ color: '#F5E642', fontSize: '1rem', marginBottom: '1rem' }}>What interests you most?</h2>
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
            <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>Your 2027 Roofing Technology Preview</h2>
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
              🏠 ProLnk Vault records every hail event at your address automatically — your roof history builds itself.
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