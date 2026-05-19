import { useState } from 'react';

const repairs = [
  {
    id: 'caulk',
    name: 'Re-Caulk Bathroom Tub/Shower',
    savings: '$150',
    time: '2 hrs',
    tools: ['Utility knife', 'Caulk gun', 'Silicone caulk (mold-resistant)', 'Painters tape', 'Paper towels'],
    steps: [
      '🔪 Score and peel out all old caulk with a utility knife — get every piece',
      '🧼 Clean the joint with rubbing alcohol and let dry completely (30 min minimum)',
      '🎨 Apply painters tape 1/8" on each side of the joint for a clean line',
      '🔧 Load caulk gun, cut tip at 45° angle to match joint width',
      '💧 Run a smooth bead along the full joint without stopping',
      '🫦 Wet your finger and smooth the bead in one continuous pass',
      '🎨 Remove tape immediately before caulk skins over',
      '⏳ Wait 24 hours before getting wet — DFW humidity can slow cure time',
    ],
  },
  {
    id: 'outlet',
    name: 'Replace Outlet or Switch Cover',
    savings: '$75',
    time: '10 min',
    tools: ['Flathead screwdriver', 'New cover plate ($2-4 at hardware store)'],
    steps: [
      '🔌 Turn off the circuit breaker for that room (covers only — no wiring)',
      '🪛 Remove the center screw holding the old cover plate',
      '🗑️ Pull off the old cover — note if it’s a 1-gang, 2-gang, or specialty size',
      '🛍️ Buy the matching size — standard, Decora, or round cover',
      '📐 Align the new cover over the outlet/switch',
      '🔩 Tighten the center screw — snug but not so tight it cracks the plate',
      '⚡ Turn the breaker back on and test',
    ],
  },
  {
    id: 'drywall',
    name: 'Patch Small Drywall Hole (<3")',
    savings: '$200',
    time: '3 hrs (includes dry time)',
    tools: ['Drywall patch kit or mesh tape', 'Joint compound', 'Putty knife', 'Sandpaper (120 + 220 grit)', 'Primer + matching paint'],
    steps: [
      '🧹 Clean loose debris from hole edges — remove any paper that’s peeling',
      '🕸️ Apply self-adhesive mesh patch over the hole, centered',
      '🖼️ Spread joint compound over mesh with putty knife — feather edges wide',
      '⏳ Let dry 4-6 hours (DFW humidity: add 1-2 hours in summer)',
      '📄 Sand smooth with 120 grit, then 220 grit — no ridges',
      '🔁 Apply second thin coat, feather even wider, dry again',
      '🎨 Prime before painting — unpainted joint compound soaks paint and shows',
      '🖌️ Paint with matching color — two coats for best blend',
    ],
  },
  {
    id: 'aerator',
    name: 'Replace Faucet Aerator',
    savings: '$95',
    time: '15 min',
    tools: ['Adjustable pliers', 'Cloth (to protect finish)', 'New aerator ($4-8)'],
    steps: [
      '💧 Turn on faucet to confirm low flow or spray — aerator is likely clogged',
      '🔧 Wrap pliers jaw with cloth to protect chrome finish',
      '↩️ Turn aerator counterclockwise (lefty loosey) — they hand-tighten usually',
      '🔍 Note the aerator size (standard 15/16" or junior 13/16")',
      '🛍️ Buy matching replacement — bring the old one to the hardware store',
      '🔩 Hand-thread new aerator clockwise until snug, then 1/4 turn with pliers',
      '💦 Run water and check for leaks around threads',
    ],
  },
  {
    id: 'toilet',
    name: 'Fix Running Toilet (Flapper)',
    savings: '$150',
    time: '20 min',
    tools: ['New flapper ($5-10)', 'Your hands — no tools needed'],
    steps: [
      '🚽 Lift tank lid — set aside safely',
      '🔍 Confirm flapper is the culprit: put food coloring in tank, if bowl turns color, flapper leaks',
      '💧 Turn off water supply valve (behind toilet, turn clockwise)',
      '🚿 Flush to empty tank',
      '↩️ Unhook flapper ears from flush valve pegs and detach chain from handle arm',
      '🛍️ Buy matching flapper — bring old one or note toilet brand (Kohler, American Standard)',
      '🔗 Hook new flapper ears on pegs, attach chain with 1/2" of slack',
      '💧 Turn water back on, let tank fill, flush and confirm no running',
    ],
  },
];

export default function DFWSmallRepairsGuide() {
  const [selected, setSelected] = useState(repairs[0].id);

  const repair = repairs.find(r => r.id === selected) || repairs[0];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40 }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DFW DIY Repairs That Save Real Money</h1>
          <p style={{ color: '#8B9BB4', fontSize: 15 }}>No license required. Each repair saves a $75–200 service call fee.</p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {repairs.map(r => (
            <button key={r.id} onClick={() => setSelected(r.id)} style={{ padding: '9px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, background: selected === r.id ? '#F5E642' : '#111E35', color: selected === r.id ? '#0A1628' : '#8B9BB4' }}>{r.name}</button>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
            <span style={{ background: '#0A1628', padding: '6px 14px', borderRadius: 8, fontSize: 13 }}>💰 Saves {repair.savings}</span>
            <span style={{ background: '#0A1628', padding: '6px 14px', borderRadius: 8, fontSize: 13 }}>⏱ {repair.time}</span>
          </div>
          <h2 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, marginBottom: 10 }}>🛠️ Tools Needed</h2>
          <ul style={{ margin: '0 0 20px', paddingLeft: 20 }}>
            {repair.tools.map(t => <li key={t} style={{ fontSize: 14, color: '#8B9BB4', marginBottom: 6 }}>{t}</li>)}
          </ul>
          <h2 style={{ color: '#F5E642', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>📋 Step-by-Step</h2>
          {repair.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #1A2E4A', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, flexShrink: 0, minWidth: 24 }}>{i + 1}.</span>
              <span style={{ fontSize: 14, color: '#E8EAF0', lineHeight: 1.5 }}>{step}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#8B9BB4', fontSize: 13, margin: 0 }}>If a repair reveals a bigger problem — or you'd rather hand it off — <span style={{ color: '#F5E642', fontWeight: 600 }}>ProLnk matches you with vetted DFW pros. Free for homeowners.</span></p>
        </div>
      </div>
    </div>
  );
}
