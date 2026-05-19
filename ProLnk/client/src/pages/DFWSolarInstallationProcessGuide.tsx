import { useState } from 'react';

const homeTypes = ['Single Family <1,500 sqft', 'Single Family 1,500–2,500 sqft', 'Single Family >2,500 sqft', 'Townhome'];
const billRanges = ['$100–$150/mo', '$150–$250/mo', '$250–$400/mo', 'Over $400/mo'];

const solarData: Record<string, Record<string, { systemSize: string; timeline: string; monthlyOffset: string; steps: { phase: string; duration: string; action: string }[] }>> = {
  'Single Family <1,500 sqft': {
    '$100–$150/mo': { systemSize: '5–6 kW', timeline: '16–22 weeks', monthlyOffset: '80–100%', steps: [
      { phase: 'Site Assessment', duration: '1–2 days', action: 'Installer evaluates roof pitch, shading, and orientation. DFW optimal: south-facing, 15–30° pitch.' },
      { phase: 'System Design', duration: '1–2 weeks', action: 'Engineer produces layout, single-line diagram, and production model. You review and approve.' },
      { phase: 'Permit Filing', duration: '2–4 weeks', action: 'Filed with your city (Dallas, Fort Worth, Plano, etc.). Most DFW cities 2–3 weeks. Frisco averages 3 weeks.' },
      { phase: 'Installation', duration: '1–2 days', action: 'Crew mounts racking, panels, and inverter. Electrician wires to your panel. Minimal interior work.' },
      { phase: 'Inspection', duration: '1–2 weeks', action: 'City inspector signs off on permits. Schedule through your city’s portal after installer notifies you.' },
      { phase: 'Oncor Interconnection', duration: '6–10 weeks', action: 'Oncor reviews, approves, and upgrades your meter to net metering. Longest step — plan accordingly.' },
    ]},
    '$150–$250/mo': { systemSize: '6–8 kW', timeline: '16–22 weeks', monthlyOffset: '90–110%', steps: [
      { phase: 'Site Assessment', duration: '1–2 days', action: 'Roof condition, attic ventilation, and shading analysis. Request shading report from installer.' },
      { phase: 'System Design', duration: '1–2 weeks', action: 'Optimizers or microinverters likely recommended for DFW partial shading scenarios.' },
      { phase: 'Permit Filing', duration: '2–4 weeks', action: 'HOA approval required if applicable. Confirm with installer. HOA legally cannot deny solar in Texas.' },
      { phase: 'Installation', duration: '1–2 days', action: 'Full installation. Larger system may require panel upgrade ($1,500–$3,000 extra).' },
      { phase: 'Inspection', duration: '1–2 weeks', action: 'City signs off. Get copy of all permits for your records and future home sale.' },
      { phase: 'Oncor Interconnection', duration: '6–12 weeks', action: 'Submit Oncor distributed generation application. System cannot operate until Oncor installs bidirectional meter.' },
    ]},
    '$250–$400/mo': { systemSize: '8–11 kW', timeline: '18–24 weeks', monthlyOffset: '100–120%', steps: [
      { phase: 'Site Assessment', duration: '1–2 days', action: 'Assess if roof can handle system weight. Typical limit: 4 lbs/sqft. Tile roofs may need reinforcement.' },
      { phase: 'System Design', duration: '2 weeks', action: 'Production model targeting 100%+ offset. Consider battery (Tesla Powerwall) for storm backup.' },
      { phase: 'Permit Filing', duration: '3–5 weeks', action: 'Larger systems may require structural engineering letter. Add 1 week if required.' },
      { phase: 'Installation', duration: '2–3 days', action: 'Multi-day installation. Main panel upgrade often required for systems this size.' },
      { phase: 'Inspection', duration: '1–2 weeks', action: 'City and electrical inspections. Larger systems sometimes require two inspection visits.' },
      { phase: 'Oncor Interconnection', duration: '8–12 weeks', action: 'Oncor processes systems over 10 kW separately. Expect longer review. Follow up at week 8.' },
    ]},
    'Over $400/mo': { systemSize: '11–15 kW', timeline: '20–28 weeks', monthlyOffset: '110–130%', steps: [
      { phase: 'Site Assessment', duration: '2 days', action: 'Full structural and electrical assessment. Likely requires panel upgrade and possibly new subpanel.' },
      { phase: 'System Design', duration: '2–3 weeks', action: 'Large system design. Battery storage (10–20 kWh) strongly recommended for TDU outage protection.' },
      { phase: 'Permit Filing', duration: '4–6 weeks', action: 'Complex permit package. Engineering stamp required. Budget extra time.' },
      { phase: 'Installation', duration: '3–4 days', action: 'Multi-day crew. Conduit runs, new disconnects, battery installation if included.' },
      { phase: 'Inspection', duration: '2–3 weeks', action: 'Multiple inspections typical. Building, electrical, and possibly fire marshal for battery storage.' },
      { phase: 'Oncor Interconnection', duration: '10–14 weeks', action: 'Systems >10 kW require extended Oncor review. Assign someone to follow up every 2 weeks.' },
    ]},
  },
};

const fallbackData = (bill: string) => solarData['Single Family <1,500 sqft'][bill] ?? solarData['Single Family <1,500 sqft']['$150–$250/mo'];

export default function DFWSolarInstallationProcessGuide() {
  const [homeType, setHomeType] = useState('');
  const [bill, setBill] = useState('');
  const result = bill ? fallbackData(bill) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW SOLAR</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Solar Installation Process</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>From first quote to powering on — here is every step of the solar process in DFW, including what you need to do at each phase.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          <div>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Home Type</label>
            <select value={homeType} onChange={e => setHomeType(e.target.value)}
              style={{ width: '100%', background: '#0F2040', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value=''>Select...</option>
              {homeTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Monthly Electric Bill</label>
            <select value={bill} onChange={e => setBill(e.target.value)}
              style={{ width: '100%', background: '#0F2040', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value=''>Select...</option>
              {billRanges.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>

        {result && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
              {[
                { label: 'System Size', value: result.systemSize },
                { label: 'Total Timeline', value: result.timeline },
                { label: 'Bill Offset', value: result.monthlyOffset },
              ].map(m => (
                <div key={m.label} style={{ background: '#0F2040', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                  <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 4 }}>{m.label}</div>
                  <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{m.value}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {result.steps.map((step, i) => (
                <div key={step.phase} style={{ background: '#0F2040', borderRadius: 12, padding: 20, borderLeft: '3px solid #F5E642′ }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ fontWeight: 700 }}>Step {i + 1}: {step.phase}</div>
                    <div style={{ color: '#F5E642', fontSize: 13 }}>⏱ {step.duration}</div>
                  </div>
                  <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>{step.action}</div>
                </div>
              ))}
            </div>
          </>
        )}
        {!result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 28, textAlign: 'center', color: '#94A3B8′ }}>
            Select your home type and monthly bill to see your personalized solar timeline.
          </div>
        )}
      </div>
    </div>
  );
}
