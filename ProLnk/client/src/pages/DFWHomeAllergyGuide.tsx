import { useState } from 'react';

type AllergyType = 'Cedar / Mountain Cedar' | 'Oak / Elm / Tree Pollen' | 'Johnson Grass / Mold' | 'Dust Mites / Pet Dander' | 'Multiple / All of the Above';
type Severity = 'Mild (manageable with OTC meds)' | 'Moderate (affects daily life)' | 'Severe (debilitating, medical attention needed)';
type HomeSize = 'Under 1,500 sq ft' | '1,500–2,500 sq ft' | '2,500–4,000 sq ft' | '4,000+ sq ft';

function getAllergyPlan(allergyType: AllergyType, severity: Severity, homeSize: HomeSize) {
  const modifications: string[] = [];
  let costLow = 0;
  let costHigh = 0;
  let reliefPercent = '';

  modifications.push('🔧 Upgrade to MERV-13 furnace filters — captures 98% of pollen particles (change every 60 days in DFW peak season)');

  if (allergyType === 'Cedar / Mountain Cedar' || allergyType === 'Multiple / All of the Above') {
    modifications.push('🌲 Cedar season Dec–Feb: add portable HEPA air purifiers to bedroom and living areas during peak');
    modifications.push('🚗 Change clothes at door after outdoor time during cedar season — cedar pollen is extremely fine and sticks to fabric');
  }

  if (allergyType.includes('Oak') || allergyType === 'Multiple / All of the Above') {
    modifications.push('🌳 Oak peaks March–April: keep windows closed, use recirculate on car AC, shower at night');
  }

  if (allergyType.includes('Johnson Grass') || allergyType.includes('Mold') || allergyType === 'Multiple / All of the Above') {
    modifications.push('💧 Whole-home dehumidifier: DFW humidity spikes July–Sept, feeding mold growth in attics and crawlspaces — $1,200–$2,500 installed');
    costLow += 1200; costHigh += 2500;
  }

  if (allergyType === 'Dust Mites / Pet Dander' || allergyType === 'Multiple / All of the Above') {
    modifications.push('🛏️ Allergen-encasement covers for mattress and pillows ($80–$200 set)');
    modifications.push('🐕 Pet HEPA air purifier in bedroom — run 24/7');
  }

  if (severity !== 'Mild (manageable with OTC meds)') {
    modifications.push('🏠 Replace bedroom carpet with hard flooring (carpet holds 8× more allergens than hard floors)');
    modifications.push('🪟 Replace window AC units with split systems — window units draw unfiltered outdoor air');
    costLow += 1800; costHigh += 4500;
  }

  if (severity === 'Severe (debilitating, medical attention needed)') {
    modifications.push('🌬️ Whole-home air purification system on HVAC (iWave or similar) — $700–$1,500 installed');
    modifications.push('🏗️ Attic air sealing — DFW attics often allow pollen infiltration through unsealed penetrations');
    costLow += 800; costHigh += 2000;
  }

  const sizeFactor = homeSize === 'Under 1,500 sq ft' ? 1 : homeSize === '1,500–2,500 sq ft' ? 1.4 : homeSize === '2,500–4,000 sq ft' ? 1.9 : 2.5;
  costLow = Math.round((costLow + 400) * sizeFactor);
  costHigh = Math.round((costHigh + 1200) * sizeFactor);

  reliefPercent = severity === 'Mild (manageable with OTC meds)' ? '60–75%' : severity === 'Moderate (affects daily life)' ? '70–85%' : '80–90%';

  modifications.push('💊 Coordinate indoor modifications with your allergist — indoor improvements amplify immunotherapy results by 40–60%');

  return { modifications, costLow, costHigh, reliefPercent };
}

export default function DFWHomeAllergyGuide() {
  const [allergyType, setAllergyType] = useState<AllergyType | ''>('');
  const [severity, setSeverity] = useState<Severity | ''>('');
  const [homeSize, setHomeSize] = useState<HomeSize | ''>('');
  const [showResults, setShowResults] = useState(false);

  const ready = allergyType && severity && homeSize;
  const result = ready ? getAllergyPlan(allergyType as AllergyType, severity as Severity, homeSize as HomeSize) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', borderBottom: '3px solid #F5E642' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🤧</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Home Allergy Modification Guide</h1>
          <p style={{ fontSize: 18, color: '#A8B8D0', maxWidth: 640 }}>
            DFW consistently ranks in the top 10 worst US cities for allergies. Cedar season alone sends thousands to urgent care each January. Here's how to make your home a true refuge.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#112240', border: '1px solid #2D5016', borderRadius: 12, padding: 20, margin: '32px 0' }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 12px' }}>📅 DFW Allergy Calendar</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
            {[
              { months: 'Dec – Feb', trigger: 'Mountain Cedar', level: '🔴 Extreme' },
              { months: 'Mar – Apr', trigger: 'Oak / Elm', level: '🔴 Very High' },
              { months: 'Apr – May', trigger: 'Grasses begin', level: '🟡 Moderate' },
              { months: 'Jun – Sep', trigger: 'Mold / Johnson Grass', level: '🟠 High' },
              { months: 'Sep – Nov', trigger: 'Ragweed / Mold', level: '🟠 High' },
            ].map(row => (
              <div key={row.months} style={{ background: '#0D1B33', borderRadius: 8, padding: 12 }}>
                <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 12, margin: '0 0 2px' }}>{row.months}</p>
                <p style={{ color: '#E8EDF5', fontSize: 13, margin: '0 0 2px' }}>{row.trigger}</p>
                <p style={{ fontSize: 12, margin: 0 }}>{row.level}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '🔧', title: 'MERV-13 Filters: The First Step', body: 'Most DFW homes ship with MERV-8 filters (captures ~70% of pollen). Upgrading to MERV-13 costs $20–$40 more per filter and captures 98%+ of pollen particles. Change every 45–60 days during peak season instead of 90.' },
            { icon: '💧', title: 'Humidity Control Is Underrated', body: 'DFW summers bring humidity spikes that grow mold in attics, under sinks, and in HVAC drain pans. A whole-home dehumidifier ($1,200–$2,500 installed) removes the root cause for mold-triggered allergy sufferers.' },
            { icon: '🏠', title: 'Flooring Is Hiding Your Allergens', body: 'Carpet can hold up to 8× its weight in allergens including pollen, dander, and dust mites. Replacing master bedroom carpet with hardwood or LVP is consistently rated the highest-impact single modification by allergy specialists.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#112240', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{card.title}</h3>
              <p style={{ color: '#A8B8D0', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, border: '2px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, margin: '0 0 6px' }}>🧮 Allergy Modification Planner</h2>
          <p style={{ color: '#A8B8D0', fontSize: 14, margin: '0 0 24px' }}>Get a prioritized modification list with cost estimate and expected relief percentage</p>

          {([
            { label: 'Primary Allergy Type', value: allergyType, setter: setAllergyType, options: ['Cedar / Mountain Cedar', 'Oak / Elm / Tree Pollen', 'Johnson Grass / Mold', 'Dust Mites / Pet Dander', 'Multiple / All of the Above'] as AllergyType[] },
            { label: 'Severity Level', value: severity, setter: setSeverity, options: ['Mild (manageable with OTC meds)', 'Moderate (affects daily life)', 'Severe (debilitating, medical attention needed)'] as Severity[] },
            { label: 'Home Size', value: homeSize, setter: setHomeSize, options: ['Under 1,500 sq ft', '1,500–2,500 sq ft', '2,500–4,000 sq ft', '4,000+ sq ft'] as HomeSize[] },
          ]).map(({ label, value, setter, options }) => (
            <div key={label} style={{ marginBottom: 20 }}>
              <p style={{ color: '#E8EDF5', fontWeight: 600, marginBottom: 10 }}>{label}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {options.map((opt: string) => (
                  <button key={opt} onClick={() => { (setter as (v: string) => void)(opt); setShowResults(false); }}
                    style={{ padding: '8px 14px', borderRadius: 8, border: `2px solid ${value === opt ? '#F5E642' : '#1E3A5F'}`, background: value === opt ? '#F5E642' : '#0D1B33', color: value === opt ? '#0A1628' : '#E8EDF5', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button onClick={() => setShowResults(true)} disabled={!ready}
            style={{ padding: '12px 32px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: ready ? 'pointer' : 'not-allowed', opacity: ready ? 1 : 0.5 }}>
            Build My Allergy Plan →
          </button>

          {showResults && result && (
            <div style={{ marginTop: 28, background: '#0A1628', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 6px', fontSize: 20 }}>Your DFW Allergy Modification Plan</h3>
              <div style={{ display: 'flex', gap: 32, marginBottom: 20, flexWrap: 'wrap' }}>
                <div>
                  <p style={{ color: '#A8B8D0', fontSize: 13, margin: '0 0 2px' }}>Estimated Investment</p>
                  <p style={{ color: '#E8EDF5', fontWeight: 800, fontSize: 26, margin: 0 }}>${result.costLow.toLocaleString()} – ${result.costHigh.toLocaleString()}</p>
                </div>
                <div>
                  <p style={{ color: '#A8B8D0', fontSize: 13, margin: '0 0 2px' }}>Expected Symptom Relief</p>
                  <p style={{ color: '#F5E642', fontWeight: 800, fontSize: 26, margin: 0 }}>{result.reliefPercent}</p>
                </div>
              </div>
              <p style={{ color: '#A8B8D0', fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Priority Modifications:</p>
              <ol style={{ margin: 0, paddingLeft: 22 }}>
                {result.modifications.map(m => <li key={m} style={{ color: '#C8D8E8', fontSize: 14, marginBottom: 10, lineHeight: 1.6 }}>{m}</li>)}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
