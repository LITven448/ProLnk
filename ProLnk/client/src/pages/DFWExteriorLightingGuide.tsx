import { useState } from 'react';

const homeSizes = ['Under 1,800 sq ft', '1,800–2,800 sq ft', '2,800–4,000 sq ft', '4,000–6,000 sq ft', '6,000+ sq ft'];
const primaryGoals = ['Security — deter intruders and see movement', 'Curb appeal — architectural and landscape lighting', 'Outdoor entertaining — patio, pool, and yard lighting', 'Balanced — security + aesthetics equally'];

type LightingPlan = { zone: string; fixture: string; type: string; note: string }[];

const securityPlans: LightingPlan = [
  { zone: 'Entry / front door', fixture: 'Motion-activated floodlight (2,000+ lumens)', type: 'Wired preferred', note: 'DFW installers run conduit to existing porch outlet — $200–$400 labor' },
  { zone: 'Driveway / garage', fixture: 'Dusk-to-dawn LED wall pack', type: 'Wired', note: 'Photocell sensor — no timer needed, auto-adjusts for DFW\’s long summer days' },
  { zone: 'Side gates / alleys', fixture: 'Motion floodlight on eave corner', type: 'Wired or solar (with 8hr+ backup)', note: 'DFW sun provides excellent solar charging 9 months/year — adequate for security fixtures' },
  { zone: 'Backyard perimeter', fixture: 'Low-voltage path lights + corner floods', type: 'Low-voltage transformer', note: 'Keep bollard lights low-profile — DFW lawn mowers will destroy taller fixtures at property edges' },
];

const aestheticPlans: LightingPlan = [
  { zone: 'Architectural uplights', fixture: 'Well lights or spike uplights (600–1000 lumens)', type: 'Low-voltage wired', note: 'Accent roofline, columns, and dormers. Warm 2700K color temp for DFW brick exteriors' },
  { zone: 'Tree / landscape uplights', fixture: 'Adjustable spike fixtures', type: 'Low-voltage transformer', note: 'Oak and pecan trees are DFW staples — uplighting through canopy creates dramatic effect' },
  { zone: 'Front bed path lights', fixture: 'Bollard or mushroom fixtures (150–300 lumens)', type: 'Low-voltage', note: 'Install stake depth 8"+ in DFW clay soil — shallow stakes heave in summer heat cycles' },
  { zone: 'Garage / entry soffit', fixture: 'Recessed downlights (6" canless LED)', type: 'Wired', note: 'Weatherproof (IP65) required for DFW humidity + rain exposure' },
];

const entertainPlans: LightingPlan = [
  { zone: 'Covered patio ceiling', fixture: 'Canless LED recessed + ceiling fan light', type: 'Wired', note: 'DFW outdoor living requires weatherproof rated fixtures — humid summers cause corrosion fast' },
  { zone: 'Pool / water feature', fixture: 'Underwater LED (color-changing optional)', type: 'Low-voltage 12V', note: 'Code requires GFCI and bonding — licensed electrician only in DFW' },
  { zone: 'String lights / bistro', fixture: 'Commercial-grade outdoor string (shatter-resistant)', type: 'Low-voltage or 120V', note: 'Avoid cheap big-box strings — DFW wind (40mph+ gusts are common) destroys them in one season' },
  { zone: 'Landscape / bed perimeter', fixture: 'Color-temperature-adjustable path fixtures', type: 'Smart low-voltage system', note: 'Lutron or VOLT systems allow phone-app control — popular in DFW smart home builds' },
];

function getPlan(goal: string): LightingPlan {
  if (goal.startsWith('Security')) return securityPlans;
  if (goal.startsWith('Curb appeal')) return aestheticPlans;
  if (goal.startsWith('Outdoor entertaining')) return entertainPlans;
  return [...securityPlans.slice(0, 2), ...aestheticPlans.slice(0, 2)];
}

function getCost(homeSize: string, goal: string): { low: string; high: string } {
  const sizeIndex = homeSizes.indexOf(homeSize);
  const base = [1200, 2200, 3800, 6000, 10000][sizeIndex] || 2200;
  const multiplier = goal.startsWith('Outdoor') ? 1.5 : 1;
  return { low: `$${Math.round(base * multiplier * 0.8).toLocaleString()}`, high: `$${Math.round(base * multiplier * 1.4).toLocaleString()}` };
}

export default function DFWExteriorLightingGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [goal, setGoal] = useState('');
  const [result, setResult] = useState<null | { plan: LightingPlan; cost: { low: string; high: string } }>(null);

  function calculate() {
    if (!homeSize || !goal) return;
    setResult({ plan: getPlan(goal), cost: getCost(homeSize, goal) });
  }

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', fontSize: '14px', color: '#F5E642' }}>💡 DFW Exterior Guides</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#FFFFFF', marginBottom: '8px' }}>Exterior Home Lighting Guide — DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: '32px', lineHeight: '1.6' }}>DFW homes spend 6+ months of evenings outdoors. The right lighting system handles security, curb appeal, and entertaining — in a climate that tests every fixture.</p>

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>🌡️ DFW Climate Challenges for Exterior Lighting</h2>
          <div style={{ display: 'grid', gap: '10px' }}>
            {[
              { issue: 'Extreme heat (110°F+)', impact: 'Cheap fixtures warp, seals fail, LED drivers overheat. Specify fixtures rated to 140°F operating temperature.' },
              { issue: 'Hail (annual risk)', impact: 'Polycarbonate lenses survive hail; glass shatters. Recessed fixtures and soffit-mounted are best protected.' },
              { issue: 'Clay soil movement', impact: 'DFW soil heaves 1–3 inches seasonally — stake fixtures need deep anchoring or they tilt and rotate.' },
              { issue: 'Lawn mowing clearance', impact: 'Bollard lights under 12" get clipped by mowers on DFW lots with zero-turn mowers. Design clearance into layout.' },
              { issue: 'Humidity + UV combo', impact: 'Untreated aluminum corrodes in 2–3 seasons. Specify marine-grade powder coat or stainless hardware.' },
            ].map(item => (
              <div key={item.issue} style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '14px' }}>
                <div style={{ color: '#F5E642', fontWeight: '600', marginBottom: '4px' }}>⚠️ {item.issue}</div>
                <p style={{ color: '#CBD5E1', fontSize: '13px', margin: 0 }}>{item.impact}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '12px' }}>⚡ Wired vs Solar — The DFW Reality</h2>
          <p style={{ color: '#CBD5E1', lineHeight: '1.7', marginBottom: '14px' }}>DFW gets 235+ sunny days/year making solar viable — but with important limits. Security floods, patio overhead, and pool lighting require wired circuits. Solar is appropriate for path lights, accent lighting, and supplemental illumination where a 4–6 hour runtime is sufficient.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '14px' }}>
              <div style={{ color: '#22C55E', fontWeight: '700', marginBottom: '8px' }}>✅ Solar OK</div>
              <ul style={{ color: '#CBD5E1', fontSize: '13px', paddingLeft: '16px', margin: 0, lineHeight: '1.8' }}>
                <li>Path and step lights</li>
                <li>Garden accent lights</li>
                <li>Fence post caps</li>
                <li>Gate marker lights</li>
              </ul>
            </div>
            <div style={{ backgroundColor: '#7F1D1D', borderRadius: '8px', padding: '14px' }}>
              <div style={{ color: '#FCA5A5', fontWeight: '700', marginBottom: '8px' }}>❌ Wired Required</div>
              <ul style={{ color: '#FCA5A5', fontSize: '13px', paddingLeft: '16px', margin: 0, lineHeight: '1.8' }}>
                <li>Security floodlights</li>
                <li>Patio overhead / ceiling</li>
                <li>Pool / water features</li>
                <li>String lights (entertainment)</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '16px' }}>🔮 Get Your Lighting Plan</h2>
          <div style={{ display: 'grid', gap: '16px' }}>
            <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ backgroundColor: '#1E3A5F', color: '#E2E8F0', border: '1px solid #2D5A8E', borderRadius: '8px', padding: '12px', fontSize: '15px' }}>
              <option value="">Select your home size...</option>
              {homeSizes.map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={goal} onChange={e => setGoal(e.target.value)} style={{ backgroundColor: '#1E3A5F', color: '#E2E8F0', border: '1px solid #2D5A8E', borderRadius: '8px', padding: '12px', fontSize: '15px' }}>
              <option value="">Select your primary goal...</option>
              {primaryGoals.map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: '700', border: 'none', borderRadius: '8px', padding: '14px', fontSize: '16px', cursor: 'pointer' }}>Get My Lighting Plan →</button>
          </div>
        </div>

        {result && (
          <div style={{ backgroundColor: '#0F2040', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ color: '#F5E642', fontSize: '18px', marginBottom: '8px' }}>✅ Your DFW Exterior Lighting Plan</h2>
            <div style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '14px', marginBottom: '16px', display: 'flex', gap: '24px' }}>
              <div><div style={{ color: '#94A3B8', fontSize: '12px' }}>Estimated Low</div><div style={{ color: '#F5E642', fontWeight: '700', fontSize: '20px' }}>{result.cost.low}</div></div>
              <div><div style={{ color: '#94A3B8', fontSize: '12px' }}>Estimated High</div><div style={{ color: '#F5E642', fontWeight: '700', fontSize: '20px' }}>{result.cost.high}</div></div>
            </div>
            <div style={{ display: 'grid', gap: '10px' }}>
              {result.plan.map((item, i) => (
                <div key={i} style={{ backgroundColor: '#1E3A5F', borderRadius: '8px', padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', flexWrap: 'wrap', gap: '6px' }}>
                    <div style={{ color: '#FFFFFF', fontWeight: '600' }}>{item.zone}</div>
                    <div style={{ color: '#F5E642', fontSize: '12px', fontWeight: '600' }}>{item.type}</div>
                  </div>
                  <div style={{ color: '#22C55E', fontSize: '13px', marginBottom: '4px' }}>{item.fixture}</div>
                  <p style={{ color: '#94A3B8', fontSize: '13px', margin: 0 }}>{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
