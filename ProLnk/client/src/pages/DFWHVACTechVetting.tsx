import { useState } from 'react';

const projectTypes = [
  'Annual maintenance / tune-up',
  'AC repair (system not cooling)',
  'Full system replacement',
  'New installation (new home)',
  'Ductwork repair or replacement',
  'Thermostat upgrade or smart home',
];

const vettingCriteria = [
  {
    number: 1,
    title: 'TDLR License Verification',
    icon: '📜',
    ask: 'Can I get your TDLR license number before booking?',
    good: 'Immediately provides license number — verified at tdlr.texas.gov in 60 seconds',
    bad: 'Hesitates, says "I\’ll have the office send it," or provides number that doesn\’t match',
    why: 'Texas law requires HVAC technicians to hold an active license. Unlicensed techs have no accountability and void your manufacturer warranty.',
    dfwMarket: 'Dallas-Fort Worth has 400+ licensed HVAC companies. No reason to hire unlicensed.',
    critical: true,
  },
  {
    number: 2,
    title: 'NATE Certification',
    icon: '🏆',
    ask: 'Are your technicians NATE certified? Can you show the certification?',
    good: 'Shows NATE certificate or card — NATE is industry\’s highest technical standard',
    bad: '"We have our own training" or confuses NATE with manufacturer training',
    why: 'NATE (North American Technician Excellence) requires passing rigorous exams. Non-certified techs misdiagnose 30-40% more frequently.',
    dfwMarket: 'DFW summer complexity (extreme heat + humidity swings) requires above-average technical competence.',
    critical: true,
  },
  {
    number: 3,
    title: 'Local Physical Address',
    icon: '📍',
    ask: 'What\’s your company\’s physical address in DFW?',
    good: 'Gives specific street address in DFW metro that shows on Google Maps with matching reviews',
    bad: 'PO Box only, out-of-state address, or "we\’re mobile" — these are storm-chaser red flags',
    why: 'Storm chasers flood DFW after hail events and ice storms offering fake warranties they can\’t honor.',
    dfwMarket: 'After Winter Storm Uri and 2024 hail seasons, DFW saw 300+ fly-by-night HVAC operators appear. Local address = accountability.',
    critical: true,
  },
  {
    number: 4,
    title: 'Company History & Years in DFW',
    icon: '📅',
    ask: 'How long has your company operated in DFW specifically?',
    good: '5+ years in DFW metro — they understand clay soil, DFW summer loads, local code',
    bad: 'Under 2 years, relocated from another state, or can\’t answer specifically for DFW market',
    why: 'DFW HVAC has unique requirements: extreme heat design days, clay soil foundation movement affecting duct systems, local code variations.',
    dfwMarket: 'Tarrant, Dallas, Collin, and Denton counties each have slightly different permit requirements — local experience matters.',
    critical: false,
  },
  {
    number: 5,
    title: 'Warranty on Parts & Labor',
    icon: '🛡️',
    ask: 'What warranty do you offer on parts AND labor specifically?',
    good: '1-year labor minimum, uses parts with manufacturer warranty, provides written warranty',
    bad: '"90 days," "parts only," or "we warranty our work" without specifics in writing',
    why: 'In DFW summer, a part failure 6 months after repair with no labor warranty means you pay full price again.',
    dfwMarket: 'DFW summer stress on components means parts that fail once often fail again. Labor warranty protection is essential.',
    critical: true,
  },
  {
    number: 6,
    title: 'Upfront Diagnostic Fee Transparency',
    icon: '💰',
    ask: 'What is your diagnostic fee, and is it applied to the repair cost?',
    good: '$79-129 diagnostic fee that applies to repair if you proceed — standard DFW market',
    bad: 'No fee mentioned upfront, fees vary "depending on problem," or fee not applied to repair',
    why: 'Bait-and-switch diagnostics are common in DFW — tech diagnoses, then quotes inflated repair to offset waived diagnostic fee.',
    dfwMarket: 'DFW standard: $89-119 diagnostic, credited to repair. Emergency rates: $149-199 diagnostic. Anything outside this range needs explanation.',
    critical: false,
  },
  {
    number: 7,
    title: 'Refrigerant Handling Certification',
    icon: '❄️',
    ask: 'Is your tech EPA 608 certified for refrigerant handling?',
    good: 'Confirms EPA 608 certification — required by federal law to purchase and handle refrigerant',
    bad: 'Doesn\’t know what 608 is, or says "we\’re licensed in Texas so it covers that" (it doesn\’t)',
    why: 'Illegal refrigerant venting is an EPA federal violation. Techs without 608 cannot legally purchase or handle refrigerants.',
    dfwMarket: 'R-410A is being phased out for R-454B — 608-certified techs understand the transition and can advise on future-proofing.',
    critical: true,
  },
  {
    number: 8,
    title: 'Permit Pulling for Major Work',
    icon: '🏛️',
    ask: 'Will you pull a permit for this work? Who is responsible for inspections?',
    good: 'For replacement or new install: "Yes, we pull the permit and schedule inspection" — required by code',
    bad: '"Permits aren\’t necessary for this" (they are for replacements), or "you can pull it yourself"',
    why: 'Unpermitted HVAC work in DFW can void homeowner\’s insurance, block home sales, and create liability if fire or injury occurs.',
    dfwMarket: 'Dallas, Fort Worth, Frisco, Plano, and all DFW municipalities require permits for replacement units. No exceptions.',
    critical: false,
  },
];

const ratesByProject: Record<string, { diagnostic: string; labor: string; parts: string; note: string }> = {
  'Annual maintenance / tune-up': { diagnostic: 'N/A', labor: '$89-149 per visit', parts: 'Filter: $15-30. Capacitor: $150-250 installed', note: 'Contract pricing: $249-399/year for 2 visits. Single visit over $200 is overpriced.' },
  'AC repair (system not cooling)': { diagnostic: '$89-129 (credited to repair)', labor: '$150-400 typical repair', parts: 'Capacitor: $150-250. Contactor: $200-300. Blower motor: $400-600', note: 'Emergency rates (evening/weekend): add $75-125 to labor. Anything over $800 for non-compressor repair needs second opinion.' },
  'Full system replacement': { diagnostic: 'Free with installation quote', labor: 'Included in total price', parts: '2-ton: $4,500-7,000. 3-ton: $5,500-9,000. 4-ton: $7,000-12,000', note: 'All-in including labor and disposal. SEER 16+ recommended for DFW. 10-year parts + 2-year labor warranty minimum.' },
  'New installation (new home)': { diagnostic: 'Free quote', labor: 'Included in total price', parts: 'Varies by home size and ductwork', note: 'Require Manual J load calculation — undersized/oversized systems are the #1 DFW comfort complaint.' },
  'Ductwork repair or replacement': { diagnostic: '$125-200 for duct inspection', labor: '$200-600 per zone repaired', parts: 'Flex duct: $3-8/linear ft. Sheet metal: $10-25/linear ft', note: 'Full replacement: $3,000-8,000 typical DFW home. Sealing only: $500-1,500.' },
  'Thermostat upgrade or smart home': { diagnostic: 'N/A', labor: '$75-150 installation', parts: 'Smart thermostat: $150-350 (Ecobee/Nest). Basic: $25-75', note: 'Most DFW homes need C-wire adapter for smart thermostats — should be included in install price.' },
};

export default function DFWHVACTechVetting() {
  const [projectType, setProjectType] = useState('');
  const [showVetting, setShowVetting] = useState(false);
  const [expandedCriteria, setExpandedCriteria] = useState<number | null>(null);

  const rates = projectType ? ratesByProject[projectType] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>How to Vet a DFW HVAC Tech</h1>
        <p style={{ color: '#94A3B8', marginBottom: 36 }}>8 things to verify before any DFW HVAC technician works on your home — with exactly what to ask and what good vs. bad answers look like.</p>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Select Your Project Type</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
          {projectTypes.map(pt => (
            <button key={pt} onClick={() => { setProjectType(pt); setShowVetting(false); }} style={{ textAlign: 'left', padding: '12px 18px', borderRadius: 10, border: '1px solid', borderColor: projectType === pt ? '#F5E642' : '#1E3A5F', background: projectType === pt ? '#1A2A10' : '#111D35', color: projectType === pt ? '#F5E642' : '#CBD5E1', fontSize: 14, cursor: 'pointer' }}>
              {projectType === pt ? '● ' : '○ '}{pt}
            </button>
          ))}
        </div>

        {projectType && (
          <button onClick={() => setShowVetting(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginBottom: 32, width: '100%' }}>
            Show Vetting Checklist + DFW Rates →
          </button>
        )}

        {showVetting && rates && (
          <div style={{ background: '#0F1E38', borderRadius: 12, padding: 24, marginBottom: 28, borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642', marginBottom: 16 }}>💰 Fair DFW Market Rates — {projectType}</div>
            <div style={{ display: 'grid', gap: 10 }}>
              {[
                { label: 'Diagnostic', value: rates.diagnostic },
                { label: 'Labor', value: rates.labor },
                { label: 'Parts Reference', value: rates.parts },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: '#111D35', borderRadius: 8, padding: '12px 16px' }}>
                  <span style={{ color: '#94A3B8', fontSize: 14 }}>{r.label}</span>
                  <span style={{ color: '#CBD5E1', fontSize: 14, fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{r.value}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, fontSize: 13, color: '#64748B' }}>💡 {rates.note}</div>
          </div>
        )}

        {showVetting && (
          <>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>✅ 8 Vetting Criteria</h2>
            {vettingCriteria.map((vc) => (
              <div key={vc.number} style={{ background: '#111D35', borderRadius: 10, marginBottom: 12, overflow: 'hidden', borderLeft: `4px solid ${vc.critical ? '#F5E642' : '#1E3A5F'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '16px 18px', cursor: 'pointer', gap: 14 }} onClick={() => setExpandedCriteria(expandedCriteria === vc.number ? null : vc.number)}>
                  <span style={{ fontSize: 24 }}>{vc.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{vc.number}. {vc.title}</div>
                    <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>Ask: "{vc.ask}"</div>
                  </div>
                  {vc.critical && <span style={{ fontSize: 11, color: '#F5E642', background: '#1A2A10', padding: '3px 8px', borderRadius: 20, flexShrink: 0 }}>CRITICAL</span>}
                  <span style={{ color: '#64748B' }}>{expandedCriteria === vc.number ? '▲' : '▼'}</span>
                </div>
                {expandedCriteria === vc.number && (
                  <div style={{ padding: '0 18px 18px', borderTop: '1px solid #1E3A5F' }}>
                    <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
                      <div style={{ background: '#0A2010', borderRadius: 8, padding: '12px 14px' }}>
                        <div style={{ fontSize: 12, color: '#22C55E', fontWeight: 700, marginBottom: 4 }}>✅ GOOD ANSWER</div>
                        <div style={{ fontSize: 14, color: '#CBD5E1' }}>{vc.good}</div>
                      </div>
                      <div style={{ background: '#1A1010', borderRadius: 8, padding: '12px 14px' }}>
                        <div style={{ fontSize: 12, color: '#EF4444', fontWeight: 700, marginBottom: 4 }}>❌ BAD ANSWER (RED FLAG)</div>
                        <div style={{ fontSize: 14, color: '#CBD5E1' }}>{vc.bad}</div>
                      </div>
                      <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 14px' }}>
                        <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>🌡️ DFW CONTEXT</div>
                        <div style={{ fontSize: 14, color: '#94A3B8' }}>{vc.dfwMarket}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        <div style={{ marginTop: 32, padding: '20px 24px', background: '#0F1E38', borderRadius: 12, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🔗 Quick Verification Links</div>
          <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.8 }}>
            • TDLR License Check: tdlr.texas.gov/LicenseSearch<br />
            • NATE Certification: natex.org/verify-certification<br />
            • BBB DFW: bbb.org/local/dallas-fort-worth<br />
            • Texas AG Consumer Protection: texasattorneygeneral.gov/consumer-protection
          </div>
        </div>
      </div>
    </div>
  );
}
