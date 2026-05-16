import { useState } from 'react';

const neighborhoods = [
  { type: 'Historic Downtown (pre-1960)', icon: '🏛️', issues: ['Aging galvanized plumbing', 'Knob-and-tube wiring risk', 'Foundation pier-and-beam settling', 'Single-pane windows, poor insulation', 'Aging HVAC systems 20–40 yrs old'] },
  { type: 'Mid-Century Suburban (1960–1990)', icon: '🏡', issues: ['Polybutylene pipe replacement needed', 'HVAC at end of life (15–25 yrs)', 'Flat or low-slope roof aging', 'Asbestos possible in older insulation', 'Original windows losing seal'] },
  { type: 'New East Side Construction (2000–2026)', icon: '🏗️', issues: ['Foundation still settling (yr 1–7)', 'Builder-grade HVAC needs upgrade', 'HOA exterior compliance', 'Irrigation system calibration', 'Pest control critical in new lots'] },
];

export default function DentonHomeownerGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🎓</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>Denton TX Homeowner Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 560, margin: '0 auto' }}>
            University town meets suburban boom. UNT + TWU drive rental demand while new east-side builds reshape the city. Know your neighborhood's maintenance profile.
          </p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📍 Select Your Neighborhood Type</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {neighborhoods.map((n, i) => (
              <button key={i} onClick={() => setSelected(selected === i ? null : i)}
                style={{ background: selected === i ? '#F5E642' : '#1a2f50', color: selected === i ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '12px 16px', cursor: 'pointer', textAlign: 'left', fontSize: 14, fontWeight: 600 }}>
                {n.icon} {n.type}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 16 }}>
              <h3 style={{ color: '#F5E642', fontSize: 14, marginBottom: 12 }}>Top Maintenance Priorities</h3>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                {neighborhoods[selected].issues.map((issue, j) => (
                  <li key={j} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 6 }}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          {[
            { icon: '🌩️', label: 'Storm Season', desc: 'Apr–Jun hail risk. Inspect roof + gutters annually.' },
            { icon: '🌡️', label: 'Summer Heat', desc: '100°F+ days. HVAC service each March.' },
            { icon: '💧', label: 'Water Quality', desc: 'Denton water hardness can scale pipes over time.' },
            { icon: '🐜', label: 'Pest Control', desc: 'Termite and fire ant risk year-round in Denton.' },
          ].map((card, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{card.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{card.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32 }}>🔗</div>
          <h3 style={{ color: '#0A1628', fontSize: 18, margin: '8px 0 6px' }}>Find Denton's Best Contractors</h3>
          <p style={{ color: '#1a2f50', fontSize: 13, margin: '0 0 14px' }}>ProLnk matches you with verified local pros who know Denton's unique challenges.</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
