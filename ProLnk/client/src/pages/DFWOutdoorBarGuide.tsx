import { useState } from 'react';

const barConfigs = [
  { space: 'compact', budget: 'low', style: 'casual', config: 'Freestanding bar cart with marine-grade stainless top', material: 'Powder-coated steel frame, concrete countertop', cost: '$800–$2,000′ },
  { space: 'compact', budget: 'mid', style: 'casual', config: 'Built-in mini bar with under-counter fridge', material: 'Concrete block base, stone veneer, granite top', cost: '$3,000–$6,000′ },
  { space: 'medium', budget: 'mid', style: 'entertainer', config: 'L-shaped outdoor bar with kegerator + dual-zone wine fridge', material: 'Concrete masonry, stucco finish, quartzite countertop', cost: '$8,000–$18,000′ },
  { space: 'medium', budget: 'high', style: 'entertainer', config: 'Full outdoor kitchen bar with tap system + beverage drawers', material: 'Natural stone, marine-grade stainless appliances, concrete cap', cost: '$18,000–$35,000′ },
  { space: 'large', budget: 'high', style: 'resort', config: 'Custom island bar with kegerator, wine fridge, ice maker, sink', material: 'Travertine, ledger stone, quartzite bar top, stainless appliances', cost: '$35,000–$75,000′ },
];

export default function DFWOutdoorBarGuide() {
  const [space, setSpace] = useState('');
  const [budget, setBudget] = useState('');
  const [style, setStyle] = useState('');
  const [result, setResult] = useState<typeof barConfigs[0] | null>(null);

  function calculate() {
    const match = barConfigs.find(c =>
      c.space === space && c.budget === budget && c.style === style
    ) || barConfigs.find(c => c.budget === budget) || barConfigs[1];
    setResult(match);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🍹</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Outdoor Bar Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW outdoor entertaining culture demands an outdoor bar. The Texas heat pushes gatherings outside year-round —
          but that same heat destroys inferior materials. Marine-grade stainless, concrete, and natural stone are the
          only choices that survive DFW summers without warping, fading, or corroding.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>🌡️ DFW Climate Realities for Outdoor Bars</h2>
          {[
            ['☀️ UV Intensity', 'Texas summer UV destroys wood, plastic, and cheap finishes within 2 seasons. Only concrete, stone, and marine-grade steel survive long-term.'],
            ['🌡️ Heat Extremes', '100°F+ days June–August mean refrigeration must be rated for ambient temps over 90°F. Standard wine fridges fail in DFW outdoor conditions.'],
            ['🌧️ Flash Storms', 'DFW hailstorms and heavy rain hit suddenly. Countertops must drain and finishes must tolerate rapid temperature swings.'],
            ['❄️ Freeze Events', 'February cold snaps require freeze-proof plumbing if you add a sink — winterize or use freeze-rated supply lines.'],
          ].map(([icon, text]) => (
            <div key={icon as string} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
              <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.5, fontSize: 14 }}>{text as string}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>🍺 Refrigeration & Tap Options</h2>
          {[
            ['Dual-Zone Wine Fridge', 'DFW wine lovers: red zone at 55–65°F, white/rosé zone at 45–55°F. Must be outdoor-rated for ambient heat.', '$800–$2,500'],
            ['Kegerator / Beer Tap', 'Draft beer is the DFW entertainer signature. Single or dual tap, commercial-grade CO2 system, insulated tower for heat.', '$600–$2,000'],
            ['Under-Counter Ice Maker', 'Produces 50–80 lbs/day. Critical for DFW summers where ice consumption triples. Requires drain line.', '$1,200–$3,500'],
            ['Beverage Drawers', 'Stainless refrigerated drawers keep drinks accessible without opening a full fridge. Flush with countertop.', '$900–$2,200'],
          ].map(([name, desc, cost]) => (
            <div key={name as string} style={{ borderBottom: '1px solid #1e3a5f', paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ color: '#fff', fontWeight: 700 }}>{name}</span>
                <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 600 }}>{cost}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>{desc as string}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>🔧 Configure Your Outdoor Bar</h2>
          {[
            { label: 'Outdoor Space Size', value: space, setter: setSpace, options: [['compact', 'Compact (under 200 sq ft)'], ['medium', 'Medium (200–500 sq ft)'], ['large', 'Large (500+ sq ft)']] },
            { label: 'Budget Range', value: budget, setter: setBudget, options: [['low', 'Under $5,000'], ['mid', '$5,000–$20,000'], ['high', '$20,000+']] },
            { label: 'Entertaining Style', value: style, setter: setStyle, options: [['casual', 'Casual / Family'], ['entertainer', 'Frequent Entertainer'], ['resort', 'Resort-Style Experience']] },
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
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', marginTop: 8 }}>Get My Bar Configuration →</button>
        </div>

        {result && (
          <div style={{ background: '#0f2a1a', border: '1px solid #22c55e', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#22c55e', marginBottom: 16 }}>✅ Your DFW Outdoor Bar Recommendation</h3>
            <p style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>Configuration: {result.config}</p>
            <p style={{ color: '#94a3b8', marginBottom: 8 }}>Materials: {result.material}</p>
            <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{result.cost}</p>
            <p style={{ color: '#64748b', fontSize: 12, marginTop: 12 }}>DFW outdoor bars add $15,000–$50,000+ in home value. Get 3 quotes from licensed outdoor kitchen contractors.</p>
          </div>
        )}
      </div>
    </div>
  );
}
