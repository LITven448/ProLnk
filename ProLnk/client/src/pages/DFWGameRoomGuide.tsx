import { useState } from 'react';

const roomSizes = ['Small (under 200 sqft)', 'Medium (200–400 sqft)', 'Large (400–700 sqft)', 'XL/Bonus Room (700+ sqft)'];
const primaryUses = ['Golf Simulator', 'Gaming/Esports', 'Media/Home Theater', 'Billiards/Ping Pong', 'Multi-use Entertainment'];

interface RoomSpec {
  minSize: string;
  equipment: string[];
  hvac: string;
  acoustic: string;
  cost: string;
  dfwNote: string;
}

const specs: Record<string, RoomSpec> = {
  'Golf Simulator': {
    minSize: '12ft wide × 18ft deep × 9ft ceiling (minimum)',
    equipment: ['Launch monitor (Trackman $18K, Mevo+ $2K–$5K)', 'Impact screen + frame ($800–$3,000)', 'Projector ($1,500–$5,000)', 'Hitting mat ($300–$800)', 'Side netting ($200–$600)'],
    hvac: 'Dedicated mini-split or zone — simulators generate significant heat from projector + activity. Size for 1.5x occupancy load.',
    acoustic: 'Impact sound deadening on walls and floor essential — impact screen hits are loud. Use mass-loaded vinyl + acoustic panels.',
    cost: '$8,000–$45,000 total build',
    dfwNote: 'Golf simulators are extremely popular in DFW — allows year-round play without 105°F summer heat. Strong resale value in DFW luxury market.',
  },
  'Gaming/Esports': {
    minSize: '150 sqft minimum for 2–4 stations',
    equipment: ['Gaming PCs or consoles per station', 'Monitor arms for cable management', '1Gbps hardwired ethernet (no WiFi)', 'UPS battery backup per station', 'LED ambient lighting system'],
    hvac: 'Gaming PCs generate 200–400W heat each. Proper ventilation critical — 4 gaming PCs = electric space heater equivalent. Dedicated zone or mini-split.',
    acoustic: 'Acoustic panels reduce echo for streaming/communication. Soundproofing for neighbors if in multi-story.',
    cost: '$3,000–$20,000 depending on PC specs',
    dfwNote: 'DFW has a large esports and streaming community. Hardwired ethernet beats WiFi for competitive gaming — run CAT6 during build.',
  },
  'Media/Home Theater': {
    minSize: '12ft × 16ft minimum for true theater experience',
    equipment: ['4K projector or 100"+ screen ($1,000–$8,000)', 'AV receiver + surround sound system ($800–$5,000)', 'Recliner seating ($1,500–$8,000)', 'Acoustic panels + bass traps', 'Blackout curtains or window elimination'],
    hvac: 'Near-silent HVAC essential — duct noise ruins quiet scenes. Consider mini-split with variable speed fan. Insulate ducts.',
    acoustic: 'Acoustic treatment is the single biggest upgrade for home theaters. Room treatment > equipment cost for most builds.',
    cost: '$8,000–$40,000 full build',
    dfwNote: 'Media rooms add significant resale value in DFW. Dark rooms stay cooler — less HVAC load in summer.',
  },
  'Billiards/Ping Pong': {
    minSize: 'Pool table: 14ft × 18ft minimum room (for 8ft table + cue clearance). Ping pong: 12ft × 22ft minimum.',
    equipment: ['8ft pool table ($1,500–$6,000)', 'Professional felt + re-cloth service ($300–$600)', 'Overhead drop pendant light ($200–$800)', 'Ping pong table ($300–$2,500)', 'Cue rack and accessory storage'],
    hvac: 'Standard HVAC sufficient — low heat load. Humidity control important for wood table maintenance in DFW humidity swings.',
    acoustic: 'Moderate acoustic treatment reduces echo. Rubber flooring absorbs impact from dropped balls and aggressive play.',
    cost: '$3,000–$12,000 full setup',
    dfwNote: 'DFW humidity swings (10%–80% RH) can warp pool table slates and felt. Maintain 40–50% RH year-round with a dehumidifier.',
  },
  'Multi-use Entertainment': {
    minSize: '500+ sqft recommended for flexible furniture and multiple zones',
    equipment: ['Large screen TV or projector wall', 'Modular seating for reconfiguration', 'Multi-game table (shuffleboard/foosball/air hockey)', 'Bar or beverage station', 'Retractable projector screen'],
    hvac: 'Heavily occupied spaces need oversized HVAC. Design for 10+ occupants — DFW parties are large. Mini-split supplemental cooling recommended.',
    acoustic: 'Balanced treatment — some absorption for conversation, some reflection for music energy. Avoid over-deadening.',
    cost: '$15,000–$60,000 full entertainment room',
    dfwNote: 'DFW social culture centers around home entertainment. Multi-use rooms are the top renovation ROI category in the DFW luxury market.',
  },
};

export default function DFWGameRoomGuide() {
  const [roomSize, setRoomSize] = useState('');
  const [primaryUse, setPrimaryUse] = useState('');
  const [showResults, setShowResults] = useState(false);

  const spec = primaryUse ? specs[primaryUse] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#F5E642', fontWeight: 600 }}>
          🎮 DFW GAME ROOM GUIDE
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '8px', lineHeight: 1.2 }}>
          Game Rooms & Entertainment Spaces in DFW
        </h1>
        <p style={{ color: '#94A3B8', marginBottom: '32px', lineHeight: 1.6 }}>
          DFW homeowners invest heavily in entertainment spaces — 105°F summers and Texas social culture create massive demand for premium indoor entertainment. Golf simulators, media rooms, and game rooms are among the highest-ROI renovations in the DFW luxury market.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { icon: '⛳', title: 'Golf Simulators', desc: 'Fastest-growing entertainment room type in DFW. Allows year-round play regardless of summer heat. Trackman to Mevo+ options at every price point.' },
            { icon: '🎬', title: 'Media Rooms', desc: 'True home theaters add $20K–$60K in perceived value in DFW. Acoustic treatment is the biggest ROI upgrade — more than equipment.' },
            { icon: '🎱', title: 'Billiards', desc: 'Classic game room anchor. DFW humidity swings require climate control to protect table felt and slate. Budget for ongoing felt maintenance.' },
            { icon: '🖥️', title: 'Gaming/Esports', desc: 'DFW has a growing esports community. Multiple gaming stations require serious HVAC — each PC generates as much heat as a space heater.' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: '#112240', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{item.icon}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '8px', fontSize: '15px' }}>{item.title}</div>
              <p style={{ color: '#94A3B8', margin: 0, fontSize: '13px', lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: '16px', padding: '28px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px', color: '#F5E642' }}>
            🔧 Entertainment Room Planner
          </h2>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: 600, marginBottom: '10px' }}>Available room size:</div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {roomSizes.map(s => (
                <button key={s} onClick={() => { setRoomSize(s); setShowResults(false); }}
                  style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px',
                    backgroundColor: roomSize === s ? '#F5E642' : '#1E3A5F',
                    color: roomSize === s ? '#0A1628' : '#E8EAF0', fontWeight: 600 }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: 600, marginBottom: '10px' }}>Primary use:</div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {primaryUses.map(u => (
                <button key={u} onClick={() => { setPrimaryUse(u); setShowResults(false); }}
                  style={{ padding: '10px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px',
                    backgroundColor: primaryUse === u ? '#F5E642' : '#1E3A5F',
                    color: primaryUse === u ? '#0A1628' : '#E8EAF0', fontWeight: 600 }}>
                  {u}
                </button>
              ))}
            </div>
          </div>

          {roomSize && primaryUse && (
            <button onClick={() => setShowResults(true)}
              style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '16px' }}>
              Get Room Specification →
            </button>
          )}
        </div>

        {showResults && spec && (
          <div style={{ backgroundColor: '#0D2137', borderRadius: '16px', padding: '28px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '20px', marginBottom: '4px' }}>{primaryUse} Specification</h3>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '24px', fontSize: '18px' }}>{spec.cost}</div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#94A3B8', fontSize: '12px', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Minimum Space Requirement</div>
              <div style={{ backgroundColor: '#112240', padding: '14px', borderRadius: '8px', fontSize: '14px' }}>{spec.minSize}</div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#94A3B8', fontSize: '12px', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Equipment List</div>
              {spec.equipment.map((e, i) => (
                <div key={i} style={{ padding: '10px 14px', backgroundColor: '#112240', borderRadius: '8px', marginBottom: '6px', fontSize: '14px' }}>
                  ✓ {e}
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '16px', padding: '16px', backgroundColor: '#FF444415', borderRadius: '8px', border: '1px solid #FF444440' }}>
              <div style={{ fontWeight: 700, marginBottom: '6px', fontSize: '13px', color: '#FF9999' }}>🌡️ HVAC Requirement</div>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5 }}>{spec.hvac}</p>
            </div>

            <div style={{ marginBottom: '16px', padding: '16px', backgroundColor: '#F5E64210', borderRadius: '8px', border: '1px solid #F5E64240' }}>
              <div style={{ fontWeight: 700, marginBottom: '6px', fontSize: '13px', color: '#F5E642' }}>🔊 Acoustic Treatment</div>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5 }}>{spec.acoustic}</p>
            </div>

            <div style={{ padding: '16px', backgroundColor: '#112240', borderRadius: '8px', border: '1px solid #1E3A5F' }}>
              <div style={{ fontWeight: 700, marginBottom: '6px', fontSize: '13px', color: '#94A3B8' }}>🤠 DFW Market Note</div>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5 }}>{spec.dfwNote}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
