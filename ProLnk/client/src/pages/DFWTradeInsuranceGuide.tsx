import { useState } from 'react';

const coverageData = {
  hvac: {
    label: 'HVAC Tech',
    gl: { required: true, min: '1M/2M', est: '1800-2800', note: 'GL is required for all ProLnk HVAC pros. Refrigerant work increases liability exposure.' },
    workersComp: { note: 'Required in TX if you have any employees. Even one helper requires coverage. ~$4,200/yr for 1 employee.' },
    commercialAuto: { est: '1800-2600', note: 'Must cover your van/truck for business use. Personal auto policy voids if you use for work.' },
    toolFloater: { est: '350-600', note: 'Cover manifold gauges, recovery machine, vacuum pump. Theft from vans is common in DFW.' },
    umbrella: { est: '600-900', note: 'Recommended at $1M+. HVAC refrigerant and electrical work carry high liability.' }
  },
  plumber: {
    label: 'Plumber',
    gl: { required: true, min: '1M/2M', est: '2000-3200', note: 'Plumbing GL is higher than other trades due to water damage claims. Get at least 1M/2M aggregate.' },
    workersComp: { note: 'Required for any employees in TX. Plumbing has high workers comp rates due to injury risk. ~$5,500/yr for 1 employee.' },
    commercialAuto: { est: '1900-2800', note: 'Plumbing trucks carry high-value tools and heavy equipment. Commercial auto protects all of it.' },
    toolFloater: { est: '400-700', note: 'Press tools, camera systems, and augers add up fast. Get replacement cost coverage, not actual cash value.' },
    umbrella: { est: '700-1000', note: 'Water damage suits can exceed GL limits. An umbrella adds $1M+ for a few hundred dollars more per year.' }
  },
  electrician: {
    label: 'Electrician',
    gl: { required: true, min: '1M/2M', est: '1600-2500', note: 'Electrical GL includes completed operations coverage for fires that occur after job completion. Critical.' },
    workersComp: { note: 'Required for any employees in TX. Electrical workers comp is moderate risk. ~$3,800/yr for 1 employee.' },
    commercialAuto: { est: '1600-2400', note: 'Standard commercial auto. Make sure to declare all tools stored in vehicle for coverage.' },
    toolFloater: { est: '250-500', note: 'Multimeters, test equipment, drills. DFW van break-ins target electrical tools left overnight.' },
    umbrella: { est: '500-800', note: 'Fire liability from panel work can be substantial. Umbrella bridges the gap if GL limits are exhausted.' }
  },
  roofer: {
    label: 'Roofer',
    gl: { required: true, min: '1M/2M', est: '3500-6000', note: 'Roofing GL is the most expensive in trades due to fall and property damage risk. Shop multiple carriers.' },
    workersComp: { note: 'Required in TX with employees. Roofing workers comp is highest among trades due to fall risk. ~$9,000/yr for 1 employee.' },
    commercialAuto: { est: '2200-3500', note: 'Heavy trucks with loaded trailers need proper commercial auto. Do not skip trailer coverage.' },
    toolFloater: { est: '200-400', note: 'Nailers, compressors, safety gear. Basic floater covers most DFW roofing equipment needs.' },
    umbrella: { est: '800-1200', note: 'Highly recommended for roofers. Fall-related injuries and property damage suits can be catastrophic without it.' }
  }
};

const employees = { solo: 'Solo (no employees)', one: '1-2 employees', three: '3-5 employees' };
const empMultiplier = { solo: 1, one: 1.6, three: 2.4 };

const dfwBrokers = [
  { name: 'Acrisure DFW', specialty: 'All trades, contractor specialists', note: 'Large DFW book, competitive for HVAC and plumbing' },
  { name: 'Brown and Brown Dallas', specialty: 'Roofing and exterior trades', note: 'Known for competitive roofing GL programs' },
  { name: 'Leavitt Group Texas', specialty: 'Small contractor policies', note: 'Good for solo and 1-2 employee operations' }
];

export default function DFWTradeInsuranceGuide() {
  const [trade, setTrade] = useState('');
  const [emp, setEmp] = useState('');
  const [equip, setEquip] = useState('');

  const t = trade ? coverageData[trade as keyof typeof coverageData] : null;
  const mult = emp ? empMultiplier[emp as keyof typeof empMultiplier] : 1;
  const equipVal = parseInt(equip) || 0;
  const toolPremium = equipVal > 0 ? Math.round(equipVal * 0.045) : null;

  const parseRange = (range: string) => {
    const [low, high] = range.split('-').map(v => parseInt(v) * mult);
    return '$' + Math.round(low / 100) * 100 + ' - $' + Math.round(high / 100) * 100;
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>PROLNK DFW PRO RESOURCE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>DFW Trade Insurance Guide</h1>
        <p style={{ color: '#94a3b8', margin: '0 0 32px', lineHeight: 1.6 }}>ProLnk requires $1M GL minimum for all pros. But proper coverage protects your business from a single claim that could end your livelihood. This guide shows you what you need and what it should cost in DFW.</p>

        <div style={{ background: '#1a1a2e', border: '1px solid #ef4444', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: 8 }}>ProLnk Insurance Requirements</div>
          <p style={{ color: '#fca5a5', margin: 0, fontSize: 14 }}>General Liability: $1,000,000 per occurrence minimum. Certificate of Insurance required before first match. ProLnk is listed as additional insured on all policies.</p>
        </div>

        <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 18 }}>Get Your Coverage Estimate</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            {Object.entries(coverageData).map(([k, v]) => (
              <button key={k} onClick={() => setTrade(k)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: trade === k ? '#F5E642' : '#1e3a5f', background: trade === k ? '#F5E642' : 'transparent', color: trade === k ? '#0A1628' : '#fff', fontWeight: 700, cursor: 'pointer' }}>{v.label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            {Object.entries(employees).map(([k, v]) => (
              <button key={k} onClick={() => setEmp(k)} style={{ padding: '10px 18px', borderRadius: 8, border: '2px solid', borderColor: emp === k ? '#F5E642' : '#1e3a5f', background: emp === k ? '#F5E642' : 'transparent', color: emp === k ? '#0A1628' : '#fff', fontWeight: 700, cursor: 'pointer' }}>{v}</button>
            ))}
          </div>
          <div>
            <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Total Equipment/Tool Value ($) for floater estimate</label>
            <input value={equip} onChange={ev => setEquip(ev.target.value)} placeholder="e.g. 12000" style={{ background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, width: '100%', boxSizing: 'border-box' }} />
          </div>
        </div>

        {t && (
          <div style={{ display: 'grid', gap: 14 }}>
            {[
              { name: 'General Liability', data: t.gl, required: true, cost: parseRange(t.gl.est) },
              { name: 'Commercial Auto', data: t.commercialAuto, required: true, cost: parseRange(t.commercialAuto.est) },
              { name: 'Tool and Equipment Floater', data: t.toolFloater, required: false, cost: toolPremium ? '$' + toolPremium + '/yr' : parseRange(t.toolFloater.est) },
              { name: 'Umbrella Policy', data: t.umbrella, required: false, cost: parseRange(t.umbrella.est) }
            ].map((cov, i) => (
              <div key={i} style={{ background: '#0F1F3D', borderRadius: 12, padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{cov.name}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    {cov.required && <span style={{ background: '#7f1d1d', color: '#fca5a5', padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 700 }}>REQUIRED</span>}
                    <span style={{ color: '#F5E642', fontWeight: 700 }}>{cov.cost}/yr</span>
                  </div>
                </div>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: 13, lineHeight: 1.5 }}>{(cov.data as { note: string }).note}</p>
              </div>
            ))}

            {emp !== 'solo' && (
              <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Workers Compensation</div>
                <span style={{ background: '#7f1d1d', color: '#fca5a5', padding: '2px 8px', borderRadius: 12, fontSize: 11, fontWeight: 700 }}>REQUIRED IN TX WITH EMPLOYEES</span>
                <p style={{ color: '#94a3b8', margin: '10px 0 0', fontSize: 13, lineHeight: 1.5 }}>{t.workersComp.note}</p>
              </div>
            )}

            <div style={{ background: '#0F1F3D', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>DFW Insurance Brokers Specializing in Trades</div>
              {dfwBrokers.map((broker, i) => (
                <div key={i} style={{ padding: '12px 0', borderBottom: i < dfwBrokers.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{broker.name}</div>
                  <div style={{ fontSize: 13, color: '#64748b', marginBottom: 2 }}>{broker.specialty}</div>
                  <div style={{ fontSize: 13, color: '#94a3b8' }}>{broker.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
