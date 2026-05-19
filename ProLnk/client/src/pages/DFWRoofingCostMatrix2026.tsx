import { useState } from 'react';

const services = [
  { id: 'inspect', label: 'Roof Inspection', icon: '🔍', cost: '$150–$300', detail: 'Full visual inspection, photos, written report. Many DFW roofers offer free inspections after hail events. Paid inspections include drone footage and moisture readings.' },
  { id: 'minor', label: 'Minor Repair', icon: '🔨', cost: '$300–$600', detail: 'Flashing repair, a few missing shingles, pipe boot replacement. DFW hail season (March–June) causes thousands of these repairs annually.' },
  { id: 'partial', label: 'Partial Replacement', icon: '🏚️', cost: '$3,000–$6,000', detail: 'One slope or section of roof replaced. Common after isolated hail damage to a specific side. Matching existing shingles can be tricky on older roofs.' },
  { id: 'arch', label: 'Full Replacement — Architectural', icon: '🏠', cost: '$13,000–$18,000', detail: 'Most common full replacement in DFW. 30-year architectural shingles. Average DFW home (2,200 sq ft) falls in this range. Includes decking repair and new underlayment.' },
  { id: 'class4', label: 'Class 4 Impact Resistant Upgrade', icon: '🛡️', cost: '$16,000–$22,000', detail: 'Class 4 IR shingles qualify for insurance discounts in DFW (5–25% off premium). Pay-back period typically 3–6 years through premium savings. Highly recommended in DFW hail corridor.' },
  { id: 'metal', label: 'Metal Roof', icon: '⚡', cost: '$30,000–$50,000', detail: '40–70 year lifespan. Best hail resistance. DFW insurance discounts up to 30%. Standing seam vs corrugated — both work well in DFW climate. Often ROI positive over 15 years.' },
];

const stats = [
  { icon: '⛈️', val: '6–8', label: 'Significant hail events/yr in DFW' },
  { icon: '🌪️', val: 'Top 5', label: 'Most hail-damaged metro in the US' },
  { icon: '📄', val: '60%', label: 'DFW roof claims paid by insurance' },
  { icon: '⏱️', val: '15–20 yrs', label: 'Avg DFW shingle lifespan (heat/hail)' },
];

export default function DFWRoofingCostMatrix2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🏠 DFW Roofing Cost Matrix 2026</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24 }}>Every roofing cost in DFW — from a $150 inspection to a $50K metal roof. DFW sits in one of the most active hail corridors in the country. Knowing your numbers before talking to a contractor protects you.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 28 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: '#0F2040', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 20, color: '#F5E642′ }}>{s.val}</div>
              <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 14, fontWeight: 600 }}>TAP ANY PROJECT TYPE FOR DETAILS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {services.map(s => (
            <div key={s.id} onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{ background: '#0F2040', borderRadius: 12, padding: 18, cursor: 'pointer', border: `2px solid ${selected === s.id ? '#F5E642' : '#1E3A5F'}`, transition: 'border-color 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{s.label}</span>
                </div>
                <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 14, whiteSpace: 'nowrap', marginLeft: 12 }}>{s.cost}</span>
              </div>
              {selected === s.id && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #1E3A5F', color: '#94A3B8', fontSize: 13, lineHeight: 1.7 }}>
                  {s.detail}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>💡 DFW Pro Tip</div>
          <p style={{ fontSize: 13, color: '#94A3B8', margin: 0, lineHeight: 1.7 }}>After any hail event, file an insurance claim before getting contractor estimates. Most DFW homeowners don't know their policy may cover full replacement. Class 4 upgrades often get approved at no cost to homeowner. Always get 3 bids — DFW has high variance in roofing quotes.</p>
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', color: '#475569', fontSize: 12 }}>
          ProLnk · DFW Home Services · prolnk.io
        </div>
      </div>
    </div>
  );
}
