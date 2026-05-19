import { useState } from 'react';

type Brand = { name: string; startingAt: string; rating: string; best: string; notes: string };
const brands: Brand[] = [
  { name: '🏆 Bruno', startingAt: '$3,000', rating: '⭐⭐⭐⭐⭐', best: 'Best overall — made in USA', notes: 'Longest warranty, widest weight capacity options, great DFW dealer network' },
  { name: '🔵 Acorn', startingAt: '$2,500', rating: '⭐⭐⭐⭐', best: 'Budget-friendly, fast install', notes: 'UK brand, widely available, some limitations on heavy users or curved stairs' },
  { name: '⚪ Stannah', startingAt: '$3,500', rating: '⭐⭐⭐⭐⭐', best: 'Premium, curved stairs', notes: 'Best curved rail system, premium build quality, DFW dealers available' },
  { name: '🟢 Harmar', startingAt: '$2,800', rating: '⭐⭐⭐⭐', best: 'Outdoor / heavy duty', notes: 'Excellent for outdoor DFW use, weatherproof, strong weight capacity' },
];

const stairTypes = ['Straight staircase', 'Curved/spiral staircase', 'Outdoor stairs', 'Landing in middle'];
const weightOptions = ['Under 250 lbs', '250–300 lbs', '300–400 lbs', '400+ lbs (bariatric)'];
const budgetOptions = ['Under $3,500', '$3,500–$6,000', '$6,000–$10,000', '$10,000+'];

type Rec = { brand: string; type: string; cost: string; notes: string };
function getRecommendation(stair: string, weight: string, budget: string): Rec {
  if (stair === 'Curved/spiral staircase') return { brand: 'Stannah or Bruno', type: 'Custom curved rail', cost: '$8,000–$15,000', notes: 'Curved rails are custom-fabricated — budget and timeline both increase significantly.' };
  if (stair === 'Outdoor stairs') return { brand: 'Harmar Outdoor Series', type: 'Weatherproof outdoor lift', cost: '$4,000–$7,000', notes: 'DFW heat and humidity require weatherproof models — Harmar is the leader for outdoor installs.' };
  if (weight === '400+ lbs (bariatric)') return { brand: 'Bruno Elite Heavy Duty', type: 'Bariatric straight lift', cost: '$5,000–$8,000', notes: 'Standard lifts max out at 300–350 lbs. Bruno Elite handles up to 400+ with wider seat.' };
  if (budget === 'Under $3,500') return { brand: 'Acorn 130', type: 'Straight staircase lift', cost: '$2,500–$3,500', notes: 'Most affordable option — includes installation. Best for standard straight stairs.' };
  if (budget === '$3,500–$6,000') return { brand: 'Bruno Elan', type: 'Straight staircase lift', cost: '$3,000–$5,000', notes: 'Best value in this range — USA-made, 5-yr parts warranty, quiet DC motor.' };
  if (stair === 'Landing in middle') return { brand: 'Two Acorn 130 units', type: 'Two straight lifts with landing', cost: '$5,000–$7,000', notes: 'Landings require two separate units and a transfer seat at the landing point.' };
  return { brand: 'Bruno Elite or Stannah 600', type: 'Premium straight lift', cost: '$5,000–$9,000', notes: 'Full-featured with power swivel seat, remote control, and extended warranty.' };
}

export default function DFWStairLiftGuide() {
  const [stair, setStair] = useState('');
  const [weight, setWeight] = useState('');
  const [budget, setBudget] = useState('');
  const [rentMode, setRentMode] = useState<'buy' | 'rent'>('buy');

  const rec = stair && weight && budget ? getRecommendation(stair, weight, budget) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 14 }}>🪜 ProLnk DFW Accessibility Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Stair Lift Guide for DFW Homes</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          Compare brands, understand DFW-specific considerations (outdoor weather, power outages), and find the right lift for your staircase and budget.
        </p>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>⚡ Battery Backup — Critical for DFW</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>
            DFW experiences power outages from severe storms, ice events, and summer heat demand. All quality stair lifts include battery backup — but not all are equal.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { icon: '🔋', t: 'Standard Battery Backup', d: 'Operates 10–15 trips after power loss. Standard on most models.' },
              { icon: '🔋🔋', t: 'Extended Battery', d: 'Up to 40 trips. Recommended for DFW homes with frequent outages.' },
              { icon: '🌡️', t: 'Heat-Rated Electronics', d: 'DFW attic temps hit 150°F. Verify lift electronics are heat-rated.' },
              { icon: '💧', t: 'Humidity Protection', d: 'DFW humidity corrodes contacts. Ask about sealed motor compartments.' },
            ].map((f) => (
              <div key={f.t} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{f.t}</div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🛒 Buy vs. Rent</h2>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {(['buy', 'rent'] as const).map((m) => (
              <button key={m} onClick={() => setRentMode(m)}
                style={{ flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: 'pointer', background: rentMode === m ? '#F5E642' : '#0A1628', color: rentMode === m ? '#0A1628' : '#fff' }}>
                {m === 'buy' ? '🏠 Purchase' : '📅 Rent'}
              </button>
            ))}
          </div>
          {rentMode === 'buy' ? (
            <div style={{ color: '#94a3b8', fontSize: 14 }}>
              <strong style={{ color: '#fff' }}>Purchase (recommended if using 6+ months):</strong> $2,500–$10,000 upfront. Most insurers don't cover stair lifts. Resale value is 20–40% of purchase price. Warranty transfers to you — choose brands with 2+ yr warranties.
            </div>
          ) : (
            <div style={{ color: '#94a3b8', fontSize: 14 }}>
              <strong style={{ color: '#fff' }}>Rental (good for short-term recovery):</strong> $200–450/month. Some DFW dealers offer short-term rental for post-surgery recovery. Includes installation and removal. No resale hassle. Usually limited to straight-rail models.
            </div>
          )}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏷️ Brand Comparison</h2>
          {brands.map((b) => (
            <div key={b.name} style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
                <div style={{ fontWeight: 700 }}>{b.name}</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>Starting at {b.startingAt}</div>
              </div>
              <div style={{ fontSize: 13, marginBottom: 4 }}>{b.rating} — <span style={{ color: '#94a3b8' }}>{b.best}</span></div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{b.notes}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2744', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🎯 Get Your Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Stair Type</label>
              <select value={stair} onChange={(e) => setStair(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select stair type...</option>
                {stairTypes.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>User Weight</label>
              <select value={weight} onChange={(e) => setWeight(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select weight range...</option>
                {weightOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Budget</label>
              <select value={budget} onChange={(e) => setBudget(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select budget range...</option>
                {budgetOptions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          {rec && (
            <div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 20, marginBottom: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Recommended: {rec.brand}</div>
                <div style={{ marginBottom: 8 }}>Type: {rec.type}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>Estimated Cost: {rec.cost}</div>
                <div style={{ color: '#94a3b8', fontSize: 14 }}>{rec.notes}</div>
              </div>
              <button style={{ width: '100%', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '14px 0', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
                Get Free Stair Lift Quote from DFW Dealer →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
