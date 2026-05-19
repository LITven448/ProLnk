import { useState } from 'react';

const homeTypes = [
  { label: 'Single Story (<2,000 sqft)', icon: '🏡', tips: ['Programmable thermostat: 78°F when home, 85°F when away saves ~15% on bill', 'Ceiling fans counterclockwise in summer — feels 4° cooler (raise thermostat 4°)', 'West-facing blinds closed 2-6pm blocks 74% of solar heat gain', 'Seal attic hatch with foam tape — massive air leak most owners ignore', 'Cook outside or use microwave/air fryer — oven adds 3-5° to kitchen temp'] },
  { label: 'Two Story (2,000-3,500 sqft)', icon: '🏘️', tips: ['Zone cooling if possible — upstairs often 8-10° hotter in DFW summers', 'Run ceiling fans in unoccupied rooms off — they cool people not spaces', 'Close supply vents in unused rooms partially (not fully — causes pressure issues)', 'Attic insulation R-38 minimum for DFW climate — upgrade if under R-30', 'Duct leakage test: DFW homes average 20-30% duct loss — major savings if sealed'] },
  { label: 'Large Home (3,500+ sqft)', icon: '🏰', tips: ['Two-stage or variable speed compressor cuts cooling cost 30-40% vs single-stage', 'Smart zoning system with multiple thermostats: $800-1,500 installed, 25% savings', 'Radiant barrier in attic reduces heat gain 5-10°F in DFW peak summer', 'Whole-home energy audit ($200-400) typically identifies $800+/yr in savings', 'Consider solar shades on all south/west windows — reduces heat gain 50-80%'] },
  { label: 'Townhome/Condo', icon: '🏙️', tips: ['Shared walls reduce your cooling load — adjacent unit temp matters', 'Request HVAC maintenance records from HOA — shared systems affect your unit', 'Check air handler filter monthly in DFW summer — clogs fast in high pollen/dust', 'Weatherstrip your front door — most condos have poor door seals', 'Portable units as supplement: useful for home office during peak hours'] },
  { label: 'Older Home (pre-2000)', icon: '🏚️', tips: ['Duct sealing is #1 ROI upgrade — older homes average 30-40% duct loss', 'Add attic insulation to R-38 — most pre-2000 DFW homes have R-19 or less', 'Replace window AC units with mini-splits — 3x more efficient and cool/heat', 'Check crawl space vapor barrier — moisture intrusion raises cooling load', 'Seal electrical outlet boxes on exterior walls — hidden air infiltration source'] },
];

export default function DFWSummerCoolingCostGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>☀️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Summer Cooling Cost Reduction Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>10 proven strategies to cut your DFW cooling bill — without replacing your system</p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 28, borderLeft: '4px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 12 }}>🌡️ The DFW Summer Reality</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>
            DFW averages <strong style={{ color: '#F5E642′ }}>107 days above 90°F</strong> with a record-breaking 2024 summer hitting 100°F for 42 consecutive days. Average DFW homeowner pays <strong style={{ color: '#F5E642' }}>$280-400/month</strong> in electricity June–September. Most of these costs are avoidable with behavior + low-cost upgrades — no new HVAC required.
          </p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 12 }}>🔧 The Top 3 Highest-ROI Upgrades</h2>
          <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
            <li><strong style={{ color: '#F5E642′ }}>Duct sealing</strong> — $400-800, saves $300-600/year in DFW</li>
            <li><strong style={{ color: '#F5E642′ }}>Attic insulation upgrade</strong> — $1,200-2,500, saves $400-700/year</li>
            <li><strong style={{ color: '#F5E642′ }}>Smart thermostat</strong> — $150-300, saves $150-200/year on average</li>
          </ul>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>🎯 Your Home Type → Priority Reduction List</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {homeTypes.map((h, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642′ : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                {h.icon} {h.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: '#0F2140', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12 }}>{homeTypes[selected].icon} {homeTypes[selected].label} — Top Savings Actions</h3>
              <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 18 }}>
                {homeTypes[selected].tips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center', marginTop: 32 }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>❄️ ProLnk HVAC & Insulation Pros</p>
          <p style={{ color: '#0A1628', fontSize: 13 }}>Get quotes from DFW-vetted duct sealing, insulation, and HVAC efficiency specialists. Join the ProLnk waitlist.</p>
        </div>
      </div>
    </div>
  );
}