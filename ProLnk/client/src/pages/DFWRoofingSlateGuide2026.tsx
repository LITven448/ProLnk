import { useState } from 'react';

export default function DFWRoofingSlateGuide2026() {
  const [homeAge, setHomeAge] = useState('');
  const [roofPitch, setRoofPitch] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState('');

  const getFeasibility = () => {
    if (!homeAge || !roofPitch || !budget) { setResult('Please answer all questions.'); return; }
    const age = parseInt(homeAge);
    if (roofPitch === 'low') { setResult('🔴 NOT RECOMMENDED: Natural slate requires a minimum 4:12 pitch for proper water shedding and drainage. Low-slope roofs are not suitable for slate. Consider synthetic slate or metal roofing as alternatives that work on lower pitches.'); return; }
    if (budget === 'low') { setResult('🔴 BUDGET MISMATCH: Natural slate installed in DFW runs $25–$40 per square foot — a 2,000 sqft roof costs $50,000–$80,000+. If budget is a concern, synthetic slate ($8–$15/sqft) provides similar aesthetics and excellent DFW hail resistance at a fraction of the cost.'); return; }
    if (age < 30) { setResult('🟡 STRUCTURAL ASSESSMENT REQUIRED: Your home is newer and may not have been engineered for slate weight (800–1,500 lbs per square vs. 250–400 lbs for asphalt). A structural engineer must assess your roof framing before installation. Cost: $500–$1,500 for assessment.'); return; }
    if (age >= 30 && roofPitch === 'steep' && budget === 'high') { setResult('🟢 EXCELLENT CANDIDATE: Older DFW homes often have heavier original framing that can support slate. Your steep pitch and budget alignment make this feasible. Key steps: 1) Structural assessment ($500–$1,500), 2) Specialty installer (fewer than 15 certified slate installers in DFW metro), 3) Manufacturer warranty requires certified installer.'); return; }
    setResult('🟡 POSSIBLE WITH ASSESSMENT: Slate may work for your situation but requires a structural engineering review. Get a load calculation done on your roof framing before committing. Budget $500–$1,500 for the assessment.');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '14px', fontWeight: '600′ }}>🏠 DFW ROOFING GUIDE 2026</div>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px', lineHeight: '1.2′ }}>Natural Slate Roofing in DFW</h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '32px' }}>Slate outlasts the homes it covers — but DFW's unique conditions make it a specialty decision that requires careful evaluation.</p>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>🪨 Natural Slate Facts for DFW</h2>
          {[['Lifespan','75–150 years — natural slate genuinely outlasts most DFW homes (average DFW home age: 28 years)'],['Weight','800–1,500 lbs per square (100 sqft). Asphalt shingles: 250–400 lbs/square. Structural assessment required.'],['DFW Hail Performance','Excellent. Slate rated Class 4 impact resistance — the highest rating. Best option for hail-prone DFW.'],['Cost Installed','$25–$40 per square foot in DFW metro (2026). A 2,500 sqft home = $62,500–$100,000+.'],['Fire Rating','Class A — the highest fire resistance rating. Fully non-combustible.'],['Installer Availability','Fewer than 15 certified natural slate installers in DFW metro area. Scheduling lead times: 4–12 months.']].map(([label, value]) => (
            <div key={label} style={{ padding: '12px 0', borderBottom: '1px solid #334155′ }}>
              <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '13px', marginBottom: '4px' }}>{label}</div>
              <div style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.5′ }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>⚠️ DFW-Specific Considerations</h2>
          {[['🌡️ Thermal Expansion','DFW temperature swings (15°F to 110°F) require proper flashing and installation technique — slate is rigid and improperly fastened slate cracks'],['🌧️ Flat Sections','Slate minimum pitch is 4:12 — many DFW homes have porch or garage extensions with lower pitches requiring different materials in those areas'],['🔧 Repair Specialists','When a slate tile breaks (and some will), you need a slate specialist — a standard DFW roofer can cause more damage attempting repairs'],['🏠 HOA Approval','Many DFW HOAs require approval for roofing material changes — slate approval is usually straightforward given its premium nature']].map(([title, desc]) => (
            <div key={title} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '14px', marginBottom: '10px' }}>
              <div style={{ fontWeight: '700', marginBottom: '6px', fontSize: '14px' }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.5′ }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>🧮 Is Slate Feasible for My DFW Home?</h2>
          {[['Approximate age of your home?', homeAge, setHomeAge, null],['What is your roof pitch?', roofPitch, setRoofPitch, [['low','Low slope (under 4:12 — nearly flat)'],['moderate','Moderate (4:12 to 6:12 — standard DFW ranch)'],['steep','Steep (7:12 and above — two-story, Tudor style)']]],['What is your budget orientation?', budget, setBudget, [['low','Value-conscious — looking for best cost/benefit'],['high','Quality-first — willing to invest for 100-year solution']]]].map(([label, val, setter, options]) => (
            <div key={label} style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '14px', marginBottom: '6px' }}>{label}</label>
              {options ? (
                <select value={val} onChange={e => setter(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px' }}>
                  <option value="">Select an option</option>
                  {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              ) : (
                <input type="number" value={val} onChange={e => setter(e.target.value)} placeholder="Enter home age in years"
                  style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }} />
              )}
            </div>
          ))}
          <button onClick={getFeasibility}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 24px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%' }}>
            Check Slate Feasibility →
          </button>
          {result && <div style={{ marginTop: '16px', backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px', color: '#cbd5e1', fontSize: '15px', lineHeight: '1.7′ }}>{result}</div>}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#F5E642', fontWeight: '700', marginBottom: '8px' }}>🏠 ProLnk Tip</div>
          <div style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.6′ }}>ProLnk maintains a short list of DFW-area certified slate installers — one of the scarcest contractor categories in North Texas. Natural slate installation is a lifetime investment that dramatically increases home value and is fully documented in the ProLnk Home Health Vault.</div>
        </div>
      </div>
    </div>
  );
}