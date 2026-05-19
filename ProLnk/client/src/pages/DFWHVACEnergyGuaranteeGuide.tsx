import { useState } from 'react';

const upgrades = [
  {
    id: 'full_system',
    label: 'Full system replacement (air handler + condenser)',
    savings: '15–25% reduction in annual HVAC energy costs',
    realistic: 'In DFW, a 14–18 SEER2 system replacing a 10 SEER unit typically cuts cooling costs 20–30%. Results depend on home envelope quality.',
    document: 'Take 12 months of utility bills before install. Compare same months the following year. Account for degree-day differences using NOAA DFW data.',
    pitfall: 'Guarantees above 25% are usually marketing unless paired with insulation and air sealing upgrades. Get the math in writing.',
  },
  {
    id: 'condenser_only',
    label: 'Condenser/compressor replacement only',
    savings: '10–18% reduction in cooling season energy costs',
    realistic: 'Replacing only the outdoor unit in DFW limits savings since the old air handler and coil create mismatches. Expect 10–15% realistically.',
    document: 'Isolate cooling season months (May–Oct in DFW). Compare kWh usage year-over-year. Ask contractor for projected SEER2 improvement documentation.',
    pitfall: 'Mismatched systems can actually reduce efficiency. Demand a matched system calculation before agreeing to condenser-only upgrades.',
  },
  {
    id: 'smart_thermostat',
    label: 'Smart thermostat upgrade',
    savings: '8–12% on total HVAC energy bill',
    realistic: 'Ecobee and Nest data show 10–12% savings in DFW when schedules are properly configured. Savings depend heavily on prior thermostat habits.',
    document: 'Enable energy reports in the thermostat app from day one. Export monthly reports for before/after comparison. Free documentation built in.',
    pitfall: 'A smart thermostat without a properly sized system cannot overcome fundamental HVAC inefficiency. It\’s an optimizer, not a fix.',
  },
  {
    id: 'variable_speed',
    label: 'Variable speed air handler upgrade',
    savings: '20–30% reduction in fan energy costs year-round',
    realistic: 'Variable speed motors use 60–75% less electricity than single-stage. In DFW\’s long cooling season, this adds up fast. Realistic savings: $200–400/yr.',
    document: 'Compare kWh on utility bills for fan-heavy months. Ask manufacturer for certified AHRI efficiency data for your specific model combination.',
    pitfall: 'Variable speed benefits require proper static pressure design. If ducts aren\’t right, efficiency gains are cut in half.',
  },
  {
    id: 'insulation',
    label: 'Duct sealing and attic insulation (with HVAC)',
    savings: '25–40% total HVAC system energy reduction',
    realistic: 'This is the highest-ROI upgrade in DFW. Attic temps reach 140°F+ in summer. Proper insulation and sealed ducts dramatically cut load.',
    document: 'Get a blower door test before and after. Compare duct leakage percentage. Calculate savings from reduced runtime hours using smart thermostat data.',
    pitfall: 'HVAC contractors should not guarantee insulation savings they didn\’t install. Require a whole-home energy audit to document baseline.',
  },
];

export default function DFWHVACEnergyGuaranteeGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#E8EDF4' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚡</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 12 }}>
            DFW HVAC Energy Savings Guarantee Guide
          </h1>
          <p style={{ fontSize: 16, color: '#9BAAC0', maxWidth: 580, margin: '0 auto' }}>
            What energy savings guarantees are worth having in DFW — and how to document and claim them.
          </p>
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            📊 What's Realistic in DFW
          </h2>
          <p style={{ color: '#9BAAC0', fontSize: 15, lineHeight: 1.7 }}>
            DFW HVAC systems run 2,000–3,000 hours per year — far above the national average of 750 hours. That means
            efficiency gains compound quickly. A 15% savings guarantee on a $2,400/yr HVAC bill saves $360/yr.
            Most reputable DFW contractors won't guarantee specific dollar amounts, but they should document SEER2 improvements
            and estimated runtime reduction. Guarantees of 10–20% reduction are realistic and verifiable.
          </p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#E8EDF4', marginBottom: 16 }}>
          🔧 Select Your Upgrade Type
        </h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
          {upgrades.map(u => (
            <button
              key={u.id}
              onClick={() => setSelected(selected === u.id ? null : u.id)}
              style={{
                background: selected === u.id ? '#1A3A6E' : '#0F2040',
                border: selected === u.id ? '2px solid #F5E642' : '1px solid #1E3A5F',
                borderRadius: 10, padding: '16px 20px', cursor: 'pointer',
                textAlign: 'left', color: '#E8EDF4', fontSize: 15, fontWeight: 600,
                transition: 'all 0.2s', width: '100%',
              }}
            >
              {selected === u.id ? '▼' : '▶'} {u.label}
              {selected === u.id && (
                <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>💰 Realistic Savings Expectation</div>
                    <div style={{ color: '#C5D3E8', fontSize: 14, lineHeight: 1.6 }}>{u.savings}</div>
                    <div style={{ color: '#9BAAC0', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{u.realistic}</div>
                  </div>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>📁 How to Document for Claims</div>
                    <div style={{ color: '#C5D3E8', fontSize: 14, lineHeight: 1.6 }}>{u.document}</div>
                  </div>
                  <div style={{ background: '#1A0A0A', border: '1px solid #5F1E1E', borderRadius: 8, padding: 14 }}>
                    <div style={{ color: '#FF6B6B', fontWeight: 700, marginBottom: 6 }}>⚠️ Watch Out For</div>
                    <div style={{ color: '#C5D3E8', fontSize: 14, lineHeight: 1.6 }}>{u.pitfall}</div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>📋 Before You Sign: Documentation Checklist</h3>
          <ul style={{ color: '#9BAAC0', fontSize: 14, lineHeight: 1.9, paddingLeft: 20 }}>
            <li>Pull 12 months of Oncor/Coserv/TNMP bills before install</li>
            <li>Request AHRI matching documentation for your specific equipment combination</li>
            <li>Get written SEER2 rating for the installed system — not just the equipment rating</li>
            <li>Ask for estimated annual kWh savings, not just percentage</li>
            <li>Set a calendar reminder to compare bills at 6 and 12 months post-install</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
