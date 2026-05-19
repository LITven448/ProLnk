import { useState } from 'react';

const concerns = [
  { id: 'pre65', label: 'Home built before 1965 (knob-and-tube era)', weight: 5 },
  { id: 'alum', label: 'Home built 1965–1973 (aluminum wiring risk)', weight: 5 },
  { id: 'pre90', label: 'Home built 1974–1990 (pre-AFCI era)', weight: 3 },
  { id: 'ev_charger', label: 'Planning to add EV charger or solar', weight: 4 },
  { id: 'panel_concern', label: 'Inspector noted panel concerns or double-taps', weight: 4 },
  { id: 'fuse_box', label: 'Fuse box instead of breaker panel', weight: 5 },
  { id: 'no_gfci', label: 'Missing GFCI in kitchen, bath, or garage', weight: 3 },
  { id: 'flickering', label: 'Lights flickering or outlets not working', weight: 4 },
];

export default function DFWElectricalInspectionGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const score = selected.reduce((acc, id) => {
    const f = concerns.find(r => r.id === id);
    return acc + (f ? f.weight : 0);
  }, 0);

  const alum = selected.includes('alum') || selected.includes('pre65');
  const fuseBox = selected.includes('fuse_box');

  const getResult = () => {
    if (fuseBox || alum) return {
      label: 'Licensed Electrician Inspection Required',
      color: '#DC2626',
      level: 'Full Electrical Assessment',
      rec: fuseBox
        ? 'Fuse boxes are a known fire hazard and insurance liability. Most DFW insurers require panel upgrade before issuing a policy. Get a full assessment and panel replacement estimate before closing.'
        : 'Aluminum branch wiring (1965–1973) is a documented fire risk. Look for CO/ALR-rated outlets and connections, or COPALUM crimp remediation. This must be evaluated by a licensed electrician — not a general inspector.',
      upgrades: alum ? '$5,000–$15,000 for full aluminum wiring remediation or rewire' : '$3,000–$8,000 for panel upgrade to 200A with permit',
    };
    if (score >= 8) return {
      label: 'Standalone Electrical Inspection Recommended',
      color: '#F97316',
      level: 'Licensed Electrician',
      rec: 'Multiple electrical risk factors present. A TREC inspector performs a visual check only — they cannot open panels fully or test circuits. A licensed electrician provides a complete assessment including load calculations.',
      upgrades: '$150–$300 for inspection. Upgrade costs vary by issue found.',
    };
    if (score >= 4) return {
      label: 'Enhanced TREC Inspection — Flag Electrical',
      color: '#EAB308',
      level: 'Elevated TREC Review',
      rec: 'Some concerns present. Ask your TREC inspector to pay particular attention to the panel, grounding, GFCI locations, and any ungrounded three-prong outlets. If they flag issues, follow up with a licensed electrician.',
      upgrades: 'GFCI upgrades: $100–$300. AFCI breakers: $500–$1,500 for full panel.',
    };
    return {
      label: 'Standard Inspection Covers Electrical Basics',
      color: '#16A34A',
      level: 'Standard TREC',
      rec: 'Lower risk profile. Your TREC inspector will cover visible panel condition, GFCI presence, and spot-check outlets. Ask them to note the panel brand — Zinsco and Federal Pacific panels are common in DFW and fire hazards.',
      upgrades: 'Budget $500–$2,000 for common upgrades on any home over 20 years old.',
    };
  };

  const result = getResult();

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', color: '#1E293B', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ backgroundColor: '#fff', borderBottom: '3px solid #1E3A5F', padding: '32px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ color: '#1E3A5F', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>DFW Inspection Series</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0F172A', margin: '0 0 12px' }}>⚡ Electrical Inspection Guide</h1>
          <p style={{ color: '#64748B', fontSize: 16, margin: 0 }}>When DFW homes need a standalone electrical inspection — from aluminum wiring to EV charger readiness.</p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1E3A5F', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>🏠 What a Standard TREC Inspection Covers</h2>
          <p style={{ color: '#475569', lineHeight: 1.7, margin: '0 0 12px' }}>All Texas TREC-licensed home inspectors check electrical systems — but with limitations. They perform a visual inspection and test a sample of outlets and switches. They do not perform load calculations, pull permits, or open panels beyond the cover.</p>
          <p style={{ color: '#475569', lineHeight: 1.7, margin: 0 }}>A licensed electrician goes further: full circuit tracing, load calculations for major appliances, arc fault protection assessment, and grounding verification.</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1E3A5F', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>⚠️ DFW-Specific Electrical Risks</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { icon: '🔌', title: 'Aluminum Branch Wiring (1965–1973)', desc: 'DFW has thousands of homes with aluminum branch circuit wiring. Aluminum oxidizes at connections, creating resistance and fire risk. Look for "CO/ALR" outlets or COPALUM crimp splices as remediation. This issue is insurable but requires disclosure.' },
              { icon: '📦', title: 'Zinsco & Federal Pacific Panels', desc: 'Common in DFW homes built 1950s–1980s. Breakers in these panels are known to fail to trip under overload — creating fire risk. Replacement is the only remedy. Cost: $1,500–$4,000.' },
              { icon: '🏠', title: 'Knob-and-Tube Wiring (Pre-1950)', desc: 'Some older DFW homes still have partial knob-and-tube. No grounding, no AFCI, and often buried under insulation. Most insurers will not cover homes with active K&T.' },
              { icon: '🔒', title: 'AFCI/GFCI Gaps', desc: 'Current Texas code requires AFCI breakers in bedrooms and GFCI in kitchens, baths, garage, and outdoors. Older homes without these are not grandfathered — insurers increasingly require updates.' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', backgroundColor: '#F1F5F9', borderRadius: 8, padding: 16 }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <div>
                  <div style={{ color: '#0F172A', fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ color: '#64748B', fontSize: 14 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1E3A5F', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>🚗 EV Charger & Solar Additions</h2>
          <p style={{ color: '#475569', lineHeight: 1.7, margin: '0 0 12px' }}>Level 2 EV chargers (240V, 40–50A) require a dedicated circuit and often a panel upgrade on older DFW homes. Before buying, verify panel capacity — 100A panels are often insufficient for EV + modern loads.</p>
          <div style={{ display: 'grid', gap: 8 }}>
            {[
              '100A panel: typically needs upgrade before EV charger — $2,000–$4,000',
              '200A panel: usually sufficient, circuit addition runs $400–$800',
              'Solar addition: requires load analysis and utility interconnect assessment',
            ].map((line, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, backgroundColor: '#F1F5F9', borderRadius: 8, padding: 12 }}>
                <span style={{ color: '#1E3A5F', fontWeight: 700, flexShrink: 0 }}>→</span>
                <span style={{ color: '#475569', fontSize: 14 }}>{line}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1E3A5F', fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>💰 Typical DFW Cost</h2>
          <div style={{ color: '#16A34A', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>$150 – $300</div>
          <p style={{ color: '#64748B', fontSize: 14, margin: 0 }}>For a licensed electrician inspection (not TREC). Common upgrades: GFCI outlets $100–$300, AFCI breakers $500–$1,500, full panel upgrade $2,000–$5,000, aluminum wiring remediation $5,000–$15,000.</p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ color: '#1E3A5F', fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>🎯 What Level of Inspection Do You Need?</h2>
          <p style={{ color: '#64748B', fontSize: 14, margin: '0 0 20px' }}>Select all that apply to this property:</p>
          <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
            {concerns.map(f => (
              <label key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', backgroundColor: selected.includes(f.id) ? '#EFF6FF' : '#F8FAFC', borderRadius: 8, padding: '12px 16px', border: `2px solid ${selected.includes(f.id) ? '#1E3A5F' : '#E2E8F0'}`, transition: 'all 0.2s' }}>
                <input type="checkbox" checked={selected.includes(f.id)} onChange={() => toggle(f.id)} style={{ display: 'none' }} />
                <span style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${selected.includes(f.id) ? '#1E3A5F' : '#CBD5E1'}`, backgroundColor: selected.includes(f.id) ? '#1E3A5F' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff', fontWeight: 900, fontSize: 14 }}>{selected.includes(f.id) ? '✓' : ''}</span>
                <span style={{ color: selected.includes(f.id) ? '#0F172A' : '#475569', fontSize: 15 }}>{f.label}</span>
              </label>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} style={{ width: '100%', padding: '14px', backgroundColor: '#1E3A5F', color: '#fff', fontWeight: 800, fontSize: 16, borderRadius: 8, border: 'none', cursor: 'pointer' }}>Get Inspection Recommendation →</button>
          {showResult && (
            <div style={{ marginTop: 20, padding: 20, backgroundColor: '#F1F5F9', borderRadius: 10, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ color: result.color, fontWeight: 800, fontSize: 20, marginBottom: 4 }}>{result.label}</div>
              <div style={{ color: '#1E3A5F', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>{result.level}</div>
              <p style={{ color: '#475569', margin: '0 0 10px' }}>{result.rec}</p>
              <div style={{ color: '#64748B', fontSize: 13, backgroundColor: '#fff', borderRadius: 6, padding: 10, border: '1px solid #E2E8F0' }}>Estimated upgrade costs: {result.upgrades}</div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
