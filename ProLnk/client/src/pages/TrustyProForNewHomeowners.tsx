import { useState } from 'react';

const plan = [
  { timeframe: 'Week 1–2', icon: '🏠', action: 'Add your home to TrustyPro vault', detail: 'Takes 15 minutes. Enter your address, basic property info, and any known issues from the inspection report.' },
  { timeframe: 'Week 2–4', icon: '📸', action: 'Complete your first AI scan', detail: 'Walk through all major areas: attic, HVAC, bathrooms, roof (from ground), crawl space, and foundation. The AI flags anything that warrants attention.' },
  { timeframe: 'Month 1', icon: '📊', action: 'Review your home health score', detail: 'Understand your starting point. Critical items need same-month attention. Important items should be addressed within 90 days. Routine items go on your annual calendar.' },
  { timeframe: 'Month 2–3', icon: '🔧', action: 'Address Critical scan findings', detail: 'Connect with TrustyPro verified pros for any Critical items. Get quotes, compare, and document all completed work.' },
];

const discoveries = [
  { icon: '🔍', title: 'Issues the inspector missed', detail: 'AI catches approximately 40% more issues than standard home inspections — particularly early-stage moisture intrusion, early HVAC wear, and minor structural concerns that aren’t yet code violations.' },
  { icon: '⏰', title: 'Aging systems approaching end of life', detail: 'Know before they fail. HVAC systems average 15–20 years, water heaters 10–12 years, roofs 20–25 years. Budget ahead instead of getting surprised.' },
  { icon: '📋', title: 'Previous repair history', detail: 'If your home was already in the TrustyPro vault before you purchased, you may have access to past scan records and documented repairs — a significant advantage.' },
];

const budgetTips = [
  { tip: 'Budget 1–2% of home value per year for maintenance', icon: '💰' },
  { tip: 'First-year surprises are normal — TrustyPro helps you prioritize what’s urgent vs. not', icon: '📅' },
  { tip: 'Document everything from day one — that record has financial value when you sell', icon: '📝' },
  { tip: 'Monthly reminders, seasonal guides, and storm alerts are automatic once your home is in the vault', icon: '🔔' },
  { tip: 'Connect with verified pros early — the good ones book out 4–6 weeks', icon: '⭐' },
];

const stats = [
  { val: '40%', label: 'More issues found vs. standard inspection' },
  { val: '80%', label: 'Of costly surprises happen in first 3 years' },
  { val: '1–2%', label: 'Of home value to budget for maintenance/year' },
  { val: '15 min', label: 'To add your home to TrustyPro' },
];

export default function TrustyProForNewHomeowners() {
  const [openItem, setOpenItem] = useState<number | null>(0);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#1a202c', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '60px 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ fontSize: 13, color: '#0ea5e9', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>
            🏡 TrustyPro for New Homeowners
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 14px', color: '#1a202c', lineHeight: 1.2 }}>
            TrustyPro for New Homeowners
          </h1>
          <p style={{ fontSize: 18, color: '#64748b', maxWidth: 600, margin: '0 auto' }}>
            Start smart in your first year — 80% of costly surprises in homeownership happen in the first 3 years.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 48 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 20, textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#0ea5e9' }}>{s.val}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* First 90 Days */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 24px', color: '#1a202c' }}>Your First 90 Days Action Plan</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {plan.map((step, i) => (
              <div
                key={i}
                style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              >
                <button
                  onClick={() => setOpenItem(openItem === i ? null : i)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 16, padding: '18px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    {step.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: '#0ea5e9', fontWeight: 700, marginBottom: 2 }}>{step.timeframe}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#1a202c' }}>{step.action}</div>
                  </div>
                  <span style={{ fontSize: 16, color: '#94a3b8' }}>{openItem === i ? '▲' : '▼'}</span>
                </button>
                {openItem === i && (
                  <div style={{ padding: '0 24px 20px 80px' }}>
                    <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, margin: 0 }}>{step.detail}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Discoveries */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 24px', color: '#1a202c' }}>What New Homeowners Discover with TrustyPro</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {discoveries.map((d, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, border: '1px solid #e2e8f0', padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{d.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1a202c', marginBottom: 8 }}>{d.title}</div>
                <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{d.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Origination Note */}
        <div style={{ background: '#fffbeb', borderRadius: 12, border: '1px solid #fcd34d', padding: 24, marginBottom: 48 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 8px', color: '#92400e' }}>📜 About Origination Rights</h3>
          <p style={{ fontSize: 14, color: '#78350f', lineHeight: 1.7, margin: 0 }}>
            The pro who added your home to the TrustyPro vault before you purchased it holds origination rights — a permanent connection to your home's service history. But this doesn't affect your benefits: you still get full access to AI scans, health scores, verified pros, and all platform features. Origination rights only affect how platform fees are distributed between pros — never your costs.
          </p>
        </div>

        {/* Budget Tips */}
        <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', padding: 32, marginBottom: 40, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 20px', color: '#1a202c' }}>What Every New Homeowner Should Know</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {budgetTips.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{t.icon}</span>
                <span style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>{t.tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)', borderRadius: 16, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 14 }}>🏠</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 12px', color: '#fff' }}>Start Strong From Day One</h3>
          <p style={{ fontSize: 15, color: '#bae6fd', margin: '0 0 28px', maxWidth: 440, marginLeft: 'auto', marginRight: 'auto' }}>
            Add your home to TrustyPro in 15 minutes. Get your first AI scan within days. Know your home's true condition before your first surprise.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{ display: 'inline-block', background: '#fff', color: '#0369a1', fontWeight: 800, padding: '16px 40px', borderRadius: 10, textDecoration: 'none', fontSize: 16 }}
          >
            Add My Home to TrustyPro →
          </a>
        </div>
      </div>
    </div>
  );
}
