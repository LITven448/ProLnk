import { useState } from 'react';

const wdoItems = [
  { pest: 'Subterranean Termites', detail: 'Most common in DFW — build mud tubes from soil to wood, require ground contact or moisture' },
  { pest: 'Drywood Termites', detail: 'Less common but found in DFW — live entirely in wood, no soil contact needed, harder to detect' },
  { pest: 'Wood-Boring Beetles', detail: 'Old House Borers and Powder Post Beetles attack structural lumber — look for round exit holes in wood' },
  { pest: 'Wood Decay Fungi', detail: 'Not an insect but included in WDO inspection — wet rot and dry rot documented in the report' },
];

const wdoVsGeneral = [
  { type: 'WDO Inspection', required: 'Required for VA and FHA loans', covers: 'Wood-destroying organisms only (termites, beetles, fungi)', report: 'Official NPMA-33 form — lender-accepted', cost: '$75–$150' },
  { type: 'General Pest', required: 'Optional (recommended)', covers: 'All pests including rodents, roaches, ants, mosquitoes', report: 'Inspection report — not lender-accepted', cost: '$100–$200' },
];

const redFlags = [
  'Mud tubes in crawl space, garage, or behind drywall — active subterranean termite travel highways',
  '"No access" notations for areas like attic or crawl space — insist on access or ask why',
  'Prior treatment disclosure without evidence of repair — prior activity doesn\’t mean past activity',
  'Inspector refuses to go into attic, crawl, or under deck — those are primary inspection areas',
  'Report that says "no evidence" without noting areas that were inaccessible — incomplete inspection',
];

const dfwZones = [
  { zone: 'North DFW (Frisco, McKinney, Allen)', risk: 'Moderate subterranean risk — newer construction, less established termite pressure but growing' },
  { zone: 'East DFW (Mesquite, Garland, Rowlett)', risk: 'High — established neighborhoods, older homes, higher soil moisture near lakes' },
  { zone: 'South DFW (Mansfield, Burleson, Midlothian)', risk: 'Moderate-High — clay soil retains moisture, strong subterranean termite habitat' },
  { zone: 'West DFW (Fort Worth, Weatherford, Granbury)', risk: 'High — older housing stock, cedar and oak proximity, established termite corridors' },
];

export default function DFWPestInspectionWalkthrough() {
  const [homeAge, setHomeAge] = useState(20);
  const [zone, setZone] = useState('East DFW (Mesquite, Garland, Rowlett)');
  const [priorInfestation, setPriorInfestation] = useState(false);
  const [isLoanPurchase, setIsLoanPurchase] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const needsWDO = isLoanPurchase || priorInfestation || homeAge >= 15;
  const riskLevel = zone.includes('East') || zone.includes('West') ? 'High' : 'Moderate';
  const urgency = priorInfestation ? '🔴 Prior infestation — WDO inspection before any offer' : riskLevel === 'High' ? '🟡 High-risk zone — inspect before offer or within 30 days of purchase' : '🟢 Standard — inspect at time of purchase or annually';

  const recommendations = [
    needsWDO ? '📋 WDO inspection (NPMA-33 form)' + (isLoanPurchase ? ' — required for your loan type' : '') : null,
    '🔍 General pest inspection in addition to WDO',
    homeAge >= 20 ? '🔦 Insist on full attic and crawl space access' : null,
    priorInfestation ? '🏗️ Request repair evidence documentation from seller' : null,
    riskLevel === 'High' ? '💧 Ask inspector to note all moisture conditions — DFW clay holds water against foundations' : null,
  ].filter(Boolean);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>DFW HOME GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Pest Inspection Walkthrough</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.7 }}>
          DFW is in termite zone 1 — the highest-risk classification in the US. Understanding the difference between inspection types (and what the report actually means) can save you tens of thousands.
        </p>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>🪲 What a DFW WDO Inspection Covers</h2>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {wdoItems.map((item, i) => (
              <div key={i} style={{ background: '#1e293b', borderRadius: 8, padding: '0.9rem 1.1rem', display: 'flex', gap: '1rem' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', minWidth: 160, fontSize: '0.85rem' }}>{item.pest}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>📄 WDO vs General Pest Inspection</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {wdoVsGeneral.map((item, i) => (
              <div key={i} style={{ background: '#1e293b', borderRadius: 10, padding: '1rem 1.25rem' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>{item.type}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Required: <span style={{ color: '#cbd5e1' }}>{item.required}</span></div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Cost: <span style={{ color: '#cbd5e1' }}>{item.cost}</span></div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', gridColumn: '1/-1' }}>Covers: <span style={{ color: '#cbd5e1' }}>{item.covers}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>🧮 Your Inspection Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>Home age (years)</label>
              <input type="number" min={1} max={100} value={homeAge} onChange={e => setHomeAge(+e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: '1rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '0.5rem' }}>DFW location</label>
              <select value={zone} onChange={e => setZone(e.target.value)} style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: '0.85rem' }}>
                {dfwZones.map(z => <option key={z.zone} value={z.zone}>{z.zone}</option>)}
              </select>
            </div>
          </div>
          {[['isLoanPurchase', '🏦 Purchasing with VA or FHA loan'], ['priorInfestation', '🐛 Prior termite treatment disclosed by seller']].map(([key, label]) => (
            <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={key === 'isLoanPurchase' ? isLoanPurchase : priorInfestation} onChange={e => key === 'isLoanPurchase' ? setIsLoanPurchase(e.target.checked) : setPriorInfestation(e.target.checked)} style={{ width: 18, height: 18 }} />
              {label}
            </label>
          ))}
          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', cursor: 'pointer', fontSize: '0.95rem', marginTop: '0.5rem' }}>Get My Inspection Plan →</button>
          {showResult && (
            <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8, borderLeft: '3px solid #F5E642' }}>
              <div style={{ marginBottom: '0.5rem' }}><strong>Risk level:</strong> {riskLevel} — {dfwZones.find(z => z.zone === zone)?.risk}</div>
              <div style={{ marginBottom: '0.5rem' }}><strong>Schedule:</strong> {urgency}</div>
              <div style={{ marginBottom: '0.25rem' }}><strong>Recommend:</strong></div>
              {recommendations.map((r, i) => <div key={i} style={{ color: '#cbd5e1', fontSize: '0.85rem', paddingLeft: '1rem', marginBottom: '0.3rem' }}>→ {r}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: '#ef4444' }}>🚩 Red Flags in a Pest Report</h2>
          {redFlags.map((item, i) => <div key={i} style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '0.6rem', paddingLeft: '1rem', borderLeft: '2px solid #ef4444' }}>{item}</div>)}
        </div>
      </div>
    </div>
  );
}
