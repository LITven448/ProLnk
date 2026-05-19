import { useState } from 'react';

const whatIsIncluded = [
  { icon: '🔧', item: '2 Tune-Up Visits Per Year', detail: 'Spring (pre-summer) and fall (pre-heating). Includes filter check, coil cleaning, refrigerant level check.' },
  { icon: '🚨', item: 'Priority Emergency Scheduling', detail: 'Jump the queue when your AC fails at 105°F. Standard customers wait 3-5 days; contract customers get same-day or next-day.' },
  { icon: '💸', item: 'Diagnostic Fee Discount', detail: 'Typical $95-150 diagnostic waived or reduced to $25-50 for contract holders.' },
  { icon: '🔩', item: 'Parts Discount 10-15%', detail: 'If you need a capacitor, contactor, or motor — parts are discounted as a contract benefit.' },
  { icon: '🗓️', item: 'Scheduled Reminder Service', detail: 'Contractor handles scheduling — you do not have to remember to call every spring and fall.' },
];

const roiMatrix: Record<string, { verdict: string; reason: string; color: string }> = {
  'under-5-not-covered': { verdict: 'Likely NOT Worth It', reason: 'New system under 5 years with manufacturer warranty. Your warranty covers most failures. Basic tune-up ($80-120 one-time) is more economical.', color: '#ef4444′ },
  'under-5-covered': { verdict: 'Borderline', reason: 'New system but no extended warranty. Worth it mainly for priority scheduling benefit and tune-up convenience. Breakeven in year 2.', color: '#f97316′ },
  '5-10-not-covered': { verdict: 'Good Value', reason: 'Mid-age system entering higher failure probability zone. Service contract breakeven in ~1.3 years. Recommend going with contract.', color: '#eab308′ },
  '5-10-covered': { verdict: 'Strong Value', reason: 'Manufacturer warranty may expire soon. Layer contract on top before warranty ends for seamless coverage transition.', color: '#22c55e' },
  '10-plus-not-covered': { verdict: 'Excellent Value', reason: '10+ year systems have 4x higher failure rates. Emergency call saves pay for the contract in a single incident. Strong recommend.', color: '#22c55e' },
  '10-plus-covered': { verdict: 'Maximum Value', reason: 'Old system + no warranty = highest risk period. Service contract + priority access is essential. Do not skip this.', color: '#22c55e' },
};

export default function DFWHVACServiceAgreement2026() {
  const [age, setAge] = useState('');
  const [warranty, setWarranty] = useState('');

  const matrixKey = age && warranty ? `${age}-${warranty}` : '';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>📋</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            DFW HVAC Service Agreement Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Are HVAC maintenance contracts worth it in North Texas?</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 8 }}>💰 Typical DFW Pricing (2026)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[
              { label: 'Basic Plan', price: '$149/yr', items: '2 visits, filter check' },
              { label: 'Standard Plan', price: '$199/yr', items: '2 visits + priority + 10% parts' },
              { label: 'Premium Plan', price: '$249/yr', items: 'Everything + no diagnostic fee' },
            ].map(({ label, price, items }) => (
              <div key={label} style={{ background: '#0d1f35', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{price}</div>
                <div style={{ fontSize: 12, color: '#94a3b8′ }}>{items}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📦 What's Typically Included</h2>
          {whatIsIncluded.map(({ icon, item, detail }) => (
            <div key={item} style={{ display: 'flex', gap: 16, padding: 14, marginBottom: 8, background: '#0d1f35', borderRadius: 10 }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: 4 }}>{item}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🧮 Is It Worth It For You?</h2>
          <div style={{ marginBottom: 16 }}>
            <p style={{ color: '#94a3b8', marginBottom: 8, fontSize: 14 }}>System Age:</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['under-5', 'Under 5 years'], ['5-10', '5–10 years'], ['10-plus', '10+ years']].map(([k, l]) => (
                <button key={k} onClick={() => setAge(k)} style={{ flex: 1, padding: '10px 0', background: age === k ? '#F5E642′ : '#0d1f35', color: age === k ? '#0A1628' : '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 8, cursor: ’pointer', fontWeight: 600, fontSize: 14 }}>{l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <p style={{ color: '#94a3b8', marginBottom: 8, fontSize: 14 }}>Active Manufacturer Warranty?</p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['covered', 'Yes — Under Warranty'], ['not-covered', 'No / Expired']].map(([k, l]) => (
                <button key={k} onClick={() => setWarranty(k)} style={{ flex: 1, padding: '10px 0', background: warranty === k ? '#F5E642′ : '#0d1f35', color: warranty === k ? '#0A1628' : '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 8, cursor: ’pointer', fontWeight: 600, fontSize: 14 }}>{l}</button>
              ))}
            </div>
          </div>
          {matrixKey && roiMatrix[matrixKey] && (
            <div style={{ background: '#0d1f35', borderRadius: 10, padding: 20, borderLeft: `4px solid ${roiMatrix[matrixKey].color}` }}>
              <div style={{ fontWeight: 700, fontSize: 20, color: roiMatrix[matrixKey].color, marginBottom: 8 }}>{roiMatrix[matrixKey].verdict}</div>
              <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{roiMatrix[matrixKey].reason}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔗</div>
          <h3 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>ProLnk Charter Pros — Better Than Any Contract</h3>
          <p style={{ color: '#1e3a5f', marginBottom: 4 }}>Charter pros offer priority scheduling, fair pricing, and verified credentials — without locking you into one company.</p>
          <p style={{ color: '#0A1628', fontWeight: 700 }}>prolnk.io → HVAC Service</p>
        </div>
      </div>
    </div>
  );
}