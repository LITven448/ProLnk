import { useState } from 'react';

const needs = [
  { id: 'assessment', label: 'Foundation Assessment', icon: '🔍', best: 'Spring (March–April) or Fall (Oct–Nov)', reason: 'Moderate soil moisture gives accurate crack and movement readings', avoid: 'Mid-summer drought — expansive clay is at max contraction, masking true state', tip: 'DFW black clay soil shrinks 4–6 inches in drought years. Spring assessments catch 80% more issues.' },
  { id: 'piers', label: 'Pier Installation', icon: '🏗️', best: 'Spring or Fall — ideally March–May or September–November', reason: 'Stable soil moisture means piers seat properly and settle predictably', avoid: 'July–August drought or heavy rain periods — soil movement skews results', tip: 'Steel piers in DFW clay require 3–6 months of monitoring post-install before final adjustments.' },
  { id: 'drainage', label: 'Drainage Installation', icon: '🌊', best: 'Fall (September–November)', reason: 'Install before winter rains — drainage protects foundation through wet season', avoid: 'Installing during or after heavy rains — ground saturation delays excavation', tip: 'French drains and downspout extensions are the #1 preventive investment DFW homeowners can make.' },
  { id: 'soil', label: 'Soil Stabilization', icon: '🌱', best: 'Spring (March–May)', reason: 'Products bond to soil as it transitions from winter moisture to summer dry cycle', avoid: 'Peak summer — products cannot penetrate fully hardened clay', tip: 'Lime injection is most effective in DFW when soil moisture is between 15–25%.' },
  { id: 'waterproof', label: 'Foundation Waterproofing', icon: '🛡️', best: 'Spring before rainy season or Fall before winter', reason: 'Timing waterproofing before wet cycles maximizes protection', avoid: 'Active rain periods — membranes cannot cure properly', tip: 'DFW gets 37 inches of rain annually — most in spring. Waterproof by March.' },
];

export default function DFWFoundationBestTimeDFW2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = needs.find(n => n.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏠🌍</div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#F5E642', marginBottom: '8px' }}>
            DFW Best Time for Foundation Work 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>
            DFW expansive clay soil makes foundation timing critical. The right month matters more than the contractor.
          </p>
        </div>

        <p style={{ textAlign: 'center', color: '#F5E642', marginBottom: '24px', fontWeight: '600′ }}>
          What foundation work do you need?
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
                <span style={{ color: '#F5E642', fontWeight: '700′ }}>💡 DFW Fact: </span>{active.tip}
              </div>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <a href="/pro-signup" style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', display: 'inline-block' }}>
                Get Matched with a DFW Foundation Pro →
              </a>
            </div>
          </div>
        )}

        <div style={{ marginTop: '40px', textAlign: 'center', color: '#475569', fontSize: '13px' }}>
          ProLnk — DFW's home services network. Verified foundation pros across all 7 DFW counties.
        </div>
      </div>
    </div>
  );
}
