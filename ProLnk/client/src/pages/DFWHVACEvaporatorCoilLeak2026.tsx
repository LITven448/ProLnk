import { useState } from 'react';

export default function DFWHVACEvaporatorCoilLeak2026() {
  const [coilAge, setCoilAge] = useState('');
  const [systemAge, setSystemAge] = useState('');
  const [refrigerant, setRefrigerant] = useState('');
  const [result, setResult] = useState('');

  const getRecommendation = () => {
    if (!coilAge || !systemAge || !refrigerant) { setResult('Please answer all questions.'); return; }
    const ca = parseInt(coilAge); const sa = parseInt(systemAge);
    if (refrigerant === 'r22') { setResult('🔴 REPLACE SYSTEM: R-22 refrigerant is discontinued. Replacement refrigerant costs $100+/lb. A coil repair on an R-22 system rarely makes financial sense — full system replacement is the right move.'); return; }
    if (sa >= 12 || ca >= 10) { setResult('🟡 REPLACE COIL OR SYSTEM: With your system/coil age, weigh coil replacement cost ($1,200–$2,800) against full system replacement ($4,500–$8,000). If the system is 12+ years old, full replacement often wins long-term.'); return; }
    setResult('🟢 REPAIR COIL: Your system is relatively young and uses current refrigerant. Coil repair or replacement makes financial sense. Get 2–3 quotes and ask about warranty on parts + labor.');
  };

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#ffffff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px', color: '#F5E642', fontSize: '14px', fontWeight: '600' }}>🌡️ DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px', lineHeight: '1.2' }}>AC Evaporator Coil Leaks in DFW</h1>
        <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '32px' }}>The evaporator coil is the most common refrigerant leak location in DFW HVAC systems — and DFW's unique climate makes it worse.</p>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>⚗️ Why DFW Coils Fail Faster</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[['🧪 Formicary Corrosion','Cleaning products + copper coil + moisture = formic acid that eats pinhole leaks'],['💧 DFW Humidity','High summer humidity accelerates condensation on coils, creating persistent moisture contact'],['🌡️ Run Hours','DFW systems run 2,000–2,800 hrs/year vs. 1,200 national average — more wear'],['🏠 Tight Attics','Poor ventilation traps chemical vapors from paints and cleaners near the air handler']].map(([title, desc]) => (
              <div key={title} style={{ backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px' }}>
                <div style={{ fontWeight: '700', marginBottom: '8px', fontSize: '15px' }}>{title}</div>
                <div style={{ color: '#94a3b8', fontSize: '13px' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>🔧 Signs You Have a Coil Leak</h2>
          {['AC runs but home won\'t cool below 78°F','Ice forming on the refrigerant line or indoor unit','Hissing or bubbling sounds near air handler','Higher-than-normal electric bills with reduced cooling','Technician finds low refrigerant charge on inspection'].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
              <span style={{ color: '#F5E642', fontSize: '16px', marginTop: '1px' }}>▸</span>
              <span style={{ color: '#cbd5e1', fontSize: '15px' }}>{s}</span>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>🧮 Repair vs. Replace Decision Tool</h2>
          {[['How old is your evaporator coil?', coilAge, setCoilAge, 'Enter coil age in years (check install date on unit)'],['How old is the overall HVAC system?', systemAge, setSystemAge, 'Enter system age in years'],].map(([label, val, setter, ph]) => (
            <div key={label} style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '14px', marginBottom: '6px' }}>{label}</label>
              <input type="number" value={val} onChange={e => setter(e.target.value)} placeholder={ph}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px', boxSizing: 'border-box' }} />
            </div>
          ))}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '14px', marginBottom: '6px' }}>What refrigerant does your system use?</label>
            <select value={refrigerant} onChange={e => setRefrigerant(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0A1628', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '14px' }}>
              <option value="">Select refrigerant type</option>
              <option value="r22">R-22 (older systems, pre-2010)</option>
              <option value="r410a">R-410A (common 2010–2022)</option>
              <option value="r32">R-32 or R-454B (newer systems)</option>
            </select>
          </div>
          <button onClick={getRecommendation}
            style={{ backgroundColor: '#F5E642', color: '#0A1628', border: 'none', borderRadius: '8px', padding: '12px 24px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', width: '100%' }}>
            Get My Recommendation →
          </button>
          {result && <div style={{ marginTop: '16px', backgroundColor: '#0A1628', borderRadius: '8px', padding: '16px', color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6' }}>{result}</div>}
        </div>

        <div style={{ backgroundColor: '#1e3a5f', borderRadius: '12px', padding: '24px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>💰 DFW Cost Benchmarks (2026)</h2>
          {[['Evaporator coil replacement (R-410A, 3-ton)','$1,200 – $2,800'],['Refrigerant recharge only (leak still present)','$300 – $600 (temporary)'],['Full system replacement (3-ton, 15 SEER2)','$4,500 – $8,000'],['Leak detection + UV dye test','$150 – $250']].map(([item, cost]) => (
            <div key={item} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #334155', fontSize: '14px' }}>
              <span style={{ color: '#cbd5e1' }}>{item}</span>
              <span style={{ color: '#F5E642', fontWeight: '700', whiteSpace: 'nowrap', marginLeft: '16px' }}>{cost}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}