import { useState } from 'react';

const values = [
  { emoji: '🤝', title: 'Tradespeople First', desc: 'Every decision we make starts with: does this make life better for skilled pros?' },
  { emoji: '🚀', title: 'Ship Fast, Learn Faster', desc: 'We build quickly, we get real feedback, and we improve. No six-month roadmaps that never ship.' },
  { emoji: '🔍', title: 'Radical Transparency', desc: 'We share numbers, mistakes, and roadblocks with the whole team. No hidden agendas.' },
  { emoji: '🌱', title: 'Long Game Thinking', desc: 'We are building something that should still matter in 20 years. Short-term shortcuts are not welcome.' },
];

const roles = [
  {
    title: 'Senior Full-Stack Engineer',
    team: 'Engineering',
    emoji: '💻',
    type: 'Full-Time · Remote (US)',
    pay: '$130,000 – $165,000 + equity',
    desc: 'You will own critical product surfaces on both the React frontend and the Node/Express/tRPC backend. You are comfortable with TypeScript, familiar with AI-adjacent systems, and can move fast without breaking things (too often).',
    requirements: [
      '4+ years of professional full-stack development',
      'Strong TypeScript and React experience',
      'Familiarity with SQL databases and ORMs',
      'Experience building marketplace or two-sided platform products',
      'You ship things. Real things. That real people use.',
    ],
    benefits: ['Comprehensive health, dental, vision', 'Unlimited PTO (real, not fake)', '401(k) with match', 'Home office stipend', 'Equity with 4-year vesting'],
  },
  {
    title: 'Head of Partner Acquisition',
    team: 'Partnerships',
    emoji: '🤝',
    type: 'Full-Time · Dallas preferred / Remote OK',
    pay: '$95,000 – $125,000 + commission + equity',
    desc: 'You will own the strategy and execution for bringing skilled trade professionals onto the ProLnk network. This is a sales and relationship role, not a marketing role. You will be on the phone, in the field, and at trade shows.',
    requirements: [
      '5+ years in B2B sales or channel partnerships',
      'Existing relationships in the trade or contractor space a huge plus',
      'Comfortable with CRM-driven outreach at scale',
      'Track record of building partnerships, not just closing one-off deals',
      'Passion for the trades — respect for people who build things',
    ],
    benefits: ['Uncapped commission structure', 'Equity participation', 'Health + dental + vision', 'Travel budget for field work', 'Flexible schedule'],
  },
  {
    title: 'Customer Success Manager',
    team: 'Customer Success',
    emoji: '⭐',
    type: 'Full-Time · Remote (US)',
    pay: '$65,000 – $85,000 + equity',
    desc: 'You will be the first voice that homeowners and pros hear when something goes wrong — and the one who makes it right. You care deeply about people, you solve problems fast, and you find the patterns that help us improve the product.',
    requirements: [
      '2+ years in customer success or support at a tech company',
      'Excellent written and verbal communication',
      'Comfortable navigating product, ops, and engineering to resolve issues',
      'Data-driven — you track what you learn and report it clearly',
      'Empathetic but efficient: you can de-escalate and solve in the same breath',
    ],
    benefits: ['Health, dental, vision', 'Home office stipend', 'Strong base + equity', '4-day summer work weeks', 'Direct access to leadership'],
  },
];

export default function ProLnkCareers() {
  const [openRole, setOpenRole] = useState<number | null>(null);

  return (
    <div style={{ background: '#faf9f7', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a1a' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>💼</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: '#1e3a5f', marginBottom: 16 }}>Join the ProLnk Team</h1>
          <p style={{ fontSize: 20, color: '#555', maxWidth: 620, margin: '0 auto', lineHeight: 1.7 }}>
            We are a small team with a big mission. If you want to help build the platform that finally gives skilled tradespeople and homeowners a fair deal, we want to meet you.
          </p>
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 700, color: '#1e3a5f', marginBottom: 28, textAlign: 'center' }}>How We Work</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 64 }}>
          {values.map(v => (
            <div key={v.title} style={{ background: '#fff', borderRadius: 14, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{v.emoji}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1e3a5f', marginBottom: 8 }}>{v.title}</h3>
              <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 32, fontWeight: 700, color: '#1e3a5f', marginBottom: 32 }}>Open Roles</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 64 }}>
          {roles.map((role, i) => (
            <div
              key={role.title}
              style={{
                background: '#fff',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: openRole === i ? '0 8px 28px rgba(0,0,0,0.1)' : '0 2px 12px rgba(0,0,0,0.06)',
                border: openRole === i ? '2px solid #2563eb' : '2px solid transparent',
              }}
            >
              <div
                onClick={() => setOpenRole(openRole === i ? null : i)}
                style={{ padding: '28px 32px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ fontSize: 36 }}>{role.emoji}</div>
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', margin: '0 0 4px' }}>{role.title}</h3>
                    <div style={{ display: 'flex', gap: 16, fontSize: 14, color: '#888' }}>
                      <span>{role.team}</span>
                      <span>·</span>
                      <span>{role.type}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontWeight: 700, color: '#1e3a5f', fontSize: 15 }}>{role.pay}</span>
                  <span style={{ color: '#94a3b8', fontSize: 20 }}>{openRole === i ? '▲' : '▼'}</span>
                </div>
              </div>

              {openRole === i && (
                <div style={{ padding: '0 32px 32px', borderTop: '1px solid #f1f5f9' }}>
                  <p style={{ fontSize: 16, color: '#444', lineHeight: 1.7, margin: '24px 0 20px' }}>{role.desc}</p>

                  <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1e3a5f', marginBottom: 12 }}>What We Are Looking For</h4>
                  <ul style={{ paddingLeft: 20, marginBottom: 24 }}>
                    {role.requirements.map(r => (
                      <li key={r} style={{ fontSize: 15, color: '#555', lineHeight: 1.8 }}>{r}</li>
                    ))}
                  </ul>

                  <h4 style={{ fontSize: 16, fontWeight: 700, color: '#1e3a5f', marginBottom: 12 }}>Benefits</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
                    {role.benefits.map(b => (
                      <span key={b} style={{ background: '#eef4ff', color: '#1e3a5f', borderRadius: 20, padding: '6px 16px', fontSize: 14, fontWeight: 500 }}>
                        {b}
                      </span>
                    ))}
                  </div>

                  <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
                    Apply Now
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 16, padding: 48, textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📬</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Do Not See Your Role?</h2>
          <p style={{ fontSize: 17, opacity: 0.85, maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.7 }}>
            We are growing fast. If you believe in the mission and think you can add something we have not thought of yet, reach out. We read every message.
          </p>
          <a
            href="mailto:careers@prolnk.io"
            style={{ background: '#fff', color: '#1e3a5f', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer', textDecoration: 'none', display: 'inline-block' }}
          >
            careers@prolnk.io
          </a>
        </div>

      </div>
    </div>
  );
}
