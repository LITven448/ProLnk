import { useState } from 'react';

export default function SouthlakeTownSquareGuide2026() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const types = [
    {
      id: 'luxury-sf',
      label: '🏰 Luxury Single Family',
      color: '#F5E642',
      desc: 'Custom estates near Town Square, $1M–$3M range, high-spec finishes',
      tips: [
        '🏗️ Foundation monitoring twice yearly — Southlake expansive clay soil is aggressive',
        '🌳 Tree root barrier installation — mature oaks near luxury driveways cause costly damage',
        '🔧 Whole-home generator install — Southlake buyers expect zero downtime',
        '🌡️ Multi-zone HVAC with air quality — large square footage demands zoned comfort',
        '💡 Lutron/Crestron smart lighting — HOA compliance and resale value requirement',
        '🏊 Pool automation and resort-grade resurfacing — Southlake market standard',
      ],
    },
    {
      id: 'townhome',
      label: '🏙️ Premium Townhome',
      color: '#10B981',
      desc: 'Mixed-use Town Square townhomes, lock-and-leave lifestyle, HOA managed',
      tips: [
        '🔇 Shared wall soundproofing audit — premium buyers expect acoustic separation',
        '🌬️ Individual HVAC maintenance — HOA covers common areas, units are owner responsibility',
        '💧 Unit-level water shutoff labeling — shared systems make emergency response critical',
        '🚗 EV charger rough-in — Town Square walkability attracts EV-owning buyers',
        '🏠 Interior finish refresh cycle — luxury renters expect annual updates',
        '📋 HOA documentation audit — Southlake HOAs are litigation-active, keep records pristine',
      ],
    },
    {
      id: 'estate',
      label: '🏯 Estate Property',
      color: '#8B5CF6',
      desc: '$3M+ Southlake estates, large lots, private amenities, ultra-premium standard',
      tips: [
        '🔐 Estate security system integration — camera, perimeter, smart locks all networked',
        '🌿 Commercial-grade irrigation design — 1–2 acre lots need zoned drip + spray systems',
        '🏗️ Structural inspection full scope — estates require PE-stamped annual reports',
        '⚡ 400A electrical service — home theaters, car lifts, and EV fleets demand capacity',
        '🪵 Premium wood floor maintenance — humidity control prevents cupping in large spaces',
        '🎯 HOA aesthetic compliance plan — Southlake estates face neighborhood board scrutiny',
      ],
    },
  ];

  const selected = types.find(t => t.id === selectedType);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏛️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>Southlake Town Square Homeowner Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0 }}>Premium living demands premium maintenance — select your property type</p>
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.7 }}>Southlake Town Square is one of DFW's most coveted addresses. The mixed-use development drives property values across the surrounding area, but also raises maintenance expectations to a luxury standard. HOAs here are highly active and document every deviation. Specialty contractors with Southlake experience are the only safe choice.</p>
        </div>
        <h2 style={{ color: '#F5E642', marginBottom: 16 }}>Select Your Property Type</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {types.map(t => (
            <button key={t.id} onClick={() => setSelectedType(t.id)} style={{ background: selectedType === t.id ? t.color : '#0D1F3C', border: `2px solid ${t.color}`, borderRadius: 12, padding: '20px 16px', cursor: 'pointer', color: selectedType === t.id ? '#0A1628' : '#fff', textAlign: 'left', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{t.label}</div>
              <div style={{ fontSize: 13, opacity: 0.85 }}>{t.desc}</div>
            </button>
          ))}
        </div>
        {selected && (
          <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: selected.color, marginTop: 0 }}>{selected.label} — Premium Maintenance Guide</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              {selected.tips.map((tip, i) => (
                <div key={i} style={{ background: '#162035', borderRadius: 8, padding: '14px 18px', borderLeft: `4px solid ${selected.color}`, fontSize: 15 }}>{tip}</div>
              ))}
            </div>
            <div style={{ marginTop: 24, background: '#F5E64220', borderRadius: 8, padding: 16 }}>
              <p style={{ margin: 0, color: '#F5E642', fontWeight: 600 }}>🔗 ProLnk vets only Southlake-caliber contractors — background checked, HOA-familiar, and insured to luxury project minimums.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
