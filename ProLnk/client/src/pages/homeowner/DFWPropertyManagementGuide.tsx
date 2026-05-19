import { useState } from 'react';

export default function DFWPropertyManagementGuide() {
  const [numProperties, setNumProperties] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [calcResult, setCalcResult] = useState<null | { diy: number; managed: number; timeCost: number; recommendation: string }>(null);

  const calculate = () => {
    const props = parseFloat(numProperties);
    const rent = parseFloat(monthlyRent);
    const rate = parseFloat(hourlyRate);
    if (!props || !rent || !rate) return;
    const totalRent = props * rent;
    const managementFee = totalRent * 0.10;
    const placementFee = (rent * 1.0) / 12;
    const managedCost = managementFee + placementFee;
    const hoursPerMonth = props * 3.5;
    const timeCost = hoursPerMonth * rate;
    const diyNet = totalRent - timeCost;
    const managedNet = totalRent - managedCost;
    let recommendation = '';
    if (props <= 3 && timeCost < managedCost * 1.5) {
      recommendation = `With ${props} ${props === 1 ? 'property' : 'properties'}, self-managing is financially reasonable — but only if you enjoy landlord work. At your hourly rate, you're spending $${timeCost.toFixed(0)}/month in time vs. $${managedCost.toFixed(0)}/month for a PM. The difference is $${(timeCost - managedCost).toFixed(0)} — and that's before accounting for stress, middle-of-night calls, and legal liability.`;
    } else if (props >= 4) {
      recommendation = `At ${props} properties, professional management is strongly recommended. The coordination complexity alone justifies the cost. A PM handles tenant screening, maintenance coordination, legal compliance, and accounting. Your $${timeCost.toFixed(0)}/month in time savings is better spent growing to 10+ units.`;
    } else {
      recommendation = `At your scale, you're right at the self-manage/hire threshold. Consider hiring a PM for 3+ months to see what gets taken off your plate — many landlords who try PM never go back to self-managing.`;
    }
    setCalcResult({ diy: diyNet, managed: managedNet, timeCost, recommendation });
  };

  return (
    <div style={{ background: '#0f0a0f', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#a855f7', textTransform: 'uppercase', letterSpacing: 1 }}>DFW Landlord Guide</div>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#f1f5f9', marginBottom: 16, lineHeight: 1.2 }}>
          DFW Property Management Guide — Should You Self-Manage or Hire?
        </h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 48, lineHeight: 1.7 }}>
          Every DFW landlord faces this decision at some point. The answer depends on your time, scale, and tolerance for late-night maintenance calls. This guide gives you the full picture.
        </p>

        {/* The Decision */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 24 }}>⚖️ The Self-Manage vs. Hire Decision</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { metric: 'Tenant Screening Time', value: '5–15 hours per vacancy', note: 'Applications, credit checks, calls, background screening, decision' },
              { metric: 'Maintenance Coordination', value: '2–5 hours/month ongoing', note: 'Fielding requests, scheduling, overseeing, follow-up per property' },
              { metric: 'Legal Compliance', value: 'Constantly changing', note: 'TX landlord-tenant law, fair housing, habitability standards, lease updates' },
              { metric: 'Emergency Calls', value: 'Your phone, any hour', note: 'AC failures in July, burst pipes at 2am — it’s your responsibility' },
              { metric: 'DIY Threshold', value: '1–3 properties', note: 'Most landlords self-manage here. Consider hiring at 4+ properties.' },
            ].map(item => (
              <div key={item.metric} style={{ background: '#1a0f1a', border: '1px solid #2a1a2a', borderRadius: 10, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: 4 }}>{item.metric}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.note}</div>
                </div>
                <div style={{ color: '#a855f7', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', flexShrink: 0 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PM Fees */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 24 }}>💰 Property Management Fees in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {[
              { label: 'Monthly Management', range: '8–12% of collected rent', desc: 'The core ongoing fee. On $2,000/month rent = $160–$240/month.' },
              { label: 'Tenant Placement', range: '50–100% of first month’s rent', desc: 'One-time fee when they find and place a new tenant. On $2,000 rent = $1,000–$2,000.' },
              { label: 'Lease Renewal', range: '$200–$400', desc: 'Charged each time an existing tenant renews. Negotiate this or get it waived.' },
              { label: 'Maintenance Markup', range: '5–15% on repairs', desc: 'Some PMs mark up contractor invoices. Ask upfront — it should be disclosed.' },
            ].map(item => (
              <div key={item.label} style={{ background: '#1a0f1a', border: '1px solid #2a1a2a', borderRadius: 12, padding: 20 }}>
                <div style={{ fontWeight: 700, color: '#f8fafc', marginBottom: 4 }}>{item.label}</div>
                <div style={{ color: '#a855f7', fontWeight: 700, fontSize: 15, marginBottom: 10 }}>{item.range}</div>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What a Good PM Does */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 24 }}>✅ What a Good PM Company Does</h2>
          <div style={{ background: '#1a0f1a', border: '1px solid #2a1a2a', borderRadius: 12, padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {[
                'Market and lease the property',
                'Screen tenants (credit, background, employment)',
                'Collect rent and handle late payments',
                'Coordinate all maintenance requests',
                'Issue year-end 1099s',
                'Provide monthly owner statements',
                'Handle lease renewals and rent increases',
                'Manage move-in/move-out inspections',
                'Represent you in eviction proceedings',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ color: '#4ade80', fontSize: 14, marginTop: 1 }}>✓</span>
                  <span style={{ color: '#cbd5e1', fontSize: 13 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Finding a Good PM */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 24 }}>🔍 How to Find a Good PM in DFW</h2>
          <div style={{ background: '#1a0f1a', border: '1px solid #2a1a2a', borderRadius: 12, padding: 28 }}>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, marginTop: 0 }}>Start with local NARPM (National Association of Residential Property Managers) members — they've committed to a code of ethics and continuing education. Read Google reviews carefully, focusing on landlord reviews (not tenant reviews). Always interview at least 3 companies before deciding. Ask each: What’s your current vacancy rate? How many properties do your managers handle? How do you communicate with owners?</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 20 }}>
              {[
                { label: 'Find', value: 'narpm.org', sub: 'Search DFW members' },
                { label: 'Interview', value: '3 minimum', sub: 'Compare before deciding' },
                { label: 'Check', value: 'Google Reviews', sub: 'Focus on landlord reviews' },
              ].map(item => (
                <div key={item.label} style={{ background: '#0f0a0f', borderRadius: 8, padding: 14, textAlign: 'center' }}>
                  <div style={{ color: '#a855f7', fontWeight: 700, fontSize: 15 }}>{item.value}</div>
                  <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 4 }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TrustyPro CTA */}
        <section style={{ background: 'linear-gradient(135deg, #1a0f2a, #0f0a1a)', border: '1px solid #a855f733', borderRadius: 16, padding: 32, marginBottom: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 24, marginBottom: 12 }}>🏠</div>
          <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: 18, marginBottom: 12 }}>TrustyPro for Property Managers</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, maxWidth: 540, margin: '0 auto 20px' }}>
            Add every unit to TrustyPro vault. Tenant turnover documentation becomes objective. Maintenance history reduces "I didn't do it" disputes. Your property portfolio builds a verified data asset that banks, insurers, and buyers will pay for access to.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#a855f7', color: '#fff', padding: '12px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Add Your Properties to the Vault</a>
        </section>

        {/* Calculator */}
        <section style={{ background: '#1a0f1a', border: '1px solid #2a1a2a', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>🧮 Self-Manage vs. Hire Calculator</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 28 }}>Enter your numbers to see the true financial comparison — including the cost of your time.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Number of Properties', value: numProperties, setter: setNumProperties, placeholder: 'e.g. 3′ },
              { label: 'Monthly Rent per Unit ($)', value: monthlyRent, setter: setMonthlyRent, placeholder: 'e.g. 2000′ },
              { label: 'Your Hourly Rate ($)', value: hourlyRate, setter: setHourlyRate, placeholder: 'e.g. 75′ },
            ].map(field => (
              <div key={field.label}>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: 12, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>{field.label}</label>
                <input
                  type="number"
                  value={field.value}
                  onChange={e => field.setter(e.target.value)}
                  placeholder={field.placeholder}
                  style={{ width: '100%', background: '#0f0a0f', border: '1px solid #333', borderRadius: 8, color: '#f1f5f9', padding: '10px 12px', fontSize: 14, boxSizing: 'border-box' }}
                />
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ background: '#a855f7', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            Calculate
          </button>

          {calcResult && (
            <div style={{ marginTop: 24, background: '#0f0a0f', borderRadius: 12, padding: 24, border: '1px solid #2a1a2a' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
                <div style={{ textAlign: 'center', padding: 16, background: '#1a0f1a', borderRadius: 8 }}>
                  <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>Your time cost/mo</div>
                  <div style={{ color: '#f97316', fontSize: 22, fontWeight: 800 }}>${calcResult.timeCost.toFixed(0)}</div>
                </div>
                <div style={{ textAlign: 'center', padding: 16, background: '#1a0f1a', borderRadius: 8 }}>
                  <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>Net if self-managing</div>
                  <div style={{ color: '#4ade80', fontSize: 22, fontWeight: 800 }}>${calcResult.diy.toFixed(0)}/mo</div>
                </div>
                <div style={{ textAlign: 'center', padding: 16, background: '#1a0f1a', borderRadius: 8 }}>
                  <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>Net with PM (10%)</div>
                  <div style={{ color: '#a855f7', fontSize: 22, fontWeight: 800 }}>${calcResult.managed.toFixed(0)}/mo</div>
                </div>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{calcResult.recommendation}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
