import { useState } from 'react';

const needs = [
  { label: 'Track maintenance & warranties', icon: '🗂️', app: 'HomeZada', link: 'homezada.com', cost: 'Free / $9.99/mo', desc: 'Home inventory, maintenance calendar, warranty storage — best for DFW homeowners tracking major systems', prolnk: 'Use HomeZada to log your HVAC/plumbing age, then ProLnk matches you with the right tech when service is due' },
  { label: 'One-off repair or handyman job', icon: '🔨', app: 'Thumbtack', link: 'thumbtack.com', cost: 'Free (pros pay per lead)', desc: 'Good for one-time projects — electricians, painters, furniture assembly', prolnk: 'ProLnk is better for recurring home service needs — vetted local pros, not race-to-bottom bidding' },
  { label: 'Find a vetted local pro', icon: '⭐', app: 'ProLnk', link: 'prolnk.io', cost: 'Free for homeowners', desc: 'DFW-focused, vetted & insured local service pros — matched to your specific need', prolnk: 'ProLnk is built for DFW — local pros you can trust, matched by trade and service area' },
  { label: 'Track appliance warranties', icon: '📋', app: 'Hatch', link: 'hatchwarranty.com', cost: 'Free', desc: 'Stores appliance manuals, purchase dates, warranty terms — alerts before coverage expires', prolnk: 'When your Hatch warranty expires, ProLnk connects you with service pros before the breakdown happens' },
  { label: 'Smart home control hub', icon: '🤖', app: 'Google Home / Apple Home', link: 'home.google.com', cost: 'Free (device cost)', desc: 'Central control for smart devices — Matter-compatible hubs are the 2026 standard', prolnk: 'ProLnk certified smart home installers set up your hub ecosystem right the first time' },
  { label: 'Home value & neighborhood data', icon: '📊', app: 'Zillow / Redfin', link: 'zillow.com', cost: 'Free', desc: 'DFW home values, recent sales comps, neighborhood trends — useful before major renovation decisions', prolnk: 'ProLnk helps you invest in the right improvements based on your home value and neighborhood comps' },
];

export default function DFWHomeAppGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const rec = selected !== null ? needs[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 40 }}>📱</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '8px 0 4px' }}>DFW Home Management App Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>The best apps for DFW homeowners — and where ProLnk fits in</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 24 }}>
          {[
            { app: '🗂️ HomeZada', use: 'Maintenance tracking' },
            { app: '🔨 Thumbtack', use: 'One-off jobs' },
            { app: '⭐ ProLnk', use: 'Vetted local pros' },
            { app: '📋 Hatch', use: 'Warranty tracking' },
          ].map(a => (
            <div key={a.app} style={{ background: '#112240', borderRadius: 10, padding: 14 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 14 }}>{a.app}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{a.use}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🎯 What do you need help with?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {needs.map((n, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? '#F5E642′ : '#1e3a5f', color: selected === i ? '#0A1628' : '#e2e8f0', border: ’none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {n.icon} {n.label}
              </button>
            ))}
          </div>
          {rec && (
            <div style={{ marginTop: 14, background: '#0A1628', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{rec.icon} {rec.app}</span>
                <span style={{ background: '#1e3a5f', color: '#22c55e', borderRadius: 6, padding: '2px 8px', fontSize: 12, fontWeight: 600 }}>{rec.cost}</span>
              </div>
              <div style={{ fontSize: 13, color: '#cbd5e1', marginBottom: 8 }}>{rec.desc}</div>
              <div style={{ background: '#112240', borderRadius: 8, padding: 10 }}>
                <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>🔗 ProLnk connection:</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{rec.prolnk}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 15, marginBottom: 10 }}>🏆 The ProLnk Difference in DFW</h2>
          <ul style={{ paddingLeft: 18, margin: 0, color: '#cbd5e1', fontSize: 14, lineHeight: 1.8 }}>
            <li>Pros are vetted, licensed & insured — not anonymous bidders</li>
            <li>DFW-local focus — pros who know North Texas homes & codes</li>
            <li>Transparent pricing — no surprise markups</li>
            <li>AI matching — paired to your trade, location & timing</li>
          </ul>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 20, marginBottom: 6 }}>🔗</div>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>Join the ProLnk waitlist — DFW's vetted local pro network</div>
          <div style={{ color: '#1a2f4a', fontSize: 13, marginTop: 4 }}>prolnk.io — free for homeowners, launching soon</div>
        </div>
      </div>
    </div>
  );
}
