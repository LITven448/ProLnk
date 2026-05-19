import { useState } from 'react';

const brands = [
  { name: 'Rheem', hardWater: 5, fhr: 4, warranty: 4, energy: 4, parts: 5, note: 'Best hard water durability — anode rod design handles DFW lime scale well' },
  { name: 'AO Smith', hardWater: 5, fhr: 5, warranty: 4, energy: 5, parts: 5, note: 'Top first-hour rating — #1 choice for large DFW families with high demand' },
  { name: 'Bradford White', hardWater: 5, fhr: 4, warranty: 5, energy: 4, parts: 4, note: 'Made in USA, contractor-only — most DFW plumbers trust it for longevity' },
  { name: 'Navien', hardWater: 3, fhr: 5, warranty: 4, energy: 5, parts: 3, note: 'Best tankless for DFW — needs water softener due to hard water sensitivity' },
  { name: 'Rinnai', hardWater: 4, fhr: 5, warranty: 4, energy: 5, parts: 4, note: 'Premium tankless — handles DFW hard water better than Navien, higher cost' },
];

type FamilySize = 'small' | 'medium' | 'large';
type FuelType = 'gas' | 'electric';
type TankType = 'tank' | 'tankless';

const recs: Record<FamilySize, Record<FuelType, Record<TankType, string>>> = {
  small: { gas: { tank: 'Bradford White', tankless: 'Navien' }, electric: { tank: 'Rheem', tankless: 'Rinnai' } },
  medium: { gas: { tank: 'Rheem', tankless: 'Rinnai' }, electric: { tank: 'AO Smith', tankless: 'Navien' } },
  large: { gas: { tank: 'AO Smith', tankless: 'Rinnai' }, electric: { tank: 'AO Smith', tankless: 'Rinnai' } },
};

const labels: Record<string, string> = {
  hardWater: '💧 Hard Water', fhr: '🚿 First Hour Rating',
  warranty: '📄 Warranty', energy: '⚡ Energy Factor', parts: '🔧 Parts Avail.',
};

function Stars({ n }: { n: number }) {
  return <span style={{ color: '#F5E642' }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;
}

export default function DFWWaterHeaterBrandsCompared() {
  const [family, setFamily] = useState<FamilySize>('medium');
  const [fuel, setFuel] = useState<FuelType>('gas');
  const [tankType, setTankType] = useState<TankType>('tank');
  const [expanded, setExpanded] = useState<string | null>(null);
  const pick = recs[family][fuel][tankType];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🚿</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Water Heater Brands 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Rheem · AO Smith · Bradford White · Navien · Rinnai — rated for DFW hard water</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 16 }}>
            <div>
              <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 10px' }}>Family Size</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['small', 'medium', 'large'] as FamilySize[]).map(f => (
                  <button key={f} onClick={() => setFamily(f)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                      borderColor: family === f ? '#F5E642' : '#1e3a5f',
                      background: family === f ? '#F5E642' : 'transparent',
                      color: family === f ? '#0A1628' : '#94a3b8' }}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 10px' }}>Fuel Type</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['gas', 'electric'] as FuelType[]).map(f => (
                  <button key={f} onClick={() => setFuel(f)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                      borderColor: fuel === f ? '#F5E642' : '#1e3a5f',
                      background: fuel === f ? '#F5E642' : 'transparent',
                      color: fuel === f ? '#0A1628' : '#94a3b8' }}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 10px' }}>Style</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['tank', 'tankless'] as TankType[]).map(t => (
                  <button key={t} onClick={() => setTankType(t)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                      borderColor: tankType === t ? '#F5E642' : '#1e3a5f',
                      background: tankType === t ? '#F5E642' : 'transparent',
                      color: tankType === t ? '#0A1628' : '#94a3b8' }}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ padding: '14px 18px', background: '#1a3a6e', borderRadius: 10, borderLeft: '4px solid #F5E642' }}>
            <p style={{ margin: 0, color: '#F5E642', fontWeight: 700 }}>🏆 Best fit for your DFW home: {pick}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {brands.map(b => (
            <div key={b.name} onClick={() => setExpanded(expanded === b.name ? null : b.name)}
              style={{ background: '#0f2040', borderRadius: 12, padding: 20, cursor: 'pointer',
                border: b.name === pick ? '2px solid #F5E642' : '2px solid #1e3a5f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {b.name === pick && <span style={{ background: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 20 }}>TOP PICK</span>}
                  <span style={{ fontWeight: 700, fontSize: 18 }}>{b.name}</span>
                </div>
                <span style={{ color: '#94a3b8' }}>{expanded === b.name ? '▲' : '▼'}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 14 }}>
                {Object.keys(labels).map(k => (
                  <div key={k} style={{ minWidth: 120 }}>
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
          Get matched with top DFW plumbers — <span style={{ color: '#F5E642' }}>prolnk.io</span>
        </div>
      </div>
    </div>
  );
}
