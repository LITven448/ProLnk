import { useState } from 'react';

export default function DFWInteriorPrimerGuide2026() {
  const [surface, setSurface] = useState('drywall');

  const getPrimer = () => {
    const map: Record<string, { primer: string; brand: string; tip: string }> = {
      drywall: { primer: 'PVA Drywall Primer', brand: 'Sherwin-Williams ProMar PVA Primer', tip: 'Always prime new drywall — paint alone will absorb unevenly and look blotchy.' },
      dark: { primer: 'Tinted High-Hide Primer', brand: 'Zinsser Bulls Eye 1-2-3 tinted gray', tip: 'Ask your paint store to tint primer toward your finish color — reduces coats from 3 to 2.' },
      sheen: { primer: 'Bonding Primer', brand: 'KILZ Adhesion or SW Extreme Bond', tip: 'Degloss with liquid deglosser first, then apply bonding primer. Skipping this step causes peeling within 1 year.' },
      stain: { primer: 'Shellac-Based Stain Blocker', brand: 'Zinsser BIN Shellac', tip: 'Water stains, smoke, and pet odors require shellac. Latex stain blockers won’t seal — only shellac works.' },
      bare: { primer: 'Oil or Latex Wood Primer', brand: 'SW Premium Wall & Wood Primer', tip: 'Sand bare wood to 120 grit before priming. Raise the grain with a damp cloth, let dry, sand again.' },
    };
    return map[surface] || map.drywall;
  };

  const rec = getPrimer();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 14, fontWeight: 700 }}>🎨 DFW PAINTING GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Interior Primer Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>When to prime, which primer to use, and DFW-specific timing rules for perfect adhesion.</p>

        <div style={{ backgroundColor: '#111f38', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚙️ Surface Type → Primer Recommendation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8′ }}>What are you priming?</label>
            <select value={surface} onChange={e => setSurface(e.target.value)} style={{ width: '100%', padding: '10px 12px', backgroundColor: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
              <option value="drywall">New drywall / fresh mud</option>
              <option value="dark">Dark or bold existing color</option>
              <option value="sheen">High-sheen existing paint</option>
              <option value="stain">Water stain / smoke / odor</option>
              <option value="bare">Bare wood trim or millwork</option>
            </select>
          </div>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ {rec.primer}</div>
            <div style={{ marginBottom: 6 }}><strong>Brand:</strong> {rec.brand}</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>💡 {rec.tip}</div>
          </div>
        </div>

        {[
          { icon: '☀️', title: 'DFW Humidity Timing Rule', body: 'Oil-based primers need 40-60% humidity to cure properly. DFW summers can spike to 80%+ humidity in the morning. Prime after 10am when humidity drops. Check Weather.com before starting — high humidity causes oil primer to stay tacky for days.' },
          { icon: '🚫', title: 'When You Can Skip Primer', body: 'If walls are already painted with latex in good condition, same color family, and no stains — you can skip primer. Self-priming paints like SW Emerald work in this case. But in DFW homes with hard water or pet stains, always prime.' },
          { icon: '⏱️', title: 'Dry Time in DFW Summers', body: 'Latex primer: 1-2 hours dry, 4 hours recoat in DFW summer heat. Oil primer: 8-24 hours. Shellac: 45 minutes — fastest option and works in high humidity. Shellac is the DFW painter’s secret weapon for problem surfaces.' },
        ].map((card, i) => (
          <div key={i} style={{ backgroundColor: '#111f38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{card.icon} {card.title}</div>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{card.body}</p>
          </div>
        ))}

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontSize: 20, marginBottom: 8 }}>🖌️</div>
          <div style={{ fontWeight: 800, marginBottom: 4 }}>Need a DFW Painting Pro?</div>
          <div style={{ fontSize: 13 }}>ProLnk connects you with vetted local painters — free quotes, verified reviews.</div>
        </div>
      </div>
    </div>
  );
}

