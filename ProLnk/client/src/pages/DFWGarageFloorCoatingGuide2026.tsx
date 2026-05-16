import { useState } from 'react';

const coatingData = {
  polyurea: {
    name: 'Polyurea',
    cost: '$3.50–$6.00/sq ft professional',
    diy: '$1.20–$2.00/sq ft DIY kit',
    cure: '24 hours',
    life: '15–25 years',
    pros: ['Hot tire pickup resistant', 'UV stable', 'Flexible — won\'t crack in DFW heat cycles', 'Fast cure'],
    cons: ['Higher cost than epoxy', 'Requires surface prep'],
    dfwNote: 'Now the DFW standard. Solved the hot tire pickup problem that plagued epoxy.',
  },
  epoxy: {
    name: 'Epoxy',
    cost: '$2.50–$4.50/sq ft professional',
    diy: '$0.80–$1.50/sq ft DIY kit',
    cure: '72 hours',
    life: '5–10 years',
    pros: ['Lower upfront cost', 'Widely available', 'Looks great initially'],
    cons: ['Hot tire pickup in DFW summers', 'UV yellowing outdoors', 'Peels in DFW humidity', 'Long cure time'],
    dfwNote: 'Struggles in DFW. Hot summer temps cause tires to peel it up. Not recommended for DFW garages.',
  },
  polyaspartic: {
    name: 'Polyaspartic',
    cost: '$4.00–$7.00/sq ft professional',
    diy: 'Not recommended for DIY',
    cure: '4–6 hours',
    life: '15–20 years',
    pros: ['Fastest cure', 'UV resistant', 'Hot tire resistant', 'Can apply in cold temps'],
    cons: ['Most expensive', 'Difficult DIY — short pot life'],
    dfwNote: 'Premium DFW choice. One-day installs possible. Used by high-end DFW contractors.',
  },
  concrete_stain: {
    name: 'Concrete Stain',
    cost: '$1.50–$3.00/sq ft professional',
    diy: '$0.50–$1.00/sq ft',
    cure: '48 hours',
    life: '3–7 years',
    pros: ['Decorative look', 'Lowest cost', 'Easy DIY'],
    cons: ['No protection from oil/chemicals', 'Slippery when wet', 'Not durable under DFW use'],
    dfwNote: 'Fine for low-traffic garages. Needs sealer topcoat for any DFW durability.',
  },
};

const recommendations: Record<string, Record<string, string>> = {
  daily_driver: {
    budget: 'polyurea',
    mid: 'polyurea',
    premium: 'polyaspartic',
  },
  workshop: {
    budget: 'epoxy',
    mid: 'polyurea',
    premium: 'polyaspartic',
  },
  showroom: {
    budget: 'polyurea',
    mid: 'polyaspartic',
    premium: 'polyaspartic',
  },
  storage: {
    budget: 'concrete_stain',
    mid: 'epoxy',
    premium: 'polyurea',
  },
};

export default function DFWGarageFloorCoatingGuide2026() {
  const [use, setUse] = useState('');
  const [budget, setBudget] = useState('');
  const [sqft, setSqft] = useState('500');
  const [result, setResult] = useState<null | { coating: typeof coatingData.polyurea; key: string }>(null);

  function calculate() {
    if (!use || !budget) return;
    const key = recommendations[use]?.[budget] ?? 'polyurea';
    setResult({ coating: coatingData[key as keyof typeof coatingData], key });
  }

  const proMin = result ? parseFloat(result.coating.cost.split('$')[1]) * parseInt(sqft) : 0;
  const diyMin = result && result.coating.diy !== 'Not recommended for DIY'
    ? parseFloat(result.coating.diy.split('$')[1]) * parseInt(sqft) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>
          🏠 DFW Garage Floor Coating Guide 2026
        </h1>
        <p style={{ color: '#94A3B8', margin: '0 0 28px', lineHeight: 1.6 }}>
          Polyurea is now the DFW standard — the hot tire pickup problem that made epoxy peel in Texas summers is solved. Here's your 2026 update.
        </p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '14px 18px', marginBottom: 28, fontWeight: 700, fontSize: 14 }}>
          ⚡ 2026 Update: DIY polyurea kits are now widely available at Home Depot and online. Professional-grade results at 40% of the cost.
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Get Your DFW Recommendation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>GARAGE USE</label>
            <select value={use} onChange={e => setUse(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1E2D45', border: '1px solid #2D4060', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Select use...</option>
              <option value="daily_driver">Daily Driver Parking</option>
              <option value="workshop">Workshop / Hobby Garage</option>
              <option value="showroom">Showroom / Man Cave</option>
              <option value="storage">Storage Only</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>BUDGET PRIORITY</label>
            <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1E2D45', border: '1px solid #2D4060', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Select budget...</option>
              <option value="budget">Budget-Focused</option>
              <option value="mid">Mid-Range</option>
              <option value="premium">Premium / Best</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>GARAGE SIZE (sq ft)</label>
          <input type="number" value={sqft} onChange={e => setSqft(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1E2D45', border: '1px solid #2D4060', borderRadius: 8, color: '#E8EDF5', fontSize: 14, boxSizing: 'border-box' }} />
        </div>
        <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 28 }}>
          Get Recommendation →
        </button>

        {result && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 28, border: '2px solid #F5E642' }}>
            <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>RECOMMENDED FOR YOUR DFW GARAGE</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 4px' }}>{result.coating.name}</h3>
            <p style={{ color: '#94A3B8', margin: '0 0 16px', fontSize: 13 }}>{result.coating.dfwNote}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>PROFESSIONAL COST</div>
                <div style={{ fontWeight: 700 }}>{result.coating.cost}</div>
                <div style={{ color: '#F5E642', fontSize: 13, marginTop: 4 }}>~${Math.round(proMin).toLocaleString()} for {sqft} sq ft</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>DIY KIT COST</div>
                <div style={{ fontWeight: 700 }}>{result.coating.diy}</div>
                {diyMin && <div style={{ color: '#F5E642', fontSize: 13, marginTop: 4 }}>~${Math.round(diyMin).toLocaleString()} for {sqft} sq ft</div>}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 6 }}>✅ PROS</div>{result.coating.pros.map(p => <div key={p} style={{ fontSize: 13, marginBottom: 3 }}>• {p}</div>)}</div>
              <div><div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 6 }}>⚠️ CONS</div>{result.coating.cons.map(c => <div key={c} style={{ fontSize: 13, marginBottom: 3 }}>• {c}</div>)}</div>
            </div>
            <div style={{ marginTop: 16, padding: '12px 16px', background: '#0A1628', borderRadius: 8, fontSize: 13, color: '#94A3B8' }}>
              ⏱ Cure time: <strong style={{ color: '#E8EDF5' }}>{result.coating.cure}</strong> &nbsp;|&nbsp; Expected life: <strong style={{ color: '#E8EDF5' }}>{result.coating.life}</strong>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📊 2026 DFW Cost Comparison</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          {Object.values(coatingData).map(c => (
            <div key={c.name} style={{ background: '#1E2D45', borderRadius: 10, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{c.life} lifespan</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>Pro: {c.cost}</div>
                <div style={{ color: '#94A3B8', fontSize: 12 }}>DIY: {c.diy}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
