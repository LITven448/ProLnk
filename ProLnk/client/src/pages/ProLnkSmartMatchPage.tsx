import { useState } from 'react';

const signals = [
  { icon: '⚡', label: 'Urgency Score', desc: 'Emergency vs. scheduled. Same-day HVAC failure is routed instantly; planned remodels get 24hr matching.' },
  { icon: '📍', label: 'Location & Coverage', desc: 'Partners only see jobs inside their service radius. No wasted bids, no long-distance surprises.' },
  { icon: '🟢', label: 'Real-Time Availability', desc: 'Partner calendars synced. Only available contractors receive the match request.' },
  { icon: '⭐', label: 'Rating & History', desc: 'Partners with higher ratings and lower callback rates rank higher in match queue.' },
  { icon: '🌡', label: 'DFW Market Conditions', desc: 'Seasonal demand surges (summer HVAC, winter plumbing) trigger wider radius matching to maintain coverage.' },
  { icon: '🏷', label: 'Job Type Fit', desc: 'Trade, scope, and required license are matched exactly. No plumber gets sent to an electrical job.' },
];

const jobScenarios = [
  {
    label: 'Burst pipe at 11pm',
    trade: 'Plumbing',
    urgency: 'Emergency',
    response: 'Under 30 min',
    process: 'Smart Match flags as P1 emergency. Filters to licensed plumbers within 10 miles currently available. Sends push alert. First to accept gets the job. Homeowner notified within 4 minutes.',
    quotes: '1 immediate assignment (no bidding for emergencies)',
  },
  {
    label: 'Kitchen remodel quote',
    trade: 'General Contractor',
    urgency: 'Planned',
    response: '24–48 hrs',
    process: 'Smart Match identifies top-rated GCs in the area with kitchen remodel experience. Sends structured RFQ to 3 contractors. Homeowner compares quotes side-by-side.',
    quotes: '3 competitive quotes',
  },
  {
    label: 'AC not cooling in July',
    trade: 'HVAC',
    urgency: 'High',
    response: 'Under 2 hrs',
    process: 'DFW summer surge detected. Radius expanded from 10 to 20 miles automatically. Available HVAC techs ranked by rating and response time. Top 3 notified simultaneously.',
    quotes: 'Up to 3 quotes, fastest responder wins',
  },
];

export default function ProLnkSmartMatchPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🧠</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>Smart Match Technology</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, maxWidth: 580, margin: '0 auto' }}>
            Not a search engine. Not a directory. An AI system that reads the job, reads the market, and finds the right contractor — automatically.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 18, marginBottom: 52 }}>
          {signals.map((s, i) => (
            <div key={i} style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#F5E642', marginBottom: 6 }}>{s.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>See Smart Match in action</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Pick a job scenario to see exactly how the system responds.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {jobScenarios.map((j, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{
                padding: '10px 18px', borderRadius: 8, border: selected === i ? '2px solid #F5E642′ : '1px solid #1e3a5f',
                background: selected === i ? '#F5E642′ : '#0A1628', color: selected === i ? '#0A1628' : '#fff',
                cursor: 'pointer', fontWeight: 600, fontSize: 13,
              }}>{j.label}</button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: '#0A1628', border: '1px solid #F5E642', borderRadius: 12, padding: 22 }}>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 14 }}>
                <span style={{ background: '#1e3a5f', borderRadius: 6, padding: '4px 12px', fontSize: 12, color: '#94a3b8′ }}>🔨 {jobScenarios[selected].trade}</span>
                <span style={{ background: '#1e3a5f', borderRadius: 6, padding: '4px 12px', fontSize: 12, color: '#94a3b8′ }}>⚡ {jobScenarios[selected].urgency}</span>
                <span style={{ background: '#1e3a5f', borderRadius: 6, padding: '4px 12px', fontSize: 12, color: '#F5E642′ }}>⏱ Response: {jobScenarios[selected].response}</span>
              </div>
              <div style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.8, marginBottom: 12 }}>{jobScenarios[selected].process}</div>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600 }}>📋 {jobScenarios[selected].quotes}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
