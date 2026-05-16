import { useState } from 'react';

const equipment = [
  { item: 'Variable Speed Pump', lifespan: '8–12 yrs', replacement: '$600–$1,400', note: 'Run at low speed overnight to save 70% on pump energy' },
  { item: 'Pool Filter (Cartridge)', lifespan: '2–4 yrs', replacement: '$80–$300', note: 'Clean every 4–6 weeks in DFW summer; replace when pleats crack' },
  { item: 'Pool Filter (Sand)', lifespan: '5–7 yrs', replacement: '$100–$400', note: 'Backwash monthly; sand replaced every 5–7 years' },
  { item: 'Pool Heater (Gas)', lifespan: '8–12 yrs', replacement: '$2,000–$4,500', note: 'Annual service prevents corrosion; use a cover to retain heat' },
  { item: 'Pool Heater (Heat Pump)', lifespan: '10–15 yrs', replacement: '$3,000–$6,000', note: 'More efficient than gas; ideal for DFW shoulder season' },
  { item: 'Salt Chlorinator Cell', lifespan: '3–7 yrs', replacement: '$200–$700', note: 'DFW hard water accelerates calcium buildup on the cell' },
  { item: 'Pool Lights (LED)', lifespan: '15–25 yrs', replacement: '$150–$600 each', note: 'LED retrofit saves significantly vs halogen replacement' },
];

const tasks = {
  weekly: ['Test and balance pH (7.2–7.6), alkalinity, and chlorine levels', 'Skim leaves and debris from surface', 'Brush walls, steps, and waterline tile', 'Empty skimmer and pump baskets', 'Run pump 8–12 hours/day in summer (DFW heat requires longer run times)', 'Inspect equipment for unusual sounds or leaks'],
  monthly: ['Shock the pool (especially after heavy rain or pool parties)', 'Test calcium hardness (DFW target: 200–400 ppm)', 'Check stabilizer/cyanuric acid levels (DFW: 40–80 ppm)', 'Inspect and clean pool filter', 'Check salt level if you have a salt system (2,700–3,400 ppm)', 'Inspect pool deck and coping for cracks (clay soil movement)'],
  annual: ['Full drain and acid wash (every 3–5 years)', 'Inspect and replaster or resurface if needed', 'Service pool heater, pump, and filter professionally', 'Test and replace salt cell if needed', 'Inspect all electrical connections and GFCI outlets', 'Check pool light niches for moisture infiltration'],
};

export default function PoolMaintenanceGuide() {
  const [size, setSize] = useState('');
  const [heated, setHeated] = useState(false);
  const [costs, setCosts] = useState<null | { chemicals: number; electricity: number; heat: number; service: number; total: number }>(null);

  const calculate = () => {
    const s = parseFloat(size);
    if (isNaN(s) || s <= 0) return;
    const gallons = s * 5.5;
    const chemicals = Math.round(gallons * 0.004 + 40);
    const electricity = Math.round(s * 0.08 + 30);
    const heat = heated ? Math.round(s * 0.12 + 60) : 0;
    const service = 0;
    const total = chemicals + electricity + heat + service;
    setCosts({ chemicals, electricity, heat, service: 0, total });
  };

  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'annual'>('weekly');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0d2a4a 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🏊</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '16px 0 8px' }}>DFW Pool Maintenance Guide</h1>
        <p style={{ color: '#F5E642', fontWeight: 600, fontSize: 16, margin: 0 }}>DFW Summer Heat · Algae Prevention · Equipment Lifespan · Cost Calculator</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>☀️ DFW Pool Reality Check</h2>
          <p style={{ color: '#b0b8cc', lineHeight: 1.7 }}>
            North Texas pool owners face unique challenges: 100°F+ summers that accelerate chemical evaporation, hard water (15–25 gpg) that deposits calcium on surfaces and equipment, and black clay soil that shifts pool decks and coping. A DFW pool requires more aggressive chemical management than national guides suggest — plan for 8–12 hour daily pump runs from May through September.
          </p>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>🌿 Algae Prevention in DFW Heat</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              ['Weekly Shock', '⚡', 'Shock every 1–2 weeks in summer — DFW heat depletes chlorine fast. Use calcium hypochlorite at dusk to prevent UV breakdown.'],
              ['Phosphate Control', '🧪', 'DFW runoff and fill water are high in phosphates — algae food. Test monthly and treat with a phosphate remover preventively.'],
              ['Brush Before Chemicals', '🖌️', 'Brush algae off surfaces before adding algaecide so it can reach cells effectively. Focus on shaded areas and steps.'],
              ['Stabilizer (CYA)', '🛡️', 'Maintain CYA at 40–80 ppm — this "sunscreen" for chlorine is critical in DFW sun. Over 100 ppm and chlorine becomes ineffective.'],
            ].map(([title, emoji, desc]) => (
              <div key={String(title)} style={{ background: '#111f3a', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f', display: 'flex', gap: 16 }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{emoji}</span>
                <div>
                  <h4 style={{ margin: '0 0 6px', fontWeight: 700 }}>{title}</h4>
                  <p style={{ margin: 0, color: '#8a9ab5', lineHeight: 1.6, fontSize: 14 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>📋 Maintenance Checklists</h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {(['weekly', 'monthly', 'annual'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{ padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 15, background: activeTab === tab ? '#F5E642' : '#111f3a', color: activeTab === tab ? '#0A1628' : '#8a9ab5', transition: 'all 0.2s', textTransform: 'capitalize' }}
              >
                {tab === 'weekly' ? '🗓️ Weekly' : tab === 'monthly' ? '📅 Monthly' : '📆 Annual'}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {tasks[activeTab].map(task => (
              <div key={task} style={{ background: '#111f3a', borderRadius: 8, padding: '14px 20px', color: '#b0b8cc', display: 'flex', gap: 12, alignItems: 'flex-start', border: '1px solid #1e3a5f', lineHeight: 1.5 }}>
                <span style={{ color: '#F5E642', flexShrink: 0 }}>✓</span> {task}
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>⚙️ Equipment Lifespan & Replacement Costs</h2>
          <div style={{ background: '#111f3a', borderRadius: 12, overflow: 'hidden', border: '1px solid #1e3a5f' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 160px', gap: 12, padding: '12px 20px', background: '#0d1930', color: '#F5E642', fontWeight: 700, fontSize: 13 }}>
              <span>Equipment</span><span>Lifespan</span><span>Replacement Cost</span>
            </div>
            {equipment.map((e, i) => (
              <div key={e.item} style={{ padding: '14px 20px', background: i % 2 === 0 ? 'transparent' : '#0d1930', borderTop: '1px solid #1e3a5f' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 110px 160px', gap: 12, marginBottom: 6 }}>
                  <span style={{ fontWeight: 600 }}>{e.item}</span>
                  <span style={{ color: '#8a9ab5', fontSize: 14 }}>{e.lifespan}</span>
                  <span style={{ color: '#6bcf8a', fontSize: 14 }}>{e.replacement}</span>
                </div>
                <div style={{ color: '#6a7a95', fontSize: 12, paddingLeft: 0 }}>💡 {e.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 48, background: '#111f3a', borderRadius: 16, padding: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>💧 Monthly Pool Cost Estimator</h2>
          <p style={{ color: '#8a9ab5', marginBottom: 28 }}>DFW-calibrated estimate based on your pool size and heating setup.</p>

          <div style={{ display: 'grid', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 15 }}>Pool Surface Area (sq ft)</label>
              <input
                type="number"
                value={size}
                onChange={e => { setSize(e.target.value); setCosts(null); }}
                placeholder="e.g. 400 (typical DFW pool)"
                style={{ background: '#0A1628', border: '1px solid #2a4a7a', color: '#fff', borderRadius: 8, padding: '12px 16px', fontSize: 16, width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button
                onClick={() => setHeated(h => !h)}
                style={{ width: 52, height: 28, borderRadius: 14, background: heated ? '#F5E642' : '#2a4a7a', border: 'none', cursor: 'pointer', position: 'relative', transition: 'all 0.3s', flexShrink: 0 }}
              >
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', position: 'absolute', top: 4, left: heated ? 28 : 4, transition: 'all 0.3s' }} />
              </button>
              <span style={{ fontWeight: 600 }}>Heated Pool {heated ? '🔥 On' : '(unheated)'}</span>
            </div>
          </div>

          <button
            onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', padding: '14px 28px', borderRadius: 10, border: 'none', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}
          >
            Calculate Monthly Cost →
          </button>

          {costs && (
            <div style={{ marginTop: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginBottom: 16 }}>
                {[['🧪 Chemicals', costs.chemicals], ['⚡ Electricity', costs.electricity], ...(costs.heat > 0 ? [['🔥 Heating', costs.heat]] : [])].map(([label, val]) => (
                  <div key={String(label)} style={{ background: '#0d1930', borderRadius: 12, padding: 18, textAlign: 'center', border: '1px solid #2a4a7a' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>${val}/mo</div>
                    <div style={{ color: '#8a9ab5', marginTop: 4, fontSize: 13 }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#0d2a1a', borderRadius: 12, padding: 22, border: '1px solid #6bcf8a44', textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#6bcf8a' }}>${costs.total}/month</div>
                <div style={{ color: '#8a9ab5', marginTop: 4 }}>Estimated Monthly Operating Cost</div>
                <div style={{ color: '#6a7a95', fontSize: 13, marginTop: 6 }}>+ Service visits avg $125–$200/visit; annual costs add ${(costs.total * 12).toLocaleString()}/yr</div>
              </div>
            </div>
          )}
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>💸 Average DFW Pool Service Costs</h2>
          <div style={{ background: '#111f3a', borderRadius: 12, overflow: 'hidden', border: '1px solid #1e3a5f' }}>
            {[['Weekly Service (full)', '$120–$180/mo', 'Chemicals, brushing, skimming, filter check'], ['Chemicals Only', '$75–$120/mo', 'You handle physical cleaning'], ['Algae Treatment (one-time)', '$150–$400', 'Shock, brush, and clarifier treatment'], ['Equipment Repair (pump)', '$200–$600', 'Labor + parts; varies by issue'], ['Pool Resurfacing (plaster)', '$4,000–$8,000', 'Every 10–15 years; includes prep and cure time'], ['Opening / Closing', '$200–$500 each', 'DFW rarely needs full close; winterizing optional']].map(([service, price, note], i) => (
              <div key={String(service)} style={{ display: 'grid', gridTemplateColumns: '1fr 160px 1fr', gap: 12, padding: '14px 20px', background: i % 2 === 0 ? 'transparent' : '#0d1930', borderTop: i > 0 ? '1px solid #1e3a5f' : 'none' }}>
                <span style={{ fontWeight: 600, fontSize: 14 }}>{service}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{price}</span>
                <span style={{ color: '#8a9ab5', fontSize: 13 }}>{note}</span>
              </div>
            ))}
          </div>
        </section>

        <div style={{ marginTop: 48, background: 'linear-gradient(135deg, #F5E642 0%, #e8d800 100%)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Find a Trusted DFW Pool Service Pro</h3>
          <p style={{ color: '#0A1628', marginBottom: 0, fontWeight: 500 }}>ProLnk connects you with vetted pool technicians — no guesswork, just fair prices and reliable service.</p>
        </div>
      </div>
    </div>
  );
}
