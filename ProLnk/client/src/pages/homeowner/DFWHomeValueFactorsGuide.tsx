import { useState } from 'react';

const factors = [
  { id: 'location', label: 'School District', options: ['Top-tier (Frisco, Plano, Southlake)', 'Above average', 'Average', 'Below average'], scores: [18, 9, 0, -8] },
  { id: 'foundation', label: 'Foundation Condition', options: ['Documented stable + recent report', 'No known issues (undocumented)', 'Minor issues, repaired with warranty', 'Unknown or active issues'], scores: [4, 0, -3, -8] },
  { id: 'kitchen', label: 'Kitchen Condition', options: ['Fully updated (last 5 years)', 'Partially updated', 'Original but functional', 'Original 1980s / dated'], scores: [5, 2, 0, -6] },
  { id: 'roof', label: 'Roof Age', options: ['New (0-3 years)', '4-8 years', '9-14 years', '15+ years'], scores: [3, 0, -3, -8] },
  { id: 'hvac', label: 'HVAC System Age', options: ['New (0-4 years)', '5-10 years', '11-15 years', '16+ years'], scores: [2, 0, -2, -5] },
  { id: 'health', label: 'TrustyPro Health Record', options: ['Clean verified record', 'Partial record', 'No record'], scores: [3, 1, 0] },
];

export default function DFWHomeValueFactorsGuide() {
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const total = Object.values(selections).reduce((a, b) => a + b, 0);
  const allSelected = Object.keys(selections).length === factors.length;

  function getResultLabel() {
    if (total >= 20) return { label: 'Significant Premium', color: '#22c55e', detail: 'Your home likely commands 15-25%+ above comparable market-average homes.' };
    if (total >= 10) return { label: 'Moderate Premium', color: '#86efac', detail: 'Your home should trade 5-15% above comparable market-average homes.' };
    if (total >= 0) return { label: 'Near Market', color: '#facc15', detail: 'Your home is likely priced close to comparable market averages.' };
    if (total >= -10) return { label: 'Moderate Discount', color: '#f97316', detail: 'Buyers will likely negotiate 5-12% below asking. Targeted improvements advised.' };
    return { label: 'Significant Discount Risk', color: '#ef4444', detail: 'Without improvements, expect aggressive buyer negotiations or extended time on market.' };
  }

  const result = getResultLabel();

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#64748b', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>DFW Real Estate Intelligence</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#f8fafc', lineHeight: 1.2, marginBottom: 16 }}>
            DFW Home Value Factors
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.6 }}>
            What adds and subtracts from your home's worth in the Dallas–Fort Worth market.
          </p>
        </div>

        {/* Top 5 Drivers */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 24 }}>🏆 The 5 Biggest Value Drivers in DFW</h2>
          {[
            { num: 1, pct: '40%', title: 'Location', detail: 'School district, ZIP code, proximity to major employment centers (Las Colinas, Uptown, Legacy West).' },
            { num: 2, pct: '20%', title: 'Size and Layout', detail: 'Square footage, bedroom/bath count, open floor plan vs. compartmentalized rooms.' },
            { num: 3, pct: '20%', title: 'Condition', detail: 'Age of systems (roof, HVAC, plumbing), maintenance history, recent updates.' },
            { num: 4, pct: '15%', title: 'Comparable Sales', detail: 'What similar homes actually sold for in the last 6 months within 1 mile.' },
            { num: 5, pct: '5%', title: 'Market Timing', detail: 'Seasonal demand (spring surge in DFW), current 30-year fixed rate environment.' },
          ].map(d => (
            <div key={d.num} style={{ display: 'flex', gap: 16, marginBottom: 16, background: '#1e293b', borderRadius: 12, padding: '20px 24px' }}>
              <div style={{ minWidth: 44, height: 44, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, color: '#fff' }}>{d.num}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 17, color: '#f1f5f9' }}>{d.title}</span>
                  <span style={{ background: '#3b82f620', color: '#60a5fa', fontSize: 13, fontWeight: 700, padding: '2px 10px', borderRadius: 20 }}>{d.pct}</span>
                </div>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: 15 }}>{d.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Adds Value */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 24 }}>✅ What Adds the Most Value in DFW (Dollar for Dollar)</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { item: 'Top-tier school district', impact: '+14–18% premium vs. same house in average district' },
              { item: 'Updated kitchen', impact: '+$15,000–$35,000 perceived value' },
              { item: 'New roof', impact: '+$8,000–$15,000 — eliminates the biggest buyer deduction concern' },
              { item: 'Foundation documented as stable', impact: 'Removes the largest fear factor for DFW buyers — can unlock offers' },
              { item: 'Clean TrustyPro health record', impact: 'Emerging premium — projected +3% in next 3 years as platform grows' },
            ].map((v, i) => (
              <div key={i} style={{ background: '#0f2a1a', border: '1px solid #166534', borderRadius: 10, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ color: '#86efac', fontWeight: 600 }}>{v.item}</span>
                <span style={{ color: '#4ade80', fontSize: 14, fontWeight: 700 }}>{v.impact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hurts Value */}
        <div style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 24 }}>⚠️ What Hurts Value in DFW</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { item: 'Unknown foundation condition', impact: '−3 to −8% or complete deal-killer' },
              { item: 'HVAC system older than 12 years', impact: '−$3,000–$8,000 in buyer negotiations' },
              { item: 'Roof older than 15 years', impact: '−$5,000–$15,000 in buyer negotiations' },
              { item: 'Original 1980s kitchen', impact: '−$10,000–$25,000 vs. updated comparable' },
              { item: 'No covered parking (DFW hail risk)', impact: 'Meaningful detractor in most DFW suburbs' },
            ].map((v, i) => (
              <div key={i} style={{ background: '#1f0a0a', border: '1px solid #7f1d1d', borderRadius: 10, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ color: '#fca5a5', fontWeight: 600 }}>{v.item}</span>
                <span style={{ color: '#ef4444', fontSize: 14, fontWeight: 700 }}>{v.impact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Estimator */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, border: '1px solid #334155' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>🧮 Interactive Value Estimator</h2>
          <p style={{ color: '#64748b', marginBottom: 28, fontSize: 15 }}>Select your home's condition on 6 factors to see your estimated value position vs. DFW market average.</p>
          
          <div style={{ display: 'grid', gap: 20 }}>
            {factors.map(f => (
              <div key={f.id}>
                <div style={{ fontWeight: 600, color: '#cbd5e1', marginBottom: 10, fontSize: 15 }}>{f.label}</div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {f.options.map((opt, idx) => {
                    const selected = selections[f.id] === f.scores[idx];
                    const score = f.scores[idx];
                    return (
                      <button
                        key={idx}
                        onClick={() => { setSelections(s => ({ ...s, [f.id]: score })); setShowResult(false); }}
                        style={{
                          background: selected ? '#1d4ed8' : '#0f172a',
                          border: `1px solid ${selected ? '#3b82f6' : '#334155'}`,
                          borderRadius: 8, padding: '12px 16px', cursor: 'pointer', color: selected ? '#fff' : '#94a3b8',
                          textAlign: 'left', fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          transition: 'all 0.15s',
                        }}
                      >
                        <span>{opt}</span>
                        <span style={{ fontWeight: 700, color: score > 0 ? '#4ade80' : score < 0 ? '#f87171' : '#64748b', minWidth: 44, textAlign: 'right' }}>
                          {score > 0 ? `+${score}%` : score === 0 ? '±0%' : `${score}%`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {allSelected && (
            <div style={{ marginTop: 28 }}>
              <button
                onClick={() => setShowResult(true)}
                style={{ width: '100%', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 10, padding: '16px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}
              >
                See My Value Position
              </button>
            </div>
          )}

          {showResult && allSelected && (
            <div style={{ marginTop: 24, background: '#0f172a', borderRadius: 12, padding: 28, border: `2px solid ${result.color}` }}>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>Your estimated value position</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: result.color, marginBottom: 12 }}>{result.label}</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: result.color, marginBottom: 12 }}>
                {total > 0 ? `+${total}%` : `${total}%`} vs. market average
              </div>
              <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>{result.detail}</p>
              <p style={{ color: '#475569', margin: '16px 0 0', fontSize: 13 }}>
                * This is a simplified educational estimate based on DFW market research. Consult a licensed appraiser for a formal valuation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
