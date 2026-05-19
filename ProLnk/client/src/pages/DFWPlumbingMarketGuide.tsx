import { useState } from 'react';

const suburbs = ['Plano', 'Frisco', 'McKinney', 'Allen', 'Richardson', 'Irving', 'Arlington', 'Fort Worth', 'Garland / Rowlett', 'Denton', 'Mansfield / Midlothian', 'Weatherford'];
const serviceTypes = ['Emergency (Active Leak / Burst)', 'Drain Clog / Backup', 'Water Heater Replacement', 'Sewer Line Inspection / Repair', 'Routine Maintenance / Finding a Pro'];

const serviceData: Record<string, { conditions: string; strategy: string; priceRange: string; uriNote: string }> = {
  'Emergency (Active Leak / Burst)': {
    conditions: '🔴 High demand, especially in winter. DFW lost ~20% of plumbing workforce after Uri 2021 surge and contractor fatigue.',
    strategy: 'Broadcast to all available plumbers simultaneously. Do not wait for callbacks. Shut water main first.',
    priceRange: '$300–$900+ emergency dispatch',
    uriNote: 'Post-Uri, many plumbers who surged in during the storm left the market. DFW plumber supply still recovering as of 2026.',
  },
  'Drain Clog / Backup': {
    conditions: '🟡 Moderate demand. Large national chains (Roto-Rooter, etc.) absorb much of this but quality varies.',
    strategy: 'Local plumber preferred for recurring backups — chains will clear and leave without diagnosing root cause.',
    priceRange: '$150–$450',
    uriNote: 'DFW aging infrastructure (pre-1980 clay pipes) means recurring clogs often signal a sewer line issue.',
  },
  'Water Heater Replacement': {
    conditions: '🟡 Moderate — Predictable demand, most plumbers can schedule 3–7 days out.',
    strategy: 'Get 3 quotes. Tankless vs tank is a significant pricing and permitting difference in DFW.',
    priceRange: '$900–$3,500 (tank vs tankless)',
    uriNote: 'After Uri, many DFW homeowners switched to tankless. Supply of tankless installers improved since 2022.',
  },
  'Sewer Line Inspection / Repair': {
    conditions: '🟠 Tighter — Camera inspection is a specialty. Not all plumbers offer it. Wait times 5–14 days.',
    strategy: 'Specifically ask for video camera sewer inspection before any repair quote. Do not approve work without seeing the footage.',
    priceRange: '$150–$350 inspection; $3,000–$15,000+ repair',
    uriNote: 'DFW tree root intrusion into clay sewer laterals is a major source of sewer line damage. Older neighborhoods hit hardest.',
  },
  'Routine Maintenance / Finding a Pro': {
    conditions: '🟢 Best time to establish a relationship. Non-emergency means leverage to vet thoroughly.',
    strategy: 'Find a plumber before you need one. Pre-winter inspection (October) is smart in DFW. Ask about maintenance plans.',
    priceRange: '$85–$200 inspection / maintenance visit',
    uriNote: 'Winter preparedness matters in DFW. February freezes happen. A trusted plumber\’s cell number is worth more than any app when pipes burst at 2am.',
  },
};

const suburbInsights: Record<string, string> = {
  'Weatherford': '⚡ Far west of DFW — fewer plumbers serve this area. Emergency response times can be 2–4 hours.',
  'Garland / Rowlett': '🏚️ High concentration of 1960s–80s homes with cast iron and clay pipes. Sewer issues very common.',
  'Plano': '🔧 Dense plumber population, but top-rated plumbers book up fast. Response times good for non-emergency.',
};

export default function DFWPlumbingMarketGuide() {
  const [suburb, setSuburb] = useState('');
  const [serviceType, setServiceType] = useState('');

  const result = serviceType ? serviceData[serviceType] : null;
  const suburbNote = suburb ? suburbInsights[suburb] : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW MARKET GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🔧 DFW Plumbing Market</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>February 2021's Winter Storm Uri was a turning point for DFW plumbing. Thousands of homes burst simultaneously, many out-of-state plumbers flooded in, and a significant number of local plumbers retired or relocated after the chaos. The market has been restructuring ever since.</p>

        <div style={{ backgroundColor: '#1a2f4e', borderRadius: 10, padding: 16, marginBottom: 24, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>🌨️ The Uri Effect — Why DFW Plumbing Supply Is Still Tight</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>Winter Storm Uri in February 2021 caused an estimated $200B+ in damages across Texas. In DFW alone, hundreds of thousands of pipes burst in days. The subsequent demand surge burned out many veteran plumbers. Emergency pricing, physical exhaustion, and liability fears accelerated retirements. New licensing pipeline takes 4+ years. Supply gap remains in 2026.</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[['💧', 'Find a Plumber First', 'Establish a relationship BEFORE you need emergency service. It changes everything.'], ['🏚️', 'Old Pipes = Higher Risk', 'Pre-1990 DFW homes often have cast iron or clay drain systems. Know your infrastructure.'], ['❄️', 'Freeze Prep Is Essential', 'DFW averages a significant freeze every 3–5 years. Preparation is table stakes.']].map(([icon, title, desc]) => (
            <div key={String(title)} style={{ backgroundColor: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Your Market Conditions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>DFW Suburb</label>
              <select value={suburb} onChange={e => setSuburb(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select suburb...</option>
                {suburbs.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Service Type</label>
              <select value={serviceType} onChange={e => setServiceType(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value="">Select service...</option>
                {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {suburbNote && <div style={{ backgroundColor: '#1a2f4e', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 14, color: '#F5E642' }}>{suburbNote}</div>}
          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 600 }}>Market: </span>{result.conditions}</div>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 600 }}>Strategy: </span><span style={{ color: '#e2e8f0' }}>{result.strategy}</span></div>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 600 }}>Typical Cost: </span><span style={{ color: '#e2e8f0' }}>{result.priceRange}</span></div>
              <div style={{ backgroundColor: '#1a2f4e', borderRadius: 8, padding: 10, fontSize: 13, color: '#94a3b8' }}>📌 Uri Context: {result.uriNote}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 6 }}>Find Your DFW Plumber Before You Need One</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginBottom: 12 }}>ProLnk connects you with vetted, licensed DFW plumbers — on your schedule, not during a crisis.</div>
          <div style={{ backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 700, padding: '10px 24px', borderRadius: 8, display: 'inline-block' }}>Join ProLnk Waitlist →</div>
        </div>
      </div>
    </div>
  );
}
