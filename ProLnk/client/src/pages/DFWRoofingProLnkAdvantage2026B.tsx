import { useState } from 'react';

export default function DFWRoofingProLnkAdvantage2026B() {
  const [roofConcern, setRoofConcern] = useState('');

  const concerns = [
    { id: 'storm-chaser', label: '🌪️ Storm chaser at door', advantage: 'No Storm Chaser Policy — Enforced', detail: 'ProLnk enforces a DFW-local address requirement for every charter roofer. If a company appeared after the last DFW hailstorm and disappears when warranty work is needed, they cannot be in ProLnk. Verified local address is a hard requirement.' },
    { id: 'quality', label: '🏆 Want quality workmanship', advantage: 'Manufacturer Certification Verified', detail: 'Owens Corning Preferred, GAF Master Elite, CertainTeed SELECT ShingleMaster — ProLnk verifies manufacturer certifications that indicate trained installation crews. These certifications require documented job history and installation standards.' },
    { id: 'hail', label: '🧊 Post-hail damage', advantage: 'HAAG Training Required', detail: 'HAAG Engineering training teaches inspectors how to distinguish hail damage from normal wear. ProLnk requires HAAG-trained inspectors for insurance claim support work in DFW. Without this, your claim may be undervalued.' },
    { id: 'records', label: '📋 Want job documentation', advantage: 'Health Vault Job Record', detail: 'Every ProLnk roofing job generates a permanent record in your Home Health Vault — scope, materials used, warranty terms, and contractor info. When you sell, buyers see verified proof of recent roof work without asking you to find paperwork.' },
    { id: 'reviews', label: '⭐ Want to check reviews', advantage: 'Post-Job Review System', detail: 'ProLnk collects verified reviews after every job — from the actual homeowner, not anonymous accounts. Roofers with declining scores get flagged before you meet them. Every review is tied to a completed job record.' },
  ];

  const selected = concerns.find(c => c.id === roofConcern);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', color: '#F5E642', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>ProLnk DFW · 2026</div>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>🏚️ DFW ProLnk Roofing Advantage — Part 2</h1>
        <p style={{ color: '#94a3b8', marginBottom: '28px', fontSize: '15px' }}>Specific roofing advantages that protect DFW homeowners from the industry's most common problems.</p>

        <div style={{ background: '#1e2d45', borderRadius: '14px', padding: '20px', marginBottom: '24px' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>ProLnk Roofing Charter Requirements</p>
          {[
            { icon: '📍', label: 'DFW-local business address verified — no out-of-state storm chasers' },
            { icon: '🏅', label: 'Manufacturer certifications on file (Owens Corning, GAF, CertainTeed)' },
            { icon: '🔬', label: 'HAAG Engineering training for hail damage inspection accuracy' },
            { icon: '🚫', label: 'No storm-chaser solicitation — grounds for immediate charter removal' },
            { icon: '⭐', label: 'Post-job verified reviews tied to actual completed job records' },
            { icon: '📂', label: 'Permanent Health Vault job record for every ProLnk-matched roof job' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0, fontSize: '16px' }}>{item.icon}</span>
              <span style={{ color: '#cbd5e1', fontSize: '14px' }}>{item.label}</span>
            </div>
          ))}
        </div>

        <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: '12px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>What roofing concern do you have?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
          {concerns.map(c => (
            <button key={c.id} onClick={() => setRoofConcern(c.id)}
              style={{ background: roofConcern === c.id ? '#F5E642′ : '#1e2d45', color: roofConcern === c.id ? '#0A1628' : '#fff', border: ’none', borderRadius: '10px', padding: '14px', cursor: 'pointer', fontWeight: 700, fontSize: '13px', textAlign: 'left' }}>
              {c.label}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#1e2d45', borderRadius: '14px', padding: '20px', marginBottom: '20px', borderLeft: '4px solid #F5E642′ }}>
            <p style={{ color: '#F5E642', fontWeight: 800, fontSize: '15px', marginBottom: '8px' }}>🏆 {selected.advantage}</p>
            <p style={{ color: '#cbd5e1', fontSize: '14px', margin: 0 }}>{selected.detail}</p>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: '14px', padding: '20px' }}>
          <p style={{ color: '#0A1628', fontWeight: 800, fontSize: '15px', marginBottom: '6px' }}>🌩️ DFW Hail Season Is Every Season</p>
          <p style={{ color: '#0A1628', fontSize: '14px', margin: '0 0 12px' }}>DFW averages more hail events per year than almost any metro in the US. ProLnk\'s no-storm-chaser policy and HAAG requirements exist specifically for this market.</p>
          <a href="/" style={{ background: '#0A1628', color: '#F5E642', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '14px' }}>Get Verified DFW Roofer →</a>
        </div>
      </div>
    </div>
  );
}