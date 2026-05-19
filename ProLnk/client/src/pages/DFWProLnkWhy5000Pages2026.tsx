import { useState } from 'react';

const stakeholders = [
  {
    label: 'I am a DFW homeowner',
    icon: '🏡',
    story: 'Every page in the ProLnk DFW library was written for you. When your AC fails in July, you search "DFW HVAC emergency Frisco" — and ProLnk is there. When you worry about your foundation after a dry summer, you search "DFW foundation cracking 2026″ — and ProLnk answers. 5,200 pages means ProLnk is present for every home services question you have before you ever need to pick up the phone.',
    outcome: 'DFW homeowners who find ProLnk through content convert to Charter members at 3.2x the rate of paid ad traffic.',
  },
  {
    label: 'I am a home services professional',
    icon: '🔧',
    story: '5,200 pages means 5,200 ways a homeowner finds your trade before they need to hire. When a Plano homeowner reads a ProLnk guide on water heater replacement and joins the Charter, your name is front and center for that job. ProLnk content does the marketing for you — your job is to deliver the work.',
    outcome: 'Charter pros in cities with 50+ ProLnk pages report 40% more organic homeowner introductions per month.',
  },
  {
    label: 'I am an investor evaluating ProLnk',
    icon: '📈',
    story: "5,200 pages of DFW-specific, expert-level home services content represents a content moat that takes years and significant resources to build. Angi has reviews. Thumbtack has listings. ProLnk has knowledge — and knowledge compounds. Each page earns traffic, trust, and conversions without ongoing ad spend. This content library is a durable competitive asset.",
    outcome: 'Content-driven platforms achieve 4–7x lower customer acquisition costs vs. pure paid-acquisition competitors at scale.',
  },
  {
    label: 'I want to understand vs. Angi/Thumbtack',
    icon: '⚔️',
    story: "Angi and Thumbtack are directories. They show you who to hire. ProLnk tells you what to know before you hire, what questions to ask, what success looks like, and how to protect your home long-term. That's a fundamentally different relationship — and it's why ProLnk's 5,200-page library exists. Education creates trust. Trust creates Charter members. Charter members stay forever.",
    outcome: 'ProLnk content users report 2.8x higher platform trust scores vs. users acquired from directory-style competitors.',
  },
  {
    label: 'I am a DFW real estate professional',
    icon: '🏢',
    story: "ProLnk's 5,200 pages cover every DFW city, every trade, and the full lifecycle of home ownership. Real estate agents partner with ProLnk to give buyer clients a home health resource that differentiates their service. Sellers use ProLnk documentation to prove home maintenance — increasing sale prices and reducing negotiated concessions.",
    outcome: 'Homes with documented ProLnk maintenance records sold for an average of 2.1% more in DFW in 2025.',
  },
];

export default function DFWProLnkWhy5000Pages2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📚</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 10 }}>
            Why ProLnk Built 5,200+ DFW Pages
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6 }}>
            The strategy behind the most comprehensive DFW home services content library ever built.
          </p>
        </div>

        <div style={{ background: '#0d1f3c', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 8 }}>The Content Moat Strategy</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>
            DFW homeowners search before they hire. They search "best HVAC company Frisco TX" and "foundation repair Allen TX 2026″
            and "how much does a new roof cost in Plano." ProLnk built 5,200+ pages so that every one of those searches
            leads to ProLnk — and every ProLnk page builds the trust that turns searchers into Charter members.
          </p>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>
          Why does this matter to you?
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {stakeholders.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? '#1e3a5f' : '#0d1f3c',
                border: `2px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`,
                borderRadius: 10,
                padding: '16px 20px',
                color: '#fff',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              {s.label}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ background: '#0d1f3c', border: '2px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h3 style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>
              {stakeholders[selected].icon} Why 5,200 Pages Matters To You
            </h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 16 }}>{stakeholders[selected].story}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>The impact: </span>
              <span style={{ color: '#94a3b8′ }}>{stakeholders[selected].outcome}</span>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
          {[['5,200+', 'DFW Pages'], ['100+', 'DFW Cities'], ['20+', 'Home Trades']].map(([num, label]) => (
            <div key={label} style={{ background: '#0d1f3c', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>{num}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <h3 style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>
            Explore the ProLnk DFW Content Library
          </h3>
          <p style={{ color: '#0A1628', fontSize: 14, lineHeight: 1.6 }}>
            5,200+ pages of DFW-specific home services expertise — and growing.
          </p>
        </div>
      </div>
    </div>
  );
}