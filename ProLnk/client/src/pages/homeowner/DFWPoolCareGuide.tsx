import { useState } from 'react';

const chemDefaults = { gallons: '', ph: '', chlorine: '', alkalinity: '', cya: '' };

export default function DFWPoolCareGuide() {
  const [chem, setChem] = useState(chemDefaults);
  const [doses, setDoses] = useState<string[]>([]);

  function calculate() {
    const g = parseFloat(chem.gallons) || 0;
    const results: string[] = [];
    if (g <= 0) { setDoses(['Enter pool gallons to get dose recommendations.']); return; }
    const ph = parseFloat(chem.ph);
    const cl = parseFloat(chem.chlorine);
    const alk = parseFloat(chem.alkalinity);
    const cya = parseFloat(chem.cya);
    const factor = g / 10000;
    if (!isNaN(ph)) {
      if (ph > 7.8) results.push(`pH ${ph} is HIGH → Add ${(factor * 12).toFixed(0)} oz muriatic acid. (DFW hard water pulls pH up constantly.)`);
      else if (ph < 7.2) results.push(`pH ${ph} is LOW → Add ${(factor * 6).toFixed(0)} oz baking soda to raise alkalinity first, then re-test pH.`);
      else results.push(`pH ${ph} ✅ in range (7.2–7.8).`);
    }
    if (!isNaN(cl)) {
      if (cl < 1) results.push(`Chlorine ${cl} ppm is LOW → Add ${(factor * 12).toFixed(0)} oz liquid chlorine or 1 tablet per skimmer basket.`);
      else if (cl > 3) results.push(`Chlorine ${cl} ppm is HIGH → Wait before swimming. No addition needed.`);
      else results.push(`Chlorine ${cl} ppm ✅ in range (1–3 ppm).`);
    }
    if (!isNaN(alk)) {
      if (alk < 80) results.push(`Alkalinity ${alk} ppm is LOW → Add ${(factor * 15).toFixed(0)} oz baking soda.`);
      else if (alk > 120) results.push(`Alkalinity ${alk} ppm is HIGH → Add ${(factor * 10).toFixed(0)} oz muriatic acid slowly over several days.`);
      else results.push(`Alkalinity ${alk} ppm ✅ in range (80–120 ppm).`);
    }
    if (!isNaN(cya)) {
      if (cya < 30) results.push(`Stabilizer (CYA) ${cya} ppm is LOW → Add ${(factor * 4).toFixed(0)} oz cyanuric acid. DFW UV destroys unstabilized chlorine rapidly.`);
      else if (cya > 50) results.push(`Stabilizer (CYA) ${cya} ppm is HIGH → Partial drain and refill required to dilute.`);
      else results.push(`Stabilizer ${cya} ppm ✅ in range (30–50 ppm).`);
    }
    if (results.length === 0) results.push('Enter at least one chemical reading to get dose recommendations.');
    setDoses(results);
  }

  return (
    <div style={{ background: '#0a0f1e', minHeight: '100vh', color: '#e8eaf0', fontFamily: 'system-ui, sans-serif', padding: '0 0 80px' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #0a0f1e 100%)', padding: '72px 24px 56px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏊</div>
        <h1 style={{ fontSize: 'clamp(26px,5vw,42px)', fontWeight: 800, margin: '0 0 16px', color: '#fff' }}>
          DFW Pool Care Guide
        </h1>
        <p style={{ fontSize: 18, color: '#90caf9', maxWidth: 560, margin: '0 auto' }}>
          Keep Your Investment Swim-Ready — Year-Round
        </p>
      </div>

      <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 20px' }}>

        {/* DFW Context */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#42a5f5', marginBottom: 16 }}>🌊 DFW Pool Reality</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
            {[
              { icon: '🏠', label: 'Residential Pools in DFW', value: '450,000+' },
              { icon: '☀️', label: 'Months of Heavy Use', value: '7 months' },
              { icon: '💰', label: 'Annual Maintenance Cost', value: '$1,200–$1,800′ },
            ].map(c => (
              <div key={c.label} style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: 12, padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#42a5f5′ }}>{c.value}</div>
                <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>{c.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly DIY */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#42a5f5', marginBottom: 16 }}>📋 Weekly Maintenance (DIY)</h2>
          <div style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: 12, padding: 24 }}>
            {[
              { icon: '🧪', task: 'Test water chemistry', note: '2× per week in summer, weekly in spring/fall' },
              { icon: '🍃', task: 'Skim surface debris', note: 'Daily during heavy pollen/storm season' },
              { icon: '🪣', task: 'Check and empty skimmer baskets', note: 'Full basket starves pump — check often' },
              { icon: '🖌️', task: 'Brush walls and steps', note: 'Prevents algae from getting a foothold' },
              { icon: '🔄', task: 'Backwash filter', note: 'When pressure rises 8–10 PSI above normal baseline' },
            ].map(item => (
              <div key={item.task} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0', borderBottom: '1px solid #1e2d40′ }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#e2e8f0′ }}>{item.task}</div>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Monthly */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#42a5f5', marginBottom: 16 }}>📅 Monthly Maintenance</h2>
          <div style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: 12, padding: 24 }}>
            {[
              { icon: '⚡', task: 'Shock the pool', note: 'Especially after storms, heavy use, or any sign of algae' },
              { icon: '🔧', task: 'Check all equipment', note: 'Pump, filter, heater, lights — listen and look for anything off' },
              { icon: '🌀', task: 'Clean main drain cover', note: 'Annually with a licensed pool professional' },
            ].map(item => (
              <div key={item.task} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 0', borderBottom: '1px solid #1e2d40′ }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#e2e8f0′ }}>{item.task}</div>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chemistry Targets */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#42a5f5', marginBottom: 16 }}>🧪 DFW Chemistry Targets</h2>
          <div style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#0d47a1′ }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#90caf9', fontSize: 13 }}>Parameter</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#90caf9', fontSize: 13 }}>Target Range</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#90caf9', fontSize: 13 }}>DFW Note</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { param: 'pH', range: '7.2–7.8', note: 'DFW hard water pulls pH high — add muriatic acid frequently' },
                  { param: 'Chlorine', range: '1–3 ppm', note: 'Free chlorine; test with a reliable kit, not test strips alone' },
                  { param: 'Alkalinity', range: '80–120 ppm', note: 'Stabilizes pH swings; adjust before adjusting pH' },
                  { param: 'Stabilizer (CYA)', range: '30–50 ppm', note: 'DFW UV destroys unstabilized chlorine within hours' },
                ].map((row, i) => (
                  <tr key={row.param} style={{ background: i % 2 === 0 ? '#0f172a' : '#111827′ }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#60a5fa' }}>{row.param}</td>
                    <td style={{ padding: '12px 16px', color: '#4ade80', fontWeight: 600 }}>{row.range}</td>
                    <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: 13 }}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Seasonal Guide */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#42a5f5', marginBottom: 16 }}>🗓️ DFW Season Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
            {[
              { month: 'March', icon: '🌱', action: 'Open pool, balance chemistry, inspect all equipment for winter damage' },
              { month: 'Apr–Oct', icon: '🌞', action: 'Full maintenance schedule. Test 2× per week. Shock after every storm.' },
              { month: 'November', icon: '🍂', action: 'Reduce chemical dosing. Check freeze protection timer and sensor.' },
              { month: 'Dec–Feb', icon: '❄️', action: 'Minimal maintenance. Freeze protocols active. Run pump when temps drop below 38°F.' },
            ].map(s => (
              <div key={s.month} style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, color: '#42a5f5', marginBottom: 8 }}>{s.month}</div>
                <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{s.action}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Freeze Protection */}
        <section style={{ marginTop: 40 }}>
          <div style={{ background: '#1a1025', border: '2px solid #7c3aed', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>🧊</span>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#a78bfa' }}>Freeze Protection — Critical for DFW</h3>
            </div>
            <p style={{ color: '#c4b5fd', margin: 0, lineHeight: 1.6 }}>
              Your pool pump <strong>must run continuously</strong> during any freeze event. Moving water does not freeze. Set your freeze protect timer to activate at <strong>38°F</strong> — not 32°F. By the time it hits 32°F, your pipes may already be damaged. The 2021 Texas freeze destroyed thousands of pool systems that were not running.
            </p>
          </div>
        </section>

        {/* Pro Services Pricing */}
        <section style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#42a5f5', marginBottom: 16 }}>💼 Professional Service Costs</h2>
          <div style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#0d47a1′ }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#90caf9', fontSize: 13 }}>Service</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', color: '#90caf9', fontSize: 13 }}>Typical DFW Cost</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Weekly pool service', '$100–$150/mo'],
                  ['Green-to-clean / algae treatment', '$200–$400'],
                  ['Equipment repair (pump, filter)', '$150–$800'],
                  ['Heater repair or replacement', '$400–$1,500'],
                  ['Resurfacing (plaster/pebble)', '$5,000–$12,000'],
                ].map(([svc, cost], i) => (
                  <tr key={svc} style={{ background: i % 2 === 0 ? '#0f172a' : '#111827′ }}>
                    <td style={{ padding: '12px 16px', color: '#e2e8f0′ }}>{svc}</td>
                    <td style={{ padding: '12px 16px', color: '#4ade80', fontWeight: 600 }}>{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Chemical Calculator */}
        <section style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#42a5f5', marginBottom: 8 }}>🧮 Chemical Dose Calculator</h2>
          <p style={{ color: '#64748b', fontSize: 14, marginBottom: 20 }}>Enter your pool size and current readings to get DFW-specific dose recommendations.</p>
          <div style={{ background: '#111827', border: '1px solid #1e3a5f', borderRadius: 12, padding: 28 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 20 }}>
              {[
                { key: 'gallons', label: '🏊 Pool Gallons', placeholder: 'e.g. 15000′ },
                { key: 'ph', label: '⚗️ Current pH', placeholder: 'e.g. 7.9′ },
                { key: 'chlorine', label: '🟢 Chlorine (ppm)', placeholder: 'e.g. 0.5′ },
                { key: 'alkalinity', label: '🔵 Alkalinity (ppm)', placeholder: 'e.g. 75′ },
                { key: 'cya', label: '☀️ Stabilizer CYA (ppm)', placeholder: 'e.g. 25′ },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>{f.label}</label>
                  <input
                    type="number"
                    placeholder={f.placeholder}
                    value={chem[f.key as keyof typeof chem]}
                    onChange={e => setChem(prev => ({ ...prev, [f.key]: e.target.value }))}
                    style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: 8, padding: '10px 12px', color: '#e2e8f0', fontSize: 14, boxSizing: 'border-box' }}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={calculate}
              style={{ background: '#1565c0', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', width: '100%' }}
            >
              Calculate Doses
            </button>
            {doses.length > 0 && (
              <div style={{ marginTop: 20 }}>
                {doses.map((d, i) => (
                  <div key={i} style={{ background: '#0f172a', border: '1px solid #1e3a5f', borderRadius: 8, padding: '12px 16px', marginBottom: 10, color: '#e2e8f0', fontSize: 14, lineHeight: 1.5 }}>
                    {d}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
