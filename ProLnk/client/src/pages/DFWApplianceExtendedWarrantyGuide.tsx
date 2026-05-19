import { useState } from 'react';

const appliances = ['HVAC', 'Refrigerator', 'Dishwasher', 'Washer/Dryer', 'Microwave', 'Oven/Range'];
const hardWaterLevels = ['Low', 'Moderate', 'High (typical DFW)'];

const data: Record<string, { repair: number; warrantyMin: number; warrantyMax: number; rec: string; note: string }> = {
  HVAC: { repair: 650, warrantyMin: 120, warrantyMax: 200, rec: 'Always worth it', note: 'DFW summers push systems to their limits. Extended warranty often pays for itself in year one.' },
  Refrigerator: { repair: 320, warrantyMin: 80, warrantyMax: 150, rec: 'Maybe', note: 'Hard water accelerates ice maker and water line failures. Worth it for premium models over $1,200.' },
  Dishwasher: { repair: 200, warrantyMin: 60, warrantyMax: 100, rec: 'Skip it', note: 'Repair costs rarely exceed warranty price over a typical 5-year coverage period.' },
  'Washer/Dryer': { repair: 280, warrantyMin: 80, warrantyMax: 130, rec: 'Maybe', note: 'Front-load washers have higher repair rates. Hard water wears seals faster.' },
  Microwave: { repair: 150, warrantyMin: 50, warrantyMax: 90, rec: 'Skip it', note: 'Replacement is often cheaper than a single major repair plus warranty cost.' },
  'Oven/Range': { repair: 240, warrantyMin: 70, warrantyMax: 120, rec: 'Skip it', note: 'Gas ranges are reliable. Electric ranges with induction may benefit from coverage.' },
};

const hardWaterMultiplier: Record<string, number> = { 'Low': 1.0, 'Moderate': 1.15, 'High (typical DFW)': 1.3 };

export default function DFWApplianceExtendedWarrantyGuide() {
  const [appliance, setAppliance] = useState('HVAC');
  const [age, setAge] = useState(3);
  const [hardWater, setHardWater] = useState('High (typical DFW)');

  const info = data[appliance];
  const mult = hardWaterMultiplier[hardWater];
  const adjustedRepair = Math.round(info.repair * mult);
  const ageMultiplier = age > 5 ? 1.3 : age > 2 ? 1.0 : 0.7;
  const annualRepairRisk = Math.round((adjustedRepair * ageMultiplier) / 5);
  const warrantyMid = Math.round((info.warrantyMin + info.warrantyMax) / 2);
  const verdict = info.rec === 'Always worth it' ? '✅' : info.rec === 'Maybe' ? '⚠️' : '❌';

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#1a2332′ }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>🏠 DFW Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          Extended Warranty Guide for DFW Appliances
        </h1>
        <p style={{ color: '#475569', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          DFW's hard water, extreme heat, and humidity cycles stress appliances faster than national averages.
          Here's what actually makes sense to cover — and what’s a waste of money.
        </p>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>🔧 Warranty Calculator</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151′ }}>Appliance Type</label>
              <select value={appliance} onChange={e => setAppliance(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 15, background: '#f8fafc' }}>
                {appliances.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151′ }}>Appliance Age: {age} year{age !== 1 ? ’s' : ''}</label>
              <input type="range" min={1} max={12} value={age} onChange={e => setAge(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151′ }}>DFW Water Hardness</label>
              <select value={hardWater} onChange={e => setHardWater(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #e2e8f0', fontSize: 15, background: '#f8fafc' }}>
                {hardWaterLevels.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 28, marginBottom: 24, color: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 32 }}>{verdict}</span>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{info.rec}</div>
              <div style={{ color: '#F5E642', fontSize: 14 }}>{appliance} · {age}yr old · {hardWater}</div>
            </div>
          </div>
          <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginBottom: 20 }}>{info.note}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#F5E642′ }}>${annualRepairRisk}</div>
              <div style={{ fontSize: 13, color: '#94a3b8′ }}>Est. annual repair risk</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#F5E642′ }}>${warrantyMid}/yr</div>
              <div style={{ fontSize: 13, color: '#94a3b8′ }}>Typical warranty cost</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 28, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📋 Warranty Types Compared</h2>
          {[
            { type: 'Square Trade / Allstate', pro: 'Flexible, covers multiple brands, transferable', con: 'Deductibles per claim, slower service' },
            { type: 'Manufacturer Extended', pro: 'OEM parts, authorized techs, faster repair', con: 'Single brand only, expires at ownership change' },
            { type: 'Retailer (Best Buy, etc.)', pro: 'Easy claims process, instant replacement on smaller items', con: 'Markup heavy, may exclude labor or parts after year 2′ },
          ].map(w => (
            <div key={w.type} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{w.type}</div>
              <div style={{ fontSize: 13, color: '#16a34a' }}>✓ {w.pro}</div>
              <div style={{ fontSize: 13, color: '#dc2626′ }}>✗ {w.con}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
