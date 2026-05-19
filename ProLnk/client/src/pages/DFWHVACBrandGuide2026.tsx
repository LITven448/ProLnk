import { useState } from 'react';

const brands = {
  reliability: {
    name: 'Trane / American Standard',
    reason: 'Best long-term reliability in DFW heat cycles; most DFW contractors factory-certified.',
    availability: 'High — 200+ certified DFW contractors post-Carrier/Bryant consolidation.',
    warranty: '10-yr parts + 12-yr heat exchanger with registration',
    price: '$$$',
  },
  price: {
    name: 'Goodman / Daikin',
    reason: 'Owned by Daikin; best value per SEER2 in DFW market. Parts stocked everywhere.',
    availability: 'Very High — every HVAC supply house in DFW stocks Goodman.',
    warranty: '10-yr parts, lifetime heat exchanger (with registration)',
    price: '$$',
  },
  efficiency: {
    name: 'Lennox (post-2024 lineup)',
    reason: 'Highest SEER2 ratings available in DFW; ideal for Oncor rebate qualification.',
    availability: 'Medium — Lennox dealer network thinned in 2024; verify local availability.',
    warranty: '10-yr parts + 20-yr heat exchanger on SLP/XC series',
    price: '$$$$',
  },
  warranty: {
    name: 'Carrier (now Residential Systems Group)',
    reason: 'Post-Bryant merger warranty terms unified; Infinity series still best DFW support.',
    availability: 'Medium-High — RSG consolidated some dealers but core network intact.',
    warranty: '10-yr parts + Carrier-backed labor warranty through select dealers',
    price: '$$$',
  },
};

type Priority = keyof typeof brands;

export default function DFWHVACBrandGuide2026() {
  const [priority, setPriority] = useState<Priority | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>HVAC Brand Guide for DFW Homeowners</h1>
        <p style={{ color: '#9BA3B8', marginBottom: 24, lineHeight: 1.6 }}>
          The Carrier/Bryant merger and Lennox dealer changes in 2024 reshaped which brands DFW contractors prefer to install — and that matters for your warranty service.
        </p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: '#9BA3B8', marginBottom: 12 }}>🔍 2024–2025 MARKET SHIFTS</div>
          <ul style={{ margin: 0, padding: '0 0 0 18px', lineHeight: 2, color: '#C8D0E0' }}>
            <li>Carrier acquired Bryant — now operates as Residential Systems Group (RSG)</li>
            <li>Lennox restructured dealer network; some DFW markets underserved briefly</li>
            <li>Daikin (Goodman parent) expanded DFW distribution — most stocked brand</li>
            <li>Trane/American Standard dealer count stable; preferred by high-volume DFW builders</li>
          </ul>
        </div>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>⚡ WHAT MATTERS MOST TO YOU?</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {(['reliability', 'price', 'efficiency', 'warranty'] as Priority[]).map(p => (
              <button key={p} onClick={() => setPriority(p)} style={{
                background: priority === p ? '#F5E642' : '#111E35',
                color: priority === p ? '#0A1628' : '#E8EAF0',
                border: '1px solid ' + (priority === p ? '#F5E642' : '#1E2D45'),
                borderRadius: 8, padding: '12px 16px', cursor: 'pointer', fontWeight: 700, fontSize: 14, textAlign: 'left', textTransform: 'uppercase', letterSpacing: 1,
              }}>
                {p === 'reliability' ? '🛡️' : p === 'price' ? '💰' : p === 'efficiency' ? '🌿' : '📋'} {p}
              </button>
            ))}
          </div>
        </div>

        {priority && (
          <div style={{ background: '#111E35', border: '2px solid #F5E642', borderRadius: 12, padding: 24 }}>
            <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>✅ TOP PICK FOR {priority.toUpperCase()}</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{brands[priority].name}</div>
            <div style={{ color: '#C8D0E0', marginBottom: 8, lineHeight: 1.6 }}>{brands[priority].reason}</div>
            <div style={{ display: 'grid', gap: 8, marginTop: 16 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>📍 <strong>DFW Availability:</strong> {brands[priority].availability}</div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>📋 <strong>Warranty:</strong> {brands[priority].warranty}</div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>💰 <strong>Price Tier:</strong> {brands[priority].price}</div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 24, color: '#6B7894', fontSize: 12, lineHeight: 1.6 }}>
          Always verify contractor certification before purchase — warranty service requires an authorized dealer in DFW for most brands. ProLnk connects you with verified local HVAC pros.
        </div>
      </div>
    </div>
  );
}
