import { useState } from 'react';

export default function DFWFoundationConcreteSpalling2026() {
  const [spallingType, setSpallingType] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    if (!spallingType) { setResult('Please select your spalling type.'); return; }
    if (spallingType === 'surface') { setResult('Surface scaling: Common in north DFW from rare freeze-thaw cycles. Cosmetic concern. Epoxy surface treatment or penetrating sealer. Monitor for growth.'); return; }
    if (spallingType === 'reactive') { setResult('Reactive aggregate expansion (ASR/DEF): Gel formation pushes concrete apart. Requires structural assessment. Epoxy injection + surface treatment.'); return; }
    if (spallingType === 'carbonation') { setResult('Carbonation spalling: CO2 penetrates concrete, corrodes rebar. Expose rebar, treat corrosion, patch with polymer-modified concrete.'); return; }
    setResult('Deep structural spalling: Indicates compromised concrete integrity. Requires licensed structural engineer assessment before any repair. Do not delay.');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🧱</div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>DFW Foundation Concrete Spalling Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '15px' }}>Understanding concrete spalling in DFW foundations</p>
        </div>

        {[{ icon: '❄️', title: 'Freeze-Thaw Spalling', desc: 'Rare but real in north DFW. Water expands when freezing, flakes concrete surface. Single-digit temperatures in DFW winters can trigger this.' },
          { icon: '🔬', title: 'Reactive Aggregate (ASR)', desc: 'Silica in aggregate reacts with cement alkalis, forming gel that expands. Causes map cracking and surface pop-outs. Common in DFW limestone-aggregate mixes.' },
          { icon: '🌫️', title: 'Carbonation Spalling', desc: 'CO2 penetrates concrete over decades, lowers pH, corrodes rebar. Rust expansion causes chunks to fall. Older DFW foundations most at risk.' },
          { icon: '🚨', title: 'When to Worry', desc: 'Spalling with exposed rebar, large chunks falling, or cracks wider than 1/4″ indicate structural concern. Get engineer assessment immediately.' }
        ].map((item, i) => (
          <div key={i} style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '20px', marginBottom: '16px', borderLeft: '4px solid #F5E642′ }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
            <h3 style={{ color: '#F5E642', fontSize: '17px', marginBottom: '6px' }}>{item.title}</h3>
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6′ }}>{item.desc}</p>
          </div>
        ))}

        <div style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '24px', marginTop: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '20px' }}>🔍 Spalling Type Assessment</h2>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '13px', marginBottom: '6px' }}>Describe Your Spalling</label>
            <select value={spallingType} onChange={e => setSpallingType(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: '8px', fontSize: '14px' }}>
              <option value="">Select...</option>
              <option value="surface">Surface scaling / flaking</option>
              <option value="reactive">Map cracking / pop-outs (ASR)</option>
              <option value="carbonation">Exposed rebar / rust stains</option>
              <option value="deep">Large chunks falling off</option>
            </select>
          </div>
          <button onClick={assess} style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', fontWeight: '700', fontSize: '15px', border: 'none', cursor: 'pointer', width: '100%' }}>Get Assessment</button>
          {result && <div style={{ marginTop: '16px', padding: '14px', backgroundColor: '#1e3a5f', borderRadius: '8px', color: '#F5E642', fontSize: '14px', lineHeight: '1.6′ }}>{result}</div>}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: '12px', marginTop: '24px' }}>ProLnk — DFW Foundation Specialists 2026</p>
      </div>
    </div>
  );
}
