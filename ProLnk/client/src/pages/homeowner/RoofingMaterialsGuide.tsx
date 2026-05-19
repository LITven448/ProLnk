import { useState } from 'react';

const materials = [
  {
    id: 'arch',
    label: 'Architectural Shingles',
    icon: '🏠',
    life: '25–30 yrs in DFW',
    cost: '$8–12/sqft installed',
    hail: '⚠️ Standard',
    heat: '⚠️ Moderate',
    verdict: 'Best value — most common choice in DFW.',
    detail:
      'Warranty claims 50 years, but DFW heat and UV degrade them to 25–30 years. Still the most cost-effective starting point. Upgrade to Class 4 for hail resistance.',
  },
  {
    id: 'ir',
    label: 'Impact-Resistant (Class 4)',
    icon: '🛡️',
    life: '30–35 yrs in DFW',
    cost: '$11–15/sqft installed',
    hail: '✅ Excellent',
    heat: '⚠️ Moderate',
    verdict: 'Recommended for DFW — insurance discount often pays for upgrade.',
    detail:
      'Qualifies for 15–25% insurance discount in most DFW counties. Over 5–7 years the premium savings typically cover the upgrade cost. Best overall DFW choice.',
  },
  {
    id: 'metal',
    label: 'Metal (Standing Seam)',
    icon: '⚙️',
    life: '40–50 yrs',
    cost: '$14–22/sqft installed',
    hail: '✅ Excellent',
    heat: '✅ Best',
    verdict: 'Best long-term investment for DFW heat and hail.',
    detail:
      'Reflects heat (lower AC bills), minimal hail damage, 40–50 year lifespan. Higher upfront cost but lowest total cost of ownership. Excellent choice if staying in home 10+ years.',
  },
  {
    id: 'concrete',
    label: 'Concrete Tile',
    icon: '🪨',
    life: '40–50 yrs',
    cost: '$16–25/sqft installed',
    hail: '✅ Good',
    heat: '✅ Good',
    verdict: 'Beautiful but heavy — requires structural assessment first.',
    detail:
      '12–15 lbs/sqft adds significant load. Requires a structural engineer to verify your framing can handle the weight. Skip the assessment and you risk serious structural problems.',
  },
  {
    id: 'clay',
    label: 'Clay Tile',
    icon: '🏺',
    life: '50+ yrs',
    cost: '$18–30/sqft installed',
    hail: '⚠️ Chips',
    heat: '✅ Excellent',
    verdict: 'Beautiful but cracks in DFW freeze/thaw cycles.',
    detail:
      'Clay cracks when water freezes inside the tiles during north Texas winter freezes. Replacement tiles are expensive and hard to match. Better suited for South Texas climates.',
  },
  {
    id: 'tpo',
    label: 'TPO / Built-Up (Flat)',
    icon: '🏗️',
    life: '20–30 yrs',
    cost: '$7–12/sqft installed',
    hail: '⚠️ Moderate',
    heat: '✅ Good (white TPO)',
    verdict: 'Correct choice for flat or low-slope roofs only.',
    detail:
      'White TPO reflects heat well. Built-up (tar and gravel) is durable but heavier. If you have a flat section — addition, patio cover — this is your material. Not for pitched roofs.',
  },
];

const budgets = ['Under $10k', '$10k–$18k', '$18k–$30k', '$30k+'];
const priorities = ['Lowest cost', 'Longest life', 'Best hail resistance', 'Insurance savings'];

function getRecommendation(budget: string, priority: string) {
  if (budget === 'Under $10k' || priority === 'Lowest cost')
    return { mat: 'Architectural Shingles', roi: 'Pay ~$8–10k now, expect replacement in 25–30 yrs. Solid baseline.' };
  if (priority === 'Insurance savings' || priority === 'Best hail resistance')
    return { mat: 'Class 4 Impact-Resistant Shingles', roi: 'Pay $2–3k more upfront. Save 15–25% on insurance annually. Break-even in 5–7 years.' };
  if (priority === 'Longest life' && (budget === '$18k–$30k' || budget === '$30k+'))
    return { mat: 'Standing Seam Metal', roi: 'Highest upfront cost. Lowest 50-year total cost. Best choice if staying long-term.' };
  if (budget === '$18k–$30k')
    return { mat: 'Class 4 Impact-Resistant Shingles', roi: 'In your budget range and best performance for DFW conditions.' };
  return { mat: 'Concrete Tile (with structural assessment)', roi: 'Premium look, 40–50 yr life. Get structural check first — $300–500 well spent.' };
}

export default function RoofingMaterialsGuide() {
  const [active, setActive] = useState('arch');
  const [budget, setBudget] = useState('');
  const [priority, setPriority] = useState('');
  const selected = materials.find((m) => m.id === active)!;
  const rec = budget && priority ? getRecommendation(budget, priority) : null;

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ color: '#6366f1', fontSize: 14, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            🏠 DFW Homeowner Guide
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px' }}>
            DFW Roofing Materials Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', margin: 0 }}>
            What Works in Texas Heat and Hail
          </p>
          <div style={{ marginTop: 20, padding: '16px 20px', background: '#1e1b4b', borderRadius: 10, borderLeft: '4px solid #6366f1′ }}>
            <strong style={{ color: '#a5b4fc' }}>The DFW Challenge:</strong>
            <span style={{ color: '#c7d2fe', marginLeft: 8 }}>
              100°F+ summers · 1.5"+ hail events · intense UV — your material choice matters more here than almost anywhere in the country.
            </span>
          </div>
        </div>

        {/* Material Tabs */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Compare Roofing Materials</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {materials.map((m) => (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                style={{
                  padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
                  background: active === m.id ? '#6366f1′ : '#1e293b',
                  color: active === m.id ? '#fff' : '#94a3b8',
                }}
              >
                {m.icon} {m.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0f172a', borderRadius: 12, border: '1px solid #1e293b', padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 20, marginBottom: 20 }}>
              {[
                { label: 'DFW Lifespan', value: selected.life },
                { label: 'Installed Cost', value: selected.cost },
                { label: 'Hail Rating', value: selected.hail },
                { label: 'Heat Rating', value: selected.heat },
              ].map((s) => (
                <div key={s.label} style={{ background: '#1e293b', borderRadius: 8, padding: '14px 16px' }}>
                  <div style={{ color: '#64748b', fontSize: 12, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ color: '#e2e8f0', fontWeight: 700 }}>{s.value}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#1e1b4b', borderRadius: 8, padding: '12px 16px', marginBottom: 12, color: '#a5b4fc', fontWeight: 600 }}>
              ✅ {selected.verdict}
            </div>
            <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.7 }}>{selected.detail}</p>
          </div>
        </div>

        {/* Hail Callout */}
        <div style={{ background: '#1a1a2e', border: '1px solid #4338ca', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h3 style={{ color: '#a5b4fc', marginTop: 0 }}>🌨️ The DFW Hail Decision</h3>
          <p style={{ color: '#c7d2fe', lineHeight: 1.7, margin: 0 }}>
            For DFW, <strong>Class 4 impact-resistant shingles are the smartest investment</strong> for most homeowners.
            The insurance discount alone (15–25%) often pays for the upgrade over 5–7 years — and DFW averages multiple significant hail events per year.
            Ask your insurance agent for the exact discount before you choose a material.
          </p>
        </div>

        {/* Color & Ventilation */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: 20 }}>
            <h3 style={{ color: '#fbbf24', marginTop: 0 }}>🎨 Color Choice in DFW</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
              Lighter colors = lower cooling costs (cool roof effect). Dark colors absorb heat and push your AC harder.
              In DFW, a light-colored "cool roof" can reduce cooling costs 7–15%.
            </p>
          </div>
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: 20 }}>
            <h3 style={{ color: '#34d399', marginTop: 0 }}>🌬️ Ventilation Requirement</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>
              Code requires 1 sq ft of ventilation per 150 sq ft of attic. In DFW heat, insufficient ventilation
              accelerates shingle degradation by 30–50% and dramatically raises attic temps.
            </p>
          </div>
        </div>

        {/* Interactive Selector */}
        <div style={{ background: '#0f172a', border: '1px solid #4338ca', borderRadius: 12, padding: 28, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#a5b4fc' }}>🔍 Find Your Best Material</h2>
          <p style={{ color: '#64748b', marginBottom: 20 }}>Answer two questions to get a personalized recommendation with ROI estimate.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Your Budget</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {budgets.map((b) => (
                  <button key={b} onClick={() => setBudget(b)} style={{
                    padding: '10px 14px', borderRadius: 8, border: '1px solid', cursor: 'pointer', textAlign: 'left', fontSize: 14,
                    borderColor: budget === b ? '#6366f1′ : '#1e293b',
                    background: budget === b ? '#1e1b4b' : '#0a0a0f',
                    color: budget === b ? '#a5b4fc' : '#64748b',
                  }}>{b}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: 8, fontSize: 14, fontWeight: 600 }}>Top Priority</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {priorities.map((p) => (
                  <button key={p} onClick={() => setPriority(p)} style={{
                    padding: '10px 14px', borderRadius: 8, border: '1px solid', cursor: 'pointer', textAlign: 'left', fontSize: 14,
                    borderColor: priority === p ? '#6366f1′ : '#1e293b',
                    background: priority === p ? '#1e1b4b' : '#0a0a0f',
                    color: priority === p ? '#a5b4fc' : '#64748b',
                  }}>{p}</button>
                ))}
              </div>
            </div>
          </div>
          {rec && (
            <div style={{ background: '#1e1b4b', borderRadius: 10, padding: 20 }}>
              <div style={{ color: '#a5b4fc', fontWeight: 700, marginBottom: 6 }}>✅ Recommended: {rec.mat}</div>
              <div style={{ color: '#c7d2fe', fontSize: 15, lineHeight: 1.6 }}>{rec.roi}</div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏠</div>
          <h3 style={{ color: '#e2e8f0', marginTop: 0 }}>Get Roofing Quotes from DFW Pros</h3>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>ProLnk matches you with licensed, background-checked roofers — no spam, no pressure.</p>
          <button style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff',
            border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16,
            fontWeight: 700, cursor: 'pointer',
          }}>
            Get Free Roofing Quotes →
          </button>
        </div>

      </div>
    </div>
  );
}
