import { useState } from 'react';

type Project = {
  id: string;
  label: string;
  dallas: string;
  frisco: string;
  plano: string;
  mckinney: string;
};

const PROJECTS: Project[] = [
  { id: 'structural', label: 'Removing/Adding Load-Bearing Wall', dallas: 'Required', frisco: 'Required', plano: 'Required', mckinney: 'Required' },
  { id: 'electrical', label: 'New Electrical Circuit / Panel Work', dallas: 'Required', frisco: 'Required', plano: 'Required', mckinney: 'Required' },
  { id: 'plumbing', label: 'New Plumbing Lines / Relocation', dallas: 'Required', frisco: 'Required', plano: 'Required', mckinney: 'Required' },
  { id: 'hvac', label: 'HVAC Equipment / Duct Relocation', dallas: 'Required', frisco: 'Required', plano: 'Required', mckinney: 'Required' },
  { id: 'addition', label: 'Home Addition (any sq ft increase)', dallas: 'Required', frisco: 'Required', plano: 'Required', mckinney: 'Required' },
  { id: 'roof', label: 'Roof Replacement', dallas: 'Required', frisco: 'Required', plano: 'Not Required', mckinney: 'Not Required' },
  { id: 'deck', label: 'Deck / Pergola', dallas: 'Required', frisco: 'Required', plano: 'Required', mckinney: 'Required' },
  { id: 'pool', label: 'In-Ground Pool', dallas: 'Required', frisco: 'Required', plano: 'Required', mckinney: 'Required' },
  { id: 'fence', label: 'Fence Over 6 Feet', dallas: 'Required', frisco: 'Required', plano: 'Verify', mckinney: 'Verify' },
  { id: 'paint', label: 'Interior Paint / Flooring / Countertops', dallas: 'Not Required', frisco: 'Not Required', plano: 'Not Required', mckinney: 'Not Required' },
  { id: 'cabinets', label: 'Cabinet Replacement (same footprint)', dallas: 'Not Required', frisco: 'Not Required', plano: 'Not Required', mckinney: 'Not Required' },
  { id: 'insulation', label: 'Insulation (most cases)', dallas: 'Not Required', frisco: 'Not Required', plano: 'Not Required', mckinney: 'Not Required' },
  { id: 'landscape', label: 'Landscaping (no retaining wall)', dallas: 'Not Required', frisco: 'Not Required', plano: 'Not Required', mckinney: 'Not Required' },
];

export default function DFWRemodelingPermitsGuide() {
  const [selected, setSelected] = useState<string | null>(null);

  const project = PROJECTS.find(p => p.id === selected);

  function statusColor(s: string) {
    if (s === 'Required') return { bg: '#450a0a', color: '#fca5a5′ };
    if (s === 'Not Required') return { bg: '#0f2d1a', color: '#86efac' };
    return { bg: '#422006', color: '#fdba74′ };
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          TrustyPro — DFW Homeowner Intelligence
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, lineHeight: 1.15, margin: '0 0 16px' }}>
          DFW Remodeling Permits
        </h1>
        <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 620, lineHeight: 1.7, margin: '0 0 48px' }}>
          What Requires a Permit — and What Doesn't
        </p>

        {/* Key rule */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 28, marginBottom: 32, borderLeft: '4px solid #f59e0b' }}>
          <div style={{ fontWeight: 700, color: '#fbbf24', marginBottom: 8 }}>⚠️ The Key Rule</div>
          <p style={{ margin: 0, color: '#e2e8f0', lineHeight: 1.7, fontStyle: 'italic', fontSize: 16 }}>
            "When in doubt, pull a permit. Unpermitted work can void your homeowners insurance, create liability, and become a deal-killer when you sell."
          </p>
        </div>

        {/* Requires permit */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px', color: '#f87171′ }}>🔴 Typically Requires a Permit</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
            {[
              'Structural changes (removing/adding walls)',
              'Electrical work (new circuits, panel upgrades)',
              'Plumbing (new lines, moving existing)',
              'HVAC (new equipment, moving ducts)',
              'Any addition (increase in living area)',
              'Fences over 6 feet in many cities',
              'Decks and pergolas',
              'In-ground pools',
            ].map(item => (
              <div key={item} style={{ background: '#450a0a', borderRadius: 8, padding: '10px 14px', color: '#fca5a5', fontSize: 14, lineHeight: 1.5 }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* No permit needed */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px', color: '#4ade80′ }}>🟢 Usually No Permit Required</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
            {[
              'Paint, flooring, countertops, light fixtures',
              'Landscaping (except large retaining walls)',
              'Cabinet replacement (same footprint, no plumbing move)',
              'Insulation (in most DFW cities)',
              'Roof replacement (varies — Dallas/Frisco require it)',
            ].map(item => (
              <div key={item} style={{ background: '#0f2d1a', borderRadius: 8, padding: '10px 14px', color: '#86efac', fontSize: 14, lineHeight: 1.5 }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Permit offices */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 20px', color: '#f1f5f9′ }}>🏛️ DFW City Permit Offices</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { city: 'Dallas', url: 'dallaspermit.org' },
              { city: 'Frisco', url: 'cityoffrisco.net → Development Services' },
              { city: 'Plano', url: 'plano.gov/buildingpermits' },
              { city: 'McKinney', url: 'mckinneytexas.org/permits' },
            ].map(c => (
              <div key={c.city} style={{ background: '#0f172a', borderRadius: 10, padding: 16 }}>
                <div style={{ fontWeight: 700, color: '#818cf8', marginBottom: 6 }}>{c.city}</div>
                <div style={{ color: '#64748b', fontSize: 13 }}>{c.url}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost of unpermitted */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px', color: '#f87171′ }}>💸 Cost of Skipping a Permit</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              'May require demolition for after-the-fact inspection access',
              'Typical fine: $500–$5,000 per violation',
              'Insurance claim denial if work caused damage',
              'Disclosure obligation when selling — can kill deals',
              'Lender may require permits before funding refinance',
            ].map(risk => (
              <div key={risk} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: '#fca5a5', fontSize: 15 }}>
                <span style={{ flexShrink: 0 }}>⚠️</span>
                <span>{risk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive checker */}
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 8px', color: '#f1f5f9′ }}>🔍 Permit Checker</h2>
          <p style={{ color: '#64748b', margin: '0 0 24px', fontSize: 15 }}>Select your project to see permit requirements by city.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8, marginBottom: 28 }}>
            {PROJECTS.map(p => (
              <button
                key={p.id}
                onClick={() => setSelected(p.id === selected ? null : p.id)}
                style={{
                  background: selected === p.id ? '#312e81′ : '#0f172a',
                  border: `1px solid ${selected === p.id ? '#6366f1' : '#1e293b'}`,
                  borderRadius: 8, padding: '10px 14px', cursor: 'pointer',
                  color: selected === p.id ? '#e0e7ff' : '#94a3b8',
                  textAlign: 'left', fontSize: 13, lineHeight: 1.4,
                }}
              >
                {p.label}
              </button>
            ))}
          </div>

          {project && (
            <div style={{ background: '#0f172a', borderRadius: 12, padding: 24 }}>
              <div style={{ fontWeight: 700, color: '#e2e8f0', marginBottom: 20, fontSize: 16 }}>{project.label}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
                {(['dallas', 'frisco', 'plano', 'mckinney'] as const).map(city => {
                  const val = project[city];
                  const colors = statusColor(val);
                  return (
                    <div key={city} style={{ background: colors.bg, borderRadius: 10, padding: 16, textAlign: 'center' }}>
                      <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', fontWeight: 700 }}>{city}</div>
                      <div style={{ color: colors.color, fontWeight: 700, fontSize: 14 }}>{val}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!selected && (
            <div style={{ textAlign: 'center', color: '#334155', padding: '24px 0', fontSize: 15 }}>
              Select a project above to see city-by-city requirements
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
