import { useState } from 'react';

const SHED_TYPES = [
  { type: 'Metal Shed (uninsulated)', rating: 'Poor', note: 'DFW metal sheds hit 160°F+ in July. Destroys anything temperature-sensitive. Usable Oct–Apr only.' },
  { type: 'Metal Shed (insulated)', rating: 'Good', note: 'R-13 insulation keeps temps 30–40°F cooler. Add a louvered vent. Usable year-round with shade.' },
  { type: 'Wood Shed', rating: 'Good', note: 'Natural insulation. Treat annually for DFW termites. Paint or stain every 3 years. Add ridge vent.' },
  { type: 'Resin/Plastic Shed', rating: 'Very Good', note: 'UV-stabilized resin handles DFW sun. No rust, no rot, no termites. Anchor for DFW wind (70mph gusts).' },
  { type: 'Shaded Overhang/Lean-to', rating: 'Best', note: 'Shade drops surface temp 40°F. Combine with resin shed for best DFW outdoor storage.' },
];

const POOL_ORG = [
  { item: '🧪 Chemicals', tip: 'Store in cool, ventilated space AWAY from shed interior. DFW temps cause pressure buildup. Use a chemical cabinet.' },
  { item: '🏊 Floats & Toys', tip: 'Wall hooks in shaded area. DFW UV degrades vinyl in 1–2 seasons without UV protectant spray.' },
  { item: '🔧 Equipment (pump parts)', tip: 'Labeled bins near equipment pad. Keep rebuild kits in a sealed bin — DFW hard water accelerates wear.' },
  { item: '🪣 Cleaning Tools', tip: 'Pole hangers on wall. Rinse heads weekly — DFW algae season is May–September.' },
];

const HOA_RULES = [
  'Most DFW HOAs restrict visible sheds — check setback requirements (usually 5–10 ft from fence)',
  'Shed color must match or complement home — get written approval before building',
  'Height limits typically 8–12 ft — verify before purchasing',
  'Permit required in most DFW cities for sheds over 200 sqft',
  'Screening with plants or fencing may be required — HOA variance process takes 2–4 weeks',
];

const SYSTEMS: Record<string, { name: string; items: string[]; cost: string; hoa: string; note: string }> = {
  pool: { name: 'Pool & Outdoor Living Zone', items: ['Chemical cabinet (vented, lockable)', 'Wall-mount hose reel + cover', 'Float wall hooks x6', 'Equipment pad organization bins', 'UV-protectant spray station'], cost: '$400–$1,200', hoa: 'Pool equipment typically exempt from HOA screening requirements. Verify your CC&Rs.', note: 'DFW pool season is 7 months. Organize for easy weekly maintenance.' },
  garden: { name: 'Garden & Landscape System', items: ['Tool wall with pegboard (weatherproof)', 'Hose cart + soaker hose storage', 'Fertilizer/chemical rack (shaded)', 'Seed and bulb storage cabinet', 'Wheelbarrow wall mount'], cost: '$300–$800', hoa: 'Garden sheds usually require HOA approval. Match shed color to home trim.', note: 'DFW spring gardening season: Feb–May. Fall: Sept–Nov. Organize by season.' },
  patio: { name: 'Patio & Cushion Organization', items: ['Deck box (UV-resistant, 150 gal)', 'Cushion storage ottoman x2', 'Weather-resistant shelving unit', 'Bike hooks (under eave)', 'Grill cover + accessories rack'], cost: '$500–$1,500', hoa: 'Deck boxes generally allowed without approval. Keep tidy — HOA drive-bys are common.', note: 'DFW winds trash patio cushions. Store June–August when heat makes outdoor sitting rare.' },
  full: { name: 'Full Outdoor Storage Overhaul', items: ['12x16 resin shed (shaded placement)', 'Full wall organization system', 'Dedicated zones: pool/garden/tools/seasonal', 'Motion-sensor lighting', 'Anchor kit (required for DFW wind)'], cost: '$3,000–$8,000', hoa: 'Submit HOA variance request with site plan. Budget 2–4 weeks for approval. Get written sign-off.', note: 'Anchor shed with concrete footings for 90mph DFW tornado prep. Include in homeowners insurance.' },
};

const OUTDOOR_SIZES = ['Small patio/no yard', 'Medium yard (under 5,000 sqft)', 'Large yard (5,000–10,000 sqft)', 'Large yard with pool'];
const STORAGE_NEEDS = ['pool', 'garden', 'patio', 'full'];
const NEED_LABELS: Record<string, string> = { pool: 'Pool equipment & floats', garden: 'Garden & landscaping tools', patio: 'Patio furniture & cushions', full: 'Everything — full overhaul' };
const HOA_OPTIONS = ['Yes — active HOA', 'No HOA', "I'm not sure"];

export default function DFWOutdoorStorageOrganization() {
  const [outdoor, setOutdoor] = useState('');
  const [need, setNeed] = useState('');
  const [hoa, setHoa] = useState('');
  const [result, setResult] = useState<null | typeof SYSTEMS[string]>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: '#0A1628', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🌿</div>
        <h1 style={{ color: '#F5E642', fontSize: 32, fontWeight: 700, margin: '16px 0 8px' }}>DFW Outdoor Storage & Organization</h1>
        <p style={{ color: '#94a3b8', fontSize: 16 }}>Heat-safe storage for pools, patios, tools & HOA compliance</p>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '40px 24px' }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>🏚️ Shed Types for DFW Climate</h2>
        <div style={{ display: 'grid', gap: 10, marginBottom: 40 }}>
          {SHED_TYPES.map(s => (
            <div key={s.type} style={{ background: '#fff', borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 14, alignItems: 'flex-start', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
              <span style={{ background: s.rating === 'Poor' ? '#fee2e2' : s.rating === 'Good' ? '#dcfce7' : s.rating === 'Very Good' ? '#dbeafe' : '#fef3c7', color: s.rating === 'Poor' ? '#dc2626' : s.rating === 'Good' ? '#16a34a' : s.rating === 'Very Good' ? '#2563eb' : '#d97706', borderRadius: 6, padding: '2px 8px', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', marginTop: 2 }}>{s.rating}</span>
              <div><div style={{ fontWeight: 700, marginBottom: 4 }}>{s.type}</div><div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{s.note}</div></div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>🏊 Pool Equipment Organization</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 40 }}>
          {POOL_ORG.map(p => (
            <div key={p.item} style={{ background: '#fff', borderRadius: 10, padding: 16, boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{p.item.split(' ')[0]}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 14 }}>{p.item.split(' ').slice(1).join(' ')}</div>
              <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{p.tip}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff3cd', border: '2px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 32 }}>
          <div style={{ fontWeight: 700, marginBottom: 10 }}>📋 DFW HOA Outdoor Storage Rules</div>
          {HOA_RULES.map(r => <div key={r} style={{ fontSize: 13, color: '#475569', padding: '4px 0' }}>• {r}</div>)}
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>🎯 Get My Outdoor Storage Plan</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
            {[['Outdoor Space', OUTDOOR_SIZES, outdoor, setOutdoor], ['HOA Status', HOA_OPTIONS, hoa, setHoa]].map(([label, opts, val, set]) => (
              <div key={label as string}>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>{label as string}</label>
                <select value={val as string} onChange={e => (set as Function)(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 15, background: '#F9FAFB' }}>
                  <option value="">Select...</option>
                  {(opts as string[]).map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: 8 }}>Primary Storage Need</label>
              <select value={need} onChange={e => setNeed(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 15, background: '#F9FAFB' }}>
                <option value="">Select...</option>
                {STORAGE_NEEDS.map(n => <option key={n} value={n}>{NEED_LABELS[n]}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => need && setResult(SYSTEMS[need])} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, cursor: 'pointer', width: '100%' }}>Get My Plan</button>
          {result && (
            <div style={{ marginTop: 24, padding: 20, background: '#F9FAFB', borderRadius: 10 }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{result.name}</div>
              <div style={{ color: '#16a34a', fontWeight: 600, marginBottom: 14 }}>{result.cost}</div>
              {result.items.map(i => <div key={i} style={{ padding: '5px 0', color: '#475569' }}>✓ {i}</div>)}
              <div style={{ marginTop: 12, padding: 12, background: '#fef3c7', borderRadius: 8, fontSize: 13 }}>📋 HOA: {result.hoa}</div>
              <div style={{ marginTop: 8, padding: 12, background: '#F5E642', borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#0A1628' }}>💡 {result.note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
