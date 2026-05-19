import { useState } from 'react';

export default function DFWHVACDehumidStrategy2026() {
  const [complaint, setComplaint] = useState('');
  const [strategy, setStrategy] = useState<string | null>(null);

  const complaints = [
    'House feels muggy even at 72°F',
    'Condensation on windows',
    'Musty smell in rooms',
    'Humidity over 60% indoors',
    'AC runs but never feels comfortable',
  ];

  const strategies: Record<string, { title: string; steps: string[]; note: string }> = {
    'House feels muggy even at 72°F': {
      title: 'Fan Mode Fix',
      steps: [
        '💨 Switch fan from ON → AUTO immediately',
        '🌡️ Lower setpoint 2°F to extend run cycles',
        '📊 Check supply/return static pressure balance',
        '🔧 Variable speed system: set fan to 40% on low stage',
      ],
      note: 'Fan ON recirculates humid air off wet coil — Auto mode is critical in DFW.',
    },
    'Condensation on windows': {
      title: 'Window Condensation Protocol',
      steps: [
        '🌡️ Lower indoor humidity target to 45%',
        '🔍 Check for fresh air intake over-introduction',
        '🪟 Inspect window seals for failure',
        '💧 Consider whole-home dehumidifier if persists',
      ],
      note: 'DFW dew points 70°F+ in summer — window condensation is common without dehumidification.',
    },
    'Musty smell in rooms': {
      title: 'Musty Air Root Cause Plan',
      steps: [
        '🔬 Inspect evaporator coil for mold/slime buildup',
        '🧹 Clean drain pan and condensate line',
        '💨 Run fan on Auto only — never ON continuous',
        '🏠 Add standalone dehumidifier to problem rooms',
      ],
      note: 'Musty smell = active microbial growth from excess moisture. Address immediately.',
    },
    'Humidity over 60% indoors': {
      title: 'High Humidity Emergency Plan',
      steps: [
        '📉 Target indoor RH: 45–55% year-round in DFW',
        '🔧 Install whole-home dehumidifier in air handler',
        '🌡️ Drop thermostat 1°F to force longer AC cycles',
        '🚪 Seal crawl space or attic air leaks if any',
      ],
      note: 'DFW averages 65–75% outdoor RH June–Sept. Infiltration is major moisture source.',
    },
    'AC runs but never feels comfortable': {
      title: 'Comfort Optimization Strategy',
      steps: [
        '⚡ Check system sizing — oversized = short cycles = humid',
        '💨 Variable speed install is top DFW dehumid upgrade',
        '📐 Manual J load calc to confirm proper sizing',
        '💧 Standalone dehumidifier bridges the gap until replacement',
      ],
      note: 'Oversized AC is the #1 DFW comfort complaint. Short cycles never remove enough humidity.',
    },
  };

  function handleAnalyze() {
    if (complaint) setStrategy(complaint);
  }

  const result = strategy ? strategies[strategy] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>💧</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW HVAC Dehumidification Strategy Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Beat DFW humidity with the right HVAC strategy for your situation</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🌡️ What's your humidity complaint?</h2>
          <select
            value={complaint}
            onChange={e => { setComplaint(e.target.value); setStrategy(null); }}
            style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #F5E642', borderRadius: 8, padding: '10px 12px', fontSize: 14, marginBottom: 16 }}
          >
            <option value="">-- Select your complaint --</option>
            {complaints.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <button
            onClick={handleAnalyze}
            disabled={!complaint}
            style={{ background: complaint ? '#F5E642' : '#334155', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: complaint ? 'pointer' : 'default' }}
          >
            Get My Dehumidification Strategy →
          </button>
        </div>

        {result && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>✅ {result.title}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
              {result.steps.map((s, i) => (
                <li key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', marginBottom: 8, fontSize: 14 }}>{s}</li>
              ))}
            </ul>
            <div style={{ background: '#0f2040', borderLeft: '3px solid #F5E642', padding: '12px 16px', borderRadius: 4, fontSize: 13, color: '#94a3b8' }}>
              💡 {result.note}
            </div>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20 }}>
          <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 12 }}>🏆 DFW Dehumidification Hierarchy</h3>
          {['1. Fan AUTO (not ON) — free, immediate, critical', '2. Lower setpoint 1-2°F — extends run time', '3. Variable speed system — best long-term solution', '4. Whole-home dehumidifier — for severe cases', '5. Standalone dehumidifier — targeted room fix'].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < 4 ? '1px solid #334155' : 'none', fontSize: 13, color: '#cbd5e1' }}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
