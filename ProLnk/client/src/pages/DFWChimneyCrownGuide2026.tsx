import { useState } from 'react';

export default function DFWChimneyCrownGuide2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const situations = [
    { label: 'Crown has visible cracks', guide: 'North DFW (Frisco, McKinney, Allen): freeze-thaw cycles crack crowns regularly. South DFW (Mansfield, Cedar Hill): heat expansion dominant. Hairline cracks: crown coat sealant ($15–$30 DIY) — apply to clean dry crown, 2 coats. Wide cracks (>1/4 inch): full crown replacement $400–$900. Do not delay — water enters cracks, expands, widens damage each winter.' },
    { label: 'Crown coat vs replacement — which do I need?', guide: 'Crown coat: for crowns structurally sound but surface-cracked or porous. Elastomeric formula bridges hairline cracks and waterproofs. Lasts 15+ years if applied correctly. Replacement: required when crown is spalling (pieces falling off), has large cracks through full depth, or is installed with wrong slope (must slope away from flue). Wrong crown slope = water pools at flue = accelerated damage.' },
    { label: 'Water stains inside fireplace or on ceiling', guide: 'Crown failure is the most common cause of interior water damage from chimneys. Trace the path: water enters failed crown → travels down inside masonry → exits at smoke shelf or firebox → saturates framing and drywall. Cost if ignored: $3,000–$8,000 interior repair. Cost to fix crown now: $400–$900. Fix crown first before treating interior stains.' },
    { label: 'Chimney cap vs chimney crown — what is the difference?', guide: 'Crown: the concrete or mortar slab that covers the top of the chimney masonry around the flue tile. Prevents water from entering the masonry. Cap: the metal cover that sits on top of the flue opening. Prevents rain, animals, and debris from entering the flue. Both are needed. A cap without a good crown still allows masonry water damage. A crown without a cap allows animal nesting and rain directly down the flue.' },
    { label: 'Chimney crown looks OK but getting water damage', guide: 'If crown appears intact but water still intrudes: check chimney cap seal (gap between cap and flue tile), inspect mortar joints between brick courses (repoint if gaps visible), look for cracks in chase cover if factory-built fireplace, and verify flashing where chimney meets roof is sealed. Each of these is a separate water entry point — crown is only one of five.' },
    { label: 'DIY crown repair feasibility', guide: 'DIY crown coat: yes, moderate difficulty. Requires: wire brush cleaning, crown coat product ($20–$40), caulk gun for large cracks, and dry weather (48 hours). DFW tip: apply in fall or spring — summer heat causes crown coat to dry too fast and not bond correctly. Crown replacement: not DIY — requires mortar mix knowledge, proper slope forming, and working at height safely.' },
  ];

  const handle = () => {
    const match = situations.find(s => s.label === situation);
    setResult(match ? match.guide : 'Select a chimney crown situation to get your repair guide.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Chimney Crown Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>The chimney crown is the first line of defense against $3,000+ interior water damage. DFW heat and north DFW freeze cycles attack crowns differently — know your zone.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🧱', title: 'What is a Crown?', desc: 'Concrete or mortar slab covering masonry around flue tile. Slopes away from flue to drain water off chimney top.' },
            { icon: '🏔️', title: 'North vs South DFW', desc: 'North DFW: freeze-thaw crack cycles. South DFW: heat expansion dominant. Both zones need annual inspection.' },
            { icon: '💧', title: 'Water Damage Risk', desc: 'Failed crown → $3,000–$8,000 interior damage. Crown repair: $400–$900. Crown coat: $15–$30 DIY. Act early.' },
            { icon: '🦺', title: 'Cap vs Crown', desc: 'Cap covers flue opening (blocks animals + rain). Crown covers masonry (blocks water from entering brickwork). Need both.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#1e3a5f', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 6 }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Chimney Crown Repair Guide</h2>
          <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #2d4a7a', marginBottom: 12, fontSize: 15 }}>
            <option value="">Select your chimney crown situation...</option>
            {situations.map(s => <option key={s.label} value={s.label}>{s.label}</option>)}
          </select>
          <button onClick={handle} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Get Repair Guide →</button>
          {result && <div style={{ marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 8, color: '#e2e8f0', lineHeight: 1.7 }}>{result}</div>}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📅 DFW Crown Inspection Schedule</div>
          <ul style={{ color: '#94a3b8', fontSize: 14, lineHeight: 2, margin: 0, paddingLeft: 20 }}>
            <li>Annual inspection: best in October before north DFW freeze season</li>
            <li>After hailstorm: hail chips crown surface — inspect for spalling</li>
            <li>After hard freeze: check for new crown cracks from freeze-thaw</li>
            <li>Crown coat reapplication: every 5–7 years or when cracking returns</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
