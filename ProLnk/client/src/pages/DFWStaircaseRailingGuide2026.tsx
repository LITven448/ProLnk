import { useState } from 'react';

const styles = [
  { label: 'Traditional DFW', value: 'trad' },
  { label: 'Modern / Contemporary', value: 'modern' },
  { label: 'Luxury / High-End', value: 'luxury' },
  { label: 'Budget-Conscious', value: 'budget' },
];

const budgets = [
  { label: 'Under $2,000', value: 'low' },
  { label: '$2,000 – $5,000', value: 'mid' },
  { label: '$5,000+', value: 'high' },
];

const recs = {
  trad: { low: 'Wood Balusters (Stained)', mid: 'Wood Balusters (Painted + Box Newel Posts)', high: 'Iron Balusters + Stained Wood Rail + Box Newel Posts' },
  modern: { low: 'Iron/Metal Balusters (Square Profile)', mid: 'Cable Railing (verify HOA)', high: 'Glass Panel Railing + Stainless Hardware' },
  luxury: { low: 'Iron Balusters + Hardwood Rail', mid: 'Glass Panels + Hardwood Cap Rail', high: 'Full Glass or Cable + Custom Newel Posts + LED Under-Rail Lighting' },
  budget: { low: 'Painted Wood Balusters (Builder Grade)', mid: 'Upgrade to Painted Iron Balusters Only', high: 'Iron Balusters + Stained Rail — Best ROI Upgrade' },
};

const typeInfo = [
  { type: 'Wood Balusters', icon: '🪵', desc: 'Classic DFW look, especially in traditional and colonial styles. Oak and pine most common. Easy to paint or stain. Dominant in pre-2015 DFW builds.' },
  { type: 'Iron / Metal Balusters', icon: '🔩', desc: 'Most popular upgrade in DFW since 2015. Wrought iron balusters add perceived value without dramatic cost. Mix with wood rail for a transitional look.' },
  { type: 'Glass Panels', icon: '🔷', desc: 'Premium DFW option — frameless or semi-frameless. Excellent in contemporary and luxury homes in Southlake, Westlake, Highland Park. Requires professional install.' },
  { type: 'Cable Railing', icon: '🔗', desc: 'Contemporary DFW trend — horizontal stainless cables. HOA review required in many DFW communities. Great for open, airy stair feel. Tensioning maintenance needed every 2–3 years.' },
];

const CODE = 'DFW code requires balusters spaced no more than 4 inches apart (a 4-inch sphere cannot pass through). Rail height: 34–38 inches for stairs, 36–42 inches for landings. Always verify with local municipality — some DFW cities have stricter requirements.';

export default function DFWStaircaseRailingGuide2026() {
  const [style, setStyle] = useState(null);
  const [budget, setBudget] = useState(null);

  const rec = style && budget ? recs[style][budget] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏛️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Staircase Railing Guide 2026</h1>
          <p style={{ color: '#aaa', fontSize: 14 }}>Wood, iron, glass, cable — the right railing for every DFW home style and budget</p>
        </div>

        <div style={{ background: '#162035', border: '1px solid #F5E64240', borderRadius: 10, padding: 16, marginBottom: 24, fontSize: 13, color: '#ccc' }}>
          📏 <strong style={{ color: '#F5E642' }}>DFW Code: </strong>{CODE}
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Home Style</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {styles.map((s) => (
              <button key={s.value} onClick={() => setStyle(s.value)}
                style={{ background: style === s.value ? '#F5E642' : '#162035', color: style === s.value ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600 }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Budget</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {budgets.map((b) => (
              <button key={b.value} onClick={() => setBudget(b.value)}
                style={{ background: budget === b.value ? '#F5E642' : '#162035', color: budget === b.value ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 600 }}>
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {rec ? (
          <div style={{ background: '#162035', border: '2px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>Recommended: {rec}</h2>
            <p style={{ color: '#aaa', fontSize: 13 }}>Based on your DFW home style and budget selection.</p>
          </div>
        ) : (
          <div style={{ background: '#162035', borderRadius: 12, padding: 24, textAlign: 'center', color: '#888', marginBottom: 24 }}>
            Select home style and budget above for a DFW railing recommendation.
          </div>
        )}

        <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: 12 }}>Railing Type Breakdown</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {typeInfo.map((t) => (
            <div key={t.type} style={{ background: '#162035', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{t.icon} {t.type}</div>
              <div style={{ color: '#ccc', fontSize: 13, lineHeight: 1.6 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        <p style={{ color: '#555', fontSize: 12, textAlign: 'center', marginTop: 32 }}>ProLnk DFW Home Intelligence • prolnk.io</p>
      </div>
    </div>
  );
}
