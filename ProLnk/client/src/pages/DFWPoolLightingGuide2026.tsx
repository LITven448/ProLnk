import { useState } from 'react';

export default function DFWPoolLightingGuide2026() {
  const [size, setSize] = useState('');
  const [goal, setGoal] = useState('');

  const sizes = [
    { id: 'small', label: '🏊 Small (< 15,000 gal)' },
    { id: 'medium', label: '🏊 Medium (15-30k gal)' },
    { id: 'large', label: '🏊 Large (30k+ gal)' },
  ];

  const goals = [
    { id: 'replace', label: '💡 Replace Halogen with LED' },
    { id: 'color', label: '🌈 Color-Changing Ambiance' },
    { id: 'feature', label: '⛲ Water Feature Lighting' },
    { id: 'perimeter', label: '🔦 Perimeter + Landscape' },
  ];

  const recs: Record<string, Record<string, { title: string; fixtures: string; savings: string; desc: string; cost: string }>> = {
    small: {
      replace: { title: 'Single LED Replacement', fixtures: '1 × 100W LED', savings: '~$180/yr vs halogen', desc: 'Replace single 500W halogen with Pentair IntelliBrite or Hayward ColorLogic 100W LED. Plug-and-play into existing niche. DFW ERCOT rates avg $0.13/kWh — savings add up fast. Payback: 18-24 months.', cost: '$400-700 installed' },
      color: { title: 'Single Color-Changing LED', fixtures: '1 × Pentair IntelliBrite 5G', savings: '80% less energy', desc: 'Full RGB color-changing in existing niche. 12 fixed colors + color-sync mode. Controlled via Pentair app or manual switch flicks. DFW staple for backyard entertainment. Most popular pool upgrade 2024.', cost: '$600-900 installed' },
      feature: { title: 'Fiber Optic Accent Kit', fixtures: 'Fiber bundle + illuminator', savings: 'Safe: no electricity in water', desc: 'Fiber optic is ideal for small water features (bubblers, deck jets, sheer descent). No electricity enters water — safest option. DFW parents love this for kid-friendly safety. Illuminator box stays above water line.', cost: '$1,500-3,500′ },
      perimeter: { title: 'LED Step + Niche Lights', fixtures: '4-6 step lights + 1 pool LED', savings: 'Low voltage = low cost', desc: '12V LED step lights around DFW pool perimeter. Timer or photocell control. Dramatically improves safety and nighttime ambiance. Combine with underwater LED for full effect.', cost: '$800-2,000′ },
    },
    medium: {
      replace: { title: 'Dual LED Upgrade', fixtures: '2 × 100W LED', savings: '~$360/yr vs halogen', desc: 'Two-fixture pools: replace both halogens simultaneously. Labor is nearly the same for one vs two. DFW summer: pools run lights 4-5 hrs/night. Annual savings justify upgrade in under 2 years.', cost: '$800-1,400 installed' },
      color: { title: 'Synchronized Color System', fixtures: '2-3 × Color LED', savings: '80% less energy', desc: 'Multiple color-changing LEDs synchronized via Jandy or Pentair automation. All lights change color together for stunning DFW backyard effect. Pair with smart home integration (Alexa, Google Home).', cost: '$1,500-2,500 installed' },
      feature: { title: 'Feature LED + Fiber Combo', fixtures: '2 pool LED + fiber bundle', savings: 'Safest setup', desc: 'Underwater LED for pool body, fiber optic for water features (deck jets, sheer descents, bubblers). DFW luxury standard. Different light sources create layered effect at night.', cost: '$3,000-6,000′ },
      perimeter: { title: 'Full Perimeter System', fixtures: '8-12 step + 2 pool LED', savings: 'Low voltage throughout', desc: '12V LED pathway, step, and coping lights around full medium pool perimeter. Kichler or FX Luminaire for DFW outdoor use. Timer/photocell + smart control. Transforms evening entertaining.', cost: '$2,500-5,000′ },
    },
    large: {
      replace: { title: 'Multi-Fixture LED Overhaul', fixtures: '3-4 × 100W LED', savings: '$500-700/yr vs halogen', desc: 'Large DFW pools often have 3-4 original halogens. Full LED replacement is most impactful ERCOT bill reduction. Coordinate with pool automation upgrade — Pentair IntelliCenter integrates lighting perfectly.', cost: '$1,500-2,800 installed' },
      color: { title: 'Smart Automation Color System', fixtures: '3-4 × RGB LED + controller', savings: '80% energy + automation', desc: 'Full Pentair/Jandy smart lighting with app control. Create scenes: party mode, romance mode, DFW Cowboys blue. Schedule sunrise/sunset on/off. Voice control via smart home hub. Top luxury upgrade for large DFW pools.', cost: '$3,000-6,000 installed' },
      feature: { title: 'Resort-Style Feature Lighting', fixtures: 'Full fiber + 4 LED', savings: 'Safest + most dramatic', desc: 'Multiple fiber optic zones for every water feature (waterfalls, grottos, bubblers, jets) plus color-sync LED for pool body. DFW resort-style backyard standard. Pairs with audio system and smart pergola lighting.', cost: '$6,000-14,000′ },
      perimeter: { title: 'Full Landscape + Pool Lighting', fixtures: '20+ fixtures total', savings: 'Low voltage, high impact', desc: 'Comprehensive DFW outdoor lighting design: pool LED, step lights, pathway, uplighting on trees and features. FX Luminaire or Kichler 12V system. Single transformer with zone control. Increases home value $15K+ in DFW market.', cost: '$6,000-15,000′ },
    },
  };

  const rec = size && goal ? recs[size]?.[goal] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DFW POOL GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>💡 DFW Pool Lighting Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          LED pool lighting uses 80% less energy than halogen — critical for DFW ERCOT electricity bills averaging $0.13/kWh. Color-changing LED is the #1 luxury pool upgrade in DFW 2024-2026. Fiber optic is safest for water features.
        </p>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, color: '#F5E642′ }}>Pool Size</h2>
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          {sizes.map(s => (
            <button key={s.id} onClick={() => setSize(s.id)} style={{ background: size === s.id ? '#F5E642′ : '#1e2d45', color: size === s.id ? '#0A1628' : '#fff', border: '2px solid' + (size === s.id ? ' #F5E642' : ' #2d3f5a'), borderRadius: 10, padding: '12px 20px', fontSize: 14, fontWeight: 600, cursor: ’pointer' }}>{s.label}</button>
          ))}
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14, color: '#F5E642′ }}>Lighting Goal</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 28 }}>
          {goals.map(g => (
            <button key={g.id} onClick={() => setGoal(g.id)} style={{ background: goal === g.id ? '#F5E642′ : '#1e2d45', color: goal === g.id ? '#0A1628' : '#fff', border: '2px solid' + (goal === g.id ? ' #F5E642' : ' #2d3f5a'), borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 600, cursor: ’pointer', textAlign: 'left' }}>{g.label}</button>
          ))}
        </div>
        {rec && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>RECOMMENDED SETUP</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>✅ {rec.title}</h3>
            <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
              <span style={{ background: '#0A1628', borderRadius: 6, padding: '4px 12px', fontSize: 13, color: '#F5E642', fontWeight: 600 }}>🔦 {rec.fixtures}</span>
              <span style={{ background: '#0A1628', borderRadius: 6, padding: '4px 12px', fontSize: 13, color: '#F5E642', fontWeight: 600 }}>⚡ {rec.savings}</span>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 14 }}>{rec.desc}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 16px', display: 'inline-block', color: '#F5E642', fontWeight: 700, fontSize: 15 }}>💰 {rec.cost}</div>
          </div>
        )}
        <div style={{ marginTop: 24, textAlign: 'center', color: '#475569', fontSize: 13 }}>ProLnk © 2026 — Connecting DFW Homeowners with Pool Pros</div>
      </div>
    </div>
  );
}
