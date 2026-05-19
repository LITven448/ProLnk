import { useState } from 'react';

const decadeOptions = ['1930s–1950s', '1960s–1970s', '1980s–1990s', '2000s–2010s', '2011–Present'];
const sqftOptions = ['Under 3,000', '3,000–5,000', '5,000–8,000', 'Over 8,000'];

type BudgetItem = { category: string; annual: string; note: string };

const budgetData: Record<string, Record<string, BudgetItem[]>> = {
  '1930s–1950s': {
    'Under 3,000': [
      { category: 'HVAC Maintenance + Service', annual: '$1,800–$3,500/yr', note: 'Older system likely; annual tune-up + filter service' },
      { category: 'Foundation Monitoring + Repair', annual: '$2,000–$6,000/yr avg', note: 'PC clay soil; pier maintenance every few years' },
      { category: 'Roof (wood shake or slate replacement)', annual: '$3,500–$7,000/yr reserve', note: 'Lifespan 20–40 yrs; budget annually for eventual replacement' },
      { category: 'Plumbing (cast iron drains, galvanized supply)', annual: '$1,500–$4,000/yr', note: 'Camera scope every 3 yrs; targeted replacement' },
      { category: 'Electrical (panel/wiring safety upgrades)', annual: '$1,000–$3,500/yr', note: 'PC contractors charge 30–50% premium' },
      { category: 'Painting (exterior — historic palette)', annual: '$3,000–$6,000 every 5–7 yrs', note: 'Multi-color period-appropriate; fine finish painters' },
      { category: 'Landscape + Irrigation', annual: '$4,000–$9,000/yr', note: 'Formal turf, seasonal color, irrigation maintenance' },
    ],
    '3,000–5,000': [
      { category: 'Multi-zone HVAC maintenance', annual: '$2,500–$5,000/yr', note: '2–3 units; full service contracts' },
      { category: 'Foundation monitoring + piers', annual: '$3,000–$8,000/yr avg', note: 'More sq ft = more foundation perimeter risk' },
      { category: 'Roof replacement reserve', annual: '$5,000–$10,000/yr reserve', note: 'Larger roof = higher replacement cost' },
      { category: 'Plumbing maintenance', annual: '$2,000–$5,000/yr', note: 'More fixtures, more risk; drain scope important' },
      { category: 'Interior painting (formal rooms, high ceilings)', annual: '$4,000–$9,000 every 5–7 yrs', note: 'Specialty painters required for detailed moldings' },
      { category: 'Landscape + irrigation (larger lot)', annual: '$7,000–$15,000/yr', note: 'More beds, trees, formal gardens typical' },
      { category: 'Chimney (1–3 fireplaces)', annual: '$800–$2,500/yr', note: 'Annual inspection + cleaning; repoint as needed' },
    ],
    '5,000–8,000': [
      { category: 'Full HVAC system (3–4 units)', annual: '$4,000–$8,000/yr', note: 'Multiple units, service contracts, filter replacement' },
      { category: 'Foundation + structural', annual: '$4,000–$12,000/yr avg', note: 'Estate footprint; drainage management critical' },
      { category: 'Roof reserve (complex roofline)', annual: '$8,000–$16,000/yr reserve', note: 'Multiple slopes, dormers, slate or copper flashing' },
      { category: 'Full plumbing maintenance', annual: '$3,000–$7,000/yr', note: 'Cast iron drains at estate scale' },
      { category: 'Exterior maintenance (paint, masonry, windows)', annual: '$8,000–$18,000/yr', note: 'Stucco, brick, painted wood — all premium labor' },
      { category: 'Landscape (estate-level)', annual: '$12,000–$28,000/yr', note: 'Weekly service, seasonal plantings, irrigation' },
      { category: 'Smart home + security maintenance', annual: '$3,000–$7,000/yr', note: 'Annual calibration, updates, monitoring contracts' },
    ],
    'Over 8,000': [
      { category: 'HVAC (4–8 zones)', annual: '$7,000–$15,000/yr', note: 'Multiple RTUs or central systems; estate-scale service' },
      { category: 'Foundation + drainage estate management', annual: '$6,000–$20,000/yr avg', note: 'Full perimeter monitoring, French drains, piers' },
      { category: 'Roof (slate, tile, or copper)', annual: '$12,000–$25,000/yr reserve', note: 'Estate roof; specialty materials command 2× labor' },
      { category: 'Full estate plumbing maintenance', annual: '$4,000–$10,000/yr', note: 'Multiple bathrooms, kitchens, bars' },
      { category: 'Full estate exterior', annual: '$15,000–$35,000/yr', note: 'Masonry, paint, windows, portico maintenance' },
      { category: 'Landscape (full estate)', annual: '$20,000–$50,000/yr', note: 'Multiple crews, formal gardens, water features' },
      { category: 'Estate systems (elevator, generator, pool)', annual: '$8,000–$18,000/yr', note: 'Annual service contracts for all major systems' },
    ],
  },
  '1960s–1970s': {
    'Under 3,000': [
      { category: 'HVAC replacement/maintenance', annual: '$1,500–$3,000/yr', note: 'Units from this era near end of life; plan replacement' },
      { category: 'Foundation monitoring', annual: '$1,500–$4,500/yr avg', note: 'Concrete slab common; crack monitoring key' },
      { category: 'Roof maintenance', annual: '$1,800–$4,000/yr reserve', note: 'Composition shingle; replace every 20–25 yrs' },
      { category: 'Plumbing (copper supply, cast iron drain)', annual: '$1,000–$3,000/yr', note: 'Copper holds up; cast iron may need lining' },
      { category: 'Electrical (Zinsco/Federal Pacific panels)', annual: '$2,000–$5,000', note: 'URGENT: dangerous panels from this era need replacement' },
      { category: 'Landscape', annual: '$3,500–$7,500/yr', note: 'PC standard for well-maintained lots' },
      { category: 'Window replacement (original single-pane)', annual: '$4,000–$10,000 project', note: 'Energy and comfort upgrade; do in phases' },
    ],
    '3,000–5,000': [
      { category: 'Multi-zone HVAC', annual: '$2,200–$4,500/yr', note: '2–3 units; this era had oversized systems' },
      { category: 'Foundation', annual: '$2,000–$6,000/yr avg', note: 'Larger slab = more joints to monitor' },
      { category: 'Roof reserve', annual: '$3,500–$7,500/yr reserve', note: 'Budget for full replacement every 20–25 yrs' },
      { category: 'Plumbing maintenance', annual: '$1,500–$4,000/yr', note: 'Inspect drain lines; cast iron aging out' },
      { category: 'Electrical panel upgrade', annual: '$3,500–$8,000 project', note: 'Dangerous 1960s panels need immediate replacement' },
      { category: 'Kitchen/bath update reserve', annual: '$5,000–$10,000/yr reserve', note: 'PC buyers expect updated finishes' },
      { category: 'Landscape + irrigation', annual: '$6,000–$12,000/yr', note: 'Larger lots; weekly maintenance contract' },
    ],
    '5,000–8,000': [
      { category: 'Full HVAC (multiple units)', annual: '$3,500–$7,000/yr', note: 'Plan phased replacement of aging equipment' },
      { category: 'Foundation + drainage', annual: '$3,000–$9,000/yr avg', note: 'Estate slab; drainage design critical' },
      { category: 'Roof reserve', annual: '$6,000–$12,000/yr reserve', note: 'Hip/gable combinations typical of era' },
      { category: 'Full plumbing maintenance', annual: '$2,500–$6,000/yr', note: 'Multiple baths; drain scope annually' },
      { category: 'Electrical upgrade', annual: '$5,000–$12,000 project', note: 'Whole-home rewire may be needed' },
      { category: 'Exterior paint + masonry', annual: '$6,000–$14,000/yr', note: 'Brick or stucco common; premium painters' },
      { category: 'Landscape estate maintenance', annual: '$10,000–$22,000/yr', note: 'Mature trees + formal beds at this scale' },
    ],
    'Over 8,000': [
      { category: 'HVAC estate systems', annual: '$6,000–$13,000/yr', note: '4–6 units typical; full service contracts' },
      { category: 'Foundation estate management', annual: '$5,000–$15,000/yr avg', note: 'Full perimeter, piers, French drains' },
      { category: 'Roof (estate complex roofline)', annual: '$10,000–$22,000/yr reserve', note: 'Plan major investment every 20–25 yrs' },
      { category: 'Electrical estate upgrade', annual: '$8,000–$20,000 project', note: 'Full panel + partial rewire at estate scale' },
      { category: 'Exterior estate maintenance', annual: '$14,000–$30,000/yr', note: 'Brick, stucco, windows, trim — premium labor' },
      { category: 'Estate landscape + irrigation', annual: '$18,000–$45,000/yr', note: 'Multiple crews, water features, seasonal plants' },
      { category: 'Estate systems maintenance', annual: '$6,000–$15,000/yr', note: 'Pool, generator, security, smart home' },
    ],
  },
  '1980s–1990s': {
    'Under 3,000': [
      { category: 'HVAC maintenance (aging R-22 systems)', annual: '$1,200–$2,500/yr', note: 'R-22 refrigerant ban — plan replacement now' },
      { category: 'Foundation', annual: '$1,200–$3,500/yr avg', note: 'Concrete slab; monitor for cracks every 2 yrs' },
      { category: 'Roof (shingle, 25–35 yr lifespan)', annual: '$2,000–$4,500/yr reserve', note: 'May be approaching replacement window' },
      { category: 'Plumbing (copper supply, may have cast iron)', annual: '$800–$2,500/yr', note: 'Copper holds; camera scope drains' },
      { category: 'Exterior (siding, trim, caulking)', annual: '$1,500–$3,500/yr', note: 'Brick common in PC; maintain mortar joints' },
      { category: 'Kitchen/bath update reserve', annual: '$3,000–$7,000/yr reserve', note: '1980s–90s finishes dated; buyers expect updated' },
      { category: 'Landscape', annual: '$3,000–$6,500/yr', note: 'Mature trees — pruning + storm prep important' },
    ],
    '3,000–5,000': [
      { category: 'HVAC (2 units, R-22 replacement)', annual: '$2,000–$4,500/yr', note: 'R-22 units must be replaced; budget for this now' },
      { category: 'Foundation', annual: '$2,000–$5,000/yr avg', note: 'Larger slab; more perimeter to monitor' },
      { category: 'Roof reserve', annual: '$3,500–$7,000/yr reserve', note: '30–35 yr shingles may be at end of life' },
      { category: 'Plumbing maintenance', annual: '$1,200–$3,500/yr', note: 'Inspect all drain lines; camera scope' },
      { category: 'Exterior + masonry (brick repoint)', annual: '$2,500–$5,500/yr', note: 'Mortar joints deteriorate; expensive at PC scale' },
      { category: 'Kitchen/bath renovations', annual: '$8,000–$20,000/yr reserve', note: 'Phased updates to stay competitive in PC market' },
      { category: 'Landscape + irrigation', annual: '$5,500–$11,000/yr', note: 'Mature trees + formal beds' },
    ],
    '5,000–8,000': [
      { category: 'HVAC (3–4 units, replacement cycle)', annual: '$3,500–$7,000/yr', note: 'Stagger replacements; full system every 15–18 yrs' },
      { category: 'Foundation + structural', annual: '$3,000–$8,000/yr avg', note: 'Estate-size slab; drainage management key' },
      { category: 'Roof reserve (complex)', annual: '$6,000–$12,000/yr reserve', note: 'Multiple rooflines; plan major replacement' },
      { category: 'Full plumbing maintenance', annual: '$2,000–$5,000/yr', note: 'Multiple baths; annual drain scope' },
      { category: 'Kitchen renovation reserve', annual: '$10,000–$20,000/yr reserve', note: '1980s–90s kitchens must be updated for PC market' },
      { category: 'Exterior estate (paint, masonry, windows)', annual: '$8,000–$18,000/yr', note: 'Large exterior surface area; premium labor' },
      { category: 'Estate landscape', annual: '$11,000–$24,000/yr', note: 'Mature estate grounds' },
    ],
    'Over 8,000': [
      { category: 'HVAC estate (5–8 units)', annual: '$6,000–$14,000/yr', note: 'Phase replacement; all R-22 units must go' },
      { category: 'Foundation estate (full perimeter)', annual: '$5,000–$14,000/yr avg', note: 'Full perimeter drainage + pier maintenance' },
      { category: 'Roof estate reserve', annual: '$10,000–$22,000/yr reserve', note: 'Complex roofline; tile or standing seam possible' },
      { category: 'Full estate electrical maintenance', annual: '$3,000–$7,000/yr', note: 'Panel upgrades, arc fault breakers, EV charging' },
      { category: 'Estate kitchen/bath renovation', annual: '$15,000–$30,000/yr reserve', note: 'PC buyers expect designer finishes' },
      { category: 'Exterior estate maintenance', annual: '$14,000–$30,000/yr', note: 'Brick, windows, trim, portico' },
      { category: 'Estate landscape + irrigation', annual: '$20,000–$50,000/yr', note: 'Full estate grounds; multiple crews' },
    ],
  },
  '2000s–2010s': {
    'Under 3,000': [
      { category: 'HVAC maintenance (R-410A systems)', annual: '$900–$2,000/yr', note: 'Annual tune-up; filter service contract' },
      { category: 'Foundation monitoring', annual: '$800–$2,500/yr avg', note: 'Slab; annual inspection sufficient' },
      { category: 'Roof (architectural shingle)', annual: '$1,200–$2,800/yr reserve', note: '30-yr shingles; inspect after every major storm' },
      { category: 'Plumbing (PEX or copper)', annual: '$600–$1,800/yr', note: 'Modern materials; routine maintenance sufficient' },
      { category: 'Exterior maintenance (stucco or brick)', annual: '$1,000–$2,500/yr', note: 'Caulk windows; check stucco for cracks annually' },
      { category: 'Landscape + irrigation', annual: '$2,800–$6,000/yr', note: 'PC standard; irrigation controller upgrade' },
      { category: 'Smart home updates', annual: '$500–$2,000/yr', note: 'This era had early smart systems; update hardware' },
    ],
    '3,000–5,000': [
      { category: 'HVAC (2–3 zones)', annual: '$1,500–$3,500/yr', note: 'Multi-zone; ensure balanced airflow' },
      { category: 'Foundation', annual: '$1,200–$3,500/yr avg', note: 'Annual check; add French drain if grading issues' },
      { category: 'Roof reserve', annual: '$2,500–$5,500/yr reserve', note: 'Budget for full replacement around year 25–30′ },
      { category: 'Plumbing maintenance', annual: '$800–$2,500/yr', note: 'Modern materials; inspect water heater' },
      { category: 'Exterior (stucco, brick, Hardie)', annual: '$1,800–$4,000/yr', note: 'Stucco cracks if not sealed; Hardie needs paint' },
      { category: 'Landscape', annual: '$5,000–$10,000/yr', note: 'Established gardens; irrigation system service' },
      { category: 'Kitchen/bath refresh reserve', annual: '$4,000–$9,000/yr reserve', note: '2000s finishes beginning to date' },
    ],
    '5,000–8,000': [
      { category: 'HVAC (3–4 zone system)', annual: '$2,800–$6,000/yr', note: 'Full service contract; filter replacement' },
      { category: 'Foundation + drainage', annual: '$2,000–$5,500/yr avg', note: 'Estate footprint; drainage management' },
      { category: 'Roof reserve (complex)', annual: '$5,000–$10,000/yr reserve', note: 'Multiple rooflines; inspect annually' },
      { category: 'Smart home + AV maintenance', annual: '$2,500–$6,000/yr', note: 'Update Control4, Lutron, AV equipment' },
      { category: 'Exterior (large stucco or brick facade)', annual: '$5,000–$12,000/yr', note: 'Annual caulking + stucco touch-up' },
      { category: 'Estate landscape', annual: '$10,000–$22,000/yr', note: 'Established formal grounds' },
      { category: 'Pool maintenance (if applicable)', annual: '$3,500–$8,000/yr', note: 'Weekly service + annual equipment inspection' },
    ],
    'Over 8,000': [
      { category: 'HVAC estate (4–6 zones)', annual: '$5,000–$11,000/yr', note: 'Full service contracts; phased equipment updates' },
      { category: 'Foundation estate', annual: '$3,500–$9,000/yr avg', note: 'Full perimeter; French drains if not already present' },
      { category: 'Roof estate reserve', annual: '$8,000–$18,000/yr reserve', note: 'Complex roofline; premium materials' },
      { category: 'Smart home estate maintenance', annual: '$5,000–$12,000/yr', note: 'Crestron/Control4 annual calibration + updates' },
      { category: 'Exterior estate', annual: '$12,000–$25,000/yr', note: 'Stucco, stone, brick — premium labor' },
      { category: 'Estate landscape', annual: '$18,000–$42,000/yr', note: 'Formal grounds + water features + irrigation' },
      { category: 'Estate systems (pool, generator, elevator)', annual: '$7,000–$15,000/yr', note: 'All major systems on service contracts' },
    ],
  },
  '2011–Present': {
    'Under 3,000': [
      { category: 'HVAC routine maintenance', annual: '$700–$1,500/yr', note: 'Annual tune-up; filter subscription service' },
      { category: 'Foundation monitoring', annual: '$500–$1,500/yr avg', note: 'New builds still settle; monitor cracks' },
      { category: 'Roof inspection (post-storm)', annual: '$800–$1,800/yr reserve', note: 'Architectural shingle; inspect after hail' },
      { category: 'Smart home maintenance', annual: '$600–$2,000/yr', note: 'Ring, Nest, Lutron — annual calibration' },
      { category: 'Landscape establishment', annual: '$2,500–$5,500/yr', note: 'New sod + trees need 3–5 yrs to establish' },
      { category: 'Warranty claims management', annual: '$0 (builder covers)', note: 'Track all issues; file before 1-yr builder warranty expires' },
      { category: 'HOA maintenance compliance', annual: '$500–$2,000/yr', note: 'PC HOA standards require ongoing upkeep' },
    ],
    '3,000–5,000': [
      { category: 'HVAC (multi-zone, modern)', annual: '$1,200–$2,800/yr', note: 'Service contract; verify refrigerant levels' },
      { category: 'Foundation first 5 years', annual: '$800–$2,500/yr avg', note: 'Settlement common; monitor + add gutters' },
      { category: 'Roof (30-yr architectural)', annual: '$1,800–$4,000/yr reserve', note: 'First 10 yrs low maintenance; inspect post-hail' },
      { category: 'Smart home updates', annual: '$1,000–$3,000/yr', note: 'Keep systems current; manufacturer updates' },
      { category: 'Landscape maturation', annual: '$4,500–$9,000/yr', note: 'PC standard; irrigation, seasonal color' },
      { category: 'Builder warranty management', annual: '$0 (builder covers)', note: 'Document everything in first 1–10 years' },
      { category: 'Exterior (stucco or stone maintenance)', annual: '$1,200–$3,000/yr', note: 'Annual caulking + grout inspection' },
    ],
    '5,000–8,000': [
      { category: 'HVAC (3–4 zone, high-efficiency)', annual: '$2,000–$5,000/yr', note: 'Full service contract; zoning balance check' },
      { category: 'Foundation + site drainage', annual: '$1,500–$4,000/yr avg', note: 'New construction settles 3–7 years' },
      { category: 'Smart home estate maintenance', annual: '$2,000–$5,000/yr', note: 'Crestron/Control4 calibration + updates' },
      { category: 'Landscape estate establishment', annual: '$9,000–$20,000/yr', note: 'Large lot; formal garden establishment' },
      { category: 'Pool maintenance (if included)', annual: '$3,000–$7,000/yr', note: 'Weekly service + equipment checks' },
      { category: 'Exterior estate maintenance', annual: '$4,000–$9,000/yr', note: 'Stone, stucco, windows — annual inspection' },
      { category: 'Builder warranty + extended warranty', annual: '$1,500–$4,000/yr', note: 'Extended structural warranty often worth it' },
    ],
    'Over 8,000': [
      { category: 'HVAC estate (5–8 zones)', annual: '$4,000–$10,000/yr', note: 'Full service contracts for all units' },
      { category: 'Foundation estate (active monitoring)', annual: '$2,500–$7,000/yr avg', note: 'New large slab settles significantly year 1–5′ },
      { category: 'Smart home estate maintenance', annual: '$5,000–$12,000/yr', note: 'Crestron annual calibration + hardware updates' },
      { category: 'Estate landscape maturation', annual: '$18,000–$40,000/yr', note: 'Significant investment to reach PC standards' },
      { category: 'Estate exterior maintenance', annual: '$10,000–$22,000/yr', note: 'Stone, stucco, trim — premium painters' },
      { category: 'Estate systems (pool, generator, elevator, theater)', annual: '$8,000–$18,000/yr', note: 'All new systems on manufacturer service contracts' },
      { category: 'Extended builder warranty program', annual: '$2,000–$5,000/yr', note: '10-year structural warranty; worth every dollar' },
    ],
  },
};

export default function DFWParkCitiesHomeGuide() {
  const [decade, setDecade] = useState('');
  const [sqft, setSqft] = useState('');

  const items = decade && sqft ? budgetData[decade]?.[sqft] ?? [] : [];

  const totalLow = items.reduce((acc, item) => {
    const match = item.annual.match(/\$([0-9,]+)/);
    return acc + (match ? parseInt(match[1].replace(/,/g, '')) : 0);
  }, 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>🏙️ DALLAS NEIGHBORHOOD GUIDE</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8 }}>Park Cities</h1>
        <h2 style={{ fontSize: 18, fontWeight: 400, color: '#a0b0c8', marginBottom: 24 }}>University Park & Highland Park — Annual Maintenance Budget Guide</h2>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 28, borderLeft: '4px solid #F5E642′ }}>
          <p style={{ margin: 0, lineHeight: 1.7, color: '#c8d8e8′ }}>
            The Park Cities are among Texas's most prestigious ZIP codes. Homes range from 1930s estates to brand-new custom builds — all in a pocket city with underground utilities, strict HOA standards, and <strong style={{ color: '#F5E642' }}>the highest contractor expectations in DFW</strong>. Select your home’s decade and size to get a realistic annual maintenance budget with Park Cities pricing premiums built in.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#F5E642', fontWeight: 600, fontSize: 14 }}>🏗️ Home Decade</label>
            <select value={decade} onChange={e => setDecade(e.target.value)} style={{ width: '100%', backgroundColor: '#0f2040', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Select era…</option>
              {decadeOptions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: 8, color: '#F5E642', fontWeight: 600, fontSize: 14 }}>📐 Square Footage</label>
            <select value={sqft} onChange={e => setSqft(e.target.value)} style={{ width: '100%', backgroundColor: '#0f2040', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', fontSize: 15 }}>
              <option value="">Select size…</option>
              {sqftOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {items.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, margin: 0 }}>Annual Maintenance Budget</h3>
              <div style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 8, fontWeight: 700, fontSize: 14 }}>
                Starting ~${totalLow.toLocaleString()}/yr
              </div>
            </div>
            {items.map((item, i) => (
              <div key={i} style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '14px 18px', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.category}</div>
                  <div style={{ fontSize: 13, color: '#a0b0c8′ }}>💡 {item.note}</div>
                </div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', textAlign: 'right' }}>{item.annual}</div>
              </div>
            ))}
            <div style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: 16, marginTop: 8, fontSize: 13, color: '#a0b0c8′ }}>
              ⭐ Park Cities contractors charge 30–80% above standard DFW rates. Budget these figures as minimum — actual costs may be higher depending on material choices and project complexity.
            </div>
          </div>
        )}

        {!decade && !sqft && (
          <div style={{ textAlign: 'center', padding: 40, color: '#4a6a8a' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏡</div>
            <div style={{ fontSize: 16 }}>Select your home's decade and size to calculate your Park Cities maintenance budget.</div>
          </div>
        )}

        <div style={{ marginTop: 36, padding: 20, backgroundColor: '#0f2040', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Find Park Cities–Grade Contractors</div>
          <div style={{ color: '#a0b0c8', fontSize: 14, marginBottom: 16 }}>ProLnk matches Park Cities homeowners with contractors who meet UP/HP standards — vetted, experienced, and discretion-first.</div>
          <div style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Get My Matches →</div>
        </div>
      </div>
    </div>
  );
}
