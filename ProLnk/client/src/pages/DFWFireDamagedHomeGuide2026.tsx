import { useState } from 'react';

const damageTypes = [
  { id: 'minor', label: 'Minor fire — contained room, smoke only' },
  { id: 'moderate', label: 'Moderate — partial structure affected' },
  { id: 'major', label: 'Major — roof/walls/systems damaged' },
  { id: 'total', label: 'Total loss or near-total' },
];

const guides: Record<string, { steps: string[]; tip: string; verdict: string }> = {
  minor: {
    verdict: '🟢 Strong Buy Opportunity',
    steps: [
      '🔍 Hire certified industrial hygienist — smoke/soot penetrates HVAC, insulation',
      '📋 Pull insurance claim history via CLUE report before offer',
      '🏗️ Structural engineer inspection: $400-600 in DFW, worth every dollar',
      '💰 Discount 10-20% from comps — use as negotiation baseline',
      '🔧 ProLnk sources remediation + reconstruction contractors fast post-close',
    ],
    tip: 'Smoke damage to HVAC ducts is the #1 hidden cost — always scope duct replacement.',
  },
  moderate: {
    verdict: '🟡 Proceed with Full Diligence',
    steps: [
      '🏗️ Structural engineer required — partial burns compromise load-bearing elements',
      '📋 Verify permits for original construction — unpermitted work creates problems',
      '🔍 Mold inspection mandatory if firefighting water was used',
      '💰 Get 3 contractor bids for full remediation scope before finalizing offer',
      '🔧 ProLnk coordinates multi-trade renovation: demo, framing, MEP, finishes',
    ],
    tip: 'Moderate fire homes in DFW sell 25-40% below ARV — significant upside if scoped correctly.',
  },
  major: {
    verdict: '🔴 Investor/Builder Play Only',
    steps: [
      '📋 Confirm insurability — some carriers won’t write policies on fire-history homes',
      '🏗️ Full structural demolition assessment required before any offer',
      '💰 Finance with hard money or cash only — conventional lenders decline fire damage',
      '🔍 Environmental test: burned materials may contain asbestos (pre-1980 DFW homes)',
      '🔧 ProLnk connects to licensed DFW general contractors for full gut-rebuild',
    ],
    tip: 'DFW gut-rebuilds run $80-120/sq ft in 2026; budget 20% contingency minimum.',
  },
  total: {
    verdict: '⛔ Land Value Play Only',
    steps: [
      '📋 Value land only — DFW residential lots range from $40K-$200K+ depending on submarket',
      '🏗️ Demolition cost: $8-15K typical in DFW; factor into offer',
      '💰 New construction finance: acquisition + construction loan or private money',
      '🔍 Verify deed restrictions, HOA rules before assuming rebuild is possible',
      '🔧 ProLnk for land clearing, site prep, and new construction coordination',
    ],
    tip: 'Total loss lots in strong DFW submarkets (Southlake, Frisco, Highland Park) still command premium prices.',
  },
};

export default function DFWFireDamagedHomeGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🔥</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 8 }}>DFW Fire Damaged Home Buying Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          Buying a fire-damaged DFW home — opportunity vs. risk, inspection requirements, and rebuild vs. gut renovation decisions.
        </p>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📌 DFW Fire Home Market Facts</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 1.9, paddingLeft: 20 }}>
            <li>Fire-damaged homes sell 20-50% below market — depends on severity</li>
            <li>Structural engineer inspection: required for any conventional financing</li>
            <li>CLUE report: reveals full insurance claim history — get it before offering</li>
            <li>TX seller disclosure: fire damage must be disclosed (TREC rules)</li>
          </ul>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🏠 Select Damage Level</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {damageTypes.map(d => (
            <button key={d.id} onClick={() => setSelected(d.id)} style={{
              background: selected === d.id ? '#F5E642′ : '#1e3a5f',
              color: selected === d.id ? '#0A1628′ : '#fff',
              border: 'none', borderRadius: 10, padding: '14px 16px',
              cursor: 'pointer', fontWeight: 600, fontSize: 14, textAlign: 'left'
            }}>{d.label}</button>
          ))}
        </div>

        {selected && guides[selected] && (
          <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>{guides[selected].verdict}</div>
            <h3 style={{ color: '#F5E642', marginBottom: 12 }}>📋 Due Diligence Steps</h3>
            <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: 20 }}>
              {guides[selected].steps.map((step, i) => <li key={i}>{step}</li>)}
            </ul>
            <div style={{ marginTop: 20, background: '#162944', borderRadius: 8, padding: 14 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>💡 DFW Tip: </span>
              <span style={{ color: '#94a3b8′ }}>{guides[selected].tip}</span>
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, marginBottom: 8 }}>Need fire remediation or rebuild contractors in DFW?</p>
          <p style={{ color: '#1e3a5f', fontSize: 14 }}>ProLnk connects you with vetted DFW specialists — multi-trade coordination included.</p>
        </div>
      </div>
    </div>
  );
}
