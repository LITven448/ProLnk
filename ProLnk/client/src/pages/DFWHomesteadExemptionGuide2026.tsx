import { useState } from 'react';

export default function DFWHomesteadExemptionGuide2026() {
  const [county, setCounty] = useState('Dallas');
  const [homeValue, setHomeValue] = useState('');
  const [isOver65, setIsOver65] = useState(false);
  const [result, setResult] = useState<{ schoolSavings: number; totalSavings: number; taxableValue: number } | null>(null);

  const rates: Record<string, { total: number; school: number }> = {
    Dallas: { total: 0.0209, school: 0.0127 },
    Tarrant: { total: 0.0215, school: 0.0132 },
    Collin: { total: 0.0178, school: 0.0109 },
    Denton: { total: 0.0192, school: 0.0118 },
  };

  const calculate = () => {
    const value = parseFloat(homeValue.replace(/,/g, ''));
    if (!value || isNaN(value)) return;
    const r = rates[county];
    const schoolExemption = 100000;
    const over65Extra = isOver65 ? 10000 : 0;
    const totalExemption = schoolExemption + over65Extra;
    const taxableValue = Math.max(0, value - totalExemption);
    const baseTax = value * r.total;
    const reducedTax = taxableValue * r.total;
    setResult({ schoolSavings: baseTax - reducedTax, totalSavings: baseTax - reducedTax, taxableValue });
  };

  const steps: Record<string, string[]> = {
    Dallas: ['Go to dallascad.org', 'Click Apply for Exemptions', 'Create account or login', 'Select Homestead Exemption', 'Upload DL + utility bill', 'Submit by April 30'],
    Tarrant: ['Go to tad.org', 'Click Exemptions tab', 'Download or fill online form', 'Upload proof of residence', 'Submit by April 30', 'Confirmation emailed in 60 days'],
    Collin: ['Go to collincad.org', 'Select Forms & Applications', 'Complete Homestead form', 'Mail or upload documents', 'April 30 deadline', 'Check status online at collincad.org'],
    Denton: ['Go to dentoncad.com', 'Select Exemptions Online', 'Login or create account', 'Fill Residence Homestead form', 'Upload ID + bill', 'Submit by April 30'],
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🏡✅</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', margin: '0.5rem 0' }}>DFW Homestead Exemption Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>Save $1,500–$3,000/yr. File by April 30 if you bought your home in 2025 or 2026.</p>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🎯 What You Get</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem' }}>
            {[['School District','\K off','Appraised value'],['Over-65 Bonus','\K extra','Off school taxes'],['Value Cap','10% max','Annual increase']].map(([label, val, sub]) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F5E642' }}>{val}</div>
                <div style={{ fontSize: '0.8rem', color: '#e2e8f0', marginTop: 2 }}>{label}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>📍 Step-by-Step: {county} County</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {(steps[county] || []).map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.8rem', flexShrink: 0 }}>{i + 1}</span>
                <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{step}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            {['Dallas','Tarrant','Collin','Denton'].map(c => (
              <button key={c} onClick={() => setCounty(c)} style={{ background: county === c ? '#F5E642' : '#0A1628', color: county === c ? '#0A1628' : '#94a3b8', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.4rem 1rem', cursor: 'pointer', fontWeight: county === c ? 700 : 400 }}>{c}</button>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🧮 Savings Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: 4 }}>Home Appraised Value</label>
              <input value={homeValue} onChange={e => setHomeValue(e.target.value)} placeholder='e.g. 380,000'
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
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#cbd5e1', marginBottom: '1rem' }}>
            <input type='checkbox' checked={isOver65} onChange={e => setIsOver65(e.target.checked)} style={{ width: 16, height: 16 }} />
            I qualify for the Over-65 Exemption
          </label>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', width: '100%' }}>Calculate My Savings</button>
          {result && (
            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[['Annual Tax Savings', '$' + Math.round(result.totalSavings).toLocaleString()],['Taxable Value', '$' + Math.round(result.taxableValue).toLocaleString()]].map(([label, val]) => (
                <div key={label} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5E642' }}>{val}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}