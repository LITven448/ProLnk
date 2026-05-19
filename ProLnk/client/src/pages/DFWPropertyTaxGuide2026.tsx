import { useState } from 'react';

export default function DFWPropertyTaxGuide2026() {
  const [homeValue, setHomeValue] = useState('');
  const [county, setCounty] = useState('Dallas');
  const [hasHomestead, setHasHomestead] = useState(false);
  const [isOver65, setIsOver65] = useState(false);
  const [result, setResult] = useState<{ tax: number; savings: number; afterExemption: number } | null>(null);

  const rates: Record<string, number> = { Dallas: 0.0209, Tarrant: 0.0215, Collin: 0.0178, Denton: 0.0192 };

  const calculate = () => {
    const value = parseFloat(homeValue.replace(/,/g, ''));
    if (!value || isNaN(value)) return;
    const rate = rates[county];
    const baseTax = value * rate;
    let exemption = 0;
    if (hasHomestead) exemption += 100000;
    if (isOver65) exemption += 10000;
    const taxableValue = Math.max(0, value - exemption);
    const afterExemption = taxableValue * rate;
    setResult({ tax: baseTax, savings: baseTax - afterExemption, afterExemption });
  };

  const fmt = (n: number) => '$' + Math.round(n).toLocaleString();

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🏛️📋</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', margin: '0.5rem 0' }}>DFW Property Tax Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>Texas has no income tax — but property taxes avg 2.1%, nearly double the national average of 1.1%.</p>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>📊 DFW County Tax Rates 2026</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.75rem', marginTop: '1rem' }}>
            {[['Dallas','2.09%'],['Tarrant','2.15%'],['Collin','1.78%'],['Denton','1.92%']].map(([c, r]) => (
              <div key={c} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F5E642' }}>{r}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{c} County</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🗓️ Key Dates</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[['Jan 1','Appraisal date — value frozen as of today'],['Apr 30','Homestead exemption deadline for new owners'],['May 15','Protest deadline (or 30 days after notice)'],['Oct 1','Tax bills mailed by counties']].map(([date, desc]) => (
              <div key={date} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 6, padding: '0.2rem 0.5rem', fontWeight: 800, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{date}</span>
                <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🏠 Exemptions Available</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: '1.2rem' }}>
            <li><strong style={{ color: '#F5E642' }}>Homestead Exemption:</strong> $100K off appraised value for school taxes (since 2023)</li>
            <li><strong style={{ color: '#F5E642' }}>Over-65 Exemption:</strong> Additional $10K off + frozen school district tax ceiling</li>
            <li><strong style={{ color: '#F5E642' }}>Disabled Veterans:</strong> Up to 100% exemption depending on disability rating</li>
            <li><strong style={{ color: '#F5E642' }}>10% Appraisal Cap:</strong> Homestead values cannot rise more than 10%/year</li>
          </ul>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🧮 Tax Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 4 }}>Home Value</label>
              <input value={homeValue} onChange={e => setHomeValue(e.target.value)} placeholder='e.g. 400,000'
                style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 6, color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 4 }}>County</label>
              <select value={county} onChange={e => setCounty(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 6, color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }}>
                {['Dallas','Tarrant','Collin','Denton'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
            {[['Homestead Exemption', hasHomestead, setHasHomestead],['Over-65 Exemption', isOver65, setIsOver65]].map(([label, val, setter]) => (
              <label key={label as string} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#cbd5e1' }}>
                <input type='checkbox' checked={val as boolean} onChange={e => (setter as (v: boolean) => void)(e.target.checked)} style={{ width: 16, height: 16 }} />
                {label as string}
              </label>
            ))}
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', width: '100%' }}>Calculate Tax</button>
          {result && (
            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
              {[['Without Exemptions', fmt(result.tax), '📌'],['Exemption Savings', fmt(result.savings), '✅'],['After Exemptions', fmt(result.afterExemption), '🎯']].map(([label, val, icon]) => (
                <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.4rem' }}>{icon}</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F5E642' }}>{val}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}