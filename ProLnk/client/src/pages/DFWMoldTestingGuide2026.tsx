import { useState } from 'react';

export default function DFWMoldTestingGuide2026() {
  const [concern, setConcern] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const concerns = [
    { label: 'I see visible mold (small area <10 sq ft)', recommendation: 'Skip testing — just remediate. EPA says visible mold under 10 sq ft can be cleaned by homeowner with N95, gloves, eye protection + antimicrobial cleaner. Testing adds cost, not value here.' },
    { label: 'I see visible mold (large area >10 sq ft)', recommendation: 'Call a licensed DFW mold remediator first, testing second. Get air quality test AFTER remediation to verify clearance. Pre-remediation testing rarely changes the work scope on large jobs.' },
    { label: 'Musty smell, no visible mold', recommendation: 'Professional air sampling ($300-600) is worthwhile here — spore counts reveal hidden colonies. Ask for Cladosporium, Aspergillus, Penicillium, Stachybotrys panel. DIY kits unreliable for odor investigations.' },
    { label: 'Post-flood or water damage assessment', recommendation: 'Professional moisture mapping first (thermal camera, moisture meter). Bulk sampling of suspect materials ($75-150 per sample). Mold can colonize in 24-48 hours in DFW summer humidity.' },
    { label: 'Buying a home — due diligence', recommendation: 'Add mold inspection to standard home inspection ($200-400 addon). Air sampling in attic, crawl space, and HVAC return. DFW homes with deferred maintenance have 40%+ mold-positive rate in attics.' },
    { label: 'Health symptoms, no visible evidence', recommendation: 'Start with physician, not inspector. If MD suspects mold exposure, hire Certified Industrial Hygienist (CIH) — not a remediator — for unbiased sampling. CIH fee: $500-1,200 but neutral advice.' },
  ];

  const handleSelect = (c: { label: string; recommendation: string }) => {
    setConcern(c.label);
    setRecommendation(c.recommendation);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>DFW 2026 GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>🔬 DFW Mold Testing Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, fontSize: 15 }}>When and how to test for mold in DFW — and when testing is a waste of money.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 28 }}>
          {[
            { label: 'DIY Kit', cost: '$30–50', note: 'Limited accuracy' },
            { label: 'Air Sampling', cost: '$300–600', note: 'Hidden mold' },
            { label: 'Bulk Sampling', cost: '$75–150/sample', note: 'Material ID' },
          ].map(item => (
            <div key={item.label} style={{ background: '#1e2d4a', borderRadius: 8, padding: '16px', textAlign: 'center' }}>
              <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 14, marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 13 }}>{item.cost}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{item.note}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 14, color: '#F5E642′ }}>🔍 My Mold Situation</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
          {concerns.map(c => (
            <button key={c.label} onClick={() => handleSelect(c)} style={{ background: concern === c.label ? '#F5E642′ : '#1e2d4a', color: concern === c.label ? '#0A1628' : '#fff', border: ’none', borderRadius: 6, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>{c.label}</button>
          ))}
        </div>
        {recommendation && (
          <div style={{ background: '#1e2d4a', border: '1px solid #F5E642', borderRadius: 8, padding: 20 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>✅ Testing Recommendation</div>
            <p style={{ color: '#e2e8f0', lineHeight: 1.6, margin: 0 }}>{recommendation}</p>
          </div>
        )}
        <div style={{ marginTop: 32, color: '#64748b', fontSize: 12, textAlign: 'center' }}>ProLnk · DFW Mold Testing · 2026 Edition</div>
      </div>
    </div>
  );
}