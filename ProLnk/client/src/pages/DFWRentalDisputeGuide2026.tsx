import { useState } from 'react';

const disputeGuides = {
  'Landlord kept deposit without explanation': {
    rights: [
      'Texas Property Code 92.103: landlord must return deposit within 30 days of surrender',
      'If no itemized list provided, landlord forfeits right to withhold any amount',
      'You can sue in small claims (Justice of the Peace court) for up to $20,000',
      'Prevailing tenant may recover deposit + $100 penalty + attorneys fees',
    ],
    steps: [
      '1. Send certified letter demanding itemized list and return (creates paper trail)',
      '2. File in Justice of the Peace court (JP Court) — DFW has 8 JP precincts',
      '3. Filing fee: ~$46 in most DFW counties',
      '4. Bring: lease, move-in photos, move-out photos, your certified letter copy',
    ],
  },
  'Landlord charged for normal wear and tear': {
    rights: [
      'TX law explicitly prohibits charging tenants for normal wear and tear',
      'DFW clay soil causes door sticking, settling cracks — this is wear and tear',
      'Carpet fading, small nail holes, minor scuffs = normal wear and tear',
      'Large holes, pet damage, excessive staining = legitimate deductions',
    ],
    steps: [
      '1. Get comparable repair quotes from DFW contractors to compare against landlord charges',
      '2. Send written dispute citing Texas Property Code 92.111',
      '3. Request invoices or receipts for all claimed repairs',
      '4. If overcharged: JP court or mediation through DFW Dispute Resolution Center',
    ],
  },
  'Landlord did not return deposit on time': {
    rights: [
      'TX law: 30-day deadline begins when tenant surrenders possession (keys returned)',
      'Sending written forwarding address triggers the clock — do this in writing',
      'Even one day late without itemized list = landlord loses right to deduct',
      'No forwarding address on record can be used as defense by landlord',
    ],
    steps: [
      '1. Document the exact date you surrendered keys (text, email, or certified mail)',
      '2. Confirm landlord has your forwarding address in writing',
      '3. On day 31, send certified demand letter',
      '4. File in JP Court if no response within 10 business days',
    ],
  },
  'Deposit dispute — appliance damage claimed': {
    rights: [
      'Landlord must prove damage was caused by tenant negligence, not age/normal use',
      'Appliances have useful life — landlord cannot charge full replacement for old appliances',
      'Pro-rated depreciation applies: 10-yr-old dishwasher has minimal remaining value',
      'Request proof of appliance age and pre-move-in condition',
    ],
    steps: [
      '1. Request the age of the appliance and original purchase receipt',
      '2. Research replacement cost for comparable used unit',
      '3. Calculate pro-rated value: remaining useful life / total useful life',
      '4. Dispute excess charges via certified letter citing depreciation calculation',
    ],
  },
};

export default function DFWRentalDisputeGuide2026() {
  const [dispute, setDispute] = useState('');

  const guide = disputeGuides[dispute as keyof typeof disputeGuides];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>⚖️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW Security Deposit Dispute Guide 2026</h1>
          <p style={{ color: '#9AA3B2', fontSize: 15 }}>Texas tenant rights — one of the strongest deposit protection states</p>
        </div>

        <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
            <span>📌</span>
            <span style={{ fontSize: 14, color: '#F5E642', fontWeight: 600 }}>Texas Law Summary: Landlord must return deposit within 30 days + itemized deduction list. Failure = forfeiture of deduction rights.</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <span>🏛️</span>
            <span style={{ fontSize: 14, color: '#E8EAF0′ }}>DFW tenants file disputes in Justice of the Peace Court. Filing fees ~$46. No attorney required for small claims under $20,000.</span>
          </div>
        </div>

        <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 8 }}>Your Dispute Type → Texas Tenant Rights Guide</label>
          <select value={dispute} onChange={e => setDispute(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2A3A50', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
            <option value=''>Select your situation...</option>
            {Object.keys(disputeGuides).map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        {guide && (
          <>
            <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>📜 Your Legal Rights</h2>
              {guide.rights.map(r => (
                <div key={r} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                  <span>✅</span>
                  <span style={{ fontSize: 14, color: '#E8EAF0′ }}>{r}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, marginBottom: 24 }}>
              <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>🗂️ Action Steps</h2>
              {guide.steps.map(s => (
                <div key={s} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <span>➡️</span>
                  <span style={{ fontSize: 14, color: '#E8EAF0′ }}>{s}</span>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ background: '#1A2640', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#9AA3B2', fontSize: 13 }}>DFW tenants and landlords — need repair documentation to support deposit claims?</p>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginTop: 4 }}>ProLnk connects you with vetted DFW pros who provide written estimates and photos.</p>
        </div>
      </div>
    </div>
  );
}