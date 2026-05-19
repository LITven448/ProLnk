import { useState } from 'react';

type Stage = 'just-bought' | 'five-years' | 'approaching-replacement' | 'replacing';

const stages = [
  { id: 'just-bought' as Stage, label: '🔑 Just Bought / Moved In', subtitle: 'First 90 days of DFW HVAC ownership' },
  { id: 'five-years' as Stage, label: '📅 5+ Years In', subtitle: 'Routine ownership — optimization phase' },
  { id: 'approaching-replacement' as Stage, label: '⏰ System Is 10-12+ Years Old', subtitle: 'Planning ahead for replacement' },
  { id: 'replacing' as Stage, label: '🔄 Replacing the System Now', subtitle: 'Buying a new DFW HVAC system' },
];

const stageContent: Record<Stage, { headline: string; insight: string; actions: { action: string; detail: string; urgency: string }[]; dfwFact: string }> = {
  'just-bought': {
    headline: 'Your first priority is documentation and verification.',
    insight: 'Most DFW homeowners know almost nothing about the HVAC system they just inherited. The first 90 days are about learning what you have — age, refrigerant type, maintenance history — before a summer emergency forces you to learn the hard way.',
    actions: [
      { action: 'Find, photograph, and document all equipment nameplates', detail: 'Air handler and condenser both. Capture model, serial, and date codes. Store in Google Photos or a home folder.', urgency: 'critical' },
      { action: 'Decode the manufacture date from the serial number', detail: 'Google "[brand] serial number year decoder". Knowing if your system is 8 or 14 years old changes every decision you make.', urgency: 'critical' },
      { action: 'Check refrigerant type — R-22 vs R-410A', detail: 'If your system uses R-22 (pre-2010 equipment), refrigerant is nearly unavailable. A leak means replacement, not repair.', urgency: 'critical' },
      { action: 'Replace filter and flush condensate drain', detail: 'Do both on day 1. DFW summer will test your system immediately — start clean.', urgency: 'critical' },
      { action: 'Schedule a full inspection with a NATE-certified tech', detail: 'Not a free estimate, a paid inspection. Ask for refrigerant charge check, heat exchanger inspection, and condensate system evaluation.', urgency: 'important' },
    ],
    dfwFact: 'DFW HVAC systems work harder than almost anywhere in the US — 5,000+ cooling hours per year vs. 1,500 in northern states. Your system\’s "age" in DFW is equivalent to much older equipment in milder climates.',
  },
  'five-years': {
    headline: 'You\’re in the optimization phase — extend system life and catch problems early.',
    insight: 'At 5 years in, you know your system. The goal now is to protect your investment, reduce operating costs, and catch the early signs of degradation before they become emergencies. DFW systems at this age should be running efficiently if maintained.',
    actions: [
      { action: 'Verify your filter change habits are correct for DFW', detail: 'Standard DFW recommendation: every 30 days April–September, every 60 days Oct–March. Using MERV 8-11, not MERV 13+ which restricts flow.', urgency: 'critical' },
      { action: 'Annual professional tune-up — refrigerant check included', detail: 'Refrigerant charge degrades slowly from micro-leaks. At 5 years, verify charge is still correct. Low charge = 20-30% efficiency loss + compressor stress.', urgency: 'critical' },
      { action: 'Inspect and seal attic ductwork', detail: 'DFW attic temps hit 140°F, degrading duct seals after 5-7 years. Even 15% duct leakage adds $300-500/year in wasted energy in DFW.', urgency: 'important' },
      { action: 'Consider adding a condensate overflow shutoff switch', detail: 'If not installed during original setup, costs $50-100 installed. Prevents thousands in water damage from drain blockage.', urgency: 'important' },
      { action: 'Evaluate smart thermostat upgrade if not done', detail: 'Ecobee or Nest with DFW-appropriate programming can cut cooling costs 15-20%. DFW setback strategy: 78°F when away, 74°F occupied.', urgency: 'optional' },
    ],
    dfwFact: 'DFW homeowners spend an average of $2,400/year on HVAC energy costs. Proper maintenance and duct sealing can reduce that to $1,800-2,000 — a $400-600 annual savings for $200-400 in maintenance.',
  },
  'approaching-replacement': {
    headline: 'At 10-12+ years, you\’re in the replacement planning window. Know your options before an emergency decides for you.',
    insight: 'The worst time to buy a new HVAC system is when your current one has just failed in a DFW July. At that point you have no time to compare quotes, no leverage, and no ability to plan financing. The best time to plan is 2-3 years before you need it.',
    actions: [
      { action: 'Get a system assessment — not a tune-up', detail: 'Ask your tech: "Honestly, how long does this system have?" A good tech will tell you what\’s wearing and what\’s likely to fail next. You want truth, not just service.', urgency: 'critical' },
      { action: 'Get 2-3 replacement quotes now, not in crisis', detail: 'Compare quotes with no time pressure. Know what a good DFW system replacement costs ($8,000-16,000 for full system depending on size and efficiency).', urgency: 'critical' },
      { action: 'Evaluate heat pump vs. traditional system', detail: 'New federal incentives (25C tax credit) make heat pumps attractive. DFW climate is excellent for heat pumps — evaluate if switching makes sense.', urgency: 'important' },
      { action: 'Understand SEER2 ratings and long-term energy cost', detail: 'Minimum SEER2 is now 15 in Texas. A 20 SEER2 system vs. 15 SEER2 saves $300-500/year in DFW. Calculate payback period.', urgency: 'important' },
      { action: 'Stop spending money on the old system — set a threshold', detail: 'The "5,000 rule": multiply remaining years of life by $5,000 repair limit. If repair exceeds that, replace. A 12-year-old system: 3 years × $5,000 = $15,000 max total repairs.', urgency: 'important' },
    ],
    dfwFact: 'DFW HVAC replacement rates spike every summer after heat waves. Contractors get booked 2-3 weeks out and prices increase 10-15% during peak demand. Getting quotes in winter gives you 3-4 week lead time and better pricing.',
  },
  'replacing': {
    headline: 'You\’re making a 12-15 year decision. Get it right.',
    insight: 'A DFW HVAC replacement is a $10,000-18,000 decision that will affect your home comfort, energy bills, and repair costs for the next 12-15 years. The brand matters less than the contractor, the sizing, and the installation quality.',
    actions: [
      { action: 'Demand a Manual J load calculation before accepting any quote', detail: 'Any contractor who quotes without a Manual J calculation is guessing your system size. Wrong size = short-cycling, poor humidity control, premature failure. Walk away from any contractor who won\’t do this.', urgency: 'critical' },
      { action: 'Verify contractor is NATE-certified and licensed in Texas', detail: 'Check TDLR license at tdlr.texas.gov. NATE certification means technicians have passed standardized competency tests. Non-negotiable.', urgency: 'critical' },
      { action: 'Replace both indoor and outdoor units together', detail: 'Mismatched systems void efficiency ratings and warranties. Replacing only the condenser and keeping an old air handler is almost always a false economy.', urgency: 'critical' },
      { action: 'Evaluate heat pump with gas backup (dual fuel) for DFW', detail: 'Ideal for DFW climate — heat pump for mild winters (80% of days), gas backup for DFW cold snaps. Best of both efficiency and heating capacity.', urgency: 'important' },
      { action: 'Negotiate a 2-year parts and labor warranty minimum', detail: 'Manufacturer warranties cover parts. Labor warranty covers installation defects. First year is most important — that\’s when installation issues surface.', urgency: 'important' },
      { action: 'Request duct inspection and sealing as part of replacement', detail: 'New equipment on old leaky ducts loses 20-30% efficiency. Ask the contractor to pressure-test ducts and seal them with the replacement. Get it in the quote.', urgency: 'important' },
    ],
    dfwFact: 'Installation quality matters more than brand in DFW. A correctly installed mid-tier system outperforms a poorly installed premium brand. Ask your contractor: "Will you do a Manual J, refrigerant charge verification after startup, and airflow measurement?" If they hesitate, find another contractor.',
  },
};

const urgencyStyle = (u: string) => ({ critical: '#FCA5A5', important: '#FDE68A', optional: '#86EFAC' }[u] || '#CBD5E1');

export default function DFWHVACCompleteOwnerGuide() {
  const [stage, setStage] = useState<Stage | null>(null);
  const content = stage ? stageContent[stage] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>📖</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>Complete DFW HVAC Owner Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Everything from day 1 through full replacement — where are you in the ownership journey?</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 28 }}>
          {stages.map(s => (
            <button key={s.id} onClick={() => setStage(stage === s.id ? null : s.id)}
              style={{ background: stage === s.id ? '#1E3A5F' : '#0F2237', border: `2px solid ${stage === s.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: '16px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
              <div style={{ color: stage === s.id ? '#F5E642′ : '#CBD5E1', fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#64748B', fontSize: 12 }}>{s.subtitle}</div>
            </button>
          ))}
        </div>

        {content && stage ? (
          <div>
            <div style={{ background: '#0F2237', border: '2px solid #1E3A5F', borderRadius: 14, padding: 24, marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 10px' }}>{content.headline}</h2>
              <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.8, margin: 0 }}>{content.insight}</p>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ color: '#64748B', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>YOUR ACTION ITEMS</div>
              {content.actions.map((a, i) => (
                <div key={i} style={{ background: '#0F2237', border: `1px solid #1E3A5F`, borderLeft: `4px solid ${urgencyStyle(a.urgency)}`, borderRadius: '0 10px 10px 0', padding: '14px 18px', marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <div style={{ color: '#E8EDF5', fontSize: 14, fontWeight: 700, flex: 1 }}>{a.action}</div>
                    <span style={{ color: urgencyStyle(a.urgency), fontSize: 10, fontWeight: 700, letterSpacing: 0.5, marginLeft: 12, textTransform: 'uppercase' }}>{a.urgency}</span>
                  </div>
                  <p style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{a.detail}</p>
                </div>
              ))}
            </div>

            <div style={{ background: '#0F2237', border: '1px solid #F5E642', borderRadius: 12, padding: 18 }}>
              <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>📍 DFW-SPECIFIC FACT</div>
              <p style={{ color: '#CBD5E1', fontSize: 13, lineHeight: 1.8, margin: 0 }}>{content.dfwFact}</p>
            </div>
          </div>
        ) : (
          <div style={{ background: '#0F2237', border: '2px dashed #1E3A5F', borderRadius: 14, padding: 40, textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🗺️</div>
            <p style={{ color: '#64748B', margin: 0, fontSize: 15 }}>Select your ownership stage above to get your DFW HVAC roadmap</p>
            <p style={{ color: '#334155', fontSize: 12, marginTop: 8 }}>From day 1 orientation through system replacement — everything you need to know at your stage</p>
          </div>
        )}
      </div>
    </div>
  );
}
