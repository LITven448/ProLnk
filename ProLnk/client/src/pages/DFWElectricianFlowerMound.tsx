import { useState } from 'react';

const homeVintages = ['1990 – 1999', '2000 – 2009', '2010 – 2019', '2020 – Present'];
const serviceNeeds = ['Panel Upgrade', 'EV Charger Install', 'Whole-Home Generator', 'Outlet / Wiring', 'Outdoor / Dock Wiring'];

type ElecResult = { permit: string; details: string; cost: string; note: string };

const matrix: Record<string, Record<string, ElecResult>> = {
  '1990 – 1999': {
    'Panel Upgrade': { permit: '📋 Permit Required', details: '100A panels from this era need upgrade to 200A+ for modern loads. Denton County permit required — 5–10 day turnaround.', cost: '$2,200 – $3,800', note: 'Most 90s Flower Mound homes have undersized panels for today\’s load.' },
    'EV Charger Install': { permit: '📋 Permit Required', details: '240V/50A dedicated circuit plus panel capacity check. Older panels may require upgrade first.', cost: '$800 – $2,500', note: 'Panel upgrade may add $1,500–$2,500 to project if needed.' },
    'Whole-Home Generator': { permit: '📋 Permit + Inspection', details: 'Standby generator with transfer switch. Requires load calculation and utility notification in Denton County.', cost: '$8,000 – $16,000', note: 'Permit required. Inspection within 30 days of install.' },
    'Outlet / Wiring': { permit: '📋 Permit Varies', details: 'New circuits require permit. Simple outlet replacement may not. Confirm with contractor before starting.', cost: '$150 – $600/outlet', note: 'Aluminum wiring in some 90s homes requires anti-oxidant treatment at connections.' },
    'Outdoor / Dock Wiring': { permit: '📋 Permit Required', details: 'Lake Grapevine and Lake Lewisville properties require weatherproof GFCI outdoor circuits with Denton County permit.', cost: '$1,200 – $4,500', note: 'Dock wiring requires separate inspection and waterproof conduit.' },
  },
  '2000 – 2009': {
    'Panel Upgrade': { permit: '📋 Permit Required', details: '150–200A panels common. Upgrade to 400A if adding solar, EVs, or generator. Denton County permit standard.', cost: '$2,800 – $4,500', note: 'Early 2000s panels often have capacity — full replacement still recommended by age 20+.' },
    'EV Charger Install': { permit: '📋 Permit Required', details: 'Level 2 charger on 50A dedicated circuit. Panels from this era usually have capacity without upgrade.', cost: '$650 – $1,800', note: 'Smart charger installation adds $200–$400 but allows load management.' },
    'Whole-Home Generator': { permit: '📋 Permit + Inspection', details: 'Generac or Kohler standby with automatic transfer switch. Flower Mound HOAs may require enclosure.', cost: '$9,000 – $18,000', note: 'Check HOA guidelines before selecting placement — some communities restrict.' },
    'Outlet / Wiring': { permit: '📋 Permit Varies', details: 'Modern wiring standards — most runs straightforward. Attic access often available for new circuit routing.', cost: '$120 – $450/outlet', note: 'AFCI breakers now required for bedroom circuits in Denton County.' },
    'Outdoor / Dock Wiring': { permit: '📋 Permit Required', details: 'GFCI protection mandatory within 6 feet of water. Dock circuits require marine-grade materials.', cost: '$1,000 – $3,800', note: 'Annual GFCI testing recommended for all lakefront electrical.' },
  },
  '2010 – 2019': {
    'Panel Upgrade': { permit: '📋 Permit Required', details: 'Homes from this era typically have 200A panels. Upgrade to 400A only if adding significant load.', cost: '$3,200 – $5,500', note: 'Solar + EV + generator load may necessitate 400A service upgrade.' },
    'EV Charger Install': { permit: '📋 Permit Required', details: 'Modern panels handle EV load well. Level 2 install is typically 1-day project.', cost: '$600 – $1,500', note: 'Smart load management hardware recommended for homes with solar.' },
    'Whole-Home Generator': { permit: '📋 Permit + Inspection', details: 'Easiest era for generator integration — modern transfer switch compatibility.', cost: '$8,500 – $16,000', note: 'Natural gas line capacity check required before sizing generator.' },
    'Outlet / Wiring': { permit: '📋 Permit Varies', details: 'All circuits already AFCI/GFCI compliant. Simple additions rarely trigger full permit.', cost: '$100 – $350/outlet', note: 'Easy access panels and modern wiring make additional circuits cost-effective.' },
    'Outdoor / Dock Wiring': { permit: '📋 Permit Required', details: 'Modern outdoor wiring is straightforward. Dock systems may require marine electrician specialty.', cost: '$900 – $3,200', note: 'Outdoor kitchen circuits require weatherproof enclosures and GFCI breakers.' },
  },
  '2020 – Present': {
    'Panel Upgrade': { permit: '📋 Permit Required', details: 'New construction at 200A+ standard. Upgrade only if adding solar array or multiple EVs.', cost: '$3,500 – $6,000', note: 'Smart panels (Span, Square D Schneider) worth considering at this stage.' },
    'EV Charger Install': { permit: '📋 Permit Required', details: 'Many new builds include EV conduit stub-out. Charger installation may be $400–$900 if pre-wired.', cost: '$400 – $1,400', note: 'Check builder specs — pre-wired EV circuit may already exist.' },
    'Whole-Home Generator': { permit: '📋 Permit + Inspection', details: 'New homes integrate easily. Some builder warranties may require licensed installer for generator tie-in.', cost: '$9,000 – $17,000', note: 'Verify builder warranty terms before adding generator to new home.' },
    'Outlet / Wiring': { permit: '📋 Permit Varies', details: 'New construction wiring is clean and accessible. Simple additions are fast and affordable.', cost: '$90 – $300/outlet', note: 'USB-C outlets and smart switch wiring are popular upgrades in new Flower Mound builds.' },
    'Outdoor / Dock Wiring': { permit: '📋 Permit Required', details: 'New homes near lakes often have pre-planned outdoor circuits. Dock service is separate scope.', cost: '$800 – $2,800', note: 'Coordinate with landscape contractor for buried conduit runs.' },
  },
};

export default function DFWElectricianFlowerMound() {
  const [vintage, setVintage] = useState('');
  const [service, setService] = useState('');

  const result = vintage && service ? matrix[vintage]?.[service] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>
          ⚡ ProLnk · Flower Mound TX
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>Flower Mound TX Electricians</h1>
        <p style={{ fontSize: 18, color: '#F5E642', marginBottom: 8 }}>Lake Community Specialists</p>
        <p style={{ color: '#94a3b8', fontSize: 15, marginBottom: 40, maxWidth: 640 }}>
          Flower Mound borders both Lake Grapevine and Lake Lewisville, creating unique electrical demands — dock wiring, outdoor kitchens, and lake-adjacent permits on top of standard residential electrical. Homes span from 1990s builds to brand-new construction.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
          {[
            ['🌊', 'Lake Community Expertise', 'Dock wiring, boathouse circuits, and marine-grade waterproof installations require specialty electricians.'],
            ['📋', 'Denton County Permits', 'All major electrical work in Flower Mound requires Denton County permits. Pros here know the process.'],
            ['🚗', 'EV Charging Demand', 'Flower Mound\’s affluent demographic drives high EV charger install demand — a growing specialty service.'],
            ['⚡', 'Generator Market', 'Post-Winter Storm Uri, whole-home generator installs are surging across all Flower Mound subdivisions.'],
          ].map(([icon, title, desc]) => (
            <div key={title} style={{ backgroundColor: '#111e35', borderRadius: 12, padding: 24 }}>
              <div style={{ color: '#F5E642', fontSize: 22, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111e35', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>⚡ Flower Mound Electrical Estimator</h2>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Home vintage?</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {homeVintages.map(v => (
                <button key={v} onClick={() => setVintage(v)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: vintage === v ? '#F5E642' : '#1e3a5f', backgroundColor: vintage === v ? '#F5E642' : 'transparent', color: vintage === v ? '#0A1628' : '#fff', fontWeight: vintage === v ? 700 : 400, cursor: 'pointer', fontSize: 14 }}>{v}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', color: '#F5E642', fontWeight: 600, marginBottom: 10 }}>Service needed?</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {serviceNeeds.map(s => (
                <button key={s} onClick={() => setService(s)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: service === s ? '#F5E642' : '#1e3a5f', backgroundColor: service === s ? '#F5E642' : 'transparent', color: service === s ? '#0A1628' : '#fff', fontWeight: service === s ? 700 : 400, cursor: 'pointer', fontSize: 14 }}>{s}</button>
              ))}
            </div>
          </div>

          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{result.permit}</div>
              <div style={{ color: '#cbd5e1', marginBottom: 8, fontSize: 14 }}>{result.details}</div>
              <div style={{ color: '#fbbf24', marginBottom: 16, fontSize: 13 }}>💡 {result.note}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 2 }}>Flower Mound Estimate</div>
                  <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{result.cost}</div>
                </div>
                <button style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '12px 24px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 15 }}>Get Quotes →</button>
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>
          ProLnk connects Flower Mound homeowners with licensed electricians who know Denton County codes.
        </div>
      </div>
    </div>
  );
}
