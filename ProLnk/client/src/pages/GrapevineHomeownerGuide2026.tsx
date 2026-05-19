import { useState } from 'react';

export default function GrapevineHomeownerGuide2026() {
  const [selectedEra, setSelectedEra] = useState<string | null>(null);

  const eras = [
    {
      id: 'historic',
      label: '🏛️ Historic (Pre-1960)',
      color: '#8B5CF6',
      desc: 'Downtown Grapevine district homes, original craftsman and Victorian architecture',
      tips: [
        '🏚️ Knob-and-tube wiring replacement — fire risk in 100-year homes',
        '🪟 Historic window restoration — preservation board approval required',
        '🏗️ Foundation pier repair — pier-and-beam common, needs annual inspection',
        '🔧 Cast iron plumbing lining — avoid full replacement to preserve character',
        '🎨 Lead paint remediation — required before renovation permits',
        '🌳 Heritage tree preservation — city ordinance protects large oaks',
      ],
    },
    {
      id: 'midcentury',
      label: '🏠 Mid-Century (1960–1985)',
      color: '#F5E642',
      desc: 'Post-war expansion homes, Lake Grapevine area growth era',
      tips: [
        '⚡ Panel upgrade from 100A to 200A — EV chargers and modern loads require it',
        '🌊 Slab foundation moisture monitoring — lake proximity raises soil movement',
        '🧱 Brick veneer repointing — 40-year mortar fails near humid lake air',
        '🔩 Galvanized pipe replacement — corroded interiors restrict water flow',
        '🌡️ HVAC zoning upgrade — older open-plan layouts overheat front rooms',
        '🪴 Drainage grading — lake-side lots accumulate runoff without correction',
      ],
    },
    {
      id: 'modern',
      label: '🏡 Modern (1985–Present)',
      color: '#10B981',
      desc: 'Airport corridor builds, lakeside developments, wine trail proximity homes',
      tips: [
        '✈️ Sound insulation audit — DFW Airport flight paths affect NW Grapevine homes',
        '🏊 Pool deck resurfacing — Grapevine summer heat cracks exposed concrete',
        '🌬️ Attic ventilation upgrade — newer tight construction traps heat',
        '💧 Irrigation system audit — lake-area clay soil causes system shifts',
        '🏘️ HOA compliance prep — wine trail district standards strictly enforced',
        '🔒 Smart home integration — modern buyers expect full automation',
      ],
    },
  ];

  const selected = eras.find(e => e.id === selectedEra);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🍇</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>Grapevine TX Homeowner Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0 }}>Historic charm meets modern maintenance — select your home era for tailored guidance</p>
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.7 }}>Grapevine sits at the intersection of DFW Airport traffic, Lake Grapevine humidity, and a thriving wine trail tourism economy. Homes here range from 1890s Victorian downtown buildings to lakeside custom builds — each with unique maintenance demands. Historic preservation overlays mean specialty contractors familiar with Grapevine's codes are essential.</p>
        </div>
        <h2 style={{ color: '#F5E642', marginBottom: 16 }}>Select Your Home Era</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {eras.map(era => (
            <button key={era.id} onClick={() => setSelectedEra(era.id)} style={{ background: selectedEra === era.id ? era.color : '#0D1F3C', border: `2px solid ${era.color}`, borderRadius: 12, padding: '20px 16px', cursor: 'pointer', color: selectedEra === era.id ? '#0A1628′ : '#fff', textAlign: ’left', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{era.label}</div>
              <div style={{ fontSize: 13, opacity: 0.85 }}>{era.desc}</div>
            </button>
          ))}
        </div>
        {selected && (
          <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: selected.color, marginTop: 0 }}>{selected.label} — Grapevine Maintenance Priorities</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              {selected.tips.map((tip, i) => (
                <div key={i} style={{ background: '#162035', borderRadius: 8, padding: '14px 18px', borderLeft: `4px solid ${selected.color}`, fontSize: 15 }}>{tip}</div>
              ))}
            </div>
            <div style={{ marginTop: 24, background: '#F5E64220', borderRadius: 8, padding: 16 }}>
              <p style={{ margin: 0, color: '#F5E642', fontWeight: 600 }}>🔗 ProLnk connects Grapevine homeowners with contractors experienced in historic preservation, lake-area moisture issues, and airport-zone sound compliance.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
