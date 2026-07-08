import { useState } from 'react';

export default function ProLnkForSeniors() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (key: string) => setExpanded(prev => prev === key ? null : key);

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', fontFamily: 'Georgia, serif', color: '#1a2744' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: '#1a2744', lineHeight: 1.2, marginBottom: 16 }}>
            ProLnk + TrustyPro for Seniors
          </h1>
          <p style={{ fontSize: 22, color: '#e8b400', fontWeight: 700, marginBottom: 8 }}>
            Stay in Your Home Longer
          </p>
          <p style={{ fontSize: 18, color: '#4a5568', maxWidth: 620, margin: '0 auto' }}>
            The #1 goal of DFW homeowners 60+ is aging in place. TrustyPro is built to help you do exactly that — safely, affordably, and on your terms.
          </p>
        </div>

        <div style={{ background: '#fff', border: '2px solid #e8b400', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1a2744', marginBottom: 20 }}>
            🛡️ Why Seniors Need TrustyPro
          </h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { icon: '🚿', title: 'Falls Are the #1 Cause of Senior Injury', body: 'Bathroom grab bars, better lighting, and trip hazard removal can dramatically reduce fall risk. TrustyPro’s AI scan identifies these hazards during routine maintenance visits — no separate safety assessment needed.' },
              { icon: '💸', title: 'Deferred Maintenance Compounds on Fixed Income', body: 'A small roof leak becomes a $15,000 mold remediation problem in 18 months. Early detection through regular TrustyPro inspections saves money you can’t afford to spend on preventable emergencies.' },
              { icon: '🔧', title: 'Trusted Contractor Network — No Scammer Risk', body: 'Door-to-door contractor scams target seniors at an alarming rate. Every TrustyPro contractor is vetted, reviewed, and accountable. You’ll never be pressured into unnecessary work.' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 16, padding: 20, background: '#f8f9fa', borderRadius: 12 }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6, color: '#1a2744' }}>{item.title}</div>
                  <div style={{ color: '#4a5568', lineHeight: 1.6 }}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1a2744', marginBottom: 20 }}>
            📱 TrustyPro Benefits Built for Seniors
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { icon: '🤖', label: 'AI Safety Scanning', desc: 'Catches hazards before they become emergencies — water intrusion, electrical issues, structural concerns' },
              { icon: '👨‍👩‍👧', label: 'Family Remote Access', desc: 'Adult children monitor home health from anywhere. They’ll sleep better knowing it’s covered.' },
              { icon: '🚨', label: 'Emergency Dispatch', desc: 'Solo seniors can activate emergency contractor response without calling around or waiting on hold' },
              { icon: '📊', label: 'Plain-Language Reports', desc: 'No jargon — every finding explained clearly with recommended action, timeline, and cost estimate' },
            ].map(b => (
              <div key={b.label} style={{ background: '#f0f4ff', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{b.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#1a2744', marginBottom: 6 }}>{b.label}</div>
                <div style={{ color: '#4a5568', fontSize: 15, lineHeight: 1.5 }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1a2744', borderRadius: 16, padding: 32, marginBottom: 32, color: '#fff' }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>
            👨‍👩‍👧 For Adult Children of DFW Homeowners
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: '#cbd5e0' }}>
            TrustyPro lets your parents' home speak for itself. You'll receive regular home health reports, alert notifications for urgent issues, and the ability to schedule contractors on their behalf — all from your phone, whether you're in Frisco or across the country.
          </p>
          <div style={{ marginTop: 20, padding: 20, background: 'rgba(232,180,0,0.15)', borderRadius: 12, borderLeft: '4px solid #e8b400' }}>
            <p style={{ fontSize: 16, color: '#e8b400', fontStyle: 'italic', margin: 0 }}>
              "TrustyPro lets your kids check your home's condition from anywhere — they'll sleep better knowing it's monitored."
            </p>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1a2744', marginBottom: 8 }}>
            💰 Income Opportunity for Semi-Retired Tradespeople
          </h2>
          <p style={{ color: '#4a5568', lineHeight: 1.7, fontSize: 16, marginBottom: 16 }}>
            Semi-retired tradespeople are perfect ProLnk partners. You already have the skills, the tools, and the reputation. ProLnk lets you work your own schedule, take only the jobs you want, upload photos from every job, and earn passive network income from pros you refer — even while you're fishing.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { icon: '📅', label: 'Set Your Own Schedule' },
              { icon: '📸', label: 'Photo-Based Income' },
              { icon: '🤝', label: 'Refer Other Pros' },
              { icon: '📈', label: 'Passive Network Earnings' },
            ].map(i => (
              <div key={i.label} style={{ textAlign: 'center', padding: 16, background: '#f8f9fa', borderRadius: 10 }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{i.icon}</div>
                <div style={{ fontWeight: 600, color: '#1a2744', fontSize: 14 }}>{i.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#1a2744', marginBottom: 16 }}>
            🏦 Financial Assistance for Seniors
          </h2>
          {[
            { key: 'pace', title: 'PACE Financing', body: 'Property Assessed Clean Energy financing is available in most DFW counties for energy efficiency and safety improvements. Repaid through property taxes — no upfront cost, no monthly payment.' },
            { key: 'grants', title: 'DFW County Home Repair Grants', body: 'Several DFW counties offer home repair assistance grants specifically for seniors. Dallas County, Tarrant County, and others maintain programs — eligibility varies by income and property value.' },
            { key: 'medicare', title: 'Medicare Advantage Home Modification', body: 'Some Medicare Advantage plans (2026 benefit expansions) now cover home safety modifications. Check your plan’s supplemental benefits before paying out of pocket.' },
          ].map(item => (
            <div key={item.key} style={{ marginBottom: 12, border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
              <button
                onClick={() => toggle(item.key)}
                style={{ width: '100%', textAlign: 'left', padding: '16px 20px', background: expanded === item.key ? '#f0f4ff' : '#fff', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 16, fontWeight: 600, color: '#1a2744' }}
              >
                {item.title}
                <span>{expanded === item.key ? '▲' : '▼'}</span>
              </button>
              {expanded === item.key && (
                <div style={{ padding: '16px 20px', color: '#4a5568', lineHeight: 1.7, borderTop: '1px solid #e2e8f0' }}>
                  {item.body}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', background: '#1a2744', borderRadius: 16, padding: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏡</div>
          <h3 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
            Join the TrustyPro Waitlist
          </h3>
          <p style={{ color: '#cbd5e0', fontSize: 16, marginBottom: 24 }}>
            Early members get priority onboarding when TrustyPro launches. Early access is open — DFW first.
          </p>
          <a
            href="/waitlist/homeowner"
            style={{ display: 'inline-block', background: '#e8b400', color: '#1a2744', fontWeight: 800, fontSize: 20, padding: '16px 48px', borderRadius: 50, textDecoration: 'none' }}
          >
            Join the Waitlist →
          </a>
        </div>

      </div>
    </div>
  );
}
