import { useState } from 'react';

const elements = [
  { id: 'dwelling', label: '🏠 Dwelling Coverage', desc: 'DFW construction costs have risen over 25% since 2021. If your dwelling coverage has not kept pace, you may be significantly underinsured. A $350K policy on a home that now costs $450K to rebuild means a $100K gap after a total loss.', checklist: ['Request a replacement cost estimator from your agent', 'Compare to current per-sq-ft construction costs in DFW ($140-200/sq ft for standard)', 'Ask if you have an inflation guard endorsement that auto-adjusts annually'] },
  { id: 'personal', label: '🛋️ Personal Property', desc: 'Many DFW homeowners underestimate personal property value. Electronics, appliances, tools, clothing, and furniture add up quickly. Standard policies cover 50-75% of dwelling value — but only if that matches your actual possessions.', checklist: ['Do a room-by-room inventory (video walkthrough is fastest)', 'Check whether your policy covers replacement cost or actual cash value for contents', 'Note that standard policies cap jewelry, firearms, and electronics — riders needed for high-value items'] },
  { id: 'windhail', label: '⛈️ Wind/Hail Deductible', desc: 'Your all-other-perils deductible (fire, theft, etc.) is often $1,000-2,500. Your wind/hail deductible is separate and usually 1-2% of dwelling value — potentially $4,000-$8,000 on a $400K home. Many homeowners discover this only at claim time.', checklist: ['Find your wind/hail deductible on the declarations page (not the main deductible)', 'Confirm whether it is a percentage or flat dollar amount', 'Compare across 2-3 carriers — deductible structures vary significantly'] },
  { id: 'liability', label: '⚖️ Liability Limits', desc: 'Standard liability of $100K is often inadequate. A slip-and-fall, dog bite, or pool accident in DFW can easily exceed $100K in medical bills and legal fees. The recommendation is $300K minimum — and an umbrella policy above that.', checklist: ['Check your liability limit on the declarations page', 'If under $300K, request a quote to increase — typically $20-40/yr', 'Consider a personal umbrella policy ($1M+ for about $200/yr) if you have significant assets'] },
  { id: 'lossofuse', label: '🏨 Loss-of-Use Coverage', desc: 'If your DFW home becomes uninhabitable after a covered event, loss-of-use pays for temporary housing. With DFW hotel rates averaging $130-180/night, a 3-month repair timeline could mean $12,000-$16,000 in housing costs.', checklist: ['Verify your loss-of-use limit (typically 20-30% of dwelling)', 'Confirm what qualifies as covered temporary housing in your policy', 'Check if there is a time limit (12 months, 24 months) in addition to the dollar cap'] },
];

export default function DFWInsurancePolicyReview2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = elements.find(e => e.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '0.4rem 1rem', display: 'inline-block', fontWeight: 700, fontSize: '0.8rem', marginBottom: '1rem' }}>DFW INSURANCE GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>📋 DFW Annual Policy Review Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>Most DFW homeowners renew their policy without reviewing it. In 2026, with construction costs still elevated and storm risk ever-present, a 30-minute annual review could save you tens of thousands after a claim.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', marginBottom: '0.75rem' }}>📌 When to Review</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            {[['📅 Renewal Time', '30-60 days before expiration'],['🔨 After Renovations', 'Additions raise replacement cost'],['🌩️ After Major Storms', 'Assess coverage gaps revealed']].map(([label, val]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginBottom: '0.2rem' }}>{label}</div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>Select a policy element to review:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {elements.map(e => (
            <button key={e.id} onClick={() => setSelected(selected === e.id ? null : e.id)} style={{ background: selected === e.id ? '#F5E642′ : '#112240', color: selected === e.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 10, padding: '0.9rem', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '0.87rem', transition: 'all 0.2s' }}>{e.label}</button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#112240', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>{active.label}</h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: '1rem' }}>{active.desc}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>✅ Review Checklist:</div>
              {active.checklist.map((item, i) => (
                <div key={i} style={{ color: '#94a3b8', marginBottom: '0.4rem', paddingLeft: '1rem' }}>• {item}</div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>🔧 Need Repairs Before Renewal?</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>A damaged roof or foundation can spike your premium at renewal. ProLnk connects you with vetted DFW contractors to address issues before your insurer re-inspects.</p>
        </div>
      </div>
    </div>
  );
}