import { useState } from 'react';

const fireplaceTypes = [
  { id: 'woodburning', label: '🪵 Wood-Burning Fireplace' },
  { id: 'gaslogs', label: '🔥 Gas Log Insert' },
  { id: 'gasline', label: '💨 Direct Vent Gas Fireplace' },
  { id: 'decorative', label: '🎨 Decorative/Non-Working' },
];

const usageFreqs = [
  { id: 'rarely', label: 'Rarely (0–5 fires/year)', level: 1, inspLevel: 'Level 1', cost: [150, 225] },
  { id: 'occasional', label: 'Occasionally (6–15 fires/year)', level: 2, inspLevel: 'Level 1–2', cost: [200, 300] },
  { id: 'regular', label: 'Regularly (16–30 fires/year)', level: 2, inspLevel: 'Level 2', cost: [250, 375] },
  { id: 'heavy', label: 'Heavy Use (30+ fires/year)', level: 3, inspLevel: 'Level 2–3', cost: [300, 450] },
];

const inspectionLevels = [
  { level: 'Level 1', desc: 'Visual inspection of all accessible portions. No tools or special equipment. Required annually for routinely used fireplaces.' },
  { level: 'Level 2', desc: 'All Level 1 items plus accessible areas of attic, basement, and crawl spaces. Video scanning of flue. Required after any significant change or event.' },
  { level: 'Level 3', desc: 'All Level 2 items plus removal of components that may obstruct inspection. Reserved for serious hazards — partial structure removal possible.' },
];

export default function DFWChimneyCleaningGuide() {
  const [fpType, setFpType] = useState('');
  const [usage, setUsage] = useState('');

  const selectedUsage = usageFreqs.find(u => u.id === usage);
  const isGas = fpType === 'gaslogs' || fpType === 'gasline';
  const isDecorative = fpType === 'decorative';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0D1F3C 0%, #0A1628 100%)', borderBottom: '2px solid #F5E642', padding: '48px 24px 36px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 36 }}>🏠</span>
            <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Services Guide</span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.2 }}>
            Chimney Cleaning & Inspection Guide for DFW
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0, maxWidth: 600, lineHeight: 1.6 }}>
            DFW winters are mild, but fireplaces still need annual attention. Creosote buildup, animal nesting, and storm damage make regular inspection essential — even for rarely-used fireplaces.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🌦️ DFW-Specific Chimney Issues</h2>
          <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 32, border: '1px solid #1E3054' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              {[
                { icon: '🐦', title: 'Animal Nesting', desc: 'Chimney swifts, squirrels, and raccoons nest in unused DFW chimneys April–September. A rain cap prevents entry.' },
                { icon: '☔', title: 'Rain Cap Damage', desc: 'DFW hailstorms frequently damage rain caps. A missing or cracked cap lets water in — leading to damper and firebox rust.' },
                { icon: '🧱', title: 'Crown Cracking', desc: 'DFW temperature swings (25°F to 100°F+) crack concrete crowns. Water intrusion follows, causing spalling and liner damage.' },
                { icon: '🌊', title: 'Flashing Failure', desc: 'Clay soil movement can shift chimney bases and break flashing seals, allowing attic water intrusion during DFW storms.' },
              ].map(item => (
                <div key={item.title} style={{ padding: 16, background: '#0A1628', borderRadius: 8, border: '1px solid #1E3054' }}>
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#E8EDF5', marginBottom: 6 }}>{item.title}</div>
                  <div style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📊 Inspection Levels Explained</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
            {inspectionLevels.map(item => (
              <div key={item.level} style={{ background: '#111E33', border: '1px solid #1E3054', borderRadius: 10, padding: 18, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 12, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap', marginTop: 2 }}>{item.level}</div>
                <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#111E33', borderRadius: 12, padding: 20, marginBottom: 32, border: '1px solid #1E3054' }}>
            <h3 style={{ color: '#E8EDF5', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>✅ Always hire CSIA-certified sweeps</h3>
            <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              The Chimney Safety Institute of America (CSIA) certifies technicians on safety and cleaning standards. In DFW, verify certification at csia.org before hiring. Avoid "door hangers" offering $49 specials — these often lead to upselling on unnecessary repairs.
            </p>
          </div>
        </div>

        <div style={{ background: '#111E33', borderRadius: 14, padding: 28, border: '1px solid #F5E642', marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>🧮 Inspection Level & Cost Estimator</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: '0 0 20px' }}>Tell us about your fireplace to get a DFW inspection recommendation.</p>

          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 10, fontWeight: 600 }}>Fireplace Type</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {fireplaceTypes.map(fp => (
                <button key={fp.id} onClick={() => setFpType(fp.id)} style={{
                  padding: '9px 16px', borderRadius: 20, border: '2px solid',
                  borderColor: fpType === fp.id ? '#F5E642' : '#1E3054',
                  background: fpType === fp.id ? '#F5E642' : 'transparent',
                  color: fpType === fp.id ? '#0A1628' : '#94A3B8',
                  fontWeight: 600, fontSize: 13, cursor: 'pointer'
                }}>{fp.label}</button>
              ))}
            </div>
          </div>

          {fpType && !isDecorative && (
            <div style={{ marginBottom: 24 }}>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 10, fontWeight: 600 }}>Usage Frequency</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {usageFreqs.map(u => (
                  <button key={u.id} onClick={() => setUsage(u.id)} style={{
                    textAlign: 'left', padding: '10px 16px', borderRadius: 8, border: '2px solid',
                    borderColor: usage === u.id ? '#F5E642' : '#1E3054',
                    background: usage === u.id ? 'rgba(245,230,66,0.1)' : 'transparent',
                    color: usage === u.id ? '#F5E642' : '#94A3B8', fontWeight: 600, fontSize: 14, cursor: 'pointer'
                  }}>{u.label}</button>
                ))}
              </div>
            </div>
          )}

          {(isDecorative || (fpType && selectedUsage)) && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, border: '1px solid #1E3054' }}>
              {isDecorative ? (
                <p style={{ color: '#94A3B8', fontSize: 14, margin: 0 }}>
                  🎨 <strong style={{ color: '#F5E642' }}>Decorative fireplaces</strong> still need a Level 1 inspection every 3–5 years to verify no structural issues. Cost: <strong style={{ color: '#E8EDF5' }}>$150–$200</strong>. Ensure the damper is sealed to prevent conditioned air loss.
                </p>
              ) : selectedUsage ? (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 16, marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Recommended Inspection</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642' }}>{selectedUsage.inspLevel}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Estimated Cost</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642' }}>${selectedUsage.cost[0]}–${selectedUsage.cost[1]}</div>
                    </div>
                  </div>
                  {isGas && <p style={{ color: '#94A3B8', fontSize: 13, margin: 0, borderTop: '1px solid #1E3054', paddingTop: 12 }}>💨 Gas fireplaces produce less creosote but still require annual inspection for carbon monoxide safety, burner function, and pilot light integrity.</p>}
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
