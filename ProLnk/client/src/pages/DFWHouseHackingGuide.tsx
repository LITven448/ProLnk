import { useState } from 'react';

export default function DFWHouseHackingGuide() {
  const [propPrice, setPropPrice] = useState(350000);
  const [rentalUnits, setRentalUnits] = useState(1);
  const [rentPerUnit, setRentPerUnit] = useState(1400);

  const downPayment = propPrice * 0.035;
  const loanAmount = propPrice - downPayment;
  const monthlyRate = 0.07 / 12;
  const n = 360;
  const monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
  const totalRentalIncome = rentalUnits * rentPerUnit;
  const effectivePayment = Math.max(0, monthlyMortgage - totalRentalIncome);
  const cashFlow = totalRentalIncome - monthlyMortgage;
  const offset = Math.min(100, (totalRentalIncome / monthlyMortgage) * 100);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 12, fontSize: 13, color: '#F5E642' }}>🏠 DFW REAL ESTATE INVESTOR SERIES</div>
        <h1 style={{ fontSize: 38, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          DFW House Hacking Guide
        </h1>
        <p style={{ color: '#8A9BB5', fontSize: 17, marginBottom: 40 }}>
          Buy a duplex or triplex in DFW, live in one unit, rent the others — and dramatically reduce or eliminate your housing payment.
        </p>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🏘️ What Is House Hacking?</h2>
          <p style={{ color: '#C4D0E3', lineHeight: 1.7, marginBottom: 16 }}>
            House hacking means purchasing a small multi-unit property (2–4 units), occupying one unit as your primary residence, 
            and renting the remaining units to tenants. Your tenants help pay your mortgage — sometimes entirely.
          </p>
          <p style={{ color: '#C4D0E3', lineHeight: 1.7 }}>
            In DFW, this strategy is especially powerful because rental demand remains extremely high across Dallas, Fort Worth, 
            Arlington, Irving, and surrounding suburbs. Vacancy rates under 5% mean your units stay occupied.
          </p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>📍 Where to Find DFW Duplexes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {[
              { area: 'Oak Cliff (Dallas)', note: 'Strong rental demand, improving values' },
              { area: 'East Fort Worth', note: 'Lower entry prices, solid rents' },
              { area: 'Garland / Mesquite', note: 'Affordable duplexes, growing population' },
              { area: 'South Dallas Corridors', note: 'High cap rates, longer hold horizon' },
              { area: 'Irving / Grand Prairie', note: 'Central DFW, diverse tenant pool' },
              { area: 'Haltom City / Richland Hills', note: 'Value-add opportunities, near TCU' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 12, padding: 16, borderLeft: '3px solid #F5E642' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.area}</div>
                <div style={{ fontSize: 13, color: '#8A9BB5' }}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🏦 FHA Loan for House Hacking</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 }}>
            {[
              { label: 'Down Payment', value: '3.5% only' },
              { label: 'Credit Score Min', value: '580 (3.5% down)' },
              { label: 'Max Units', value: 'Up to 4 units' },
              { label: 'Must Occupy', value: '1 unit as primary' },
            ].map((item, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>{item.value}</div>
                <div style={{ fontSize: 13, color: '#8A9BB5' }}>{item.label}</div>
              </div>
            ))}
          </div>
          <p style={{ color: '#C4D0E3', lineHeight: 1.7, fontSize: 14 }}>
            FHA lenders can count 75% of projected rental income toward your qualifying income, reducing the income needed 
            to qualify. This makes multi-family far more accessible than conventional loans suggest.
          </p>
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: '#F5E642' }}>🧮 House Hack Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#8A9BB5' }}>Property Price ($)</label>
              <input type="range" min={150000} max={800000} step={10000} value={propPrice}
                onChange={e => setPropPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>${propPrice.toLocaleString()}</div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#8A9BB5' }}>Rental Units (not yours)</label>
              <input type="range" min={1} max={3} step={1} value={rentalUnits}
                onChange={e => setRentalUnits(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{rentalUnits} unit{rentalUnits > 1 ? 's' : ''}</div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#8A9BB5' }}>Rent Per Unit ($/mo)</label>
              <input type="range" min={800} max={2500} step={50} value={rentPerUnit}
                onChange={e => setRentPerUnit(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642' }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>${rentPerUnit.toLocaleString()}/mo</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { label: 'Down Payment (3.5%)', value: `$${Math.round(downPayment).toLocaleString()}` },
              { label: 'Monthly Mortgage (~7%)', value: `$${Math.round(monthlyMortgage).toLocaleString()}` },
              { label: 'Total Rental Income', value: `$${totalRentalIncome.toLocaleString()}/mo` },
              { label: 'Mortgage Offset', value: `${Math.round(offset)}%` },
              { label: 'Your Effective Payment', value: `$${Math.round(effectivePayment).toLocaleString()}/mo`, highlight: true },
              { label: 'Monthly Cash Flow', value: cashFlow >= 0 ? `+$${Math.round(cashFlow).toLocaleString()}` : `-$${Math.round(Math.abs(cashFlow)).toLocaleString()}` },
            ].map((item, i) => (
              <div key={i} style={{ background: item.highlight ? '#1A2E4A' : '#0A1628', borderRadius: 12, padding: 16, border: item.highlight ? '2px solid #F5E642' : 'none' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: item.highlight ? '#F5E642' : '#E8EDF5', marginBottom: 4 }}>{item.value}</div>
                <div style={{ fontSize: 12, color: '#8A9BB5' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

