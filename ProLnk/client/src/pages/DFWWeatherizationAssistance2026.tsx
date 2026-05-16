import { useState } from 'react';

export default function DFWWeatherizationAssistance2026() {
  const [size, setSize] = useState('1');
  const [income, setIncome] = useState('');
  const [result, setResult] = useState('');

  const wapLimits: Record<string, number> = {
    '1': 27861, '2': 37814, '3': 47767, '4': 57720,
    '5': 67673, '6': 77626, '7': 87579, '8': 97532,
  };

  const checkWAP = () => {
    const inc = parseFloat(income.replace(/,/g, ''));
    const limit = wapLimits[size] || 27861;
    if (!inc || isNaN(inc)) { setResult('⚠️ Please enter your annual household income.'); return; }
    if (inc <= limit) {
      setResult(`✅ You appear eligible for WAP! Income $${inc.toLocaleString()} ≤ 200% FPL limit of $${limit.toLocaleString()} for ${size}-person household. Call TDHCA WAP at 1-800-525-0657 or contact Community Council of Greater Dallas: (214) 871-5065.`);
    } else {
      setResult(`❌ Your income ($${inc.toLocaleString()}) exceeds the WAP 200% FPL limit of $${limit.toLocaleString()} for a ${size}-person household. Consider applying for utility assistance (LIHEAP) or city weatherization programs instead.`);
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Weatherization Assistance Program 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Free energy efficiency upgrades for income-qualified DFW homeowners via Texas WAP (TDHCA)</p>
        </div>

        {[{icon:'⚡',title:'What Is WAP?',body:'The Texas Weatherization Assistance Program (WAP), administered by TDHCA, provides FREE energy efficiency improvements to qualifying low-income households. There is no cost to eligible homeowners.'},{icon:'🏠',title:'What You Get',body:'Attic & wall insulation • Weather stripping & caulking • HVAC tune-up or replacement • Water heater efficiency improvements • Air sealing • Energy audit. Average energy savings: $300-500/year per household.'},{icon:'📞',title:'DFW Local Contacts',body:'Community Council of Greater Dallas (Dallas County): (214) 871-5065 | Tarrant County Community Development & Housing: (817) 531-5640 | Community Enrichment Center (Tarrant): (817) 281-1164. TDHCA statewide: 1-800-525-0657.'}].map((card, i) => (
          <div key={i} style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 24 }}>{card.icon}</div>
            <h2 style={{ color: '#F5E642', fontSize: 18, margin: '8px 0 6px' }}>{card.title}</h2>
            <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>{card.body}</p>
          </div>
        ))}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, margin: '0 0 16px' }}>🧮 WAP Eligibility Check (200% FPL)</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
            <input placeholder="Annual Household Income ($)" value={income} onChange={e => setIncome(e.target.value)}
              style={{ flex: 1, minWidth: 200, padding: '10px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: '#fff', fontSize: 14 }} />
            <select value={size} onChange={e => setSize(e.target.value)}
              style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: '#fff', fontSize: 14 }}>
              {['1','2','3','4','5','6','7','8'].map(n => <option key={n} value={n}>{n} Person{n!=='1'?'s':''}</option>)}
            </select>
          </div>
          <button onClick={checkWAP}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Check WAP Eligibility
          </button>
          {result && <p style={{ marginTop: 16, padding: 14, background: '#0A1628', borderRadius: 8, color: '#cbd5e1', lineHeight: 1.6 }}>{result}</p>}
        </div>
      </div>
    </div>
  );
}
