import { useState } from 'react';

const elements = [
  { id: 'scope', icon: '📋', label: 'Scope of Work', why: 'Defines exactly what the contractor will and will not do. Vague scope is the #1 cause of disputes in DFW. Every room, every material, every finish should be specified in writing.' },
  { id: 'payment', icon: '💰', label: 'Payment Schedule', why: 'Texas has no statutory cap but industry standard is ≤30% upfront. Tie all payments to measurable milestones — not calendar dates — to keep leverage throughout the project.' },
  { id: 'materials', icon: '🪵', label: 'Materials List', why: 'Specify brand, model, grade, and color for every material. "Builder grade" vs. "premium" is thousands of dollars difference on a DFW kitchen remodel.' },
  { id: 'change', icon: '🔄', label: 'Change Order Process', why: 'All changes to scope, timeline, or cost must be in writing before work starts. Verbal approvals are unenforceable and account for most DFW contractor disputes.' },
  { id: 'completion', icon: '📅', label: 'Completion Date', why: 'Texas courts consider "reasonable time" clauses unenforceable. Require a specific date with liquidated damages or milestone schedule with written extensions only.' },
  { id: 'lien', icon: '🛡️', label: 'Lien Waiver', why: 'Texas has one of the strongest construction lien laws in the nation. Conditional waivers at payment, unconditional at completion. Subcontractors can lien your property even if you paid the GC.' },
  { id: 'warranty', icon: '✅', label: 'Warranty Terms', why: 'Texas implied warranty of good workmanship exists but written warranties are stronger. Specify duration (minimum 1 year for labor, 10 years for structural) and the process for warranty claims.' },
];

export default function DFWContractorContractGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = elements.find(e => e.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📄</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Contractor Contract Guide 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>What every Texas home improvement contract must include — click an element to learn why it matters.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {elements.map(el => (
            <button key={el.id} onClick={() => setSelected(selected === el.id ? null : el.id)}
              style={{ background: selected === el.id ? '#F5E642′ : '#0f2340', border: '2px solid', borderColor: selected === el.id ? '#F5E642' : '#1e3a5f', borderRadius: 12, padding: '16px', cursor: ’pointer', color: selected === el.id ? '#0A1628′ : '#fff', textAlign: ’left', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{el.icon}</span>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{el.label}</span>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0f2340', border: '2px solid #F5E642', borderRadius: 16, padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 32 }}>{active.icon}</span>
              <h2 style={{ margin: 0, color: '#F5E642', fontSize: 20 }}>{active.label}</h2>
            </div>
            <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.7 }}>{active.why}</p>
          </div>
        )}

        <div style={{ background: '#0f2340', border: '1px solid #1e3a5f', borderRadius: 16, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>🔒</span>
            <h3 style={{ margin: 0, color: '#F5E642', fontSize: 16 }}>ProLnk Verified Contracts</h3>
          </div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: 14, lineHeight: 1.6 }}>Every ProLnk contractor uses our standardized DFW contract template reviewed by Texas construction attorneys. All 7 elements above are included by default — your Health Vault stores executed copies permanently.</p>
        </div>
      </div>
    </div>
  );
}
