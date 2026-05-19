import { useState } from 'react';

const concerns = [
  { concern: '❄️ AC Not Cooling', process: 'ProLnk matches a Charter HVAC tech within 1 hour. Verified, licensed, and insured in DFW. Charter pros respond faster than any other channel.' },
  { concern: '💨 Weak Airflow', process: 'Could be ducts, filters, or blower motor. ProLnk tech diagnoses on-site. Full service record logged permanently in Home Health Vault.' },
  { concern: '💧 AC Leaking Water', process: 'Likely a clogged drain line or refrigerant issue. ProLnk gets a licensed tech to you same day. No storm chasers — all local, all verified.' },
  { concern: '🔊 Strange AC Noise', process: 'Bearing, belt, or refrigerant warning. ProLnk Charter HVAC pros carry common parts. First-visit resolution rate over 80%.' },
  { concern: '🌡️ Pre-Season Tune-Up', process: 'Book now before demand spikes. ProLnk matches a Charter tech for a full tune-up. Home Health Vault stores your service history for resale value.' },
];

export default function ProLnkHVACSeasonCampaign2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [showVault, setShowVault] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0a1e2e 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>🌡️</div>
        <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#F5E642', margin: '0 0 12px', lineHeight: 1.1 }}>
          ProLnk HVAC Season 2026
        </h1>
        <p style={{ fontSize: '20px', color: '#a0b4cc', maxWidth: '560px', margin: '0 auto 20px', lineHeight: 1.5 }}>
          It's AC season in DFW. ProLnk verified HVAC techs respond in under 1 hour. No storm chasers. All licensed.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: '700', fontSize: '13px', padding: '7px 16px', borderRadius: '999px' }}>⚡ Under 1-Hour Response</div>
          <div style={{ background: '#1e3050', color: '#a0b4cc', fontWeight: '600', fontSize: '13px', padding: '7px 16px', borderRadius: '999px' }}>✅ License Verified</div>
        </div>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>What's your HVAC concern?</h2>
        <p style={{ color: '#7a90a8', marginBottom: '24px', fontSize: '15px' }}>Select an issue to see the ProLnk HVAC matching process.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {concerns.map((c, i) => (
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
              {c.concern}
              {selected === i && (
                <p style={{ marginTop: '10px', fontWeight: '400', fontSize: '14px', lineHeight: 1.6, color: '#0A1628′ }}>
                  {c.process}
                </p>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowVault(!showVault)}
          style={{ background: 'none', border: '1px solid #1e3050', color: '#F5E642', width: '100%', padding: '14px', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginBottom: '32px' }}
        >
          🏦 What is Home Health Vault? {showVault ? '▲' : '▼'}
        </button>
        {showVault && (
          <div style={{ background: '#111f35', borderRadius: '10px', padding: '20px', marginBottom: '32px', border: '1px solid #1e3050′ }}>
            <p style={{ color: '#a0b4cc', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
              Every ProLnk service visit is permanently logged in your Home Health Vault — HVAC model, service date, tech, parts used, and next service window. Accessible to you, adds verifiable value to your home.
            </p>
          </div>
        )}

        <div style={{ background: '#111f35', borderRadius: '14px', padding: '28px', textAlign: 'center', border: '1px solid #1e3050′ }}>
          <h3 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', margin: '0 0 8px' }}>Get Matched to a Charter HVAC Tech</h3>
          <p style={{ color: '#7a90a8', fontSize: '14px', margin: '0 0 20px' }}>DFW homeowners — join ProLnk now before the peak season backlog.</p>
          <a href="/homeowner-signup" style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', fontWeight: '700', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '16px' }}>
            Get HVAC Help Now →
          </a>
        </div>
      </div>
    </div>
  );
}