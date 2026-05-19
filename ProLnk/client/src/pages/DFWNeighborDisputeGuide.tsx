import { useState } from 'react';

const DISPUTES = [
  {
    type: 'Property Line',
    icon: '📐',
    framework: 'Texas Property Code §21.012 — boundary surveys are legally binding. Get a licensed survey before any confrontation.',
    steps: ['Hire RPLS surveyor ($400–$1,200)', 'Obtain recorded plat from county appraisal district', 'Send certified letter to neighbor with survey findings', 'File encroachment notice if structure crosses line'],
    attorney: 'Involve attorney if neighbor refuses to acknowledge survey or if encroachment value exceeds $5,000.',
    costs: 'Survey: $400–$1,200 | Demand letter: $300–$600 | Litigation: $5,000–$25,000+'
  },
  {
    type: 'Shared Fence',
    icon: '🚧',
    framework: 'Texas law: both property owners own the boundary fence. Costs are typically split 50/50. Neighbor cannot remove without consent.',
    steps: ['Document fence condition with photos', 'Send written proposal for repair/replacement', 'Get 2–3 contractor bids', 'Send formal cost-share demand via certified mail'],
    attorney: 'Involve attorney if neighbor destroys fence or refuses cost-share after 30 days.',
    costs: 'Mediation: $150–$400/hr | Small claims (≤$20K): ~$100 filing | Fence replacement: $1,500–$8,000'
  },
  {
    type: 'Tree Overhang',
    icon: '🌳',
    framework: 'Texas common law: you may trim branches and roots up to your property line at your own expense. Neighbor owes no trimming duty unless tree is dead/diseased.',
    steps: ['Photograph overhang extent', 'Notify neighbor in writing of trimming intent', 'Hire arborist to trim to property line only', 'Retain trimming receipts'],
    attorney: 'Involve attorney if tree falls and causes damage — liability depends on prior notice of hazard.',
    costs: 'Trimming: $200–$1,500 | Hazard tree removal: $1,000–$5,000 | Damage claims: varies'
  },
  {
    type: 'Noise Complaint',
    icon: '🔊',
    framework: 'DFW cities enforce quiet hours (typically 10 PM–7 AM). HOA rules may be stricter. Texas has no statewide noise ordinance — city code controls.',
    steps: ['Document incidents with date/time log', 'Check your city ordinance (Dallas: Sec 31-39, Fort Worth: Sec 23-95)', 'File non-emergency police report or 311 complaint', 'If HOA member, file HOA complaint simultaneously'],
    attorney: 'Involve attorney if noise constitutes private nuisance affecting property value.',
    costs: 'Police report: free | HOA complaint: free | Nuisance lawsuit: $3,000–$15,000'
  }
];

export default function DFWNeighborDisputeGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const dispute = selected !== null ? DISPUTES[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112040 100%)', padding: '48px 24px 36px', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW HOMEOWNER GUIDE</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px' }}>Neighbor Dispute Resolution</h1>
          <p style={{ fontSize: 15, color: '#9AA5B8', margin: 0, lineHeight: 1.6 }}>Texas law frameworks and escalation steps for the four most common DFW neighbor conflicts.</p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px 0′ }}>
        <p style={{ fontSize: 14, color: '#F5E642', fontWeight: 600, marginBottom: 16 }}>Select your dispute type:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 32 }}>
          {DISPUTES.map((d, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#F5E642′ : '#112040', border: `2px solid ${selected === i ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '16px', cursor: ’pointer', textAlign: 'left', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{d.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: selected === i ? '#0A1628′ : '#E8EAF0' }}>{d.type}</div>
            </button>
          ))}
        </div>

        {dispute && (
          <div style={{ background: '#112040', border: '1px solid #1E3A5F', borderRadius: 14, padding: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>{dispute.icon} {dispute.type} — Legal Framework</h2>
            <p style={{ fontSize: 14, color: '#CBD5E0', lineHeight: 1.7, marginBottom: 20, background: '#0A1628', padding: 16, borderRadius: 8, borderLeft: '3px solid #F5E642′ }}>{dispute.framework}</p>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', letterSpacing: 1, marginBottom: 12 }}>ESCALATION STEPS</h3>
            <ol style={{ paddingLeft: 20, margin: '0 0 20px' }}>
              {dispute.steps.map((s, i) => <li key={i} style={{ fontSize: 14, color: '#CBD5E0', marginBottom: 8, lineHeight: 1.5 }}>{s}</li>)}
            </ol>
            <div style={{ background: '#1A2F4E', borderRadius: 8, padding: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>⚖️ WHEN TO INVOLVE AN ATTORNEY</div>
              <p style={{ fontSize: 13, color: '#CBD5E0', margin: 0, lineHeight: 1.5 }}>{dispute.attorney}</p>
            </div>
            <div style={{ background: '#1A2F4E', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#9AA5B8', marginBottom: 6 }}>💰 ESTIMATED COSTS</div>
              <p style={{ fontSize: 13, color: '#CBD5E0', margin: 0 }}>{dispute.costs}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
