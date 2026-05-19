import { useState } from 'react';

const approaches = [
  { id: 'doorknock', label: '🚪 Door-to-Door After Storm', risk: 10, verdict: 'EXTREME RISK', desc: 'Legitimate contractors do not canvas neighborhoods door-to-door after storms. This is the primary recruitment method for storm-chasing fraud rings that collect insurance money, do poor work, then disappear.', flags: ['No established local business address', 'Cannot provide references in your specific neighborhood', 'Pressure to sign immediately before they "run out of materials"'] },
  { id: 'outofstate', label: '🚗 Out-of-State License Plates', risk: 9, verdict: 'VERY HIGH RISK', desc: 'Out-of-state vehicles (especially from Louisiana, Florida, Oklahoma) flood DFW after major hail or wind events. They have no accountability, no local relationships, and often no Texas contractor license.', flags: ['No Texas contractor license number', 'Cannot provide local proof of insurance', 'Cannot be found in Texas Secretary of State business search'] },
  { id: 'cashonly', label: '💵 Cash Only / No Contract', risk: 10, verdict: 'EXTREME RISK', desc: 'Cash-only contractors are the highest-risk category. Cash leaves no paper trail for disputes. Blank contracts mean they can fill in any amount later. This combination is the hallmark of fraudulent operations.', flags: ['Refuses check, card, or any traceable payment', 'Presents blank or incomplete contract for signature', 'Cannot provide written itemized estimate'] },
  { id: 'upfront', label: '💰 Full Payment Upfront', risk: 8, verdict: 'HIGH RISK', desc: 'Reputable contractors typically require 10-30% deposit with the remainder due upon completion. Demanding full payment upfront removes all financial incentive to complete quality work — or return at all.', flags: ['Requests 100% payment before any work begins', 'Offers large discount for paying in full today', 'Cannot provide a completion timeline or milestones'] },
  { id: 'nolicense', label: '📵 No License Number', risk: 9, verdict: 'VERY HIGH RISK', desc: 'Texas requires roofing contractors to be licensed in many municipalities. Any contractor who cannot or will not provide their license number is either unlicensed or hiding a revoked license — both are serious red flags.', flags: ['Deflects when asked for license number', 'Cannot be found in Texas Department of Licensing and Regulation lookup', 'No insurance certificate available upon request'] },
  { id: 'pressure', label: '⏱️ High-Pressure Tactics', risk: 7, verdict: 'HIGH RISK', desc: 'Pressure tactics — "deal expires today," "I have one slot left," "other neighbors already signed" — are designed to prevent you from doing due diligence. Legitimate pros welcome comparison shopping.', flags: ['Artificial urgency around signing', 'Refuses to provide written quote for you to review', 'Discourages getting a second opinion'] },
];

export default function DFWRiskyContractorSigns2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = approaches.find(a => a.id === selected);
  const riskColor = (r: number) => r >= 9 ? '#ef4444′ : r >= 7 ? '#f97316' : '#eab308';

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '0.4rem 1rem', display: 'inline-block', fontWeight: 700, fontSize: '0.8rem', marginBottom: '1rem' }}>DFW CONTRACTOR GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>🚨 DFW High-Risk Contractor Warning Signs</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>After every major DFW storm, fraudulent contractors flood the market. These 10 warning signs have cost DFW homeowners millions. ProLnk eliminates every single one by verifying every contractor before they get near your home.</p>

        <div style={{ background: '#1e0a0a', border: '1px solid #ef4444', borderRadius: 12, padding: '1.2rem', marginBottom: '2rem' }}>
          <p style={{ margin: 0, color: '#fca5a5', lineHeight: 1.6 }}>⚠️ <strong>DFW Storm Season Warning:</strong> After a major hail or wind event, unqualified contractors can appear within hours. Never feel pressured to decide on-the-spot. A legitimate contractor will still be in business tomorrow.</p>
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>Select a contractor approach to see the risk score:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {approaches.map(a => (
            <button key={a.id} onClick={() => setSelected(selected === a.id ? null : a.id)} style={{ background: selected === a.id ? '#F5E642′ : '#112240', color: selected === a.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 10, padding: '0.9rem', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '0.87rem', transition: 'all 0.2s' }}>{a.label}</button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#112240', border: `1px solid ${riskColor(active.risk)}`, borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ color: riskColor(active.risk), margin: 0 }}>{active.label}</h3>
              <span style={{ background: riskColor(active.risk), color: '#fff', borderRadius: 20, padding: '0.2rem 0.8rem', fontWeight: 800, fontSize: '0.85rem' }}>{active.verdict} — {active.risk}/10</span>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: '1rem' }}>{active.desc}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🚩 Specific Red Flags:</div>
              {active.flags.map((f, i) => (
                <div key={i} style={{ color: '#94a3b8', marginBottom: '0.4rem', paddingLeft: '1rem' }}>• {f}</div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', borderLeft: '4px solid #F5E642′ }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>✅ How ProLnk Eliminates Every Red Flag</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '0.75rem' }}>Every contractor in the ProLnk network is verified before they receive a single lead: Texas license confirmed, insurance on file, local business address required, and background checked. No exceptions.</p>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>No door-to-door. No out-of-state plates. No cash-only. No pressure. Just licensed professionals competing for your business on merit.</p>
        </div>
      </div>
    </div>
  );
}