import { useState } from 'react';

const stakeholders = [
  { id: 'investor', label: 'Investor', icon: '💼' },
  { id: 'pro', label: 'Service Pro', icon: '🔧' },
  { id: 'homeowner', label: 'Homeowner', icon: '🏡' },
  { id: 'partner', label: 'Strategic Partner', icon: '🤝' },
];

const guides: Record<string, { title: string; milestones: { icon: string; milestone: string; status: string; detail: string }[] }> = {
  'investor': {
    title: 'Investor Roundup — May 17, 2026',
    milestones: [
      { icon: '✅', milestone: 'Site Live', status: 'Complete', detail: 'prolnk-v2.onrender.com operational — waitlist collection active for DFW pros and homeowners' },
      { icon: '✅', milestone: '5,250+ Content Pages', status: 'Complete', detail: 'DFW-specific home service knowledge base — SEO moat and brand authority established' },
      { icon: '🔄', milestone: 'Seed Round Open', status: 'In Progress', detail: '$2M raise at $8M pre-money — Charter tier approaching 500 cap, proving demand' },
      { icon: '🔄', milestone: 'Render Credits Application', status: 'Ready to Submit', detail: 'Startup credits application prepared — reduces infrastructure OpEx to near-zero' },
      { icon: '⏭️', milestone: 'Mobile App Beta', status: 'Next Up', detail: 'React Native iOS/Android — pro lead management and homeowner job requests on mobile' },
      { icon: '⏭️', milestone: 'Matching Algorithm', status: 'Next Up', detail: 'AI-powered DFW pro-to-homeowner matching — first revenue milestone post-seed' },
    ],
  },
  'pro': {
    title: 'What’s Next for DFW Pros',
    milestones: [
      { icon: '⚡', milestone: 'Charter Tier Closing', status: 'Urgent', detail: '500 Charter spots total — apply now before waitlist closes forever. $149/mo locked rate for life' },
      { icon: '✅', milestone: 'Waitlist Active', status: 'Now Open', detail: 'Submitted your application? You are on the list — we will contact you when matching goes live' },
      { icon: '⏭️', milestone: 'Matching Algorithm Launch', status: 'Coming Q3 2026', detail: 'AI matching goes live — Charter pros get first-priority lead access in their DFW service area' },
      { icon: '⏭️', milestone: 'Mobile App', status: 'Coming Q3 2026', detail: 'Accept leads, message homeowners, track earnings — all from your phone' },
      { icon: '⏭️', milestone: 'Payout System', status: 'Coming Q4 2026', detail: 'Direct deposit commissions + network override payouts — 5-stream income activated' },
    ],
  },
  'homeowner': {
    title: 'What’s Next for DFW Homeowners',
    milestones: [
      { icon: '✅', milestone: 'Join Waitlist', status: 'Now Open', detail: 'Sign up at prolnk.io — enter your DFW address and service needs, confirmation email sent instantly' },
      { icon: '✅', milestone: 'Home Health Vault', status: 'Building Now', detail: 'Your DFW home is already in our database — service history being built as pros join' },
      { icon: '⏭️', milestone: 'First Match', status: 'Coming Q3 2026', detail: 'When matching launches, you get one vetted DFW pro quote — no bidding wars, no spam calls' },
      { icon: '⏭️', milestone: 'Mobile App', status: 'Coming Q3 2026', detail: 'Request service, track job status, view your Home Health Vault — all on your phone' },
    ],
  },
  'partner': {
    title: 'Strategic Partnership Roadmap',
    milestones: [
      { icon: '✅', milestone: 'Data Asset Foundation', status: 'Built', detail: 'Home Health Vault operational — 2.3M DFW homes in system, structured for B2B API access' },
      { icon: '🔄', milestone: 'Render Credits Submission', status: 'This Week', detail: 'Infrastructure cost optimization in progress — allows reinvestment into data and AI capabilities' },
      { icon: '⏭️', milestone: 'API Partner Program', status: 'Q4 2026', detail: 'Structured API access for insurers, lenders, real estate platforms — licensing discussions open now' },
      { icon: '⏭️', milestone: 'DFW Market Dominance', status: '2027', detail: 'Target: 50,000 DFW pros, 500,000 homes with active service records — undisputed local data leader' },
    ],
  },
};

export default function DFWProLnkFinalRoundup2026() {
  const [stakeholder, setStakeholder] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🚀</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>ProLnk DFW Final Roundup — May 17, 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Where things stand, what's next, and what it means for you</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
            {['5,250+ Pages', 'Site Live', 'Charter Closing', '$2M Raise Open'].map((stat, i) => (
              <div key={i} style={{ backgroundColor: '#1e3a5f', borderRadius: 8, padding: '8px 16px', fontSize: 13, color: '#F5E642', fontWeight: 700 }}>{stat}</div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12, fontSize: 14 }}>👤 SHOW ME WHAT'S NEXT FOR:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {stakeholders.map(s => (
              <button key={s.id} onClick={() => setStakeholder(s.id)} style={{ padding: '12px', borderRadius: 8, border: '2px solid', borderColor: stakeholder === s.id ? '#F5E642' : '#334155', backgroundColor: stakeholder === s.id ? '#F5E64220' : '#0f2744', color: '#fff', cursor: 'pointer', fontWeight: 600 }}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>

        {stakeholder && (
          <div>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📅 {guides[stakeholder].title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {guides[stakeholder].milestones.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#1e3a5f', borderRadius: 10, padding: 18, borderLeft: '4px solid', borderLeftColor: item.status === 'Complete' || item.status === 'Built' || item.status === 'Now Open' ? '#4ade80' : item.status === 'Urgent' || item.status === 'In Progress' || item.status === 'Ready to Submit' || item.status === 'Building Now' || item.status === 'This Week' ? '#fbbf24' : '#334155' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', backgroundColor: '#0A1628', borderRadius: 4, padding: '3px 8px' }}>{item.status}</span>
                  </div>
                  <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{item.milestone}</div>
                  <div style={{ color: '#cbd5e1', fontSize: 14 }}>{item.detail}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, backgroundColor: '#F5E64215', border: '1px solid #F5E642', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Ready to be part of what's next?</p>
              <a href="https://prolnk.io" style={{ color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>🔗 Join at ProLnk.io →</a>
            </div>
          </div>
        )}

        {!stakeholder && (
          <div style={{ textAlign: 'center', color: '#475569', fontSize: 14, marginTop: 40 }}>
            ☝️ Select your role above to see the ProLnk roadmap personalized for you
          </div>
        )}

        <div style={{ marginTop: 40, textAlign: 'center', borderTop: '1px solid #1e3a5f', paddingTop: 20 }}>
          <p style={{ color: '#475569', fontSize: 12 }}>ProLnk DFW · Final Roundup · prolnk.io · May 17, 2026 · Building the future of DFW home services</p>
        </div>
      </div>
    </div>
  );
}