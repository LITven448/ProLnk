import { useState } from 'react';

const motorTypes = [
  { id: 'psc', label: '🔴 PSC Motor (standard, single-speed)' },
  { id: 'xTSpeed', label: '🟡 Multi-speed PSC (2–3 fixed speeds)' },
  { id: 'ecm', label: '🟢 ECM Motor (already have variable speed)' },
];

const usageProfiles = [
  { id: 'constant', label: '🔁 Runs constantly (DFW summers — AC all day)' },
  { id: 'humid', label: '💧 Humidity issues — system short-cycles' },
  { id: 'allergy', label: '🌿 Air quality focus — want continuous circulation' },
  { id: 'bills', label: '💰 High electricity bills — looking to cut costs' },
];

function getResult(motor: string, usage: string) {
  if (motor === 'ecm') return {
    upgrade: 'Already Optimized',
    cost: 'N/A',
    savings: 'N/A',
    payback: 'N/A',
    note: 'Your system already has variable-speed ECM technology. Focus on other efficiency gains: programmable thermostat schedules, MERV filter upgrades, or duct sealing.',
  };

  const highUsage = usage === 'constant' || usage === 'bills';
  const annualSavings = motor === 'psc' ? (highUsage ? '$280–$420/yr' : '$180–$280/yr') : '$120–$200/yr';
  const payback = motor === 'psc' ? (highUsage ? '2–4 years' : '3–5 years') : '4–6 years';

  return {
    upgrade: 'ECM Motor Retrofit or System Replacement',
    cost: motor === 'psc' ? '$400–$900 for motor swap (if compatible); $6,000–$12,000 for full variable-speed system' : '$350–$700 motor upgrade',
    savings: annualSavings,
    payback,
    note: `PSC motors run at full speed 100% of the time — like a car with only one gear. ${usage === 'humid' ? 'In DFW\'s humidity problem, short-cycling PSC systems never run long enough to dehumidify. ECM\'s low-speed continuous operation removes far more moisture.' : ''} ${usage === 'allergy' ? 'ECM motors can run at 20% speed continuously to filter air without the energy penalty of a full-blast PSC.' : ''} ${highUsage ? 'DFW systems running 8–12 hours/day make ECM payback exceptionally fast.' : ''} ECM uses 75% less energy than PSC at low speed — in DFW\'s constant-run environment, that\'s significant.`,
  };
}

export default function DFWECMMotorGuide() {
  const [motor, setMotor] = useState('');
  const [usage, setUsage] = useState('');
  const result = motor && usage ? getResult(motor, usage) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <p style={{ color: '#F5E642', fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>⚡ DFW HVAC GUIDE</p>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>ECM Motor Guide for DFW Homeowners</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          Your HVAC blower motor is running thousands of hours per year in DFW's climate. If it’s a PSC motor, you’re leaving hundreds of dollars on the table — and fighting a losing battle against DFW humidity.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '⚙️', title: 'PSC Motor (Old Tech)', desc: 'Permanent Split Capacitor. Single speed — 100% or off. Common in systems built before 2010. Energy-hungry and poor at dehumidification.' },
            { icon: '🔋', title: 'ECM Motor (Modern)', desc: 'Electronically Commutated Motor. Variable speed from 20–100%. Uses brushless DC technology. Standard in high-efficiency systems (16+ SEER).' },
            { icon: '💧', title: 'DFW Humidity Win', desc: 'ECM runs at low speed for longer cycles. More air contact with the cold coil = more moisture removed. Critical in DFW summers where humidity stays 60–80%.' },
            { icon: '📉', title: '75% Less Energy', desc: 'At low speed, ECM uses ~100W vs PSC\’s 400–600W. In DFW where the blower runs 8–12 hours/day, that\’s $200–$400/year straight back in your pocket.' },
          ].map(f => (
            <div key={f.title} style={{ background: '#0f2240', borderRadius: 10, padding: 16 }}>
              <p style={{ fontSize: 22, marginBottom: 4 }}>{f.icon}</p>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>{f.title}</p>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>🔧 How to Know What Motor You Have</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
            Check your air handler's data plate (usually on the inside of the cabinet door). Look for "Variable Speed" or "ECM" in the blower description. Alternatively, check your system’s SEER rating — 16+ SEER systems almost always include ECM. Below 14 SEER? Almost certainly PSC.
          </p>
        </div>

        <div style={{ background: '#0f2240', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>🔍 Calculate Your DFW ECM Upgrade Value</h2>
          <p style={{ color: '#94a3b8', marginBottom: 12 }}>Your current motor type:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {motorTypes.map(m => (
              <button key={m.id} onClick={() => setMotor(m.id)} style={{ background: motor === m.id ? '#F5E642′ : '#1e3a5f', color: motor === m.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>{m.label}</button>
            ))}
          </div>
          <p style={{ color: '#94a3b8', marginBottom: 12 }}>Your DFW usage profile:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {usageProfiles.map(u => (
              <button key={u.id} onClick={() => setUsage(u.id)} style={{ background: usage === u.id ? '#F5E642′ : '#1e3a5f', color: usage === u.id ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 14px', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}>{u.label}</button>
            ))}
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#1a2e4a', borderRadius: 10, padding: 18, borderLeft: '4px solid #F5E642′ }}>
              <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Path Forward: {result.upgrade}</p>
              {result.cost !== 'N/A' && <p style={{ color: '#e2e8f0', marginBottom: 4 }}>💰 DFW upgrade cost: <strong>{result.cost}</strong></p>}
              {result.savings !== 'N/A' && <p style={{ color: '#e2e8f0', marginBottom: 4 }}>📉 Annual savings: <strong>{result.savings}</strong></p>}
              {result.payback !== 'N/A' && <p style={{ color: '#e2e8f0', marginBottom: 8 }}>⏱️ Payback period: <strong>{result.payback}</strong></p>}
              <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{result.note}</p>
            </div>
          )}
        </div>

        <p style={{ color: '#475569', fontSize: 13, textAlign: 'center' }}>
          ProLnk connects DFW homeowners with verified HVAC professionals. Get 3 quotes, fast.
        </p>
      </div>
    </div>
  );
}
