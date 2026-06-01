import { useState } from 'react';

const HOME_SIZES = [
  { label: 'Under 1,500 sq ft', value: 'small' },
  { label: '1,500–2,500 sq ft', value: 'medium' },
  { label: '2,500–4,000 sq ft', value: 'large' },
  { label: '4,000+ sq ft', value: 'xl' },
];

const HVAC_AGES = [
  { label: '0–5 years', value: 'new' },
  { label: '6–10 years', value: 'mid' },
  { label: '11–15 years', value: 'aging' },
  { label: '15+ years', value: 'old' },
];

const RECOMMENDATIONS: Record<string, Record<string, { system: string; cost: string; catches: string[] }>> = {
  small: {
    new: { system: 'Ecobee SmartThermostat + 2 room sensors', cost: '$250–$350', catches: ['Short cycling', 'Hot spots', 'Filter neglect'] },
    mid: { system: 'Ecobee + airflow sensor kit', cost: '$350–$500', catches: ['Refrigerant decline', 'Blower issues', 'Duct leaks'] },
    aging: { system: 'Ecobee + temp delta monitor + annual tune-up', cost: '$400–$600', catches: ['Compressor stress', 'Capacitor wear', 'Coil buildup'] },
    old: { system: 'Full sensor suite + service contract', cost: '$500–$800', catches: ['Pre-failure compressor signals', 'Refrigerant leaks', 'Motor wear'] },
  },
  medium: {
    new: { system: 'Ecobee + 4 room sensors', cost: '$400–$550', catches: ['Zone imbalance', 'Filter neglect', 'Humidity swings'] },
    mid: { system: 'Ecobee + airflow + humidity sensor', cost: '$500–$700', catches: ['Duct leakage', 'Coil freeze risk', 'Refrigerant drift'] },
    aging: { system: 'Ecobee + temp delta + service contract', cost: '$600–$900', catches: ['Compressor pre-failure', 'Capacitor wear', 'Blower motor'] },
    old: { system: 'Full sensor suite + priority service plan', cost: '$700–$1,100', catches: ['Imminent failures', 'Refrigerant leaks', 'Heat exchanger cracks'] },
  },
  large: {
    new: { system: 'Dual-zone Ecobee + 6 room sensors', cost: '$600–$900', catches: ['Zone drift', 'Duct imbalance', 'Hot/cold spots'] },
    mid: { system: 'Dual Ecobee + airflow + runtime tracker', cost: '$800–$1,200', catches: ['System overwork', 'Duct leaks', 'Refrigerant decline'] },
    aging: { system: 'Full dual-system monitoring suite', cost: '$1,000–$1,500', catches: ['Multi-system failures', 'Coil buildup', 'Compressor stress'] },
    old: { system: 'Enterprise sensor suite + service contract', cost: '$1,200–$2,000', catches: ['Pre-failure alerts', 'Heat exchanger', 'Full system risk'] },
  },
  xl: {
    new: { system: 'Multi-zone Ecobee + 8+ room sensors', cost: '$900–$1,400', catches: ['Zone imbalance', 'Duct issues', 'Humidity control'] },
    mid: { system: 'Multi-zone + airflow + runtime analytics', cost: '$1,200–$1,800', catches: ['System overwork', 'Refrigerant drift', 'Duct leakage'] },
    aging: { system: 'Full multi-system sensor suite', cost: '$1,500–$2,500', catches: ['Multiple system failures', 'Compressor wear', 'Coil issues'] },
    old: { system: 'Enterprise monitoring + dedicated service plan', cost: '$2,000–$3,500', catches: ['All pre-failure signals', 'Heat exchanger', 'Full system risk'] },
  },
};

export default function DFWHVACMonitoringGuide() {
  const [homeSize, setHomeSize] = useState('' );
  const [hvacAge, setHvacAge] = useState('');
  const rec = homeSize && hvacAge ? RECOMMENDATIONS[homeSize][hvacAge] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🌡️</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW HVAC Monitoring Guide</h1>
        <p style={{ color: '#8899AA', fontSize: 16, marginBottom: 32, lineHeight: 1.6 }}>
          In DFW, an HVAC failure in August is not an inconvenience — it is a $500 hotel bill and a health risk. Smart monitoring detects problems before they become emergencies.
        </p>

        <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚠️ Why DFW Makes Early Warning Critical</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              ['🌡️ 105°F+ summers', 'System runs 14–18 hrs/day in July–August'],
              ['💧 Humidity swings', 'Coil freeze risk increases with rapid weather shifts'],
              ['⚡ Peak demand surges', 'HVAC pros booked 2–3 weeks out in heat waves'],
              ['🏠 Slab construction', 'No attic buffer — failures hit fast and hard'],
            ].map(([icon, desc]) => (
              <div key={icon} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{icon}</div>
                <div style={{ fontSize: 13, color: '#8899AA' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📡 Monitoring Technologies</h2>
          {[
            ['🌡️ Temperature Delta Monitoring', 'Measures supply vs return air temp differential. Should be 14–22°F. Outside range signals refrigerant or airflow issues.'],
            ['💨 Airflow Sensors', 'Detect static pressure changes indicating clogged filters, blocked vents, or duct leaks before efficiency drops.'],
            ['🏠 Ecobee Room Sensors', 'Multi-room temp monitoring identifies hot spots from duct imbalance, failed dampers, or insulation gaps.'],
            ['⏱️ Runtime Analytics', 'Track daily run hours. Gradual increase = losing efficiency. Sudden spike = failing component.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ borderBottom: '1px solid #1E2D45', paddingBottom: 12, marginBottom: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>
              <div style={{ fontSize: 13, color: '#8899AA' }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E33', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔧 Get Your Monitoring Recommendation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8899AA', marginBottom: 8 }}>Home Size</label>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {HOME_SIZES.map(s => (
                <button key={s.value} onClick={() => setHomeSize(s.value)}
                  style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: homeSize === s.value ? '#F5E642' : '#0A1628',
                    color: homeSize === s.value ? '#0A1628' : '#E8EDF5', fontWeight: 600, fontSize: 13 }}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#8899AA', marginBottom: 8 }}>HVAC Age</label>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
              {HVAC_AGES.map(a => (
                <button key={a.value} onClick={() => setHvacAge(a.value)}
                  style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: hvacAge === a.value ? '#F5E642' : '#0A1628',
                    color: hvacAge === a.value ? '#0A1628' : '#E8EDF5', fontWeight: 600, fontSize: 13 }}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          {rec && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Recommended: {rec.system}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 12 }}>Estimated Cost: {rec.cost}</div>
              <div style={{ fontSize: 13, color: '#8899AA', marginBottom: 6 }}>What this would catch:</div>
              {rec.catches.map(c => <div key={c} style={{ fontSize: 13, color: '#E8EDF5', marginBottom: 4 }}>✅ {c}</div>)}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center' as const }}>
          <a href="/get-quotes" style={{ background: '#F5E642', color: '#0A1628', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>
            Connect with a DFW HVAC Pro →
          </a>
        </div>
      </div>
    </div>
  );
}