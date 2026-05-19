import { useState } from 'react';

const scenarios = [
  { id: 'metal-rain', label: '🌧️ Metal roof + heavy DFW rain', advice: 'Metal roofing amplifies rain impact significantly. DFW spring storms can create 80+ dB impact noise. Solution: add mass-loaded vinyl (MLV) under metal panels or upgrade attic insulation to R-38+ dense-pack. Ribbed metal is louder than standing seam.' },
  { id: 'highway', label: '🛣️ Home near DFW highway or tollway', advice: 'I-35, 635, DNT, and 121 corridors require special consideration. Architectural shingles alone won\’t block traffic noise — you need roof deck mass (5/8″ OSB minimum) plus attic insulation. Consider STC-rated roof assemblies for homes within 1,500 feet of major roads.' },
  { id: 'shingle-impact', label: '🪨 Hail impact noise on shingles', advice: 'Architectural shingles absorb energy better than 3-tab, reducing impact noise 8–12 dB. Class 4 impact-resistant shingles (polymer-modified) further dampen hail sound. DFW hail season (March–June) makes this a real quality-of-life consideration.' },
  { id: 'thin-deck', label: '📦 Hearing every creak and expansion noise', advice: 'Thermal expansion of roof decking creates noise as DFW temperatures swing 40°F daily in spring. Thin 7/16″ OSB decks are noisier than 5/8″ plywood. Re-decking with plywood and ring-shank nails reduces thermal creak significantly.' },
  { id: 'neighbor', label: '🏘️ Neighbor\’s AC unit near your bedroom', advice: 'Exterior noise from adjacent units travels through soffit and attic more than roofing material. Add baffled ridge vents and seal attic bypasses to reduce transmitted mechanical noise from neighbor equipment.' },
];

export default function DFWRoofingDecibelGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState<'guide' | 'tool'>('guide');

  const match = scenarios.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em' }}>
          PROLNK · DFW ROOFING GUIDE 2026
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem', lineHeight: 1.2 }}>
          🔊 DFW Roofing and Noise Guide 2026
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Your roof is the first barrier against DFW weather noise. Metal roofing, rain intensity, proximity to highways, and decking thickness all affect how loud your home is inside.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          {(['guide', 'tool'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '0.5rem 1.2rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem',
              background: tab === t ? '#F5E642′ : '#1e3a5f', color: tab === t ? '#0A1628' : '#94a3b8'
            }}>{t === 'guide' ? '📖 Guide' : '🎯 My Situation'}</button>
          ))}
        </div>

        {tab === 'guide' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: '🏚️', title: 'Metal Roofing + DFW Rain', body: 'Metal is 15–20 dB louder than shingles during rain. DFW averages 37″ of rain per year — not Seattle, but intense spring cells are common. Spray foam underside of metal panels or add 2″ rigid insulation to dramatically reduce rain noise.' },
              { icon: '🏠', title: 'Architectural Shingles Absorb Impact', body: 'Multi-layer asphalt shingles dampen impact noise better than single-layer products. Class 4 polymer-modified shingles have rubber-like compounds that absorb hail and rain energy — quieter interior and lower insurance in DFW.' },
              { icon: '🛣️', title: 'DFW Highway Proximity', body: 'Homes within 1 mile of major DFW highways experience sustained traffic noise. Your roof assembly matters: 5/8″ plywood deck + R-38 attic insulation + baffled ridge vents can reduce exterior traffic noise by 12–18 STC points.' },
              { icon: '📐', title: 'Decking Thickness Matters', body: '7/16″ OSB (standard) vs 5/8″ plywood — the thicker, heavier deck transmits less impact noise. When replacing your DFW roof, spec 5/8″ plywood for measurable interior noise reduction at modest upcharge.' },
              { icon: '🌡️', title: 'Thermal Expansion Noise', body: 'DFW spring days can swing from 45°F to 90°F. Metal and OSB decks expand and contract, creating creaks. Ring-shank nails reduce deck movement. Proper ventilation (balanced soffit-to-ridge) stabilizes attic temperature and reduces thermal cycling noise.' },
            ].map(card => (
              <div key={card.title} style={{ background: '#132240', borderRadius: '0.75rem', padding: '1.25rem', borderLeft: '4px solid #F5E642′ }}>
                <div style={{ fontWeight: 700, marginBottom: '0.4rem', fontSize: '1rem' }}>{card.icon} {card.title}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{card.body}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tool' && (
          <div>
            <p style={{ color: '#94a3b8', marginBottom: '1.2rem', fontSize: '0.9rem' }}>Select your DFW noise concern to get targeted recommendations:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {scenarios.map(s => (
                <button key={s.id} onClick={() => setSelected(s.id)} style={{
                  background: selected === s.id ? '#1e3a5f' : '#132240', border: selected === s.id ? '2px solid #F5E642′ : '2px solid transparent',
                  borderRadius: '0.75rem', padding: '0.9rem 1.2rem', color: '#e2e8f0', cursor: 'pointer', textAlign: 'left', fontSize: '0.9rem', fontWeight: 600
                }}>{s.label}</button>
              ))}
            </div>
            {match && (
              <div style={{ background: '#132240', borderRadius: '0.75rem', padding: '1.25rem', borderLeft: '4px solid #F5E642′ }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>🔊 Sound Management Plan</div>
                <div style={{ color: '#e2e8f0', lineHeight: 1.7, fontSize: '0.95rem' }}>{match.advice}</div>
                <div style={{ marginTop: '1rem', padding: '0.8rem', background: '#0A1628', borderRadius: '0.5rem', fontSize: '0.85rem', color: '#94a3b8′ }}>
                  📞 Connect with a DFW roofing specialist through ProLnk for noise-reduction roofing options.
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: '2.5rem', padding: '1rem 1.5rem', background: '#132240', borderRadius: '0.75rem', fontSize: '0.8rem', color: '#64748b', textAlign: 'center' }}>
          ProLnk connects DFW homeowners with vetted roofing professionals · prolnk.io
        </div>
      </div>
    </div>
  );
}