import { useState } from 'react';

type FindingLevel = 'critical' | 'manageable';
interface Finding { finding: string; level: FindingLevel; note: string; }

const INSPECTION_FOCUS: Record<string, { critical: string[]; manageable: string[] }> = {
  older: {
    critical: [
      'Foundation movement > 1 inch differential — structural engineer required',
      'Original electrical panel (Federal Pacific or Zinsco) — fire hazard, must replace',
      'Galvanized or polybutylene plumbing — replacement needed before sale or damage occurs',
      'No attic ventilation + insufficient insulation — DFW attics hit 160°F, causes deck rot',
    ],
    manageable: [
      'Minor efflorescence on brick — monitor, caulk, and repoint as needed',
      'HVAC over 12 years old — still functional, budget for replacement in 2-4 years',
      'Single-pane windows — energy inefficient but functional; upgrade as budget allows',
      'Minor wood rot at trim — cosmetic and common in older DFW homes',
    ],
  },
  newer: {
    critical: [
      'Foundation settlement in home under 10 years — may be construction defect',
      'HVAC refrigerant leak — R-410A systems; repair or replace immediately',
      'Improper attic insulation installation — voids energy code compliance',
      'Stucco or EIFS cladding moisture intrusion — expensive remediation required',
    ],
    manageable: [
      'Minor caulking failures at windows/doors — simple maintenance item',
      'Sprinkler heads out of adjustment — $150-400 to service and reset',
      'Garage door opener safety sensor misalignment — $50-100 fix',
      'Fence gate latch failure at pool — safety item, inexpensive repair',
    ],
  },
};

const DFW_FOCUS_AREAS = [
  { icon: '🏗️', area: 'Foundation', desc: 'Crack pattern, door/window alignment, differential elevation measurement' },
  { icon: '🌡️', area: 'HVAC Age', desc: 'DFW heat demands: 15+ year system = replacement conversation' },
  { icon: '🏠', area: 'Attic Insulation', desc: 'R-38 minimum for DFW; check for proper ventilation to prevent deck rot' },
  { icon: '⚡', area: 'Electrical Panel', desc: 'Identify brand (Federal Pacific/Zinsco = red flag); check for GFCI in wet areas' },
  { icon: '🚿', area: 'Plumbing Material', desc: 'Cast iron (pre-1980), galvanized, copper, PVC — age and condition matter' },
  { icon: '🌧️', area: 'Roof Condition', desc: 'Hail damage granule loss, flashing, ridge cap — DFW hail is the #1 roof killer' },
];

export default function DFWHomeInspectionSummaryGuide() {
  const [homeAge, setHomeAge] = useState<string>('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#e2e8f0', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: 40 }}>🔬</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0 0.25rem' }}>DFW Home Inspection Guide</h1>
          <p style={{ color: '#a0aec0', margin: 0 }}>What matters most in a DFW inspection — and what to do about it</p>
        </div>
        <div style={{ background: '#112240', borderRadius: 16, padding: '1.75rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 1rem', fontSize: '1.15rem' }}>🎯 DFW Inspection Focus Areas</h2>
          {DFW_FOCUS_AREAS.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: i < DFW_FOCUS_AREAS.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
              <span style={{ fontSize: 22, minWidth: 30 }}>{f.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem' }}>{f.area}</div>
                <div style={{ color: '#a0aec0', fontSize: '0.875rem', lineHeight: 1.5 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#112240', borderRadius: 16, padding: '1.75rem' }}>
          <h2 style={{ color: '#F5E642', margin: '0 0 0.5rem', fontSize: '1.15rem' }}>🏠 Critical vs. Manageable by Home Age</h2>
          <p style={{ color: '#a0aec0', fontSize: '0.875rem', margin: '0 0 1rem' }}>Select home age to see DFW-specific findings breakdown:</p>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {[['older', '🏚️ Pre-2000'], ['newer', '🏡 2000-Present']].map(([val, label]) => (
              <button key={val} onClick={() => setHomeAge(val)}
                style={{ padding: '0.5rem 1.25rem', borderRadius: 8, border: '2px solid', borderColor: homeAge === val ? '#F5E642′ : '#1e3a5f', background: homeAge === val ? '#F5E642' : ’transparent', color: homeAge === val ? '#0A1628′ : '#e2e8f0', fontWeight: 700, cursor: ’pointer', fontSize: '0.9rem' }}>
                {label}
              </button>
            ))}
          </div>
          {homeAge && (
            <div>
              <div style={{ background: '#3d1515', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
                <div style={{ color: '#fc8181', fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.9rem' }}>🚨 Critical Findings (negotiate or walk)</div>
                {INSPECTION_FOCUS[homeAge].critical.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem 0', fontSize: '0.875rem', color: '#fed7d7′ }}>
                    <span>❌</span><span>{tip}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: '#1a3a1a', borderRadius: 12, padding: '1.25rem' }}>
                <div style={{ color: '#68d391', fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.9rem' }}>✅ Manageable Findings (budget and proceed)</div>
                {INSPECTION_FOCUS[homeAge].manageable.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem 0', fontSize: '0.875rem', color: '#c6f6d5′ }}>
                    <span>⚠️</span><span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
