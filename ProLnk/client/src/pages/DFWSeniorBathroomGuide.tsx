import { useState } from 'react';

const mobilityLevels = ['Full independence', 'Uses grab bars for balance', 'Uses walker/rollator', 'Uses wheelchair', 'Requires caregiver assist'];
const bathroomSizes = ['Small (under 40 sq ft)', 'Medium (40–70 sq ft)', 'Large (70–100 sq ft)', 'Extra large (100+ sq ft)'];

type ModItem = { mod: string; cost: string; priority: 'Essential' | 'Recommended' | 'Optional' };
type SizeConfig = Record<string, ModItem[]>;
type MobilityConfig = Record<string, SizeConfig>;

const recommendations: MobilityConfig = {
  'Full independence': {
    'Small (under 40 sq ft)': [
      { mod: 'Grab bars (toilet + shower)', cost: '$300–600', priority: 'Recommended' },
      { mod: 'Non-slip bath mat + flooring treatment', cost: '$150–400', priority: 'Recommended' },
      { mod: 'Comfort-height toilet (17–19″)', cost: '$200–500', priority: 'Optional' },
      { mod: 'Motion-sensor night lighting', cost: '$80–200', priority: 'Recommended' },
    ],
    'Medium (40–70 sq ft)': [
      { mod: 'Walk-in shower with bench', cost: '$3,000–6,000', priority: 'Recommended' },
      { mod: 'Grab bars (toilet + shower)', cost: '$300–600', priority: 'Essential' },
      { mod: 'Non-slip flooring', cost: '$500–1,500', priority: 'Essential' },
      { mod: 'Comfort-height toilet', cost: '$200–500', priority: 'Recommended' },
    ],
    'Large (70–100 sq ft)': [
      { mod: 'Walk-in shower with bench', cost: '$3,000–6,000', priority: 'Recommended' },
      { mod: 'Walk-in tub (if preferred)', cost: '$4,000–9,000', priority: 'Optional' },
      { mod: 'Grab bars (full set)', cost: '$500–900', priority: 'Essential' },
      { mod: 'Non-slip tile flooring', cost: '$800–2,500', priority: 'Essential' },
    ],
    'Extra large (100+ sq ft)': [
      { mod: 'Roll-in shower (future-proof)', cost: '$5,000–10,000', priority: 'Recommended' },
      { mod: 'Dual grab bar system', cost: '$600–1,200', priority: 'Essential' },
      { mod: 'Comfort-height toilet', cost: '$200–500', priority: 'Recommended' },
      { mod: 'Heated non-slip flooring', cost: '$1,500–4,000', priority: 'Optional' },
    ],
  },
  'Uses grab bars for balance': {
    'Small (under 40 sq ft)': [
      { mod: 'Reinforced grab bars (6-point set)', cost: '$500–900', priority: 'Essential' },
      { mod: 'Walk-in shower conversion', cost: '$3,000–6,000', priority: 'Essential' },
      { mod: 'Comfort-height toilet + raised seat', cost: '$300–700', priority: 'Essential' },
      { mod: 'Non-slip flooring throughout', cost: '$500–1,500', priority: 'Essential' },
    ],
    'Medium (40–70 sq ft)': [
      { mod: 'Walk-in shower with fold-down bench', cost: '$3,500–7,000', priority: 'Essential' },
      { mod: 'Reinforced grab bars (6-point set)', cost: '$500–900', priority: 'Essential' },
      { mod: 'Comfort-height toilet', cost: '$200–500', priority: 'Essential' },
      { mod: 'Non-slip tile + motion lighting', cost: '$600–1,700', priority: 'Essential' },
    ],
    'Large (70–100 sq ft)': [
      { mod: 'Custom walk-in shower with dual grab bars', cost: '$4,000–8,000', priority: 'Essential' },
      { mod: 'Walk-in tub option', cost: '$5,000–10,000', priority: 'Recommended' },
      { mod: 'Reinforced grab bars', cost: '$500–900', priority: 'Essential' },
      { mod: 'Comfort-height toilet + bidet', cost: '$500–1,500', priority: 'Recommended' },
    ],
    'Extra large (100+ sq ft)': [
      { mod: 'Roll-in shower', cost: '$5,000–12,000', priority: 'Recommended' },
      { mod: 'Full grab bar system', cost: '$700–1,500', priority: 'Essential' },
      { mod: 'Comfort-height toilet + bidet', cost: '$500–1,500', priority: 'Essential' },
      { mod: 'Non-slip heated floor', cost: '$2,000–5,000', priority: 'Optional' },
    ],
  },
  'Uses walker/rollator': {
    'Small (under 40 sq ft)': [
      { mod: 'Bathroom expansion (remove wall)', cost: '$8,000–20,000', priority: 'Essential' },
      { mod: 'Walk-in shower (curbless)', cost: '$4,000–8,000', priority: 'Essential' },
      { mod: 'Grab bars throughout', cost: '$600–1,200', priority: 'Essential' },
      { mod: 'Pocket door (space saving)', cost: '$800–2,000', priority: 'Essential' },
    ],
    'Medium (40–70 sq ft)': [
      { mod: 'Curbless walk-in shower (36″×36″ min)', cost: '$4,000–8,000', priority: 'Essential' },
      { mod: 'Grab bars full set', cost: '$600–1,200', priority: 'Essential' },
      { mod: 'Outswing or pocket door', cost: '$600–2,000', priority: 'Recommended' },
      { mod: 'Comfort-height toilet + grab bar', cost: '$400–800', priority: 'Essential' },
    ],
    'Large (70–100 sq ft)': [
      { mod: 'Curbless roll-in shower', cost: '$5,000–10,000', priority: 'Essential' },
      { mod: 'Full grab bar system', cost: '$700–1,500', priority: 'Essential' },
      { mod: 'ADA-height toilet', cost: '$300–600', priority: 'Essential' },
      { mod: 'Non-slip floor + motion lights', cost: '$700–2,000', priority: 'Essential' },
    ],
    'Extra large (100+ sq ft)': [
      { mod: 'Roll-in shower (60″×30″ min)', cost: '$6,000–14,000', priority: 'Essential' },
      { mod: 'Full ADA grab bar system', cost: '$800–1,800', priority: 'Essential' },
      { mod: 'ADA-height toilet + bidet', cost: '$600–1,800', priority: 'Recommended' },
      { mod: 'Non-slip heated tile', cost: '$2,000–6,000', priority: 'Optional' },
    ],
  },
  'Uses wheelchair': {
    'Small (under 40 sq ft)': [
      { mod: 'Full bathroom remodel required', cost: '$20,000–40,000', priority: 'Essential' },
      { mod: 'Roll-in shower (60″×36″ ADA)', cost: '$6,000–14,000', priority: 'Essential' },
      { mod: '36″ doorway + offset hinges', cost: '$500–1,500', priority: 'Essential' },
      { mod: 'ADA toilet + grab bars', cost: '$800–2,000', priority: 'Essential' },
    ],
    'Medium (40–70 sq ft)': [
      { mod: 'Roll-in shower (ADA compliant)', cost: '$6,000–14,000', priority: 'Essential' },
      { mod: '36″ doorway widening', cost: '$500–1,500', priority: 'Essential' },
      { mod: 'ADA toilet + grab bars', cost: '$800–2,000', priority: 'Essential' },
      { mod: 'Knee clearance under vanity', cost: '$1,000–3,000', priority: 'Recommended' },
    ],
    'Large (70–100 sq ft)': [
      { mod: 'Full ADA roll-in shower', cost: '$7,000–15,000', priority: 'Essential' },
      { mod: 'Full grab bar system + fold-down bench', cost: '$1,000–2,500', priority: 'Essential' },
      { mod: 'ADA toilet + bidet', cost: '$700–2,000', priority: 'Essential' },
      { mod: 'ADA vanity with knee clearance', cost: '$1,500–4,000', priority: 'Recommended' },
    ],
    'Extra large (100+ sq ft)': [
      { mod: 'Custom roll-in shower suite', cost: '$8,000–18,000', priority: 'Essential' },
      { mod: 'Full ADA grab bar system', cost: '$1,200–3,000', priority: 'Essential' },
      { mod: 'ADA toilet + comfort bidet', cost: '$700–2,000', priority: 'Essential' },
      { mod: 'ADA-height vanity + knee clearance', cost: '$2,000–5,000', priority: 'Essential' },
    ],
  },
  'Requires caregiver assist': {
    'Small (under 40 sq ft)': [
      { mod: 'Bathroom expansion for caregiver space', cost: '$15,000–35,000', priority: 'Essential' },
      { mod: 'Roll-in shower + fold-down bench', cost: '$5,000–10,000', priority: 'Essential' },
      { mod: 'Full grab bar system', cost: '$700–1,500', priority: 'Essential' },
      { mod: 'ADA toilet + grab bars', cost: '$800–2,000', priority: 'Essential' },
    ],
    'Medium (40–70 sq ft)': [
      { mod: 'Roll-in shower + fold-down bench + grab bars', cost: '$6,000–12,000', priority: 'Essential' },
      { mod: 'Outswing door (caregiver access)', cost: '$600–1,500', priority: 'Essential' },
      { mod: 'ADA toilet + grab bars', cost: '$800–2,000', priority: 'Essential' },
      { mod: 'Non-slip floor', cost: '$500–1,500', priority: 'Essential' },
    ],
    'Large (70–100 sq ft)': [
      { mod: 'Full ADA roll-in shower + caregiver space', cost: '$7,000–15,000', priority: 'Essential' },
      { mod: 'Full grab bar system', cost: '$900–2,000', priority: 'Essential' },
      { mod: 'ADA toilet + bidet (reduces caregiver need)', cost: '$700–2,000', priority: 'Recommended' },
      { mod: 'Motion-sensor lighting + emergency pull cord', cost: '$300–700', priority: 'Essential' },
    ],
    'Extra large (100+ sq ft)': [
      { mod: 'Custom ADA bathroom remodel', cost: '$12,000–30,000', priority: 'Essential' },
      { mod: 'Full grab bar + safety rail system', cost: '$1,200–3,000', priority: 'Essential' },
      { mod: 'ADA toilet + bidet', cost: '$700–2,000', priority: 'Essential' },
      { mod: 'Emergency alert system integration', cost: '$200–600', priority: 'Essential' },
    ],
  },
};

const priorityColors: Record<string, string> = { Essential: '#ef4444', Recommended: '#f97316', Optional: '#22c55e' };

export default function DFWSeniorBathroomGuide() {
  const [mobility, setMobility] = useState('');
  const [size, setSize] = useState('');

  const mods = mobility && size ? recommendations[mobility]?.[size] : null;
  const totalMin = mods ? mods.reduce((acc, m) => acc + parseInt(m.cost.replace(/\$|,/g, '').split('–')[0]), 0) : 0;
  const totalMax = mods ? mods.reduce((acc, m) => acc + parseInt(m.cost.replace(/\$|,/g, '').split('–')[1]), 0) : 0;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#2563eb', fontSize: 14, fontWeight: 700 }}>🛁 ProLnk DFW Senior Safety Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, color: '#0f172a' }}>Senior-Safe Bathroom Modifications</h1>
        <p style={{ color: '#64748b', marginBottom: 32, lineHeight: 1.6 }}>
          Tailored modification checklists and cost estimates for DFW homeowners — based on mobility level and bathroom size.
        </p>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1e3a5f', fontSize: 18, marginBottom: 16 }}>🚿 Shower Options Compared</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { icon: '🚿', t: 'Walk-in Shower', cost: '$3,000–8,000', d: 'Low threshold (≤½"), bench, grab bars. Best for most seniors.' },
              { icon: '🛁', t: 'Walk-in Tub', cost: '$4,000–10,000', d: 'Door in side, fills after entering. Therapeutic jets. Slower exit.' },
              { icon: '♿', t: 'Roll-in Shower', cost: '$5,000–14,000', d: 'No threshold, wide opening. ADA-compliant for wheelchair users.' },
              { icon: '💺', t: 'Shower Chair/Bench', cost: '$50–500', d: 'Lowest cost option — adds safety to existing shower immediately.' },
            ].map((o) => (
              <div key={o.t} style={{ background: '#f1f5f9', borderRadius: 8, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{o.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 4, fontSize: 14 }}>{o.t}</div>
                <div style={{ color: '#2563eb', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{o.cost}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>{o.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1e3a5f', fontSize: 18, marginBottom: 16 }}>📏 Grab Bar Placement Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
            {[
              { loc: 'Toilet Side Wall', spec: '42″ horizontal, 33–36″ from floor' },
              { loc: 'Toilet Rear Wall', spec: '36″ horizontal, 33–36″ from floor' },
              { loc: 'Shower Entry', spec: 'Vertical bar, 18″ from opening' },
              { loc: 'Shower Side Wall', spec: '48″ angled 45°, grab height 33–36″' },
              { loc: 'Bathtub Side', spec: '24″ horizontal near faucet' },
              { loc: 'Bathtub Rear', spec: '24–36″ horizontal near head end' },
            ].map((g) => (
              <div key={g.loc} style={{ background: '#f1f5f9', borderRadius: 8, padding: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{g.loc}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>{g.spec}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1e3a5f', fontSize: 20, marginBottom: 20 }}>🎯 Your Personalized Checklist</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Mobility Level</label>
              <select value={mobility} onChange={(e) => setMobility(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#fff', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select mobility level...</option>
                {mobilityLevels.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>Bathroom Size</label>
              <select value={size} onChange={(e) => setSize(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#fff', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 15 }}>
                <option value="">Select bathroom size...</option>
                {bathroomSizes.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {mods && (
            <div>
              {mods.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #e2e8f0', flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ background: priorityColors[m.priority], color: '#fff', borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>{m.priority}</span>
                    <span style={{ fontWeight: 500 }}>{m.mod}</span>
                  </div>
                  <span style={{ color: '#2563eb', fontWeight: 700 }}>{m.cost}</span>
                </div>
              ))}
              <div style={{ marginTop: 20, background: '#1e3a5f', color: '#fff', borderRadius: 8, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: 16 }}>Total Estimate</span>
                <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 20 }}>${totalMin.toLocaleString()} – ${totalMax.toLocaleString()}</span>
              </div>
              <button style={{ marginTop: 16, width: '100%', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 0', fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
                Get Free Quote from a DFW Senior Bathroom Specialist →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
