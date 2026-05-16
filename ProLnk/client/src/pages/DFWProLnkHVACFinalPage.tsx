import { useState } from 'react';

const roles = [
  { id: 'homeowner', label: '🏠 Homeowner', desc: 'I own a DFW home' },
  { id: 'pro', label: '🔧 HVAC Pro', desc: 'I do this work for a living' },
  { id: 'scout', label: '🤝 Community Scout', desc: 'I connect people to pros' },
  { id: 'investor', label: '📈 Investor / Builder', desc: 'I build homes or portfolios' },
];

const commitments: Record<string, { headline: string; promises: string[]; invitation: string }> = {
  homeowner: {
    headline: 'ProLnk\'s Commitment to You as a DFW Homeowner',
    promises: [
      '🛡️ We will only connect you with vetted, credentialed HVAC professionals — no fly-by-nights',
      '⚡ We will match you with available pros within hours, not days, even in peak August',
      '💬 We will give you the knowledge to ask the right questions and spot bad advice',
      '📊 We will be transparent about pricing — no bait-and-switch, no hidden fees',
      '🌡️ We will keep learning the DFW climate so our platform serves your specific conditions',
      '🔗 We will grow this network until every DFW homeowner has what great owners have always had: reliable access to trustworthy HVAC help',
    ],
    invitation: 'Join ProLnk — the network DFW homeowners built, vetted, and trust.',
  },
  pro: {
    headline: 'ProLnk\'s Commitment to You as a DFW HVAC Professional',
    promises: [
      '🏅 We will protect your reputation by only listing credentialed, reviewed professionals',
      '📱 We will send you qualified leads — homeowners who understand the value of proper service',
      '💰 We will pay you fairly and on time — transparent commission structure, no surprises',
      '📈 We will grow your book of business without requiring you to spend on ads',
      '🤝 We will connect you to homeowners who value long-term relationships, not lowest bidder',
      '🔧 We will invest in your professional development and promote your expertise on the platform',
    ],
    invitation: 'Join ProLnk — the professional network that values your craft as much as you do.',
  },
  scout: {
    headline: 'ProLnk\'s Commitment to You as a Community Scout',
    promises: [
      '💼 We will build income streams that reward your network and relationships',
      '🌟 We will give you tools to serve your community with real value, not just referrals',
      '📊 We will be transparent about every commission earned and every lead matched',
      '🚀 We will grow with you — as your network grows, your income grows proportionally',
      '🤝 We will treat you as a partner, not just a referral source',
      '🗺️ We will expand across DFW so your network territory has more opportunity every quarter',
    ],
    invitation: 'Join ProLnk Scout — build real income connecting your community to trusted HVAC care.',
  },
  investor: {
    headline: 'ProLnk\'s Commitment to DFW\'s Built Environment',
    promises: [
      '🏗️ We will build the data infrastructure that makes DFW homes more valuable and trackable',
      '📊 We will create service history records that inform appraisals and transactions',
      '🔗 We will connect property owners to HVAC care at scale — from single homes to portfolios',
      '💡 We will integrate smart home data to make HVAC performance a real asset metric',
      '🌆 We will expand to every major DFW ZIP code within 18 months of launch',
      '🤝 We will partner with builders, investors, and property managers to raise the standard of HVAC care across the metro',
    ],
    invitation: 'Partner with ProLnk — the platform building DFW\'s home services infrastructure.',
  },
};

export default function DFWProLnkHVACFinalPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const content = selected ? commitments[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔗</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>
            ProLnk's Final Word on DFW HVAC
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto' }}>
            This is our commitment. Our invitation. Our promise to keep improving until every DFW home has access to trustworthy HVAC care.
          </p>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>👤 What role brings you to ProLnk?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.75rem' }}>
            {roles.map(r => (
              <button
                key={r.id}
                onClick={() => setSelected(r.id)}
                style={{
                  background: selected === r.id ? '#F5E642' : '#1a2f55',
                  color: selected === r.id ? '#0A1628' : '#fff',
                  border: 'none', borderRadius: 8, padding: '1rem', cursor: 'pointer',
                  fontWeight: 600, textAlign: 'left',
                }}
              >
                <div style={{ fontSize: '1.1rem' }}>{r.label}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.75, marginTop: 4 }}>{r.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {content && (
          <>
            <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.25rem' }}>
              <h2 style={{ color: '#F5E642', fontSize: '1.15rem', marginBottom: '1.25rem' }}>📋 {content.headline}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {content.promises.map((promise, i) => (
                  <div key={i} style={{ background: '#1a2f55', borderRadius: 8, padding: '0.85rem 1rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
                    {promise}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center', marginBottom: '1.5rem' }}>
              <p style={{ color: '#0A1628', fontWeight: 800, fontSize: '1.1rem', margin: 0 }}>{content.invitation}</p>
            </div>
          </>
        )}

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🌆 Why DFW. Why Now. Why ProLnk.</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {[
              ['7.8M', 'DFW metro residents', ''],
              ['3.2M', 'homes with HVAC systems', ''],
              ['$4.2B', 'annual HVAC spend', 'in the DFW market'],
              ['2026', 'ProLnk launch year', 'the network goes live'],
            ].map(([stat, label, sub], i) => (
              <div key={i} style={{ background: '#1a2f55', borderRadius: 8, padding: '0.85rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.5rem' }}>{stat}</div>
                <div style={{ color: '#e2e8f0', fontSize: '0.85rem', fontWeight: 600 }}>{label}</div>
                {sub && <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{sub}</div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1a2f55', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🏠 🔧 🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.5rem' }}>
            This is ProLnk's promise to DFW.
          </p>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 520, margin: '0 auto' }}>
            We built this platform page by page, climate fact by climate fact, to make sure every DFW homeowner — from Day 1 to Year 30 — has the knowledge, network, and trust they deserve when it comes to their HVAC system.
          </p>
          <p style={{ color: '#F5E642', fontWeight: 700, marginTop: '1rem', fontSize: '1rem' }}>
            Join the waitlist. We'll be ready for you.
          </p>
        </div>
      </div>
    </div>
  );
}
