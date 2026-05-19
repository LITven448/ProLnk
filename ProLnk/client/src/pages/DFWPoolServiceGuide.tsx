import { useState } from 'react';

const POOL_SIZES = [
  { label: 'Small (<10k gal)', base: 120 },
  { label: 'Medium (10-20k gal)', base: 160 },
  { label: 'Large (20-35k gal)', base: 200 },
  { label: 'Resort (35k+ gal)', base: 260 },
];
const FREQS = [
  { label: 'Weekly', mult: 4, disc: 1 },
  { label: 'Bi-Weekly', mult: 2, disc: 1.15 },
];
const FEATURES = [
  { label: '🛁 Spa / Hot Tub', add: 40 },
  { label: '💦 Waterfall / Feature', add: 25 },
  { label: '🌿 Lots of Trees / Debris', add: 30 },
  { label: '🐕 Dog Uses Pool', add: 20 },
];

export default function DFWPoolServiceGuide() {
  const [pi, setPi] = useState(1);
  const [fi, setFi] = useState(0);
  const [feats, setFeats] = useState<number[]>([]);
  const tog = (i: number) => setFeats(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);
  const freq = FREQS[fi];
  const featAdd = feats.reduce((a, i) => a + FEATURES[i].add, 0);
  const perVisit = Math.round((POOL_SIZES[pi].base + featAdd) * freq.disc / freq.mult);
  const monthly = Math.round((POOL_SIZES[pi].base + featAdd) * freq.disc);
  const warning = fi === 1 ? 'Bi-weekly is risky June-Sep in DFW — algae can bloom in 72hrs during peak heat.' : 'Weekly is strongly recommended May-Sep when DFW temps exceed 95F consistently.';
  const btn = (active: boolean) => ({ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer' as const, fontSize: 13, background: active ? '#F5E642' : '#1A2E4A', color: active ? '#0A1628' : '#E8EDF5', fontWeight: active ? 700 : 400 });

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>Pool Service in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW summers are brutal — 100-day stretches above 90F mean weekly pool service is not a luxury, it is a chemistry requirement. Here is what every DFW pool owner needs to know.</p>

        {[
          { icon: '📅', title: 'Weekly vs Bi-Weekly in DFW', body: 'Weekly is the standard during DFW summer. Algae blooms in as little as 72 hours when temps exceed 95F and bather load is high. Bi-weekly may work October through April only.' },
          { icon: '✅', title: 'What a Standard Service Visit Includes', body: 'Chemical check and balance, skimmer and pump basket empty, brush walls and steps, vacuum debris, clean waterline tile. Everything else is extra.' },
          { icon: '🔧', title: 'What Is Extra (Not Included)', body: 'Equipment repairs, green pool recovery (can cost $200-500), winterization, filter cleaning (quarterly add-on), acid washes, and plaster repairs. Always get a scope in writing.' },
          { icon: '🔍', title: 'Vetting Pool Companies in DFW', body: 'Look for CPO (Certified Pool Operator) certification, licensed if doing equipment work, liability insurance minimum $1M. Ask if they do their own chemistry or subcontract routes. ProLnk pool pros are verified before any lead is delivered.' },
        ].map(({ icon, title, body }) => (
          <div key={title} style={{ background: '#0F1E35', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{icon} {title}</div>
            <div style={{ color: '#94A3B8', lineHeight: 1.6 }}>{body}</div>
          </div>
        ))}

        <div style={{ background: '#0F1E35', borderRadius: 16, padding: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 20 }}>🏊 Monthly Service Cost Estimator</div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>POOL SIZE</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {POOL_SIZES.map((p, i) => <button key={i} onClick={() => setPi(i)} style={btn(pi === i)}>{p.label}</button>)}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>SERVICE FREQUENCY</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {FREQS.map((f, i) => <button key={i} onClick={() => setFi(i)} style={btn(fi === i)}>{f.label}</button>)}
            </div>
            <div style={{ color: fi === 1 ? '#F5A623' : '#4ADE80', fontSize: 12, marginTop: 8 }}>⚠️ {warning}</div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>POOL FEATURES</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {FEATURES.map((f, i) => (
                <button key={i} onClick={() => tog(i)} style={{ padding: '8px 14px', borderRadius: 8, border: `2px solid ${feats.includes(i) ? '#F5E642' : '#1A2E4A'}`, cursor: 'pointer', fontSize: 13, background: feats.includes(i) ? '#1A2E4A' : '#0A1628', color: '#E8EDF5' }}>{f.label} +${f.add}/mo</button>
              ))}
            </div>
          </div>

          <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Included Each Visit</div>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#CBD5E1' }}>Chemicals · Brush · Vacuum · Baskets</div>
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
