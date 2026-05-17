import { useState } from 'react';

export default function DFWHeatPumpHybridDFW2026() {
  const [currentSystem, setCurrentSystem] = useState('gas');
  const [homeSize, setHomeSize] = useState('2000');
  const [result, setResult] = useState('');

  const systemOptions = ['Gas Furnace Only', 'Heat Pump Only', 'Dual Fuel (Already)', 'Electric Resistance'];
  const sizeOptions = ['Under 1500 sq ft', '1500–2500 sq ft', '2500–3500 sq ft', 'Over 3500 sq ft'];

  const getGuide = () => {
    const savings = homeSize === 'Under 1500 sq ft' ? '$600–$900' : homeSize === '1500–2500 sq ft' ? '$900–$1,400' : homeSize === '2500–3500 sq ft' ? '$1,400–$2,000' : '$2,000–$3,000';
    if (currentSystem === 'Dual Fuel (Already)') {
      setResult('✅ You already have a hybrid system! Ensure your crossover point is set to 35°F for DFW optimal efficiency.');
    } else {
      setResult(`⚡ Upgrade to Hybrid Dual-Fuel: Estimated annual savings ${savings}/yr. You qualify for 30% federal ITC on heat pump component. DFW only drops below 35°F ~12 nights/year — gas furnace only fires those nights. Heat pump handles 97% of heating season.`);
    }
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0' }}>DFW Hybrid Heat Pump System Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Dual-fuel technology optimized for North Texas climate</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {[{icon:'🔥',label:'Gas Crossover Threshold',val:'35°F',sub:'DFW avg 12 nights/yr below this'},{icon:'💰',label:'Federal Tax Credit',val:'30% ITC',sub:'On heat pump component cost'},{icon:'⚡',label:'Efficiency Range',val:'250–400%',sub:'COP above crossover point'},{icon:'🌡️',label:'Typical DFW Savings',val:'40–55%',sub:'vs gas-only in mild seasons'}].map((s,i) => (
            <div key={i} style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.25rem', borderTop: '3px solid #F5E642' }}>
              <div style={{ fontSize: '2rem' }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.5rem' }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontSize: '1.5rem', fontWeight: 700 }}>{s.val}</div>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>⚙️ How DFW Hybrid Systems Decide</h2>
          {[{temp:'Above 35°F',fuel:'Heat Pump',why:'Highly efficient — extracts heat from outdoor air even in 40°F weather'},{temp:'25–35°F',fuel:'Aux / Crossover Zone',why:'System evaluates cost per BTU and may blend both sources'},{temp:'Below 25°F',fuel:'Gas Furnace',why:'Gas delivers 100% capacity; heat pump efficiency drops sharply'}].map((r,i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.75rem', background: '#0f1f3d', borderRadius: '8px', marginBottom: '0.5rem' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: '110px' }}>{r.temp}</span>
              <span style={{ color: '#60a5fa', minWidth: '130px' }}>{r.fuel}</span>
              <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{r.why}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1a2744', borderRadius: '12px', padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🏠 Your DFW Hybrid System Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Current System</label>
              <select value={currentSystem} onChange={e => setCurrentSystem(e.target.value)} style={{ width: '100%', marginTop: '0.4rem', padding: '0.6rem', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px' }}>
                {systemOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Home Size</label>
              <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ width: '100%', marginTop: '0.4rem', padding: '0.6rem', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '6px' }}>
                {sizeOptions.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <button onClick={getGuide} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>Get My Hybrid Guide</button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0f1f3d', borderRadius: '8px', color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}