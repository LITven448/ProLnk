import { useState } from 'react';

export default function TrustyProVaultBenefits() {
  const [homeValue, setHomeValue] = useState('');
  const [years, setYears] = useState('');
  const [impact, setImpact] = useState<{ value: number; days: number } | null>(null);

  function calculate() {
    const v = parseFloat(homeValue) || 0;
    const y = parseFloat(years) || 0;
    if (v <= 0 || y <= 0) { setImpact(null); return; }
    const pct = Math.min(0.032, 0.008 * y);
    const value = v * pct;
    const days = Math.min(11, Math.round(3 * y));
    setImpact({ value, days });
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #0d9488 100%)', padding: '72px 24px 56px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏦</div>
        <h1 style={{ fontSize: 'clamp(22px,5vw,38px)', fontWeight: 800, margin: '0 0 16px', color: '#fff' }}>
          The TrustyPro Home Health Vault
        </h1>
        <p style={{ fontSize: 18, color: '#6ee7b7', maxWidth: 600, margin: '0 auto' }}>
          Your Home's Permanent Record — Linked to the Property, Not Just You
        </p>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 20px' }}>

        {/* What Is It */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#065f46', marginBottom: 16 }}>🔐 What Is the Vault?</h2>
          <div style={{ background: '#fff', border: '1px solid #d1fae5', borderRadius: 12, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <p style={{ color: '#374151', lineHeight: 1.7, margin: 0, fontSize: 16 }}>
              The Home Health Vault is a <strong>permanent, secure digital record</strong> of your home's health, maintenance history, documents, and condition — linked to your <strong>property address</strong>, not your name. When you sell, your buyer inherits the complete record. When you hire a new contractor, they see exactly what was done before — no more starting from scratch.
            </p>
          </div>
        </section>

        {/* 6 Benefits */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#065f46', marginBottom: 16 }}>✨ 6 Vault Benefits in Detail</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              {
                num: '01',
                icon: '📋',
                title: 'Complete Maintenance History',
                desc: 'Every service, every scan, every improvement — permanently logged. View trends over time. See if your HVAC has been serviced annually or missed for 6 years. Know what your roof looked like before the hailstorm.',
              },
              {
                num: '02',
                icon: '📸',
                title: 'AI Scan Photo Archive',
                desc: 'All TrustyPro AI scan results stored permanently. Proves the condition of your siding, roof, foundation, and systems before a storm event, before a sale, or before a dispute. Timestamped and tamper-evident.',
              },
              {
                num: '03',
                icon: '📁',
                title: 'Document Storage',
                desc: 'Permits, warranties, inspection reports, deeds, appliance manuals — all linked to your property. Stop searching email for a 4-year-old receipt when an appliance breaks under warranty.',
              },
              {
                num: '04',
                icon: '📈',
                title: 'Real Value Impact',
                desc: 'Homes with complete TrustyPro vault records are projected to sell 11 days faster and for 3.2% more than comparable homes without verifiable records. Buyers pay for certainty.',
              },
              {
                num: '05',
                icon: '🔁',
                title: 'Contractor Continuity',
                desc: 'When your HVAC company changes ownership, your service history stays. When a new technician comes out for the first time, they see exactly what was done before — the system model, the refrigerant charged, the last capacitor replaced.',
              },
              {
                num: '06',
                icon: '🤝',
                title: 'Transfer on Sale',
                desc: 'The vault transfers with the home. Your buyer inherits your complete home history — a genuine, verifiable value add that justifies your asking price and eliminates inspection surprises.',
              },
            ].map(b => (
              <div key={b.num} style={{ background: '#fff', border: '1px solid #d1fae5', borderRadius: 12, padding: 24, display: 'flex', gap: 20, alignItems: 'flex-start', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                <div style={{ minWidth: 48, height: 48, background: '#ecfdf5', border: '2px solid #6ee7b7', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                  {b.icon}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#059669', background: '#d1fae5', padding: '2px 8px', borderRadius: 20 }}>{b.num}</span>
                    <span style={{ fontSize: 17, fontWeight: 700, color: '#065f46′ }}>{b.title}</span>
                  </div>
                  <p style={{ color: '#4b5563', lineHeight: 1.6, margin: 0, fontSize: 14 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#065f46', marginBottom: 16 }}>🔒 What's NOT in the Vault</h2>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            {[
              { icon: '👤', item: 'Your personal identity', detail: 'Property records are address-linked, not name-linked. Public records don’t expose your vault.' },
              { icon: '💳', item: 'Financial information', detail: 'No payment data, income data, or financial records are ever stored in the vault.' },
              { icon: '🔑', item: 'Access is your decision', detail: 'Only you control who sees your vault. You share access when you want — for a sale, for a contractor, for an inspector.' },
            ].map(p => (
              <div key={p.item} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: '1px solid #f1f5f9′ }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{p.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#1e293b', marginBottom: 2 }}>{p.item}</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>{p.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Value Calculator */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#065f46', marginBottom: 8 }}>🧮 Vault Value Calculator</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>Estimate the resale value impact of your TrustyPro vault records.</p>
          <div style={{ background: '#fff', border: '1px solid #d1fae5', borderRadius: 12, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#475569', marginBottom: 6 }}>🏠 Current Home Value ($)</label>
                <input
                  type="number"
                  placeholder="e.g. 450000″
                  value={homeValue}
                  onChange={e => setHomeValue(e.target.value)}
                  style={{ width: '100%', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 8, padding: '10px 12px', color: '#1e293b', fontSize: 14, boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, color: '#475569', marginBottom: 6 }}>📅 Years of Vault Records</label>
                <input
                  type="number"
                  placeholder="e.g. 3″
                  value={years}
                  onChange={e => setYears(e.target.value)}
                  style={{ width: '100%', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: 8, padding: '10px 12px', color: '#1e293b', fontSize: 14, boxSizing: 'border-box' }}
                />
              </div>
            </div>
            <button
              onClick={calculate}
              style={{ background: '#059669', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}
            >
              Calculate Value Impact
            </button>
            {impact && (
              <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: 10, padding: 20, textAlign: 'center' }}>
                  <div style={{ fontSize: 13, color: '#15803d', marginBottom: 4 }}>Estimated Value Increase</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#16a34a' }}>${impact.value.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                </div>
                <div style={{ background: '#eff6ff', border: '2px solid #2563eb', borderRadius: 10, padding: 20, textAlign: 'center' }}>
                  <div style={{ fontSize: 13, color: '#1d4ed8', marginBottom: 4 }}>Days Faster Sale (est.)</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#2563eb' }}>{impact.days} days</div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section style={{ marginTop: 40, textAlign: 'center' }}>
          <div style={{ background: 'linear-gradient(135deg, #064e3b, #0d9488)', borderRadius: 16, padding: '40px 24px' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🚀</div>
            <h3 style={{ color: '#fff', fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Start Building Your Vault Today</h3>
            <p style={{ color: '#6ee7b7', marginBottom: 24 }}>Join the waitlist — your first scan and vault record are included free.</p>
            <a
              href="/waitlist/homeowner"
              style={{ display: 'inline-block', background: '#fff', color: '#065f46', fontWeight: 700, fontSize: 16, padding: '14px 36px', borderRadius: 10, textDecoration: 'none' }}
            >
              Join Homeowner Waitlist →
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
