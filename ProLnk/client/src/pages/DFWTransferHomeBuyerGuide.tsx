import { useState } from 'react';

const timelines = ['Under 30 days', '30–60 days', '60–90 days', '90+ days'];
const packageTypes = ['Full relocation package', 'Lump sum allowance', 'Partial assistance', 'No package (self-funded)'];

const strategies: Record<string, Record<string, { strategy: string; suburbs: string[]; priorities: string[]; tip: string }>> = {
  'Under 30 days': {
    'Full relocation package': { strategy: 'Use relocation company buyer-side agent — they know the compressed timeline drill', suburbs: ['Frisco (easiest to find fast)', 'McKinney', 'Allen'], priorities: ['New construction — can sometimes close in 3–4 weeks on spec homes', 'Avoid bidding wars — pick from available inventory only', 'Lock rate day 1'], tip: 'Ask HR if package includes temp housing — buy in month 2-3, rent first month' },
    'Lump sum allowance': { strategy: 'Negotiate hard — use lump sum for closing costs + moving, not down payment', suburbs: ['Carrollton', 'Irving', 'Grand Prairie'], priorities: ['Target homes under $400K to preserve lump sum', 'Pre-approval before you land in DFW', 'Virtual tour + offer sight-unseen if needed'], tip: 'Lump sum is taxable income — gross it up with employer if possible' },
    'Partial assistance': { strategy: 'Move fast on whatever inventory is clean — no inspection contingency on newer homes', suburbs: ['Garland', 'Mesquite', 'Rowlett'], priorities: ['Focus on 2010+ construction — fewer surprises', 'Skip aesthetic preferences — buy structurally sound', 'Plan to renovate after settle-in'], tip: 'Buy in employer-paid city if possible — some DFW cities offer tax incentives' },
    'No package (self-funded)': { strategy: 'Rent first 60-90 days — do not rush an unfunded buyer in DFW market', suburbs: ['Richardson', 'Plano'], priorities: ['Short-term furnished apartment near office first', 'Learn DFW traffic patterns before committing to suburb', 'Buy in month 3-4 with full information'], tip: 'Renting short-term is cheaper than a bad buy in the wrong suburb' },
  },
  '30–60 days': {
    'Full relocation package': { strategy: 'Virtual tours week 1, in-person weekend visit week 2, offer week 3', suburbs: ['Southlake', 'Keller', 'Flower Mound'], priorities: ['Top-rated schools lock in long-term value', 'HOA communities have predictable aesthetics', 'New builds with design center — personalize without the timeline risk'], tip: 'Ask about guaranteed buyout if you need to sell — some packages include it' },
    'Lump sum allowance': { strategy: 'Shop 380–450K range — competitive but not insane; 15-20 days to close typical', suburbs: ['Lewisville', 'Coppell', 'Grapevine'], priorities: ['Airport access: DFW Airport or Love Field proximity', 'Avoid school-year rushes — summer buyers have more leverage', 'Get pre-approved for lump sum + personal funds combination'], tip: 'DFW median days-on-market is 18 — your 60-day window is workable' },
    'Partial assistance': { strategy: 'Focused search: 3 zip codes max, 2 weekends of visits, make offer day 10', suburbs: ['North Richland Hills', 'Haltom City', 'Euless'], priorities: ['Mid-Tier DFW suburbs: underrated, affordable, good schools', 'HEB ISD is excellent — Euless and Bedford offer value', 'Commute test: drive at 7:30am, 5:30pm before deciding'], tip: 'Partial package often covers inspection — always get one regardless of timeline' },
    'No package (self-funded)': { strategy: 'Use 60 days strategically — 2 weeks research, 2 weeks visit, 2 weeks offer/close', suburbs: ['Denton', 'Little Elm', 'Prosper'], priorities: ['North DFW corridor is growing fast but still affordable', 'Denton has a university — good rental backup if you need to move again', 'Check work-from-home flexibility — north DFW commutes can be long'], tip: 'Every day you wait costs you in DFW appreciation — move decisively once you choose' },
  },
  '60–90 days': {
    'Full relocation package': { strategy: 'Take your time — visit 2 weekends, pick your suburb, buy with confidence', suburbs: ['Plano', 'Frisco', 'Allen', 'McKinney'], priorities: ['School district research first — drives long-term value', 'Neighborhood walkability and community vibe matter', 'Plan for full home inspection + negotiate from a position of knowledge'], tip: '90-day window is ideal for DFW — enough time to shop without pressure' },
    'Lump sum allowance': { strategy: 'Invest lump sum in discovery — hire a buyer\’s agent who specializes in relocations', suburbs: ['Murphy', 'Wylie', 'Sachse'], priorities: ['East Collin County is underpriced relative to quality', 'Rapid appreciation — Murphy home values up 40% in 5 years', 'Commute to Plano/Richardson employers is 20-25 min'], tip: 'Save lump sum for upgrades and moving — don\’t spend it on down payment if possible' },
    'Partial assistance': { strategy: 'Normal buying process applies — don\’t rush it', suburbs: ['Rockwall', 'Rowlett', 'Heath'], priorities: ['Lake Ray Hubbard access — lifestyle premium at lower cost', 'Rockwall is one of the fastest-growing small cities in TX', 'Consider new construction — Rockwall Crossing, neighboring subdivisions'], tip: 'Get a relocation specialist agent — they know the local market and relo process' },
    'No package (self-funded)': { strategy: 'Approach like any buyer — your timeline is actually comfortable', suburbs: ['Fate', 'Royse City', 'Lavon'], priorities: ['East Dallas exurbs: lowest cost entry into DFW ownership', 'New construction spec homes available', 'Plan for longer commute — budget accordingly'], tip: 'DFW quality of life is high — the right suburb makes the move worth it' },
  },
  '90+ days': {
    'Full relocation package': { strategy: 'Full market research: use all resources, take 2-3 discovery trips', suburbs: ['Southlake', 'Westlake', 'Trophy Club'], priorities: ['Premium suburbs — worth researching at length', 'Grapevine-Colleyville ISD and Carroll ISD are elite', 'Luxury market: negotiate harder at 90+ days out'], tip: 'Request tax assistance rider from HR — relocation income adds to tax burden' },
    'Lump sum allowance': { strategy: 'Research deeply, visit once, buy with confidence', suburbs: ['Celina', 'Anna', 'Van Alstyne'], priorities: ['Northern frontier of DFW growth — best appreciation potential', 'New development corridor: lots of new construction', 'Lower base prices, higher upside — 5-year play'], tip: 'Consider lock-in rate — DFW market can shift in 90 days' },
    'Partial assistance': { strategy: 'Standard purchase process — no need to rush', suburbs: ['Forney', 'Kaufman', 'Terrell'], priorities: ['Southeast exurbs: most affordable DFW entry point', 'I-20 corridor growth — improving infrastructure', 'New construction neighborhoods with community amenities'], tip: 'Use extra time to research Texas property taxes — they vary significantly by city' },
    'No package (self-funded)': { strategy: 'You have time — do it right', suburbs: ['Granbury', 'Cleburne', 'Stephenville (2hr)'], priorities: ['If remote-friendly: DFW exurbs offer incredible value', 'Lake Granbury lifestyle at 60% of Frisco prices', 'Strong community, slower pace — intentional choice'], tip: 'Interview 3 buyer agents — find one who moved here themselves and understands the journey' },
  },
};

export default function DFWTransferHomeBuyerGuide() {
  const [timeline, setTimeline] = useState('');
  const [pkgType, setPkgType] = useState('');
  const result = timeline && pkgType ? strategies[timeline]?.[pkgType] : null;

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', color: '#1A2B3C', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem' }}>📦</div>
          <h1 style={{ fontSize: '2.2rem', color: '#0A1628', margin: '0.5rem 0′ }}>DFW Corporate Transfer Home Buyer Guide</h1>
          <p style={{ color: '#5A7090', fontSize: '1.05rem' }}>When your company moves you to DFW — compressed timelines, relo packages, and suburb strategy</p>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E0E8F0', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', marginTop: 0, fontSize: '1.2rem' }}>🎯 Find Your Buying Strategy</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ color: '#5A7090', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Transfer Timeline</label>
              <select value={timeline} onChange={e => setTimeline(e.target.value)} style={{ width: '100%', background: '#F8F9FA', color: '#1A2B3C', border: '1px solid #D0DCE8', borderRadius: 8, padding: '0.6rem', fontSize: '0.95rem' }}>
                <option value=''>Select timeline...</option>
                {timelines.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#5A7090', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Relocation Package Type</label>
              <select value={pkgType} onChange={e => setPkgType(e.target.value)} style={{ width: '100%', background: '#F8F9FA', color: '#1A2B3C', border: '1px solid #D0DCE8', borderRadius: 8, padding: '0.6rem', fontSize: '0.95rem' }}>
                <option value=''>Select package...</option>
                {packageTypes.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ marginTop: '1.5rem', background: '#EFF6FF', borderRadius: 10, padding: '1.2rem', borderLeft: '4px solid #0A1628′ }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0A1628', marginBottom: '0.8rem' }}>📋 Strategy: {result.strategy}</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#1D4ED8', fontWeight: 600 }}>📍 Best Suburbs: </span>{result.suburbs.join(' · ')}</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#1D4ED8', fontWeight: 600 }}>🎯 Priorities: </span>{result.priorities.join(' | ')}</div>
              <div style={{ background: '#DBEAFE', borderRadius: 8, padding: '0.7rem', marginTop: '0.8rem', fontSize: '0.9rem' }}>💡 <strong>Insider Tip:</strong> {result.tip}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E0E8F0', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', marginTop: 0, fontSize: '1.1rem' }}>🏢 Top DFW Corporate Corridors</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            {[['Las Colinas (Irving)', 'Fortune 500 hub — Kimberly-Clark, Celanese, Fluor nearby: Coppell, Irving'],['Legacy/Telecom Corridor (Plano)', 'Toyota, JPMorgan, Liberty Mutual — buy in: Plano, Allen, Frisco'],['Downtown Dallas', 'AT&T, Goldman, major law firms — buy in: Uptown, Oak Lawn, Lake Highlands'],['Alliance/Fort Worth', 'Amazon, FedEx, American Airlines HQ — buy in: Keller, Southlake, Roanoke'],['DFW Airport Area', 'Aviation, logistics — buy in: Grapevine, Euless, Coppell'],['Uptown/Stemmons', 'Healthcare (UT Southwestern), education — buy in: Oak Cliff, Lakewood, M Streets']].map(([area, desc]) => (
              <div key={area} style={{ background: '#F8F9FA', borderRadius: 8, padding: '0.8rem' }}>
                <div style={{ color: '#0A1628', fontWeight: 700, fontSize: '0.85rem' }}>🏢 {area}</div>
                <div style={{ color: '#5A7090', fontSize: '0.8rem', marginTop: 3 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
