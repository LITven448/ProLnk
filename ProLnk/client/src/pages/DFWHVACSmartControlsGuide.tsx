import { useState } from 'react';

const goals = [
  {
    goal: 'Reduce energy bill',
    control: 'ERCOT Demand Response Thermostat',
    benefit: 'Earn $50–$150/yr in bill credits by auto-adjusting during DFW grid peaks',
    cost: '$150–$300 installed',
    warning: '',
  },
  {
    goal: 'Zone different rooms',
    control: 'Smart Damper System (Keen, Flair)',
    benefit: 'Control 4–8 zones independently — critical for DFW two-story homes',
    cost: '$800–$2,500 installed',
    warning: '',
  },
  {
    goal: 'Improve comfort',
    control: 'Ecobee with SmartSensor',
    benefit: 'Remote sensors average temp from multiple rooms, not just hallway',
    cost: '$250–$400 installed',
    warning: '',
  },
  {
    goal: 'Smart vents only',
    control: '⚠️ Avoid Smart Vent Covers',
    benefit: 'Closing smart vents increases static pressure and strains DFW 5-ton systems',
    cost: '$300–$900 for system',
    warning: 'NOT recommended for most DFW HVAC setups',
  },
  {
    goal: 'Utility integration',
    control: 'Oncor/ERCOT Connected Thermostat',
    benefit: 'Oncor SmartHours and ERCOT RDRP programs pay per kWh avoided in summer',
    cost: '$0–$100 (utility rebates available)',
    warning: '',
  },
];

export default function DFWHVACSmartControlsGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide</span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 12, lineHeight: 1.2 }}>
          🤖 Smart HVAC Controls for DFW Homes
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>
          Beyond smart thermostats — DFW homeowners have access to utility programs, zoning systems, and ERCOT demand response that most homeowners miss.
        </p>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '16px 24px', marginBottom: 32, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <span style={{ fontSize: 22 }}>⚡</span>
          <div>
            <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 15, marginBottom: 4 }}>DFW Grid Alert: ERCOT Demand Response</div>
            <div style={{ color: '#0A1628', fontSize: 14 }}>Texas deregulated grid means your thermostat can earn bill credits. Oncor SmartHours + ERCOT RDRP pay you to pre-cool your home before peak hours (3–8pm June–Sept).</div>
          </div>
        </div>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🎯 Your Control Goal → Best Solution</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {goals.map((g, i) => (
              <button
                key={i}
                onClick={() => setSelected(selected === i ? null : i)}
                style={{
                  background: selected === i ? '#1A3A6B' : '#0F2040',
                  border: selected === i ? '2px solid #F5E642′ : `2px solid ${g.warning ? '#7F1D1D' : '#1E3A5F'}`,
                  borderRadius: 12,
                  padding: '18px 24px',
                  color: '#E8EDF5',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  width: '100%',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 16 }}>{g.goal}</div>
                {selected === i && (
                  <div style={{ marginTop: 16 }}>
                    <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 17, marginBottom: 10 }}>{g.control}</div>
                    {g.warning && (
                      <div style={{ background: '#7F1D1D', borderRadius: 8, padding: '10px 14px', marginBottom: 12, color: '#FCA5A5', fontSize: 14 }}>
                        ⚠️ {g.warning}
                      </div>
                    )}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 14px' }}>
                        <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>DFW BENEFIT</div>
                        <div style={{ color: '#E8EDF5', fontSize: 13 }}>{g.benefit}</div>
                      </div>
                      <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 14px' }}>
                        <div style={{ color: '#F5E642', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>COST</div>
                        <div style={{ color: '#E8EDF5', fontSize: 13 }}>{g.cost}</div>
                      </div>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h3 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📋 DFW Smart Control Stack (Best Practice)</h3>
          {['ERCOT-enrolled thermostat (Ecobee or Google Nest)', 'Smart dampers if two-story or additions', 'Remote sensors in bedrooms', 'No smart vent covers — bypass ducts instead'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
              <span style={{ color: '#F5E642', fontWeight: 700, marginTop: 1 }}>{i + 1}.</span>
              <span style={{ color: '#CBD5E1', fontSize: 15 }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🤖</div>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Get a Smart Controls Install Quote</h3>
          <p style={{ color: '#0A1628', fontSize: 15, marginBottom: 0 }}>ProLnk matches you with DFW HVAC contractors certified in smart zoning and ERCOT demand response programs.</p>
        </div>
      </div>
    </div>
  );
}
