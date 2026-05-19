import { useState } from 'react';

const stepUpNeighborhoods = [
  { from: 'Garland / Mesquite', to: 'Rowlett / Wylie', why: 'Same commute corridor, newer stock, better schools, +15-20% premium' },
  { from: 'Irving / Grand Prairie', to: 'Coppell / Flower Mound', why: "Coppell ISD is elite, Flower Mound is quiet — both hold value extraordinarily well" },
  { from: 'North Dallas / Farmers Branch', to: 'Plano / Allen', why: 'Plano ISD reputation and Allen amenities without Frisco price tags' },
  { from: 'Denton / Lewisville', to: 'Flower Mound / Highland Village', why: 'Premium lake-adjacent living with established trees and stronger appreciation' },
  { from: 'Fort Worth south', to: 'Burleson / Mansfield', why: 'Fast-growing with excellent schools; equity from starter Fort Worth home funds it comfortably' },
];

const appreciationZones = [
  { zone: 'Prosper / Celina', tier: 'High Growth', note: 'New development, top schools, but MUD tax exposure' },
  { zone: 'Frisco / McKinney', tier: 'Established Premium', note: 'Peak desirability; appreciation moderating but rock-solid fundamentals' },
  { zone: 'Southlake / Colleyville', tier: 'Legacy Prestige', note: 'Carroll ISD, ultra-low turnover, wealth concentration' },
  { zone: 'Allen / Murphy', tier: 'Best Value Premium', note: 'Strong schools, value relative to Frisco, still appreciating' },
];

export default function DFWUpgradingNeighborhoodGuide() {
  const [currentArea, setCurrentArea] = useState('');
  const [budget, setBudget] = useState('');
  const [equity, setEquity] = useState('');
  const [result, setResult] = useState<null | { match: typeof stepUpNeighborhoods[0]; downPct: string }>(null);

  function analyze() {
    const b = parseFloat(budget) || 0;
    const eq = parseFloat(equity) || 0;
    if (!currentArea || !b || !eq) return;
    const lower = currentArea.toLowerCase();
    const match = stepUpNeighborhoods.find(n => n.from.toLowerCase().includes(lower.split('/')[0].trim())) || stepUpNeighborhoods[0];
    const downPct = Math.round((eq / b) * 100).toString();
    setResult({ match, downPct });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'Georgia, serif', color: '#fff' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', display: 'inline-block', padding: '6px 16px', borderRadius: 4, fontSize: 13, fontWeight: 700, marginBottom: 20 }}>DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>Upgrading Your DFW<br />Neighborhood</h1>
        <p style={{ fontSize: 18, color: '#aaa', marginBottom: 40, lineHeight: 1.7 }}>Your starter DFW home built equity. Now it's time to put that equity to work and move up to a neighborhood that fits your next chapter — without overpaying.</p>

        <div style={{ background: 'rgba(245,230,66,0.08)', border: '1px solid rgba(245,230,66,0.3)', borderRadius: 12, padding: 28, marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, color: '#F5E642', marginBottom: 8 }}>📐 How the Upgrade Math Works</h2>
          <p style={{ color: '#aaa', lineHeight: 1.7, marginBottom: 16 }}>If your DFW starter home has appreciated 40% since purchase (common in 2018-2022 buyers), you're likely sitting on $80K–$200K in usable equity. That equity, combined with a conventional loan, can put you in a step-up neighborhood without stretching your budget.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[{ label: 'Starter Equity Used', val: '$100K down', sub: '20% on $500K home' }, { label: 'Monthly Delta', val: '+$600–900/mo', sub: 'vs. current PITI' }, { label: 'Appreciation Edge', val: '2–4% more/yr', sub: 'step-up vs. starter area' }].map((s, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: 18, textAlign: 'center' }}>
                <div style={{ color: '#888', fontSize: 12, marginBottom: 6 }}>{s.label}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{s.val}</div>
                <div style={{ color: '#666', fontSize: 12 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, color: '#F5E642', marginBottom: 20 }}>🗺️ Common DFW Upgrade Paths</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {stepUpNeighborhoods.map((n, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                  <span style={{ color: '#888', fontSize: 14 }}>{n.from}</span>
                  <span style={{ color: '#F5E642', fontSize: 18 }}>→</span>
                  <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>{n.to}</span>
                </div>
                <div style={{ color: '#aaa', fontSize: 14 }}>{n.why}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, color: '#F5E642', marginBottom: 20 }}>📊 DFW Premium Appreciation Zones</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {appreciationZones.map((z, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: 20 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{z.zone}</div>
                <div style={{ color: '#60a5fa', fontSize: 13, marginBottom: 8 }}>{z.tier}</div>
                <div style={{ color: '#aaa', fontSize: 14 }}>{z.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', border: '2px solid #F5E642', borderRadius: 12, padding: 32 }}>
          <h2 style={{ fontSize: 22, color: '#F5E642', marginBottom: 8 }}>🎯 Your DFW Upgrade Path</h2>
          <p style={{ color: '#888', marginBottom: 24 }}>Enter your situation and we'll map your best step-up neighborhoods.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#aaa', display: 'block', marginBottom: 6 }}>Current DFW Area</label>
              <input value={currentArea} onChange={e => setCurrentArea(e.target.value)} placeholder="e.g. Garland, Irving..." style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, fontSize: 15, color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#aaa', display: 'block', marginBottom: 6 }}>Target Home Budget ($)</label>
              <input value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. 550000" style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, fontSize: 15, color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#aaa', display: 'block', marginBottom: 6 }}>Available Equity ($)</label>
              <input value={equity} onChange={e => setEquity(e.target.value)} placeholder="e.g. 130000" style={{ width: '100%', padding: '10px 12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, fontSize: 15, color: '#fff', boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 28px', borderRadius: 6, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Find My Upgrade Path</button>
          {result && (
            <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: 24 }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🗺️ Recommended: {result.match.to}</div>
              <div style={{ color: '#ccc', lineHeight: 1.7, marginBottom: 12 }}>{result.match.why}</div>
              <div style={{ color: '#888', fontSize: 14 }}>Your {result.downPct}% down payment from equity positions you well. Closing costs of ~$20–30K should be budgeted separately from equity.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
