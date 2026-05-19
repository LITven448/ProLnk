import { useState } from 'react';

const stones = [
  { label: 'Granite Countertops', icon: '🪨', guide: 'Seal annually with penetrating impregnator sealer — DFW hard water leaves calcium deposits on unsealed granite. Water test: drop on surface, if absorbs in under 4 minutes, time to seal. Avoid acidic cleaners (vinegar, lemon). Use pH-neutral dish soap. DFW heat does not affect granite; it\’s the hardest common countertop stone.' },
  { label: 'Limestone', icon: '🏔️', guide: 'Limestone is calcite-based — acids etch it instantly. No vinegar, no citrus, no acidic bathroom cleaners. DFW hard water deposits show as white haze. Remove with stone-safe calcium remover only. Seal every 6-12 months (more often than granite). Polished limestone shows etch marks more than honed. DFW limestone floors need anti-slip sealer in bathrooms.' },
  { label: 'Travertine', icon: '🌀', guide: 'Travertine has natural voids (holes) that must be filled with grout or color-matched epoxy. DFW humidity causes unfilled voids to trap moisture and mold. Seal every 6-12 months. Travertine etches from acids like limestone — strict pH-neutral cleaning only. Popular in DFW Spanish-style and Mediterranean homes; honed finish is most practical for floors.' },
  { label: 'Slate', icon: '🖤', guide: 'Slate is less common in DFW but extremely low-maintenance. Naturally cleft surface resists slipping. Seal with penetrating sealer every 2-3 years. Avoid wax or surface sealers — they cause buildup. Slate handles DFW heat well. Color variation is natural, not damage. Edges can flake (delaminate) on low-quality slate — inspect annually.' },
  { label: 'Marble', icon: '⚪', guide: 'Marble in DFW is high-maintenance. Etches from any acid (even orange juice). DFW hard water leaves deposits daily on bathroom marble. Requires monthly sealing in bathrooms, annual in low-traffic areas. Honed marble hides etching better than polished. Professional honing/re-polishing available when etching becomes severe. Not recommended for DFW kitchen countertops — granite is far more practical.' },
];

export default function DFWNaturalStoneGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>💎</div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>DFW Natural Stone Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '15px', maxWidth: '560px', margin: '0 auto' }}>DFW hard water and heat affect every stone differently. Select your stone type for maintenance guidance.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {stones.map((stone, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ backgroundColor: selected === i ? '#F5E642′ : '#0f2040', color: selected === i ? '#0A1628' : '#ffffff', border: '1px solid', borderColor: selected === i ? '#F5E642' : '#1e3a5f', borderRadius: '10px', padding: '18px 14px', cursor: ’pointer', textAlign: 'left', transition: 'all 0.2s' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stone.icon}</div>
              <div style={{ fontWeight: '600', fontSize: '14px' }}>{stone.label}</div>
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={{ backgroundColor: '#0f2040', border: '1px solid #F5E642', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '32px' }}>{stones[selected].icon}</span>
              <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700′ }}>{stones[selected].label}</h2>
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '15px' }}>{stones[selected].guide}</p>
          </div>
        )}

        <div style={{ marginTop: '40px', backgroundColor: '#0f2040', borderRadius: '12px', padding: '20px', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>🌡️ Stone Durability in DFW Conditions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            {[['Granite','★★★★★','Best for DFW'],['Slate','★★★★☆','Very durable'],['Travertine','★★★☆☆','Needs sealing'],['Limestone','★★★☆☆','Acid sensitive'],['Marble','★★☆☆☆','High maintenance']].map(([stone,stars,note],i) => (
              <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                <div style={{ color: '#ffffff', fontWeight: '600', fontSize: '12px' }}>{stone}</div>
                <div style={{ color: '#F5E642', fontSize: '11px', margin: '2px 0′ }}>{stars}</div>
                <div style={{ color: '#94a3b8', fontSize: '11px' }}>{note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px', padding: '20px', backgroundColor: '#0f2040', borderRadius: '12px', border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '12px' }}>Need a stone care specialist in DFW?</p>
          <button style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 28px', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>Get Free Quotes via ProLnk 🔗</button>
        </div>
      </div>
    </div>
  );
}