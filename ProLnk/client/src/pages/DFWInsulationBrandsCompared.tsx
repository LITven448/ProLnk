import { useState } from 'react';

const brands = [
  { name: 'Owens Corning Fiberglass Batt', heat: 4, moisture: 3, sound: 3, price: 5, note: 'EcoTouch batts — easiest DIY install, most affordable for DFW attics' },
  { name: 'Johns Manville Fiberglass', heat: 4, moisture: 3, sound: 3, price: 5, note: 'Climate Pro blown-in — great for irregular DFW attic joists, fast install' },
  { name: 'Rockwool (Mineral Wool)', heat: 5, moisture: 5, sound: 5, price: 3, note: 'Best overall for DFW — fire resistant, moisture-proof, superior sound control' },
  { name: 'CertainTeed Fiberglass', heat: 4, moisture: 3, sound: 3, price: 4, note: 'InsulSafe blown-in — high R-value per inch, great for DFW attic top-ups' },
  { name: 'Spray Foam (Open Cell)', heat: 5, moisture: 4, sound: 5, price: 2, note: 'Best air sealing in DFW — eliminates infiltration but requires pro install' },
];

type AtticType = 'vented' | 'unvented' | 'cathedral';
type PrimaryConcern = 'heat' | 'sound' | 'moisture';

const recs: Record<AtticType, Record<PrimaryConcern, string>> = {
  vented: { heat: 'Owens Corning Fiberglass Batt', sound: 'Rockwool (Mineral Wool)', moisture: 'Rockwool (Mineral Wool)' },
  unvented: { heat: 'Spray Foam (Open Cell)', sound: 'Spray Foam (Open Cell)', moisture: 'Spray Foam (Open Cell)' },
  cathedral: { heat: 'Spray Foam (Open Cell)', sound: 'Rockwool (Mineral Wool)', moisture: 'Spray Foam (Open Cell)' },
};

const atticNote: Record<AtticType, string> = {
  vented: '🏠 Vented attics: standard DFW construction — blown-in or batt insulation on attic floor',
  unvented: '🔒 Unvented attics: conditioned space — spray foam on rafters is standard practice',
  cathedral: '⛪ Cathedral ceilings: limited rafter depth — spray foam maximizes R-value per inch',
};

const labels: Record<string, string> = {
  heat: '☀️ Heat Resistance', moisture: '💧 Moisture Control',
  sound: '🔇 Sound Control', price: '💰 Value per R',
};

function Stars({ n }: { n: number }) {
  return <span style={{ color: '#F5E642' }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;
}

export default function DFWInsulationBrandsCompared() {
  const [atticType, setAtticType] = useState<AtticType>('vented');
  const [concern, setConcern] = useState<PrimaryConcern>('heat');
  const [expanded, setExpanded] = useState<string | null>(null);
  const pick = recs[atticType][concern];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🏚️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Attic Insulation Compared 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>OC Fiberglass · Johns Manville · Rockwool · CertainTeed · Spray Foam</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 16 }}>
            <div>
              <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 10px' }}>Attic Type</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['vented', 'unvented', 'cathedral'] as AtticType[]).map(a => (
                  <button key={a} onClick={() => setAtticType(a)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                      borderColor: atticType === a ? '#F5E642' : '#1e3a5f',
                      background: atticType === a ? '#F5E642' : 'transparent',
                      color: atticType === a ? '#0A1628' : '#94a3b8' }}>
                    {a.charAt(0).toUpperCase() + a.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 10px' }}>Primary Concern</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['heat', 'sound', 'moisture'] as PrimaryConcern[]).map(c => (
                  <button key={c} onClick={() => setConcern(c)}
                    style={{ padding: '8px 14px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                      borderColor: concern === c ? '#F5E642' : '#1e3a5f',
                      background: concern === c ? '#F5E642' : 'transparent',
                      color: concern === c ? '#0A1628' : '#94a3b8' }}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ padding: '14px 18px', background: '#1a3a6e', borderRadius: 10, borderLeft: '4px solid #F5E642', marginBottom: 10 }}>
            <p style={{ margin: 0, color: '#F5E642', fontWeight: 700 }}>🏆 Best material for your DFW attic: {pick}</p>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: '8px 0 0' }}>{atticNote[atticType]}</p>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {brands.map(b => (
            <div key={b.name} onClick={() => setExpanded(expanded === b.name ? null : b.name)}
              style={{ background: '#0f2040', borderRadius: 12, padding: 20, cursor: 'pointer',
                border: b.name === pick ? '2px solid #F5E642' : '2px solid #1e3a5f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {b.name === pick && <span style={{ background: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 20 }}>TOP PICK</span>}
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{b.name}</span>
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
          Get matched with top DFW insulation contractors — <span style={{ color: '#F5E642' }}>prolnk.io</span>
        </div>
      </div>
    </div>
  );
}
