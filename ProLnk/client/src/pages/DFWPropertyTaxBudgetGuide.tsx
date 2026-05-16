import { useState } from 'react';

const COUNTIES: Record<string, { rate: number; name: string }> = {
  dallas: { rate: 0.0224, name: 'Dallas County' },
  tarrant: { rate: 0.0218, name: 'Tarrant County' },
  collin: { rate: 0.0198, name: 'Collin County' },
  denton: { rate: 0.0205, name: 'Denton County' },
  rockwall: { rate: 0.0212, name: 'Rockwall County' },
  ellis: { rate: 0.0220, name: 'Ellis County' },
};

export default function DFWPropertyTaxBudgetGuide() {
  const [homeValue, setHomeValue] = useState('');
  const [county, setCounty] = useState('dallas');
  const [hasHomestead, setHasHomestead] = useState(true);
  const [result, setResult] = useState<null | { annual: number; monthly: number; protest10: number; protest15: number; cap: number }>(null);

  function calculate() {
    const val = parseFloat(homeValue) || 0;
    const rate = COUNTIES[county]?.rate || 0.022;
    const taxableVal = hasHomestead ? Math.max(val - 40000, 0) : val;
    const annual = taxableVal * rate;
    const monthly = annual / 12;
    const protest10 = (val * 0.9 - (hasHomestead ? 40000 : 0)) * rate;
    const protest15 = (val * 0.85 - (hasHomestead ? 40000 : 0)) * rate;
    const cap = val * 0.1;
    setResult({ annual, monthly, protest10: annual - protest10, protest15: annual - protest15, cap });
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 28 }}>
          <div style={{ fontSize: 32 }}>🏛️📅</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Property Tax Budget Guide</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>Understand what you owe — and how to fight it every year.</p>
        </div>

        <div style={{ background: '#FEF2F2', borderRadius: 10, padding: 16, marginBottom: 20, borderLeft: '4px solid #DC2626' }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>⚠️ Why DFW Homeowners Are Shocked</div>
          <div style={{ fontSize: 13, color: '#7F1D1D', lineHeight: 1.6 }}>
            DFW has some of the highest property tax rates in the US — averaging 2.0–2.3% annually. On a $450,000 home, that's <strong>$9,000–$10,350/year</strong>. 
            Lenders collect it monthly in your escrow, so it's invisible — until your escrow analysis raises your payment.
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 28, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 16, marginBottom: 20 }}>Calculate Your Property Tax</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
              Appraised home value ($)
              <input type="number" value={homeValue} onChange={e => setHomeValue(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 15 }} placeholder="e.g. 450000" />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
              County
              <select value={county} onChange={e => setCounty(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: 8, border: '1.5px solid #E2E8F0', fontSize: 15 }}>
                {Object.entries(COUNTIES).map(([key, c]) => (
                  <option key={key} value={key}>{c.name} ({(c.rate * 100).toFixed(2)}%)</option>
                ))}
              </select>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasHomestead} onChange={e => setHasHomestead(e.target.checked)} style={{ width: 18, height: 18 }} />
              I have a homestead exemption (saves ~$800–$1,200/yr)
            </label>
          </div>
          <button onClick={calculate}
            style={{ marginTop: 22, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '13px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Calculate My Tax →
          </button>
        </div>

        {result && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontSize: 17, marginBottom: 16 }}>📊 Your Property Tax Breakdown</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div style={{ background: '#F0FDF4', borderRadius: 10, padding: 18, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#166534' }}>Monthly Escrow Portion</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: '#166534' }}>${Math.round(result.monthly).toLocaleString()}</div>
              </div>
              <div style={{ background: '#FEF9EC', borderRadius: 10, padding: 18, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#92400E' }}>Annual Tax Bill</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: '#92400E' }}>${Math.round(result.annual).toLocaleString()}</div>
              </div>
            </div>
            <div style={{ background: '#EFF6FF', borderRadius: 10, padding: 16, marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: '#1E40AF' }}>📣 Protest Your Appraisal — It Works</div>
              <div style={{ fontSize: 13, color: '#1E3A8A', marginBottom: 6 }}>
                Texas caps homestead increases at 10%/yr, but the appraisal district can still over-value your home.
              </div>
              <div style={{ fontSize: 13, color: '#1E3A8A' }}>
                • 10% reduction saves you: <strong>${Math.round(result.protest10).toLocaleString()}/yr</strong><br />
                • 15% reduction saves you: <strong>${Math.round(result.protest15).toLocaleString()}/yr</strong><br />
                • Protest deadline: <strong>May 15</strong> each year (or 30 days after notice)
              </div>
            </div>
            <div style={{ padding: 14, background: '#F8FAFC', borderRadius: 8, fontSize: 13, color: '#475569' }}>
              📅 Taxes due <strong>January 31</strong> (penalty after that). Your lender collects ${Math.round(result.monthly).toLocaleString()}/mo via escrow so you don't face a lump sum.
            </div>
          </div>
        )}

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginTop: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>📆 Key Texas Property Tax Dates</div>
          {[
            ['January 1', 'Appraisal date — value locked for the tax year'],
            ['January 31', 'Tax payment deadline — penalties begin February 1'],
            ['April 1', 'Appraisal notices mailed by county'],
            ['May 15', 'Protest deadline (or 30 days from notice)'],
            ['October', 'Tax bills mailed by taxing units'],
          ].map(([date, desc], i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #F1F5F9', fontSize: 13 }}>
              <span style={{ fontWeight: 700, minWidth: 90, color: '#F59E0B' }}>{date}</span>
              <span style={{ color: '#475569' }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
