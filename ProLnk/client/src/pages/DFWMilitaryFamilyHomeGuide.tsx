import { useState } from 'react';

const militaryBases = [
  { name: 'NAS Fort Worth JRB', branch: 'Navy/Air Force', city: 'Fort Worth', bah: '$1,847' },
  { name: 'Dyess AFB', branch: 'Air Force', city: 'Abilene (2hr)', bah: '$1,654' },
  { name: 'Sheppard AFB', branch: 'Air Force', city: 'Wichita Falls (2hr)', bah: '$1,512' },
];

const stayLengths = ['Under 1 year', '1–2 years', '3+ years (stable orders)'];
const serviceStatuses = ['Active Duty', 'Reserve/Guard', 'Veteran/Retiring', 'Surviving Spouse'];

const recommendations: Record<string, Record<string, { action: string; vaDetail: string; neighborhoods: string; resources: string }>> = {
  'Under 1 year': {
    'Active Duty': { action: 'Rent near base', vaDetail: 'Save VA entitlement for permanent home — renting preserves your full COE benefit', neighborhoods: 'White Settlement, Lake Worth, Saginaw', resources: 'NAS JRB Housing Office, Military One Source' },
    'Reserve/Guard': { action: 'Rent short-term', vaDetail: 'VA loan requires active duty cert — confirm eligibility with lender', neighborhoods: 'Haltom City, Richland Hills, North Richland Hills', resources: 'TX Veterans Commission, TexVet' },
    'Veteran/Retiring': { action: 'Consider buying', vaDetail: 'No active duty time constraint — full VA loan access now', neighborhoods: 'Benbrook, River Oaks, Westover Hills', resources: 'TX Veterans Land Board, Dallas VA Regional Office' },
    'Surviving Spouse': { action: 'Consult HUD-approved counselor', vaDetail: 'May qualify for VA loan with 0% down — free counseling available', neighborhoods: 'Euless, Bedford, Hurst', resources: 'DAV, TAPS, Gold Star Families' },
  },
  '1–2 years': {
    'Active Duty': { action: 'Rent with lease flexibility', vaDetail: 'Servicemembers Civil Relief Act protects early lease exit if PCS orders arrive', neighborhoods: 'Keller, Southlake, Colleyville', resources: 'Legal Assistance Office on base, JAG Corps' },
    'Reserve/Guard': { action: 'Buy if financially ready', vaDetail: 'Activated reserve members qualify — confirm 90+ days continuous service', neighborhoods: 'Grapevine, Coppell, Flower Mound', resources: 'TX Adjutant General, Military Saves' },
    'Veteran/Retiring': { action: 'Buy with VA loan', vaDetail: '0% down, no PMI, competitive rates — DFW median home $385K with VA = $0 down', neighborhoods: 'Arlington, Grand Prairie, Mansfield', resources: 'VBA Dallas, TX Veterans Commission' },
    'Surviving Spouse': { action: 'Buy with VA IRRRL if refinancing', vaDetail: 'Unremarried surviving spouses retain VA loan benefit permanently', neighborhoods: 'Irving, Carrollton, Farmers Branch', resources: 'VSO offices, Gold Star Wives of America' },
  },
  '3+ years (stable orders)': {
    'Active Duty': { action: 'Buy with VA loan', vaDetail: 'DFW appreciation averages 6–8%/yr — 3 years builds equity even if you PCS later', neighborhoods: 'Fort Worth near JRB: Benbrook, Aledo, Azle', resources: 'NAS JRB Relocation Office, HomeFront' },
    'Reserve/Guard': { action: 'Buy — strong equity play', vaDetail: 'TX property tax exemptions for veterans — up to 100% disability = $0 property tax', neighborhoods: 'Weatherford, Azle, Springtown (affordable + large lots)', resources: 'Parker County Veterans Services, TX GLO' },
    'Veteran/Retiring': { action: 'Buy — maximize TX benefits', vaDetail: 'TX Hazlewood Act + property tax exemption + VA loan = powerful combination', neighborhoods: 'Burleson, Crowley, Joshua — affordable + family-friendly', resources: 'TX Veterans Land Board low-interest loans, VFW' },
    'Surviving Spouse': { action: 'Buy with full support', vaDetail: 'TX Hazlewood exemption for surviving spouse children — free college tuition', neighborhoods: 'Cleburne, Midlothian, Waxahachie — lower cost, strong communities', resources: 'American Gold Star Mothers, TAPS' },
  },
};

export default function DFWMilitaryFamilyHomeGuide() {
  const [status, setStatus] = useState('');
  const [stayLength, setStayLength] = useState('');
  const result = status && stayLength ? recommendations[stayLength]?.[status] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem' }}>🎖️</div>
          <h1 style={{ fontSize: '2.2rem', color: '#F5E642', margin: '0.5rem 0' }}>DFW Military Family Home Guide</h1>
          <p style={{ color: '#8A9BB5', fontSize: '1.05rem' }}>Serving those who serve — VA loans, base proximity, and DFW military community resources</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {militaryBases.map(b => (
            <div key={b.name} style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem' }}>✈️</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.9rem', marginTop: 4 }}>{b.name}</div>
              <div style={{ color: '#8A9BB5', fontSize: '0.8rem' }}>{b.branch} · {b.city}</div>
              <div style={{ color: '#5BA4F5', fontSize: '0.85rem', marginTop: 4 }}>BAH: {b.bah}/mo</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.2rem' }}>🧮 Buy vs Rent Advisor</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ color: '#8A9BB5', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Service Status</label>
              <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #2A4A7F', borderRadius: 8, padding: '0.6rem', fontSize: '0.95rem' }}>
                <option value=''>Select status...</option>
                {serviceStatuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8A9BB5', fontSize: '0.85rem', display: 'block', marginBottom: 6 }}>Expected DFW Assignment Length</label>
              <select value={stayLength} onChange={e => setStayLength(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #2A4A7F', borderRadius: 8, padding: '0.6rem', fontSize: '0.95rem' }}>
                <option value=''>Select length...</option>
                {stayLengths.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ marginTop: '1.5rem', background: '#0A1628', borderRadius: 10, padding: '1.2rem', borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.8rem' }}>📋 Recommendation: {result.action}</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#5BA4F5' }}>🏛️ VA Loan: </span>{result.vaDetail}</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#5BA4F5' }}>📍 DFW Neighborhoods: </span>{result.neighborhoods}</div>
              <div><span style={{ color: '#5BA4F5' }}>🤝 Resources: </span>{result.resources}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>⭐ DFW Military Community Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            {['TX waives property tax up to 100% for disabled veterans', 'Hazlewood Act: free college for veterans + dependents', 'SCRA protects active duty from foreclosure & lease breaks', 'DFW has 200,000+ veterans — strong military community', 'VA loans: no PMI, 0% down, competitive rates', 'Fort Worth JRB serves Navy Reserve + Reserve units'].map(f => (
              <div key={f} style={{ background: '#0A1628', borderRadius: 8, padding: '0.7rem', fontSize: '0.85rem', color: '#8A9BB5' }}>✅ {f}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
