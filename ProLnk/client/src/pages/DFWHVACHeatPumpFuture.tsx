import { useState } from 'react';

const situations = [
  { label: 'Building a new DFW home', key: 'new', impact: 'High impact now', detail: 'Most DFW builders are offering all-electric packages with heat pumps as a standard option in 2026. Eliminating gas lines saves $3,000–$8,000 upfront in new construction. All-electric new builds in DFW command 3–7% resale premiums in today’s market.', action: 'Spec all-electric with a heat pump from the start. It’s cheaper than adding gas lines you’ll eventually replace anyway.' },
  { label: 'Replacing my current system', key: 'replace', impact: 'Excellent timing', detail: 'If your DFW system is failing, 2026 is the ideal time to switch to a heat pump. Federal tax credits cover 30% of equipment + installation. DFW’s gas rates are rising — locking in electric-only operation now hedges against future gas price volatility.', action: 'Get heat pump quotes alongside traditional replacement quotes. The premium over standard AC is often $2,000–$4,000 — often covered by tax credits alone.' },
  { label: 'Selling my DFW home in 1-3 years', key: 'sell', impact: 'Moderate impact', detail: 'DFW buyers increasingly ask about HVAC efficiency and fuel type. A recently installed heat pump adds to resale value and often shortens time on market. However, buyers don’t yet pay a large premium for heat pumps versus standard high-SEER AC in DFW.', action: 'If your system is 10+ years old, replacing before listing adds value. A heat pump is worth the marginal upgrade cost if the system needs replacing anyway.' },
  { label: 'Long-term DFW homeowner', key: 'longterm', impact: 'High ROI long-term', detail: 'Over 15+ years, eliminating gas bills (averaging $1,200–$1,800/year in DFW) and benefiting from rising heat pump efficiency makes the economics compelling. DFW’s grid is adding more renewables — making electric-only operation increasingly clean over time.', action: 'Plan your heat pump transition at your next system replacement. Don’t replace a working system early, but make heat pumps the default when replacement comes.' },
  { label: 'DFW rental property owner', key: 'rental', impact: 'Emerging opportunity', detail: 'DFW tenants increasingly factor utility costs into rental decisions. Installing a heat pump can justify modest rent increases and reduce tenant complaints about utility bills. Tax credits apply to rental properties under the Inflation Reduction Act.', action: 'Model the rent increase potential versus installation cost. In most DFW markets, 2–3% rent premium on heat pump properties is achievable.' },
];

export default function DFWHVACHeatPumpFuture() {
  const [selected, setSelected] = useState<string | null>(null);
  const [timeline, setTimeline] = useState('');

  const match = situations.find(s => s.key === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, marginBottom: '0.5rem' }}>🔮 HEAT PUMP FUTURE</div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>Where Heat Pumps Are Going in DFW</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: '2.5rem' }}>DFW builders are going all-electric. Gas lines are disappearing from new construction. Here's what this shift means for your specific situation.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🏗️', stat: '40%', label: 'of new DFW builds offered all-electric in 2025′ },
            { icon: '⚡', stat: '30%', label: 'federal tax credit on heat pump installation' },
            { icon: '📈', stat: '3–7%', label: 'resale premium for all-electric DFW homes' },
            { icon: '🌡️', stat: '5°F', label: 'min temp where 2026 heat pumps stay efficient' },
          ].map(s => (
            <div key={s.label} style={{ background: '#0F2040', borderRadius: 10, padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.4rem' }}>{s.stat}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.2rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1.1rem' }}>🏠 What's Your DFW Situation?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {situations.map(s => (
              <button key={s.key} onClick={() => setSelected(s.key)} style={{ background: selected === s.key ? '#F5E642′ : '#1a3a5c', color: selected === s.key ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '0.5rem 1rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>{s.label}</button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>📊 {match.impact}</div>
              <div style={{ color: '#e2e8f0', marginBottom: '0.75rem', lineHeight: 1.6 }}>{match.detail}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>✅ Action: <span style={{ color: '#F5E642′ }}>{match.action}</span></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>🔧 Get DFW Heat Pump Quotes</div>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.95rem' }}>ProLnk matches you with DFW HVAC pros who specialize in heat pump installation and the all-electric transition.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>Get Free Heat Pump Quotes →</button>
        </div>
      </div>
    </div>
  );
}
