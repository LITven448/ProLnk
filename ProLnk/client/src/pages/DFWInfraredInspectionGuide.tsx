import { useState } from 'react';

const issueOptions = [
  { id: 'moisture', label: 'Water stains or suspected moisture intrusion' },
  { id: 'hvac', label: 'Rooms that stay hot/cold no matter what' },
  { id: 'electric', label: 'Flickering lights or tripped breakers' },
  { id: 'new_build', label: 'New construction (insulation QA)' },
  { id: 'energy_bills', label: 'Unusually high energy bills' },
  { id: 'old_home', label: 'Home built before 1990′ },
  { id: 'roof_leak', label: 'Recent or suspected roof leak' },
];

export default function DFWInfraredInspectionGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const score = selected.length;

  const getResult = () => {
    if (score >= 4) return {
      label: 'High Probability of Significant Findings',
      color: '#FF6B6B',
      rec: 'Strongly recommend adding infrared. Multiple risk indicators present — findings could meaningfully affect price negotiation.',
      costBenefit: 'Add-on cost $200–$400. Potential repair discovery value: $2,000–$20,000+',
    };
    if (score >= 2) return {
      label: 'Moderate Probability of Findings',
      color: '#FFB347',
      rec: 'Consider adding infrared, especially if the home is older or you have specific concerns about insulation or moisture.',
      costBenefit: 'Add-on cost $200–$400. Useful for peace of mind and negotiating leverage.',
    };
    return {
      label: 'Lower Probability — Still Worth Considering',
      color: '#4CAF50',
      rec: 'Your home shows fewer risk signals. Infrared is still useful on any DFW home given AC condensation moisture risk.',
      costBenefit: 'Add-on cost $200–$400. Optional but provides baseline thermal record.',
    };
  };

  const result = getResult();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF6', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ backgroundColor: '#0D1F3C', borderBottom: '3px solid #F5E642', padding: '32px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>DFW Inspection Series</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>🌡️ Infrared / Thermal Inspection Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0 }}>What thermal imaging reveals inside DFW homes — and when it's worth the add-on cost.</p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>📷 What Infrared Actually Sees</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 16px' }}>A thermal (infrared) camera detects temperature differences — not moisture itself. Inspectors interpret temperature anomalies to identify problems hidden behind walls, ceilings, and floors that a visual inspection cannot see.</p>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { icon: '💧', title: 'Moisture Intrusion', desc: 'Water behind walls shows as a cool zone. Common DFW finding: AC condensation line leaks and roof-to-wall penetrations.' },
              { icon: '🏠', title: 'Insulation Gaps', desc: 'Missing or settled insulation appears as warm patches in ceilings and walls. DFW attics especially prone to settling.' },
              { icon: '⚡', title: 'Electrical Hot Spots', desc: 'Overloaded breakers, failing connections, or aluminum wiring hotspots show as warm anomalies in panels and walls.' },
              { icon: '❄️', title: 'HVAC Duct Leaks', desc: 'Leaking supply ducts in unconditioned attics appear as dramatic temperature variations. A leading cause of high energy bills in DFW.' },
              { icon: '🪟', title: 'Window and Door Air Leakage', desc: 'Infiltration around frames shows as cool streaks in winter, warm in summer — major energy loss in DFW climate.' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', backgroundColor: '#132240', borderRadius: 8, padding: 16 }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ color: '#94A3B8', fontSize: 14 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>🌞 DFW-Specific Considerations</h2>
          <div style={{ display: 'grid', gap: 10 }}>
            {[
              'AC systems run nearly year-round in DFW — condensation line leaks are among the most common infrared findings.',
              'DFW attics regularly exceed 140°F in summer, degrading duct insulation and causing significant energy loss.',
              'New construction infrared during the framing or drywall stage catches insulation misses before they’re buried.',
              'Best performed in the morning or evening when indoor/outdoor temperature differential is at least 15°F.',
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, backgroundColor: '#132240', borderRadius: 8, padding: 14 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>→</span>
                <span style={{ color: '#CBD5E1', fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>💰 Typical DFW Cost</h2>
          <div style={{ color: '#4CAF50', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>$200 – $400 add-on</div>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: 0 }}>Most inspectors offer as an upgrade during the standard inspection. Standalone thermal inspections run $300–$600+. Always request a RESNET-certified or Level I thermographer.</p>
        </div>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>🎯 Should You Add Infrared?</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: '0 0 20px' }}>Select all known issues or concerns about this property:</p>
          <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
            {issueOptions.map(f => (
              <label key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', backgroundColor: selected.includes(f.id) ? '#1E3A5F' : '#132240', borderRadius: 8, padding: '12px 16px', border: `2px solid ${selected.includes(f.id) ? '#F5E642' : 'transparent'}`, transition: 'all 0.2s' }}>
                <input type="checkbox" checked={selected.includes(f.id)} onChange={() => toggle(f.id)} style={{ display: 'none' }} />
                <span style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${selected.includes(f.id) ? '#F5E642' : '#4A5568'}`, backgroundColor: selected.includes(f.id) ? '#F5E642′ : ’transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#0A1628', fontWeight: 900, fontSize: 14 }}>{selected.includes(f.id) ? '✓' : ''}</span>
                <span style={{ color: selected.includes(f.id) ? '#fff' : '#CBD5E1', fontSize: 15 }}>{f.label}</span>
              </label>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} style={{ width: '100%', padding: '14px', backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, borderRadius: 8, border: 'none', cursor: 'pointer' }}>Get Assessment →</button>
          {showResult && (
            <div style={{ marginTop: 20, padding: 20, backgroundColor: '#132240', borderRadius: 10, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ color: result.color, fontWeight: 800, fontSize: 18, marginBottom: 8 }}>{result.label}</div>
              <p style={{ color: '#CBD5E1', margin: '0 0 10px' }}>{result.rec}</p>
              <div style={{ color: '#94A3B8', fontSize: 14, backgroundColor: '#0D1F3C', borderRadius: 6, padding: 10 }}>{result.costBenefit}</div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
