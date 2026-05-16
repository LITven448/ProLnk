import { useState } from 'react';

export default function DFWPoolAlgaeGuide2026() {
  const [algaeType, setAlgaeType] = useState('');
  const [severity, setSeverity] = useState('');
  const [protocol, setProtocol] = useState<string[]>([]);

  const getProtocol = () => {
    const steps: string[] = [];
    if (algaeType === 'green') {
      steps.push('🟢 Green Algae detected — most common in DFW pools.');
      steps.push('1️⃣ Shock the pool: add 2 lbs calcium hypochlorite per 10,000 gallons at dusk.');
      steps.push('2️⃣ Brush all surfaces — walls, floor, steps.');
      steps.push('3️⃣ Run pump 24 hrs continuously.');
      steps.push('4️⃣ Vacuum to waste (bypass filter) once algae dies.');
      if (severity === 'severe') steps.push('⚡ Severe case: double shock dose. May need 2-3 treatments.');
    } else if (algaeType === 'yellow') {
      steps.push('🟡 Yellow/Mustard Algae — resistant to normal chlorine levels.');
      steps.push('1️⃣ Brush vigorously — mustard algae clings to walls and loves shady spots.');
      steps.push('2️⃣ Add quaternary ammonium algaecide before shocking.');
      steps.push('3️⃣ Triple-shock: 3 lbs calcium hypochlorite per 10,000 gallons.');
      steps.push('4️⃣ Wash all pool toys, floats, and swimwear — mustard algae hitchhikes.');
      steps.push('5️⃣ Run pump 24 hrs, vacuum to waste.');
    } else if (algaeType === 'black') {
      steps.push('⚫ Black Algae — hardest to kill. Has protective coating.');
      steps.push('1️⃣ Use a stiff algae brush to break the protective layer on each spot.');
      steps.push('2️⃣ Apply black algae algaecide directly to spots using brush.');
      steps.push('3️⃣ Triple-shock the pool.');
      steps.push('4️⃣ Repeat brushing and algaecide application every 3 days for 2 weeks.');
      steps.push('5️⃣ Black algae has roots in plaster — may require professional acid wash.');
    } else {
      steps.push('Select an algae type above for a treatment protocol.');
    }
    setProtocol(steps);
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 8 }}>🌿 DFW Pool Algae Guide 2026</h1>
        <p style={{ color: '#aaa', marginBottom: 8 }}>DFW spring (March-May) is peak algae bloom season. Warm temps, heavy pollen, and inconsistent chlorine create perfect algae conditions.</p>
        <p style={{ color: '#F5E642', fontSize: 13, marginBottom: 24 }}>💡 Tip: At 95°F (standard DFW summer), chlorine depletes 2x faster — maintain 2-4 ppm free chlorine.</p>

        <div style={{ marginBottom: 20 }}>
          <label style={{ color: '#F5E642', display: 'block', marginBottom: 8 }}>What type of algae do you see?</label>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[{v:'green',l:'🟢 Green'},{v:'yellow',l:'🟡 Yellow/Mustard'},{v:'black',l:'⚫ Black'}].map(({v,l}) => (
              <button key={v} onClick={() => setAlgaeType(v)}
                style={{ padding: '10px 20px', borderRadius: 8, border: `2px solid ${algaeType===v?'#F5E642':'#1e3a5f'}`, backgroundColor: algaeType===v?'#F5E642':'#0d1e36', color: algaeType===v?'#0A1628':'#fff', cursor: 'pointer', fontWeight: 600 }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ color: '#F5E642', display: 'block', marginBottom: 8 }}>Severity</label>
          <div style={{ display: 'flex', gap: 12 }}>
            {[{v:'mild',l:'Mild'},{v:'moderate',l:'Moderate'},{v:'severe',l:'Severe'}].map(({v,l}) => (
              <button key={v} onClick={() => setSeverity(v)}
                style={{ padding: '10px 20px', borderRadius: 8, border: `2px solid ${severity===v?'#F5E642':'#1e3a5f'}`, backgroundColor: severity===v?'#F5E642':'#0d1e36', color: severity===v?'#0A1628':'#fff', cursor: 'pointer', fontWeight: 600 }}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <button onClick={getProtocol} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 24 }}>
          Get Treatment Protocol
        </button>

        {protocol.length > 0 && (
          <div style={{ backgroundColor: '#0d1e36', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
            <h2 style={{ color: '#F5E642', marginBottom: 12, fontSize: 18 }}>🔬 Treatment Protocol</h2>
            {protocol.map((step, i) => (
              <p key={i} style={{ marginBottom: 10, color: '#ddd', lineHeight: 1.6 }}>{step}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
