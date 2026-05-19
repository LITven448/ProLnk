import { useState } from 'react';

const symptoms = [
  { id: 'freeze', label: 'Ice on indoor unit or lines', diagnosis: 'Coil freeze-up detected. Causes: dirty coil reducing airflow, low refrigerant, or blocked filter. Turn system to FAN ONLY for 2 hours to thaw. Do not run AC until resolved — ice damage to compressor is expensive.' },
  { id: 'mold', label: 'Musty or moldy smell from vents', diagnosis: 'Mold on evaporator coil — extremely common in DFW due to humidity. Coil stays wet after each cycle, creating ideal mold conditions. UV light installation ($300-500) prevents future growth. Schedule coil cleaning ASAP.' },
  { id: 'efficiency', label: 'Higher bills, less cooling', diagnosis: 'Dirty evaporator coil reducing efficiency 25-40%. Even thin dust layer creates insulation effect. DFW systems need annual coil cleaning. Cleaning ($150-250) vs replacement ($800-1,500) — cleaning is almost always the answer first.' },
  { id: 'leak', label: 'Water dripping or pooling', diagnosis: 'Clogged condensate drain — most common DFW service call in summer. Algae grows fast in DFW heat and humidity. Flush drain with diluted bleach. If pan is full, system may have float switch shutting off — normal safety feature.' },
  { id: 'nochange', label: 'No improvement after filter change', diagnosis: 'If new filter did not help, evaporator coil is likely caked with debris that passed through old filters. Professional cleaning needed. DFW cottonwood and construction dust are notorious for bypassing standard filters.' },
];

export default function DFWEvaporatorCoilGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const result = symptoms.find(s => s.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>❄️ Evaporator Coil Guide</h1>
        <p style={{ color: '#9BA3B4', fontSize: 15, marginBottom: 28 }}>
          The evaporator coil lives inside your DFW air handler. In North Texas humidity, it is the single most maintenance-sensitive component in your system.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🦠', title: 'Mold & UV Prevention', body: 'DFW humidity keeps evaporator coils wet between cycles. Mold and bacteria colonize fast. UV germicidal lights ($300-500 installed) eliminate this entirely and are the #1 upgrade DFW HVAC techs recommend.' },
            { icon: '🧊', title: 'Freeze-Up Symptoms', body: 'Ice on your indoor unit means airflow is blocked or refrigerant is low. A frozen coil stops cooling entirely and can blow liquid refrigerant to your compressor. Turn to FAN ONLY to thaw before calling.' },
            { icon: '📉', title: 'Efficiency Loss', body: 'A dirty evaporator coil acts as insulation between refrigerant and your air. Just 0.1 inches of dust reduces efficiency 25-40%. Annual cleaning in DFW is not optional — it is break-even on energy savings alone.' },
            { icon: '🔧', title: 'Cleaning vs Replacement', body: 'Coil cleaning costs $150-250 and restores full function in most cases. Replacement ($800-1,500 for coil only) is needed when fins are corroded through or refrigerant leaks develop inside coil walls. Ask for a leak check during cleaning.' },
          ].map(card => (
            <div key={card.title} style={{ background: '#0F2040', borderRadius: 10, padding: '18px 20px', borderLeft: '3px solid #F5E642′ }}>
              <div style={{ fontSize: 22, marginBottom: 6 }}>{card.icon} <span style={{ fontSize: 16, fontWeight: 700, color: '#F5E642′ }}>{card.title}</span></div>
              <p style={{ color: '#B0B8CC', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>🔍 Symptom Diagnosis Tool</h2>
          <p style={{ color: '#9BA3B4', fontSize: 14, marginBottom: 16 }}>Select your symptom for an evaporator coil diagnosis:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
            {symptoms.map(s => (
              <button key={s.id} onClick={() => setSelected(s.id)} style={{ background: selected === s.id ? '#F5E642′ : '#162035', color: selected === s.id ? '#0A1628' : '#E8EAF0', border: ’none', borderRadius: 8, padding: '12px 16px', textAlign: 'left', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {s.label}
              </button>
            ))}
          </div>
          {result && (
            <div style={{ background: '#162035', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642′ }}>
              <p style={{ color: '#E8EAF0', fontSize: 14, margin: 0, lineHeight: 1.7 }}>{result.diagnosis}</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: 28, background: '#F5E642', borderRadius: 10, padding: '18px 22px', textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#0A1628', marginBottom: 4 }}>🏠 Get a DFW Evaporator Coil Quote</div>
          <div style={{ fontSize: 13, color: '#1A2A4A' }}>ProLnk connects you with vetted DFW HVAC pros — free, no commitment.</div>
        </div>
      </div>
    </div>
  );
}