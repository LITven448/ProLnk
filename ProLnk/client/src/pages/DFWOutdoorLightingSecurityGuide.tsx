import { useState } from 'react';

const PERIMETER_OPTIONS = ['Small (under 50 ft frontage)', 'Medium (50–100 ft frontage)', 'Large (100–200 ft frontage)', 'Corner lot or acreage'];
const DARK_ZONE_OPTIONS = [1, 2, 3, 4, 5, 6];

interface LightingPlan {
  fixtures: number;
  motionFlood: number;
  duskDawn: number;
  pathway: number;
  cost: string;
  notes: string[];
}

function getLightingPlan(perimeter: string, darkZones: number): LightingPlan {
  const base = perimeter.includes('Small') ? 4 : perimeter.includes('Medium') ? 6 : perimeter.includes('Large') ? 9 : 14;
  const total = base + darkZones;
  const motionFlood = Math.ceil(total * 0.5);
  const duskDawn = Math.ceil(total * 0.3);
  const pathway = total - motionFlood - duskDawn;
  const costLow = total * 65;
  const costHigh = total * 140;
  const notes = [
    'Motion-activated flood lights on all entry points: front door, garage, side gates',
    'Dusk-to-dawn LED at driveway entrance and back porch for baseline visibility',
    darkZones > 3 ? 'High dark zone count — consider smart lighting with app control for zone scheduling' : 'Pathway lights for driveways and walkways reduce trip hazards and casual opportunists',
    'Solar fixtures perform 30–40% less in DFW summer heat — hardwired or plug-in preferred for critical zones',
    'Aim flood lights downward at 30° to avoid neighbor light trespass and maximize illumination area',
  ];
  return { fixtures: total, motionFlood, duskDawn, pathway: Math.max(0, pathway), cost: `$${costLow.toLocaleString()}–$${costHigh.toLocaleString()} installed`, notes };
}

export default function DFWOutdoorLightingSecurityGuide() {
  const [perimeter, setPerimeter] = useState('');
  const [darkZones, setDarkZones] = useState(0);
  const [result, setResult] = useState<LightingPlan | null>(null);

  function calculate() {
    if (!perimeter || !darkZones) return;
    setResult(getLightingPlan(perimeter, darkZones));
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#F5E642', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>🏠 DFW HOME SECURITY</div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 1rem', lineHeight: 1.2 }}>DFW Outdoor Security Lighting Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
            Research from the University of Chicago found that well-lit properties experience 39% fewer residential burglaries.
            DFW\'s sprawling lots, mature tree canopy, and long summer nights create more dark zones than most homeowners realize.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {[
            { icon: '💡', title: 'Motion-Activated vs Dusk-to-Dawn', body: 'Motion-activated fixtures startle intruders and alert homeowners — best for entry points and dark corners. Dusk-to-dawn LEDs provide consistent baseline illumination — best for driveways, porches, and gates. Use both in a layered approach.' },
            { icon: '⚡', title: 'Wired vs Solar in DFW', body: 'Solar sounds appealing in sunny Texas — but DFW\’s 100°F+ summers degrade lithium batteries within 2 seasons. Dust from construction-heavy suburbs coats panels and cuts output 25–40%. For security-critical zones, hardwired or plug-in outlets are far more reliable.' },
            { icon: '🔦', title: 'Flood vs Spot vs Pathway', body: 'Flood lights: wide 90–120° beam — ideal for driveways and yards. Spot lights: narrow 15–30° beam — ideal for highlighting entry doors and camera zones. Pathway lights: low-profile ground illumination — reduces opportunistic approach and trip hazards.' },
            { icon: '🔒', title: '39% Burglary Deterrence', body: 'A 2021 study found residential lighting directly reduced burglary rates in tested areas by 39%. Burglars assess entry time, visibility, and escape routes in under 60 seconds. A well-lit perimeter makes properties at the end of that 60 seconds easy to reject.' },
            { icon: '📱', title: 'Smart Lighting Integration', body: 'Smart outdoor bulbs (Kasa, Govee, Philips Hue Outdoor) integrate with Ring, Nest, and SmartThings. Set geo-fencing rules: all lights full brightness when motion detected + no known devices home. Requires 2.4GHz WiFi coverage to exterior.' },
            { icon: '👁️', title: 'Camera + Lighting Pairing', body: 'Security cameras are only as good as their lighting. Pair camera zones with 3000K–4000K LED flood lights (warm white reduces glare on lens). Avoid placing lights directly in front of camera — creates lens flare. Position light source 90° to camera axis.' },
          ].map(card => (
            <div key={card.title} style={{ backgroundColor: '#0f2340', border: '1px solid #1e3a5f', borderRadius: '12px', padding: '1.25rem' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.4rem', fontSize: '0.95rem' }}>{card.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.55 }}>{card.body}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#0f2340', border: '2px solid #F5E642', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.3rem', fontWeight: 800, margin: '0 0 1.5rem' }}>💡 Lighting Plan Generator</h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>PROPERTY PERIMETER</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {PERIMETER_OPTIONS.map(p => (
                <button key={p} onClick={() => { setPerimeter(p); setResult(null); }} style={{ padding: '0.45rem 1rem', borderRadius: '20px', border: '1.5px solid', borderColor: perimeter === p ? '#F5E642′ : '#1e3a5f', backgroundColor: perimeter === p ? '#F5E642' : ’transparent', color: perimeter === p ? '#0A1628′ : '#94a3b8', fontWeight: 600, fontSize: '0.82rem', cursor: ’pointer' }}>{p}</button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>NUMBER OF DARK ZONES (areas with no light coverage)</div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {DARK_ZONE_OPTIONS.map(n => (
                <button key={n} onClick={() => { setDarkZones(n); setResult(null); }} style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1.5px solid', borderColor: darkZones === n ? '#F5E642′ : '#1e3a5f', backgroundColor: darkZones === n ? '#F5E642' : ’transparent', color: darkZones === n ? '#0A1628′ : '#94a3b8', fontWeight: 700, cursor: ’pointer' }}>{n}</button>
              ))}
            </div>
          </div>

          <button onClick={calculate} style={{ backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: '1rem', padding: '0.75rem 2rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Generate Lighting Plan →</button>

          {result && (
            <div style={{ marginTop: '1.5rem', backgroundColor: '#0A1628', borderRadius: '10px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.75rem' }}>✅ Your Lighting Plan</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                {[['Total Fixtures', result.fixtures], ['Motion Flood', result.motionFlood], ['Dusk-to-Dawn', result.duskDawn], ['Pathway', result.pathway]].map(([label, val]) => (
                  <div key={label as string} style={{ backgroundColor: '#0f2340', borderRadius: '8px', padding: '0.6rem', textAlign: 'center' }}>
                    <div style={{ color: '#94a3b8', fontSize: '0.72rem', marginBottom: '0.2rem' }}>{label}</div>
                    <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '1.2rem' }}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>Est. Installed Cost: {result.cost}</div>
              {result.notes.map((n, i) => <div key={i} style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.35rem' }}>• {n}</div>)}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#0f2340', borderRadius: '12px', padding: '1.25rem', border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>🔗 Get a DFW Outdoor Lighting Quote</div>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.55, margin: 0 }}>ProLnk connects DFW homeowners with licensed electricians specializing in security lighting. Hardwired motion and dusk-to-dawn systems, properly permitted. Free estimates.</p>
        </div>

      </div>
    </div>
  );
}
