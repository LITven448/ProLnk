import { useState } from 'react';

export default function HomesteadExemptionGuide() {
  const [homeValue, setHomeValue] = useState('');
  const [county, setCounty] = useState('collin');
  const [savings, setSavings] = useState<{ low: number; high: number } | null>(null);

  const rates: Record<string, number> = {
    collin: 0.0138,
    dallas: 0.0152,
    denton: 0.0141,
    tarrant: 0.0147,
  };

  function calculate() {
    const val = parseFloat(homeValue);
    if (!val || val < 100000) return;
    const rate = rates[county];
    const exemptAmount = Math.min(val, 100000);
    const annualSavingsLow = exemptAmount * rate * 0.85;
    const annualSavingsHigh = exemptAmount * rate * 1.15;
    setSavings({ low: Math.round(annualSavingsLow), high: Math.round(annualSavingsHigh) });
  }

  const countyLinks: Record<string, { name: string; url: string; path: string }> = {
    collin: { name: 'Collin County', url: 'https://collincad.org', path: 'Online Services' },
    dallas: { name: 'Dallas County', url: 'https://dallascad.org', path: 'Exemptions' },
    denton: { name: 'Denton County', url: 'https://dentoncad.com', path: 'Forms' },
    tarrant: { name: 'Tarrant County', url: 'https://tad.org', path: 'Exemptions' },
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f1f5f9', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>
          🏠 Homeowner Resources
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, lineHeight: 1.2, color: '#f8fafc' }}>
          Texas Homestead Exemption Guide
        </h1>
        <p style={{ fontSize: 20, color: '#38bdf8', fontWeight: 600, marginBottom: 32 }}>
          Save $1,200+ on Property Taxes Every Year
        </p>

        <div style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #334155' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#f8fafc' }}>📋 What Is a Homestead Exemption?</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 12 }}>
            Texas law allows homeowners to reduce their taxable home value by <strong style={{ color: '#38bdf8' }}>$100,000 for school district taxes</strong>, plus a <strong style={{ color: '#38bdf8' }}>20% cap on annual tax assessment increases</strong>. This is one of the most powerful tax benefits available to Texas homeowners — and many miss it simply because they never filed.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          <div style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 24, border: '1px solid #334155' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>✅</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>Qualifications</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#94a3b8', lineHeight: 1.8 }}>
              <li>• Primary residence only</li>
              <li>• Own the home as of Jan 1 of the tax year</li>
              <li>• Texas driver's license at that address</li>
              <li>• No other homestead exemption in any state</li>
            </ul>
          </div>
          <div style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 24, border: '1px solid #334155' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>📅</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>Key Deadlines</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: '#94a3b8', lineHeight: 1.8 }}>
              <li>• Standard deadline: <strong style={{ color: '#f8fafc' }}>April 30</strong></li>
              <li>• You can file retroactively up to 2 years</li>
              <li>• No fee to file in Texas</li>
              <li>• Once filed, renews automatically</li>
            </ul>
          </div>
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #334155' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#f8fafc' }}>📍 How to File by County</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {Object.entries(countyLinks).map(([key, info]) => (
              <a
                key={key}
                href={info.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: '#0f172a', borderRadius: 8, padding: 16, textDecoration: 'none', border: '1px solid #1e3a5f', display: 'block' }}
              >
                <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: 4 }}>{info.name}</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>{info.url}</div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>→ {info.path}</div>
              </a>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 28, marginBottom: 32, border: '1px solid #334155' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#f8fafc' }}>🧮 Savings Calculator</h2>
          <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Home Value ($)</label>
              <input
                type="number"
                value={homeValue}
                onChange={e => setHomeValue(e.target.value)}
                placeholder="485000"
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#f1f5f9', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>County</label>
              <select
                value={county}
                onChange={e => setCounty(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: 8, color: '#f1f5f9', fontSize: 15, boxSizing: 'border-box' }}
              >
                <option value="collin">Collin County</option>
                <option value="dallas">Dallas County</option>
                <option value="denton">Denton County</option>
                <option value="tarrant">Tarrant County</option>
              </select>
            </div>
          </div>
          <button
            onClick={calculate}
            style={{ backgroundColor: '#0ea5e9', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
          >
            Calculate My Savings
          </button>
          {savings && (
            <div style={{ marginTop: 20, backgroundColor: '#0c2340', borderRadius: 10, padding: 20, border: '1px solid #0ea5e9' }}>
              <div style={{ fontSize: 13, color: '#7dd3fc', marginBottom: 4 }}>Estimated Annual School Tax Savings</div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#38bdf8' }}>
                ${savings.low.toLocaleString()} – ${savings.high.toLocaleString()}/yr
              </div>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Based on {countyLinks[county].name} school district tax rate + homestead exemption of $100,000</div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          <div style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 24, border: '1px solid #334155' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>👴</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>Over-65 Additional Exemption</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: 14 }}>
              Additional $10,000 exemption on school district taxes. School taxes are <strong style={{ color: '#f8fafc' }}>frozen</strong> at the year you turn 65 — they can never increase again on that home.
            </p>
          </div>
          <div style={{ backgroundColor: '#1e293b', borderRadius: 12, padding: 24, border: '1px solid #334155' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>🎖️</div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>Disabled Veteran Exemption</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: 14 }}>
              Veterans rated 100% disabled by the VA receive a <strong style={{ color: '#f8fafc' }}>100% property tax exemption</strong> on their primary residence. Surviving spouses also qualify.
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: '#0c2340', borderRadius: 12, padding: 28, border: '1px solid #0ea5e9', textAlign: 'center' }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🏦</div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#f8fafc', marginBottom: 8 }}>Track All Your Home Exemptions in One Place</h2>
          <p style={{ color: '#7dd3fc', marginBottom: 20 }}>Add your home to the TrustyPro Home Health Vault to automatically track exemption deadlines, assessment changes, and savings over time.</p>
          <a
            href="/trustypro/home-vault"
            style={{ backgroundColor: '#0ea5e9', color: '#fff', textDecoration: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, display: 'inline-block' }}
          >
            Add Home to Vault →
          </a>
        </div>

      </div>
    </div>
  );
}
