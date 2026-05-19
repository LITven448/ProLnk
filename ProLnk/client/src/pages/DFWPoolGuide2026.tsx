import { useState } from 'react';

const scenarios = [
  { label: 'Small Lot (<6,000 sqft) + Under $60K', result: 'Not feasible for in-ground pool. Consider above-ground or plunge pool ($15K-$25K). HOA likely prohibits above-ground.' },
  { label: 'Mid Lot (6-9,000 sqft) + $65K-$80K', result: '15x30 gunite pool with basic deck and equipment. Ongoing maintenance ~$200/mo ($2,400/yr). Good DFW resale value.' },
  { label: 'Large Lot (9K-15K sqft) + $80K-$110K', result: '18x36 pool with spa, travertine coping, outdoor lighting, equipment pad. Full DFW summer package.' },
  { label: 'Estate Lot (15K+ sqft) + $110K+', result: 'Custom shape, spa, waterfall, outdoor kitchen integration, smart automation. DFW luxury market standard.' },
];

export default function DFWPoolGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏊</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 8 }}>DFW Pool Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Everything DFW homeowners need to know before building a pool in 2026.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '💰', label: 'DFW Pool Avg Cost', value: '$65K - $90K' },
            { icon: '📅', label: 'Backlog (2026)', value: 'Clearing' },
            { icon: '🏡', label: 'DFW Suburb Ownership', value: '28%' },
            { icon: '🔧', label: 'Annual Maintenance', value: '~$2,400′ },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#0f2040', borderRadius: 12, padding: '20px', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 24 }}>{stat.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{stat.label}</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📋 DFW Pool Build Process</h2>
          {[
            { step: '1. Permitting', detail: 'Dallas/Plano/Frisco: 3-6 weeks. Submit plat survey and engineering plans upfront.' },
            { step: '2. Excavation', detail: 'DFW clay soil requires extra caution. Rocky areas in North DFW add $3K-$8K.' },
            { step: '3. Steel and Gunite', detail: 'Industry standard in DFW. Gunite cures 28 days before plaster or pebble finish.' },
            { step: '4. Decking and Coping', detail: 'Travertine and cool deck are top DFW choices for heat tolerance.' },
            { step: '5. Equipment and Start-Up', detail: 'Variable speed pump required by Texas law since 2021. Saves $500-$800/yr in electricity.' },
          ].map((item) => (
            <div key={item.step} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>{item.step}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 8 }}>🔧 Lot Size + Budget — Pool Feasibility</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
            {scenarios.map((item, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642′ : '#0A1628', color: selected === i ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '12px 16px', textAlign: ’left', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {item.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, border: '1px solid #F5E642′ }}>
              <div style={{ color: '#fff', fontSize: 14 }}>{scenarios[selected].result}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
