import { useState } from 'react';

const issues = [
  { label: 'Grout Sealing', icon: '🔒', guide: 'Seal grout annually in DFW — hard water leaves calcium deposits that etch unsealed grout. Use penetrating silicone-based grout sealer (not topical). Apply after thorough cleaning, let cure 24-48 hours before water exposure. DFW water hardness averages 250-350 ppm — highest impact on bathroom and kitchen grout.' },
  { label: 'Grout Cleaning', icon: '🧽', guide: 'Avoid muriatic acid or bleach-based cleaners on colored grout — they fade and weaken. Use pH-neutral enzymatic cleaners or oxygen bleach (OxiClean) diluted 10:1. For hard water deposits, apply white vinegar carefully (avoid on polished porcelain edges). Steam cleaning is the gold standard for DFW homes.' },
  { label: 'Porcelain vs Ceramic', icon: '⚖️', guide: 'Porcelain wins in DFW heat: fired at higher temps, water absorption under 0.5% vs ceramic\’s 3-7%. In DFW summers (110°F), ceramic near exterior doors can micro-crack. Porcelain rated for full outdoor use. Ceramic still fine for interior walls and low-traffic areas. Both handle DFW temperature swings well indoors.' },
  { label: 'Foundation Crack', icon: '💔', guide: 'DFW foundation movement is the leading cause of tile cracking. Diagonal cracks across multiple tiles = foundation issue, not a tile problem. Address foundation before retiling. Use crack isolation membrane (Schluter DITRA) between new tile and slab to absorb future movement. Without it, cracks recur within 1-3 years.' },
  { label: 'Grout Discoloration', icon: '🎨', guide: 'DFW hard water causes white mineral buildup (efflorescence) and iron staining. Efflorescence: remove with diluted white vinegar, then seal. Iron staining from well water or old pipes: use oxalic acid cleaner, rinse thoroughly. Prevention: whole-home water softener reduces deposits by 80%. Grout colorant can restore faded color without regrout.' },
];

export default function DFWPorcelainTileGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🏺</div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>DFW Porcelain Tile Maintenance Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '15px', maxWidth: '560px', margin: '0 auto' }}>DFW hard water and foundation movement are your porcelain tile\'s biggest enemies. Select an issue for guidance.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {issues.map((issue, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ backgroundColor: selected === i ? '#F5E642' : '#0f2040', color: selected === i ? '#0A1628' : '#ffffff', border: '1px solid', borderColor: selected === i ? '#F5E642' : '#1e3a5f', borderRadius: '10px', padding: '18px 14px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{issue.icon}</div>
              <div style={{ fontWeight: '600', fontSize: '14px' }}>{issue.label}</div>
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ backgroundColor: '#0f2040', border: '1px solid #F5E642', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '32px' }}>{issues[selected].icon}</span>
              <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700' }}>{issues[selected].label}</h2>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '15px' }}>{issues[selected].guide}</p>
          </div>
        )}

        <div style={{ marginTop: '40px', backgroundColor: '#0f2040', borderRadius: '12px', padding: '20px', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>💧 DFW Water Quality Impact on Tile</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[['Water Hardness','250-350 ppm average — among the hardest in Texas'],['Seal Frequency','Annual grout sealing vs biennial in softer-water markets'],['Best Grout','Epoxy grout is non-porous — ideal for DFW hard water areas'],['Pro Tip','Install whole-home softener to reduce tile maintenance 60%']].map(([k,v],i) => (
              <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '12px' }}>
                <div style={{ color: '#F5E642', fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>{k}</div>
                <div style={{ color: '#94a3b8', fontSize: '12px' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px', padding: '20px', backgroundColor: '#0f2040', borderRadius: '12px', border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>Need a tile contractor in DFW?</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 28px', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>Get Free Quotes via ProLnk 🔗</button>
        </div>
      </div>
    </div>
  );
}