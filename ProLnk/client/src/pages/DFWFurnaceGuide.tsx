import { useState } from 'react';

const data = {
  risks: {
    low: 'Low failure risk — continue annual maintenance',
    moderate: 'Moderate risk — schedule inspection soon',
    high: 'High risk — plan for replacement within 1-2 seasons',
  },
  schedules: {
    young: 'Annual filter change (October) + biennial tune-up',
    mid: 'Annual filter change + annual professional tune-up each October',
    old: 'Annual filter change + annual tune-up + heat exchanger inspection',
  },
};

export default function DFWFurnaceGuide() {
  const [age, setAge] = useState('');
  const [usage, setUsage] = useState('');
  const [result, setResult] = useState<null | { risk: string; schedule: string; recommendation: string }>(null);

  function calculate() {
    const a = parseInt(age, 10);
    if (!a || !usage) return;
    let risk: string;
    let schedule: string;
    let recommendation: string;

    if (a < 8) { risk = data.risks.low; schedule = data.schedules.young; recommendation = 'Your furnace is young. Schedule an October tune-up and replace filters annually.'; }
    else if (a < 15) { risk = data.risks.moderate; schedule = data.schedules.mid; recommendation = 'Mid-life furnace. Have a tech inspect the heat exchanger — short cycling in mild DFW winters accelerates cracking.'; }
    else { risk = data.risks.high; schedule = data.schedules.old; recommendation = 'Older furnace in DFW. Budget for replacement. Heat exchanger cracks from frequent on/off cycling are common at this age.'; }

    if (usage === 'heavy') recommendation += ' Heavy usage increases wear — prioritize inspection.';
    setResult({ risk, schedule, recommendation });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.5rem' }}>🔥 DFW Gas Furnace Guide</div>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>DFW winters are mild, but your furnace still needs care. Short cycling in brief cold snaps is the #1 cause of early failure in North Texas.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>📋 DFW Furnace Facts</div>
          <ul style={{ color: '#ccc', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
            <li>DFW furnaces typically run only <strong style={{ color: '#F5E642' }}>3–4 months</strong> per year (Nov–Feb)</li>
            <li>Best maintenance window: <strong style={{ color: '#F5E642' }}>October</strong>, before first cold front</li>
            <li>Short cycling in mild weather cracks heat exchangers faster than continuous use</li>
            <li>Common DFW issue: carbon monoxide leaks from cracked heat exchangers</li>
            <li>Average furnace lifespan in DFW: <strong style={{ color: '#F5E642' }}>18–22 years</strong> (less wear than northern climates)</li>
          </ul>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>⚠️ Common DFW Furnace Issues</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['Heat Exchanger Cracks', 'Short cycling in mild weather stresses the exchanger. Annual inspection is critical.'],
              ['Dirty Flame Sensor', 'Infrequent use allows oxidation. Clean or replace every 2–3 years.'],
              ['Igniter Failure', 'Hot surface igniters degrade with age. Budget $150–$300 for replacement.'],
              ['Duct Leakage', 'DFW attic heat in summer stresses flex duct connections. Check annually.'],
            ].map(([issue, detail]) => (
              <div key={issue} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600 }}>🔧 {issue}</div>
                <div style={{ color: '#aaa', fontSize: '0.9rem', marginTop: 4 }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🧮 Maintenance & Risk Calculator</div>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.9rem' }}>Furnace Age (years)</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 12"
                style={{ width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 6, border: '1px solid #334', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.9rem' }}>DFW Winter Usage Pattern</label>
              <select value={usage} onChange={e => setUsage(e.target.value)}
                style={{ width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 6, border: '1px solid #334', background: '#0A1628', color: '#fff' }}>
                <option value="">Select usage</option>
                <option value="light">Light (thermostat above 68°F most days)</option>
                <option value="moderate">Moderate (standard DFW household)</option>
                <option value="heavy">Heavy (keep it 72°F+ even in mild weather)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get My Maintenance Plan
          </button>
          {result && (
            <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🎯 Your Results</div>
              <div style={{ color: '#fff', marginBottom: 4 }}><strong>Risk Level:</strong> {result.risk}</div>
              <div style={{ color: '#fff', marginBottom: 4 }}><strong>Schedule:</strong> {result.schedule}</div>
              <div style={{ color: '#aaa', fontSize: '0.9rem', marginTop: 8 }}>{result.recommendation}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
