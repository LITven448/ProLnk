import { useState } from 'react';

const NEEDS = ['Lawn equipment', 'Holiday decor / boxes', 'Sports gear / bikes', 'Power tools / workshop', 'Furniture cushions'];
const YARD_SIZES = ['Small patio / no yard', 'Medium yard (<0.25 acre)', 'Large yard (0.25–1 acre)', 'Acreage (1+ acres)'];
const HOA_STATUS = ['HOA with restrictions', 'HOA lenient / unknown', 'No HOA'];

function getStorageRecommendation(need: string, yard: string, hoa: string) {
  const hasHOA = hoa.includes('with restrictions');
  const noYard = yard.includes('patio');
  const isAcreage = yard.includes('Acreage');
  const isTool = need.includes('tools') || need.includes('equipment');

  if (hasHOA) {
    return {
      solution: 'Enclosed Shed (HOA-approved style) or Interior Storage',
      note: 'Most DFW HOAs ban visible storage. If a shed is allowed, it must match home exterior — cedar or vinyl siding required. Get approval in writing first.',
      shelving: 'Interior: wall-mounted steel racks. Shed: floor shelving + pegboard tools wall.',
      cost: 'Permitted shed: $2,500–$8,000 installed | Interior cabinet system: $400–$1,800',
    };
  }
  if (noYard) {
    return {
      solution: 'Climate-Controlled Storage Unit or Deck Box',
      note: 'DFW heat destroys items in outdoor plastic bins in 2–3 seasons. Deck boxes rated for outdoor use work for cushions/gear. Tools need climate-controlled unit.',
      shelving: 'Deck box (120+ gallon) or rented 5x10 climate-controlled unit nearby.',
      cost: 'Deck box: $150–$400 | Storage unit: $60–$120/mo',
    };
  }
  if (isAcreage && isTool) {
    return {
      solution: 'Metal Carport + Workshop Shed',
      note: 'On DFW acreage, metal buildings are most cost-effective but get extremely hot (130°F+) in summer. Add ridge vent and insulation for tools.',
      shelving: 'Metal shelving rated 1,000+ lbs, ceiling hooks for hoses/cords, pegboard for hand tools.',
      cost: '$3,000–$12,000 for insulated metal building | Shelving: $500–$1,500',
    };
  }
  return {
    solution: isTool ? 'Insulated Wood Shed' : 'Resin Shed or Large Deck Box',
    note: 'Metal sheds in DFW reach 140°F+ in summer — batteries and adhesives degrade fast. Wood or insulated sheds protect equipment better. Resin sheds are mid-range.',
    shelving: 'Wire shelving for garden gear, heavy-duty for equipment. Add dehumidifier in DFW summers.',
    cost: isTool ? '$1,800–$5,000 installed' : '$800–$2,200 installed',
  };
}

export default function DFWOutdoorStorageGuide() {
  const [need, setNeed] = useState('');
  const [yard, setYard] = useState('');
  const [hoa, setHoa] = useState('');
  const result = need && yard && hoa ? getStorageRecommendation(need, yard, hoa) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🏚️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Outdoor Storage Guide</h1>
        <p style={{ color: '#9BA3B8', marginBottom: 32 }}>DFW's extreme heat, UV exposure, and humidity deteriorate outdoor storage faster than most climates. What you store and how matters — the wrong shed can destroy your belongings.</p>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 600, marginBottom: 16 }}>⚠️ DFW Storage Hazards</h2>
          <ul style={{ color: '#9BA3B8', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Metal sheds reach 130–145°F interior — batteries explode, paint cracks, adhesives melt</li>
            <li>UV fades and cracks plastic in 3–5 years without UV-resistant rating</li>
            <li>DFW humidity encourages mold in enclosed spaces — add ventilation</li>
            <li>Most DFW HOAs require shed permit + exterior material matching home</li>
          </ul>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 600, marginBottom: 20 }}>🔧 Storage Solution Finder</h2>
          {[{ label: 'Storage Need', value: need, set: setNeed, options: NEEDS },
            { label: 'Yard Size', value: yard, set: setYard, options: YARD_SIZES },
            { label: 'HOA Status', value: hoa, set: setHoa, options: HOA_STATUS }].map(({ label, value, set, options }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <label style={{ color: '#9BA3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>{label}</label>
              <select value={value} onChange={e => set(e.target.value)}
                style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select...</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, marginTop: 8, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{result.solution}</div>
              <div style={{ color: '#9BA3B8', fontSize: 14, marginBottom: 12 }}>{result.note}</div>
              <div style={{ background: '#111E35', borderRadius: 8, padding: '10px 16px', marginBottom: 10 }}>
                <div style={{ color: '#9BA3B8', fontSize: 11 }}>SHELVING RECOMMENDATION</div>
                <div style={{ color: '#E8EAF0', fontSize: 14 }}>{result.shelving}</div>
              </div>
              <div style={{ background: '#111E35', borderRadius: 8, padding: '10px 16px' }}>
                <div style={{ color: '#9BA3B8', fontSize: 11 }}>EST. COST</div>
                <div style={{ color: '#F5E642', fontSize: 14, fontWeight: 700 }}>{result.cost}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 600, marginBottom: 12 }}>📋 Shed Material Comparison</h2>
          {[['Metal Shed', 'Cheapest, most durable structure — but DFW heat makes interior unusable for anything heat-sensitive.'],
            ['Resin/Vinyl Shed', 'UV-resistant, mid-price, no rot. Better than metal for stored items but still gets hot.'],
            ['Wood Shed', 'Best insulation properties, paintable, HOA-friendly — but requires DFW staining every 3–5 years.'],
            ['Climate-Controlled Unit', 'Best for tools, electronics, collectibles. Rented offsite — no permit needed.']].map(([type, desc]) => (
            <div key={type} style={{ borderBottom: '1px solid #1E3A5F', paddingBottom: 12, marginBottom: 12 }}>
              <span style={{ color: '#F5E642', fontWeight: 600 }}>{type}: </span>
              <span style={{ color: '#9BA3B8', fontSize: 14 }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
