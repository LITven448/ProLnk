import { useState } from 'react';

export default function TrophyClubHomeownerGuide2026() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const types = [
    {
      id: 'golf',
      label: '⛳ Golf Course Lot',
      color: '#10B981',
      desc: 'Homes bordering Trophy Club Country Club, premium views, cart path proximity',
      tips: [
        '🌳 Root intrusion inspection — mature course oaks invade drains and foundations',
        '💧 Irrigation crossover audit — golf course runoff affects adjacent lots soil moisture',
        '🏗️ Foundation elevation survey annually — course-adjacent fill soil settles unevenly',
        '🦟 Mosquito misting system — lake and fairway proximity drives insect pressure',
        '🔇 Cart path noise barrier — strategic landscaping blocks early morning traffic',
        '🌬️ Outdoor kitchen weatherproofing — fairway wind exposure degrades unprotected surfaces',
      ],
    },
    {
      id: 'custom',
      label: '🏡 Custom Home (1990s–2010s)',
      color: '#F5E642',
      desc: 'Trophy Club’s primary housing stock, custom builds with HOA design standards',
      tips: [
        '🔩 Roof inspection post-hail — Denton/Tarrant border gets significant hail events',
        '🏗️ Pier-and-beam re-leveling — 1990s custom homes show movement at 25–35 years',
        '🌡️ HVAC system replacement planning — original units from 1995–2005 are at end of life',
        '⚡ Electrical panel audit — early 2000s panels often undersized for modern loads',
        '🌊 Lake humidity moisture barrier — crawlspace and attic moisture common near Grapevine Lake',
        '📋 HOA pre-project approval — Trophy Club HOA reviews all exterior changes',
      ],
    },
    {
      id: 'newer',
      label: '🏘️ Newer Build (2010s–Present)',
      color: '#8B5CF6',
      desc: 'Recent infill and expansion homes, tight construction, smart home ready',
      tips: [
        '🌬️ Energy audit — newer tight construction can trap humidity without fresh air exchange',
        '🌳 Tree establishment watering — new landscaping needs 2-year support in clay soil',
        '💡 Smart home hub integration — newer Trophy Club homes expect full automation',
        '🔧 Warranty claim coordination — builder warranty disputes common at 5–7 year mark',
        '💧 Drainage system verification — new grading sometimes misdirects runoff toward neighbors',
        '🏊 Pool planning and permit — HOA design review adds 4–6 weeks to project timeline',
      ],
    },
  ];

  const selected = types.find(t => t.id === selectedType);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⛳</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>Trophy Club TX Homeowner Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0 }}>Golf course community living with serious HOA accountability — select your home type</p>
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.7 }}>Trophy Club sits on the Denton/Tarrant county border near Lake Grapevine. The community revolves around Trophy Club Country Club and is known for active HOA enforcement, mature tree canopy, and lake-driven humidity. Homes from the 1990s–2010s are entering a major repair cycle, making trusted contractor access essential.</p>
        </div>
        <h2 style={{ color: '#F5E642', marginBottom: 16 }}>Select Your Home Type</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {types.map(t => (
            <button key={t.id} onClick={() => setSelectedType(t.id)} style={{ background: selectedType === t.id ? t.color : '#0D1F3C', border: `2px solid ${t.color}`, borderRadius: 12, padding: '20px 16px', cursor: 'pointer', color: selectedType === t.id ? '#0A1628′ : '#fff', textAlign: ’left', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{t.label}</div>
              <div style={{ fontSize: 13, opacity: 0.85 }}>{t.desc}</div>
            </button>
          ))}
        </div>
        {selected && (
          <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: selected.color, marginTop: 0 }}>{selected.label} — Trophy Club Maintenance Priorities</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              {selected.tips.map((tip, i) => (
                <div key={i} style={{ background: '#162035', borderRadius: 8, padding: '14px 18px', borderLeft: `4px solid ${selected.color}`, fontSize: 15 }}>{tip}</div>
              ))}
            </div>
            <div style={{ marginTop: 24, background: '#F5E64220', borderRadius: 8, padding: 16 }}>
              <p style={{ margin: 0, color: '#F5E642', fontWeight: 600 }}>🔗 ProLnk matches Trophy Club homeowners with HOA-approved contractors who understand golf community standards and lake-area building conditions.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
