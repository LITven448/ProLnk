import { useState } from 'react';

export default function HomeSmartAutomationGuide() {
  const [selected, setSelected] = useState<number | null>(null);

  const devices = [
    {
      rank: 1,
      name: 'Smart Thermostat',
      examples: 'Nest / Ecobee',
      cost: '$150 – $300 installed',
      savings: '$180/yr avg',
      payback: '1.7 years',
      diy: 'DIY-possible',
      icon: '🌡️',
      dfwNote: 'DFW’s extreme temperature swings (20°F to 108°F) make smart thermostats deliver some of the highest ROI of any smart home device nationally. HVAC accounts for 50-60% of DFW utility bills.',
      tips: ['Pre-cool your home before peak rate hours (3-7pm)', 'Set vacation mode before travel — don’t let AC run empty at full capacity', 'Ecobee’s room sensors work well in large DFW single-story homes'],
    },
    {
      rank: 2,
      name: 'Smart Irrigation Controller',
      examples: 'Rachio 3',
      cost: '$200 – $400 installed',
      savings: '30-50% water cost reduction',
      payback: '2 years',
      diy: 'DIY-possible',
      icon: '💧',
      dfwNote: 'DFW water rates are rising sharply. Clay soil means overwatering causes foundation problems AND wastes money. Smart irrigation skips watering after rain and adjusts for evapotranspiration.',
      tips: ['Rachio integrates with local weather data automatically', 'Schedule watering 4-6am to minimize evaporation', 'Separate zones for sun/shade areas — they need very different moisture'],
    },
    {
      rank: 3,
      name: 'Video Doorbell + Outdoor Cameras',
      examples: 'Ring / Arlo / Nest Cam',
      cost: '$300 – $800 installed',
      savings: 'Insurance discount + security',
      payback: '2-4 years',
      diy: 'Mostly DIY',
      icon: '📹',
      dfwNote: 'Some insurance carriers offer 2-5% discount for verified smart security systems. Camera footage is invaluable for insurance claims after break-ins or storm damage.',
      tips: ['Cover all entry points plus HVAC equipment (frequent theft target)', 'Ensure cameras cover your outdoor AC units — copper theft is common', 'Store clips to cloud, not just local storage'],
    },
    {
      rank: 4,
      name: 'Smart Door Locks',
      examples: 'Schlage Encode / Yale Assure',
      cost: '$200 – $400 installed',
      savings: 'Convenience + security value',
      payback: 'Lifestyle upgrade',
      diy: 'DIY-possible',
      icon: '🔐',
      dfwNote: 'Useful for letting contractors in remotely — critical in DFW where service windows are wide and you’re often at work. Create temporary codes for specific time windows.',
      tips: ['Choose Z-Wave or Zigbee protocol for broader smart home compatibility', 'Keep a physical backup key — smart locks can fail during power outages', 'Set auto-lock timer for 5-10 minutes'],
    },
    {
      rank: 5,
      name: 'Smart Garage Door',
      examples: 'Chamberlain myQ / Meross',
      cost: '$150 – $350 installed',
      savings: 'Security — prevent accidental open',
      payback: 'Peace of mind',
      diy: 'DIY-possible',
      icon: '🚗',
      dfwNote: 'In DFW, an open garage door during storms can allow wind-driven rain to flood the garage and damage stored belongings. Smart alerts when door is left open are genuinely valuable.',
      tips: ['myQ integrates with Amazon Key for package delivery inside your garage', 'Set close reminder if open more than 15 minutes', 'Check compatibility with your existing opener before buying'],
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DFW Smart Home Guide</div>
        <h1 style={{ fontSize: 42, fontWeight: 800, color: '#F8FAFC', marginBottom: 16, lineHeight: 1.1 }}>
          Automate Your Way to Lower Bills and Better Security
        </h1>
        <p style={{ fontSize: 20, color: '#94A3B8', marginBottom: 48, lineHeight: 1.6 }}>
          The top smart home devices ranked by ROI for DFW homeowners
        </p>

        <div style={{ background: '#132038', border: '1px solid #1E3A5F', borderRadius: 12, padding: 28, marginBottom: 48 }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🏠</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F8FAFC', marginBottom: 12 }}>Why Smart Home Pays Off More in DFW</h2>
          <p style={{ color: '#94A3B8', lineHeight: 1.7 }}>
            DFW's extreme climate — 20°F winters, 108°F summers, flash flooding, hailstorms — creates unusually high potential for smart home savings. HVAC alone accounts for 50-60% of most DFW utility bills. Smart thermostats deliver <strong style={{ color: '#F59E0B' }}>average savings of $180/yr</strong>, making the payback period under 2 years — one of the best ROIs in home improvement.
          </p>
        </div>

        <h2 style={{ fontSize: 26, fontWeight: 700, color: '#F8FAFC', marginBottom: 8 }}>Top 5 Smart Devices by ROI</h2>
        <p style={{ color: '#64748B', fontSize: 14, marginBottom: 24 }}>Tap any device to see DFW-specific tips and details</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
          {devices.map((device, i) => (
            <div
              key={i}
              style={{ background: '#0F2033', border: `1px solid ${selected === i ? '#3B82F6' : '#1E3A5F'}`, borderRadius: 12, overflow: 'hidden' }}
            >
              <button
                onClick={() => setSelected(selected === i ? null : i)}
                style={{ width: '100%', padding: '22px 24px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                  <div style={{ background: '#1E3A5F', borderRadius: 8, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                    {device.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, background: '#1E3A5F', color: '#64748B', borderRadius: 4, padding: '1px 6px' }}>#{device.rank}</span>
                      <span style={{ fontSize: 18, fontWeight: 700, color: '#F8FAFC' }}>{device.name}</span>
                      <span style={{ fontSize: 13, color: '#64748B' }}>{device.examples}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 14, color: '#3B82F6', fontWeight: 600 }}>{device.cost}</span>
                      <span style={{ fontSize: 14, color: '#22C55E' }}>Saves: {device.savings}</span>
                      <span style={{ fontSize: 14, color: '#F59E0B' }}>Payback: {device.payback}</span>
                    </div>
                  </div>
                  <span style={{ color: '#64748B', fontSize: 16 }}>{selected === i ? '▲' : '▼'}</span>
                </div>
              </button>
              {selected === i && (
                <div style={{ padding: '0 24px 24px' }}>
                  <div style={{ background: '#132038', borderRadius: 8, padding: 16, marginBottom: 16, borderLeft: '3px solid #3B82F6′ }}>
                    <div style={{ fontSize: 12, color: '#3B82F6', fontWeight: 700, marginBottom: 6, textTransform: 'uppercase' }}>DFW-Specific Value</div>
                    <p style={{ color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>{device.dfwNote}</p>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#F8FAFC', marginBottom: 10 }}>Pro Tips:</div>
                  {device.tips.map((tip, j) => (
                    <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                      <span style={{ color: '#22C55E', flexShrink: 0 }}>→</span>
                      <span style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.5 }}>{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#132038', border: '1px solid #1E3A5F', borderRadius: 12, padding: 28, marginBottom: 48 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#F8FAFC', marginBottom: 16 }}>🔒 A Note on Privacy</h3>
          <p style={{ color: '#94A3B8', lineHeight: 1.7, marginBottom: 12 }}>
            Smart home devices collect data about your daily patterns, energy use, and in some cases, voice commands and video. Before buying, understand:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Where is your data stored — on-device, cloud, or both?',
              'Can you opt out of data sharing with third parties?',
              'What happens to your data if the company is acquired or shuts down?',
              'Does the device work locally if internet is down?',
            ].map((q, i) => (
              <div key={i} style={{ display: 'flex', gap: 10 }}>
                <span style={{ color: '#F59E0B' }}>?</span>
                <span style={{ color: '#94A3B8', fontSize: 14 }}>{q}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1E3A5F 0%, #132038 100%)', border: '1px solid #3B82F6', borderRadius: 16, padding: 36, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 16 }}>🔧</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: '#F8FAFC', marginBottom: 12 }}>Find a Smart Home Installer</h3>
          <p style={{ color: '#94A3B8', marginBottom: 24 }}>Some smart home devices require licensed electricians for installation. TrustyPro connects you with verified DFW electricians and smart home integrators.</p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#3B82F6', color: '#fff', padding: '14px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, textDecoration: 'none' }}>
            Find a Smart Home Installer
          </a>
        </div>

      </div>
    </div>
  );
}
