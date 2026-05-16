import { useState } from 'react';

const CITY_DATA: Record<string, { electricBase: number; gasBase: number; waterBase: number; label: string }> = {
  Dallas: { electricBase: 148, gasBase: 62, waterBase: 48, label: 'Dallas' },
  'Fort Worth': { electricBase: 138, gasBase: 58, waterBase: 44, label: 'Fort Worth' },
  Plano: { electricBase: 152, gasBase: 64, waterBase: 52, label: 'Plano' },
  Frisco: { electricBase: 158, gasBase: 66, waterBase: 55, label: 'Frisco' },
  Arlington: { electricBase: 142, gasBase: 60, waterBase: 46, label: 'Arlington' },
  McKinney: { electricBase: 155, gasBase: 65, waterBase: 53, label: 'McKinney' },
  Irving: { electricBase: 144, gasBase: 61, waterBase: 47, label: 'Irving' },
  Denton: { electricBase: 132, gasBase: 56, waterBase: 42, label: 'Denton' },
};

const EFFICIENCY_MULT: Record<string, number> = { Low: 1.35, Average: 1.0, 'High (ENERGY STAR)': 0.72, 'Premium (Solar+)': 0.45 };
const SIZE_MULT: Record<string, number> = { '< 1,200 sqft': 0.7, '1,200–2,000 sqft': 0.9, '2,000–3,000 sqft': 1.0, '3,000–4,500 sqft': 1.3, '4,500+ sqft': 1.7 };

const SEASONAL = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ELECTRIC_SEASON = [0.75, 0.7, 0.85, 1.0, 1.2, 1.5, 1.7, 1.65, 1.35, 1.0, 0.8, 0.72];
const GAS_SEASON = [1.8, 1.6, 1.2, 0.7, 0.5, 0.4, 0.35, 0.35, 0.5, 0.8, 1.3, 1.7];

export default function DFWUtilityBillEstimator() {
  const [city, setCity] = useState('Dallas');
  const [efficiency, setEfficiency] = useState('Average');
  const [size, setSize] = useState('2,000–3,000 sqft');

  const d = CITY_DATA[city];
  const em = EFFICIENCY_MULT[efficiency];
  const sm = SIZE_MULT[size];
  const electric = Math.round(d.electricBase * em * sm);
  const gas = Math.round(d.gasBase * em * sm);
  const water = Math.round(d.waterBase * sm);
  const trash = 32;
  const internet = 65;
  const monthly = electric + gas + water + trash + internet;
  const annual = monthly * 12;

  const barMax = Math.max(...ELECTRIC_SEASON.map((v, i) => Math.round(d.electricBase * em * sm * v) + Math.round(d.gasBase * em * sm * GAS_SEASON[i])));

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 36, marginBottom: 4 }}>⚡</div>
        <h1 style={{ color: '#F5E642', fontSize: '1.8rem', marginBottom: 4 }}>DFW Utility Bill Estimator</h1>
        <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>Annual utility costs by DFW city, home size, and efficiency level with seasonal patterns.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
          <div>
            <label style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 600 }}>City</label>
            <select value={city} onChange={e => setCity(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', background: '#1a2a44', color: '#fff', border: '1px solid #2a3a54', borderRadius: 6, marginTop: 4 }}>
              {Object.keys(CITY_DATA).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 600 }}>Home Size</label>
            <select value={size} onChange={e => setSize(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', background: '#1a2a44', color: '#fff', border: '1px solid #2a3a54', borderRadius: 6, marginTop: 4 }}>
              {Object.keys(SIZE_MULT).map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 600 }}>Efficiency</label>
            <select value={efficiency} onChange={e => setEfficiency(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', background: '#1a2a44', color: '#fff', border: '1px solid #2a3a54', borderRadius: 6, marginTop: 4 }}>
              {Object.keys(EFFICIENCY_MULT).map(e => <option key={e}>{e}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {[{ e: '⚡', label: 'Electric', val: electric, color: '#F5E642' }, { e: '🔥', label: 'Gas', val: gas, color: '#fb923c' }, { e: '💧', label: 'Water', val: water, color: '#60a5fa' }, { e: '🗑️', label: 'Trash', val: trash, color: '#a3e635' }, { e: '📡', label: 'Internet', val: internet, color: '#c084fc' }].map(item => (
            <div key={item.label} style={{ background: '#1a2a44', borderRadius: 8, padding: '0.8rem', textAlign: 'center' }}>
              <div>{item.e}</div>
              <div style={{ color: item.color, fontWeight: 700, fontSize: '1.1rem' }}>${item.val}</div>
              <div style={{ color: '#aaa', fontSize: '0.72rem' }}>{item.label}/mo</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1a2a44', borderRadius: 10, padding: '1rem', marginBottom: '1.2rem' }}>
          <div style={{ color: '#aaa', fontSize: '0.82rem', marginBottom: 8 }}>Seasonal Electric + Gas Pattern</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 60 }}>
            {SEASONAL.map((m, i) => {
              const h = Math.round(((Math.round(d.electricBase * em * sm * ELECTRIC_SEASON[i]) + Math.round(d.gasBase * em * sm * GAS_SEASON[i])) / barMax) * 56);
              return <div key={m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ width: '100%', height: h, background: i >= 5 && i <= 8 ? '#F5E642' : '#3a5a84', borderRadius: 2 }} />
                <div style={{ fontSize: '0.6rem', color: '#666' }}>{m.slice(0,1)}</div>
              </div>;
            })}
          </div>
        </div>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
          <div><div style={{ fontSize: '0.82rem', fontWeight: 600 }}>Monthly Total</div><div style={{ fontSize: '1.6rem', fontWeight: 700 }}>${monthly}</div></div>
          <div style={{ textAlign: 'right' }}><div style={{ fontSize: '0.82rem', fontWeight: 600 }}>Annual Total</div><div style={{ fontSize: '1.6rem', fontWeight: 700 }}>${annual.toLocaleString()}</div></div>
        </div>
      </div>
    </div>
  );
}
