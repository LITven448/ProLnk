import { useState } from 'react';

type SuburbProfile = {
  era: string;
  construction: string;
  hvacSituation: string;
  commonIssues: string[];
  budget: string;
  tip: string;
  color: string;
};

const suburbs: Record<string, SuburbProfile> = {
  'Frisco': {
    era: 'Primarily 1995-present',
    construction: 'Newer construction, better insulation (R-13 to R-19 walls, R-38 attic), post-tension slabs, energy code compliant',
    hvacSituation: 'Mostly 10-16 year old systems approaching replacement age. Better insulation means correctly-sized equipment performs well. High-SEER equipment is cost-effective here.',
    commonIssues: ['Attic air handlers in superheated attics despite good insulation', 'Systems undersized by original builders to cut costs', 'Ductwork installed for minimum code — sealing often improves performance significantly'],
    budget: 'System replacement: $8,000-14,000. Duct sealing: $800-1,500. High-SEER upgrade (SEER 18-20) ROI is positive here given lower heating loads.',
    tip: 'Frisco utility rates and Oncor infrastructure are stable. Rebates available from Oncor for high-efficiency equipment — ask contractor to file on your behalf.',
    color: '#4ADE80',
  },
  'Plano': {
    era: 'Mixed — 1970s through 2005',
    construction: 'Highly variable by neighborhood. East Plano 1970s-80s: minimal insulation, conventional slabs, older ductwork. West Plano 1990s-2000s: better insulation, post-tension slabs.',
    hvacSituation: 'Neighborhood determines HVAC situation more than anything. East Plano older homes need larger systems due to poor envelope. West Plano modern construction performs well.',
    commonIssues: ['East Plano: undersized systems for actual heat load due to poor insulation', 'Older duct systems with significant leakage', 'Manual J calculations often show homes were under-insulated at build'],
    budget: 'East Plano: insulation upgrade $2,000-5,000 + system $8,000-14,000. West Plano: system only $7,000-12,000. Insulation payback: 4-7 years.',
    tip: 'Get a Manual J load calculation before any Plano replacement. East/West Plano load profiles differ by 30-40% for same square footage.',
    color: '#FBBF24',
  },
  'McKinney': {
    era: 'Mixed — historic downtown through 2020s new construction',
    construction: 'Downtown McKinney: 1920s-1950s, minimal insulation, old construction. Far north McKinney: 2010s-present, high energy codes, better envelopes.',
    hvacSituation: 'Downtown McKinney historic homes have the highest HVAC challenges in the Collin County area — high loads, limited space for modern equipment, often pier and beam foundations.',
    commonIssues: ['Historic homes: equipment oversizing because contractors default to large units without load calc', 'Old ductwork that cannot handle modern system airflow requirements', 'Limited attic height in historic homes restricts duct sizing options'],
    budget: 'Historic McKinney homes: $10,000-18,000 with duct upgrades. New McKinney construction: $7,000-12,000 for straightforward replacement.',
    tip: 'McKinney has active historic preservation rules — verify exterior condenser placement and any penetrations comply before scheduling work.',
    color: '#FBBF24',
  },
  'Allen': {
    era: 'Primarily 1985-2010',
    construction: 'Post-tension slabs almost universal, moderate insulation, typical suburban DFW construction. Good balance of newer homes without the premium of Frisco.',
    hvacSituation: 'Allen homes are in the sweet spot of replacement cycles — most original equipment is at or past end of life. Mostly post-tension slabs means standard condensate considerations apply.',
    commonIssues: ['Post-tension slabs limit condensate routing options — condensate pumps often needed', 'Original builders used minimum-code equipment — high upgrade ROI to modern SEER', 'Attic equipment is common — relocation to closet is often worth evaluating at replacement time'],
    budget: 'System replacement: $7,500-12,000. Attic-to-closet relocation addition: $1,500-2,500. Condensate pump if needed: $300-500.',
    tip: 'Allen has consistent Oncor service. Check for rebates on high-efficiency equipment — Allen Energy Efficiency Program sometimes offers additional incentives above Oncor standard.',
    color: '#4ADE80',
  },
  'Garland': {
    era: 'Primarily 1955-1985',
    construction: 'Older construction, minimal attic insulation (often R-11 to R-19 original), conventional slabs, some pier and beam, old ductwork',
    hvacSituation: 'Garland represents the most challenging HVAC environment in the DFW suburbs — high heat loads from poor insulation, aging ductwork that leaks and restricts airflow, and older electrical panels that may not support modern equipment.',
    commonIssues: ['Under-insulated attics mean systems run constantly in DFW summer — R-11 is R-38 short', 'Ductwork from original build often shows 25-35% leakage on blower door tests', 'Older electrical panels may need upgrade to support new HVAC equipment', 'Conventional slabs allow under-slab duct systems — some have failed or corroded'],
    budget: 'Insulation upgrade critical: $2,000-5,000. System replacement: $7,000-13,000. Ductwork replacement: $3,000-7,000. Total: $12,000-25,000 for full HVAC system upgrade.',
    tip: 'In Garland, do insulation before HVAC. Upgrading equipment without insulation improvement is like buying a new engine for a car with no doors — the building envelope loss dominates the operating cost.',
    color: '#F87171',
  },
  'Richardson': {
    era: 'Primarily 1960-1995',
    construction: 'Mid-century construction with varying renovation levels. Well-established neighborhoods, mix of brick and frame, some historic preservation areas',
    hvacSituation: 'Richardson has benefited from significant renovation activity — many homes have had insulation upgrades and duct replacement over the decades. Actual condition varies more by renovation history than build year.',
    commonIssues: ['Patchwork renovations sometimes create HVAC mismatches — old ducts with new equipment', 'Mix of slab types makes condensate routing variable', 'Some RISD school-area homes have additions built to different standards than original'],
    budget: 'Richardson is moderate — system replacement $7,000-12,000. Assess duct condition before replacement; newer ducts may not need replacement even in older homes.',
    tip: 'Richardson has good HVAC contractor density — competitive bids available. Get three quotes and require each contractor to do a Manual J before recommending equipment size.',
    color: '#FBBF24',
  },
  'Irving': {
    era: 'Mixed — 1950s through Las Colinas 2000s',
    construction: 'Las Colinas area: modern construction, good insulation, post-tension slabs. Older Irving: 1950s-70s, minimal insulation, conventional or older slab types',
    hvacSituation: 'Irving has significant variation between the Las Colinas commercial/condo corridor and the older residential neighborhoods. Irving homeowners near DFW airport deal with noise easements that affect attic and window configuration.',
    commonIssues: ['Airport noise easements in some zones limit window modifications that would affect HVAC design', 'Older Irving neighborhoods share Garland-style insulation challenges', 'Las Colinas condos and townhomes have specific HVAC access constraints'],
    budget: 'Las Colinas: $8,000-14,000 condo HVAC projects often require HOA approval for equipment placement. Older Irving residential: same range as Garland — $10,000-22,000 with needed envelope improvements.',
    tip: 'Las Colinas condo HOA rules on HVAC equipment placement, condensate routing, and access times vary significantly. Pull the HOA declaration before scheduling any work.',
    color: '#FBBF24',
  },
  'Oak Cliff': {
    era: 'Primarily 1920-1960',
    construction: 'Historic brick construction, pier and beam foundations common, thick walls with moderate thermal mass, mature tree coverage reduces solar gain',
    hvacSituation: 'Oak Cliff is unique in DFW — older brick construction with thermal mass actually performs better than thin-wall 1990s construction in some conditions. The challenge is equipment access, ductwork routing in pier and beam homes, and electrical capacity.',
    commonIssues: ['Pier and beam foundations create crawl space HVAC opportunities but also moisture challenges', 'Historic preservation restrictions in Bishop Arts and other districts affect equipment placement', 'Original knob-and-tube or aluminum wiring may not support modern HVAC', 'Mature trees are an advantage — shade reduces solar gain meaningfully in Oak Cliff'],
    budget: 'Oak Cliff historic pier and beam: $9,000-16,000 with likely electrical panel upgrade and duct routing complexity. Brick construction energy performance is often better than expected — verify load before oversizing.',
    tip: 'Oak Cliff brick homes with mature trees often have lower cooling loads than a Manual J would predict from R-values alone — thermal mass and shade are real factors. Ask contractor to account for both.',
    color: '#4ADE80',
  },
  'Arlington': {
    era: 'Mixed — 1960s through 2010s',
    construction: 'Stadium and entertainment district proximity creates mixed zoning. Residential ranges from 1960s minimal construction to newer subdivisions',
    hvacSituation: 'Arlington straddles the Dallas and Fort Worth utility territories — some homes are Oncor, some are TXU/Luminant-served areas. This affects rebate availability and utility rate structures.',
    commonIssues: ['Mixed utility territory creates confusion on rebate programs — verify your utility provider first', '1960s-80s Arlington homes have insulation challenges similar to Garland', 'Entertainment district proximity means some properties have unusual HVAC access constraints'],
    budget: 'Similar to rest of DFW: $7,500-13,000 for system replacement. Older homes may need insulation investment first: $2,000-5,000.',
    tip: 'Verify your utility provider (Oncor vs TXU Energy) before selecting equipment — rebate programs differ and can swing $200-800 in available incentives.',
    color: '#FBBF24',
  },
  'Fort Worth — Cultural District': {
    era: '1920s-1960s primarily',
    construction: 'Historic Craftsman and mid-century construction, mix of pier and beam and slab, significant renovation activity, proximity to TCU drives rental property upgrades',
    hvacSituation: 'Fort Worth west side neighborhoods have active renovation markets. HVAC contractors here deal frequently with historic integration challenges and high-spec renovation projects. Good contractor availability.',
    commonIssues: ['Historic homes with balloon framing create challenges for duct routing', 'Some Fort Worth neighborhoods use Atmos gas — ensure any new furnace or heat pump coordinates with gas availability', 'High renovation activity means system designs must work with updated building envelopes'],
    budget: 'Cultural District renovation HVAC: $10,000-18,000 for comprehensive historic integration. System replacement in straightforward homes: $7,500-13,000.',
    tip: 'Fort Worth west side has strong HVAC contractor competition from both DFW and local Fort Worth contractors. Wider bid pool can reduce costs 10-15%.',
    color: '#4ADE80',
  },
};

const suburbList = Object.keys(suburbs);

export default function DFWHVACDFWSuburb() {
  const [selected, setSelected] = useState('');
  const profile = selected ? suburbs[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F4FD', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>📍 DFW HVAC Guide</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#FFFFFF', marginBottom: 8 }}>DFW Suburb-Specific HVAC Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 24, lineHeight: 1.6 }}>
          HVAC needs vary dramatically across DFW suburbs based on construction era, insulation levels, slab type, and utility territory. A home in Garland and a home in Frisco have entirely different HVAC profiles despite being 30 miles apart.
        </p>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Select Your DFW Suburb</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {suburbList.map(s => (
              <button key={s} onClick={() => setSelected(s)} style={{ padding: '8px 14px', borderRadius: 8, border: '2px solid', borderColor: selected === s ? '#F5E642′ : '#1E3A5F', background: selected === s ? '#F5E642' : '#0D2137', color: selected === s ? '#0A1628' : '#E8F4FD', fontWeight: selected === s ? 700 : 400, cursor: ’pointer', fontSize: 13 }}>{s}</button>
            ))}
          </div>
        </div>
        {profile && (
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ background: '#0D2137', border: `2px solid ${profile.color}`, borderRadius: 12, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF' }}>{selected}</div>
                  <div style={{ color: profile.color, fontWeight: 600, fontSize: 14, marginTop: 2 }}>{profile.era}</div>
                </div>
              </div>
              <div style={{ color: '#CBD5E1', lineHeight: 1.6, fontSize: 14 }}>{profile.construction}</div>
            </div>
            <div style={{ background: '#1A2F40', border: '1px solid #2563EB', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#93C5FD', marginBottom: 8 }}>Typical HVAC Situation</div>
              <div style={{ color: '#BFDBFE', lineHeight: 1.6, fontSize: 14 }}>{profile.hvacSituation}</div>
            </div>
            <div style={{ background: '#2D1A1A', border: '1px solid #7F1D1D', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#F87171', marginBottom: 10 }}>Common Issues in {selected}</div>
              {profile.commonIssues.map((issue, i) => (
                <div key={i} style={{ color: '#FECACA', marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid #F87171', fontSize: 14, lineHeight: 1.5 }}>{issue}</div>
              ))}
            </div>
            <div style={{ background: '#0D2137', border: '1px solid #475569', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>What to Budget in {selected}</div>
              <div style={{ color: '#CBD5E1', lineHeight: 1.6, fontSize: 14 }}>{profile.budget}</div>
            </div>
            <div style={{ background: '#1E3A1E', border: '1px solid #22543D', borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#4ADE80', marginBottom: 8 }}>Pro Tip for {selected}</div>
              <div style={{ color: '#BBF7D0', lineHeight: 1.6, fontSize: 14 }}>{profile.tip}</div>
            </div>
          </div>
        )}
        {!profile && (
          <div style={{ background: '#0D2137', borderRadius: 12, padding: 24, textAlign: 'center', color: '#64748B' }}>Select your DFW suburb to see the HVAC profile, common issues, and budget guidance for your area</div>
        )}
      </div>
    </div>
  );
}
