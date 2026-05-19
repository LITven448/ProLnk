import { useState } from 'react';

export default function DFWCondenserUnitGuide2026() {
  const [symptom, setSymptom] = useState<string | null>(null);

  const components = [
    { icon: '🔵', name: 'Compressor', desc: 'Heart of the system — pumps refrigerant between indoor and outdoor coils; most expensive part ($800–2,000)' },
    { icon: '🌀', name: 'Condenser Coil', desc: 'Aluminum fins that release heat from refrigerant into outdoor air; DFW summer heat makes this coil work harder than anywhere else in the US' },
    { icon: '💨', name: 'Fan Motor', desc: 'Draws air across coil; should run when AC is on — DFW ambient of 105°F+ forces it to run at peak capacity all summer' },
    { icon: '⚡', name: 'Capacitor', desc: 'Stores charge to start compressor and fan motor; fails most often in DFW summer heat ($15–75 part, $150–250 installed)' },
    { icon: '🔘', name: 'Contactor', desc: 'Electromagnetic switch that powers the unit when thermostat calls for cooling; pits corrode in DFW heat ($20–60 part)' },
  ];

  const symptoms: Record<string, { cause: string; urgency: string; action: string; icon: string }> = {
    nostart: { icon: '🚫', cause: 'Bad capacitor or contactor (most common), blown fuse, tripped breaker', urgency: 'Same day', action: 'Check breaker first; call HVAC tech if it trips again — capacitor replacement is quick fix' },
    loudnoise: { icon: '📢', cause: 'Loose fan blade hitting shroud, failing fan motor bearings, or debris in unit', urgency: 'Within 48 hours', action: 'Turn off unit at thermostat; clear debris; call tech — running with bad fan can overheat compressor' },
    icingup: { icon: '🧊', cause: 'Low refrigerant (leak), dirty filter, or restricted airflow — outdoor unit freezing is actually an indoor problem', urgency: 'Same day', action: 'Turn AC off, fan only for 2 hrs to thaw; change filter; if persists = refrigerant leak — call tech' },
    shortcycle: { icon: '🔄', cause: 'Oversized unit, dirty coil, low refrigerant, or failing thermostat', urgency: 'Within 1 week', action: 'Clean condenser coil with hose; check thermostat settings; have tech check refrigerant charge' },
    highbill: { icon: '💰', cause: 'Dirty condenser coil (most common), low refrigerant, aging compressor losing efficiency', urgency: 'Within 2 weeks', action: 'Clean coil ($75–150); if EER dropped 20%+ from install year, replacement ROI often wins' },
    notcooling: { icon: '🌡️', cause: 'Low refrigerant, failed compressor, dirty coil preventing heat rejection', urgency: 'Emergency', action: 'In DFW 105°F heat this is an emergency — call tech immediately; check coil first (garden hose)' },
  };

  const symptomList = [
    { id: 'nostart', label: 'Unit won’t start' },
    { id: 'loudnoise', label: 'Loud noise / rattling' },
    { id: 'icingup', label: 'Ice forming on unit' },
    { id: 'shortcycle', label: 'Cycling on/off frequently' },
    { id: 'highbill', label: 'Electric bill spiked' },
    { id: 'notcooling', label: 'Not cooling the house' },
  ];

  const result = symptom ? symptoms[symptom] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', padding: '32px 24px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>❄️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>DFW AC Condenser Unit Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>The outdoor unit — what's inside, how DFW heat affects it, and how to diagnose problems</p>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 10, padding: 16, marginBottom: 24, borderLeft: '4px solid #F5E642' }}>
          <p style={{ color: '#cbd5e1', margin: 0, fontSize: 14 }}>
            🌡️ DFW context: Your condenser must reject heat in 100–108°F ambient temps — far beyond what units are tested at (95°F AHRI standard). Clearance, shade, and clean coils are critical here.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>What's Inside Your Condenser Unit</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {components.map(c => (
            <div key={c.name} style={{ background: '#1e2d45', borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24 }}>{c.icon}</span>
              <div><div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{c.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{c.desc}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 10, padding: 16, marginBottom: 32 }}>
          <h3 style={{ color: '#F5E642', marginTop: 0, fontSize: 16 }}>DFW Clearance Requirements</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[{l:'Minimum side clearance',v:'18 inches'},{l:'Top clearance',v:'24 inches'},{l:'Shade benefit',v:'5–10% efficiency'},{l:'Mulch/debris distance',v:'12 inches'}].map(r => (
              <div key={r.l} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#64748b', fontSize: 11 }}>{r.l}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{r.v}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>Symptom Diagnosis Tool</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
          {symptomList.map(s => (
            <button key={s.id} onClick={() => setSymptom(s.id === symptom ? null : s.id)}
              style={{ background: symptom === s.id ? '#F5E642' : '#1e2d45', border: '2px solid',
                borderColor: symptom === s.id ? '#F5E642' : '#2d3f5a', borderRadius: 8,
                padding: '12px', cursor: 'pointer', color: symptom === s.id ? '#0A1628' : '#fff',
                fontWeight: 600, fontSize: 13 }}>{s.label}</button>
          ))}
        </div>

        {result && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, marginBottom: 32, borderLeft: '4px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginTop: 0 }}>{result.icon} Diagnosis</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>Likely Cause</div>
                <div style={{ color: '#fff', fontSize: 13 }}>{result.cause}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ color: '#64748b', fontSize: 11, marginBottom: 4 }}>Urgency</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{result.urgency}</div>
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>✅ Next Step: {result.action}</p>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 32 }}>🔗</div>
          <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>ProLnk connects you with DFW HVAC techs for same-day condenser repairs and replacements.</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>Transparent quotes, licensed, EPA 608 certified technicians across the Metroplex.</p>
        </div>
      </div>
    </div>
  );
}
