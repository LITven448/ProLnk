import { useState } from 'react';

const mistakes = [
  {
    id: 'storm-chaser',
    icon: '🌪️',
    title: 'Hiring a Storm Chaser',
    cost: 'Bad work + zero recourse',
    detail: 'After DFW hailstorms, out-of-state contractors flood neighborhoods. They rush jobs, use cheap materials, and are gone before problems appear. Your 10-year warranty is from a company that no longer exists.',
    fix: 'Only hire contractors with a permanent Texas address and verifiable local references. Check TDLR registration. If they knocked on your door right after a storm, that\’s a red flag.',
  },
  {
    id: 'aob',
    icon: '📝',
    title: 'Signing an AOB (Assignment of Benefits)',
    cost: 'Lose control of your insurance claim',
    detail: 'Assignment of Benefits transfers your insurance rights to the contractor. They fight your insurer for maximum payout — often inflating claims, triggering audits, and leaving you holding the liability if fraud is found.',
    fix: 'Never sign an AOB. You manage your own claim. Your insurer pays you, you pay your contractor. This is also required under most Texas homeowner policies.',
  },
  {
    id: 'permit',
    icon: '🏗️',
    title: 'Skipping the Permit',
    cost: 'Can\’t sell home + forced tear-off',
    detail: 'Unpermitted roofing work in DFW municipalities (Dallas, Fort Worth, Plano, Frisco) can block your home sale, trigger forced removal, and void homeowner\’s insurance on future claims.',
    fix: 'Require a permit number before work begins. Any legitimate DFW roofer pulls permits automatically. If they ask you to skip it to "save time," walk away.',
  },
  {
    id: 'cheap',
    icon: '💰',
    title: 'Choosing the Cheapest Bid',
    cost: 'Replacement in 5 years instead of 20',
    detail: 'DFW has some of the most competitive roofing prices in Texas, which means race-to-bottom bidding. Cheap bids usually mean 3-tab shingles, thin underlayment, skipped ice-and-water shield, and no workmanship warranty.',
    fix: 'Compare mid-range bids. Ask what shingle grade, underlayment, and starter strip they use. Class 4 impact-resistant shingles often pay for themselves in insurance discounts.',
  },
  {
    id: 'waiting',
    icon: '⏳',
    title: 'Waiting Too Long After Damage',
    cost: 'Mold + structural damage compounds fast',
    detail: 'DFW spring rain is relentless. A compromised roof that\’s ignored for 30 days can develop attic mold ($8,000+), wet insulation (full replacement), and rotted decking — turning a $12,000 job into a $25,000 one.',
    fix: 'Inspect your attic the day after any major storm. If you see daylight or wet insulation, call a roofer within 48 hours. Insurance adjusters also document delay as a coverage issue.',
  },
];

export default function DFWRoofingMistake2026() {
  const [active, setActive] = useState(mistakes[0].id);
  const selected = mistakes.find(m => m.id === active)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>DFW HOMEOWNER GUIDE · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Roofing Biggest Mistakes Guide 2026</h1>
        <p style={{ color: '#8FA3BF', marginBottom: 32, fontSize: 15 }}>What DFW homeowners get wrong with roofing — costly errors that follow you for years in North Texas storm country.</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          {mistakes.map(m => (
            <button key={m.id} onClick={() => setActive(m.id)} style={{ background: active === m.id ? '#F5E642′ : '#132238', color: active === m.id ? '#0A1628' : '#E8EDF5', border: ’none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}>
              {m.icon} {m.title.split(' ').slice(0, 2).join(' ')}
            </button>
          ))}
        </div>
        <div style={{ background: '#132238', borderRadius: 12, padding: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>{selected.icon}</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>{selected.title}</h2>
          <div style={{ background: '#1E3A5F', borderRadius: 6, padding: '8px 14px', display: 'inline-block', marginBottom: 16, color: '#F5E642', fontWeight: 700, fontSize: 13 }}>💰 Risk: {selected.cost}</div>
          <p style={{ color: '#C2D3E8', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{selected.detail}</p>
          <div style={{ background: '#0D1F36', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>✅ HOW TO AVOID IT</div>
            <p style={{ color: '#C2D3E8', fontSize: 14, margin: 0 }}>{selected.fix}</p>
          </div>
        </div>
        <div style={{ marginTop: 28, background: '#132238', borderRadius: 10, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 32 }}>🏠</div>
          <div>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>Get a ProLnk Charter Roofing Pro</div>
            <div style={{ color: '#8FA3BF', fontSize: 14 }}>Only local, licensed, storm-tested DFW roofers. No storm chasers. No AOB pressure.</div>
          </div>
        </div>
      </div>
    </div>
  );
}