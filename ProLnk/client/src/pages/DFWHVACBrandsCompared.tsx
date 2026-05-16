import { useState } from 'react';

const brands = [
  { name: 'Carrier', climate: 5, reliability: 5, warranty: 5, dealer: 5, cost: 3, efficiency: 5, note: 'Gold standard for DFW heat — Infinity series excels in extreme temps' },
  { name: 'Trane', climate: 5, reliability: 5, warranty: 4, dealer: 5, cost: 3, efficiency: 4, note: 'Built like a tank — preferred by most DFW HVAC techs for longevity' },
  { name: 'Lennox', climate: 4, reliability: 4, warranty: 5, dealer: 4, cost: 3, efficiency: 5, note: 'Highest SEER ratings available — best for energy savings in DFW summers' },
  { name: 'Rheem', climate: 4, reliability: 4, warranty: 4, dealer: 4, cost: 4, efficiency: 4, note: 'Solid mid-tier — great value, widely serviced across DFW' },
  { name: 'Goodman', climate: 3, reliability: 3, warranty: 5, dealer: 4, cost: 5, efficiency: 3, note: 'Budget champion — long parts warranty offsets lower build quality' },
];

const priorities: Record<string, string[]> = {
  reliability: ['Carrier', 'Trane'],
  price: ['Goodman', 'Rheem'],
  efficiency: ['Lennox', 'Carrier'],
  warranty: ['Carrier', 'Goodman'],
};

const labels: Record<string, string> = {
  climate: 'DFW Climate', reliability: 'Reliability', warranty: 'Warranty',
  dealer: 'Dealer Support', cost: 'Value', efficiency: 'Efficiency',
};

function Stars({ n }: { n: number }) {
  return <span style={{ color: '#F5E642' }}>{'★'.repeat(n)}{'☆'.repeat(5 - n)}</span>;
}

export default function DFWHVACBrandsCompared() {
  const [priority, setPriority] = useState('reliability');
  const [expanded, setExpanded] = useState<string | null>(null);
  const top2 = priorities[priority];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW HVAC Brands Compared 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Carrier · Trane · Lennox · Rheem · Goodman — rated for North Texas</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>What matters most to you?</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {Object.keys(priorities).map(p => (
              <button key={p} onClick={() => setPriority(p)}
                style={{ padding: '8px 18px', borderRadius: 8, border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                  borderColor: priority === p ? '#F5E642' : '#1e3a5f',
                  background: priority === p ? '#F5E642' : 'transparent',
                  color: priority === p ? '#0A1628' : '#94a3b8' }}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16, padding: '14px 18px', background: '#1a3a6e', borderRadius: 10, borderLeft: '4px solid #F5E642' }}>
            <p style={{ margin: 0, color: '#F5E642', fontWeight: 700 }}>🏆 Top picks for DFW: {top2[0]} & {top2[1]}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {brands.map(b => (
            <div key={b.name} onClick={() => setExpanded(expanded === b.name ? null : b.name)}
              style={{ background: '#0f2040', borderRadius: 12, padding: 20, cursor: 'pointer',
                border: top2.includes(b.name) ? '2px solid #F5E642' : '2px solid #1e3a5f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {top2.includes(b.name) && <span style={{ background: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 20 }}>TOP PICK</span>}
                  <span style={{ fontWeight: 700, fontSize: 18 }}>{b.name}</span>
                </div>
                <span style={{ color: '#94a3b8' }}>{expanded === b.name ? '▲' : '▼'}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 14 }}>
                {Object.keys(labels).map(k => (
                  <div key={k} style={{ minWidth: 100 }}>
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
          Get matched with top DFW HVAC contractors — <span style={{ color: '#F5E642' }}>prolnk.io</span>
        </div>
      </div>
    </div>
  );
}
