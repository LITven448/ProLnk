import { useState } from 'react';

export default function DFWCDBGRepairGuide2026() {
  const [city, setCity] = useState('');
  const [income, setIncome] = useState('');
  const [result, setResult] = useState('');

  const cityPrograms: Record<string, string> = {
    'dallas': 'City of Dallas Housing & Neighborhood Revitalization: (214) 670-3644. Owner-occupied repair grants up to $25,000 for low-income households.',
    'fort worth': 'City of Fort Worth Neighborhood Services: (817) 392-7540. CDBG-funded home repair for owner-occupants earning below 80% AMI.',
    'arlington': 'City of Arlington Housing: (817) 459-6580. Home repair assistance for qualifying low-income homeowners.',
    'plano': 'City of Plano Community Development: (972) 941-7151. Plano participates in Collin County CDBG — limited annual funding.',
    'garland': 'City of Garland Community Development: (972) 205-2670. Emergency repair assistance available for qualifying residents.',
  };

  const checkProgram = () => {
    const c = city.toLowerCase().trim();
    const inc = parseFloat(income.replace(/,/g, ''));
    if (!c || !inc || isNaN(inc)) { setResult('⚠️ Please enter your city and income.'); return; }
    const program = Object.keys(cityPrograms).find(k => c.includes(k));
    if (program) {
      if (inc <= 77400) {
        setResult(`✅ ${cityPrograms[program]}`);
      } else {
        setResult(`⚠️ ${cityPrograms[program]} — Note: Your income may exceed eligibility limits. Contact the office to confirm.`);
      }
    } else {
      setResult('📍 Your city may be served through your county CDBG program. Contact Dallas County (214-653-6400) or Tarrant County (817-531-5640) for referrals.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW CDBG Home Repair Program 2026</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>Community Development Block Grant repair assistance across DFW cities</p>
        </div>

        {[{icon:'💡',title:'What Is CDBG?',body:'The Community Development Block Grant (CDBG) program provides federal funding to cities and counties to assist low-income homeowners with critical repairs. Each city administers its own program with slightly different rules.'},{icon:'🛠️',title:'What It Covers',body:'Structural repairs • Roof replacement • HVAC • Electrical & plumbing • Accessibility modifications • Health & safety hazards. Grants are typically forgivable loans — no repayment if you stay in the home.'},{icon:'⏳',title:'Waitlist Reality',body:'CDBG programs are heavily oversubscribed. Waitlists in Dallas can exceed 12-18 months. Apply as early as possible and apply to multiple programs simultaneously. Prioritize programs for elderly, disabled, or veterans — they often have shorter queues.'}].map((card, i) => (
          <div key={i} style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 24 }}>{card.icon}</div>
            <h2 style={{ color: '#F5E642', fontSize: 18, margin: '8px 0 6px' }}>{card.title}</h2>
            <p style={{ color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>{card.body}</p>
          </div>
        ))}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, margin: '0 0 16px' }}>🔍 Find Your City's CDBG Program</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
            <input placeholder="Your City (e.g. Dallas, Fort Worth)" value={city} onChange={e => setCity(e.target.value)}
              style={{ flex: 1, minWidth: 180, padding: '10px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: '#fff', fontSize: 14 }} />
            <input placeholder="Annual Income ($)" value={income} onChange={e => setIncome(e.target.value)}
              style={{ flex: 1, minWidth: 150, padding: '10px 14px', borderRadius: 8, border: '1px solid #334155', background: '#0A1628', color: '#fff', fontSize: 14 }} />
          </div>
          <button onClick={checkProgram}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
            Find Program
          </button>
          {result && <p style={{ marginTop: 16, padding: 14, background: '#0A1628', borderRadius: 8, color: '#cbd5e1', lineHeight: 1.6 }}>{result}</p>}
        </div>
      </div>
    </div>
  );
}
