import { useState } from 'react';

export default function DFWWindowACGuide() {
  const [roomSqft, setRoomSqft] = useState('');
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState<null | { btuNeeded: number; unitCost: string; annualCost: number; centralComparison: string; recommendation: string }>(null);

  function calculate() {
    const sqft = parseInt(roomSqft, 10);
    if (!sqft || !situation) return;

    const baseBtu = sqft * 20;
    const dfwHeatLoad = Math.round(baseBtu * 1.15);

    let annualCost = 0;
    let centralComparison = '';
    let recommendation = '';
    let unitCost = '';

    if (dfwHeatLoad <= 6000) unitCost = '$150–$250 (5,000–6,000 BTU)';
    else if (dfwHeatLoad <= 10000) unitCost = '$250–$400 (8,000–10,000 BTU)';
    else if (dfwHeatLoad <= 15000) unitCost = '$400–$600 (12,000–15,000 BTU)';
    else unitCost = '$600–$900 (18,000–24,000 BTU)';

    const watts = dfwHeatLoad / 10;
    const dallasHours = 1800;
    annualCost = Math.round((watts / 1000) * dallasHours * 0.13);
    const centralProportionalCost = Math.round(annualCost * 0.75);
    centralComparison = `Estimated equivalent central AC cost for this zone: ~$${centralProportionalCost}/year (more efficient at scale)`;

    if (situation === 'rental-addon') recommendation = 'Window units are ideal for rental additions — no ductwork needed, tenant-controlled, code-compliant in most DFW cities.';
    else if (situation === 'no-ducts') recommendation = 'For homes without ductwork, a window unit or mini-split is your only option. Mini-split is quieter and more efficient but costs more upfront.';
    else if (situation === 'bonus-room') recommendation = 'Bonus rooms and garage conversions often need supplemental cooling. A window unit is cost-effective; a mini-split is quieter and more permanent.';
    else recommendation = 'Evaluate whether a mini-split heat pump would serve better — it handles both DFW summer cooling and winter heating in one unit.';

    setResult({ btuNeeded: dfwHeatLoad, unitCost, annualCost, centralComparison, recommendation });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.5rem' }}>🪟 DFW Window AC Guide</div>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>Window units have a real place in DFW — rental add-ons, older homes without ducts, bonus rooms. But DFW's brutal summers demand right-sized units and smart placement.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🌡️ When Window Units Make Sense in DFW</div>
          <ul style={{ color: '#ccc', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
            <li>Rental property add-ons where adding ductwork isn't cost-effective</li>
            <li>Historic homes or garage apartments without existing duct systems</li>
            <li>Bonus rooms, sunrooms, or converted spaces not connected to central AC</li>
            <li>Temporary cooling during HVAC replacement or major repairs</li>
            <li>Small offices or workshops that only need occasional cooling</li>
          </ul>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>⚡ DFW Window AC Tips</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['Oversize for DFW Heat', 'DFW summers push 105°F+. Add 15% to standard BTU calculations. An undersized unit will run constantly and fail early.'],
              ['West-Facing Windows', 'Afternoon sun bakes west-facing rooms. Units in west windows need more BTUs — direct sun adds significant heat load.'],
              ['Installation Safety', 'Window units must be secure. In DFW wind events (severe storms April–June), improper installation is a hazard.'],
              ['Energy Star Models', 'DFW summer electricity bills are brutal. Energy Star window units use 10–15% less power — important for 6-month cooling seasons.'],
              ['Drainage', 'DFW humidity means significant condensate. Ensure your unit drains away from walls and foundation.'],
            ].map(([tip, detail]) => (
              <div key={tip} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600 }}>💡 {tip}</div>
                <div style={{ color: '#aaa', fontSize: '0.9rem', marginTop: 4 }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🧮 Window AC Sizing Calculator</div>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.9rem' }}>Room Size (sq ft)</label>
              <input type="number" value={roomSqft} onChange={e => setRoomSqft(e.target.value)} placeholder="e.g. 400″
                style={{ width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 6, border: '1px solid #334', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.9rem' }}>Your Situation</label>
              <select value={situation} onChange={e => setSituation(e.target.value)}
                style={{ width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 6, border: '1px solid #334', background: '#0A1628', color: '#fff' }}>
                <option value="">Select situation</option>
                <option value="rental-addon">Rental property addition</option>
                <option value="no-ducts">Home without ductwork</option>
                <option value="bonus-room">Bonus room / garage conversion</option>
                <option value="supplement">Supplement to existing central AC</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get My Window AC Recommendation
          </button>
          {result && (
            <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🎯 Your Results</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div style={{ background: '#1a2a4a', borderRadius: 6, padding: '0.6rem', textAlign: 'center' }}>
                  <div style={{ color: '#aaa', fontSize: '0.8rem' }}>DFW-Adjusted BTU Needed</div>
                  <div style={{ color: '#F5E642', fontSize: '1.2rem', fontWeight: 700 }}>{result.btuNeeded.toLocaleString()}</div>
                </div>
                <div style={{ background: '#1a2a4a', borderRadius: 6, padding: '0.6rem', textAlign: 'center' }}>
                  <div style={{ color: '#aaa', fontSize: '0.8rem' }}>Estimated Annual Cost</div>
                  <div style={{ color: '#f87', fontSize: '1.2rem', fontWeight: 700 }}>${result.annualCost}</div>
                </div>
              </div>
              <div style={{ color: '#fff', marginBottom: 4 }}>💰 <strong>Unit Cost Range:</strong> {result.unitCost}</div>
              <div style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: 8 }}>{result.centralComparison}</div>
              <div style={{ color: '#aaa', fontSize: '0.9rem' }}>{result.recommendation}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
