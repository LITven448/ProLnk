import { useState } from 'react';

export default function DFWRoofingContractorPaySchedule2026() {
  const [situation, setSituation] = useState('');
  const [guide, setGuide] = useState('');

  const guides: { [key: string]: string } = {
    insurance: 'Insurance Claim Payment Timeline:\n\nInsurance payments come in two stages for most DFW roof claims:\n\nACV Check (Actual Cash Value): Issued when claim is approved. This covers depreciated value. Use this as your first payment tranche — release at material delivery confirmation.\n\nRecoverable Depreciation Check: Issued after work is completed and verified. This covers the gap between ACV and full replacement cost.\n\nSafe practice: Pay contractor from ACV check for materials only upfront. Release final payment only after:\n- Final inspection by your adjuster or independent inspector\n- Certificate of completion signed\n- All debris removed from property',
    upfront: 'Full Upfront Payment Red Flag:\n\nAny DFW roofing contractor demanding full payment before work begins is a major red flag.\n\nCommon scam: Storm chasers — out-of-state contractors following DFW hail events — collect full payment, begin partial work, then disappear.\n\nProtect yourself:\n1. Never pay more than 30% upfront for materials delivery only\n2. Verify contractor has Texas roofing license and county registration\n3. Check BBB rating and Google reviews with responses to complaints\n4. Confirm contractor has general liability AND workers comp insurance\n5. Get lien waiver upon final payment',
    standard: 'Standard DFW Roofing Payment Schedule:\n\nRecommended 3-Stage Payment Structure:\n\nStage 1 — Material Delivery (30%):\nPay when materials are delivered to your property and you can verify the correct shingles, underlayment, and accessories are on-site.\n\nStage 2 — Roof Completion (40%):\nPay when old roof is torn off and new roof is fully installed including shingles, ridge cap, and flashing. Do a visual walkthrough before releasing.\n\nStage 3 — Final Inspection (30%):\nRelease final payment only after:\n- City permit inspection passed if required\n- All debris removed\n- Gutters cleaned of roofing debris\n- Warranty paperwork in hand',
    dispute: 'Payment Dispute Protection:\n\nIf contractor demands early payment or threatens to stop work:\n\n1. Do not release payment ahead of schedule — this is your leverage\n2. Send written notice via text or email documenting the dispute\n3. Photograph all completed and incomplete work with timestamps\n4. Contact Texas State License Board if contractor is threatening liens unjustly\n5. In DFW: a contractor cannot place a lien until work is substantially complete and payment is 30 or more days overdue\n6. Consider a joint check agreement through your insurance company for larger claims',
  };

  function getGuide() {
    if (!situation) { setGuide('Select your payment situation to get guidance.'); return; }
    setGuide(guides[situation] || '');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>💰 DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>DFW Roofing Contractor Payment Schedule Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>After DFW hail events, roofing scams spike dramatically. Knowing the correct payment schedule protects you from contractors who take deposits and disappear — or do substandard work knowing full payment is already received.</p>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🚩 Red Flags to Reject Immediately</h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['🔴', 'Full payment upfront requested before any work begins'],
              ['🔴', 'Cash-only payment demanded with no paper trail'],
              ['🔴', 'No written contract with itemized scope of work'],
              ['🔴', 'Contractor knocks door the day after a hail storm with a deal'],
              ['🔴', 'No Texas license number or proof of insurance provided'],
              ['🟡', 'Pressure to sign insurance Assignment of Benefits — research carefully'],
            ].map(([flag, text]) => (
              <div key={text} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', background: '#1a3058', borderRadius: 6, padding: '0.75rem' }}>
                <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{flag}</span>
                <span style={{ color: '#cbd5e1′ }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>✅ Standard 3-Stage Payment Overview</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
            {[
              ['30%', 'Material Delivery', 'When shingles arrive on site'],
              ['40%', 'Roof Completion', 'After full installation and walkthrough'],
              ['30%', 'Final Inspection', 'After inspection, cleanup, and warranty docs'],
            ].map(([pct, stage, desc]) => (
              <div key={stage} style={{ background: '#1a3058', borderRadius: 6, padding: '1rem', textAlign: 'center' as const }}>
                <div style={{ color: '#F5E642', fontSize: '1.5rem', fontWeight: 700 }}>{pct}</div>
                <div style={{ fontWeight: 600, marginBottom: 4, fontSize: '0.9rem' }}>{stage}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Get Your Payment Guidance</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Your Payment Situation</label>
              <select
                value={situation}
                onChange={e => setSituation(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 4, background: '#1a3058', border: '1px solid #2d4a7a', borderRadius: 6, color: '#fff', padding: '0.5rem' }}
              >
                <option value="">Select situation...</option>
                <option value="standard">I want the standard safe payment schedule</option>
                <option value="insurance">I have an insurance claim — how does payment work?</option>
                <option value="upfront">Contractor is demanding full payment upfront</option>
                <option value="dispute">I am in a payment dispute with my contractor</option>
              </select>
            </div>
            <button
              onClick={getGuide}
              style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '0.75rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}
            >
              Get Protection Guide
            </button>
            {guide && (
              <div style={{ background: '#1a3058', borderRadius: 6, padding: '1rem', color: '#cbd5e1', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                {guide}
              </div>
            )}
          </div>
        </div>

        <div style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center' as const }}>
          ProLnk DFW Roofing Resource 2026
        </div>
      </div>
    </div>
  );
}
