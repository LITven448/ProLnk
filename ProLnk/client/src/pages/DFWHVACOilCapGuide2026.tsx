import { useState } from 'react';

const situations = [
  { id: 'service', label: 'System just serviced / recharged', guide: 'Tech should have added POE oil to replace what left with refrigerant. Ask for documentation of oil added (oz). If R-410A system got mineral oil, compressor failure risk is high — POE is required for R-410A lubrication.' },
  { id: 'mixed', label: 'Old oil mixed with new refrigerant', guide: 'Mixed oil (mineral + POE) is a known DFW compressor killer. Symptoms: reduced cooling, compressor noise, high amp draw. Full system flush by a qualified tech is the only fix. Do not keep running — compressor replacement costs $1,400–$2,800.' },
  { id: 'oilStains', label: 'Oil stains on refrigerant lines', guide: 'Oil stains on line set or fittings = refrigerant leak. Refrigerant carries oil out of the system — low oil = bearing failure. Locate and repair leak first, then recharge with proper refrigerant + POE oil measured by oz per ton.' },
  { id: 'sightGlass', label: 'Bubbling sight glass', guide: 'Bubbling (foam) in sight glass = low refrigerant or oil contamination foaming. If system is properly charged and you still see foam, suspect oil breakdown or moisture contamination. Have a DFW tech pull refrigerant sample for acid and moisture test.' },
];

export default function DFWHVACOilCapGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = situations.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 ProLnk DFW HVAC Series</div>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 4 }}>DFW HVAC Refrigerant Oil Guide 2026</h1>
        <p style={{ color: '#a0aec0', marginBottom: 24 }}>POE oil requirements, mixed oil contamination risks, and oil-related issues in DFW HVAC refrigerant systems.</p>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🛢️ POE Oil — The DFW Standard</h2>
          <p style={{ color: '#cbd5e0', lineHeight: 1.6, marginBottom: 10 }}>R-410A (and all newer refrigerants including R-32 and R-454B) require Polyolester (POE) oil. POE oil is hygroscopic — it absorbs moisture — so caps on refrigerant ports must be kept tight. Mineral oil is incompatible and causes compressor failure within one to two DFW summers.</p>
          <ul style={{ color: '#cbd5e0', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>✅ R-410A systems: POE oil only, typically 68–150 viscosity</li>
            <li>❌ Never mix mineral and POE oil — full flush required if mixed</li>
            <li>💧 POE absorbs moisture fast — limit exposure to air during service</li>
            <li>📋 Ask your tech to document oil type and oz added at every service</li>
          </ul>
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>🌡️ Oil and DFW Compressor Longevity</h2>
          <p style={{ color: '#cbd5e0', lineHeight: 1.6 }}>In DFW summers, compressors run at or above rated capacity for months straight. Inadequate or wrong oil shortens compressor life from 15 years to 3–5 years. DFW service calls from compressor failure spike in July and August — most are preventable with proper oil management at every service visit.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🔧 Interactive: HVAC Service Situation → Oil Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
            {situations.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)}
                style={{ background: selected === s.id ? '#F5E642′ : '#1a3a5c', color: selected === s.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px 10px', cursor: 'pointer', fontWeight: 600, fontSize: 13, textAlign: 'left' }}>
                {s.label}
              </button>
            ))}
          </div>
          {match && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642′ }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Oil Guidance:</p>
              <p style={{ color: '#cbd5e0', lineHeight: 1.7 }}>{match.guide}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>Find a Trusted DFW HVAC Tech</p>
          <p style={{ color: '#0A1628', fontSize: 13 }}>ProLnk connects DFW homeowners with HVAC professionals who know refrigerant oil specs. Free quotes.</p>
          <button style={{ marginTop: 12, background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 700, cursor: 'pointer' }}>Get Free Quotes</button>
        </div>
      </div>
    </div>
  );
}