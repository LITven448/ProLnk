import { useState } from 'react';

export default function DFWSummerThermostatGuide() {
  const [sqft, setSqft] = useState('');
  const [preference, setPreference] = useState('');
  const [smart, setSmart] = useState('');
  const [result, setResult] = useState<null | { schedule: { label: string; temp: string; note: string }[]; savings: string; warning: string }>(null);

  function generate() {
    const s = parseInt(sqft, 10);
    if (!s || !preference || !smart) return;
    const base = preference === 'cool' ? 76 : preference === 'moderate' ? 78 : 80;
    const away = Math.min(base + 4, 82);
    const schedule = [
      { label: '🌙 Night (10pm–6am)', temp: `${base - 1}°F`, note: 'Slightly cooler for sleep comfort in DFW humidity' },
      { label: '🌅 Morning (6am–8am)', temp: `${base}°F`, note: 'Begin pre-cooling before outdoor temps climb' },
      { label: '☀️ Away (8am–5pm)', temp: `${away}°F`, note: `Never above 82°F in DFW — above that, humidity becomes a mold risk` },
      { label: '🏠 Evening (5pm–10pm)', temp: `${base}°F`, note: 'Return to comfort setpoint as family arrives home' },
    ];
    const savingsPct = smart === 'yes' ? '18–26%' : '8–14%';
    const savings = `Estimated annual savings vs. constant setpoint: ${savingsPct} on cooling costs`;
    const warning = away > 82
      ? '⚠️ DFW Warning: Setting above 82°F while away creates humidity problems. DFW relative humidity can cause moisture accumulation in walls and furniture within 24–48 hours.'
      : '✅ Your away setting is within the safe DFW humidity range.';
    setResult({ schedule, savings, warning });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HVAC GUIDES</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Summer Thermostat Settings Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW summers are long and brutal — May through October with temperatures regularly above 100°F.
          The right thermostat strategy can cut cooling costs by 15–25% while keeping your home comfortable
          and avoiding DFW's hidden threat: humidity-related moisture damage when settings go too high.
        </p>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🌡️ The DFW Thermostat Rules</h2>
          {[
            ['The 78°F myth', '78°F is often cited as the optimal summer setting, but DFW\’s humidity makes 78°F feel like 84°F to many people. Your comfort preference and home insulation quality matter more than any single number.'],
            ['The 82°F ceiling', 'Never set your DFW thermostat above 82°F while away. Above this threshold, relative humidity inside your home can climb high enough to promote mold growth in walls, under furniture, and in closets within 24–48 hours.'],
            ['Smart thermostat advantage', 'In DFW, smart thermostats earn their keep by pre-cooling your home before peak grid hours (3–7pm) when electricity rates are highest with time-of-use plans. They also learn your patterns faster than national averages due to the extreme and consistent summer cycle.'],
          ].map(([title, desc]) => (
            <div key={title as string} style={{ marginBottom: 14 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🔍 Get Your DFW Thermostat Schedule</h2>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8' }}>Home Size (sq ft)</label>
          <input type="number" value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 2400"
            style={{ background: '#1a2f4a', border: '1px solid #2a4060', borderRadius: 8, color: '#fff', padding: '10px 14px', width: '100%', marginBottom: 16, fontSize: 15, boxSizing: 'border-box' }} />
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8' }}>Comfort Preference</label>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            {[['cool', '❄️ Run cool'], ['moderate', '🌡️ Moderate'], ['warm', '☀️ Save money, run warmer']].map(([v, l]) => (
              <button key={v} onClick={() => setPreference(v)}
                style={{ flex: 1, background: preference === v ? '#F5E642' : '#1a2f4a', color: preference === v ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 6px', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                {l}
              </button>
            ))}
          </div>
          <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8' }}>Smart Thermostat?</label>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            {[['yes', '✅ Yes (Nest, Ecobee, etc.)'], ['no', '❌ Standard Programmable']].map(([v, l]) => (
              <button key={v} onClick={() => setSmart(v)}
                style={{ flex: 1, background: smart === v ? '#F5E642' : '#1a2f4a', color: smart === v ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                {l}
              </button>
            ))}
          </div>
          <button onClick={generate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}>
            Generate My DFW Schedule →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 16 }}>📅 Your Recommended DFW Schedule</div>
            {result.schedule.map((s, i) => (
              <div key={i} style={{ marginBottom: 12, borderBottom: '1px solid #1a2f4a', paddingBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600 }}>{s.label}</span>
                  <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 18 }}>{s.temp}</span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{s.note}</div>
              </div>
            ))}
            <div style={{ color: '#4ade80', fontWeight: 600, marginBottom: 8 }}>💰 {result.savings}</div>
            <div style={{ fontSize: 14, lineHeight: 1.6 }}>{result.warning}</div>
          </div>
        )}
      </div>
    </div>
  );
}
