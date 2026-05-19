import { useState } from 'react';

const journey = [
  {
    id: 'search',
    label: '🔍 Search',
    milestone: 'Find the right DFW home',
    description: 'DFW is one of the fastest-moving markets in the US. Median days on market: 18. Competition is real — but so is opportunity.',
    tips: ['Get pre-approved before you tour', 'Focus on school district + commute + neighborhood trajectory', 'In DFW: soil matters as much as location — check Blackland Prairie zones', 'Inspect thoroughly — DFW clay soil causes 80% of foundation issues'],
    prolnk: 'ProLnk can connect you with vetted home inspectors before you close — know what you’re buying.',
    next: 'Buy & Close'
  },
  {
    id: 'buy',
    label: '🏡 Buy',
    milestone: 'Close with confidence',
    description: 'Closing on a DFW home is a sprint. Between option period, inspections, title work, and repairs — 30 days flies.',
    tips: ['Option period (7–10 days): inspect everything', 'Request seller repairs or price reduction for foundation issues', 'HVAC age and condition is top 3 negotiation item in DFW', 'Read the HOA docs — some DFW HOAs are aggressive'],
    prolnk: 'ProLnk HVAC, electrical, and plumbing pros available for pre-close second opinions on inspection findings.',
    next: 'Settle In'
  },
  {
    id: 'settle',
    label: '📦 Settle',
    milestone: 'Get your home dialed in',
    description: 'First 90 days: learn your home. Every house has quirks — find them before they find you.',
    tips: ['Change all locks immediately', 'Map your shut-offs: water, gas, electric', 'Run every appliance through a full cycle', 'Test smoke/CO detectors and replace batteries', 'Note any seasonal door sticking — early clay soil sign'],
    prolnk: 'ProLnk connects new homeowners with a move-in walkthrough pro — 2 hours, full system check, peace of mind.',
    next: 'Maintain'
  },
  {
    id: 'maintain',
    label: '🔧 Maintain',
    milestone: 'Protect your investment',
    description: 'DFW homes need active maintenance. Clay soil, 100°F summers, and severe storms make neglect expensive fast.',
    tips: ['HVAC filters every 30 days in summer', 'Foundation watering May–Sept is not optional', 'Post-storm roof inspection after every hail event', 'Annual pest inspection — termites are silent and expensive'],
    prolnk: 'ProLnk’s annual maintenance plan connects you with vetted pros for every item on your list — one platform.',
    next: 'Improve'
  },
  {
    id: 'improve',
    label: '🏗️ Improve',
    milestone: 'Build equity intelligently',
    description: 'DFW appreciation averages 5–8%/yr. Smart improvements 2–3x that. Know which projects add value here specifically.',
    tips: ['Kitchen and primary bath ROI: 65–80% in DFW market', 'Adding a bedroom adds $20–40K in DFW suburbs', 'Pool: adds value in Frisco/Plano, neutral in urban Dallas', 'Energy efficiency upgrades: high value due to Texas utility costs'],
    prolnk: 'ProLnk matches you with licensed contractors for renovation work — 3 quotes, vetted pros, tracked jobs.',
    next: 'Sell'
  },
  {
    id: 'sell',
    label: '💰 Sell',
    milestone: 'Exit at maximum value',
    description: 'DFW sellers who pre-inspect and pre-fix sell 12 days faster and net 3–5% more. Preparation is profit.',
    tips: ['Pre-list inspection surfaces issues before buyers use them for leverage', 'Foundation certification adds $5–15K perceived value', 'Fresh HVAC service report is a selling point', 'First impressions: exterior paint, landscaping, front door'],
    prolnk: 'ProLnk pros handle pre-sale prep — foundation cert, HVAC service, painting, landscaping — all through one platform.',
    next: 'Repeat the journey'
  },
];

export default function DFWHomeOwnershipJourney2026() {
  const [stage, setStage] = useState('search');
  const s = journey.find(x => x.id === stage)!;
  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🗺️ DFW Homeownership Journey Map</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Select your current stage — get the guide for what comes next in DFW's dynamic housing market.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {journey.map(j => (
            <button key={j.id} onClick={() => setStage(j.id)}
              style={{ padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                background: stage === j.id ? '#F5E642' : '#1e2d45', color: stage === j.id ? '#0A1628' : '#94a3b8' }}>
              {j.label}
            </button>
          ))}
        </div>
        <div style={{ background: '#132035', borderRadius: 16, padding: '24px', marginBottom: 16 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{s.label}: {s.milestone}</h2>
          <p style={{ color: '#94a3b8', marginBottom: 20, lineHeight: 1.6 }}>{s.description}</p>
          <h3 style={{ color: '#F5E642', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>✅ What to do now</h3>
          {s.tips.map((tip, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: i < s.tips.length - 1 ? '1px solid #1e2d45' : 'none', color: '#e2e8f0', fontSize: 14 }}>
              • {tip}
            </div>
          ))}
          <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: '14px 16px' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>🔗 How ProLnk helps</div>
            <div style={{ color: '#cbd5e1', fontSize: 14 }}>{s.prolnk}</div>
          </div>
          <div style={{ marginTop: 16, color: '#64748b', fontSize: 13 }}>
            Next milestone: <span style={{ color: '#F5E642', fontWeight: 600 }}>{s.next}</span>
          </div>
        </div>
        <div style={{ background: '#F5E642', borderRadius: 12, padding: '16px 20px', color: '#0A1628' }}>
          <strong>🏠 ProLnk supports every stage of your DFW homeownership journey.</strong> One platform, vetted pros, from move-in to move-out.
        </div>
      </div>
    </div>
  );
}