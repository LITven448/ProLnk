import { useState } from 'react';

const stages = [
  {
    label: '🏠 New Homeowner',
    value: 'new',
    headline: 'Start with the basics',
    resources: [
      'DFW HVAC System Types: Which is Right for Your Home',
      'HVAC Filter Guide for DFW Conditions',
      'Understanding SEER Ratings in the DFW Climate',
      'Your First DFW Summer: HVAC Prep Checklist',
    ],
    vault: 'Register your home to baseline your HVAC health score in the Home Health Vault.',
    match: 'ProLnk will match you with a certified DFW HVAC tech for a new-homeowner inspection.',
  },
  {
    label: '🔧 Need Maintenance',
    value: 'maint',
    headline: 'Seasonal care resources',
    resources: [
      'DFW HVAC Spring Tune-Up Checklist',
      'HVAC Efficiency Drop Calculator — Know What You’re Losing',
      'Coil Cleaning Guide for DFW Humidity',
      'Filter Replacement Schedule for DFW Homeowners',
    ],
    vault: 'Log your maintenance history to track system health over time and protect your home value.',
    match: 'ProLnk matches you with maintenance-focused HVAC pros who specialize in DFW tune-ups.',
  },
  {
    label: '🚨 System Problem',
    value: 'repair',
    headline: 'Diagnose and fix fast',
    resources: [
      'DFW HVAC Heat Stress Score — Is Your System Overloaded?',
      'Refrigerant Leak Signs & What to Do in DFW Heat',
      'HVAC Blowing Warm in DFW: Diagnostic Guide',
      'Emergency HVAC Failure Protocol for DFW Summers',
    ],
    vault: 'Document the repair in your Home Health Vault to protect warranty claims and resale disclosures.',
    match: 'ProLnk urgently matches you with a DFW HVAC repair specialist — rated, verified, available today.',
  },
  {
    label: '🔄 Considering Replacement',
    value: 'replace',
    headline: 'Make the smartest upgrade decision',
    resources: [
      'DFW HVAC System Health Score — When to Replace vs. Repair',
      'Heat Pump vs. Gas in DFW: Full Cost Comparison',
      'SEER 18 vs. SEER 22: DFW ROI Calculator',
      'HVAC Replacement Financing Options for DFW Homeowners',
    ],
    vault: 'A full health record in the vault gives you negotiating power — and protects your investment.',
    match: 'ProLnk matches you with DFW HVAC replacement specialists with financing and rebate expertise.',
  },
  {
    label: '📈 Optimizing Efficiency',
    value: 'optimize',
    headline: 'Maximize performance and savings',
    resources: [
      'DFW Comfort Index Calculator — Temperature + Humidity + Airflow',
      'Smart Thermostat ROI for DFW Homes',
      'Ductwork Sealing Guide for DFW Efficiency',
      'Utility Rebate Programs for DFW HVAC Upgrades',
    ],
    vault: 'Track your efficiency gains over time in the Vault and document for potential energy audits.',
    match: 'ProLnk connects you with DFW HVAC pros specializing in efficiency optimization and rebate processing.',
  },
];

export default function DFWProLnkHVACComplete() {
  const [stageIdx, setStageIdx] = useState<number | null>(null);

  const stage = stageIdx !== null ? stages[stageIdx] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>📚</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>ProLnk HVAC Resource Index</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Your complete DFW HVAC guide — 3,100+ pages of resources, contractor matching, and Home Health Vault integration</p>
        </div>

        <div style={{ background: '#0d2137', borderRadius: 10, padding: '14px 16px', marginBottom: 28, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0, lineHeight: 1.7 }}>
            ProLnk covers every stage of the DFW HVAC journey. Select your current situation to get your personalized resource guide — and see how ProLnk connects you with the right contractor and the <span style={{ color: '#F5E642' }}>Home Health Vault</span>.
          </p>
        </div>

        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 12 }}>Where are you in your HVAC journey?</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28 }}>
          {stages.map((s, i) => (
            <button key={i} onClick={() => setStageIdx(i)}
              style={{ padding: '14px 16px', borderRadius: 10, border: '2px solid', cursor: 'pointer', textAlign: 'left',
                borderColor: stageIdx === i ? '#F5E642' : '#1e3a5f',
                background: stageIdx === i ? '#F5E64222' : '#0d2137',
                color: stageIdx === i ? '#F5E642' : '#94a3b8', fontSize: 15, fontWeight: stageIdx === i ? 700 : 400 }}>
              {s.label}
            </button>
          ))}
        </div>

        {stage && (
          <div style={{ background: '#0d2137', borderRadius: 14, padding: 24, border: '2px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontSize: 17, fontWeight: 700, marginBottom: 16 }}>📖 {stage.headline}</div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>Top Resources From the 3,100+ Page Library</div>
              {stage.resources.map((r, i) => (
                <div key={i} style={{ padding: '10px 12px', background: '#0A1628', borderRadius: 8, marginBottom: 6, color: '#cbd5e1', fontSize: 13, display: 'flex', gap: 8 }}>
                  <span style={{ color: '#F5E642' }}>→</span> {r}
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 16, padding: '14px 16px', background: '#1e3a5f33', borderRadius: 10 }}>
              <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>🏠 Home Health Vault</div>
              <p style={{ color: '#cbd5e1', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{stage.vault}</p>
            </div>

            <div style={{ padding: '14px 16px', background: '#F5E64211', borderRadius: 10 }}>
              <div style={{ color: '#F5E642', fontSize: 12, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>🔧 ProLnk Contractor Match</div>
              <p style={{ color: '#cbd5e1', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{stage.match}</p>
            </div>

            <button style={{ width: '100%', marginTop: 20, padding: '14px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              Get Matched on ProLnk.io →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

