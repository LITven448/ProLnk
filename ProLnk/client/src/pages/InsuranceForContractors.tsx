import { useState } from 'react';

const TRADES = [
  'Electrician',
  'Plumber',
  'HVAC Technician',
  'Roofer',
  'General Contractor',
  'Handyman',
  'Painter',
  'Landscaper',
];

const PROVIDERS = [
  { name: 'Next Insurance', url: 'https://www.nextinsurance.com', note: 'Instant online quotes, contractor-focused' },
  { name: 'Hiscox', url: 'https://www.hiscox.com', note: 'Strong GL + tools coverage, trusted brand' },
  { name: 'Progressive Commercial', url: 'https://www.progressivecommercial.com', note: 'Best for commercial auto + fleet' },
];

const COST_RANGES: Record<string, { gl: string; auto: string; tools: string; wc?: string }> = {
  Electrician: { gl: '$80–$150/mo', auto: '$120–$200/mo', tools: '$30–$60/mo', wc: '$200–$400/mo' },
  Plumber: { gl: '$90–$160/mo', auto: '$120–$200/mo', tools: '$30–$60/mo', wc: '$180–$350/mo' },
  'HVAC Technician': { gl: '$85–$155/mo', auto: '$130–$220/mo', tools: '$35–$65/mo', wc: '$190–$370/mo' },
  Roofer: { gl: '$200–$400/mo', auto: '$130–$220/mo', tools: '$40–$80/mo', wc: '$350–$700/mo' },
  'General Contractor': { gl: '$150–$300/mo', auto: '$120–$200/mo', tools: '$50–$100/mo', wc: '$250–$500/mo' },
  Handyman: { gl: '$50–$100/mo', auto: '$100–$170/mo', tools: '$20–$40/mo' },
  Painter: { gl: '$60–$110/mo', auto: '$100–$170/mo', tools: '$20–$40/mo', wc: '$150–$280/mo' },
  Landscaper: { gl: '$55–$105/mo', auto: '$110–$180/mo', tools: '$25–$50/mo', wc: '$140–$260/mo' },
};

export default function InsuranceForContractors() {
  const [trade, setTrade] = useState('');
  const [hasEmployees, setHasEmployees] = useState(false);
  const [state, setState] = useState('');

  const costs = trade ? COST_RANGES[trade] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: 'system-ui, sans-serif', color: '#111827′ }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
            🛡️ Partner Requirements
          </span>
        </div>
        <h1 style={{ fontSize: 40, fontWeight: 800, margin: '12px 0 8px', lineHeight: 1.2 }}>
          Contractor Insurance Guide<br />for ProLnk Partners
        </h1>
        <p style={{ fontSize: 18, color: '#6b7280', marginBottom: 40 }}>
          To qualify as a ProLnk partner, every pro must carry the right insurance. Here's exactly what you need, what it costs, and where to get it.
        </p>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🔍 Get Your Coverage Estimate</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Your Trade</label>
              <select
                value={trade}
                onChange={e => setTrade(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 15 }}
              >
                <option value="">Select trade...</option>
                {TRADES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>State</label>
              <input
                value={state}
                onChange={e => setState(e.target.value)}
                placeholder="e.g. TX"
                maxLength={2}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>Employees?</label>
              <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <input type="radio" checked={hasEmployees} onChange={() => setHasEmployees(true)} /> Yes
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <input type="radio" checked={!hasEmployees} onChange={() => setHasEmployees(false)} /> No (solo)
                </label>
              </div>
            </div>
          </div>

          {costs && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: 24 }}>
              <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, color: '#15803d' }}>
                📊 Estimated Monthly Costs for {trade}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
                {[
                  { label: '🏗️ General Liability', value: costs.gl, required: true },
                  { label: '🚗 Commercial Auto', value: costs.auto, required: false },
                  { label: '🔧 Tools & Equipment', value: costs.tools, required: false },
                  ...(hasEmployees && costs.wc ? [{ label: '👷 Workers Comp', value: costs.wc, required: true }] : []),
                ].map(item => (
                  <div key={item.label} style={{ background: '#fff', border: '1px solid #d1fae5', borderRadius: 8, padding: 14 }}>
                    <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#111827′ }}>{item.value}</div>
                    {item.required && (
                      <div style={{ fontSize: 11, color: '#dc2626', fontWeight: 600, marginTop: 4 }}>REQUIRED by ProLnk</div>
                    )}
                  </div>
                ))}
              </div>
              {state && (
                <p style={{ marginTop: 14, fontSize: 13, color: '#6b7280′ }}>
                  Note: Rates in {state.toUpperCase()} may vary. Workers comp rates depend on payroll volume.
                </p>
              )}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '🏗️', title: 'General Liability', sub: '$1M minimum required', detail: 'Covers property damage and bodily injury caused by your work. Non-negotiable for ProLnk partnership. Most trades need $1M per occurrence / $2M aggregate.' },
            { icon: '👷', title: 'Workers Compensation', sub: 'Required if you have employees', detail: 'Covers your employees if injured on the job. Texas is unique — it\’s not legally required, but ProLnk requires it if you have W-2 employees to reduce homeowner liability.' },
            { icon: '🚗', title: 'Commercial Auto', sub: 'Strongly recommended', detail: 'Personal auto policies don\’t cover accidents during jobs. If you drive to work sites, you need commercial coverage. Often bundled cheaply with GL.' },
            { icon: '🔧', title: 'Tools & Equipment', sub: 'Optional but smart', detail: 'Covers theft or damage to your tools and equipment. For trades with $5K+ in tools, this pays for itself after one incident.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 16, margin: '0 0 4px' }}>{card.title}</h3>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0369a1', marginBottom: 10 }}>{card.sub}</div>
              <p style={{ fontSize: 14, color: '#6b7280', margin: 0, lineHeight: 1.6 }}>{card.detail}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🏆 Recommended Providers</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {PROVIDERS.map((p, i) => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: 16, background: '#f9fafb', borderRadius: 10, border: '1px solid #f3f4f6′ }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#0369a1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</div>
                  <div style={{ fontSize: 14, color: '#6b7280', marginTop: 4 }}>{p.note}</div>
                </div>
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  style={{ background: '#0369a1', color: '#fff', padding: '8px 16px', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>
                  Get Quote →
                </a>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, margin: '0 0 8px' }}>⚠️ Why ProLnk Requires Insurance</h3>
          <p style={{ fontSize: 14, color: '#78350f', margin: 0, lineHeight: 1.7 }}>
            We guarantee homeowners that every pro they're matched with is vetted and insured. If a pro isn’t covered and something goes wrong, the homeowner is left exposed. ProLnk’s reputation — and your ability to earn — depends on every partner being properly insured. Proof of insurance is required before your first match is delivered.
          </p>
        </div>
      </div>
    </div>
  );
}
