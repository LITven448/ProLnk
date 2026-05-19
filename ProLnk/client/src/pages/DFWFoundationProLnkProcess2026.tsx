import { useState } from 'react';

const concerns = [
  { label: 'Cracks in walls or floors — just noticed', icon: '🔍', steps: ['Submit request: describe crack location, direction, and width', 'ProLnk AI flags urgency — horizontal cracks are Priority 1', 'Routes to engineer-supervised Charter Foundation Pros', 'Structural engineer performs onsite assessment', 'Written report provided — repair or monitor recommendation', 'If repair needed: pier plan, quote, timeline given in writing'], note: 'Not all cracks require repair. Hairline cracks in new DFW homes may be normal settling. An engineer evaluation through ProLnk gives you facts, not a sales pitch.' },
  { label: 'Doors and windows sticking or not closing', icon: '🚪', steps: ['Submit request: note which doors and when problem started', 'ProLnk routes to Charter Pros experienced in post-tension slabs', 'Pro performs elevation survey to map settlement across slab', 'Identifies affected beam lines and pier locations needed', 'Written quote with pier count, method, and warranty', 'Work documented in Home Health Vault permanently'], note: 'Sticking doors in DFW summer drought = perimeter settlement in progress. Early repair costs 30-40% less than waiting for full beam drop.' },
  { label: 'I had an engineer report — need repair now', icon: '📋', steps: ['Upload engineer report when submitting request', 'ProLnk skips assessment step — routes directly to repair crews', 'Charter Pros reviewed and matched to report specifications', 'You receive competing bids based on the same scope', 'No upselling — engineer spec is the scope, period', 'All pier installation documented in Vault with GPS coordinates'], note: 'ProLnk respects the engineer\’s scope. Charter Pros bid on exactly what the engineer specified — no additions without your written approval.' },
  { label: 'Post-repair — monitoring and documentation', icon: '📊', steps: ['Submit request: "Post-repair monitoring"', 'ProLnk connects you to elevation monitoring service', 'Quarterly elevation surveys tracked in Home Health Vault', 'Alerts if new movement detected outside tolerance', 'All monitoring history accessible for resale or insurance', 'Warranty claims routed back to original Charter Pro'], note: 'DFW foundations require ongoing moisture management. ProLnk\’s Vault tracking ensures your warranty is enforceable and movement is caught early.' },
];

export default function DFWFoundationProLnkProcess2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK FOUNDATION PROCESS 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>How ProLnk Matches You to DFW Foundation Pros</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 36 }}>Foundation work is the highest-stakes home repair in DFW. ProLnk routes every foundation request through engineer-supervised Charter Pros — no free estimate pressure tactics. Select your situation below.</p>

        <div style={{ display: 'grid', gap: 14, marginBottom: 32 }}>
          {concerns.map((c, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#1e3a5f' : '#111e33', border: `2px solid ${selected === i ? '#F5E642' : '#1e2d45'}`, borderRadius: 12, padding: '18px 22px', textAlign: 'left', cursor: 'pointer', color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 28 }}>{c.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{c.label}</div>
                </div>
                <span style={{ color: '#F5E642', fontSize: 20 }}>{selected === i ? '▲' : '▼'}</span>
              </div>
              {selected === i && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #1e3a5f' }}>
                  <ol style={{ paddingLeft: 20, color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, marginBottom: 14 }}>
                    {c.steps.map((step, j) => <li key={j}>{step}</li>)}
                  </ol>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, color: '#94a3b8', fontSize: 13 }}>💡 {c.note}</div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ background: '#111e33', border: '1px solid #1e2d45', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ CHARTER FOUNDATION PRO REQUIREMENTS</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Every Foundation Charter Pro on ProLnk operates under licensed structural engineer supervision, carries $2M liability insurance, provides written warranties, and documents all work in your Home Health Vault. Pier GPS coordinates, load ratings, and engineer sign-offs are permanent records.
          </p>
        </div>

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🔗 Submit your foundation concern at prolnk.io</div>
          <div style={{ color: '#64748b', fontSize: 13 }}>ProLnk — Charter Pro Network — DFW</div>
        </div>
      </div>
    </div>
  );
}