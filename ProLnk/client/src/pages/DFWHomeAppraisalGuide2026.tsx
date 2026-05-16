import { useState } from 'react';

const appraisalFactors = [
  { feature: 'Updated Kitchen', impact: '+$8K-$15K', note: 'Modern finishes, new appliances' },
  { feature: 'Renovated Bathrooms', impact: '+$5K-$12K', note: 'Tile, vanity, fixtures' },
  { feature: 'New HVAC System', impact: '+$4K-$8K', note: '100% appraiser-recognized' },
  { feature: 'Foundation Issues', impact: '-$20K-$50K', note: 'Requires repair docs to mitigate' },
  { feature: 'New Roof (<5yr)', impact: '+$3K-$6K', note: 'Age and condition scored' },
  { feature: 'Hardwood Floors', impact: '+$2K-$5K', note: 'vs carpet baseline' },
  { feature: 'Pool', impact: '+$10K-$25K', note: 'DFW climate adds premium' },
  { feature: 'Curb Appeal', impact: '+$3K-$8K', note: 'First impression factor' },
];

export default function DFWHomeAppraisalGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [lowAppraisal, setLowAppraisal] = useState(false);

  const selectedFactor = appraisalFactors.find(f => f.feature === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW REAL ESTATE · 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏠 DFW Home Appraisal Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          In Texas, appraisers must hold a TALCB license. They use comparable sales (comps) within 1 mile and 90 days,
          then apply adjustments for condition, upgrades, and lot size. DFW's fast-moving market means comps can shift
          your value $20K+ in a single month.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Feature Impact Explorer</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>Tap a feature to see how appraisers value it in DFW:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {appraisalFactors.map(f => (
              <button
                key={f.feature}
                onClick={() => setSelected(selected === f.feature ? null : f.feature)}
                style={{
                  background: selected === f.feature ? '#F5E642' : '#1a3a5c',
                  color: selected === f.feature ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 8, padding: '8px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600
                }}
              >{f.feature}</button>
            ))}
          </div>
          {selectedFactor && (
            <div style={{ background: '#1a3a5c', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>{selectedFactor.impact}</div>
              <div style={{ color: '#cbd5e1', fontSize: 14 }}>{selectedFactor.note}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚠️ What If Appraisal Comes In Low?</h2>
          <button
            onClick={() => setLowAppraisal(!lowAppraisal)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontWeight: 700, fontSize: 14, marginBottom: 16 }}
          >{lowAppraisal ? 'Hide Options' : 'Show My Options'}</button>
          {lowAppraisal && (
            <div style={{ display: 'grid', gap: 12 }}>
              {[
                { icon: '💬', title: 'Renegotiate Price', desc: 'Ask seller to reduce to appraised value — common in DFW buyer market' },
                { icon: '💵', title: 'Pay the Gap', desc: 'Cover difference in cash if you want the home — risky if overpaying' },
                { icon: '📋', title: 'Appraisal Rebuttal', desc: 'Provide better comps to lender — works 20-30% of the time' },
                { icon: '🚪', title: 'Walk Away', desc: 'If appraisal contingency in contract, you get deposit back' },
              ].map(o => (
                <div key={o.title} style={{ background: '#1a3a5c', borderRadius: 8, padding: 14, display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 22 }}>{o.icon}</span>
                  <div><div style={{ fontWeight: 700, marginBottom: 2 }}>{o.title}</div><div style={{ color: '#94a3b8', fontSize: 13 }}>{o.desc}</div></div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>📊 Get a ProLnk Home Value Estimate</div>
          <div style={{ color: '#1a3a5c', fontSize: 13, marginTop: 6 }}>Free, instant, and based on real DFW transaction data</div>
        </div>
      </div>
    </div>
  );
}