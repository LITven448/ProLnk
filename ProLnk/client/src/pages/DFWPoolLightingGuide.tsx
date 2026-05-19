import { useState } from 'react';

const lightingRecs = [
  { poolType: 'inground', goal: 'safety', rec: 'LED underwater lights (white) + perimeter path lighting', system: 'Pentair IntelliBrite or Hayward ColorLogic — 12V white LED', install: '$800–$2,000', smart: 'Basic timer, integrates with pool automation controllers' },
  { poolType: 'inground', goal: 'ambiance', rec: 'Color-changing LED submersible + landscape uplighting', system: 'Hayward ColorLogic 4.0 or Pentair IntelliBrite 5G color LED', install: '$1,500–$4,000', smart: 'Pentair Intellicenter or OmniLogic app control — schedule light shows' },
  { poolType: 'inground', goal: 'entertainment', rec: 'Full color LED system + LED landscape + string lighting', system: 'Zodiac iAquaLink + ColorLogic + Kichler landscape system', install: '$3,000–$8,000', smart: 'Full smart home integration — Alexa, Google Home, app control' },
  { poolType: 'above_ground', goal: 'safety', rec: 'Submersible magnetic LED light + deck solar lights', system: 'Intex or Hayward above-ground submersible LED', install: '$100–$400', smart: 'Basic remote or timer' },
  { poolType: 'above_ground', goal: 'ambiance', rec: 'Color LED submersible + patio string lights + solar stake lights', system: 'Bestway Flowclear color LED or similar', install: '$200–$800', smart: 'App-controlled strip lights for deck perimeter' },
  { poolType: 'spa_only', goal: 'ambiance', rec: 'Fiber optic or LED color light in spa shell + perimeter lighting', system: 'Fiber optic bundle for visual wow effect — no electricity in water', install: '$600–$2,500', smart: 'Remote color wheel control or smart system' },
];

export default function DFWPoolLightingGuide() {
  const [poolType, setPoolType] = useState('');
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState<typeof lightingRecs[0] | null>(null);

  function calculate() {
    const match = lightingRecs.find(r => r.poolType === poolType && r.goal === goal)
      || lightingRecs.find(r => r.poolType === poolType)
      || lightingRecs[1];
    setResult(match);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>💡</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Pool Lighting Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          In DFW, peak pool season starts at dusk — it's simply too hot to swim during the afternoon in July and August.
          That means pool lighting isn't a luxury, it’s the difference between a pool that gets used and one that sits dark
          after 7pm. The right system transforms your pool into the centerpiece of your DFW outdoor experience.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>🌅 Why DFW Pool Lighting Matters More Than Anywhere</h2>
          {[
            ['⏰ Evening Swimming', 'DFW swimmers typically enter the pool after 7–8pm in peak summer. Lighting extends the usable window by 4+ hours.'],
            ['🎉 Entertaining Value', 'A lit pool draws guests outdoors at night — when DFW temps finally drop below 90°F. It\’s the social anchor of every DFW backyard party.'],
            ['🏡 Resale Premium', 'DFW real estate appraisers note that well-lit, well-maintained pools add $30,000–$80,000 in perceived value depending on neighborhood.'],
            ['🔒 Safety Requirement', 'All swimmers — adults and children — need to see the pool bottom clearly at night. Safety lighting is non-negotiable, not optional.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{(title as string).substring(0, 2)}</span>
              <div>
                <p style={{ color: '#fff', fontWeight: 700, margin: '0 0 4px', fontSize: 14 }}>{(title as string).substring(2)}</p>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: 13, lineHeight: 1.5 }}>{desc as string}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>💎 LED vs Fiber Optic Comparison</h2>
          {[
            { type: 'LED Color-Changing', best: 'Inground pools, spas, water features', brightness: 'Excellent — full pool illumination', energy: 'Very low — 15–40W per fixture', smart: 'Yes — app, voice, and schedule control', cost: '$800–$4,000′ },
            { type: 'Fiber Optic', best: 'Spas, specialty features, ceiling/rock accents', brightness: 'Good — visual drama over brightness', energy: 'Minimal — illuminator box only', smart: 'Color wheel remote or smart illuminator', cost: '$600–$2,500′ },
            { type: 'Halogen (Legacy)', best: 'Replacement of older systems only', brightness: 'Good — single color white', energy: 'High — 300–500W per fixture', smart: 'No smart control available', cost: '$200–$800′ },
          ].map(({ type, best, brightness, energy, smart, cost }) => (
            <div key={type} style={{ borderBottom: '1px solid #1e3a5f', paddingBottom: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{type}</span>
                <span style={{ color: '#22c55e', fontSize: 13, fontWeight: 600 }}>{cost}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {[['Best For', best], ['Brightness', brightness], ['Energy Use', energy], ['Smart Control', smart]].map(([k, v]) => (
                  <div key={k as string}>
                    <span style={{ color: '#64748b', fontSize: 11, textTransform: 'uppercase' }}>{k}</span>
                    <p style={{ color: '#cbd5e1', fontSize: 13, margin: '2px 0 0′ }}>{v as string}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>🔧 Get Your Lighting Recommendation</h2>
          {[
            { label: 'Pool Type', value: poolType, setter: setPoolType, options: [['inground', 'Inground Pool'], ['above_ground', 'Above Ground Pool'], ['spa_only', 'Spa / Hot Tub Only']] },
            { label: 'Primary Lighting Goal', value: goal, setter: setGoal, options: [['safety', 'Safety First'], ['ambiance', 'Ambiance & Atmosphere'], ['entertainment', 'Full Entertainment Setup']] },
          ].map(({ label, value, setter, options }) => (
            <div key={label} style={{ marginBottom: 18 }}>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 8 }}>{label}</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {options.map(([val, text]) => (
                  <button key={val} onClick={() => setter(val)} style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid', borderColor: value === val ? '#F5E642′ : '#1e3a5f', background: value === val ? '#F5E642' : ’transparent', color: value === val ? '#0A1628′ : '#94a3b8', cursor: ’pointer', fontSize: 13, fontWeight: value === val ? 700 : 400 }}>{text}</button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', marginTop: 8 }}>Get My Lighting System →</button>
        </div>

        {result && (
          <div style={{ background: '#0f2a1a', border: '1px solid #22c55e', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#22c55e', marginBottom: 12 }}>✅ Your DFW Pool Lighting Recommendation</h3>
            <p style={{ color: '#fff', fontWeight: 700, marginBottom: 6 }}>{result.rec}</p>
            <p style={{ color: '#94a3b8', marginBottom: 6, fontSize: 14 }}>System: {result.system}</p>
            <p style={{ color: '#22c55e', fontWeight: 700, fontSize: 18, marginBottom: 6 }}>Installation: {result.install}</p>
            <p style={{ color: '#F5E642', fontSize: 14 }}>Smart Control: {result.smart}</p>
          </div>
        )}
      </div>
    </div>
  );
}
