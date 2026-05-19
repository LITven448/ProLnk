import { useState } from 'react';

const criteria = [
  { key: 'license', label: 'License Verified', pts: 25, icon: '📋', how: 'Check TDLR.texas.gov' },
  { key: 'address', label: 'Local DFW Address', pts: 10, icon: '📍', how: 'Google Maps + physical visit' },
  { key: 'insurance', label: 'Insurance Confirmed', pts: 20, icon: '🛡️', how: 'Certificate of insurance on file' },
  { key: 'references', label: 'References Checked', pts: 10, icon: '👥', how: '3+ homeowner references called' },
  { key: 'permits', label: 'Pulls Permits', pts: 15, icon: '🏛️', how: 'Confirm they pull required permits' },
  { key: 'bbb', label: 'BBB Standing', pts: 10, icon: '⭐', how: 'A or B rating on BBB.org' },
  { key: 'cert', label: 'Manufacturer Certified', pts: 10, icon: '🏅', how: 'Brand cert (e.g. Carrier, Trane)' },
];

const getRecommendation = (score: number) => {
  if (score >= 80) return { label: '✅ Hire with Confidence', color: '#22c55e', detail: 'This contractor meets DFW professional standards. Proceed with a written contract.' };
  if (score >= 60) return { label: '⚠️ Hire with Caution', color: '#F5E642', detail: 'Some gaps exist. Get everything in writing and verify missing items before work begins.' };
  if (score >= 40) return { label: '🔶 Request More Info', color: '#f97316', detail: 'Too many unknowns. Request proof on missing items before any payment.' };
  return { label: '🚫 Do Not Hire', color: '#ef4444', detail: 'Critical trust signals missing. Significant risk of unlicensed or underinsured work.' };
};

export default function DFWContractorTrustScore() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  const score = criteria.reduce((sum, c) => sum + (checked[c.key] ? c.pts : 0), 0);
  const rec = getRecommendation(score);
  const hasAny = Object.values(checked).some(Boolean);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK DFW</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Contractor Trust Score</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Enter 10 data points about your DFW contractor to calculate their trust score before you hire.</p>

        <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 32, background: '#111d30', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ textAlign: 'center', minWidth: 100 }}>
            <div style={{ fontSize: 52, fontWeight: 900, color: score >= 80 ? '#22c55e' : score >= 60 ? '#F5E642′ : score >= 40 ? '#f97316' : '#ef4444', lineHeight: 1 }}>{score}</div>
            <div style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>/ 100 pts</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ height: 12, background: '#1e3a5f', borderRadius: 6, overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ height: '100%', width: `${score}%`, background: score >= 80 ? '#22c55e' : score >= 60 ? '#F5E642′ : score >= 40 ? '#f97316' : '#ef4444', transition: ’width 0.4s, background 0.4s' }} />
            </div>
            {hasAny && (
              <div>
                <div style={{ color: rec.color, fontWeight: 700, marginBottom: 4 }}>{rec.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{rec.detail}</div>
              </div>
            )}
            {!hasAny && <div style={{ color: '#334155', fontSize: 14 }}>Check items below to calculate score</div>}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {criteria.map(c => (
            <div key={c.key} onClick={() => toggle(c.key)} style={{ background: checked[c.key] ? '#0d2a0d' : '#111d30', border: `1px solid ${checked[c.key] ? '#22c55e' : '#1e3a5f'}`, borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14, transition: 'all 0.2s' }}>
              <div style={{ fontSize: 24 }}>{checked[c.key] ? '✅' : c.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{c.label}</div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{c.how}</div>
              </div>
              <div style={{ color: checked[c.key] ? '#22c55e' : '#F5E642', fontWeight: 800, fontSize: 16, minWidth: 40, textAlign: 'right' }}>+{c.pts}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, background: '#111d30', borderRadius: 10, padding: '1rem', color: '#64748b', fontSize: 13 }}>
          💡 <strong style={{ color: '#F5E642′ }}>ProLnk tip:</strong> All TrustyPro-verified contractors have license, insurance, and permit history pre-confirmed. Skip the research — get verified pros through ProLnk.
        </div>
      </div>
    </div>
  );
}
