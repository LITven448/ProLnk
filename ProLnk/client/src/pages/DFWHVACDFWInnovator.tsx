import { useState } from 'react';

const innovations = [
  {
    id: 'heat-pump',
    label: '🔥 All-Electric Heat Pump System',
    path: 'Replace your gas furnace + AC with a cold-climate heat pump rated to 115°F ambient. In DFW, this eliminates gas bills entirely, qualifies for $2,000 federal tax credit (25C), and reduces carbon footprint 60%. Pair with a 2-stage backup heat strip for the 4-5 freezing nights per year. ROI: 5-7 years at current DFW utility rates.',
    prolnk: 'ProLnk matches you with the 8-12 DFW contractors who have completed 20+ all-electric heat pump conversions in the Metroplex with documented performance data.',
  },
  {
    id: 'solar',
    label: '☀️ Solar + HVAC Integration',
    path: `Size your solar array to cover your HVAC load first — in DFW, HVAC is 50-60% of annual electricity use. A 10kW solar system covers most DFW homes' HVAC needs. Add a 10kWh battery backup and your HVAC runs through ERCOT outages. With solar and heat pump: average DFW utility bill under $40/month.`,
    prolnk: 'ProLnk connects innovators with DFW’s solar-HVAC integration specialists who design both systems together — not two contractors bolting incompatible systems together.',
  },
  {
    id: 'battery',
    label: '🔋 Battery Backup + ERCOT Arbitrage',
    path: 'Powerwall or Franklin whole-home batteries let you charge at $0.08/kWh overnight, run AC from battery during $0.45/kWh ERCOT peak hours, and earn ERCOT demand-response credits. DFW innovators with smart battery systems report $800-1,400/year in utility savings plus demand-response income.',
    prolnk: 'ProLnk vets battery installers on ERCOT enrollment expertise and DFW-specific arbitrage programming — not just battery hardware installation.',
  },
  {
    id: 'smart-controls',
    label: '🧠 Predictive Smart Controls',
    path: 'Ecobee Premium with occupancy learning + ERCOT grid integration + weather-predictive pre-cooling. DFW innovators pre-cool homes to 68°F before noon peak hours, then coast on thermal mass through 3-7pm $0.45/kWh pricing. Combined with variable-speed HVAC: 35-45% lower cooling bills with higher comfort.',
    prolnk: 'ProLnk matches innovators with pros certified in Ecobee Premium, Nest Pro, and ERCOT demand-response enrollment — the full smart-controls stack.',
  },
  {
    id: 'monitoring',
    label: '📊 Real-Time Energy + Air Quality',
    path: 'Sense energy monitor + Awair Element air quality sensors + Reme Halo whole-home air purification. Get real-time HVAC performance data, air quality alerts, and predictive maintenance notifications on your phone. DFW innovators using full monitoring catch problems 3-6 weeks before they become emergency failures.',
    prolnk: 'ProLnk innovator matches include pros who install and configure complete monitoring stacks — not just the HVAC equipment.',
  },
];

export default function DFWHVACDFWInnovator() {
  const [selected, setSelected] = useState(null);
  const item = innovations.find(i => i.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>💡</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>DFW HVAC Innovator Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6 }}>
            Best-available HVAC innovation paths for DFW homeowners who want the future now.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[['☀️ 300+ sun days', 'Solar ROI unmatched'], ['⚡ ERCOT arbitrage', 'Grid earns you money'], ['🔥 Heat pump ready', 'Full climate range'], ['📊 Smart monitoring', 'Prevent failures']].map(([icon, label]) => (
            <div key={label} style={{ background: '#1E2D45', borderRadius: 8, padding: '12px 16px' }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {innovations.map(i => (
            <button
              key={i.id}
              onClick={() => setSelected(selected === i.id ? null : i.id)}
              style={{
                background: selected === i.id ? '#F5E642' : '#1E2D45',
                color: selected === i.id ? '#0A1628' : '#E8EDF5',
                border: 'none',
                borderRadius: 10,
                padding: '16px 20px',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              {i.label}
            </button>
          ))}
        </div>

        {item && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 28, marginBottom: 32, borderLeft: '4px solid #F5E642' }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>💡 BEST DFW INNOVATION PATH</div>
              <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>{item.path}</p>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#4ADE80', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>🔗 HOW PROLNK FINDS YOUR INNOVATOR MATCH</div>
              <p style={{ color: '#E2E8F0', lineHeight: 1.7 }}>{item.prolnk}</p>
            </div>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🚀</div>
          <h3 style={{ color: '#0A1628', fontWeight: 800, fontSize: 20, marginBottom: 8 }}>ProLnk Finds DFW`s True Innovators</h3>
          <p style={{ color: '#1E2D45', fontSize: 14, lineHeight: 1.6 }}>
            Not every contractor can execute cutting-edge HVAC systems in DFW conditions. ProLnk matches innovators with the pros who can.
          </p>
        </div>
      </div>
    </div>
  );
}
