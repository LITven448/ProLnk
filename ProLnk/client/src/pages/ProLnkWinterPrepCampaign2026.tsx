import { useState } from 'react';

const prepNeeds = [
  { need: '🚿 Pipe Insulation', process: 'ProLnk matches a licensed DFW plumber to inspect and insulate exposed pipes before the first freeze. Charter pros prioritize ProLnk homeowners — book early or wait weeks.' },
  { need: '🌡️ Heater Tune-Up', process: 'ProLnk Charter HVAC techs perform full heating system inspections. Home Health Vault logs every service visit — heating age, parts replaced, next service window.' },
  { need: '🏠 Attic Insulation', process: 'DFW homes lose 40% of heat through inadequate attic insulation. ProLnk matches certified insulation pros. Quotes within 24 hours, installation within 7 days.' },
  { need: '🔲 Weatherstripping / Sealing', process: 'ProLnk connects to handyman pros who specialize in pre-winter sealing. All Charter pros carry materials. Same-day or next-day availability in most DFW zip codes.' },
  { need: '🔥 Fireplace Inspection', process: 'ProLnk connects to certified chimney sweeps and fireplace techs in DFW. Full safety inspection, cleaning, and creosote check before first use of the season.' },
];

export default function ProLnkWinterPrepCampaign2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [urgency, setUrgency] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0a1520 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>❄️</div>
        <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#F5E642', margin: '0 0 12px', lineHeight: 1.1 }}>
          ProLnk Winter Prep 2026
        </h1>
        <p style={{ fontSize: '20px', color: '#a0b4cc', maxWidth: '560px', margin: '0 auto 20px', lineHeight: 1.5 }}>
          Before the first DFW freeze — ProLnk connects you to plumbers, HVAC techs, and insulation pros before everyone else needs them.
        </p>
        <div style={{ background: '#F5E642', display: 'inline-block', color: '#0A1628', fontWeight: '700', fontSize: '14px', padding: '8px 20px', borderRadius: '999px' }}>
          🕐 Charter pros prioritize ProLnk homeowners — book before the freeze rush
        </div>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>What does your home need before winter?</h2>
        <p style={{ color: '#7a90a8', marginBottom: '24px', fontSize: '15px' }}>Select a prep need to see the ProLnk winter prep match process.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {prepNeeds.map((p, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? '#F5E642' : '#111f35',
                color: selected === i ? '#0A1628' : '#ffffff',
                border: '1px solid',
                borderColor: selected === i ? '#F5E642' : '#1e3050',
                borderRadius: '10px',
                padding: '16px 20px',
                fontSize: '15px',
                fontWeight: '600',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {p.need}
              {selected === i && (
                <p style={{ marginTop: '10px', fontWeight: '400', fontSize: '14px', lineHeight: 1.6, color: '#0A1628' }}>
                  {p.process}
                </p>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => setUrgency(!urgency)}
          style={{ background: 'none', border: '1px solid #1e3050', color: '#F5E642', width: '100%', padding: '14px', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginBottom: '24px' }}
        >
          ⚠️ Why book now vs. waiting? {urgency ? '▲' : '▼'}
        </button>
        {urgency && (
          <div style={{ background: '#111f35', borderRadius: '10px', padding: '20px', marginBottom: '24px', border: '1px solid #1e3050' }}>
            <p style={{ color: '#a0b4cc', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
              In a DFW freeze event, plumbers and HVAC techs get hundreds of calls in 24 hours. Charter pros in ProLnk serve ProLnk homeowners first — not whoever calls the directory. Book your prep now and skip the emergency rates.
            </p>
          </div>
        )}

        <div style={{ background: '#111f35', borderRadius: '14px', padding: '28px', textAlign: 'center', border: '1px solid #1e3050' }}>
          <h3 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', margin: '0 0 8px' }}>Get Winter-Ready with ProLnk</h3>
          <p style={{ color: '#7a90a8', fontSize: '14px', margin: '0 0 20px' }}>Join the ProLnk waitlist — DFW homeowners matched to Charter pros before the freeze rush.</p>
          <a href="/homeowner-signup" style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', fontWeight: '700', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '16px' }}>
            Prep My Home for Winter →
          </a>
        </div>
      </div>
    </div>
  );
}