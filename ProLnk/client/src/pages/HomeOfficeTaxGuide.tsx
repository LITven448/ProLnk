import { useState } from 'react';

export default function HomeOfficeTaxGuide() {
  const [homeSqft, setHomeSqft] = useState(2400);
  const [officeSqft, setOfficeSqft] = useState(200);
  const [mortgageInterest, setMortgageInterest] = useState(18000);
  const [utilities, setUtilities] = useState(6000);
  const [insurance, setInsurance] = useState(3240);
  const [repairs, setRepairs] = useState(2400);

  const allocationPct = officeSqft / homeSqft;
  const totalExpenses = mortgageInterest + utilities + insurance + repairs;
  const actualDeduction = Math.round(totalExpenses * allocationPct);
  const simplifiedDeduction = Math.min(officeSqft, 300) * 5;
  const betterMethod = actualDeduction > simplifiedDeduction ? 'actual' : 'simplified';

  const formatPct = (n: number) => (n * 100).toFixed(1) + '%';
  const formatDollar = (n: number) => '$' + n.toLocaleString();

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', color: '#1a1a2e', fontFamily: 'sans-serif', padding: '0 0 80px' }}>
      <div style={{ background: '#0A1628', paddingTop: 60, paddingBottom: 60 }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ color: '#F5C842', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Tax Guide for Self-Employed</div>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, margin: '0 0 16px', color: '#fff', lineHeight: 1.2 }}>Home Office Tax Deduction Guide</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, margin: 0 }}>What DFW homeowners and ProLnk partners need to know to maximize deductions legally.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 20px 0′ }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 48 }}>
          <div style={{ background: '#fff', border: '2px solid #16a34a', borderRadius: 16, padding: 28 }}>
            <div style={{ color: '#16a34a', fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Qualifies</div>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#333', fontSize: 15, lineHeight: 2 }}>
              <li>Sole proprietors and freelancers</li>
              <li>Independent contractors (1099)</li>
              <li>ProLnk partner pros</li>
              <li>LLC owners (single-member)</li>
              <li>Gig workers with business income</li>
            </ul>
          </div>
          <div style={{ background: '#fff', border: '2px solid #dc2626', borderRadius: 16, padding: 28 }}>
            <div style={{ color: '#dc2626', fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Does NOT Qualify</div>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#333', fontSize: 15, lineHeight: 2 }}>
              <li>W-2 employees (since TCJA 2017)</li>
              <li>Remote workers employed by a company</li>
              <li>Anyone who sometimes works from home</li>
              <li>Dual-purpose rooms (guest room + office)</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e5e3', borderRadius: 20, padding: 36, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 24px', color: '#0A1628′ }}>Two Calculation Methods</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#FAFAF9', border: '1px solid #e5e5e3', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>Simplified Method</div>
              <div style={{ color: '#555', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
                $5 per square foot of your dedicated office space. Maximum 300 sq ft ($1,500 max deduction). Easy to calculate, no depreciation recapture on home sale.
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, color: '#fff' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Formula</div>
                <div style={{ fontWeight: 700 }}>$5 x min(office sq ft, 300)</div>
              </div>
            </div>
            <div style={{ background: '#FAFAF9', border: '1px solid #e5e5e3', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>Actual Expense Method</div>
              <div style={{ color: '#555', fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
                (Office sq ft divided by total home sq ft) times actual qualifying expenses. Usually higher deduction for larger offices. Requires meticulous records.
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, color: '#fff' }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Formula</div>
                <div style={{ fontWeight: 700 }}>(Office / Home) x All Expenses</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e5e3', borderRadius: 20, padding: 36, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 8px', color: '#0A1628′ }}>Interactive Deduction Calculator</h2>
          <p style={{ color: '#666', fontSize: 14, margin: '0 0 28px' }}>Enter your numbers to compare both methods and see which saves you more.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
            {([
              ['Home Square Footage', homeSqft, setHomeSqft, 500, 10000, 100, true],
              ['Home Office Square Footage', officeSqft, setOfficeSqft, 50, 500, 10, true],
              ['Mortgage Interest (Annual)', mortgageInterest, setMortgageInterest, 0, 40000, 500, false],
              ['Utilities (Annual)', utilities, setUtilities, 0, 20000, 250, false],
              ['Home Insurance (Annual)', insurance, setInsurance, 0, 10000, 100, false],
              ['Home Repairs (Annual)', repairs, setRepairs, 0, 20000, 250, false],
            ] as [string, number, (v: number) => void, number, number, number, boolean][]).map(([label, value, setter, min, max, step, isSqft]) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: '#333′ }}>{label}</label>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0A1628′ }}>
                    {isSqft ? `${value.toLocaleString()} sq ft` : formatDollar(value)}
                  </span>
                </div>
                <input
                  type="range" min={min} max={max} step={step} value={value}
                  onChange={(e) => setter(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#F5C842′ }}
                />
              </div>
            ))}
          </div>

          <div style={{ background: '#0A1628', borderRadius: 16, padding: 32, color: '#fff' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, marginBottom: 24 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 4 }}>Office Allocation</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#F5C842′ }}>{formatPct(allocationPct)}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>{officeSqft} / {homeSqft} sq ft</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 4 }}>Simplified Method</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: betterMethod === 'simplified' ? '#4ade80′ : '#fff' }}>{formatDollar(simplifiedDeduction)}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>$5 x {Math.min(officeSqft, 300)} sq ft</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 4 }}>Actual Expense Method</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: betterMethod === 'actual' ? '#4ade80′ : '#fff' }}>{formatDollar(actualDeduction)}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}>{formatPct(allocationPct)} x {formatDollar(totalExpenses)}</div>
              </div>
            </div>
            <div style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <span style={{ color: '#4ade80', fontWeight: 700 }}>Best method: {betterMethod === 'actual' ? 'Actual Expense' : 'Simplified'} — saves {formatDollar(Math.abs(actualDeduction - simplifiedDeduction))} more</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
          <div style={{ background: '#fff', border: '1px solid #e5e5e3', borderRadius: 16, padding: 28 }}>
            <span style={{ fontSize: 28 }}>🔒</span>
            <h3 style={{ fontSize: 17, fontWeight: 800, margin: '12px 0 8px', color: '#0A1628′ }}>Exclusivity Requirement</h3>
            <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7, margin: 0 }}>Your office must be used exclusively for business. A room with a desk, TV, and guest bed does not qualify. The IRS takes this seriously — the space must be dedicated business use only.</p>
          </div>
          <div style={{ background: '#fff', border: '1px solid #fbbf24', borderRadius: 16, padding: 28 }}>
            <span style={{ fontSize: 28 }}>⚠️</span>
            <h3 style={{ fontSize: 17, fontWeight: 800, margin: '12px 0 8px', color: '#0A1628′ }}>Home Sale Implications</h3>
            <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7, margin: 0 }}>If you use the actual expense method, you may owe depreciation recapture tax when you sell the home. The simplified method avoids this. Consult a CPA before deciding which method to use long-term.</p>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e5e5e3', borderRadius: 16, padding: 28, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 32, flexShrink: 0 }}>👩‍💼</span>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px', color: '#0A1628′ }}>Work with a CPA Who Understands Self-Employment</h3>
            <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7, margin: '0 0 16px' }}>
              Home office deductions are an area where small mistakes create big audit risks. A CPA who specializes in self-employed and gig economy workers will ensure you maximize deductions legally and maintain proper documentation. ProLnk partners who work with a CPA report avg $3,800 more in annual deductions.
            </p>
            <a href="https://www.aicpa.org/forthepublic/findacpa" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', background: '#0A1628', color: '#fff', fontWeight: 700, padding: '10px 20px', borderRadius: 8, textDecoration: 'none', fontSize: 14 }}>
              Find a CPA Specializing in Self-Employment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
