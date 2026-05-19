import { useState } from 'react';

const auditSteps: Record<string, { steps: string[]; findings: string[]; savings: string }> = {
  pre1980: {
    steps: ['Check attic insulation depth (target R-38 for DFW)', 'Inspect all door weatherstripping — gaps wider than 1/8" need replacement', 'Look for knob-and-tube or aluminum wiring in panel', 'Use incense stick near outlets on exterior walls to detect air leaks', 'Check crawl space for vapor barrier and insulation'],
    findings: ['Likely R-11 or less in attic — upgrade priority 1', 'Single-pane windows account for 30% of heat loss', 'No wall insulation standard in pre-1980 DFW homes', 'Ductwork likely uninsulated or R-4 — upgrade to R-8'],
    savings: '$400-900/yr potential savings after full audit improvements',
  },
  '1980-2000': {
    steps: ['Verify attic insulation is R-19 minimum — probe with ruler', 'Check HVAC return air sizing — undersized returns cause high bills', 'Inspect attic air sealing around can lights and plumbing penetrations', 'Thermographic app scan of exterior walls on cold morning', 'Check duct connections at every register for gaps or disconnects'],
    findings: ['Bathroom fan likely vents into attic — huge moisture problem', 'Can lights from this era are major air leakage points', 'Original windows may have failed seals (foggy appearance)', 'HVAC ductwork may have deteriorated flex duct connections'],
    savings: '$200-600/yr potential savings after targeted improvements',
  },
  post2000: {
    steps: ['Verify attic is R-38+ — many 2000s homes were underinsulated', 'Check for air sealing at top plates in attic', 'Review utility bills for summer usage spikes vs neighbors', 'Inspect HVAC filter and coil for dirt buildup', 'Check programmable thermostat settings and scheduling'],
    findings: ['Likely well-insulated but duct leakage is common culprit', 'Check for radiant barrier — many post-2000 homes lack it', 'HVAC sizing may be oversized — short-cycling raises bills', 'Smart thermostat upgrade typically yields 8-12% savings'],
    savings: '$80-300/yr potential savings — focus on behavior and HVAC tune-up',
  },
};

export default function DFWEnergyAuditDIYGuide() {
  const [age, setAge] = useState('');
  const [bill, setBill] = useState('');
  const [result, setResult] = useState<null | typeof auditSteps.pre1980>(null);

  function runAudit() {
    const b = parseInt(bill);
    if (!age) return;
    const tier = age === 'pre1980' ? 'pre1980' : age === '1980-2000' ? '1980-2000' : 'post2000';
    setResult(auditSteps[tier]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🔍</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW DIY Energy Audit</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>A professional energy audit costs $300-500. Do your own first — you'll find 80% of what they find, free.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>📋 Tell Me About Your Home</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Home Vintage</label>
              <select
                value={age}
                onChange={e => setAge(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 16 }}
              >
                <option value="">Select era...</option>
                <option value="pre1980">Before 1980</option>
                <option value="1980-2000">1980–2000</option>
                <option value="post2000">After 2000</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Avg Summer Electric Bill</label>
              <input
                type="number"
                value={bill}
                onChange={e => setBill(e.target.value)}
                placeholder="e.g. 280"
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 16, boxSizing: 'border-box' }}
              />
            </div>
          </div>
          <button onClick={runAudit} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer', width: '100%' }}>
            Generate My Audit Plan →
          </button>
        </div>

        {result && (
          <>
            <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🛠️ Your DIY Audit Steps</h3>
              {result.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
                  <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ color: '#CBD5E1', fontSize: 14, lineHeight: 1.5 }}>{step}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🎯 What You're Likely to Find</h3>
              {result.findings.map((f, i) => (
                <div key={i} style={{ borderLeft: '3px solid #F5E642', paddingLeft: 14, marginBottom: 12 }}>
                  <span style={{ color: '#94A3B8', fontSize: 14 }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#0F3460', borderRadius: 12, padding: 20, border: '2px solid #F5E642' }}>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 4 }}>Expected Annual Savings Potential</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 20 }}>{result.savings}</div>
              <p style={{ color: '#94A3B8', fontSize: 13, margin: '8px 0 0' }}>Document everything with photos. If your bill is above $250/mo in summer, a pro audit ($300-500) pays back in year one.</p>
            </div>
          </>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginTop: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>📱 Free DFW Audit Tools</h2>
          {[['Seek Thermal App', 'Turn your phone into a thermal camera — costs $299 for attachment but libraries loan them'],['Oncor Home Energy Check', 'Free online tool compares your usage to similar DFW homes'],['HVAC Runtime Tracker', 'Count how many minutes per hour your HVAC runs in extreme heat — over 55 min/hr means issues']].map(([tool, desc]) => (
            <div key={tool} style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600, color: '#E8EDF5', marginBottom: 4 }}>🔧 {tool}</div>
              <div style={{ color: '#64748B', fontSize: 13 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
