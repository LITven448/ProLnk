import { useState } from 'react';

const auditItems = [
  { id: 'insulation', label: 'Attic Insulation', question: 'Do you know your attic R-value?', yes: 'Known', no: 'Unknown/Likely Low', weight: 20 },
  { id: 'ducts', label: 'Duct Leakage', question: 'Are your HVAC ducts in the attic (not conditioned space)?', yes: 'Attic ducts (leakage risk)', no: 'Conditioned space (better)', weight: 25 },
  { id: 'windows', label: 'Windows', question: 'Do you have single-pane windows?', yes: 'Single-pane (poor)', no: 'Double/triple pane', weight: 15 },
  { id: 'age', label: 'Home Age', question: 'Was your home built before 1990?', yes: 'Pre-1990 (air sealing risk)', no: '1990 or newer', weight: 15 },
  { id: 'bills', label: 'Energy Bills', question: 'Is your summer electric bill over $300/month?', yes: 'High bills (efficiency issues)', no: 'Within normal range', weight: 10 },
  { id: 'hvac', label: 'HVAC Age', question: 'Is your HVAC system over 10 years old?', yes: 'Aging HVAC', no: 'Newer system', weight: 10 },
  { id: 'lighting', label: 'Lighting', question: 'Do you still have incandescent or CFL bulbs?', yes: 'Older bulbs (upgrade potential)', no: 'Already LED', weight: 3 },
  { id: 'water', label: 'Water Heater', question: 'Is your water heater over 10 years old or standard tank?', yes: 'Older/standard tank', no: 'Newer or heat pump', weight: 2 },
];

function getScore(answers: Record<string, boolean>) {
  let waste = 0;
  auditItems.forEach((item) => {
    if (answers[item.id] === true) waste += item.weight;
  });
  return waste;
}

function getActions(answers: Record<string, boolean>) {
  const actions: string[] = [];
  if (answers['insulation'] === true) actions.push('Add attic insulation to R-38 or higher ($1,500–4,000, saves $200–500/yr)');
  if (answers['ducts'] === true) actions.push('Seal and insulate attic ducts — lose 20–30% of conditioned air right now ($800–2,500)');
  if (answers['windows'] === true) actions.push('Replace single-pane windows with Low-E double-pane ($300–800/window)');
  if (answers['age'] === true) actions.push('Air seal around can lights, plumbing penetrations, and attic hatch ($300–800, high ROI)');
  if (answers['hvac'] === true) actions.push('Service HVAC and test for refrigerant leaks. Plan for replacement ($5,000–12,000)');
  if (answers['lighting'] === true) actions.push('Switch to LED bulbs throughout ($50–150, immediate savings)');
  if (answers['water'] === true) actions.push('Consider heat-pump water heater — uses 70% less energy ($1,200–2,000 installed)');
  return actions;
}

export default function EnergyAuditGuide() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const answered = Object.keys(answers).length;
  const score = getScore(answers);
  const actions = getActions(answers);

  function toggle(id: string, val: boolean) {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  }

  function getScoreColor() {
    if (score < 20) return '#34d399';
    if (score < 50) return '#fbbf24';
    return '#f87171';
  }

  function getScoreLabel() {
    if (score < 20) return 'Efficient Home';
    if (score < 50) return 'Moderate Waste';
    return 'High Energy Waste';
  }

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ color: '#10b981', fontSize: 14, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            ⚡ DFW Energy Guide
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px' }}>
            Professional Energy Audit Guide
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', margin: 0 }}>
            Find Every Dollar of Wasted Energy in Your DFW Home
          </p>
        </div>

        {/* What an Audit Covers */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>What a Professional Audit Covers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
            {[
              { icon: '💨', name: 'Blower Door Test', desc: 'Pressurizes your home to locate every air leak. Most important test in DFW — cooling escapes through hidden gaps.' },
              { icon: '🌡️', name: 'Thermal Imaging', desc: 'Shows heat/cold spots in walls and ceilings — identifies missing or inadequate insulation invisible to the eye.' },
              { icon: '🔧', name: 'HVAC Inspection', desc: 'Duct leakage test + equipment efficiency review. DFW ducts in attics lose 20–30% of conditioned air.' },
              { icon: '📊', name: 'Appliance Inventory', desc: 'Identifies your biggest energy consumers — HVAC, water heater, appliances — and quantifies their impact.' },
              { icon: '💡', name: 'Lighting Assessment', desc: 'Maps LED conversion opportunities. Quick wins that pay back in under 12 months.' },
            ].map((item) => (
              <div key={item.name} style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ color: '#10b981', fontWeight: 700, marginBottom: 6 }}>{item.name}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Cost & Rebates */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: 20 }}>
            <h3 style={{ color: '#fbbf24', marginTop: 0 }}>💰 DFW Audit Cost</h3>
            <div style={{ marginBottom: 8 }}>
              <span style={{ color: '#e2e8f0', fontWeight: 700 }}>Standard: </span>
              <span style={{ color: '#94a3b8' }}>$200–400</span>
            </div>
            <div>
              <span style={{ color: '#e2e8f0', fontWeight: 700 }}>Comprehensive (with blower door): </span>
              <span style={{ color: '#94a3b8' }}>$400–700</span>
            </div>
          </div>
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 10, padding: 20 }}>
            <h3 style={{ color: '#34d399', marginTop: 0 }}>🏷️ Texas Rebate</h3>
            <p style={{ color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
              Oncor customers get $0–100 rebate for certified energy audits in their service territory. Ask your auditor to use a certified BPI or RESNET professional to qualify.
            </p>
          </div>
        </div>

        {/* What Auditors Find in DFW */}
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: 28, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>What Auditors Find in DFW Homes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { pct: '78%', issue: 'Attic insulation below recommended R-value', fix: 'Add insulation to R-38 minimum for DFW climate' },
              { pct: '20–30%', issue: 'Of conditioned air lost through duct leaks', fix: 'Duct sealing and insulation — high ROI improvement' },
              { pct: '∞', issue: 'Air infiltration around can lights, plumbing, attic hatch', fix: 'Air sealing — fastest payback of any improvement' },
              { pct: '30%', issue: 'Of DFW homes have oversized HVAC (poor dehumidification)', fix: 'Right-sizing HVAC on replacement for comfort + efficiency' },
            ].map((item) => (
              <div key={item.issue} style={{ display: 'flex', gap: 16, padding: '14px 16px', background: '#1e293b', borderRadius: 8 }}>
                <div style={{ minWidth: 56, color: '#f87171', fontWeight: 800, fontSize: 18 }}>{item.pct}</div>
                <div>
                  <div style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: 2 }}>{item.issue}</div>
                  <div style={{ color: '#64748b', fontSize: 13 }}>Fix: {item.fix}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DIY vs Pro */}
        <div style={{ background: '#1a1a2e', border: '1px solid #4338ca', borderRadius: 12, padding: 24, marginBottom: 40 }}>
          <h3 style={{ color: '#a5b4fc', marginTop: 0 }}>🔍 DIY vs. Professional Audit</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ color: '#94a3b8', fontWeight: 600, marginBottom: 8 }}>DIY Checklist</div>
              <div style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7 }}>Catches 40–50% of issues. Good starting point. Free to do right now with a flashlight and a thermometer.</div>
            </div>
            <div>
              <div style={{ color: '#10b981', fontWeight: 600, marginBottom: 8 }}>Professional Audit</div>
              <div style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7 }}>Catches 90%+ of issues. Blower door and thermal camera find what you cannot see. Worth every dollar for homes over 10 years old.</div>
            </div>
          </div>
        </div>

        {/* Interactive Worksheet */}
        <div style={{ background: '#0f172a', border: '1px solid #10b981', borderRadius: 12, padding: 28, marginBottom: 40 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, color: '#34d399' }}>⚡ Interactive Energy Audit Worksheet</h2>
          <p style={{ color: '#64748b', marginBottom: 24 }}>Answer 8 questions to estimate your energy waste score and get your first recommended actions.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
            {auditItems.map((item) => (
              <div key={item.id} style={{ background: '#0a0a0f', borderRadius: 8, padding: '16px 18px' }}>
                <div style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: 10 }}>{item.label}: {item.question}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => toggle(item.id, true)} style={{
                    padding: '6px 16px', borderRadius: 6, border: '1px solid', cursor: 'pointer', fontSize: 13,
                    borderColor: answers[item.id] === true ? '#f87171' : '#1e293b',
                    background: answers[item.id] === true ? '#2d1a1a' : '#0a0a0f',
                    color: answers[item.id] === true ? '#f87171' : '#64748b',
                  }}>Yes</button>
                  <button onClick={() => toggle(item.id, false)} style={{
                    padding: '6px 16px', borderRadius: 6, border: '1px solid', cursor: 'pointer', fontSize: 13,
                    borderColor: answers[item.id] === false ? '#34d399' : '#1e293b',
                    background: answers[item.id] === false ? '#0d2a1e' : '#0a0a0f',
                    color: answers[item.id] === false ? '#34d399' : '#64748b',
                  }}>No</button>
                </div>
              </div>
            ))}
          </div>
          {answered >= 6 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: getScoreColor() }}>{score}</div>
                <div>
                  <div style={{ color: getScoreColor(), fontWeight: 700, fontSize: 18 }}>{getScoreLabel()}</div>
                  <div style={{ color: '#64748b', fontSize: 13 }}>Energy waste score out of 100</div>
                </div>
              </div>
              {actions.length > 0 && (
                <div>
                  <div style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: 10 }}>Your Priority Actions:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {actions.map((a, i) => (
                      <div key={i} style={{ background: '#1e293b', borderRadius: 6, padding: '10px 14px', color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>
                        {i + 1}. {a}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: '#0f172a', border: '1px solid #1e293b', borderRadius: 12, padding: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⚡</div>
          <h3 style={{ color: '#e2e8f0', marginTop: 0 }}>Find a Certified Energy Auditor</h3>
          <p style={{ color: '#94a3b8', marginBottom: 24 }}>ProLnk connects you with BPI and RESNET-certified energy professionals in DFW.</p>
          <button style={{
            background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff',
            border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16,
            fontWeight: 700, cursor: 'pointer',
          }}>
            Find a Certified Energy Auditor →
          </button>
        </div>

      </div>
    </div>
  );
}
