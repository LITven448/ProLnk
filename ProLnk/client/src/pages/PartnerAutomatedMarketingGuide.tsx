import { useState } from 'react';

const automations = [
  {
    num: '01',
    icon: '🗺️',
    title: 'Google Business Profile',
    cost: '$0',
    effort: '1x setup + 15 min/month',
    steps: [
      'Claim or create your Google Business Profile at business.google.com',
      'Add all service categories, service areas, and hours',
      'Upload 10+ photos of your work (real jobs, not stock)',
      'Post one update per month (job completion, seasonal tip, or ProLnk verification)',
      'Respond to every review within 24 hours — Google ranks this heavily',
    ],
    prolnk: 'ProLnk Verified partners can reference their ProLnk verification badge in their profile bio, boosting credibility.',
  },
  {
    num: '02',
    icon: '📧',
    title: 'Email Follow-Up Sequence',
    cost: '$0 (free tier) — Mailchimp or ConvertKit',
    effort: '3 hours setup, then automatic',
    steps: [
      'Set up a free Mailchimp or ConvertKit account',
      'Create a 3-email sequence triggered by every quote request',
      'Email 1 (Day 0): Introduction + your top 3 jobs with before/after photos',
      'Email 2 (Day 3): One detailed case study — problem, what you did, outcome',
      'Email 3 (Day 7): Limited availability offer or seasonal discount',
      'Connect your ProLnk lead notifications to trigger this sequence',
    ],
    prolnk: 'ProLnk sends lead notifications that can trigger your email sequence automatically — ask your platform rep for webhook setup.',
  },
  {
    num: '03',
    icon: '📱',
    title: 'Instagram Auto-Posting',
    cost: '$15–$20/month (Later or Buffer)',
    effort: '1 hour/month to batch-schedule',
    steps: [
      'Set up a Later.com or Buffer account ($15–18/mo)',
      'Connect your Instagram Business account',
      'Every time you photograph a job for ProLnk, save 3 versions: wide, detail, before',
      'Batch-schedule 3 posts/week on Sunday for the week ahead',
      'Use local hashtags: #DFWContractor, #DallasHomeRepair, #PlanoPlumber (example)',
      'Repurpose ProLnk job completion photos — you’re already taking them',
    ],
    prolnk: 'Photos you upload to ProLnk job completions can double as Instagram content. Zero extra effort for the photography.',
  },
  {
    num: '04',
    icon: '⭐',
    title: 'Review Request Automation',
    cost: '$49–$99/month (Podium or NiceJob)',
    effort: '2 hours setup, then automatic',
    steps: [
      'Set up NiceJob (simpler) or Podium (more features)',
      'Connect to your contact list or CRM',
      'After every completed job, system auto-sends a text: "Hi [Name], thanks for trusting us with [job]. Would you take 2 minutes to leave us a review? [link]"',
      'Reviews flow directly to Google Business Profile and Facebook',
      'Set up review alerts so you can respond within the hour',
    ],
    prolnk: 'ProLnk tracks job completion dates, which can trigger review requests automatically through a simple Zapier integration.',
  },
];

const auditItems = [
  { id: 'gbp', label: 'Google Business Profile claimed and complete' },
  { id: 'gbp_posts', label: 'Posted to GBP in the last 30 days' },
  { id: 'email', label: 'Email follow-up sequence active' },
  { id: 'instagram', label: 'Instagram Business account active' },
  { id: 'scheduling', label: 'Posts auto-scheduled 2+ weeks ahead' },
  { id: 'reviews', label: 'Automated review request system active' },
  { id: 'responses', label: 'All reviews responded to within 24 hours' },
];

const leadsPerMissing: Record<string, number> = {
  gbp: 8,
  gbp_posts: 3,
  email: 5,
  instagram: 4,
  scheduling: 2,
  reviews: 6,
  responses: 3,
};

export default function PartnerAutomatedMarketingGuide() {
  const [checked, setChecked] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => setChecked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const missingLeads = auditItems.filter(a => !checked.includes(a.id)).reduce((sum, a) => sum + (leadsPerMissing[a.id] || 0), 0);

  return (
    <div style={{ background: '#f9fafb', color: '#111827', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ background: '#ede9fe', borderRadius: 12, padding: '12px 20px', marginBottom: 40, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
          <span>🤖</span>
          <span style={{ color: '#7c3aed', fontWeight: 600, fontSize: 14 }}>For ProLnk Partners</span>
        </div>

        <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.1, marginBottom: 16, color: '#111827' }}>
          Automated Marketing for ProLnk Partners
          <span style={{ display: 'block', color: '#7c3aed', fontSize: 28 }}>Set It and Forget It</span>
        </h1>

        <div style={{ background: '#fef9c3', border: '1px solid #fde047', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <strong>The busy pro problem:</strong> Most contractors don't have time to market. ProLnk's AI generates leads automatically — but you still need a presence to capture demand that comes directly to you. Here's how to automate it in <strong>2 hours/month</strong> once set up.
        </div>

        <p style={{ color: '#4b5563', fontSize: 16, lineHeight: 1.7, marginBottom: 50 }}>
          ProLnk's AI is your 24/7 lead engine — it finds opportunities and dispatches them to you. These 4 systems capture demand from homeowners who find <em>you</em> directly through search, social, or referral. Together, they run on roughly <strong>2 hours/month</strong> of your time.
        </p>

        {/* The 4 Automations */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 28 }}>4 Systems to Set Up Once</h2>
        <div style={{ display: 'grid', gap: 20, marginBottom: 60 }}>
          {automations.map(a => {
            const open = expanded === a.num;
            return (
              <div key={a.num} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, overflow: 'hidden' }}>
                <div
                  onClick={() => setExpanded(open ? null : a.num)}
                  style={{ padding: '24px 28px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ background: '#7c3aed', color: '#fff', fontWeight: 800, fontSize: 13, borderRadius: 8, padding: '6px 12px' }}>{a.num}</div>
                    <span style={{ fontSize: 22 }}>{a.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 18 }}>{a.title}</div>
                      <div style={{ color: '#6b7280', fontSize: 13 }}>{a.cost} · {a.effort}</div>
                    </div>
                  </div>
                  <span style={{ color: '#9ca3af', fontSize: 20 }}>{open ? '▲' : '▼'}</span>
                </div>
                {open && (
                  <div style={{ padding: '0 28px 28px', borderTop: '1px solid #f3f4f6' }}>
                    <div style={{ paddingTop: 20, marginBottom: 16 }}>
                      {a.steps.map((s, i) => (
                        <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                          <div style={{ flexShrink: 0, background: '#ede9fe', color: '#7c3aed', fontWeight: 700, fontSize: 12, width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
                          <div style={{ color: '#374151', lineHeight: 1.6, fontSize: 15 }}>{s}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: '#ede9fe', borderRadius: 8, padding: 16 }}>
                      <span style={{ color: '#7c3aed', fontWeight: 600, fontSize: 13 }}>⚡ ProLnk connection: </span>
                      <span style={{ color: '#4c1d95', fontSize: 13 }}>{a.prolnk}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Audit Tool */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 16, padding: 36, marginBottom: 50 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>🔍 Your Automation Audit</h2>
          <p style={{ color: '#6b7280', marginBottom: 24 }}>Check off the systems you currently have active:</p>
          <div style={{ display: 'grid', gap: 10, marginBottom: 28 }}>
            {auditItems.map(item => {
              const on = checked.includes(item.id);
              return (
                <label
                  key={item.id}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', background: on ? '#f0fdf4' : '#f9fafb', border: '1px solid ' + (on ? '#86efac' : '#e5e7eb'), borderRadius: 8, padding: '12px 16px' }}
                >
                  <input type="checkbox" checked={on} onChange={() => toggle(item.id)} style={{ width: 18, height: 18, accentColor: '#7c3aed' }} />
                  <span style={{ color: on ? '#166534' : '#374151', fontWeight: on ? 600 : 400 }}>{item.label}</span>
                </label>
              );
            })}
          </div>
          <div style={{ background: missingLeads > 0 ? '#fef9c3' : '#f0fdf4', border: '1px solid ' + (missingLeads > 0 ? '#fde047' : '#86efac'), borderRadius: 10, padding: 20, textAlign: 'center' }}>
            {missingLeads > 0 ? (
              <>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#92400e' }}>~{missingLeads} leads/month</div>
                <div style={{ color: '#92400e', marginTop: 4 }}>estimated leads you may be missing from inactive systems</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#166534' }}>✅ Fully automated!</div>
                <div style={{ color: '#166534', marginTop: 4 }}>You're capturing demand on all channels. Nice work.</div>
              </>
            )}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', borderRadius: 16, padding: 40, textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🚀</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Join ProLnk and Get the AI Lead Engine</h3>
          <p style={{ color: '#ede9fe', marginBottom: 28 }}>Pair these 4 automations with ProLnk's AI lead matching and you'll have a full marketing system running on autopilot.</p>
          <a href="/apply" style={{ display: 'inline-block', background: '#fff', color: '#7c3aed', fontWeight: 700, padding: '14px 36px', borderRadius: 8, textDecoration: 'none', fontSize: 16 }}>
            Apply as a Pro →
          </a>
        </div>
      </div>
    </div>
  );
}
