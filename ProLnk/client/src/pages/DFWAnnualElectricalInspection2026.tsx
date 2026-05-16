import { useState } from 'react';

const homeAges = ['0-15 years', '16-30 years', '31-50 years', '50+ years'];

const checklistMap: Record<string, string[]> = {
  '0-15 years': [
    '✅ Test all GFCI outlets (monthly recommended — press test/reset)',
    '✅ Test all smoke detectors (replace batteries semi-annually)',
    '✅ Test all CO detectors (replace units every 5-7 years)',
    '✅ Check panel for any tripped breakers or signs of heat',
    '✅ Look for warm cover plates or outlets (sign of overload)',
    '✅ Check outdoor outlets and garage GFCIs',
    '✅ Verify exterior light fixtures for moisture intrusion',
  ],
  '16-30 years': [
    '🔴 Schedule panel inspection — AFCI breakers recommended for bedrooms',
    '🔴 Replace smoke detectors if over 10 years old',
    '🔴 Test all GFCI outlets (press test/reset on every outlet)',
    '🟡 Check bathroom and kitchen outlets for proper GFCI protection',
    '🟡 Look for aluminum wiring on 15/20A circuits (common 1970s-80s)',
    '🟡 Check panel for signs of heat or corrosion',
    '✅ Test CO detectors and verify placement near sleeping areas',
    '✅ Verify all exterior outlets have weatherproof covers',
  ],
  '31-50 years': [
    '🔴 Panel inspection and potential upgrade assessment (100A may be undersized)',
    '🔴 Check for Federal Pacific or Zinsco panels — known failure risk',
    '🔴 Aluminum wiring inspection if 1970s-era home',
    '🔴 GFCI retrofit for all wet area outlets if not already done',
    '🟡 Check for 2-prong ungrounded outlets — assess for update',
    '🟡 Look for knob and tube wiring in attic or crawl space',
    '🟡 Test smoke detectors — replace if over 10 years old',
    '✅ Test CO detectors near all sleeping areas',
  ],
  '50+ years': [
    '🔴 Full electrical inspection by licensed electrician strongly recommended',
    '🔴 Panel replacement likely needed (200A service standard)',
    '🔴 Knob and tube wiring assessment and replacement plan',
    '🔴 Aluminum wiring remediation (COPALUM connectors or replacement)',
    '🔴 GFCI protection installation throughout',
    '🔴 Smoke detector installation in all required locations',
    '🟡 Arc fault protection assessment for bedrooms',
    '🟡 Review home insurance — many carriers require electrical update',
  ],
};

const monthlies = [
  '🔲 Press test button on every GFCI outlet',
  '🔲 Test smoke detector in each zone',
  '🔲 Verify CO detector LED/display is active',
  '🔲 Check breaker panel — any tripped breakers?',
];

export default function DFWAnnualElectricalInspection2026() {
  const [age, setAge] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (item: string) =>
    setChecked(prev => ({ ...prev, [item]: !prev[item] }));

  const items = age ? checklistMap[age] : [];
  const done = items.filter(i => checked[i]).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'sans-serif', color: '#E8F4FD' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, fontWeight: 700, margin: '8px 0 4px' }}>DFW Annual Electrical Safety Inspection 2026</h1>
          <p style={{ color: '#8BA3BC', fontSize: 14 }}>Select your home age for a priority-ranked electrical safety checklist</p>
        </div>

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 10 }}>Home Age</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {homeAges.map(a => (
              <button key={a} onClick={() => { setAge(a); setChecked({}); }}
                style={{ padding: '8px 16px', borderRadius: 8, border: '2px solid', borderColor: age === a ? '#F5E642' : '#1E3A5F', background: age === a ? '#F5E642' : 'transparent', color: age === a ? '#0A1628' : '#E8F4FD', fontWeight: 600, cursor: 'pointer' }}>
                {a}
              </button>
            ))}
          </div>
        </div>

        {age && (
          <div style={{ background: '#0F2240', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: 0 }}>Annual Checklist — {age} Home</h2>
              <span style={{ color: done === items.length ? '#4ADE80' : '#8BA3BC', fontWeight: 600 }}>{done}/{items.length} ✓</span>
            </div>
            {items.map(item => (
              <div key={item} onClick={() => toggle(item)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #1E3A5F', cursor: 'pointer' }}>
                <div style={{ width: 22, height: 22, borderRadius: 4, border: '2px solid', borderColor: checked[item] ? '#F5E642' : '#1E3A5F', background: checked[item] ? '#F5E642' : 'transparent', flexShrink: 0 }} />
                <span style={{ color: checked[item] ? '#8BA3BC' : '#E8F4FD', textDecoration: checked[item] ? 'line-through' : 'none', fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0F2240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginTop: 0, marginBottom: 14 }}>📅 Monthly Safety Checks</h2>
          {monthlies.map((m, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: i < monthlies.length - 1 ? '1px solid #1E3A5F' : 'none', color: '#E8F4FD', fontSize: 14 }}>{m}</div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#3D5A80', fontSize: 12, marginTop: 24 }}>ProLnk · DFW Electrical Safety Guide 2026</p>
      </div>
    </div>
  );
}