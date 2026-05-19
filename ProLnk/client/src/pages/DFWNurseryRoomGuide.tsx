import { useState } from 'react';

type RoomSize = 'Small (under 120 sq ft)' | 'Medium (120–200 sq ft)' | 'Large (200+ sq ft)';
type HVACSetup = 'Central AC only (no zone control)' | 'Zoned HVAC system' | 'Mini-split available' | 'Window unit only';

function getNurserySolution(roomSize: RoomSize, hvac: HVACSetup) {
  const steps: string[] = [];
  let costLow = 0;
  let costHigh = 0;

  steps.push('🎨 Use zero-VOC paint (Benjamin Moore Natura, Sherwin-Williams Harmony) — standard paint off-gasses for 60–90 days');
  steps.push('🌬️ Air purifier with True HEPA + activated carbon filter — run 24/7 for first 3 months');

  if (hvac === 'Central AC only (no zone control)') {
    steps.push('🌡️ Dedicated smart thermostat for nursery zone — install programmable outlet or in-room sensor ($80–$200)');
    steps.push('❄️ Portable smart AC unit (DFW summers: rooms far from air handler can hit 78°F+) — $350–$650');
    costLow += 500; costHigh += 900;
  } else if (hvac === 'Zoned HVAC system') {
    steps.push('🌡️ Set nursery zone to 68–72°F independently — ideal for infant sleep');
    steps.push('📱 Smart vent + room sensor for precise nursery temperature control ($120–$220)');
    costLow += 150; costHigh += 300;
  } else if (hvac === 'Mini-split available') {
    steps.push('✅ Mini-split is ideal — silent, precise, no ductwork contamination risk');
    steps.push('🌡️ Set to 70°F with low fan speed (quieter airflow for sleeping infant)');
    costLow += 100; costHigh += 200;
  } else {
    steps.push('⚠️ Window unit concern: condensate can breed mold — clean monthly and replace filter quarterly');
    steps.push('❄️ Upgrade to portable AC with internal drainage tank — safer for nursery ($400–$700)');
    costLow += 450; costHigh += 800;
  }

  steps.push('🪟 Blackout curtains (DFW sun: room can be bright until 9 PM in summer) — $60–$150');
  steps.push('🔇 White noise machine — masks DFW HVAC cycling sounds and neighborhood noise');

  if (roomSize === 'Large (200+ sq ft)') {
    steps.push('📐 Divide room into sleep zone (darkest corner, farthest from door) + play zone');
    steps.push('💡 Separate lighting circuits: warm dimmer for feeding corner, bright overhead for play area');
    costLow += 300; costHigh += 600;
  } else if (roomSize === 'Small (under 120 sq ft)') {
    steps.push('🗂️ Vertical storage only — wall-mounted shelves above crib reach keep floor clear for movement');
  }

  steps.push('🔌 Tamper-resistant outlets (required in new DFW construction, retrofit older homes): $5–$10 per outlet');
  steps.push('🛡️ Secure all furniture to studs — IKEA and Pottery Barn recall risk items first');

  costLow += 600; costHigh += 1800;

  return { steps, costLow, costHigh };
}

export default function DFWNurseryRoomGuide() {
  const [roomSize, setRoomSize] = useState<RoomSize | ''>('');
  const [hvac, setHVAC] = useState<HVACSetup | ''>('');
  const [showResults, setShowResults] = useState(false);

  const ready = roomSize && hvac;
  const result = ready ? getNurserySolution(roomSize as RoomSize, hvac as HVACSetup) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', borderBottom: '3px solid #F5E642′ }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🍼</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Nursery Room Preparation Guide</h1>
          <p style={{ fontSize: 18, color: '#A8B8D0', maxWidth: 640 }}>
            Preparing a safe, comfortable nursery in DFW's climate requires extra attention to air quality, temperature control, and light management. Here’s everything new DFW parents need to know.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#1a0a0a', border: '2px solid #E53E3E', borderRadius: 12, padding: 20, margin: '32px 0', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
          <span style={{ fontSize: 24, flexShrink: 0 }}>⚠️</span>
          <div>
            <p style={{ color: '#FC8181', fontWeight: 700, margin: '0 0 4px', fontSize: 15 }}>Critical Safety Note: VOC-Free Paint</p>
            <p style={{ color: '#C8A8A8', fontSize: 14, margin: 0, lineHeight: 1.6 }}>Standard paint contains volatile organic compounds that off-gas for 60–90 days. For a nursery, use only zero-VOC certified paint and ensure 7+ days of ventilation before bringing baby home. In DFW summers, open windows in the morning only — afternoon heat raises indoor VOC concentration.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '🌡️', title: 'DFW Temperature Challenge', body: 'Ideal nursery temperature is 68–72°F. DFW summers make this nearly impossible without a dedicated cooling solution. Rooms far from the main air handler — common in DFW ranch homes — can run 5–8°F warmer. A portable AC or mini-split is often essential.' },
            { icon: '🌬️', title: 'Air Quality Standards', body: 'Newborns breathe 3× faster than adults, making air quality critical. Run a True HEPA + activated carbon purifier 24/7 for the first 3 months. Replace filters every 90 days. Avoid scented plug-ins and aerosol sprays entirely in the nursery.' },
            { icon: '☀️', title: 'DFW Summer Light Management', body: 'DFW daylight extends past 8:30 PM in June–July. Without blackout curtains, DFW parents report infants not sleeping until 10 PM. Install curtains with side channels to eliminate light bleed — standard blackout curtains let in significant edge light.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#112240', border: '1px solid #1E3A5F', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, margin: '0 0 8px' }}>{card.title}</h3>
              <p style={{ color: '#A8B8D0', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, border: '2px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, margin: '0 0 6px' }}>🧮 Nursery Setup Estimator</h2>
          <p style={{ color: '#A8B8D0', fontSize: 14, margin: '0 0 24px' }}>Get a temperature control solution and complete setup cost based on your DFW home</p>

          <div style={{ marginBottom: 20 }}>
            <p style={{ color: '#E8EDF5', fontWeight: 600, marginBottom: 10 }}>Nursery Room Size</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {(['Small (under 120 sq ft)', 'Medium (120–200 sq ft)', 'Large (200+ sq ft)'] as RoomSize[]).map(opt => (
                <button key={opt} onClick={() => { setRoomSize(opt); setShowResults(false); }}
                  style={{ padding: '8px 16px', borderRadius: 8, border: `2px solid ${roomSize === opt ? '#F5E642' : '#1E3A5F'}`, background: roomSize === opt ? '#F5E642′ : '#0D1B33', color: roomSize === opt ? '#0A1628' : '#E8EDF5', fontWeight: 600, cursor: ’pointer', fontSize: 13 }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <p style={{ color: '#E8EDF5', fontWeight: 600, marginBottom: 10 }}>Current HVAC Setup</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {(['Central AC only (no zone control)', 'Zoned HVAC system', 'Mini-split available', 'Window unit only'] as HVACSetup[]).map(opt => (
                <button key={opt} onClick={() => { setHVAC(opt); setShowResults(false); }}
                  style={{ padding: '8px 16px', borderRadius: 8, border: `2px solid ${hvac === opt ? '#F5E642' : '#1E3A5F'}`, background: hvac === opt ? '#F5E642′ : '#0D1B33', color: hvac === opt ? '#0A1628' : '#E8EDF5', fontWeight: 600, cursor: ’pointer', fontSize: 13 }}>
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <button onClick={() => setShowResults(true)} disabled={!ready}
            style={{ padding: '12px 32px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: ready ? 'pointer' : 'not-allowed', opacity: ready ? 1 : 0.5 }}>
            Generate Setup Plan →
          </button>

          {showResults && result && (
            <div style={{ marginTop: 28, background: '#0A1628', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 6px', fontSize: 20 }}>Complete Nursery Setup Plan</h3>
              <p style={{ fontSize: 28, fontWeight: 800, color: '#E8EDF5', margin: '0 0 16px' }}>Total Investment: ${result.costLow.toLocaleString()} – ${result.costHigh.toLocaleString()}</p>
              <ol style={{ margin: 0, paddingLeft: 22 }}>
                {result.steps.map(s => <li key={s} style={{ color: '#C8D8E8', fontSize: 14, marginBottom: 10, lineHeight: 1.6 }}>{s}</li>)}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
