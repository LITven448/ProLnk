import { useState } from 'react';

export default function DFWHOMEGrantGuide2026() {
  const [income, setIncome] = useState('');
  const [familySize, setFamilySize] = useState('1');
  const [result, setResult] = useState('');

  const amiLimits: Record<string, number> = {
    '1': 54200, '2': 61950, '3': 69700, '4': 77400,
    '5': 83600, '6': 89800, '7': 96000, '8': 102150,
  };

  const checkEligibility = () => {
    const inc = parseFloat(income.replace(/,/g, ''));
    const limit = amiLimits[familySize] || 54200;
    if (!inc || isNaN(inc)) { setResult('⚠️ Please enter your annual household income.'); return; }
    if (inc <= limit) {
      setResult(`✅ You likely qualify! Your income ($${inc.toLocaleString()}) is at or below the 80% AMI limit of $${limit.toLocaleString()} for a ${familySize}-person household. Contact your county HOME program office to apply.`);
    } else {
      setResult(`❌ Your income ($${inc.toLocaleString()}) exceeds the 80% AMI limit of $${limit.toLocaleString()} for a ${familySize}-person household. You may still qualify for other programs.`);
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW HOME Investment Partnerships Program 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Federal HOME grants for low-income homeowners in Dallas & Tarrant County</p>
        </div>

        {[{icon:'📋',title:'What Is HOME?',body:'The HOME Investment Partnerships Program (HOME) is a federal grant administered by HUD and distributed to Dallas and Tarrant County. It provides forgivable loans or direct grants to low-income homeowners for critical home repairs.'},{icon:'🔨',title:'Eligible Repairs',body:'Roof replacement • HVAC systems • Foundation repair • Electrical & plumbing • Accessibility modifications (ramps, grab bars) • Lead & asbestos abatement • Window & door replacement'},{icon:'📍',title:'How to Apply',body:'Contact Dallas County HOME Program: (214) 653-6400 | Tarrant County HOME: (817) 531-5640. Applications open annually — waitlists form quickly. Bring proof of income, property deed, and ID.'}].map((card, i) => (
          <div key={i} style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 24 }}>{card.icon}</div>
            <h2 style={{ color: '#F5E642', fontSize: 18, margin: '8px 0 6px' }}>{card.title}</h2>
            <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>{card.body}</p>
          </div>
        ))}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, margin: '0 0 16px' }}>🧮 Check Your Eligibility (80% AMI)</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
            <input placeholder="Annual Household Income ($)" value={income} onChange={e => setIncome(e.target.value)}
              style={{ flex: 1, minWidth: 200, padding: '10px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: '#fff', fontSize: 14 }} />
            <select value={familySize} onChange={e => setFamilySize(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: '#fff', fontSize: 14 }}>
              {['1','2','3','4','5','6','7','8'].map(n => <option key={n} value={n}>{n} Person{n!=='1'?'s':''}</option>)}
            </select>
          </div>
          <button onClick={checkEligibility}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Check Eligibility
          </button>
          {result && <p style={{ marginTop: 16, padding: 14, background: '#0A1628', borderRadius: 8, color: '#cbd5e1', lineHeight: 1.6 }}>{result}</p>}
        </div>
      </div>
    </div>
  );
}
