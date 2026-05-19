import { useState } from 'react';

const futures = [
  {
    id: 'heatpump',
    label: '🔁 More Heat Pumps',
    title: 'Heat Pumps Become the Default in DFW',
    timeline: '2026–2028',
    description: 'Texas updated energy codes now make heat pumps the de-facto standard for new construction. Dual-fuel heat pumps (gas backup) dominate new DFW builds. All-electric heat pumps are viable for well-insulated homes under 2,500 sq ft. The IRS credit of up to $2,000 runs through 2032.',
    doNow: 'Get a heat pump suitability assessment with your next tune-up. Ask your ProLnk pro to evaluate your duct system and insulation first — improper installs waste the benefit.',
  },
  {
    id: 'smart',
    label: '📱 Smarter Controls',
    title: 'AI-Driven Thermostat and Grid Integration',
    timeline: '2026–2027',
    description: 'Ecobee, Nest, and new entrants now offer AI-adaptive scheduling that learns your household patterns and pre-cools before ERCOT peak events. Utilities are rolling out dynamic pricing in 2026 — systems that auto-respond will save homeowners $200–$400/year.',
    doNow: 'If you don\’t have a smart thermostat, install one before June. Enroll in your utility\’s demand-response program to start earning credits this summer.',
  },
  {
    id: 'ai',
    label: '🤖 ProLnk AI Matching',
    title: 'ProLnk’s AI Matches by System Type, Not Just ZIP',
    timeline: '2026 (in progress)',
    description: 'ProLnk is building AI-powered matching that considers your system brand, age, refrigerant type, and service history — not just geography. This means the pro you\’re matched with already knows your system type and arrives prepared. Match accuracy improves with every home added.',
    doNow: 'Sign up now to be in the founding group. Early members help train the matching model and get first access to verified pros as the network grows.',
  },
  {
    id: 'vault',
    label: '🏥 Home Health Vault',
    title: 'Your Home’s HVAC History Becomes a Permanent Asset',
    timeline: '2026–2027',
    description: 'The Home Health Vault stores your system model, install date, service records, filter change logs, and warranty info — permanently linked to your home\’s address. Future buyers, pros, and insurance companies can access verified history. Homes with Vault records sell faster and at higher prices.',
    doNow: 'Start your Vault now by adding your HVAC system details. Every service visit you log increases your home\’s data value and makes future service calls faster.',
  },
  {
    id: 'refrigerant',
    label: '🧪 Refrigerant Evolution',
    title: 'R-410A Out, R-32 and R-454B Take Over',
    timeline: '2026–2030',
    description: 'R-410A is no longer produced for new equipment as of January 2026. R-32 (lower GWP) and R-454B (Puron Advance) are the new standards. This means new systems are more efficient and environmentally compliant. Service of existing R-410A systems continues but recharge costs will keep rising.',
    doNow: 'If your system is R-410A and over 8 years old, budget for replacement within 2–3 years. Get a replacement quote now from a ProLnk pro to know what you\’re working toward.',
  },
];

export default function DFWHVACDFWFuture2026() {
  const [selected, setSelected] = useState(futures[0].id);
  const active = futures.find(f => f.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW HVAC 2026</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px' }}>What's Coming for DFW HVAC</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>
            Select a future trend to see the timeline and what DFW homeowners should do now to get ahead of it.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 36 }}>
          {futures.map(f => (
            <button key={f.id} onClick={() => setSelected(f.id)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: selected === f.id ? '#F5E642' : '#1E3A5F', backgroundColor: selected === f.id ? '#F5E642' : '#0F2340', color: selected === f.id ? '#0A1628' : '#CBD5E1', fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>{f.label}</button>
          ))}
        </div>

        <div style={{ backgroundColor: '#0F2340', borderRadius: 16, padding: 36, border: '1px solid #1E3A5F' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', margin: 0 }}>{active.title}</h2>
            <span style={{ backgroundColor: '#1E3A5F', color: '#94A3B8', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 20, whiteSpace: 'nowrap' }}>📅 {active.timeline}</span>
          </div>
          <p style={{ color: '#CBD5E1', fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>{active.description}</p>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: '20px 24px', borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>What to Do Now</div>
            <p style={{ color: '#E2E8F0', margin: 0, fontSize: 15, lineHeight: 1.6 }}>{active.doNow}</p>
          </div>
        </div>

        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[['🔥', 'Summer 2026', 'Record heat forecast. Get ahead now.'], ['⚡', 'ERCOT 2026', '8.4 GW new capacity added. DR credits available.'], ['🤖', 'ProLnk AI', 'Matching by system type launching 2026.']].map(([icon, title, desc]) => (
            <div key={title as string} style={{ backgroundColor: '#0F2340', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 14 }}>{title}</div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center', backgroundColor: '#0F2340', borderRadius: 12, padding: 28, border: '1px solid #F5E642' }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Be Ready for the Future of DFW HVAC</div>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Join ProLnk now — free for homeowners. Get early access to AI matching, Vault integration, and vetted pros.</p>
          <a href="https://prolnk.io" style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}>Join ProLnk — It's Free</a>
        </div>
      </div>
    </div>
  );
}
