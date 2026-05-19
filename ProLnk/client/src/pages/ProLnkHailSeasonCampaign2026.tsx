import { useState } from 'react';

const damageTypes = [
  { damage: '🏠 Roof Damage', response: 'ProLnk connects you to a verified local roofer within 2 hours — not a storm chaser. Full inspection, photo documentation, and insurance report included. Stored in Home Health Vault.' },
  { damage: '🪟 Broken Windows', response: 'ProLnk Charter glaziers are licensed and carry common residential glass sizes. Same-day boarding and repair in DFW. Insurance documentation prepared on-site.' },
  { damage: '🚗 Gutters Damaged', response: 'ProLnk connects to local gutter contractors who specialize in hail repairs. Full gutter inspection included. Job logged in Home Health Vault for your insurance claim.' },
  { damage: '🌳 Tree / Fence Damage', response: 'ProLnk matches arborists and fence contractors in your DFW zip. Emergency response available. All pros carry liability insurance — no out-of-pocket risk.' },
  { damage: '💨 Siding Damage', response: 'ProLnk Charter siding contractors respond within 24 hours. Matching hail-resistant materials sourced locally. Insurance adjuster coordination available.' },
];

export default function ProLnkHailSeasonCampaign2026() {
  const [selected, setSelected] = useState<number | null>(null);
  const [chasersVisible, setChasersVisible] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #0e1520 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>⛈️</div>
        <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#F5E642', margin: '0 0 12px', lineHeight: 1.1 }}>
          ProLnk Hail Season 2026
        </h1>
        <p style={{ fontSize: '20px', color: '#a0b4cc', maxWidth: '560px', margin: '0 auto 20px', lineHeight: 1.5 }}>
          Hail struck your DFW neighborhood? ProLnk has verified local roofers — no storm chasers, all licensed and insured.
        </p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: '700', fontSize: '13px', padding: '7px 16px', borderRadius: '999px' }}>🚫 No Storm Chasers</div>
          <div style={{ background: '#1e3050', color: '#a0b4cc', fontWeight: '600', fontSize: '13px', padding: '7px 16px', borderRadius: '999px' }}>📋 Insurance Docs Ready</div>
        </div>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 24px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#F5E642', marginBottom: '8px' }}>What damage did you sustain?</h2>
        <p style={{ color: '#7a90a8', marginBottom: '24px', fontSize: '15px' }}>Select a damage type to see the ProLnk storm response process.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {damageTypes.map((d, i) => (
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
              {d.damage}
              {selected === i && (
                <p style={{ marginTop: '10px', fontWeight: '400', fontSize: '14px', lineHeight: 1.6, color: '#0A1628' }}>
                  {d.response}
                </p>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => setChasersVisible(!chasersVisible)}
          style={{ background: 'none', border: '1px solid #1e3050', color: '#F5E642', width: '100%', padding: '14px', borderRadius: '10px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', marginBottom: '24px' }}
        >
          🚫 Why ProLnk vs. a Storm Chaser? {chasersVisible ? '▲' : '▼'}
        </button>
        {chasersVisible && (
          <div style={{ background: '#111f35', borderRadius: '10px', padding: '20px', marginBottom: '24px', border: '1px solid #1e3050' }}>
            <p style={{ color: '#a0b4cc', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>
              Storm chasers arrive after disasters, use pressure sales, and disappear before warranty work. ProLnk Charter pros are DFW-local, license-verified, and available year-round. If something goes wrong, they're still here.
            </p>
          </div>
        )}

        <div style={{ background: '#111f35', borderRadius: '14px', padding: '28px', textAlign: 'center', border: '1px solid #1e3050' }}>
          <h3 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', margin: '0 0 8px' }}>Get a Verified Local Roofer Now</h3>
          <p style={{ color: '#7a90a8', fontSize: '14px', margin: '0 0 20px' }}>Join ProLnk — matched to a Charter pro in your DFW zip within 2 hours.</p>
          <a href="/homeowner-signup" style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', fontWeight: '700', padding: '14px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '16px' }}>
            Get Storm Response Help →
          </a>
        </div>
      </div>
    </div>
  );
}