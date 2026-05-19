import { useState } from 'react';

const sections = [
  {
    title: 'About the Income',
    icon: '💰',
    faqs: [
      {
        q: 'Is this MLM?',
        a: 'No. ProLnk is a referral network with a critical distinction: MLMs require purchases to participate and earn. ProLnk earns exclusively from real home service transactions — jobs completed between verified pros and homeowners. You never buy inventory. You never sell packages. Every dollar in the network comes from actual work performed.',
      },
      {
        q: 'When do I get paid?',
        a: 'Job commissions are swept nightly via Stripe — you see earnings in your dashboard the morning after a job closes. Network override commissions (from your recruited partners) are processed and paid weekly every Friday.',
      },
      {
        q: 'Is the $149/mo subscription rate locked forever?',
        a: 'Yes. Founding members lock in $149/month for life regardless of future pricing changes. As the platform scales and pricing increases for new members, your rate never changes. This is written into your membership agreement.',
      },
      {
        q: 'What happens if I cancel my membership and try to rejoin?',
        a: 'Your founding rate is permanently lost the moment you cancel. If you rejoin, you enter at whatever the current market rate is at that time — which will be higher. Founding membership is a one-time opportunity tied to the current cohort.',
      },
    ],
  },
  {
    title: 'About Recruiting',
    icon: '🤝',
    faqs: [
      {
        q: 'Do I have to recruit other partners to earn?',
        a: 'No. Recruiting is entirely optional. Partners who focus exclusively on job commissions earn solid, predictable income based on their own work. The network override system amplifies earnings for those who choose to build a team — but it is never required.',
      },
      {
        q: 'What if someone I recruit outperforms me on the platform?',
        a: "That's the best outcome possible. You earn a percentage of their success regardless of how much they outperform you. ProLnk's override structure is designed to incentivize you to help your recruits win — their success directly increases your income.",
      },
      {
        q: 'Can I recruit partners in other cities or states?',
        a: 'Yes. You can recruit partners anywhere in Texas initially. National expansion to additional states is planned for 2027. Your network override commissions travel with your recruits regardless of where they work.',
      },
    ],
  },
  {
    title: 'About Leads',
    icon: '📋',
    faqs: [
      {
        q: 'How fast do I receive my first lead after joining?',
        a: 'First lead dispatch typically happens within 1 week of uploading your first completed job photos and service area. The AI matching engine needs your portfolio data to begin routing leads to your profile.',
      },
      {
        q: "What if a lead doesn't convert to a booked job?",
        a: "You pay nothing. ProLnk's model earns only when jobs close — there are no per-lead charges, no pay-per-click, no wasted spend. If a homeowner doesn't book, it costs you zero.",
      },
      {
        q: 'Can I accept leads outside my primary trade?',
        a: 'Yes. Your profile can include multiple service types. You can accept any lead regardless of your primary trade designation, as long as you hold the appropriate license for that work in Texas.',
      },
    ],
  },
  {
    title: 'About the Platform',
    icon: '🏗️',
    faqs: [
      {
        q: 'Is ProLnk available outside DFW?',
        a: 'DFW launches first. Houston, San Antonio, and Austin market expansion is planned for 2027. Partners who join during the DFW phase have the opportunity to establish network positions before expansion markets open.',
      },
      {
        q: 'How long until I receive my first commission payment?',
        a: 'The average new partner receives their first commission payment within 14 days of completing profile setup. Partners in high-demand trades (HVAC, plumbing, electrical) often see first leads within 3–5 days.',
      },
    ],
  },
];

export default function PartnerNetworkFAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggle = (key: string) => setOpenItem(prev => prev === key ? null : key);

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', color: '#1a1a2e', fontFamily: 'sans-serif', padding: '0 0 80px' }}>
      <div style={{ background: '#0A1628', paddingTop: 60, paddingBottom: 60 }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <div style={{ color: '#F5C842', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Partner Education</div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, margin: '0 0 16px', color: '#fff', lineHeight: 1.2 }}>ProLnk Network Income — Frequently Asked Questions</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, margin: 0 }}>Real answers about how the income system works, how you get paid, and what to expect.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 20px 0' }}>
        {sections.map((section) => (
          <div key={section.title} style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: 24 }}>{section.icon}</span>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: '#0A1628' }}>{section.title}</h2>
            </div>

            <div style={{ border: '1px solid #e5e5e3', borderRadius: 16, overflow: 'hidden' }}>
              {section.faqs.map((faq, i) => {
                const key = `${section.title}-${i}`;
                const isOpen = openItem === key;
                return (
                  <div key={i} style={{ borderBottom: i < section.faqs.length - 1 ? '1px solid #e5e5e3' : 'none' }}>
                    <button
                      onClick={() => toggle(key)}
                      style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
                        padding: '20px 24px', background: isOpen ? '#f5f5f3' : '#fff', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16,
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: 16, color: '#0A1628', lineHeight: 1.4 }}>{faq.q}</span>
                      <span style={{ color: '#F5C842', fontSize: 20, fontWeight: 700, flexShrink: 0, transition: 'transform 0.2s', transform: isOpen ? 'rotate(45deg)' : 'none' }}>+</span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: '0 24px 24px', background: '#f5f5f3' }}>
                        <p style={{ color: '#444', fontSize: 15, lineHeight: 1.8, margin: 0 }}>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ background: '#0A1628', borderRadius: 20, padding: 40, textAlign: 'center', marginTop: 20 }}>
          <div style={{ fontSize: 32 }}>🚀</div>
          <h3 style={{ color: '#fff', fontSize: 24, fontWeight: 800, margin: '16px 0 12px' }}>Ready to Join the Founding Cohort?</h3>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, margin: '0 0 28px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
            The $149/month founding rate closes when the first 500 partner spots are filled. Lock in your rate before it's gone.
          </p>
          <a href="/signup/pro" style={{ display: 'inline-block', background: '#F5C842', color: '#0A1628', fontWeight: 700, padding: '14px 32px', borderRadius: 10, textDecoration: 'none', fontSize: 16 }}>Apply as a Founding Partner →</a>
        </div>
      </div>
    </div>
  );
}
