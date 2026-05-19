import { useState } from 'react';

const NEIGHBORHOOD_TIERS = [
  {
    tier: 'Tier 1 — High Ceiling, High ROI',
    label: 'Already Premium',
    color: '#6bb5f5',
    neighborhoods: ['Highland Park', 'Southlake', 'Westlake', 'Preston Hollow', 'Colleyville'],
    roi: { cosmetic: 55, mid: 35, full: 22 },
    note: 'Market at ceiling. Buyers expect perfect condition — cosmetic updates are table stakes, not upside. Overbuilding for neighborhood is a real risk.',
    liftedExample: '$1.4M home → cosmetic reno → $1.52M (8% lift)',
  },
  {
    tier: 'Tier 2 — Strong ROI Zone',
    label: 'Established Suburbs',
    color: '#F5E642',
    neighborhoods: ['Frisco', 'Plano', 'Coppell', 'Flower Mound', 'Keller', 'Allen'],
    roi: { cosmetic: 82, mid: 68, full: 52 },
    note: 'Best overall ROI tier in DFW. Buyers are quality-conscious but not at premium ceiling. Kitchen/bath updates return 70-85 cents on the dollar.',
    liftedExample: '$480K home → kitchen + master bath reno → $560K (17% lift)',
  },
  {
    tier: 'Tier 3 — Value-Add Opportunity',
    label: 'Transitional / Gentrifying',
    color: '#f5a642',
    neighborhoods: ['Oak Cliff', 'East Dallas (Lakewood adj)', 'Bishop Arts District', 'Wynnewood', 'South Fort Worth'],
    roi: { cosmetic: 95, mid: 88, full: 71 },
    note: 'Highest renovation ROI in DFW. Below-ceiling prices with strong appreciation trajectory. Buyers paying for future neighborhood upside + condition.',
    liftedExample: '$285K home → full reno → $390K (37% lift)',
  },
  {
    tier: 'Tier 4 — Entry Level / Blue Collar',
    label: 'Working Class Markets',
    color: '#aaa',
    neighborhoods: ['Garland', 'Mesquite', 'Irving (west)', 'Carrollton (east)', 'Grand Prairie'],
    roi: { cosmetic: 68, mid: 55, full: 40 },
    note: 'Buyers are budget-constrained. Over-improving rarely adds full dollar-for-dollar return. Focus on functional upgrades (roof, HVAC, flooring) over luxury finishes.',
    liftedExample: '$245K home → mechanical updates + cosmetic → $285K (16% lift)',
  },
];

const SCOPE_COSTS: Record<string, { label: string; cost: number }> = {
  cosmetic: { label: 'Cosmetic (paint, fixtures, landscaping)', cost: 18000 },
  mid: { label: 'Mid-Level (kitchen, baths, flooring)', cost: 55000 },
  full: { label: 'Full Renovation (structural + finishes)', cost: 115000 },
};

export default function DFWRenovationROIByZip() {
  const [selectedTier, setSelectedTier] = useState(1);
  const [scope, setScope] = useState<'cosmetic' | 'mid' | 'full'>('mid');
  const [homeValue, setHomeValue] = useState('');
  const [result, setResult] = useState<{ renovCost: number; lift: number; newValue: number; roi: number; profit: number } | null>(null);

  function calculate() {
    const val = parseFloat(homeValue.replace(/,/g, '')) || 0;
    if (!val) return;
    const tier = NEIGHBORHOOD_TIERS[selectedTier];
    const roiPct = tier.roi[scope] / 100;
    const renovCost = SCOPE_COSTS[scope].cost;
    const lift = Math.round(renovCost * roiPct);
    const newValue = val + lift;
    const profit = lift - renovCost;
    const roi = Math.round((profit / renovCost) * 100);
    setResult({ renovCost, lift, newValue, roi, profit });
  }

  const fmt = (n: number) => (n < 0 ? '-$' : '$') + Math.abs(n).toLocaleString();
  const tier = NEIGHBORHOOD_TIERS[selectedTier];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#e8e8e8' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW Investor & Seller Resource</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px', color: '#fff' }}>DFW Renovation ROI by Neighborhood</h1>
          <p style={{ fontSize: 18, color: '#aab', lineHeight: 1.7 }}>Which DFW neighborhoods return the most on renovation dollars — and which are already at their ceiling. Know before you swing a hammer.</p>
        </div>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 18, color: '#fff' }}>🏘️ DFW Neighborhood Tiers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {NEIGHBORHOOD_TIERS.map((t, i) => (
              <div key={t.tier} onClick={() => setSelectedTier(i)} style={{ background: selectedTier === i ? 'rgba(245,230,66,0.1)' : 'rgba(255,255,255,0.04)', border: `2px solid ${selectedTier === i ? '#F5E642' : 'rgba(255,255,255,0.1)'}`, borderRadius: 12, padding: 20, cursor: 'pointer', transition: 'all 0.15s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: t.color, flexShrink: 0 }}></div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: '#fff' }}>{t.label}</div>
                </div>
                <div style={{ fontSize: 13, color: '#99a', marginBottom: 10 }}>{t.neighborhoods.join(', ')}</div>
                <div style={{ display: 'flex', gap: 14 }}>
                  {(['cosmetic', 'mid', 'full'] as const).map(s => (
                    <div key={s} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: '#778', textTransform: 'uppercase', marginBottom: 2 }}>{s}</div>
                      <div style={{ fontWeight: 800, color: t.color, fontSize: 18 }}>{t.roi[s]}%</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#778', marginTop: 10 }}>Click a tier to select it for the calculator. ROI = percentage of renovation cost recouped at sale.</p>
        </section>

        <section style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 22, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginTop: 0, marginBottom: 6 }}>{tier.tier}</h2>
          <p style={{ color: '#99a', lineHeight: 1.7, margin: '0 0 12px' }}>{tier.note}</p>
          <div style={{ background: 'rgba(245,230,66,0.1)', borderRadius: 8, padding: 14, fontSize: 14, color: '#ccd' }}>
            <strong style={{ color: '#F5E642' }}>Real Example:</strong> {tier.liftedExample}
          </div>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14, color: '#fff' }}>🏗️ DFW Gentrification Watch Neighborhoods</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { name: 'Oak Cliff / Bishop Arts', trend: '↑ 9.2% YoY', note: 'Hottest reno market in Dallas. Buyers paying for neighborhood future.' },
              { name: 'East Dallas (Lkwd adj)', trend: '↑ 7.8% YoY', note: 'Bungalows near Lakewood converting to $600K+ renovated homes.' },
              { name: 'Wynnewood Village', trend: '↑ 8.5% YoY', note: 'Undervalued pocket next to Oak Cliff. Early gentrification curve.' },
              { name: 'South Fort Worth', trend: '↑ 6.9% YoY', note: 'Near Medical District — healthcare workers driving reno demand.' },
              { name: 'Cockrell Hill', trend: '↑ 7.1% YoY', note: 'Adjacent to Duncanville; investor activity accelerating.' },
              { name: 'Irving (Heritage Crossing)', trend: '↑ 6.4% YoY', note: 'TOD development driving value-add opportunity.' },
            ].map(n => (
              <div key={n.name} style={{ background: 'rgba(245,150,50,0.1)', border: '1px solid rgba(245,150,50,0.3)', borderRadius: 10, padding: 16 }}>
                <div style={{ fontWeight: 700, color: '#fff', marginBottom: 4 }}>{n.name}</div>
                <div style={{ color: '#f5a642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{n.trend}</div>
                <div style={{ fontSize: 13, color: '#99a', lineHeight: 1.5 }}>{n.note}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ background: 'rgba(245,230,66,0.08)', border: '2px solid #F5E642', borderRadius: 14, padding: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 0, marginBottom: 20, color: '#fff' }}>🧮 Renovation ROI Calculator</h2>
          <div style={{ marginBottom: 14, fontSize: 14, color: '#99a' }}>Selected tier: <strong style={{ color: '#F5E642' }}>{tier.label}</strong> — click a tier above to change</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Current Home Value</label>
              <input value={homeValue} onChange={e => setHomeValue(e.target.value)} placeholder="e.g. 285000" style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: '#162040', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Renovation Scope</label>
              <select value={scope} onChange={e => setScope(e.target.value as 'cosmetic' | 'mid' | 'full')} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: '#162040', color: '#fff', fontSize: 14 }}>
                {(Object.entries(SCOPE_COSTS) as [string, { label: string; cost: number }][]).map(([k, v]) => <option key={k} value={k}>{v.label} (~{fmt(v.cost)})</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>Calculate ROI</button>
          {result && (
            <div style={{ marginTop: 22, background: 'rgba(0,0,0,0.35)', borderRadius: 10, padding: 22 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                {[
                  { label: 'Reno Cost', value: fmt(result.renovCost), color: '#e88' },
                  { label: 'Value Lift', value: fmt(result.lift), color: '#F5E642' },
                  { label: 'New Value', value: fmt(result.newValue), color: '#6bf' },
                  { label: 'Net Profit', value: fmt(result.profit), color: result.profit > 0 ? '#8f8' : '#e88' },
                ].map(item => (
                  <div key={item.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: '#778', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: item.color }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, textAlign: 'center', fontSize: 15 }}>
                Net ROI on renovation capital: <strong style={{ color: result.roi > 0 ? '#8f8' : '#e88', fontSize: 20 }}>{result.roi}%</strong>
              </div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
