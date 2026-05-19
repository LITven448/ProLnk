import { useState } from 'react';

type Feature = { id: string; label: string };
type Requirement = { feature: string; requirements: string[]; permit: string; cost: string };

const features: Feature[] = [
  { id: 'outlets', label: '🔌 Outdoor Outlets' },
  { id: 'lighting', label: '💡 Low Voltage Landscape Lighting' },
  { id: 'kitchen', label: '🍖 Outdoor Kitchen' },
  { id: 'pool', label: '🏊 Pool / Spa' },
  { id: 'pergola', label: '🏠 Covered Pergola / Patio' },
  { id: 'ev', label: '🚗 EV Charger (Outdoor)' },
];

const reqMap: Record<string, Requirement> = {
  outlets: { feature: 'Outdoor Outlets', requirements: ['Must be GFCI-protected', 'Weatherproof in-use covers (bubble covers) required', 'Outdoor-rated boxes and conduit', 'Max 6ft from grade for accessible outlets'], permit: 'Permit required in most DFW cities', cost: '$200 – $600 per outlet circuit' },
  lighting: { feature: 'Low Voltage Landscape Lighting', requirements: ['12V systems generally do not require permit', 'Transformer must be weatherproof GFCI-protected outlet', 'Max 300W per transformer circuit', 'Bury wire at least 6 inches deep'], permit: 'No permit typically required for 12V LV systems', cost: '$800 – $3,000 installed (transformer + fixtures)' },
  kitchen: { feature: 'Outdoor Kitchen', requirements: ['Dedicated 20A GFCI circuits for each appliance', 'Weatherproof junction boxes and GFCI outlets', '240V circuit for grill or built-in appliances', 'Sub-panel may be needed for large outdoor kitchens'], permit: 'Permit required — electrical and possibly gas', cost: '$1,500 – $6,000 depending on scope' },
  pool: { feature: 'Pool / Spa', requirements: ['Bonding grid required — all metal within 5ft must be bonded', 'GFCI on all pool circuits (NEC 680)', 'Equipotential bonding for pool pump and heater', '5-foot setback for outlets from pool edge', 'Pool lighting must be low voltage or 120V listed pool fixtures'], permit: 'Permit required — electrical and pool permit', cost: '$2,000 – $6,000 for pool electrical + bonding' },
  pergola: { feature: 'Covered Pergola / Patio', requirements: ['Ceiling fans require weatherproof-rated "damp" or "wet" location fan', 'Outlets must be GFCI and weatherproof', 'Conduit required in areas exposed to weather', '20A dedicated circuit if adding TV or heater'], permit: 'Permit usually required if adding new circuits', cost: '$600 – $2,500 depending on scope' },
  ev: { feature: 'EV Charger (Outdoor)', requirements: ['240V / 50A dedicated circuit minimum (Level 2)', 'NEMA 14-50 outlet or hardwired EVSE', 'Weatherproof enclosure if outlet-based', 'Conduit run from panel to charger location'], permit: 'Permit required in all DFW municipalities', cost: '$800 – $2,500 installed (panel to charger)' },
};

export default function DFWOutdoorElectricalGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [results, setResults] = useState<Requirement[] | null>(null);

  function toggle(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  }

  function assess() {
    if (selected.length === 0) return;
    setResults(selected.map(id => reqMap[id]));
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌿⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 700, margin: 0 }}>DFW Outdoor Electrical Guide</h1>
          <p style={{ color: '#8899BB', marginTop: 12, fontSize: 16 }}>Outdoor kitchens, pools, landscape lighting, and EV chargers — DFW electrical requirements</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>☀️ DFW Outdoor Living Reality</h2>
          <p style={{ color: '#C8D8EE', lineHeight: 1.7 }}>DFW homeowners invest heavily in outdoor living — covered patios, outdoor kitchens, pools, and landscape lighting are standard in neighborhoods from Southlake to Frisco to Lake Highlands. All of it needs code-compliant electrical. The DFW climate means outdoor electrical is exposed to heat extremes, hail, and heavy rain — weatherproofing requirements are not optional.</p>
          <p style={{ color: '#C8D8EE', lineHeight: 1.7 }}>Most DFW cities (Dallas, Fort Worth, Plano, Frisco, Allen, McKinney, Arlington) require permits for new outdoor electrical circuits. Unpermitted work becomes your problem at sale or insurance claim time.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>⚠️ Universal Outdoor Electrical Rules in DFW</h2>
          <ul style={{ color: '#C8D8EE', lineHeight: 2 }}>
            <li>All outdoor outlets must be GFCI-protected</li>
            <li>All outdoor outlets must have weatherproof in-use covers</li>
            <li>Outdoor wiring must use weatherproof conduit or direct-burial cable</li>
            <li>Pool bonding is mandatory — failure is a fatal shock risk</li>
            <li>Permits are required for new circuits in all major DFW cities</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, marginBottom: 24, border: '1px solid #1A3060' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🧮 Outdoor Feature Requirements Calculator</h2>
          <label style={{ color: '#8899BB', display: 'block', marginBottom: 10 }}>Select outdoor features you are planning (choose all that apply)</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
            {features.map(f => (
              <button key={f.id} onClick={() => toggle(f.id)} style={{ padding: '12px 16px', borderRadius: 8, border: `2px solid ${selected.includes(f.id) ? '#F5E642' : '#2A4070'}`, background: selected.includes(f.id) ? '#1A3060' : '#0A1628', color: '#E8EDF5', fontSize: 14, cursor: 'pointer', textAlign: 'left', fontWeight: selected.includes(f.id) ? 700 : 400 }}>{f.label}</button>
            ))}
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Show Requirements & Costs →</button>
          {results && (
            <div style={{ marginTop: 24 }}>
              {results.map((r, i) => (
                <div key={i} style={{ background: '#0A1628', border: '1px solid #2A4070', borderRadius: 10, padding: 18, marginBottom: 14 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>🔌 {r.feature}</div>
                  <ul style={{ color: '#C8D8EE', margin: '0 0 10px 0', paddingLeft: 20, lineHeight: 1.8 }}>
                    {r.requirements.map((req, j) => <li key={j}>{req}</li>)}
                  </ul>
                  <div style={{ color: '#8899BB', marginBottom: 4, fontSize: 13 }}>📋 Permit: {r.permit}</div>
                  <div style={{ color: '#C8D8EE', fontWeight: 600 }}>💰 Cost Estimate: {r.cost}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#F5E642', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🌿</div>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: 0 }}>Get Outdoor Electrical Quotes from Vetted DFW Electricians via ProLnk</p>
        </div>
      </div>
    </div>
  );
}
