import { useState } from 'react';

const concerns = [
  { label: 'Musty smell throughout the house', guide: 'Test via HVAC return: tape an air sampling bag over the return grate for 24 hrs, then send to lab. Check for mold spores (Aspergillus, Cladosporium common in DFW). Also inspect duct insulation for condensation damage.' },
  { label: 'Allergy symptoms worse at home than outdoors', guide: 'Use a particle counter at the return and at registers. High PM 2.5 at registers = HVAC distributing particles. Upgrade to MERV 11–13 filter. DFW cedar/oak pollen peaks Feb–April and spikes IAQ issues.' },
  { label: 'New construction or recent renovation smells', guide: 'VOC detector at HVAC return will capture off-gassing from paint, flooring, adhesives. DFW heat accelerates VOC release. Run system at max fan for 72 hrs with windows cracked before testing.' },
  { label: 'CO alarm triggered or suspected gas source', guide: 'CO monitor at furnace return immediately. DFW gas furnaces (used Oct–Mar) are most common CO source. Annual heat exchanger inspection is non-negotiable. Never mask CO alarm — evacuate and call pros.' },
  { label: 'High utility bills but no obvious cause', guide: 'High CO2 (>1,000 ppm) means poor ventilation — system is recirculating stale air. DFW homes are tight. Add fresh air intake or ERV. A CO2 monitor at the return shows this instantly.' },
];

export default function DFWHVACIndoorQualityTest2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1 }}>DFW HOME SERVICES · 2026 GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>🌬️ DFW HVAC & Indoor Air Quality Testing Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.7 }}>
          Your HVAC system is the <strong style={{ color: '#F5E642' }}>lungs of your DFW home</strong> — it distributes whatever is in the air to every room.
          Testing at the HVAC return gives a whole-home air quality snapshot without installing sensors in every room.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🔬', label: 'Best Test Point', value: 'HVAC return grate' },
            { icon: '🌿', label: 'DFW Pollen Peak', value: 'Feb–April (cedar/oak)' },
            { icon: '💨', label: 'Healthy CO2 Level', value: 'Below 800 ppm' },
            { icon: '😷', label: 'Safe PM 2.5 (EPA)', value: 'Below 12 µg/m³ annual' },
          ].map((s) => (
            <div key={s.label} style={{ background: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F5E642' }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 16, marginBottom: 24, borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🧪 Testing Toolkit for DFW Homeowners</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.8 }}>
            <div>🔬 <strong style={{ color: '#fff' }}>Air sampling cassette</strong> — lab sends spore/VOC report ($40–80)</div>
            <div>📡 <strong style={{ color: '#fff' }}>Particle counter</strong> — real-time PM 2.5/PM 10 ($80–200)</div>
            <div>🌫️ <strong style={{ color: '#fff' }}>VOC detector</strong> — TVOC reading in seconds ($50–150)</div>
            <div>🔴 <strong style={{ color: '#fff' }}>CO + CO2 combo monitor</strong> — place at return ($60–120)</div>
          </div>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🏠 Your Air Quality Concern → HVAC Testing Guide</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {concerns.map((c, i) => (
            <button key={i} onClick={() => setSelected(i === selected ? null : i)}
              style={{ background: selected === i ? '#1e3a5f' : '#112240', border: `1px solid ${selected === i ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '12px 16px', color: '#fff', textAlign: 'left', cursor: 'pointer' }}>
              <div style={{ fontWeight: 600 }}>{c.label}</div>
              {selected === i && (
                <div style={{ marginTop: 10, color: '#94a3b8', lineHeight: 1.7, fontSize: 14 }}>💡 {c.guide}</div>
              )}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 8, textAlign: 'center', color: '#475569', fontSize: 12 }}>
          ProLnk · DFW HVAC Indoor Air Quality Testing Guide 2026 · Data: EPA IAQ, ASHRAE 62.2
        </div>
      </div>
    </div>
  );
}