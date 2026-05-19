import { useState } from 'react';

const situations = [
  { id: 'new-flat', label: 'New flat roof, choosing MB type', guide: 'APP modified bitumen with granulated surface is best for DFW UV exposure. Torch-applied APP provides superior adhesion in DFW heat.' },
  { id: 'existing-blistering', label: 'Existing MB roof blistering', guide: 'Blistering indicates moisture trapped between layers. In DFW heat, this accelerates. Remove blisters, patch, and apply reflective coating.' },
  { id: 'granules-missing', label: 'Surface granules washing off', guide: 'Granule loss exposes bitumen to DFW UV — accelerates aging 3x. Apply granule adhesive or plan recovery sheet installation within 1 season.' },
  { id: 'ponding-water', label: 'Standing water after DFW rain', guide: 'Ponding water on MB roofs causes premature degradation. Install tapered insulation or add drains. MB roofing requires minimum 1/4 inch per foot slope.' },
  { id: 'age-15plus', label: 'MB roof 15+ years old', guide: 'At 15+ years in DFW UV, SBS MB becomes brittle and APP loses elasticity. Full replacement recommended. Cold-applied SBS for reroofing.' },
];

export default function DFWRoofingBituminousGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = situations.find(s => s.id === selected);

  const facts = [
    { icon: '☀️', title: 'DFW UV Degradation', body: 'DFW receives 230+ sunny days/year. Unprotected modified bitumen degrades 40% faster in DFW vs northern climates.' },
    { icon: '🧪', title: 'SBS vs APP', body: 'SBS (styrene-butadiene-styrene) is rubber-modified — flexible in cold. APP (atactic polypropylene) is plastic-modified — better UV resistance for DFW.' },
    { icon: '🔥', title: 'Torch-Applied', body: 'Flame torch melts bitumen to substrate. Superior adhesion in DFW heat. Requires licensed contractor — fire risk on combustible decks.' },
    { icon: '❄️', title: 'Cold-Applied', body: 'Adhesive applied without heat — safer for occupied buildings. Slightly lower performance in extreme DFW summer heat vs torch-applied.' },
    { icon: '🪨', title: 'Granulated Surface', body: 'Mineral granules on cap sheet reflect UV and protect bitumen. Essential in DFW — adds 5-8 years to roof lifespan vs smooth surface.' },
    { icon: '📅', title: 'DFW Maintenance', body: 'Inspect seams and flashings every spring before storm season. Recoat smooth surfaces every 3-5 years. Full replacement at 15-20 years.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 4, display: 'inline-block', fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
          DFW ROOFING 2026
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Modified Bitumen Flat Roof Guide — Dallas-Fort Worth</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          SBS vs APP chemistry, torch vs cold-applied, DFW UV degradation timelines, and granulated surface performance in North Texas climate.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 28 }}>
          {facts.map(f => (
            <div key={f.title} style={{ background: '#1e2d45', borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4, color: '#F5E642′ }}>{f.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{f.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 10, padding: 24, marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔍 Flat Roof Situation → Modified Bitumen Guide</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#0A1628', color: selected === s.id ? '#0A1628' : '#fff', border: '1px solid #2d3f5a', borderRadius: 8, padding: '12px 16px', textAlign: ’left', cursor: 'pointer', fontWeight: 600 }}>
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ marginTop: 16, background: '#0d1f2e', border: '1px solid #F5E642', borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>📋 DFW Recommendation</div>
              <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{result.guide}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 16, fontSize: 13, color: '#94a3b8′ }}>
          <strong style={{ color: '#F5E642′ }}>ProLnk Tip:</strong> DFW flat roofs on commercial additions, garages, and patio covers are the most common MB applications. Always verify Texas contractor license for torch-applied work — fire marshal inspections apply on commercial properties.
        </div>
      </div>
    </div>
  );
}