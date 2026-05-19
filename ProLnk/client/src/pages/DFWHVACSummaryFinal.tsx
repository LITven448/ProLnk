import { useState } from 'react';

const profiles = [
  { id: 'small', label: '🏠 Under 1,500 sq ft' },
  { id: 'medium', label: '🏡 1,500–3,000 sq ft' },
  { id: 'large', label: '🏘️ 3,000–5,000 sq ft' },
  { id: 'xlarge', label: '🏰 5,000+ sq ft' },
  { id: 'replace', label: '🔄 System needs replacement' },
];

const plans: Record<string, { title: string; steps: string[] }> = {
  small: { title: 'Under 1,500 sq ft HVAC Plan', steps: ['2–2.5 ton system standard for DFW', 'SEER2 15+ required in TX since 2023', 'Single-stage heat pump often ideal for your size', 'Smart thermostat (Ecobee/Nest) saves 15% annually', 'Annual tune-up: $99–$149 twice a year'] },
  medium: { title: '1,500–3,000 sq ft HVAC Plan', steps: ['Manual J load calc required — reject any contractor skipping it', '3–4 ton system typical; two-zone system worth considering', 'SEER2 16–18 optimal for DFW payback period', 'Change filter monthly June–September', 'Biannual tune-up critical: coil cleaning + refrigerant check'] },
  large: { title: '3,000–5,000 sq ft HVAC Plan', steps: ['Dual-zone or multi-system strongly recommended', 'Each system: Manual J required, 3–5 ton range', 'Variable speed compressor: worth the premium in DFW heat', 'Dehumidifier may be needed in shoulder seasons', 'Budget $8K–$20K for full system replacement'] },
  xlarge: { title: '5,000+ sq ft HVAC Plan', steps: ['Commercial-grade or multiple 5-ton systems', 'Building envelope audit before system sizing', 'VRF system worth evaluating for zoned comfort', 'Dedicated fresh air system (ERV/HRV) for tight construction', 'Service contract essential — downtime cost is high'] },
  replace: { title: 'System Replacement Action Plan', steps: ['Get 3 bids — all must include Manual J load calculation', 'Require SEER2 15+ minimum (TX code)', 'Check R-454B refrigerant compatibility (R-22 gone, R-410A phasing)', 'Register warranty within 60 days of install', 'Carrier/Trane/Lennox preferred for DFW service network'] },
};

export default function DFWHVACSummaryFinal() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HVAC 2026 · FINAL SUMMARY</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>❄️ DFW HVAC Final Knowledge Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Everything you need to know about HVAC in Dallas-Fort Worth — sizing, efficiency, brands, and maintenance.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '📐', title: 'Sizing (Manual J Required)', body: 'Never accept "rule of thumb" sizing. DFW homes need Manual J heat load calculations. Oversized systems short-cycle, fail to dehumidify, and waste energy. Undersized systems run constantly. Demand the calculation in writing.' },
            { icon: '⚡', title: 'Efficiency (SEER2 15+ for DFW)', body: 'TX requires SEER2 14 minimum since Jan 2023. For DFW\’s 3,000+ cooling hours/year, SEER2 16–18 pays back in 4–6 years. Variable speed compressors add 15–25% efficiency and dramatically improve humidity control.' },
            { icon: '🏭', title: 'Brands & Local Service', body: 'Carrier, Trane, Lennox: 200+ DFW service companies. Daikin, Mitsubishi: fewer service techs but excellent equipment. Avoid brands with thin DFW dealer networks — warranty service becomes impossible in peak demand.' },
            { icon: '🔧', title: 'Maintenance (Biannual)', body: 'Spring (March): clean evaporator coil, check refrigerant, replace filter, test capacitors. Fall (October): heat exchanger inspection, burner cleaning, drain line flush. Skip maintenance and efficiency drops 5% annually.' },
            { icon: '🌡️', title: 'Refrigerant Transition 2026', body: 'R-410A production ending. R-454B (Puron Advance) is new standard. If your system uses R-22 (pre-2010), replacement parts are scarce. R-410A systems: service available but new equipment is R-454B. Plan accordingly.' },
            { icon: '📋', title: 'Warranty Registration', body: 'Register within 60 days or lose extended warranty. Carrier: 10-year parts if registered. Trane: 12-year compressor warranty if registered. Keep all documentation — unregistered warranties drop to 5-year limited. Critical before any sale.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#111d35', borderRadius: 12, padding: 20, borderLeft: '3px solid #F5E642' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111d35', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🎯 Complete HVAC Summary for Your Home</h2>
          <p style={{ color: '#94a3b8', marginBottom: 20, fontSize: 14 }}>Select your home profile for a complete action plan:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
            {profiles.map(p => (
              <button key={p.id} onClick={() => setSelected(p.id)} style={{ padding: '10px 18px', borderRadius: 8, border: `2px solid ${selected === p.id ? '#F5E642' : '#1e3a5f'}`, background: selected === p.id ? '#F5E642' : 'transparent', color: selected === p.id ? '#0A1628' : '#fff', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>{p.label}</button>
            ))}
          </div>
          {selected && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 14 }}>{plans[selected].title}</div>
              {plans[selected].steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, color: '#cbd5e1', fontSize: 14 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, minWidth: 20 }}>{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
              <div style={{ marginTop: 20, padding: 14, background: '#111d35', borderRadius: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>🔗 ProLnk matches you with Manual J–certified DFW HVAC contractors. No guesswork sizing.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
