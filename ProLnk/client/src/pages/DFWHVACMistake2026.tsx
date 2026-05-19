import { useState } from 'react';

const mistakes = [
  {
    id: 'tune-up',
    icon: '🔧',
    title: 'Skipping Annual Tune-Up',
    cost: 'Up to $3,000 in preventable failures',
    detail: 'DFW summers push systems to the limit. A $99 tune-up catches refrigerant leaks, dirty coils, and failing capacitors before they become a $3,000 compressor replacement in July heat.',
    fix: 'Schedule a tune-up every spring before temps hit 90°F. Ask your tech to check refrigerant levels, clean coils, and test capacitors.',
  },
  {
    id: 'replace',
    icon: '💸',
    title: 'Replacing Before Diagnosing',
    cost: '$5,000–$8,000 wasted',
    detail: 'Many DFW homeowners replace entire systems when a $150 part fix would have worked. A bad capacitor, contactor, or refrigerant charge looks like system failure but isn\’t.',
    fix: 'Always get a second opinion before replacing. A diagnostic from a ProLnk Charter Pro takes 30 minutes and costs $75–$150.',
  },
  {
    id: 'oversized',
    icon: '📐',
    title: 'Buying an Oversized System',
    cost: 'Humidity problems + early failure',
    detail: 'Bigger is not better. An oversized system short-cycles — cools too fast, shuts off, never removes DFW\’s brutal humidity. You\’re left with a cold, clammy house and a system that fails in 8 years instead of 15.',
    fix: 'Require a Manual J load calculation before any installation quote. Any pro who skips it is guessing.',
  },
  {
    id: 'warranty',
    icon: '📄',
    title: 'Not Registering the Warranty',
    cost: 'Loses 5 years of coverage',
    detail: 'Most HVAC manufacturers require registration within 60–90 days of installation for the full 10-year parts warranty. Without it, you get 5 years. That\’s thousands in unprotected exposure.',
    fix: 'Register on the manufacturer website the same week as installation. Your installer should hand you the model and serial numbers.',
  },
  {
    id: 'filter',
    icon: '🌬️',
    title: 'Ignoring the Filter for Months',
    cost: '15–25% efficiency loss',
    detail: 'A clogged filter in a DFW summer forces your system to work 25% harder. That\’s higher electric bills, faster wear, and potential coil freeze-up. Most DFW homes need filter changes every 30–45 days in peak season.',
    fix: 'Set a phone reminder for the 1st of every month. Keep a 3-pack under the HVAC closet. Takes 2 minutes.',
  },
];

export default function DFWHVACMistake2026() {
  const [active, setActive] = useState(mistakes[0].id);
  const selected = mistakes.find(m => m.id === active)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>DFW HOMEOWNER GUIDE · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW HVAC Biggest Mistakes Guide 2026</h1>
        <p style={{ color: '#8FA3BF', marginBottom: 32, fontSize: 15 }}>What DFW homeowners get wrong with HVAC — and how to avoid costly errors in North Texas heat.</p>
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
          <div style={{ background: '#1E3A5F', borderRadius: 6, padding: '8px 14px', display: 'inline-block', marginBottom: 16, color: '#F5E642', fontWeight: 700, fontSize: 13 }}>💰 Cost: {selected.cost}</div>
          <p style={{ color: '#C2D3E8', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{selected.detail}</p>
          <div style={{ background: '#0D1F36', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>✅ HOW TO AVOID IT</div>
            <p style={{ color: '#C2D3E8', fontSize: 14, margin: 0 }}>{selected.fix}</p>
          </div>
        </div>
        <div style={{ marginTop: 28, background: '#132238', borderRadius: 10, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 32 }}>🏠</div>
          <div>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>Get a ProLnk Charter HVAC Pro</div>
            <div style={{ color: '#8FA3BF', fontSize: 14 }}>Vetted, licensed, and rated by real DFW homeowners. No door-knockers. No storm chasers.</div>
          </div>
        </div>
      </div>
    </div>
  );
}