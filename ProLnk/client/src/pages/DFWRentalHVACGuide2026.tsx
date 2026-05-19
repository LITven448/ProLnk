import { useState } from 'react';

const hvacAgeData = [
  { label: '0–5 yrs', decision: '✅ Repair', color: '#22c55e', detail: 'Unit is under typical 10-yr warranty window. Repair any issues — parts are covered and system has full life remaining.', cost: '$150–600 repair', action: 'Schedule ProLnk HVAC tune-up' },
  { label: '6–10 yrs', decision: '🔧 Repair & Monitor', color: '#eab308', detail: 'Unit approaching mid-life. Repair minor issues but budget for replacement. Consider efficiency upgrades if repair > $1,000.', cost: '$400–1,200 repair', action: 'Get ProLnk inspection + cost estimate' },
  { label: '11–14 yrs', decision: '⚠️ Evaluate Carefully', color: '#f97316', detail: 'Unit near end of typical lifespan. If repair cost > 50% of replacement cost, replace now to avoid mid-lease failure.', cost: '$1,500–3,500 repair or replace', action: 'ProLnk emergency HVAC evaluation' },
  { label: '15+ yrs', decision: '🔴 Replace', color: '#ef4444', detail: 'Beyond expected lifespan. Replacement protects rent premium, avoids habitability violations, and qualifies for efficiency rebates.', cost: '$4,000–8,000 replacement', action: 'ProLnk replacement quote — fast dispatch' },
];

export default function DFWRentalHVACGuide2026() {
  const [selected, setSelected] = useState(0);
  const hd = hvacAgeData[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Rental HVAC Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Texas habitability law, repair vs. replace decisions, and ProLnk emergency HVAC access</p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 24, border: '2px solid #F5E642′ }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 8 }}>⚖️ Texas Property Code — HVAC Habitability Requirement</div>
          <div style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.7 }}>
            Under Texas Property Code §92.052–92.061, landlords must maintain rental properties in a habitable condition. Working HVAC (heating AND cooling) is required. In DFW summers exceeding 100°F, a broken AC qualifies as a habitability violation. Landlords must repair within a <span style={{ color: '#F5E642', fontWeight: 700 }}>reasonable time</span> after written notice — courts typically interpret this as 7–14 days for HVAC in summer.
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>🛠️ HVAC Age → Repair vs. Replace Decision</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {hvacAgeData.map((h, i) => (
              <button key={h.label} onClick={() => setSelected(i)} style={{ background: selected === i ? '#F5E642′ : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 14px', fontSize: 13, cursor: 'pointer', fontWeight: selected === i ? 700 : 400 }}>
                {h.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0a1628', borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: hd.color, marginBottom: 8 }}>{hd.decision}</div>
            <div style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 12, lineHeight: 1.6 }}>{hd.detail}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{hd.cost}</div>
              <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, borderRadius: 8, padding: '6px 14px', fontSize: 13 }}>{hd.action}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 10 }}>💡 DFW HVAC Landlord Tips</h2>
          {['Change filters monthly — landlord responsibility in most TX leases', 'New HVAC supports $100–200/mo rent premium in DFW market', 'Emergency HVAC failure in summer = high legal risk; act same day', 'ProLnk Charter-tier pros prioritize rental property calls'].map(t => (
            <div key={t} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 7 }}>• {t}</div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>Emergency HVAC? ProLnk dispatches fast</div>
          <div style={{ color: '#0A1628', fontSize: 13, marginTop: 4 }}>Licensed DFW HVAC pros — same-day service for rental habitability emergencies.</div>
        </div>
      </div>
    </div>
  );
}