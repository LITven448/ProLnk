import { useState } from 'react';

const submarkets = ['North Dallas', 'Plano / Garland', 'Frisco / McKinney', 'Allen / Wylie', 'Irving / Grand Prairie', 'Fort Worth / Weatherford', 'Denton / Lewisville', 'Mansfield / Midlothian'];

const marketBySubmarket: Record<string, { demand: string; companies: string; price: string; soilNote: string }> = {
  'North Dallas': { demand: '🟠 High — Older housing stock (1970s–90s) with significant repair volume.', companies: '40+ active foundation companies. 15–20 are established local operators.', price: '$4,500–$18,000 typical range', soilNote: 'Very high clay content. Expect seasonal movement every year. Annual inspection recommended.' },
  'Frisco / McKinney': { demand: '🟡 Moderate — Newer builds, but rapid soil shifts in newer subdivisions during drought.', companies: '20+ active. Several specialize in newer construction warranty repairs.', price: '$3,500–$12,000 typical range', soilNote: 'Expansive clay under many new builds. Irrigation system maintenance critical to prevention.' },
  'Fort Worth / Weatherford': { demand: '🔴 Very High — West side sees extreme clay shrink/swell. Among worst in DFW.', companies: '25+ operators, but quality varies. Several large chains operate here heavily.', price: '$5,000–$22,000 typical range', soilNote: 'Parker County clay is extremely active. Foundation movement is nearly universal in older homes.' },
  'Denton / Lewisville': { demand: '🟡 Moderate — Mix of expansive clay and some areas with better soil profiles.', companies: '15+ active. Denton has fewer options — longer wait times.', price: '$4,000–$15,000 typical range', soilNote: 'Check drainage before assuming foundation issue. Poor grading causes many apparent foundation problems here.' },
};

const fallbackMarket = { demand: '🟡 Moderate — Active repair market with seasonal peaks.', companies: '15–30 active companies in most DFW submarkets.', price: '$3,500–$18,000 depending on scope', soilNote: 'DFW expansive clay affects virtually all homes. Annual visual inspection is recommended.' };

const vettingChecklist = [
  ['🏛️', 'Independent Engineer First', 'Get a licensed structural engineer (PE) opinion BEFORE hiring a foundation company. Engineers have no financial stake in what repair you choose.'],
  ['📋', 'Check TPEA Registration', 'Foundation companies must be registered with the Texas Residential Construction Commission (TRCC). Verify before signing.'],
  ['💰', 'Get 3+ Bids', 'Foundation repair pricing varies 2–3x for the same job. Never accept first bid.'],
  ['🔍', 'Ask About Lifetime Warranty', 'Most reputable companies offer transferable lifetime warranties. Confirm what voids it.'],
  ['⚠️', 'Understand the Conflict of Interest', 'Foundation companies profit from larger jobs. An independent engineer\’s diagnosis is always more trustworthy for scope of work.'],
  ['📅', 'Timing Matters', 'Avoid repairs in peak summer drought — soil is too dry and compressed. Fall/winter often better for pier placement.'],
];

export default function DFWFoundationMarketGuide() {
  const [submarket, setSubmarket] = useState('');
  const [showChecklist, setShowChecklist] = useState(false);

  const result = submarket ? (marketBySubmarket[submarket] || fallbackMarket) : null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW MARKET GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏗️ DFW Foundation Repair Market</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>DFW sits on some of the most expansive clay soil in the country. Foundation movement is extremely common — and so are foundation companies eager to sell you more repair than you need. This guide helps you navigate the market smartly.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[['🧱', 'Quality Varies Dramatically', 'DFW has 100+ foundation companies. Fewer than 30% have strong long-term track records.'], ['⚖️', 'Conflict of Interest', 'Foundation companies diagnose AND repair. Always get an independent engineer first.'], ['💧', 'Prevention is Cheap', 'Proper drainage and consistent irrigation prevent 60–70% of DFW foundation movement.']].map(([icon, title, desc]) => (
            <div key={String(title)} style={{ backgroundColor: '#112240', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📍 Your Submarket Conditions</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Select DFW Submarket</label>
            <select value={submarket} onChange={e => setSubmarket(e.target.value)} style={{ width: '100%', backgroundColor: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Choose your area...</option>
              {submarkets.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 600 }}>Demand Level: </span>{result.demand}</div>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 600 }}>Market: </span><span style={{ color: '#e2e8f0' }}>{result.companies}</span></div>
              <div style={{ marginBottom: 10 }}><span style={{ color: '#F5E642', fontWeight: 600 }}>Typical Cost: </span><span style={{ color: '#e2e8f0' }}>{result.price}</span></div>
              <div style={{ backgroundColor: '#1a2f4e', borderRadius: 8, padding: 10, fontSize: 13, color: '#94a3b8' }}>🌍 Soil Note: {result.soilNote}</div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#112240', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showChecklist ? 16 : 0, cursor: 'pointer' }} onClick={() => setShowChecklist(!showChecklist)}>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>✅ Vetting Checklist for Foundation Companies</h2>
            <span style={{ color: '#F5E642', fontSize: 20 }}>{showChecklist ? '▲' : '▼'}</span>
          </div>
          {showChecklist && vettingChecklist.map(([icon, title, desc]) => (
            <div key={String(title)} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 8 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{icon} {title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 18, marginBottom: 6 }}>Get Matched With a Vetted DFW Foundation Pro</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginBottom: 12 }}>ProLnk pre-screens foundation contractors for licensing, insurance, and customer reviews.</div>
          <div style={{ backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 700, padding: '10px 24px', borderRadius: 8, display: 'inline-block' }}>Join ProLnk Waitlist →</div>
        </div>
      </div>
    </div>
  );
}
