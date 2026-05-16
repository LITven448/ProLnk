import { useState } from 'react';

const repairTypes = [
  'Shingle Replacement (per square)',
  'Ridge Cap Replacement',
  'Flashing Repair (step/counter)',
  'Drip Edge Replacement',
  'Pipe Boot / Roof Penetration',
  'Valley Repair',
  'Decking Repair (per sheet)',
  'Gutter Reattachment',
];

const dfwLocations = ['Dallas County', 'Tarrant County (Fort Worth)', 'Collin County (Plano/Frisco)', 'Denton County', 'Rockwall/Kaufman County'];

type RepairDetail = {
  low: number; high: number; avgTime: string; diyViability: string; permitRequired: string; dfwNote: string;
};

const repairData: Record<string, RepairDetail> = {
  'Shingle Replacement (per square)': {
    low: 150, high: 400, avgTime: '2-4 hours per square', diyViability: 'Possible — requires safety equipment and basic carpentry skills. DFW pitch typical 4:12 to 6:12.', permitRequired: 'Not required for repair under 25% of roof area in most DFW cities', dfwNote: 'DFW hail often requires 15-40 square replacement. Insurance should cover if hail event documented.'
  },
  'Ridge Cap Replacement': {
    low: 300, high: 600, avgTime: '3-6 hours full ridge', diyViability: 'Moderate difficulty — ridge is highest point, safety harness essential in DFW', permitRequired: 'Not required in most DFW municipalities', dfwNote: 'DFW wind regularly lifts ridge caps. Check after any storm with 60+ mph gusts. Often covered by homeowner insurance.'
  },
  'Flashing Repair (step/counter)': {
    low: 200, high: 500, avgTime: '2-5 hours depending on location', diyViability: 'Not recommended for DIY — DFW chimney and skylight flashing requires soldering or specialized sealants', permitRequired: 'Not required typically', dfwNote: 'Chimney flashing failure is the 1 cause of DFW interior water damage. Most DFW homes have brick chimneys — counter flashing repair requires masonry experience.'
  },
  'Drip Edge Replacement': {
    low: 200, high: 400, avgTime: '3-5 hours for average DFW home', diyViability: 'Moderate — requires removing first course of shingles and reinstalling. Feasible for experienced DIYer.', permitRequired: 'Not required in most DFW cities', dfwNote: 'Drip edge failure allows DFW storm water to penetrate fascia board. Check after severe hail — impact can lift or crack aluminum drip edge.'
  },
  'Pipe Boot / Roof Penetration': {
    low: 75, high: 200, avgTime: '30-90 minutes per boot', diyViability: 'Yes — pipe boot replacement is one of the best DIY roof repairs. Rubber boots available at DFW home centers.', permitRequired: 'Not required', dfwNote: 'DFW UV and heat degrade rubber boots in 8-12 years. Cracked boots are a top cause of attic water damage. Inspect all boots after hail events.'
  },
  'Valley Repair': {
    low: 400, high: 900, avgTime: '4-8 hours for open valley', diyViability: 'Not recommended — valley metal must be properly lapped and sealed. DFW hail can puncture existing valley metal.', permitRequired: 'Not required typically', dfwNote: 'DFW homes with multiple roof planes have many valleys. Open metal valleys last longer than closed-cut shingle valleys in DFW hail.'
  },
  'Decking Repair (per sheet)': {
    low: 100, high: 250, avgTime: '1-2 hours per 4x8 sheet', diyViability: 'Moderate — requires shingle removal and reinstall over new OSB or plywood. Feasible with proper safety equipment.', permitRequired: 'May be required if structural — check with your DFW city building department', dfwNote: 'Decking damage in DFW usually from long-term leak, not hail. Identify and fix the leak source first or new decking will fail too.'
  },
  'Gutter Reattachment': {
    low: 150, high: 350, avgTime: '2-4 hours for average DFW home', diyViability: 'Yes — gutter spike replacement with gutter screws is a common and accessible DIY repair', permitRequired: 'Not required', dfwNote: 'DFW hail and ice storms routinely pull gutters away from fascia. Replace old spikes with 6" gutter screws — far more secure in DFW wind events.'
  },
};

const locationMultiplier: Record<string, number> = {
  'Dallas County': 1.10,
  'Tarrant County (Fort Worth)': 1.00,
  'Collin County (Plano/Frisco)': 1.15,
  'Denton County': 1.05,
  'Rockwall/Kaufman County': 0.95,
};

export default function DFWRoofRepairCostBreakdown() {
  const [repairType, setRepairType] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState(1);

  const repair = repairType ? repairData[repairType] : null;
  const multiplier = location ? locationMultiplier[location] : 1;

  const lowTotal = repair ? Math.round(repair.low * multiplier * quantity) : 0;
  const highTotal = repair ? Math.round(repair.high * multiplier * quantity) : 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '13px' }}>🏠 ProLnk DFW Roofing Guides</div>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#F5E642', marginBottom: '8px' }}>Roof Repair Cost Breakdown — DFW</h1>
        <p style={{ color: '#9BA3B8', marginBottom: '24px', lineHeight: '1.6' }}>
          Detailed cost estimates for common DFW roof repairs with location-adjusted pricing, DIY viability assessment, and permit guidance. DFW labor rates vary by county — Collin County (Plano/Frisco) typically runs 10-15% above Fort Worth metro.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          {[{ label: '🏗️ Most Common DFW', val: 'Shingle + ridge cap after hail' }, { label: '💰 Average DFW Repair', val: '$800-3,500 total' }, { label: '📋 Permit Threshold', val: 'Most repairs under 25% area' }, { label: '🛡️ Insurance', val: 'Hail repairs often covered' }].map(({ label, val }) => (
            <div key={label} style={{ background: '#111E35', borderRadius: '10px', padding: '16px', border: '1px solid #1E2D47' }}>
              <div style={{ color: '#F5E642', fontSize: '13px', marginBottom: '4px' }}>{label}</div>
              <div style={{ fontWeight: 600, fontSize: '13px' }}>{val}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#111E35', borderRadius: '12px', padding: '24px', border: '1px solid #1E2D47', marginBottom: '16px' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '16px', fontSize: '18px' }}>🔧 Cost Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div style={{ gridColumn: '1/-1' }}>
              <label style={{ color: '#9BA3B8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Repair Type</label>
              <select value={repairType} onChange={e => setRepairType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E2D47', borderRadius: '8px', padding: '10px', fontSize: '14px' }}>
                <option value=''>Select repair type...</option>
                {repairTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#9BA3B8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>DFW Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E2D47', borderRadius: '8px', padding: '10px', fontSize: '14px' }}>
                <option value=''>Select county...</option>
                {Object.keys(locationMultiplier).map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#9BA3B8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Quantity</label>
              <input type='number' min={1} max={50} value={quantity} onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E2D47', borderRadius: '8px', padding: '10px', fontSize: '14px' }} />
            </div>
          </div>
          {repair && (
            <div>
              {location && (
                <div style={{ background: '#0A1628', borderRadius: '10px', padding: '20px', border: '2px solid #F5E642', marginBottom: '12px', textAlign: 'center' }}>
                  <div style={{ color: '#9BA3B8', fontSize: '13px', marginBottom: '4px' }}>Estimated Cost ({location})</div>
                  <div style={{ color: '#F5E642', fontSize: '32px', fontWeight: 700 }}>${lowTotal.toLocaleString()} – ${highTotal.toLocaleString()}</div>
                  <div style={{ color: '#9BA3B8', fontSize: '12px', marginTop: '4px' }}>Qty: {quantity} | Time: {repair.avgTime}</div>
                </div>
              )}
              <div style={{ background: '#0A1628', borderRadius: '10px', padding: '16px', border: '1px solid #1E2D47' }}>
                <div style={{ marginBottom: '10px' }}><span style={{ color: '#F5E642' }}>DIY Viability: </span>{repair.diyViability}</div>
                <div style={{ marginBottom: '10px' }}><span style={{ color: '#F5E642' }}>Permit Required: </span>{repair.permitRequired}</div>
                <div><span style={{ color: '#F5E642' }}>DFW Note: </span>{repair.dfwNote}</div>
              </div>
            </div>
          )}
        </div>
        <div style={{ background: '#111E35', borderRadius: '10px', padding: '16px', border: '1px solid #1E2D47' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '8px' }}>🛡️ DFW Insurance Tip</div>
          <p style={{ color: '#9BA3B8', fontSize: '14px', margin: 0, lineHeight: '1.6' }}>DFW homeowners file more roof insurance claims than almost any other metro in the US due to hail frequency. Always get a professional roof inspection after any hail event — even small hail can cause functional damage that is invisible from the ground. File claims within 1 year of the storm event (Texas statute of limitations).</p>
        </div>
      </div>
    </div>
  );
}
