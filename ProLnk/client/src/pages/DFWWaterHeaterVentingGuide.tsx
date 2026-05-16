import { useState } from 'react';

const ventingTypes = ['Atmospheric (Draft Hood)', 'Power Vent (Horizontal)', 'Direct Vent (Sealed Combustion)', 'Power Direct Vent', 'Not Sure'];
const dfwLocations = ['Urban Dallas', 'Fort Worth', 'Suburban (Plano/Frisco/McKinney)', 'Rural/Outer DFW'];

export default function DFWWaterHeaterVentingGuide() {
  const [ventType, setVentType] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<null | { assessment: string; upgrade: string; cost: string; tip: string }>(null);

  function calculate() {
    if (!ventType || !location) return;
    const isAtmospheric = ventType.includes('Atmospheric');
    const isPower = ventType.includes('Power Vent');
    const isDirect = ventType.includes('Direct Vent');
    const isPowerDirect = ventType.includes('Power Direct Vent');
    const isUrban = location.includes('Urban');
    const isSuburban = location.includes('Suburban');

    const assessment = isAtmospheric
      ? '⚠️ Atmospheric venting is the oldest type — relies on natural draft through a vertical flue. Common in pre-2000 DFW homes. Works but least efficient and can backdraft in tight homes.'
      : isPower
      ? '✅ Power vent is a solid upgrade — electric fan pushes exhaust horizontally, allowing more flexible placement without a vertical chimney.'
      : isDirect
      ? '✅ Direct vent (sealed combustion) is excellent — draws combustion air from outside, no indoor air concerns, safer in tight DFW homes with good insulation.'
      : isPowerDirect
      ? '✅ Power direct vent is the gold standard — combines sealed combustion with powered exhaust for maximum placement flexibility and safety.'
      : '🔍 Inspect your current venting to identify the type before replacing — the wrong replacement can create dangerous backdraft conditions.';

    const upgrade = isAtmospheric
      ? isUrban
        ? '🔄 Upgrade priority: HIGH — urban DFW homes often have tighter envelopes now due to weatherization; backdraft risk increases'
        : '🔄 Upgrade when replacing — power vent or direct vent at next water heater replacement'
      : isPower || isDirect || isPowerDirect
      ? '✅ No upgrade needed — your venting type is appropriate for DFW homes'
      : '📋 Assess with a licensed plumber before deciding';

    const cost = isAtmospheric
      ? '💰 Atmospheric to power vent: $600–$1,200 additional at replacement | Direct vent: $800–$1,500 additional'
      : '💰 Venting replacement alone (same type): $200–$500 | Upgrade during replacement adds $400–$900';

    const tip = isSuburban
      ? '📍 DFW suburban tip: New construction in Frisco/McKinney/Prosper typically requires direct vent or power vent by code — verify your existing installation matches permit'
      : isUrban
      ? '📍 Dallas/Fort Worth urban tip: Older urban homes with original B-vent (double-wall atmospheric) should be inspected annually for rust, separation, and backdraft risk'
      : '📍 DFW tip: All gas water heater venting should be inspected annually — DFW humidity can accelerate corrosion in B-vent systems';

    setResult({ assessment, upgrade, cost, tip });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🔥 DFW WATER HEATER GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Water Heater Venting Guide for DFW</h1>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>Gas water heater venting is critical for safety and efficiency. Know your venting type before your next DFW replacement.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '🏗️', label: 'Atmospheric', sub: 'natural draft, vertical flue' },
            { icon: '⚡', label: 'Power Vent', sub: 'fan-assisted, horizontal OK' },
            { icon: '🔒', label: 'Direct Vent', sub: 'sealed combustion, safest' },
          ].map(c => (
            <div key={c.label} style={{ background: '#0D1F3C', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: '0.5rem' }}>{c.label}</div>
              <div style={{ color: '#aaa', fontSize: '0.8rem' }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>Venting Types — What DFW Homeowners Need to Know</h2>
          {[
            { type: '🏗️ Atmospheric (B-Vent)', detail: 'Most common in DFW homes built before 2000. Requires vertical chimney or flue. Can backdraft if home is tightly sealed. Still code-compliant but being phased out.' },
            { type: '⚡ Power Vent', detail: 'Fan pushes exhaust out horizontally through PVC pipe. Great for DFW homes without existing chimney. Requires electricity. Very common in DFW replacements today.' },
            { type: '🔒 Direct Vent (Sealed)', detail: 'Pulls combustion air from outside — does not use indoor air at all. Safest option for tight DFW homes. Requires two-pipe system or concentric pipe.' },
            { type: '🔋 Power Direct Vent', detail: 'Best of both: sealed combustion + powered exhaust. Maximum flexibility in placement. Required by some DFW municipalities for new installs.' },
          ].map(v => (
            <div key={v.type} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #1E3A5F' }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.3rem' }}>{v.type}</div>
              <div style={{ color: '#ccc', fontSize: '0.9rem' }}>{v.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔍 Assess My DFW Venting Setup</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Current Venting Type</label>
              <select value={ventType} onChange={e => setVentType(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: '0.3rem', padding: '0.5rem', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 4 }}>
                <option value=''>Select...</option>
                {ventingTypes.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem' }}>DFW Location</label>
              <select value={location} onChange={e => setLocation(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: '0.3rem', padding: '0.5rem', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 4 }}>
                <option value=''>Select...</option>
                {dfwLocations.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 6, padding: '0.7rem 1.5rem', cursor: 'pointer', width: '100%' }}>
            Assess My Venting →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0D1F3C', borderRadius: 8, padding: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>Your Venting Assessment</h3>
            {[result.assessment, result.upgrade, result.cost, result.tip].map((v, i) => (
              <div key={i} style={{ color: '#ccc', marginBottom: '0.75rem', fontSize: '0.95rem' }}>{v}</div>
            ))}
            <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: '#0A1628', borderRadius: 6, color: '#F5E642', fontSize: '0.9rem', textAlign: 'center' }}>
              Get a licensed DFW plumber to inspect your venting — free quotes on ProLnk.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
