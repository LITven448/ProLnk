import { useState } from 'react';

const checklistItems = [
  { id: 'radon_tested', label: 'Radon tested in last 2 years', weight: 15 },
  { id: 'co_detector', label: 'Carbon monoxide detectors on every floor', weight: 15 },
  { id: 'hvac_filter', label: 'HVAC filter changed in last 3 months', weight: 10 },
  { id: 'exhaust_fans', label: 'Bathroom/kitchen exhaust fans working', weight: 10 },
  { id: 'no_mold', label: 'No visible mold or musty odors', weight: 15 },
  { id: 'low_voc', label: 'Low-VOC paint/flooring used in last 2 years', weight: 10 },
  { id: 'hvac_inspected', label: 'Gas appliances inspected this year', weight: 15 },
  { id: 'smoke_detectors', label: 'Smoke detectors tested this month', weight: 10 },
];

export default function RadonAndAirQualityGuide() {
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (id: string) => {
    setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const score = checked.reduce((sum, id) => {
    const item = checklistItems.find(x => x.id === id);
    return sum + (item ? item.weight : 0);
  }, 0);

  const getScoreColor = () => {
    if (score >= 80) return '#4ade80';
    if (score >= 50) return '#facc15';
    return '#f87171';
  };

  const getScoreLabel = () => {
    if (score >= 80) return 'Good — your home air quality is well-managed';
    if (score >= 50) return 'Fair — several areas need attention';
    return 'Needs attention — consider a professional assessment';
  };

  return (
    <div style={{ background: '#0a0a0f', minHeight: '100vh', color: '#f0f0f0', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>

        <div style={{ marginBottom: 12 }}>
          <span style={{ background: '#1a1a3a', color: '#a78bfa', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
            🌬️ AIR QUALITY GUIDE
          </span>
        </div>

        <h1 style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginBottom: 8, color: '#ffffff' }}>
          DFW Indoor Air Quality Guide
        </h1>
        <p style={{ fontSize: 20, color: '#a78bfa', fontWeight: 700, marginBottom: 16 }}>
          Radon, VOCs, and Allergens
        </p>
        <p style={{ fontSize: 16, color: '#94a3b8', marginBottom: 48, lineHeight: 1.7 }}>
          Most DFW homeowners never think about indoor air quality — until someone gets sick. Here's what's actually in your home's air and what to do about it.
        </p>

        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: '#ffffff' }}>☢️ Radon in DFW: Should You Worry?</h2>
        <div style={{ background: '#111827', borderRadius: 16, padding: 24, marginBottom: 16 }}>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, marginBottom: 16 }}>
            Texas generally has lower radon levels than northern states, but it's not zero. Radon is a naturally occurring radioactive gas that seeps from soil and rock. It's the second leading cause of lung cancer in the US after smoking.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 16 }}>
            <div style={{ background: '#1e2a1e', border: '1px solid #166534', borderRadius: 10, padding: 16 }}>
              <p style={{ color: '#4ade80', fontWeight: 700, marginBottom: 4 }}>Dallas County</p>
              <p style={{ color: '#e2e8f0', fontSize: 14 }}>EPA Zone 2</p>
              <p style={{ color: '#94a3b8', fontSize: 13 }}>Moderate radon potential</p>
            </div>
            <div style={{ background: '#1e2a1e', border: '1px solid #166534', borderRadius: 10, padding: 16 }}>
              <p style={{ color: '#4ade80', fontWeight: 700, marginBottom: 4 }}>Tarrant County</p>
              <p style={{ color: '#e2e8f0', fontSize: 14 }}>EPA Zone 3</p>
              <p style={{ color: '#94a3b8', fontSize: 13 }}>Lower radon potential</p>
            </div>
            <div style={{ background: '#1e2a1e', border: '1px solid #166534', borderRadius: 10, padding: 16 }}>
              <p style={{ color: '#4ade80', fontWeight: 700, marginBottom: 4 }}>Collin County</p>
              <p style={{ color: '#e2e8f0', fontSize: 14 }}>EPA Zone 2</p>
              <p style={{ color: '#94a3b8', fontSize: 13 }}>Moderate radon potential</p>
            </div>
          </div>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>
            Zone designations are averages — the only way to know your home's actual level is to test it.
          </p>
        </div>

        <div style={{ background: '#111827', borderRadius: 16, padding: 24, marginBottom: 32 }}>
          <h3 style={{ color: '#ffffff', fontWeight: 700, marginBottom: 16, fontSize: 18 }}>How to Test for Radon</h3>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ background: '#1e293b', borderRadius: 10, padding: 16 }}>
              <p style={{ color: '#60a5fa', fontWeight: 600, marginBottom: 4 }}>Step 1: Get a test kit</p>
              <p style={{ color: '#94a3b8', fontSize: 14 }}>Purchase a short-term radon test kit ($15-25) at Home Depot, Lowe's, or online. Look for EPA-listed kits.</p>
            </div>
            <div style={{ background: '#1e293b', borderRadius: 10, padding: 16 }}>
              <p style={{ color: '#60a5fa', fontWeight: 600, marginBottom: 4 }}>Step 2: Place correctly</p>
              <p style={{ color: '#94a3b8', fontSize: 14 }}>Place in the lowest livable level of your home (basement or first floor). Keep windows closed. Leave undisturbed for 48-96 hours.</p>
            </div>
            <div style={{ background: '#1e293b', borderRadius: 10, padding: 16 }}>
              <p style={{ color: '#60a5fa', fontWeight: 600, marginBottom: 4 }}>Step 3: Mail and wait</p>
              <p style={{ color: '#94a3b8', fontSize: 14 }}>Mail to the lab (prepaid). Results in 3-5 business days. Results in picocuries per liter (pCi/L).</p>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <h4 style={{ color: '#ffffff', marginBottom: 12 }}>Understanding Your Results</h4>
            <div style={{ display: 'grid', gap: 8 }}>
              {[
                { range: 'Below 2 pCi/L', color: '#4ade80', bg: '#0d1f0d', action: 'No action required. Average US outdoor air is 0.4 pCi/L.' },
                { range: '2–4 pCi/L', color: '#facc15', bg: '#1a1a0d', action: 'Consider mitigation. EPA recommends taking action above 4, but some experts suggest acting at 2.' },
                { range: 'Above 4 pCi/L', color: '#f87171', bg: '#1f0d0d', action: 'EPA recommends mitigation. Fix within a few months.' },
                { range: 'Above 8 pCi/L', color: '#ef4444', bg: '#2a0d0d', action: 'Fix as soon as possible. This is a serious health concern.' },
              ].map(r => (
                <div key={r.range} style={{ background: r.bg, border: `1px solid ${r.color}30`, borderRadius: 8, padding: 12, display: 'flex', gap: 16 }}>
                  <span style={{ color: r.color, fontWeight: 700, minWidth: 120, fontSize: 14 }}>{r.range}</span>
                  <span style={{ color: '#94a3b8', fontSize: 14 }}>{r.action}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 16, background: '#1e293b', borderRadius: 10, padding: 16 }}>
            <p style={{ color: '#facc15', fontWeight: 600, marginBottom: 4 }}>Mitigation Cost</p>
            <p style={{ color: '#94a3b8', fontSize: 14 }}>Standard sub-slab depressurization system: <strong style={{ color: '#f0f0f0' }}>$700–$1,500</strong>. Works by drawing radon from below the foundation and venting it outside. Effective in 95%+ of cases.</p>
          </div>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: '#ffffff' }}>🏠 Other DFW Air Quality Concerns</h2>
        <div style={{ display: 'grid', gap: 16, marginBottom: 48 }}>
          {[
            { icon: '🧪', title: 'VOCs (Volatile Organic Compounds)', color: '#a78bfa', content: 'New paint, flooring, furniture, and cabinetry off-gas VOCs for 1-3 years. DFW’s warm climate accelerates off-gassing. Use low-VOC or no-VOC products and ventilate heavily for 72 hours after installation.' },
            { icon: '💧', title: 'Mold and Humidity', color: '#38bdf8', content: 'DFW spring humidity spikes to 70-80%. Mold grows at humidity above 60%. Run dehumidifiers in April-June, seal crawl spaces, and ensure HVAC drain lines are clear. Post-flooding: remediation within 24-48 hours prevents permanent mold.' },
            { icon: '🌿', title: 'Allergens', color: '#4ade80', content: 'Mountain cedar (December-February) is the worst allergen season in DFW — locals call it "cedar fever." Oak (March-April) and ragweed (September-November) follow. MERV-11+ HVAC filters help significantly. Change monthly during peak season.' },
            { icon: '💨', title: 'Carbon Monoxide', color: '#f87171', content: 'CO is produced by gas furnaces, water heaters, stoves, and attached garages. Annual inspection of all gas appliances is essential. Install CO detectors on every floor within 15 feet of sleeping areas. Replace detectors every 5-7 years.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#111827', borderRadius: 16, padding: 24 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 28 }}>{item.icon}</span>
                <div>
                  <h3 style={{ color: item.color, fontWeight: 700, marginBottom: 8, fontSize: 18 }}>{item.title}</h3>
                  <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: 0 }}>{item.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, color: '#ffffff' }}>✅ Home Air Quality Checklist</h2>
        <div style={{ background: '#111827', borderRadius: 16, padding: 24, marginBottom: 48 }}>
          <p style={{ color: '#94a3b8', marginBottom: 20 }}>Check off what applies to your home to see your air quality score.</p>
          <div style={{ display: 'grid', gap: 10 }}>
            {checklistItems.map(item => (
              <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', background: checked.includes(item.id) ? '#0d1f0d' : '#1e293b', border: `1px solid ${checked.includes(item.id) ? '#4ade80' : '#334155'}`, borderRadius: 10, padding: 14 }}>
                <input type="checkbox" checked={checked.includes(item.id)} onChange={() => toggle(item.id)} style={{ width: 18, height: 18 }} />
                <span style={{ color: '#e2e8f0', fontSize: 15 }}>{item.label}</span>
                <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: 13 }}>+{item.weight} pts</span>
              </label>
            ))}
          </div>

          {checked.length > 0 && (
            <div style={{ marginTop: 24, background: '#0f172a', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <p style={{ fontSize: 48, fontWeight: 800, color: getScoreColor(), marginBottom: 4 }}>{score}/100</p>
              <p style={{ color: getScoreColor(), fontWeight: 600, fontSize: 16 }}>{getScoreLabel()}</p>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', background: '#1a1a3a', border: '1px solid #312e81', borderRadius: 16, padding: 40 }}>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>Schedule an Air Quality Assessment</h3>
          <p style={{ color: '#94a3b8', marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
            ProLnk connects you with licensed inspectors and HVAC pros who can test and remediate air quality issues.
          </p>
          <a href="/waitlist/homeowner" style={{ background: '#7c3aed', color: '#ffffff', padding: '14px 32px', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: 16, display: 'inline-block' }}>
            Find an Air Quality Pro →
          </a>
        </div>

      </div>
    </div>
  );
}
