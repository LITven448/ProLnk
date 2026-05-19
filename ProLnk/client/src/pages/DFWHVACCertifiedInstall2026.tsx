import { useState } from 'react';

const concerns = [
  { id: 'sizing', label: 'Wrong size unit', guide: 'Manual J load calculation required — room-by-room heat gain/loss, not square footage rule of thumb. DFW design day: 100°F outdoor, 75°F indoor. Oversized units short-cycle and leave humidity high. Undersized units run constantly and fail early.' },
  { id: 'ductwork', label: 'Ductwork concerns', guide: 'Manual D duct design required. DFW attics hit 140°F — all duct joints sealed with mastic (not tape), R-8 insulation minimum. Poorly designed duct systems lose 20-30% of conditioned air before reaching rooms.' },
  { id: 'refrigerant', label: 'Refrigerant charge', guide: 'Charge by weight per manufacturer spec or verify with superheat/subcooling method — not by "feels cold" test. DFW summer heat affects readings; use manifold gauges at outdoor temps above 65°F. Overcharge damages compressor.' },
  { id: 'certification', label: 'Installer credentials', guide: 'ACCA-certified or manufacturer-trained installer preferred. EPA 608 certification required to handle refrigerant. Ask for NATE certification — it covers installation competency specifically for HVAC systems.' },
  { id: 'startup', label: 'Startup documentation', guide: 'Proper startup includes: equipment serial numbers recorded, refrigerant amount logged, static pressure test, temperature differential confirmed 15-20°F, condensate drain flushed and tested, thermostat calibrated and programmed.' },
  { id: 'permit', label: 'Permit and inspection', guide: 'DFW cities require mechanical permit for new HVAC installs. City inspector verifies electrical connections, refrigerant handling, and duct sealing. No permit = warranty risk and resale issue. ProLnk pros pull permits before work begins.' },
];

export default function DFWHVACCertifiedInstall2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = concerns.find(c => c.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', letterSpacing: '1px', textTransform: 'uppercase' }}>ProLnk DFW Guide · HVAC</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>DFW HVAC Certified Installation Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '32px' }}>What a proper HVAC installation looks like in the Dallas-Fort Worth climate. Select an installation concern below.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px', marginBottom: '28px' }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => setSelected(selected === c.id ? null : c.id)}
              style={{ padding: '14px 16px', borderRadius: '10px', border: '2px solid', borderColor: selected === c.id ? '#F5E642′ : '#1e3a5f', backgroundColor: selected === c.id ? '#F5E64220' : '#0d1f3c', color: '#ffffff', cursor: ’pointer', textAlign: 'left', fontSize: '14px', fontWeight: 600, transition: 'all 0.2s' }}>
              🔧 {c.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ backgroundColor: '#0d1f3c', border: '2px solid #F5E642', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
            <div style={{ fontSize: '13px', color: '#F5E642', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Installation Guide</div>
            <h2 style={{ fontSize: '18px', marginBottom: '12px' }}>🔧 {active.label}</h2>
            <p style={{ color: '#cbd5e1', lineHeight: '1.7', fontSize: '15px' }}>{active.guide}</p>
          </div>
        )}

        <div style={{ backgroundColor: '#0d1f3c', borderRadius: '12px', padding: '24px', marginBottom: '28px' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px', color: '#F5E642′ }}>⚙️ How ProLnk Verifies Installation Quality</h2>
          {['All matched HVAC pros hold active EPA 608 certification', 'Pros must upload startup documentation to close the job', 'Homeowners rate installation quality — low scores trigger review', 'ProLnk requires permit number before final job payment releases', 'Manual J sizing required for units over 3 tons — verified on file'].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
              <span style={{ color: '#F5E642', marginTop: '2px' }}>✅</span>
              <span style={{ color: '#cbd5e1', fontSize: '14px' }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: '24px', backgroundColor: '#0d1f3c', borderRadius: '12px', border: '1px solid #1e3a5f' }}>
          <div style={{ fontSize: '22px', marginBottom: '8px' }}>🌡️</div>
          <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>Need a certified HVAC installer in DFW?</div>
          <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '16px' }}>ProLnk matches DFW homeowners with verified, permit-pulling HVAC pros.</div>
          <a href="/" style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>Get Matched Free →</a>
        </div>
      </div>
    </div>
  );
}
