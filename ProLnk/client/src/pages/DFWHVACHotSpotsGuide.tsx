import { useState } from 'react';

const hotSpotTypes = [
  { id: 'west', label: 'West-Facing Room', emoji: '🌅' },
  { id: 'above-garage', label: 'Room Above Garage', emoji: '🏠' },
  { id: 'bonus', label: 'Bonus Room Above Garage', emoji: '🔥' },
  { id: 'attic-adj', label: 'Room Adjacent to Attic', emoji: '🌡️' },
  { id: 'sunroom', label: 'Sunroom / Enclosed Porch', emoji: '☀️' },
];

const homeTypes = [
  { id: 'single', label: 'Single-Story' },
  { id: 'two-story', label: 'Two-Story' },
  { id: 'older', label: 'Pre-2000 Build' },
  { id: 'new', label: 'Post-2010 Build' },
];

const diagnostics: Record<string, Record<string, { cause: string; solutions: { fix: string; cost: string; score: number }[] }>> = {
  'west': {
    'single': { cause: 'DFW afternoon sun hits west walls directly with 100°F+ radiant heat. Single-story has no buffer above.', solutions: [{ fix: 'Radiant barrier in attic', cost: '$800–$1,400', score: 95 }, { fix: 'Solar shades on west windows', cost: '$200–$600', score: 80 }, { fix: 'Add return vent in hot room', cost: '$300–$500', score: 70 }] },
    'two-story': { cause: 'West-facing second-floor rooms absorb peak DFW afternoon heat (3–6 PM). Upper floors always run hotter.', solutions: [{ fix: 'Zoned HVAC for upper floor', cost: '$2,500–$5,000', score: 98 }, { fix: 'Attic radiant barrier', cost: '$800–$1,400', score: 85 }, { fix: 'Window film on west glass', cost: '$400–$900', score: 72 }] },
    'older': { cause: 'Pre-2000 homes lack modern insulation. West walls in DFW summers become heat radiators by afternoon.', solutions: [{ fix: 'Blown-in wall insulation', cost: '$1,200–$3,000', score: 92 }, { fix: 'Attic insulation upgrade to R-38', cost: '$1,500–$2,500', score: 88 }, { fix: 'Ductwork inspection for leaks', cost: '$200–$400', score: 75 }] },
    'new': { cause: 'Even modern builds struggle with DFW west sun load. Possible duct balancing issue or undersized return.', solutions: [{ fix: 'Duct balancing / airflow test', cost: '$150–$350', score: 90 }, { fix: 'Additional supply vent', cost: '$300–$600', score: 82 }, { fix: 'Smart thermostat zoning', cost: '$500–$1,200', score: 78 }] },
  },
  'above-garage': {
    'single': { cause: 'Garage slab and roof absorb heat all day. Room above becomes an oven — DFW garages hit 130°F+ in summer.', solutions: [{ fix: 'Insulate garage ceiling (R-19+)', cost: '$600–$1,200', score: 96 }, { fix: 'Dedicated mini-split for room', cost: '$1,800–$3,500', score: 90 }, { fix: 'Garage door insulation kit', cost: '$150–$300', score: 65 }] },
    'two-story': { cause: 'Same heat gain from below as single-story. Two-story compounds problem — heat rises into the room above.', solutions: [{ fix: 'Garage ceiling insulation R-19+', cost: '$600–$1,200', score: 96 }, { fix: 'Mini-split for room above', cost: '$1,800–$3,500', score: 91 }, { fix: 'Add dedicated HVAC supply duct', cost: '$800–$1,600', score: 80 }] },
    'older': { cause: 'Old construction had minimal or no insulation between garage and living space. Heat transfer is severe.', solutions: [{ fix: 'Full garage ceiling insulation', cost: '$800–$1,500', score: 97 }, { fix: 'Air seal all penetrations', cost: '$400–$800', score: 85 }, { fix: 'Mini-split addition', cost: '$1,800–$3,500', score: 88 }] },
    'new': { cause: 'Newer builds have some insulation but often undersized HVAC for this room. Duct run may be too long.', solutions: [{ fix: 'Duct inspection / balancing', cost: '$150–$350', score: 88 }, { fix: 'Add booster fan to supply duct', cost: '$200–$450', score: 75 }, { fix: 'Mini-split supplemental', cost: '$1,800–$3,500', score: 85 }] },
  },
  'bonus': {
    'single': { cause: 'Bonus rooms above garage are DFW worst-case: heat from below + attic above + often a long duct run.', solutions: [{ fix: 'Mini-split dedicated unit', cost: '$2,000–$4,000', score: 99 }, { fix: 'Garage + attic insulation combo', cost: '$1,500–$3,000', score: 92 }, { fix: 'Ductwork extension with booster', cost: '$600–$1,400', score: 75 }] },
    'two-story': { cause: 'Triple threat: garage heat below, west/south sun exposure, and attic radiant heat above.', solutions: [{ fix: 'Mini-split + attic insulation', cost: '$2,500–$5,000', score: 99 }, { fix: 'Radiant barrier install', cost: '$800–$1,400', score: 85 }, { fix: 'Zoned system upgrade', cost: '$4,000–$8,000', score: 95 }] },
    'older': { cause: 'Pre-2000 bonus rooms were often afterthoughts — no dedicated HVAC, poor insulation, and leaky ducts.', solutions: [{ fix: 'Full insulation + air sealing', cost: '$2,000–$4,500', score: 95 }, { fix: 'Mini-split install', cost: '$2,000–$4,000', score: 98 }, { fix: 'Ductwork complete replacement', cost: '$3,000–$6,000', score: 88 }] },
    'new': { cause: 'Newer builds still undersize HVAC for bonus rooms. Builder-grade duct runs often too restrictive.', solutions: [{ fix: 'HVAC load calc / right-sizing', cost: '$200–$500', score: 90 }, { fix: 'Mini-split supplemental', cost: '$2,000–$4,000', score: 95 }, { fix: 'Duct redesign for room', cost: '$800–$1,800', score: 82 }] },
  },
  'attic-adj': {
    'single': { cause: 'DFW attics reach 150°F+ in summer. Any room sharing a ceiling or wall with unconditioned attic absorbs that heat.', solutions: [{ fix: 'Upgrade attic insulation to R-49', cost: '$1,500–$3,000', score: 97 }, { fix: 'Radiant barrier on roof deck', cost: '$800–$1,400', score: 88 }, { fix: 'Attic ventilation improvement', cost: '$400–$900', score: 78 }] },
    'two-story': { cause: 'Top-floor rooms adjacent to attic suffer worst. DFW attic heat radiates through ceiling all day.', solutions: [{ fix: 'Blown-in attic insulation R-49+', cost: '$1,500–$3,000', score: 97 }, { fix: 'Radiant barrier', cost: '$800–$1,400', score: 89 }, { fix: 'Seal all attic air leaks', cost: '$500–$1,200', score: 83 }] },
    'older': { cause: 'Older homes often have R-11 or less in attic — code minimum was much lower pre-2000.', solutions: [{ fix: 'Full attic insulation to R-49', cost: '$1,500–$3,000', score: 98 }, { fix: 'Air sealing before insulation', cost: '$600–$1,200', score: 90 }, { fix: 'Attic fan or ridge vent upgrade', cost: '$300–$800', score: 72 }] },
    'new': { cause: 'Modern builds should be adequate — likely a specific insulation gap or duct leak in attic space.', solutions: [{ fix: 'Thermal imaging scan', cost: '$200–$400', score: 93 }, { fix: 'Duct leak test and seal', cost: '$300–$700', score: 88 }, { fix: 'Spot insulation repair', cost: '$200–$500', score: 80 }] },
  },
  'sunroom': {
    'single': { cause: 'DFW sunrooms are essentially glass ovens. No standard HVAC system handles full summer solar load.', solutions: [{ fix: 'Dedicated mini-split for sunroom', cost: '$2,000–$4,000', score: 99 }, { fix: 'Low-E window film install', cost: '$600–$1,500', score: 85 }, { fix: 'Motorized solar shades', cost: '$800–$2,000', score: 80 }] },
    'two-story': { cause: 'Same solar load issue. Two-story adjacent rooms also get bleed-over heat from sunroom.', solutions: [{ fix: 'Mini-split in sunroom', cost: '$2,000–$4,000', score: 99 }, { fix: 'Thermal break at sunroom entry', cost: '$300–$600', score: 82 }, { fix: 'Low-E window film', cost: '$600–$1,500', score: 80 }] },
    'older': { cause: 'Older sunrooms often added without proper insulation plan. No thermal break from house.', solutions: [{ fix: 'Mini-split + thermal door', cost: '$2,500–$5,000', score: 99 }, { fix: 'Window film + shades combo', cost: '$1,000–$2,500', score: 82 }, { fix: 'Roof insulation above sunroom', cost: '$600–$1,200', score: 75 }] },
    'new': { cause: 'Modern sunrooms still fail under DFW peak sun. Builder HVAC not sized for full solar gain.', solutions: [{ fix: 'Dedicated mini-split', cost: '$2,000–$4,000', score: 99 }, { fix: 'Solar film on all glass', cost: '$600–$1,500', score: 83 }, { fix: 'Automated shade system', cost: '$1,200–$3,000', score: 78 }] },
  },
};

export default function DFWHVACHotSpotsGuide() {
  const [spot, setSpot] = useState('');
  const [home, setHome] = useState('');
  const result = spot && home ? diagnostics[spot]?.[home] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🔥</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW HVAC Hot Spots Guide</h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>Why certain rooms in DFW homes are always hotter — and how to fix them</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 Select Your Hot Spot Type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {hotSpotTypes.map(s => (
              <button key={s.id} onClick={() => setSpot(s.id)}
                style={{ background: spot === s.id ? '#F5E642' : '#1A3060', color: spot === s.id ? '#0A1628' : '#E2E8F0', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: spot === s.id ? 700 : 400, textAlign: 'left' }}>
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏡 Your Home Type</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {homeTypes.map(h => (
              <button key={h.id} onClick={() => setHome(h.id)}
                style={{ background: home === h.id ? '#F5E642' : '#1A3060', color: home === h.id ? '#0A1628' : '#E2E8F0', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: home === h.id ? 700 : 400 }}>
                {h.label}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔍 Root Cause</h2>
            <p style={{ color: '#CBD5E1', marginBottom: 24, lineHeight: 1.6 }}>{result.cause}</p>
            <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>✅ Solutions Ranked by Effectiveness</h2>
            {result.solutions.sort((a, b) => b.score - a.score).map((s, i) => (
              <div key={i} style={{ background: '#1A3060', borderRadius: 8, padding: 16, marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#E2E8F0', fontWeight: 600 }}>{i + 1}. {s.fix}</div>
                  <div style={{ color: '#94A3B8', fontSize: 14, marginTop: 4 }}>💰 {s.cost}</div>
                </div>
                <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 20, padding: '4px 12px', fontWeight: 700, fontSize: 14 }}>{s.score}%</div>
              </div>
            ))}
          </div>
        )}

        {!result && (
          <div style={{ textAlign: 'center', color: '#475569', padding: 40 }}>
            Select a hot spot type and home type above to see your personalized diagnosis
          </div>
        )}
      </div>
    </div>
  );
}
