import { useState } from 'react';

const ZIP_TIERS: Record<string, { label: string; multiplier: number; base: number }> = {
  '75201': { label: 'Dallas Uptown/Downtown', multiplier: 1.0, base: 520000 },
  '75205': { label: 'Highland Park / University Park', multiplier: 1.0, base: 1100000 },
  '75225': { label: 'Preston Hollow', multiplier: 1.0, base: 850000 },
  '76102': { label: 'Fort Worth Downtown', multiplier: 1.0, base: 310000 },
  '75024': { label: 'Plano (Legacy)', multiplier: 1.0, base: 480000 },
  '75070': { label: 'McKinney', multiplier: 1.0, base: 420000 },
  '76051': { label: 'Grapevine', multiplier: 1.0, base: 390000 },
  '75019': { label: 'Coppell', multiplier: 1.0, base: 445000 },
};

const SIZE_ADJUST: Record<string, number> = {
  under1500: 0.82,
  '1500to2500': 1.0,
  '2500to3500': 1.18,
  over3500: 1.38,
};

export default function DFWHomeAppraisalGuide() {
  const [zip, setZip] = useState('75205');
  const [size, setSize] = useState('1500to2500');
  const [result, setResult] = useState<{ low: number; high: number; cost: number } | null>(null);

  function calculate() {
    const tier = ZIP_TIERS[zip];
    const sizeAdj = SIZE_ADJUST[size];
    if (!tier) return;
    const mid = Math.round(tier.base * sizeAdj);
    const low = Math.round(mid * 0.94);
    const high = Math.round(mid * 1.06);
    const cost = size === 'over3500′ ? 650 : size === '2500to3500' ? 575 : 490;
    setResult({ low, high, cost });
  }

  const fmt = (n: number) => '$' + n.toLocaleString();

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a1a' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#0066cc', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW Homeowner Resource</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px' }}>DFW Home Appraisal Guide</h1>
          <p style={{ fontSize: 18, color: '#444', lineHeight: 1.7 }}>Everything Dallas-Fort Worth homeowners need to know about the appraisal process — when you need one, what appraisers look at, and how to challenge a low number.</p>
        </div>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 14 }}>📋 When You Need an Appraisal</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
            {[
              { icon: '🏦', label: 'Refinancing', desc: 'Lender requires a current appraisal to set your new loan amount.' },
              { icon: '⚖️', label: 'Divorce', desc: 'Courts need fair market value to equitably divide marital assets.' },
              { icon: '🏛️', label: 'Estate Settlement', desc: 'Establishes date-of-death value for probate and tax basis.' },
              { icon: '📝', label: 'Tax Dispute', desc: 'Challenge your DCAD assessed value with a certified appraisal.' },
            ].map(c => (
              <div key={c.label} style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 26, marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.label}</div>
                <div style={{ fontSize: 14, color: '#555', lineHeight: 1.5 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 14 }}>🏠 How DFW Appraisers Determine Value</h2>
          <div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 12, padding: 24 }}>
            <p style={{ lineHeight: 1.8, marginTop: 0 }}>DFW appraisers use the <strong>Sales Comparison Approach</strong> — finding 3-5 comparable homes (comps) that sold within the last 90 days, within 1 mile, and within 200 sq ft of your home's size. In fast-moving DFW submarkets like Frisco or Southlake, appraisers sometimes must expand to 6 months or 2 miles due to limited inventory.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginTop: 16 }}>
              {[['📍 Location', '1-mile radius preferred'], ['📅 Recency', '90 days max (180 in low-volume areas)'], ['📐 Size', 'Within 150-200 sq ft ideally']].map(([icon, text]) => (
                <div key={text} style={{ background: '#f0f4ff', borderRadius: 8, padding: 14, textAlign: 'center', fontSize: 14 }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{icon}</div>
                  <div style={{ color: '#333′ }}>{text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 14 }}>⚠️ The DFW Appraisal Gap Problem</h2>
          <div style={{ background: '#fff8e1', border: '1px solid #f5c542', borderRadius: 12, padding: 22 }}>
            <p style={{ margin: 0, lineHeight: 1.8 }}>In DFW hot markets, <strong>appraisals commonly lag actual market value by 5-12%</strong>. A home that sold for $520K in May may only appraise at $490K because appraisers must use closed sales from March — before the latest price surge. Buyers should budget for potential appraisal gaps. Sellers should understand why buyers may request concessions after an appraisal.</p>
          </div>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 14 }}>💡 How to Challenge a Low Appraisal</h2>
          {['1. Request a copy of the appraisal report immediately.', '2. Review the comps used — were any in inferior condition or different neighborhoods?', '3. Provide the appraiser with better comps they may have missed (recent sales, pending sales if allowed).', '4. Document improvements: new roof, HVAC, kitchen remodel with receipts.', '5. Request a Reconsideration of Value (ROV) through your lender — it\’s free.', '6. If still unsatisfied, hire a second independent appraiser (~$450-700) for a second opinion.'].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ background: '#0066cc', color: '#fff', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
              <div style={{ lineHeight: 1.7, color: '#333′ }}>{step}</div>
            </div>
          ))}
        </section>

        <section style={{ background: '#fff', border: '2px solid #0066cc', borderRadius: 14, padding: 28 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 0, marginBottom: 20 }}>🧮 Appraisal Value Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>ZIP Code</label>
              <select value={zip} onChange={e => setZip(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 15 }}>
                {Object.entries(ZIP_TIERS).map(([z, t]) => <option key={z} value={z}>{z} — {t.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Home Size</label>
              <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #ccc', fontSize: 15 }}>
                <option value="under1500″>Under 1,500 sq ft</option>
                <option value="1500to2500″>1,500 – 2,500 sq ft</option>
                <option value="2500to3500″>2,500 – 3,500 sq ft</option>
                <option value="over3500″>Over 3,500 sq ft</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#0066cc', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Estimate Appraised Value Range</button>
          {result && (
            <div style={{ marginTop: 22, background: '#f0f8ff', borderRadius: 10, padding: 20, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
              <div style={{ textAlign: 'center' }}><div style={{ fontSize: 13, color: '#555', marginBottom: 4 }}>Low Estimate</div><div style={{ fontSize: 22, fontWeight: 800, color: '#0066cc' }}>{fmt(result.low)}</div></div>
              <div style={{ textAlign: 'center' }}><div style={{ fontSize: 13, color: '#555', marginBottom: 4 }}>High Estimate</div><div style={{ fontSize: 22, fontWeight: 800, color: '#0066cc' }}>{fmt(result.high)}</div></div>
              <div style={{ textAlign: 'center' }}><div style={{ fontSize: 13, color: '#555', marginBottom: 4 }}>Appraisal Cost</div><div style={{ fontSize: 22, fontWeight: 800, color: '#333′ }}>{fmt(result.cost)}</div></div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
