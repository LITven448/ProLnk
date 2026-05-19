import { useState } from 'react';

const areaGuide: Record<string, { label: string; tips: string[] }> = {
  'West Frisco / Legacy': {
    label: 'West Frisco / Legacy Corridor',
    tips: [
      '🏗️ Homes 2000–2010 — foundation fully settled, monitor for drainage pattern shifts',
      '❄️ HVAC 15–25 years old — most systems in active replacement cycle ($9K–$15K)',
      '🪟 First-gen builder windows — seal failures common, energy bills rising',
      '🌳 Mature oak canopy — root barrier and annual sewer scope recommended',
      '🎨 Brick exterior at 15–25 years — repointing and sealer application due',
    ],
  },
  'The Star / Cowboys Area': {
    label: 'Near The Star — Sports District',
    tips: [
      '🏗️ Mixed vintage 2005–2018 — blend of settling-complete and mid-cycle homes',
      '❄️ HVAC at critical 8–20 year window — 50% likely need replacement within 3 years',
      '🏘️ High-density HOA communities — reserve fund health critical before purchase',
      '🌆 Commercial adjacency — ambient light and noise affect home values and material wear',
      '💰 Premium location = premium maintenance standards — HOA enforcement active',
    ],
  },
  'East Frisco / 380 Corridor': {
    label: 'East Frisco / US-380 Corridor',
    tips: [
      '🏗️ Homes 2010–2020 — in first major maintenance cycle',
      '❄️ First HVAC replacement approaching — Frisco heat load is intense on east-facing units',
      '🌿 Irrigation systems at 6–16 years — controller and head replacement common',
      '🔌 EV charger demand surging — panel upgrade may be needed in older garages',
      '📋 HOA architectural reviews — exterior projects require 30-day lead time minimum',
    ],
  },
  'North Frisco / Panther Creek': {
    label: 'North Frisco / Panther Creek Area',
    tips: [
      '🏗️ Homes 2015–2022 — still in settling phase for newer builds',
      '🏘️ Master-planned communities with mature amenities — HOA fees trending higher',
      '❄️ Larger homes = 2-zone HVAC — manage two replacement timelines simultaneously',
      '💧 Sprinkler systems at critical age — Frisco water restrictions make efficiency critical',
      '🌳 10-year trees now large — assess proximity to foundation and utility lines',
    ],
  },
};

export default function DFWFriscoHomeownerGuide2026B() {
  const [selected, setSelected] = useState<string | null>(null);
  const areas = Object.keys(areaGuide);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · FRISCO TX · PART 2 OF 2</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Frisco TX Homeowner Deep Dive 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Frisco's established premium market — The Star, FC Dallas, master-planned communities. Homes 2005–2020 are hitting major maintenance cycles. Know your area.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 28 }}>
          {[{ icon: '🏟️', label: 'Anchor Development', val: 'The Star (Cowboys HQ)' }, { icon: '🏠', label: 'Median Home Price', val: '$580K (2026)' }, { icon: '🏗️', label: 'Primary Vintage', val: '2005–2020 builds' }, { icon: '❄️', label: 'HVAC Cycle Status', val: 'First replacement wave' }].map(c => (
            <div key={c.label} style={{ background: '#111e35', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22 }}>{c.icon}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{c.label}</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📍 Select Your Frisco Area</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {areas.map(a => (
              <button key={a} onClick={() => setSelected(a === selected ? null : a)}
                style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, background: selected === a ? '#F5E642′ : '#1e2f4a', color: selected === a ? '#0A1628' : '#fff' }}>
                {a}
              </button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>{areaGuide[selected].label}</div>
              {areaGuide[selected].tips.map((t, i) => <div key={i} style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.5 }}>{t}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>❄️ Frisco HVAC Reality Check</h2>
          {[{ icon: '📊', text: '60%+ of Frisco homes built 2005–2015 — most HVAC systems are in the 10–20 year replacement window right now' }, { icon: '💰', text: 'Typical Frisco replacement cost: $9K–$16K depending on home size and zoning' }, { icon: '⚡', text: 'Frisco utility rates are rising — high-efficiency units (18+ SEER) pay back in 4–6 years' }].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.5 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#F5E642', borderRadius: 10, color: '#0A1628', textAlign: 'center', fontWeight: 700 }}>
          Get Frisco-Verified Pros on ProLnk — Free Quotes in 24 Hours
        </div>
      </div>
    </div>
  );
}