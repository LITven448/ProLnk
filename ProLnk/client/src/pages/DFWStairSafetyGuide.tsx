import { useState } from 'react';

export default function DFWStairSafetyGuide() {
  const [stairType, setStairType] = useState('interior');
  const [stairWidth, setStairWidth] = useState(36);
  const [railingHeight, setRailingHeight] = useState(32);
  const [balusterSpacing, setBalusterSpacing] = useState(5);
  const [hasLighting, setHasLighting] = useState(true);
  const [result, setResult] = useState<null | {
    issues: { label: string; fix: string; cost: string }[];
    compliant: boolean;
    totalLow: number;
    totalHigh: number;
  }>(null);

  function calculate() {
    const issues: { label: string; fix: string; cost: string }[] = [];

    if (railingHeight < 34) issues.push({ label: `Handrail too low: ${railingHeight}" (must be 34–38")`, fix: 'Adjust or replace railing bracket heights', cost: '$150–400' });
    if (railingHeight > 38) issues.push({ label: `Handrail too high: ${railingHeight}" (must be 34–38")`, fix: 'Lower railing brackets to correct height', cost: '$150–300' });
    if (stairWidth > 44 && stairType === 'interior') issues.push({ label: `Stair is ${stairWidth}" wide — handrails required on BOTH sides (>44")`, fix: 'Install second handrail on open side', cost: '$400–900' });
    if (balusterSpacing > 4) issues.push({ label: `Baluster spacing: ${balusterSpacing}" — must be 4" max (4-inch sphere rule)`, fix: 'Add intermediate balusters or replace railing system', cost: '$600–2,000' });
    if (!hasLighting) issues.push({ label: 'No stair lighting — IRC requires illumination at top and bottom', fix: 'Install switched lighting at both stair ends', cost: '$200–600' });
    if (stairType === 'loft' && balusterSpacing > 4) issues.push({ label: 'Open loft/balcony railing is a common DFW code failure', fix: 'Replace or infill balcony guards to 4" max spacing', cost: '$800–3,000' });

    const totalLow = issues.reduce((acc, i) => acc + parseInt(i.cost.replace(/[^0-9]/g, '').slice(0, 3) || '0'), 0);
    const totalHigh = issues.reduce((acc, i) => {
      const nums = i.cost.match(/\d+/g);
      return acc + (nums ? parseInt(nums[nums.length - 1]) : 0);
    }, 0);

    setResult({ issues, compliant: issues.length === 0, totalLow, totalHigh });
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642' }}>🪜 DFW HOME SAFETY GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.5rem' }}>Stair Safety Guide</h1>
        <p style={{ color: '#9AA3B2', marginBottom: '2rem' }}>Stair and railing failures are one of the most common DFW home inspection findings — especially in open-concept homes with loft railings. Check your compliance before selling or renovating.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.2rem' }}>
            <h3 style={{ color: '#F5E642', fontSize: '0.95rem', marginBottom: '0.75rem' }}>📐 Key Code Numbers</h3>
            <ul style={{ color: '#C8D0DC', fontSize: '0.875rem', lineHeight: 1.9, paddingLeft: '1rem', margin: 0 }}>
              <li>Handrail height: <strong>34–38 inches</strong></li>
              <li>Baluster spacing: <strong>4 inches max</strong></li>
              <li>Both sides required: <strong>&gt;44" wide stairs</strong></li>
              <li>Guard height (loft): <strong>36–42 inches</strong></li>
            </ul>
          </div>
          <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.2rem' }}>
            <h3 style={{ color: '#F5E642', fontSize: '0.95rem', marginBottom: '0.75rem' }}>⚠️ DFW Common Failures</h3>
            <ul style={{ color: '#C8D0DC', fontSize: '0.875rem', lineHeight: 1.9, paddingLeft: '1rem', margin: 0 }}>
              <li>Open loft railings too wide</li>
              <li>Decorative iron balusters: 5–6" gaps</li>
              <li>Handrails not graspable (flat-top)</li>
              <li>No lighting at stair top/bottom</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#2B1A0D', border: '1px solid #E67E22', borderRadius: 12, padding: '1.2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#E67E22', fontSize: '1rem', marginBottom: '0.5rem' }}>⚠️ The 4-Inch Sphere Rule</h3>
          <p style={{ color: '#C8D0DC', fontSize: '0.9rem', lineHeight: 1.6 }}>A 4-inch sphere must NOT be able to pass through any opening in a guard or railing. This protects small children from getting their head stuck. Many decorative iron railing styles sold in DFW fail this test — measure your baluster spacing now.</p>
        </div>

        <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '1rem' }}>📏 Check My Stairs</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ color: '#9AA3B2', fontSize: '0.85rem' }}>Stair Type</span>
              <select value={stairType} onChange={e => setStairType(e.target.value)} style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A5C', borderRadius: 6, padding: '0.5rem' }}>
                <option value="interior">Interior main staircase</option>
                <option value="loft">Loft or balcony railing/guard</option>
                <option value="exterior">Exterior deck or porch stairs</option>
                <option value="garage">Garage entry stairs</option>
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ color: '#9AA3B2', fontSize: '0.85rem' }}>Stair Width (inches)</span>
              <input type="number" min={28} max={120} value={stairWidth} onChange={e => setStairWidth(Number(e.target.value))} style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A5C', borderRadius: 6, padding: '0.5rem' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ color: '#9AA3B2', fontSize: '0.85rem' }}>Current Handrail Height (inches from tread/floor)</span>
              <input type="number" min={20} max={50} value={railingHeight} onChange={e => setRailingHeight(Number(e.target.value))} style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A5C', borderRadius: 6, padding: '0.5rem' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ color: '#9AA3B2', fontSize: '0.85rem' }}>Baluster / Spindle Spacing (inches)</span>
              <input type="number" min={1} max={12} value={balusterSpacing} onChange={e => setBalusterSpacing(Number(e.target.value))} style={{ background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A5C', borderRadius: 6, padding: '0.5rem' }} />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasLighting} onChange={e => setHasLighting(e.target.checked)} />
              <span style={{ color: '#C8D0DC' }}>Lighting at top and bottom of stairs</span>
            </label>
            <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem', cursor: 'pointer', fontSize: '1rem' }}>
              Check Compliance
            </button>
          </div>
        </div>

        {result && (
          <div style={{ background: result.compliant ? '#0D2B1A' : '#2B1A0D', border: `1px solid ${result.compliant ? '#2ECC71' : '#E67E22'}`, borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: result.compliant ? '#2ECC71' : '#E67E22', marginBottom: '0.75rem' }}>
              {result.compliant ? '✅ Stairs appear code compliant' : `⚠️ ${result.issues.length} issue(s) found`}
            </div>
            {result.issues.map((issue, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{ color: '#E67E22', fontWeight: 600, marginBottom: '0.25rem' }}>{issue.label}</div>
                <div style={{ color: '#C8D0DC', fontSize: '0.9rem' }}>Fix: {issue.fix}</div>
                <div style={{ color: '#F5E642', fontSize: '0.85rem', marginTop: 2 }}>Cost: {issue.cost}</div>
              </div>
            ))}
            {!result.compliant && (
              <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#0A1628', borderRadius: 8 }}>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>Total Estimated Repair: ${result.totalLow.toLocaleString()} – ${result.totalHigh.toLocaleString()}</div>
              </div>
            )}
          </div>
        )}

        <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginBottom: '0.75rem' }}>🏡 Before You Sell</h2>
          <p style={{ color: '#C8D0DC', lineHeight: 1.7 }}>Stair and railing defects are flagged on virtually every DFW home inspection report. Fixing them before listing saves negotiation headaches. A licensed carpenter or railing specialist can typically complete code corrections in 1–2 days.</p>
        </div>
      </div>
    </div>
  );
}
