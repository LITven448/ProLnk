import { useState } from 'react';

type Stage = 'newowner' | 'firstyear' | 'ongoing' | 'selling';

const logData: Record<Stage, { label: string; template: string[]; whyItMatters: string }> = {
  newowner: {
    label: '🏠 New Homeowner',
    template: [
      'Equipment make/model/serial numbers (outdoor + air handler)',
      'Installation date (from data plate or permit)',
      'Filter size(s) for every return vent',
      'Last known service date (ask seller)',
      'Known issues at purchase (from inspection report)',
      'Thermostat model and settings at move-in',
      'Duct layout (photo every vent and return)',
      'Utility account numbers and average bills',
    ],
    whyItMatters: 'Starting a log at purchase gives you a warranty baseline, makes future diagnostic calls 3x faster, and gives you proof if a defect claim arises.',
  },
  firstyear: {
    label: '📋 First Year of Ownership',
    template: [
      'Filter change dates and brand used',
      'Any unusual sounds, smells, or performance drops',
      'Dates of all service calls + technician names',
      'Parts replaced with part numbers and costs',
      'Refrigerant added (amount + type)',
      'Electrical readings from annual tune-up',
      'Condensate drain flushes and treatments',
      'DFW weather extremes and how system responded',
    ],
    whyItMatters: 'The first year reveals your system\’s baseline. Problems that appear in year one are often warranty-covered — documented proof is required for claims.',
  },
  ongoing: {
    label: '🔄 Ongoing Maintenance',
    template: [
      'Monthly: filter check (date + condition noted)',
      'Seasonal: tune-up date + findings summary',
      'Efficiency readings (SEER, energy bills by month)',
      'Any error codes from smart thermostat',
      'Refrigerant checks (should be sealed — note if ever needed)',
      'Coil cleaning dates',
      'Capacitor and contactor inspection results',
      'Duct inspections — any leaks sealed',
    ],
    whyItMatters: 'Ongoing logs let you spot trends: rising energy bills, more frequent refrigerant needs, or worsening efficiency signal replacement before emergency failure.',
  },
  selling: {
    label: '🏷️ Preparing to Sell',
    template: [
      'Complete service history from purchase to present',
      'All repair receipts with part numbers',
      'Filter brand and change frequency history',
      'Last professional inspection report',
      'Equipment age and remaining estimated life',
      'Energy efficiency baseline (bills + SEER)',
      'Any warranties transferred (manufacturer or extended)',
      'Pending issues to disclose per Texas law',
    ],
    whyItMatters: 'A documented HVAC history adds $2,000–$8,000 to DFW home value by reducing buyer risk. It also protects you legally against post-sale claims.',
  },
};

export default function DFWHVACLogGuide() {
  const [stage, setStage] = useState<Stage | null>(null);
  const [format, setFormat] = useState<'digital' | 'paper' | null>(null);

  const data = stage ? logData[stage] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>DFW HVAC Guide</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>📝 HVAC Maintenance Log Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW HVAC systems run 10+ months a year. A good maintenance log can save you thousands in warranty disputes, faster diagnostics, and smarter resale positioning.
        </p>

        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 10 }}>Where are you in your homeownership journey?</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {(Object.entries(logData) as [Stage, typeof logData[Stage]][]).map(([k, v]) => (
              <button key={k} onClick={() => setStage(k)} style={{ padding: '8px 16px', borderRadius: 8, border: `2px solid ${stage === k ? '#F5E642' : '#1e3a5f'}`, background: stage === k ? '#F5E642' : 'transparent', color: stage === k ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600 }}>{v.label}</button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 10 }}>Log format preference:</div>
          <div style={{ display: 'flex', gap: 10 }}>
            {(['digital', 'paper'] as const).map(f => (
              <button key={f} onClick={() => setFormat(f)} style={{ padding: '8px 16px', borderRadius: 8, border: `2px solid ${format === f ? '#F5E642' : '#1e3a5f'}`, background: format === f ? '#F5E642' : 'transparent', color: format === f ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600 }}>{f === 'digital' ? '💻 Digital' : '📄 Paper'}</button>
            ))}
          </div>
        </div>

        {data && (
          <>
            <div style={{ background: '#0f2236', borderRadius: 12, padding: 24, marginBottom: 16 }}>
              <h2 style={{ color: '#F5E642', marginBottom: 16, fontSize: 18 }}>📋 What to Record — {data.label}</h2>
              {data.template.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, color: '#cbd5e1' }}>
                  <span style={{ color: '#F5E642', flexShrink: 0 }}>{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ background: '#0f2236', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#38bdf8', fontWeight: 600, marginBottom: 8 }}>💡 Why This Matters</div>
              <div style={{ color: '#cbd5e1' }}>{data.whyItMatters}</div>
            </div>
            {format && (
              <div style={{ marginTop: 16, background: '#0f2236', borderRadius: 12, padding: 20 }}>
                <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 8 }}>{format === 'digital' ? '💻 Digital Log Tips' : '📄 Paper Log Tips'}</div>
                <div style={{ color: '#cbd5e1' }}>
                  {format === 'digital'
                    ? 'Use Google Sheets or Notion. Create one row per event. Store filter brand photos in a Drive folder. Add your equipment serial number to the sheet title. Share with your spouse and HVAC pro.'
                    : 'Use a 3-ring binder. Tab by year. Staple receipts to the back of each service record. Store in the utility room near the air handler. Photograph each page so you have a digital backup.'}
                </div>
              </div>
            )}
          </>
        )}

        {!data && <div style={{ background: '#0f2236', borderRadius: 12, padding: 32, textAlign: 'center', color: '#94a3b8' }}>Select your stage to see your log template</div>}

        <div style={{ marginTop: 32, background: '#F5E642', borderRadius: 12, padding: 20, color: '#0A1628', fontWeight: 600, textAlign: 'center' }}>
          🔧 Get a DFW HVAC pro to help audit your system history — ProLnk matches you fast.
        </div>
      </div>
    </div>
  );
}
