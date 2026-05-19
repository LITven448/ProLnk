import { useState } from 'react';

const situations = [
  {
    id: 'young-owner',
    label: '🌱 New Homeowner',
    recs: [
      'File for Texas Homestead Exemption immediately — saves $800–$2,000/year in property taxes.',
      'Add your home to the ProLnk Home Health Vault to start building origination rights.',
      'Draft a simple will or TOD deed so your home passes outside of probate.',
    ],
    insight: 'Every year you delay homestead filing costs you money. Do it the first January you own.',
  },
  {
    id: 'growing-equity',
    label: '📈 Growing Equity',
    recs: [
      'Refinance strategically — DFW appreciation means your LTV may qualify for better rates.',
      'Use equity for home improvements, not lifestyle expenses, to compound your legacy asset.',
      'Consider a Transfer-on-Death deed so heirs receive stepped-up basis and avoid probate.',
    ],
    insight: 'DFW homes appreciate 6–8% annually. Equity reinvested in the home multiplies that gain.',
  },
  {
    id: 'multi-property',
    label: '🏘️ Multiple Properties',
    recs: [
      'Structure each property with a separate LLC to limit liability cross-contamination.',
      'Earn origination rights on every property in the ProLnk Vault — each generates passive income.',
      'Use 1031 exchanges to defer capital gains when repositioning your DFW portfolio.',
    ],
    insight: 'Origination rights are permanent and stackable. Every home in your Vault earns forever.',
  },
  {
    id: 'estate-planning',
    label: '📜 Estate Planning',
    recs: [
      'Texas allows Transfer-on-Death deeds — beneficiaries inherit with stepped-up tax basis.',
      'Gift home equity gradually to heirs using annual exclusion limits to reduce estate tax.',
      'Ensure origination rights are explicitly named in your estate plan — they transfer with the home.',
    ],
    insight: 'Origination rights attached to a home become a perpetual income stream for heirs.',
  },
  {
    id: 'legacy-minded',
    label: '🌳 Legacy Minded',
    recs: [
      'Build a family home maintenance fund — even $500/year compounds to protect the asset.',
      'Document every improvement with permits and records so heirs understand the home\’s history.',
      'Origination rights + Home Health Vault data make your home a documented, income-generating legacy.',
    ],
    insight: 'A well-documented DFW home is worth more and transfers far more smoothly to the next generation.',
  },
];

export default function DFWHomeLegacyGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = situations.find((s) => s.id === selected);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌳</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>DFW Home Legacy Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 18, lineHeight: 1.6 }}>
            Your DFW home can become a generational financial asset — if you structure it right.
            Select your situation for tailored legacy planning recommendations.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))', gap: 12, marginBottom: 32 }}>
          {situations.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              style={{
                backgroundColor: selected === s.id ? '#F5E642' : '#1e2d45',
                color: selected === s.id ? '#0A1628' : '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '14px 10px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 13,
                transition: 'all 0.2s',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ backgroundColor: '#1e2d45', borderRadius: 16, padding: 32 }}>
            <h2 style={{ color: '#F5E642', fontSize: 24, marginBottom: 24 }}>{active.label} Legacy Plan</h2>
            <div style={{ marginBottom: 24 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Recommendations</div>
              {active.recs.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <p style={{ fontSize: 15, lineHeight: 1.7, margin: 0 }}>{r}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ color: '#F5E642', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Key Insight</div>
              <p style={{ fontSize: 16, lineHeight: 1.7 }}>{active.insight}</p>
            </div>
          </div>
        )}

        {!active && (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: 40 }}>
            Select your family situation above to see your personalized DFW legacy plan.
          </div>
        )}
      </div>
    </div>
  );
}
