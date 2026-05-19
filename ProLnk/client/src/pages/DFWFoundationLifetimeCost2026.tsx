import { useState } from 'react';

const ageGroups = [
  {
    id: 'new',
    label: '0–10 Years Old',
    icon: '🏗️',
    watering: 3000,
    drainage: 0,
    inspections: 1200,
    repairs: 2000,
    note: 'Newer DFW homes typically have engineered foundations. Focus is on establishing good soil moisture habits early.',
    tip: 'Install a soaker hose system in year 1 ($400–800). Prevents shrink-swell cycle from starting. Cheapest decade of foundation care you\’ll ever have.',
  },
  {
    id: 'mid',
    label: '10–25 Years Old',
    icon: '🏡',
    watering: 6000,
    drainage: 5500,
    inspections: 2400,
    repairs: 8500,
    note: 'The decade where DFW foundations show their first signs of stress. This is when drainage installs pay the biggest dividend.',
    tip: 'Get a foundation inspection at year 10 and year 20. French drain installation now ($3,000–5,000) prevents $15,000+ piers later. Most DFW homeowners skip this.',
  },
  {
    id: 'older',
    label: '25–50 Years Old',
    icon: '🏘️',
    watering: 9000,
    drainage: 8000,
    inspections: 3600,
    repairs: 18000,
    note: 'Older DFW foundations have gone through dozens of drought-flood cycles. Pier and beam or slab repair is common in this range.',
    tip: 'Pier installation ($10,000–20,000) at first sign of door/window sticking is cheaper than waiting for structural damage. Most homeowners wait 2–3 years too long.',
  },
];

function fmt(n: number) { return '$' + n.toLocaleString(); }

export default function DFWFoundationLifetimeCost2026() {
  const [active, setActive] = useState(ageGroups[0].id);
  const g = ageGroups.find(a => a.id === active)!;
  const total = g.watering + g.drainage + g.inspections + g.repairs;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>DFW HOMEOWNER GUIDE · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Foundation Lifetime Care Cost Guide 2026</h1>
        <p style={{ color: '#8FA3BF', marginBottom: 16, fontSize: 15 }}>DFW sits on some of the most expansive clay soil in the country. Foundation care is not optional — it's a lifetime cost every homeowner should plan for.</p>
        <div style={{ background: '#132238', borderRadius: 8, padding: '12px 16px', marginBottom: 28, borderLeft: '4px solid #F5E642' }}>
          <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>📍 DFW Context: </span>
          <span style={{ color: '#C2D3E8', fontSize: 13 }}>DFW's black clay (Blackland Prairie) expands 30–35% when wet and shrinks dramatically in drought. This cycle — repeated for decades — is the primary driver of foundation movement in North Texas.</span>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          {ageGroups.map(g => (
            <button key={g.id} onClick={() => setActive(g.id)} style={{ background: active === g.id ? '#F5E642' : '#132238', color: active === g.id ? '#0A1628' : '#E8EDF5', border: 'none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
              {g.icon} {g.label}
            </button>
          ))}
        </div>
        <div style={{ background: '#132238', borderRadius: 12, padding: 28, marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>Cost Profile — Home Age {g.label}</h2>
          <p style={{ color: '#8FA3BF', fontSize: 14, marginBottom: 20 }}>{g.note}</p>
          {[
            { label: '💧 Foundation Watering (soaker hose + water cost)', val: g.watering, note: 'Proactive moisture maintenance over period' },
            { label: '🌊 Drainage System Installation', val: g.drainage, note: 'French drains, channel drains, grading (if needed)' },
            { label: '🔍 Professional Inspections', val: g.inspections, note: 'Every 5 years, licensed structural engineer' },
            { label: '🔩 Repair if Issues Develop', val: g.repairs, note: 'Pier installation, mudjacking, or crack repair (estimated)' },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #1E3A5F' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{row.label}</div>
                <div style={{ color: '#8FA3BF', fontSize: 12 }}>{row.note}</div>
              </div>
              <div style={{ fontWeight: 800, fontSize: 17 }}>{fmt(row.val)}</div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 0' }}>
            <div style={{ fontWeight: 800, fontSize: 17 }}>💰 Estimated Total for Period</div>
            <div style={{ fontWeight: 900, fontSize: 26, color: '#F5E642' }}>{fmt(total)}</div>
          </div>
        </div>
        <div style={{ background: '#132238', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>💡 Pro Tip for {g.label} Homes</div>
          <p style={{ color: '#C2D3E8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{g.tip}</p>
        </div>
        <div style={{ marginTop: 20, background: '#132238', borderRadius: 10, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 32 }}>🏠</div>
          <div>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>Get a DFW Foundation Inspection via ProLnk</div>
            <div style={{ color: '#8FA3BF', fontSize: 14 }}>Charter Foundation Pros — licensed structural engineers and experienced contractors who know DFW clay.</div>
          </div>
        </div>
      </div>
    </div>
  );
}