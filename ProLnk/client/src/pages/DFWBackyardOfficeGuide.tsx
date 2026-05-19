import { useState } from 'react';

const officePods = [
  { type: 'Tuff Shed Studio', cost: '$8,000–15,000', sqft: '100–160 sq ft', install: '1 day', permit: 'Usually not required <200 sq ft', climate: 'Add mini-split: $1,500–3,000', best: 'Quick, affordable, DFW code-friendly' },
  { type: 'Custom Built Backyard Office', cost: '$25,000–60,000', sqft: '200–400 sq ft', install: '4–8 weeks', permit: 'Required in all DFW cities', climate: 'Built-in HVAC: $3,000–6,000', best: 'Permanent structure, highest quality' },
  { type: 'Prefab Office Pod', cost: '$15,000–35,000', sqft: '100–200 sq ft', install: '1–3 days', permit: 'Varies by DFW city (check lot coverage)', climate: 'Included or mini-split: $1,500–2,500', best: 'Modern aesthetic, faster than custom' },
  { type: 'Converted Existing Shed', cost: '$3,000–10,000', sqft: 'Existing structure', install: '2–4 weeks DIY', permit: 'Usually exempt if not adding sq ft', climate: 'Window AC + insulation: $2,000–4,000', best: 'Lowest cost, uses existing structure' },
];

const cityPermits: Record<string, string> = {
  plano: 'Plano: <200 sq ft sheds generally permit-exempt. Detached structures over 200 sq ft need permit. 10ft setback from property lines. No electrical without permit.',
  frisco: 'Frisco: All detached structures need permit. 5ft setback required. Max 50% lot coverage (all structures combined). Allow 4–6 weeks for permit approval.',
  mckinney: 'McKinney: Structures under 200 sq ft in rear yard may be exempt. Electrical work always needs permit. 6ft rear setback minimum.',
  allen: 'Allen: Accessory structures under 150 sq ft generally exempt. Electrical installation requires permit regardless of structure size.',
  prosper: 'Prosper: Newer suburb, strict codes. All backyard structures need permit. 10ft side/rear setbacks. Contact planning dept at (972) 347-9969.',
  other: 'DFW varies by city. General rule: <200 sq ft often exempt from building permit but NOT from electrical permit. Always call your city planning department.',
};

const useCaseRecommend: Record<string, Record<string, string>> = {
  small: {
    calls: 'Tuff Shed Studio 12x10 ($10,000 installed + mini-split). Perfect soundproof call environment. DFW heat: install ductless mini-split, not window AC — more efficient in 105°F heat.',
    focus: 'Prefab office pod (100 sq ft, $15,000–20,000). Best acoustic insulation for deep work. Request triple-pane windows if facing street.',
    meetings: 'Custom build 200 sq ft ($30,000–40,000). Enough space for 4-person meetings, proper lighting, and video call wall.',
  },
  medium: {
    calls: 'Prefab office pod (150 sq ft, $18,000–25,000). Add fiber internet run (DFW average: $400–800 for 100ft underground conduit).',
    focus: 'Custom backyard office (200 sq ft, $35,000–45,000). Proper insulation for DFW heat, built-in storage, standing desk wall.',
    meetings: 'Custom build (250 sq ft, $45,000–60,000). Conference table setup, dedicated A/V, secondary monitor wall.',
  },
  large: {
    calls: 'Full custom office suite (300+ sq ft, $50,000–80,000). Separate conference nook + private call office.',
    focus: 'Full custom with loft option. DFW lots can support 2-story structures with proper permit — doubles usable space.',
    meetings: 'Detached garage conversion or full custom ADU office (400 sq ft, $60,000–100,000). Multiple rooms, full bathroom.',
  },
};

export default function DFWBackyardOfficeGuide() {
  const [lotSize, setLotSize] = useState('');
  const [suburb, setSuburb] = useState('');
  const [useCase, setUseCase] = useState('');
  const [showResult, setShowResult] = useState(false);

  function calculate() {
    if (lotSize && useCase) setShowResult(true);
  }

  const permitInfo = cityPermits[suburb] || cityPermits.other;
  const officeRec = showResult ? useCaseRecommend[lotSize]?.[useCase] : '';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW ADU GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Backyard Office Studio Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          Post-pandemic remote work made backyard offices the #1 ADU category in DFW. A dedicated structure
          removes the commute and the kitchen distraction — and DFW's large suburban lots make it feasible.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌡️ DFW Climate Considerations for Backyard Offices</h2>
        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 16, marginBottom: 24 }}>
          <p style={{ color: '#94a3b8', margin: '0 0 8px', fontSize: 14 }}>
            <strong style={{ color: '#fff' }}>Summer (June–September):</strong> Interior temps in an uninsulated shed reach 140°F. Minimum R-13 wall insulation + R-30 ceiling + ductless mini-split (not window AC) required for productivity.
          </p>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: 14 }}>
            <strong style={{ color: '#fff' }}>DFW Expansion/Contraction:</strong> Expansive clay soil causes foundation movement. Pier-and-beam or concrete pier foundation preferred over slab-on-grade for backyard structures.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🏗️ Office Pod Options</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {officePods.map(p => (
            <div key={p.type} style={{ background: '#1e2d45', borderRadius: 8, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <strong style={{ color: '#F5E642′ }}>{p.type}</strong>
                <span style={{ color: '#94a3b8', fontSize: 12 }}>{p.sqft} · Install: {p.install}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, flexWrap: 'wrap', gap: 6 }}>
                <span style={{ color: '#cbd5e1', fontSize: 13 }}>💰 {p.cost}</span>
                <span style={{ color: '#94a3b8', fontSize: 12 }}>Permit: {p.permit}</span>
              </div>
              <p style={{ color: '#64748b', fontSize: 12, margin: '6px 0 0′ }}>Climate: {p.climate} · Best: {p.best}</p>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Get Your DFW Office Recommendation</h2>
        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 20, marginBottom: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Lot Size</label>
              <select value={lotSize} onChange={e => setLotSize(e.target.value)}
                style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6 }}>
                <option value=''>Select</option>
                <option value='small'>Small (&lt;7,500 sq ft lot)</option>
                <option value='medium'>Medium (7,500–12,000 sq ft)</option>
                <option value='large'>Large (12,000+ sq ft)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>DFW Suburb</label>
              <select value={suburb} onChange={e => setSuburb(e.target.value)}
                style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6 }}>
                <option value=''>Select</option>
                <option value='plano'>Plano</option>
                <option value='frisco'>Frisco</option>
                <option value='mckinney'>McKinney</option>
                <option value='allen'>Allen</option>
                <option value='prosper'>Prosper</option>
                <option value='other'>Other DFW City</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Primary Use</label>
              <select value={useCase} onChange={e => setUseCase(e.target.value)}
                style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6 }}>
                <option value=''>Select</option>
                <option value='calls'>Calls & Video Meetings</option>
                <option value='focus'>Deep Focus / Creative</option>
                <option value='meetings'>Client Meetings</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>
            Get My DFW Office Plan
          </button>
          {showResult && officeRec && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 6, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>✅ Your DFW Backyard Office</div>
              <p style={{ color: '#cbd5e1', margin: '0 0 8px' }}>{officeRec}</p>
              {suburb && <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>📋 Permit Info: {permitInfo}</p>}
            </div>
          )}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642′ }}>
          <strong style={{ color: '#F5E642′ }}>💡 DFW Internet Connection</strong>
          <p style={{ color: '#94a3b8', margin: '8px 0 0', fontSize: 14 }}>
            Run fiber conduit underground from house to office ($400–800 for 100ft).
            AT&T Fiber and Frontier Fiber both serve DFW suburbs — avoid Wi-Fi extenders for video calls.
            Underground conduit protects from DFW lightning strikes that fry outdoor equipment.
          </p>
        </div>
      </div>
    </div>
  );
}
