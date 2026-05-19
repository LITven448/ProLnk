import { useState } from 'react';

export default function DFWRoofingManufacturerWarrantyVoid2026() {
  const [concern, setConcern] = useState('improper_install');

  const voids = {
    improper_install: { label: 'Improper installation', risk: 'VOID — Guaranteed', riskColor: '#dc2626', detail: 'Most common warranty void — non-certified contractor, wrong nail pattern, improper starter strip', prevention: 'Only use manufacturer-certified contractors' },
    non_matching: { label: 'Non-matching accessories', risk: 'VOID — Likely', riskColor: '#ef4444', detail: 'Mixing GAF shingles with OC underlayment or non-matching ice/water shield voids system warranty', prevention: 'Use same-brand accessories throughout — ask for invoice' },
    power_wash: { label: 'Power washing shingles', risk: 'VOID — Confirmed', riskColor: '#dc2626', detail: 'High-pressure water strips granules — all major manufacturers void on evidence of pressure washing', prevention: 'Low-pressure rinse only, or professional soft wash service' },
    improper_walk: { label: 'Improper roof walking', risk: 'Moderate Risk', riskColor: '#f59e0b', detail: 'Walking on shingles in heat (90°F+ DFW summers) crushes granules and breaks tabs', prevention: 'Walk on rafters, use roof jacks — avoid in summer heat' },
    mixed_generations: { label: 'Mixing shingle generations', risk: 'VOID — Likely', riskColor: '#ef4444', detail: 'Manufacturers update formulas — mixing 2018 and 2024 same SKU can void warranty due to mismatch', prevention: 'Full replacement with same production run when possible' },
    no_drip_edge: { label: 'Missing drip edge', risk: 'VOID — Common', riskColor: '#ef4444', detail: 'Most manufacturers require drip edge — DFW code requires it — missing drip edge voids warranty', prevention: 'Verify drip edge on all eaves and rakes in contract' },
  };

  const sel = voids[concern as keyof typeof voids];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🚫</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', marginBottom: '0.5rem' }}>DFW Roofing Manufacturer Warranty Void Guide 2026</h1>
          <p style={{ color: '#94a3b8' }}>What voids your DFW roof warranty — and how to avoid it</p>
        </div>

        <div style={{ backgroundColor: '#0d2137', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>Select your warranty concern:</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {Object.entries(voids).map(([k, v]) => (
              <button key={k} onClick={() => setConcern(k)}
                style={{ padding: '0.75rem 1rem', borderRadius: '8px', textAlign: 'left',
                  border: concern === k ? '2px solid #F5E642' : '2px solid #1e3a5f',
                  backgroundColor: concern === k ? '#1e3a5f' : '#0A1628',
                  color: concern === k ? '#F5E642' : '#94a3b8', cursor: 'pointer' }}>{v.label}</button>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0d2137', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #1e3a5f' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ color: '#94a3b8' }}>Void Risk</span>
            <div style={{ fontSize: '1.4rem', color: sel.riskColor, fontWeight: 'bold' }}>{sel.risk}</div>
          </div>
          <div style={{ color: '#94a3b8', marginBottom: '1rem', lineHeight: '1.6' }}>{sel.detail}</div>
          <div style={{ backgroundColor: '#0A1628', padding: '0.75rem', borderRadius: '8px', color: '#22c55e' }}>✅ Prevention: {sel.prevention}</div>
        </div>

        <div style={{ backgroundColor: '#0d2137', borderRadius: '12px', padding: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>📋 DFW Warranty Protection Checklist</h3>
          <ul style={{ color: '#94a3b8', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
            <li>Always use a manufacturer-certified contractor — verify online before signing</li>
            <li>Request itemized invoice showing brand names of all accessories installed</li>
            <li>Register your warranty online within 30-60 days of installation</li>
            <li>Never pressure wash or use abrasive cleaning on asphalt shingles</li>
            <li>Document all roof work with photos and contractor license numbers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
