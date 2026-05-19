import { useState } from 'react';

const homeTypes = [
  { id: 'small', label: '🏠 Small DFW Home (< 1,500 sq ft)', sqft: 1200, coolingTons: 2 },
  { id: 'medium', label: '🏡 Medium DFW Home (1,500–2,500 sq ft)', sqft: 2000, coolingTons: 3.5 },
  { id: 'large', label: '🏘️ Large DFW Home (2,500–4,000 sq ft)', sqft: 3200, coolingTons: 5 },
];

const systems = [
  {
    id: 'standard_split',
    name: 'Standard Central Split (16 SEER2)',
    icon: '🏠',
    purchase: { small: 4500, medium: 6200, large: 8500 },
    install: { small: 2500, medium: 3500, large: 4800 },
    annualEnergy: { small: 1320, medium: 2100, large: 3200 },
    annualMaint: 180,
    repairs15yr: 1800,
  },
  {
    id: 'high_split',
    name: 'High-Efficiency Split (20 SEER2)',
    icon: '⭐',
    purchase: { small: 6200, medium: 8500, large: 11500 },
    install: { small: 2800, medium: 4000, large: 5500 },
    annualEnergy: { small: 1056, medium: 1680, large: 2560 },
    annualMaint: 180,
    repairs15yr: 1500,
  },
  {
    id: 'variable_split',
    name: 'Variable Speed Split (24 SEER2)',
    icon: '🚀',
    purchase: { small: 8000, medium: 11000, large: 15000 },
    install: { small: 3200, medium: 4500, large: 6200 },
    annualEnergy: { small: 880, medium: 1400, large: 2133 },
    annualMaint: 200,
    repairs15yr: 1200,
  },
  {
    id: 'minisplit',
    name: 'Inverter Mini-Split (25 SEER2)',
    icon: '🔀',
    purchase: { small: 4000, medium: 8000, large: 14000 },
    install: { small: 2500, medium: 5000, large: 9000 },
    annualEnergy: { small: 845, medium: 1344, large: 2048 },
    annualMaint: 120,
    repairs15yr: 900,
  },
  {
    id: 'dual_fuel',
    name: 'Dual-Fuel Heat Pump (18 SEER2)',
    icon: '🔥',
    purchase: { small: 7000, medium: 9500, large: 13000 },
    install: { small: 3500, medium: 4800, large: 6500 },
    annualEnergy: { small: 1100, medium: 1750, large: 2667 },
    annualMaint: 220,
    repairs15yr: 1600,
  },
];

type HomeKey = 'small' | 'medium' | 'large';

export default function DFWHVACTotalCostOwnership() {
  const [home, setHome] = useState<HomeKey | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const calcTCO = (sys: typeof systems[0], homeId: HomeKey) => {
    const purchase = sys.purchase[homeId];
    const install = sys.install[homeId];
    const energy = sys.annualEnergy[homeId] * 15;
    const maint = sys.annualMaint * 15;
    const repairs = sys.repairs15yr;
    return { total: purchase + install + energy + maint + repairs, purchase, install, energy, maint, repairs };
  };

  const results = home
    ? systems
        .filter(s => selected.length === 0 || selected.includes(s.id))
        .map(s => ({ ...s, tco: calcTCO(s, home) }))
        .sort((a, b) => a.tco.total - b.tco.total)
    : [];

  const cheapest = results[0];
  const colors = ['#F5E642', '#4ade80', '#60a5fa', '#f472b6', '#fb923c'];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>💰</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW HVAC 15-Year Total Cost of Ownership</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>The complete 15-year cost: purchase + install + energy + maintenance + repairs — which system is truly cheapest in DFW?</p>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏡 Select Your DFW Home Size</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {homeTypes.map(h => (
              <button key={h.id} onClick={() => setHome(h.id as HomeKey)} style={{ background: home === h.id ? '#F5E642′ : '#1e3a5f', color: home === h.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>{h.label}</button>
            ))}
          </div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>Compare Systems (select to filter, or see all):</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {systems.map(s => (
              <button key={s.id} onClick={() => toggle(s.id)} style={{ background: selected.includes(s.id) ? '#1e3a5f' : 'transparent', color: selected.includes(s.id) ? '#F5E642′ : '#64748b', border: `1px solid ${selected.includes(s.id) ? '#F5E642' : '#1e3a5f'}`, borderRadius: 8, padding: '7px 12px', cursor: ’pointer', fontSize: 12 }}>{s.icon} {s.name}</button>
            ))}
          </div>
        </div>

        {home && results.length > 0 && (
          <>
            {cheapest && (
              <div style={{ background: '#1a3a20', border: '2px solid #4ade80', borderRadius: 12, padding: 18, marginBottom: 20 }}>
                <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: 4 }}>🏆 Lowest 15-Year TCO for Your DFW Home</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642′ }}>{cheapest.icon} {cheapest.name}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#4ade80′ }}>${cheapest.tco.total.toLocaleString()} total over 15 years</div>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {results.map((sys, i) => (
                <div key={sys.id} style={{ background: '#111f3a', border: `2px solid ${i === 0 ? '#F5E642' : '#1e3a5f'}`, borderRadius: 12, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: i === 0 ? '#F5E642′ : '#fff' }}>{sys.icon} {sys.name}</div>
                      {i === 0 && <div style={{ fontSize: 12, color: '#4ade80', marginTop: 4 }}>✅ Best value for DFW</div>}
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: colors[i] || '#94a3b8′ }}>${sys.tco.total.toLocaleString()}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                    {[{ label: 'Equipment', value: sys.tco.purchase }, { label: 'Install', value: sys.tco.install }, { label: '15yr Energy', value: sys.tco.energy }, { label: '15yr Maint', value: sys.tco.maint }, { label: '15yr Repairs', value: sys.tco.repairs }].map(item => (
                      <div key={item.label} style={{ textAlign: 'center', background: '#0A1628', borderRadius: 8, padding: 10 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#94a3b8′ }}>${item.value.toLocaleString()}</div>
                        <div style={{ fontSize: 10, color: '#475569′ }}>{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!home && (
          <div style={{ background: '#111f3a', borderRadius: 12, padding: 32, textAlign: 'center', color: '#475569′ }}>
            Select your DFW home size above to calculate 15-year TCO for each system
          </div>
        )}

        <div style={{ marginTop: 24, background: '#111f3a', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 10 }}>📊 DFW TCO Assumptions</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0, fontSize: 13 }}>Energy costs at $0.12/kWh (DFW average) with 7-month DFW cooling season. Installation costs reflect DFW market rates. Repair estimates based on DFW service call averages. All costs in 2025 dollars — actual costs vary by utility rate changes and usage patterns.</p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: '#475569', fontSize: 12 }}>ProLnk — Connect with Verified DFW HVAC Pros</div>
      </div>
    </div>
  );
}
