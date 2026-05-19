import { useState } from 'react';

export default function DFWBathtubGuide2026() {
  const [homeSize, setHomeSize] = useState('large');
  const [stylePriority, setStylePriority] = useState('luxury');
  const [result, setResult] = useState('');

  const getRecommendation = () => {
    if (stylePriority === 'luxury' && homeSize === 'large') {
      setResult('Freestanding Acrylic Soaker: DFW luxury trend 2024-2026. Requires structural floor reinforcement (150-200 lb when filled). Acrylic flexes with DFW foundation movement better than cast iron. Add floor drain for DFW clay soil moisture shifts.');
    } else if (stylePriority === 'luxury' && homeSize === 'small') {
      setResult('Alcove Soaker Upgrade: 60x30 inch alcove with deeper 18-inch soak depth. Acrylic over fiberglass for DFW foundation flex. Freestanding not recommended for smaller DFW homes without structural assessment.');
    } else if (stylePriority === 'value') {
      setResult('Alcove Acrylic (Builder Grade): standard DFW 60x30 alcove, 5-year acrylic surface, easiest to install in existing DFW framing. Replace caulk annually due to DFW foundation micro-movement.');
    } else {
      setResult('Drop-In Cast Iron Soaker: best acoustics, holds heat longest, weighs 300-500 lbs. DFW pier-and-beam homes need structural engineer sign-off. Slab homes with reinforced concrete usually fine.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 20, display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Bathtub Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 16 }}>Bathtub selection for Dallas-Fort Worth homes. Freestanding luxury trend, foundation movement, structural requirements, and material comparison.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'FOUNDATION', title: 'DFW Foundation Movement', desc: 'DFW clay soil expands and contracts seasonally. Acrylic flexes with movement while cast iron and tile crack grout lines.' },
            { label: 'WEIGHT', title: 'Freestanding Weight', desc: 'Filled cast iron freestanding equals 500+ lbs. DFW slab homes OK, pier-and-beam require structural assessment before install.' },
            { label: 'TREND', title: 'DFW Luxury Trend', desc: 'Freestanding soakers are the #1 primary bath upgrade in DFW luxury remodels 2024-2026. Oval acrylic most popular.' },
            { label: 'STANDARD', title: 'Alcove Standard', desc: '60x30 inch alcove is DFW builder standard since 1990s. Upgrading to 60x32 adds soaking depth without structural change.' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#1a2840', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642', fontSize: 12 }}>{c.label}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2840', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>Find Your DFW Bathtub</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Home Size</label>
            <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ width: '100%', padding: 12, background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
              <option value="large">Large (2,500+ sq ft, primary bath 100+ sq ft)</option>
              <option value="small">Small or Medium (under 2,500 sq ft, standard bath)</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Priority</label>
            <select value={stylePriority} onChange={e => setStylePriority(e.target.value)} style={{ width: '100%', padding: 12, background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
              <option value="luxury">Luxury and Resale Value</option>
              <option value="value">Value and Easy Install</option>
              <option value="acoustic">Best Acoustic and Heat Retention</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '14px 28px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>Get My DFW Recommendation</button>
          {result && <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 18, color: '#F5E642', fontWeight: 600, fontSize: 15 }}>{result}</div>}
        </div>

        <div style={{ background: '#1a2840', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8 }}>Need a DFW plumber for bathtub installation?</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>ProLnk connects you with vetted DFW plumbers in under 60 seconds</div>
        </div>
      </div>
    </div>
  );
}

