import { useState } from 'react';

const materials = [
  {
    id: 'shingle3tab',
    label: '3-Tab Shingles',
    icon: '🔳',
    lifespan: 15,
    install: 10000,
    replacements: 3,
    maintenance50: 4500,
    insuranceSavings: 0,
    note: 'Cheapest upfront, most expensive over 50 years. Fails more frequently in DFW hail events. Most insurers won\'t add discounts.',
  },
  {
    id: 'architectural',
    label: 'Architectural Shingles',
    icon: '🏠',
    lifespan: 25,
    install: 14000,
    replacements: 2,
    maintenance50: 3500,
    insuranceSavings: 1000,
    note: 'The DFW standard. 25-year warranty, handles moderate hail, qualifies for some insurance discounts. Two replacements over 50 years is the realistic expectation.',
  },
  {
    id: 'class4',
    label: 'Class 4 Impact Resistant',
    icon: '🛡️',
    lifespan: 30,
    install: 18000,
    replacements: 1.5,
    maintenance50: 2800,
    insuranceSavings: 9000,
    note: 'Game changer in DFW hail country. Class 4 rating triggers 20–35% insurance discounts in most Texas counties. Over 50 years, often the cheapest option including insurance savings.',
  },
  {
    id: 'metal',
    label: 'Standing Seam Metal',
    icon: '⚙️',
    lifespan: 50,
    install: 36000,
    replacements: 1,
    maintenance50: 1500,
    insuranceSavings: 12000,
    note: 'Highest upfront, lowest 50-year cost. One installation for life, maximum insurance savings, and withstands DFW storms that destroy shingles. The long-game choice.',
  },
];

function fmt(n: number) { return '$' + n.toLocaleString(); }

export default function DFWRoofingLifetimeCost2026() {
  const [active, setActive] = useState(materials[0].id);
  const m = materials.find(x => x.id === active)!;
  const totalInstall = Math.round(m.install * m.replacements);
  const gross = totalInstall + m.maintenance50;
  const net = gross - m.insuranceSavings;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 14px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 16, letterSpacing: 1 }}>DFW HOMEOWNER GUIDE · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Roofing Lifetime Cost Analysis 2026</h1>
        <p style={{ color: '#8FA3BF', marginBottom: 16, fontSize: 15 }}>50-year total cost of roofing ownership in DFW — the cheapest shingle today is rarely the cheapest roof over your lifetime.</p>
        <div style={{ background: '#132238', borderRadius: 8, padding: '12px 16px', marginBottom: 28, borderLeft: '4px solid #F5E642' }}>
          <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>📍 DFW Context: </span>
          <span style={{ color: '#C2D3E8', fontSize: 13 }}>North Texas averages 8–12 significant hail events per year. DFW homeowners replace roofs 40–60% more frequently than the national average. Material choice here has outsized impact.</span>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          {materials.map(x => (
            <button key={x.id} onClick={() => setActive(x.id)} style={{ background: active === x.id ? '#F5E642' : '#132238', color: active === x.id ? '#0A1628' : '#E8EDF5', border: 'none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
              {x.icon} {x.label}
            </button>
          ))}
        </div>
        <div style={{ background: '#132238', borderRadius: 12, padding: 28, marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>50-Year Cost — {m.label}</h2>
          <p style={{ color: '#8FA3BF', fontSize: 14, marginBottom: 20 }}>{m.note}</p>
          {[
            { label: `🏷️ Installation Cost (×${m.replacements} over 50 yrs)`, val: totalInstall, note: `${fmt(m.install)} per installation, ${m.lifespan}-year lifespan` },
            { label: '🔧 Maintenance (50 yrs)', val: m.maintenance50, note: 'Inspections, minor repairs, caulking, flashing' },
            { label: '💰 Insurance Savings (50 yrs)', val: -m.insuranceSavings, note: m.insuranceSavings > 0 ? 'Estimated premium discount over 50 years' : 'No material-based discount applicable' },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #1E3A5F' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{row.label}</div>
                <div style={{ color: '#8FA3BF', fontSize: 12 }}>{row.note}</div>
              </div>
              <div style={{ fontWeight: 800, fontSize: 17, color: row.val < 0 ? '#4ADE80' : '#E8EDF5' }}>{row.val < 0 ? '-' + fmt(-row.val) : fmt(row.val)}</div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 0' }}>
            <div style={{ fontWeight: 800, fontSize: 17 }}>💰 Net 50-Year Cost</div>
            <div style={{ fontWeight: 900, fontSize: 26, color: '#F5E642' }}>{fmt(net)}</div>
          </div>
        </div>
        <div style={{ background: '#132238', borderRadius: 10, padding: 20 }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>📊 DFW Ranking by 50-Year Net Cost</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[...materials].map(x => {
              const xNet = Math.round(x.install * x.replacements) + x.maintenance50 - x.insuranceSavings;
              return (
                <div key={x.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: x.id === active ? '#1E3A5F' : '#0D1F36', borderRadius: 6 }}>
                  <span style={{ fontSize: 14 }}>{x.icon} {x.label}</span>
                  <span style={{ fontWeight: 700, color: x.id === active ? '#F5E642' : '#C2D3E8' }}>{fmt(xNet)}</span>
                </div>
              );
            }).sort((a, b) => 0)}
          </div>
        </div>
        <div style={{ marginTop: 20, background: '#132238', borderRadius: 10, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 32 }}>🏠</div>
          <div>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>Get Your DFW Roofing Quote via ProLnk</div>
            <div style={{ color: '#8FA3BF', fontSize: 14 }}>Charter Roofing Pros explain total cost of ownership — not just today's invoice.</div>
          </div>
        </div>
      </div>
    </div>
  );
}