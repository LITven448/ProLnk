import { useState } from 'react';

export default function DFWKitchenCabinetCosts2026() {
  const [budgetLevel, setBudgetLevel] = useState('semicustom');

  const options: Record<string, { label: string; range: string; leadTime: string; pros: string[]; cons: string[] }> = {
    stock: {
      label: 'Stock Cabinets',
      range: '$3,000 – $7,000 (materials only)',
      leadTime: '1–2 weeks',
      pros: ['In-stock at Home Depot / Lowe’s', 'Fastest install', 'Budget-friendly entry point'],
      cons: ['Limited sizes & finishes', 'Lower quality box construction', 'No custom configurations'],
    },
    ikea: {
      label: 'IKEA SEKTION (Hack)',
      range: '$4,000 – $8,000 (all-in with install)',
      leadTime: '2–3 weeks',
      pros: ['Stylish door fronts (SEMIHANDMADE, Kokeena)', 'Strong box warranty', 'Great value per dollar'],
      cons: ['Requires experienced installer', 'Non-standard ceiling heights tricky', 'Limited depth options'],
    },
    semicustom: {
      label: 'Semi-Custom Cabinets',
      range: '$8,000 – $20,000 (materials only)',
      leadTime: '4–8 weeks',
      pros: ['More size & finish options', 'Better construction quality', 'Mid-range sweet spot'],
      cons: ['Longer wait time', 'Premium brands add up fast', 'Still limited configurations'],
    },
    custom: {
      label: 'Full Custom Cabinets',
      range: '$20,000 – $50,000+',
      leadTime: '8–16 weeks',
      pros: ['Any size, finish, layout', 'Built for your exact space', 'Highest quality & longevity'],
      cons: ['Longest lead time', 'Highest cost', 'Requires experienced kitchen designer'],
    },
  };

  const opt = options[budgetLevel];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'sans-serif', color: '#E8EAF0' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>DFW Home Cost Guide 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: '#FFFFFF', margin: '0 0 8px' }}>🍳 Kitchen Cabinet Cost Guide</h1>
        <p style={{ color: '#8892A4', fontSize: 15, marginBottom: 32 }}>Compare all four DFW cabinet options by cost, lead time, and trade-offs — 2026 pricing.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24 }}>
          {['stock', 'ikea', 'semicustom', 'custom'].map((t) => (
            <button key={t} onClick={() => setBudgetLevel(t)} style={{ padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12, background: budgetLevel === t ? '#F5E642' : '#111D33', color: budgetLevel === t ? '#0A1628' : '#8892A4' }}>
              {options[t].label}
            </button>
          ))}
        </div>

        <div style={{ background: '#111D33', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: '#8892A4', marginBottom: 4 }}>{opt.label}</div>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>{opt.range}</div>
          <div style={{ fontSize: 13, color: '#8892A4', marginBottom: 20 }}>⏱️ Lead Time: <span style={{ color: '#FFFFFF' }}>{opt.leadTime}</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ color: '#4ADE80', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>✅ Pros</div>
              {opt.pros.map((p) => <div key={p} style={{ fontSize: 13, color: '#C8D0DC', marginBottom: 6 }}>• {p}</div>)}
            </div>
            <div>
              <div style={{ color: '#F87171', fontWeight: 700, fontSize: 13, marginBottom: 8 }}>❌ Cons</div>
              {opt.cons.map((c) => <div key={c} style={{ fontSize: 13, color: '#C8D0DC', marginBottom: 6 }}>• {c}</div>)}
            </div>
          </div>
        </div>

        <div style={{ background: '#111D33', borderRadius: 12, padding: 20, border: '1px solid #1E2D45' }}>
          <p style={{ fontSize: 13, color: '#8892A4', margin: 0 }}>💡 <strong style={{ color: '#FFFFFF' }}>ProLnk Tip:</strong> Kitchen remodels return 60–80% at resale in DFW. Get 3 bids from ProLnk's verified kitchen contractors before committing to materials.</p>
        </div>
      </div>
    </div>
  );
}
