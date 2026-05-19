import { useState } from 'react';

const SUBMARKETS = ['Frisco / Prosper / Celina', 'McKinney / Allen / Fairview', 'Plano / Richardson / Garland', 'Irving / Las Colinas / Coppell', 'Fort Worth / Keller / Southlake', 'Arlington / Mansfield / Grand Prairie', 'Dallas (Uptown / Oak Lawn / M Streets)', 'Rockwall / Rowlett / Forney', 'Denton / Lewisville / Flower Mound'];

const RESEARCH_NEEDS = ['Current median price and price trends', 'Days on market and inventory levels', 'New construction pipeline', 'Permit activity and development', 'Tax-assessed vs. market value', 'School district boundaries and ratings', 'Rental rates and investor cap rates', 'Comparable sales (comps)'];

const dataGuide: Record<string, { primarySource: string; secondarySource: string; permitSource: string; interpretation: string; dfwNote: string }> = {
  'Current median price and price trends': {
    primarySource: 'NTREIS (North Texas Real Estate Information Systems) — accessed via Realtor, HAR.com, or through a licensed DFW agent. NTREIS is the MLS for all of DFW and is the gold standard for price data.',
    secondarySource: 'Texas A&M Real Estate Research Center (trerc.tamu.edu) — free monthly reports by metro area. Texas-specific methodology, updated monthly. Best for trend analysis over 6–12 month windows.',
    permitSource: 'Not applicable for price trends — use NTREIS and TRERC exclusively.',
    interpretation: 'Compare median price to list price ratio (LP:SP). DFW submarkets with LP:SP > 99% are competitive. Watch months of supply: < 2 months = seller market, > 4 months = buyer market. DFW historically runs 1.5–3.5 months across submarkets.',
    dfwNote: 'DFW price data lags 30–45 days in NTREIS. For real-time signals, watch active list price reductions on Zillow — Frisco/Prosper show directional shifts 3–4 weeks before closed data confirms.'
  },
  'Days on market and inventory levels': {
    primarySource: 'NTREIS MLS via DFW agent access or Realtor.com local market reports. Filter by submarket zip codes — DFW submarket boundaries rarely align with city lines.',
    secondarySource: 'Zillow Research (zillow.com/research) — free downloadable CSV data by zip code. Use their "days to pending" metric which is faster than closed DOM.',
    permitSource: 'Not applicable.',
    interpretation: 'DFW DOM under 14 days = highly competitive. 14–30 days = normal seller market. 30–60 days = balanced. Over 60 days = price reduction territory. Inventory under 1.5 months in DFW north suburbs means multiple offer situations are common.',
    dfwNote: 'Frisco and Prosper often run 7–12 day DOM in spring season (March–May). Rockwall and Forney, despite growth, run 25–40 days due to limited buyer pool depth.'
  },
  'New construction pipeline': {
    primarySource: 'Residential construction permit data from municipal building departments. Frisco: friscotexas.gov/permits. McKinney: mckinneytexas.org/permits. Most DFW cities publish permit data online.',
    secondarySource: 'Metrostudy (metrostudy.com) — paid subscription, but reports available through many DFW title companies for free at closings. Tracks new home starts, closings, and lot pipeline by submarket.',
    permitSource: 'Contact city planning departments directly for pipeline projects not yet in permit stage. Frisco Planning: 972-292-5300. McKinney Planning: 972-547-7330.',
    interpretation: 'New construction supply moderates price appreciation. If permit volume is up 20%+ year-over-year in a submarket, expect price growth to slow 6–12 months later. Watch for master-planned community phase releases — Collin County MPCs often dump 200–400 lots at once.',
    dfwNote: 'DFW leads the US in new home construction. Collin County alone issued 15,000+ residential permits in 2024. New construction fundamentally caps resale appreciation in adjacent areas.'
  },
  'Permit activity and development': {
    primarySource: 'Each DFW city\’s building permit portal. Dallas: dallascityhall.com/departments/sustainabledevelopment. Fort Worth: fortworthtexas.gov/departments/pdd. Plano: plano.gov/permits.',
    secondarySource: 'DCAD (Dallas Central Appraisal District) and TAD (Tarrant Appraisal District) — both have GIS mapping tools showing recent improvement filings which lag actual permits by 30–60 days.',
    permitSource: 'iSqFt (isqft.com) and BuildCentral track commercial and large residential permit activity. Good for identifying apartment pipeline that will affect rental markets.',
    interpretation: 'Commercial permit density predicts future residential demand. A new Amazon fulfillment center or corporate campus permit in a DFW submarket typically drives 2,000–5,000 new households within 3 years. Watch commercial before residential.',
    dfwNote: 'Celina and Prosper are issuing commercial permits at a rate not seen since Frisco\’s 2010–2015 explosion. These are leading indicators for the next appreciation wave in northern Collin County.'
  },
  'Tax-assessed vs. market value': {
    primarySource: 'DCAD (dcad.org) for Dallas County properties — free online lookup by address or owner. TAD (tad.org) for Tarrant County. CCAD (collincad.org) for Collin County. DCAD and CCAD both have excellent online portals.',
    secondarySource: 'Texas Comptroller Property Tax Assistance Division (comptroller.texas.gov/taxes/property-tax) — publishes ratio studies showing how close appraisals are to market value by county.',
    permitSource: 'Not applicable.',
    interpretation: 'Texas appraisal districts cap annual assessed value increases at 10% for homestead properties. In fast-appreciating submarkets (Frisco, Prosper), market value often runs 15–30% above assessed value. This creates invisible equity. Protest notices come out April 1 — owners have until May 15 to protest.',
    dfwNote: 'Collin County (CCAD) is known for aggressive appraisals. Dallas County (DCAD) has historically been more conservative — meaning DCAD properties often have larger gaps between assessed and market value.'
  },
  'School district boundaries and ratings': {
    primarySource: 'Texas Education Agency (tea.texas.gov) — A–F accountability ratings updated annually. Filter by district and campus. TEA data is authoritative for state ratings.',
    secondarySource: 'GreatSchools.org — aggregates TEA data with additional parent reviews. Niche.com ranks DFW school districts annually. Both are free and searchable by address.',
    permitSource: 'Not applicable.',
    interpretation: 'In DFW, school district is often the single biggest driver of price premium — more than neighborhood or condition. Frisco ISD and Carroll ISD (Southlake) command 10–20% premiums over otherwise comparable homes in adjacent lower-rated districts. Boundary shifts can swing values significantly.',
    dfwNote: 'DFW district boundaries are complex — some neighborhoods have options between districts. Always verify school assignment at the specific address level, not neighborhood. PISD (Plano ISD) recently lost enrollment to new northern districts, which affected some property values.'
  },
  'Rental rates and investor cap rates': {
    primarySource: 'CoStar and Yardi Matrix — paid platforms widely used by DFW property managers. Many title companies provide free market reports. Alternatively, search Zillow Rental Manager and Apartments.com for current asking rents.',
    secondarySource: 'TRERC (trerc.tamu.edu) publishes rental housing reports for Texas metros. Apartment Data Services (aptdata.com) covers DFW multifamily specifically.',
    permitSource: 'Not applicable for rental data.',
    interpretation: 'DFW SFR cap rates typically run 4.5–6.5% in 2024–2026. Multifamily cap rates 5–7%. Markets with high new apartment supply (Frisco, Far North Dallas) compress cap rates as rents soften. Track rent growth rate: if asking rents are flat or declining, cap rate compression is near.',
    dfwNote: 'DFW\’s institutional SFR buyer presence (Invitation Homes, Progress Residential) is concentrated in Tarrant and southern Dallas County — these buyers have established rent floors that support investor pro formas.'
  },
  'Comparable sales (comps)': {
    primarySource: 'NTREIS MLS — only accessible through a licensed DFW agent. Request a CMA (Comparative Market Analysis) for any submarket. This is the most reliable comp source.',
    secondarySource: 'DCAD/TAD/CCAD — all three appraisal districts publish deed transfer data. Lagged 30–60 days but free and public. Use property search + recent deeds to reconstruct comps.',
    permitSource: 'Not applicable.',
    interpretation: 'Good comps in DFW must match: square footage within 10%, same school district, same lot type (no pool-to-no-pool), built within 5 years of subject property, closed within 90 days. DFW submarket micro-variations are significant — a highway-adjacent property in Allen can comp 8–12% below an interior neighborhood home.',
    dfwNote: 'For FSBO sellers or buyers without agent access: PropStream ($97/mo) provides NTREIS-sourced comp data without requiring a license. Most DFW investors use it.'
  },
};

export default function DFWSubmarketDataGuide() {
  const [submarket, setSubmarket] = useState('');
  const [researchNeed, setResearchNeed] = useState('');
  const [result, setResult] = useState<null | typeof dataGuide['Current median price and price trends']>(null);

  function handleAnalyze() {
    if (!researchNeed) return;
    setResult(dataGuide[researchNeed]);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#0369a1', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>📊 DFW DATA GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#0f172a' }}>DFW Submarket Data Guide</h1>
        <p style={{ color: '#475569', marginBottom: '1rem', lineHeight: 1.6 }}>
          DFW real estate data is fragmented across NTREIS, DCAD, TAD, CCAD, TEA, and municipal permit systems.
          This guide maps the right data source to every research need — by DFW submarket.
        </p>
        <div style={{ background: '#e0f2fe', border: '1px solid #7dd3fc', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <span style={{ color: '#0369a1', fontWeight: 700 }}>Key DFW Data Sources: </span>
          <span style={{ color: '#0c4a6e', fontSize: '0.9rem' }}>NTREIS (MLS), DCAD/TAD/CCAD (appraisal), Texas A&M TRERC (research), TEA (schools), Municipal permit portals (development)</span>
        </div>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem', fontWeight: 600 }}>📍 DFW SUBMARKET (Optional — for context)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {SUBMARKETS.map(o => (
                <button key={o} onClick={() => setSubmarket(o)}
                  style={{ padding: '0.4rem 0.9rem', borderRadius: 6, border: '2px solid', cursor: 'pointer', fontSize: '0.8rem',
                    borderColor: submarket === o ? '#0369a1' : '#e2e8f0', background: submarket === o ? '#0369a1' : '#fff',
                    color: submarket === o ? '#fff' : '#475569', fontWeight: submarket === o ? 700 : 400 }}>
                  {o}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '0.5rem', fontWeight: 600 }}>🔍 WHAT DO YOU NEED TO RESEARCH?</div>
            <div style={{ display: 'grid', gap: '0.4rem' }}>
              {RESEARCH_NEEDS.map(o => (
                <button key={o} onClick={() => setResearchNeed(o)}
                  style={{ padding: '0.6rem 1rem', borderRadius: 7, border: '2px solid', cursor: 'pointer', fontSize: '0.875rem', textAlign: 'left',
                    borderColor: researchNeed === o ? '#0369a1' : '#e2e8f0', background: researchNeed === o ? '#0369a1' : '#fff',
                    color: researchNeed === o ? '#fff' : '#334155', fontWeight: researchNeed === o ? 700 : 400 }}>
                  {o}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button onClick={handleAnalyze} disabled={!researchNeed}
          style={{ background: researchNeed ? '#0369a1' : '#e2e8f0', color: researchNeed ? '#fff' : '#94a3b8',
            border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 800, fontSize: '1rem', cursor: researchNeed ? 'pointer' : 'default', marginBottom: '2rem' }}>
          Find the Right Data Source →
        </button>

        {result && (
          <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', display: 'grid', gap: '1rem' }}>
            <div style={{ color: '#0369a1', fontWeight: 800, fontSize: '1.1rem' }}>📊 Data Sources + How to Use Them</div>
            {[
              { label: '⭐ PRIMARY SOURCE', value: result.primarySource, bg: '#eff6ff', border: '#bfdbfe', text: '#1e3a8a' },
              { label: '📋 SECONDARY SOURCE', value: result.secondarySource, bg: '#f0fdf4', border: '#bbf7d0', text: '#14532d' },
              { label: '🏗️ PERMIT / DEVELOPMENT SOURCE', value: result.permitSource, bg: '#faf5ff', border: '#e9d5ff', text: '#4c1d95' },
              { label: '📈 HOW TO INTERPRET THIS DATA', value: result.interpretation, bg: '#fff7ed', border: '#fed7aa', text: '#7c2d12' },
            ].map(({ label, value, bg, border, text }) => (
              <div key={label} style={{ background: bg, borderRadius: 8, padding: '1rem', border: `1px solid ${border}` }}>
                <div style={{ color: text, fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>{label}</div>
                <div style={{ color: text, fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.9 }}>{value}</div>
              </div>
            ))}
            <div style={{ background: '#fef9c3', borderRadius: 8, padding: '1rem', border: '1px solid #fde047' }}>
              <div style={{ color: '#713f12', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>🌟 DFW-SPECIFIC NOTE</div>
              <div style={{ color: '#713f12', fontSize: '0.9rem', lineHeight: 1.6 }}>{result.dfwNote}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
