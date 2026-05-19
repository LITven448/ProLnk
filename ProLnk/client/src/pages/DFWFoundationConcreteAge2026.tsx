import { useState } from 'react';

export default function DFWFoundationConcreteAge2026() {
  const [vintage, setVintage] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    const age = 2026 - parseInt(vintage);
    if (!vintage || isNaN(age) || age < 0) { setResult('Please enter a valid foundation year.'); return; }
    if (age <= 10) {
      setResult('YOUNG FOUNDATION: Concrete is still gaining strength. Your foundation is in its prime — no age-related concerns. Focus on keeping soil moisture consistent around the perimeter to prevent DFW clay shrinkage.');
    } else if (age <= 20) {
      setResult('MATURING: Concrete has reached peak strength. Very stable period. Watch for early carbonation signs on exposed surfaces — surface dusting or minor efflorescence from DFW hard water is normal and cosmetic only.');
    } else if (age <= 40) {
      setResult('ESTABLISHED: Concrete is stable but carbonation is progressing. DFW hard water efflorescence (white mineral deposits) is common. Watch for surface spalling in north DFW freeze zones after hard winters. Interior monitoring recommended.');
    } else {
      setResult('MATURE FOUNDATION: 40+ year concrete warrants a professional structural assessment. While concrete this age can be perfectly sound, cumulative DFW clay movement, carbonation depth, and rebar corrosion risk all increase. Get a licensed structural engineer evaluation.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>DFW Concrete Foundation Aging Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>How DFW concrete foundations change across decades — and when age alone signals that professional attention is warranted.</p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>DFW Concrete Aging Timeline</h2>
          {[
            ['0-10 Years', 'Concrete gains strength — actually getting stronger. Surface curing complete by year 5.'],
            ['10-20 Years', 'Peak structural strength achieved. Very stable period for DFW foundations.'],
            ['20-40 Years', 'Carbonation begins affecting surface depth. DFW hard water efflorescence common on exposed edges.'],
            ['40+ Years', 'Cumulative effects of DFW clay movement, carbonation depth, and thermal cycling become relevant.']
          ].map(([label, val]) => (
            <div key={label} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: '1px solid #1e3a5f' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 100, fontSize: 14 }}>{label}</span>
              <span style={{ color: '#94a3b8', fontSize: 14 }}>{val}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>DFW-Specific Aging Factors</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['Efflorescence', 'White mineral deposits from DFW hard water — cosmetic, not structural'],
              ['Carbonation', 'CO2 reacts with calcium hydroxide over decades — affects surface pH'],
              ['Spalling Risk', 'Rare in DFW but possible in north Dallas after hard freeze events'],
              ['Clay Movement', 'Seasonal shrink/swell under DFW clay is bigger concern than concrete age itself']
            ].map(([title, desc]) => (
              <div key={title} style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4, fontSize: 14 }}>{title}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>Foundation Vintage Assessment</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Year Foundation Was Poured (or home built year)</label>
            <input
              value={vintage}
              onChange={e => setVintage(e.target.value)}
              type="number"
              placeholder="e.g. 1985"
              style={{ background: '#1a2f50', border: '1px solid #2d4a7a', borderRadius: 8, padding: '10px 14px', color: '#fff', width: '100%', fontSize: 14 }}
            />
          </div>
          <button
            onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer', width: '100%' }}
          >
            Get Aging Assessment
          </button>
          {result && (
            <div style={{ marginTop: 16, background: '#1a2f50', borderRadius: 8, padding: 14, fontSize: 14, lineHeight: 1.6 }}>{result}</div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Connect with a DFW Foundation Specialist via ProLnk</div>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>ProLnk foundation contractors are licensed, background-checked, and familiar with DFW clay soil behavior across every decade of construction.</p>
        </div>
      </div>
    </div>
  );
}
