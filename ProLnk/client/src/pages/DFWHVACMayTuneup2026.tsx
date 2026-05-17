import { useState } from 'react';

export default function DFWHVACMayTuneup2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const assess = () => {
    if (!situation) { setResult('Please select your situation.'); return; }
    if (situation === 'not-serviced') {
      setResult('🚨 URGENT — Book this week. May is the last window before June emergency pricing hits. A ProLnk Charter pro can get you scheduled within 48 hours. Waiting until June typically costs $150-300 more for the same service.');
    } else if (situation === 'last-year') {
      setResult('⚠️ SCHEDULE NOW — Annual DFW tune-ups are essential. Last year's service won't carry you through another DFW summer. Coils get dirty, refrigerant can leak slowly. May slots are filling fast.');
    } else if (situation === 'not-working') {
      setResult('🚨 EMERGENCY — Don't wait for a tune-up. Book an emergency diagnostic now. In DFW heat, a non-functioning AC is a health risk. ProLnk has 24-hour pros available.');
    } else if (situation === 'new-system') {
      setResult('✅ GOOD TIMING — New systems still need first-summer prep: verify refrigerant charge, check all connections, test thermostat calibration. A quick check in May catches any installation issues before peak heat.');
    } else if (situation === 'serviced-this-year') {
      setResult('✅ YOU'RE SET — Great job. If your tune-up included coil cleaning, refrigerant check, and filter replacement, you're ready for DFW summer. Change filters monthly June-August.');
    } else {
      setResult('May is the optimal window for DFW HVAC service. June and July pricing spikes 30-50% as demand surges. Book through ProLnk for vetted local Charter pros.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>PROLNK DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>⏰ May HVAC Tune-Up: Final Call</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>
          May is the last affordable window for DFW HVAC service. June brings emergency pricing and 2-week wait times.
        </p>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📋 What a Proper DFW Tune-Up Includes</h2>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              'Refrigerant level check and adjustment',
              'Evaporator and condenser coil cleaning',
              'Capacitor and contactor inspection',
              'Thermostat calibration and operation test',
              'Drain line flush (critical in DFW humidity)',
              'Filter replacement or inspection',
              'Electrical connections tightened',
            ].map(item => (
              <div key={item} style={{ display: 'flex', gap: 10, padding: '8px 12px', background: '#1a2f4a', borderRadius: 6 }}>
                <span style={{ color: '#F5E642' }}>✓</span>
                <span style={{ color: '#94a3b8', fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🎯 May Tune-Up Urgency Check</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, color: '#94a3b8', fontSize: 13 }}>Your Current HVAC Situation</label>
            <select value={situation} onChange={e => setSituation(e.target.value)}
              style={{ width: '100%', padding: '10px', background: '#1a2f4a', border: '1px solid #1e3a5a', borderRadius: 8, color: '#fff' }}>
              <option value="">Select your situation...</option>
              <option value="not-serviced">Never had it serviced / don't remember last time</option>
              <option value="last-year">Serviced last year (2025)</option>
              <option value="serviced-this-year">Already serviced in 2026</option>
              <option value="new-system">New system installed in last 12 months</option>
              <option value="not-working">Not cooling properly right now</option>
            </select>
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', padding: '12px 24px', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', width: '100%' }}>
            Check My Urgency
          </button>
          {result && (
            <div style={{ marginTop: 16, padding: 16, background: '#1a2f4a', borderRadius: 8, lineHeight: 1.6 }}>{result}</div>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: 20, background: '#0f2035', borderRadius: 12 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⚡ Book a DFW Charter HVAC Pro Now</div>
          <div style={{ color: '#94a3b8', fontSize: 13 }}>ProLnk Charter pros available within 48 hours. May pricing. Local and licensed.</div>
        </div>
      </div>
    </div>
  );
}