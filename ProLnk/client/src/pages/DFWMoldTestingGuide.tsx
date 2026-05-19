import { useState } from 'react';

const observations = [
  { id: 'musty', label: 'Musty or earthy smell in any room', weight: 4 },
  { id: 'visible_mold', label: 'Visible dark spots on walls, ceilings, or grout', weight: 5 },
  { id: 'water_damage', label: 'Past or current water damage or leak', weight: 4 },
  { id: 'health', label: 'Occupants report allergy or respiratory symptoms', weight: 3 },
  { id: 'humid_space', label: 'Crawl space, basement, or poorly ventilated bath', weight: 3 },
  { id: 'ac_issues', label: 'AC condensate issues or past ductwork flooding', weight: 3 },
  { id: 'old_home', label: 'Home built before 1985', weight: 2 },
  { id: 'remediation', label: 'Seller discloses prior mold remediation', weight: 3 },
];

export default function DFWMoldTestingGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const score = selected.reduce((acc, id) => {
    const f = observations.find(r => r.id === id);
    return acc + (f ? f.weight : 0);
  }, 0);

  const visibleMold = selected.includes('visible_mold');

  const getResult = () => {
    if (visibleMold) return {
      label: 'Skip Testing — Remediate Directly',
      color: '#FF6B6B',
      type: 'Remediation First',
      msg: 'If mold is visible, you already know it\’s there. Testing visible mold is unnecessary — the money is better spent on remediation. Hire a certified mold remediation contractor and request post-remediation clearance testing.',
      cost: 'Remediation: $500–$6,000+ depending on scope. Clearance testing: $200–$400.',
    };
    if (score >= 8) return {
      label: 'Professional Testing Recommended',
      color: '#FFB347',
      type: 'CIH Air Quality Testing',
      msg: 'Multiple risk indicators. Hire a Certified Industrial Hygienist (CIH) for full air quality testing. They operate independently from remediation companies — critical for unbiased results.',
      cost: 'Professional testing: $300–$800. CIH inspections: $400–$1,000.',
    };
    if (score >= 4) return {
      label: 'Air Sampling Recommended',
      color: '#F5E642',
      type: 'Professional Air Sampling',
      msg: 'Moderate risk factors. Professional air sampling (ERMI or spore trap) provides actionable data. Avoid DIY petri dish kits — they are unreliable and often return false positives.',
      cost: 'Air sampling: $300–$600. Includes lab analysis and written report.',
    };
    return {
      label: 'Lower Risk — Standard Inspection Sufficient',
      color: '#4CAF50',
      type: 'Visual Inspection',
      msg: 'Few risk indicators. Ask your TREC inspector to specifically assess all moisture-prone areas. If they flag anything, escalate to professional air sampling before closing.',
      cost: 'Included in standard inspection fee.',
    };
  };

  const result = getResult();

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF6', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ backgroundColor: '#0D1F3C', borderBottom: '3px solid #F5E642', padding: '32px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>DFW Inspection Series</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 0 12px' }}>🍄 Mold Testing Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, margin: 0 }}>DFW's humidity creates ideal mold conditions — how to test correctly, when to skip testing, and what to do with results.</p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>🌡️ Why DFW Creates Ideal Mold Conditions</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: '0 0 12px' }}>Dallas humidity regularly reaches 80–90% in summer months. DFW homes run AC systems for 8–10 months per year, creating condensation-prone surfaces. Mold only needs 48–72 hours of moisture to establish colonies behind walls, under flooring, and in ductwork.</p>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>Common DFW-specific triggers: AC condensate line overflow, duct sweating in unconditioned attics, foundation moisture intrusion, and poorly sealed shower pans.</p>
        </div>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>🧪 Testing Methods Explained</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { icon: '💨', title: 'Air Spore Trap Sampling', desc: 'Most common. Captures airborne spores on a cassette, sent to lab. Compares indoor vs. outdoor counts. Best for hidden mold detection. Cost: $200–$400.' },
              { icon: '🧫', title: 'ERMI Testing', desc: 'DNA-based dust sampling from HVAC or floor dust. Highly sensitive. Identifies 36 mold species. Good for post-remediation verification. Cost: $200–$350.' },
              { icon: '🔬', title: 'Surface (Tape Lift) Sampling', desc: 'Swab or tape sample from visible growth. Identifies species but not concentration. Useful for remediation planning, not discovery. Cost: $50–$150 per sample.' },
              { icon: '🧱', title: 'Bulk Sampling', desc: 'Physical material (drywall, insulation) sent to lab. Used when damage is already visible. Most accurate species ID. Cost: $50–$200 per sample.' },
              { icon: '❌', title: 'DIY Petri Dish Kits (Avoid)', desc: 'Unreliable. Mold is naturally present everywhere — petri kits culture whatever lands, often returning misleading "positive" results. Not accepted by insurance or remediation contractors.' },
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
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>💰 Typical DFW Cost</h2>
          <div style={{ color: '#4CAF50', fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>$300 – $800 professional</div>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: 0 }}>Always hire testers and remediators separately. A company that tests and remediates has a financial incentive to find problems. CIH inspectors are the gold standard — search AIHA.org for certified professionals in DFW.</p>
        </div>

        <div style={{ backgroundColor: '#0D1F3C', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>🎯 What Testing Do You Need?</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, margin: '0 0 20px' }}>Select all symptoms or conditions present at this property:</p>
          <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
            {observations.map(f => (
              <label key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', backgroundColor: selected.includes(f.id) ? '#1E3A5F' : '#132240', borderRadius: 8, padding: '12px 16px', border: `2px solid ${selected.includes(f.id) ? '#F5E642' : 'transparent'}`, transition: 'all 0.2s' }}>
                <input type="checkbox" checked={selected.includes(f.id)} onChange={() => toggle(f.id)} style={{ display: 'none' }} />
                <span style={{ width: 20, height: 20, borderRadius: 4, border: `2px solid ${selected.includes(f.id) ? '#F5E642' : '#4A5568'}`, backgroundColor: selected.includes(f.id) ? '#F5E642' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#0A1628', fontWeight: 900, fontSize: 14 }}>{selected.includes(f.id) ? '✓' : ''}</span>
                <span style={{ color: selected.includes(f.id) ? '#fff' : '#CBD5E1', fontSize: 15 }}>{f.label}</span>
              </label>
            ))}
          </div>
          <button onClick={() => setShowResult(true)} style={{ width: '100%', padding: '14px', backgroundColor: '#F5E642', color: '#0A1628', fontWeight: 800, fontSize: 16, borderRadius: 8, border: 'none', cursor: 'pointer' }}>Get Testing Recommendation →</button>
          {showResult && (
            <div style={{ marginTop: 20, padding: 20, backgroundColor: '#132240', borderRadius: 10, borderLeft: `4px solid ${result.color}` }}>
              <div style={{ color: result.color, fontWeight: 800, fontSize: 20, marginBottom: 4 }}>{result.label}</div>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>{result.type}</div>
              <p style={{ color: '#CBD5E1', margin: '0 0 10px' }}>{result.msg}</p>
              <div style={{ color: '#94A3B8', fontSize: 13, backgroundColor: '#0D1F3C', borderRadius: 6, padding: 10 }}>{result.cost}</div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
