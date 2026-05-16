import { useState } from 'react';

const dfwCities = ['Dallas','Fort Worth','Plano','Frisco','McKinney','Allen','Richardson','Garland','Mesquite','Irving','Arlington','Carrollton','Lewisville','Denton','Flower Mound','Grapevine','Southlake','Colleyville','Keller','Addison','Coppell','Rockwall','Rowlett','Wylie','Prosper','Celina','Little Elm','The Colony','Grand Prairie','Mansfield'];

type CityWaterInfo = {
  provider: string;
  phone: string;
  setupProcess: string;
  hardness: string;
  hardnessLevel: 'Soft' | 'Moderate' | 'Hard' | 'Very Hard';
  notes: string;
};

const waterData: Record<string, CityWaterInfo> = {
  Dallas: { provider: 'Dallas Water Utilities', phone: '214-651-1441', setupProcess: 'Set up online at dallascityhall.com or call. Requires ID, deposit ($130 renters). Service starts 1–2 business days.', hardness: '~170 mg/L (10 gpg)', hardnessLevel: 'Hard', notes: 'Dallas sources water from multiple lakes (Ray Hubbard, Lewisville, etc.) via NTMWD and direct. Hard water causes scale buildup — consider water softener.' },
  Plano: { provider: 'City of Plano Water (sourced from NTMWD)', phone: '972-941-7106', setupProcess: 'Setup at plano.gov/water or call. 1–2 business days lead time.', hardness: '~220 mg/L (13 gpg)', hardnessLevel: 'Very Hard', notes: 'NTMWD water is among the hardest in DFW. Water softener strongly recommended. Good for drinking quality (low contaminants), tough on appliances.' },
  Frisco: { provider: 'City of Frisco (NTMWD source)', phone: '972-292-5000', setupProcess: 'Setup at frisco.gov or call utility billing. New construction may require inspection before activation.', hardness: '~200 mg/L (12 gpg)', hardnessLevel: 'Very Hard', notes: 'Same NTMWD source as Plano. Hard water is the main household issue. Annual water quality report available at frisco.gov.' },
  McKinney: { provider: 'City of McKinney Utilities', phone: '972-547-7350', setupProcess: 'Call or visit mckinneytexas.org. $75 deposit for renters. Service typically starts same or next day.', hardness: '~185 mg/L (11 gpg)', hardnessLevel: 'Hard', notes: 'McKinney blends NTMWD and local groundwater. Hardness varies seasonally. Check your annual Consumer Confidence Report for current levels.' },
  Arlington: { provider: 'City of Arlington Water', phone: '817-275-5931', setupProcess: 'Setup online or by phone. Renters need landlord account number. 1 business day activation.', hardness: '~155 mg/L (9 gpg)', hardnessLevel: 'Hard', notes: 'Arlington sources from Trinity River Authority. Slightly softer than northeast DFW but still classified as hard. Lime buildup on fixtures is common.' },
  default: { provider: 'Contact your city utility billing department', phone: 'Search "[your city] water utility"', setupProcess: 'Typically requires ID, deposit (varies $50–200), 1–2 business day lead time. Set up before closing or move-in day.', hardness: '~150–220 mg/L typical for DFW', hardnessLevel: 'Hard', notes: 'DFW water is generally hard due to limestone geology. Expect scale buildup on faucets, showerheads, and in appliances. Water softener or filter recommended.' },
};

const hardnessColors: Record<string, string> = { 'Soft': '#22c55e', 'Moderate': '#eab308', 'Hard': '#f97316', 'Very Hard': '#ef4444' };

function getCityData(city: string): CityWaterInfo {
  return waterData[city] || { ...waterData.default, provider: `${city} Water Utility` };
}

export default function DFWWaterServiceGuide() {
  const [city, setCity] = useState('');
  const data = city ? getCityData(city) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>💧</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Water Service Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Water providers, hardness levels, setup process, and quality data by DFW city</p>
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', marginTop: 0 }}>🏗️ How DFW Water Works</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>Most DFW suburbs get water from the <strong style={{ color: '#F5E642' }}>North Texas Municipal Water District (NTMWD)</strong> or the <strong style={{ color: '#F5E642' }}>Trinity River Authority</strong>, then re-deliver it through their city utility system. You set up service with your city — not NTMWD directly. Water bills typically combine water + sewer usage.</p>
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1rem', marginTop: 0 }}>⚗️ DFW Water Hardness — What You Need to Know</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, margin: '0 0 0.75rem' }}>DFW sits on limestone — <strong style={{ color: '#ef4444' }}>water is hard across the entire metro</strong>. Hard water is safe to drink but causes:</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {['White scale on faucets & showerheads','Reduced dishwasher/appliance lifespan','Soap lather issues & dry skin','Water heater efficiency loss'].map(item => (
              <div key={item} style={{ background: '#0A1628', borderRadius: 6, padding: '0.4rem 0.75rem', color: '#94a3b8', fontSize: '0.9rem' }}>⚠️ {item}</div>
            ))}
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: '0.75rem 0 0' }}>💡 A whole-home water softener ($800–1,500 installed) pays for itself in appliance protection in most DFW homes.</p>
        </div>
        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', marginTop: 0 }}>🔍 Look Up Your City's Water Info</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Your DFW City</label>
            <select value={city} onChange={e => setCity(e.target.value)} style={{ width: '100%', maxWidth: 300, background: '#0A1628', color: '#e2e8f0', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem' }}>
              <option value=''>Select city</option>
              {dfwCities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {data && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.75rem' }}>📍 {city} Water Service</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem' }}>PROVIDER</div>
                  <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{data.provider}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem' }}>PHONE</div>
                  <div style={{ color: '#F5E642', fontWeight: 600 }}>{data.phone}</div>
                </div>
                <div>
                  <div style={{ color: '#64748b', fontSize: '0.75rem' }}>WATER HARDNESS</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{data.hardness}</span>
                    <span style={{ background: hardnessColors[data.hardnessLevel], color: '#0A1628', fontSize: '0.75rem', fontWeight: 700, padding: '0.1rem 0.4rem', borderRadius: 4 }}>{data.hardnessLevel}</span>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.2rem' }}>SETUP PROCESS</div>
                <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>{data.setupProcess}</div>
              </div>
              <div style={{ background: '#0f2040', borderRadius: 6, padding: '0.75rem', marginTop: '0.5rem' }}>
                <div style={{ color: '#64748b', fontSize: '0.75rem', marginBottom: '0.2rem' }}>NOTES</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{data.notes}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
