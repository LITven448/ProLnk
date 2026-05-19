import { useState } from 'react';

export default function DFWDeckingMaterialsGuide2026() {
  const [budget, setBudget] = useState('mid');
  const [maintenance, setMaintenance] = useState('low');
  const [result, setResult] = useState('');

  const getRecommendation = () => {
    const map: Record<string, Record<string, string>> = {
      low: {
        low: 'Pressure treated lumber — cheapest option but stain/seal every 2-3 yrs under DFW UV. $15-25/sq ft installed.',
        mid: 'Cedar — natural rot resistance, handles DFW, still needs staining. $20-35/sq ft installed.',
        high: 'Aluminum decking — zero maintenance, handles DFW heat and hail, commercial-grade. $30-60/sq ft.',
      },
      mid: {
        low: 'Pressure treated + quality stain — annual inspection, 3-yr restain cycle for DFW climate. $15-25/sq ft.',
        mid: 'Composite (TimberTech) — 25-yr warranty, withstands DFW heat, clean with soap/water. $35-55/sq ft.',
        high: 'Trex Transcend — top-tier composite, 50-yr fade warranty, perfect for DFW sun exposure. $45-65/sq ft.',
      },
      high: {
        low: 'PT Lumber with Defy stain — budget-friendly but plan for 2-3 yr maintenance cycles in DFW. $15-25/sq ft.',
        mid: 'Composite (Trex Enhance) — entry composite, 25-yr warranty, minimal DFW upkeep. $28-45/sq ft.',
        high: 'Ipe hardwood — 75-yr lifespan, premium aesthetics, annual oiling required. $50-80/sq ft installed.',
      },
    };
    setResult(map[maintenance]?.[budget] || 'Select options for your DFW decking recommendation.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>PROLNK • DFW MATERIALS GUIDE 2026</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>🏡 DFW Decking Materials Guide 2026</h1>
        <p style={{ color: '#8899AA', fontSize: 16, marginBottom: 32 }}>
          Deck materials for DFW climate — composites win for heat tolerance, PT lumber still dominates by volume.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🪵', label: 'Pressure Treated Lumber', desc: 'Most affordable. Requires staining every 2-3 yrs under DFW sun. $15-25/sq ft.', star: false },
            { icon: '🌲', label: 'Cedar', desc: 'Natural rot resistance. Handles DFW humidity. Stain every 3 yrs. $20-35/sq ft.', star: false },
            { icon: '🔷', label: 'Composite (Trex/TimberTech)', desc: 'Withstands DFW heat. 25-50yr warranty. Minimal maintenance. $28-65/sq ft.', star: true },
            { icon: '🔩', label: 'Aluminum', desc: 'Commercial-grade. Zero maintenance. Handles DFW hail. $30-60/sq ft.', star: false },
            { icon: '🌿', label: 'Ipe Hardwood', desc: '75-yr lifespan. Annual oiling. Premium DFW outdoor aesthetics. $50-80/sq ft.', star: false },
          ].map(t => (
            <div key={t.label} style={{ background: '#0F2035', border: `1px solid ${t.star ? '#F5E642' : '#1E3A5F'}`, borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, color: t.star ? '#F5E642' : '#fff' }}>{t.label}{t.star ? ' ⭐' : ''}</div>
              <div style={{ color: '#8899AA', fontSize: 13 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2035', border: '1px solid #1E3A5F', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Get Your DFW Decking Recommendation</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 6 }}>BUDGET</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="low">Low ($15-25/sq ft)</option>
                <option value="mid">Mid ($25-55/sq ft)</option>
                <option value="high">High ($55+/sq ft)</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ color: '#8899AA', fontSize: 12, display: 'block', marginBottom: 6 }}>MAINTENANCE PREFERENCE</label>
              <select value={maintenance} onChange={e => setMaintenance(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="low">Zero Maintenance</option>
                <option value="mid">Some Maintenance OK</option>
                <option value="high">High Maintenance Fine</option>
              </select>
            </div>
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get Recommendation →
          </button>
          {result && <div style={{ marginTop: 16, background: '#162440', borderRadius: 10, padding: 16, color: '#F5E642', fontWeight: 600 }}>✅ {result}</div>}
        </div>

        <div style={{ color: '#8899AA', fontSize: 12, borderTop: '1px solid #1E3A5F', paddingTop: 16 }}>
          ProLnk connects DFW homeowners with verified deck builders. Pricing reflects 2026 DFW market rates including labor.
        </div>
      </div>
    </div>
  );
}