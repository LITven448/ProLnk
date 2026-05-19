import { useState } from 'react';

const cityRules = [
  { city: 'Dallas', allowed: true, permit: 'Required ($100–250/yr)', hoaNote: 'HOA may restrict', notes: 'Must collect hotel tax (7.75%)' },
  { city: 'Fort Worth', allowed: true, permit: 'Required ($150/yr)', hoaNote: 'HOA may restrict', notes: 'Must be owner-occupied or licensed' },
  { city: 'Plano', allowed: true, permit: 'Required ($200/yr)', hoaNote: 'HOA may restrict', notes: 'Strict noise ordinance enforcement' },
  { city: 'Frisco', allowed: 'Limited', permit: 'Case-by-case', hoaNote: 'Most HOAs ban STR', notes: 'Many communities banned STR 2023' },
  { city: 'McKinney', allowed: 'Limited', permit: 'Conditional use', hoaNote: 'Most HOAs ban STR', notes: 'Residential zones may prohibit' },
  { city: 'Southlake', allowed: false, permit: 'N/A', hoaNote: 'N/A', notes: 'City-wide STR ban in effect' },
  { city: 'Colleyville', allowed: false, permit: 'N/A', hoaNote: 'N/A', notes: 'City-wide STR ban in effect' },
  { city: 'Arlington', allowed: true, permit: 'Required ($175/yr)', hoaNote: 'HOA may restrict', notes: 'Near entertainment district — high demand' },
];

const nightlyRates: Record<string, { low: number; high: number; avg: number }> = {
  '1': { low: 85, high: 150, avg: 110 },
  '2': { low: 110, high: 195, avg: 148 },
  '3': { low: 155, high: 250, avg: 195 },
  '4': { low: 200, high: 350, avg: 265 },
  '5': { low: 275, high: 500, avg: 370 },
};

export default function DFWVacationRentalGuide() {
  const [bedrooms, setBedrooms] = useState('2');
  const [location, setLocation] = useState('dallas');
  const [monthlyLTR, setMonthlyLTR] = useState(2200);

  const rates = nightlyRates[bedrooms] || nightlyRates['2'];
  const locationMultiplier = location === 'arlington' ? 1.2 : location === 'downtown' ? 1.35 : location === 'suburb' ? 0.85 : 1;
  const avgNightly = Math.round(rates.avg * locationMultiplier);
  const occupancyRate = 0.68;
  const daysBooked = Math.round(30 * occupancyRate);
  const grossSTR = Math.round(avgNightly * daysBooked);
  const platformFee = Math.round(grossSTR * 0.03);
  const cleaningCosts = daysBooked / 3 * 85;
  const supplies = 120;
  const netSTR = Math.round(grossSTR - platformFee - cleaningCosts - supplies);
  const ltrNet = Math.round(monthlyLTR * 0.9);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>🏖️</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Vacation Rental Guide</h1>
        <p style={{ fontSize: 18, color: '#8899AA', maxWidth: 640, margin: '0 auto' }}>Airbnb & VRBO regulations, nightly rates, and STR vs long-term rental comparison for DFW</p>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#112240', borderRadius: 16, padding: 32, margin: '32px 0', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>📍 STR Rules by DFW City</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #F5E642' }}>
                  {['City', 'STR Allowed', 'Permit Required', 'HOA', 'Key Notes'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#F5E642', fontSize: 13 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cityRules.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1E3A5F', background: i % 2 === 0 ? 'transparent' : '#0D1F38' }}>
                    <td style={{ padding: '10px 12px', color: '#E8EDF5', fontWeight: 700, fontSize: 14 }}>{row.city}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ background: row.allowed === true ? '#1A4A2E' : row.allowed === 'Limited' ? '#3A3A1A' : '#3A1A1A', color: row.allowed === true ? '#4ADE80' : row.allowed === 'Limited' ? '#F5E642' : '#F87171', borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>
                        {row.allowed === true ? 'Yes' : row.allowed === 'Limited' ? 'Limited' : 'No'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', color: '#8899AA', fontSize: 13 }}>{row.permit}</td>
                    <td style={{ padding: '10px 12px', color: '#8899AA', fontSize: 13 }}>{row.hoaNote}</td>
                    <td style={{ padding: '10px 12px', color: '#B0C0D0', fontSize: 13 }}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, margin: '32px 0', border: '2px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🧮 STR vs Long-Term Rental Comparison</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>Bedrooms</label>
              <select value={bedrooms} onChange={e => setBedrooms(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', fontSize: 14 }}>
                {['1','2','3','4','5'].map(n => <option key={n} value={n}>{n} Bedroom{n !== '1' ? 's' : ''}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>Location Type</label>
              <select value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', fontSize: 14 }}>
                <option value="dallas">Dallas (general)</option>
                <option value="downtown">Downtown / Uptown</option>
                <option value="arlington">Arlington (near venues)</option>
                <option value="suburb">Suburb</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>Monthly Long-Term Rent ($)</label>
              <input type="number" min={800} max={8000} step={50} value={monthlyLTR} onChange={e => setMonthlyLTR(parseInt(e.target.value) || 0)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>🏠 Short-Term Rental (STR)</div>
              {[['Avg nightly rate', `$${avgNightly}`], ['Est. days booked/mo', `${daysBooked} days (68% occ.)`], ['Gross revenue', `$${grossSTR.toLocaleString()}/mo`], ['Platform fees (3%)', `-$${platformFee}`], ['Cleaning costs', `-$${Math.round(cleaningCosts)}`], ['Supplies & toiletries', `-$${supplies}`]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid #1E3A5F' }}>
                  <span style={{ color: '#8899AA', fontSize: 14 }}>{k}</span>
                  <span style={{ color: '#E8EDF5', fontSize: 14, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>Net Income</span>
                <span style={{ color: '#4ADE80', fontSize: 20, fontWeight: 800 }}>${netSTR.toLocaleString()}/mo</span>
              </div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #4ADE80' }}>
              <div style={{ color: '#4ADE80', fontWeight: 700, fontSize: 16, marginBottom: 16 }}>📋 Long-Term Rental (LTR)</div>
              {[['Monthly rent', `$${monthlyLTR.toLocaleString()}`], ['Vacancy allowance (5%)', `-$${Math.round(monthlyLTR * 0.05)}`], ['Property mgmt (5%)', `-$${Math.round(monthlyLTR * 0.05)}`]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid #1E3A5F' }}>
                  <span style={{ color: '#8899AA', fontSize: 14 }}>{k}</span>
                  <span style={{ color: '#E8EDF5', fontSize: 14, fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              <div style={{ color: '#8899AA', fontSize: 13, marginTop: 16, marginBottom: 8 }}>Advantages:</div>
              {['Predictable income', 'Less management time', 'Lower turnover costs', 'Simpler regulations'].map(a => (
                <div key={a} style={{ color: '#B0C0D0', fontSize: 13, marginBottom: 4 }}>✓ {a}</div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                <span style={{ color: '#4ADE80', fontWeight: 700 }}>Net Income</span>
                <span style={{ color: '#4ADE80', fontSize: 20, fontWeight: 800 }}>${ltrNet.toLocaleString()}/mo</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16, background: '#1A3A50', borderRadius: 10, padding: 16, textAlign: 'center' }}>
            <span style={{ color: '#8899AA', fontSize: 14 }}>STR Premium: </span>
            <span style={{ color: netSTR > ltrNet ? '#4ADE80' : '#F87171', fontSize: 18, fontWeight: 700 }}>
              {netSTR > ltrNet ? `+$${(netSTR - ltrNet).toLocaleString()}/mo more than LTR` : `$${(ltrNet - netSTR).toLocaleString()}/mo less than LTR`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
