import { useState } from 'react';

const pierTypes = [
  { icon: '🔔', name: 'Bell-Bottom Piers', detail: 'Drilled into DFW clay until rock layer, then belled out to 18–24". Shaft filled with concrete grout for full structural column.' },
  { icon: '🌀', name: 'Helical Piers — Solid Shaft', detail: 'Solid steel shaft screwed into ground. Grout sleeve optional — used when corrosion from DFW expansive clay is a concern.' },
  { icon: '⬜', name: 'Helical Piers — Hollow Shaft', detail: 'Hollow shaft allows grout injection through center after installation, filling voids around helix blades for enhanced load transfer.' },
  { icon: '🧱', name: 'Push Piers', detail: 'Hydraulically driven segments. Grout is not part of installation — load transferred mechanically to competent strata.' },
];

const decisions = [
  { concern: 'Corrosive DFW clay soil', type: 'Helical', recommendation: 'Grout recommended — encases shaft, prevents sulfate attack from expansive clay minerals common in North Texas.' },
  { concern: 'Bell-bottom pier installation', type: 'Bell-Bottom', recommendation: 'Grout required — shaft must be fully filled to create monolithic concrete column with the belled foot.' },
  { concern: 'Load transfer in soft clay zone', type: 'Helical Hollow', recommendation: 'Grout injection required — fills annular void around helices, dramatically improving lateral load capacity.' },
  { concern: 'Budget-conscious repair', type: 'Push Pier', recommendation: 'Grouting not applicable — mechanically driven system requires no grout. Verify depth reaches load-bearing stratum.' },
  { concern: 'Near coastal or wet DFW area', type: 'Helical', recommendation: 'Grout strongly recommended — moisture accelerates corrosion; grout adds 40+ years of corrosion protection.' },
];

export default function DFWFoundationPierGrouting2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW FOUNDATION</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>DFW Foundation Pier Grouting Guide 2026</h1>
        <p style={{ color: '#8899aa', fontSize: 14, marginBottom: 32 }}>When DFW contractors grout piers — and when it's optional vs. required.</p>

        <div style={{ marginBottom: 36 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>Pier Types and Grouting Role</div>
          {pierTypes.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, background: '#0f1f38', borderRadius: 10, padding: '16px 18px', marginBottom: 14 }}>
              <div style={{ fontSize: 24 }}>{p.icon}</div>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{p.name}</div>
                <div style={{ color: '#c0cce0', fontSize: 14, lineHeight: 1.6 }}>{p.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f38', borderRadius: 12, padding: '24px 20px', marginBottom: 32 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🧪 Grouting Decision Guide</div>
          <p style={{ color: '#8899aa', fontSize: 13, marginBottom: 16 }}>Select your soil concern to see grouting recommendation:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {decisions.map((d, i) => (
              <div key={i}>
                <button
                  onClick={() => setSelected(selected === i ? null : i)}
                  style={{ width: '100%', textAlign: 'left', background: selected === i ? '#F5E642' : '#162035', color: selected === i ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}
                >
                  {d.concern}
                </button>
                {selected === i && (
                  <div style={{ background: '#1a2d4a', borderRadius: '0 0 8px 8px', padding: '12px 16px', color: '#c0cce0', fontSize: 14, lineHeight: 1.6 }}>
                    <strong style={{ color: '#F5E642' }}>Pier Type: {d.type}</strong><br />{d.recommendation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: '18px 20px', textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>🏗️ Need a DFW Foundation Specialist?</div>
          <div style={{ color: '#0A1628', fontSize: 13, marginTop: 6 }}>ProLnk connects DFW homeowners with licensed foundation contractors — free assessment quotes.</div>
        </div>
      </div>
    </div>
  );
}