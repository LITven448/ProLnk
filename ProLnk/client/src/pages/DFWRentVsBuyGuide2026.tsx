import { useState } from 'react';

export default function DFWRentVsBuyGuide2026() {
  const [rent, setRent] = useState(1850);
  const [budget, setBudget] = useState(385000);

  const homePrice = budget;
  const downPayment = homePrice * 0.2;
  const loanAmount = homePrice - downPayment;
  const monthlyMortgage = (loanAmount * (0.065 / 12)) / (1 - Math.pow(1 + 0.065 / 12, -360));
  const taxes = (homePrice * 0.023) / 12;
  const insurance = 175;
  const piti = Math.round(monthlyMortgage + taxes + insurance);
  const monthlyCostDiff = piti - rent;
  const breakEvenYears = monthlyCostDiff > 0 ? Math.round((downPayment / (monthlyCostDiff * 12 - homePrice * 0.05)) * 10) / 10 : 2.5;
  const fiveYearAppreciation = Math.round(homePrice * Math.pow(1.05, 5));
  const equityBuilt = fiveYearAppreciation - (loanAmount * 0.92);
  const rentPaid5yr = rent * 60;
  const recommendation = breakEvenYears <= 4 ? 'BUY' : 'RENT';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOMEBUYER GUIDE 2026</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 8px' }}>🏠 Rent vs Buy in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>The real math for 2026 — DFW avg rent $1,850/mo vs buying at ~$2,100/mo PITI. Break-even typically hits in 3–4 years with DFW's 5% avg annual appreciation.</p>

        <div style={{ background: '#1E293B', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>📊 DFW 2026 Market Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[['Avg DFW Rent', '$1,850/mo'], ['Avg DFW PITI', '$2,100/mo'], ['Median Home Price', '$385,000'], ['Annual Appreciation', '~5%'], ['Typical Break-Even', '3–4 years'], ['Property Tax Rate', '~2.3%']].map(([k, v]) => (
              <div key={k} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ color: '#64748B', fontSize: 12 }}>{k}</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1E293B', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔢 Your Personal Rent vs Buy Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Current/Expected Rent/mo</label>
              <input type="range" min={1000} max={4000} step={50} value={rent} onChange={e => setRent(+e.target.value)}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20 }}>${rent.toLocaleString()}/mo</div>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Home Purchase Budget</label>
              <input type="range" min={200000} max={700000} step={5000} value={budget} onChange={e => setBudget(+e.target.value)}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20 }}>${(budget / 1000).toFixed(0)}K</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
            {[['Monthly PITI', `$${piti.toLocaleString()}`, '#F5E642'], ['Down Payment (20%)', `$${(downPayment / 1000).toFixed(0)}K`, '#60A5FA'], ['5-Yr Equity Built', `$${Math.round(equityBuilt / 1000)}K`, '#34D399']].map(([k, v, c]) => (
              <div key={k} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', textAlign: 'center' }}>
                <div style={{ color: '#64748B', fontSize: 11 }}>{k}</div>
                <div style={{ color: c as string, fontWeight: 700, fontSize: 18 }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ background: recommendation === 'BUY' ? '#064E3B' : '#1E1B4B', border: `2px solid ${recommendation === 'BUY' ? '#34D399' : '#818CF8'}`, borderRadius: 10, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 28 }}>{recommendation === 'BUY' ? '🏡' : '🏢'}</div>
            <div style={{ fontWeight: 800, fontSize: 20, color: recommendation === 'BUY' ? '#34D399' : '#818CF8' }}>
              Lean: {recommendation === 'BUY' ? 'BUYING MAKES SENSE' : 'RENTING FOR NOW'}
            </div>
            <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 6 }}>
              Break-even at ~{Math.max(2.5, breakEvenYears).toFixed(1)} yrs • 5-yr rent paid: ${Math.round(rentPaid5yr / 1000)}K vs ${Math.round(equityBuilt / 1000)}K equity
            </div>
          </div>
        </div>

        <div style={{ background: '#1E293B', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>💡 DFW Buying Advantages</h2>
          {['No state income tax in Texas — your housing dollar goes further', 'DFW population growth driving consistent 5%+ annual appreciation', 'Strong rental market means buying now = future passive income', 'Building equity beats paying landlord\’s mortgage long-term'].map(tip => (
            <div key={tip} style={{ display: 'flex', gap: 10, marginBottom: 10, color: '#CBD5E1', fontSize: 14 }}>
              <span style={{ color: '#F5E642' }}>→</span> {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
