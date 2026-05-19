import { useState } from 'react';

const problems = [
  {
    id: 'humidity',
    label: 'High Humidity',
    icon: '💧',
    advantage: 'Inverter systems run at 30-40% capacity for extended periods instead of blasting at 100% for 10 minutes and shutting off. This long run time removes 3-5x more moisture from DFW air. Standard single-stage systems in DFW routinely leave indoor humidity at 60-70% even when the temperature target is met.',
    costPremium: 'Inverter system adds $1,500-$3,000 over single-stage equivalent capacity.',
    payback: 'Reduced dehumidifier costs ($200-400/yr savings) + comfort improvement typically yields 5-8 year payback on humidity alone.',
    compatible: 'Carrier Infinity, Trane XV series, Lennox Signature, Daikin VRV',
  },
  {
    id: 'bills',
    label: 'High Energy Bills',
    icon: '💸',
    advantage: 'Inverter compressors modulate between 30-100% output, consuming only the electricity needed at any moment. In DFW, where cooling runs 5-7 months continuously, this translates to 25-40% lower energy consumption vs single-stage systems of the same rated SEER2.',
    costPremium: 'Inverter premium: $1,500-$3,500 over single-stage at same tonnage.',
    payback: 'At DFW electricity rates (~$0.13/kWh), savings of $300-600/yr are common. Full payback: 5-8 years depending on home size.',
    compatible: 'Any variable-speed condenser with matching variable-speed air handler and communicating thermostat.',
  },
  {
    id: 'comfort',
    label: 'Uneven Comfort',
    icon: '🌡️',
    advantage: 'Single-stage systems create wide temperature swings — room spikes 2-4 degrees above setpoint before the system kicks on, then drops below. Inverter systems maintain setpoint within 0.5 degrees by running continuously at low capacity, eliminating hot spots and cold blasts.',
    costPremium: 'Inverter premium: $1,500-$3,000. Zoning integration adds another $2,000-$5,000 if desired.',
    payback: 'Comfort improvement is immediate and qualitative. Energy payback: 5-8 years. Combined value justifies premium for most DFW homeowners.',
    compatible: 'Mitsubishi Hyper-Heat, Daikin Fit, Bosch Ultra-Quiet, Lennox XC21',
  },
  {
    id: 'noise',
    label: 'Loud System Noise',
    icon: '🔊',
    advantage: 'Inverter systems running at low capacity operate at 56-62 dB — quieter than a normal conversation. Single-stage condensers starting at full capacity hit 72-78 dB, especially noticeable during quiet DFW evenings. Inverter eliminates the loud start-up surge entirely.',
    costPremium: 'Premium: $1,500-$3,000 over single-stage.',
    payback: 'No direct financial payback — this is a quality-of-life benefit. Energy savings still provide 5-8 year payback on the premium.',
    compatible: 'Bosch BOVA Ultra-Quiet series (as low as 56 dB), Lennox XC21, Mitsubishi Diamond',
  },
  {
    id: 'lifespan',
    label: 'Short System Life',
    icon: '⏳',
    advantage: 'Single-stage compressors start and stop thousands of times per year — the start cycle is the hardest mechanical stress. DFW systems cycle 15-20 times per hour in summer. Inverter compressors rarely stop completely, reducing start cycles by 90%+ and dramatically extending compressor life.',
    costPremium: 'Inverter premium: $1,500-$3,500.',
    payback: 'If inverter extends system life from 12 to 18 years, that is 6 extra years before a $10,000+ replacement. Payback is very favorable over system lifetime.',
    compatible: 'Systems with scroll inverter compressors: Carrier, Trane, Lennox, Daikin all offer these.',
  },
];

export default function DFWHVACInverterTechGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = problems.find(p => p.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>PROLNK · DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Inverter HVAC Technology for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Why variable-speed inverter HVAC systems dramatically outperform single-stage in Dallas-Fort Worth — especially for humidity, energy costs, and comfort.
        </p>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontWeight: 800, marginBottom: '0.75rem', fontSize: '0.9rem', letterSpacing: 1 }}>WHY INVERTER MATTERS MORE IN DFW</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {[
              { icon: '☀️', stat: '3,000+', desc: 'Cooling hours per year in DFW vs national average of 1,200′ },
              { icon: '💧', stat: '65-75%', desc: 'Typical outdoor relative humidity May-September in DFW' },
              { icon: '⚡', stat: '25-40%', desc: 'Average energy savings vs single-stage in continuous DFW use' },
              { icon: '🌀', stat: '90%', desc: 'Reduction in compressor start cycles vs single-stage system' },
            ].map(f => (
              <div key={f.stat} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{f.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.2rem' }}>{f.stat}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.4, marginTop: '0.25rem' }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>What DFW problem are you trying to solve?</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem', marginBottom: '2rem' }}>
          {problems.map(p => (
            <button key={p.id} onClick={() => setSelected(p.id === selected ? null : p.id)}
              style={{ background: selected === p.id ? '#F5E642′ : '#0f2240', color: selected === p.id ? '#0A1628' : '#fff', border: '1px solid', borderColor: selected === p.id ? '#F5E642' : '#1e3a5f', borderRadius: 10, padding: '1rem 0.75rem', cursor: ’pointer', textAlign: 'left', fontWeight: 700, fontSize: '0.85rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{p.icon}</div>
              {p.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0f2240', border: '1px solid #1e3a5f', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#F5E642', marginBottom: '1rem' }}>{active.icon} {active.label}: Inverter Advantage</h2>
            <p style={{ lineHeight: 1.7, color: '#e2e8f0', marginBottom: '1.25rem' }}>{active.advantage}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1, marginBottom: '0.4rem' }}>COST PREMIUM</div>
                <p style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>{active.costPremium}</p>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ color: '#F5E642', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1, marginBottom: '0.4rem' }}>PAYBACK PERIOD</div>
                <p style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>{active.payback}</p>
              </div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, letterSpacing: 1, marginBottom: '0.3rem' }}>COMPATIBLE DFW SYSTEMS</div>
              <div style={{ color: '#e2e8f0', fontSize: '0.85rem' }}>{active.compatible}</div>
            </div>
          </div>
        )}

        <div style={{ background: '#0f2240', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', fontWeight: 800, marginBottom: '0.75rem' }}>🏠 Get Inverter HVAC Quotes in DFW</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>ProLnk connects DFW homeowners with inverter-certified HVAC contractors who can properly size and install variable-speed systems for maximum DFW performance.</p>
        </div>
      </div>
    </div>
  );
}