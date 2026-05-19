import { useState } from 'react';

type LandscapePlan = 'Food Garden' | 'Native Plants / Xeriscaping' | 'Tree Removal' | 'Rainwater Collection' | 'Gravel / Hardscape' | 'Lawn Alternative';
type DFWCity = 'Dallas' | 'Fort Worth' | 'Plano' | 'Frisco' | 'Arlington' | 'McKinney' | 'Denton' | 'Irving';

const cityRules: Record<DFWCity, { treePermit: string; waterCollect: string; hoaOverride: string; note: string }> = {
  Dallas: { treePermit: 'Required for trees >8" diameter or protected species', waterCollect: 'Legal up to 2 first-flush barrels (no permit)', hoaOverride: 'TX HB 1572 overrides HOA bans on drought-tolerant plants', note: 'Dallas Tree Preservation Ordinance: violations up to $2,000/tree' },
  'Fort Worth': { treePermit: 'Required for any Heritage Tree removal', waterCollect: 'Legal — no permit, no limit per TX Water Code', hoaOverride: 'TX law protects drought-tolerant and native plantings from HOA bans', note: 'Heritage Trees: post oak, live oak, pecan — cannot remove without city approval' },
  Plano: { treePermit: 'Any tree >6" diameter in development zones', waterCollect: 'Permitted — no limit, must be covered containers', hoaOverride: 'TX Right to Garden applies — HOA cannot ban vegetable gardens', note: 'Plano Urban Forest Master Plan — strict canopy preservation' },
  Frisco: { treePermit: 'Required for trees >8" in front yard', waterCollect: 'Legal — encourage with rebate through NTMWD', hoaOverride: 'HOA may regulate aesthetics but cannot prohibit food gardens', note: 'Fast-growing city — check latest ordinance at friscotexas.gov' },
  Arlington: { treePermit: 'Protected trees include all >12" diameter', waterCollect: 'Legal, no permit, covered containers required', hoaOverride: 'TX law applies — food gardens and native plants protected', note: 'Arlington Tree City USA — canopy replacement required for large removals' },
  McKinney: { treePermit: 'Heritage Trees protected — permit required', waterCollect: 'Legal, no permit needed per TX water law', hoaOverride: 'TX HB 1572 limits HOA restrictions on native/drought-tolerant plants', note: 'McKinney Tree Mitigation: replacement ratio 2:1 for protected trees' },
  Denton: { treePermit: 'Trees >6" in right-of-way require permit', waterCollect: 'Strongly encouraged — no permit, no limit', hoaOverride: 'TX Right to Garden Act covers food and native plants', note: 'Denton is progressive on sustainability — fewer restrictions than most DFW cities' },
  Irving: { treePermit: 'Significant trees: >8" require permit', waterCollect: 'Legal per state law, containers must be covered', hoaOverride: 'HOA rules subject to TX state landscaping laws', note: 'Irving has historic tree ordinance covering specific protected species' },
};

const legalStatus: Record<LandscapePlan, { status: string; color: string; detail: string; hoaRisk: string }> = {
  'Food Garden': { status: 'PROTECTED BY TX LAW', color: '#22C55E', detail: 'Texas Right to Garden (SB 198, 2021) — HOAs cannot prohibit edible gardens. Must meet basic aesthetic standards.', hoaRisk: 'Low — TX law overrides HOA bans. Document and cite SB 198 if challenged.' },
  'Native Plants / Xeriscaping': { status: 'PROTECTED BY TX LAW', color: '#22C55E', detail: 'TX HB 1572 prohibits HOA bans on drought-tolerant and native plants effective 2021. City water departments encourage xeriscape.', hoaRisk: 'Low — state protected. HOA may regulate layout/design but not prohibit natives.' },
  'Tree Removal': { status: 'PERMIT REQUIRED', color: '#FF8C00', detail: 'Most DFW cities require permits for trees over 6–12" diameter. Heritage/protected tree removal may require replacement plantings.', hoaRisk: 'Medium — HOA plus city approval often both required.' },
  'Rainwater Collection': { status: 'LEGAL STATEWIDE', color: '#22C55E', detail: 'Texas Water Code Sec. 26.0011: rainwater harvesting is legal statewide. No permit required. Containers must be covered to prevent mosquito breeding.', hoaRisk: 'Low — HOAs cannot legally prohibit per TX water law. Ground-level cisterns may need aesthetic screening.' },
  'Gravel / Hardscape': { status: 'CHECK CITY', color: '#F5E642', detail: 'Impervious cover limits vary by city. Dallas limits front yard hardscape to 30%. Stormwater runoff rules apply. DFW-wide: gravel counts toward impervious surface.', hoaRisk: 'High — HOAs frequently regulate hardscape materials, colors, and coverage percentages.' },
  'Lawn Alternative': { status: 'GENERALLY LEGAL', color: '#22C55E', detail: 'Ground covers like clover, buffalo grass, or mulch are legal alternatives. TX Right to Garden and HB 1572 protect most alternatives. Some cities require maintenance standards.', hoaRisk: 'Medium — depends on HOA rules. "Maintained appearance" standard often applies.' },
};

export default function DFWTexasLandscapingLawsGuide() {
  const [plan, setPlan] = useState<LandscapePlan>('Food Garden');
  const [city, setCity] = useState<DFWCity>('Dallas');
  const [showResults, setShowResults] = useState(false);

  const legal = legalStatus[plan];
  const cityRule = cityRules[city];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>⚖️ DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Texas Landscaping Laws for DFW Homeowners</h1>
        <p style={{ color: '#8899AA', fontSize: 16, marginBottom: 32 }}>
          Texas has some of the most homeowner-friendly landscaping laws in the US — but DFW cities layer local ordinances on top. Know your rights before you plant, remove, or convert.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 28 }}>
          {[
            { icon: '🌱', title: 'TX Right to Garden', desc: 'SB 198 (2021) — HOAs cannot prohibit vegetable/food gardens statewide' },
            { icon: '🌵', title: 'Native Plant Protection', desc: 'HB 1572 — HOAs cannot ban drought-tolerant or native plants' },
            { icon: '💧', title: 'Rainwater Rights', desc: 'TX Water Code: collection legal statewide, no permit required' },
            { icon: '🌳', title: 'Tree Permits', desc: 'City-level — varies widely across DFW; heritage trees strictly protected' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0D1F35', borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 15 }}>{c.title}</div>
              <div style={{ color: '#8899AA', fontSize: 13 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Check Your Plan's Legal Status</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>LANDSCAPING PLAN</label>
              <select value={plan} onChange={e => setPlan(e.target.value as LandscapePlan)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14 }}>
                {(Object.keys(legalStatus) as LandscapePlan[]).map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>YOUR DFW CITY</label>
              <select value={city} onChange={e => setCity(e.target.value as DFWCity)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14 }}>
                {(Object.keys(cityRules) as DFWCity[]).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResults(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Check Legal Status
          </button>
        </div>

        {showResults && (
          <>
            <div style={{ background: '#0D1F35', borderRadius: 12, padding: 24, marginBottom: 16, borderLeft: `4px solid ${legal.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ background: legal.color, color: '#0A1628', borderRadius: 6, padding: '4px 12px', fontWeight: 800, fontSize: 13 }}>{legal.status}</span>
                <span style={{ color: '#AAB8C2', fontSize: 14 }}>{plan}</span>
              </div>
              <p style={{ color: '#AAB8C2', marginBottom: 12 }}>{legal.detail}</p>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 600, fontSize: 13 }}>HOA RISK: </span>
                <span style={{ color: '#AAB8C2', fontSize: 13 }}>{legal.hoaRisk}</span>
              </div>
            </div>
            <div style={{ background: '#0D1F35', borderRadius: 12, padding: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12 }}>🏛️ {city}-Specific Rules</h3>
              <div style={{ display: 'grid', gap: 10 }}>
                <div style={{ color: '#AAB8C2' }}>🌳 <strong>Tree Permits:</strong> {cityRule.treePermit}</div>
                <div style={{ color: '#AAB8C2' }}>💧 <strong>Water Collection:</strong> {cityRule.waterCollect}</div>
                <div style={{ color: '#AAB8C2' }}>🏡 <strong>HOA Override:</strong> {cityRule.hoaOverride}</div>
                <div style={{ color: '#8899AA', fontSize: 13, marginTop: 4, padding: '10px 12px', background: '#0A1628', borderRadius: 8 }}>📌 {cityRule.note}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
