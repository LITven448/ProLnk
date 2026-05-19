import { useState } from 'react';

export default function DFWBathroomFaucetGuide2026() {
  const [vanityType, setVanityType] = useState('single');
  const [budget, setBudget] = useState('mid');
  const [result, setResult] = useState('');

  const getRecommendation = () => {
    if (vanityType === 'single' && budget === 'premium') {
      setResult('🚿 Moen Genta Single-Hole — #1 DFW bathroom faucet for hard water longevity. Spot-resist brushed nickel hides DFW calcium water spots. Lifetime cartridge warranty covers mineral damage. Waterfall option available for luxury DFW primary baths.');
    } else if (vanityType === 'single' && budget === 'mid') {
      setResult('🚿 Delta Arvo Single-Hole — Diamond seal ceramic technology lasts 5M+ cycles in DFW hard water. Brushed nickel or matte black finish. No deck plate needed for 1-hole vanity. Descale aerator every 4 months.');
    } else if (vanityType === 'three' && budget === 'premium') {
      setResult('🚿 Kohler Elliston Widespread — 8-inch spread, solid brass body resists DFW mineral buildup. Polished chrome not recommended for DFW hard water (spots visible). Choose brushed gold or nickel for spot resistance.');
    } else if (vanityType === 'three' && budget === 'mid') {
      setResult('🚿 American Standard Studio Widespread — ceramic disc, brass body, 8-inch center set. Changing from 1-hole to 3-hole requires deck plate adapter ($15–30) — measure existing vanity holes before ordering.');
    } else {
      setResult('🚿 Moen Adler Single-Handle — most affordable DFW-rated for hard water, ceramic cartridge, 1 or 3-hole compatible with deck plate. Replace aerator at 12 months in Plano/Frisco hard water zones.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 20, display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🚿 DFW Bathroom Faucet Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 16 }}>Bathroom faucet selection for Dallas-Fort Worth — hard water brand comparison (Moen vs Delta vs Kohler vs American Standard), hole configuration, and finish longevity in 300+ ppm water.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🥇', title: 'Moen — Best DFW Warranty', desc: 'Lifetime warranty explicitly covers cartridge failure from mineral buildup. Top pick for DFW 300+ ppm zones (Frisco, Plano, McKinney).' },
            { icon: '💠', title: 'Delta — Diamond Seal Tech', desc: 'Ceramic disc rated 5M+ cycles — outlasts competitors in DFW hard water. Spot-resist finish is real differentiator in hard water areas.' },
            { icon: '🏅', title: 'Kohler — Solid Brass Bodies', desc: 'Best brass construction quality in mid-range. Avoid chrome in DFW — choose brushed gold, nickel, or matte black to hide calcium water spots.' },
            { icon: '🔩', title: '1-Hole vs 3-Hole', desc: 'Changing configurations requires deck plate adapter. Measure your vanity before ordering — most DFW builder homes have 3-hole, modern vanities have 1-hole.' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#1a2840', borderRadius: 12, padding: '20px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642′ }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2840', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🔍 Find Your DFW Bathroom Faucet</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Vanity Hole Configuration</label>
            <select value={vanityType} onChange={e => setVanityType(e.target.value)} style={{ width: '100%', padding: '12px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
              <option value="single">Single-Hole (modern vanity, 1 hole)</option>
              <option value="three">3-Hole Widespread (8-inch center, traditional DFW builder)</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Budget</label>
            <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '12px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
              <option value="premium">Premium ($200+)</option>
              <option value="mid">Mid-Range ($75–$199)</option>
              <option value="budget">Budget (Under $75)</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '14px 28px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>Get My DFW Recommendation →</button>
          {result && <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 18, color: '#F5E642', fontWeight: 600, fontSize: 15 }}>{result}</div>}
        </div>

        <div style={{ background: '#1a2840', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8 }}>Need a DFW plumber to install your bathroom faucet?</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>⚡ ProLnk connects you with vetted DFW plumbers in under 60 seconds</div>
        </div>
      </div>
    </div>
  );
}
