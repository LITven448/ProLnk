import { useState } from 'react';

export default function DFWRoofDeckGuide2026() {
  const [age, setAge] = useState<string>('');
  const [condition, setCondition] = useState<string>('');
  const [assessment, setAssessment] = useState<string>('');

  const getAssessment = () => {
    if (!age || !condition) { setAssessment('Please select both options.'); return; }
    const years = parseInt(age);
    if (condition === 'damaged') setAssessment('🚨 Deck Replacement Required — water-damaged or soft deck boards must be replaced before new shingles. DFW roofers charge $75-120 per sheet of OSB to replace. Get this included in your bid.');
    else if (years >= 20 && condition === 'unknown') setAssessment('🔍 Inspection Recommended — roofs 20+ years old often have hidden deck deterioration in DFW humidity zones (attic condensation, ridge areas). Ask your roofer to probe decking during tear-off.');
    else if (condition === 'good') setAssessment('✅ Deck Likely Salvageable — if no soft spots or water staining found during tear-off, existing deck can remain. Consider ZIP System overlay ($0.80-1.20/sqft) for improved air sealing in DFW.');
    else setAssessment('🔶 Plan for Partial Replacement — budget 10-15% overage for deck boards that may fail inspection during tear-off. This is standard on DFW re-roofs over 15 years old.');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '10px 18px', borderRadius: '6px', display: 'inline-block', fontWeight: 700, marginBottom: '16px' }}>
          🏠 DFW ROOFING GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>DFW Roof Deck Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '28px' }}>The structural layer under your shingles — often overlooked, never optional.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
          {[{
            title: 'OSB (Oriented Strand Board)', icon: '🟫',
            facts: ['Dominates new DFW construction (2000+)', 'Lower cost than plywood', 'Swells when exposed to moisture', 'Must be replaced if waterlogged', 'Code minimum: 7/16″ for most DFW pitches']
          }, {
            title: 'Plywood', icon: '🟡',
            facts: ['Pre-2000 DFW standard', 'Better moisture tolerance', 'Holds nails/staples longer', 'More expensive to source today', 'Preferred by premium roofers']
          }].map(d => (
            <div key={d.title} style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '20px' }}>
              <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{d.icon} {d.title}</div>
              <ul style={{ paddingLeft: '18px', color: '#cbd5e1', lineHeight: '1.8′ }}>
                {d.facts.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '20px', marginBottom: '28px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '12px' }}>🔧 ZIP System Overlay: Is It Worth It in DFW?</h2>
          <p style={{ color: '#cbd5e1', lineHeight: '1.7', marginBottom: '12px' }}>
            ZIP System sheathing adds a built-in water-resistive barrier — eliminates need for felt paper, improves air sealing, and adds measurable energy efficiency in DFW heat.
          </p>
          {[
            ['Added Cost', '$0.80–$1.20/sqft over standard OSB'],
            ['DFW Benefit', 'Reduces attic infiltration, lowers AC load in summer'],
            ['When to Add', 'Full replacement only — not retrofit over existing deck'],
            ['Warranty', 'Huber 30-year limited on sheathing + tape system'],
          ].map(([k,v]) => (
            <div key={k} style={{ borderBottom: '1px solid #1e3a5f', padding: '8px 0′ }}>
              <span style={{ color: '#F5E642', fontWeight: 600 }}>{k}: </span>
              <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '10px', padding: '20px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '16px' }}>🎯 Deck Assessment for My DFW Home</h2>
          <div style={{ marginBottom: '12px' }}>
            <p style={{ color: '#94a3b8', marginBottom: '8px' }}>Current roof age:</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[{v:'8',l:'Under 10 yrs'},{v:'15',l:'10–20 yrs'},{v:'25',l:'20+ yrs'}].map(o => (
                <button key={o.v} onClick={() => setAge(o.v)} style={{ padding: '10px 18px', borderRadius: '8px', border: '2px solid', borderColor: age===o.v?'#F5E642':'#1e3a5f', backgroundColor: age===o.v?'#F5E642':'transparent', color: age===o.v?'#0A1628':'#fff', cursor: 'pointer', fontWeight: 600 }}>{o.l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ color: '#94a3b8', marginBottom: '8px' }}>Known deck condition:</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[{v:'good',l:'✅ Looks Good'},{v:'damaged',l:'💧 Water Damage'},{v:'unknown',l:'❓ Unknown'}].map(o => (
                <button key={o.v} onClick={() => setCondition(o.v)} style={{ padding: '10px 18px', borderRadius: '8px', border: '2px solid', borderColor: condition===o.v?'#F5E642':'#1e3a5f', backgroundColor: condition===o.v?'#F5E642':'transparent', color: condition===o.v?'#0A1628':'#fff', cursor: 'pointer', fontWeight: 600 }}>{o.l}</button>
              ))}
            </div>
          </div>
          <button onClick={getAssessment} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', marginBottom: '16px' }}>Get Deck Assessment →</button>
          {assessment && <div style={{ backgroundColor: '#0d3b5e', borderRadius: '8px', padding: '16px', color: '#e2e8f0', lineHeight: '1.6′ }}>{assessment}</div>}
        </div>
      </div>
    </div>
  );
}
