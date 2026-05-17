import { useState } from 'react';

const concerns = [
  {
    id: 'minor_crack',
    label: 'Minor crack — hairline, no doors sticking',
    severity: 'low',
    steps: [
      'Submit your concern through ProLnk with a photo',
      'Matched to a Charter foundation pro for a monitoring assessment',
      'Pro installs elevation benchmarks if warranted',
      'Report includes recommended re-check timeline',
      'All documentation stored in your Home Health Vault',
    ],
  },
  {
    id: 'sticking_doors',
    label: 'Sticking doors or windows — multiple locations',
    severity: 'moderate',
    steps: [
      'Submit with photos of all affected doors/windows',
      'ProLnk routes to engineer-supervised Charter pro within 72 hours',
      'Elevation survey performed across 10+ points',
      'Written report with differential movement readings',
      'Vault stores report, photos, and benchmark data permanently',
    ],
  },
  {
    id: 'large_crack',
    label: 'Large crack — over 1/4 inch wide or widening',
    severity: 'urgent',
    steps: [
      'Submit as urgent through ProLnk',
      'Priority routing — Charter pro dispatched within 24 hours',
      'Structural engineer review included in assessment',
      'Full documentation: photos, measurements, elevation survey',
      'Vault report includes recommended remediation scope and cost estimate',
    ],
  },
  {
    id: 'slab_leak',
    label: 'Suspected slab leak (high water bill, wet floors)',
    severity: 'emergency',
    steps: [
      'Call a plumber first — slab leaks require immediate plumbing attention',
      'After plumbing is resolved, submit to ProLnk for foundation assessment',
      'Pro evaluates structural impact of water intrusion',
      'Full report documents pre- and post-repair foundation condition',
      'Vault records the complete incident history — critical for future resale',
    ],
  },
];

const colors: Record<string, string> = { emergency: '#ef4444', urgent: '#f97316', moderate: '#eab308', low: '#22c55e' };
const severityLabel: Record<string, string> = { emergency: '🚨 Emergency Protocol', urgent: '⚠️ Priority Assessment', moderate: '📋 Standard Assessment', low: '✅ Monitoring Assessment' };

export default function DFWFoundationProLnkCTA2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const match = concerns.find(c => c.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🏗️</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>
          DFW Foundation Assessment Through ProLnk — 2026 Guide
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>
          Every DFW foundation concern gets routed to engineer-supervised Charter pros — with permanent Vault documentation.
        </p>

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🔐 What Makes a ProLnk Foundation Assessment Different</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['🎖️ Charter Tier Only', 'DFW foundation pros matched through ProLnk carry engineer supervision credentials'],
              ['📐 Elevation Survey', '10+ point survey using zip level tools — not just a visual walk-through'],
              ['📸 Photo Documentation', 'Every crack, gap, and symptom captured and labeled'],
              ['📄 Written Report', 'Signed report with findings, severity classification, and recommended action'],
              ['🏦 Vault Storage', 'Report stored permanently in your Home Health Vault — accessible at resale'],
            ].map(([icon, desc]) => (
              <div key={icon} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
                <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 180 }}>{icon}</span>
                <span style={{ color: '#94a3b8' }}>{desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1e35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Describe Your Foundation Concern</h2>
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
          <div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628', marginBottom: 6 }}>Start Your Foundation Assessment</div>
          <div style={{ color: '#0A1628', marginBottom: 12 }}>Describe your concern — ProLnk routes you to the right Charter pro for your DFW zip and severity level.</div>
          <a href="/homeowner-signup" style={{ background: '#0A1628', color: '#F5E642', padding: '12px 28px', borderRadius: 8, fontWeight: 800, textDecoration: 'none', display: 'inline-block' }}>
            Get Assessed →
          </a>
        </div>
      </div>
    </div>
  );
}