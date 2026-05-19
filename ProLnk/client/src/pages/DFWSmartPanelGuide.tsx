import { useState } from 'react';

const panels = [
  { name: 'Span Panel', price: '$3,500–$5,000 installed', loadMonitoring: true, evManagement: true, solarOptimized: true, ercot: true, appControl: 'Full', circuitControl: 'Individual circuits', bestFor: 'EV + solar homes, ERCOT demand response', emoji: '⚡' },
  { name: 'Leviton Smart Panel', price: '$1,800–$3,200 installed', loadMonitoring: true, evManagement: true, solarOptimized: false, ercot: false, appControl: 'Good', circuitControl: 'Individual circuits', bestFor: 'Budget-conscious, no solar', emoji: '🔌' },
  { name: 'Lumin Smart Panel', price: '$2,200–$3,800 installed', loadMonitoring: true, evManagement: true, solarOptimized: true, ercot: true, appControl: 'Full', circuitControl: 'Individual circuits', bestFor: 'Battery backup + solar optimization', emoji: '🔋' },
];

const ercotTips = [
  'ERCOT demand response events pay DFW homeowners $0.50–$2.00/kWh during peak events',
  'Smart panels automatically shed non-critical loads during 4CP events (highest demand hours)',
  'August afternoons 3–7pm are highest ERCOT demand — pre-cool home to 70°F before peak',
  'Span + Lumin integrate directly with ERCOT demand response programs',
];

export default function DFWSmartPanelGuide() {
  const [hasEV, setHasEV] = useState(false);
  const [hasSolar, setHasSolar] = useState(false);
  const [homeSize, setHomeSize] = useState('medium');
  const [result, setResult] = useState<string | null>(null);

  function getROI() {
    const panelCost = hasSolar ? 4500 : hasEV ? 3800 : 2500;
    const monthlySavings = (hasSolar ? 80 : 0) + (hasEV ? 35 : 0) + 25;
    const ercotBonus = hasSolar || hasEV ? '$120–$400/year from ERCOT demand response credits' : 'N/A — add solar or EV to qualify';
    const payback = Math.round(panelCost / (monthlySavings * 12) * 10) / 10;
    const rec = hasSolar ? 'Span or Lumin' : hasEV ? 'Leviton or Span' : 'Leviton Smart Panel';
    setResult(`Recommended: ${rec} (~$${panelCost.toLocaleString()} installed). Estimated monthly savings: $${monthlySavings}/mo. Payback period: ~${payback} years. ERCOT demand response: ${ercotBonus}. DFW tip: pair with a whole-home battery for 2x savings during summer peak events.`);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13 }}>🏠 DFW Smart Home Guide</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Smart Electrical Panel Guide for DFW Homes</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          DFW electricity is expensive and volatile. Smart panels monitor every circuit, manage EV charging, optimize solar, and participate in ERCOT demand response — turning your panel into a revenue-generating asset.
        </p>

        <div style={{ background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 10, padding: '16px 20px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#F5E642', marginBottom: 8 }}>⚡ ERCOT Demand Response — Get Paid to Save Energy</div>
          <div style={{ display: 'grid', gap: 6 }}>
            {ercotTips.map((tip, i) => (
              <div key={i} style={{ color: '#CBD5E1', fontSize: 13, display: 'flex', gap: 8 }}>
                <span style={{ color: '#F5E642', minWidth: 16 }}>→</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
          {panels.map(p => (
            <div key={p.name} style={{ background: '#0D1F35', borderRadius: 10, padding: '20px 24px', border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{p.emoji} {p.name}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{p.price}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                {[['EV Management', p.evManagement], ['Solar Optimized', p.solarOptimized], ['ERCOT Integration', p.ercot]].map(([label, active]) => (
                  <div key={label as string} style={{ background: active ? '#16A34A20' : '#1E3A5F', color: active ? '#4ADE80' : '#475569', fontSize: 12, padding: '3px 10px', borderRadius: 99, fontWeight: 600 }}>
                    {active ? '✅' : '❌'} {label}
                  </div>
                ))}
              </div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Best For: {p.bestFor}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F35', borderRadius: 12, padding: '28px', border: '1px solid #1E3A5F', marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🔧 Calculate Your Smart Panel ROI</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input type="checkbox" checked={hasEV} onChange={e => setHasEV(e.target.checked)} id="ev" style={{ width: 18, height: 18, cursor: 'pointer' }} />
              <label htmlFor="ev" style={{ color: '#CBD5E1', fontSize: 14, cursor: 'pointer' }}>🚗 I have or plan to get an EV (Level 2 charging)</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <input type="checkbox" checked={hasSolar} onChange={e => setHasSolar(e.target.checked)} id="solar" style={{ width: 18, height: 18, cursor: 'pointer' }} />
              <label htmlFor="solar" style={{ color: '#CBD5E1', fontSize: 14, cursor: 'pointer' }}>☀️ I have or plan to install solar panels</label>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            {[['small', 'Under 2,000 sq ft'], ['medium', '2,000–3,500 sq ft'], ['large', '3,500+ sq ft']].map(([v, l]) => (
              <button key={v} onClick={() => setHomeSize(v)} style={{ padding: '8px 18px', borderRadius: 8, border: `2px solid ${homeSize === v ? '#F5E642' : '#1E3A5F'}`, background: homeSize === v ? '#F5E64220' : 'transparent', color: homeSize === v ? '#F5E642' : '#94A3B8', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {l}
              </button>
            ))}
          </div>
          <button onClick={getROI} style={{ background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Calculate My Smart Panel ROI →
          </button>
          {result && (
            <div style={{ marginTop: 20, background: '#F5E64215', border: '1px solid #F5E64240', borderRadius: 8, padding: '16px 20px', color: '#E8EDF5', fontSize: 14, lineHeight: 1.6 }}>
              {result}
            </div>
          )}
        </div>

        <div style={{ color: '#475569', fontSize: 12, textAlign: 'center' }}>ProLnk · DFW Smart Home Guides · Smart electrical for DFW energy savings and ERCOT optimization</div>
      </div>
    </div>
  );
}
