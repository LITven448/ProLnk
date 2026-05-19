import { useState } from 'react';

const INSULATION_TYPES = ['Batt (fiberglass rolls)', 'Blown-in (fiberglass or cellulose)', 'Spray foam (closed-cell)'];
const R_VALUES = ['None / unknown', 'R-11 to R-19 (under-insulated)', 'R-19 to R-30 (partial)', 'R-30+ (close to DFW minimum)'];
const AREAS = [
  { label: '< 500 sq ft', sqft: 400 },
  { label: '500-1,000 sq ft', sqft: 750 },
  { label: '1,000-1,500 sq ft', sqft: 1250 },
  { label: '1,500-2,000 sq ft', sqft: 1750 },
  { label: '2,000+ sq ft', sqft: 2200 },
];

function getEstimate(type: string, currentR: string, areaIdx: number) {
  const sqft = AREAS[areaIdx].sqft;
  const isBlown = type.startsWith('Blown');
  const isBatt = type.startsWith('Batt');
  const isNone = currentR.startsWith('None');
  const isLow = currentR.startsWith('R-11');

  const targetR = 38;
  const existingR = isNone ? 0 : isLow ? 15 : currentR.startsWith('R-19') ? 25 : 33;
  const addR = Math.max(0, targetR - existingR);

  const bags = isBlown ? Math.ceil(sqft * addR / 40 / 25) : 0;
  const batts = isBatt ? Math.ceil(sqft / 15) : 0;
  const cost = isBlown ? bags * 25 + 200 : isBatt ? batts * 12 + 80 : sqft * 2.5;
  const hours = isBlown ? 6 : isBatt ? Math.ceil(sqft / 150) : 0;
  const rebateEligible = addR >= 7;
  const rebateAmount = rebateEligible ? Math.min(Math.round(sqft * 0.12), 1500) : 0;
  const annualSavings = Math.round(sqft * 0.08 * (addR / targetR));
  const callPro = type.startsWith('Spray');
  return { bags, batts, cost, hours, rebateEligible, rebateAmount, annualSavings, addR, callPro };
}

export default function DFWDIYInsulationGuide() {
  const [insType, setInsType] = useState('');
  const [currentR, setCurrentR] = useState('');
  const [areaIdx, setAreaIdx] = useState(-1);
  const [showResults, setShowResults] = useState(false);

  const ready = insType && currentR && areaIdx >= 0;
  const est = ready ? getEstimate(insType, currentR, areaIdx) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px 0′ }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 36px', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{'house'}</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 10px' }}>DFW DIY Attic Insulation Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>R-38 minimum for DFW Zone 3, plus Oncor rebates -- the highest-ROI home upgrade you can do yourself.</p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>DFW Attic Reality: 150 F Summers</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>DFW attics regularly hit 140-160 F in July and August. NEVER enter an attic between 10am-6pm May through September without: a full-coverage Tyvek suit, N95 respirator, knee pads, work gloves, and a buddy outside. Schedule attic work for 7-9am before heat builds. Bring a 2-gallon water jug and work in 20-minute maximum bursts.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>DFW Zone 3 Requirements</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['R-Value Target', 'R-38 minimum (DOE recommendation for Zone 3 / North Texas)'],
              ['Existing homes', 'If you have less than R-19, topping up to R-38 cuts cooling bills 20-30%'],
              ['Air sealing first', 'Seal all penetrations (light cans, HVAC boots) before adding insulation -- insulation is not an air barrier'],
              ['Vapor barrier', 'Not needed in DFW attic floors -- hot-humid climate; vapor retarder goes on walls below grade'],
            ].map(([label, desc]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{label}</div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>Batt vs. Blown-In for DFW</h2>
          {[
            ['Blown-in (recommended for DFW)', 'Fills gaps around joists and existing insulation -- DFW homes have irregular joist spacing. Rents a blower from Home Depot for $0 with 10+ bag purchase. More effective for topping up existing.'],
            ['Batt (use for new/bare attics)', 'Easier for complete bare attic -- cut to fit between joists. Harder to achieve consistent coverage on existing attic with limited headroom.'],
            ['Spray foam (never DIY)', 'Two-component chemistry is dangerous -- call a certified insulation contractor. Also: DFW building code requires licensed applicator for closed-cell.'],
          ].map(([type, desc]) => (
            <div key={type} style={{ marginBottom: 12, padding: 14, background: '#0A1628', borderRadius: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{type}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, margin: '0 0 14px' }}>Oncor Rebates for DFW Homeowners</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 12 }}>Oncor Electric (serving most DFW) offers rebates for DIY insulation upgrades through their Home Energy Efficiency Program:</p>
          {[
            ['Rebate amount', 'Up to $0.12 per square foot for adding R-7 or more to existing insulation'],
            ['Cap', '$1,500 per household per year'],
            ['How to claim', 'Submit receipts + pre/post R-value documentation at oncor.com/rebates within 90 days of install'],
            ['Pro tip', 'Take photos of existing insulation depth before starting -- required for rebate documentation'],
          ].map(([label, desc]) => (
            <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 10, padding: '10px 14px', background: '#0A1628', borderRadius: 8 }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 130, fontSize: 14 }}>{label}</span>
              <span style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, margin: '0 0 20px' }}>Material and Savings Estimator</h2>

          <div style={{ marginBottom: 18 }}>
            <div style={{ color: '#cbd5e1', fontWeight: 600, marginBottom: 10 }}>Insulation Type</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {INSULATION_TYPES.map(t => (
                <button key={t} onClick={() => setInsType(t)} style={{ padding: '10px 16px', borderRadius: 8, border: '2px solid', borderColor: insType === t ? '#F5E642′ : '#334155', background: insType === t ? '#F5E64215' : ’transparent', color: insType === t ? '#F5E642′ : '#94a3b8', textAlign: ’left', cursor: 'pointer', fontSize: 14 }}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 18 }}>
            <div style={{ color: '#cbd5e1', fontWeight: 600, marginBottom: 10 }}>Current R-Value</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {R_VALUES.map(r => (
                <button key={r} onClick={() => setCurrentR(r)} style={{ padding: '10px 16px', borderRadius: 8, border: '2px solid', borderColor: currentR === r ? '#F5E642′ : '#334155', background: currentR === r ? '#F5E64215' : ’transparent', color: currentR === r ? '#F5E642′ : '#94a3b8', textAlign: ’left', cursor: 'pointer', fontSize: 14 }}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#cbd5e1', fontWeight: 600, marginBottom: 10 }}>Attic Square Footage</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {AREAS.map((a, i) => (
                <button key={a.label} onClick={() => setAreaIdx(i)} style={{ padding: '10px 16px', borderRadius: 8, border: '2px solid', borderColor: areaIdx === i ? '#F5E642′ : '#334155', background: areaIdx === i ? '#F5E64215' : ’transparent', color: areaIdx === i ? '#F5E642′ : '#94a3b8', textAlign: ’left', cursor: 'pointer', fontSize: 14 }}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowResults(true)} disabled={!ready} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', opacity: !ready ? 0.4 : 1 }}>
            Calculate
          </button>

          {showResults && est && (
            <div style={{ marginTop: 24, padding: 20, background: '#0A1628', borderRadius: 12, borderLeft: '4px solid ' + (est.callPro ? '#f87171′ : '#4ade80') }}>
              {est.callPro ? (
                <div style={{ color: '#f87171', fontWeight: 800, fontSize: 18, marginBottom: 12 }}>Spray foam requires a licensed contractor in DFW -- do not DIY</div>
              ) : (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 16 }}>
                    {[
                      ['Material cost', '$' + est.cost],
                      ['Time', est.hours + ' hrs'],
                      ['Annual savings', '$' + est.annualSavings],
                    ].map(([label, val]) => (
                      <div key={label} style={{ background: '#112240', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                        <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 4 }}>{label}</div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: '#F5E642′ }}>{val}</div>
                      </div>
                    ))}
                  </div>
                  {est.bags > 0 && <div style={{ color: '#cbd5e1', marginBottom: 8 }}>Blown-in bags needed: <span style={{ color: '#F5E642', fontWeight: 700 }}>{est.bags} bags</span></div>}
                  {est.rebateEligible && (
                    <div style={{ padding: 14, background: '#112240', borderRadius: 8, borderLeft: '3px solid #4ade80′ }}>
                      <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: 4 }}>Oncor Rebate Eligible!</div>
                      <div style={{ color: '#cbd5e1', fontSize: 14 }}>Estimated rebate: <strong style={{ color: '#F5E642′ }}>${est.rebateAmount}</strong> -- submit receipts at oncor.com/rebates within 90 days</div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
