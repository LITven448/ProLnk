import { useState } from 'react';

const unitTypes = ['Warehouse Loft', 'Converted Condo', 'Townhome', 'Artist Live/Work'];

type Challenge = { issue: string; severity: string; solution: string; cost: string };

const challenges: Record<string, Challenge[]> = {
  'Warehouse Loft': [
    { issue: 'Exposed concrete walls — thermal bridging + cold in winter', severity: '🔴 High', solution: 'Interior spray foam or rigid insulation board behind drywall', cost: '$3,500–$9,000′ },
    { issue: 'Exposed ductwork — noise transmission between units', severity: '🔴 High', solution: 'Sound-lined duct wrap + vibration isolators', cost: '$1,200–$3,500′ },
    { issue: 'Commercial-grade HVAC (rooftop unit) — maintenance costs', severity: '🟡 Medium', solution: 'Annual RTU service contract with commercial HVAC specialist', cost: '$800–$2,000/yr' },
    { issue: 'Polished concrete floors — cold, hard, noise echo', severity: '🟡 Medium', solution: 'Area rugs + underfloor radiant mat zones', cost: '$2,000–$6,000′ },
    { issue: 'High ceilings (14–20 ft) — HVAC inefficiency + lighting cost', severity: '🟡 Medium', solution: 'Destratification fans + LED high-bay fixtures', cost: '$1,500–$4,000′ },
    { issue: 'Original brick/masonry — moisture infiltration risk', severity: '🟡 Medium', solution: 'Masonry sealant + interior vapor barrier where needed', cost: '$1,500–$4,500′ },
    { issue: 'Limited closet/storage (open floor plan)', severity: '🟢 Low', solution: 'Custom built-in cabinetry, Murphy bed systems', cost: '$3,000–$12,000′ },
    { issue: 'Shared loading dock or freight elevator — maintenance liability', severity: '🟢 Low', solution: 'Review HOA docs; negotiate maintenance responsibility', cost: 'HOA/legal review $500+' },
  ],
  'Converted Condo': [
    { issue: 'Thin walls between units — sound transmission', severity: '🔴 High', solution: 'Resilient channel + mass loaded vinyl + acoustic drywall', cost: '$4,000–$10,000/shared wall' },
    { issue: 'Old commercial plumbing (cast iron or galvanized)', severity: '🔴 High', solution: 'Camera scope + targeted replacement; full replacement if >30 yrs', cost: '$2,500–$8,000′ },
    { issue: 'Electrical: original commercial panel insufficient for residential', severity: '🔴 High', solution: 'Sub-panel upgrade, dedicated circuits for kitchen', cost: '$3,000–$7,500′ },
    { issue: 'Lack of natural light (interior units, small windows)', severity: '🟡 Medium', solution: 'Tubular skylights where possible, warm LED layered lighting', cost: '$1,500–$5,000′ },
    { issue: 'HVAC: shared central system (HOA-controlled)', severity: '🟡 Medium', solution: 'Mini-split supplement for individual zone control', cost: '$2,500–$6,000′ },
    { issue: 'Fire suppression system compliance (older conversions)', severity: '🟡 Medium', solution: 'Annual sprinkler inspection; upgrade if pre-2000 system', cost: '$500–$3,000′ },
    { issue: 'Street noise (entertainment district)', severity: '🟡 Medium', solution: 'Acoustic laminated glass, door seals, white noise system', cost: '$1,000–$4,000/window' },
    { issue: 'Parking: commercial lot or limited spaces', severity: '🟢 Low', solution: 'HOA negotiation, garage conversion where permitted', cost: 'Varies' },
  ],
  'Townhome': [
    { issue: 'Party wall sound transmission', severity: '🔴 High', solution: 'Resilient channel + acoustic insulation in shared walls', cost: '$3,500–$8,000/wall' },
    { issue: 'Rooftop deck maintenance (flat roof)', severity: '🔴 High', solution: 'Annual inspection, reseal every 3–5 years, drain check', cost: '$800–$2,500/yr' },
    { issue: 'HVAC: vertical stack (heat rises to top floor)', severity: '🟡 Medium', solution: 'Zoned mini-split for top floor, ceiling fan addition', cost: '$2,500–$5,500′ },
    { issue: 'Limited storage in urban footprint', severity: '🟡 Medium', solution: 'Under-stair storage, built-in cabinetry throughout', cost: '$2,000–$7,000′ },
    { issue: 'Stair maintenance (heavy use in 3-story)', severity: '🟡 Medium', solution: 'Refinish hardwood stairs, replace carpet on risers', cost: '$1,500–$4,000′ },
    { issue: 'Entry door security in urban environment', severity: '🟡 Medium', solution: 'Smart lock, video doorbell, reinforced strike plate', cost: '$500–$1,500′ },
    { issue: 'Street-level flooding risk (Deep Ellum grade)', severity: '🟡 Medium', solution: 'Sump pump check, entry threshold seals, backflow valve', cost: '$800–$2,500′ },
    { issue: 'Balcony/rooftop deck structural integrity', severity: '🟢 Low', solution: 'Annual structural inspection; reseal railings and deck surface', cost: '$600–$2,000/yr' },
  ],
  'Artist Live/Work': [
    { issue: 'Mixed-use permit compliance (residential + studio)', severity: '🔴 High', solution: 'City of Dallas live/work permit review; fire code compliance check', cost: '$1,000–$3,000 legal/permit' },
    { issue: 'Heavy electrical load (welding, kilns, large equipment)', severity: '🔴 High', solution: '200–400A service upgrade, dedicated 240V circuits', cost: '$5,000–$15,000′ },
    { issue: 'Ventilation for studio (fumes, dust, solvents)', severity: '🔴 High', solution: 'Commercial exhaust fans, air filtration, makeup air unit', cost: '$3,000–$9,000′ },
    { issue: 'Concrete floors — epoxy or sealed for studio use', severity: '🟡 Medium', solution: 'Industrial epoxy coating with anti-slip aggregate', cost: '$3–$8/sq ft' },
    { issue: 'Noise from studio use (neighbors/HOA)', severity: '🟡 Medium', solution: 'Sound batt insulation, acoustic panels, timing restrictions', cost: '$2,000–$6,000′ },
    { issue: 'Water access for studio (rinsing, clay, darkroom)', severity: '🟡 Medium', solution: 'Add utility sink, P-trap install, floor drain if possible', cost: '$800–$2,500′ },
    { issue: 'Storage for large art/equipment (vertical space)', severity: '🟡 Medium', solution: 'Mezzanine loft platform construction', cost: '$8,000–$20,000′ },
    { issue: 'Insurance: art + equipment + liability', severity: '🟢 Low', solution: 'Specialty live/work policy; separate rider for equipment', cost: '$1,200–$3,000/yr' },
  ],
};

const contractorTypes: Record<string, string[]> = {
  'Warehouse Loft': ['Commercial HVAC specialist', 'Masonry/brick restoration', 'Industrial electrician', 'Acoustic consultant', 'Concrete polishing/sealing'],
  'Converted Condo': ['Acoustic drywall installer', 'Commercial plumber', 'Residential electrician (panel upgrades)', 'Sprinkler system inspector', 'Window sound specialist'],
  'Townhome': ['Flat roof specialist', 'Built-in cabinetry maker', 'Mini-split HVAC installer', 'Smart lock/security installer', 'Foundation drainage expert'],
  'Artist Live/Work': ['Commercial electrician (high-amperage)', 'Industrial ventilation contractor', 'Permit expediter (city of Dallas)', 'Epoxy floor coating contractor', 'Mezzanine/structural carpenter'],
};

export default function DFWDeepEllumGuide() {
  const [unitType, setUnitType] = useState('');

  const issues = unitType ? challenges[unitType] ?? [] : [];
  const contractors = unitType ? contractorTypes[unitType] ?? [] : [];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 2 }}>🎸 DALLAS NEIGHBORHOOD GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Deep Ellum Dallas</h1>
        <h2 style={{ fontSize: 20, fontWeight: 400, color: '#a0b0c8', marginBottom: 24 }}>Urban Loft & Condo Maintenance Guide</h2>

        <div style={{ backgroundColor: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 28, borderLeft: '4px solid #F5E642′ }}>
          <p style={{ margin: 0, lineHeight: 1.7, color: '#c8d8e8′ }}>
            Deep Ellum's residential units are almost all <strong style={{ color: '#F5E642' }}>commercial-to-residential conversions</strong> — warehouses, factories, and industrial buildings transformed into lofts, condos, and live/work spaces. These buildings come with unique challenges that most residential contractors aren’t equipped to handle: exposed brick moisture, commercial HVAC systems, sound transmission between units, and electrical infrastructure built for factory use. Select your unit type to see your specific maintenance priorities.
          </p>
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={{ display: 'block', marginBottom: 10, color: '#F5E642', fontWeight: 600, fontSize: 14 }}>🏢 Unit Type</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {unitTypes.map(t => (
              <button key={t} onClick={() => setUnitType(t)} style={{ padding: '14px 16px', borderRadius: 10, border: `2px solid ${unitType === t ? '#F5E642' : '#1e3a5f'}`, backgroundColor: unitType === t ? '#1a2e4a' : '#0f2040', color: unitType === t ? '#F5E642′ : '#c8d8e8', fontWeight: unitType === t ? 700 : 400, cursor: ’pointer', fontSize: 14, textAlign: 'left' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {issues.length > 0 && (
          <div>
            <h3 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>Maintenance Challenges + Solutions</h3>
            {issues.map((item, i) => (
              <div key={i} style={{ backgroundColor: '#0f2040', borderRadius: 10, padding: '14px 18px', marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                  <div style={{ fontWeight: 600, fontSize: 15, flex: 1 }}>{item.issue}</div>
                  <div style={{ fontSize: 13, whiteSpace: 'nowrap' }}>{item.severity}</div>
                </div>
                <div style={{ fontSize: 13, color: '#a0b0c8', marginBottom: 4 }}>✅ {item.solution}</div>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600 }}>{item.cost}</div>
              </div>
            ))}

            <div style={{ marginTop: 24, backgroundColor: '#0f2040', borderRadius: 12, padding: 18 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12, fontSize: 16 }}>🔧 Contractor Types You Need</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {contractors.map((c, i) => (
                  <div key={i} style={{ backgroundColor: '#162840', padding: '6px 14px', borderRadius: 20, fontSize: 13, color: '#c8d8e8', border: '1px solid #1e3a5f' }}>{c}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!unitType && (
          <div style={{ textAlign: 'center', padding: 40, color: '#4a6a8a' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏗️</div>
            <div style={{ fontSize: 16 }}>Select your unit type to see maintenance challenges specific to Deep Ellum conversions.</div>
          </div>
        )}

        <div style={{ marginTop: 36, padding: 20, backgroundColor: '#0f2040', borderRadius: 12, textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Find Urban Specialists for Deep Ellum</div>
          <div style={{ color: '#a0b0c8', fontSize: 14, marginBottom: 16 }}>ProLnk connects urban condo and loft owners with contractors who specialize in commercial-to-residential builds — not just generic handymen.</div>
          <div style={{ display: 'inline-block', backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>Find My Specialist →</div>
        </div>
      </div>
    </div>
  );
}
