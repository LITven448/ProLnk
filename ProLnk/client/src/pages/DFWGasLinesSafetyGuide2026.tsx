import { useState } from 'react';

export default function DFWGasLinesSafetyGuide2026() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState<string[]>([]);

  const guide = () => {
    const actions: string[] = [];
    if (concern === 'smell') {
      actions.push('🚨 IMMEDIATE ACTION: Leave the building now — do not use light switches, phones, or create sparks');
      actions.push('📞 Call Atmos Energy from outside: 1-888-286-6700 (24/7 emergency line)');
      actions.push('🚒 Call 911 if you cannot reach Atmos or smell is strong');
      actions.push('🚫 Do NOT return until Atmos clears the premises');
    }
    if (concern === 'flex') {
      actions.push('⚠️ Flexible connectors behind appliances should be replaced every 15–20 years');
      actions.push('🔍 Check for corrugation damage, kinks, or brown discoloration — signs of deterioration');
      actions.push('🔧 Only licensed plumbers should replace gas flex connectors — improper work is a fire/explosion risk');
    }
    if (concern === 'csst') {
      actions.push('⚡ CSST (Corrugated Stainless Steel Tubing) requires bonding to protect against lightning strike');
      actions.push('🏠 DFW storms produce frequent lightning — unbonded CSST can arc and puncture, causing gas leak');
      actions.push('📋 Have a licensed plumber verify your CSST is properly bonded at the main gas meter');
    }
    if (concern === 'underground') {
      actions.push('🟡 Call 811 (Texas One Call) before ANY digging — underground gas lines must be marked first');
      actions.push('⏰ Call at least 2 business days before digging — it is the law in Texas');
      actions.push('🏴 Look for orange/yellow flags or paint marks indicating buried utilities');
    }
    setResult(actions);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔥💨</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: 0 }}>DFW Gas Line Safety Guide 2026</h1>
          <p style={{ color: '#9CA3AF', marginTop: 8 }}>Natural Gas Safety for Dallas-Fort Worth Homeowners</p>
        </div>

        <div style={{ background: '#3B0A0A', border: '1px solid #EF4444', borderRadius: 10, padding: 18, marginBottom: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 24, marginBottom: 6 }}>🚨</div>
          <div style={{ color: '#FCA5A5', fontWeight: 700, fontSize: 16 }}>Smell Gas? Leave Immediately.</div>
          <div style={{ color: '#FCA5A5', fontSize: 14, marginTop: 4 }}>Atmos Energy Emergency: <strong>1-888-286-6700</strong> (24/7)</div>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
          {[
            { icon: '🔗', title: 'Flex Connector Lifespan', desc: 'Flexible gas connectors behind stoves and dryers age out. Replace every 15–20 years. Unmoved appliances hide aging connectors — pull out and inspect.' },
            { icon: '⚡', title: 'CSST Lightning Protection', desc: 'Corrugated Stainless Steel Tubing requires bonding to the main gas system. DFW lightning can arc through unbonded CSST and puncture it, causing a gas leak.' },
            { icon: '🟡', title: 'Call 811 Before Digging', desc: 'Texas law requires you call 811 at least 2 business days before digging. Underground gas lines may not be where you expect. Free service, mandatory by law.' },
            { icon: '📍', title: 'Know Your Gas Shutoff', desc: 'Locate your main gas meter shutoff — typically at the meter with a quarter-turn valve. You need a wrench to turn it. Know the location before an emergency.' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#132040', borderRadius: 10, padding: 18, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#CBD5E1', fontSize: 14 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 18 }}>🔍 Gas Safety Action Guide</h2>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#9CA3AF', fontSize: 13, display: 'block', marginBottom: 6 }}>What is your gas concern?</label>
            <select value={concern} onChange={e => setConcern(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2D4A7A', borderRadius: 8, fontSize: 14 }}>
              <option value="">Select a concern...</option>
              <option value="smell">I smell gas in my home</option>
              <option value="flex">Aging flex connector behind appliance</option>
              <option value="csst">CSST tubing — not sure if bonded</option>
              <option value="underground">Planning to dig in yard</option>
            </select>
          </div>
          <button onClick={guide} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get Safety Action Guide</button>
          {result.length > 0 && (
            <div style={{ marginTop: 20 }}>
              {result.map((r, i) => <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '10px 14px', marginBottom: 8, fontSize: 14, color: '#CBD5E1′ }}>{r}</div>)}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: '16px', background: '#132040', borderRadius: 10, color: '#9CA3AF', fontSize: 13 }}>
          🏠 ProLnk connects DFW homeowners with licensed gas plumbers and safety inspectors
        </div>
      </div>
    </div>
  );
}