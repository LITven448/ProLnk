import { useState } from 'react';

const buildYears = [
  '1978–1982', '1983–1986', '1987–1990', '1991–1995', '1996–2000',
];
const issueOptions = ['No known issues', 'Slow drains', 'Low water pressure', 'HVAC problems', 'Foundation cracks', 'Outdated kitchen/bath'];

type RiskData = {
  polybutylenePipe: string;
  pipeProbability: string;
  hvacAge: string;
  hvacAction: string;
  roofAge: string;
  roofAction: string;
  electricalRisk: string;
  electricalAction: string;
};

type PriorityItem = {
  priority: number;
  item: string;
  urgency: string;
  cost: string;
  note: string;
};

type DeferredItem = {
  project: string;
  deferredCost: string;
  urgency: string;
};

const riskData: Record<string, RiskData> = {
  '1978–1982': {
    polybutylenePipe: '🔴 HIGH RISK — polybutylene plumbing was standard in this era',
    pipeProbability: '~85% chance your home has poly-b pipe (grey plastic)',
    hvacAge: 'Current HVAC is 10–20+ years old (should have been replaced 1–2× already)',
    hvacAction: 'If not replaced since build, immediate replacement needed. R-22 refrigerant illegal to recharge.',
    roofAge: 'Likely on 2nd or 3rd roof — inspect for granule loss, lifting tabs, soft spots',
    roofAction: 'Professional inspection after every hail season. Budget for replacement if 15+ yrs on current roof.',
    electricalRisk: 'Aluminum wiring risk (1965–1973 peak), Federal Pacific / Zinsco panels possible',
    electricalAction: 'Panel inspection critical — FPE Stab-Lok panels are a fire hazard; replace immediately if found.',
  },
  '1983–1986': {
    polybutylenePipe: '🔴 HIGH RISK — polybutylene peak installation era',
    pipeProbability: '~90% probability of poly-b in supply lines (grey or black fittings)',
    hvacAge: 'Current HVAC is likely 10–15+ years old if replaced once',
    hvacAction: 'R-22 HVAC must be replaced — refrigerant no longer available. Budget $5,500–$12,000.',
    roofAge: '2nd roof likely; assess current roof age carefully before buying or selling',
    roofAction: '30-yr architectural shingle if replaced in 2000s; inspect for storm damage annually.',
    electricalRisk: 'Standard residential panel; check for double-tapped breakers and undersized service',
    electricalAction: '100A service was common; upgrade to 150–200A if adding EV charger or major appliances.',
  },
  '1987–1990': {
    polybutylenePipe: '🔴 HIGH RISK — polybutylene still widely used through 1995',
    pipeProbability: '~75% probability of poly-b in supply lines',
    hvacAge: 'Current HVAC 10–20 years old depending on replacement history',
    hvacAction: 'Check refrigerant type — R-22 must be replaced. High-efficiency R-410A or R-32 system recommended.',
    roofAge: '2nd roof likely; assess age of current shingles carefully',
    roofAction: 'Inspect for wind damage and granule loss; East Plano is in DFW hail corridor.',
    electricalRisk: 'Standard panel; check for double-tapped breakers and ground fault coverage',
    electricalAction: 'Add GFCI to kitchen/bath if missing; consider whole-home surge protector.',
  },
  '1991–1995': {
    polybutylenePipe: '🟡 MODERATE RISK — poly-b used until ~1995',
    pipeProbability: '~50% chance of poly-b; depends on builder and specific subdivision',
    hvacAge: 'HVAC system likely 10–20 years old; approaching or past replacement window',
    hvacAction: 'If original or last replaced pre-2010, plan replacement. High-efficiency 16+ SEER recommended.',
    roofAge: 'May be on original or 2nd roof; 30–35 year shingles from this era degrading now',
    roofAction: 'Inspect for cracking and granule loss; budget for replacement in next 5 years.',
    electricalRisk: 'Standard panel; 100A common — may need upgrade for modern loads',
    electricalAction: 'If adding EV charger or heat pump, upgrade to 200A service.',
  },
  '1996–2000': {
    polybutylenePipe: '🟢 LOW RISK — poly-b phased out by 1995; copper/CPVC standard',
    pipeProbability: '~10% chance — verify with plumber during inspection if buying',
    hvacAge: 'HVAC likely 10–20 years old; approaching end of typical 15–20 yr lifespan',
    hvacAction: 'Plan for replacement in next 2–5 years if not already done. R-22 risk if never replaced.',
    roofAge: 'Likely on original or 2nd roof; architectural shingle from late 1990s now 25–30 years old',
    roofAction: 'Full inspection — many 1990s roofs reaching end of life. Budget for replacement.',
    electricalRisk: 'Modern panel; check for arc fault breakers in bedrooms (required post-1999)',
    electricalAction: 'Add AFCI breakers if missing; add whole-home surge protection.',
  },
};

const priorityItems: Record<string, PriorityItem[]> = {
  '1978–1982': [
    { priority: 1, item: 'Poly-b pipe replacement (supply lines)', urgency: '🔴 Critical', cost: '$4,000–$12,000', note: 'Poly-b fails without warning; average claim is $15K+ in water damage' },
    { priority: 2, item: 'Electrical panel replacement (if FPE/Zinsco)', urgency: '🔴 Critical', cost: '$2,500–$6,000', note: 'Fire hazard; insurance companies refusing to cover homes with these panels' },
    { priority: 3, item: 'HVAC replacement (R-22 system)', urgency: '🔴 Urgent', cost: '$5,500–$12,000', note: 'R-22 refrigerant: production banned; cannot legally recharge' },
    { priority: 4, item: 'Cast iron drain scope + lining or replacement', urgency: '🟡 High', cost: '$2,000–$8,000', note: 'Cast iron from 1980 is 45 years old; camera scope to assess' },
    { priority: 5, item: 'Roof replacement (if 15+ years old)', urgency: '🟡 High', cost: '$8,000–$18,000', note: 'DFW hail accelerates shingle degradation' },
    { priority: 6, item: 'Foundation pier assessment', urgency: '🟡 High', cost: '$3,000–$12,000', note: 'Clay soil movement in older Plano homes is common' },
    { priority: 7, item: 'Attic insulation upgrade (R-38+)', urgency: '🟢 Standard', cost: '$1,800–$3,500', note: 'Original 1980 insulation is severely degraded' },
    { priority: 8, item: 'Kitchen + bath updates', urgency: '🟢 Standard', cost: '$12,000–$40,000', note: 'Deferred maintenance on finishes impacts resale value' },
  ],
  '1983–1986': [
    { priority: 1, item: 'Poly-b pipe replacement', urgency: '🔴 Critical', cost: '$4,000–$12,000', note: 'Peak poly-b era; highest failure rate homes in DFW' },
    { priority: 2, item: 'HVAC replacement (R-22)', urgency: '🔴 Urgent', cost: '$5,500–$12,000', note: 'R-22 ban in effect; no more recharging available' },
    { priority: 3, item: 'Roof assessment + replacement if 15+ yrs', urgency: '🟡 High', cost: '$8,000–$18,000', note: 'DFW storm season hits East Plano hard' },
    { priority: 4, item: 'Cast iron drain camera scope', urgency: '🟡 High', cost: '$300–$600 inspect', note: 'Lines 40+ years old; know their condition' },
    { priority: 5, item: 'Electrical service upgrade (100A → 200A)', urgency: '🟡 High', cost: '$2,500–$5,500', note: 'Modern loads and EV chargers require 200A' },
    { priority: 6, item: 'Foundation inspection', urgency: '🟡 High', cost: '$2,500–$10,000', note: 'East Plano clay soil; 40-yr homes show movement' },
    { priority: 7, item: 'Window replacement (single-pane originals)', urgency: '🟢 Standard', cost: '$350–$800/window', note: 'Significant energy savings; comfort upgrade' },
    { priority: 8, item: 'Kitchen modernization', urgency: '🟢 Standard', cost: '$14,000–$40,000', note: '1980s cabinets, laminate — dated in East Plano market' },
  ],
  '1987–1990': [
    { priority: 1, item: 'Poly-b pipe inspection + replacement', urgency: '🔴 Critical', cost: '$3,500–$11,000', note: 'Still high probability; get a plumber to confirm material' },
    { priority: 2, item: 'HVAC replacement (R-22 risk)', urgency: '🔴 Urgent', cost: '$5,000–$11,000', note: 'If R-22 system remains, replace before next summer' },
    { priority: 3, item: 'Roof full inspection', urgency: '🟡 High', cost: '$400–$900 inspect', note: '35–38 year old roof or 2nd roof aging out; know status' },
    { priority: 4, item: 'Foundation assessment', urgency: '🟡 High', cost: '$2,000–$9,000', note: 'East Plano 35+ yr homes show clay soil movement' },
    { priority: 5, item: 'Cast iron drain scope', urgency: '🟡 High', cost: '$300–$600 inspect', note: 'Lines 35+ years; scope before they fail' },
    { priority: 6, item: 'GFCI + AFCI electrical upgrades', urgency: '🟡 High', cost: '$800–$2,000', note: 'Safety upgrades required in wet areas; AFCI in bedrooms' },
    { priority: 7, item: 'Attic insulation check', urgency: '🟢 Standard', cost: '$1,500–$3,000', note: 'Add blown-in to reach R-38+ for DFW climate' },
    { priority: 8, item: 'Bath modernization', urgency: '🟢 Standard', cost: '$8,000–$22,000', note: '1980s tile and fixtures — upgrade for resale' },
  ],
  '1991–1995': [
    { priority: 1, item: 'Poly-b pipe confirmation + replacement if present', urgency: '🟡 High', cost: '$3,000–$10,000', note: '50% odds; verify with licensed plumber during any repair' },
    { priority: 2, item: 'HVAC replacement if original or R-22', urgency: '🟡 High', cost: '$5,000–$11,000', note: 'R-22 refrigerant ban; plan now if 12+ years old' },
    { priority: 3, item: 'Roof replacement planning (25–30 yr shingles)', urgency: '🟡 High', cost: '$7,500–$16,000', note: 'Budget for replacement in next 3–7 years' },
    { priority: 4, item: 'Foundation monitoring', urgency: '🟡 High', cost: '$1,500–$7,000', note: 'Clay soil movement; document cracks annually' },
    { priority: 5, item: 'Water heater replacement', urgency: '🟡 High', cost: '$1,200–$2,500', note: 'DFW hard water destroys tank WH at 8–12 yrs' },
    { priority: 6, item: 'Electrical service upgrade (100A → 200A)', urgency: '🟢 Standard', cost: '$2,000–$5,000', note: 'If adding EV charger, heat pump, or whole-home reno' },
    { priority: 7, item: 'Kitchen + bath updates', urgency: '🟢 Standard', cost: '$10,000–$35,000', note: 'Mid-1990s finishes dated; update for resale value' },
    { priority: 8, item: 'Insulation upgrade', urgency: '🟢 Standard', cost: '$1,500–$3,000', note: 'R-19 attic from 1993 should be R-38 for DFW heat' },
  ],
  '1996–2000': [
    { priority: 1, item: 'HVAC replacement (if original or R-22)', urgency: '🟡 High', cost: '$4,500–$10,000', note: 'Original systems are 25–30 yrs old; plan replacement now' },
    { priority: 2, item: 'Roof assessment (25–30 yr shingles)', urgency: '🟡 High', cost: '$7,000–$15,000', note: 'Shingles from late 1990s reaching end of life in DFW' },
    { priority: 3, item: 'Water heater (DFW hard water impact)', urgency: '🟡 High', cost: '$1,200–$2,500', note: 'Exceeding average lifespan; inspect anode + tank condition' },
    { priority: 4, item: 'Foundation monitoring', urgency: '🟡 High', cost: '$1,200–$6,000', note: '25–30 yr home; clay soil movement cumulative' },
    { priority: 5, item: 'Kitchen cabinet + countertop update', urgency: '🟢 Standard', cost: '$8,000–$25,000', note: 'Late 1990s oak cabinets + laminate dated in Plano market' },
    { priority: 6, item: 'Bath remodel', urgency: '🟢 Standard', cost: '$6,000–$18,000', note: 'Builder-grade tile from this era needs refresh' },
    { priority: 7, item: 'AFCI breakers + whole-home surge protector', urgency: '🟢 Standard', cost: '$800–$2,000', note: 'Modern safety standard; add if not already present' },
    { priority: 8, item: 'Insulation upgrade (blown-in attic)', urgency: '🟢 Standard', cost: '$1,500–$3,000', note: 'R-30 from 1998 should be R-38+ today' },
  ],
};

const deferredCostTable: Record<string, DeferredItem[]> = {
  '1978–1982': [
    { project: 'Poly-b pipe failure (emergency replumb)', deferredCost: '$15,000–$45,000+ (water damage + replumb)', urgency: 'Every year you wait = higher risk' },
    { project: 'HVAC failure (peak summer)', deferredCost: '$6,000–$14,000 emergency + hotel costs', urgency: 'Plan replacement; do not wait for failure' },
    { project: 'Roof leak (deferred replacement)', deferredCost: '$18,000–$50,000+ (mold + structural)', urgency: 'Catch leaks before deck damage' },
    { project: 'Foundation deferred repair', deferredCost: '$20,000–$60,000 (major pier/beam work)', urgency: 'Clay soil damage compounds annually' },
  ],
  '1983–1986': [
    { project: 'Poly-b pipe burst (bathroom or slab)', deferredCost: '$12,000–$40,000+ (water damage)', urgency: 'Peak failure era; act now' },
    { project: 'R-22 HVAC emergency replacement', deferredCost: '$7,000–$14,000 emergency premium', urgency: 'No refrigerant available; no repair option' },
    { project: 'Roof replacement (deferred 5+ yrs)', deferredCost: '$25,000–$55,000 (deck + interior)', urgency: 'Granule loss → decking rot → interior damage' },
    { project: 'Foundation deferred repair', deferredCost: '$15,000–$50,000 compounding', urgency: 'Annual movement adds up fast' },
  ],
  '1987–1990': [
    { project: 'Poly-b pipe failure', deferredCost: '$10,000–$35,000+ (water damage + replumb)', urgency: 'Still likely present; failure is sudden' },
    { project: 'HVAC emergency replacement (summer)', deferredCost: '$6,500–$13,000 emergency', urgency: 'Emergency premium + heat risk in DFW summer' },
    { project: 'Roof deferred replacement', deferredCost: '$20,000–$45,000 (interior + mold)', urgency: 'Catch before deck saturation' },
    { project: 'Drain line collapse (cast iron)', deferredCost: '$8,000–$25,000 (slab breach + replumb)', urgency: 'Camera scope now to assess' },
  ],
  '1991–1995': [
    { project: 'Poly-b pipe failure (if present)', deferredCost: '$10,000–$35,000+', urgency: 'Confirm pipe material; replace if found' },
    { project: 'HVAC failure (deferred replacement)', deferredCost: '$6,000–$12,000 emergency', urgency: 'Plan now vs emergency later' },
    { project: 'Roof replacement (5+ yr deferral)', deferredCost: '$18,000–$40,000 (damage cascades)', urgency: 'Inspect now; know remaining life' },
    { project: 'Foundation deferred (5+ yr deferral)', deferredCost: '$12,000–$40,000 compounding', urgency: 'Annual clay movement compounds' },
  ],
  '1996–2000': [
    { project: 'HVAC failure (deferred)', deferredCost: '$5,500–$11,000 emergency', urgency: 'Plan on schedule; avoid peak-summer emergency' },
    { project: 'Roof replacement (deferred past 30 yrs)', deferredCost: '$15,000–$35,000 (deck + interior)', urgency: 'Late 1990s shingles now at end of life' },
    { project: 'Water heater failure (tank burst)', deferredCost: '$3,000–$10,000 (water damage + WH)', urgency: 'DFW hard water accelerates tank failure' },
    { project: 'Foundation deferred (no monitoring)', deferredCost: '$10,000–$35,000 compounding', urgency: 'Annual check is low cost vs major repair' },
  ],
};

export default function DFWEastPlanoGuide() {
  const [buildYear, setBuildYear] = useState('');
  const [knownIssues, setKnownIssues] = useState<string[]>([]);

  const risk = buildYear ? riskData[buildYear] : null;
  const priorities = buildYear ? priorityItems[buildYear] ?? [] : [];
  const deferred = buildYear ? deferredCostTable[buildYear] ?? [] : [];

  const filteredPriorities = knownIssues.length === 0 || knownIssues.includes('No known issues')
    ? priorities
    : priorities.filter(p => {
        if (knownIssues.includes('Slow drains') && (p.item.toLowerCase().includes('drain') || p.item.toLowerCase().includes('cast iron'))) return true;
        if (knownIssues.includes('Low water pressure') && p.item.toLowerCase().includes('pipe')) return true;
        if (knownIssues.includes('HVAC problems') && p.item.toLowerCase().includes('hvac')) return true;
        if (knownIssues.includes('Foundation cracks') && p.item.toLowerCase().includes('foundation')) return true;
        if (knownIssues.includes('Outdated kitchen/bath') && (p.item.toLowerCase().includes('kitchen') || p.item.toLowerCase().includes('bath'))) return true;
        return p.urgency.includes('🔴');
      });

  const toggleIssue = (issue: string) => {
    if (issue === 'No known issues') { setKnownIssues(['No known issues']); return; }
    setKnownIssues(prev => prev.includes(issue) ? prev.filter(i => i !== issue) : [...prev.filter(i => i !== 'No known issues'), issue]);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>🏘️ PLANO NEIGHBORHOOD GUIDE</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>East Plano</h1>
        <h2 style={{ fontSize: 18, fontWeight: 400, color: '#a0b0c8', marginBottom: 24 }}>1980s–1990s Suburb Maintenance Guide</h2>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 28, borderLeft: '4px solid #F5E642' }}>
          <p style={{ margin: 0, lineHeight: 1.7, color: '#c8d8e8' }}>
            East Plano's established neighborhoods were built from <strong style={{ color: '#F5E642' }}>1978–2000</strong>, making most homes 25–45 years old. These homes have three urgent risks: <strong>polybutylene pipes</strong> (1978–1995), aging HVAC systems on R-22 refrigerant, and 30-year roofs reaching end of life. The good news: these are all fixable — if you act before they fail. Select your build era and known issues to get your priority repair list.
          </p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 10, color: '#F5E642', fontWeight: 600, fontSize: 14 }}>📅 Home Build Era</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {buildYears.map(y => (
              <button key={y} onClick={() => setBuildYear(y)} style={{ padding: '10px 16px', borderRadius: 8, border: `2px solid ${buildYear === y ? '#F5E642' : '#1e3a5f'}`, backgroundColor: buildYear === y ? '#1a2e4a' : '#0f2040', color: buildYear === y ? '#F5E642' : '#c8d8e8', fontWeight: buildYear === y ? 700 : 400, cursor: 'pointer', fontSize: 14 }}>
                {y}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={{ display: 'block', marginBottom: 10, color: '#F5E642', fontWeight: 600, fontSize: 14 }}>⚠️ Known Issues (select all that apply)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {issueOptions.map(issue => (
              <button key={issue} onClick={() => toggleIssue(issue)} style={{ padding: '8px 14px', borderRadius: 20, border: `2px solid ${knownIssues.includes(issue) ? '#F5E642' : '#1e3a5f'}`, backgroundColor: knownIssues.includes(issue) ? '#1a2e4a' : '#0f2040', color: knownIssues.includes(issue) ? '#F5E642' : '#c8d8e8', cursor: 'pointer', fontSize: 13, fontWeight: knownIssues.includes(issue) ? 600 : 400 }}>
                {issue}
              </button>
            ))}
          </div>
        </div>

        {risk && (
          <div>
            <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 14, fontSize: 17 }}>Risk Profile — {buildYear} Build</h3>
              {[
                { label: '🔩 Polybutylene Pipe Risk', main: risk.polybutylenePipe, sub: risk.pipeProbability },
                { label: '❄️ HVAC Status', main: risk.hvacAge, sub: risk.hvacAction },
                { label: '🏠 Roof Status', main: risk.roofAge, sub: risk.roofAction },
                { label: '⚡ Electrical Risk', main: risk.electricalRisk, sub: risk.electricalAction },
              ].map((r, i) => (
                <div key={i} style={{ backgroundColor: '#162840', borderRadius: 8, padding: 14, marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>{r.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{r.main}</div>
                  <div style={{ fontSize: 13, color: '#a0b0c8' }}>→ {r.sub}</div>
                </div>
              ))}
            </div>

            <h3 style={{ color: '#F5E642', marginBottom: 14, fontSize: 17 }}>Priority Repair List</h3>
            {filteredPriorities.map((item, i) => (
              <div key={i} style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '14px 18px', marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 8px', fontWeight: 800, fontSize: 12, minWidth: 24, textAlign: 'center' }}>#{item.priority}</div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{item.item}</div>
                  </div>
                  <div style={{ fontSize: 13 }}>{item.urgency}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ fontSize: 13, color: '#a0b0c8' }}>💡 {item.note}</div>
                  <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13, whiteSpace: 'nowrap' }}>{item.cost}</div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 28 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 14, fontSize: 17 }}>Cost of Deferred Maintenance</h3>
              {deferred.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '12px 16px', marginBottom: 10 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.project}</div>
                  <div style={{ color: '#ff6b6b', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Deferred cost: {item.deferredCost}</div>
                  <div style={{ fontSize: 13, color: '#a0b0c8' }}>⏰ {item.urgency}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!buildYear && (
          <div style={{ textAlign: 'center', padding: 40, color: '#4a6a8a' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏠</div>
            <div style={{ fontSize: 16 }}>Select your home's build era to see your risk profile and priority repair list.</div>
          </div>
        )}

        <div style={{ marginTop: 36, padding: 20, backgroundColor: '#0f2040', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Get East Plano Specialists</div>
          <div style={{ color: '#a0b0c8', fontSize: 14, marginBottom: 16 }}>ProLnk connects East Plano homeowners with plumbers, HVAC techs, and roofers who know 1980s–90s Plano construction — including polybutylene replacement specialists.</div>
          <div style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Find My Specialists →</div>
        </div>
      </div>
    </div>
  );
}
