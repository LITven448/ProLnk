import { useState } from 'react';

const heaterRecs = [
  { size: 'small', fuel: 'propane', frequency: 'occasional', rec: 'Portable propane tower heater (40,000 BTU)', btu: '40,000 BTU', cost: '$150–$400', note: 'Easy to move and store. Refill 20 lb tanks at any DFW hardware store.' },
  { size: 'small', fuel: 'electric', frequency: 'occasional', rec: 'Infrared electric wall-mount heater', btu: '1,500W (5,100 BTU equivalent)', cost: '$80–$250', note: 'Ideal for covered patios in North DFW suburbs. No fuel storage needed.' },
  { size: 'medium', fuel: 'propane', frequency: 'regular', rec: 'Tabletop propane heater + 1 tower heater', btu: '10,000 + 40,000 BTU', cost: '$200–$600', note: 'Good mid-range setup for Frisco, Plano, McKinney winter entertaining.' },
  { size: 'medium', fuel: 'natural_gas', frequency: 'regular', rec: 'Plumbed natural gas patio heater (permanent)', btu: '50,000 BTU', cost: '$800–$2,500 installed', note: 'Best DFW choice for regulars. Plumb to your existing gas line — no tank refills ever.' },
  { size: 'large', fuel: 'natural_gas', frequency: 'regular', rec: '2–3 natural gas heaters on zone control', btu: '150,000 BTU total', cost: '$2,500–$6,000 installed', note: 'Resort-level DFW outdoor heating. Thermostat-controlled, runs all season Dec–Feb.' },
  { size: 'large', fuel: 'electric', frequency: 'occasional', rec: 'Overhead infrared heat lamps on pergola', btu: '3,000W each (10,200 BTU)', cost: '$600–$1,800 installed', note: 'Perfect for covered pergolas in Southlake, Colleyville, Westlake.' },
];

export default function DFWPatioHeaterGuide() {
  const [size, setSize] = useState('');
  const [fuel, setFuel] = useState('');
  const [frequency, setFrequency] = useState('');
  const [result, setResult] = useState<typeof heaterRecs[0] | null>(null);

  function calculate() {
    const match = heaterRecs.find(r => r.size === size && r.fuel === fuel && r.frequency === frequency)
      || heaterRecs.find(r => r.size === size && r.fuel === fuel)
      || heaterRecs.find(r => r.fuel === fuel)
      || heaterRecs[3];
    setResult(match);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🔥</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Patio Heater Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW winters are short but unpredictable — a 70°F November day can turn into a 28°F cold snap by December.
          Patio heaters let you extend your outdoor entertaining season through February, protecting your outdoor investment
          and keeping your guests comfortable year-round.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>📅 DFW Winter Season Breakdown</h2>
          {[
            ['November', 'Mostly pleasant. Light heater (propane tabletop) extends evenings comfortably to 9–10pm.'],
            ['December', 'Variable. Some days 60°F, some 35°F. A reliable 40,000–50,000 BTU heater becomes essential.'],
            ['January', 'Coldest month. Plumbed natural gas is worth every dollar — no tank runs dry mid-party.'],
            ['February', 'Cold snaps possible through mid-month. Ice storm risk (2021, 2023). Propane supply can tighten.'],
          ].map(([month, desc]) => (
            <div key={month as string} style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 80, fontSize: 14 }}>{month}</span>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: 14, lineHeight: 1.5 }}>{desc as string}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>⚡ Fuel Type Comparison for DFW</h2>
          {[
            { fuel: 'Natural Gas (Plumbed)', pros: 'Never runs out, cheapest per BTU, best for DFW entertainers', cons: 'Requires licensed plumber, fixed location, $500–$1,500 install cost', rating: '⭐⭐⭐⭐⭐ Best for DFW' },
            { fuel: 'Propane (Tank)', pros: 'Portable, no plumber needed, immediate warmth', cons: 'Tanks run out during parties, storage required, costs more per BTU', rating: '⭐⭐⭐⭐ Good Starter' },
            { fuel: 'Electric Infrared', pros: 'Silent, targeted heat, works on covered patios, low operating cost', cons: 'Requires outdoor electrical outlet, less effective in open spaces', rating: '⭐⭐⭐ Covered Patios Only' },
          ].map(({ fuel: f, pros, cons, rating }) => (
            <div key={f} style={{ borderBottom: '1px solid #1e3a5f', paddingBottom: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#fff', fontWeight: 700 }}>{f}</span>
                <span style={{ color: '#F5E642', fontSize: 12 }}>{rating}</span>
              </div>
              <p style={{ color: '#22c55e', fontSize: 13, margin: '0 0 4px' }}>✅ {pros}</p>
              <p style={{ color: '#ef4444', fontSize: 13, margin: 0 }}>⚠️ {cons}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20, fontSize: 18 }}>🔧 Find Your Heater Setup</h2>
          {[
            { label: 'Patio Size', value: size, setter: setSize, options: [['small', 'Small (under 200 sq ft)'], ['medium', 'Medium (200–400 sq ft)'], ['large', 'Large (400+ sq ft)']] },
            { label: 'Preferred Fuel', value: fuel, setter: setFuel, options: [['propane', 'Propane Tanks'], ['natural_gas', 'Natural Gas (Plumbed)'], ['electric', 'Electric']] },
            { label: 'DFW Use Frequency', value: frequency, setter: setFrequency, options: [['occasional', 'Occasional (few times/year)'], ['regular', 'Regular Entertainer (monthly+)']] },
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
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', marginTop: 8 }}>Get My Heater Recommendation →</button>
        </div>

        {result && (
          <div style={{ background: '#0f2a1a', border: '1px solid #22c55e', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#22c55e', marginBottom: 12 }}>✅ Your DFW Heater Recommendation</h3>
            <p style={{ color: '#fff', fontWeight: 700, marginBottom: 6 }}>{result.rec}</p>
            <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>BTU Output: {result.btu}</p>
            <p style={{ color: '#22c55e', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{result.cost}</p>
            <p style={{ color: '#94a3b8', fontSize: 14 }}>{result.note}</p>
          </div>
        )}
      </div>
    </div>
  );
}
