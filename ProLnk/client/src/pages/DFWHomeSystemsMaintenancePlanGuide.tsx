import { useState } from 'react';

const homeSizes = ['Under 1,500 sqft', '1,500–2,500 sqft', '2,500–4,000 sqft', '4,000+ sqft'];
const homeAges = ['New (0–5 years)', 'Modern (6–15 years)', 'Established (16–30 years)', 'Older (30+ years)'];
const systemCounts = ['1–2 systems', '3–4 systems', '5–6 systems', '7+ systems'];

const dfwServices = [
  { name: 'HVAC Tune-Up (x2)', icon: '❄️', freq: 'Biannual', bundled: [180, 280], individual: [250, 380] },
  { name: 'Plumbing Inspection', icon: '🔧', freq: 'Annual', bundled: [80, 130], individual: [120, 200] },
  { name: 'Electrical Safety Check', icon: '⚡', freq: 'Annual', bundled: [90, 140], individual: [130, 210] },
  { name: 'Roof Inspection', icon: '🏠', freq: 'Annual', bundled: [60, 100], individual: [100, 175] },
  { name: 'Pest Control', icon: '🐜', freq: 'Quarterly', bundled: [120, 180], individual: [200, 320] },
  { name: 'Irrigation System Check', icon: '💧', freq: 'Biannual', bundled: [80, 130], individual: [130, 210] },
  { name: 'Dryer Vent Cleaning', icon: '🌀', freq: 'Annual', bundled: [60, 90], individual: [90, 140] },
];

const getSizeMultiplier = (size: string) => size.includes('4,000') ? 1.4 : size.includes('2,500') ? 1.2 : size.includes('1,500') ? 1.0 : 0.85;
const getAgeMultiplier = (age: string) => age.includes('30+') ? 1.35 : age.includes('16–30') ? 1.15 : age.includes('6–15') ? 1.0 : 0.85;
const getSystemsMultiplier = (sys: string) => sys.includes('7+') ? 1.5 : sys.includes('5–6') ? 1.3 : sys.includes('3–4') ? 1.1 : 1.0;

export default function DFWHomeSystemsMaintenancePlanGuide() {
  const [size, setSize] = useState('1,500–2,500 sqft');
  const [age, setAge] = useState('Established (16–30 years)');
  const [systems, setSystems] = useState('3–4 systems');

  const sm = getSizeMultiplier(size);
  const am = getAgeMultiplier(age);
  const sysMult = getSystemsMultiplier(systems);
  const combined = sm * am * sysMult;

  const bundledTotal = Math.round(dfwServices.reduce((s, d) => s + (d.bundled[0] + d.bundled[1]) / 2, 0) * combined);
  const individualTotal = Math.round(dfwServices.reduce((s, d) => s + (d.individual[0] + d.individual[1]) / 2, 0) * combined);
  const savings = individualTotal - bundledTotal;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', fontFamily: 'Inter, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, fontWeight: 600 }}>🏠 DFW Home Guide</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Whole-Home Systems Maintenance Plan for DFW</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.6, marginBottom: 28 }}>
          DFW homeowners face a unique maintenance burden: extreme heat, hard water, hail risk, and clay soil. A structured annual maintenance plan prevents the expensive emergency calls that catch most homeowners off guard.
        </p>

        <div style={{ background: 'rgba(245,230,66,0.08)', border: '1.5px solid rgba(245,230,66,0.2)', borderRadius: 12, padding: 16, marginBottom: 24, fontSize: 14, color: '#fde68a', lineHeight: 1.6 }}>
          💡 <strong>ProLnk Maintenance Model:</strong> Instead of scrambling for contractors when things break, ProLnk connects DFW homeowners with vetted pros for scheduled annual maintenance — before problems start.
        </div>

        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🔧 Plan Cost Estimator</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { label: 'Home Size', value: size, setter: setSize, options: homeSizes },
              { label: 'Home Age', value: age, setter: setAge, options: homeAges },
              { label: 'Number of Systems', value: systems, setter: setSystems, options: systemCounts },
            ].map(({ label, value, setter, options }) => (
              <div key={label}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#cbd5e1' }}>{label}</label>
                <select value={value} onChange={e => setter(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #334155', fontSize: 15, background: '#0f2040', color: '#fff' }}>
                  {options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Bundled Plan Est.', value: `$${bundledTotal.toLocaleString()}/yr`, color: '#F5E642' },
            { label: 'Individual Service Est.', value: `$${individualTotal.toLocaleString()}/yr`, color: '#94a3b8' },
            { label: 'Bundle Savings', value: `$${savings.toLocaleString()}/yr`, color: '#22c55e' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 18, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color }}>{value}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>📅 DFW Annual Maintenance Checklist</h2>
          {dfwServices.map((s, i) => {
            const adj = Math.round(((s.bundled[0] + s.bundled[1]) / 2) * combined);
            return (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < dfwServices.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 22 }}>{s.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{s.freq}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: '#F5E642' }}>~${adj}/yr</div>
                  <div style={{ fontSize: 11, color: '#475569' }}>bundled est.</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: 'rgba(245,230,66,0.1)', border: '1.5px solid rgba(245,230,66,0.3)', borderRadius: 14, padding: 22, textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>🏡 Get a ProLnk Maintenance Plan</div>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, margin: 0 }}>ProLnk connects DFW homeowners with vetted, background-checked maintenance pros. One plan, one contact, all systems covered year-round.</p>
        </div>
      </div>
    </div>
  );
}
