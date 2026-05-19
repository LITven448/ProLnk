import { useState } from 'react';

type GarageUse = 'storage' | 'workshop' | 'gym' | 'parking' | 'mixed';

interface OrgResult {
  system: string;
  topItems: string[];
  climateRecommendation: string;
  estimatedCost: { low: number; high: number };
  notes: string[];
}

function getOrgPlan(sqft: number, use: GarageUse): OrgResult {
  const plans: Record<GarageUse, OrgResult> = {
    storage: {
      system: 'Overhead Platform + Slatwall',
      topItems: ['Overhead storage platform ($400-600)', 'Slatwall panels for tools/bins ($400-800)', 'Heavy-duty shelving units ($300-600)', 'Climate-controlled cabinet for valuables'],
      climateRecommendation: sqft >= 400 ? 'Mini-split strongly recommended — large storage areas trap DFW heat and damage belongings' : 'Insulated garage door + ventilation fan ($300-500)',
      estimatedCost: { low: 1200, high: 3500 },
      notes: ['Avoid storing electronics, candles, wine, or medications — DFW heat will destroy them', 'Use airtight bins to block spring humidity and pest entry', 'Install weatherstripping to seal bottom of door (scorpion gap)'],
    },
    workshop: {
      system: 'Pegboard Wall + Cabinet System',
      topItems: ['Pegboard for hand tools ($150-300)', 'Heavy-duty workbench ($400-800)', 'Tool chest/cabinet ($500-1,500)', 'Task lighting (critical in DFW dark garage)'],
      climateRecommendation: 'Mini-split required — you’re working in there. Heat exhaustion risk above 90°F. Budget $1,500-3,500.',
      estimatedCost: { low: 2000, high: 6000 },
      notes: ['Apply garage floor epoxy to make cleanup easier ($1,500-3,500 professional)', 'Rust-proof tool storage — DFW spring/fall humidity causes tool rust', 'Dedicated circuit for compressors and heavy tools — get permit'],
    },
    gym: {
      system: 'Floor Mat + Wall Mirror System',
      topItems: ['Rubber floor mats (full coverage $600-1,200)', 'Wall-mounted mirrors ($300-600)', 'Wall-mounted equipment storage ($200-500)', 'Fan/cooling system (non-negotiable in DFW)'],
      climateRecommendation: 'Mini-split is table stakes for a DFW garage gym. Without it, you can’t use the space June-September safely.',
      estimatedCost: { low: 3000, high: 8000 },
      notes: ['DFW heat makes garage gym unusable without climate control (garage hits 130°F)', 'Rubber mats protect concrete floor and reduce joint impact', 'Consider insulated garage door — reduces cooling load significantly', 'Install proper lighting — avoid shadowy spots near equipment'],
    },
    parking: {
      system: 'Minimal Storage + Organization',
      topItems: ['Wall-mounted bike hoists ($80-150 each)', 'Overhead ceiling hooks for seasonal items', 'Slim shelving units along walls', 'Parking guides ($20-50) to position vehicle perfectly'],
      climateRecommendation: 'Basic insulated door ($800-1,500) reduces interior temp by 20-30°F and is worth it for vehicle protection.',
      estimatedCost: { low: 400, high: 1500 },
      notes: ['Don’t store gasoline or propane tanks in enclosed garage', 'Install carbon monoxide detector', 'Floor drain maintenance: keep clear for DFW rain events', 'Magnetic tool strips on walls use zero floor space'],
    },
    mixed: {
      system: 'Zoned Multi-Use System',
      topItems: ['Overhead storage platform for seasonal items ($400-800)', 'Slatwall zones for different purposes ($600-1,200)', 'Rolling workbench (movable) ($400-700)', 'Epoxy floor throughout ($1,500-3,500)'],
      climateRecommendation: 'Portable AC ($300-600) for immediate relief; mini-split ($1,500-3,500) for long-term solution if you use the space regularly.',
      estimatedCost: { low: 2500, high: 7000 },
      notes: ['Zone your garage: parking zone, storage zone, work zone', 'Color-code zones with floor tape ($20) during planning phase', 'Mixed-use garages benefit most from epoxy floors — handles all uses', 'Keep 3' clearance around vehicle doors at minimum'],
    },
  };
  return plans[use];
}

export default function GarageOrganizationGuide() {
  const [sqft, setSqft] = useState('400');
  const [use, setUse] = useState<GarageUse>('mixed');
  const plan = getOrgPlan(Number(sqft) || 400, use);

  const dangerItems = ['Candles', 'Wine & alcohol', 'Medications', 'Cosmetics & lotions', 'Paint & stains', 'Electronics', 'Musical instruments', 'Photos & documents'];
  const safeItems = ['Power tools', 'Sports equipment', 'Outdoor furniture covers', 'Garden supplies', 'Holiday decorations (in airtight bins)', 'Lawn equipment', 'Ladders', 'Automotive supplies'];

  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#38bdf8', fontWeight: 600, letterSpacing: 1 }}>
          🏠 DFW HOMEOWNER GUIDES
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, color: '#f8fafc' }}>
          DFW Garage Organization Guide
        </h1>
        <p style={{ fontSize: 18, color: '#94a3b8', marginBottom: 40, lineHeight: 1.7 }}>
          The Extra Room Most Homeowners Ignore
        </p>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 32, borderLeft: '4px solid #f59e0b' }}>
          <p style={{ fontSize: 16, color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
            🌡️ <strong style={{ color: '#f1f5f9' }}>DFW garage reality:</strong> DFW's heat makes the garage one of the most challenging spaces to organize — products melt, pests invade, and Texas residents use garages year-round. A well-organized garage adds real value and usability.
          </p>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>⚠️ DFW-Specific Challenges</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🔥', title: 'Extreme Heat', body: 'Garage temps hit 130°F+ in DFW summer. Products melt, electronics fail, medications degrade, and wine is ruined. Plan storage accordingly.' },
            { icon: '🦂', title: 'Pest Invasion', body: 'Snakes, scorpions, and rodents seek garage shelter in both summer (cool) and winter (warm). Seal all entry points including gaps at garage door bottom.' },
            { icon: '💧', title: 'Spring/Fall Humidity', body: 'High humidity seasons cause tool rust and cardboard box deterioration. Use airtight plastic bins and consider a dehumidifier for valuable items.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#1e293b', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: '#f1f5f9', marginBottom: 8 }}>{item.title}</div>
              <div style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: 14 }}>{item.body}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>🗂️ Organization Systems + Costs</h2>
        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '⬆️', title: 'Overhead Storage Platform', cost: '$300-800', body: 'Best use of DFW garage vertical space. Keeps floor clear for parking. Great for seasonal items, holiday decorations, and rarely-used equipment.' },
            { icon: '🧱', title: 'Slatwall Systems', cost: '$400-1,200', body: 'Versatile wall-mounted panels with interchangeable hooks, bins, and shelves. Customizable and reconfigurable as needs change.' },
            { icon: '📌', title: 'Pegboard', cost: '$100-400', body: 'Classic tool organization solution. Inexpensive and highly visible. Works best for hand tools in workshop zones.' },
            { icon: '🪵', title: 'Custom Cabinets', cost: '$1,500-4,000', body: 'Best-looking solution. Hides clutter, withstands garage environment. Popular in DFW homes priced $500K+.' },
            { icon: '⚡', title: 'Garage Floor Epoxy', cost: '$1,500-3,500 professional', body: 'Transforms garage appearance and functionality. Easy to clean, resists stains, and is more durable than bare concrete. Not a DIY job in DFW heat (requires controlled conditions).' },
            { icon: '🚲', title: 'Bike Hoists', cost: '$80-150 each', body: 'Popular in DFW — keeps bikes accessible and off the floor. Simple pulley system. One of the highest ROI garage upgrades per dollar.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#1e293b', borderRadius: 10, padding: 20, display: 'flex', gap: 16 }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ fontWeight: 700, color: '#f1f5f9' }}>{item.title}</div>
                  <div style={{ color: '#22c55e', fontWeight: 700, fontSize: 13, marginLeft: 16, flexShrink: 0 }}>{item.cost}</div>
                </div>
                <div style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: 15 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>🌡️ What to Store (and NOT Store) in DFW Garage</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          <div style={{ background: '#1e293b', borderRadius: 12, padding: 20 }}>
            <div style={{ fontWeight: 700, color: '#22c55e', marginBottom: 12, fontSize: 16 }}>✅ SAFE TO STORE</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {safeItems.map(item => (
                <div key={item} style={{ color: '#94a3b8', fontSize: 14, display: 'flex', gap: 8 }}>
                  <span>•</span><span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#1e293b', borderRadius: 12, padding: 20 }}>
            <div style={{ fontWeight: 700, color: '#ef4444', marginBottom: 12, fontSize: 16 }}>🚫 HEAT DANGER ZONE</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {dangerItems.map(item => (
                <div key={item} style={{ color: '#94a3b8', fontSize: 14, display: 'flex', gap: 8 }}>
                  <span style={{ color: '#ef4444' }}>✗</span><span>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: '10px 14px', background: '#2d1616', borderRadius: 8, color: '#fca5a5', fontSize: 13, lineHeight: 1.5 }}>
              ⚠️ NEVER store propane tanks in enclosed garage or gasoline without an approved safety container
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>❄️ Climate Control Options</h2>
        <div style={{ display: 'grid', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '❄️', title: 'Mini-Split AC/Heat', cost: '$1,500-3,500 installed', body: 'Makes garage usable year-round. Required for workshops, gyms, and serious storage. Most cost-effective long-term solution for DFW heat.' },
            { icon: '💨', title: 'Portable AC', cost: '$300-600', body: 'Cheaper entry point. Less effective than mini-split but works for occasional use. Requires window/vent exhaust — most garages can accommodate.' },
            { icon: '🚪', title: 'Insulated Garage Door Upgrade', cost: '$800-1,500', body: 'Reduces heat gain significantly. R-value of 12-18 vs. standard door’s R-2. A worthwhile first step before adding active cooling.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#1e293b', borderRadius: 10, padding: 20, display: 'flex', gap: 16 }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ fontWeight: 700, color: '#f1f5f9' }}>{item.title}</div>
                  <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: 13, marginLeft: 16, flexShrink: 0 }}>{item.cost}</div>
                </div>
                <div style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: 15 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>🧮 Organization Planner</h2>
        <div style={{ background: '#1e293b', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 8, fontWeight: 600 }}>
                Garage Size (sq ft)
              </label>
              <input
                type="number"
                value={sqft}
                onChange={e => setSqft(e.target.value)}
                style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '12px 16px', color: '#f1f5f9', fontSize: 16, boxSizing: 'border-box' }}
                placeholder="400"
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 14, marginBottom: 8, fontWeight: 600 }}>
                Primary Use
              </label>
              <select
                value={use}
                onChange={e => setUse(e.target.value as GarageUse)}
                style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '12px 16px', color: '#f1f5f9', fontSize: 16, boxSizing: 'border-box' }}
              >
                <option value="mixed">Mixed Use</option>
                <option value="storage">Primary Storage</option>
                <option value="workshop">Workshop / Tools</option>
                <option value="gym">Home Gym</option>
                <option value="parking">Parking First</option>
              </select>
            </div>
          </div>

          <div style={{ background: '#0f172a', borderRadius: 12, padding: 20, marginBottom: 20 }}>
            <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>RECOMMENDED SYSTEM</div>
            <div style={{ color: '#f1f5f9', fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{plan.system}</div>
            <div style={{ color: '#f59e0b', fontSize: 18, fontWeight: 700 }}>
              Estimated Cost: ${plan.estimatedCost.low.toLocaleString()} – ${plan.estimatedCost.high.toLocaleString()}
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ color: '#94a3b8', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>TOP RECOMMENDED ITEMS</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {plan.topItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: '#22c55e', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ color: '#cbd5e1', fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#1a2535', borderRadius: 10, padding: 16, marginBottom: 20 }}>
            <div style={{ color: '#94a3b8', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>❄️ CLIMATE RECOMMENDATION</div>
            <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{plan.climateRecommendation}</div>
          </div>

          <div>
            <div style={{ color: '#94a3b8', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>DFW-SPECIFIC NOTES</div>
            <div style={{ display: 'grid', gap: 8 }}>
              {plan.notes.map((note, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: '#f59e0b', fontWeight: 700, flexShrink: 0 }}>→</span>
                  <span style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #0f2d4a)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🏗️</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9', marginBottom: 12 }}>Ready to Transform Your Garage?</h3>
          <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
            ProLnk connects you with vetted garage organization contractors, epoxy floor specialists, and HVAC pros in DFW.
          </p>
          <a href="/waitlist/homeowner" style={{ display: 'inline-block', background: '#38bdf8', color: '#0f172a', fontWeight: 800, padding: '14px 32px', borderRadius: 10, textDecoration: 'none', fontSize: 16 }}>
            Get Free Quotes
          </a>
        </div>

      </div>
    </div>
  );
}
