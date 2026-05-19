import { useState } from 'react';

export default function TrustyProForLandlords() {
  const [properties, setProperties] = useState(5);

  const preventiveCostPerProperty = 350;
  const reactiveEmergency = 4500;
  const annualPreventiveCost = properties * preventiveCostPerProperty;
  const emergencyAvoidance = properties * 0.3 * reactiveEmergency;
  const annualNet = Math.round(emergencyAvoidance - annualPreventiveCost);

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF9', color: '#1E293B', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>TrustyPro for Landlords</div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: '#0F172A', marginBottom: 16, lineHeight: 1.1 }}>
          Manage Multiple Properties Like a Pro
        </h1>
        <p style={{ fontSize: 20, color: '#475569', marginBottom: 48, lineHeight: 1.6 }}>
          Stop reacting to tenant emergencies. Start proactively managing your portfolio with AI-powered home health tracking and on-demand verified contractors.
        </p>

        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 12, padding: 28, marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#7F1D1D', marginBottom: 16 }}>😤 Sound Familiar?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Tenant calls Saturday night — AC is out. You scramble to find an HVAC tech.',
              'Property sat vacant 3 weeks longer than expected because of deferred maintenance.',
              'You have 3 plumbers, 2 electricians, and 4 HVAC techs scattered across your contacts — none of them are vetted.',
              'You find out about the roof leak 6 months after it started.',
              'Each property is a separate chaos — no unified view of what needs attention.',
            ].map((pain, i) => (
              <div key={i} style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: '#EF4444', flexShrink: 0 }}>✕</span>
                <span style={{ color: '#7F1D1D', fontSize: 15 }}>{pain}</span>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#0F172A', marginBottom: 24 }}>The TrustyPro Solution for Landlords</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 48 }}>
          {[
            {
              icon: '🏘️',
              title: 'Add All Properties to the Vault',
              detail: 'Every rental goes into your Home Health Vault — addresses, systems, age of HVAC/roof/water heater, repair history. One dashboard, all properties.',
            },
            {
              icon: '🤖',
              title: 'AI Health Scores Per Property',
              detail: 'Each property gets a health score from 0-100. The AI flags deferred maintenance risks before they become tenant complaints.',
            },
            {
              icon: '📅',
              title: 'Automated Maintenance Reminders',
              detail: 'Set it and forget it. Annual HVAC servicing, gutter cleaning, pest inspection — TrustyPro reminds you at the right time, not after the damage is done.',
            },
            {
              icon: '⚡',
              title: 'Verified Contractor Dispatch',
              detail: 'When tenants report issues (or you need maintenance), TrustyPro dispatches a vetted, licensed contractor. No more cold-calling and hoping.',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>{item.title}</h3>
              <p style={{ color: '#475569', lineHeight: 1.6, margin: 0, fontSize: 14 }}>{item.detail}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#F0FDF4', border: '2px solid #86EFAC', borderRadius: 16, padding: 36, marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>📊 The Math on Proactive vs. Reactive</h2>
          <p style={{ color: '#475569', marginBottom: 28 }}>Adjust your portfolio size to see the financial case</p>

          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ fontSize: 15, fontWeight: 600, color: '#0F172A' }}>Properties in Your Portfolio</label>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#0F172A' }}>{properties}</span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              value={properties}
              onChange={e => setProperties(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#22C55E', height: 6, cursor: 'pointer' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 4 }}>Annual Preventive Cost</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#0F172A' }}>${annualPreventiveCost.toLocaleString()}</div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>$350/property/yr</div>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 4 }}>Emergency Costs Avoided</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#22C55E' }}>${emergencyAvoidance.toLocaleString()}</div>
              <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>~1 emergency/3 props averted</div>
            </div>
            <div style={{ background: '#0F172A', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 13, color: '#22C55E', marginBottom: 4 }}>Net Annual Benefit</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#22C55E' }}>${annualNet.toLocaleString()}</div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>Just from avoided emergencies</div>
            </div>
          </div>

          <div style={{ marginTop: 20, padding: 16, background: '#DCFCE7', borderRadius: 8, fontSize: 14, color: '#166534' }}>
            💡 1 avoided emergency repair ($2,000–$8,000) covers 5–10 years of preventive maintenance costs. This math works in your favor every time.
          </div>
        </div>

        <div style={{ background: '#0F172A', borderRadius: 16, padding: 36, marginBottom: 48, color: '#E2E8F0' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#FBBF24', marginBottom: 16 }}>💎 Origination Rights — The Landlord Advantage</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: 20 }}>
            As a landlord adding multiple properties to the Home Health Vault, you're not just a customer — you’re a <strong style={{ color: '#F8FAFC' }}>data contributor</strong>. Founding tier members earn:
          </p>
          <div style={{ background: '#1E293B', borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#FBBF24', textAlign: 'center', marginBottom: 8 }}>1.0%</div>
            <div style={{ fontSize: 16, color: '#F8FAFC', textAlign: 'center', fontWeight: 600, marginBottom: 8 }}>of every future service job at each property you add</div>
            <div style={{ fontSize: 14, color: '#64748B', textAlign: 'center' }}>Permanently. Every time a contractor works that address through TrustyPro, you earn.</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { scenario: '5 properties, avg $800/job, 3 jobs/yr/property', calc: '5 × $800 × 3 × 1% = $120/yr', color: '#94A3B8' },
              { scenario: '10 properties, avg $1,200/job, 4 jobs/yr/property', calc: '10 × $1,200 × 4 × 1% = $480/yr', color: '#93C5FD' },
              { scenario: '20 properties, avg $1,500/job, 5 jobs/yr/property', calc: '20 × $1,500 × 5 × 1% = $1,500/yr', color: '#FBBF24' },
            ].map((s, i) => (
              <div key={i} style={{ background: '#0F172A', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 13, color: '#64748B', marginBottom: 8, lineHeight: 1.4 }}>{s.scenario}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: s.color }}>{s.calc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 48 }}>
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Built for Small-to-Mid Landlords</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, fontSize: 14 }}>
              TrustyPro is designed for the 1-20 property DFW landlord — not enterprise property management companies. No per-unit fees, no long-term contracts. Just a platform that helps you stay ahead of maintenance.
            </p>
          </div>
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Tenant-Reported Issues</h3>
            <p style={{ color: '#475569', lineHeight: 1.6, fontSize: 14 }}>
              Coming soon: a tenant portal where renters can report maintenance issues with photos. You see it instantly, dispatch a verified contractor with one tap, and close the loop without a single phone call.
            </p>
          </div>
        </div>

        <div style={{ background: '#0F172A', borderRadius: 16, padding: 36, textAlign: 'center', color: '#E2E8F0' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🏘️</div>
          <h3 style={{ fontSize: 28, fontWeight: 800, color: '#FBBF24', marginBottom: 12 }}>Add Your Properties to TrustyPro</h3>
          <p style={{ color: '#94A3B8', marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
            Join the waitlist now and be first to access the landlord portal when it launches. Founding tier enrollment closes at 1,600 members.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#FBBF24', color: '#0F172A', padding: '16px 40px', borderRadius: 8, fontWeight: 800, fontSize: 18, textDecoration: 'none' }}>
            Join the Landlord Waitlist
          </a>
          <div style={{ marginTop: 16, fontSize: 14, color: '#475569' }}>Founding tier — 1.0% origination rights on every property you add</div>
        </div>

      </div>
    </div>
  );
}
