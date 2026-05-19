import { useState } from 'react';

const homeAges = [
  { id: 'new', label: 'Under 5 years', score: 0 },
  { id: 'mid', label: '5–15 years', score: 1 },
  { id: 'old', label: '15–30 years', score: 2 },
  { id: 'vold', label: '30+ years', score: 3 },
];

const renovOptions = [
  { id: 'none', label: 'No recent renovations', score: 0 },
  { id: 'minor', label: 'Minor work (paint, floors)', score: 1 },
  { id: 'major', label: 'Major renovation in past 2 years', score: 3 },
  { id: 'construction', label: 'New construction or addition', score: 4 },
];

const allergyOptions = [
  { id: 'none', label: '😊 No allergy issues', score: 0 },
  { id: 'mild', label: '🤧 Mild seasonal symptoms', score: 1 },
  { id: 'moderate', label: '😮‍💨 Moderate — noticed at home specifically', score: 2 },
  { id: 'severe', label: '🚨 Severe — doctor recommended HVAC review', score: 4 },
];

function getVerdict(score: number) {
  if (score <= 1) return {
    verdict: 'Duct cleaning NOT needed yet',
    color: '#22C55E',
    icon: '✅',
    details: 'Your ducts are likely clean. EPA and NADCA agree duct cleaning is only needed when there\’s visible mold, vermin evidence, or construction debris — not on a routine schedule.',
    cost: 'N/A',
    watch: 'Re-evaluate if you notice musty odors, visible dust from registers, or if allergy symptoms worsen.',
  };
  if (score <= 4) return {
    verdict: 'Consider a duct inspection first',
    color: '#F59E0B',
    icon: '🔍',
    details: 'You have some risk factors but duct cleaning may not be necessary. A NADCA-certified technician can perform a visual inspection (camera) before recommending a full cleaning.',
    cost: '$150–$300 inspection',
    watch: 'Only proceed with full cleaning if the inspection reveals visible contamination, mold, or debris accumulation.',
  };
  return {
    verdict: 'Duct cleaning likely warranted',
    color: '#EF4444',
    icon: '🚨',
    details: 'Your home has significant risk factors. Post-construction debris, mold, or severe allergy triggers are legitimate reasons for professional cleaning per EPA and NADCA guidelines.',
    cost: '$300–$700 for average DFW home (1,500–3,000 sq ft)',
    watch: 'Hire only NADCA-certified companies. Ask to see before/after photos of your ducts.',
  };
}

export default function DFWAirDuctCleaningGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [renov, setRenov] = useState('');
  const [allergy, setAllergy] = useState('');

  const ageScore = homeAges.find(h => h.id === homeAge)?.score ?? -1;
  const renovScore = renovOptions.find(r => r.id === renov)?.score ?? -1;
  const allergyScore = allergyOptions.find(a => a.id === allergy)?.score ?? -1;
  const hasAll = ageScore >= 0 && renovScore >= 0 && allergyScore >= 0;
  const totalScore = hasAll ? ageScore + renovScore + allergyScore : -1;
  const verdict = totalScore >= 0 ? getVerdict(totalScore) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0D1F3C 0%, #0A1628 100%)', borderBottom: '2px solid #F5E642', padding: '48px 24px 36px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>💨</span>
            <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Services Guide</span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
            Air Duct Cleaning Guide for DFW
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0, maxWidth: 600, lineHeight: 1.6 }}>
            The duct cleaning industry is full of $99 scam services. Here's the honest truth — backed by EPA guidance — on when DFW homeowners actually need their ducts cleaned, what it costs, and how to avoid getting ripped off.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginTop: 48 }}>
          <div style={{ background: '#1C1F26', border: '2px solid #EF4444', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#EF4444', margin: '0 0 12px' }}>⚠️ The $99 Duct Cleaning Scam</h2>
            <p style={{ color: '#94A3B8', lineHeight: 1.7, margin: '0 0 10px' }}>
              DFW is heavily targeted by scam duct cleaning operations. They offer $99 whole-house specials, arrive, then claim to find mold, vermin, or dangerous contamination — upselling to $800–$3,000 in unnecessary treatments.
            </p>
            <p style={{ color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: '#E8EDF5′ }}>Red flags:</strong> No NADCA certification, refuse to show before/after photos, quote by phone without seeing the system, pressure you to sign same day, claim UV lights or "antimicrobial coatings" are required.
            </p>
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>✅ EPA: 3 Reasons to Actually Clean Ducts</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
            {[
              { num: '01', title: 'Visible Mold Inside Ducts or HVAC Components', desc: 'Mold requires professional remediation. However, confirm via lab test — not just a technician\’s claim. Mold inside ducts in DFW is more common after flood events or sustained high humidity.' },
              { num: '02', title: 'Vermin Infestation (Rodents or Insects)', desc: 'Confirmed evidence of animals living in ductwork. Check for droppings, nesting material, or entry points near the air handler in your attic.' },
              { num: '03', title: 'Excessive Debris Blocking Airflow', desc: 'Post-construction: drywall dust, insulation particles, or debris from renovations. Registers blowing visible dust particles after major work.' },
            ].map(item => (
              <div key={item.num} style={{ display: 'flex', gap: 16, background: '#111E33', borderRadius: 10, padding: 18, border: '1px solid #1E3054′ }}>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20, minWidth: 32 }}>{item.num}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#E8EDF5', marginBottom: 6 }}>{item.title}</div>
                  <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#111E33', borderRadius: 12, padding: 20, marginBottom: 40, border: '1px solid #1E3054′ }}>
            <h3 style={{ color: '#E8EDF5', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>🔧 Duct Sealing vs. Duct Cleaning</h3>
            <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              In DFW, leaky ducts in attics (common in homes built 1985–2005) waste 20–30% of conditioned air. Duct sealing with Aeroseal or mastic costs <strong style={{ color: '#E8EDF5′ }}>$1,500–$3,500</strong> and dramatically reduces energy bills. This is different from duct cleaning and often more valuable. Ask your HVAC tech about a duct leakage test before pursuing cleaning.
            </p>
          </div>
        </div>

        <div style={{ background: '#111E33', borderRadius: 14, padding: 28, border: '1px solid #F5E642', marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>🧮 Do You Need Duct Cleaning?</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: '0 0 20px' }}>Answer 3 questions for a science-based DFW recommendation.</p>

          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 10, fontWeight: 600 }}>Home Age</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {homeAges.map(h => (
                <button key={h.id} onClick={() => setHomeAge(h.id)} style={{
                  padding: '9px 16px', borderRadius: 20, border: '2px solid',
                  borderColor: homeAge === h.id ? '#F5E642′ : '#1E3054',
                  background: homeAge === h.id ? '#F5E642′ : ’transparent',
                  color: homeAge === h.id ? '#0A1628′ : '#94A3B8',
                  fontWeight: 600, fontSize: 13, cursor: 'pointer'
                }}>{h.label}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 10, fontWeight: 600 }}>Recent Renovation Activity</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {renovOptions.map(r => (
                <button key={r.id} onClick={() => setRenov(r.id)} style={{
                  textAlign: 'left', padding: '9px 16px', borderRadius: 8, border: '2px solid',
                  borderColor: renov === r.id ? '#F5E642′ : '#1E3054',
                  background: renov === r.id ? 'rgba(245,230,66,0.1)' : 'transparent',
                  color: renov === r.id ? '#F5E642′ : '#94A3B8', fontWeight: 600, fontSize: 14, cursor: ’pointer'
                }}>{r.label}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 10, fontWeight: 600 }}>Allergy / Respiratory Symptoms at Home</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {allergyOptions.map(a => (
                <button key={a.id} onClick={() => setAllergy(a.id)} style={{
                  textAlign: 'left', padding: '9px 16px', borderRadius: 8, border: '2px solid',
                  borderColor: allergy === a.id ? '#F5E642′ : '#1E3054',
                  background: allergy === a.id ? 'rgba(245,230,66,0.1)' : 'transparent',
                  color: allergy === a.id ? '#F5E642′ : '#94A3B8', fontWeight: 600, fontSize: 14, cursor: ’pointer'
                }}>{a.label}</button>
              ))}
            </div>
          </div>

          {verdict && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, border: `2px solid ${verdict.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 28 }}>{verdict.icon}</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: verdict.color }}>{verdict.verdict}</span>
              </div>
              <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, margin: '0 0 12px' }}>{verdict.details}</p>
              {verdict.cost !== 'N/A' && (
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: '#94A3B8′ }}>Estimated Cost: </span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#F5E642′ }}>{verdict.cost}</span>
                </div>
              )}
              <p style={{ color: '#94A3B8', fontSize: 13, margin: 0, borderTop: '1px solid #1E3054', paddingTop: 12 }}>
                👁️ {verdict.watch}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
