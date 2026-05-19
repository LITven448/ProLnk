import { useState } from 'react';

const sizeOptions = [
  { range: 'Under 1,500 sq ft', label: 'Small', areas: 'Coppell condos, Dallas urban infill, Richardson townhomes' },
  { range: '1,500–2,500 sq ft', label: 'Mid', areas: 'Plano, Garland, Carrollton, Irving — solid family neighborhoods' },
  { range: '2,500–3,500 sq ft', label: 'Large', areas: 'Frisco, McKinney, Allen, Flower Mound — suburban sweet spot' },
  { range: '3,500+ sq ft', label: 'XL', areas: 'Prosper, Southlake, Westlake, Trophy Club — premium space' },
];

const lifeSituations = [
  { key: 'empty_nester', label: '🪺 Empty Nester', advice: "You're likely over-housed. DFW's 55+ communities in Frisco, Little Elm, and Denton offer lock-and-leave living with community amenities. Right-sizing frees equity for retirement.", direction: 'down' },
  { key: 'growing', label: '👨‍👩‍👧‍👦 Growing Family', advice: "DFW's top school districts cluster in Frisco ISD, Prosper ISD, and Carroll ISD (Southlake). Moving up now, before your kids hit middle school, locks in school quality and neighborhood stability.", direction: 'up' },
  { key: 'couple', label: '💑 Couple / No Kids', advice: "Walkability and commute efficiency matter most. Uptown Dallas, Bishop Arts, and Deep Ellum offer urban lifestyle. Coppell and Colleyville offer suburban quiet for couples who want space without sprawl.", direction: 'neutral' },
  { key: 'wfh', label: '💻 Work from Home', advice: "You need dedicated office space. DFW's outer ring (Celina, Anna, Gunter) offers larger homes at lower price per sq ft — room for an office without downtown proximity trade-off.", direction: 'up' },
];

const dfwCosts = [
  { from: 'XL → Mid', equity: 'Release $150K–$400K', monthly: 'Save $800–$2,200/mo' },
  { from: 'Small → Mid', equity: 'Deploy $80K–$180K', monthly: 'Add $600–$1,400/mo' },
  { from: 'Mid → Large', equity: 'Deploy $100K–$220K', monthly: 'Add $700–$1,600/mo' },
];

export default function DFWRightSizingGuide() {
  const [currentSqft, setCurrentSqft] = useState('');
  const [situation, setSituation] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<null | typeof lifeSituations[0]>(null);

  function analyze() {
    const sq = parseFloat(currentSqft) || 0;
    const sit = lifeSituations.find(s => s.key === situation);
    if (!sq || !sit || !budget) return;
    setResult(sit);
  }

  return (
    <div style={{ background: '#F8F6F0', minHeight: '100vh', fontFamily: 'Georgia, serif', color: '#1a1a1a' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ background: '#0A1628', color: '#F5E642', display: 'inline-block', padding: '6px 16px', borderRadius: 4, fontSize: 13, marginBottom: 20 }}>DFW HOMEOWNER GUIDE</div>
        <h1 style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>Right-Sizing Your<br />DFW Home</h1>
        <p style={{ fontSize: 18, color: '#444', marginBottom: 40, lineHeight: 1.7 }}>Too much home is as costly as too little. Here's how to evaluate whether your current home still fits your life — and what the DFW market offers at every size level.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 48 }}>
          {sizeOptions.map((s, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: 22 }}>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>{s.range}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontSize: 14, color: '#555', lineHeight: 1.6 }}>📍 {s.areas}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: 32, marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, color: '#F5E642', marginBottom: 20 }}>💰 Cost of Right-Sizing in DFW</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {dfwCosts.map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: 18, textAlign: 'center' }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>{c.from}</div>
                <div style={{ color: '#aaa', fontSize: 14, marginBottom: 4 }}>{c.equity}</div>
                <div style={{ color: '#aaa', fontSize: 14 }}>{c.monthly}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, color: '#0A1628', marginBottom: 20 }}>🧭 Life Stage + Right-Sizing</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {lifeSituations.map((s, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, padding: 22 }}>
                <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{s.label}</div>
                <div style={{ color: '#555', lineHeight: 1.7 }}>{s.advice}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', border: '2px solid #F5E642', borderRadius: 12, padding: 32 }}>
          <h2 style={{ fontSize: 22, color: '#0A1628', marginBottom: 8 }}>🎯 Your Right-Sizing Recommendation</h2>
          <p style={{ color: '#666', marginBottom: 24 }}>Tell us about your situation and we'll give you a DFW-specific recommendation.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#555', display: 'block', marginBottom: 6 }}>Current Home Size (sq ft)</label>
              <input value={currentSqft} onChange={e => setCurrentSqft(e.target.value)} placeholder="e.g. 2800″ style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#555', display: 'block', marginBottom: 6 }}>Life Situation</label>
              <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box' }}>
                <option value="">Select...</option>
                {lifeSituations.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#555', display: 'block', marginBottom: 6 }}>Move Budget ($)</label>
              <input value={budget} onChange={e => setBudget(e.target.value)} placeholder="e.g. 500000″ style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 6, fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '12px 28px', borderRadius: 6, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>Get My Recommendation</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 8, padding: 24 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>{result.label}</div>
              <div style={{ color: '#ccc', lineHeight: 1.7 }}>{result.advice}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
