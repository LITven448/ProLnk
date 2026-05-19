import { useState } from 'react';

const hardnessLevels = ['Soft (0–3 gpg)', 'Moderate (4–7 gpg)', 'Hard (8–12 gpg)', 'Very Hard (13–17 gpg)', 'Extreme (17+ gpg — most of DFW)'];
const unitAges = ['Brand New (0–1 yr)', '1–3 Years', '3–5 Years', '5–8 Years', '8+ Years'];

export default function DFWTanklessMaintenanceGuide() {
  const [hardness, setHardness] = useState('');
  const [unitAge, setUnitAge] = useState('');
  const [result, setResult] = useState<null | { schedule: string; method: string; cost: string; urgency: string }>(null);

  function calculate() {
    if (!hardness || !unitAge) return;
    const isExtreme = hardness.includes('Extreme') || hardness.includes('Very Hard');
    const isHard = hardness.includes('Hard');
    const isOld = unitAge.includes('8+') || unitAge.includes('5–8');
    const isMid = unitAge.includes('3–5') || unitAge.includes('1–3');
    const isNew = unitAge.includes('New');

    const schedule = isExtreme
      ? '🔴 Descale every 6 months — DFW extreme hardness destroys heat exchangers without aggressive maintenance'
      : isHard
      ? '🟡 Descale every 8–12 months — DFW hard water still 3× national scale rate'
      : '🟢 Descale annually — lower hardness but DFW water still needs regular maintenance';

    const method = isOld
      ? '🔧 Professional descaling recommended — older units need full inspection of heat exchanger, flow sensor, and igniter'
      : isMid
      ? '🔧 DIY descaling viable — 1 gallon white vinegar or CLR Pro, submersible pump, 45-60 minute flush cycle'
      : '🔧 DIY descaling — simple vinegar flush; consider installing a pre-filter to extend intervals';

    const cost = isOld
      ? '💰 Professional: $150–$300 | DIY supplies: $30–$60 | Consider softener: $800–$1,500 installed'
      : '💰 DIY descaling kit: $30–$80 | Professional: $100–$200 | Water softener prevents scale entirely';

    const urgency = isExtreme && isOld
      ? '🚨 URGENT: Descale immediately — DFW extreme hardness + age means likely scale buildup causing efficiency loss and potential heat exchanger failure'
      : isExtreme && isMid
      ? '⚠️ Schedule descaling within 30 days — DFW hardness is actively reducing your efficiency'
      : isNew
      ? '✅ Install a pre-filter now to protect your investment from DFW hard water from day one'
      : '📅 Schedule your next descaling within 60 days';

    setResult({ schedule, method, cost, urgency });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🔧 DFW WATER HEATER GUIDES</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Tankless Water Heater Maintenance for DFW</h1>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>DFW's extreme hard water is the #1 killer of tankless water heaters. Scale buildup costs efficiency and destroys heat exchangers.</p>

        <div style={{ background: '#7B1C1C', borderRadius: 8, padding: '1rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ fontSize: '2rem' }}>⚠️</div>
          <div>
            <div style={{ color: '#FF6B6B', fontWeight: 700 }}>DFW Hard Water Alert</div>
            <div style={{ color: '#ccc', fontSize: '0.9rem' }}>Dallas water measures 17+ grains per gallon (GPG) — classified as "extremely hard." The national average is 7 GPG. DFW tankless units need descaling 2–4× more often than the manufacturer's national recommendation.</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '📉', label: '30% Efficiency Loss', sub: 'from 1/4 inch of scale buildup' },
            { icon: '💀', label: '5–7 Year Life Cut', sub: 'without regular descaling in DFW' },
            { icon: '🛡️', label: 'Warranty Voided', sub: 'most brands require annual maintenance' },
          ].map(c => (
            <div key={c.label} style={{ background: '#0D1F3C', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem' }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: '0.5rem', fontSize: '0.95rem' }}>{c.label}</div>
              <div style={{ color: '#aaa', fontSize: '0.8rem' }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>DFW Descaling Frequency vs National Average</h2>
          {[
            { label: 'National average recommendation', value: 'Every 3–5 years', color: '#4CAF50′ },
            { label: 'DFW Moderate Areas (Richardson, Allen)', value: 'Every 12–18 months', color: '#FF9800′ },
            { label: 'DFW Hard Water Areas (Dallas, Fort Worth)', value: 'Every 8–12 months', color: '#F44336′ },
            { label: 'DFW Extreme Areas (Irving, Grand Prairie)', value: 'Every 4–6 months', color: '#9C27B0′ },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', padding: '0.5rem', background: '#0A1628', borderRadius: 4 }}>
              <span style={{ color: '#ccc', fontSize: '0.85rem' }}>{r.label}</span>
              <span style={{ color: r.color, fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap', marginLeft: '1rem' }}>{r.value}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D1F3C', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem' }}>🔧 Your Descaling Schedule</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem' }}>DFW Water Hardness</label>
              <select value={hardness} onChange={e => setHardness(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: '0.3rem', padding: '0.5rem', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 4 }}>
                <option value=''>Select...</option>
                {hardnessLevels.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#aaa', fontSize: '0.85rem' }}>Unit Age</label>
              <select value={unitAge} onChange={e => setUnitAge(e.target.value)}
                style={{ display: 'block', width: '100%', marginTop: '0.3rem', padding: '0.5rem', background: '#0A1628', color: '#fff', border: '1px solid #1E3A5F', borderRadius: 4 }}>
                <option value=''>Select...</option>
                {unitAges.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 6, padding: '0.7rem 1.5rem', cursor: 'pointer', width: '100%' }}>
            Get My Maintenance Plan →
          </button>
        </div>

        {result && (
          <div style={{ background: '#0D1F3C', borderRadius: 8, padding: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>Your DFW Maintenance Plan</h3>
            {[result.urgency, result.schedule, result.method, result.cost].map((v, i) => (
              <div key={i} style={{ color: '#ccc', marginBottom: '0.6rem', fontSize: '0.95rem' }}>{v}</div>
            ))}
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#0A1628', borderRadius: 6, color: '#F5E642', fontSize: '0.9rem', textAlign: 'center' }}>
              Find a certified tankless maintenance pro in DFW on ProLnk — free quotes.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
