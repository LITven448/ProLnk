import { useState } from 'react';

const brands = [
  { name: 'Nest Learning', savings: 5, rebate: 5, compat: 4, ease: 5, sensing: 4, note: 'Oncor rebate up to $85 — self-learning AI adapts to DFW seasonal patterns automatically' },
  { name: 'Ecobee SmartThermostat Premium', savings: 5, rebate: 5, compat: 5, ease: 4, sensing: 5, note: 'SmartSensor suite eliminates hot/cold spots — best for large DFW homes with multiple zones' },
  { name: 'Honeywell T9', savings: 4, rebate: 4, compat: 5, ease: 4, sensing: 5, note: 'Broadest HVAC compatibility — best choice for older DFW systems with proprietary wiring' },
  { name: 'Emerson Sensi', savings: 3, rebate: 4, compat: 5, ease: 5, sensing: 2, note: 'Easiest setup of any thermostat — best for DFW homeowners who want simple, reliable control' },
];

type HomeSize = 'small' | 'medium' | 'large';
type ZoneCount = 'single' | 'multi';
type TechComfort = 'low' | 'medium' | 'high';

const savingsEstimate: Record<HomeSize, Record<ZoneCount, string>> = {
  small: { single: '$180–$240/yr', multi: '$220–$280/yr' },
  medium: { single: '$280–$360/yr', multi: '$340–$440/yr' },
  large: { single: '$380–$480/yr', multi: '$480–$620/yr' },
};

const recs: Record<TechComfort, Record<ZoneCount, string>> = {
  low: { single: 'Emerson Sensi', multi: 'Nest Learning' },
  medium: { single: 'Nest Learning', multi: 'Ecobee SmartThermostat Premium' },
  high: { single: 'Ecobee SmartThermostat Premium', multi: 'Ecobee SmartThermostat Premium' },
};

const labels: Record<string, string> = {
  savings: '💰 DFW Energy Savings', rebate: '🎁 Oncor Rebate Eligible',
  compat: '🔌 HVAC Compatibility', ease: '📱 Ease of Use', sensing: '🌡️ Remote Sensing',
};

function Stars({ n }: { n: number }) {
  return <span style={{ color: '#F5E642′ }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;
}

export default function DFWSmartThermostatBrandsCompared() {
  const [homeSize, setHomeSize] = useState<HomeSize>('medium');
  const [zones, setZones] = useState<ZoneCount>('single');
  const [techComfort, setTechComfort] = useState<TechComfort>('medium');
  const [expanded, setExpanded] = useState<string | null>(null);
  const pick = recs[techComfort][zones];
  const estSavings = savingsEstimate[homeSize][zones];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Smart Thermostats Compared 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Nest · Ecobee · Honeywell T9 · Emerson Sensi — Oncor rebates included</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 16 }}>
            <div>
              <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 10px' }}>Home Size</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['small', 'medium', 'large'] as HomeSize[]).map(h => (
                  <button key={h} onClick={() => setHomeSize(h)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                      borderColor: homeSize === h ? '#F5E642′ : '#1e3a5f',
                      background: homeSize === h ? '#F5E642′ : ’transparent',
                      color: homeSize === h ? '#0A1628′ : '#94a3b8' }}>
                    {h.charAt(0).toUpperCase() + h.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 10px' }}>HVAC Zones</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['single', 'multi'] as ZoneCount[]).map(z => (
                  <button key={z} onClick={() => setZones(z)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                      borderColor: zones === z ? '#F5E642′ : '#1e3a5f',
                      background: zones === z ? '#F5E642′ : ’transparent',
                      color: zones === z ? '#0A1628′ : '#94a3b8' }}>
                    {z.charAt(0).toUpperCase() + z.slice(1)}-zone
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 10px' }}>Tech Comfort</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['low', 'medium', 'high'] as TechComfort[]).map(t => (
                  <button key={t} onClick={() => setTechComfort(t)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                      borderColor: techComfort === t ? '#F5E642′ : '#1e3a5f',
                      background: techComfort === t ? '#F5E642′ : ’transparent',
                      color: techComfort === t ? '#0A1628′ : '#94a3b8' }}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ padding: '14px 18px', background: '#1a3a6e', borderRadius: 10, borderLeft: '4px solid #F5E642′ }}>
            <p style={{ margin: 0, color: '#F5E642', fontWeight: 700 }}>🏆 Best thermostat for your DFW home: {pick}</p>
            <p style={{ margin: '8px 0 0', color: '#94a3b8', fontSize: 14 }}>⚡ Estimated DFW annual savings: <strong style={{ color: '#F5E642′ }}>{estSavings}</strong> (vs. non-smart thermostat)</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {brands.map(b => (
            <div key={b.name} onClick={() => setExpanded(expanded === b.name ? null : b.name)}
              style={{ background: '#0f2040', borderRadius: 12, padding: 20, cursor: 'pointer',
                border: b.name === pick ? '2px solid #F5E642′ : '2px solid #1e3a5f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {b.name === pick && <span style={{ background: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 20 }}>TOP PICK</span>}
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{b.name}</span>
                </div>
                <span style={{ color: '#94a3b8′ }}>{expanded === b.name ? '▲' : '▼'}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 14 }}>
                {Object.keys(labels).map(k => (
                  <div key={k} style={{ minWidth: 130 }}>
                    <div style={{ color: '#64748b', fontSize: 11, marginBottom: 3 }}>{labels[k]}</div>
                    <Stars n={(b as any)[k]} />
                  </div>
                ))}
              </div>
              {expanded === b.name && (
                <div style={{ marginTop: 14, padding: '12px 16px', background: '#1a3a6e', borderRadius: 8 }}>
                  <p style={{ margin: 0, color: '#cbd5e1', fontSize: 14 }}>💡 {b.note}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 28, textAlign: 'center', color: '#475569', fontSize: 13 }}>
          Get matched with top DFW HVAC & smart home installers — <span style={{ color: '#F5E642′ }}>prolnk.io</span>
        </div>
      </div>
    </div>
  );
}
