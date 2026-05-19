import { useState } from 'react';

const pantryTypes = [
  { type: 'Walk-In Pantry', sqft: '20–60 sq ft', shelvingCost: '800–3,000', features: 'Full built-in shelving, pull-out drawers, dedicated zones' },
  { type: "Butler's Pantry", sqft: '30–80 sq ft', shelvingCost: '1,500–6,000', features: 'Counter space, upper cabinets, prep area — DFW luxury standard' },
  { type: 'Cabinet Pantry', sqft: '8–15 sq ft', shelvingCost: '400–1,200', features: 'Swing-out door shelving, rollout trays, vertical space optimization' },
  { type: 'Reach-In Pantry', sqft: '10–20 sq ft', shelvingCost: '300–900', features: 'Wire or solid shelving, door organizers, lazy susans' },
];

const heatTips = [
  { item: 'Olive / vegetable oils', tip: 'Go rancid 2x faster above 75°F — store in cool cabinet away from stove' },
  { item: 'Whole grains / flour', tip: 'Attract pests in Texas humidity — store in airtight containers' },
  { item: 'Chocolate / candy', tip: 'Melts and blooms — keep in AC area, not near exterior walls' },
  { item: 'Spices', tip: 'Lose potency 50% faster in heat — avoid cabinets above stove or near windows' },
  { item: 'Canned goods', tip: 'Safe up to 100°F but BPA leaches faster in heat — rotate stock annually' },
];

export default function DFWPantryOrganizationGuide() {
  const [pantrySize, setPantrySize] = useState('');
  const [household, setHousehold] = useState('4');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<{ rec: string; shelving: string; tip: string } | null>(null);

  function calculate() {
    const sqft = parseFloat(pantrySize);
    const ppl = parseInt(household);
    const b = parseFloat(budget);
    if (!sqft || !b) return;

    let rec = '', shelving = '', tip = '';
    if (sqft >= 30) { rec = "Butler's or Walk-In with full built-ins"; shelving = '$1,200–4,000'; }
    else if (sqft >= 15) { rec = 'Walk-In with adjustable shelving'; shelving = '$600–1,800'; }
    else { rec = 'Reach-In with door organizers + rollout trays'; shelving = '$200–700'; }

    if (ppl >= 5) tip = 'Large household: dedicate a full shelf to Costco/Sam\’s bulk bins (gallon containers, airtight lids essential in DFW humidity)';
    else tip = 'Install a dehumidifier pack or rechargeable Eva-Dry unit in pantry — DFW humidity destroys dry goods fast';

    setResult({ rec, shelving, tip });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME ORGANIZATION</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Pantry Organization Guide — Dallas-Fort Worth 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32, maxWidth: 680 }}>DFW households are heavy Costco and Sam's Club shoppers — pantries need to handle bulk storage. Texas heat also accelerates spoilage of oils, spices, and grains.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 40 }}>
          {pantryTypes.map(p => (
            <div key={p.type} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{p.type}</div>
              <div style={{ color: '#64748b', fontSize: 12, marginBottom: 8 }}>Typical size: {p.sqft}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 10 }}>{p.features}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: '#64748b' }}>Shelving cost</span>
                <span style={{ color: '#fff' }}>${p.shelvingCost}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a1000', border: '1px solid #854d0e', borderRadius: 12, padding: 24, marginBottom: 40 }}>
          <h3 style={{ color: '#fbbf24', marginBottom: 16 }}>🌡️ DFW Heat & Humidity: Pantry Food Safety</h3>
          {heatTips.map(h => (
            <div key={h.item} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #1c1005′ }}>
              <div style={{ color: '#f59e0b', fontWeight: 600, minWidth: 160, fontSize: 13 }}>{h.item}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{h.tip}</div>
            </div>
          ))}
          <div style={{ marginTop: 16, color: '#94a3b8', fontSize: 13 }}>🛒 <strong style={{ color: '#fbbf24′ }}>Bulk buyer tip:</strong> Costco hauls need dedicated zones — label bins by category (baking, grains, snacks, canned) and rotate FIFO.</div>
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🧮 Pantry System Recommender</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Pantry sq footage</label>
              <input value={pantrySize} onChange={e => setPantrySize(e.target.value)} type="number" placeholder="e.g. 25″ style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Household size</label>
              <select value={household} onChange={e => setHousehold(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }}>
                <option value="2″>1–2 people</option>
                <option value="4″>3–4 people</option>
                <option value="6″>5–6 people</option>
                <option value="8″>7+ people</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Budget ($)</label>
              <input value={budget} onChange={e => setBudget(e.target.value)} type="number" placeholder="e.g. 1200″ style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Get Recommendation →</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>✅ {result.rec}</div>
              <div style={{ color: '#fff', fontSize: 14, marginBottom: 6 }}>Estimated shelving cost: <strong>{result.shelving}</strong></div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>💡 {result.tip}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 12 }}>📦 Bulk Storage Essentials for DFW Homes</h3>
          <ul style={{ color: '#94a3b8', lineHeight: 1.8, paddingLeft: 20, fontSize: 14 }}>
            <li>Airtight OXO or Cambro containers prevent moisture and pest intrusion — essential in DFW</li>
            <li>Lazy susans on shelves make corner pantry space accessible — Costco canned goods rotate easily</li>
            <li>Pull-out drawers add 40% more usable pantry space vs fixed shelves</li>
            <li>Label maker investment ($30–60) pays for itself in food waste reduction</li>
            <li>Secondary pantry shelf in laundry room or hallway closet extends bulk storage capacity</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
