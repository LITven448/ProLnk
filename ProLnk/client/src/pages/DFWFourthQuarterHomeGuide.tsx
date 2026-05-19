import { useState } from 'react';

const tasks = [
  { feature: 'Foundation', q4: 'Resume foundation watering as temps cool — target 2-3x/week through November', financial: 'Avoid $8K-15K in pier repair by maintaining moisture consistency' },
  { feature: 'HVAC', q4: 'Schedule fall tune-up before first cold snap — October is prime time', financial: 'Tune-up ($150) vs emergency heat repair in January ($800-2K)' },
  { feature: 'Roof', q4: 'Clear gutters after pecan/oak drop — DFW trees dump late November', financial: 'Gutter cleaning ($150) prevents fascia rot ($1,200)' },
  { feature: 'Plumbing', q4: 'Wrap exposed pipes before first freeze — DFW gets 2-4 freeze events per winter', financial: 'Pipe insulation ($40) vs burst pipe repair ($3K-8K)' },
  { feature: 'Landscaping', q4: 'Fertilize Bermuda one final time in October — sets up spring green-up', financial: 'Fall fert ($80) doubles spring green-up speed' },
  { feature: 'Property Tax', q4: 'Review January appraisal notice NOW — protest window opens next spring', financial: 'Average DFW protest saves $400-800/year on Collin/Dallas/Tarrant tax bills' },
];

const yearEndActions = [
  '📋 Document all 2025 improvements for tax records and future sale',
  '📊 Get updated home valuation — DFW appreciation averages 4-7% annually',
  '🏦 Review mortgage statement — extra principal payment before year-end',
  '🔒 Check homeowner insurance coverage — ensure new improvements are covered',
  '🎄 Holiday prep: outdoor outlets, lighting circuits, guest bath inspection',
];

export default function DFWFourthQuarterHomeGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const [showFinancial, setShowFinancial] = useState(false);

  const active = tasks.find(t => t.feature === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>ProLnk DFW Series</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🍂 Q4 DFW Home Guide</h1>
        <p style={{ color: '#8899AA', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          October through December — DFW's best weather window for outdoor projects, final maintenance, and setting up a strong 2026. Property taxes are due, year-end decisions matter. Here’s your playbook.
        </p>

        <div style={{ background: '#F5E64215', border: '1px solid #F5E64230', borderRadius: 10, padding: 20, marginBottom: 32 }}>
          <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 15 }}>🌤️ Why Q4 Is Special in DFW</div>
          <p style={{ color: '#AABBCC', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Fall in DFW is genuinely beautiful — highs in the 60s-70s, low humidity, great contractor availability before the holiday slowdown. It's the ideal window to finish outdoor work, weatherize, and prepare for the 2-4 hard freezes that hit each January-February.
          </p>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Select Your Home Feature → Get Your Q4 Priority</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
          {tasks.map(t => (
            <button
              key={t.feature}
              onClick={() => setSelected(t.feature)}
              style={{
                background: selected === t.feature ? '#F5E642′ : '#0D1F38',
                color: selected === t.feature ? '#0A1628′ : '#fff',
                border: '1px solid #1E3A5F',
                borderRadius: 8,
                padding: '12px 8px',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              {t.feature}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0D1F38', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 28 }}>
            <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 10, color: '#F5E642′ }}>🎯 {active.feature} — Q4 Action</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>{active.q4}</p>
            <button
              onClick={() => setShowFinancial(!showFinancial)}
              style={{ background: '#F5E64220', border: '1px solid #F5E64250', color: '#F5E642', borderRadius: 6, padding: '8px 16px', cursor: 'pointer', fontSize: 13 }}
            >
              {showFinancial ? '▲ Hide' : '💰 Show Financial Impact'}
            </button>
            {showFinancial && (
              <div style={{ marginTop: 14, padding: 16, background: '#0A1628', borderRadius: 8, fontSize: 14, color: '#AABBCC', lineHeight: 1.6 }}>
                {active.financial}
              </div>
            )}
          </div>
        )}

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>📅 Year-End Financial Actions for DFW Homeowners</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {yearEndActions.map((a, i) => (
            <div key={i} style={{ background: '#0D1F38', border: '1px solid #1E3A5F', borderRadius: 8, padding: '12px 16px', fontSize: 14, lineHeight: 1.5 }}>
              {a}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 36, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Need a Q4 contractor in DFW?</div>
          <div style={{ color: '#8899AA', fontSize: 14 }}>ProLnk connects you with verified pros — no emergency markups, vetted relationships built before you need them.</div>
        </div>
      </div>
    </div>
  );
}
