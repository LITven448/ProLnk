import { useState } from 'react';

export default function DFWFoundationSaturation2026() {
  const [season, setSeason] = useState('');
  const [soil, setSoil] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    if (!season || !soil) { setResult('Please select both options.'); return; }
    if (soil === 'pooling') {
      setResult('🚨 OVER-SATURATED — Standing water after irrigation means soil is fully saturated. Skip watering for 5-7 days minimum. Check grading and drainage to prevent foundation heave.');
    } else if (season === 'spring' && soil === 'wet') {
      setResult('⚠️ HIGH RISK — DFW spring rains plus homeowner irrigation is the #1 over-saturation cause. Pause irrigation and let natural drainage work. Check soil before watering resumes.');
    } else if (season === 'summer' && soil === 'dry') {
      setResult('✅ WATER NOW — DFW clay soil shrinks dramatically in summer heat. Consistent foundation watering (not soaking) is critical. Aim for 6-inch moisture depth around perimeter.');
    } else if (season === 'summer' && soil === 'wet') {
      setResult('✅ GOOD — Moist soil in summer DFW is the goal. Skip the next irrigation cycle and recheck. Maintain consistent moisture, not saturation.');
    } else if (soil === 'dry') {
      setResult('⚠️ WATER NEEDED — Dry soil in any DFW season risks foundation settlement. Begin gradual watering — slow soaker hose 30 min/day around foundation perimeter.');
    } else {
      setResult('Soil appears in normal range. Check moisture 6 inches deep before each irrigation cycle. DFW foundations prefer consistent moisture over wet/dry cycles.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK DFW FOUNDATION GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>💧 DFW Soil Saturation & Foundation Risk</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          DFW clay soil moves with moisture — too dry causes settlement, too wet causes heave. Both damage foundations.
        </p>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>⚠️ Over-Saturation Warning Signs</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              { icon: '🌊', text: 'Water pooling 30+ min after irrigation ends' },
              { icon: '🏠', text: 'Doors sticking or gaps forming above door frames' },
              { icon: '🌧️', text: 'DFW spring rain + your irrigation running = double risk' },
              { icon: '📏', text: 'Soil feels spongy more than 2 inches deep' },
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', gap: 12, padding: '10px', background: '#1a2f4a', borderRadius: 8 }}>
                <span>{item.icon}</span>
                <span style={{ color: '#94a3b8', fontSize: 14 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🧪 Saturation Assessment Tool</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 13 }}>Current DFW Season</label>
            <select value={season} onChange={e => setSeason(e.target.value)}
              style={{ width: '100%', padding: '10px', background: '#1a2f4a', border: '1px solid #1e3a5a', borderRadius: 8, color: '#fff' }}>
              <option value="">Select season...</option>
              <option value="spring">Spring (Mar–May) — Rain season</option>
              <option value="summer">Summer (Jun–Sep) — Drought season</option>
              <option value="fall">Fall (Oct–Nov) — Transitional</option>
              <option value="winter">Winter (Dec–Feb) — Low evaporation</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 13 }}>Current Soil Condition (6 inches deep)</label>
            <select value={soil} onChange={e => setSoil(e.target.value)}
              style={{ width: '100%', padding: '10px', background: '#1a2f4a', border: '1px solid #1e3a5a', borderRadius: 8, color: '#fff' }}>
              <option value="">Select condition...</option>
              <option value="pooling">Standing water / pooling after irrigation</option>
              <option value="wet">Wet and muddy</option>
              <option value="moist">Moist — holds shape when squeezed</option>
              <option value="dry">Dry — cracks or crumbles</option>
            </select>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', padding: '12px 24px', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get Saturation Assessment
          </button>
          {result && (
            <div style={{ marginTop: 16, padding: 16, background: '#1a2f4a', borderRadius: 8, lineHeight: 1.6 }}>{result}</div>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: 20, background: '#0f2035', borderRadius: 12 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 ProLnk DFW Foundation Specialists</div>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>Vetted local foundation pros. Free estimates. No storm chasers.</div>
        </div>
      </div>
    </div>
  );
}