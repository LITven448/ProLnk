import { useState } from 'react';

const situations = [
  {
    label: 'Standard home repair',
    icon: '🔨',
    free: 'Posting your job, receiving matches, communicating with partners, reviewing partner profiles, leaving ratings.',
    cost: 'Nothing. ProLnk is 100% free for homeowners on standard matches.',
    how: 'ProLnk earns a match fee from the partner\’s side only after a successful connection is made.',
  },
  {
    label: 'Emergency repair',
    icon: '🚨',
    free: 'Emergency flagging, priority match queue, 24/7 access to the platform.',
    cost: 'Still free for you. Emergency matches may have higher partner match fees on the pro side — but you pay nothing.',
    how: 'Partners who accept emergency jobs pay a slightly higher match fee for priority routing. You see no difference.',
  },
  {
    label: 'Large project (renovation)',
    icon: '🏗️',
    free: 'Multi-phase project posting, up to 3 partner responses per phase, platform communication tools.',
    cost: 'Free for homeowners regardless of project size or dollar value. The match fee scales with project size but is always on the partner side.',
    how: 'For large projects, ProLnk earns a percentage-based match fee from the partner. Your cost is $0.',
  },
  {
    label: 'I get cold called after signing up',
    icon: '📵',
    free: 'You should not receive cold calls from ProLnk or from partners outside of a confirmed match context.',
    cost: 'Nothing. If you receive unsolicited calls, report them. ProLnk does not sell your contact information.',
    how: 'ProLnk makes money from match fees, not from lead resale. Selling your data would break the business model.',
  },
  {
    label: 'Multiple jobs in one year',
    icon: '📅',
    free: 'Every job posting, every match request, every re-match.',
    cost: 'Zero — no subscription, no per-job fee, no hidden annual cost. Use ProLnk as many times as you need.',
    how: 'Volume benefits ProLnk because more successful matches mean more match fee revenue from partners.',
  },
];

export default function ProLnkPricingExplained() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', color: '#1a1a2e', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 64, marginBottom: 12, fontWeight: 900, color: '#27ae60′ }}>$0</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0A1628', marginBottom: 12 }}>Free for Homeowners. Always.</h1>
          <p style={{ fontSize: 18, color: '#555', maxWidth: 540, margin: '0 auto' }}>
            No subscription. No pay-per-quote. No hidden fees. Here's exactly how ProLnk makes money — without charging you.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, marginBottom: 40, boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#0A1628′ }}>💡 The Value Exchange</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { from: 'You (Homeowner)', to: 'Share your job details with ProLnk', color: '#e8f4fd' },
              { from: 'ProLnk', to: 'Match you with up to 3 vetted, licensed partners', color: '#f0fff4′ },
              { from: 'Partner (Pro)', to: 'Pay a match fee to ProLnk after a successful connection', color: '#fff8e1′ },
              { from: 'ProLnk', to: 'Use match fees to run the platform — at zero cost to you', color: '#f0fff4′ },
            ].map((row, i) => (
              <div key={i} style={{ background: row.color, borderRadius: 10, padding: '14px 20px', display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: 14, minWidth: 120, color: '#0A1628′ }}>{row.from}</div>
                <div style={{ fontSize: 16 }}>→</div>
                <div style={{ fontSize: 14, color: '#333′ }}>{row.to}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 48 }}>
          {[
            { icon: '✅', title: 'Free job posting', desc: 'Post any job, any trade, any size — no charge.' },
            { icon: '✅', title: 'Free partner matching', desc: 'Receive up to 3 vetted responses per job.' },
            { icon: '✅', title: 'Free re-matching', desc: 'If a match fails, get a new one at no cost.' },
            { icon: '✅', title: 'Free messaging', desc: 'Communicate with partners through the platform.' },
            { icon: '✅', title: 'Free ratings', desc: 'Rate partners, read ratings, protect the community.' },
            { icon: '✅', title: 'No cold calls sold', desc: 'Your info is never sold to lead resellers.' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#fff', borderRadius: 12, padding: 18, boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: '#0A1628′ }}>{item.title}</div>
              <div style={{ color: '#555', fontSize: 13 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 1px 6px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#0A1628′ }}>💬 Your Situation</h2>
          <p style={{ color: '#555', fontSize: 15, marginBottom: 20 }}>Select your scenario to see exactly what's free, what (if anything) costs money, and how ProLnk stays free for you.</p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {situations.map((s, i) => (
              <button key={s.label} onClick={() => setSelected(i)} style={{ padding: '10px 18px', borderRadius: 8, border: selected === i ? '2px solid #F5E642′ : '2px solid #ddd', background: selected === i ? '#0A1628' : '#fff', color: selected === i ? '#F5E642' : '#333', fontWeight: 600, cursor: ’pointer', fontSize: 13 }}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>

          {selected !== null && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ background: '#f0fff4', borderRadius: 12, padding: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#27ae60′ }}>✅ What’s Free for You</div>
                <div style={{ color: '#333', fontSize: 14, lineHeight: 1.6 }}>{situations[selected].free}</div>
              </div>
              <div style={{ background: '#e8f4fd', borderRadius: 12, padding: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#0077cc' }}>💳 What Costs Money</div>
                <div style={{ color: '#333', fontSize: 14, lineHeight: 1.6 }}>{situations[selected].cost}</div>
              </div>
              <div style={{ background: '#fff8e1', borderRadius: 12, padding: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#e67e22′ }}>🧮 How ProLnk Stays Free for You</div>
                <div style={{ color: '#333', fontSize: 14, lineHeight: 1.6 }}>{situations[selected].how}</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
