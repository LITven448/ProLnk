import { useState } from 'react';

const systems = [
  {
    brand: 'Carrier Greenspeed',
    icon: '🔵',
    type: 'Communicating Inverter',
    seer2: '24 SEER2',
    eer: 'EER 13.5',
    dfwStrength: 'Industry-leading EER performance at DFW peak temps (95°F+)',
    cost: '$6,500–$9,500 installed',
    warranty: '10-year parts + labor with registration',
    notes: 'Carrier\’s Infinity system (thermostat + air handler + compressor) all communicate via proprietary protocol. Requires Infinity thermostat.',
    color: '#4A9EFF',
  },
  {
    brand: 'Trane XV Series',
    icon: '🟡',
    type: 'Communicating Inverter',
    seer2: '22 SEER2',
    eer: 'EER 13.0',
    dfwStrength: 'Strong reliability record in DFW\’s harsh environment, excellent dealer network',
    cost: '$6,000–$9,000 installed',
    warranty: '12-year compressor, 10-year parts',
    notes: 'ComfortLink II system. Trane dealers widely available in DFW — service availability matters in summer emergencies.',
    color: '#F5E642',
  },
  {
    brand: 'Lennox SL28',
    icon: '🟢',
    type: 'Communicating Inverter',
    seer2: '28 SEER2',
    eer: 'EER 14.0',
    dfwStrength: 'Highest rated efficiency — best choice for homes with solar or aggressive energy goals',
    cost: '$7,500–$11,000 installed',
    warranty: '10-year parts',
    notes: 'iComfort system. Highest efficiency but fewer DFW dealers — verify local service availability before purchasing.',
    color: '#7ED321',
  },
];

const situations = [
  { situation: 'Replacing 10–15 year old system', rec: 'Yes — communicating makes sense', detail: 'At full replacement, the incremental cost is $1,500–$2,500 over standard high-efficiency. DFW\’s long season makes payback 5–8 years.' },
  { situation: 'Adding to existing older system (partial)', rec: 'No — mixed systems lose benefits', detail: 'Communicating systems need matched equipment. Mixing communicating compressor with non-communicating air handler eliminates the efficiency gains.' },
  { situation: 'Home over 2,500 sq ft with zoning', rec: 'Yes — biggest benefits here', detail: 'Larger homes in DFW have extreme heat gain variation. Communicating inverter + zoning dramatically cuts hot-spot problems.' },
  { situation: 'Budget-conscious full replacement', rec: 'Maybe — run the numbers', detail: 'At $1,500–$2,500 premium, DFW\’s summer Oncor bills make payback realistic. Get quotes on variable-speed non-communicating (middle option).' },
  { situation: 'Home under 1,200 sq ft', rec: 'Skip — diminishing returns', detail: 'Smaller homes have lower cooling loads. Standard high-efficiency variable speed will perform very similarly at lower cost.' },
  { situation: 'Rental property or flip', rec: 'No — wrong investment', detail: 'Tenants don\’t see efficiency savings and buyers rarely pay full premium for HVAC brand/tier. Use reliable two-stage standard efficiency.' },
];

export default function DFWHVACCommunicatingSystemGuide() {
  const [systemOpen, setSystemOpen] = useState<number | null>(null);
  const [situationOpen, setSituationOpen] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>Communicating HVAC Systems for DFW</h1>
        <p style={{ color: '#8A9BB5', marginBottom: '2rem' }}>Carrier Greenspeed vs Trane XV vs Lennox SL28 — what communicating/inverter systems are and whether they're worth it for DFW homes.</p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '2rem', fontWeight: 700 }}>
          🔗 What "Communicating" Means: <span style={{ fontWeight: 400 }}>All components (thermostat, air handler, compressor) send real-time data to each other via digital signals — not just analog on/off. This enables precise inverter control, fault detection, and efficiency optimization impossible with standard wiring.</span>
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>Top Communicating Systems for DFW</h2>
        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
          {systems.map((s, i) => (
            <div key={i} onClick={() => setSystemOpen(systemOpen === i ? null : i)}
              style={{ background: systemOpen === i ? '#162035′ : '#111D33', border: `1.5px solid ${systemOpen === i ? s.color : '#1E2D45'}`, borderRadius: 10, padding: '1rem 1.25rem', cursor: ’pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
                  <div>
                    <span style={{ fontWeight: 800, color: s.color }}>{s.brand}</span>
                    <div style={{ fontSize: '0.8rem', color: '#8A9BB5', marginTop: 2 }}>{s.seer2} · {s.eer} · {s.type}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem' }}>{s.cost}</div>
                  <div style={{ color: '#8A9BB5', fontSize: '0.75rem', marginTop: 2 }}>{systemOpen === i ? '▲' : '▼'}</div>
                </div>
              </div>
              {systemOpen === i && (
                <div style={{ marginTop: '0.75rem', borderTop: '1px solid #1E2D45', paddingTop: '0.75rem' }}>
                  <div style={{ background: '#0A1628', borderRadius: 6, padding: '0.5rem 0.75rem', marginBottom: '0.5rem', borderLeft: `3px solid ${s.color}` }}>
                    <span style={{ color: s.color, fontWeight: 700, fontSize: '0.85rem' }}>DFW Strength: </span>{s.dfwStrength}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ background: '#0A1628', borderRadius: 6, padding: '0.5rem 0.75rem' }}>
                      <div style={{ color: '#8A9BB5', fontSize: '0.75rem' }}>WARRANTY</div>
                      <div style={{ fontSize: '0.9rem' }}>{s.warranty}</div>
                    </div>
                    <div style={{ background: '#0A1628', borderRadius: 6, padding: '0.5rem 0.75rem' }}>
                      <div style={{ color: '#8A9BB5', fontSize: '0.75rem' }}>INSTALLED COST</div>
                      <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem' }}>{s.cost}</div>
                    </div>
                  </div>
                  <p style={{ color: '#8A9BB5', fontSize: '0.9rem' }}>{s.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642′ }}>🏠 My DFW Situation → Worth It?</h2>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {situations.map((s, i) => (
            <div key={i} onClick={() => setSituationOpen(situationOpen === i ? null : i)}
              style={{ background: situationOpen === i ? '#162035′ : '#111D33', border: `1.5px solid ${situationOpen === i ? '#F5E642' : '#1E2D45'}`, borderRadius: 8, padding: '0.75rem 1rem', cursor: ’pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>{s.situation}</span>
                <span style={{ color: s.rec.startsWith('Yes') ? '#7ED321′ : s.rec.startsWith(’No') ? '#E87D4A' : '#F5E642', fontWeight: 700, fontSize: '0.8rem', textAlign: 'right', maxWidth: 120 }}>{s.rec}</span>
              </div>
              {situationOpen === i && <p style={{ color: '#8A9BB5', fontSize: '0.9rem', marginTop: '0.5rem' }}>{s.detail}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
