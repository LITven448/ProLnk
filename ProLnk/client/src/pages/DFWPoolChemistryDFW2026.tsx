import { useState } from 'react';

export default function DFWPoolChemistryDFW2026() {
  const [calcium, setCalcium] = useState('');
  const [alkalinity, setAlkalinity] = useState('');
  const [ph, setPh] = useState('');
  const [cya, setCya] = useState('');
  const [result, setResult] = useState<string[]>([]);

  const analyze = () => {
    const tips: string[] = [];
    const ca = parseFloat(calcium);
    const alk = parseFloat(alkalinity);
    const phVal = parseFloat(ph);
    const cyaVal = parseFloat(cya);

    if (!isNaN(ca)) {
      if (ca < 200) tips.push('🧪 Calcium too low — add calcium chloride. DFW tap starts 300-400 ppm; aim for 200-400 ppm.');
      else if (ca > 400) tips.push('🧱 Calcium too high — partial drain/refill. Scale will form on tiles and equipment.');
      else tips.push('✅ Calcium hardness is in range (200-400 ppm).');
    }
    if (!isNaN(alk)) {
      if (alk < 80) tips.push('📉 Total alkalinity low — add sodium bicarbonate. Target 80-120 ppm.');
      else if (alk > 120) tips.push('📈 Total alkalinity high — add muriatic acid slowly. Target 80-120 ppm.');
      else tips.push('✅ Total alkalinity in range (80-120 ppm).');
    }
    if (!isNaN(phVal)) {
      if (phVal < 7.4) tips.push('⬆️ pH too low — add soda ash. Eye irritation risk below 7.2.');
      else if (phVal > 7.6) tips.push('⬇️ pH too high — add muriatic acid. Chlorine loses effectiveness above 7.8.');
      else tips.push('✅ pH in ideal range (7.4-7.6).');
    }
    if (!isNaN(cyaVal)) {
      if (cyaVal < 30) tips.push('☀️ CYA (stabilizer) low — add cyanuric acid. DFW sun burns off chlorine fast without it.');
      else if (cyaVal > 80) tips.push('⚠️ CYA too high — partial drain required. Chlorine becomes ineffective above 100 ppm.');
      else tips.push('✅ CYA stabilizer in range (30-80 ppm).');
    }
    if (tips.length === 0) tips.push('Enter at least one test result to get recommendations.');
    setResult(tips);
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: 28, marginBottom: 8 }}>🧪 DFW Pool Chemistry Deep Dive 2026</h1>
        <p style={{ color: '#aaa', marginBottom: 24 }}>DFW tap water starts at 300-400 ppm calcium hardness — higher than most US cities. Enter your test results below for a personalized adjustment guide.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Calcium Hardness (ppm)', val: calcium, set: setCalcium, placeholder: 'e.g. 350′ },
            { label: 'Total Alkalinity (ppm)', val: alkalinity, set: setAlkalinity, placeholder: 'e.g. 100′ },
            { label: 'pH Level', val: ph, set: setPh, placeholder: 'e.g. 7.5′ },
            { label: 'CYA / Stabilizer (ppm)', val: cya, set: setCya, placeholder: 'e.g. 50′ },
          ].map(({ label, val, set, placeholder }) => (
            <div key={label}>
              <label style={{ display: 'block', color: '#F5E642', marginBottom: 4, fontSize: 14 }}>{label}</label>
              <input value={val} onChange={e => set(e.target.value)} placeholder={placeholder}
                style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #F5E642', backgroundColor: '#0d1e36', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          ))}
        </div>

        <button onClick={analyze} style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 16, fontWeight: 700, cursor: 'pointer', marginBottom: 24 }}>
          Analyze My Pool Chemistry
        </button>

        {result.length > 0 && (
          <div style={{ backgroundColor: '#0d1e36', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
            <h2 style={{ color: '#F5E642', marginBottom: 12, fontSize: 18 }}>📋 Adjustment Guide</h2>
            {result.map((tip, i) => (
              <p key={i} style={{ marginBottom: 10, color: '#ddd', lineHeight: 1.6 }}>{tip}</p>
            ))}
            <p style={{ marginTop: 16, color: '#888', fontSize: 13 }}>⚠️ DFW note: Hard water causes calcium scale on tiles and equipment. Test weekly in summer.</p>
          </div>
        )}
      </div>
    </div>
  );
}
