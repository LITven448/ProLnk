import { useState } from 'react';

export default function DFWHVACHeatExchangerGuide2026() {
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState('');

  const facts = [
    { icon: '🔥', title: 'What It Does', detail: 'Separates combustion gases (CO, CO2, NOx) from your indoor air. Hot exhaust passes through metal chamber — air passes over outside of it. When cracked, gases leak into your home air.' },
    { icon: '☠️', title: 'Cracked = Emergency', detail: 'A cracked heat exchanger releases carbon monoxide into living space. CO is colorless, odorless, and fatal at high concentrations. DO NOT run the furnace. Call HVAC immediately.' },
    { icon: '🔍', title: 'Detection', detail: 'CO detectors detect carbon monoxide but NOT a crack itself. Visual inspection by HVAC tech (mirror + light), combustion analyzer test, or smoke pencil test confirms crack.' },
    { icon: '💰', title: 'Repair vs. Replace', detail: 'Heat exchanger replacement: $500–$1,500 parts + labor. If furnace is 15+ years old, replacement cost often exceeds new furnace ($2,500–$4,500). Get both quotes before deciding.' },
  ];

  const guides: Record<string, string> = {
    co_alarm: '🚨 CO ALARM TRIGGERED — EMERGENCY: (1) Evacuate home immediately. (2) Call 911 from outside. (3) Do NOT re-enter until fire department clears. (4) After clearance, call HVAC emergency line — furnace must not run again until inspected. This is the most serious HVAC emergency. ProLnk connects you with 24/7 emergency HVAC pros.',
    smell: '👃 SMELL FROM VENTS: If you smell exhaust, burning, or metallic odor from heat vents during furnace operation — turn off furnace immediately at thermostat. Open windows. Call HVAC within 24 hours for heat exchanger inspection. Install CO detector if you do not have one. Do not run furnace until cleared.',
    visible_crack: '🔍 VISIBLE CRACK CONFIRMED: Do NOT operate furnace. Get quotes for: (1) Heat exchanger replacement only, (2) Full furnace replacement. DFW rule of thumb: if furnace is under 12 years old and repair is under $800, replace exchanger. If 15+ years or repair over $1,000, replace furnace. Ask about efficiency ratings — new 96 AFUE saves $300+ per year vs old 80 AFUE.',
    age_check: '📅 AGE-BASED RISK: Furnaces 15–20 years old in DFW have high heat exchanger stress due to constant cycling (300+ days per year of use between heat and AC seasons). Annual furnace inspection after year 10 is critical. Request specific heat exchanger check. Replace CO detector batteries annually.',
    flickering: '🕯️ BURNER FLAME FLICKERING/YELLOW: Gas furnace flame should be steady blue. Yellow or flickering flame = incomplete combustion = CO risk. Shut off furnace. This can indicate cracked exchanger, dirty burner, or poor gas pressure. Requires immediate tech inspection — do not ignore.',
  };

  const assess = () => {
    if (!symptom) { setResult('Please select a symptom.'); return; }
    setResult(guides[symptom] || '');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '8px 16px', display: 'inline-block', fontWeight: 700, fontSize: 13, marginBottom: 16 }}>
          DFW HVAC GUIDE 2026
        </div>
        <div style={{ background: '#7f1d1d', border: '2px solid #ef4444', borderRadius: 10, padding: '14px 18px', marginBottom: 20 }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: '#fca5a5′ }}>☠️ SAFETY CRITICAL — READ FIRST</div>
          <div style={{ color: '#fecaca', fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>A cracked heat exchanger leaks carbon monoxide. If CO alarm sounds or you suspect a crack — turn off furnace and evacuate. Do not re-enter until cleared by emergency services.</div>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🔥 Heat Exchanger Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
          DFW furnaces cycle heavily through spring and fall — thermal stress cracks develop over time. Understanding your heat exchanger can save your life.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
          {facts.map(f => (
            <div key={f.title} style={{ background: '#1E2D45', borderRadius: 10, padding: '14px 18px', borderLeft: '4px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{f.icon} {f.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{f.detail}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#1a2a40', border: '1px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Symptom to Urgency Assessment</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Symptom</label>
            <select value={symptom} onChange={e => setSymptom(e.target.value)}
              style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6, padding: '10px 14px', width: '100%', fontSize: 15 }}>
              <option value="">Select symptom...</option>
              <option value="co_alarm">CO alarm went off</option>
              <option value="smell">Exhaust or burning smell from heat vents</option>
              <option value="visible_crack">Technician found visible crack on inspection</option>
              <option value="flickering">Burner flame is yellow or flickering</option>
              <option value="age_check">Furnace is 15+ years old — risk assessment</option>
            </select>
          </div>
          <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>
            Get Urgency Assessment
          </button>
          {result && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#F5E642', fontWeight: 600, fontSize: 13, lineHeight: 1.7 }}>{result}</div>}
        </div>
        <div style={{ background: '#1E2D45', borderRadius: 10, padding: '16px 20px', color: '#94a3b8', fontSize: 13, lineHeight: 1.7 }}>
          🛡️ <strong style={{ color: '#F5E642′ }}>Required for every DFW home:</strong> CO detector on every floor within 15 feet of sleeping areas. Replace batteries annually. Test monthly. Carbon monoxide kills hundreds of Americans per year — all preventable.
        </div>
      </div>
    </div>
  );
}
