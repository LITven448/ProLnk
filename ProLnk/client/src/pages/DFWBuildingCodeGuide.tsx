import { useState } from 'react';

const projectCodeData: Record<string, Record<string, { codes: string[]; violations: string[]; inspectorChecks: string[] }>> = {
  addition: {
    default: {
      codes: ['IBC 2021 (structural)', 'IRC 2021 (residential)', 'NFPA 70 (electrical)', 'UPC (plumbing)'],
      violations: ['Ceiling height under 7 ft', 'No egress window in bedroom', 'Improper flashing at roof-wall junction', 'Missing fire blocking in wall cavities'],
      inspectorChecks: ['Foundation tie-in to existing', 'Header sizing over openings', 'Insulation R-value (R-13 walls, R-38 attic in DFW)', 'Window egress dimensions'],
    },
  },
  kitchen: {
    default: {
      codes: ['NEC 2020 (arc-fault GFCI)', 'UPC plumbing', 'IRC ventilation R303', 'Local energy code'],
      violations: ['No GFCI within 6 ft of sink', 'Missing arc-fault breakers on kitchen circuits', 'Range hood not ducted to exterior', 'Cabinet over range hood not compliant clearance'],
      inspectorChecks: ['Two 20-amp small appliance circuits', 'GFCI on all counter receptacles', 'Ventilation CFM for range', 'Dishwasher high-loop drain'],
    },
  },
  bath: {
    default: {
      codes: ['UPC plumbing code', 'NEC GFCI requirements', 'IRC ventilation', 'Waterproofing per ANSI A118'],
      violations: ['No exhaust fan or window', 'GFCI missing at all bathroom receptacles', 'Shower pan slope insufficient (<1/4 per ft)', 'Tile backer not approved (regular drywall used)'],
      inspectorChecks: ['Exhaust fan CFM and duct termination', 'GFCI all receptacles', 'Shower liner/membrane waterproof test', 'Toilet rough-in dimension'],
    },
  },
  deck: {
    default: {
      codes: ['IRC Chapter 5 (decks)', 'DCA6 Prescriptive Residential Wood Deck Construction', 'Local wind/load amendments'],
      violations: ['Post not anchored to footing (just set in dirt)', 'Guardrail balusters over 4 inch spacing', 'Ledger not lag-bolted to rim joist', 'Stair riser/tread out of code range'],
      inspectorChecks: ['Footing depth below frost line (12 in DFW)', 'Ledger connection to house', 'Guardrail height 36–42 in per height', 'Post base hardware'],
    },
  },
  hvac: {
    default: {
      codes: ['ASHRAE 62.2 (ventilation)', 'ACCA Manual J (load calc)', 'IRC M1401 (equipment)', 'TDLR license required'],
      violations: ['System oversized (no Manual J performed)', 'Flex duct runs over 6 ft', 'Return air pathway inadequate', 'No condensate overflow protection in attic'],
      inspectorChecks: ['Equipment capacity matches load calc', 'Refrigerant line insulation', 'Condensate drain slope and trap', 'Supply/return balance'],
    },
  },
};

const cities = ['Frisco', 'Plano', 'Dallas', 'Fort Worth', 'McKinney', 'Allen', 'Garland', 'Irving', 'Denton'];
const cityAmendments: Record<string, string> = {
  Dallas: 'Dallas adopted IBC 2021 with local amendments increasing fire separation requirements in older neighborhoods.',
  'Fort Worth': 'Fort Worth requires energy compliance per IECC 2021 — stricter window U-factor (0.30 max) than state default.',
  Frisco: 'Frisco follows IRC 2021 with no major amendments — generally straightforward residential review.',
  Plano: 'Plano adds flood plain overlay requirements east of Central Expressway affecting grading and foundation specs.',
  McKinney: 'McKinney requires landscape irrigation backflow preventers as local amendment to UPC.',
  Allen: 'Allen adopted IRC 2021; minimal amendments — among most builder-friendly in DFW.',
  Garland: 'Garland enforces older adopted codes in some zones; verify which code cycle applies to your parcel.',
  Irving: 'Irving requires energy blower door test for additions over 500 sq ft as local amendment.',
  Denton: 'Denton has stormwater detention requirements for lot coverage changes — affects large additions.',
};

export default function DFWBuildingCodeGuide() {
  const [project, setProject] = useState('');
  const [city, setCity] = useState('');

  const codeInfo = projectCodeData[project]?.default;
  const amendment = cityAmendments[city];

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>🏠 PROLNK DFW RESOURCE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>DFW Building Code Guide</h1>
        <p style={{ color: '#94A3B8', fontSize: 15, marginBottom: 32 }}>Texas uses the International Building Code — but DFW cities add their own amendments. Here's what that means for your remodel.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          <div>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>Project Type</label>
            <select value={project} onChange={e => setProject(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, backgroundColor: '#162033', color: '#E2E8F0', border: '1px solid #2D3E55', fontSize: 14 }}>
              <option value=''>Select project...</option>
              <option value='addition'>Room Addition</option>
              <option value='kitchen'>Kitchen Remodel</option>
              <option value='bath'>Bathroom Remodel</option>
              <option value='deck'>Deck / Patio</option>
              <option value='hvac'>HVAC Replacement</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6 }}>DFW City</label>
            <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, backgroundColor: '#162033', color: '#E2E8F0', border: '1px solid #2D3E55', fontSize: 14 }}>
              <option value=''>Select city...</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {codeInfo && (
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div style={{ backgroundColor: '#162033', borderRadius: 12, padding: 24, border: '1px solid #2D3E55′ }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>📚 Applicable Codes</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {codeInfo.codes.map(c => <span key={c} style={{ backgroundColor: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 13, border: '1px solid #2D3E55′ }}>{c}</span>)}
              </div>
            </div>
            <div style={{ backgroundColor: '#1a0a0a', borderRadius: 12, padding: 24, border: '1px solid #7f1d1d' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#FCA5A5', marginBottom: 12 }}>⚠️ Common DFW Code Violations — This Project</div>
              <ul style={{ paddingLeft: 20, margin: 0, color: '#94A3B8', fontSize: 14, lineHeight: 1.9 }}>
                {codeInfo.violations.map(v => <li key={v}>{v}</li>)}
              </ul>
            </div>
            <div style={{ backgroundColor: '#162033', borderRadius: 12, padding: 24, border: '1px solid #2D3E55′ }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 12 }}>🔍 What the Inspector Will Check</div>
              <ul style={{ paddingLeft: 20, margin: 0, color: '#94A3B8', fontSize: 14, lineHeight: 1.9 }}>
                {codeInfo.inspectorChecks.map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
          </div>
        )}

        {amendment && (
          <div style={{ backgroundColor: '#162033', borderRadius: 12, padding: 20, border: '1px solid #F5E642', marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🗺️ {city} Local Amendment</div>
            <div style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>{amendment}</div>
          </div>
        )}

        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 12 }}>Need a contractor who passes DFW inspections the first time?</div>
          <a href='https://prolnk.io' style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>Find Code-Compliant Pros →</a>
        </div>
      </div>
    </div>
  );
}
