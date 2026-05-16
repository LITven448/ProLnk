import { useState } from 'react';

const QUALIFYING_USES = [
  { id: 'cattle', label: '🐄 Cattle', min: 5, animals: '1 animal unit per 50 acres typical' },
  { id: 'horses', label: '🐴 Horses', min: 5, animals: '1 horse per 5–10 acres qualifies' },
  { id: 'bees', label: '🐝 Bees', min: 5, animals: '6–20 hives depending on county (Parker: 6 hives/5 acres)' },
  { id: 'goats', label: '🐐 Goats / Sheep', min: 5, animals: '3–4 animals per 5 acres typical' },
  { id: 'timber', label: '🌲 Timber / Wildlife', min: 10, animals: 'Wildlife management plan required, 10+ acres minimum' },
];

const STEPS = [
  'Own or lease 5+ acres (some uses require 10+)',
  'Conduct qualifying agricultural activity for 5 of last 7 years',
  'File Form 50-129 with your county appraisal district',
  'Provide proof of agricultural activity (photos, receipts, vet records)',
  'Annual recertification not required — appraiser visits periodically',
];

const IMPACTS = [
  { item: '🏡 Home Services', note: 'No restriction — HVAC, plumbing, roofing unaffected by ag exemption' },
  { item: '🏗️ New Construction', note: 'Adding a barn or arena does not disqualify ag exemption' },
  { item: '📦 Sales Tax', note: 'Ag exemption also covers sales tax on feed, seed, chemicals, farm equipment' },
  { item: '💰 Property Tax Savings', note: 'Average savings: 70–90% reduction in taxable value vs. market value' },
];

export default function DFWAgriculturalExemptionGuide2026() {
  const [acres, setAcres] = useState('');
  const [selectedUse, setSelectedUse] = useState<string | null>(null);

  const acreNum = parseFloat(acres);
  const found = QUALIFYING_USES.find(u => u.id === selectedUse);
  const eligible = found && acreNum >= found.min;
  const notEnough = found && acreNum > 0 && acreNum < found.min;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>ProLnk · DFW Guides</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🌾 DFW Ag Exemption Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          Texas agricultural exemption can reduce your property taxes by up to 90% by valuing land at its agricultural productivity value rather than market value. Available to qualifying rural property owners in all DFW outer counties.
        </p>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>✅ Eligibility Check</h2>
          <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8', fontSize: 14 }}>Enter your acreage:</label>
          <input type="number" value={acres} onChange={e => setAcres(e.target.value)} placeholder="e.g. 12" style={{ backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e2d4a', borderRadius: 8, padding: '10px 14px', fontSize: 15, width: 160, marginBottom: 20 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {QUALIFYING_USES.map(u => (
              <button key={u.id} onClick={() => setSelectedUse(u.id)} style={{ padding: '12px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, textAlign: 'left', backgroundColor: selectedUse === u.id ? '#F5E642' : '#1e2d4a', color: selectedUse === u.id ? '#0A1628' : '#fff' }}>
                {u.label} — Min {u.min} acres
              </button>
            ))}
          </div>
          {found && acreNum > 0 && (
            <div style={{ marginTop: 16, backgroundColor: '#0A1628', borderRadius: 8, padding: 16, borderLeft: `4px solid ${eligible ? '#4ade80' : '#f87171'}` }}>
              {eligible ? (
                <div>
                  <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: 4 }}>✅ Potentially Eligible</div>
                  <div style={{ color: '#cbd5e1', fontSize: 14 }}>{found.animals}</div>
                </div>
              ) : (
                <div style={{ color: '#f87171', fontWeight: 700 }}>❌ Not enough acreage — {found.label} requires {found.min}+ acres minimum</div>
              )}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📋 How to Apply</h2>
          {STEPS.map((s, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #1e2d4a', fontSize: 14, color: '#cbd5e1' }}>
              <span style={{ color: '#F5E642', fontWeight: 700, marginRight: 8 }}>{i + 1}.</span>{s}
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111d35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🏠 Impact on Home Services</h2>
          {IMPACTS.map((item, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{item.item}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.note}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <h2 style={{ color: '#0A1628', fontWeight: 800, marginBottom: 8 }}>Find Ag Property Service Pros</h2>
          <p style={{ color: '#0A1628', marginBottom: 16, fontSize: 14 }}>ProLnk connects ag-exempt property owners with contractors experienced in rural DFW properties — fencing, wells, barns, and more.</p>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', border: 'none', padding: '12px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get Free Rural Property Quotes →</button>
        </div>
      </div>
    </div>
  );
}