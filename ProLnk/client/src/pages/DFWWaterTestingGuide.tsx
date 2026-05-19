import { useState } from 'react';

const waterTests = [
  { id: 'hardness', label: 'Hardness', icon: '💧', reason: 'DFW water is notoriously hard (200-500 mg/L). Causes scale, spots, appliance damage.' },
  { id: 'chlorine', label: 'Chlorine/Chloramine', icon: '🧪', reason: 'DFW utilities use chloramine. Affects taste, can react with pipes.' },
  { id: 'lead', label: 'Lead', icon: '⚠️', reason: 'Critical for pre-1986 homes with lead solder or lead service lines.' },
  { id: 'bacteria', label: 'Bacteria / Coliform', icon: '🦠', reason: 'Essential for well water users in Wise, Parker, and Johnson counties.' },
  { id: 'nitrates', label: 'Nitrates', icon: '🌿', reason: 'Common near agricultural land in DFW exurbs. Dangerous for infants.' },
  { id: 'arsenic', label: 'Arsenic', icon: '🔬', reason: 'Naturally occurring in some North Texas groundwater sources.' },
];

const testOptions = [
  { label: 'DIY Dip Strip Kit', cost: '$10–$30', turnaround: 'Instant', accuracy: 'Low', best: 'Quick screening only' },
  { label: 'Mail-In Home Kit', cost: '$50–$150', turnaround: '5–10 days', accuracy: 'Medium', best: 'General peace of mind' },
  { label: 'State-Certified Lab', cost: '$100–$400', turnaround: '7–14 days', accuracy: 'High', best: 'Purchase, legal, health concerns' },
  { label: 'TX Dept of Health Lab', cost: '$25–$100', turnaround: '10–14 days', accuracy: 'High', best: 'Well water, lowest cost certified' },
];

export default function DFWWaterTestingGuide() {
  const [homeAge, setHomeAge] = useState('');
  const [waterSource, setWaterSource] = useState('');
  const [concerns, setConcerns] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleConcern = (id: string) => {
    setConcerns(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const getRecommendations = () => {
    const recs: string[] = [];
    if (homeAge === 'pre1986') recs.push('Lead testing is URGENT — solder and pipes may be leaching.');
    if (waterSource === 'well') recs.push('Full bacteria panel + nitrates + arsenic required annually.');
    if (concerns.includes('hardness')) recs.push('Hardness test + water softener consultation recommended.');
    if (concerns.includes('chlorine')) recs.push('Chloramine filter or whole-home carbon filter worth considering.');
    if (recs.length === 0) recs.push('Standard city water panel covers your profile. Annual testing is best practice.');
    return recs;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Home Health</span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.5rem 0', lineHeight: 1.2 }}>💧 Water Testing Guide for DFW Homes</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>DFW tap water is safe but hard. Knowing what's in your water protects your family, appliances, and plumbing.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {waterTests.map(t => (
            <div key={t.id} style={{ background: '#0f2340', borderRadius: 10, padding: '1rem', border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{t.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>{t.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{t.reason}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>🔬 Testing Options & Cost</h2>
        <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: '#0f2340′ }}>
                {['Method', 'Cost', 'Turnaround', 'Accuracy', 'Best For'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: '#F5E642', borderBottom: '1px solid #1e3a5f' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {testOptions.map((o, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #1e3a5f' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{o.label}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#4ade80′ }}>{o.cost}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#94a3b8′ }}>{o.turnaround}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#94a3b8′ }}>{o.accuracy}</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#94a3b8′ }}>{o.best}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#0f2340', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5E642', marginBottom: '1.25rem' }}>🏠 Get Your Test Recommendation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 6 }}>HOME AGE</label>
              <select value={homeAge} onChange={e => setHomeAge(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', color: '#fff', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select...</option>
                <option value='pre1986'>Before 1986</option>
                <option value='1986to2000'>1986 – 2000</option>
                <option value='post2000'>After 2000</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 6 }}>WATER SOURCE</label>
              <select value={waterSource} onChange={e => setWaterSource(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', color: '#fff', borderRadius: 6, padding: '0.5rem' }}>
                <option value=''>Select...</option>
                <option value='city'>City / Municipal</option>
                <option value='well'>Private Well</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.8rem', marginBottom: 8 }}>CONCERNS (select all that apply)</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {waterTests.map(t => (
                <button key={t.id} onClick={() => toggleConcern(t.id)} style={{ padding: '0.4rem 0.9rem', borderRadius: 20, border: '1px solid', borderColor: concerns.includes(t.id) ? '#F5E642′ : '#1e3a5f', background: concerns.includes(t.id) ? '#F5E642' : ’transparent', color: concerns.includes(t.id) ? '#0A1628′ : '#fff', cursor: ’pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResults(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem 1.5rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer' }}>
            Get Recommendation →
          </button>
          {showResults && (
            <div style={{ marginTop: '1.25rem', background: '#0A1628', borderRadius: 8, padding: '1rem', border: '1px solid #F5E642′ }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>Your Testing Plan:</div>
              {getRecommendations().map((r, i) => <div key={i} style={{ color: '#e2e8f0', marginBottom: 4, fontSize: '0.95rem' }}>✅ {r}</div>)}
              <div style={{ marginTop: 12, color: '#94a3b8', fontSize: '0.85rem' }}>Estimated cost: $50–$200 depending on lab and panel selected.</div>
            </div>
          )}
        </div>

        <div style={{ background: '#0f2340', borderRadius: 10, padding: '1rem 1.25rem', border: '1px solid #1e3a5f', color: '#94a3b8', fontSize: '0.875rem' }}>
          💡 Texas A&M AgriLife Extension offers subsidized water testing for well owners. Send samples to their Dallas or Stephenville lab for the lowest certified cost in DFW.
        </div>
      </div>
    </div>
  );
}
