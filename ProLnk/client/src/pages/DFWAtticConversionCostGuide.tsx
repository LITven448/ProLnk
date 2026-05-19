import { useState } from 'react';

const conversionTypes: Record<string, { low: number; high: number; label: string; permits: string; heatNote: string }> = {
  bedroom: {
    low: 30000, high: 60000,
    label: 'Full Bedroom Conversion',
    permits: 'Building + Electrical + HVAC + Structural permits required. Inspection at framing, insulation, and final stages.',
    heatNote: 'Converting attic to bedroom removes your primary heat shield. You MUST reinsulate the new roofline or knee walls — budget $3,000–$8,000 for spray foam on rafters.',
  },
  storage: {
    low: 1500, high: 3000,
    label: 'Storage Flooring Only',
    permits: 'Usually no permit required for simple flooring if no structural changes.',
    heatNote: 'Leave existing blown-in insulation on attic floor intact. Adding OSB panels on top is fine — do not compress the insulation.',
  },
  insulation: {
    low: 1500, high: 4000,
    label: 'Insulation Upgrade Only',
    permits: 'No permit required for insulation work in most DFW municipalities.',
    heatNote: 'R-38 minimum recommended for DFW (R-49 to R-60 for new construction). Properly sealing air gaps before adding insulation yields 20–30% energy savings.',
  },
};

const sizeMultipliers: Record<string, number> = { small: 0.7, medium: 1.0, large: 1.35 };

export default function DFWAtticConversionCostGuide() {
  const [atticSize, setAtticSize] = useState('medium');
  const [conversionType, setConversionType] = useState('bedroom');

  const sm = sizeMultipliers[atticSize];
  const ct = conversionTypes[conversionType];
  const low = Math.round(ct.low * sm);
  const high = Math.round(ct.high * sm);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 DFW COST GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Attic Conversion Cost Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Dallas-Fort Worth · 2026 Contractor Pricing</p>

        <div style={{ background: '#7c2d12', borderRadius: 12, padding: '1.25rem', marginBottom: '2rem', border: '1px solid #dc2626′ }}>
          <div style={{ fontWeight: 700, color: '#fca5a5', marginBottom: '0.5rem' }}>⚠️ Critical DFW Attic Warning</div>
          <p style={{ color: '#fecaca', fontSize: '0.9rem', margin: 0 }}>Converting your attic into living space removes DFW's #1 heat shield. With average summer highs of 100°F+, an unconverted attic buffers your home from extreme heat. Any bedroom conversion requires proper rafter/knee-wall insulation or HVAC bills will spike significantly.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Attic Size</label>
            <select value={atticSize} onChange={e => setAtticSize(e.target.value)}
              style={{ width: '100%', background: '#1e2d45', color: '#fff', border: '1px solid #2d3f5e', borderRadius: 8, padding: '0.6rem', fontSize: '1rem' }}>
              <option value="small">Small (under 400 sq ft)</option>
              <option value="medium">Medium (400–700 sq ft)</option>
              <option value="large">Large (700+ sq ft)</option>
            </select>
          </div>
          <div>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Conversion Type</label>
            <select value={conversionType} onChange={e => setConversionType(e.target.value)}
              style={{ width: '100%', background: '#1e2d45', color: '#fff', border: '1px solid #2d3f5e', borderRadius: 8, padding: '0.6rem', fontSize: '1rem' }}>
              <option value="bedroom">Full Bedroom Conversion</option>
              <option value="storage">Storage Flooring Only</option>
              <option value="insulation">Insulation Upgrade Only</option>
            </select>
          </div>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>💰 Cost Estimate: {ct.label}</h2>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>
            ${low.toLocaleString()} – ${high.toLocaleString()}
          </div>
          <div style={{ color: '#64748b', fontSize: '0.85rem' }}>For {atticSize} attic · includes all labor and materials</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>📋 Permit Requirements</div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>{ct.permits}</p>
          </div>
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>🌡️ DFW Heat Management</div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>{ct.heatNote}</p>
          </div>
          {conversionType === 'bedroom' && (
            <div style={{ background: '#1e2d45', borderRadius: 12, padding: '1.25rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>🏗️ What's Included in Full Conversion</div>
              <ul style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0, paddingLeft: '1.25rem' }}>
                <li>Structural floor system (sister joists or engineered lumber)</li>
                <li>Egress window (code required for bedroom)</li>
                <li>HVAC extension or mini-split unit ($3,000–$7,000)</li>
                <li>Electrical (outlets, lighting, smoke detector)</li>
                <li>Spray foam or rigid insulation on rafters</li>
                <li>Drywall, trim, and finish work</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
