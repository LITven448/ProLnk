import { useState } from 'react';

const needs = [
  { id: 'replace', label: 'Full Replacement', icon: '🏠', best: 'Fall (September–November) = best; Spring = second best', reason: 'Mild temps mean faster installation, no heat risk to crews, better material adhesion', avoid: 'July–August — 100°F+ is dangerous for crews working on rooftops, productivity drops 40%', tip: 'Book fall replacement by August — DFW roofers fill October slots fast after hail season.' },
  { id: 'inspect', label: 'Roof Inspection', icon: '🔍', best: 'Spring (April–May) post-hail + Fall (Oct) pre-winter', reason: 'Catch hail damage before filing deadline; fall catches any summer storm damage', avoid: 'Inspecting mid-winter when damage may be obscured by moss or debris', tip: 'DFW averages 4–6 hail events per year. Spring inspection is non-negotiable.' },
  { id: 'repair', label: 'Minor Repairs', icon: '🔧', best: 'Any mild weather — spring or fall preferred', reason: 'Small repairs can wait for safe working conditions without major risk', avoid: 'Above 100°F for crew safety — shingles also become pliable and hard to work', tip: 'A $300 repair today prevents a $12,000 replacement in 2 years. Never delay leak repairs.' },
  { id: 'gutters', label: 'Gutter Replacement', icon: '🌊', best: 'Fall before winter rains (October–November)', reason: 'Clean gutters before the 37 annual inches of DFW rain peaks in spring', avoid: 'Installing during active rain or freezing temps — sealants cannot cure', tip: 'K-style gutters handle DFW rain volume better than round — upgrade if your home is 15+ years old.' },
  { id: 'hail', label: 'Hail Damage Claim', icon: '⚡', best: 'Within 60 days of the hail event', reason: 'Texas insurance policies require timely filing — delays void claims', avoid: 'Waiting until you see interior water damage — exterior evidence needed for claim', tip: 'ProLnk matches you with insurance-savvy roofers who document damage properly for claims.' },
];

export default function DFWRoofingBestTimeDFW2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = needs.find(n => n.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏚️⛈️</div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#F5E642', marginBottom: '8px' }}>
            DFW Best Time for Roofing Work 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            DFW is the hail capital of the US. Timing roofing work around weather and season protects your home and wallet.
          </p>
        </div>

        <p style={{ textAlign: 'center', color: '#F5E642', marginBottom: '24px', fontWeight: '600′ }}>
          What roofing work do you need?
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {needs.map(n => (
            <button
              key={n.id}
              onClick={() => setSelected(selected === n.id ? null : n.id)}
              style={{
                background: selected === n.id ? '#F5E642′ : '#1e2d4a',
                color: selected === n.id ? '#0A1628′ : '#fff',
                border: '2px solid' + (selected === n.id ? ' #F5E642′ : ' #334155'),
                borderRadius: '12px', padding: '16px 8px', cursor: 'pointer',
                fontSize: '13px', fontWeight: '700', textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '6px' }}>{n.icon}</div>
              {n.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1e2d4a', borderRadius: '16px', padding: '28px', border: '2px solid #F5E642′ }}>
            <h2 style={{ color: '#F5E642', fontSize: '20px', marginBottom: '16px' }}>{active.icon} {active.label}</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div><span style={{ color: '#22c55e', fontWeight: '700′ }}>✅ Best Time: </span>{active.best}</div>
              <div><span style={{ color: '#94a3b8', fontWeight: '700′ }}>Why: </span>{active.reason}</div>
              <div><span style={{ color: '#ef4444', fontWeight: '700′ }}>⚠️ Avoid: </span>{active.avoid}</div>
              <div style={{ background: '#0A1628', borderRadius: '8px', padding: '12px', borderLeft: '3px solid #F5E642′ }}>
                <span style={{ color: '#F5E642', fontWeight: '700′ }}>💡 DFW Tip: </span>{active.tip}
              </div>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <a href="/pro-signup" style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', display: 'inline-block' }}>
                Get Matched with a DFW Roofing Pro →
              </a>
            </div>
          </div>
        )}

        <div style={{ marginTop: '40px', textAlign: 'center', color: '#475569', fontSize: '13px' }}>
          ProLnk — DFW's home services network. Hail season specialists across all 7 DFW counties.
        </div>
      </div>
    </div>
  );
}
