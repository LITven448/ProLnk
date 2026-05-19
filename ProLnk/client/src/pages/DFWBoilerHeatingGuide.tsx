import { useState } from 'react';

export default function DFWBoilerHeatingGuide() {
  const [age, setAge] = useState('');
  const [type, setType] = useState('');
  const [result, setResult] = useState<null | { maintenance: string; risks: string; recommendation: string }>(null);

  function calculate() {
    const a = parseInt(age, 10);
    if (!a || !type) return;
    let maintenance: string;
    let risks: string;
    let recommendation: string;

    if (type === 'steam') {
      risks = 'Steam boilers face mineral buildup faster in DFW hard water. Feb 2021-type freezes can rupture pipes.';
      recommendation = a > 20
        ? 'Your steam boiler is aging. In DFW, conversion to forced air heat pump is strongly recommended for efficiency and freeze protection.'
        : 'Maintain annually. Insulate all exposed pipes — DFW had sub-zero temps in Feb 2021 and pipes froze across the metroplex.';
      maintenance = 'Annual pressure relief valve test, water level gauge check, blowdown sediment valve, radiator bleed';
    } else if (type === 'hot-water') {
      risks = 'Hot water boiler pipes in uninsulated DFW spaces (garages, crawlspaces) are freeze vulnerable during extreme events.';
      recommendation = a > 20
        ? 'Older hot water boiler in DFW. Replacement with heat pump system saves 40–60% on heating costs.'
        : 'Service annually. Insulate all pipes in unconditioned spaces. Install a smart thermostat to maintain minimum temps during freezes.';
      maintenance = 'Annual expansion tank check, pressure gauge inspection, circulator pump lubrication, bleed radiators or baseboard units';
    } else {
      risks = 'Combination boiler systems have more failure points. DFW freeze events stress the domestic hot water side.';
      recommendation = 'Combo boilers are rare in DFW. Find a contractor experienced with your specific brand. Keep service manual accessible.';
      maintenance = 'Annual full system inspection by certified boiler technician; domestic hot water side service every 2 years';
    }

    setResult({ maintenance, risks, recommendation });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', marginBottom: '0.5rem' }}>🌡️ DFW Boiler Heating Guide</div>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>Boilers are rare in DFW but found in some mid-century modern homes built in the 1950s–70s. Here's what North Texas homeowners need to know.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🏠 How Boiler Systems Work</div>
          <ul style={{ color: '#ccc', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
            <li>Boilers heat water (or create steam) and distribute it through pipes to radiators or baseboard units</li>
            <li>No ductwork required — great for homes without attic space for ducts</li>
            <li>Two main types in DFW: <strong style={{ color: '#F5E642′ }}>hot water (hydronic)</strong> and <strong style={{ color: '#F5E642' }}>steam</strong></li>
            <li>DFW boilers typically heat with natural gas from Atmos Energy</li>
            <li>Boilers are 85–95% efficient (AFUE) when modern; older units may be 60–70%</li>
          </ul>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>❄️ DFW-Specific Freeze Risk (Feb 2021 Lesson)</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              ['Pipe Freeze Risk', 'DFW rarely sees temps below 20°F but Feb 2021 proved it can happen. Boiler pipes in garages or crawlspaces are vulnerable.'],
              ['Hard Water Scale', 'DFW has hard water (300–500 ppm). Scale builds up in boiler heat exchangers. Water softening extends lifespan.'],
              ['Boiler Contractor Scarcity', 'Few DFW HVAC techs specialize in boilers. Find one now — do not wait for emergency repairs.'],
              ['Conversion Option', 'Many DFW homeowners convert boiler-heated homes to mini-split or forced-air heat pumps for modern AC + heat.'],
            ].map(([issue, detail]) => (
              <div key={issue} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 600 }}>⚡ {issue}</div>
                <div style={{ color: '#aaa', fontSize: '0.9rem', marginTop: 4 }}>{detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '1rem' }}>🧮 Boiler Assessment Calculator</div>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.9rem' }}>Boiler Age (years)</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 25″
                style={{ width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 6, border: '1px solid #334', background: '#0A1628', color: '#fff', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.9rem' }}>Boiler Type</label>
              <select value={type} onChange={e => setType(e.target.value)}
                style={{ width: '100%', marginTop: 6, padding: '0.6rem', borderRadius: 6, border: '1px solid #334', background: '#0A1628', color: '#fff' }}>
                <option value="">Select type</option>
                <option value="hot-water">Hot Water (Hydronic)</option>
                <option value="steam">Steam Boiler</option>
                <option value="combo">Combination (Heat + DHW)</option>
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Get My Boiler Assessment
          </button>
          {result && (
            <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🎯 Your Assessment</div>
              <div style={{ color: '#fff', marginBottom: 6 }}><strong>Maintenance:</strong> {result.maintenance}</div>
              <div style={{ color: '#f87', marginBottom: 6 }}><strong>DFW Risks:</strong> {result.risks}</div>
              <div style={{ color: '#aaa', fontSize: '0.9rem', marginTop: 8 }}><strong>Recommendation:</strong> {result.recommendation}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
