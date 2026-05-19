import { useState } from 'react';

const SUBURBS = ['Frisco','Plano','Allen','McKinney','Southlake','Flower Mound','Keller','Grapevine','Coppell','Irving'];
const VEHICLES = ['RV (Class A)','RV (Class B/C)','Travel Trailer','5th Wheel','Boat (under 20ft)','Boat (20ft+)'];
const HOA_STATUS = ['No HOA','HOA - Unknown Rules','HOA - Restrictive','No Restrictions'];

const storageData: Record<string,{driveway:string,options:string[],cost:string}> = {
  'No HOA': { driveway: 'Generally permitted with setback compliance', options: ['Driveway pad','Backyard behind fence','On-site covered structure'], cost: '$0-$8,000 for pad installation' },
  'HOA - Unknown Rules': { driveway: 'Review CC&Rs before parking', options: ['Contact HOA board','Review plat restrictions','Temporary storage facility while researching'], cost: '$150-$400/mo facility storage' },
  'HOA - Restrictive': { driveway: 'Most DFW suburban HOAs prohibit visible RV storage', options: ['Climate-controlled facility','Enclosed trailer to hide vehicle','Rear yard behind 6ft privacy fence (check rules)'], cost: '$200-$600/mo for climate-controlled facility' },
  'No Restrictions': { driveway: 'Full flexibility', options: ['Any on-site location','Covered carport or barn','Concrete pad with hookups'], cost: '$2,000-$15,000 for full hookup pad' },
};

export default function DFWRVStorageGuide() {
  const [vehicle, setVehicle] = useState('');
  const [suburb, setSuburb] = useState('');
  const [hoa, setHoa] = useState('');
  const [result, setResult] = useState<{driveway:string,options:string[],cost:string}|null>(null);

  function calculate() {
    if (!vehicle || !suburb || !hoa) return;
    setResult(storageData[hoa]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, marginBottom: 8 }}>RV & Boat Storage Guide</h1>
        <p style={{ color: '#8899AA', marginBottom: 32, fontSize: 16 }}>Texas has more RVs and boats per capita than almost any state — but DFW HOAs make storage tricky.</p>

        <div style={{ background: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 DFW HOA Landscape</h2>
          <p style={{ color: '#CCD6E0', lineHeight: 1.7 }}>Over 70% of DFW suburban neighborhoods have HOAs. Most Frisco, Plano, McKinney, and Allen HOAs explicitly prohibit RVs and boats parked in driveways or visible from the street. Violations typically result in $25-$100/day fines after a 15-day cure notice.</p>
        </div>

        <div style={{ background: '#111F35', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🔍 Find Your Storage Option</h2>
          <div style={{ display: 'grid', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>Vehicle Type</label>
              <select value={vehicle} onChange={e => setVehicle(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3050', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 15 }}>
                <option value=''>Select vehicle...</option>
                {VEHICLES.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>DFW Suburb</label>
              <select value={suburb} onChange={e => setSuburb(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3050', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 15 }}>
                <option value=''>Select suburb...</option>
                {SUBURBS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>HOA Status</label>
              <select value={hoa} onChange={e => setHoa(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3050', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 15 }}>
                <option value=''>Select HOA status...</option>
                {HOA_STATUS.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>Get Storage Options</button>
        </div>

        {result && (
          <div style={{ background: '#0D2137', border: '1px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📦 Your Storage Recommendations</h3>
            <div style={{ marginBottom: 12 }}>
              <span style={{ color: '#8899AA', fontSize: 13 }}>Driveway Storage: </span>
              <span style={{ color: '#CCD6E0′ }}>{result.driveway}</span>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: '#8899AA', fontSize: 13, marginBottom: 6 }}>Available Options:</div>
              {result.options.map((o,i) => <div key={i} style={{ color: '#CCD6E0', padding: '4px 0', paddingLeft: 12 }}>• {o}</div>)}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginTop: 12 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>💰 Estimated Cost: </span>
              <span style={{ color: '#CCD6E0′ }}>{result.cost}</span>
            </div>
          </div>
        )}

        <div style={{ background: '#111F35', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔧 RV Pad Installation</h2>
          <p style={{ color: '#CCD6E0', lineHeight: 1.7 }}>A concrete or paver RV pad behind a 6ft privacy fence is the most common DFW solution. Typical cost: $4,000-$12,000. Includes permit ($150-$400), concrete work, and fence modifications if needed. Most cities require a building permit for pads over 200 sq ft.</p>
        </div>
      </div>
    </div>
  );
}
