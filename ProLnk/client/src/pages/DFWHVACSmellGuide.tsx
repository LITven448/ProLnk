import { useState } from 'react';

type SmellKey = 'musty' | 'burning' | 'sulfur' | 'sweet' | 'dirty-sock' | 'exhaust';

const SMELLS: { key: SmellKey; label: string; icon: string }[] = [
  { key: 'musty', label: 'Musty / Moldy', icon: '🦠' },
  { key: 'burning', label: 'Burning / Electrical', icon: '🔥' },
  { key: 'sulfur', label: 'Sulfur / Rotten Eggs', icon: '⚠️' },
  { key: 'sweet', label: 'Sweet / Chemical', icon: '🧪' },
  { key: 'dirty-sock', label: 'Dirty Socks / Gym', icon: '🧦' },
  { key: 'exhaust', label: 'Exhaust / Fume-like', icon: '💨' },
];

type CondKey = 'just_started' | 'summer_peak' | 'after_rain' | 'heat_running';

const CONDITIONS: { key: CondKey; label: string }[] = [
  { key: 'just_started', label: 'System just started for the season' },
  { key: 'summer_peak', label: 'Mid-summer, running all day' },
  { key: 'after_rain', label: 'After heavy DFW rain' },
  { key: 'heat_running', label: 'Running heat (winter)' },
];

type DiagData = {
  cause: string;
  urgency: string;
  urgencyColor: string;
  immediateAction: string;
  emergency: boolean;
  dfwNote?: string;
};

const DIAG: Record<SmellKey, DiagData> = {
  musty: {
    cause: 'Mold or mildew growing on the evaporator coil, in the drain pan, or in ductwork',
    urgency: '⚠️ Address This Week',
    urgencyColor: '#F59E0B',
    immediateAction: 'Schedule a coil cleaning and duct inspection. Replace filter. Run the fan-only mode to dry out the system.',
    emergency: false,
    dfwNote: 'DFW\’s high humidity makes evaporator coil mold one of the most common HVAC complaints. The coil stays wet for months — mold grows fast. This is especially likely if you\’ve had a clogged drain line recently.',
  },
  burning: {
    cause: 'Overheating motor, burning dust on heat strips, melting wiring insulation, or an electrical short',
    urgency: '🚨 Turn Off System Now',
    urgencyColor: '#EF4444',
    immediateAction: 'Turn off the HVAC at the thermostat AND the breaker. Do not run the system. Call a tech today. If smell is intense or you see smoke, evacuate and call 911.',
    emergency: true,
    dfwNote: 'The first time you run heat in fall, burning dust smell from heat strips is normal and lasts 10–15 minutes. Persistent burning, or burning smell from the AC side, is never normal.',
  },
  sulfur: {
    cause: 'Natural gas leak — mercaptan additive creates the rotten egg smell intentionally for safety',
    urgency: '🚨 EVACUATE NOW',
    urgencyColor: '#EF4444',
    immediateAction: 'Do not turn any light switches or electronics on or off. Leave the home immediately. Call 911 and your gas company (Atmos Energy in DFW: 1-888-286-6700) from outside.',
    emergency: true,
    dfwNote: 'DFW homes primarily use Atmos Energy for natural gas. Never assume a gas smell is coming from the HVAC itself — the HVAC can circulate gas fumes that are leaking from a furnace, water heater, or gas line anywhere in the home.',
  },
  sweet: {
    cause: 'Refrigerant leak — refrigerant (R-410A or older R-22) has a faintly sweet or ether-like chemical odor',
    urgency: '🚨 Call Tech Today',
    urgencyColor: '#EF4444',
    immediateAction: 'Turn off the AC. Open windows for ventilation. Call an HVAC tech — refrigerant leaks are harmful to breathe in large amounts and the system will fail without refrigerant.',
    emergency: false,
    dfwNote: 'R-22 (old Freon) is now illegal to produce — if you have a pre-2010 system and smell refrigerant, the repair cost may justify replacement. R-410A is the current standard but also regulated. A leak means the system will struggle and could damage the compressor.',
  },
  'dirty-sock': {
    cause: 'Dirty Sock Syndrome — bacteria and mold growing on the evaporator coil during short-cycle operation',
    urgency: '⚠️ Schedule Service',
    urgencyColor: '#F59E0B',
    immediateAction: 'Schedule a professional coil cleaning. This smell is caused by brief on/off cycles that don\’t fully evaporate moisture from the coil, allowing bacteria to thrive.',
    emergency: false,
    dfwNote: 'Common in DFW during spring and fall "shoulder seasons" when the AC runs briefly but never long enough to fully dry the coil. Also worsens when the system is oversized for the home — it cools too fast, short-cycles, and leaves a wet coil.',
  },
  exhaust: {
    cause: 'Combustion fumes — could indicate a cracked heat exchanger (serious), backdrafting flue, or refrigerant burning on heat strips',
    urgency: '🚨 Turn Off & Call Tech',
    urgencyColor: '#EF4444',
    immediateAction: 'Turn off the system. Ventilate the home. A cracked heat exchanger can allow carbon monoxide to enter living space — install a CO detector immediately if you don\’t have one.',
    emergency: true,
    dfwNote: 'DFW homes with gas furnaces are at risk of cracked heat exchangers — especially in systems over 15 years old. Heat exchanger cracks are invisible to the homeowner but release CO. Carbon monoxide poisoning sends thousands of DFW families to the ER each winter.',
  },
};

export default function DFWHVACSmellGuide() {
  const [smell, setSmell] = useState<SmellKey | ''>('');
  const [condition, setCondition] = useState<CondKey | ''>('');
  const [showResult, setShowResult] = useState(false);

  const diag = smell ? DIAG[smell] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EEF7', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 1 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>HVAC Smell Diagnostic Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 28, fontSize: 15 }}>
          What you smell coming from your vents tells a story. Some smells are harmless and temporary. Others are emergencies. In DFW, the combination of high humidity and intense AC use creates specific smell patterns you need to know.
        </p>

        <div style={{ background: '#2D1515', border: '1.5px solid #EF4444', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, color: '#EF4444', marginBottom: 6 }}>🚨 Emergency Reminder</div>
          <p style={{ color: '#94A3B8', fontSize: 13, margin: 0 }}>If you smell rotten eggs / sulfur at any time — do not operate any switches. Leave the home immediately and call 911 + Atmos Energy from outside: <strong style={{ color: '#E8EEF7' }}>1-888-286-6700</strong></p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>👃 What Are You Smelling?</div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Smell Description</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SMELLS.map(({ key, label, icon }) => (
                <button key={key} onClick={() => { setSmell(key); setShowResult(false); }} style={{ padding: '10px 16px', borderRadius: 8, border: '1.5px solid', borderColor: smell === key ? '#F5E642' : '#1E3A5F', background: smell === key ? '#F5E64220' : 'transparent', color: smell === key ? '#F5E642' : '#94A3B8', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                  {icon} {label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Current DFW Conditions</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {CONDITIONS.map(({ key, label }) => (
                <button key={key} onClick={() => { setCondition(key); setShowResult(false); }} style={{ padding: '8px 14px', borderRadius: 8, border: '1.5px solid', borderColor: condition === key ? '#F5E642' : '#1E3A5F', background: condition === key ? '#F5E64220' : 'transparent', color: condition === key ? '#F5E642' : '#94A3B8', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>{label}</button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={!smell} style={{ background: smell ? '#F5E642' : '#1E3A5F', color: smell ? '#0A1628' : '#4A6080', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 14, cursor: smell ? 'pointer' : 'not-allowed', width: '100%' }}>
            Get My Smell Diagnosis
          </button>
        </div>

        {showResult && diag && (
          <div style={{ background: '#0D2240', border: `1.5px solid ${diag.urgencyColor}`, borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: diag.urgencyColor, marginBottom: 8 }}>{diag.urgency}</div>
            <div style={{ marginBottom: 12 }}><span style={{ color: '#94A3B8', fontSize: 13 }}>Likely Cause: </span><span style={{ fontWeight: 600, fontSize: 14 }}>{diag.cause}</span></div>
            {diag.dfwNote && (
              <div style={{ background: '#111E35', borderRadius: 8, padding: 12, marginBottom: 12 }}>
                <div style={{ fontWeight: 600, color: '#F5E642', fontSize: 12, marginBottom: 4 }}>📍 DFW SPECIFIC</div>
                <p style={{ color: '#94A3B8', fontSize: 13, margin: 0 }}>{diag.dfwNote}</p>
              </div>
            )}
            <div style={{ background: diag.emergency ? '#2D1515' : '#111E35', borderRadius: 8, padding: 12, border: diag.emergency ? '1px solid #EF4444' : 'none' }}>
              <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 14, color: diag.emergency ? '#EF4444' : '#E8EEF7' }}>
                {diag.emergency ? '🚨 Immediate Action' : '🔧 Recommended Action'}
              </div>
              <p style={{ color: '#94A3B8', fontSize: 13, margin: 0 }}>{diag.immediateAction}</p>
            </div>
          </div>
        )}

        <div style={{ background: '#111E35', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>📊 Quick Reference — All DFW HVAC Smells</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {SMELLS.map(({ key, label, icon }) => {
              const d = DIAG[key];
              return (
                <div key={key} style={{ background: '#0A1628', borderRadius: 8, padding: 10 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{icon} {label}</div>
                  <div style={{ fontSize: 11, color: d.urgencyColor }}>{d.urgency.replace('🚨 ', '').replace('⚠️ ', '')}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
