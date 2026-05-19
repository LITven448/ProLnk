import { useState } from 'react';

const complaints = [
  {
    label: 'House feels muggy even when cool',
    cause: 'Oversized AC — short cycling prevents humidity removal',
    explanation: 'Humidity removal happens only during long run cycles. An oversized unit cools the air temperature quickly but shuts off before pulling moisture from the air. DFW summer air at 70% humidity will make 74°F feel like 78°F.',
    solutions: [
      { fix: 'Whole-house dehumidifier (Aprilaire, Santa Fe)', cost: '$1,200–$2,500 installed', impact: 'Best — independent of AC runtime' },
      { fix: 'Set thermostat fan to AUTO (not ON)', cost: 'Free', impact: 'High — ON mode recirculates humid air' },
      { fix: 'Manual J sizing audit', cost: '$200–$400', impact: 'Confirms if system is oversized' },
    ],
    dfwNote: 'DFW average June–September humidity: 68%. AC must dehumidify, not just cool.',
  },
  {
    label: 'Humidity spikes when it rains',
    cause: 'Infiltration — outside air entering through gaps',
    explanation: 'DFW homes expand and contract with clay soil movement, opening gaps around windows, doors, and utility penetrations. Heavy rain increases outdoor pressure, pushing humid air in faster than the AC can remove it.',
    solutions: [
      { fix: 'Blower door test to find air leaks', cost: '$300–$500', impact: 'Identifies all infiltration paths' },
      { fix: 'Weatherstripping all exterior doors', cost: '$50–$150 DIY', impact: 'Medium — addresses common entry points' },
      { fix: 'Whole-house dehumidifier', cost: '$1,200–$2,500', impact: 'Compensates for remaining infiltration' },
    ],
    dfwNote: 'DFW clay soil movement cracks slab penetrations annually — HVAC, plumbing, and electrical entry points need inspection every 2–3 years.',
  },
  {
    label: 'Certain rooms are always humid',
    cause: 'Unbalanced airflow — oversupply or undersupply in specific zones',
    explanation: 'Rooms with inadequate supply air do not get enough dehumidified air. Common in additions, converted garages, and rooms far from the air handler. DFW summers have no tolerance for duct imbalances.',
    solutions: [
      { fix: 'Duct balancing — adjust dampers and registers', cost: '$200–$600', impact: 'High for distribution issues' },
      { fix: 'Add supply duct to problem room', cost: '$400–$900', impact: 'Permanent fix for undersupplied rooms' },
      { fix: 'Room dehumidifier (portable)', cost: '$150–$300', impact: 'Temporary relief while diagnosing' },
    ],
    dfwNote: 'DFW garage conversions are a frequent source of humidity complaints — original HVAC did not account for the space.',
  },
  {
    label: 'Humidity too high in winter',
    cause: 'Combustion appliances or infiltration — AC not running to dehumidify',
    explanation: 'In DFW mild winters, AC runs rarely. Without AC dehumidification, moisture from showers, cooking, and infiltration accumulates. Gas appliances add combustion moisture. DFW winters average 55–65% indoor humidity without active control.',
    solutions: [
      { fix: 'Run AC in dehumidify mode or low cool', cost: 'Free', impact: 'Works if temps allow' },
      { fix: 'Standalone dehumidifier', cost: '$150–$300', impact: 'Best for winter — no temp change' },
      { fix: 'Exhaust fans in bathrooms and kitchen (auto timer)', cost: '$80–$200/fan', impact: 'Removes moisture at source' },
    ],
    dfwNote: 'DFW winters are mild enough that humidity control is needed year-round — unlike northern climates where winter air is dry.',
  },
];

export default function DFWHVACHumidityControl() {
  const [selected, setSelected] = useState<typeof complaints[0] | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642′ }}>💧 DFW HVAC Guide</div>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem', color: '#FFFFFF' }}>
          HVAC Humidity Control in DFW
        </h1>
        <p style={{ color: '#9CA3B0', marginBottom: '1rem', lineHeight: 1.6 }}>
          DFW summer humidity runs 60–80%. Your AC does double duty: temperature AND moisture control. When it fails at either, comfort and air quality suffer fast.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            { label: 'DFW Avg Summer Humidity', value: '68%' },
            { label: 'Target Indoor Humidity', value: '45–55%' },
            { label: 'Mold Risk Threshold', value: '60%+' },
            { label: 'Comfort Humidity Max', value: '50%' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#111E35', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F5E642′ }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#9CA3B0', marginTop: '0.25rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: '0.75rem', color: '#9CA3B0', fontSize: '0.85rem' }}>Select your humidity complaint:</div>
        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
          {complaints.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelected(c)}
              style={{
                background: selected === c ? '#1E3A5F' : '#111E35',
                border: selected === c ? '1.5px solid #F5E642′ : '1.5px solid #1A2540',
                borderRadius: 10, padding: '1rem 1.25rem', textAlign: 'left', cursor: 'pointer', color: '#E8EAF0',
              }}
            >
              <div style={{ fontWeight: 600 }}>💧 {c.label}</div>
              <div style={{ color: '#9CA3B0', fontSize: '0.85rem', marginTop: '0.25rem' }}>{c.cause}</div>
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', border: '1.5px solid #F5E642′ }}>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.75rem', color: '#F5E642′ }}>{selected.label}</div>
            <div style={{ color: '#C8D0DC', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>{selected.explanation}</div>
            <div style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.85rem', color: '#9CA3B0′ }}>SOLUTIONS</div>
            <div style={{ display: 'grid', gap: '0.6rem', marginBottom: '1rem' }}>
              {selected.solutions.map((s, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem 1rem' }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{s.fix}</div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#9CA3B0′ }}>
                    <span>💵 {s.cost}</span>
                    <span>📈 {s.impact}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', borderLeft: '3px solid #F5E642', fontSize: '0.85rem', color: '#9CA3B0′ }}>
              🌆 {selected.dfwNote}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
