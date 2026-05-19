import { useState } from 'react';

export default function DFWHVACPhaseLoss2026() {
  const [sysType, setSysType] = useState('residential');

  const guides: Record<string, { icon: string; risk: string; action: string; detail: string }> = {
    residential: { icon: '🏠', risk: 'No Phase Loss Risk', action: 'No phase monitoring needed', detail: 'Residential HVAC in DFW runs on single-phase 240V power. Phase loss cannot occur on a single-phase circuit — it only applies to three-phase systems. Your residential AC, heat pump, and air handler are not at risk.' },
    light: { icon: '🏢', risk: 'Low-Medium Risk', action: 'Phase Loss Monitor ($150–$200)', detail: 'Light commercial buildings in DFW (strip malls, small offices) typically run 3-phase 208V. Install a basic phase loss relay on each rooftop unit. These trip the compressor before winding damage occurs from single-phasing.' },
    heavy: { icon: '🏭', risk: 'High Risk — ERCOT Events', action: 'Phase Monitor + Surge Protection ($300+)', detail: 'Large commercial DFW facilities with 3-phase 480V systems face risk from ERCOT grid events, transformer issues, and utility switching transients. Install phase loss monitors, phase sequence relays, and voltage sag protection on all critical HVAC.' },
    data: { icon: '🖥️', risk: 'Critical — Zero Downtime Required', action: 'Full Phase Monitoring Array + UPS', detail: 'DFW data centers and critical facilities need phase loss protection, phase sequence monitoring, harmonic filters, and UPS backup. Any phase event trips the system before compressor damage. Consult a licensed electrical engineer.' },
  };

  const g = guides[sysType];

  const facts = [
    { icon: '⚡', title: 'What Phase Loss Is', body: 'In three-phase power, losing one phase causes a motor to run on two phases — drawing excessive current, overheating windings, and failing within minutes. A $150 phase loss relay prevents a $5,000–$25,000 compressor replacement.' },
    { icon: '🌐', title: 'ERCOT Grid and DFW', body: 'ERCOT grid events, transformer switching, and utility faults can cause momentary phase issues in DFW commercial areas. Phase loss relays detect these in milliseconds and cut power before damage occurs.' },
    { icon: '🔧', title: 'Installation', body: 'Phase loss monitors are wired into the HVAC disconnect by a licensed DFW electrician. Most residential HVAC technicians are unfamiliar with three-phase protection — require a commercial HVAC or electrical contractor.' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW HVAC Phase Loss Protection 2026</h1>
          <p style={{ color: '#8899AA', fontSize: 14 }}>Three-phase protection guide for North Texas commercial HVAC</p>
        </div>

        <div style={{ background: '#0D1F38', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏗️ DFW System Type → Phase Protection Guide</h2>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 13 }}>Select System Type</label>
          <select value={sysType} onChange={e => setSysType(e.target.value)}
            style={{ background: '#1a2d4a', color: '#fff', border: '1px solid #334', borderRadius: 8, padding: '8px 12px', width: '100%', marginBottom: 16 }}>
            <option value="residential">Residential (single-phase)</option>
            <option value="light">Light commercial (3-phase 208V)</option>
            <option value="heavy">Heavy commercial (3-phase 480V)</option>
            <option value="data">Data center / critical facility</option>
          </select>
          <div style={{ background: '#122040', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{g.icon}</div>
            <div style={{ color: sysType === 'residential' ? '#4CAF50' : '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Risk: {g.risk}</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 8 }}>Action: {g.action}</div>
            <p style={{ color: '#B0C4D8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{g.detail}</p>
          </div>
        </div>

        {facts.map((f, i) => (
          <div key={i} style={{ background: '#0D1F38', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 8 }}>{f.icon} {f.title}</h3>
            <p style={{ color: '#B0C4D8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{f.body}</p>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#0D1F38', borderRadius: 12 }}>
          <p style={{ color: '#8899AA', fontSize: 12, margin: '0 0 12px' }}>Find a licensed DFW commercial HVAC contractor via ProLnk</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Get Commercial HVAC Quote
          </button>
        </div>
      </div>
    </div>
  );
}