import { useState } from 'react';

export default function DFWHVACEmergencyGuide2026() {
  const [symptoms, setSymptoms] = useState<string[]>([]);

  const toggleSymptom = (s: string) => setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const getUrgency = () => {
    if (symptoms.includes('nopower') || symptoms.includes('burning')) return { level: 'CRITICAL', color: '#ef4444', action: 'Call now — do not wait. Turn off system at breaker.', emoji: '🚨' };
    if (symptoms.includes('notcooling') && symptoms.includes('over90')) return { level: 'URGENT', color: '#f97316', action: 'Same-day service needed. Call ProLnk for emergency dispatch — DFW heat is dangerous.', emoji: '⚠️' };
    if (symptoms.includes('notcooling')) return { level: 'TODAY', color: '#eab308', action: 'Schedule today — typical DFW diagnostic runs $150-300 for emergency calls.', emoji: '📞' };
    if (symptoms.length > 0) return { level: 'MONITOR', color: '#22c55e', action: 'Check filters, thermostat batteries, and breaker. If symptoms persist, schedule a non-emergency visit.', emoji: '👀' };
    return null;
  };

  const urgency = getUrgency();

  const steps = [
    { n: '1', title: 'Check thermostat', detail: 'Set to COOL, 5° below room temp. Replace batteries.' },
    { n: '2', title: 'Check breaker', detail: 'Look for tripped breaker. Reset once — if it trips again, call a tech.' },
    { n: '3', title: 'Check filter', detail: 'Clogged filters cause 40% of summer AC failures. Replace if dirty.' },
    { n: '4', title: 'Check outdoor unit', detail: 'Clear debris, check for ice, ensure 2ft clearance around unit.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>PROLNK HVAC GUIDE · DFW · 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🚨 DFW HVAC Emergency Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>AC failed in DFW summer? Here's exactly what to do — in order.</p>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>🔍 Do These First (Before Calling Anyone)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {steps.map(s => (
              <div key={s.n} style={{ display: 'flex', gap: 14, background: '#0d2240', borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 800, width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 13 }}>{s.n}</div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 2, fontSize: 14 }}>{s.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>{s.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💰 Emergency Service Rates in DFW</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[{ l: 'Diagnostic Fee', v: '$150–300' }, { l: 'After-Hours', v: '+$75–150' }, { l: 'Weekend Rate', v: '+$100–200' }].map(i => (
              <div key={i.l} style={{ background: '#0d2240', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 11, marginBottom: 4 }}>{i.l}</div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 16 }}>{i.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>⚡ What are you experiencing?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
            {[
              { v: 'notcooling', l: 'Not cooling' },
              { v: 'nopower', l: 'No power at all' },
              { v: 'burning', l: 'Burning smell' },
              { v: 'over90', l: 'House over 90°F' },
              { v: 'noise', l: 'Strange noises' },
              { v: 'leak', l: 'Water leak' },
            ].map(s => (
              <button key={s.v} onClick={() => toggleSymptom(s.v)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 700, background: symptoms.includes(s.v) ? '#F5E642' : '#1e3a5f', color: symptoms.includes(s.v) ? '#0A1628' : '#fff' }}>{s.l}</button>
            ))}
          </div>
          {urgency && (
            <div style={{ background: '#0d2240', borderRadius: 8, padding: 16, borderLeft: `4px solid ${urgency.color}` }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6, color: urgency.color }}>{urgency.emoji} {urgency.level}</div>
              <p style={{ color: '#94a3b8', fontSize: 14 }}>{urgency.action}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#111f3a', borderRadius: 12, padding: 16, marginBottom: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ fontSize: 28 }}>❄️</div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 2 }}>Portable AC Rental as Backup</div>
            <div style={{ color: '#94a3b8', fontSize: 13 }}>Home Depot and local rental shops offer portable units for $40-80/day in DFW. Useful while awaiting repair parts.</div>
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>ProLnk dispatches licensed DFW techs fast</div>
          <div style={{ color: '#1a2f4e', fontSize: 13 }}>Emergency or scheduled — we connect you with available, vetted HVAC contractors in your area.</div>
        </div>
      </div>
    </div>
  );
}
