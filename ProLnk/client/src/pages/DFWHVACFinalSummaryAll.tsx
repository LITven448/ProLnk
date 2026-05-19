import { useState } from 'react';

const topFacts = [
  { num: '01', fact: 'DFW summers average 65+ days above 95F — your AC runs harder here than almost anywhere in the US except Phoenix and Las Vegas.' },
  { num: '02', fact: 'ERCOT time-of-use pricing (3-7 PM peak) is the single biggest savings lever for DFW homeowners — pre-cooling strategy saves $200-340/yr.' },
  { num: '03', fact: 'Heat pumps outperform gas furnaces in DFW winters because DFW rarely sees sustained temps below 30F where heat pump efficiency drops.' },
  { num: '04', fact: 'DFW has 4 shoulder-season months (March, April, October, November) where HVAC use can be near-zero — a $300-500/yr opportunity most homeowners miss.' },
  { num: '05', fact: 'Oncor demand-response programs pay DFW homeowners $85-160/yr to allow minor thermostat adjustments during grid stress events.' },
  { num: '06', fact: 'Monthly filter changes are essential in DFW — construction dust, cedar pollen, and summer storms clog filters 2x faster than national averages.' },
  { num: '07', fact: 'West-facing DFW homes receive 3-4 hours of direct afternoon sun — exterior solar screens are the highest-ROI improvement for summer bills.' },
  { num: '08', fact: 'The 2021 polar vortex exposed that most DFW HVAC systems are not rated for sustained sub-20F operation — emergency heat backup is essential.' },
  { num: '09', fact: 'Whole-house fans deliver the best ROI in DFW shoulder seasons — 90+ nights per year fall below 70F, enabling free cooling that delays AC runtime.' },
  { num: '10', fact: 'System sizing matters most in DFW — an oversized AC short-cycles and fails to dehumidify, creating mold risk in DFW\’s humid spring and fall.' },
];

const topActions = [
  { action: 'Switch to ERCOT time-of-use plan + program pre-cooling schedule', impact: 'Saves $200-340/yr starting this summer' },
  { action: 'Enroll in Oncor demand-response Smart Thermostat program', impact: 'Free $85+ rebate, ongoing bill credits' },
  { action: 'Install exterior solar screens on west and south windows', impact: 'Reduces cooling load 10-15%, pays back in 2-3 summers' },
  { action: 'Schedule annual AC tune-up in February or March (before rush)', impact: 'Catches refrigerant issues, extends system life 3-5 years' },
  { action: 'Upgrade attic insulation to R-38 if currently below R-19', impact: 'Reduces year-round HVAC bills 15-25%, qualifies for federal tax credit' },
];

const homeownerTypes = [
  { id: 'new', label: 'New DFW homeowner', actions: ['Start with an HVAC inspection — know what you have before summer hits.', 'Enroll in Oncor demand-response immediately — free money.', 'Program thermostat for TOU pre-cooling before June 1.', 'Install door sweeps on all exterior doors.', 'Schedule AC tune-up for February/March every year.'] },
  { id: 'long', label: 'Long-term DFW homeowner', actions: ['Evaluate heat pump replacement if furnace is over 12 years old.', 'Upgrade attic insulation if below R-30 — biggest remaining opportunity.', 'Add exterior solar screens to west-facing windows.', 'Switch to TOU electricity plan if still on flat rate.', 'Audit duct leakage — DFW homes lose 20-30% of conditioned air through ducts.'] },
  { id: 'landlord', label: 'DFW landlord / investment property', actions: ['Install smart thermostat with remote monitoring — catch problems before tenant calls.', 'Schedule tune-up every spring, document for records.', 'Upgrade to MERV-8 filters and provide 12 to tenant — reduces service calls.', 'Inspect condensate drain line annually — clogs cause water damage claims.', 'Add hail guard to outdoor unit — DFW hail damage is frequent and costly.'] },
  { id: 'seller', label: 'Preparing to sell DFW home', actions: ['Get HVAC inspection and fix any issues before listing — buyers inspect everything.', 'Replace filter and clean coils — shows well-maintained system.', 'Document age of system and any recent service — buyers want records.', 'Consider smart thermostat upgrade — modern buyers expect it.', 'Address any duct leaks — shows up on home energy audits buyers now request.'] },
];

export default function DFWHVACFinalSummaryAll() {
  const [homeType, setHomeType] = useState('');
  const match = homeownerTypes.find(h => h.id === homeType);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Complete Reference</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>
          🏆 The Final DFW HVAC Summary
        </h1>
        <p style={{ color: '#8FA3BF', fontSize: 16, margin: '0 0 32px', lineHeight: 1.6 }}>
          Everything a DFW homeowner needs to know about HVAC — distilled to 10 facts, 5 actions, and your personalized plan. Built from 3,100+ pages of North Texas HVAC knowledge.
        </p>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#F5E642', marginBottom: 16 }}>📋 The 10 Most Important DFW HVAC Facts</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {topFacts.map(f => (
              <div key={f.num} style={{ background: '#0F2140', borderRadius: 10, padding: 16, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 20, minWidth: 32 }}>{f.num}</div>
                <div style={{ color: '#C8D8E8', fontSize: 14, lineHeight: 1.6 }}>{f.fact}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 20, color: '#F5E642', marginBottom: 16 }}>⚡ The 5 Most Important DFW HVAC Actions</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {topActions.map((a, i) => (
              <div key={i} style={{ background: '#0F2140', border: '1px solid #1E3A5F', borderRadius: 10, padding: 18 }}>
                <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 4, fontSize: 15 }}>{i + 1}. {a.action}</div>
                <div style={{ color: '#F5E642', fontSize: 14 }}>{a.impact}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2140', border: '1px solid #F5E642', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642', marginBottom: 16 }}>🎯 Your Homeowner Type → Your Top 5 Actions</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
            {homeownerTypes.map(h => (
              <button key={h.id} onClick={() => setHomeType(h.id)} style={{ background: homeType === h.id ? '#F5E642′ : '#162840', color: homeType === h.id ? '#0A1628' : '#E8EDF5', border: '1px solid #2A4A6B', borderRadius: 8, padding: '12px 14px', cursor: ’pointer', fontWeight: homeType === h.id ? 700 : 400, fontSize: 14, textAlign: 'left' }}>
                {h.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>Your Top 5 HVAC Actions:</div>
              {match.actions.map((a, i) => (
                <div key={i} style={{ color: '#C8D8E8', fontSize: 14, lineHeight: 1.7, marginBottom: 8, paddingLeft: 20, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, color: '#F5E642', fontWeight: 700 }}>{i + 1}.</span>
                  {a}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, borderTop: '3px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🔗 ProLnk: DFW Home Services, Done Right</div>
          <div style={{ color: '#8FA3BF', fontSize: 14, lineHeight: 1.6 }}>ProLnk connects DFW homeowners with vetted, background-checked HVAC pros — no spam, no middlemen, transparent pricing. Join the ProLnk homeowner waitlist and get matched when we launch.</div>
        </div>
      </div>
    </div>
  );
}
