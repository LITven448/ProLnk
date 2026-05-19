import { useState } from 'react';

export default function DFWCrepeMyrtleGuide2026() {
  const [treeSize, setTreeSize] = useState('medium');
  const [use, setUse] = useState('accent');

  const varieties: Record<string, Record<string, string>> = {
    dwarf: {
      accent: 'Dwarf varieties (3-6ft): ’Pixie White' or 'Chickasaw' Pink. Perfect for foundation beds. No pruning needed — natural mounding shape. Summer blooms June–Sept in DFW heat.',
      privacy: 'Dwarf too small for privacy screening. Step up to semi-dwarf (8-15ft) for a hedge effect. Dwarf works best as accent or container specimen.',
      shade: 'Dwarf provides no meaningful shade. Use as ornamental color plant near hardscape. For shade, select full-size variety.',
    },
    medium: {
      accent: 'Semi-dwarf (8-15ft): ’Acoma' White or 'Hopi' Pink. Flanks driveways and entries beautifully. Multi-stem natural form — no topping required.',
      privacy: 'Semi-dwarf row at 8ft spacing creates a 10ft privacy screen within 4 seasons. Acoma White blooms all summer. Loses leaves Nov–Mar — deciduous privacy gap in winter.',
      shade: 'Limited shade canopy. Better for filtered dappled light near patios than full shade. Pair with shade tree for functional outdoor cooling.',
    },
    large: {
      accent: 'Full-size (20-30ft): ’Natchez' White or 'Muskogee' Lavender — DFW standards. Multi-trunk canopy tree. Stunning in bloom July–Aug. Heritage specimens in DFW over 50 years old.',
      privacy: 'Full-size row at 15ft spacing. Provides height privacy plus ornamental value. Muskogee Lavender is DFW’s most-planted large crepe myrtle for this purpose.',
      shade: 'Natchez can provide 20ft canopy at maturity. Real shade possible under full-size crepe myrtle — DFW summers proven. Drought-tolerant once established (2 years).',
    },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>🌸</div>
        <h1 style={{ fontSize: '2rem', color: '#F5E642', marginBottom: '.5rem' }}>DFW Crepe Myrtle Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>DFW's most popular ornamental tree. Beautiful when respected. Butchered when topped.</p>

        <div style={{ background: '#7f1d1d', border: '1px solid #ef4444', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#fca5a5', margin: '0 0 .5rem 0′ }}>✂️ STOP TOPPING — This Is Crepe Murder</h2>
          <p style={{ color: '#fecaca', margin: 0 }}>Topping (cutting all branches to stubs) is permanent disfigurement. It creates knuckle-fist regrowth, weakens structure, and makes trees more disease-prone. Proper late-winter pruning (Jan–Feb) means removing crossing branches and suckers ONLY. Never cut the main trunks.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[{ icon: '✂️', label: 'Prune Time', value: 'Jan–Feb Only' }, { icon: '🌺', label: 'DFW Bloom', value: 'June–Sept' }, { icon: '🐛', label: 'Watch For', value: 'Aphids + Powdery Mildew' }, { icon: '🌡️', label: 'Heat Tolerance', value: 'Thrives in DFW Heat' }].map(s => (
            <div key={s.label} style={{ background: '#1e293b', borderRadius: '8px', padding: '1rem', border: '1px solid #334155′ }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '.8rem' }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🌸 Variety Selector</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#94a3b8', display: 'block', marginBottom: '.5rem' }}>Tree Size</label>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              {[{ v: 'dwarf', l: 'Dwarf (3-6ft)' }, { v: 'medium', l: 'Semi-Dwarf (8-15ft)' }, { v: 'large', l: 'Full Size (20-30ft)' }].map(s => (
                <button key={s.v} onClick={() => setTreeSize(s.v)} style={{ padding: '.5rem .75rem', borderRadius: '6px', border: 'none', cursor: 'pointer', background: treeSize === s.v ? '#F5E642′ : '#334155', color: treeSize === s.v ? '#0A1628' : '#fff', fontWeight: 600, fontSize: '.85rem' }}>{s.l}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#94a3b8', display: 'block', marginBottom: '.5rem' }}>Primary Use</label>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              {['accent', 'privacy', 'shade'].map(u => (
                <button key={u} onClick={() => setUse(u)} style={{ padding: '.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer', background: use === u ? '#F5E642′ : '#334155', color: use === u ? '#0A1628' : '#fff', fontWeight: 600, textTransform: ’capitalize' }}>{u}</button>
              ))}
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: '8px', padding: '1rem', color: '#e2e8f0′ }}>{varieties[treeSize][use]}</div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '.5rem' }}>🔗</div>
          <p style={{ color: '#0A1628', fontWeight: 700, margin: 0 }}>ProLnk connects DFW homeowners with licensed arborists who know crepe myrtles — no topping, ever.</p>
        </div>
      </div>
    </div>
  );
}
