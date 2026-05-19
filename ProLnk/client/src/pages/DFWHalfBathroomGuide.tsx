import { useState } from 'react';

const styles = {
  small: { sqft: '20-35 sq ft', typical: 'Half bath / powder room' },
  medium: { sqft: '36-50 sq ft', typical: 'Standard powder room' },
  large: { sqft: '51-70 sq ft', typical: 'Oversized powder room' },
};

const budgetRanges: Record<string, Record<string, string>> = {
  small: { economy: '$3,500–$6,000', mid: '$6,000–$10,000', luxury: '$10,000–$18,000′ },
  medium: { economy: '$5,000–$8,000', mid: '$8,000–$14,000', luxury: '$14,000–$25,000′ },
  large: { economy: '$7,000–$11,000', mid: '$11,000–$18,000', luxury: '$18,000–$35,000′ },
};

const styleRecs: Record<string, { design: string; vanity: string; lighting: string; wallTreatment: string }> = {
  modern: {
    design: 'Floating vanity with vessel sink, frameless mirror, matte black fixtures',
    vanity: 'Wall-mounted single-sink vanity (Restoration Hardware or CB2)',
    lighting: 'Linear LED sconce above mirror — eliminates DFW shadows',
    wallTreatment: 'Large-format porcelain tile or painted accent wall',
  },
  traditional: {
    design: 'Pedestal sink with decorative mirror, classic wainscoting, polished chrome',
    vanity: 'Console or pedestal sink (Kohler Memoirs or American Standard)',
    lighting: 'Vintage-style globe vanity light bar',
    wallTreatment: 'Grasscloth wallpaper or painted beadboard wainscoting',
  },
  bold: {
    design: 'Statement wallpaper from floor to ceiling, dramatic pendant, bold vanity color',
    vanity: 'Rich jewel-toned or black vanity with gold hardware',
    lighting: 'Single pendant or chandelier — DFW buyers love the drama',
    wallTreatment: 'Designer wallpaper (Schumacher, Cole & Son) — full room coverage',
  },
};

export default function DFWHalfBathroomGuide() {
  const [size, setSize] = useState('');
  const [style, setStyle] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<null | { design: string; vanity: string; lighting: string; wallTreatment: string; cost: string }>(null);

  function calculate() {
    if (!size || !style || !budget) return;
    const rec = styleRecs[style];
    const cost = budgetRanges[size][budget];
    setResult({ ...rec, cost });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#E8E8E8', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🛁</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Half Bathroom Renovation Guide</h1>
          <p style={{ color: '#9AA5B4', fontSize: 16 }}>Powder rooms punch above their weight — DFW buyers judge your whole home by this small space.</p>
        </div>

        <div style={{ backgroundColor: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>💡 Why Your Powder Room Matters in DFW</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['DFW buyers form impressions in under 8 seconds — powder rooms are often the first interior bathroom they see','Small footprint means full luxury materials at fraction of whole-bath cost','Statement wallpaper, bold vanity, and dramatic lighting cost $800–$2,000 but add perceived value of $8,000+','DFW resale market rewards updated powder rooms in homes over $400K'].map(tip => (
              <li key={tip} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: '#F5E642′ }}>✓</span>
                <span style={{ color: '#CBD5E0', fontSize: 14 }}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ backgroundColor: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20 }}>🔧 Design Configurator</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9AA5B4', marginBottom: 8, fontSize: 14 }}>Powder Room Size</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {Object.entries(styles).map(([key, val]) => (
                <button key={key} onClick={() => setSize(key)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: size === key ? '#F5E642′ : '#1E3A5F', backgroundColor: size === key ? '#F5E6421A' : ’transparent', color: size === key ? '#F5E642′ : '#9AA5B4', cursor: ’pointer', fontSize: 13 }}>
                  {val.sqft} — {val.typical}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9AA5B4', marginBottom: 8, fontSize: 14 }}>Design Style</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[['modern','🏙️ Modern / Minimalist'],['traditional','🏛️ Traditional / Classic'],['bold','🎨 Bold / Statement']].map(([key, label]) => (
                <button key={key} onClick={() => setStyle(key)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: style === key ? '#F5E642′ : '#1E3A5F', backgroundColor: style === key ? '#F5E6421A' : ’transparent', color: style === key ? '#F5E642′ : '#9AA5B4', cursor: ’pointer', fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#9AA5B4', marginBottom: 8, fontSize: 14 }}>Budget Range</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[['economy','💰 Economy'],['mid','💎 Mid-Range'],['luxury','👑 Luxury']].map(([key, label]) => (
                <button key={key} onClick={() => setBudget(key)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: budget === key ? '#F5E642′ : '#1E3A5F', backgroundColor: budget === key ? '#F5E6421A' : ’transparent', color: budget === key ? '#F5E642′ : '#9AA5B4', cursor: ’pointer', fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={calculate}
            style={{ width: '100%', padding: '14px', backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, borderRadius: 8, border: 'none', cursor: 'pointer' }}>
            Get My Design Recommendation →
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: '#1E3A5F', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>✨ Your DFW Powder Room Plan</h3>
            {[['🎨 Design Concept', result.design],['🪞 Vanity Recommendation', result.vanity],['💡 Lighting Plan', result.lighting],['🖼️ Wall Treatment', result.wallTreatment],['💵 Estimated DFW Cost', result.cost]].map(([label, value]) => (
              <div key={label as string} style={{ marginBottom: 14 }}>
                <div style={{ color: '#9AA5B4', fontSize: 12, marginBottom: 4 }}>{label}</div>
                <div style={{ color: '#E8E8E8', fontSize: 15 }}>{value as string}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
