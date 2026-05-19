import { useState } from 'react';

export default function DFWHVACTonGuide2026() {
  const [sqft, setSqft] = useState(2000);
  const [insulation, setInsulation] = useState('average');
  const [ceilings, setCeilings] = useState('standard');
  const [windows, setWindows] = useState('average');

  const multiplier =
    (insulation === 'poor' ? 1.15 : insulation === 'excellent' ? 0.85 : 1) *
    (ceilings === 'high' ? 1.1 : 1) *
    (windows === 'many' ? 1.1 : windows === 'few' ? 0.95 : 1);

  const sqftPerTon = Math.round(500 / multiplier);
  const tons = (sqft / sqftPerTon).toFixed(1);
  const btu = Math.round(parseFloat(tons) * 12000);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK · DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>❄️ HVAC Ton & BTU Sizing Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW climate demands precise sizing. Too big = humidity problems. Too small = constant running. Manual J is the only true method.</p>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '20px 24px', marginBottom: 24, color: '#0A1628′ }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>⚡ DFW Sizing Rule of Thumb</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[{ label: 'Well-Insulated', val: '1 ton per 600 sqft' }, { label: 'Average Home', val: '1 ton per 500 sqft' }, { label: 'Poor Insulation', val: '1 ton per 400 sqft' }].map(i => (
              <div key={i.label} style={{ background: 'rgba(10,22,40,0.12)', borderRadius: 8, padding: '12px' }}>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{i.label}</div>
                <div style={{ fontWeight: 700 }}>{i.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 20, color: '#F5E642′ }}>🏠 My Home Sizing Calculator</div>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Home Size: {sqft.toLocaleString()} sqft</label>
              <input type="range" min={500} max={5000} step={100} value={sqft} onChange={e => setSqft(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
            {[{ label: 'Insulation Quality', value: insulation, setter: setInsulation, opts: [{v:'poor',l:'Poor'},{v:'average',l:'Average'},{v:'excellent',l:'Excellent'}] },
              { label: 'Ceiling Height', value: ceilings, setter: setCeilings, opts: [{v:'standard',l:'Standard (8-9ft)'},{v:'high',l:'High (10ft+)'}] },
              { label: 'Window Count', value: windows, setter: setWindows, opts: [{v:'few',l:'Few'},{v:'average',l:'Average'},{v:'many',l:'Many/Large'}] }
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>{f.label}</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {f.opts.map(o => (
                    <button key={o.v} onClick={() => f.setter(o.v)} style={{ flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer', background: f.value === o.v ? '#F5E642′ : '#1e3a5f', color: f.value === o.v ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 13 }}>{o.l}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ color: '#F5E642', fontSize: 32, fontWeight: 700 }}>{tons} Tons</div>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>{btu.toLocaleString()} BTU · Estimated — Manual J required for final sizing</div>
          </div>
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: '#F5E642′ }}>⚠️ Why Oversizing Hurts in DFW</div>
          {['Short-cycling prevents proper humidity removal — DFW humidity is brutal','Higher upfront cost with worse comfort','More wear and tear on components from frequent starts','Manual J accounts for orientation, shade, and local climate data'].map(t => (
            <div key={t} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642′ }}>›</span><span style={{ color: '#cbd5e1', fontSize: 14 }}>{t}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center', color: '#0A1628′ }}>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🔍 Get a Proper Manual J from a DFW Pro</div>
          <div style={{ fontSize: 13 }}>ProLnk connects you with verified DFW HVAC contractors who do load calculations correctly.</div>
        </div>
      </div>
    </div>
  );
}
