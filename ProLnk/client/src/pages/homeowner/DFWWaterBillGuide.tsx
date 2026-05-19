import { useState } from 'react';

const CITIES = [
  { city: 'Dallas', low: 0.018, high: 0.031, note: 'Tiered — summer rates significantly higher' },
  { city: 'Frisco', low: 0.021, high: 0.038, note: 'Tiered — aggressive conservation pricing' },
  { city: 'Plano', low: 0.019, high: 0.034, note: 'Tiered structure with winter averaging for sewer' },
  { city: 'McKinney', low: 0.022, high: 0.041, note: 'Highest top tier in DFW — active conservation program' },
  { city: 'Fort Worth', low: 0.016, high: 0.028, note: 'Lowest rates in DFW major cities' },
];

const CONSERVATION = [
  { item: 'Smart Irrigation Controller', invest: '$600–2,000', saving: '$600–2,000/year', desc: 'Save 30–50% on outdoor water — weather-based scheduling eliminates overwatering.' },
  { item: 'Drought-Tolerant Landscaping', invest: '$3,000–8,000', saving: '$500–1,500/year', desc: 'Xeriscaping reduces outdoor water use by 50–75%. Long payback but permanent savings.' },
  { item: 'High-Efficiency Toilets', invest: '$300–600', saving: '$100–200/year', desc: 'EPA WaterSense toilets save 12,000–24,000 gallons/year per household.' },
  { item: 'Leak Detection & Repair', invest: '$150–500', saving: '$30–100/month', desc: '10% of DFW homes have leaks wasting 90+ gallons/day — often for years undetected.' },
  { item: 'Greywater Reuse System', invest: '$500–2,000', saving: '$200–500/year', desc: 'Captured shower/sink water for irrigation. Requires city approval — check with your municipality.' },
];

const BILL_COMPONENTS = [
  { name: 'Base Charge', desc: 'Fixed monthly fee regardless of usage — typically $10–25/month in DFW cities.' },
  { name: 'Tiered Rate Structure', desc: 'Most DFW cities charge more per gallon as usage increases. Use less = lower effective rate.' },
  { name: 'Irrigation Meter', desc: 'Some cities allow a separate meter for outdoor use at lower sewage rate. Can save $30–60/month in summer.' },
  { name: 'Sewer Charge', desc: 'Often calculated from winter average use (not summer irrigation). Your Nov–Feb usage sets this rate.' },
];

function calculateSavings(bill: number, sqft: number, hasPool: boolean, oldAppliances: boolean) {
  const opportunities: { item: string; annual: number }[] = [];
  if (bill > 120) opportunities.push({ item: 'Smart irrigation controller', annual: Math.round(bill * 0.3 * 12) });
  if (bill > 80) opportunities.push({ item: 'Leak detection audit', annual: Math.round(bill * 0.1 * 12) });
  if (oldAppliances) opportunities.push({ item: 'WaterSense toilet replacement', annual: 150 });
  if (sqft > 2500) opportunities.push({ item: 'Drought-tolerant landscaping', annual: 900 });
  if (hasPool) opportunities.push({ item: 'Pool cover (reduces evaporation 90%)', annual: 300 });
  return opportunities;
}

export default function DFWWaterBillGuide() {
  const [bill, setBill] = useState('');
  const [sqft, setSqft] = useState('');
  const [hasPool, setHasPool] = useState(false);
  const [oldAppliances, setOldAppliances] = useState(false);
  const [results, setResults] = useState<{ item: string; annual: number }[] | null>(null);

  function analyze() {
    const b = parseFloat(bill);
    const s = parseInt(sqft);
    if (!b || !s) return;
    setResults(calculateSavings(b, s, hasPool, oldAppliances));
  }

  const totalSaving = results?.reduce((acc, r) => acc + r.annual, 0) ?? 0;

  return (
    <div style={{ background: '#0f0f0f', minHeight: '100vh', color: '#e5e5e5', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0c1a2e 0%, #0f2a47 100%)', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>💧</div>
        <h1 style={{ fontSize: 'clamp(22px, 5vw, 38px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', lineHeight: 1.2 }}>
          DFW Water Bill Guide
        </h1>
        <p style={{ fontSize: 18, color: '#7dd3fc', maxWidth: 600, margin: '0 auto' }}>Understand, Reduce, and Manage Your Bill</p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        {/* Context */}
        <div style={{ background: '#0c1a2e', border: '1px solid #1e3a5f', borderRadius: 16, padding: 28, margin: '40px 0' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#7dd3fc', margin: '0 0 12px' }}>🌵 DFW Water Context</h2>
          <p style={{ color: '#ccc', lineHeight: 1.8, margin: 0 }}>
            DFW residents pay some of the <strong style={{ color: '#fff' }}>highest water rates in Texas</strong> due to infrastructure investment and drought response.
            Average DFW household: <strong style={{ color: '#fbbf24' }}>$100–180/month in summer</strong>.
          </p>
        </div>

        {/* Bill Components */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '40px 0 20px' }}>Understanding Your DFW Water Bill</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          {BILL_COMPONENTS.map(b => (
            <div key={b.name} style={{ background: '#0c1a2e', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#7dd3fc', marginBottom: 8, fontSize: 14 }}>{b.name}</div>
              <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.6 }}>{b.desc}</div>
            </div>
          ))}
        </div>

        {/* City Rate Comparison */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '48px 0 20px' }}>City Water Rates (2026)</h2>
        <div style={{ background: '#0c1a2e', border: '1px solid #1e3a5f', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 3fr', padding: '12px 20px', background: '#1e3a5f', fontSize: 12, fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <div>City</div><div>Low Rate</div><div>High Rate</div><div>Notes</div>
          </div>
          {CITIES.map((c, i) => (
            <div key={c.city} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 3fr', padding: '14px 20px', borderTop: i > 0 ? '1px solid #1e3a5f' : 'none' }}>
              <div style={{ fontWeight: 600, color: '#fff' }}>{c.city}</div>
              <div style={{ color: '#4ade80' }}>${c.low}/gal</div>
              <div style={{ color: '#fbbf24' }}>${c.high}/gal</div>
              <div style={{ fontSize: 13, color: '#888' }}>{c.note}</div>
            </div>
          ))}
        </div>

        {/* Conservation */}
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '48px 0 20px' }}>Water Conservation for DFW Homeowners</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {CONSERVATION.map(c => (
            <div key={c.item} style={{ background: '#0c1a2e', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ minWidth: 140 }}>
                <div style={{ fontSize: 11, color: '#7dd3fc', marginBottom: 2 }}>INVESTMENT</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#fbbf24' }}>{c.invest}</div>
                <div style={{ fontSize: 11, color: '#aaa', marginTop: 4 }}>Saves {c.saving}</div>
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontWeight: 600, color: '#fff', marginBottom: 6 }}>{c.item}</div>
                <div style={{ fontSize: 13, color: '#aaa', lineHeight: 1.6 }}>{c.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Savings Calculator */}
        <div style={{ background: '#0c2a1a', border: '2px solid #065f46', borderRadius: 16, padding: 32, margin: '40px 0' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>💰 Water Savings Calculator</h2>
          <p style={{ color: '#aaa', margin: '0 0 24px', fontSize: 14 }}>Identify your biggest water reduction opportunities with estimated annual savings.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#4ade80', fontWeight: 600, marginBottom: 6 }}>Current Monthly Bill ($)</label>
              <input
                type="number"
                value={bill}
                onChange={e => setBill(e.target.value)}
                placeholder="e.g. 140"
                style={{ width: '100%', background: '#0f0f0f', border: '1px solid #333', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#4ade80', fontWeight: 600, marginBottom: 6 }}>Home Square Footage</label>
              <input
                type="number"
                value={sqft}
                onChange={e => setSqft(e.target.value)}
                placeholder="e.g. 2400"
                style={{ width: '100%', background: '#0f0f0f', border: '1px solid #333', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 20, flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ccc', fontSize: 14, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasPool} onChange={e => setHasPool(e.target.checked)} />
              Do you have a pool?
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#ccc', fontSize: 14, cursor: 'pointer' }}>
              <input type="checkbox" checked={oldAppliances} onChange={e => setOldAppliances(e.target.checked)} />
              Appliances 10+ years old?
            </label>
          </div>
          <button onClick={analyze} style={{ background: '#4ade80', color: '#000', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
            Analyze Savings
          </button>
          {results && (
            <div style={{ marginTop: 24 }}>
              {results.length === 0 ? (
                <div style={{ color: '#4ade80' }}>Your usage looks efficient! Consider a professional audit for additional savings.</div>
              ) : (
                <>
                  <div style={{ fontWeight: 700, color: '#4ade80', marginBottom: 12 }}>
                    Potential annual savings: ${totalSaving.toLocaleString()}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {results.map(r => (
                      <div key={r.item} style={{ background: '#0f1a0f', border: '1px solid #1a3a1a', borderRadius: 10, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 14, color: '#ccc' }}>{r.item}</span>
                        <span style={{ fontWeight: 700, color: '#4ade80' }}>${r.annual.toLocaleString()}/yr</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
