import { useState } from 'react';

const challenges = [
  { label: 'Overheating', solutions: ['Install multi-zone HVAC with smart dampers', 'Add ceiling fans to open area', 'Apply low-E window film on south face', 'Upgrade attic insulation to R-49', 'Use programmable zoning thermostat'] },
  { label: 'Sound Issues', solutions: ['Add area rugs to break sound reflection', 'Install acoustic panels in key zones', 'Use soft furnishings to absorb echo', 'Add door to home office or bedroom', 'Consider sound-dampening ceiling tiles'] },
  { label: 'Dust Distribution', solutions: ['Install whole-home HEPA air purifier', 'Upgrade to MERV 13 furnace filters', 'Add UV germicidal light to HVAC', 'Seal duct work for leaks annually', 'Change filters every 45 days in open plan'] },
  { label: 'Structural Spans', solutions: ['Inspect LVL beams annually for deflection', 'Check ceiling for any sagging signs', 'Verify load-bearing wall locations', 'Inspect point loads above openings', 'Consult structural engineer for remodels'] },
  { label: 'HVAC Zoning', solutions: ['Install variable speed air handler', 'Add smart vents to control airflow', 'Zone by function: kitchen vs living', 'Separate HVAC for bedroom wing', 'Consider ductless mini-split for kitchen'] },
];

const facts = [
  { icon: '🌡️', title: 'HVAC Challenges', desc: 'Open spaces heat faster and harder to zone — DFW summer makes this critical to solve' },
  { icon: '🔊', title: 'Sound Dynamics', desc: 'Open floor plans create echo chambers — hard surfaces + high ceilings amplify noise' },
  { icon: '💨', title: 'Dust Circulation', desc: 'Open concept distributes cooking, pet and allergy particles throughout home faster' },
  { icon: '🏗️', title: 'Structural Spans', desc: 'Removing walls requires LVL beams — inspect annually for deflection in DFW humidity swings' },
  { icon: '📈', title: 'Resale Premium', desc: 'Open concept adds 5-10% resale value in DFW — 85%+ of buyers prefer it' },
  { icon: '🍳', title: 'Kitchen Integration', desc: 'Open kitchen requires better ventilation — 600+ CFM range hood mandatory for DFW cooking' },
];

export default function DFWOpenConceptHomeGuide2026() {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Open Concept Home Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>HVAC, acoustics, and structural essentials for DFW open floor plans</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: 16, border: '1px solid #F5E642', marginBottom: 32, display: 'flex', gap: 12 }}>
          <span style={{ fontSize: 28 }}>📊</span>
          <div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>DFW New Construction Trend</div>
            <div style={{ color: '#94a3b8', fontSize: 14 }}>Open concept dominates 75%+ of DFW new builds since 2015 — but DFW's extreme climate creates unique HVAC and maintenance challenges that traditional floor plans avoid</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {facts.map((f, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 10, padding: 16, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 14 }}>{f.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>🔍 Open Concept Challenge → Solution Guide</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {challenges.map((c, i) => (
              <button key={i} onClick={() => setSelected(i)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff' }}>{c.label}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {challenges[selected].solutions.map((s, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: '#F5E642' }}>→</span>
                <span style={{ color: '#e2e8f0', fontSize: 14 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: 20, background: '#0f2040', borderRadius: 12, border: '1px solid #F5E642' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Find DFW HVAC and Home Specialists</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk connects open concept homeowners with HVAC zoning and home improvement pros</div>
        </div>
      </div>
    </div>
  );
}
