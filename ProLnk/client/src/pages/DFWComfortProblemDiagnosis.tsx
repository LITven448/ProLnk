import { useState } from 'react';

const diagnoses: Record<string, { cause: string; trade: string; script: string; urgency: string }> = {
  hot_rooms: {
    cause: 'Undersized return air, blocked/closed vents, duct leakage, or wrong HVAC zoning — very common in DFW additions and upstairs rooms',
    trade: 'HVAC Technician',
    script: 'I have rooms that stay 5-8 degrees hotter than the thermostat setting. I want a duct leakage test and return air sizing check.',
    urgency: '⚠️ Medium — fix before summer peaks',
  },
  humidity: {
    cause: 'Oversized AC (short-cycles, doesn\’t dehumidify), infiltration through attic/crawl, or failed vapor barrier — DFW humidity is a serious comfort killer',
    trade: 'HVAC Technician + Insulation Contractor',
    script: 'My home feels clammy and humid even when the AC is running. I want my AC runtime checked and a Manual J load calculation.',
    urgency: '🔴 High — mold risk within 30-60 days',
  },
  cold_drafts: {
    cause: 'Air sealing failures at sill plates, around windows, fireplace dampers, recessed lights, and attic hatches — DFW wind makes this worse in winter',
    trade: 'Insulation / Air Sealing Contractor',
    script: 'I have cold drafts in winter, particularly near windows and exterior walls. I want a blower door test and air sealing quote.',
    urgency: '⚠️ Medium — address before next winter',
  },
  high_bills: {
    cause: 'Combination of HVAC inefficiency, duct leakage (average DFW home loses 20-30% of conditioned air), and poor envelope — bill over $200 in mild months is a red flag',
    trade: 'HVAC Technician + Energy Auditor',
    script: 'My electric bill is $X/mo in mild weather. I want a full system efficiency check including duct leakage and refrigerant charge.',
    urgency: '🟡 Low-Medium — ROI-driven timing',
  },
  noise: {
    cause: 'Duct velocity too high (undersized ducts), loose registers, failing blower motor bearings, or refrigerant issues — banging on startup indicates expansion/contraction',
    trade: 'HVAC Technician',
    script: 'I hear [describe sound] coming from my HVAC. It started [when]. I want a tech to diagnose the source before it becomes a failure.',
    urgency: '🔴 High if banging — can indicate imminent failure',
  },
  uneven_temps: {
    cause: 'Multi-story homes in DFW almost always have zoning issues — one unit trying to condition two different thermal environments is physically impossible to balance without zoning',
    trade: 'HVAC Technician',
    script: 'Upstairs is always hotter than downstairs by 5+ degrees. I want to discuss zoning options and whether my current system is properly sized.',
    urgency: '⚠️ Medium — common in DFW two-story builds',
  },
};

const problems = [
  { id: 'hot_rooms', label: '🌡️ One or more rooms stay hot' },
  { id: 'humidity', label: '💧 Home feels humid or clammy' },
  { id: 'cold_drafts', label: '🌬️ Cold drafts in winter' },
  { id: 'high_bills', label: '💸 Unusually high electric bills' },
  { id: 'noise', label: '🔊 Strange HVAC noises' },
  { id: 'uneven_temps', label: '🏠 Upstairs/downstairs temperature difference' },
];

export default function DFWComfortProblemDiagnosis() {
  const [selected, setSelected] = useState('');
  const result = selected ? diagnoses[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🏥</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW Comfort Problem Diagnosis</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Describe your comfort problem — get the root cause, the right trade to call, and exactly what to say to them.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>What's your comfort problem?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {problems.map(p => (
              <button
                key={p.id}
                onClick={() => setSelected(p.id)}
                style={{
                  background: selected === p.id ? '#F5E642′ : '#0A1628',
                  color: selected === p.id ? '#0A1628′ : '#CBD5E1',
                  border: `2px solid ${selected === p.id ? '#F5E642' : '#1E3A5F'}`,
                  borderRadius: 10,
                  padding: '14px 16px',
                  fontSize: 14,
                  fontWeight: selected === p.id ? 700 : 400,
                  cursor: 'pointer',
                  textAlign: 'left',
                  lineHeight: 1.4,
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <>
            <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <h3 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔬 Root Cause</h3>
              <p style={{ color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>{result.cause}</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
                <div style={{ color: '#64748B', fontSize: 12, marginBottom: 6 }}>WHO TO CALL</div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{result.trade}</div>
              </div>
              <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
                <div style={{ color: '#64748B', fontSize: 12, marginBottom: 6 }}>URGENCY</div>
                <div style={{ color: '#E8EDF5', fontWeight: 600, fontSize: 15 }}>{result.urgency}</div>
              </div>
            </div>
            <div style={{ background: '#0F3460', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
              <h3 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📞 What to Say When You Call</h3>
              <div style={{ background: '#112240', borderRadius: 8, padding: 16, fontStyle: 'italic', color: '#CBD5E1', lineHeight: 1.6, fontSize: 14 }}>
                "{result.script}"
              </div>
              <p style={{ color: '#64748B', fontSize: 12, margin: '12px 0 0′ }}>Using specific technical language gets you a better tech and prevents unnecessary upsells.</p>
            </div>
          </>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginTop: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🌡️ DFW Climate Context</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>
            DFW's extreme swing — 100°F summers to 20°F winters with 60-80% summer humidity — means most comfort problems have multiple causes. Address the HVAC system first, then the envelope. Never add square footage of AC capacity without a Manual J load calculation first.
          </p>
        </div>
      </div>
    </div>
  );
}
