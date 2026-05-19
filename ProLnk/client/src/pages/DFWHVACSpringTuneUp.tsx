import { useState } from 'react';

const homeTypes = ['Single-story (under 2,000 sq ft)', 'Single-story (2,000-3,500 sq ft)', 'Two-story (any size)', 'New construction (under 5 years)', 'Older home (15+ years)'];
const previousIssues = ['No issues last year', 'High energy bills', 'Uneven cooling (hot rooms)', 'System froze up or iced over', 'Strange noises', 'Humidity problems indoors'];

const springItems = [
  { task: 'Condenser coil deep clean', timing: 'Before first 90°F day (target: mid-March DFW)', critical: true },
  { task: 'Refrigerant level verification', timing: 'Before cooling season load — easier to top off in mild weather', critical: true },
  { task: 'Capacitor replacement if degraded', timing: 'Spring = planned replacement vs. emergency replacement in July', critical: true },
  { task: 'Condensate drain treatment & test', timing: 'Before humidity season hits (DFW May-September)', critical: true },
  { task: 'Thermostat programming for summer', timing: 'Program before rates spike in May', critical: false },
  { task: 'Duct inspection for winter damage', timing: 'Winter condensation can damage flex duct connections', critical: false },
  { task: 'Attic insulation check', timing: 'DFW attics hit 160°F in summer — insulation degradation adds $100-200/month', critical: false },
  { task: 'Indoor air quality system service', timing: 'Spring allergen peak (March-May) — UV lamps, media filters', critical: false },
];

const questionsByIssue: Record<string, string[]> = {
  'High energy bills': ['What is the system\’s SEER rating — is it still operating at spec?', 'Can you measure static pressure to find airflow restrictions?', 'Is the refrigerant charge within 2% of manufacturer spec?'],
  'Uneven cooling (hot rooms)': ['Can you do a room-by-room temperature split test?', 'Are there any duct leaks or disconnections in unconditioned spaces?', 'Is the blower speed properly matched to my duct system?'],
  'System froze up or iced over': ['What caused the freeze — refrigerant, airflow, or thermostat fault?', 'Is the evaporator coil clean or showing microbial growth?', 'Is the drain pan clear and does the safety float switch work?'],
  'Strange noises': ['Can you identify the noise source — blower, compressor, or refrigerant flow?', 'Are refrigerant line insulation and vibration mounts intact?', 'Is the contactor chattering — a sign it\’s about to fail?'],
  'Humidity problems indoors': ['Is my system undersized or oversized for my current home load?', 'Should I add a whole-home dehumidifier before DFW summer?', 'Are any supply/return air leaks pulling unconditioned attic air in?'],
  'No issues last year': ['What\’s the projected lifespan of my current system?', 'Is there anything you\’re watching that could become an issue this summer?', 'Is my system operating at original efficiency or has it degraded?'],
};

export default function DFWHVACSpringTuneUp() {
  const [homeType, setHomeType] = useState('');
  const [issue, setIssue] = useState('');
  const [showPlan, setShowPlan] = useState(false);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>DFW HVAC Guide 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>Spring Tune-Up Guide</h1>
        <p style={{ color: '#94A3B8', marginBottom: 36 }}>Why March-April is the most important HVAC maintenance window in DFW — and exactly what to ask for.</p>

        <div style={{ background: '#0F1E38', borderRadius: 12, padding: 24, marginBottom: 32, borderLeft: '4px solid #F5E642′ }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>🌸 Why Spring Matters Most in DFW</div>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              'DFW transitions from 40°F nights to 95°F days in under 6 weeks — systems go from idle to maximum stress with no ramp-up',
              'Spring is the last window for non-emergency refrigerant work before summer surcharges ($50-100/hr premium)',
              'Capacitor failures spike in first heat wave — spring replacement costs $150 vs. $450 emergency call in July',
              'Condensate drain algae grows exponentially once humidity arrives — prevention in spring prevents flooding in August',
            ].map((point, i) => (
              <div key={i} style={{ background: '#111D35', borderRadius: 8, padding: '12px 16px', fontSize: 14, color: '#CBD5E1′ }}>📍 {point}</div>
            ))}
          </div>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Spring Tune-Up Task List</h2>
        <div style={{ marginBottom: 36 }}>
          {springItems.map((item, i) => (
            <div key={i} style={{ background: '#111D35', borderRadius: 10, padding: '14px 18px', marginBottom: 10, borderLeft: `4px solid ${item.critical ? '#F5E642' : '#1E3A5F'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: 600, fontSize: 15 }}>{item.critical ? '⚠️' : '📋'} {item.task}</span>
                {item.critical && <span style={{ fontSize: 11, color: '#F5E642', background: '#1A2A10', padding: '3px 8px', borderRadius: 20, flexShrink: 0, marginLeft: 10 }}>PRIORITY</span>}
              </div>
              <div style={{ fontSize: 13, color: '#64748B', marginTop: 6 }}>⏰ {item.timing}</div>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🎯 Get Your Personalized Spring Plan</h2>
        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 14, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Your home type:</label>
            <div style={{ display: 'grid', gap: 8 }}>
              {homeTypes.map(ht => (
                <button key={ht} onClick={() => setHomeType(ht)} style={{ textAlign: 'left', padding: '10px 16px', borderRadius: 8, border: '1px solid', borderColor: homeType === ht ? '#F5E642′ : '#1E3A5F', background: homeType === ht ? '#1A2A10' : '#0A1628', color: homeType === ht ? '#F5E642' : '#CBD5E1', fontSize: 14, cursor: ’pointer' }}>
                  {homeType === ht ? '● ' : '○ '}{ht}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 14, color: '#94A3B8', display: 'block', marginBottom: 8 }}>Previous year's issue (if any):</label>
            <div style={{ display: 'grid', gap: 8 }}>
              {previousIssues.map(pi => (
                <button key={pi} onClick={() => setIssue(pi)} style={{ textAlign: 'left', padding: '10px 16px', borderRadius: 8, border: '1px solid', borderColor: issue === pi ? '#F5E642′ : '#1E3A5F', background: issue === pi ? '#1A2A10' : '#0A1628', color: issue === pi ? '#F5E642' : '#CBD5E1', fontSize: 14, cursor: ’pointer' }}>
                  {issue === pi ? '● ' : '○ '}{pi}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowPlan(true)} disabled={!homeType || !issue} style={{ background: homeType && issue ? '#F5E642′ : '#1E3A5F', color: '#0A1628', border: ’none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: homeType && issue ? 'pointer' : 'not-allowed' }}>
            Generate My Spring Plan →
          </button>
        </div>

        {showPlan && homeType && issue && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: '#F5E642', marginBottom: 16 }}>🌸 Your Spring Tune-Up Plan</div>
            <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 16 }}>{homeType} · Issue: {issue}</div>
            <div style={{ fontWeight: 600, marginBottom: 10 }}>Questions to ask your tech at the spring visit:</div>
            {(questionsByIssue[issue] || questionsByIssue['No issues last year']).map((q, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', marginBottom: 8, fontSize: 14, color: '#CBD5E1′ }}>❓ {q}</div>
            ))}
            {homeType.includes('older') || homeType.includes('15+') ? (
              <div style={{ marginTop: 16, padding: '14px 18px', background: '#1A1010', borderRadius: 8, borderLeft: '4px solid #EF4444', fontSize: 14, color: '#FCA5A5′ }}>
                ⚠️ Older homes (15+ years): Ask specifically about refrigerant type — R-22 (Freon) systems are expensive to service. Get a quote for conversion or replacement.
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
