import { useState } from 'react';

const markets = [
  {
    city: 'Dallas-Fort Worth',
    state: 'TX',
    status: 'LIVE NOW',
    population: '7.8M',
    reason: 'Massive contractor shortage, explosive growth, high tech adoption, perfect density for AI matching.',
    notify: 'You are already in the launch market — sign up today.',
    color: '#F5E642',
  },
  {
    city: 'Houston',
    state: 'TX',
    status: 'Q3 2026',
    population: '7.3M',
    reason: 'Second largest Texas metro, constant storm-driven repair demand, fragmented contractor market.',
    notify: 'Join the Houston waitlist to lock your founding partner rate.',
    color: '#F5E64280',
  },
  {
    city: 'Austin',
    state: 'TX',
    status: 'Q4 2026',
    population: '2.3M',
    reason: 'Fastest-growing US city, tech-savvy homeowners, premium job values, strong referral culture.',
    notify: 'Austin waitlist open — early partners get territory priority.',
    color: '#F5E64280',
  },
  {
    city: 'San Antonio',
    state: 'TX',
    status: 'Q1 2027',
    population: '2.7M',
    reason: 'Military family density drives high turnover, strong trade workforce, underserved digital platform market.',
    notify: 'Get notified when San Antonio opens — founders lock in now.',
    color: '#F5E64280',
  },
  {
    city: 'Phoenix',
    state: 'AZ',
    status: 'Q2 2027',
    population: '5.0M',
    reason: 'Sun Belt growth mirror of DFW, year-round exterior demand, high HVAC replacement volume.',
    notify: 'National expansion follows Texas — Phoenix is first out-of-state.',
    color: '#F5E64240',
  },
];

export default function ProLnkNationalExpansionPage() {
  const [selected, setSelected] = useState(0);
  const market = markets[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 3, marginBottom: 12 }}>EXPANSION ROADMAP</div>
          <h1 style={{ fontSize: 40, fontWeight: 800, margin: '0 0 16px' }}>ProLnk Is Growing Across America</h1>
          <p style={{ color: '#8899aa', fontSize: 17, maxWidth: 560, margin: '0 auto' }}>
            We started in DFW for a reason. Here is the full expansion plan — and how to get in early in your market.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
          {markets.map((m, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                background: selected === i ? '#F5E642' : '#111e35',
                color: selected === i ? '#0A1628' : '#ccc',
                border: '1px solid #1e3a5f',
                borderRadius: 8,
                padding: '10px 18px',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {m.city}
            </button>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 16, padding: 36, border: '1px solid #1e3a5f' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 800 }}>{market.city}, {market.state}</div>
              <div style={{ color: '#8899aa', marginTop: 4 }}>Metro population: {market.population}</div>
            </div>
            <div style={{ background: market.color, color: '#0A1628', borderRadius: 20, padding: '6px 16px', fontWeight: 800, fontSize: 14 }}>
              {market.status}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: '#F5E642', letterSpacing: 2, marginBottom: 8 }}>WHY THIS MARKET</div>
            <p style={{ color: '#cdd9e5', lineHeight: 1.7, margin: 0 }}>{market.reason}</p>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 12, color: '#F5E642', letterSpacing: 2, marginBottom: 8 }}>📣 HOW TO GET IN EARLY</div>
            <p style={{ color: '#fff', margin: 0, fontWeight: 600 }}>{market.notify}</p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <div style={{ color: '#8899aa', marginBottom: 20, fontSize: 15 }}>Texas-first because we build deep before going wide.</div>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
            Join Your Market Waitlist →
          </button>
        </div>
      </div>
    </div>
  );
}
