import { useState } from 'react';

const scenarios = [
  {
    damage: 'Major (full replacement needed)',
    deductible: '$1,000',
    strategy: 'File immediately. Document everything before cleanup. Your adjuster will likely total the roof. Supplement for gutters, skylight seals, and HVAC caps.',
    outcome: 'New roof + gutters. Out of pocket: $1,000 deductible.',
    timeline: '3–6 weeks from claim to install',
    risks: ['Adjuster undercounting hits', 'Contractor price-gouging after storm', 'Missing supplement items'],
    story: 'The Williams family in Southlake had a 2023 hailstorm drop 2-inch hail. They photographed damage within 2 hours, filed with State Farm the same day, and hired a local roofer (not a storm chaser). Their $28,000 roof + $4,200 gutters were fully covered minus the $1,000 deductible.',
  },
  {
    damage: 'Moderate (partial damage, borderline)',
    deductible: '$2,500',
    strategy: 'Get a public adjuster or contractor with supplement experience. Adjusters often undercount on borderline claims. A second inspection after your contractor documents the damage can change the outcome.',
    outcome: 'Typically 60–80% coverage. Supplement negotiation is key.',
    timeline: '4–10 weeks including supplement negotiation',
    risks: ['Claim denial if adjuster calls it cosmetic', 'Having to cover more out of pocket', 'Delays from supplement process'],
    story: 'The Garcias in McKinney had moderate damage across half the roof. Their first adjuster offered $6,200. Their contractor documented 34 additional hit locations and submitted a supplement. Final approved claim: $14,800. They paid the $2,500 deductible and $800 in non-covered items.',
  },
  {
    damage: 'Minor (cosmetic, granule loss)',
    deductible: '$3,000',
    strategy: 'Be careful here. Filing a claim that gets denied — or paid under your deductible — still counts as a claim on your record and can raise premiums. Get a contractor opinion before filing.',
    outcome: 'Often not worth filing. Repair out of pocket if under $3K.',
    timeline: 'N/A — likely not worth claiming',
    risks: ['Premium increase after claim', 'Policy non-renewal in high-claim areas', 'Deductible exceeds payout'],
    story: 'The Patels in Plano got a free roof inspection after their neighbor filed. Their contractor found granule loss and minor dings but said actual repair cost was $1,800. Filing would have cost them the $3,000 deductible plus a likely premium increase. They paid $1,800 out of pocket and kept their clean record.',
  },
];

export default function DFWHailClaimSuccessGuide() {
  const [damageIdx, setDamageIdx] = useState(0);
  const s = scenarios[damageIdx];

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0A1628', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ backgroundColor: '#F5E642', display: 'inline-block', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
          DFW HAIL CLAIM GUIDE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Hail Insurance Claims: What Actually Works</h1>
        <p style={{ color: '#4B5563', marginBottom: 28 }}>DFW averages 8–12 significant hail events per year. Here's how real homeowners navigated their claims — and what to do based on your damage level and deductible.</p>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>Select your damage level:</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {scenarios.map((s, i) => (
              <button key={i} onClick={() => setDamageIdx(i)} style={{
                padding: '8px 14px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                backgroundColor: damageIdx === i ? '#0A1628′ : '#E5E7EB', color: damageIdx === i ? '#F5E642' : '#0A1628',
              }}>
                {s.damage}
              </button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            <span style={{ fontWeight: 700, fontSize: 18 }}>{s.damage} — Deductible: {s.deductible}</span>
            <span style={{ backgroundColor: '#D1FAE5', padding: '4px 10px', borderRadius: 4, fontWeight: 700, fontSize: 13 }}>⏱ {s.timeline}</span>
          </div>

          <div style={{ backgroundColor: '#FAFAFA', borderLeft: '3px solid #F5E642', padding: '12px 16px', borderRadius: 4, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>📋 Claim Strategy</div>
            <p style={{ margin: 0, lineHeight: 1.7, color: '#374151′ }}>{s.strategy}</p>
          </div>

          <p style={{ lineHeight: 1.7, marginBottom: 16 }}><strong>Real Story:</strong> {s.story}</p>

          <div style={{ backgroundColor: '#EFF6FF', borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>✅ Expected Outcome</div>
            <p style={{ margin: 0, color: '#1E40AF' }}>{s.outcome}</p>
          </div>

          <div>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>⚠️ What Could Go Wrong</div>
            {s.risks.map((r, i) => (
              <div key={i} style={{ padding: '5px 0', borderBottom: '1px solid #F3F4F6', fontSize: 14, color: '#DC2626′ }}>⚡ {r}</div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', backgroundColor: '#0A1628', borderRadius: 12, padding: 24, color: '#fff' }}>
          <p style={{ margin: '0 0 12px', fontWeight: 600 }}>Find a licensed DFW roofer who handles insurance supplements:</p>
          <div style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '10px 24px', borderRadius: 6, display: 'inline-block', fontWeight: 700, cursor: 'pointer' }}>
            Get 3 Roofer Quotes → prolnk.io
          </div>
        </div>
      </div>
    </div>
  );
}
