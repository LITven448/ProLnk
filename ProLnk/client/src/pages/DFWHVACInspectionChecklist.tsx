import { useState } from 'react';

type Season = 'summer' | 'winter' | 'spring' | 'fall';

const systemAges = [
  { label: 'Under 5 years', range: '0-4', condition: 'New', lifeRemaining: '11-16 years typical', focus: 'Verify installation quality: permits pulled, lines brazed not flared, drain pan clean, no refrigerant leaks' },
  { label: '5-10 years', range: '5-9', condition: 'Mid-life', lifeRemaining: '6-10 years typical', focus: 'Check capacitors (common failure at 7-10 years in DFW heat), coil cleanliness, drain line flow' },
  { label: '10-15 years', range: '10-14', condition: 'Aging', lifeRemaining: '2-6 years typical', focus: 'Full system evaluation. R-22 phase-out means replacement only if this system uses R-22. Inspect heat exchanger for cracks.' },
  { label: '15+ years', range: '15+', condition: 'End of life', lifeRemaining: '0-3 years typical', focus: 'Negotiate replacement credit in purchase price. DFW heat accelerates failure - 15 years is the realistic lifespan for attic units.' },
];

const seasonFocus: Record<Season, { label: string; checks: string[] }> = {
  summer: {
    label: 'Summer Inspection Focus (June-September)',
    checks: [
      'Run system for 15+ min before inspector arrives - verify it reaches setpoint',
      'Measure supply air temp vs return air temp - should be 16-22 degree split',
      'Check condensate drain is flowing freely - DFW humidity overwhelms clogged drains',
      'Look at outdoor unit - coil fins should be clean and unobstructed',
      'Verify refrigerant pressure is within spec (technician with gauges required)',
    ],
  },
  winter: {
    label: 'Winter Inspection Focus (December-February)',
    checks: [
      'Run heat strips or gas furnace - verify output at registers',
      'Check heat exchanger for cracks if gas system - CO risk',
      'Verify reversing valve works if heat pump system',
      'Inspect outdoor unit for damage from any ice events',
      'Test emergency heat mode on heat pumps',
    ],
  },
  spring: {
    label: 'Spring Inspection Focus (March-May)',
    checks: [
      'Run cooling mode even if not hot yet - verify system starts and cools',
      'Best time to see coil and drain condition before summer load hits',
      'Check filter and blower wheel condition before peak season',
      'Verify thermostat wiring and calibration',
      'Inspect attic air handler for any winter condensation damage',
    ],
  },
  fall: {
    label: 'Fall Inspection Focus (October-November)',
    checks: [
      'Test heating mode before cold weather - verify system switches from cooling',
      'Check capacitors which often fail after heavy summer use',
      'Inspect drain line and pan - summer use may have caused buildup',
      'Review electrical connections that loosen from thermal expansion cycles',
      'Good time to assess overall system condition post-peak-season',
    ],
  },
};

const brandRatings = [
  { brand: 'Trane / American Standard', durabilityDFW: 'Excellent', notes: 'Cast iron compressor design handles DFW heat well. Higher cost but strong longevity in extreme use.' },
  { brand: 'Carrier / Bryant', durabilityDFW: 'Very Good', notes: 'Reliable in DFW. Compressor quality is high. Widely serviced throughout DFW.' },
  { brand: 'Lennox', durabilityDFW: 'Good', notes: 'High efficiency ratings but some compressor models less durable in sustained DFW heat. Verify compressor warranty.' },
  { brand: 'Goodman / Amana', durabilityDFW: 'Fair', notes: 'Popular builder-grade brand in DFW new construction. Lower upfront cost. Compressor failures more common at 8-12 years in heavy DFW use.' },
  { brand: 'Rheem / Ruud', durabilityDFW: 'Good', notes: 'Solid mid-range option. Widely available parts in DFW. Performs adequately in DFW climate.' },
  { brand: 'York / Johnson Controls', durabilityDFW: 'Fair', notes: 'Less common in DFW market, parts availability can be slower. Functional but not first choice for DFW attic installs.' },
];

const redFlags = [
  'Rust in drain pan - indicates overflow history, possible mold in system',
  'Coil fins bent or blocked - reduces efficiency immediately, costs $200-$800 to straighten or clean',
  'Duct tape used anywhere on ductwork - falls off in DFW attic heat, must be mastic or foil tape',
  'Flex duct kinked or collapsed - common in older DFW attics, restricts airflow',
  'No secondary drain or float switch - one clogged drain floods the ceiling in DFW summers',
  'System is R-22 refrigerant - refrigerant no longer produced, leaks cannot be cheaply recharged',
  'Disconnect box missing or open - electrical safety hazard, fails inspection',
  'Unit is oversized for home - short cycling damages compressor faster than undersizing',
];

export default function DFWHVACInspectionChecklist() {
  const [ageIdx, setAgeIdx] = useState(1);
  const [season, setSeason] = useState<Season>('summer');
  const [showResult, setShowResult] = useState(false);

  const ageData = systemAges[ageIdx];
  const seasonData = seasonFocus[season];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>Inspection DFW HVAC Guide</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>HVAC Inspection Checklist for DFW Homebuyers</h1>
        <p style={{ color: '#9BA4B4', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
          A standard home inspection gives HVAC about 20 minutes. In DFW that is not nearly enough to catch the problems that will cost you $8,000-$15,000 in year two. Know what to look for before you close.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>Brand Durability in DFW Conditions</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {brandRatings.map(b => (
              <div key={b.brand} style={{ background: '#162035', borderRadius: 8, padding: 14, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 140 }}>
                  <div style={{ fontWeight: 700, color: '#E8EAF0', fontSize: 13 }}>{b.brand}</div>
                  <div style={{ color: b.durabilityDFW === 'Excellent' ? '#22C55E' : b.durabilityDFW === 'Very Good' ? '#86EFAC' : b.durabilityDFW === 'Good' ? '#F5E642′ : '#EF4444', fontSize: 12, fontWeight: 700, marginTop: 4 }}>{b.durabilityDFW}</div>
                </div>
                <div style={{ color: '#9BA4B4', fontSize: 13, lineHeight: 1.5 }}>{b.notes}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>DFW Red Flags - Walk Away or Negotiate</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {redFlags.map((flag, i) => (
              <div key={i} style={{ background: '#1A0A0A', borderRadius: 8, padding: 12, borderLeft: '3px solid #EF4444', color: '#9BA4B4', fontSize: 13, lineHeight: 1.5 }}>
                {flag}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>My DFW Inspection Plan</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#9BA4B4', marginBottom: 8, fontSize: 14 }}>HVAC system age:</label>
            <select value={ageIdx} onChange={e => { setAgeIdx(+e.target.value); setShowResult(false); }}
              style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              {systemAges.map((a, i) => <option key={i} value={i}>{a.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#9BA4B4', marginBottom: 8, fontSize: 14 }}>Inspection season:</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {(['summer', 'winter', 'spring', 'fall'] as Season[]).map(s => (
                <button key={s} onClick={() => { setSeason(s); setShowResult(false); }}
                  style={{ padding: '10px 0', borderRadius: 8, border: '2px solid', borderColor: season === s ? '#F5E642′ : '#1E3A5F', background: season === s ? '#F5E642' : ’transparent', color: season === s ? '#0A1628′ : '#9BA4B4', fontWeight: 700, cursor: ’pointer', fontSize: 14, textTransform: 'capitalize' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResult(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get My Inspection Checklist
          </button>
          {showResult && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 16 }}>System: {ageData.label}</div>
              <div style={{ color: '#9BA4B4', fontSize: 13, marginBottom: 4 }}>Condition: {ageData.condition} - {ageData.lifeRemaining}</div>
              <div style={{ color: '#CBD2E0', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{ageData.focus}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>{seasonData.label}</div>
              {seasonData.checks.map((check, i) => (
                <div key={i} style={{ background: '#162035', borderRadius: 6, padding: '10px 14px', marginBottom: 8, color: '#CBD2E0', fontSize: 14, lineHeight: 1.5 }}>
                  {i + 1}. {check}
                </div>
              ))}
              {ageIdx >= 2 && (
                <div style={{ marginTop: 12, background: '#1A0A0A', borderRadius: 8, padding: 14, borderLeft: '3px solid #EF4444′ }}>
                  <div style={{ color: '#EF4444', fontWeight: 700, marginBottom: 6 }}>Negotiation note:</div>
                  <div style={{ color: '#9BA4B4', fontSize: 13, lineHeight: 1.5 }}>
                    System age {ageData.range} years in DFW attic is near end of typical service life. Request $4,000-$8,000 HVAC credit or seller-funded replacement. Get a second opinion from an independent HVAC tech (not the inspector).
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
