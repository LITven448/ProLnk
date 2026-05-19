import { useState } from 'react';

const dfwCities = ['Dallas','Fort Worth','Plano','Frisco','McKinney','Allen','Richardson','Garland','Mesquite','Irving','Arlington','Carrollton','Lewisville','Denton','Flower Mound','Grapevine','Southlake','Colleyville','Keller','Addison','Coppell','Rockwall','Rowlett','Wylie','Prosper','Celina','Little Elm','The Colony','Grand Prairie','Mansfield'];

const allElectricCities = ['Prosper','Celina','Little Elm','Wylie'];

type GasInfo = {
  available: boolean;
  provider: string;
  phone: string;
  setupNote: string;
  budgetBilling: boolean;
  avgBill: string;
};

function getGasInfo(city: string): GasInfo {
  if (allElectricCities.includes(city)) {
    return { available: false, provider: 'N/A — All-electric area', phone: 'N/A', setupNote: `${city} is a newer outer suburb where many neighborhoods were built all-electric. No natural gas infrastructure in most subdivisions. Confirm with your builder or home inspector.`, budgetBilling: false, avgBill: 'N/A — all-electric home' };
  }
  const avgBill = ['Denton','Fort Worth','Mansfield','Grand Prairie'].includes(city)
    ? '$40–120/mo (higher winter heat demand)'
    : '$35–95/mo (winter heating Dec–Feb)';
  return {
    available: true,
    provider: 'Atmos Energy',
    phone: '888-286-6700',
    setupNote: `Call Atmos Energy to start service at ${city}. Have your address and move-in date ready. Service typically connects within 2 business days. A tech visit is required for first-time activation at an address — someone must be home. $35–60 connection fee applies.`,
    budgetBilling: true,
    avgBill,
  };
}

export default function DFWNaturalGasServiceGuide() {
  const [city, setCity] = useState('');
  const info = city ? getGasInfo(city) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔥</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Natural Gas Service Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Atmos Energy setup, billing, budget plans, and all-electric area info for DFW</p>
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', marginTop: 0 }}>🏢 No Choice — Atmos Energy Has a Monopoly</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>Unlike electricity, natural gas in DFW is <strong style={{ color: '#F5E642′ }}>not deregulated</strong>. If your home has gas, <strong style={{ color: '#F5E642' }}>Atmos Energy</strong> is your only option — no shopping required. Atmos is regulated by the Texas Railroad Commission (not an actual railroad) and rates are set by the state.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📄</div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>Reading Your Atmos Bill</div>
            <ul style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0, paddingLeft: '1.25rem', lineHeight: 1.8 }}>
              <li>Customer Charge: ~$7/mo flat fee</li>
              <li>Distribution Charge: per CCF (hundred cubic feet)</li>
              <li>Gas Cost Recovery: commodity price — varies monthly</li>
              <li>Taxes: state + local, ~8–10% of bill</li>
            </ul>
          </div>
          <div style={{ background: '#0f2040', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📅</div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.25rem' }}>Budget Billing</div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0, lineHeight: 1.7 }}>Atmos Budget Bill spreads annual costs evenly — great for avoiding January/February spikes. Atmos averages your last 12 months and bills you the same amount each month. Settle up or get credit annually. Call 888-286-6700 to enroll.</p>
          </div>
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', marginTop: 0 }}>📊 DFW Seasonal Gas Usage</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
            {[
              { season: 'Summer', months: 'Jun–Sep', use: 'Very Low', note: 'Water heater only', color: '#22c55e' },
              { season: 'Fall', months: 'Oct–Nov', use: 'Low–Moderate', note: 'Start of heating', color: '#eab308′ },
              { season: 'Winter', months: 'Dec–Feb', use: 'High', note: 'Heating dominant', color: '#ef4444′ },
              { season: 'Spring', months: 'Mar–May', use: 'Low', note: 'Mild weather', color: '#22c55e' },
            ].map(s => (
              <div key={s.season} style={{ background: '#0A1628', borderRadius: 8, padding: '0.75rem', textAlign: 'center' }}>
                <div style={{ color: s.color, fontWeight: 700, fontSize: '0.85rem' }}>{s.season}</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{s.months}</div>
                <div style={{ color: '#e2e8f0', fontSize: '0.8rem', marginTop: '0.25rem' }}>{s.use}</div>
                <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{s.note}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginTop: 0 }}>🔍 Check Gas Availability in Your City</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Your DFW City</label>
            <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', maxWidth: 300, background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem' }}>
              <option value=''>Select city</option>
              {dfwCities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {info && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', border: `1px solid ${info.available ? '#1e3a5f' : '#ef4444'}` }}>
              {info.available ? (
                <>
                  <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: '0.75rem' }}>✅ Natural Gas Available in {city}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div>
                      <div style={{ color: '#64748b', fontSize: '0.75rem' }}>PROVIDER</div>
                      <div style={{ color: '#F5E642', fontWeight: 600 }}>{info.provider}</div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b', fontSize: '0.75rem' }}>PHONE</div>
                      <div style={{ color: '#F5E642', fontWeight: 600 }}>{info.phone}</div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b', fontSize: '0.75rem' }}>AVG MONTHLY BILL</div>
                      <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{info.avgBill}</div>
                    </div>
                    <div>
                      <div style={{ color: '#64748b', fontSize: '0.75rem' }}>BUDGET BILLING</div>
                      <div style={{ color: '#22c55e', fontWeight: 600' }}>✅ Available — call to enroll</div>
                    </div>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{info.setupNote}</div>
                </>
              ) : (
                <>
                  <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: '0.5rem' }}>⚡ All-Electric Area — No Gas Available</div>
                  <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{info.setupNote}</div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
