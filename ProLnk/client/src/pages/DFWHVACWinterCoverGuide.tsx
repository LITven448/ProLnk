import { useState } from 'react';

const systemTypes = [
  {
    system: 'Heat Pump',
    location: 'Any DFW area',
    recommendation: 'Never Cover',
    detail: 'Heat pumps run in winter to heat your home by extracting heat from outdoor air — even in DFW winter temps of 25–45°F. Covering a heat pump blocks the airflow it needs to operate and can cause defrost cycle failures. Covering is a service call waiting to happen.',
    animalPrevention: 'Install a pest mesh screen around the base (1/4 inch hardware cloth) — allows airflow but blocks rodents. Do not cover the top.',
    cost: 'Mesh screen: $20–$50 DIY',
    dfwNote: 'DFW winters rarely drop below 20°F for extended periods, but heat pumps run in 30–40°F weather constantly. A covered heat pump on a 35°F DFW night = no heat.',
  },
  {
    system: 'Standard Central AC (not heat pump)',
    location: 'North DFW — Frisco, McKinney, Allen, Prosper',
    recommendation: 'Partial Cover OK',
    detail: 'Standard AC condensers do not run in winter. North DFW winters occasionally get ice storms. A partial cover (top only, sides open) protects from ice and hail while allowing airflow that prevents moisture accumulation. Full covers trap humidity and accelerate corrosion.',
    animalPrevention: 'Mesh around base year-round. If using top cover, use breathable fabric cover — plastic traps moisture.',
    cost: 'Breathable cover: $30–$60 at HVAC supply stores',
    dfwNote: 'North DFW averages 1–3 ice events per winter. Ice accumulation on condenser fins is cosmetic unless very heavy. A breathable top cover is reasonable but not essential.',
  },
  {
    system: 'Standard Central AC (not heat pump)',
    location: 'South/Central DFW — Dallas, Fort Worth, Arlington, Irving',
    recommendation: 'Cover Not Needed',
    detail: 'South and central DFW winters are mild enough that condenser covers provide minimal protection benefit. More DFW condensers are damaged by covers trapping moisture than by uncovered winters. The fins can handle DFW winters without protection.',
    animalPrevention: 'Inspect condenser interior in spring and fall — mice nest in fan housing during winter regardless of cover status.',
    cost: 'No cover needed — save the money',
    dfwNote: 'Dallas and Fort Worth proper see only occasional ice, rarely exceeding 1/4 inch. Condenser coils handle this without damage.',
  },
  {
    system: 'Standard Central AC (not heat pump)',
    location: 'East DFW — Rockwall, Rowlett, Mesquite (higher humidity)',
    recommendation: 'Breathable Cover If Ice-Prone Spot',
    detail: 'East DFW sees more frequent ice than central DFW and higher winter humidity. If your unit is under a tree (hail and debris risk) or in a wind corridor, a breathable top cover through December–February is reasonable. Remove before using AC in spring.',
    animalPrevention: 'Trim any overhanging branches 3+ feet above unit. Debris is a bigger issue in east DFW wooded areas than covers.',
    cost: 'Breathable cover: $30–$60; remove by March 1',
    dfwNote: 'Leaving a cover on into spring is the #1 cover-related service call — homeowners forget to remove it and wonder why the system makes terrible noises on first start.',
  },
];

export default function DFWHVACWinterCoverGuide() {
  const [selectedSystem, setSelectedSystem] = useState('');
  const [result, setResult] = useState<typeof systemTypes[0] | null>(null);

  const systems = ['Heat Pump', 'Standard Central AC (not heat pump)'];
  const locations = systemTypes.filter(s => s.system === selectedSystem).map(s => s.location);

  const handleSystemSelect = (sys: string) => {
    setSelectedSystem(sys);
    setResult(null);
    if (sys === 'Heat Pump') {
      setResult(systemTypes.find(s => s.system === 'Heat Pump') || null);
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642' }}>❄️ DFW HVAC Guide</div>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem', color: '#FFFFFF' }}>
          AC Condenser Winter Cover Guide for DFW
        </h1>
        <p style={{ color: '#9CA3B0', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Should you cover your outdoor AC unit for DFW winter? The answer depends on your system type and location. Getting it wrong causes damage either way.
        </p>

        <div style={{ background: '#111E35', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '2rem', borderLeft: '4px solid #F5E642' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.25rem' }}>The Core Rule</div>
          <div style={{ color: '#9CA3B0', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Heat pump = never cover. Standard AC = maybe partial. Full covers on either system trap moisture, block emergency defrost, and become nesting habitat for rodents.
          </div>
        </div>

        <div style={{ marginBottom: '0.75rem', color: '#9CA3B0', fontSize: '0.85rem' }}>Step 1: What type of system do you have?</div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {systems.map((sys) => (
            <button
              key={sys}
              onClick={() => handleSystemSelect(sys)}
              style={{
                padding: '0.6rem 1.25rem', borderRadius: 20, border: 'none', cursor: 'pointer',
                background: selectedSystem === sys ? '#F5E642' : '#111E35',
                color: selectedSystem === sys ? '#0A1628' : '#E8EAF0',
                fontWeight: selectedSystem === sys ? 700 : 400, fontSize: '0.9rem',
              }}
            >{sys}</button>
          ))}
        </div>

        {selectedSystem === 'Standard Central AC (not heat pump)' && (
          <>
            <div style={{ marginBottom: '0.75rem', color: '#9CA3B0', fontSize: '0.85rem' }}>Step 2: Where in DFW?</div>
            <div style={{ display: 'grid', gap: '0.6rem', marginBottom: '2rem' }}>
              {locations.map((loc, i) => {
                const entry = systemTypes.find(s => s.system === selectedSystem && s.location === loc);
                return (
                  <button
                    key={i}
                    onClick={() => setResult(entry || null)}
                    style={{
                      background: result?.location === loc ? '#1E3A5F' : '#111E35',
                      border: result?.location === loc ? '1.5px solid #F5E642' : '1.5px solid #1A2540',
                      borderRadius: 10, padding: '0.85rem 1.25rem', textAlign: 'left', cursor: 'pointer', color: '#E8EAF0',
                    }}
                  >
                    <div style={{ fontWeight: 600 }}>📍 {loc}</div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {result && (
          <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', border: '1.5px solid #F5E642' }}>
            <div style={{
              display: 'inline-block', padding: '0.35rem 1rem', borderRadius: 20, fontWeight: 800, marginBottom: '1rem',
              background: result.recommendation === 'Never Cover' ? '#7C2D12' : result.recommendation === 'Cover Not Needed' ? '#14532D' : '#92400E',
              color: '#FFFFFF', fontSize: '0.85rem',
            }}>
              {result.recommendation === 'Never Cover' ? '🚫 Never Cover' : result.recommendation === 'Cover Not Needed' ? '✅ No Cover Needed' : '⚠️ ' + result.recommendation}
            </div>
            <div style={{ display: 'grid', gap: '0.85rem' }}>
              <div>
                <div style={{ color: '#9CA3B0', fontSize: '0.75rem', marginBottom: '0.25rem' }}>DETAIL</div>
                <div style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#C8D0DC' }}>{result.detail}</div>
              </div>
              <div>
                <div style={{ color: '#9CA3B0', fontSize: '0.75rem', marginBottom: '0.25rem' }}>ANIMAL NESTING PREVENTION</div>
                <div style={{ fontSize: '0.9rem', color: '#C8D0DC' }}>{result.animalPrevention}</div>
              </div>
              <div style={{ background: '#1A2540', borderRadius: 8, padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'inline-block' }}>
                💵 {result.cost}
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', borderLeft: '3px solid #F5E642', fontSize: '0.85rem', color: '#9CA3B0' }}>
                🌆 {result.dfwNote}
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '2rem', background: '#111E35', borderRadius: 10, padding: '1rem 1.25rem', fontSize: '0.85rem', color: '#9CA3B0' }}>
          💡 Not sure if you have a heat pump? Check your thermostat — if it has an "EM Heat" or "Emergency Heat" setting, you have a heat pump. Never cover it.
        </div>
      </div>
    </div>
  );
}
