import { useState } from 'react';

const denialReasons = [
  {
    id: 'gradual', label: 'Gradual Damage / Wear', icon: '📅',
    strategy: 'Document Sudden Event Evidence',
    steps: ['Gather weather records from NOAA or Weather Underground for the date of damage', 'Get contractor report explicitly stating sudden damage vs. wear', 'Request original policy language on "sudden and accidental" clause', 'File written appeal within 30 days with all new evidence'],
    tdi: true, adjuster: true, attorney: false,
    note: 'Most common DFW roof claim denial. Insurers often claim hail damage is "pre-existing wear." Storm date documentation beats this.'
  },
  {
    id: 'exclusion', label: 'Policy Exclusion Cited', icon: '📋',
    strategy: 'Challenge Exclusion Applicability',
    steps: ['Get the exact exclusion language in writing', 'Compare exclusion to actual cause of loss — must match exactly', 'Research TDI enforcement rulings on that exclusion type', 'Engage public adjuster to re-inspect and document cause'],
    tdi: true, adjuster: true, attorney: true,
    note: 'Exclusions must be specifically applicable. Broad exclusion language is often challenged successfully in Texas.'
  },
  {
    id: 'lapse', label: 'Coverage Lapse / Non-Payment', icon: '💳',
    strategy: 'Verify Policy Status at Time of Loss',
    steps: ['Request cancellation notice — Texas law requires 30-day written notice', 'Check if payment was received before loss date', 'If mortgage exists, lender must be notified of cancellation', 'Contact TDI if proper cancellation procedure was not followed'],
    tdi: true, adjuster: false, attorney: true,
    note: 'Texas Insurance Code §551.052 requires specific cancellation procedures. Many denials on lapse grounds are improper.'
  },
  {
    id: 'underpaid', label: 'Claim Underpaid / Partial Denial', icon: '💰',
    strategy: 'Demand Itemized Scope Reconciliation',
    steps: ['Request full itemized scope of loss from insurer', 'Get independent contractor estimate with line-item breakdown', 'Identify specific line items disputed — challenge each in writing', 'Invoke appraisal clause (most Texas policies have this — forces binding third-party review)'],
    tdi: false, adjuster: true, attorney: false,
    note: 'The appraisal clause is your most powerful tool for underpayment disputes in Texas. Most insurers settle before appraisal completes.'
  },
  {
    id: 'late_notice', label: 'Late Notice of Claim', icon: '⏱️',
    strategy: 'Show Insurer Was Not Prejudiced',
    steps: ['Texas law: late notice only bars claim if insurer was actually prejudiced by delay', 'Document that damage was not immediately visible (interior leaks can take months)', 'Get contractor affidavit on when damage became evident', 'File TDI complaint if denial based solely on timing without showing prejudice'],
    tdi: true, adjuster: false, attorney: true,
    note: 'Texas Insurance Code §862.054 limits late-notice denials. The insurer must prove actual prejudice — rare in physical damage claims.'
  },
];

export default function DFWInsuranceClaimDenied2026() {
  const [selected, setSelected] = useState('gradual');
  const active = denialReasons.find(d => d.id === selected) || denialReasons[0];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>⚖️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Insurance Claim Denied Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>What to do when your DFW homeowner claim is denied — Texas-specific strategies</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🔎 Select Your Denial Reason</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {denialReasons.map(d => (
              <button key={d.id} onClick={() => setSelected(d.id)}
                style={{ padding: '0.5rem 1rem', borderRadius: 8, cursor: 'pointer', fontWeight: 600,
                  background: selected === d.id ? '#F5E642' : '#1e3a5f',
                  color: selected === d.id ? '#0A1628' : '#fff', border: 'none', fontSize: '0.85rem' }}>
                {d.icon} {d.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#1a3a6e', borderRadius: 10, padding: '1.2rem', borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.05rem', marginBottom: 8 }}>🎯 Strategy: {active.strategy}</div>
            <ol style={{ margin: '0 0 0.8rem', paddingLeft: '1.2rem', color: '#cbd5e1' }}>
              {active.steps.map(s => <li key={s} style={{ marginBottom: 6, fontSize: '0.9rem' }}>{s}</li>)}
            </ol>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: 8 }}>
              {active.tdi && <span style={{ background: '#1e3a5f', padding: '0.25rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', color: '#F5E642' }}>📞 File TDI Complaint</span>}
              {active.adjuster && <span style={{ background: '#1e3a5f', padding: '0.25rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', color: '#F5E642' }}>🔍 Hire Public Adjuster</span>}
              {active.attorney && <span style={{ background: '#1e3a5f', padding: '0.25rem 0.6rem', borderRadius: 6, fontSize: '0.8rem', color: '#F5E642' }}>⚖️ DTPA Attorney</span>}
            </div>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem', fontStyle: 'italic' }}>💡 {active.note}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '📞', title: 'Texas Department of Insurance (TDI)', text: 'File at tdi.texas.gov. TDI investigates bad faith denials at no cost. Most insurers respond quickly to TDI complaints — often resolving before formal investigation.' },
            { icon: '📅', title: '30-Day Appeal Window', text: 'Texas law gives you 30 days to formally appeal a denial. Document everything in writing. Verbal conversations do not count — email or certified mail only.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', display: 'flex', gap: '1rem' }}>
              <div style={{ fontSize: '1.8rem' }}>{c.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{c.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '1.5rem', background: '#0f2040', borderRadius: 12 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 Get a DFW Contractor Re-Inspection</div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>ProLnk connects you with DFW contractors who document damage for insurance appeals — properly this time</p>
        </div>
      </div>
    </div>
  );
}