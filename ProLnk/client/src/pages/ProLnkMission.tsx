import { useState } from 'react';

const stats = [
  { label: 'Homeowners on Waitlist', value: '5,000+' },
  { label: 'Skilled Pros Signed Up', value: '500+' },
  { label: 'Projected Match Value', value: '$2.1M' },
  { label: 'Trades Represented', value: '28' },
];

const values = [
  { icon: '🤝', title: 'Fairness First', desc: 'Every pro deserves to earn what their skill is worth. Every homeowner deserves a price they can trust.' },
  { icon: '🔗', title: 'Aligned Incentives', desc: 'When pros win, homeowners win. Our network income model ensures everyone grows together.' },
  { icon: '🏠', title: 'Community Roots', desc: 'Home services are local. We build for neighborhoods, not just markets.' },
  { icon: '🚀', title: 'Long-Term Vision', desc: 'We are not chasing short-term revenue. We are building the infrastructure for a fair home economy.' },
];

export default function ProLnkMission() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ background: '#faf9f7', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a1a' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏗️</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: '#1e3a5f', marginBottom: 16, lineHeight: 1.2 }}>
            Why We Built ProLnk
          </h1>
          <p style={{ fontSize: 20, color: '#555', maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
            A marketplace built on one belief: when the best tradespeople and the best homeowners find each other, everyone wins.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 48, marginBottom: 48, boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ fontSize: 40 }}>👷</div>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: '#1e3a5f', margin: 0 }}>The Problem I Lived</h2>
              <p style={{ color: '#888', margin: '4px 0 0' }}>Andrew Frakes, Co-Founder & CEO</p>
            </div>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: '#333', marginBottom: 16 }}>
            I spent years in real estate watching the same painful cycle repeat itself. A homeowner needs a plumber. They call three random names from a Google search, wait two weeks for someone to show up, get a quote that feels too high, and have no way to know if the work will actually hold up. Meanwhile, a master plumber with 20 years of experience and a five-star reputation is sitting on the other side of town wondering where his next job is coming from.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: '#333', marginBottom: 16 }}>
            The system was broken on both ends. And no one was fixing it.
          </p>
          {!expanded && (
            <button
              onClick={() => setExpanded(true)}
              style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, fontWeight: 600, padding: 0 }}
            >
              Read the full story →
            </button>
          )}
          {expanded && (
            <>
              <p style={{ fontSize: 17, lineHeight: 1.8, color: '#333', marginBottom: 16 }}>
                I started talking to contractors. Not the fly-by-night guys, but the real ones — the electricians who had been in business for 15 years, the HVAC technicians who had trained for a decade. Almost every one of them said the same thing: they were spending more time chasing leads than doing the work they loved. The platforms they paid for delivered garbage leads or took a cut so large it wasn't worth it.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.8, color: '#333', marginBottom: 16 }}>
                So I asked a different question: what if the people who helped build the network could also earn from it? What if a skilled pro who referred a homeowner, or recruited another great pro, received a residual income stream that reflected the value they created? That question became ProLnk.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.8, color: '#333' }}>
                ProLnk is not just a lead marketplace. It is a network income system designed so that every participant — pros, homeowners, and referrers — has a reason to make the platform better. When we get this right, we will have built something that genuinely serves the people who build, fix, and protect American homes.
              </p>
            </>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 48 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: '#1e3a5f', borderRadius: 12, padding: 28, textAlign: 'center', color: '#fff' }}>
              <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>{s.value}</div>
              <div style={{ fontSize: 14, opacity: 0.8 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 32, fontWeight: 700, color: '#1e3a5f', textAlign: 'center', marginBottom: 32 }}>Our Core Values</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 64 }}>
          {values.map(v => (
            <div key={v.title} style={{ background: '#fff', borderRadius: 14, padding: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{v.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f', marginBottom: 8 }}>{v.title}</h3>
              <p style={{ fontSize: 15, color: '#555', lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#eef4ff', borderRadius: 16, padding: 48, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>💡</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#1e3a5f', marginBottom: 16 }}>Join the Mission</h2>
          <p style={{ fontSize: 17, color: '#444', maxWidth: 540, margin: '0 auto 28px', lineHeight: 1.7 }}>
            Whether you are a skilled pro looking for better leads, a homeowner tired of being overcharged, or someone who believes the trades deserve a better platform — there is a place for you here.
          </p>
          <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 10, padding: '16px 36px', fontSize: 17, fontWeight: 700, cursor: 'pointer' }}>
            Get Early Access →
          </button>
        </div>

      </div>
    </div>
  );
}
