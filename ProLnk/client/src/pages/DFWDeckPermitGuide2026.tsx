import { useState } from 'react';

const triggers = [
  { label: 'Attached deck (any size)', permit: true, reason: 'All attached structures require a permit — connected to home structure.' },
  { label: 'Detached deck over 30 inches high', permit: true, reason: 'Height above grade triggers permit requirement in most DFW cities.' },
  { label: 'Detached deck over 200 sq ft', permit: true, reason: 'Most DFW cities require permits for detached decks over 200 sq ft.' },
  { label: 'Covered patio / pergola (attached)', permit: true, reason: 'Attached covered structures always require a permit.' },
  { label: 'Freestanding pergola under 200 sq ft', permit: false, reason: 'Most DFW cities exempt small freestanding structures. Verify locally.' },
  { label: 'Ground-level patio (concrete/pavers)', permit: false, reason: 'At-grade concrete or paver patios typically do not require a permit.' },
  { label: 'Deck with electrical / lighting', permit: true, reason: 'Any electrical work requires a separate electrical permit.' },
];

const cities = [
  { name: 'Dallas', timeline: '2-4 weeks', fee: '$100-$300', threshold: '30 inches or attached', notes: 'Dallas requires permit for any deck over 30 inches above grade or attached to the house. Submit site plan + framing details.' },
  { name: 'Fort Worth', timeline: '2-3 weeks', fee: '$75-$250', threshold: '30 inches or attached', notes: 'Fort Worth Building Services. Attached decks always require permit. Detached over 30 inches also requires permit.' },
  { name: 'Plano', timeline: '2-3 weeks', fee: '$75-$200', threshold: '200 sq ft or attached', notes: 'Plano Building Inspections. Permit required for attached decks and detached over 200 sq ft or 30 inches high.' },
  { name: 'Frisco', timeline: '3-4 weeks', fee: '$100-$275', threshold: '30 inches or attached', notes: 'Frisco Building Inspections. HOA approval often needed separately. Permit required for most deck work.' },
  { name: 'McKinney', timeline: '2-3 weeks', fee: '$75-$225', threshold: '30 inches or attached', notes: 'McKinney Community Development. Attached decks and elevated decks require permit. Ground-level patios generally exempt.' },
  { name: 'Allen', timeline: '2-3 weeks', fee: '$75-$200', threshold: '30 inches or attached', notes: 'Allen Building Department. Similar rules to surrounding cities. Submit framing plan and site plan.' },
];

export default function DFWDeckPermitGuide2026() {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const city = cities.find(c => c.name === selectedCity);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🪵</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>DFW Deck & Patio Permit Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>When decks and patios need permits across DFW — and what it takes</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12, fontSize: 14 }}>🔍 DOES YOUR PROJECT NEED A PERMIT?</p>
          <div style={{ display: 'grid', gap: 8 }}>
            {triggers.map(t => (
              <div key={t.label} style={{ background: '#1a2f50', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{t.permit ? '🔴' : '🟢'}</span>
                <div>
                  <p style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 600, margin: 0 }}>{t.label}</p>
                  <p style={{ color: '#64748b', fontSize: 12, margin: '2px 0 0′ }}>{t.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Get city-specific requirements:</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 8 }}>
            {cities.map(c => (
              <button key={c.name} onClick={() => setSelectedCity(c.name)}
                style={{ background: selectedCity === c.name ? '#F5E642′ : '#1a2f50', color: selectedCity === c.name ? '#0A1628' : '#fff', border: '1px solid #2a4070', borderRadius: 8, padding: '10px 8px', cursor: ’pointer', fontWeight: 600, fontSize: 13 }}>
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {city && (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 800, marginBottom: 16 }}>🪵 {city.name} — Deck Permit Details</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>PERMIT TRIGGER</p>
                <p style={{ color: '#fbbf24', fontWeight: 700 }}>⚡ {city.threshold}</p>
              </div>
              <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>NOTES</p>
                <p style={{ color: '#e2e8f0', fontSize: 14 }}>{city.notes}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                  <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>TIMELINE</p>
                  <p style={{ color: '#F5E642', fontWeight: 700 }}>📅 {city.timeline}</p>
                </div>
                <div style={{ background: '#1a2f50', borderRadius: 8, padding: 14 }}>
                  <p style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>PERMIT FEE</p>
                  <p style={{ color: '#F5E642', fontWeight: 700 }}>💰 {city.fee}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: 'center', color: '#475569', fontSize: 13 }}>
          <p>ProLnk connects DFW homeowners with licensed deck contractors who handle permits and inspections.</p>
        </div>
      </div>
    </div>
  );
}