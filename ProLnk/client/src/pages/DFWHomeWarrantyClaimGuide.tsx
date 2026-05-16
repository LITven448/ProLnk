import { useState } from 'react';

const claimProcess = [
  { step: '1', title: 'Call Your Warranty Company', detail: 'Report the issue by phone or app — do NOT hire your own contractor first or the claim will be denied. Get a service request number.', warning: false },
  { step: '2', title: 'Pay Service Call Fee ($75–$125)', detail: 'Due at time of service regardless of outcome. You pay this even if the claim is ultimately denied. Some contracts charge per-system, not per-visit.', warning: true },
  { step: '3', title: 'Wait for Contractor Assignment', detail: 'Warranty company assigns a contractor from their network. Average DFW wait: 2-5 business days. Emergencies (no AC in summer, no heat in winter) can be 24-48 hrs.', warning: false },
  { step: '4', title: 'Contractor Diagnoses the Issue', detail: 'They inspect and report to warranty company. You may not receive a copy of this report — request it in writing.', warning: true },
  { step: '5', title: 'Warranty Company Approves or Denies', detail: 'Decision typically in 1-3 business days. Approval means repair proceeds; denial triggers the appeal process.', warning: false },
  { step: '6', title: 'Repair Completed (or Negotiated)', detail: 'If approved, warranty company pays contractor directly. If replacement needed, cash-out option often available (usually at depreciated value, not retail).', warning: false },
];

const coverageGuide: Record<string, { covered: string[]; notCovered: string[]; avgWait: string }> = {
  hvac: {
    covered: ['Compressor failure', 'Heat exchanger cracks', 'Blower motor failure', 'Refrigerant leaks (in-system)', 'Control board failure'],
    notCovered: ['Pre-existing conditions', 'Improper installation', 'Lack of maintenance (dirty filters cited)', 'Refrigerant added externally', 'Cosmetic parts'],
    avgWait: '2–5 days (emergency 24–48 hrs in extreme heat)',
  },
  plumbing: {
    covered: ['Pipe leaks (in-wall)', 'Water heater failure', 'Drain stoppages (accessible)', 'Toilet mechanisms', 'Faucet/shower valve failure'],
    notCovered: ['Outdoor plumbing', 'Septic systems (unless added)', 'Roots in pipes', 'Permit work', 'Secondary damage from leak'],
    avgWait: '1–3 days (emergency: same day)',
  },
  appliance: {
    covered: ['Refrigerator compressor', 'Dishwasher motor/pump', 'Oven/range heating elements', 'Washer/dryer motor failure', 'Microwave electrical'],
    notCovered: ['Cosmetic damage', 'Racks, knobs, handles', 'Filters and consumables', 'Haul-away of old appliances', 'Brand matching replacement'],
    avgWait: '3–7 days (parts ordering adds time)',
  },
  electrical: {
    covered: ['Wiring in walls', 'Panel/breaker failure', 'Ceiling fan motor', 'Outlet/switch failure', 'Doorbell wiring'],
    notCovered: ['Code upgrade work', 'Solar/EV charging', 'Smart home devices', 'Outdoor wiring', 'Lighting fixtures'],
    avgWait: '2–4 days',
  },
};

const escalationSteps = [
  'Request supervisor review — document the call date, rep name, and reason given',
  'Ask for the independent contractor report used in the denial decision',
  'Get your own licensed contractor to provide a written diagnosis (pays off at appeal)',
  'Submit written dispute citing specific policy language that supports coverage',
  'File complaint with Texas Department of Insurance (tdi.texas.gov) — carriers respond quickly',
  'For $500+ disputes, consult a Texas consumer protection attorney — many offer free initial consult',
];

export default function DFWHomeWarrantyClaimGuide() {
  const [system, setSystem] = useState('hvac');
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState<{ likelihood: string; process: string; wait: string; tip: string } | null>(null);

  const symptoms: Record<string, string[]> = {
    hvac: ['Not cooling / not heating', 'Making loud noise', 'Leaking water indoors', 'Tripping breaker repeatedly', 'Short cycling (turns on/off rapidly)'],
    plumbing: ['Water heater not producing hot water', 'Slow/clogged drain', 'Leaking pipe (in wall)', 'Toilet not flushing properly', 'Low water pressure throughout home'],
    appliance: ['Refrigerator not cooling', 'Dishwasher not draining', 'Washer not spinning', 'Dryer not heating', 'Oven not reaching temperature'],
    electrical: ['Breaker keeps tripping', 'Outlet stopped working', 'Ceiling fan not working', 'No power to section of home', 'Flickering lights'],
  };

  const likelihoods: Record<string, Record<string, string>> = {
    hvac: { 'Not cooling / not heating': '🟡 Likely Covered — Depends on Cause', 'Making loud noise': '🟡 Partial — Covered if mechanical failure, not if debris/vibration', 'Leaking water indoors': '🟢 Usually Covered — condensate drain issues common', 'Tripping breaker repeatedly': '🟡 Depends — electrical issue covered, oversized unit not', 'Short cycling (turns on/off rapidly)': '🟢 Usually Covered — typically a mechanical/refrigerant issue' },
    plumbing: { 'Water heater not producing hot water': '🟢 Highly Likely Covered — common approved claim', 'Slow/clogged drain': '🟡 Depends — accessible stoppages yes, root intrusion often not', 'Leaking pipe (in wall)': '🟢 Usually Covered — but secondary water damage is NOT', 'Toilet not flushing properly': '🟢 Usually Covered — internal mechanism failure', 'Low water pressure throughout home': '🟡 Investigation Required — cause determines coverage' },
    appliance: { 'Refrigerator not cooling': '🟢 Usually Covered — compressor is covered', 'Dishwasher not draining': '🟢 Usually Covered — pump/motor failure', 'Washer not spinning': '🟢 Usually Covered — motor or bearing failure', 'Dryer not heating': '🟢 Usually Covered — heating element or thermostat', 'Oven not reaching temperature': '🟢 Usually Covered — element or igniter failure' },
    electrical: { 'Breaker keeps tripping': '🟢 Usually Covered — panel/breaker failure', 'Outlet stopped working': '🟢 Usually Covered — GFCI or wiring', 'Ceiling fan not working': '🟡 Motor yes, fixture/remote maybe not', 'No power to section of home': '🟢 Usually Covered — wiring issue', 'Flickering lights': '🟡 Investigate — could be fixture (not covered) or wiring (covered)' },
  };

  function calculate() {
    if (!symptom) return;
    const info = coverageGuide[system];
    const likelihood = likelihoods[system]?.[symptom] ?? '🟡 Determination Required — Depends on Diagnosis';
    const tips: Record<string, string> = {
      hvac: 'Show proof of recent filter changes and annual maintenance — lack of maintenance is the #1 denial reason for HVAC claims.',
      plumbing: 'Turn off water at the source before technician arrives to prevent further damage. Secondary water damage is typically NOT covered.',
      appliance: 'Have model and serial number ready. If replacement is offered, get cash-out option in writing and compare to retail.',
      electrical: 'Do not reset the breaker repeatedly — this can create a safety hazard and be cited as user negligence.',
    };
    setResult({
      likelihood,
      process: `Pay $75–$125 service call → Contractor diagnosis (${info.avgWait}) → Warranty company decision → Repair or appeal`,
      wait: info.avgWait,
      tip: tips[system],
    });
  }

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', color: '#1A2640', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#0A1628', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.5 }}>DFW Homeowner Resource · 2026</div>
        <h1 style={{ fontSize: 40, fontWeight: 800, color: '#0A1628', marginBottom: 12, lineHeight: 1.1 }}>How to File a Home Warranty Claim in DFW</h1>
        <p style={{ fontSize: 18, color: '#4A5568', marginBottom: 48, maxWidth: 680 }}>What's covered, how the service call process actually works, and how to fight back when a claim is denied.</p>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, marginBottom: 40, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, marginBottom: 24 }}>The Claim Process — Step by Step</h2>
          {claimProcess.map((s, i) => (
            <div key={s.step} style={{ display: 'flex', gap: 16, marginBottom: 20, alignItems: 'flex-start' }}>
              <div style={{ background: s.warning ? '#FFF3E0' : '#0A1628', color: s.warning ? '#E65100' : '#F5E642', borderRadius: 50, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, flexShrink: 0 }}>{s.step}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#0A1628', fontWeight: 700, marginBottom: 4 }}>{s.title}</div>
                <div style={{ color: '#4A5568', fontSize: 14, lineHeight: 1.7 }}>{s.detail}</div>
                {s.warning && <div style={{ background: '#FFF3E0', borderRadius: 8, padding: '8px 12px', marginTop: 8, color: '#E65100', fontSize: 13 }}>⚠️ Watch this step — common area of dispute or loss</div>}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 20, padding: 36, marginBottom: 40, boxShadow: '0 2px 20px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>🔍 Will My Warranty Cover This?</h2>
          <p style={{ color: '#4A5568', marginBottom: 28 }}>Select your system and symptom for coverage likelihood and what to expect.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#4A5568', fontSize: 13, display: 'block', marginBottom: 8 }}>System or Appliance</label>
              <select value={system} onChange={e => { setSystem(e.target.value); setSymptom(''); setResult(null); }} style={{ width: '100%', background: '#F8F9FA', color: '#1A2640', border: '1px solid #CBD5E0', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value="hvac">HVAC (Air / Heat)</option>
                <option value="plumbing">Plumbing / Water Heater</option>
                <option value="appliance">Appliances</option>
                <option value="electrical">Electrical</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#4A5568', fontSize: 13, display: 'block', marginBottom: 8 }}>What's the Problem?</label>
              <select value={symptom} onChange={e => setSymptom(e.target.value)} style={{ width: '100%', background: '#F8F9FA', color: '#1A2640', border: '1px solid #CBD5E0', borderRadius: 8, padding: '10px 12px', fontSize: 15 }}>
                <option value="">Select a symptom...</option>
                {symptoms[system]?.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <button onClick={calculate} disabled={!symptom} style={{ background: symptom ? '#0A1628' : '#CBD5E0', color: symptom ? '#F5E642' : '#718096', border: 'none', borderRadius: 10, padding: '14px 32px', fontWeight: 800, fontSize: 16, cursor: symptom ? 'pointer' : 'not-allowed', width: '100%', marginBottom: 24 }}>Check Coverage & Process →</button>
          {result && (
            <div style={{ background: '#F8F9FA', borderRadius: 12, padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
              <div><div style={{ color: '#718096', fontSize: 13, marginBottom: 4 }}>Coverage Likelihood</div><div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>{result.likelihood}</div></div>
              <div><div style={{ color: '#718096', fontSize: 13, marginBottom: 4 }}>Expected Wait Time</div><div style={{ color: '#0A1628', fontWeight: 700 }}>{result.wait}</div></div>
              <div style={{ gridColumn: '1 / -1' }}><div style={{ color: '#718096', fontSize: 13, marginBottom: 4 }}>Process Summary</div><div style={{ color: '#1A2640', fontSize: 14 }}>{result.process}</div></div>
              <div style={{ gridColumn: '1 / -1', background: '#FFFFFF', borderRadius: 10, padding: 16, borderLeft: '3px solid #0A1628' }}><div style={{ color: '#718096', fontSize: 13, marginBottom: 4 }}>Pro Tip</div><div style={{ color: '#1A2640', fontSize: 14, lineHeight: 1.7 }}>{result.tip}</div></div>
            </div>
          )}
        </div>

        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: 32, marginBottom: 40, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <h2 style={{ color: '#0A1628', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>How to Escalate a Denied Claim</h2>
          {escalationSteps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '14px 0', borderBottom: i < escalationSteps.length - 1 ? '1px solid #E2E8F0' : 'none', alignItems: 'flex-start' }}>
              <div style={{ background: '#0A1628', color: '#F5E642', borderRadius: 50, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ color: '#1A2640', fontSize: 15, lineHeight: 1.6 }}>{step}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔧</div>
          <h3 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Warranty Denied? Need a Second Opinion?</h3>
          <p style={{ color: '#8BA3C7', marginBottom: 20 }}>ProLnk connects DFW homeowners with licensed contractors for independent diagnostics — essential ammunition for appealing warranty denials.</p>
          <a href="/" style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '12px 28px', fontWeight: 800, textDecoration: 'none', fontSize: 15 }}>Get a Second Opinion Quote →</a>
        </div>
      </div>
    </div>
  );
}
