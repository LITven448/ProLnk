import { useState } from 'react';

const budgetTiers = [
  { label: '$20K–$35K', scope: 'Cosmetic refresh: paint cabinets, new countertops, updated fixtures, mid-range appliances.' },
  { label: '$35K–$55K', scope: 'Mid-range remodel: semi-custom cabinets, quartz countertops, tile backsplash, new appliances.' },
  { label: '$55K–$75K', scope: 'Full gut: custom cabinets, waterfall island, high-end appliances, full tile work, lighting overhaul.' },
  { label: '$75K+', scope: 'Luxury build: full layout change, professional-grade appliances, custom millwork, smart home integration.' },
];

export default function DFWKitchenRemodelGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🍳</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 8 }}>DFW Kitchen Remodel Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Data-driven insights for Dallas-Fort Worth homeowners planning a kitchen renovation this year.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '💰', label: 'Avg Cost Range', value: '$45K – $85K' },
            { icon: '📈', label: 'Average ROI', value: '72%' },
            { icon: '📅', label: 'Timeline', value: '6 – 12 Weeks' },
            { icon: '📋', label: 'Permit Required', value: 'Most DFW Cities' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: '#0f2040', borderRadius: 12, padding: '20px', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 24 }}>{stat.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{stat.label}</div>
              <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 700 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📊 2026 DFW Trends</h2>
          {[
            { label: 'Countertops', detail: 'Quartz dominates 68% of DFW installs — durable in TX heat, low maintenance.' },
            { label: 'Cabinets', detail: 'Lead times 8–16 weeks. Order early. Two-tone finishes trending heavily.' },
            { label: 'Appliances', detail: '36" ranges and panel-ready fridges are the 2026 upgrade most requested.' },
            { label: 'Layout Changes', detail: 'Wall removal to open kitchen to living adds $8K–$15K but top ROI driver.' },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid #1e3a5f' }}>
              <div style={{ color: '#fff', fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 8 }}>🔧 Budget → What You Get in DFW</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 16 }}>Select your budget range to see realistic scope:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {budgetTiers.map((tier, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642' : '#0A1628', color: selected === i ? '#0A1628' : '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>
                {tier.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{budgetTiers[selected].label}</div>
              <div style={{ color: '#fff', fontSize: 15 }}>{budgetTiers[selected].scope}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}