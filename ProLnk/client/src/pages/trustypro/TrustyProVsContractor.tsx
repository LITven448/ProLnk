import { useState } from 'react';

const situations = [
  {
    label: 'Before Making an Offer',
    icon: '🏠',
    recommendation: 'TrustyPro First',
    reasoning: 'Get an unbiased AI assessment of the property before you are emotionally or financially committed. A contractor sent by the seller has an incentive to downplay issues. TrustyPro has no stake in the transaction.',
    trustypro: 'Unbiased AI scan reveals foundation, roof, moisture, and electrical indicators in hours.',
    contractor: 'Seller-referred contractors may minimize issues to keep the deal moving.',
    verdict: 'use-trustypro',
  },
  {
    label: 'You Have a Specific Repair',
    icon: '🔧',
    recommendation: 'Contractor Directly',
    reasoning: 'If you already know a pipe is leaking or an outlet is sparking, you need a licensed professional immediately. TrustyPro is for discovery and documentation, not active emergency repair.',
    trustypro: 'Not the right tool for active emergencies or known specific repairs.',
    contractor: 'Call a licensed plumber, electrician, or HVAC tech immediately for active issues.',
    verdict: 'use-contractor',
  },
  {
    label: 'Before Hiring for a Big Project',
    icon: '💰',
    recommendation: 'TrustyPro First',
    reasoning: 'A contractor quoting a $15,000 HVAC replacement has a financial incentive. Your TrustyPro data shows what the AI detected — giving you an independent data point to negotiate from or get second opinions.',
    trustypro: 'Documents current condition so you can spot upsell vs. legitimate need.',
    contractor: 'Get quotes after reviewing TrustyPro findings so you negotiate from data.',
    verdict: 'use-trustypro',
  },
  {
    label: 'After Storm or Flood Damage',
    icon: '🌧️',
    recommendation: 'Both — TrustyPro Then Contractor',
    reasoning: 'Scan immediately after the event to document the pre-repair condition for insurance. Then bring in a licensed contractor. The TrustyPro documentation protects you if the insurer disputes the claim.',
    trustypro: 'Document damage immediately for insurance records before any repairs begin.',
    contractor: 'Needed to actually repair — but scan first to lock in the baseline for your claim.',
    verdict: 'both',
  },
  {
    label: 'Pre-Listing Prep',
    icon: '🏷️',
    recommendation: 'TrustyPro First',
    reasoning: 'Buyers will do their own inspection. TrustyPro lets you find and fix issues on your own timeline before they become negotiating weapons. Verified scan history increases buyer confidence and sale price.',
    trustypro: 'Find issues before buyers do. Document resolved repairs. Command a premium.',
    contractor: 'Hire after TrustyPro flags priorities so you spend repair budget where it counts.',
    verdict: 'use-trustypro',
  },
];

export default function TrustyProVsContractor() {
  const [selected, setSelected] = useState(0);
  const s = situations[selected];
  const verdictColor = s.verdict === 'use-trustypro' ? '#4F46E5′ : s.verdict === ’use-contractor' ? '#22c55e' : '#FACC15';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050d1a', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>⚖️</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px' }}>TrustyPro vs. Calling a Contractor</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            An unbiased AI scan and a contractor serve different purposes. Here is when to use each — and when to use both.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {situations.map((sit, i) => (
            <button key={i} onClick={() => setSelected(i)}
              style={{ padding: '10px 14px', borderRadius: '10px', border: `2px solid ${selected === i ? '#4F46E5' : '#1e2d45'}`, backgroundColor: selected === i ? '#4F46E5′ : '#0d1f35', color: '#fff', cursor: ’pointer', fontSize: '0.85rem', fontWeight: 600 }}>
              {sit.icon} {sit.label}
            </button>
          ))}
        </div>
        <div style={{ backgroundColor: '#0d1f35', borderRadius: '16px', padding: '32px', border: '1px solid #1e2d45', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{s.icon} {s.label}</h2>
            <span style={{ backgroundColor: verdictColor + '22', color: verdictColor, padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700 }}>
              {s.recommendation}
            </span>
          </div>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: '24px' }}>{s.reasoning}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ backgroundColor: '#4F46E522', borderRadius: '12px', padding: '20px', border: '1px solid #4F46E5′ }}>
              <div style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>🔵 TRUSTYPRO</div>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{s.trustypro}</p>
            </div>
            <div style={{ backgroundColor: '#22c55e11', borderRadius: '12px', padding: '20px', border: '1px solid #22c55e' }}>
              <div style={{ color: '#4ade80', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>🟢 CONTRACTOR</div>
              <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{s.contractor}</p>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: '#0d1f35', borderRadius: '12px', padding: '20px', border: '1px solid #1e2d45′ }}>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
            TrustyPro is an AI-powered scan tool, not a licensed inspection service. Use it to inform decisions, not replace licensed professionals for active repairs.
          </p>
        </div>
      </div>
    </div>
  );
}
