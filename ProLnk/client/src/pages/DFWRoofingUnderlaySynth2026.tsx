import { useState } from 'react';

const situations: Record<string, { rec: string; why: string; dfwNote: string; cost: string }> = {
  asphalt: {
    rec: '🥇 Standard Synthetic Underlayment',
    why: 'Standard synthetic (e.g., synthetic felt, 10–15 lb equivalent) provides excellent UV resistance during installation — critical in DFW where new decks can sit exposed for days in summer heat before shingles go on. It outperforms 15 lb felt in tear resistance and moisture control.',
    dfwNote: 'DFW summer installs leave underlayment exposed to 100°F+ temps and UV. Standard synthetic withstands this far better than organic felt, which degrades within days. Look for a product rated for at least 6-month UV exposure.',
    cost: '$0.10–$0.15 / sq ft installed (adds $300–$600 to a typical 2,000 sq ft DFW roof)',
  },
  metal: {
    rec: '🥇 High-Temp Synthetic Underlayment',
    why: 'Metal roofing panels in DFW summer reach 150–180°F on the surface. Standard synthetic can soften or bond to the metal at these temps, causing problems at re-roofing time. High-temp synthetic (rated to 250°F+) stays stable and allows the metal to expand and contract freely.',
    dfwNote: 'Standing seam metal in DFW is increasingly popular for its Class 4 impact rating and longevity. Always specify high-temp underlayment — it is the code-appropriate choice and protects the deck from moisture if panels ever develop a pinhole.',
    cost: '$0.20–$0.30 / sq ft installed (adds $600–$1,200 to a typical 2,000 sq ft DFW roof)',
  },
  hail: {
    rec: '🥇 Peel-and-Stick (Self-Adhering) Underlayment',
    why: 'Peel-and-stick adhered underlayment provides the best secondary water barrier in DFW hail zones. When hail damages shingles and creates entry points, peel-and-stick prevents water infiltration until repairs are made. It also eliminates fastener penetrations as leak points.',
    dfwNote: 'Insurance companies in DFW increasingly incentivize peel-and-stick on the entire deck (not just eaves) for Class 4 rated systems. Some carriers offer 5–10% premium discount for full adhered underlayment. Verify with your insurer before specifying.',
    cost: '$0.35–$0.55 / sq ft installed (adds $1,000–$2,200 to a typical 2,000 sq ft DFW roof)',
  },
  replace: {
    rec: '✅ Match Existing Underlayment Type',
    why: 'For partial replacements (hail damage section, skylight repair), match the existing underlayment type for consistent moisture and thermal performance. Mixing felt and synthetic can create moisture trapping at the seam in DFW humidity cycles.',
    dfwNote: 'If the existing underlayment is 15 lb felt and it is more than 15 years old, consider upgrading the entire section to synthetic during the repair. Felt deteriorates significantly in DFW heat over time and may be brittle or crumbling.',
    cost: 'Depends on scope — budget $0.15–$0.55 / sq ft for the replaced area based on product choice',
  },
};

export default function DFWRoofingUnderlaySynth2026() {
  const [selected, setSelected] = useState('');

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>🏚️ Synthetic Underlayment Comparison Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem', lineHeight: 1.6 }}>Choosing the right synthetic underlayment for DFW roofs — where 100°F summer heat, severe hail, and high UV demand better performance than traditional 15 lb felt.</p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📊 Why Synthetic Beats Felt in DFW</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #2D4A7A' }}>
                  {['Property', '15 lb Felt', 'Standard Synthetic', 'High-Temp / Peel-Stick'].map(h => (
                    <th key={h} style={{ color: '#F5E642', padding: '0.5rem', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['UV Resistance', '⚠️ Days only', '✅ 6+ months', '✅ 12+ months'],
                  ['Heat Rating', '⚠️ ~180°F', '✅ 220°F', '✅ 250°F+'],
                  ['Tear Resistance', '❌ Low', '✅ High', '✅ Very High'],
                  ['Moisture Control', '⚠️ Moderate', '✅ Good', '✅ Excellent'],
                  ['DFW Hail Rating', '❌ Poor', '⚠️ Fair', '✅ Best'],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1E3A5F' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ color: j === 0 ? '#FFFFFF' : '#94A3B8', padding: '0.5rem', fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>🔍 Select Your Roofing Situation</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1rem' }}>
            {[['asphalt', '🏠 New Asphalt Shingle Roof'], ['metal', '🔩 Metal Roofing Installation'], ['hail', '🌨️ DFW Hail Zone / Insurance Upgrade'], ['replace', '🔧 Partial Replacement / Repair']].map(([key, label]) => (
              <button key={key} onClick={() => setSelected(key)} style={{ background: selected === key ? '#1E3A5F' : '#0A1628', color: '#E2E8F0', border: `1px solid ${selected === key ? '#F5E642' : '#2D4A7A'}`, borderRadius: 8, padding: '0.75rem 1rem', fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem', textAlign: 'left' }}>{label}</button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>{situations[selected].rec}</div>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '0.75rem' }}>{situations[selected].why}</p>
              <div style={{ background: '#0F2040', borderLeft: '3px solid #F5E642', padding: '0.75rem', borderRadius: 6, marginBottom: '0.75rem' }}>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>🌟 DFW Note: {situations[selected].dfwNote}</div>
              </div>
              <div style={{ background: '#0F2040', borderLeft: '3px solid #22C55E', padding: '0.75rem', borderRadius: 6 }}>
                <div style={{ color: '#94A3B8', fontSize: '0.85rem' }}>💰 Cost: {situations[selected].cost}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📋 DFW Code & Insurance Notes</h2>
          {['IRC requires minimum 15 lb felt or equivalent synthetic — synthetic now exceeds this threshold everywhere in DFW.', 'Class 4 impact-rated systems often require specific underlayment — verify with your insurance carrier before choosing product.', 'Peel-and-stick at eaves (36 inches min) is DFW standard practice per local amendments — check your permit requirements.', 'Felt is still code-compliant in most DFW jurisdictions but is increasingly discouraged by contractors for longevity.'].map((t, i) => (
            <div key={i} style={{ color: '#94A3B8', fontSize: '0.9rem', marginBottom: '0.6rem', paddingLeft: '1rem', borderLeft: '2px solid #2D4A7A' }}>{t}</div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', color: '#475569', fontSize: '0.8rem' }}>ProLnk DFW Roofing Resource · 2026</div>
      </div>
    </div>
  );
}