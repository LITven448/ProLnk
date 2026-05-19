import { useState } from 'react';

const situations = [
  {
    situation: 'New DFW Homeowner',
    icon: '🏠',
    emergencyContacts: ['Gas leak: Atmos Energy 1-888-286-6700', 'Power outage: Oncor 1-888-313-4747 or TXU 1-800-818-6132', 'Water main: Your city water dept (call 311)', 'Fire/Police/EMS: 911'],
    topPriorities: ['Document home condition in Home Health Vault NOW', 'Locate gas shutoff, water main shutoff, electrical panel', 'Sign up for county tornado/weather alerts', 'Schedule HVAC service — DFW heat kills units fast', 'Check foundation for clay soil cracks (spring and fall)'],
    maintenanceHighlights: ['Jan: Freeze prep check. Feb-Mar: Foundation inspection. Apr-May: HVAC tune-up. Jun-Aug: Check attic insulation + ozone alert prep. Sep-Oct: Roof inspection pre-storm. Nov-Dec: Weatherstripping + freeze prep.'],
    prolnkTip: 'Set up ProLnk account to get vetted DFW contractor quotes for any trade. All pros are licensed, insured, and familiar with DFW-specific conditions.',
  },
  {
    situation: 'Preparing for Storm Season',
    icon: '🌪️',
    emergencyContacts: ['Tarrant County Emergency: tarrantcounty.com/alerts', 'Dallas County: dallascounty.org/emergency', 'NOAA Weather Radio: 162.550 MHz DFW', 'State Farm Claims: 1-800-732-5246 (or your insurer)'],
    topPriorities: ['Photograph every room and exterior NOW (pre-damage)', 'Know your wind/hail deductible (usually 1-2% of home value in TX)', 'Trim trees within 10 ft of home before June', 'Identify interior shelter room for tornado', 'Check roof condition before hail season'],
    maintenanceHighlights: ['DFW storm season peaks April–June and again September–October. Pre-season roof inspection is the single highest ROI prep. Budget $300-600 for tune-up vs $15,000+ for full replacement.'],
    prolnkTip: 'Book a pre-storm season roof inspection through ProLnk. DFW roofers on the platform specialize in hail damage assessment and insurance documentation.',
  },
  {
    situation: 'Managing Aging Home (15+ yrs)',
    icon: '🔧',
    emergencyContacts: ['Foundation specialist: Get 3 ProLnk quotes', 'Plumbing leak: Shut water main first, then call', 'HVAC failure: Average DFW unit age 12-15 years', 'Electrical panel upgrade: Licensed electrician only'],
    topPriorities: ['Foundation inspection — DFW clay causes movement in older homes', 'HVAC replacement planning if unit is 12+ years old', 'Re-pipe assessment if original copper or galvanized', 'Roof age — DFW shingles last 15-20 years (hail reduces lifespan)', 'Electrical panel — Federal Pacific or Zinsco panels need replacement'],
    maintenanceHighlights: ['DFW aging home priorities: Foundation (clay soil movement), HVAC (extreme heat cycling), Roof (hail exposure), Plumbing (water heater 8-12 yr life). Add all to Home Health Vault with service dates.'],
    prolnkTip: 'Home Health Vault tracks your home\’s age, systems, and service history. ProLnk connects you with DFW specialists for each major system.',
  },
  {
    situation: 'Landlord / Rental Property',
    icon: '🏘️',
    emergencyContacts: ['24hr emergency maintenance: Have a ProLnk-vetted plumber and HVAC tech on call', 'Tenant emergency line: Set up before placing tenants', 'Property manager contacts: Store in Home Health Vault', 'Insurance: Separate landlord policy required — not homeowner policy'],
    topPriorities: ['Document property condition with photos at each tenancy', 'Annual HVAC service — legally required to provide habitable conditions', 'Water heater age tracking — liability if it fails', 'Smoke and CO detector compliance — TX law', 'Roof and foundation inspection annually'],
    maintenanceHighlights: ['TX landlords must maintain habitable conditions. DFW-specific risks: HVAC failure in 100°F+ heat, foundation movement, frozen pipes. Document everything. Home Health Vault protects you legally.'],
    prolnkTip: 'ProLnk offers preferred rates for DFW landlords with multiple properties. Manage all property maintenance requests through one platform.',
  },
];

export default function DFWHomeownerFinalGuide2026() {
  const [situation, setSituation] = useState('New DFW Homeowner');
  const [section, setSection] = useState('topPriorities');
  const data = situations.find(s => s.situation === situation);

  const sections = [
    { key: 'topPriorities', label: '🎯 Top Priorities' },
    { key: 'emergencyContacts', label: '📞 Emergency Contacts' },
    { key: 'maintenanceHighlights', label: '📅 Maintenance' },
    { key: 'prolnkTip', label: '🔗 ProLnk' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏆</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>DFW Homeowner's Final Complete Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Everything a DFW homeowner needs — organized, personalized, and actionable</p>
        </div>

        <div style={{ background: '#0F2137', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 14 }}>🔍 Your Situation</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {situations.map(s => (
              <button key={s.situation} onClick={() => setSituation(s.situation)} style={{ padding: '9px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: situation === s.situation ? '#F5E642' : '#162842', color: situation === s.situation ? '#0A1628' : '#fff', fontWeight: 600, fontSize: 12 }}>{s.icon} {s.situation}</button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
            {sections.map(s => (
              <button key={s.key} onClick={() => setSection(s.key)} style={{ padding: '7px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: section === s.key ? '#F5E642' : '#162842', color: section === s.key ? '#0A1628' : '#94a3b8', fontWeight: 600, fontSize: 12 }}>{s.label}</button>
            ))}
          </div>

          {data && (
            <div style={{ background: '#162842', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
              {Array.isArray(data[section as keyof typeof data]) ? (
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {(data[section as keyof typeof data] as string[]).map((item, i) => (
                    <li key={i} style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.8, marginBottom: 4 }}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{data[section as keyof typeof data] as string}</p>
              )}
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
          {[
            { icon: '🌡️', title: 'Extreme Heat', desc: 'HVAC & roof maintenance critical June–Aug' },
            { icon: '🌪️', title: 'Tornado Alley', desc: 'Know your shelter plan before storm season' },
            { icon: '🧱', title: 'Clay Soil', desc: 'Foundation movement affects every DFW home' },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{ background: '#0F2137', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🔗</div>
          <h2 style={{ color: '#0A1628', fontSize: 20, margin: '0 0 8px' }}>ProLnk + Home Health Vault</h2>
          <p style={{ color: '#162842', fontSize: 14, lineHeight: 1.6, margin: '0 0 16px' }}>Join ProLnk to get vetted DFW contractor quotes for any home service. Sign up for Home Health Vault to document your home's systems, service history, and condition — the smartest thing a DFW homeowner can do before the next storm, freeze, or foundation issue.</p>
          <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 20px', display: 'inline-block', color: '#F5E642', fontWeight: 700, fontSize: 15 }}>prolnk.io — Get Started Free</div>
        </div>
      </div>
    </div>
  );
}