import { useState } from 'react';

const HVAC_SOLUTIONS: Record<string, Record<string, string>> = {
  'screened-porch': {
    'heating': 'Mini-split heat pump (1–1.5 ton) — standalone unit, no ductwork needed. $3,000–5,500 installed.',
    'cooling': 'Mini-split or extend existing HVAC if under 250 sq ft. DFW heat requires 1-ton minimum.',
    'both': 'Ductless mini-split system — most efficient for DFW year-round. $4,000–7,000 installed.',
  },
  'basic-sunroom': {
    'heating': 'Extend existing HVAC or mini-split. Existing ducts may lack capacity — load calc required.',
    'cooling': 'HVAC extension preferred if under 300 sq ft and unit has capacity. Otherwise mini-split.',
    'both': 'HVAC load calculation first ($150–300) — then extend or add mini-split as needed.',
  },
  'glass-enclosure': {
    'heating': 'Mini-split recommended — glass rooms lose heat rapidly in DFW winters. 1.5-ton minimum.',
    'cooling': 'Mini-split required — glass enclosures gain extreme heat in DFW summers. 2-ton minimum.',
    'both': 'Dedicated mini-split system only — glass enclosures need independent climate control.',
  },
};

const PERMIT_CLASS: Record<string, string> = {
  'screened-porch': 'Building permit (change-of-use from unenclosed to enclosed living space)',
  'basic-sunroom': 'Building permit + HVAC permit. May require energy compliance review.',
  'glass-enclosure': 'Building permit + HVAC + possible structural review for glass weight.',
};

const COST_RANGE: Record<string, string> = {
  'screened-porch': '$15,000 – $35,000',
  'basic-sunroom': '$8,000 – $22,000',
  'glass-enclosure': '$25,000 – $55,000',
};

export default function DFWSunroomConversionGuide() {
  const [sunroomType, setSunroomType] = useState('');
  const [hvacNeed, setHvacNeed] = useState('');
  const [result, setResult] = useState<null | { hvac: string; permit: string; cost: string; note: string }>(null);

  function calculate() {
    if (!sunroomType || !hvacNeed) return;
    const hvac = HVAC_SOLUTIONS[sunroomType]?.[hvacNeed] ?? 'Consult HVAC contractor for load calculation';
    const permit = PERMIT_CLASS[sunroomType];
    const cost = COST_RANGE[sunroomType];
    const note = sunroomType === 'glass-enclosure'
      ? '⚠️ DFW summers hit 105°F+ — glass enclosures without proper HVAC are unusable June–Sept'
      : '✅ Year-round usable space — one of the best ROI conversions for DFW homes';
    setResult({ hvac, permit, cost, note });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Sunroom to Living Space Conversion in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>
          DFW has thousands of screened porches and basic sunrooms that sit unused 6 months a year. Converting to year-round living space adds functional sq footage without the cost of a full addition.
        </p>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>☀️ DFW Climate Reality</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[['June–September', 'Avg high 95–105°F', '🔴 Unusable without AC'],
              ['October–November', 'Avg high 65–80°F', '✅ Perfect naturally'],
              ['December–February', 'Avg low 28–35°F', '🟡 Needs heating'],
              ['March–May', 'Avg high 65–80°F', '✅ Perfect naturally'],
            ].map(([month, temp, status]) => (
              <div key={month} style={{ background: '#0A1628', borderRadius: 8, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{month}</div>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>{temp}</div>
                </div>
                <div style={{ fontSize: 14 }}>{status}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 Conversion Types & Costs</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              ['Screened porch → living', '$15K – $35K', 'Full enclosure, insulation, HVAC, flooring'],
              ['Basic sunroom upgrade', '$8K – $22K', 'Insulation, HVAC, electrical, finishes'],
              ['Glass enclosure upgrade', '$25K – $55K', 'Structural glass, dedicated HVAC, permits'],
            ].map(([type, cost, scope]) => (
              <div key={type} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 600 }}>{type}</div>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>{cost}</div>
                </div>
                <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>{scope}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🧮 Conversion Estimator</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94A3B8′ }}>Current sunroom type</label>
              <select value={sunroomType} onChange={e => setSunroomType(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="">Select type</option>
                <option value="screened-porch">Screened porch (open to elements)</option>
                <option value="basic-sunroom">Basic sunroom (enclosed, unheated/cooled)</option>
                <option value="glass-enclosure">Glass/three-season enclosure</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#94A3B8′ }}>Climate control needed</label>
              <select value={hvacNeed} onChange={e => setHvacNeed(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="">Select need</option>
                <option value="heating">Heating only (mild conversion)</option>
                <option value="cooling">Cooling only</option>
                <option value="both">Full year-round (heating + cooling)</option>
              </select>
            </div>
            <button onClick={calculate}
              style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, padding: '14px 0', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
              Get Conversion Plan →
            </button>
          </div>
          {result && (
            <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
              {[['❄️ HVAC Solution', result.hvac], ['📋 Permits Required', result.permit], ['💰 Estimated Cost', result.cost], ['📌 DFW Note', result.note]].map(([label, val]) => (
                <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                  <div style={{ color: '#94A3B8', fontSize: 13 }}>{label}</div>
                  <div style={{ fontWeight: 600, marginTop: 4 }}>{val}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 18 }}>Connect with DFW HVAC + remodel contractors</div>
          <div style={{ color: '#0A1628', fontSize: 14, marginTop: 6 }}>ProLnk matches you with vetted DFW contractors — free</div>
        </div>
      </div>
    </div>
  );
}
