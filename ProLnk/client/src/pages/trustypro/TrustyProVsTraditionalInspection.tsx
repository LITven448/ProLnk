import { useState } from 'react';

const comparison = [
  { feature: 'Cost', trustypro: 'Free (always)', inspection: '$400–$600′ },
  { feature: 'Time required', trustypro: '~20 minutes', inspection: '3–4 hours on-site' },
  { feature: 'Who does it', trustypro: 'You + AI guidance', inspection: 'Licensed inspector' },
  { feature: 'Report turnaround', trustypro: 'Instant', inspection: '24–72 hours' },
  { feature: 'Use for home purchase', trustypro: '❌ Not designed for this', inspection: '✅ Required / recommended' },
  { feature: 'Ongoing monitoring', trustypro: '✅ Rescan anytime', inspection: '❌ One-time snapshot' },
  { feature: 'Matched to pros', trustypro: '✅ Automatic', inspection: '❌ You find your own' },
  { feature: 'Photo documentation', trustypro: '✅ Vault-stored forever', inspection: '✅ In PDF report' },
  { feature: 'Legal standing in disputes', trustypro: '❌ Not for legal use', inspection: '✅ Licensed professional stamp' },
  { feature: 'AI trend detection', trustypro: '✅ Detects change over time', inspection: '❌ Single point in time' },
];

const situations = [
  { situation: 'Buying a home', recommendation: 'inspection', reason: 'A licensed inspection is standard practice and often required by lenders. It provides legal documentation of condition at time of purchase.' },
  { situation: 'Selling a home', recommendation: 'both', reason: 'Get a TrustyPro scan first to identify issues before listing. Then consider a pre-listing inspection to validate and build buyer trust.' },
  { situation: 'Annual home maintenance check', recommendation: 'trustypro', reason: 'TrustyPro scans are free and instant — ideal for catching small issues before they become expensive repairs.' },
  { situation: 'You notice something is wrong', recommendation: 'trustypro', reason: 'Scan the area first. If AI flags it as significant, you\’ll have data to get an accurate estimate and may not need a full inspection.' },
  { situation: 'Refinancing your home', recommendation: 'inspection', reason: 'Lenders require a licensed appraisal and often an inspection. TrustyPro doesn\’t substitute for this process.' },
  { situation: 'Pre-renovation planning', recommendation: 'trustypro', reason: 'TrustyPro scans help you scope the project and get matched with the right pros — faster and free.' },
  { situation: 'HOA or insurance dispute', recommendation: 'inspection', reason: 'Only a licensed inspector\’s report carries legal weight in formal disputes.' },
  { situation: 'Deciding if you need a contractor', recommendation: 'trustypro', reason: 'Scan it first. See the severity score. If it\’s flagged, TrustyPro connects you with the right pro automatically.' },
];

type Recommendation = 'trustypro' | 'inspection' | 'both';

const recommendationColors: Record<Recommendation, string> = {
  trustypro: '#4F46E5',
  inspection: '#FACC15',
  both: '#4ade80',
};

const recommendationLabels: Record<Recommendation, string> = {
  trustypro: '📡 Use TrustyPro',
  inspection: '🏠 Get an Inspection',
  both: '✅ Use Both',
};

export default function TrustyProVsTraditionalInspection() {
  const [selectedSituation, setSelectedSituation] = useState<number | null>(null);

  const selected = selectedSituation !== null ? situations[selectedSituation] : null;

  return (
    <div style={{ background: '#050d1a', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ background: '#4F46E5', display: 'inline-block', borderRadius: 8, padding: '6px 16px', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>SCAN VS INSPECTION</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.15, marginBottom: 16 }}>TrustyPro Scan vs.<br /><span style={{ color: '#4F46E5′ }}>Traditional Inspection</span></h1>
          <p style={{ color: '#94a3b8', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>They're not competitors — they serve different needs. Here’s how to know which one you need and when.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 64 }}>
          <div style={{ background: '#1e1b4b', borderRadius: 20, padding: 36, border: '1px solid #4F46E5′ }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📡</div>
            <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 12, color: '#a5b4fc' }}>TrustyPro Scan</div>
            <div style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.7 }}>AI-powered visual scan you do yourself with your phone. Free, instant results. Best for ongoing home ownership, maintenance planning, and getting matched with the right contractor before you call anyone.</div>
            <div style={{ marginTop: 20, padding: '12px 16px', background: 'rgba(79,70,229,0.2)', borderRadius: 10 }}>
              <span style={{ fontWeight: 700, color: '#FACC15', fontSize: 22 }}>$0</span>
              <span style={{ color: '#94a3b8', fontSize: 14 }}> — free forever</span>
            </div>
          </div>
          <div style={{ background: '#0f1e35', borderRadius: 20, padding: 36, border: '1px solid #1e3a5f' }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🏠</div>
            <div style={{ fontWeight: 800, fontSize: 22, marginBottom: 12, color: '#e2e8f0′ }}>Traditional Inspection</div>
            <div style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.7 }}>A licensed professional physically inspects your home and produces a legally-stamped report. Required for home purchases, refinancing, and legal/insurance disputes. One-time snapshot, no ongoing monitoring.</div>
            <div style={{ marginTop: 20, padding: '12px 16px', background: 'rgba(250,204,21,0.1)', borderRadius: 10 }}>
              <span style={{ fontWeight: 700, color: '#FACC15', fontSize: 22 }}>$400–600</span>
              <span style={{ color: '#94a3b8', fontSize: 14 }}> — per inspection</span>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32, textAlign: 'center' }}>Side-by-Side Comparison</h2>
        <div style={{ overflowX: 'auto', marginBottom: 80 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                {['Feature', '📡 TrustyPro', '🏠 Inspection'].map((h, i) => (
                  <th key={i} style={{ padding: '12px 16px', textAlign: i === 0 ? 'left' : 'center', background: '#0f1e35', color: i === 1 ? '#a5b4fc' : i === 2 ? '#FACC15′ : '#94a3b8', borderBottom: '1px solid #1e3a5f', fontWeight: 700 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? '#050d1a' : '#080f1c' }}>
                  <td style={{ padding: '12px 16px', color: '#e2e8f0', fontWeight: 600 }}>{row.feature}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#94a3b8′ }}>{row.trustypro}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'center', color: '#94a3b8′ }}>{row.inspection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>Which Do You Need?</h2>
        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: 32, fontSize: 15 }}>Select your situation → get a recommendation</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginBottom: 32 }}>
          {situations.map((s, i) => (
            <button key={i} onClick={() => setSelectedSituation(i === selectedSituation ? null : i)} style={{ padding: '16px 20px', borderRadius: 12, border: `2px solid ${selectedSituation === i ? recommendationColors[s.recommendation as Recommendation] : '#1e3a5f'}`, background: selectedSituation === i ? 'rgba(79,70,229,0.1)' : 'transparent', color: selectedSituation === i ? '#fff' : '#94a3b8', fontWeight: 600, fontSize: 14, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
              {s.situation}
            </button>
          ))}
        </div>

        {selected && (
          <div style={{ background: '#0f1e35', borderRadius: 20, padding: 36, border: `2px solid ${recommendationColors[selected.recommendation as Recommendation]}`, marginBottom: 80 }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, color: recommendationColors[selected.recommendation as Recommendation], marginBottom: 12 }}>RECOMMENDATION FOR: {selected.situation.toUpperCase()}</div>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>{recommendationLabels[selected.recommendation as Recommendation]}</div>
            <div style={{ color: '#94a3b8', fontSize: 16, lineHeight: 1.7 }}>{selected.reason}</div>
          </div>
        )}

        <div style={{ background: '#0f1e35', borderRadius: 20, padding: 40, border: '1px solid #1e3a5f', textAlign: 'center' }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>The Bottom Line</h3>
          <p style={{ color: '#94a3b8', maxWidth: 600, margin: '0 auto', fontSize: 15, lineHeight: 1.7 }}>Think of TrustyPro as your home's ongoing health monitor — and a traditional inspection as the specialist visit when something major is happening. Use both strategically, and you’ll always know exactly what your home needs.</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
            <button style={{ background: '#4F46E5', color: '#fff', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Scan Your Home Free</button>
            <button style={{ background: 'transparent', color: '#94a3b8', border: '1px solid #1e3a5f', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Find an Inspector</button>
          </div>
        </div>

      </div>
    </div>
  );
}
