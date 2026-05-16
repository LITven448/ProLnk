import { useState } from 'react';

const comparisons = [
  { category: '🏗️ Home Age & Condition', newDev: 'Brand new, builder warranty, modern layout', established: '15-40 yr homes, potential deferred maintenance, character' },
  { category: '🌳 Tree Canopy', newDev: 'Sparse — 10-20 years to mature canopy', established: 'Rich, established trees. Huge quality-of-life difference' },
  { category: '🏫 Schools', newDev: 'New campuses, growing enrollment, newer teachers', established: 'Proven track records, state rankings locked in' },
  { category: '💸 MUD Taxes', newDev: 'Extra $100-300/mo in Municipal Utility District fees', established: 'No MUD tax — just standard property tax' },
  { category: '🛒 Retail & Amenities', newDev: 'Under construction — 5-10 yr lag for grocery, restaurants', established: 'Full retail ecosystem already in place' },
  { category: '📈 Appreciation', newDev: 'Higher upside if area is hot; more risk', established: 'Steadier, more predictable appreciation' },
];

const newAreas = ['Prosper', 'Celina', 'Anna', 'Gunter', 'Fate', 'Midlothian'];
const establishedAreas = ['Richardson', 'Carrollton', 'Plano (west)', 'Allen', 'Coppell', 'Colleyville'];

const priorityMap: Record<string, { verdict: string; reason: string }> = {
  schools: { verdict: '🏫 Established Wins', reason: "Carroll ISD, Richardson ISD, and Plano ISD have proven track records that new campuses are still building. If schools are your top priority, established areas in DFW deliver certainty." },
  commute: { verdict: '📍 Location Dependent', reason: "New developments like Prosper and Celina add 15–30 min to downtown Dallas commutes. If you work in Frisco or Legacy corridor, new areas pencil. If downtown, established wins." },
  value: { verdict: '🏗️ New Development Wins', reason: "New homes in Celina and Anna offer 15–25% more sq ft per dollar vs established DFW suburbs. You sacrifice trees and amenities, but the square footage value is real." },
  community: { verdict: '🌳 Established Wins', reason: "Established DFW neighborhoods have density, walkability, and formed community networks. New master-planned communities take a decade to develop genuine neighborhood character." },
  appreciation: { verdict: '📈 New Development Potential', reason: "If you're buying in a growth corridor early (like Celina in 2021), upside is real. But so is risk — appreciation in new areas is more volatile than established DFW submarkets." },
};

export default function DFWNewVsEstablishedNeighborhood() {
  const [priority, setPriority] = useState('');
  const [result, setResult] = useState<null | typeof priorityMap.schools>(null);

  function analyze() {
    if (!priority || !priorityMap[priority]) return;
    setResult(priorityMap[priority]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'Georgia, serif', color: '#fff' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '6px 16px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 20 }}>DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>New vs. Established<br />DFW Neighborhoods</h1>
        <p style={{ fontSize: 18, color: '#aaa', marginBottom: 40, lineHeight: 1.7 }}>Prosper or Richardson? Celina or Carrollton? The DFW market offers both aggressively — here's how to choose based on what actually matters to your life.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 48 }}>
          <div style={{ background: 'rgba(245,230,66,0.06)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 18 }}>🏗️ New Development Areas</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {newAreas.map((a, i) => <span key={i} style={{ background: 'rgba(245,230,66,0.1)', color: '#F5E642', padding: '4px 12px', borderRadius: 20, fontSize: 14 }}>{a}</span>)}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#60a5fa', marginBottom: 12, fontSize: 18 }}>🌳 Established Areas</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {establishedAreas.map((a, i) => <span key={i} style={{ background: 'rgba(96,165,250,0.1)', color: '#60a5fa', padding: '4px 12px', borderRadius: 20, fontSize: 14 }}>{a}</span>)}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, color: '#F5E642', marginBottom: 20 }}>⚖️ Side-by-Side Comparison</h2>
          <div style={{ display: 'grid', gap: 2 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px 16px', fontWeight: 700, color: '#888', fontSize: 13 }}>CATEGORY</div>
              <div style={{ background: 'rgba(245,230,66,0.08)', padding: '12px 16px', fontWeight: 700, color: '#F5E642', fontSize: 13 }}>NEW DEVELOPMENT</div>
              <div style={{ background: 'rgba(96,165,250,0.08)', padding: '12px 16px', fontWeight: 700, color: '#60a5fa', fontSize: 13 }}>ESTABLISHED</div>
            </div>
            {comparisons.map((c, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px 16px', fontSize: 14, color: '#ccc' }}>{c.category}</div>
                <div style={{ background: 'rgba(245,230,66,0.04)', padding: '14px 16px', fontSize: 14, color: '#aaa', lineHeight: 1.5 }}>{c.newDev}</div>
                <div style={{ background: 'rgba(96,165,250,0.04)', padding: '14px 16px', fontSize: 14, color: '#aaa', lineHeight: 1.5 }}>{c.established}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', border: '2px solid #F5E642', borderRadius: 12, padding: 32 }}>
          <h2 style={{ fontSize: 22, color: '#F5E642', marginBottom: 8 }}>🎯 What Matters Most to You?</h2>
          <p style={{ color: '#888', marginBottom: 24 }}>Your top priority determines the answer for your DFW search.</p>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, color: '#aaa', display: 'block', marginBottom: 8 }}>My top priority is:</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} style={{ width: '100%', maxWidth: 320, padding: '12px 16px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, fontSize: 15, color: '#fff', boxSizing: 'border-box' }}>
              <option value="">Select a priority...</option>
              <option value="schools">🏫 School quality</option>
              <option value="commute">🚗 Commute / location</option>
              <option value="value">💰 Value per sq ft</option>
              <option value="community">🌳 Neighborhood character</option>
              <option value="appreciation">📈 Appreciation potential</option>
            </select>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 28px', borderRadius: 6, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get My Recommendation</button>
          {result && (
            <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: 24 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>{result.verdict}</div>
              <div style={{ color: '#ccc', lineHeight: 1.7 }}>{result.reason}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
