import { useState } from 'react';

const HOME_SIZES = [
  { label: 'Under 1,500 sqft', base: 280 },
  { label: '1,500-2,500 sqft', base: 360 },
  { label: '2,500-4,000 sqft', base: 440 },
  { label: '4,000+ sqft', base: 560 },
];
const CADENCES = [
  { label: 'Quarterly (standard)', visits: 4, mult: 1 },
  { label: 'Monthly (high pest pressure)', visits: 12, mult: 0.75 },
  { label: 'Bi-Monthly', visits: 6, mult: 0.85 },
];
const PESTS = [
  { label: '🐜 Fire Ants (common DFW)', add: 120 },
  { label: '🦟 Mosquito Program', add: 180 },
  { label: '🕷️ Scorpion / Spider Focus', add: 80 },
  { label: '🐀 Rodent Monitoring', add: 140 },
];
const REGIONS = [
  { label: 'Near Creek / Greenbelt', skeetoMult: 1.3 },
  { label: 'Standard Suburb', skeetoMult: 1 },
  { label: 'High-Rise / Condo', skeetoMult: 0.7 },
];

export default function DFWPestControlServiceGuide() {
  const [hi, setHi] = useState(1);
  const [ci, setCi] = useState(0);
  const [pests, setPests] = useState<number[]>([]);
  const [ri, setRi] = useState(1);
  const tog = (i: number) => setPests(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);
  const cadence = CADENCES[ci];
  const pestAdd = pests.reduce((a, i) => a + PESTS[i].add, 0) * REGIONS[ri].skeetoMult;
  const annual = Math.round((HOME_SIZES[hi].base + pestAdd) * cadence.mult);
  const monthly = Math.round(annual / 12);
  const rec = ci === 0 ? 'Quarterly is sufficient for general pest control in most DFW homes.' : 'Monthly programs are worth it when fire ants or mosquitoes are priority concerns.';
  const btn = (active: boolean) => ({ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer' as const, fontSize: 13, background: active ? '#F5E642' : '#1A2E4A', color: active ? '#0A1628' : '#E8EDF5', fontWeight: active ? 700 : 400 });

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME SERVICES GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>Pest Control in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>DFW is home to fire ants, mosquitoes, scorpions, and German cockroaches. A proper pest control plan requires knowing what you are dealing with and how often treatment is needed.</p>

        {[
          { icon: '📅', title: 'Quarterly vs Monthly vs Bi-Monthly', body: 'Quarterly is the standard for general pest control in most DFW homes — cockroaches, spiders, silverfish, wasps. Monthly is worth it only if fire ants are severe or you run a mosquito program. Bi-monthly splits the difference.' },
          { icon: '🐜', title: 'Fire Ants Are Always Extra', body: 'General pest contracts do not include fire ant treatment in DFW. Ask explicitly. Fire ant programs use granular bait plus liquid barrier. Active June-October when colonies are expanding.' },
          { icon: '🏠', title: 'Termite Monitoring Is Separate', body: 'Termite monitoring is a separate subscription from general pest. Subterranean termites are active across North Texas. A Sentricon or bait station system runs $300-600/year on top of your general pest contract.' },
          { icon: '💲', title: 'How Companies Price Pest Control', body: 'Initial treatment is higher (often $150-300) then quarterly treatments drop to $80-140 per visit. Monthly contracts come with a per-month rate that averages 25-30% less per visit than quarterly.' },
        ].map(({ icon, title, body }) => (
          <div key={title} style={{ background: '#0F1E35', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{icon} {title}</div>
            <div style={{ color: '#94A3B8', lineHeight: 1.6 }}>{body}</div>
          </div>
        ))}

        <div style={{ background: '#0F1E35', borderRadius: 16, padding: 28 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18, marginBottom: 20 }}>🐛 Annual Cost Estimator</div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>HOME SIZE</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {HOME_SIZES.map((h, i) => <button key={i} onClick={() => setHi(i)} style={btn(hi === i)}>{h.label}</button>)}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>SERVICE CADENCE</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {CADENCES.map((c, i) => <button key={i} onClick={() => setCi(i)} style={btn(ci === i)}>{c.label}</button>)}
            </div>
            <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 8 }}>💡 {rec}</div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>PRIMARY PEST CONCERNS (add-on programs)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {PESTS.map((p, i) => (
                <button key={i} onClick={() => tog(i)} style={{ padding: '8px 14px', borderRadius: 8, border: `2px solid ${pests.includes(i) ? '#F5E642' : '#1A2E4A'}`, cursor: 'pointer', fontSize: 13, background: pests.includes(i) ? '#1A2E4A' : '#0A1628', color: '#E8EDF5' }}>{p.label} +${p.add}/yr</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#94A3B8', fontSize: 13, marginBottom: 8 }}>DFW REGION</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {REGIONS.map((r, i) => <button key={i} onClick={() => setRi(i)} style={btn(ri === i)}>{r.label}</button>)}
            </div>
          </div>

          <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Est. visits/year</div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{cadence.visits} visits per year</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#94A3B8', fontSize: 13 }}>Annual / Monthly avg</div>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 26 }}>${annual}/yr — ${monthly}/mo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
