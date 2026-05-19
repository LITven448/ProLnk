import { useState } from 'react';

const scenarios = [
  { id: 'foundation', label: 'Foundation Issues', age: '15–30 yrs', captured: ['Original pour specs & depth', 'Pier locations & dates installed', 'Crack measurements with timestamps', 'Soil moisture sensor readings', 'Past plumber/engineer visit records'], dfwHelp: 'DFW\’s expansive clay soil causes foundation movement. A digital twin tracks crack progression over time, so engineers have exact data instead of guesswork — often saving $3K–$8K in unnecessary pier work.' },
  { id: 'hvac', label: 'HVAC System', age: '5–20 yrs', captured: ['Equipment model/serial/install date', 'Filter change history', 'Refrigerant charge records', 'Performance efficiency over time', 'All service visit notes'], dfwHelp: 'DFW HVAC runs 8–10 months/year. Digital twin data lets ProLnk pre-brief a tech with full history — no re-diagnosis fee, faster repair, better parts ordering.' },
  { id: 'roof', label: 'Roof & Exterior', age: 'Any age', captured: ['Shingle type, brand, install date', 'Hail damage inspection reports', 'Repair locations with photos', 'Gutter condition logs', 'Insurance claim history'], dfwHelp: 'DFW averages 4–6 significant hail events/year. A digital twin becomes your insurance claim package — timestamps, photos, and repair history prove your case automatically.' },
  { id: 'plumbing', label: 'Plumbing System', age: '10–40 yrs', captured: ['Pipe material map (copper vs PEX)', 'Water heater age + service records', 'Leak detection sensor placement', 'Pressure readings over time', 'Sewer scope inspection video'], dfwHelp: 'Older DFW homes with cast iron sewer lines need proactive monitoring. Digital twin flags which sections are highest risk before a $15K emergency backup.' },
];

export default function DFWHomeDigitalTwinGuide() {
  const [selected, setSelected] = useState('foundation');
  const sc = scenarios.find(s => s.id === selected)!;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🏛️</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 800, margin: '16px 0 8px' }}>Home Digital Twin Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>Your home as living data — how a digital record transforms maintenance, contractor briefing, and insurance claims in DFW</p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#112240', borderRadius: 16, padding: 28, marginTop: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🔬 What Is a Home Digital Twin?</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 16 }}>A digital twin is a complete, living data record of your physical home — every system, material, repair, and measurement stored in structured format. TrustyPro's 3D scanning creates the foundation; sensors and service records keep it updated over time.</p>
          {[
            ['📐', 'Structural Mapping', 'Exact dimensions, materials, and condition of walls, foundation, roof, and framing captured via 3D scan'],
            ['🔧', 'System Records', 'Every mechanical, electrical, and plumbing component documented with install dates, specs, and service history'],
            ['📸', 'Visual Timeline', 'Photos and scan data timestamped so you can see how your home changes over months and years'],
            ['📋', 'Contractor Briefing', 'Any pro arriving at your home gets a complete data packet — no re-explaining your system history every visit'],
          ].map(([icon, title, desc]) => (
            <div key={title as string} style={{ display: 'flex', gap: 16, marginBottom: 14, background: '#0A1628', borderRadius: 12, padding: 14 }}>
              <span style={{ fontSize: 26 }}>{icon}</span>
              <div><div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4, fontSize: 15 }}>{title}</div><div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{desc}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 28, marginTop: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 8 }}>🏠 Home System → Digital Twin Value</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 20 }}>Select a home system to see what a digital twin captures and how it helps in real DFW scenarios:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {scenarios.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: selected === s.id ? '#F5E642′ : '#1e3a5f', background: selected === s.id ? '#F5E642' : ’transparent', color: selected === s.id ? '#0A1628′ : '#94a3b8', fontWeight: 700, cursor: ’pointer', fontSize: 13 }}>{s.label}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 16 }}>
              <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: 10, fontSize: 15 }}>📦 What Gets Captured</div>
              {sc.captured.map(item => <div key={item} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8, paddingLeft: 8, borderLeft: '2px solid #22c55e' }}>{item}</div>)}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 16 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 15 }}>🌟 DFW-Specific Value</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>{sc.dfwHelp}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 16, padding: 28, marginTop: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🗂️</div>
          <h3 style={{ color: '#0A1628', fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Start Building Your Home's Digital Twin</h3>
          <p style={{ color: '#112240', fontSize: 15, marginBottom: 16 }}>TrustyPro's 3D scanning creates your digital foundation. ProLnk keeps it updated with every service visit.</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>Join the ProLnk Waitlist →</button>
        </div>
      </div>
    </div>
  );
}
