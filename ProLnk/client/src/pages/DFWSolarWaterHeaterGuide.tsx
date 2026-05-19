import { useState } from 'react';

const sunExposure = ['Excellent (open roof, south-facing)', 'Good (some shading)', 'Moderate (partial shading)', 'Poor (heavy tree/building shade)'];
const situations = ['Owner — staying long-term', 'Owner — may sell in 3–5 years', 'Landlord / rental property', 'Recently built home'];

const feasibilityMap: Record<string, { score: number; system: string; cost: string; savings: string; note: string }> = {
  'Excellent|Owner — staying long-term': { score: 95, system: 'Flat-plate glycol closed-loop', cost: '$4,000–$7,000 after 30% tax credit', savings: '$350–$500/yr', note: 'Excellent ROI — payback in 8–12 years, 20+ year system life.' },
  'Excellent|Owner — may sell in 3–5 years': { score: 80, system: 'Flat-plate glycol closed-loop', cost: '$4,000–$7,000 after tax credit', savings: '$350–$500/yr', note: 'Adds home value — solar water heaters boost appraisal by $1,500–$3,000.' },
  'Excellent|Landlord / rental property': { score: 70, system: 'Flat-plate glycol closed-loop', cost: '$4,000–$7,000 after tax credit', savings: '$350–$500/yr', note: 'Tax credit applies. Depreciation benefits available for rental properties.' },
  'Good|Owner — staying long-term': { score: 85, system: 'Evacuated tube (better in partial shade)', cost: '$5,000–$8,500 after tax credit', savings: '$280–$420/yr', note: 'Good fit — evacuated tubes outperform flat-plate in partial shade.' },
  'Moderate|Owner — staying long-term': { score: 60, system: 'Evacuated tube system recommended', cost: '$5,000–$8,500 after tax credit', savings: '$200–$300/yr', note: 'Marginal — consider heat pump water heater as alternative.' },
  'Poor|Owner — staying long-term': { score: 25, system: 'Not recommended', cost: 'N/A', savings: 'Minimal', note: 'Insufficient solar access — heat pump water heater is better option.' },
};

export default function DFWSolarWaterHeaterGuide() {
  const [sun, setSun] = useState('');
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState<null | typeof feasibilityMap[string]>(null);

  function calculate() {
    if (!sun || !situation) return;
    const key = `${sun}|${situation}`;
    const match = feasibilityMap[key] ?? { score: 60, system: 'Flat-plate glycol system', cost: '$4,500–$7,500 after tax credit', savings: '$280–$420/yr', note: 'DFW sun makes solar water heating viable for most homes.' };
    setResult(match);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.25rem' }}>☀️ DFW Solar Water Heater Guide</div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem' }}>Solar Water Heaters in DFW: Is It Right for You?</h1>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem' }}>DFW's Solar Advantage</h2>
          <p style={{ lineHeight: 1.7, color: '#c8d8f0′ }}>
            DFW receives <strong style={{ color: '#F5E642′ }}>220+ sunny days per year</strong> — among the highest in the continental US.
            Solar water heaters can offset 50–80% of your water heating costs, and the federal tax credit covers 30% of total system cost.
            The key challenge in DFW: <strong style={{ color: '#F5E642′ }}>freeze protection</strong> — glycol closed-loop systems are required.
          </p>
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem' }}>How Solar Water Heaters Work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0.75rem' }}>
            {[
              ['🌞', 'Solar collectors on roof absorb sunlight and heat glycol fluid'],
              ['🔄', 'Glycol circulates through heat exchanger in your storage tank'],
              ['🧊', 'Glycol freeze point: -20°F — safe for DFW winters'],
              ['💡', 'Electric or gas backup kicks in on cloudy days automatically'],
            ].map(([icon, text]) => (
              <div key={text} style={{ background: '#0d1e38', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>{icon}</div>
                <div style={{ color: '#c8d8f0', fontSize: '0.9rem' }}>{text}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem' }}>🏛️ Federal Tax Credit: 30%</h2>
          <ul style={{ lineHeight: 2, color: '#c8d8f0', paddingLeft: '1.5rem' }}>
            <li>30% of total installed cost deducted from federal taxes (IRS Form 5695)</li>
            <li>Applies to primary and secondary residences (not rentals for tax credit)</li>
            <li>No cap — a $7,000 system = $2,100 back on your taxes</li>
            <li>Credit carries forward if your tax liability is less than credit amount</li>
          </ul>
        </div>

        <div style={{ background: '#132240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📍 Check Solar Feasibility for Your Home</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ color: '#c8d8f0', display: 'block', marginBottom: '0.4rem' }}>Roof Sun Exposure</label>
              <select value={sun} onChange={e => setSun(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#0d1e38', color: '#fff', border: '1px solid #F5E642′ }}>
                <option value=''>Select exposure...</option>
                {sunExposure.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#c8d8f0', display: 'block', marginBottom: '0.4rem' }}>Your Situation</label>
              <select value={situation} onChange={e => setSituation(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, background: '#0d1e38', color: '#fff', border: '1px solid #F5E642′ }}>
                <option value=''>Select situation...</option>
                {situations.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <button onClick={calculate}
              style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
              Check Feasibility
            </button>
          </div>
          {result && (
            <div style={{ marginTop: '1.25rem', background: '#0d1e38', borderRadius: 10, padding: '1.25rem', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
                {result.score}% Solar Feasibility Score
              </div>
              <div style={{ color: '#c8d8f0', lineHeight: 1.9 }}>
                <div>🔧 Recommended System: <strong style={{ color: '#fff' }}>{result.system}</strong></div>
                <div>💰 Estimated Cost: <strong style={{ color: '#fff' }}>{result.cost}</strong></div>
                <div>📈 Annual Savings: <strong style={{ color: '#fff' }}>{result.savings}</strong></div>
                <div style={{ marginTop: '0.75rem', color: '#F5E642′ }}>{result.note}</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1.25rem', color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Find a DFW Solar Water Heater Installer</div>
          <div style={{ fontSize: '0.9rem', marginTop: '0.4rem' }}>ProLnk connects you with certified solar thermal installers who know DFW freeze protection requirements.</div>
        </div>
      </div>
    </div>
  );
}
