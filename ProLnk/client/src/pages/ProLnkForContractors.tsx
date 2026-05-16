import { useState } from 'react';

export default function ProLnkForContractors() {
  const [subs, setSubs] = useState(8);

  const monthlyPerSub = 312;
  const overrideRate = 0.07;
  const passiveIncome = Math.round(subs * monthlyPerSub * overrideRate);

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAF9', color: '#1E293B', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>ProLnk for Contractors</div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: '#0F172A', marginBottom: 16, lineHeight: 1.1 }}>
          General Contractors: Your Subcontractors Are a Lead Machine
        </h1>
        <p style={{ fontSize: 20, color: '#475569', marginBottom: 48, lineHeight: 1.6 }}>
          You already have relationships with plumbers, electricians, roofers, and HVAC techs. ProLnk turns those relationships into a passive income network — while generating leads that flow back to you.
        </p>

        <div style={{ background: '#0F172A', borderRadius: 16, padding: 36, marginBottom: 48, color: '#E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: 28 }}>⚡</span>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#FBBF24', margin: 0 }}>The GC Flywheel</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {[
              { step: '1', icon: '🏗️', title: 'You Join ProLnk', detail: 'Enroll as a Charter or Founding member' },
              { step: '2', icon: '👥', title: 'Recruit Your Subs', detail: 'Invite the trades you already trust and work with' },
              { step: '3', icon: '💰', title: 'Earn Override Income', detail: '7% of everything your subs earn through ProLnk' },
              { step: '4', icon: '🔄', title: 'Leads Flow Back to You', detail: 'Homeowners needing GC work get matched to you' },
            ].map(item => (
              <div key={item.step} style={{ background: '#1E293B', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ fontSize: 13, color: '#FBBF24', fontWeight: 700, marginBottom: 6 }}>Step {item.step}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#F8FAFC', marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.5 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#FEF3C7', border: '2px solid #FBBF24', borderRadius: 16, padding: 36, marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>🧮 Your Passive Income Calculator</h2>
          <p style={{ color: '#475569', marginBottom: 24 }}>Adjust the number of subcontractors you'd recruit to see your override income</p>

          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ fontSize: 15, fontWeight: 600, color: '#0F172A' }}>Number of Subs You'd Recruit</label>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#0F172A' }}>{subs}</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              value={subs}
              onChange={e => setSubs(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#FBBF24', height: 6, cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#94A3B8', marginTop: 4 }}>
              <span>1 sub</span>
              <span>30 subs</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 4 }}>Avg Sub Earnings</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#0F172A' }}>${monthlyPerSub}/mo</div>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 4 }}>Your Override Rate</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#0F172A' }}>7%</div>
            </div>
            <div style={{ background: '#0F172A', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#FBBF24', marginBottom: 4 }}>Your Passive Income</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#FBBF24' }}>${passiveIncome.toLocaleString()}/mo</div>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#0F172A', marginBottom: 24 }}>How ProLnk Works for GCs</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
          {[
            {
              icon: '🔑',
              title: 'Charter or Founding Membership',
              detail: 'GCs join at Charter ($149/mo, first 500) or Founding ($149/mo, next 1,600) tier. Lock in the same monthly rate permanently — no price increases as the platform grows.',
            },
            {
              icon: '📡',
              title: 'Recruit Your Trusted Subs as Partners',
              detail: 'Your plumber, your electrician, your HVAC tech — invite them directly with your personal ProLnk link. They join under your network, meaning you earn 7% of their commission earnings permanently.',
            },
            {
              icon: '🎯',
              title: 'ProLnk Sends You GC-Specific Leads',
              detail: 'Homeowners needing project management, remodels, additions, or new construction get matched to licensed GCs in the system. You bid, you win, you manage.',
            },
            {
              icon: '🔗',
              title: 'Subs Get Their Own Lead Pipeline',
              detail: 'Your subs independently receive service leads (plumbing, electrical, HVAC calls). They earn, you earn a share. Everyone wins — and everyone in your network gets more work.',
            },
          ].map((item, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ color: '#475569', lineHeight: 1.6, margin: 0 }}>{item.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12, padding: 28, marginBottom: 48 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', marginBottom: 16 }}>🏗️ ProLnk Works for Any Licensed Trade</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {['General Contractor', 'Plumber', 'Electrician', 'HVAC Tech', 'Roofer', 'Painter', 'Flooring', 'Tile & Stone', 'Landscaper', 'Fence Contractor', 'Foundation Repair', 'Insulation', 'Window & Door', 'Pool Builder', 'Masonry'].map(trade => (
              <span key={trade} style={{ padding: '6px 14px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: 20, fontSize: 13, color: '#475569', fontWeight: 500 }}>
                {trade}
              </span>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F172A', borderRadius: 16, padding: 36, textAlign: 'center', color: '#E2E8F0' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🚀</div>
          <h3 style={{ fontSize: 28, fontWeight: 800, color: '#FBBF24', marginBottom: 12 }}>Charter Membership Closes at 500 Pros</h3>
          <p style={{ color: '#94A3B8', marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
            GCs who join first recruit their subs first. First mover advantage in your market is significant — lock in Charter pricing and your territory before competitors.
          </p>
          <a href="/apply" style={{ display: 'inline-block', background: '#FBBF24', color: '#0F172A', padding: '16px 40px', borderRadius: 8, fontWeight: 800, fontSize: 18, textDecoration: 'none' }}>
            Apply as a General Contractor
          </a>
          <div style={{ marginTop: 16, fontSize: 14, color: '#475569' }}>Charter tier — $149/mo locked for life</div>
        </div>

      </div>
    </div>
  );
}
