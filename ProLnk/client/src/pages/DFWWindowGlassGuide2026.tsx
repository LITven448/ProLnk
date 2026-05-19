import { useState } from 'react';

export default function DFWWindowGlassGuide2026() {
  const [orientation, setOrientation] = useState('south');
  const [concern, setConcern] = useState('cooling');
  const [result, setResult] = useState('');

  const getRecommendation = () => {
    const map: Record<string, Record<string, string>> = {
      south: {
        cooling: 'Low-E 366 glass, SHGC 0.20-0.25, U-0.27. Blocks 66% of solar heat gain. Critical for south-facing DFW windows — biggest cooling load driver.',
        glare: 'Tinted Low-E glass, SHGC 0.20, visible light transmittance 45-55%. Reduces glare while maintaining Low-E performance for DFW south exposure.',
        uv: 'Low-E with UV-blocking interlayer (Solarban 60), blocks 95% UV. Protects DFW home interiors from fading on south-facing walls.',
      },
      west: {
        cooling: 'Low-E 366 glass, SHGC 0.19-0.22, U-0.25. West-facing windows in DFW receive peak afternoon heat. Strongest solar control available.',
        glare: 'Bronze tint plus Low-E, SHGC 0.18, reduces visible transmittance to 40%. DFW west windows at 4-6pm are brutal — prioritize glare control.',
        uv: 'Triple-pane with UV interlayer — rarely payback in DFW, but best UV protection for west art walls. SHGC 0.18, U-0.20.',
      },
      north: {
        cooling: 'Standard Low-E (mandatory per TX energy code), SHGC 0.40 acceptable, U-0.30. North windows gain little solar heat in DFW — focus on U-factor for winter.',
        glare: 'Clear Low-E, high visible transmittance 70% plus. North DFW windows have soft diffuse light — no need for tinting.',
        uv: 'Standard Low-E blocks 70-80% UV — sufficient for DFW north windows. Premium UV coating not typically needed.',
      },
      east: {
        cooling: 'Low-E with SHGC 0.25-0.30, U-0.27. DFW east windows get morning sun. Less critical than south/west but Low-E is still mandatory per TX energy code.',
        glare: 'Lightly tinted Low-E, visible transmittance 60-65%. DFW morning east glare is manageable with light tint.',
        uv: 'Standard Low-E (70% UV block) is sufficient for east-facing DFW windows. Save the premium coating budget for south/west.',
      },
    };
    setResult(map[orientation]?.[concern] || 'Select orientation and concern for your DFW window glass spec.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>PROLNK • DFW MATERIALS GUIDE 2026</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>🪟 DFW Window Glass Guide 2026</h1>
        <p style={{ color: '#8899AA', fontSize: 16, marginBottom: 32 }}>
          Window glass specs for DFW — Low-E is mandatory, SHGC 0.25 south/west, U-0.25 target, triple-pane rarely pays back in DFW.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🌟', label: 'Low-E Coating', desc: 'MANDATORY in DFW. Blocks 70%+ UV, reflects long-wave heat. TX energy code requires on all windows.', star: true },
            { icon: '☀️', label: 'SHGC 0.25', desc: 'Solar Heat Gain Coefficient. Use 0.20-0.25 on south/west DFW windows. 0.40 acceptable on north.', star: false },
            { icon: '🌡️', label: 'U-Factor 0.25', desc: 'Insulation value. Target U-0.25 for DFW. Below U-0.20 (triple pane) rarely has payback in hot DFW climate.', star: false },
            { icon: '🔲', label: 'Double-Pane', desc: 'Standard for DFW. Low-E double pane with argon fill hits all DFW energy code requirements economically.', star: false },
            { icon: '🔷', label: 'Triple-Pane', desc: 'Rarely pays back in DFW — designed for cold climates. Only specify if noise reduction is the priority.', star: false },
            { icon: '🛡️', label: 'Tempered Glass', desc: 'Required by code for egress windows, doors, within 24in of floor. Specify for DFW storm safety.', star: false },
          ].map(t => (
            <div key={t.label} style={{ background: '#0F2035', border: `1px solid ${t.star ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, color: t.star ? '#F5E642′ : '#fff' }}>{t.label}{t.star ? ' ⭐ Mandatory DFW' : ''}</div>
              <div style={{ color: '#8899AA', fontSize: 13 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Get Your DFW Window Glass Spec</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 6 }}>WINDOW ORIENTATION</label>
              <select value={orientation} onChange={e => setOrientation(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="south">South-Facing</option>
                <option value="west">West-Facing</option>
                <option value="east">East-Facing</option>
                <option value="north">North-Facing</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 6 }}>PRIMARY CONCERN</label>
              <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="cooling">Cooling Efficiency</option>
                <option value="glare">Glare Reduction</option>
                <option value="uv">UV Protection</option>
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get Glass Spec →
          </button>
          {result && <div style={{ marginTop: 16, background: '#162440', borderRadius: 10, padding: 16, color: '#F5E642', fontWeight: 600, lineHeight: 1.5 }}>✅ {result}</div>}
        </div>

        <div style={{ color: '#8899AA', fontSize: 12, borderTop: '1px solid #1E3A5F', paddingTop: 16 }}>
          ProLnk connects DFW homeowners with verified window contractors. TX energy code: IECC 2021, Low-E mandatory, SHGC max 0.25 south/west.
        </div>
      </div>
    </div>
  );
}
