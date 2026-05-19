import { useState } from 'react';

export default function DFWFurnaceGuide2026() {
  const [age, setAge] = useState('');
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    const a = parseInt(age);
    if (!age || !symptom) { setResult('Please fill in all fields.'); return; }
    if (a > 20) { setResult('🔴 Replace now — furnaces over 20 years carry cracked heat exchanger risk and efficiency below 60% AFUE. Budget $3,500–$6,000 for 96% AFUE replacement.'); return; }
    if (a > 15 && symptom !== 'none') { setResult('🟡 Plan replacement within 2 years. At 15+ years with symptoms, repair costs rarely make sense. Get a second opinion before spending on parts.'); return; }
    if (symptom === 'yellow-flame') { setResult('🔴 SAFETY: Yellow flame = possible cracked heat exchanger leaking CO. Turn off furnace immediately, call HVAC tech today. Carbon monoxide risk is serious.'); return; }
    if (symptom === 'short-cycle') { setResult('🟡 Short cycling usually means dirty filter, bad flame sensor, or oversized unit. Start with filter replacement ($10–$30). If it continues, call a tech — $80–$150 service call.'); return; }
    if (symptom === 'no-heat') { setResult('🟡 No heat: check thermostat, filter, and breaker first. If those check out, likely ignitor failure ($150–$300 repair) — common in DFW furnaces that sit idle all summer.'); return; }
    setResult('✅ Your furnace looks healthy for DFW use. Replace filter every 60–90 days, schedule annual tune-up ($80–$120) before November.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🔥</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0' }}>DFW Gas Furnace Guide 2026</h1>
          <p style={{ color: '#a0aec0', fontSize: '1rem' }}>Dallas-Fort Worth homeowners: what you need to know before this heating season</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '⚡', title: '96% AFUE High-Efficiency', desc: 'Two-stage or modulating burner. Best for larger DFW homes (2,000+ sqft). Payback: 8–12 years given DFW mild winters. Variable speed blower improves comfort and air quality.' },
            { icon: '🏠', title: '80% AFUE Standard', desc: 'Minimum code for DFW Climate Zone 2. Lower upfront cost ($1,500–$2,500 less). For small homes or short stays, the math may favor 80% over 96%.' },
            { icon: '⚠️', title: 'Heat Exchanger Cracking', desc: 'Most serious furnace failure. Cracked exchanger leaks carbon monoxide into living space. Symptoms: yellow flame, soot, CO detector alarms. Furnaces 15+ years old — inspect annually.' },
            { icon: '❄️', title: 'DFW Heating Usage Reality', desc: 'DFW averages only 10–12 true heating days per season. Your furnace sits idle June–October. This means ignitors, flame sensors, and capacitors fail from disuse — not overwork.' },
          ].map((card, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{card.icon}</div>
              <h3 style={{ color: '#F5E642', margin: '0 0 0.5rem' }}>{card.title}</h3>
              <p style={{ color: '#a0aec0', margin: 0, fontSize: '0.875rem', lineHeight: 1.5 }}>{card.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔧 Furnace Assessment Tool</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#a0aec0', fontSize: '0.875rem' }}>Furnace Age (years)</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 12"
                style={{ display: 'block', width: '100%', marginTop: 4, padding: '0.5rem', borderRadius: 6, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff' }} />
            </div>
            <div>
              <label style={{ color: '#a0aec0', fontSize: '0.875rem' }}>Current Symptom</label>
              <select value={symptom} onChange={e => setSymptom(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: 4, padding: '0.5rem', borderRadius: 6, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff' }}>
                <option value=''>Select symptom</option>
                <option value='none'>No issues</option>
                <option value='yellow-flame'>Yellow/orange flame</option>
                <option value='short-cycle'>Short cycling (turns on/off quickly)</option>
                <option value='no-heat'>Not producing heat</option>
                <option value='loud-noise'>Loud banging or rattling</option>
              </select>
            </div>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', padding: '0.75rem 2rem', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
            Get Assessment
          </button>
          {result && <div style={{ marginTop: '1rem', padding: '1rem', background: '#0A1628', borderRadius: 8, color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ marginTop: '1.5rem', background: '#112240', borderRadius: 12, padding: '1.25rem', border: '1px solid #1e3a5f' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>💰 DFW Furnace Cost Benchmarks 2026</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            {[['Annual Tune-Up', '$80–$120'], ['Ignitor Replacement', '$150–$300'], ['Flame Sensor Clean', '$80–$150'], ['80% AFUE Install', '$2,500–$4,000'], ['96% AFUE Install', '$4,000–$7,000'], ['Heat Exchanger Replace', 'Replace unit — not worth it']].map(([label, val], i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ color: '#a0aec0', fontSize: '0.75rem' }}>{label}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4, fontSize: '0.875rem' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
