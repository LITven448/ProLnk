import { useState } from 'react';

const options = [
  { id: 'epoxy', label: 'Epoxy Coating', icon: '🪣', cost: '$3–$12/sqft', note: 'Avoid DFW summer install — heat kills adhesion. Prep is 70% of success.' },
  { id: 'polyaspartic', label: 'Polyaspartic Coating', icon: '⚡', cost: '$6–$14/sqft', note: 'Fast cure, UV stable — best for DFW summer application.' },
  { id: 'tiles', label: 'Interlocking Tiles', icon: '🔲', cost: '$2–$6/sqft', note: 'No prep needed. Great DFW DIY option. Removable if needed.' },
  { id: 'stain', label: 'Concrete Stain', icon: '🎨', cost: '$1–$4/sqft', note: 'Color without thickness. Must seal for DFW weather resistance.' },
];

const situations = ['Daily driver parking', 'Workshop/hobby space', 'High-traffic storage', 'Show garage / aesthetics'];
const budgets = ['Under $500', '$500–$2,000', '$2,000–$5,000', '$5,000+'];

const recommend = (sit: string, bud: string) => {
  if (bud === 'Under $500') return options[2];
  if (sit === 'Show garage / aesthetics') return options[1];
  if (sit === 'Workshop/hobby space') return options[1];
  if (bud === '$500–$2,000') return options[3];
  return options[0];
};

export default function DFWGarageFloorCoatingGuide2026() {
  const [sit, setSit] = useState('');
  const [bud, setBud] = useState('');
  const rec = sit && bud ? recommend(sit, bud) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🏗️ DFW Garage Floor Coating Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>DFW heat and humidity demand the right floor coating. Epoxy can bubble in 100°F+ summers — know before you coat.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {options.map(o => (
            <div key={o.id} style={{ background: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 24 }}>{o.icon}</div>
              <div style={{ fontWeight: 700, marginTop: 6 }}>{o.label}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginTop: 4 }}>{o.cost}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 6 }}>{o.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🔍 Find Your Best Option</h2>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, marginBottom: 8, color: '#94a3b8' }}>Your garage situation:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {situations.map(s => (
                <button key={s} onClick={() => setSit(s)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: sit === s ? '#F5E642' : '#1e3a5f', color: sit === s ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>{s}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, marginBottom: 8, color: '#94a3b8' }}>Budget:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {budgets.map(b => (
                <button key={b} onClick={() => setBud(b)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: bud === b ? '#F5E642' : '#1e3a5f', color: bud === b ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>{b}</button>
              ))}
            </div>
          </div>
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginTop: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>✅ Recommended: {rec.icon} {rec.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{rec.note}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginTop: 8 }}>Estimated cost: {rec.cost}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#112240', borderRadius: 10 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⚠️ DFW Climate Tips</div>
          <ul style={{ color: '#94a3b8', fontSize: 13, paddingLeft: 18, lineHeight: 1.8 }}>
            <li>Never apply epoxy when temps exceed 90°F — adhesion fails</li>
            <li>Best window: March–April or October–November in DFW</li>
            <li>Moisture vapor test required before any coating in DFW</li>
            <li>Polyaspartic coatings cure in 1 hour — DFW summer-safe</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
