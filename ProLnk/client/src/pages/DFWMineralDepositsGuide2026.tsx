import { useState } from 'react';

const fixtures = ['Faucet Aerator', 'Showerhead', 'Toilet Bowl Ring', 'Dishwasher' , 'Water Heater Heating Element'];
const guides: Record<string, { method: string; product: string; prevent: string }> = {
  'Faucet Aerator': { method: 'Unscrew aerator. Soak in white vinegar 30–60 min. Scrub with toothbrush. Rinse. Replace if clogged solid.'  , product: 'White distilled vinegar ($2/gallon)', prevent: 'Whole-home water softener eliminates deposit buildup system-wide.' },
  Showerhead: { method: 'Fill zip-lock bag with vinegar. Rubber band over showerhead. Soak overnight. Run hot water to flush loose scale.'  , product: 'White vinegar + zip-lock bag'  , prevent: 'Point-of-use inline filter or softener on shower supply.' },
  'Toilet Bowl Ring': { method: 'Pour 1 cup vinegar + 1 cup baking soda into bowl. Let fizz 30 min. Scrub with toilet brush. For stubborn rings: pumice stone.'  , product: 'Vinegar + baking soda or CLR ($8)'  , prevent: 'Toilet tank tablet with citric acid slows buildup.' },
  Dishwasher: { method: 'Place 2 cups vinegar in bottom rack, run hot cycle empty. Then sprinkle baking soda and run again.'  , product: 'White vinegar + dishwasher-safe bowl'  , prevent: 'Use a rinse-aid (Finish Jet-Dry). Water softener eliminates spotting.' },
  'Water Heater Heating Element': { method: 'Requires draining tank. Unscrew element and soak in commercial descaler or vinegar for several hours. Annual for DFW homes.'  , product: 'Lime-A-Way or commercial descaler ($10–15)'  , prevent: 'Anode rod + water softener extends element life 3x.' },
};

export default function DFWMineralDepositsGuide2026() {
  const [fixture, setFixture] = useState<string>('Faucet Aerator');
  const guide = guides[fixture];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2.2rem', fontWeight: 700, marginBottom: '0.25rem' }}>💎 DFW Mineral Deposits Guide 2026</div>
        <div style={{ color: '#8899AA', marginBottom: '2rem' }}>DFW water averages 300–400 ppm hardness. Here's how to fight it.</div>

        <div style={{ background: '#111E35', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🏠 The DFW Hard Water Problem</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { icon: '💧', title: '300–400 ppm Average', desc: 'Dallas-Fort Worth ranks among the hardest water in Texas. Classified "very hard" by most standards (>180 ppm).' },
              { icon: '⚡', title: 'Monthly Descaling for DFW', desc: 'National guides say every 3 months. DFW hardness demands monthly attention on faucets and showerheads.' },
              { icon: '🛡️', title: 'Water Softener: The Permanent Fix', desc: 'Salt-based softener ($800–2,000 installed) eliminates all scale buildup permanently. Pays for itself in appliance longevity.' },
              { icon: '🧪', title: 'White Crust = Calcium Carbonate', desc: 'The white/gray crust on fixtures is calcium carbonate. Dissolves in acid (vinegar, CLR). Never abrasive scrub — scratches chrome.' },
            ].map((item) => (
              <div key={item.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div><div style={{ fontWeight: 600 }}>{item.title}</div><div style={{ color: '#8899AA', fontSize: '0.9rem' }}>{item.desc}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🔍 Fixture → Descaling Guide</div>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: '#8899AA', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Select Fixture</div>
            <select value={fixture} onChange={(e) => setFixture(e.target.value)} style={{ background: '#0A1628', border: '1px solid #2A3A55', borderRadius: '8px', padding: '0.5rem 1rem', color: '#E8EDF5′ }}>
              {fixtures.map((f) => <option key={f}>{f}</option>)}
            </select>
          </div>
          {guide && (
            <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', borderLeft: '4px solid #F5E642', display: 'grid', gap: '0.75rem' }}>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Method: </span>{guide.method}</div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Product: </span>{guide.product}</div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Long-term: </span>{guide.prevent}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
