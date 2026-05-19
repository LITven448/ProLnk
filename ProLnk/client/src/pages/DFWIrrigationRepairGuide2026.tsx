import { useState } from 'react';

export default function DFWIrrigationRepairGuide2026() {
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState('');

  const diagnoses: Record<string, { diagnosis: string; fix: string; diy: boolean; cost: string }> = {
    'head': { diagnosis: 'Sprinkler head not popping up', fix: 'Dirt in housing or freeze crack. Replace head ($5–$15 each). Flush line before reinstalling.', diy: true, cost: '$15–$60 DIY' },
    'zone': { diagnosis: 'Zone not turning on', fix: 'Zone valve solenoid likely failed. Test with multimeter (24V). Replace solenoid ($10–$30) or full valve ($30–$80).', diy: false, cost: '$80–$200 irrigator' },
    'controller': { diagnosis: 'Controller lost programming', fix: 'Power surge or battery failure. Reset and reprogram. Consider upgrading to smart controller ($100–$250).', diy: true, cost: '$0–$250′ },
    'leak': { diagnosis: 'Main line break or wet spot', fix: 'Dig at wet spot, cut and splice line. Use compression fittings for poly pipe. Mark heads before pressure testing.', diy: false, cost: '$150–$500 irrigator' },
    'clog': { diagnosis: 'Sprinkler head clogged (hard water)', fix: 'DFW hard water = calcium buildup. Soak head in vinegar 30 min or replace. Install filter at backflow if recurring.', diy: true, cost: '$5–$20 DIY' },
  };

  function diagnose() {
    const key = Object.keys(diagnoses).find(k => symptom.toLowerCase().includes(k));
    if (!key) { setResult('Describe your symptom: head, zone, controller, leak, or clog.'); return; }
    const d = diagnoses[key];
    setResult(`Diagnosis: ${d.diagnosis}. Fix: ${d.fix} Cost: ${d.cost}. ${d.diy ? '✅ DIY-friendly.' : '⚠️ Recommend licensed irrigator.'}` );
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🔧</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Irrigation Repair Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Diagnose and fix common DFW irrigation problems — from freeze-damaged heads to hard water clogs.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '🥶', label: '#1 Cause in DFW', value: 'Freeze damage' },
            { icon: '💧', label: 'Hard Water Issue', value: 'Head clogs' },
            { icon: '⚡', label: 'Zone Valve Failure', value: 'Replace solenoid' },
            { icon: '📋', label: 'TX License Required', value: 'Irrigator (TCEQ)' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#1e293b', borderRadius: 12, padding: '16px', border: '1px solid #334155′ }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 20, border: '1px solid #334155′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🛠️ Common DFW Irrigation Problems</h2>
          {[
            { problem: 'Head pop-up failure', cause: 'Freeze crack or dirt in housing', diy: '✅ DIY' },
            { problem: 'Zone valve failure', cause: 'Solenoid burnout (age/surge)', diy: '⚠️ Irrigator' },
            { problem: 'Controller programming loss', cause: 'Power surge or battery failure', diy: '✅ DIY' },
            { problem: 'Main line break', cause: 'Ground shift or freeze', diy: '⚠️ Irrigator' },
            { problem: 'Clogged heads', cause: 'DFW hard water calcium buildup', diy: '✅ DIY' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 4 ? '1px solid #334155′ : ’none' }}>
              <div><div style={{ fontWeight: 600 }}>{r.problem}</div><div style={{ color: '#94a3b8', fontSize: 13 }}>{r.cause}</div></div>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', paddingLeft: 8 }}>{r.diy}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, border: '1px solid #334155′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🧮 Symptom Diagnosis Tool</h2>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Describe your problem (head, zone, controller, leak, clog):</p>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
            <input value={symptom} onChange={e => setSymptom(e.target.value)} placeholder="e.g. my zone won't turn on" style={{ flex: 1, minWidth: 200, padding: '10px', borderRadius: 8, border: '1px solid #475569', background: '#0f172a', color: '#fff' }} />
            <button onClick={diagnose} style={{ padding: '10px 20px', background: '#F5E642', color: '#0A1628', fontWeight: 700, borderRadius: 8, border: 'none', cursor: 'pointer' }}>Diagnose</button>
          </div>
          {result && <div style={{ background: '#0f172a', borderRadius: 8, padding: 14, color: '#F5E642', fontSize: 14 }}>{result}</div>}
        </div>
        <p style={{ color: '#475569', fontSize: 12, marginTop: 20, textAlign: 'center' }}>TX law requires a licensed irrigator for any irrigation system work beyond simple head replacement.</p>
      </div>
    </div>
  );
}
