import { useState } from 'react';

export default function DFWSumpPumpGuide2026() {
  const [propType, setPropType] = useState('slab');
  const [drainage, setDrainage] = useState('ok');
  const [result, setResult] = useState('');

  const assess = () => {
    if (propType === 'slab' && drainage === 'ok') {
      setResult('✅ Slab foundation with good drainage — sump pump not typically needed. Monitor during spring storms. Ensure grading slopes away from foundation.');
    } else if (propType === 'slab' && drainage !== 'ok') {
      setResult('⚠️ Slab home with drainage issues. DFW spring 2026 flooding confirms need for French drain system or sump pit. Get a drainage assessment.');
    } else if (propType === 'crawl') {
      setResult('🔴 Crawlspace homes in DFW are at HIGH risk during spring storms. A sump pump + battery backup is strongly recommended. ERCOT grid stress means battery backup is critical — grid fails during peak storm demand.');
    } else if (propType === 'basement') {
      setResult('🔴 DFW basements are rare but flood-prone when present. Dual sump pump system + battery backup is mandatory. Test monthly. Spring storm season is May-June in DFW.');
    } else {
      setResult('⚠️ Assess your specific drainage situation. DFW clay soil does not absorb water well — pooling near foundation is a serious risk.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🔧 ProLnk Home Intelligence</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>DFW Sump Pump Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: '2rem' }}>DFW flooding risk is real — spring 2026 confirmed it. Clay soil, ERCOT grid stress, and storm intensity make preparation essential.</p>

        <div style={{ background: '#dd6b2022', border: '1px solid #dd6b20', borderRadius: 12, padding: '1rem', marginBottom: '2rem' }}>
          <div style={{ fontWeight: 700, color: '#dd6b20', marginBottom: '0.5rem' }}>⚡ ERCOT Grid Advisory</div>
          <div style={{ color: '#a0aec0', fontSize: '0.9rem' }}>During major DFW storm events, ERCOT grid stress can cause outages exactly when pumps are needed most. Battery backup is not optional — it is essential.</div>
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Do I Need a Sump Pump?</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#a0aec0', fontSize: '0.85rem' }}>Property Foundation Type</label><br />
              <select value={propType} onChange={(e) => setPropType(e.target.value)}
                style={{ background: '#0A1628', border: '1px solid #F5E642', color: '#fff', padding: '0.5rem', borderRadius: 6, marginTop: 4 }}>
                <option value="slab">Slab Foundation</option>
                <option value="crawl">Crawlspace</option>
                <option value="basement">Basement</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#a0aec0', fontSize: '0.85rem' }}>Yard Drainage</label><br />
              <select value={drainage} onChange={(e) => setDrainage(e.target.value)}
                style={{ background: '#0A1628', border: '1px solid #F5E642', color: '#fff', padding: '0.5rem', borderRadius: 6, marginTop: 4 }}>
                <option value="ok">Drains well / Slopes away from home</option>
                <option value="pool">Water pools near foundation</option>
                <option value="flood">Yard floods in heavy rain</option>
              </select>
            </div>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.6rem 1.5rem', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}>
            Assess My Need
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8 }}>{result}</div>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[
            { icon: '💰', label: 'Sump Pump Installed', val: '$800–$2,000' },
            { icon: '🔋', label: 'Battery Backup Add-on', val: '$300–$600' },
            { icon: '🔧', label: 'Annual Maintenance', val: 'Test + clean annually' },
            { icon: '🌧️', label: 'DFW Storm Season', val: 'March – June peak' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#1a2744', borderRadius: 8, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600 }}>{s.val}</div>
              <div style={{ color: '#a0aec0', fontSize: '0.85rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}