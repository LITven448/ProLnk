import { useState } from 'react';

const EVIDENCE_TYPES = [
  { label: 'Droppings found (small, pointed = roof rat)', value: 'droppings_roof' },
  { label: 'Droppings found (large, blunt = Norway rat)', value: 'droppings_norway' },
  { label: 'Gnaw marks on wood/wires', value: 'gnaw' },
  { label: 'Scratching sounds in walls/attic at night', value: 'sounds' },
  { label: 'Visible entry holes', value: 'holes' },
];

const HOME_TYPES = [
  { label: 'Newer suburb (built after 2000)', value: 'new_suburb' },
  { label: 'Older DFW neighborhood (pre-2000)', value: 'old_neighborhood' },
  { label: 'Home with large trees/ivy near roofline', value: 'trees' },
  { label: 'Slab foundation home', value: 'slab' },
];

const RECS: Record<string, Record<string, string>> = {
  droppings_roof: {
    new_suburb: 'Roof rats: Check roofline, soffits, and attic vents. Seal gaps with copper mesh + caulk. Trim trees 4ft from roofline.',
    old_neighborhood: 'Roof rats are common in older DFW suburbs. Inspect eaves, pipe penetrations, and A/C lines entering the home.',
    trees: 'Trees give roof rats a highway to your roof. Trim all branches 4ft from structure and seal every soffit gap with copper mesh.',
    slab: 'Roof rats rarely enter through slabs. Focus on roofline, soffit, and HVAC penetrations. Copper mesh + paintable caulk at all gaps.',
  },
  droppings_norway: {
    new_suburb: 'Norway rats prefer ground level. Check garage doors, foundation cracks, and utility entries. Use copper mesh + hydraulic cement for gaps.',
    old_neighborhood: 'Older DFW homes have more Norway rat pressure. Inspect crawl spaces, plumbing penetrations, and damaged foundation areas.',
    trees: 'Norway rats may use roots for tunneling near foundations. Seal all ground-level gaps; consider perimeter exclusion foam + mesh.',
    slab: 'Norway rats love slab gaps near plumbing. Inspect all pipe penetrations through slab and seal with copper mesh + hydraulic cement.',
  },
  gnaw: {
    new_suburb: 'Active gnawing means active infestation. Locate and seal all entry points immediately — copper mesh, not steel wool (rusts out).',
    old_neighborhood: 'Older homes have more gnaw-accessible wood. Inspect attic joists, subflooring, and utility chases. Seal entries before trapping.',
    trees: 'Gnaw damage near roofline = roof rat. Check tree-to-roof contact points. Seal, then use snap traps in attic along wall runs.',
    slab: 'Gnaw marks on wires are a fire hazard. Call an electrician after exclusion. Copper mesh + caulk all slab penetrations.',
  },
  sounds: {
    new_suburb: 'Scratching at night = roof rats in attic. Inspect attic in morning for droppings and runways. Seal before trapping.',
    old_neighborhood: 'Night sounds in walls common in older DFW homes. Set snap traps in attic along wall runs; seal all entry points.',
    trees: 'Tree-adjacent homes hear roof rats running from trees to attic. Trim trees and seal soffit gaps with copper mesh first.',
    slab: 'Wall scratching on slab homes = rats using wall voids. Locate entry at roofline or soffit; seal with copper mesh + caulk.',
  },
  holes: {
    new_suburb: 'Seal every hole larger than a quarter immediately. Use copper mesh + paintable caulk — not expandable foam alone (rats chew through it).',
    old_neighborhood: 'Older DFW homes often have many hidden gaps. Do a full perimeter walk. Copper mesh + hydraulic cement for masonry gaps.',
    trees: 'Entry holes near roofline are high-priority — trim trees first to eliminate the access highway, then seal with copper mesh.',
    slab: 'Slab homes: focus on pipe penetrations, utility entries, and garage door sweeps. Copper mesh + caulk for all penetrations.',
  },
};

export default function DFWRodentExclusionGuide() {
  const [evidence, setEvidence] = useState('');
  const [homeType, setHomeType] = useState('');

  const rec = evidence && homeType ? RECS[evidence]?.[homeType] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🐀</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          DFW Rodent Exclusion Guide
        </h1>
        <p style={{ color: '#94A3B8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW is prime rodent territory. Roof rats dominate suburban tree-lined neighborhoods; Norway rats are common in older
          areas. Exclusion — not just trapping — is the only permanent fix. Steel wool and foam fail within months; use copper mesh + caulk.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🧱 Exclusion Materials That Last</h2>
          <ul style={{ color: '#94A3B8', lineHeight: 2, paddingLeft: 20 }}>
            <li><strong style={{ color: '#E8F0FE' }}>Copper mesh</strong> — rats cannot chew through it, won't rust (unlike steel wool)</li>
            <li><strong style={{ color: '#E8F0FE' }}>Paintable silicone caulk</strong> — seals around copper mesh for gaps under 1"</li>
            <li><strong style={{ color: '#E8F0FE' }}>Hydraulic cement</strong> — for masonry and foundation gaps</li>
            <li><strong style={{ color: '#E8F0FE' }}>Hardware cloth (1/4")</strong> — for vents and large openings</li>
            <li>❌ Avoid: steel wool (rusts), expandable foam alone (rats chew through)</li>
          </ul>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Get Your Exclusion Plan</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94A3B8', display: 'block', marginBottom: 8 }}>Evidence Type</label>
            <select value={evidence} onChange={e => setEvidence(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#E8F0FE', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select evidence…</option>
              {EVIDENCE_TYPES.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94A3B8', display: 'block', marginBottom: 8 }}>Home Type</label>
            <select value={homeType} onChange={e => setHomeType(e.target.value)}
              style={{ width: '100%', background: '#0A1628', color: '#E8F0FE', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
              <option value="">Select home type…</option>
              {HOME_TYPES.map(h => <option key={h.value} value={h.value}>{h.label}</option>)}
            </select>
          </div>
          {rec && (
            <div style={{ background: '#F5E642', borderRadius: 8, padding: 16 }}>
              <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: 4 }}>📋 Exclusion Priority Plan</div>
              <div style={{ color: '#0A1628', lineHeight: 1.6 }}>{rec}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>💰 Typical DFW Exclusion Costs</h2>
          <ul style={{ color: '#94A3B8', lineHeight: 2, paddingLeft: 20 }}>
            <li>DIY copper mesh + caulk kit: <strong style={{ color: '#E8F0FE' }}>$30–80</strong></li>
            <li>Professional exclusion (small home): <strong style={{ color: '#E8F0FE' }}>$300–600</strong></li>
            <li>Full exclusion + trapping program: <strong style={{ color: '#E8F0FE' }}>$600–1,500</strong></li>
            <li>Attic cleanup after infestation: <strong style={{ color: '#E8F0FE' }}>$500–2,000+</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
