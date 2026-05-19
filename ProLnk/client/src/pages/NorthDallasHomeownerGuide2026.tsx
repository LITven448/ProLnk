import { useState } from 'react';

export default function NorthDallasHomeownerGuide2026() {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const ages = [
    {
      id: 'vintage',
      label: '🏚️ Vintage (1970s–1985)',
      color: '#F59E0B',
      desc: 'Preston Road corridor originals, ranch-style and traditional, renovation candidates',
      tips: [
        '⚡ Federal Pacific or Zinsco panel replacement — fire risk panels still common in this era',
        '🔧 Polybutylene pipe removal — gray plastic piping from 1970s–1985 fails without warning',
        '🏗️ Foundation stabilization — 50-year slab foundations common in North Dallas clay',
        '🌡️ Duct system replacement — original fiberglass ducts disintegrate and cause air quality issues',
        '🪟 Window replacement — single-pane originals cost $300+/month in North Dallas heat',
        '🏠 Open-plan renovation potential — 1970s layouts command premium if properly updated',
      ],
    },
    {
      id: 'established',
      label: '🏡 Established (1985–2005)',
      color: '#F5E642',
      desc: 'Far North Dallas growth era, Addison/Plano-adjacent builds, strong renovation market',
      tips: [
        '🔩 Roof replacement cycle — 20–30 year composition shingles are at end of life',
        '🌊 Water heater tanked-to-tankless conversion — energy savings resonate with educated buyers',
        '💡 Electrical panel upgrade — 150A panels undersized for EV charging and home offices',
        '🏗️ Foundation pier addition — 2–3 inch movement common in this age range',
        '🌿 Landscape modernization — mature trees need arborist assessment, beds need redesign',
        '🎨 Interior renovation for resale — North Dallas buyer expectations have shifted dramatically',
      ],
    },
    {
      id: 'modern',
      label: '🏘️ Modern (2005–Present)',
      color: '#10B981',
      desc: 'Newer townhomes and infill, Preston Hollow adjacent, walkable district proximity',
      tips: [
        '🌬️ Fresh air ventilation system — tight modern construction requires mechanical fresh air',
        '🏊 Rooftop deck waterproofing — North Dallas townhomes develop flashing failures early',
        '🔐 Smart home integration — modern North Dallas buyers expect full automation',
        '🚗 EV charging station install — Preston Road corridor attracts tech and finance buyers',
        '💧 Water softener system — North Dallas municipal water is notably hard',
        '🌇 Noise mitigation — retail and restaurant proximity means traffic noise is a real issue',
      ],
    },
  ];

  const selected = ages.find(a => a.id === selectedAge);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌆</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>North Dallas Homeowner Guide 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0 }}>Preston Road corridor to Far North Dallas — select your home age for targeted maintenance guidance</p>
        </div>
        <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <p style={{ color: '#CBD5E1', margin: 0, lineHeight: 1.7 }}>North Dallas spans from the Preston Road luxury corridor through the Addison/Plano border zone to the newer Far North Dallas townhome districts. Homes range from 1970s ranch originals ripe for renovation to modern infill townhomes near walkable retail. The strong resale market rewards well-maintained properties, and the renovation pipeline is one of DFW's most active.</p>
        </div>
        <h2 style={{ color: '#F5E642', marginBottom: 16 }}>Select Your Home Age</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {ages.map(a => (
            <button key={a.id} onClick={() => setSelectedAge(a.id)} style={{ background: selectedAge === a.id ? a.color : '#0D1F3C', border: `2px solid ${a.color}`, borderRadius: 12, padding: '20px 16px', cursor: 'pointer', color: selectedAge === a.id ? '#0A1628′ : '#fff', textAlign: ’left', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{a.label}</div>
              <div style={{ fontSize: 13, opacity: 0.85 }}>{a.desc}</div>
            </button>
          ))}
        </div>
        {selected && (
          <div style={{ background: '#0D1F3C', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: selected.color, marginTop: 0 }}>{selected.label} — North Dallas Maintenance Priorities</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              {selected.tips.map((tip, i) => (
                <div key={i} style={{ background: '#162035', borderRadius: 8, padding: '14px 18px', borderLeft: `4px solid ${selected.color}`, fontSize: 15 }}>{tip}</div>
              ))}
            </div>
            <div style={{ marginTop: 24, background: '#F5E64220', borderRadius: 8, padding: 16 }}>
              <p style={{ margin: 0, color: '#F5E642', fontWeight: 600 }}>🔗 ProLnk connects North Dallas homeowners with contractors who know the Preston corridor standards — from vintage renovation specialists to modern smart-home integrators.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
