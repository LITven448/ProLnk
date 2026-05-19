import { useState } from 'react';

const zones = [
  {
    id: 'roof', label: 'Roof Condition', icon: '🏠',
    scores: [
      { score: 'Good (80-100)', meaning: 'Shingles appear intact, no visible sagging or granule loss detected in imagery.', action: 'No action needed. Document and re-scan in 2 years.', cost: 'N/A' },
      { score: 'Fair (60-79)', meaning: 'Minor wear detected. Possible granule loss or isolated soft spots in imagery.', action: 'Schedule a licensed roofer inspection within 6 months.', cost: '$150-$400 inspection' },
      { score: 'Poor (Below 60)', meaning: 'Significant wear, possible damage or missing sections visible in scan.', action: 'Get 2-3 contractor quotes immediately. Do not delay.', cost: '$8,000-$25,000 replacement' },
    ],
  },
  {
    id: 'foundation', label: 'Foundation', icon: '🏗️',
    scores: [
      { score: 'Good (80-100)', meaning: 'No visible cracking patterns, soil separation, or door/window frame distortion detected.', action: 'Document baseline. Re-scan after major rain events.', cost: 'N/A' },
      { score: 'Fair (60-79)', meaning: 'Minor crack indicators or slight settling patterns visible in AI analysis.', action: 'Get a structural engineer evaluation within 90 days.', cost: '$500-$800 evaluation' },
      { score: 'Poor (Below 60)', meaning: 'Significant cracking, bowing, or settlement patterns detected. High-priority flag.', action: 'Engage a structural engineer immediately. Get 3 repair quotes.', cost: '$3,000-$30,000 repair' },
    ],
  },
  {
    id: 'moisture', label: 'Moisture Indicators', icon: '💧',
    scores: [
      { score: 'Good (80-100)', meaning: 'No staining, efflorescence, or moisture patterns detected in scan imagery.', action: 'Maintain current drainage and monitor annually.', cost: 'N/A' },
      { score: 'Fair (60-79)', meaning: 'Minor staining or potential moisture ingress points detected near windows or grade.', action: 'Inspect weatherstripping and grading. Monitor closely.', cost: '$200-$1,500 weatherproofing' },
      { score: 'Poor (Below 60)', meaning: 'Active moisture indicators, staining patterns, or potential mold-risk areas flagged.', action: 'Get a moisture remediation specialist on-site immediately.', cost: '$2,000-$15,000 remediation' },
    ],
  },
  {
    id: 'electrical', label: 'Electrical Signs', icon: '⚡',
    scores: [
      { score: 'Good (80-100)', meaning: 'Panel and visible wiring areas show no signs of burn marks or improper modifications.', action: 'No action needed. Document for future comparison.', cost: 'N/A' },
      { score: 'Fair (60-79)', meaning: 'Minor concerns in panel imagery or visible junction areas.', action: 'Have a licensed electrician inspect within 60 days.', cost: '$150-$350 inspection' },
      { score: 'Poor (Below 60)', meaning: 'Burn marks, improper wiring modifications, or overcrowded panel visible in scan.', action: 'Do not use affected circuits. Get electrician immediately.', cost: '$1,000-$8,000 repair' },
    ],
  },
  {
    id: 'hvac', label: 'HVAC Indication', icon: '🌡️',
    scores: [
      { score: 'Good (80-100)', meaning: 'Unit appears well-maintained, no visible rust, debris accumulation, or ductwork concerns.', action: 'Annual maintenance service. Clean filters quarterly.', cost: '$80-$150/year maintenance' },
      { score: 'Fair (60-79)', meaning: 'Age indicators or minor maintenance concerns visible in external unit imagery.', action: 'Schedule HVAC tune-up and get age/efficiency assessment.', cost: '$150-$400 service' },
      { score: 'Poor (Below 60)', meaning: 'Significant deterioration, rust, or system age concerns flagged in scan analysis.', action: 'Get replacement quote. Budget for near-term system change.', cost: '$6,000-$15,000 replacement' },
    ],
  },
];

export default function TrustyProScanResults() {
  const [selectedZone, setSelectedZone] = useState(0);
  const [selectedScore, setSelectedScore] = useState(0);
  const zone = zones[selectedZone];
  const result = zone.scores[selectedScore];
  const scoreColors = ['#22c55e', '#FACC15', '#ef4444'];
  const scoreBgs = ['#14532d', '#713f12', '#450a0a'];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050d1a', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔬</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px' }}>Understanding Your Scan Results</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto' }}>
            Your TrustyPro scan scores each home zone. Here is how to interpret what the AI found and what to do next.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {zones.map((z, i) => (
            <button key={i} onClick={() => { setSelectedZone(i); setSelectedScore(0); }}
              style={{ padding: '10px 16px', borderRadius: '10px', border: `2px solid ${selectedZone === i ? '#4F46E5' : '#1e2d45'}`, backgroundColor: selectedZone === i ? '#4F46E5′ : '#0d1f35', color: '#fff', cursor: ’pointer', fontSize: '0.9rem', fontWeight: 600 }}>
              {z.icon} {z.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
          {['Good (80-100)', 'Fair (60-79)', 'Poor (Below 60)'].map((label, i) => (
            <button key={i} onClick={() => setSelectedScore(i)}
              style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `2px solid ${selectedScore === i ? scoreColors[i] : '#1e2d45'}`, backgroundColor: selectedScore === i ? scoreBgs[i] : '#0d1f35', color: '#fff', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}>
              {label}
            </button>
          ))}
        </div>
        <div style={{ backgroundColor: '#0d1f35', borderRadius: '16px', padding: '32px', border: '1px solid #1e2d45', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px', color: '#FACC15′ }}>{zone.icon} {zone.label} — {result.score}</h2>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>What the AI Detected</div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>{result.meaning}</p>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recommended Action</div>
            <p style={{ color: '#fff', lineHeight: 1.7, fontWeight: 600 }}>{result.action}</p>
          </div>
          <div style={{ backgroundColor: '#050d1a', borderRadius: '10px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Typical Cost if Issue Confirmed</span>
            <span style={{ color: '#FACC15', fontWeight: 800, fontSize: '1rem' }}>{result.cost}</span>
          </div>
        </div>
        <div style={{ backgroundColor: '#0d1f35', borderRadius: '12px', padding: '20px', border: '1px solid #1e2d45′ }}>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
            TrustyPro scan results are AI-generated from photo analysis and are not a licensed home inspection. Always consult qualified professionals before making repair decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
