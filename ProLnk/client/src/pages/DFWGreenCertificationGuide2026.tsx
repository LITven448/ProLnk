import { useState } from 'react';

const budgets = ['Under $5,000', '$5,000–$15,000', '$15,000–$40,000', 'Over $40,000'];
const scopes = ['No major renovations planned', 'One or two key upgrades', 'Full HVAC + insulation overhaul', 'Gut renovation or new build'];

const certData: Record<string, Record<string, { certifications: string[]; certCost: string; resalePremium: string; insurance: string; topPick: string; note: string }>> = {
  'Under $5,000': {
    'No major renovations planned': { certifications: ['Pearl Certification ($400–$800)'], certCost: '$400–$800', resalePremium: '1–2%', insurance: 'Minimal impact', topPick: 'Pearl Certified', note: 'Pearl works with your existing home. No upgrades required — they assess what you have and score accordingly.' },
    'One or two key upgrades': { certifications: ['Pearl Certification ($400–$800)', 'Green Built Texas Preliminary ($1,200)'], certCost: '$400–$1,500', resalePremium: '2–4%', insurance: 'Some carriers offer 5–10% discount', topPick: 'Pearl + targeted upgrades', note: 'Smart thermostat + attic insulation upgrade can push your Pearl score significantly.' },
    'Full HVAC + insulation overhaul': { certifications: ['Pearl Silver/Gold ($600–$1,000)', 'Green Built Texas ($2,000)'], certCost: '$600–$2,000', resalePremium: '3–6%', insurance: 'Potential 10–15% discount with Nationwide, USAA', topPick: 'Pearl Gold', note: 'HVAC + insulation overhaul alone qualifies many DFW homes for Pearl Gold.' },
    'Gut renovation or new build': { certifications: ['ENERGY STAR ($500–$2,000)', 'Green Built Texas'], certCost: '$1,000–$3,000', resalePremium: '4–7%', insurance: '10–20% discount possible', topPick: 'ENERGY STAR for Homes', note: 'New build or gut reno — start with ENERGY STAR specs in the design phase. Much cheaper than retrofitting.' },
  },
  '$5,000–$15,000': {
    'No major renovations planned': { certifications: ['Pearl Certification', 'Green Built Texas ($2,000–$4,000)'], certCost: '$400–$4,000', resalePremium: '2–5%', insurance: 'Moderate impact', topPick: 'Pearl Gold', note: 'With this budget, run Pearl first. If your score is high, the certification fee is all you need.' },
    'One or two key upgrades': { certifications: ['ENERGY STAR + Pearl', 'Green Built Texas'], certCost: '$1,000–$4,000', resalePremium: '4–7%', insurance: '10–15% discount likely with major carriers', topPick: 'ENERGY STAR Certified', note: 'One key upgrade (HVAC or insulation) + ENERGY STAR verification is the best ROI in this budget range.' },
    'Full HVAC + insulation overhaul': { certifications: ['ENERGY STAR', 'Green Built Texas', 'LEED for Homes Silver'], certCost: '$2,000–$8,000', resalePremium: '6–10%', insurance: '15–20% discount with green-certified carriers', topPick: 'ENERGY STAR + Green Built Texas', note: 'Stack ENERGY STAR and Green Built Texas for maximum resale value recognition in DFW market.' },
    'Gut renovation or new build': { certifications: ['LEED for Homes Silver ($5,000–$15,000)', 'ENERGY STAR', 'Green Built Texas'], certCost: '$3,000–$15,000', resalePremium: '8–14%', insurance: '20%+ discount with specialty carriers', topPick: 'LEED Silver', note: 'Gut reno with this budget can achieve LEED Silver with proper planning from day one.' },
  },
  '$15,000–$40,000': {
    'No major renovations planned': { certifications: ['Pearl Platinum', 'LEED for Homes'], certCost: '$1,000–$8,000', resalePremium: '5–9%', insurance: '15–20% discount', topPick: 'Pearl Platinum', note: 'In this budget range you can likely fund upgrades to reach Pearl Platinum — the highest standalone certification for existing homes.' },
    'One or two key upgrades': { certifications: ['LEED Silver/Gold', 'ENERGY STAR', 'Green Built Texas'], certCost: '$3,000–$12,000', resalePremium: '8–13%', insurance: '20% discount standard with green carriers', topPick: 'LEED Silver', note: 'LEED Silver is achievable with strategic upgrade selection in this range.' },
    'Full HVAC + insulation overhaul': { certifications: ['LEED Gold ($8,000–$20,000)', 'Green Built Texas Diamond'], certCost: '$5,000–$20,000', resalePremium: '10–16%', insurance: '20–25% discount', topPick: 'LEED Gold', note: 'HVAC + envelope upgrade + solar = LEED Gold territory for most DFW homes.' },
    'Gut renovation or new build': { certifications: ['LEED Gold', 'ENERGY STAR + Pearl Platinum', 'Passive House Lite'], certCost: '$8,000–$25,000', resalePremium: '12–20%', insurance: '25%+ discount specialty carriers', topPick: 'LEED Gold', note: 'DFW climate allows LEED Gold with reasonable cost at gut-reno scope.' },
  },
  'Over $40,000': {
    'No major renovations planned': { certifications: ['Pearl Platinum + LEED'], certCost: '$5,000–$15,000', resalePremium: '8–14%', insurance: '20%+ discount', topPick: 'LEED + Pearl Stack', note: 'At this budget, target multiple certifications to maximize MLS visibility and resale appeal.' },
    'One or two key upgrades': { certifications: ['LEED Gold', 'Passive House (EnerPHit for existing)'], certCost: '$10,000–$25,000', resalePremium: '12–18%', insurance: '25% discount', topPick: 'LEED Gold', note: 'EnerPHit (Passive House retrofit standard) is now achievable for DFW high-performance homes.' },
    'Full HVAC + insulation overhaul': { certifications: ['LEED Platinum', 'Passive House'], certCost: '$15,000–$35,000', resalePremium: '15–22%', insurance: '25–30% discount specialty', topPick: 'LEED Platinum', note: 'LEED Platinum is the pinnacle — requires solar, HVAC, envelope, and water efficiency.' },
    'Gut renovation or new build': { certifications: ['LEED Platinum', 'Passive House Certified', 'Zero Energy Ready Home'], certCost: '$20,000–$40,000', resalePremium: '18–30%', insurance: 'Max discount possible', topPick: 'Zero Energy Ready Home + LEED Platinum', note: 'Stack ZERH + LEED for maximum certification value. DFW solar makes ZERH practical.' },
  },
};

export default function DFWGreenCertificationGuide2026() {
  const [budget, setBudget] = useState('');
  const [scope, setScope] = useState('');
  const result = budget && scope ? certData[budget]?.[scope] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW GREEN HOMES 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Green Certification Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28 }}>Four certification paths for DFW homeowners in 2026 — find which fits your budget, scope, and resale goals.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12, marginBottom: 28 }}>
          {[
            { icon: '🌟', name: 'Pearl', desc: 'Best for existing homes. No major upgrades required. $400–$1,000.' },
            { icon: '⭐', name: 'ENERGY STAR', desc: 'Federal program. Best for new builds and major renovations. $500–$2,000.' },
            { icon: '🌿', name: 'Green Built Texas', desc: 'Texas-specific. Builder and existing home programs. $2,000–$6,000.' },
            { icon: '🏅', name: 'LEED for Homes', desc: 'Gold standard. Silver to Platinum. $5,000–$40,000 depending on level.' },
          ].map(c => (
            <div key={c.name} style={{ background: '#0F2040', borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{c.name}</div>
              <div style={{ color: '#94A3B8', fontSize: 12 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🔍 Find Your Certification Path</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Renovation Budget</label>
              <select value={budget} onChange={e => setBudget(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select budget...</option>
                {budgets.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Renovation Scope</label>
              <select value={scope} onChange={e => setScope(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select scope...</option>
                {scopes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '8px 14px', fontWeight: 700, marginBottom: 14, display: 'inline-block' }}>
                🏆 Top Pick: {result.topPick}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 14 }}>
                <div><div style={{ color: '#94A3B8', fontSize: 12 }}>Certification Cost</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 17 }}>{result.certCost}</div></div>
                <div><div style={{ color: '#94A3B8', fontSize: 12 }}>Resale Premium</div><div style={{ color: '#F5E642', fontWeight: 800, fontSize: 17 }}>{result.resalePremium}</div></div>
              </div>
              <div style={{ background: '#0F2040', borderRadius: 8, padding: '10px 14px', marginBottom: 12 }}>
                <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>Achievable Certifications</div>
                {result.certifications.map(c => <div key={c} style={{ color: '#A7F3D0', fontSize: 14 }}>✅ {c}</div>)}
              </div>
              <div style={{ background: '#0F2040', borderRadius: 8, padding: '10px 14px', marginBottom: 12 }}>
                <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 2 }}>Insurance Impact</div>
                <div style={{ fontSize: 14 }}>{result.insurance}</div>
              </div>
              <div style={{ color: '#94A3B8', fontSize: 13, fontStyle: 'italic' }}>💡 {result.note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
