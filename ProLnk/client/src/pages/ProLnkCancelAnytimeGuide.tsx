import { useState } from 'react';

type Scenario = 'full_cancel' | 'pause' | 'downgrade';

const scenarios: { id: Scenario; label: string; icon: string }[] = [
  { id: 'full_cancel', label: 'Cancel Completely', icon: '🚫' },
  { id: 'pause', label: 'Pause for 60 Days', icon: '⏸️' },
  { id: 'downgrade', label: 'Downgrade Tier', icon: '⬇️' },
];

const outcomes: Record<Scenario, { keep: string[]; lose: string[]; note: string }> = {
  full_cancel: {
    keep: [
      'All past commissions already paid out',
      'Existing override payouts in queue (pay out on schedule)',
      'Your Home Health Vault originations (rights vest permanently)',
      'Your professional reputation and reviews',
    ],
    lose: [
      'Network income stream — stops accruing immediately',
      'Match access — no new leads after cancellation date',
      'Your tier position — if you re-join, you enter at current open tier',
      'Charter pricing forever (if you hold Charter tier, this is gone permanently)',
    ],
    note: '⚠️ Charter pros: cancelling means you can never recover $149/mo pricing. Re-entry starts at current tier ($249–$299/mo). Think twice.',
  },
  pause: {
    keep: [
      'Your tier and pricing locked during pause',
      'Your network — override relationships preserved',
      'Home Health Vault origination rights',
      'Pending override payouts continue on schedule',
    ],
    lose: [
      'Match access during pause period — no new leads',
      'Network income continues for your downline, but your share pauses',
    ],
    note: '✅ Pausing is available once per 12 months for up to 60 days. Tier and pricing are preserved.',
  },
  downgrade: {
    keep: [
      'All earned commissions and past payouts',
      'Home Vault origination rights from homes you already added',
      'Network relationships (your downline stays connected)',
    ],
    lose: [
      'Charter tier pricing (if you hold it) — cannot be recovered',
      'Higher commission rates from your old tier',
      'Higher network override percentages',
      'Match priority drops to new tier level',
    ],
    note: '🔒 Charter tier cannot be re-achieved once abandoned. Downgrade is permanent for tier status.',
  },
};

export default function ProLnkCancelAnytimeGuide() {
  const [selected, setSelected] = useState<Scenario>('full_cancel');
  const outcome = outcomes[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 3, marginBottom: 8 }}>CANCEL ANYTIME</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, margin: 0 }}>No Lock-In. No Trap. Transparent Exit.</h1>
          <p style={{ color: '#8899aa', marginTop: 8 }}>ProLnk has no contracts. Cancel with 30 days notice. Here is exactly what happens.</p>
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>📋 Standard Terms</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[
              { label: 'Notice required', value: '30 days written notice' },
              { label: 'Contract term', value: 'Month-to-month — no annual lock' },
              { label: 'Refund policy', value: 'Pro-rated refund on unused days' },
              { label: 'Data retention', value: '90 days after cancellation' },
            ].map((item, i) => (
              <div key={i} style={{ padding: 14, background: '#0A1628', borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: '#aaa', marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontWeight: 600 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {scenarios.map(s => (
            <button key={s.id} onClick={() => setSelected(s.id)} style={{
              flex: 1, background: selected === s.id ? '#F5E642′ : '#0d1f3c',
              color: selected === s.id ? '#0A1628′ : '#fff',
              border: `1px solid ${selected === s.id ? '#F5E642' : '#1e3a5f'}`,
              borderRadius: 10, padding: '14px 8px', cursor: 'pointer', fontWeight: selected === s.id ? 700 : 400, fontSize: 13,
            }}>{s.icon}<br />{s.label}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
          <div style={{ background: '#0f2d0f', border: '1px solid #22c55e', borderRadius: 12, padding: 20 }}>
            <h3 style={{ color: '#22c55e', marginTop: 0 }}>✅ What You KEEP</h3>
            {outcome.keep.map((item, i) => (
              <div key={i} style={{ padding: '6px 0', color: '#ccc', fontSize: 13, borderBottom: '1px solid #1a3a1a' }}>{item}</div>
            ))}
          </div>
          <div style={{ background: '#2d0f0f', border: '1px solid #f44336', borderRadius: 12, padding: 20 }}>
            <h3 style={{ color: '#f44336', marginTop: 0 }}>❌ What You LOSE</h3>
            {outcome.lose.map((item, i) => (
              <div key={i} style={{ padding: '6px 0', color: '#ccc', fontSize: 13, borderBottom: '1px solid #3a1a1a' }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1a2f0a', border: '1px solid #F5E642', borderRadius: 12, padding: 20, fontSize: 14, color: '#F5E642′ }}>
          {outcome.note}
        </div>
      </div>
    </div>
  );
}
