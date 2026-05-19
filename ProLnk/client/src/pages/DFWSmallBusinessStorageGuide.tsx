import { useState } from 'react';

type StorageOption = { name: string; cost: string; climate: boolean; scalable: boolean; pros: string[]; cons: string[] };

const storageOptions: StorageOption[] = [
  { name: 'Garage Conversion', cost: '$2,000–8,000 one-time', climate: false, scalable: false, pros: ['No monthly cost', 'Immediate access', 'Tax deductible as home office'], cons: ['Limited space (avg 400 sq ft)', 'No climate control standard', 'Loses vehicle storage'] },
  { name: 'Climate-Controlled Storage Unit', cost: '$120–350/mo (DFW avg)', climate: true, scalable: true, pros: ['Protect from DFW heat (115°F summers)', 'Month-to-month flexibility', 'No long-term commitment'], cons: ['No 24/7 access at all facilities', 'Can\’t run business operations from unit', 'Costs add up over time'] },
  { name: 'Standard Storage Unit', cost: '$60–150/mo (DFW avg)', climate: false, scalable: true, pros: ['Lower cost', 'Available everywhere in DFW', 'Flexible sizing'], cons: ['Not safe for heat-sensitive products', 'DFW summers regularly exceed 105°F', 'No work space'] },
  { name: 'Portable Storage Container (PODS)', cost: '$150–250/mo delivered', climate: false, scalable: false, pros: ['Delivered to your home', 'Move it when you relocate', 'Ground-level loading'], cons: ['HOA may prohibit', 'No climate control', 'City placement rules apply'] },
  { name: 'Small Warehouse / Flex Space', cost: '$600–2,000/mo (DFW)', climate: true, scalable: true, pros: ['Operate full business from space', 'Loading dock options', 'Grow without moving'], cons: ['12-month leases common', 'Higher upfront cost', 'DFW industrial rents rising fast'] },
];

function recommend(volume: string, climate: string, budget: string): StorageOption[] {
  return storageOptions.filter(opt => {
    if (climate === 'Yes' && !opt.climate) return false;
    if (budget === 'Under $200/mo' && opt.name === 'Small Warehouse / Flex Space') return false;
    if (budget === 'Free / One-Time' && opt.name !== 'Garage Conversion') return false;
    if (volume === 'Large (pallets/bulk)' && opt.name === 'Garage Conversion') return false;
    return true;
  }).slice(0, 3);
}

export default function DFWSmallBusinessStorageGuide() {
  const [volume, setVolume] = useState('Small (fits in a closet)');
  const [climate, setClimate] = useState('No');
  const [budget, setBudget] = useState('Under $200/mo');
  const recs = recommend(volume, climate, budget);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'Inter, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 12, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 2 }}>DFW SMALL BUSINESS GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, color: '#fff' }}>Storage Solutions for DFW Home Businesses</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>From garage conversion to warehouse space — find the right fit as your business grows.</p>

        <div style={{ background: '#1A0A0A', border: '1px solid #7F1D1D', borderRadius: 12, padding: 20, marginBottom: 40, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 24 }}>🌡️</span>
          <div>
            <div style={{ fontWeight: 700, color: '#FCA5A5', marginBottom: 4 }}>DFW Climate Warning</div>
            <div style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>DFW summer temperatures regularly exceed 105°F and storage units without climate control can reach 130–140°F inside. Electronics, cosmetics, candles, chocolates, and many adhesives will be destroyed. If your inventory is heat-sensitive, climate-controlled storage is not optional.</div>
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>📦 All Storage Options Compared</h2>
          {storageOptions.map(opt => (
            <div key={opt.name} style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17 }}>{opt.name}</div>
                  <div style={{ color: '#F5E642', fontSize: 14, marginTop: 2 }}>{opt.cost}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {opt.climate && <span style={{ background: '#1E3A5F', color: '#93C5FD', fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>❄️ CLIMATE</span>}
                  {opt.scalable && <span style={{ background: '#14532D', color: '#86EFAC', fontSize: 11, padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>📈 SCALABLE</span>}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  {opt.pros.map(p => <div key={p} style={{ fontSize: 13, color: '#86EFAC', marginBottom: 4 }}>✓ {p}</div>)}
                </div>
                <div>
                  {opt.cons.map(c => <div key={c} style={{ fontSize: 13, color: '#FCA5A5', marginBottom: 4 }}>✗ {c}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 24 }}>🔍 Storage Recommendation Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
            <div>
              <label style={{ fontSize: 12, color: '#64748B', display: 'block', marginBottom: 6 }}>INVENTORY VOLUME</label>
              <select value={volume} onChange={e => setVolume(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E2D45', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                {['Small (fits in a closet)', 'Medium (fills a room)', 'Large (pallets/bulk)'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#64748B', display: 'block', marginBottom: 6 }}>CLIMATE SENSITIVE?</label>
              <select value={climate} onChange={e => setClimate(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E2D45', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                {['No', 'Yes'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#64748B', display: 'block', marginBottom: 6 }}>MONTHLY BUDGET</label>
              <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E2D45', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                {['Free / One-Time', 'Under $200/mo', '$200–600/mo', '$600+/mo'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13, color: '#64748B', marginBottom: 12 }}>RECOMMENDED OPTIONS ({recs.length})</div>
            {recs.length === 0 ? (
              <div style={{ color: '#FCA5A5', fontSize: 14 }}>No perfect match — consider increasing your budget or exploring warehouse space.</div>
            ) : recs.map(r => (
              <div key={r.name} style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginBottom: 10, borderLeft: '3px solid #F5E642′ }}>
                <div style={{ fontWeight: 700 }}>{r.name}</div>
                <div style={{ color: '#F5E642', fontSize: 13, marginTop: 2 }}>{r.cost}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
