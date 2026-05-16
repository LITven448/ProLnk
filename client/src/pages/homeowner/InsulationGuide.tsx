import { useState } from 'react';

const insulationTypes = [
  { name: 'Spray Foam', emoji: '🫧', rValue: 'R-3.7 to R-6.5 per inch', cost: '$1.50–$3.00/sq ft', pros: 'Air sealing + insulation in one, stops moisture', cons: 'Most expensive, requires pro install' },
  { name: 'Blown-In Fiberglass', emoji: '💨', rValue: 'R-2.2 to R-2.7 per inch', cost: '$0.50–$1.20/sq ft', pros: 'Fast install, fills gaps well, cost-effective', cons: 'Can settle over time, less air sealing' },
  { name: 'Blown-In Cellulose', emoji: '📦', rValue: 'R-3.2 to R-3.8 per inch', cost: '$0.60–$1.40/sq ft', pros: 'Eco-friendly (recycled), better density', cons: 'Can absorb moisture, heavier' },
  { name: 'Batt / Roll', emoji: '🧻', rValue: 'R-3.1 to R-4.3 per inch', cost: '$0.30–$0.80/sq ft', pros: 'DIY-friendly, widely available', cons: 'Gaps reduce effectiveness significantly' },
];

export default function InsulationGuide() {
  const [bill, setBill] = useState('');
  const [sqft, setSqft] = useState('');
  const [savings, setSavings] = useState<null | { annual: number; monthly: number; payback: number }>(null);

  const calculate = () => {
    const b = parseFloat(bill);
    const s = parseFloat(sqft);
    if (isNaN(b) || isNaN(s) || b <= 0 || s <= 0) return;
    const reduction = s < 1500 ? 0.22 : s < 2500 ? 0.28 : 0.32;
    const annual = Math.round(b * 12 * reduction);
    const monthly = Math.round(b * reduction);
    const installCost = Math.round(s * 1.2);
    const payback = Math.round(installCost / annual * 10) / 10;
    setSavings({ annual, monthly, payback });
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2d4d 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🏠</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '16px 0 8px' }}>Insulation Guide for DFW Homes</h1>
        <p style={{ color: '#F5E642', fontWeight: 600, fontSize: 16, margin: 0 }}>North Texas Climate · R-Value Requirements · Energy Savings Calculator</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🌡️ Why Insulation Matters More in DFW</h2>
          <p style={{ color: '#b0b8cc', lineHeight: 1.7 }}>
            North Texas summers regularly hit 100°F+, and your attic can reach 150–160°F on hot days. Without proper insulation, your AC works overtime — often accounting for 40–60% of your energy bill. The DOE recommends R-38 to R-60 for attics in Climate Zone 3 (DFW), but most older DFW homes have R-11 or less.
          </p>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>📐 R-Value Quick Reference — DFW</h2>
          <div style={{ background: '#111f3a', borderRadius: 12, overflow: 'hidden', border: '1px solid #1e3a5f' }}>
            {[['Attic (unfinished)', 'R-38 to R-60', 'Top priority — biggest heat gain'], ['Walls (exterior)', 'R-13 to R-21', 'Major impact in older homes'], ['Floors (over unconditioned)', 'R-25 to R-30', 'Crawl spaces, garages below'], ['Rim Joists', 'R-10 to R-20', 'Often overlooked, easy DIY win'], ['Basement/Crawl Walls', 'R-10 to R-15', 'Moisture management critical']].map(([area, r, note], i) => (
              <div key={area} style={{ display: 'grid', gridTemplateColumns: '180px 140px 1fr', gap: 12, padding: '14px 20px', background: i % 2 === 0 ? 'transparent' : '#0d1930', borderTop: i > 0 ? '1px solid #1e3a5f' : 'none' }}>
                <span style={{ fontWeight: 600 }}>{area}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{r}</span>
                <span style={{ color: '#8a9ab5', fontSize: 14 }}>{note}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Compare Insulation Types</h2>
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {insulationTypes.map(t => (
              <div key={t.name} style={{ background: '#111f3a', borderRadius: 12, padding: 22, border: '1px solid #1e3a5f' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{t.emoji}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 6 }}>{t.name}</h3>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{t.cost}</div>
                <div style={{ color: '#8a9ab5', fontSize: 12, marginBottom: 8 }}>{t.rValue}</div>
                <div style={{ color: '#6bcf8a', fontSize: 13, marginBottom: 4 }}>✅ {t.pros}</div>
                <div style={{ color: '#e07070', fontSize: 13 }}>❌ {t.cons}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>☀️ DFW-Specific Considerations</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              ['Radiant Barrier', '🪟', 'DFW attics benefit enormously from radiant barriers alongside insulation — reflects up to 97% of radiant heat. Cost: $0.10–$0.25/sq ft. Huge summer ROI.'],
              ['Air Sealing First', '🔒', 'Before adding insulation, seal gaps around light fixtures, HVAC penetrations, and attic hatches. Air sealing + insulation works 2x better than insulation alone.'],
              ['Moisture Management', '💧', 'DFW humidity can cause condensation issues in poorly ventilated attics. Ensure proper ridge and soffit venting before adding insulation.'],
              ['Rebates Available', '💰', 'Oncor and Atmos Energy offer rebates for insulation upgrades. Federal tax credit (25C) covers 30% of insulation costs up to $1,200/year.'],
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

        <section style={{ marginTop: 48, background: '#111f3a', borderRadius: 16, padding: 32, border: '1px solid #1e3a5f' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>⚡ Energy Savings Calculator</h2>
          <p style={{ color: '#8a9ab5', marginBottom: 28 }}>Estimate your annual savings from a full insulation upgrade in DFW.</p>

          <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 15 }}>Average Monthly Electric Bill ($)</label>
              <input
                type="number"
                value={bill}
                onChange={e => { setBill(e.target.value); setSavings(null); }}
                placeholder="e.g. 220"
                style={{ background: '#0A1628', border: '1px solid #2a4a7a', color: '#fff', borderRadius: 8, padding: '12px 16px', fontSize: 16, width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: 15 }}>Home Square Footage</label>
              <input
                type="number"
                value={sqft}
                onChange={e => { setSqft(e.target.value); setSavings(null); }}
                placeholder="e.g. 2000"
                style={{ background: '#0A1628', border: '1px solid #2a4a7a', color: '#fff', borderRadius: 8, padding: '12px 16px', fontSize: 16, width: '100%', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <button
            onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', padding: '14px 28px', borderRadius: 10, border: 'none', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}
          >
            Calculate My Savings →
          </button>

          {savings && (
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
              <div style={{ background: '#0d1930', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #F5E64244' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#F5E642' }}>${savings.monthly}/mo</div>
                <div style={{ color: '#8a9ab5', marginTop: 4, fontSize: 14 }}>Monthly Savings</div>
              </div>
              <div style={{ background: '#0d1930', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #6bcf8a44' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#6bcf8a' }}>${savings.annual}/yr</div>
                <div style={{ color: '#8a9ab5', marginTop: 4, fontSize: 14 }}>Annual Savings</div>
              </div>
              <div style={{ background: '#0d1930', borderRadius: 12, padding: 20, textAlign: 'center', border: '1px solid #7aa8ff44' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#7aa8ff' }}>{savings.payback} yrs</div>
                <div style={{ color: '#8a9ab5', marginTop: 4, fontSize: 14 }}>Simple Payback</div>
              </div>
            </div>
          )}
        </section>

        <div style={{ marginTop: 48, background: 'linear-gradient(135deg, #F5E642 0%, #e8d800 100%)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Get Free Insulation Quotes in DFW</h3>
          <p style={{ color: '#0A1628', marginBottom: 0, fontWeight: 500 }}>ProLnk connects you with certified insulation contractors — compare bids and start saving this summer.</p>
        </div>
      </div>
    </div>
  );
}
