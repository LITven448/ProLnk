import { useState } from 'react';

const locations = [
  {
    id: 'window-interior',
    label: 'Window Interior (inside surface)',
    cause: 'Usually normal when exterior temp is cold. Excessive condensation may indicate oversized HVAC (short cycling = poor dehumidification) or air sealing issues.',
    severity: 'Low–Medium',
    action: 'Check HVAC sizing. Improve weatherstripping. Run exhaust fans during showers and cooking.',
  },
  {
    id: 'window-exterior',
    label: 'Window Exterior (outside surface)',
    cause: 'Normal dew formation on hot mornings. Not a problem.',
    severity: 'None',
    action: 'No action needed. This is the window performing correctly.',
  },
  {
    id: 'attic',
    label: 'Attic Surfaces or Rafters',
    cause: 'Warm moist air infiltrating cold attic — serious mold risk. Usually caused by poor attic insulation, missing vapor barrier, or inadequate ventilation.',
    severity: 'High',
    action: 'Schedule attic inspection immediately. Improve soffit and ridge ventilation. Seal attic floor penetrations.',
  },
  {
    id: 'hvac-drip',
    label: 'HVAC Unit / Air Handler Dripping',
    cause: 'Some drainage is normal. Excessive dripping indicates clogged condensate drain line or refrigerant issue.',
    severity: 'Medium',
    action: 'Clear condensate drain line ($100–200). If dripping continues, have refrigerant levels checked.',
  },
  {
    id: 'crawlspace',
    label: 'Crawl Space / Under House',
    cause: 'Ground moisture evaporating upward. No vapor barrier or inadequate coverage.',
    severity: 'High',
    action: 'Install 6-mil polyethylene vapor barrier covering full ground area. Ensure crawl space vents are open.',
  },
  {
    id: 'ceiling',
    label: 'Ceiling Spots or Stains',
    cause: 'Active roof leak or past leak with residual staining. Always investigate — staining alone means water was present.',
    severity: 'High',
    action: 'Inspect attic above the spot for daylight or active wet areas. Schedule roof inspection if in doubt.',
  },
];

export default function CondensationMoistureGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = locations.find(l => l.id === selected);

  return (
    <div style={{ background: '#0f1117', minHeight: '100vh', color: '#e8e8e8', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>💧</span>
          <span style={{ fontSize: 13, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 2 }}>HomeOwner Guide</span>
        </div>

        <h1 style={{ fontSize: 36, fontWeight: 700, color: '#ffffff', lineHeight: 1.2, marginBottom: 16 }}>
          DFW Condensation & Moisture Guide
        </h1>
        <p style={{ fontSize: 18, color: '#9ca3af', marginBottom: 48, lineHeight: 1.6 }}>
          When Wet Windows Mean Trouble
        </p>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#ffffff', marginBottom: 16 }}>🌡️ DFW Humidity Context</h2>
          <div style={{ background: '#1a1d27', borderRadius: 12, padding: 28, border: '1px solid #2a2d3a' }}>
            <p style={{ color: '#d1d5db', lineHeight: 1.8, marginBottom: 12 }}>
              DFW swings from <strong style={{ color: '#60a5fa' }}>15% humidity in winter dry spells</strong> to <strong style={{ color: '#60a5fa' }}>85%+ during spring and early summer</strong>. This creates condensation patterns that confuse even experienced homeowners.
            </p>
            <p style={{ color: '#d1d5db', lineHeight: 1.8 }}>
              The same home can have bone-dry air in January and feel like a rainforest in April. Understanding which condensation is normal — and which signals a problem — is one of the most valuable things a DFW homeowner can know.
            </p>
          </div>
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#ffffff', marginBottom: 20 }}>🔍 Quick Diagnosis: Where Is the Moisture?</h2>
          <p style={{ color: '#9ca3af', marginBottom: 20 }}>Select your condensation location for likely cause and recommended action:</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12, marginBottom: 28 }}>
            {locations.map(loc => (
              <button
                key={loc.id}
                onClick={() => setSelected(loc.id)}
                style={{
                  background: selected === loc.id ? '#1e3a5f' : '#1a1d27',
                  border: selected === loc.id ? '1px solid #3b82f6′ : '1px solid #2a2d3a',
                  borderRadius: 10,
                  padding: '14px 18px',
                  color: selected === loc.id ? '#93c5fd' : '#d1d5db',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
              >
                {loc.label}
              </button>
            ))}
          </div>

          {result && (
            <div style={{
              background: '#111827',
              border: `1px solid ${result.severity === 'High' ? '#ef4444' : result.severity === 'Medium' ? '#f59e0b' : result.severity === 'None' ? '#22c55e' : '#3b82f6'}`,
              borderRadius: 12,
              padding: 28,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 20 }}>
                  {result.severity === 'High' ? '🔴' : result.severity === 'Medium' ? '🟡' : result.severity === 'None' ? '🟢' : '🔵'}
                </span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 1 }}>
                  Severity: {result.severity}
                </span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#ffffff', marginBottom: 12 }}>{result.label}</h3>
              <p style={{ color: '#d1d5db', lineHeight: 1.7, marginBottom: 16 }}><strong style={{ color: '#9ca3af' }}>Likely Cause:</strong> {result.cause}</p>
              <div style={{ background: '#1a1d27', borderRadius: 8, padding: 16 }}>
                <p style={{ color: '#60a5fa', fontWeight: 600, marginBottom: 6 }}>Recommended Action:</p>
                <p style={{ color: '#d1d5db', lineHeight: 1.7 }}>{result.action}</p>
              </div>
            </div>
          )}
        </section>

        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, color: '#ffffff', marginBottom: 20 }}>🛡️ Prevention Strategies</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {[
              { icon: '🏠', title: 'Proper Ventilation', desc: 'Ensure kitchen and bath fans exhaust outside, not into attic. Run them during and 20 min after use.' },
              { icon: '❄️', title: 'HVAC Sizing', desc: 'Oversized units cool fast but don’t run long enough to dehumidify. A Manual J load calc ensures correct sizing.' },
              { icon: '🧱', title: 'Vapor Barriers', desc: 'Crawl spaces and unfinished basements need 6-mil poly sheeting covering 100% of ground surface.' },
              { icon: '📉', title: 'Dehumidifiers', desc: 'Standalone units in basements and crawlspaces reduce moisture load. Target 45–55% relative humidity indoors.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#1a1d27', borderRadius: 10, padding: 22, border: '1px solid #2a2d3a' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#ffffff', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #0f2544)', borderRadius: 16, padding: 36, textAlign: 'center', border: '1px solid #3b82f6′ }}>
            <span style={{ fontSize: 36 }}>🤖</span>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#ffffff', margin: '16px 0 12px' }}>TrustyPro AI Detects Moisture Staining</h2>
            <p style={{ color: '#93c5fd', lineHeight: 1.7, marginBottom: 24, maxWidth: 540, margin: '0 auto 24px' }}>
              Our AI visual analysis can identify moisture staining, water damage patterns, and potential condensation problems — even in areas you might miss during a walkthrough.
            </p>
            <a
              href="/waitlist/homeowner"
              style={{
                display: 'inline-block',
                background: '#3b82f6',
                color: '#ffffff',
                padding: '14px 32px',
                borderRadius: 8,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              Get a Free AI Home Scan →
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
