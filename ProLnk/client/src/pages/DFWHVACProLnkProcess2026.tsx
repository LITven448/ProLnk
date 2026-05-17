import { useState } from 'react';

const urgencies = [
  { label: 'Emergency — No cooling in summer heat', icon: '🔥', steps: ['Submit request with "No AC" — ProLnk flags as Priority 1', 'AI routes to on-call Charter HVAC Pros within your ZIP', 'First available tech accepts and contacts you within 60 min', 'Tech arrives with common parts — R-410A, capacitors, contactors', 'Repair documented in your Home Health Vault'], note: 'DFW summer emergencies are dispatched same-day. Charter Pros carry 24/7 emergency availability as a requirement.' },
  { label: 'Urgent — System running but not cooling well', icon: '🌡️', steps: ['Submit request describing symptoms (short-cycling, warm air, etc.)', 'ProLnk AI assesses — likely refrigerant, coil, or airflow issue', 'Charter Pros notified — typically 2–4 hour response window', 'Tech performs diagnostics and provides written quote on-site', 'Repair or replacement recommendation documented in Vault'], note: 'Most DFW efficiency issues are resolved same-day or next morning with a Charter Pro diagnostic visit.' },
  { label: 'Planned — Annual tune-up or pre-season check', icon: '🔧', steps: ['Submit request: "Annual maintenance" or "Pre-summer tune-up"', 'ProLnk matches to Charter Pros with open scheduling slots', 'Book a 2-hour window at your convenience', 'Tech cleans coils, checks refrigerant, inspects electrical', 'Full report added to Home Health Vault'], note: 'Annual maintenance extends system life 3–5 years and keeps DFW utility bills in check. Best booked March–April before peak demand.' },
  { label: 'Replacement — System over 12 years old', icon: '♻️', steps: ['Submit request: "System replacement evaluation"', 'ProLnk routes to Charter Pros certified in Manual J calculations', 'Tech performs load calc — no guessing on system size', 'You receive 3 quotes: standard, high-efficiency, premium options', 'Selection, install, and permit documented in Home Health Vault'], note: 'DFW systems average 12–15 year lifespan due to heat load. Charter Pros are licensed TDLR and EPA 608 certified for all refrigerant handling.' },
];

export default function DFWHVACProLnkProcess2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>PROLNK HVAC PROCESS 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>How ProLnk Matches You to DFW HVAC Pros</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 36 }}>No directory scrolling. No contractor roulette. ProLnk routes your HVAC request to vetted Charter Pros based on urgency, location, and availability. Select your situation below.</p>

        <div style={{ display: 'grid', gap: 14, marginBottom: 32 }}>
          {urgencies.map((u, i) => (
            <button key={i} onClick={() => setSelected(selected === i ? null : i)}
              style={{ background: selected === i ? '#1e3a5f' : '#111e33', border: `2px solid ${selected === i ? '#F5E642' : '#1e2d45'}`, borderRadius: 12, padding: '18px 22px', textAlign: 'left', cursor: 'pointer', color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 28 }}>{u.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{u.label}</div>
                </div>
                <span style={{ color: '#F5E642', fontSize: 20 }}>{selected === i ? '▲' : '▼'}</span>
              </div>
              {selected === i && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #1e3a5f' }}>
                  <ol style={{ paddingLeft: 20, color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, marginBottom: 14 }}>
                    {u.steps.map((step, j) => <li key={j}>{step}</li>)}
                  </ol>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, color: '#94a3b8', fontSize: 13 }}>💡 {u.note}</div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ background: '#111e33', border: '1px solid #1e2d45', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ CHARTER PRO REQUIREMENTS</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Every HVAC Charter Pro on ProLnk is TDLR licensed, EPA 608 certified, carries $1M liability insurance, and has verified DFW service history. No unlicensed subs. No storm-chaser HVAC crews. Work documented permanently in your Home Health Vault.
          </p>
        </div>

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>🔗 Submit your HVAC request at prolnk.io</div>
          <div style={{ color: '#64748b', fontSize: 13 }}>ProLnk — Charter Pro Network — DFW</div>
        </div>
      </div>
    </div>
  );
}