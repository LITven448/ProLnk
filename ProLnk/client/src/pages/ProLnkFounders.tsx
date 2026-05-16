import { useState } from 'react';

const team = [
  {
    emoji: '👔',
    name: 'Andrew Frakes',
    title: 'Co-Founder & CEO',
    bio: 'Andrew spent over a decade in real estate investment and property management before founding ProLnk. After watching homeowners overpay and skilled tradespeople undercharge for years, he built the network income model that underpins the platform. He leads vision, partnerships, and go-to-market strategy.',
    quote: 'The trades built this country. It is long past time the economics reflected that.',
    bg: '#1e3a5f',
  },
  {
    emoji: '💻',
    name: 'Marcus Tran',
    title: 'Co-Founder & CTO',
    bio: 'Marcus spent eight years at Google building distributed systems and marketplace infrastructure before joining ProLnk. He architected the AI matching engine and the four-level network income calculation system. He is obsessed with platform reliability and algorithmic fairness in lead distribution.',
    quote: 'A marketplace is only as good as its matching logic. We built ours from first principles.',
    bg: '#1d4ed8',
  },
  {
    emoji: '🔧',
    name: 'Danny Castellano',
    title: 'Head of Partnerships',
    bio: 'Danny ran his own licensed plumbing and HVAC company for 15 years before transitioning to the platform side of the industry. He brings firsthand trade experience to every partnership conversation and has signed over 300 founding pros to the ProLnk network. No one speaks contractor better.',
    quote: 'I was that pro getting bad leads for years. Now I am making sure no one else has to.',
    bg: '#065f46',
  },
  {
    emoji: '📦',
    name: 'Priya Mehta',
    title: 'VP of Operations',
    bio: 'Priya spent six years in logistics at Amazon before moving into marketplace operations. She oversees onboarding, quality assurance, and the end-to-end homeowner experience. Her obsession is reducing the time from homeowner request to pro response, currently under 4 hours on the platform.',
    quote: 'Speed and trust are not opposites. We are proving they go hand in hand.',
    bg: '#7c3aed',
  },
];

export default function ProLnkFounders() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div style={{ background: '#fafaf8', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a1a' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏆</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: '#1e3a5f', marginBottom: 16 }}>
            Meet the ProLnk Team
          </h1>
          <p style={{ fontSize: 20, color: '#555', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
            Four founders with one shared belief: the home services industry deserves a better platform.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 28, marginBottom: 64 }}>
          {team.map((member, i) => (
            <div
              key={member.name}
              onClick={() => setActive(active === i ? null : i)}
              style={{
                background: '#fff',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: active === i ? '0 8px 32px rgba(0,0,0,0.14)' : '0 2px 14px rgba(0,0,0,0.07)',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
                border: active === i ? '2px solid #2563eb' : '2px solid transparent',
              }}
            >
              <div style={{ background: member.bg, padding: '32px 28px', textAlign: 'center' }}>
                <div style={{ fontSize: 56, marginBottom: 12 }}>{member.emoji}</div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>{member.name}</h2>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: 0 }}>{member.title}</p>
              </div>
              <div style={{ padding: 28 }}>
                <p style={{ fontSize: 15, color: '#444', lineHeight: 1.7, marginBottom: 16 }}>
                  {active === i ? member.bio : member.bio.slice(0, 120) + '...'}
                </p>
                <div style={{ borderLeft: '3px solid #2563eb', paddingLeft: 16 }}>
                  <p style={{ fontSize: 15, fontStyle: 'italic', color: '#1e3a5f', margin: 0, lineHeight: 1.6 }}>
                    {member.quote}
                  </p>
                </div>
                <p style={{ fontSize: 13, color: '#2563eb', marginTop: 16, fontWeight: 600 }}>
                  {active === i ? 'Click to collapse ↑' : 'Click to read full bio ↓'}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 16, padding: 48, textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🌟</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>We Are Just Getting Started</h2>
          <p style={{ fontSize: 17, opacity: 0.85, maxWidth: 540, margin: '0 auto 28px', lineHeight: 1.7 }}>
            We are a small team with a big mission. If you want to help build the future of home services, we would love to hear from you.
          </p>
          <button style={{ background: '#fff', color: '#1e3a5f', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            View Open Roles →
          </button>
        </div>

      </div>
    </div>
  );
}
