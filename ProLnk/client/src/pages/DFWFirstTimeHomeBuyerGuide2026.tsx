import { useState } from 'react';

const steps = [
  { phase: 'Phase 1', title: 'Get Financially Ready', emoji: '💰', months: '1-3 months', tasks: ['Check credit score (aim 620+ FHA, 740+ conventional)', 'Save 3-20% down + 2-5% closing costs', 'Get pre-approved by a DFW lender', 'Understand DTI ratio (keep under 43%)'] },
  { phase: 'Phase 2', title: 'Learn DFW Specifics', emoji: '🏠', months: '1-2 months', tasks: ['Research property tax rates by county (2.0-2.8% in DFW)', 'Understand hard water impact on appliances/pipes', 'Learn foundation inspection importance (expansive clay soil)', 'No state income tax — factor into affordability calc'] },
  { phase: 'Phase 3', title: 'Find Your Home', emoji: '🔍', months: '1-4 months', tasks: ['Sign buyer rep agreement (required post-NAR 2024)', 'Tour 10-20 homes in target DFW submarkets', 'Attend open houses in Frisco, McKinney, Prosper, Allen', 'Research HOA fees, flood zones, school districts'] },
  { phase: 'Phase 4', title: 'Make an Offer', emoji: '📝', months: '1-2 weeks', tasks: ['Submit offer with earnest money (1-2% in DFW)', 'Negotiate seller concessions for closing costs', 'Review option period (7-10 days standard in DFW)', 'Get home inspection — never waive in DFW (foundation risk)'] },
  { phase: 'Phase 5', title: 'Close & Move In', emoji: '🔑', months: '30-45 days', tasks: ['Finalize mortgage and lock rate', 'Complete appraisal (lender ordered)', 'Do final walkthrough 24 hrs before closing', 'Wire closing funds — verify wire instructions by phone'] },
];

const budgetRoadmaps: Record<string, { areas: string[]; tips: string[]; programs: string[] }> = {
  under250k: { areas: ['Far SE Dallas', 'Lancaster', 'Desoto', 'Balch Springs'], tips: ['FHA loan preferred at this price point', 'Look for seller concessions', 'HOA-free neighborhoods stretch budget'], programs: ['Texas DHAP grant up to $30K', 'My First Texas Home 0% DPA', 'Fort Worth homebuyer assistance'] },
  '250to350k': { areas: ['Garland', 'Mesquite', 'Grand Prairie', 'Burleson', 'Forney'], tips: ['Conventional 3% down viable', 'New construction in Forney/Burleson competitive', 'Watch property tax rates — vary 2.1-2.6%'], programs: ['My First Texas Home Program', 'TSAHC Homes for Texas Heroes', 'DFW area down payment assistance'] },
  over350k: { areas: ['Rockwall', 'Wylie', 'Mansfield', 'Midlothian', 'Waxahachie'], tips: ['Jumbo loan may apply above $806,500', 'Newer builds with warranties preferred', 'Negotiate upgrades on new construction'], programs: ['Conventional preferred', 'Check employer homebuyer programs', 'Credit union portfolio loans'] },
};

export default function DFWFirstTimeHomeBuyerGuide2026() {
  const [situation, setSituation] = useState('');
  const [budget, setBudget] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const roadmap = budget ? budgetRoadmaps[budget] : null;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ background: '#0A1628', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🏡</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DFW First-Time Homebuyer Guide 2026</h1>
        <p style={{ color: '#CBD5E1', fontSize: 15 }}>From "thinking about buying" to moved in — DFW-specific roadmap</p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#FEF9C3', border: '2px solid #F5E642', borderRadius: 10, padding: 20, marginBottom: 32 }}>
          <p style={{ fontWeight: 700, fontSize: 15, margin: '0 0 8px' }}>⚠️ DFW-Specific Facts You Must Know</p>
          <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, lineHeight: 2 }}>
            <li><strong>Property taxes:</strong> 2.0–2.8% annually — budget $500–$1,200/mo on a $300K home</li>
            <li><strong>Foundation risk:</strong> Expansive clay soil — NEVER waive a foundation inspection</li>
            <li><strong>Hard water:</strong> Budget for water softener ($800–$2,500) and appliance maintenance</li>
            <li><strong>No state income tax:</strong> Adds ~5–10% to effective purchasing power vs. CA or NY</li>
          </ul>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📋 Your 5-Phase Buying Roadmap</h2>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {steps.map((s, i) => (
            <button key={i} onClick={() => setActiveStep(i)} style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: activeStep === i ? '#0A1628' : '#E2E8F0', background: activeStep === i ? '#0A1628' : '#fff', color: activeStep === i ? '#F5E642' : '#0A1628', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
              {s.emoji} {s.phase}
            </button>
          ))}
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0', marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>{steps[activeStep].emoji} {steps[activeStep].title}</h3>
            <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>⏱ {steps[activeStep].months}</span>
          </div>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 2 }}>{steps[activeStep].tasks.map((t, i) => <li key={i} style={{ fontSize: 14 }}>{t}</li>)}</ul>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🎯 Get Your Personalized DFW Roadmap</h2>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Your Situation</label>
              <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, background: '#F9FAFB' }}>
                <option value="">Select situation...</option>
                <option value="renting">Currently renting in DFW</option>
                <option value="relocating">Relocating to DFW</option>
                <option value="living_with_family">Living with family</option>
                <option value="military">Military / VA eligible</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Budget Range</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, background: '#F9FAFB' }}>
                <option value="">Select budget...</option>
                <option value="under250k">Under $250,000</option>
                <option value="250to350k">$250,000 – $350,000</option>
                <option value="over350k">$350,000+</option>
              </select>
            </div>
          </div>
          {roadmap && (
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>📍 DFW Areas to Target</p>
                  {roadmap.areas.map((a, i) => <div key={i} style={{ fontSize: 13, padding: '4px 0', borderBottom: '1px solid #F1F5F9' }}>{a}</div>)}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>💡 Key Tips</p>
                  {roadmap.tips.map((t, i) => <div key={i} style={{ fontSize: 13, padding: '4px 0', borderBottom: '1px solid #F1F5F9' }}>{t}</div>)}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>🏦 Assistance Programs</p>
                  {roadmap.programs.map((p, i) => <div key={i} style={{ fontSize: 13, padding: '4px 0', borderBottom: '1px solid #F1F5F9' }}>{p}</div>)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
