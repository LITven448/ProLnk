import { useState } from 'react';

const cityData: Record<string, { allowed: boolean; registration: string; notes: string }> = {
  Dallas: { allowed: true, registration: 'Required — STR permit + hotel tax registration', notes: 'Must register annually, 13% hotel occupancy tax applies' },
  'Fort Worth': { allowed: true, registration: 'Required — STR license + tax ID', notes: 'Zoning check required, some areas restricted' },
  Plano: { allowed: true, registration: 'Required — annual registration', notes: 'Max 2 guests per bedroom, parking rules apply' },
  Frisco: { allowed: false, registration: 'Effectively prohibited in most residential zones', notes: 'Strict enforcement, heavy fines for violations' },
  McKinney: { allowed: false, registration: 'Restricted — limited zones only', notes: 'Most residential STRs not permitted' },
  Arlington: { allowed: true, registration: 'Required — permit + HOT tax', notes: 'Entertainment district demand is high near Globe Life Field' },
  Irving: { allowed: true, registration: 'Required — zoning dependent', notes: 'Near DFW airport — strong STR demand' },
};

const eventPremiums: Record<string, number> = {
  'State Fair of Texas (Oct)': 40,
  'New Years Eve': 60,
  'Dallas Cowboys Home Games': 25,
  'ACM Awards / Country Music Events': 30,
  'Major Concerts (Toyota Music Factory)': 35,
};

function calcSTR(type: string, city: string, beds: number) {
  const base = beds * 85;
  const typeMulti = type === 'Entire Home' ? 1.4 : type === 'Private Room' ? 0.7 : 0.5;
  const cityBonus = ['Irving', 'Dallas', 'Arlington'].includes(city) ? 1.15 : 1.0;
  const nightly = Math.round(base * typeMulti * cityBonus);
  const occupancy = type === 'Entire Home' ? 68 : 55;
  const monthly = Math.round((nightly * 30 * occupancy) / 100);
  const longTerm = beds * 900 + (type === 'Entire Home' ? 400 : 0);
  return { nightly, occupancy, monthly, longTerm };
}

export default function DFWAirbnbHostGuide() {
  const [city, setCity] = useState('Dallas');
  const [propType, setPropType] = useState('Entire Home');
  const [beds, setBeds] = useState(2);
  const result = calcSTR(propType, city, beds);
  const cityInfo = cityData[city];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'Inter, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 12, fontSize: 13, color: '#F5E642', fontWeight: 600, letterSpacing: 2 }}>DFW SHORT-TERM RENTAL GUIDE</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, color: '#fff' }}>Airbnb Host Guide — Dallas‑Fort Worth</h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 40, lineHeight: 1.7 }}>Which DFW cities allow STRs, what guests expect, and how much you can actually earn.</p>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🏙️ STR Status by DFW City</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {Object.entries(cityData).map(([c, d]) => (
              <div key={c} style={{ background: '#111E35', borderRadius: 12, padding: 20, borderLeft: `4px solid ${d.allowed ? '#22C55E' : '#EF4444'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{c}</span>
                  <span style={{ fontSize: 12, background: d.allowed ? '#14532D' : '#7F1D1D', color: d.allowed ? '#86EFAC' : '#FCA5A5', padding: '2px 10px', borderRadius: 20, fontWeight: 600 }}>{d.allowed ? 'ALLOWED' : 'RESTRICTED'}</span>
                </div>
                <div style={{ fontSize: 13, color: '#64748B', marginBottom: 6 }}>{d.registration}</div>
                <div style={{ fontSize: 12, color: '#94A3B8′ }}>{d.notes}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📅 Event Premium Pricing (DFW)</h2>
          <div style={{ background: '#111E35', borderRadius: 12, overflow: 'hidden' }}>
            {Object.entries(eventPremiums).map(([ev, pct]) => (
              <div key={ev} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid #1E2D45′ }}>
                <span style={{ color: '#E8EDF5′ }}>🎉 {ev}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>+{pct}% rate</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🛋️ What DFW STR Guests Expect</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginTop: 16 }}>
            {[['📶', 'Fast WiFi (500+ Mbps)', 'Non-negotiable in 2026'],['📺', 'Smart TV + Streaming', '65″+ preferred'],['🔑', 'Keypad / Smart Lock', 'Self check-in expected'],['❄️', 'High-capacity AC', 'DFW summers are brutal'],['☕', 'Coffee Setup', 'Keurig + drip both'],['🧹', 'Pro Cleaning', '$120-200/turnover']].map(([ico, title, sub]) => (
              <div key={title as string} style={{ background: '#111E35', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{ico as string}</div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{title as string}</div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{sub as string}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#111E35', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 24 }}>🧮 STR Income Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ fontSize: 12, color: '#64748B', display: 'block', marginBottom: 6 }}>CITY</label>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E2D45', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                {Object.keys(cityData).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#64748B', display: 'block', marginBottom: 6 }}>PROPERTY TYPE</label>
              <select value={propType} onChange={e => setPropType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E2D45', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                {['Entire Home', 'Private Room', 'Shared Room'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#64748B', display: 'block', marginBottom: 6 }}>BEDROOMS</label>
              <select value={beds} onChange={e => setBeds(Number(e.target.value))} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E2D45', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                {[1,2,3,4,5].map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
          </div>
          {!cityInfo.allowed ? (
            <div style={{ background: '#7F1D1D', borderRadius: 10, padding: 20, color: '#FCA5A5′ }}>⛔ {city} restricts STRs in most residential zones. Consult a local attorney before listing.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
              {[['Est. Nightly Rate', `$${result.nightly}`],['Avg. Occupancy', `${result.occupancy}%`],['Est. Monthly STR', `$${result.monthly.toLocaleString()}`],['Long-Term Rental', `$${result.longTerm.toLocaleString()}/mo`]].map(([label, val]) => (
                <div key={label as string} style={{ background: '#0A1628', borderRadius: 10, padding: 20, textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{val as string}</div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>{label as string}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
