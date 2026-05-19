import { useState } from 'react';

const vintages = [
  {
    id: 'pre1960',
    label: 'Pre-1960 (Historic DFW)',
    emoji: '🏛️',
    issues: ['Knob-and-tube wiring (fire hazard, uninsurable)', 'Galvanized steel pipes (rust, low pressure)', 'Single-pane windows (no insulation value)', 'Asbestos in floor tiles, insulation, siding', 'Lead paint on all surfaces (pre-1978)', 'No central HVAC (window units or radiators)', 'Original plaster walls (brittle, hard to patch)', 'Undersized electrical (60–100 amp)'],
    budget: '25–40%',
    budgetNote: 'of purchase price for full systems update',
    charm: ['Solid old-growth lumber framing', 'Unique architectural details (transoms, built-ins)', 'Established mature trees and landscaping', 'Walkable urban neighborhoods (Bishop Arts, Lower Greenville)', 'Potential historic tax credits'],
    negotiate: ['Full electrical rewire ($15K–$30K)', 'Full repipe ($8K–$18K)', 'HVAC installation ($6K–$12K)', 'Asbestos abatement ($3K–$15K)', 'Window replacement ($8K–$20K)'],
  },
  {
    id: '1960_1980',
    label: '1960–1980 (Suburban Boom)',
    emoji: '🏘️',
    issues: ['Polybutylene pipes (fail without warning, uninsurable)', 'Federal Pacific / Zinsco panels (fire hazard, recall)', 'Single-pane aluminum windows', 'Original HVAC at end of life (ductwork leaks)', 'Asbestos possible in insulation + floor tile (pre-1980)', 'Lead paint possible (pre-1978)', 'Original water heater infrastructure', 'Minimal insulation by modern standards'],
    budget: '15–25%',
    budgetNote: 'of purchase price for systems update',
    charm: ['Larger lots than modern builds', 'Established neighborhoods with mature trees', 'Higher ceilings than many 1990s tract homes', 'Often close to now-established amenities'],
    negotiate: ['Panel replacement if FPE/Zinsco ($2.5K–$5K)', 'Full repipe if polybutylene ($6K–$14K)', 'New HVAC system ($5K–$12K)', 'Insulation upgrade ($2K–$5K)'],
  },
  {
    id: '1980_2000',
    label: '1980–2000 (Modern Suburb)',
    emoji: '🏡',
    issues: ['Original HVAC (if not replaced, 25–40 yrs old)', 'Single-pane windows in early builds', 'Original water heaters (15–25 yrs past life)', 'Builder-grade electrical panels', 'Original roof approaching end of life', 'Polybutylene possible in early 1980s builds', 'Original builder carpet / flooring'],
    budget: '8–15%',
    budgetNote: 'of purchase price for deferred maintenance catch-up',
    charm: ['Modern layouts (open floor plans emerged)', 'Generally code-compliant construction', 'Larger square footage for price vs. newer builds', 'Established schools and infrastructure'],
    negotiate: ['HVAC replacement if original ($5K–$12K)', 'Roof replacement if aging ($10K–$22K)', 'Water heater replacement ($800–$2K)', 'Window upgrades if single-pane ($5K–$12K)'],
  },
];

export default function DFWOldHomeGuide() {
  const [selected, setSelected] = useState('');
  const vintage = vintages.find(v => v.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏛️🔧</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Buying an Old Home in DFW</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>What to expect by decade — common issues, renovation budgets, and negotiation priorities.</p>
        </div>

        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 14 }}>Select your home's vintage:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 32 }}>
          {vintages.map(v => (
            <button key={v.id} onClick={() => setSelected(v.id)}
              style={{ background: selected === v.id ? '#1E3A5F' : '#0F2236', border: `2px solid ${selected === v.id ? '#F5E642' : '#1E3A5F'}`, borderRadius: 10, padding: '16px 12px', color: '#E8F0FE', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{v.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: selected === v.id ? '#F5E642′ : '#CBD5E1' }}>{v.label}</div>
            </button>
          ))}
        </div>

        {vintage && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div style={{ background: '#450A0A', border: '1px solid #DC2626', borderRadius: 10, padding: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#FCA5A5', marginBottom: 12 }}>⚠️ Common Issues</h3>
                {vintage.issues.map((issue, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
                    <span style={{ color: '#F87171', fontSize: 12, minWidth: 16 }}>•</span>
                    <span style={{ fontSize: 12, color: '#FED7D7′ }}>{issue}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#052E16', border: '1px solid #16A34A', borderRadius: 10, padding: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#86EFAC', marginBottom: 12 }}>✨ The Charm</h3>
                {vintage.charm.map((c, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
                    <span style={{ color: '#4ADE80', fontSize: 12, minWidth: 16 }}>•</span>
                    <span style={{ fontSize: 12, color: '#BBF7D0′ }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: '#1E3A5F', borderRadius: 10, padding: 20, marginBottom: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Renovation Budget Guideline</div>
              <div style={{ fontSize: 42, fontWeight: 900, color: '#F5E642′ }}>{vintage.budget}</div>
              <div style={{ fontSize: 13, color: '#94A3B8′ }}>{vintage.budgetNote}</div>
            </div>

            <div style={{ background: '#0F2236', border: '1px solid #1E3A5F', borderRadius: 10, padding: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🤝 Negotiate These at Purchase</h3>
              <div style={{ display: 'grid', gap: 8 }}>
                {vintage.negotiate.map((n, i) => (
                  <div key={i} style={{ background: '#1E3A5F', borderRadius: 6, padding: '8px 12px', fontSize: 13, color: '#CBD5E1′ }}>
                    <span style={{ color: '#F5E642', marginRight: 8 }}>→</span>{n}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!selected && (
          <div style={{ textAlign: 'center', padding: 48, color: '#475569′ }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏛️</div>
            <p>Select your home's vintage above to see what you’re getting into.</p>
          </div>
        )}
      </div>
    </div>
  );
}
