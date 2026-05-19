import { useState } from 'react';

const BIZ_TYPES = [
  { id: 'pier', label: '🏗️ Pier & Beam Specialist', opp: 'Pier & beam repair matches across DFW older neighborhoods', rate: '$3,500-$18,000/job', stat: '40% of DFW homes are pier & beam' },
  { id: 'slab', label: '🔩 Slab Foundation Expert', opp: 'Slab repair and leveling in post-drought demand', rate: '$5,000-$30,000/job', stat: 'Clay soil drives $1.2B/yr in DFW repairs' },
  { id: 'drain', label: '💧 Drainage & Prevention', opp: 'French drains, waterproofing, and grading matches', rate: '$2,000-$8,000/job', stat: 'Prevention demand surges after spring floods' },
  { id: 'engineer', label: '📐 Structural Engineer Partner', opp: 'Engineer report referral network within ProLnk', rate: '$400-$1,200/report', stat: 'Every foundation match needs an engineer report' },
  { id: 'warranty', label: '📋 Warranty-Based Provider', opp: 'Warranty transfer matches during home sales', rate: '$8,000-$45,000/job', stat: '45% of DFW home sales require foundation review' },
];

const MARKET_STATS = [
  { stat: '$1.2B', label: 'DFW annual foundation repair market' },
  { stat: '68%', label: 'DFW homes on expansive clay soil' },
  { stat: '2.4in', label: 'Avg soil movement per drought cycle' },
  { stat: '12yr', label: 'Average time before first major repair' },
];

const DFW_DRIVERS = [
  { icon: '🌵', title: 'Expansive Clay Soil (Blackland Prairie)', desc: 'DFW sits on some of the most expansive clay soils in the world — shrinks 2-4 inches during drought, expands violently when wet' },
  { icon: '☀️', title: 'Drought-Flood Cycles', desc: 'DFW alternates between severe drought (foundation drops) and heavy rain (foundation lifts) — the movement destroys slabs over time' },
  { icon: '💧', title: 'Tree Root Proximity', desc: 'Live oaks, pecan, and Bradford pear roots extract moisture from clay, creating differential settlement beneath foundations' },
  { icon: '🏚️', title: 'Aging Housing Stock', desc: '60% of DFW homes were built before 2000 with original foundations now reaching critical repair thresholds' },
];

const STREAMS = [
  { icon: '💰', name: 'Post-Drought Match Surge', desc: 'ProLnk routes foundation matches immediately after drought declarations — highest demand windows' },
  { icon: '🔄', name: 'Warranty Monitoring Plans', desc: 'Offer annual monitoring at $199/yr — create predictable recurring revenue and early warning for clients' },
  { icon: '👥', name: 'Pro Network Override', desc: 'Recruit other foundation companies — earn 1-4% of their match income 4 levels deep' },
  { icon: '🏠', name: 'Home Origination Rights', desc: 'Permanent platform revenue share on every home you first service through ProLnk' },
  { icon: '📐', name: 'Engineer Referral Network', desc: 'Build a referral relationship with structural engineers in ProLnk — they send foundation leads, you send report referrals' },
];

export default function DFWProLnkFoundationPartnerGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const biz = BIZ_TYPES.find(b => b.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#F5E642′ }}>🏗️ ProLnk Foundation Partner Guide</div>
          <div style={{ color: '#94A3B8', marginTop: '.5rem' }}>DFW foundation companies — clay soil market, drought surges, warranty relationships</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {MARKET_STATS.map(m => (
            <div key={m.label} style={{ background: '#0F2035', borderRadius: 10, padding: '1.25rem', border: '1px solid #8B5CF6', textAlign: 'center' }}>
              <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#F5E642′ }}>{m.stat}</div>
              <div style={{ color: '#94A3B8', fontSize: '.78rem', marginTop: '.25rem' }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>Select Your Business Type</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {BIZ_TYPES.map(b => (
              <button key={b.id} onClick={() => setSelected(b.id)}
                style={{ padding: '.85rem 1rem', borderRadius: 10, border: , background: selected === b.id ? '#F5E64222′ : '#0A1628', color: '#fff', cursor: ’pointer', textAlign: 'left', fontWeight: 600 }}>
                {b.label}
              </button>
            ))}
          </div>
          {biz && (
            <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 10, padding: '1rem', border: '1px solid #8B5CF6′ }}>
              <div style={{ color: '#8B5CF6', fontWeight: 700, marginBottom: '.5rem' }}>Your ProLnk Opportunity</div>
              <div style={{ color: '#CBD5E1′ }}>📍 Match Type: <strong style={{ color: '#fff' }}>{biz.opp}</strong></div>
              <div style={{ color: '#CBD5E1', marginTop: '.25rem' }}>💵 Typical Range: <strong style={{ color: '#F5E642′ }}>{biz.rate}</strong></div>
              <div style={{ color: '#94A3B8', fontSize: '.83rem', marginTop: '.35rem' }}>📊 {biz.stat}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>Why DFW is the Foundation Repair Capital of the US</div>
          {DFW_DRIVERS.map(d => (
            <div key={d.title} style={{ display: 'flex', gap: '1rem', marginBottom: '.85rem' }}>
              <span style={{ fontSize: '1.4rem' }}>{d.icon}</span>
              <div>
                <div style={{ fontWeight: 600, color: '#fff', fontSize: '.9rem' }}>{d.title}</div>
                <div style={{ color: '#94A3B8', fontSize: '.82rem' }}>{d.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', borderRadius: 12, padding: '1.5rem', border: '1px solid #1E3A5F' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>5 Income Streams for Foundation Companies</div>
          {STREAMS.map(s => (
            <div key={s.name} style={{ display: 'flex', gap: '1rem', marginBottom: '.75rem' }}>
              <span style={{ fontSize: '1.4rem' }}>{s.icon}</span>
              <div>
                <div style={{ fontWeight: 600, color: '#fff', fontSize: '.9rem' }}>{s.name}</div>
                <div style={{ color: '#94A3B8', fontSize: '.82rem' }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
