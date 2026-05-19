import { useState } from 'react';

const buyerTypes = [
  { label: 'First-time buyer, needs financing', strategy: 'Keep financing contingency (Third Party Financing Addendum). Use full 7-day option period for inspection. Skip appraisal contingency — not standard in TX TREC. Avoid home sale contingency — sellers in DFW reject it.' },
  { label: 'Move-up buyer (own home to sell)', strategy: 'Do NOT include home sale contingency if avoidable — use bridge loan or HELOC to buy first, sell second. If required, expect seller rejection or counter. Consider Power Buyer programs to convert to cash offer.' },
  { label: 'Repeat buyer, strong financial position', strategy: 'Shorten option period to 3–5 days (pre-inspect). Waive financing contingency if pre-underwritten. Keep earnest money at 2–3%. No home sale contingency needed. Strongest non-cash offer profile.' },
  { label: 'Investor / cash buyer', strategy: 'Waive all contingencies — financing, option, appraisal. 15-day close. 2% earnest money. No option fee needed if no option period. Inspect before making offer when possible.' },
];

export default function DFWContingencyGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
          📋 DFW Contingency Guide 2026
        </div>
        <p style={{ color: '#aac', marginBottom: '2rem', fontSize: '1.05rem' }}>
          Texas offer contingencies work differently than other states — here is what you need to know in DFW.
        </p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🗂️ Texas Contingency Landscape</div>
          {[
            ['Inspection Contingency', 'Replaced by Option Period — buyer can terminate for any reason'],
            ['Financing Contingency', 'Standard — Third Party Financing Addendum in TREC'],
            ['Appraisal Contingency', 'NOT standard in TX — must be added separately and is rare in DFW'],
            ['Home Sale Contingency', 'Addendum B — sellers rarely accept in competitive DFW market'],
            ['Title Contingency', 'Built into TREC — title must come back clear to close'],
          ].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #1e3054' }}>
              <span style={{ color: '#aac', fontSize: '0.93rem' }}>{label}</span>
              <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.93rem', textAlign: 'right', maxWidth: '55%' }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🎯 Your Situation — Contingency Strategy</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {buyerTypes.map((b, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642' : '#0A1628', color: selected === i ? '#0A1628' : '#fff', border: '1.5px solid #F5E642', borderRadius: 8, padding: '0.85rem 1rem', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '0.95rem' }}>
                {b.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>📌 Recommended Contingency Strategy</div>
              <div style={{ color: '#dde', lineHeight: 1.65, fontSize: '0.97rem' }}>{buyerTypes[selected].strategy}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>⚠️ DFW Contingency Red Flags</div>
          {['Home sale contingency is the #1 offer killer in DFW — avoid unless absolutely necessary.',
            'Appraisal contingency signals weak position — offset with appraisal gap coverage instead.',
            'Long option periods (10+ days) signal inspection anxiety — lowers seller confidence.',
            'Financing contingency with small earnest money says buyer is not serious — go 1.5%+ min.'].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.65rem', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>🚩</span>
              <span style={{ color: '#ccd', fontSize: '0.93rem' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}