import { useState } from 'react';

const humidRoomTypes = [
  { id: 'laundry', label: 'Laundry Room', emoji: '🫧' },
  { id: 'bathroom', label: 'Bathroom (No Exhaust)', emoji: '🚿' },
  { id: 'sunfacing', label: 'Sun-Facing Room', emoji: '☀️' },
  { id: 'crawl', label: 'Below Crawl Space Area', emoji: '🏚️' },
  { id: 'kitchen', label: 'Kitchen / Cooking Area', emoji: '🍳' },
  { id: 'entryway', label: 'Entryway / Mudroom', emoji: '🚪' },
];

const causes: Record<string, { cause: string; dfwFactor: string; fixes: { action: string; cost: string; impact: string }[] }> = {
  'laundry': {
    cause: 'Dryer venting issues or washer evaporation. In DFW, even a properly vented dryer releases warm humid air nearby. Front-load washers left closed grow mold and off-gas humidity continuously.',
    dfwFactor: 'DFW outdoor humidity spikes to 90%+ on summer mornings — every door opening brings humid air directly into laundry rooms.',
    fixes: [
      { action: 'Verify dryer vents directly outside (not into wall cavity)', cost: 'Free check', impact: 'Critical' },
      { action: 'Install exhaust fan (150+ CFM for laundry)', cost: '$150–$400', impact: 'High' },
      { action: 'Add standalone dehumidifier for laundry room', cost: '$200–$500', impact: 'High' },
      { action: 'Leave washer door open between cycles', cost: 'Free', impact: 'Medium' },
    ],
  },
  'bathroom': {
    cause: 'Bathrooms without exhaust fans or with undersized fans are humidity traps. DFW summer showers add 1–2 pints of moisture per shower to indoor air.',
    dfwFactor: 'DFW homes need 110+ CFM exhaust fans — most builder-grade fans are 50 CFM. Completely inadequate for DFW summer humidity.',
    fixes: [
      { action: 'Replace exhaust fan with 110 CFM+ unit', cost: '$100–$350', impact: 'Critical' },
      { action: 'Install humidity-sensing fan (auto-on when humid)', cost: '$150–$400', impact: 'Very High' },
      { action: 'Verify exhaust vents outside (not into attic)', cost: 'Free check', impact: 'Critical' },
      { action: 'Run fan 20 min after shower', cost: 'Free behavior change', impact: 'High' },
    ],
  },
  'sunfacing': {
    cause: 'Sun-facing rooms with inadequate air sealing allow humidity infiltration through micro-gaps. Warm air holds more moisture — solar-heated walls create humidity pressure differentials pushing outdoor air inside.',
    dfwFactor: 'DFW summer: hot humid morning air + intense afternoon sun creates pressure differential that forces moisture through walls. West and south rooms are worst.',
    fixes: [
      { action: 'Air seal all penetrations (outlets, windows, trim)', cost: '$300–$800', impact: 'High' },
      { action: 'Install dehumidifier in affected room', cost: '$200–$500', impact: 'High' },
      { action: 'Increase AC airflow to room for better dehumidification', cost: '$150–$350', impact: 'Medium' },
      { action: 'Add window film to reduce solar-driven moisture drive', cost: '$400–$900', impact: 'Medium' },
    ],
  },
  'crawl': {
    cause: 'Crawl space moisture migrates up through floors. DFW clay soil holds enormous water, which evaporates through unencapsulated crawl space into living areas above.',
    dfwFactor: 'DFW rain events (2–5 inch storms common) saturate clay soil. Water evaporates for weeks after. Unconditioned crawl spaces are humidity generators.',
    fixes: [
      { action: 'Crawl space encapsulation (vapor barrier)', cost: '$2,000–$6,000', impact: 'Critical' },
      { action: 'Install crawl space dehumidifier', cost: '$800–$2,000', impact: 'Very High' },
      { action: 'Seal all floor penetrations between crawl and living', cost: '$400–$1,200', impact: 'High' },
      { action: 'Improve crawl space drainage / French drain', cost: '$1,500–$4,000', impact: 'High' },
    ],
  },
  'kitchen': {
    cause: 'Cooking generates significant steam. Range hoods that recirculate (no exterior vent) just filter grease — they do nothing for humidity. DFW summer cooking without proper exhaust spikes indoor humidity fast.',
    dfwFactor: 'DFW already battles outdoor humidity. Cooking in summer without exterior exhaust adds 3–5 pints of moisture per meal to an already stressed AC system.',
    fixes: [
      { action: 'Install externally-vented range hood (400+ CFM)', cost: '$400–$1,500', impact: 'Critical' },
      { action: 'Verify range hood vents outside, not to attic', cost: 'Free check', impact: 'Critical' },
      { action: 'Whole-home dehumidifier inline with HVAC', cost: '$1,500–$3,000', impact: 'Very High' },
      { action: 'Use exhaust fan during and 15 min after cooking', cost: 'Free', impact: 'High' },
    ],
  },
  'entryway': {
    cause: 'Every door opening in DFW summer brings a wave of humid outdoor air. Entryways and mudrooms without pressure barriers or exhaust become humidity accumulation points.',
    dfwFactor: 'DFW summer outdoor humidity at 7am can be 85%+. Each door cycle floods the entryway with humid air. Tile floors in entryways can feel damp without visible moisture.',
    fixes: [
      { action: 'Install entryway exhaust fan or transfer grille to conditioned space', cost: '$150–$500', impact: 'High' },
      { action: 'Add storm door or vestibule to create air lock', cost: '$500–$2,000', impact: 'Very High' },
      { action: 'Ensure AC supply vent in entryway is open and flowing', cost: 'Free check', impact: 'Medium' },
      { action: 'Small dehumidifier in entryway for high-humidity days', cost: '$150–$300', impact: 'Medium' },
    ],
  },
};

const impactColor: Record<string, string> = {
  'Critical': '#EF4444',
  'Very High': '#F97316',
  'High': '#F5E642',
  'Medium': '#60A5FA',
};

export default function DFWHVACHumidityHotSpots() {
  const [room, setRoom] = useState('');
  const result = room ? causes[room] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>💧</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW HVAC Humidity Hot Spots</h1>
          <p style={{ color: '#94A3B8', marginTop: 8 }}>Rooms that feel humid even when AC is running — DFW-specific causes and fixes</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>💦 Which Room Feels Humid?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {humidRoomTypes.map(r => (
              <button key={r.id} onClick={() => setRoom(r.id)}
                style={{ background: room === r.id ? '#F5E642′ : '#1A3060', color: room === r.id ? '#0A1628' : '#E2E8F0', border: ’none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: room === r.id ? 700 : 400, textAlign: 'left' }}>
                {r.emoji} {r.label}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div>
            <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔍 Root Cause</h2>
              <p style={{ color: '#CBD5E1', lineHeight: 1.6, marginBottom: 16 }}>{result.cause}</p>
              <div style={{ background: '#1A3060', borderRadius: 8, padding: 14, borderLeft: '4px solid #F5E642′ }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>🌡️ DFW Factor: </span>
                <span style={{ color: '#CBD5E1′ }}>{result.dfwFactor}</span>
              </div>
            </div>

            <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 DFW-Specific Fixes</h2>
              {result.fixes.map((f, i) => (
                <div key={i} style={{ background: '#1A3060', borderRadius: 8, padding: 16, marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#E2E8F0', fontWeight: 600, marginBottom: 6 }}>{i + 1}. {f.action}</div>
                      <div style={{ color: '#94A3B8', fontSize: 14 }}>💰 {f.cost}</div>
                    </div>
                    <div style={{ background: impactColor[f.impact] || '#60A5FA', color: '#0A1628', borderRadius: 16, padding: '3px 10px', fontSize: 13, fontWeight: 700, marginLeft: 12, whiteSpace: 'nowrap' }}>
                      {f.impact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!result && (
          <div style={{ textAlign: 'center', color: '#475569', padding: 40 }}>
            Select the room that feels humid above to see your DFW-specific diagnosis
          </div>
        )}
      </div>
    </div>
  );
}
