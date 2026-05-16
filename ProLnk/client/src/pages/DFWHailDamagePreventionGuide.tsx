import { useState } from 'react';

const homeFeatures = ['Asphalt shingle roof (standard)', 'Tile or slate roof', 'Metal roof', 'Skylights present', 'Solar panels installed', 'Older roof (15+ years)'];
const insuranceDiscounts: Record<string, string> = {
  'Asphalt shingle roof (standard)': '15–30%',
  'Tile or slate roof': '5–10%',
  'Metal roof': '20–35%',
  'Skylights present': '0% (higher risk, may increase premium)',
  'Solar panels installed': '0% — panels are separate line item',
  'Older roof (15+ years)': '0% until replaced',
};

const vulnerabilityScores: Record<string, { score: number; label: string; measures: string[]; upgradeCost: string }> = {
  'Asphalt shingle roof (standard)': { score: 75, label: 'High', measures: ['Upgrade to Class 4 impact-resistant shingles (UL 2218)', 'Add ridge vent protection caps', 'Screen HVAC condenser with hail guard', 'Install hail-rated skylights if any exist', 'Document roof with photos before each storm season'], upgradeCost: '$8,000–$18,000' },
  'Skylights present': { score: 90, label: 'Very High', measures: ['Replace standard skylights with hail-rated tempered glass', 'Install exterior skylight screens', 'Consider closing off skylights not essential to ventilation', 'Keep interior protection (shades) to limit glass spray', 'Insure skylights separately if high-value'], upgradeCost: '$1,500–$4,000 per skylight' },
  'Solar panels installed': { score: 85, label: 'Very High', measures: ['Ensure panels are rated for 1-inch hail at 50mph (most commercial panels are)', 'Confirm installer warranty covers hail damage', 'Add monitoring alerts to detect panel output drops post-storm', 'Photograph panels before and after each major hail event', 'Review if homeowner policy covers panels or if separate rider needed'], upgradeCost: '$0 if properly rated — verify with installer' },
  'Metal roof': { score: 20, label: 'Low', measures: ['Inspect panel fasteners annually for loosening', 'Check ridge caps and flashing — most vulnerable points', 'Dent assessment after large hail (cosmetic vs structural)', 'Ensure gutters are secured — impact can loosen brackets', 'Vehicle protection remains top priority even with metal roof'], upgradeCost: '$200–$800 maintenance' },
  'Older roof (15+ years)': { score: 95, label: 'Critical', measures: ['Replace roof before next hail season — existing damage compounds with each event', 'Use Class 4 shingles on replacement for insurance discount', 'Document current condition with dated photos', 'Get pre-replacement inspection to document pre-existing damage', 'File insurance claim if prior hail damage exists'], upgradeCost: '$10,000–$22,000 full replacement' },
};

function getAssessment(feature: string) {
  return vulnerabilityScores[feature] || { score: 60, label: 'Moderate', measures: ['Inspect roof annually and after every hail event', 'Ensure all skylights are rated for impact', 'Protect HVAC condenser with a hail guard', 'Cover vehicles during hail alerts', 'Review insurance policy for hail coverage limits'], upgradeCost: '$2,000–$8,000' };
}

export default function DFWHailDamagePreventionGuide() {
  const [feature, setFeature] = useState('');
  const [result, setResult] = useState<{ score: number; label: string; measures: string[]; upgradeCost: string } | null>(null);

  function handleSubmit() {
    if (!feature) return;
    setResult(getAssessment(feature));
  }

  const scoreColor = (score: number) => score >= 80 ? '#ef4444' : score >= 60 ? '#f97316' : score >= 40 ? '#eab308' : '#22c55e';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>⛈️ DFW Hail Damage Prevention Guide</div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
          DFW is in "Hail Alley" — one of the highest-frequency hail zones in the US. What you can do before a storm is limited, but smart upgrades dramatically reduce damage and earn insurance discounts.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>🎯 What You Can Actually Do</div>
          {[['✅ High Impact', 'Upgrade to Class 4 impact-resistant roofing — worth every dollar in DFW'],
            ['✅ High Impact', 'Cover vehicles — use garage, carport, or hail blankets'],
            ['✅ Moderate', 'Hail guard screens over HVAC condensers'],
            ['⚠️ Limited', 'You cannot prevent roof damage from baseball-sized hail — only reduce severity'],
            ['⚠️ Limited', 'Solar panels and skylights are inherent vulnerabilities — know your exposure'],
          ].map(([tag, text]) => (
            <div key={text} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{ color: tag.startsWith('✅') ? '#22c55e' : '#f97316', fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{tag}</span>
              <span style={{ color: '#cbd5e1', fontSize: '0.95rem' }}>{text}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: '1rem' }}>🔍 Get Your Hail Vulnerability Score</div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', color: '#94a3b8', fontSize: '0.9rem' }}>Select Home Feature</label>
            <select value={feature} onChange={e => setFeature(e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: 6, background: '#1e3a5f', border: '1px solid #334155', color: '#fff' }}>
              <option value=''>Select feature...</option>
              {homeFeatures.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <button onClick={handleSubmit}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 6, padding: '0.75rem 1.5rem', cursor: 'pointer', width: '100%' }}>
            Calculate Hail Vulnerability →
          </button>
        </div>

        {result && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: '#0f2040', borderRadius: 8, padding: '1.5rem', border: `1px solid ${scoreColor(result.score)}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 700, color: '#F5E642' }}>🎯 Vulnerability Score</div>
                <div style={{ fontWeight: 800, fontSize: '1.5rem', color: scoreColor(result.score) }}>{result.score}/100 — {result.label}</div>
              </div>
              <div style={{ background: '#1e3a5f', borderRadius: 6, height: 12, marginBottom: '1rem' }}>
                <div style={{ background: scoreColor(result.score), height: 12, borderRadius: 6, width: `${result.score}%`, transition: 'width 0.5s' }} />
              </div>
              {result.measures.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#F5E642' }}>▸</span>
                  <span style={{ color: '#e2e8f0' }}>{m}</span>
                </div>
              ))}
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ background: '#1e3a5f', borderRadius: 6, padding: '0.75rem', flex: 1 }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Upgrade Cost</div>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>{result.upgradeCost}</div>
                </div>
                <div style={{ background: '#1e3a5f', borderRadius: 6, padding: '0.75rem', flex: 1 }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Insurance Discount (Class 4 roof)</div>
                  <div style={{ color: '#22c55e', fontWeight: 700 }}>{insuranceDiscounts[feature] || '15–30%'}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
