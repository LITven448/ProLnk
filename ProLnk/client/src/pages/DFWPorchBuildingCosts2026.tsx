import { useState } from 'react';

export default function DFWPorchBuildingCosts2026() {
  const [porchType, setPorchType] = useState<'small' | 'covered' | 'wraparound'>('covered');
  const [decking, setDecking] = useState<'cedar' | 'composite'>('cedar');

  const costs: Record<string, Record<string, string>> = {
    small: { cedar: '$8,000–$12,000', composite: '$11,000–$16,000' },
    covered: { cedar: '$12,000–$20,000', composite: '$16,000–$26,000' },
    wraparound: { cedar: '$25,000–$35,000', composite: '$30,000–$40,000' },
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 14, marginBottom: 8 }}>🏠 DFW HOME GUIDES 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>DFW Front Porch Building Cost Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>What it costs to add a front porch in Dallas-Fort Worth — 2026 contractor prices.</p>

        <div style={{ background: '#111e33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚙️ Estimate Your DFW Porch Cost</h2>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Porch Type</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {(['small', 'covered', 'wraparound'] as const).map(p => (
                <button key={p} onClick={() => setPorchType(p)} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', background: porchType === p ? '#F5E642' : '#1e2d45', color: porchType === p ? '#0A1628' : '#fff', fontWeight: 600 }}>
                  {p === 'small' ? 'Small Open' : p === 'covered' ? 'Covered Porch' : 'Wraparound'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Decking Material</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {(['cedar', 'composite'] as const).map(d => (
                <button key={d} onClick={() => setDecking(d)} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', background: decking === d ? '#F5E642' : '#1e2d45', color: decking === d ? '#0A1628' : '#fff', fontWeight: 600 }}>
                  {d === 'cedar' ? 'Cedar Wood' : 'Composite'}
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>Estimated DFW Cost</div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#F5E642' }}>{costs[porchType][decking]}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>Permit + foundation tie-in included in range</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '🌲', title: 'Cedar Decking', desc: 'DFW classic. Looks great, affordable, but needs sealing every 2 yrs due to UV and humidity swings.' },
            { icon: '🏅', title: 'Composite Decking', desc: 'Best for DFW longevity. Low-maintenance, fade-resistant. Higher upfront, lower lifetime cost.' },
            { icon: '🏗', title: 'Foundation Tie-In', desc: 'DFW clay soil requires careful foundation attachment. Structural engineer often needed.' },
            { icon: '🏘', title: 'HOA Approval', desc: 'Most DFW master-planned communities (Prosper, Celina, Frisco) require HOA design approval before permit.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#111e33', borderRadius: 10, padding: 18 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e33', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 12 }}>📋 DFW Porch Permit & Timeline</h3>
          <ul style={{ color: '#94a3b8', fontSize: 14, paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Permit required for any porch over 30 sq ft attached to home in DFW cities</li>
            <li>Typical permit turnaround: 2–4 weeks in Frisco, Plano, McKinney</li>
            <li>Structural tie-in to existing foundation adds complexity and cost</li>
            <li>Build timeline: 2–4 weeks once permit approved</li>
          </ul>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>Get DFW Porch Quotes Today</div>
          <div style={{ color: '#1e2d45', fontSize: 13 }}>ProLnk matches you with licensed DFW porch contractors — free, no-obligation quotes.</div>
        </div>
      </div>
    </div>
  );
}
