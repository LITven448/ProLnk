import { useState } from 'react';

const projects = [
  { name: 'Garage Door Replacement', costLow: 1200, costHigh: 2500, valueLow: 1400, valueHigh: 2800, roi: 110, essential: false },
  { name: 'Landscaping / Curb Appeal', costLow: 2000, costHigh: 8000, valueLow: 3000, valueHigh: 10000, roi: 108, essential: false },
  { name: 'Attic Insulation (to R-49)', costLow: 1500, costHigh: 3500, valueLow: 1800, valueHigh: 4000, roi: 116, essential: false },
  { name: 'Minor Kitchen Remodel', costLow: 8000, costHigh: 18000, valueLow: 14000, valueHigh: 22000, roi: 86, essential: false },
  { name: 'Exterior Paint (Neutral)', costLow: 3000, costHigh: 7000, valueLow: 4000, valueHigh: 9000, roi: 87, essential: false },
  { name: 'Wood Deck Addition', costLow: 8000, costHigh: 20000, valueLow: 6000, valueHigh: 14000, roi: 72, essential: false },
  { name: 'Bathroom Remodel (Mid)', costLow: 12000, costHigh: 25000, valueLow: 9000, valueHigh: 18000, roi: 71, essential: false },
  { name: 'Roof Replacement', costLow: 12000, costHigh: 22000, valueLow: 8000, valueHigh: 15000, roi: 68, essential: true },
  { name: 'New HVAC System', costLow: 5000, costHigh: 12000, valueLow: 3000, valueHigh: 7000, roi: 59, essential: true },
  { name: 'Pool Addition', costLow: 35000, costHigh: 80000, valueLow: 8000, valueHigh: 20000, roi: 27, essential: false },
];

const worstProjects = [
  { name: 'Pool Addition', roi: 27, note: 'Lifestyle purchase, not investment' },
  { name: 'Sunroom Addition', roi: 35, note: 'Limited usability in DFW heat' },
  { name: 'Converting Garage', roi: 40, note: 'Removes valued parking/storage' },
  { name: 'High-End Master Suite', roi: 55, note: 'Over-improving for the neighborhood' },
];

type SortKey = 'roi' | 'costLow' | 'valueHigh';

export default function DFWHomeImprovementROI2026() {
  const [sortBy, setSortBy] = useState<SortKey>('roi');
  const [sorted, setSorted] = useState([...projects]);

  const handleSort = (key: SortKey) => {
    setSortBy(key);
    setSorted([...projects].sort((a, b) => key === 'costLow' ? a[key] - b[key] : b[key] - a[key]));
  };

  const roiColor = (roi: number) => roi >= 100 ? '#059669' : roi >= 80 ? '#10B981' : roi >= 65 ? '#F59E0B' : '#EF4444';

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', padding: '60px 24px 48px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🏠 📈</div>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#FFFFFF', margin: '0 0 16px', lineHeight: 1.2 }}>
            DFW Home Improvement ROI Guide 2026
          </h1>
          <p style={{ fontSize: 18, color: '#94A3B8', margin: 0 }}>What Adds Value, What Doesn't — DFW Market Data</p>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>

        {/* Sort Controls */}
        <section style={{ marginTop: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0F172A', margin: 0 }}>Top ROI Improvements for DFW Resale</h2>
            <div style={{ display: 'flex', gap: 8 }}>
              {([['roi', 'Sort by ROI'], ['costLow', 'Sort by Cost'], ['valueHigh', 'Sort by Value']] as [SortKey, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => handleSort(key)}
                  style={{
                    padding: '8px 14px',
                    background: sortBy === key ? '#0F172A' : '#F1F5F9',
                    color: sortBy === key ? '#FFFFFF' : '#475569',
                    border: '1px solid #E2E8F0',
                    borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#F8FAFC' }}>
                    {['Project', 'Cost Range', 'Value Added', 'ROI', ''].map(h => (
                      <th key={h} style={{ padding: '14px 20px', textAlign: 'left', color: '#64748B', fontWeight: 600, borderBottom: '1px solid #E5E7EB', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((p, i) => (
                    <tr key={p.name} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 600, color: '#111827', borderBottom: '1px solid #F1F5F9' }}>
                        {p.name}
                        {p.essential && <span style={{ marginLeft: 8, fontSize: 11, background: '#FEF3C7', color: '#92400E', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>Essential for Sale</span>}
                      </td>
                      <td style={{ padding: '14px 20px', color: '#374151', borderBottom: '1px solid #F1F5F9', whiteSpace: 'nowrap' }}>
                        ${p.costLow.toLocaleString()} – ${p.costHigh.toLocaleString()}
                      </td>
                      <td style={{ padding: '14px 20px', color: '#374151', borderBottom: '1px solid #F1F5F9', whiteSpace: 'nowrap' }}>
                        ${p.valueLow.toLocaleString()} – ${p.valueHigh.toLocaleString()}
                      </td>
                      <td style={{ padding: '14px 20px', borderBottom: '1px solid #F1F5F9' }}>
                        <span style={{ fontWeight: 800, fontSize: 16, color: roiColor(p.roi) }}>{p.roi}%</span>
                      </td>
                      <td style={{ padding: '14px 20px', borderBottom: '1px solid #F1F5F9' }}>
                        <div style={{ width: 80, height: 8, background: '#E5E7EB', borderRadius: 4, overflow: 'hidden' }}>
                          <div style={{ width: `${Math.min(p.roi, 120) / 120 * 100}%`, height: '100%', background: roiColor(p.roi), borderRadius: 4 }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Worst ROI */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#DC2626', marginBottom: 20 }}>❌ Worst ROI Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            {worstProjects.map(p => (
              <div key={p.name} style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12, padding: 18 }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#DC2626', marginBottom: 4 }}>{p.roi}%</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#7F1D1D', marginBottom: 6 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: '#991B1B' }}>{p.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Pro Tips */}
        <section style={{ marginTop: 48, background: '#F0FDF4', border: '2px solid #BBF7D0', borderRadius: 16, padding: 28 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#14532D', marginBottom: 16 }}>💡 DFW Market Tips 2026</h2>
          {[
            'Attic insulation is the best ROI project in DFW — it lowers energy bills dramatically and transfers immediately to appraisers.',
            'Garage door replacement has the highest ROI on this list because it’s highly visible and dramatically improves curb appeal for under $2,500.',
            'Neutral exterior paint (greige, warm white, light gray) sells faster in DFW than bold colors — appeal to the widest buyer pool.',
            'Roof replacement and HVAC are marked "essential for sale" — buyers will negotiate hard or walk away if these are deferred. They are necessities, not upgrades.',
            'Pool additions average only 27% ROI in DFW — despite our hot climate, many buyers factor in ongoing maintenance ($3,000–8,000/yr) and safety concerns.',
          ].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < 4 ? 14 : 0 }}>
              <div style={{ color: '#22C55E', fontSize: 18, flexShrink: 0, marginTop: 2 }}>✓</div>
              <p style={{ color: '#166534', fontSize: 14, margin: 0, lineHeight: 1.7 }}>{tip}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section style={{ marginTop: 48, background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🔨</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>Get Quotes for Your Highest-ROI Project</h2>
          <p style={{ color: '#93C5FD', fontSize: 15, margin: '0 0 24px' }}>Connect with verified contractors through TrustyPro — transparent pricing, no surprises.</p>
          <a href="/get-quotes" style={{ display: 'inline-block', padding: '14px 36px', background: '#FCD34D', color: '#1E3A8A', borderRadius: 10, fontWeight: 800, fontSize: 16, textDecoration: 'none' }}>
            Get Free Contractor Quotes →
          </a>
        </section>

      </div>
    </div>
  );
}
