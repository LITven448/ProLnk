import { useState } from 'react';

const symptoms = [
  { id: 'nospin', label: 'Air blows weakly or not at all', diagnosis: 'Blower motor may have failed or capacitor is bad. Capacitor failure is the #1 blower motor problem in DFW — heat degrades capacitors fast. A capacitor replacement ($150-250) often restores full function. If motor still does not run after capacitor replacement, motor replacement needed ($400-700).' },
  { id: 'overheat', label: 'Blower runs then shuts off mid-cycle', diagnosis: 'Thermal overload protection triggering — motor overheating and shutting itself down. Most common cause in DFW: dirty air filter restricting airflow. Replace filter immediately. If problem persists with new filter, motor bearings may be failing — motor replacement needed.' },
  { id: 'noise', label: 'Squealing or grinding from air handler', diagnosis: 'Squealing = dry or failing motor bearings. Grinding = debris inside blower wheel or bearing failure. Some motors can be oiled to extend life. Most modern motors are sealed and must be replaced when bearings fail. Do not ignore — seized motor can trip breaker or burn out.' },
  { id: 'speeds', label: 'System runs but airflow seems reduced', diagnosis: 'Single-speed motor running at wrong speed or multi-speed motor stuck on low. Also check: blower wheel caked with dust (common after years of thin filters). Blower wheel cleaning ($100-150) often restores full airflow without any motor work.' },
  { id: 'replace', label: 'Motor replacement — is it worth it?', diagnosis: 'Rule of thumb: if your system is under 10 years old, replace the motor ($400-700). If 10-15 years old and single-speed, consider whether upgrading to a variable-speed system is more cost-effective long-term. Variable-speed motors cut fan energy use 60-80% and dehumidify better in DFW.' },
];

export default function DFWBlowerMotorGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = symptoms.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>💨 Blower Motor Guide</h1>
        <p style={{ color: '#9BA3B4', fontSize: 15, marginBottom: 28 }}>
          The blower motor moves conditioned air through your DFW home. In 100°F+ attic conditions, it works harder than any other component — and dirty filters are its biggest enemy.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '⚡', title: 'Single vs Variable Speed', body: 'Single-speed: on or off, full blast every cycle. Multi-speed: 2-3 preset speeds. Variable-speed (ECM motor): ramps up/down continuously, uses 60-80% less energy, dehumidifies far better for DFW summers. Variable-speed adds $300-500 to motor cost but pays back in 2-3 years on DFW energy bills.' },
            { icon: '🔥', title: 'Dirty Filter = Motor Killer', body: 'A clogged filter forces the blower motor to work against resistance. Motor temperature rises, thermal overload trips, and over time windings burn out. In DFW, replace filters every 30-45 days during summer — not every 90. This single habit is the #1 blower motor life extender.' },
            { icon: '🔋', title: 'Capacitor Failure', body: 'The run capacitor gives the blower motor the electrical boost to start and maintain speed. DFW heat degrades capacitors 2-3x faster than moderate climates. Symptoms: motor hums but does not spin, or spins slowly. Capacitor replacement ($150-250) is a common, inexpensive fix that restores full motor function.' },
            { icon: '💰', title: 'Motor vs System Replacement', body: 'Motor replacement costs $400-700 including labor. If your system is 12+ years old and needs a motor, get a full system quote too. A new 16-SEER system with variable-speed blower may pencil out better than a $600 repair on aging equipment — especially given DFW energy costs.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0F2040', borderRadius: 10, padding: '18px 20px', borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{card.icon} <span style={{ fontSize: 16, fontWeight: 700, color: '#F5E642' }}>{card.title}</span></div>
              <p style={{ color: '#B0B8CC', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔍 Blower Symptom Diagnosis</h2>
          <p style={{ color: '#9BA3B4', fontSize: 14, marginBottom: 16 }}>Select your symptom for a blower motor diagnosis:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
            {symptoms.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#F5E642' : '#162035', color: selected === s.id ? '#0A1628' : '#E8EAF0', border: 'none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#162035', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642' }}>
              <p style={{ color: '#E8EAF0', fontSize: 14, margin: 0, lineHeight: 1.7 }}>{result.diagnosis}</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: 28, background: '#F5E642', borderRadius: 10, padding: '18px 22px', textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0A1628', marginBottom: 4 }}>🏠 Get a DFW Blower Motor Quote</div>
          <div style={{ fontSize: 13, color: '#1A2A4A' }}>ProLnk connects you with vetted DFW HVAC pros — free, no commitment.</div>
        </div>
      </div>
    </div>
  );
}