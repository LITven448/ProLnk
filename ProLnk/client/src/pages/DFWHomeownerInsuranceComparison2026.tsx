import { useState } from 'react';

export default function DFWHomeownerInsuranceComparison2026() {
  const [homeType, setHomeType] = useState('single-family');
  const [priority, setPriority] = useState('claims');

  const recommendations: Record<string, Record<string, { carrier: string; reason: string; rating: string }>> = {
    'single-family': {
      'claims': { carrier: 'State Farm', reason: 'Largest DFW market share, fastest local claims response, 24/7 agent network', rating: 'A++' },
      'price': { carrier: 'Texas Farm Bureau', reason: 'Lowest premiums in outer DFW counties, member discounts available', rating: 'A' },
      'coverage': { carrier: 'Farmers', reason: 'Best specialty riders for foundation, hail, and wind — critical in DFW', rating: 'A' },
      'military': { carrier: 'USAA', reason: 'Best overall for veterans — lowest rates, highest satisfaction, best claims', rating: 'A++' },
    },
    'condo': {
      'claims': { carrier: 'Allstate', reason: 'Strong HO-6 condo policies, competitive in DFW urban cores', rating: 'A+' },
      'price': { carrier: 'Allstate', reason: 'Competitive HO-6 pricing for Dallas/Fort Worth condo owners', rating: 'A+' },
      'coverage': { carrier: 'Farmers', reason: 'Comprehensive HO-6 with loss assessment and building property coverage', rating: 'A' },
      'military': { carrier: 'USAA', reason: 'Exceptional condo coverage for veterans in DFW metro', rating: 'A++' },
    },
    'townhome': {
      'claims': { carrier: 'State Farm', reason: 'Reliable claims for townhome-specific issues like shared wall damage', rating: 'A++' },
      'price': { carrier: 'Texas Farm Bureau', reason: 'Affordable townhome rates especially in Collin and Denton counties', rating: 'A' },
      'coverage': { carrier: 'Farmers', reason: 'Best riders for shared structure and foundation coverage', rating: 'A' },
      'military': { carrier: 'USAA', reason: 'Veterans get best-in-class townhome protection at lowest cost', rating: 'A++' },
    },
  };

  const carriers = [
    { name: 'State Farm', icon: '🏠', share: '28%', note: 'Largest DFW market share' },
    { name: 'USAA', icon: '⭐', share: 'Veterans only', note: 'Best overall — requires military affiliation' },
    { name: 'Texas Farm Bureau', icon: '🌾', share: '14%', note: 'Best for outer DFW counties' },
    { name: 'Allstate', icon: '🔵', share: '11%', note: 'Competitive urban DFW pricing' },
    { name: 'Farmers', icon: '🌿', share: '9%', note: 'Best specialty riders for hail/foundation' },
  ];

  const rec = recommendations[homeType]?.[priority];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏡 ProLnk DFW Resource Hub</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Homeowners Insurance Comparison 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Find the best carrier for your DFW home — compare market share, claims service, and coverage options.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>🏠 Home Type</div>
            <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px', fontSize: 14 }}>
              <option value="single-family">Single-Family Home</option>
              <option value="condo">Condo / HOA Unit</option>
              <option value="townhome">Townhome</option>
            </select>
          </div>
          <div style={{ background: '#1e2d47', borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>🎯 Top Priority</div>
            <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px', fontSize: 14 }}>
              <option value="claims">Best Claims Service</option>
              <option value="price">Lowest Price</option>
              <option value="coverage">Best Coverage</option>
              <option value="military">Military / USAA</option>
            </select>
          </div>
        </div>

        {rec && (
          <div style={{ background: '#F5E642', borderRadius: 12, padding: 24, marginBottom: 32, color: '#0A1628′ }}>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>⭐ RECOMMENDED FOR YOU</div>
            <div style={{ fontSize: 22, fontWeight: 800 }}>{rec.carrier} <span style={{ fontSize: 14 }}>AM Best: {rec.rating}</span></div>
            <div style={{ marginTop: 8, fontSize: 14 }}>{rec.reason}</div>
          </div>
        )}

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>All DFW Carriers</h2>
        {carriers.map(c => (
          <div key={c.name} style={{ background: '#1e2d47', borderRadius: 10, padding: 16, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 24 }}>{c.icon}</span>
              <div>
                <div style={{ fontWeight: 700 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: '#94a3b8′ }}>{c.note}</div>
              </div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '6px 12px', fontSize: 12, color: '#F5E642′ }}>{c.share}</div>
          </div>
        ))}

        <div style={{ marginTop: 32, background: '#1e2d47', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>💡 DFW Insurance Tip 2026</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>DFW hail and wind claims surged in 2025. Verify your policy includes full roof replacement (not ACV) and foundation coverage before renewal. Texas law allows you to switch carriers at any time.</div>
        </div>
      </div>
    </div>
  );
}

