import { useState } from 'react';

const SIZES = [
  { label: 'Studio/1BR (<800 sqft)', base: 80 },
  { label: '2BR (800-1,200 sqft)', base: 110 },
  { label: '3BR (1,200-1,800 sqft)', base: 140 },
  { label: '4BR (1,800-2,500 sqft)', base: 170 },
  { label: '5BR+ (2,500+ sqft)', base: 210 },
];
const FREQS = [
  { label: 'Weekly', mult: 4, disc: 0.85 },
  { label: 'Bi-Weekly', mult: 2, disc: 0.9 },
  { label: 'Monthly', mult: 1, disc: 1 },
  { label: 'One-Time', mult: 1, disc: 1.15 },
];
const ADDONS = [
  { label: '🪟 Interior Windows', cost: 40 },
  { label: '🍳 Inside Oven', cost: 30 },
  { label: '❄️ Inside Fridge', cost: 25 },
  { label: '🏠 Baseboards & Blinds', cost: 35 },
  { label: '🐶 Pet Hair Treatment', cost: 20 },
];

export default function DFWHouseCleaningGuide() {
  const [si, setSi] = useState(2);
  const [fi, setFi] = useState(1);
  const [sel, setSel] = useState<number[]>([]);
  const tog = (i: number) => setSel(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);
  const f = FREQS[fi];
  const base = SIZES[si].base * f.disc;
  const addons = sel.reduce((a, i) => a + ADDONS[i].cost, 0);
  const perVisit = Math.round(base + addons);
  const monthly = Math.round(perVisit * f.mult);
  const tier = fi <= 1 ? 'Standard Clean' : fi === 2 ? 'Maintenance Clean' : 'Deep / One-Time Clean';
  const btn = (active: boolean) => ({ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer' as const, fontSize: 13, background: active ? '#F5E642′ : '#1A2E4A', color: active ? '#0A1628' : '#E8EDF5', fontWeight: active ? 700 : 400 });
  const card = { background: '#0F1E35', borderRadius: 12, padding: '20px 24px', marginBottom: 16 };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>House Cleaning in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW clay soil, live oak pollen, and cedar season mean dust accumulates faster than most cities. Here is what you need to know before hiring a cleaner.</p>

        {[
          { icon: '🧹', title: 'Standard vs Deep vs Move-In/Out', body: 'Standard recurring cleans cover surfaces, floors, bathrooms, and kitchen. Deep cleans add baseboards, blinds, inside appliances. Move-in/out is most thorough at 2-3x the standard rate.' },
          { icon: '🌿', title: 'Why DFW Demands Bi-Weekly Minimum', body: 'Cedar, live oak, and mountain cedar pollen coat surfaces fast. DFW clay dust migrates indoors constantly. Monthly works for empty-nesters; families with pets need bi-weekly minimum, weekly during spring pollen season.' },
          { icon: '✅', title: 'Finding Vetted Cleaners', body: 'Always verify: background checks on every cleaner entering your home, bonded and insured business, supplies included. ProLnk pros are pre-screened with ID verification and insurance confirmation.' },
          { icon: '💵', title: 'Tipping and Cost Norms', body: 'Industry standard is 15-20% per visit or a holiday tip equal to one cleaning. Consistent tips mean your cleaner prioritizes your home and goes above the checklist.' },
        ].map(({ icon, title, body }) => (
          <div key={title} style={card}>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{icon} {title}</div>
            <div style={{ color: '#94A3B8', lineHeight: 1.6 }}>{body}</div>
          </div>
        ))}

        <div style={{ background: '#0F1E35', borderRadius: 16, padding: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 20 }}>💰 Monthly Cost Estimator</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>HOME SIZE</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SIZES.map((s, i) => <button key={i} onClick={() => setSi(i)} style={btn(si === i)}>{s.label}</button>)}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>FREQUENCY</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {FREQS.map((fr, i) => <button key={i} onClick={() => setFi(i)} style={btn(fi === i)}>{fr.label}</button>)}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>ADD-ONS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {ADDONS.map((a, i) => (
                <button key={i} onClick={() => tog(i)} style={{ padding: '8px 14px', borderRadius: 8, border: `2px solid ${sel.includes(i) ? '#F5E642' : '#1A2E4A'}`, cursor: 'pointer', fontSize: 13, background: sel.includes(i) ? '#1A2E4A' : '#0A1628', color: '#E8EDF5′ }}>{a.label} +${a.cost}</button>
              ))}
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Service Tier</div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{tier}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Est. per visit / monthly</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 26 }}>${perVisit} / ${monthly}/mo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
