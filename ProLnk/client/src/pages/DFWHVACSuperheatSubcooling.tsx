import { useState } from 'react';

const sections = [
  {
    emoji: '🌡️',
    title: 'What Are Superheat and Subcooling?',
    body: 'Superheat is the temperature rise of refrigerant vapor above its boiling point at the evaporator outlet. Subcooling is the temperature drop of liquid refrigerant below its condensing point at the condenser outlet. Together, these two measurements tell a technician exactly how much refrigerant is in the system and whether the expansion device is operating correctly.',
  },
  {
    emoji: '☀️',
    title: 'Why DFW Ambient Conditions Change the Numbers',
    body: "DFW summer design conditions reach 100–105°F outdoor dry bulb with 70–78°F wet bulb. These extreme ambients push condenser temperatures higher than northern states, meaning DFW technicians expect higher subcooling values and must adjust superheat targets accordingly. A 'textbook' reading from a Minnesota manual will be wrong for a DFW rooftop unit in July.",
  },
  {
    emoji: '📐',
    title: 'Target Ranges for DFW Conditions',
    body: 'Fixed orifice systems in DFW summer: Superheat 8–18°F (higher ambient = higher target). Subcooling 10–18°F. TXV/EEV systems: Superheat 8–12°F (valve-controlled). Subcooling 10–20°F. R-410A is most common in DFW; R-22 (legacy) and R-454B (new installs) have different pressure-temperature relationships requiring different PT charts.',
  },
  {
    emoji: '🔬',
    title: 'What Deviations Indicate',
    body: 'High superheat + low subcooling = undercharged or refrigerant restriction. Low superheat + high subcooling = overcharged. High superheat + high subcooling = liquid line restriction. Low superheat + low subcooling = TXV stuck open or compressor capacity issue. Always check ambient conditions before diagnosing — DFW heat changes everything.',
  },
];

type RefrigerantResult = { superheat: string; subcooling: string; notes: string };
type DiagResult = { diagnosis: string; explanation: string; color: string };

function getTargets(ambient: number, refrigerant: string, system: string): RefrigerantResult {
  const shBase = system === 'txv' ? 10 : ambient > 95 ? 15 : ambient > 85 ? 12 : 10;
  const scBase = ambient > 95 ? 15 : ambient > 85 ? 12 : 10;
  return {
    superheat: `${shBase - 2}–${shBase + 3}°F`,
    subcooling: `${scBase - 2}–${scBase + 4}°F`,
    notes: refrigerant === 'r22' ? 'Legacy R-22 — use R-22 PT chart. Recharge adds 410A adapter cost.' : refrigerant === 'r454b' ? 'R-454B (new install) — use manufacturer PT chart. A2L mildly flammable.' : 'R-410A standard. Use 410A PT chart.'
  };
}

function diagDeviation(shHigh: boolean, scHigh: boolean): DiagResult {
  if (shHigh && !scHigh) return { diagnosis: 'Likely Undercharged', explanation: 'High superheat + normal/low subcooling = insufficient refrigerant or inlet restriction. Add refrigerant after verifying no leak.', color: '#EF4444' };
  if (!shHigh && scHigh) return { diagnosis: 'Likely Overcharged', explanation: 'Low superheat + high subcooling = too much refrigerant in system. Recover excess charge carefully.', color: '#F59E0B' };
  if (shHigh && scHigh) return { diagnosis: 'Liquid Line Restriction', explanation: 'High on both sides = restriction between condenser and metering device. Check filter drier, liquid line valve.', color: '#EF4444' };
  return { diagnosis: 'Within Normal Range', explanation: 'Both readings normal for ambient conditions. System operating correctly.', color: '#10B981' };
}

export default function DFWHVACSuperheatSubcooling() {
  const [ambient, setAmbient] = useState(98);
  const [refrigerant, setRefrigerant] = useState('r410a');
  const [system, setSystem] = useState('txv');
  const [shHigh, setShHigh] = useState(false);
  const [scHigh, setScHigh] = useState(false);
  const targets = getTargets(ambient, refrigerant, system);
  const diag = diagDeviation(shHigh, scHigh);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW HVAC Superheat & Subcooling Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 15 }}>The two key refrigerant diagnostic measurements every DFW HVAC tech relies on — adjusted for Texas heat</p>
        </div>
        {sections.map((s) => (
          <div key={s.title} style={{ background: '#0F2140', borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: '4px solid #F5E642' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.emoji}</div>
            <h2 style={{ color: '#F5E642', fontSize: 17, fontWeight: 600, margin: '0 0 8px' }}>{s.title}</h2>
            <p style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{s.body}</p>
          </div>
        ))}
        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, border: '2px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 20px' }}>🔧 DFW Target Range Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Ambient Temp: {ambient}°F</label>
              <input type="range" min={65} max={110} value={ambient} onChange={e => setAmbient(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Refrigerant Type</label>
              <select value={refrigerant} onChange={e => setRefrigerant(e.target.value)} style={{ width: '100%', background: '#1E3A5F', color: '#E2E8F0', border: '1px solid #334155', borderRadius: 8, padding: '8px 12px', fontSize: 14 }}>
                <option value="r410a">R-410A (most common)</option>
                <option value="r22">R-22 (legacy)</option>
                <option value="r454b">R-454B (new installs)</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 6 }}>Metering Device</label>
              <select value={system} onChange={e => setSystem(e.target.value)} style={{ width: '100%', background: '#1E3A5F', color: '#E2E8F0', border: '1px solid #334155', borderRadius: 8, padding: '8px 12px', fontSize: 14 }}>
                <option value="txv">TXV / EEV (valve)</option>
                <option value="fixed">Fixed Orifice / Piston</option>
              </select>
            </div>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><span style={{ color: '#94A3B8', fontSize: 13 }}>Target Superheat: </span><span style={{ color: '#F5E642', fontWeight: 700 }}>{targets.superheat}</span></div>
              <div><span style={{ color: '#94A3B8', fontSize: 13 }}>Target Subcooling: </span><span style={{ color: '#F5E642', fontWeight: 700 }}>{targets.subcooling}</span></div>
            </div>
            <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 8 }}>{targets.notes}</div>
          </div>
          <h3 style={{ color: '#F5E642', fontSize: 15, fontWeight: 600, margin: '0 0 12px' }}>Deviation Diagnosis</h3>
          <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
            <label style={{ color: '#CBD5E1', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={shHigh} onChange={e => setShHigh(e.target.checked)} style={{ accentColor: '#F5E642', width: 16, height: 16 }} /> Superheat above target
            </label>
            <label style={{ color: '#CBD5E1', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={scHigh} onChange={e => setScHigh(e.target.checked)} style={{ accentColor: '#F5E642', width: 16, height: 16 }} /> Subcooling above target
            </label>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, borderLeft: `4px solid ${diag.color}` }}>
            <div style={{ color: diag.color, fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{diag.diagnosis}</div>
            <div style={{ color: '#CBD5E1', fontSize: 14 }}>{diag.explanation}</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 28, background: '#0F2140', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 28 }}>🔗</div>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: '8px 0 12px' }}>Need a DFW refrigerant diagnostic? ProLnk connects you with certified techs who bring the right gauges.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 15, border: 'none', borderRadius: 8, padding: '12px 28px', cursor: 'pointer' }}>Find a Refrigerant Pro →</button>
        </div>
      </div>
    </div>
  );
}
