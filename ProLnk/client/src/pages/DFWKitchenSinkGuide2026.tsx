import { useState } from 'react';

export default function DFWKitchenSinkGuide2026() {
  const [kitchenType, setKitchenType] = useState('modern');
  const [sinkPriority, setSinkPriority] = useState('looks');
  const [result, setResult] = useState('');

  const getRecommendation = () => {
    if (kitchenType === 'modern' && sinkPriority === 'looks') {
      setResult('🪣 Undermount Composite Granite — dominates DFW quartz counter kitchens. Silgranit or Blanco composite in gray/white matches DFW design trends. Zero rim collect water/debris, easier cleanup on quartz surface.');
    } else if (kitchenType === 'modern' && sinkPriority === 'sound') {
      setResult('🪣 Undermount 16-Gauge Stainless — heavy gauge dampens DFW hard water sound. Add sound-deadening pads. Undermount stays flush with quartz — most popular DFW kitchen remodel combo since 2022.');
    } else if (kitchenType === 'traditional' && sinkPriority === 'durability') {
      setResult('🪣 Cast Iron Undermount — heaviest (140 lbs), quietest, holds up to DFW hard water without staining. Requires cabinet reinforcement. White enamel hides mineral deposits better than stainless in DFW high-use kitchens.');
    } else {
      setResult('🪣 Drop-In Stainless (18-Gauge) — most affordable DFW install, works with any counter. 18-gauge dents — upgrade to 16-gauge for DFW active kitchens. Rim collects debris but simple caulk maintenance.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 20, display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DFW PLUMBING GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🪣 DFW Kitchen Sink Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 16 }}>Kitchen sinks for Dallas-Fort Worth homes — undermount dominates DFW quartz kitchens, composite granite is the DFW color-match favorite, cast iron leads on acoustics.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🏆', title: 'Undermount Dominates DFW', desc: '85%+ of DFW kitchen remodels with quartz counters use undermount. No rim, cleaner look, easier quartz cleaning.' },
            { icon: '💎', title: 'Composite Granite DFW Favorite', desc: 'Silgranit and Blanco composite match DFW gray/white quartz trends. Resists DFW hard water mineral staining better than stainless.' },
            { icon: '🔊', title: 'Stainless Gauge Matters', desc: '16-gauge stainless is DFW standard — 18-gauge dents in high-use kitchens. Sound deadening pads reduce drain noise.' },
            { icon: '⚓', title: 'Cast Iron for Acoustics', desc: '140 lbs — quietest sink available. DFW open-plan kitchens benefit from noise reduction. Requires reinforced cabinet base.' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#1a2840', borderRadius: 12, padding: '20px' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642' }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2840', borderRadius: 16, padding: 28, marginBottom: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🔍 Find Your DFW Kitchen Sink</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Kitchen Type</label>
            <select value={kitchenType} onChange={e => setKitchenType(e.target.value)} style={{ width: '100%', padding: '12px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
              <option value="modern">Modern (quartz counters, open plan)</option>
              <option value="traditional">Traditional (laminate or tile counters)</option>
              <option value="budget">Budget Refresh (keeping existing counters)</option>
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Priority</label>
            <select value={sinkPriority} onChange={e => setSinkPriority(e.target.value)} style={{ width: '100%', padding: '12px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
              <option value="looks">Looks & Resale Value</option>
              <option value="sound">Sound Dampening</option>
              <option value="durability">Durability & Low Maintenance</option>
            </select>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '14px 28px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>Get My DFW Recommendation →</button>
          {result && <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 18, color: '#F5E642', fontWeight: 600, fontSize: 15 }}>{result}</div>}
        </div>

        <div style={{ background: '#1a2840', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8 }}>Need a DFW plumber to install your kitchen sink?</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>⚡ ProLnk connects you with vetted DFW plumbers in under 60 seconds</div>
        </div>
      </div>
    </div>
  );
}
