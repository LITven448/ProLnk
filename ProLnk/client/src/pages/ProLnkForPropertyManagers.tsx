import { useState } from 'react';

export default function ProLnkForPropertyManagers() {
  const [tab, setTab] = useState<'problem' | 'solution' | 'earn'>('problem');

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', color: '#0F2137', fontFamily: 'system-ui, sans-serif' }}>

      <div style={{ background: '#0F2137', padding: '20px 40px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 24, fontWeight: 900, color: '#fff', letterSpacing: -0.5 }}>Pro</span>
        <span style={{ fontSize: 24, fontWeight: 900, color: '#FACC15', letterSpacing: -0.5 }}>Lnk</span>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ display: 'inline-block', background: '#FEF9C3', color: '#854D0E', fontWeight: 700, fontSize: 13, padding: '4px 14px', borderRadius: 20, marginBottom: 16 }}>
          For Property Managers
        </div>

        <h1 style={{ fontSize: 40, fontWeight: 900, lineHeight: 1.15, marginBottom: 16 }}>
          ProLnk for Property Managers
        </h1>
        <p style={{ fontSize: 20, color: '#475569', marginBottom: 48, maxWidth: 620 }}>
          Solve Your Maintenance Problem and Get Paid
        </p>

        <div style={{ display: 'flex', gap: 0, marginBottom: 32, border: '1.5px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
          {([
            { key: 'problem', label: 'The Problem' },
            { key: 'solution', label: 'ProLnk Solution' },
            { key: 'earn', label: 'How You Earn' },
          ] as { key: typeof tab; label: string }[]).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                flex: 1,
                padding: '14px 0',
                background: tab === key ? '#0F2137' : '#fff',
                color: tab === key ? '#FACC15' : '#475569',
                fontWeight: 700,
                fontSize: 14,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'problem' && (
          <div>
            <div style={{ background: '#FFF7ED', border: '1.5px solid #FED7AA', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 12, color: '#9A3412' }}>The Maintenance Problem</h2>
              <p style={{ color: '#7C2D12', lineHeight: 1.75 }}>
                For property managers handling 10+ units, reliable contractors are the hardest operational problem. Every call for a leaky faucet is 2 hours of coordination — calling 3 contractors, waiting for call-backs, managing no-shows, and defending costs to owners.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '📞', issue: 'Contractor call-back time averages 4+ hours in DFW during peak season (spring/summer)' },
                { icon: '💸', issue: 'Without volume pricing, property managers pay retail rates on every service call' },
                { icon: '📋', issue: 'No centralized system means no property history — contractors start from scratch every visit' },
                { icon: '⚠️', issue: 'Reactive maintenance (wait until it breaks) costs 3–5x more than proactive detection' },
              ].map(({ icon, issue }) => (
                <div key={icon} style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 10, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22 }}>{icon}</span>
                  <span style={{ color: '#374151', fontSize: 15, lineHeight: 1.6 }}>{issue}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'solution' && (
          <div>
            <div style={{ background: '#F0FDF4', border: '1.5px solid #BBF7D0', borderRadius: 12, padding: '24px 28px', marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 12, color: '#14532D' }}>How ProLnk Solves It</h2>
              <p style={{ color: '#166534', lineHeight: 1.75 }}>
                ProLnk gives property managers access to a verified, background-checked contractor network with pre-negotiated pricing through volume — plus AI-powered property scanning to detect issues before tenants complain.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: '✅', solution: 'Verified, background-checked contractors — every trade, DFW-wide' },
                { icon: '🤖', solution: 'AI photo scanning: upload photos, detect issues (roofing, HVAC, plumbing) before tenant complaints' },
                { icon: '💰', solution: 'Pre-negotiated volume pricing — property managers with 10+ units get bulk rates' },
                { icon: '📊', solution: 'Property intelligence dashboard: full service history, warranties, upcoming maintenance alerts' },
                { icon: '🔗', solution: 'B2B data API for managers with 100+ units — integrate with your PM software' },
              ].map(({ icon, solution }) => (
                <div key={solution} style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 10, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 22 }}>{icon}</span>
                  <span style={{ color: '#374151', fontSize: 15, lineHeight: 1.6 }}>{solution}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'earn' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 32 }}>
              {[
                {
                  icon: '🏘️',
                  stream: 'Property Origination Rights',
                  detail: 'Add every managed property to TrustyPro vault → earn 1.5% of future service income on each property. Permanently.',
                },
                {
                  icon: '🔧',
                  stream: 'Partner Coordinator Income',
                  detail: 'Become a ProLnk partner → earn on every maintenance job you coordinate through the network.',
                },
                {
                  icon: '👷',
                  stream: 'Contractor Network Overrides',
                  detail: 'Recruit the contractors who already service your properties → earn 7% network override on their ProLnk commissions.',
                },
              ].map(({ icon, stream, detail }) => (
                <div key={stream} style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 12, padding: '24px' }}>
                  <span style={{ fontSize: 28 }}>{icon}</span>
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: '12px 0 8px' }}>{stream}</h3>
                  <p style={{ color: '#64748B', fontSize: 14, lineHeight: 1.65 }}>{detail}</p>
                </div>
              ))}
            </div>
            <div style={{ background: '#0F2137', borderRadius: 12, padding: '24px 28px', color: '#fff' }}>
              <h3 style={{ fontWeight: 800, marginBottom: 8 }}>📡 B2B Property Intelligence API</h3>
              <p style={{ color: '#94A3B8', lineHeight: 1.7, fontSize: 15 }}>
                Property managers with 100+ units can access ProLnk's property intelligence API — structural data, service history, maintenance predictions — integrated directly into your property management software. Pricing on request.
              </p>
            </div>
          </div>
        )}

        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <a
            href="/apply"
            style={{
              display: 'inline-block',
              background: '#0F2137',
              color: '#FACC15',
              fontWeight: 800,
              fontSize: 17,
              padding: '18px 44px',
              borderRadius: 10,
              textDecoration: 'none',
              letterSpacing: 0.5,
            }}
          >
            Apply as a Partner →
          </a>
          <p style={{ color: '#94A3B8', fontSize: 13, marginTop: 12 }}>DFW property managers managing 10+ units. Limited spots.</p>
        </div>

      </div>
    </div>
  );
}
