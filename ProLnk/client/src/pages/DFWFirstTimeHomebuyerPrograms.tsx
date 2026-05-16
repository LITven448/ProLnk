import { useState } from 'react';

type Program = {
  id: string;
  name: string;
  sponsor: string;
  benefit: string;
  maxAssist: number;
  maxIncome: number[];
  minScore: number;
  maxPrice: number;
  firstTimeOnly: boolean;
  note: string;
};

const PROGRAMS: Program[] = [
  {
    id: 'tsahc',
    name: 'TSAHC Home Sweet Texas',
    sponsor: 'TX State Affordable Housing Corp',
    benefit: 'Up to 5% down payment grant (never repaid)',
    maxAssist: 19250,
    maxIncome: [85400, 97200, 109400, 121600],
    minScore: 620,
    maxPrice: 385000,
    firstTimeOnly: false,
    note: 'Available to ALL buyers, not just first-time. Also available for teachers, police, fire, and veterans.',
  },
  {
    id: 'tdhca',
    name: 'TDHCA My First Texas Home',
    sponsor: 'TX Dept of Housing & Community Affairs',
    benefit: '30-yr fixed rate + up to 5% down payment assistance',
    maxAssist: 19250,
    maxIncome: [97200, 110800, 124600, 138000],
    minScore: 620,
    maxPrice: 385000,
    firstTimeOnly: true,
    note: 'Must not have owned a home in the past 3 years. Can be combined with MCC tax credit for bigger savings.',
  },
  {
    id: 'dallas',
    name: 'City of Dallas DPA',
    sponsor: 'City of Dallas Housing Dept',
    benefit: 'Up to $60,000 forgivable loan (0% over 10 yrs)',
    maxAssist: 60000,
    maxIncome: [60750, 69400, 78100, 86750],
    minScore: 640,
    maxPrice: 271000,
    firstTimeOnly: true,
    note: 'Must live in Dallas city limits. Loan is forgiven over 10 years if home remains primary residence.',
  },
  {
    id: 'fort_worth',
    name: 'City of Fort Worth FTHB',
    sponsor: 'Fort Worth Housing Solutions',
    benefit: 'Up to $14,999 second mortgage at 0%',
    maxAssist: 14999,
    maxIncome: [60750, 69400, 78100, 86750],
    minScore: 620,
    maxPrice: 250000,
    firstTimeOnly: true,
    note: 'Deferred 0% loan, due on sale or refinance. Must complete 8-hour HUD homebuyer education course.',
  },
  {
    id: 'mcc',
    name: 'TX Mortgage Credit Certificate (MCC)',
    sponsor: 'TDHCA / TSAHC',
    benefit: '20% of mortgage interest as annual federal tax credit',
    maxAssist: 2000,
    maxIncome: [97200, 110800, 124600, 138000],
    minScore: 620,
    maxPrice: 385000,
    firstTimeOnly: true,
    note: 'Annual tax credit (not deduction) equal to 20% of interest paid, up to $2,000/yr. Stackable with DPA.',
  },
];

const FAMILY_SIZES = ['1 person', '2 people', '3 people', '4+ people'];

export default function DFWFirstTimeHomebuyerPrograms() {
  const [income, setIncome] = useState(75000);
  const [creditScore, setCreditScore] = useState(660);
  const [homePrice, setHomePrice] = useState(320000);
  const [familyIdx, setFamilyIdx] = useState(1);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const eligible = PROGRAMS.filter(p => {
    if (p.firstTimeOnly && !isFirstTime) return false;
    if (creditScore < p.minScore) return false;
    if (homePrice > p.maxPrice) return false;
    if (income > p.maxIncome[Math.min(familyIdx, 3)]) return false;
    return true;
  });

  const totalAssistance = eligible.reduce((s, p) => s + p.maxAssist, 0);
  const totalUniqueGrant = eligible.filter(p => p.id !== 'mcc').reduce((s, p) => s + p.maxAssist, 0);

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ background: '#0A1628', color: '#fff', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🗝️</div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>DFW First-Time Homebuyer Programs 2026</h1>
        <p style={{ margin: '8px 0 0', color: '#CBD5E1', fontSize: 15 }}>
          Find grants, forgivable loans & tax credits you qualify for in Dallas-Fort Worth
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ background: '#F5E642', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 12px', fontSize: 18, color: '#0A1628' }}>💡 How Much Help is Available?</h2>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
            DFW buyers can potentially combine multiple programs to receive <strong>$14,999–$79,000+</strong> in down payment and closing cost assistance. The key is stacking eligible programs.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '24px', marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 20 }}>🔍 Find Programs You Qualify For</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 14 }}>
                <span style={{ fontWeight: 600 }}>Household Annual Income</span>
                <span style={{ fontWeight: 700 }}>${income.toLocaleString()}</span>
              </div>
              <input type="range" min={20000} max={160000} step={1000} value={income}
                onChange={e => setIncome(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 14 }}>
                <span style={{ fontWeight: 600 }}>Credit Score</span>
                <span style={{ fontWeight: 700 }}>{creditScore}</span>
              </div>
              <input type="range" min={580} max={850} step={10} value={creditScore}
                onChange={e => setCreditScore(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 14 }}>
                <span style={{ fontWeight: 600 }}>Target Home Price</span>
                <span style={{ fontWeight: 700 }}>${homePrice.toLocaleString()}</span>
              </div>
              <input type="range" min={100000} max={600000} step={5000} value={homePrice}
                onChange={e => setHomePrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>Household Size</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  {FAMILY_SIZES.map((sz, i) => (
                    <button key={sz} onClick={() => setFamilyIdx(i)}
                      style={{ flex: 1, padding: '8px 4px', borderRadius: 6, border: '2px solid', cursor: 'pointer', fontSize: 12,
                        borderColor: familyIdx === i ? '#0A1628' : '#E2E8F0',
                        background: familyIdx === i ? '#0A1628' : '#fff',
                        color: familyIdx === i ? '#F5E642' : '#0A1628', fontWeight: 600 }}>
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontWeight: 600, fontSize: 14, display: 'block', marginBottom: 6 }}>First-Time Buyer?</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[true, false].map(v => (
                    <button key={String(v)} onClick={() => setIsFirstTime(v)}
                      style={{ flex: 1, padding: '8px', borderRadius: 6, border: '2px solid', cursor: 'pointer', fontSize: 13,
                        borderColor: isFirstTime === v ? '#0A1628' : '#E2E8F0',
                        background: isFirstTime === v ? '#0A1628' : '#fff',
                        color: isFirstTime === v ? '#F5E642' : '#0A1628', fontWeight: 600 }}>
                      {v ? 'Yes' : 'No'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            {eligible.length === 0 ? (
              <div style={{ background: '#FFF5F5', borderRadius: 10, padding: '20px', textAlign: 'center', color: '#DC2626' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>⚠️</div>
                <div style={{ fontWeight: 700 }}>No programs match your current criteria</div>
                <div style={{ fontSize: 14, marginTop: 4, color: '#64748B' }}>Try adjusting your home price or income, or check if your credit score qualifies for a different loan type.</div>
              </div>
            ) : (
              <>
                <div style={{ background: '#0A1628', borderRadius: 10, padding: '16px 20px', marginBottom: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>PROGRAMS ELIGIBLE FOR</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: '#F5E642' }}>{eligible.length}</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>MAX CASH ASSISTANCE</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: '#F5E642' }}>${totalUniqueGrant.toLocaleString()}</div>
                  </div>
                </div>
                {eligible.map(p => (
                  <div key={p.id} style={{ borderRadius: 10, padding: '16px', marginBottom: 12, background: '#F0F9FF', border: '2px solid #BAE6FD' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 16 }}>{p.name}</div>
                        <div style={{ fontSize: 13, color: '#64748B' }}>{p.sponsor}</div>
                      </div>
                      <div style={{ background: '#F5E642', borderRadius: 8, padding: '6px 14px', fontWeight: 700, fontSize: 16 }}>
                        Up to ${p.maxAssist.toLocaleString()}
                      </div>
                    </div>
                    <div style={{ marginTop: 10, fontSize: 14, fontWeight: 600, color: '#0A1628' }}>✅ {p.benefit}</div>
                    <div style={{ marginTop: 6, fontSize: 13, color: '#475569', lineHeight: 1.5 }}>{p.note}</div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 12, color: '#64748B', flexWrap: 'wrap' }}>
                      <span>Min score: {p.minScore}</span>
                      <span>Max price: ${p.maxPrice.toLocaleString()}</span>
                      <span>Income limit: ${p.maxIncome[Math.min(familyIdx, 3)].toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: 12 }}>
          Program details as of May 2026. Income limits and availability change annually. Verify current terms with each program administrator.
        </p>
      </div>
    </div>
  );
}
