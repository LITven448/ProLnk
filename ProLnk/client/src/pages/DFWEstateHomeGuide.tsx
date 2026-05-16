import { useState } from 'react';

const SITUATIONS = [
  {
    type: 'Sell the Property',
    icon: '💰',
    path: 'Selling an inherited home benefits from stepped-up basis: your cost basis resets to fair market value at date of death — not what the deceased paid. This eliminates most capital gains tax on appreciation.',
    timeline: ['Week 1–2: Obtain death certificate + Letters Testamentary from TX probate court', 'Week 2–4: Get property condition assessment + address critical repairs', 'Month 1–2: List property (as-is or after repairs)', 'Month 2–4: Close sale and distribute proceeds per will or intestacy'],
    costs: 'Probate filing: $400–$800 | Attorney fees: $2,000–$6,000 | Commission: 5–6% of sale price | Repairs: varies'
  },
  {
    type: 'Rent It Out',
    icon: '🏠',
    path: 'Renting inherited property preserves the asset and provides income. You still receive stepped-up basis, so depreciation restarts from current market value. Requires property management or active management.',
    timeline: ['Month 1: Establish estate and transfer title to heir', 'Month 1–2: Property condition assessment + habitability repairs', 'Month 2: Set up landlord insurance + screen tenants', 'Month 2–3: Execute lease and begin collecting rent'],
    costs: 'Title transfer: $500–$1,500 | Habitability repairs: $1,000–$10,000+ | Property mgmt: 8–12% of monthly rent | Insurance: $1,200–$2,400/yr'
  },
  {
    type: 'Move In',
    icon: '🔑',
    path: 'Moving into inherited property is often simplest. You may qualify for homestead exemption (saves $800–$1,500/yr in TX). If there is an existing mortgage, lenders generally allow assumption or payoff at estate close.',
    timeline: ['Week 1–2: Obtain probate court Letters Testamentary', 'Week 2–4: Contact mortgage lender to discuss assumption or payoff', 'Month 1–2: Transfer title, apply for homestead exemption', 'Month 2–3: Move in and file homestead by April 30 deadline'],
    costs: 'Probate: $400–$800 | Title transfer: $500–$1,500 | Homestead application: free | Exemption savings: $800–$1,500/yr'
  },
  {
    type: 'Multiple Heirs',
    icon: '👨‍👩‍👧‍👦',
    path: 'Multiple heirs on one property requires agreement to sell, rent, or buy out co-heirs. Texas partition law allows any co-owner to force a court-ordered sale if heirs cannot agree. Buyout at appraised value is typically cleanest.',
    timeline: ['Month 1: Probate establishes all heir interests', 'Month 1–2: Get property appraisal ($400–$600) for buyout valuation', 'Month 2–3: Negotiate buyout or sale agreement among heirs', 'Month 3–6: Execute agreement and transfer title accordingly'],
    costs: 'Appraisal: $400–$600 | Mediation if disputed: $150–$400/hr | Partition action if forced: $5,000–$20,000 | Attorney: $200–$400/hr'
  }
];

export default function DFWEstateHomeGuide() {
  const [selected, setSelected] = useState<number | null>(null);
  const item = selected !== null ? SITUATIONS[selected] : null;

  return (
    <div style={{ background: '#F7F8FA', minHeight: '100vh', color: '#1A2B3C', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: '#0A1628', padding: '48px 24px 36px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>DFW HOMEOWNER GUIDE</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', margin: '0 0 12px' }}>Inherited Home in DFW</h1>
          <p style={{ fontSize: 15, color: '#9AA5B8', margin: 0 }}>What to do with an inherited property — sell, rent, move in, or navigate multiple heirs.</p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px 0' }}>
        <div style={{ background: '#ECFDF5', border: '2px solid #6EE7B7', borderRadius: 10, padding: 16, marginBottom: 28 }}>
          <strong style={{ color: '#065F46' }}>💡 Stepped-Up Basis:</strong>
          <span style={{ color: '#047857', fontSize: 14 }}> One of the biggest tax advantages in real estate. Your cost basis resets to fair market value at date of death — eliminating most capital gains from prior appreciation. Act before the estate is settled to preserve this benefit.</span>
        </div>

        <p style={{ fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 16 }}>Your situation:</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 32 }}>
          {SITUATIONS.map((s, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#0A1628' : '#FFFFFF', border: `2px solid ${selected === i ? '#F5E642' : '#E5E7EB'}`, borderRadius: 10, padding: '16px', cursor: 'pointer', textAlign: 'left', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: selected === i ? '#F5E642' : '#1A2B3C' }}>{s.type}</div>
            </button>
          ))}
        </div>

        {item && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 14, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0A1628', marginBottom: 12 }}>{item.icon} {item.type}</h2>
            <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.7, marginBottom: 20, background: '#F0F9FF', padding: 16, borderRadius: 8, borderLeft: '3px solid #0A1628' }}>{item.path}</p>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#374151', letterSpacing: 1, marginBottom: 12 }}>RECOMMENDED TIMELINE</h3>
            <ol style={{ paddingLeft: 20, margin: '0 0 20px' }}>
              {item.timeline.map((t, i) => <li key={i} style={{ fontSize: 14, color: '#4B5563', marginBottom: 8, lineHeight: 1.5 }}>{t}</li>)}
            </ol>
            <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#92400E', marginBottom: 4 }}>💰 ESTIMATED COSTS</div>
              <p style={{ fontSize: 13, color: '#78350F', margin: 0 }}>{item.costs}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
