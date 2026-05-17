import { useState } from 'react';

const concerns = [
  {
    id: 'post_hail',
    label: 'Post-hail inspection needed',
    severity: 'urgent',
    steps: [
      'Submit to ProLnk immediately after the storm — adjusters book up fast',
      'Matched to HAAG-certified Charter roofer in your DFW zip within 24 hours',
      'Full photo documentation of all hail strikes, dents, and granule loss',
      'Written inspection report suitable for insurance claim submission',
      'Vault stores storm date, report, and photos permanently for future claims',
    ],
  },
  {
    id: 'active_leak',
    label: 'Active leak — water inside home now',
    severity: 'emergency',
    steps: [
      'Place buckets, move valuables — minimize interior damage now',
      'Submit as emergency through ProLnk',
      'Priority dispatch — Charter roofer contacted same day',
      'Emergency tarp installed to stop active water intrusion',
      'Full assessment and written report follow within 48 hours',
    ],
  },
  {
    id: 'aging_roof',
    label: 'Aging roof (15+ years) — planning replacement',
    severity: 'low',
    steps: [
      'Submit to ProLnk with roof age and any visible concerns',
      'Matched to HAAG-certified Charter roofer for a pre-replacement assessment',
      'Pro documents current condition, remaining life estimate, and material options',
      'Competitive quote comparison from Charter-tier DFW roofers',
      'Vault records the assessment — establishes roof condition baseline for resale',
    ],
  },
  {
    id: 'visible_damage',
    label: 'Visible damage — lifted shingles, missing sections',
    severity: 'moderate',
    steps: [
      'Submit with photos of all visible damage areas',
      'ProLnk routes to Charter roofer within 72 hours',
      'Full inspection includes decking assessment below damaged sections',
      'Written report with repair vs. replace recommendation',
      'Insurance claim support included if damage is covered',
    ],
  },
];

const colors: Record<string, string> = { emergency: '#ef4444', urgent: '#f97316', moderate: '#eab308', low: '#22c55e' };
const severityLabel: Record<string, string> = { emergency: '🚨 Emergency Protocol', urgent: '⚠️ Priority Dispatch', moderate: '📋 Standard Assessment', low: '✅ Planning Assessment' };

export default function DFWRoofingProLnkCTA2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = concerns.find(c => c.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🏠</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
          DFW Roofing Assessment Through ProLnk — 2026 Guide
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          Every DFW roofing concern gets matched to HAAG-certified Charter roofers — with full documentation for your Vault and insurance file.
        </p>

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔐 What Makes a ProLnk Roofing Assessment Different</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['🎖️ HAAG Certified', 'All DFW roofers matched through ProLnk hold HAAG certification for hail damage assessment'],
              ['📸 Photo Documentation', 'Every strike, granule loss zone, and flashing gap captured and labeled by location'],
              ['📄 Written Report', 'Signed inspection report structured for insurance submission and resale disclosure'],
              ['🛡️ Claim Support', 'Charter roofers assist with DFW insurance adjuster coordination if claim is warranted'],
              ['🏦 Vault Storage', 'Inspection report stored permanently in your Home Health Vault — accessible at resale'],
            ].map(([icon, desc]) => (
              <div key={icon} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
                <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 180 }}>{icon}</span>
                <span style={{ color: '#94a3b8' }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Describe Your Roofing Concern</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {concerns.map(c => (
              <button
                key={c.id}
                onClick={() => setSelected(c.id)}
                style={{
                  textAlign: 'left', padding: '12px 16px', borderRadius: 8,
                  border: `2px solid ${selected === c.id ? '#F5E642' : '#1e3a5f'}`,
                  background: selected === c.id ? '#0A1628' : 'transparent', color: '#cbd5e1', cursor: 'pointer', fontSize: 15,
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {match && (
          <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24, borderLeft: `4px solid ${colors[match.severity]}` }}>
            <div style={{ color: colors[match.severity], fontWeight: 800, fontSize: 18, marginBottom: 12 }}>{severityLabel[match.severity]}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {match.steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, color: '#cbd5e1' }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 24 }}>{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 6 }}>Start Your Roof Assessment</div>
          <div style={{ color: '#0A1628', marginBottom: 12 }}>Describe your concern — ProLnk routes you to a HAAG-certified Charter roofer in your DFW zip within 24 hours.</div>
          <a href="/homeowner-signup" style={{ background: '#0A1628', color: '#F5E642', padding: '12px 28px', borderRadius: 8, fontWeight: 800, textDecoration: 'none', display: 'inline-block' }}>
            Book Inspection →
          </a>
        </div>
      </div>
    </div>
  );
}