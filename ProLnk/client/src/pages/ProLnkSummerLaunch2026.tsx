import { useState } from 'react';

const services = [
  { need: '❄️ AC Tune-Up', response: 'ProLnk matches you with a Charter HVAC tech within 1 hour. Pre-summer slots fill fast — book now before the heat wave hits.' },
  { need: '🌬️ New AC Unit', response: 'ProLnk Charter pros give binding quotes within 24 hours. Home Health Vault logs install date, model, and warranty permanently.' },
  { need: '💧 Plumbing Check', response: 'DFW heat strains pipes. ProLnk matches a licensed plumber same-day. Every visit logged in your Home Health Vault.' },
  { need: '🔌 Electrical Inspection', response: 'Summer load spikes trip breakers. ProLnk verified electricians available now. Charter pros prioritize ProLnk homeowners.' },
  { need: '🏠 Roof Inspection', response: 'Before monsoon season — ProLnk connects you to local certified roofers. Full inspection report stored in Home Health Vault.' },
];

export default function ProLnkSummerLaunch2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '0′ }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0d2040 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>☀️</div>
        <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#F5E642', margin: '0 0 12px', lineHeight: 1.1 }}>
          ProLnk Summer 2026
        </h1>
        <p style={{ fontSize: '20px', color: '#a0b4cc', maxWidth: '560px', margin: '0 auto 20px', lineHeight: 1.5 }}>
          DFW temps are climbing. Charter pros are ready. Pre-summer tune-up window is closing fast.
        </p>
        <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', fontWeight: '700', fontSize: '14px', padding: '8px 20px', borderRadius: '999px' }}>
          🔥 Only 500 Charter Pro slots — {Math.floor(Math.random() * 40) + 380} remaining
        </div>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>What does your home need this summer?</h2>
        <p style={{ color: '#7a90a8', marginBottom: '24px', fontSize: '15px' }}>Select a service need to see how ProLnk gets you ready for 2026.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {services.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                background: selected === i ? '#F5E642′ : '#111f35',
                color: selected === i ? '#0A1628′ : '#ffffff',
                border: '1px solid',
                borderColor: selected === i ? '#F5E642′ : '#1e3050',
                borderRadius: '10px',
                padding: '16px 20px',
                fontSize: '15px',
                fontWeight: '600',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {s.need}
              {selected === i && (
                <p style={{ marginTop: '10px', fontWeight: '400', fontSize: '14px', lineHeight: 1.6, color: '#0A1628′ }}>
                  {s.response}
                </p>
              )}
            </button>
          ))}
        </div>

        <div style={{ background: '#111f35', borderRadius: '14px', padding: '28px', textAlign: 'center', border: '1px solid #1e3050′ }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏠</div>
          <h3 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', margin: '0 0 8px' }}>Join the ProLnk Waitlist</h3>
          <p style={{ color: '#7a90a8', fontSize: '14px', margin: '0 0 20px', lineHeight: 1.6 }}>
            Waitlist closes at 500 pro applications + 5,000 homes. Summer 2026 launch in DFW is live.
          </p>
          <a
            href="/homeowner-signup"
            style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', fontWeight: '700', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '16px' }}
          >
            Get ProLnk Ready This Summer →
          </a>
        </div>
      </div>
    </div>
  );
}