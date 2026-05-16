import { useState } from 'react';

const reviewTriggers = [
  { label: 'Policy 1-2 yrs old, no changes', icon: '📄', items: ['Verify replacement cost matches current rebuild cost (DFW up 18% since 2023)', 'Review wind/hail deductible (commonly 1-2% of home value)', 'Confirm personal property coverage limit', 'Check loss of use coverage (min 20% of dwelling value)'] },
  { label: 'Policy 3+ yrs old', icon: '⚠️', items: ['Guaranteed replacement cost endorsement critical — standard policies may fall short by $50K+', 'Review for any exclusions added at renewal', 'Compare rate vs. market (DFW rates volatile)', 'Inflation Guard endorsement ensures automatic coverage increase'] },
  { label: 'Made renovations', icon: '🔨', items: ['Kitchen/bath remodel must be reported within 30-90 days (policy varies)', 'Square footage increase requires policy update', 'Pool, fence, outbuilding: all need separate scheduling', 'Luxury upgrades (hardwood, granite) may exceed standard personal property limits'] },
  { label: 'Added family members', icon: '👨‍👩‍👧', items: ['Young drivers in household affect premium (may need separate auto rider)', 'Home-based business: liability exposure must be declared', 'High-value items (jewelry, instruments): schedule separately', 'Review umbrella liability if new drivers or dependents'] },
  { label: 'Home value changed', icon: '📈', items: ['Get current market appraisal or agent CMA', 'Insurance value ≠ market value (replacement cost focus)', 'Land value excluded from dwelling coverage calculation', 'DFW appreciation means replacement cost often lags — get endorsement'] },
];

export default function DFWHomeInsuranceReviewGuide2026() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Annual Home Insurance Review Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Why reviewing your policy every year protects your biggest asset</p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 28, borderLeft: '4px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 12 }}>🚨 The Silent Coverage Gap Problem</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7 }}>
            DFW home rebuild costs rose <strong style={{ color: '#F5E642' }}>18-22% from 2022-2025</strong> due to lumber, labor, and permit costs. Most homeowners are insured at 2022 replacement values. After a total loss, this gap averages <strong style={{ color: '#F5E642' }}>$47,000</strong> in DFW. An annual review closes this gap before a disaster — not after.
          </p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 12 }}>💡 4 Reasons DFW Owners Miss This</h2>
          <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Auto-renew feels safe but coverage doesn't auto-update</li>
            <li>Rate increases happen at renewal without explanation</li>
            <li>New exclusions can be buried in renewal documents</li>
            <li>DFW hail/wind deductible changes are common — check yours</li>
          </ul>
        </div>

        <div style={{ marginBottom: 12 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>🎯 Your Situation → Review Checklist</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
            {reviewTriggers.map((r, i) => (
              <button key={i} onClick={() => setSelected(i === selected ? null : i)}
                style={{ background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                {r.icon} {r.label}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div style={{ background: '#0F2140', borderRadius: 12, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12 }}>{reviewTriggers[selected].icon} Review Checklist</h3>
              <ul style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, paddingLeft: 18 }}>
                {reviewTriggers[selected].items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center', marginTop: 32 }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 15, marginBottom: 6 }}>🏠 ProLnk Home Health Vault</p>
          <p style={{ color: '#0A1628', fontSize: 13 }}>Store your home's condition data, maintenance records, and renovation history — the complete insurance file your agent needs. Join the waitlist.</p>
        </div>
      </div>
    </div>
  );
}