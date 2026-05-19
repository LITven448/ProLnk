import { useState } from 'react';

const CHECKLIST_ITEMS = [
  { id: 1, label: 'Request last 3 years of HOA financial statements', risk: 'high' },
  { id: 2, label: 'Review HOA meeting minutes for deferred maintenance or litigation', risk: 'high' },
  { id: 3, label: 'Confirm rental restriction policy (Airbnb / short-term)', risk: 'high' },
  { id: 4, label: 'Check pet restrictions and breed/size limits', risk: 'medium' },
  { id: 5, label: 'Verify HOA master insurance policy coverage (walls-in vs. bare walls)', risk: 'high' },
  { id: 6, label: 'Obtain HO-6 quote for interior + personal property coverage', risk: 'medium' },
  { id: 7, label: 'Check FHA/VA condo approval status on HUD approved list', risk: 'high' },
  { id: 8, label: 'Review HOA reserve fund adequacy (goal: 70%+ funded)', risk: 'high' },
];

export default function DFWCondoBuyingGuide() {
  const [checked, setChecked] = useState<number[]>([]);

  function toggle(id: number) {
    setChecked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  }

  const score = Math.round((checked.length / CHECKLIST_ITEMS.length) * 100);
  const riskLabel = score >= 75 ? 'Low Risk' : score >= 50 ? 'Moderate Risk' : 'High Risk';
  const riskColor = score >= 75 ? '#4ade80′ : score >= 50 ? '#facc15' : '#f87171';

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          TrustyPro — DFW Homeowner Intelligence
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, lineHeight: 1.15, margin: '0 0 16px' }}>
          DFW Condo Buying Guide
        </h1>
        <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 640, lineHeight: 1.7, margin: '0 0 48px' }}>
          What Single-Family Buyers Miss
        </p>

        {/* Market context */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32, borderLeft: '4px solid #6366f1′ }}>
          <div style={{ fontSize: 13, color: '#818cf8', fontWeight: 700, marginBottom: 12, textTransform: 'uppercase' }}>DFW Condo Market Reality</div>
          <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.7 }}>
            Condos make up only <strong style={{ color: '#f1f5f9′ }}>8% of DFW sales</strong> — far below the national average. Many DFW buyers overlook them entirely, but the right condo can be an excellent investment. The catch: condo due diligence is fundamentally different from single-family, and buyers who treat it the same often get burned.
          </p>
        </div>

        {/* HOA Deep Dive */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 20px', color: '#f1f5f9′ }}>🏢 HOA Due Diligence</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { title: 'HOA Financial Health', detail: 'Request last 3 years of financials. Low reserves = special assessments ahead. A reserve fund below 50% funded is a red flag.' },
              { title: 'HOA Meeting Minutes', detail: 'What problems are being discussed? Deferred maintenance? Litigation? A quiet HOA isn’t always a healthy one.' },
              { title: 'Rental Restrictions', detail: 'Many DFW condo associations prohibit rentals under 6 months — killing Airbnb. Some restrict rentals entirely. Check before you assume.' },
              { title: 'Pet Restrictions', detail: 'More restrictive than single-family HOAs. Breed bans, weight limits (often 25 lbs), and pet deposits are common.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#0f172a', borderRadius: 10, padding: 20 }}>
                <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: 15 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Insurance */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 20px', color: '#f1f5f9′ }}>🛡️ Insurance — Two Separate Policies</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0f172a', borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#818cf8', marginBottom: 8 }}>HOA Master Policy</div>
              <div style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: 15 }}>Covers common areas and the building structure. May be "bare walls" (your problem inside the drywall) or "all-in" (covers fixtures). Know which type before closing.</div>
            </div>
            <div style={{ background: '#0f172a', borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#4ade80', marginBottom: 8 }}>HO-6 Policy (You Buy)</div>
              <div style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: 15 }}>Covers your interior, personal property, and liability. Required by most lenders. Get quotes before closing — costs vary significantly by building age and coverage.</div>
            </div>
          </div>
        </div>

        {/* FHA/VA */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 20px', color: '#f1f5f9′ }}>🏛️ FHA/VA Condo Approval</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: '0 0 16px' }}>
            Not all condos are FHA or VA approved. If you're using an FHA or VA loan, the entire condo community must be on HUD’s approved list — not just your unit. Check <strong style={{ color: '#818cf8' }}>HUD.gov/program_offices/housing/sfh/reo/condos</strong> before you fall in love with a unit.
          </p>
        </div>

        {/* DFW Markets */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 20px', color: '#f1f5f9′ }}>📍 DFW Condo Hot Spots</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { area: 'Uptown Dallas', note: 'Most active; premium pricing' },
              { area: 'Las Colinas', note: 'Urban walkable; mixed-use' },
              { area: 'Addison', note: 'Restaurant corridor; solid rental demand' },
              { area: 'Frisco Station', note: 'Newer product; lower HOA risk' },
              { area: 'Downtown Dallas', note: 'Limited inventory; higher HOA fees' },
            ].map(m => (
              <div key={m.area} style={{ background: '#0f172a', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: 4, fontSize: 14 }}>{m.area}</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>{m.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* TrustyPro note */}
        <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', borderRadius: 16, padding: 32, marginBottom: 40, border: '1px solid #4338ca' }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#a5b4fc', marginBottom: 8 }}>🔍 TrustyPro Works the Same for Condos</div>
          <p style={{ color: '#c7d2fe', lineHeight: 1.7, margin: 0 }}>
            Our AI scan covers your unit's interior systems — HVAC, plumbing, electrical — exactly the same as single-family. The HOA handles the structure; you own everything inside your walls. TrustyPro helps you protect that investment.
          </p>
        </div>

        {/* Interactive Checklist */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px', color: '#f1f5f9′ }}>✅ Condo Due Diligence Checklist</h2>
          <p style={{ color: '#64748b', margin: '0 0 24px', fontSize: 15 }}>Check off each item before making an offer.</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 28, background: '#0f172a', borderRadius: 12, padding: 20 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: riskColor }}>{score}%</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>complete</div>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: riskColor }}>{riskLabel}</div>
              <div style={{ fontSize: 14, color: '#64748b' }}>{checked.length} of {CHECKLIST_ITEMS.length} items verified</div>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            {CHECKLIST_ITEMS.map(item => {
              const done = checked.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    background: done ? '#0f2d1a' : '#0f172a',
                    border: `1px solid ${done ? '#166534' : '#1e293b'}`,
                    borderRadius: 10, padding: '14px 18px', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <div style={{
                    width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                    background: done ? '#4ade80′ : ’transparent',
                    border: `2px solid ${done ? '#4ade80' : '#334155'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, color: '#0f172a', fontWeight: 700,
                  }}>{done ? '✓' : ''}</div>
                  <span style={{ color: done ? '#86efac' : '#cbd5e1', fontSize: 15, flex: 1 }}>{item.label}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 99, flexShrink: 0,
                    background: item.risk === 'high' ? '#450a0a' : '#422006',
                    color: item.risk === 'high' ? '#fca5a5′ : '#fdba74',
                  }}>{item.risk.toUpperCase()}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
