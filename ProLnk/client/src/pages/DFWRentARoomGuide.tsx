import { useState } from 'react';

const CITIES = ['Dallas', 'Fort Worth', 'Arlington', 'Plano', 'Frisco', 'McKinney', 'Irving', 'Garland'];
const HOME_TYPES = ['Single Family', 'Townhome', 'Condo'];

const INCOME_MAP: Record<string, Record<string, number>> = {
  Dallas: { '1': 850, '2': 1400, '3+': 1900 },
  Frisco: { '1': 950, '2': 1550, '3+': 2100 },
  Plano: { '1': 900, '2': 1500, '3+': 2000 },
  McKinney: { '1': 875, '2': 1450, '3+': 1950 },
  'Fort Worth': { '1': 800, '2': 1300, '3+': 1750 },
  Arlington: { '1': 775, '2': 1250, '3+': 1700 },
  Irving: { '1': 825, '2': 1350, '3+': 1800 },
  Garland: { '1': 750, '2': 1200, '3+': 1650 },
};

const CHECKLIST = [
  'Written lease agreement (month-to-month recommended)',
  'Background & credit check on tenant',
  'Proof of renter\’s insurance requirement',
  'Document home condition with photos before move-in',
  'Separate key and access protocols',
  'Report rental income on Schedule E (IRS Form 1040)',
  'Homestead exemption: primary residence rules still apply',
  'Notify homeowner\’s insurance carrier',
];

export default function DFWRentARoomGuide() {
  const [homeType, setHomeType] = useState('');
  const [rooms, setRooms] = useState('');
  const [city, setCity] = useState('');
  const [result, setResult] = useState<{ income: number; feasible: string } | null>(null);

  function calculate() {
    if (!city || !rooms) return;
    const income = INCOME_MAP[city]?.[rooms] ?? 900;
    const feasible = homeType === 'Condo' ? 'Check HOA rules before listing' : 'Eligible — no landlord license required';
    setResult({ income, feasible });
  }

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#1a1a2e' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32, color: '#fff' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', color: '#F5E642′ }}>Rent a Room in Your DFW Home</h1>
          <p style={{ margin: 0, opacity: 0.85, lineHeight: 1.6 }}>Texas law makes room rentals straightforward for primary residence owners. No landlord license required — but you do need to handle taxes, insurance, and a solid rental agreement.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>⚖️ Texas Law Basics</h2>
          <ul style={{ lineHeight: 2, paddingLeft: 20, margin: 0 }}>
            <li>No landlord license required for renting rooms in your primary residence</li>
            <li>Room rental income is taxable — report on Schedule E</li>
            <li>Homestead exemption is preserved as long as you continue living there</li>
            <li>Tenant has legal rights even without a written lease — always get one in writing</li>
            <li>HOA rules may restrict room rentals in condos or some subdivisions</li>
          </ul>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>💰 Income & Feasibility Calculator</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Home Type</label>
              <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 15 }}>
                <option value="">Select type</option>
                {HOME_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Rooms Available</label>
              <select value={rooms} onChange={e => setRooms(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 15 }}>
                <option value="">Select rooms</option>
                <option value="1″>1 Room</option>
                <option value="2″>2 Rooms</option>
                <option value="3+">3+ Rooms</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>DFW City</label>
              <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 15 }}>
                <option value="">Select city</option>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 16, cursor: 'pointer', width: '100%' }}>Calculate Income Potential</button>
          {result && (
            <div style={{ marginTop: 20, background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#166534', marginBottom: 6 }}>~${result.income.toLocaleString()}/month</div>
              <div style={{ color: '#166534', fontWeight: 600 }}>{result.feasible}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>✅ Legal Checklist</h2>
          <ul style={{ lineHeight: 2, paddingLeft: 20, margin: 0 }}>
            {CHECKLIST.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
