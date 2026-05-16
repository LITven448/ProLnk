import { useState } from 'react';

const roomPurposes: Record<string, { description: string; acoustic: string; lighting: string; furnishing: string }> = {
  reading: {
    description: 'Quiet reading nook or personal library — DFW open floor plans make finding a quiet corner difficult without dedicated acoustic separation',
    acoustic: 'Solid-core door (STC 28–32) + acoustic weatherstripping — reduces open-plan noise by 60%; add bookshelves on shared walls (natural acoustic absorption)',
    lighting: 'Adjustable reading light (2700K warm) + dimmable overhead — avoid DFW western windows (glare); blackout shades for afternoon reading',
    furnishing: 'Floor-to-ceiling built-in shelving + window seat with storage + single lounge chair — creates layered acoustic absorption',
  },
  prayer: {
    description: 'Prayer room or meditation space — quiet, peaceful separation from DFW home activity; increasingly requested in DFW custom builds',
    acoustic: 'Heavy drapes + solid-core door + acoustic panels behind fabric wall covering — creates reverent quiet; target STC 35+',
    lighting: 'Dimmable warm LED (2200–2700K) + optional accent lighting (recessed or wall sconce) — no harsh overhead fixtures',
    furnishing: 'Low seating (floor cushions or bench) + minimal furniture + acoustic rug — serene and flexible layout',
  },
  music: {
    description: 'Music practice room — acoustic containment critical in DFW suburban neighborhoods; reduces HOA complaints and neighbor friction',
    acoustic: 'Decoupled room-within-room construction for serious isolation (STC 50+) OR: dense insulation + resilient channel + mass-loaded vinyl for budget version (STC 40)',
    lighting: 'Neutral 4000K LED — musician needs to see sheet music and instrument clearly; dimmable for recording mood',
    furnishing: 'Acoustic panels + bass traps in corners + diffusers on back wall — standard acoustic treatment package ($1,500–$4,000)',
  },
  office: {
    description: 'Private home office retreat — dedicated quiet space for focus work; DFW remote workers increasingly need acoustic separation from family activity',
    acoustic: 'Solid-core door + acoustic panels on shared walls + white noise machine — practical solution for DFW open-plan homes without major construction',
    lighting: 'Bias lighting + desk task light (5000K for focus) + dimmable overhead — reduces eye strain during DFW WFH days',
    furnishing: 'Ergonomic desk setup + acoustic bookshelf divider + area rug — practical separation without permanent construction',
  },
};

const noiseSources: Record<string, string> = {
  kitchen: 'Solid-core door + acoustic weatherstripping — kitchen noise is mostly impact and ventilation; door seal is the primary solution',
  living: 'Mass-loaded vinyl on shared wall + acoustic panels — TV and conversation noise; wall treatment more effective than door alone',
  outside: 'Double-pane windows (STC 28–32) + exterior acoustic caulk — DFW traffic and lawn equipment noise enters through windows primarily',
  garage: 'Dense-pack insulation in shared wall + resilient channel — garage doors and activity create broadband noise; wall treatment essential',
};

const costEstimates: Record<string, Record<string, string>> = {
  small: { basic: '$4,000–$8,000', mid: '$8,000–$16,000', premium: '$16,000–$30,000' },
  medium: { basic: '$6,000–$12,000', mid: '$12,000–$24,000', premium: '$24,000–$45,000' },
  large: { basic: '$9,000–$18,000', mid: '$18,000–$35,000', premium: '$35,000–$65,000' },
};

export default function DFWPrivacyRoomGuide() {
  const [purpose, setPurpose] = useState('');
  const [spaceSize, setSpaceSize] = useState('');
  const [noiseSource, setNoiseSource] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<null | { description: string; acoustic: string; lighting: string; furnishing: string; noiseRec: string; cost: string }>(null);

  function calculate() {
    if (!purpose || !spaceSize || !noiseSource || !budget) return;
    const rec = roomPurposes[purpose];
    const noiseRec = noiseSources[noiseSource];
    const cost = costEstimates[spaceSize][budget];
    setResult({ ...rec, noiseRec, cost });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#E8E8E8', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🧘</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Private Retreat Room Guide</h1>
          <p style={{ color: '#9AA5B4', fontSize: 16 }}>DFW open floor plans create noise challenges — a dedicated quiet room is a meaningful quality-of-life upgrade.</p>
        </div>

        <div style={{ backgroundColor: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 16 }}>🔇 DFW Open Floor Plan Acoustic Reality</h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {['DFW builders favor open floor plans — sound travels freely through 20-ft ceilings and open kitchens','Hollow-core interior doors (standard in most DFW homes) provide almost zero acoustic isolation (STC 17–22)','Upgrading to solid-core doors + weatherstripping costs $300–$600/door and reduces noise by 40%','DFW custom builders now offer "quiet rooms" as premium option — $8,000–$25,000 add-on at time of build'].map(tip => (
              <li key={tip} style={{ display: 'flex', gap: 10 }}>
                <span style={{ color: '#F5E642', flexShrink: 0 }}>✓</span>
                <span style={{ color: '#CBD5E0', fontSize: 14 }}>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ backgroundColor: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', marginBottom: 20 }}>🔧 Private Room Configurator</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9AA5B4', marginBottom: 8, fontSize: 14 }}>Room Purpose</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[['reading','📚 Reading / Library'],['prayer','🕊️ Prayer / Meditation'],['music','🎵 Music Practice'],['office','💼 Private Office']].map(([key, label]) => (
                <button key={key} onClick={() => setPurpose(key)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: purpose === key ? '#F5E642' : '#1E3A5F', backgroundColor: purpose === key ? '#F5E6421A' : 'transparent', color: purpose === key ? '#F5E642' : '#9AA5B4', cursor: 'pointer', fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9AA5B4', marginBottom: 8, fontSize: 14 }}>Space Size</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[['small','📦 Small (under 120 sq ft)'],['medium','🏠 Medium (120–200 sq ft)'],['large','🏢 Large (200+ sq ft)']].map(([key, label]) => (
                <button key={key} onClick={() => setSpaceSize(key)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: spaceSize === key ? '#F5E642' : '#1E3A5F', backgroundColor: spaceSize === key ? '#F5E6421A' : 'transparent', color: spaceSize === key ? '#F5E642' : '#9AA5B4', cursor: 'pointer', fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9AA5B4', marginBottom: 8, fontSize: 14 }}>Primary Adjacent Noise Source</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[['kitchen','🍳 Kitchen / Dining'],['living','🛋️ Living Room / TV'],['outside','🌳 Exterior / Street'],['garage','🚗 Garage']].map(([key, label]) => (
                <button key={key} onClick={() => setNoiseSource(key)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: noiseSource === key ? '#F5E642' : '#1E3A5F', backgroundColor: noiseSource === key ? '#F5E6421A' : 'transparent', color: noiseSource === key ? '#F5E642' : '#9AA5B4', cursor: 'pointer', fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#9AA5B4', marginBottom: 8, fontSize: 14 }}>Budget</label>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[['basic','💰 Basic ($4K–$12K)'],['mid','💎 Mid-Range ($12K–$35K)'],['premium','👑 Premium ($35K+)']].map(([key, label]) => (
                <button key={key} onClick={() => setBudget(key)}
                  style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: budget === key ? '#F5E642' : '#1E3A5F', backgroundColor: budget === key ? '#F5E6421A' : 'transparent', color: budget === key ? '#F5E642' : '#9AA5B4', cursor: 'pointer', fontSize: 13 }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={calculate}
            style={{ width: '100%', padding: '14px', backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, borderRadius: 8, border: 'none', cursor: 'pointer' }}>
            Design My Private Retreat →
          </button>
        </div>

        {result && (
          <div style={{ backgroundColor: '#1E3A5F', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>🧘 Your DFW Private Room Plan</h3>
            {[['🏠 Room Concept', result.description],['🔇 Acoustic Treatment Plan', result.acoustic],['🔊 Adjacent Noise Solution', result.noiseRec],['💡 Lighting Design', result.lighting],['🛋️ Furnishing Strategy', result.furnishing],['💵 Estimated DFW Cost', result.cost]].map(([label, value]) => (
              <div key={label as string} style={{ marginBottom: 14 }}>
                <div style={{ color: '#9AA5B4', fontSize: 12, marginBottom: 4 }}>{label}</div>
                <div style={{ color: '#E8E8E8', fontSize: 14, lineHeight: 1.5 }}>{value as string}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
