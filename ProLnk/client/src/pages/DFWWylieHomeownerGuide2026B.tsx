import { useState } from 'react';

const communityTips: Record<string, { title: string; tips: string[] }> = {
  'Downtown / Pre-2000': {
    title: 'Older Wylie Stock — Pre-2000',
    tips: [
      '🏠 Older slab foundations with established movement — monitor with seasonal reports',
      '🔌 Service panels 100A or less — upgrade for modern load demands',
      '🪟 Single-pane windows — Lake Lavon humidity causes condensation and rot',
      '🌿 Mature trees near foundation — root barriers and annual plumbing scope',
      '🚿 Galvanized supply lines — proactive repiping before failure',
    ],
  },
  'Early Suburbs 2000-2012': {
    title: 'Early Wylie Boom 2000–2012',
    tips: [
      '❄️ Builder HVAC systems at 14–26 years — enter replacement cycle now',
      '🏗️ Slab settling has largely stabilized — but HOA drainage may redirect water',
      '🎨 Exterior paint on 15-year cycle — check for masonry efflorescence',
      '💧 Irrigation systems aging — backflow prevention annual test required',
      '🌳 Young trees from 2005 now large — proximity to sewer lines critical',
    ],
  },
  'Master-Planned 2012-2020': {
    title: 'Master-Planned Era 2012–2020',
    tips: [
      '🏘️ HOA fees funding community amenities — reserve study impacts future assessments',
      '🏗️ Active foundation settling — watch for stair-step brick cracks',
      '🔋 Smoke/CO detectors at replacement age — 10-year lithium models recommended',
      '🪟 Energy-code windows with foam-fill frames — check for seal delamination',
      '🌊 Lake Lavon proximity — crawl space humidity monitoring if applicable',
    ],
  },
  'New Build 2020-2026': {
    title: 'New Construction 2020–2026',
    tips: [
      '📋 Builder warranty milestones — document every issue before year 1 closes',
      '🏗️ Foundation active settling phase — doors and trim gaps are expected and correctable',
      '🌿 Establish positive grade drainage immediately — Wylie clay soil pools fast',
      '🛡️ HOA CC&Rs still forming — review architectural controls before any exterior work',
      '📡 Smart home wiring — upgrade Cat6A and conduit while walls open under warranty',
    ],
  },
};

export default function DFWWylieHomeownerGuide2026B() {
  const [selected, setSelected] = useState<string | null>(null);
  const communities = Object.keys(communityTips);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK · WYLIE TX · PART 2 OF 2</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Wylie TX Homeowner Deep Dive 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Wylie exploded from 30K to 55K+ in a decade. Lake Lavon, master-planned communities, and rapid growth mean your home's age tells a very specific story.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 28 }}>
          {[{ icon: '📈', label: '10-Year Population', val: '30K → 55K+' }, { icon: '🌊', label: 'Lake Lavon Effect', val: 'Humidity & recreation boom' }, { icon: '🏠', label: 'Median Home Price', val: '$385K (2026)' }, { icon: '🏘️', label: 'Master-Planned %', val: '~60% of new builds' }].map(c => (
            <div key={c.label} style={{ background: '#111e35', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22 }}>{c.icon}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>{c.label}</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>{c.val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🏘️ Select Your Community Era</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {communities.map(c => (
              <button key={c} onClick={() => setSelected(c === selected ? null : c)}
                style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, background: selected === c ? '#F5E642' : '#1e2f4a', color: selected === c ? '#0A1628' : '#fff' }}>
                {c}
              </button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>{communityTips[selected].title}</div>
              {communityTips[selected].tips.map((t, i) => <div key={i} style={{ marginBottom: 8, fontSize: 14, lineHeight: 1.5 }}>{t}</div>)}
            </div>
          )}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🌊 Lake Lavon Proximity Checklist</h2>
          {[{ icon: '💧', text: 'Elevated humidity accelerates wood rot — inspect fascia, soffits, and deck boards annually' }, { icon: '🐜', text: 'Moisture-rich environment attracts termites — preventive treatment every 2 years' }, { icon: '🏠', text: 'Flood zone awareness — confirm FEMA map classification before insurance renewal' }].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.5 }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#F5E642', borderRadius: 10, color: '#0A1628', textAlign: 'center', fontWeight: 700 }}>
          Get Wylie-Verified Pros on ProLnk — Free Quotes in 24 Hours
        </div>
      </div>
    </div>
  );
}