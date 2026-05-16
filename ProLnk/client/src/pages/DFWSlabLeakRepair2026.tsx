import { useState } from 'react';

export default function DFWSlabLeakRepair2026() {
  const [severity, setSeverity] = useState('single');
  const [floorType, setFloorType] = useState('tile');
  const [guide, setGuide] = useState('');

  const severities = [
    { value: 'single', label: 'Single Point Leak' },
    { value: 'multiple', label: 'Multiple Pinholes' },
    { value: 'severe', label: 'Severe / Large Break' },
    { value: 'drain', label: 'Drain / Sewer Line' },
  ];
  const floors = [
    { value: 'tile', label: 'Tile / Stone' },
    { value: 'hardwood', label: 'Hardwood / Laminate' },
    { value: 'carpet', label: 'Carpet' },
    { value: 'concrete', label: 'Bare Concrete' },
  ];

  const guides: Record<string, string> = {
    'single-tile': '🔨 Spot Repair: Open slab (jackhammer small area through tile — tile will be destroyed), access pipe, fix joint or section, pressure test, repatch with concrete, replace tile. Cleanest option when floors already need replacement. Cost: $1,500–$3,500.',
    'single-hardwood': '🚇 Tunnel Under Slab: Dig access tunnel from outside perimeter or interior closet — preserves your hardwood floor. Plumber works under slab to fix pipe. Fill tunnel, no floor damage. Add $800–$1,500 vs spot repair. Total: $2,500–$5,000.',
    'single-carpet': '🔨 Spot Repair Preferred: Carpet can be cut, rolled back, and reinstalled over repatch. Most cost-effective approach — pull carpet, jackhammer, fix, patch, re-lay carpet. Cost: $1,200–$2,800.',
    'single-concrete': '🔨 Spot Repair: Simplest scenario — jackhammer, fix, repatch. No flooring concerns. Cost: $1,000–$2,200.',
    'multiple-tile': '🧪 Epoxy Lining: Multiple pinholes indicate systemic pipe degradation. Spray epoxy coating through entire pipe — seals all pinholes simultaneously. Alternative: full reroute (new pipe in walls/attic). Spot repair of 5+ locations is cost-prohibitive. Epoxy: $3,000–$6,000. Reroute: $4,000–$9,000.',
    'multiple-hardwood': '🔄 Reroute Recommended: Multiple leaks = pipe is failing. Reroute abandons old pipe, runs new copper or PEX through walls and attic. Zero floor disturbance. Best long-term solution for hardwood homes. Cost: $4,500–$10,000.',
    'multiple-carpet': '🧪 Epoxy or Reroute: Epoxy seals all pinholes at once without floor demo. Reroute is permanent fix. Evaluate pipe age — pipes over 40 years typically warrant reroute. Cost: $3,000–$9,000.',
    'multiple-concrete': '🧪 Epoxy First: Epoxy lining is cost-effective for concrete floors — if epoxy fails later, spot repairs easy on bare concrete. Cost: $2,500–$5,500.',
    'severe-tile': '🔄 Reroute or Tunnel: Large breaks may require 6–10 ft of pipe replacement — tunneling minimizes tile loss. For older homes, reroute entire line to prevent future failures. Cost: $5,000–$15,000.',
    'severe-hardwood': '🔄 Reroute: Severe break + hardwood = reroute is only sensible option. Tunneling is costly for large sections. New pipe in walls protects floors permanently. Cost: $6,000–$14,000.',
    'severe-carpet': '🔨 Spot or Tunnel: Pull carpet, assess break size. If under 4 ft, spot repair and repatch. If longer, tunnel from outside. Cost: $2,500–$8,000.',
    'severe-concrete': '🔨 Open Slab: No floor concerns — jackhammer full break area, replace pipe section, repatch. Straightforward but labor intensive. Cost: $2,000–$6,000.',
    'drain-tile': '🚇 Tunnel Access: Drain lines are gravity-fed under slab — tunneling allows access without destroying tile. Camera first to find exact break, then tunnel to that point. Cost: $3,500–$8,000.',
    'drain-hardwood': '🚇 Tunnel Only: Never jackhammer under hardwood for drain work. Tunnel from perimeter. Drain reroute not feasible (gravity dependent). Cost: $4,000–$9,000.',
    'drain-carpet': '🔨 Spot Access: Lift carpet, cut slab, repair drain, repatch, reinstall carpet. Most cost-effective drain repair method. Cost: $1,800–$4,500.',
    'drain-concrete': '🔨 Open Trench: Cut concrete trench along drain line path, replace damaged section, backfill, repatch. No floor concerns. Cost: $1,500–$3,500.',
  };

  const getGuide = () => setGuide(guides[`${severity}-${floorType}`] || 'Select options above.');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '0 0 8px' }}>DFW Slab Leak Repair Methods 2026</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>Spot Repair, Tunneling, Rerouting &amp; Epoxy — DFW Method Guide</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 28 }}>
          {[
            { icon: '🔨', title: 'Spot Repair', body: 'Open slab directly above leak, fix or replace pipe section, repatch with concrete. Fastest and cheapest for single leaks with expendable flooring. Floor above is demolished.', cost: '$1,000–$3,500' },
            { icon: '🚇', title: 'Tunneling', body: 'Dig access tunnel under slab from perimeter or interior. Plumber works under foundation — floor stays intact. Premium method for hardwood, tile preservation.', cost: '$3,000–$8,000' },
            { icon: '🔄', title: 'Rerouting', body: 'Abandon old pipe entirely. Run new copper or PEX through walls and attic, connecting supply from above. Best for aging pipes with multiple leaks. Zero floor disturbance.', cost: '$4,000–$12,000' },
            { icon: '🧪', title: 'Epoxy Coating', body: 'Spray epoxy through pipe interior — seals multiple pinholes at once. Ideal for systemic pipe degradation where excavation would cost more. 10–15 year typical lifespan.', cost: '$2,500–$6,500' },
          ].map(c => (
            <div key={c.title} style={{ background: '#112240', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
              <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 8 }}>{c.cost}</div>
              <div style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 28, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🧭 Repair Method Recommender</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Leak Severity / Type</label>
              <select value={severity} onChange={e => setSeverity(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                {severities.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Floor Type Above Leak</label>
              <select value={floorType} onChange={e => setFloorType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                {floors.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 16 }}>Get Repair Recommendation</button>
          {guide && <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, color: '#E8EAF0', fontSize: 14, lineHeight: 1.7, border: '1px solid #F5E642' }}>{guide}</div>}
        </div>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 28 }}>ProLnk — DFW Slab Leak Repair Methods 2026</p>
      </div>
    </div>
  );
}
