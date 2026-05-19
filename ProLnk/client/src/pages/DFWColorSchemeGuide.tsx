import { useState } from 'react';

const homeStyles = [
  { id: 'ranch', label: '🏡 Ranch' },
  { id: 'craftsman', label: '🪵 Craftsman' },
  { id: 'modern', label: '🏢 Modern' },
  { id: 'transitional', label: '⬛ Transitional' },
];

const palettes: Record<string, { interiorMain: string; interiorAccent: string; exteriorBody: string; exteriorTrim: string; interiorNotes: string; exteriorNotes: string; avoid: string[] }> = {
  ranch: {
    interiorMain: 'Accessible Beige (SW 7036) or Agreeable Gray (SW 7029)',
    interiorAccent: 'Deep navy or warm terracotta for accent walls',
    exteriorBody: 'Accessible Beige or Classic White — HOA-friendly across all DFW suburbs',
    exteriorTrim: 'Crisp White or Bright White for contrast',
    interiorNotes: 'Ranch buyers in DFW skew multigenerational — warm neutrals appeal broadly. Avoid stark gray undertones in Texas light which can read purple.',
    exteriorNotes: 'Hail-resistant paint matters in DFW — Sherwin-Williams Duration or Emerald Exterior hold color after hail events. Beige tones hide hail pitting better than white.',
    avoid: ['Cool gray with blue undertones (reads purple in Texas sun)', 'Dark brown exteriors (hold heat, HOA pushback)', 'Trendy terracotta exterior (limits buyer pool)', 'White-white interior (shows every mark in family homes)'],
  },
  craftsman: {
    interiorMain: 'Antique White or Creamy (SW 7012) for trim-heavy craftsman detail',
    interiorAccent: 'Forest green or deep charcoal to honor craftsman palette',
    exteriorBody: 'Sage green, slate gray, or warm tan — craftsman colors sell the character',
    exteriorTrim: 'Crisp white or contrasting deep color for bracket and rafter details',
    interiorNotes: 'Craftsman buyers in DFW appreciate color that honors architectural detail. Creamy whites on all millwork with warm wall color creates depth. Greige walls with white detail is the safe DFW craftsman formula.',
    exteriorNotes: 'Craftsman color variety is acceptable to HOAs if in approved palette. Sage and slate perform well — they read quality and are hail-damage forgiving. Avoid painting brick if home has brick — staining is preferred.',
    avoid: ['Stark modern white (fights craftsman character)', 'Gray with green undertone exterior (hard to resell)', 'Painting over craftsman brick exterior', 'Matching body and trim color (loses architectural drama)'],
  },
  modern: {
    interiorMain: 'Pure White (SW 7005) or Alabaster (SW 7008) for clean modern baseline',
    interiorAccent: 'Charcoal feature wall or black cabinetry accent',
    exteriorBody: 'Charcoal, slate, or soft black — modern DFW buyers embrace bold exterior',
    exteriorTrim: 'Match body or use matte black for full modern effect',
    interiorNotes: 'Modern DFW buyers are typically younger professionals. White plus one dramatic element (black island, charcoal accent wall) is the current formula. Warm white outperforms cool white in DFW natural light.',
    exteriorNotes: 'Dark modern exteriors are rising in DFW but face HOA scrutiny — verify before committing. Dark colors absorb heat more in Texas summers. Use higher-grade paint for thermal resistance.',
    avoid: ['Beige or warm gray (undermines modern aesthetic)', 'Multiple accent colors breaking clean modern lines', 'Dark exterior without HOA approval', 'Cool blue-toned whites (yellow in Texas sun)'],
  },
  transitional: {
    interiorMain: 'Repose Gray (SW 7015) or Agreeable Gray — the universal DFW transitional base',
    interiorAccent: 'Navy blue, warm wood tones, or muted sage for layering',
    exteriorBody: 'Light tan, warm gray, or greige — broad appeal for DFW transitional market',
    exteriorTrim: 'White with slight warm undertone — avoid stark pure white',
    interiorNotes: 'Transitional is the dominant style in new DFW construction. Agreeable Gray became the default because it appeals to the widest buyer pool — warm enough for traditional buyers, clean enough for modern buyers.',
    exteriorNotes: 'Greige (gray-beige) is the DFW HOA-safest choice — approved in virtually every community. Pair with white trim for maximum curb appeal. Transitional exteriors add value across all DFW submarkets.',
    avoid: ['Bold single-color statements that limit buyer pool', 'Overly warm yellow-beige (dated in 2026)', 'Gray with purple undertone in Texas afternoon light', 'Mixing warm and cool undertones across surfaces'],
  },
};

export default function DFWColorSchemeGuide() {
  const [selected, setSelected] = useState('');
  const pal = selected ? palettes[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#F5F2EB', color: '#1A1A2E', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#8B6914', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🎨 DFW Home Seller Guide</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2, color: '#0A1628′ }}>Color Scheme Guide<br />for DFW Homes 2026</h1>
        <p style={{ color: '#5A6280', marginBottom: 40, fontSize: 16, lineHeight: 1.7 }}>
          DFW buyers have clear color preferences shaped by Texas light, HOA requirements, hail-resistance needs, and neighborhood norms. The wrong color scheme can cost you buyers before they walk in the door.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '☀️', title: 'Texas Light Reality', note: 'Colors that look perfect in northern states can read purple, yellow, or green under DFW\’s intense sun' },
            { icon: '🏘️', title: 'HOA Compliance', note: '85% of DFW new construction is in HOA communities — exterior colors must be pre-approved' },
            { icon: '🌧️', title: 'Hail Resistance', note: 'Choose paint quality over trendy colors — hail events annually in DFW make durability critical' },
            { icon: '🏠', title: 'Broad Appeal Wins', note: 'Neutral palettes increase buyer pool size — the right neutral adds $15K–$30K vs bold choices' },
          ].map(tip => (
            <div key={tip.title} style={{ background: '#FFFFFF', borderRadius: 10, padding: 20, border: '1px solid #E0D9CC', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{tip.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, color: '#0A1628′ }}>{tip.title}</div>
              <div style={{ fontSize: 13, color: '#5A6280', lineHeight: 1.5 }}>{tip.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #E0D9CC', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#0A1628′ }}>🔍 Color Palette Recommender</h2>
          <p style={{ color: '#5A6280', marginBottom: 16, fontSize: 14 }}>Select your home style to get DFW-optimized color recommendations:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
            {homeStyles.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#0A1628′ : '#F5F2EB', color: selected === s.id ? '#F5E642' : '#1A1A2E', border: '2px solid', borderColor: selected === s.id ? '#0A1628' : '#E0D9CC', borderRadius: 8, padding: '14px 16px', cursor: ’pointer', fontWeight: 700, fontSize: 15 }}>
                {s.label}
              </button>
            ))}
          </div>
          {pal && (
            <div style={{ border: '2px solid #0A1628', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ background: '#0A1628', color: '#F5E642', padding: '14px 24px', fontWeight: 700, fontSize: 16 }}>
                {homeStyles.find(s => s.id === selected)?.label} — DFW Color Recommendations
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                  <div style={{ background: '#F5F2EB', borderRadius: 8, padding: 16 }}>
                    <div style={{ fontWeight: 700, marginBottom: 12, color: '#0A1628', borderBottom: '2px solid #E0D9CC', paddingBottom: 8 }}>🏠 Interior Palette</div>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: '#8B6914', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Main Color</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#0A1628′ }}>{pal.interiorMain}</div>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: '#8B6914', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Accent</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#0A1628′ }}>{pal.interiorAccent}</div>
                    </div>
                    <div style={{ fontSize: 13, color: '#5A6280', lineHeight: 1.6 }}>{pal.interiorNotes}</div>
                  </div>
                  <div style={{ background: '#F5F2EB', borderRadius: 8, padding: 16 }}>
                    <div style={{ fontWeight: 700, marginBottom: 12, color: '#0A1628', borderBottom: '2px solid #E0D9CC', paddingBottom: 8 }}>🏡 Exterior Palette</div>
                    <div style={{ marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: '#8B6914', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Body Color</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#0A1628′ }}>{pal.exteriorBody}</div>
                    </div>
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 11, color: '#8B6914', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Trim Color</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#0A1628′ }}>{pal.exteriorTrim}</div>
                    </div>
                    <div style={{ fontSize: 13, color: '#5A6280', lineHeight: 1.6 }}>{pal.exteriorNotes}</div>
                  </div>
                </div>
                <div style={{ background: '#FFF5F5', borderRadius: 8, padding: 16, border: '1px solid #FFCCCC' }}>
                  <div style={{ fontWeight: 700, marginBottom: 10, color: '#CC0000', fontSize: 14 }}>⚠️ Colors to Avoid for DFW Buyers</div>
                  {pal.avoid.map((a, i) => <div key={i} style={{ fontSize: 13, color: '#5A6280', marginBottom: 5, lineHeight: 1.4 }}>❌ {a}</div>)}
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: 28, color: '#E8EAF0′ }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>💡 Universal DFW Color Rules</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              'Test paint chips in DFW light — morning and 4pm sun read very differently',
              'Agreeable Gray (SW 7029) is the #1 performing DFW interior color — universal appeal',
              'Warm whites always outperform cool whites in Texas natural light',
              'Exterior: submit HOA color request 2–3 weeks before painting project',
              'Use Duration or Emerald Exterior for hail-belt durability',
              'Interior accent walls should be one shade, not feature wallpaper — cleaner for photos',
            ].map((rule, i) => (
              <div key={i} style={{ background: '#0F2040', borderRadius: 8, padding: 12, fontSize: 13, color: '#8B9DC3', lineHeight: 1.5 }}>
                ✅ {rule}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
