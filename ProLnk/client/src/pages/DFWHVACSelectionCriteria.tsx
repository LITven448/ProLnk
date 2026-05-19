import { useState } from 'react';

const criteria = [
  { id: 'seer2', label: 'SEER2 Rating', icon: '⭐', detail: 'Minimum SEER2 15 for DFW. SEER2 17+ qualifies for federal 25C tax credit. Higher SEER2 = lower operating cost but higher upfront cost. In DFW climate, SEER2 17 typically pays back in 4–6 years.' },
  { id: 'eer', label: 'EER (Peak Day)', icon: '🌡️', detail: 'EER (not SEER) measures efficiency at 95°F — exactly DFW summer conditions. SEER2 can hide poor hot-weather performance. Look for EER ≥ 12.5 for DFW. Ask contractors for EER spec sheets.' },
  { id: 'sizing', label: 'Manual J Sizing', icon: '📐', detail: 'Undersizing = system runs constantly. Oversizing = short cycles, humidity problems, shorter equipment life. Require a Manual J load calculation in writing before signing. Rule-of-thumb sizing is contractor malpractice.' },
  { id: 'brand', label: 'Local Service Availability', icon: '🔧', detail: 'A brand with no local dealer support is a liability. In DFW, Carrier, Lennox, Trane, and Rheem have the deepest service networks. Verify parts availability and average service response time before choosing.' },
  { id: 'warranty', label: 'Warranty Terms', icon: '📋', detail: '10-year parts warranty is table stakes. Look for: labor warranty (2+ years), compressor coverage, and whether warranty requires annual professional maintenance. Register within 60 days of install.' },
  { id: 'thermostat', label: 'Smart Thermostat Compatibility', icon: '📱', detail: 'Variable-speed systems require compatible thermostats. Ecobee and Google Nest work with most brands. Some Lennox iComfort systems only work with Lennox thermostats — check before committing.' },
  { id: 'heatpump', label: 'Heat Pump vs. Gas Hybrid', icon: '🔁', detail: 'DFW mild winters make heat pumps viable. Hybrid systems (heat pump + gas backup) are ideal — electric efficiency in mild weather, gas for sub-30°F days. Qualifies for 25C credit.' },
  { id: 'noise', label: 'Noise Level', icon: '🔇', detail: 'Two-stage and variable-speed compressors run quieter. Decibel ratings: under 72dB is good, under 68dB is excellent. If outdoor unit is near bedrooms or patio, prioritize lower dB.' },
  { id: 'permits', label: 'Permit & Inspection', icon: '🏛️', detail: 'Any DFW HVAC replacement requires a permit. Run from contractors who skip permits — you inherit liability. Permit inspection catches bad installs before they become your problem.' },
  { id: 'contractor', label: 'Contractor Track Record', icon: '✅', detail: 'Verify: Texas HVAC license, liability insurance, BBB rating, and Google reviews with photos. Ask for 3 recent DFW references. Best contractors lead with Manual J — red flag if they skip it.' },
];

const priorities = ['Lowest operating cost', 'Best hot-weather performance', 'Longest equipment life', 'Smart home integration', 'Quietest operation', 'Best warranty protection'];

export default function DFWHVACSelectionCriteria() {
  const [priority, setPriority] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  function getRecommended() {
    const map: Record<string, string[]> = {
      'Lowest operating cost': ['seer2', 'eer', 'heatpump', 'sizing'],
      'Best hot-weather performance': ['eer', 'sizing', 'brand', 'contractor'],
      'Longest equipment life': ['sizing', 'contractor', 'warranty', 'permits'],
      'Smart home integration': ['thermostat', 'heatpump', 'noise', 'seer2'],
      'Quietest operation': ['noise', 'heatpump', 'sizing', 'thermostat'],
      'Best warranty protection': ['warranty', 'permits', 'contractor', 'brand'],
    };
    return map[priority] || [];
  }

  const recommended = getRecommended();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 12px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 12 }}>DFW HVAC GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🎯 DFW HVAC Selection Criteria</h1>
        <p style={{ color: '#8FA3BF', marginBottom: 28 }}>The 10 most important criteria when selecting a DFW HVAC system — ranked by your priorities.</p>

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginBottom: 28 }}>
          <label style={{ fontSize: 14, color: '#8FA3BF', display: 'block', marginBottom: 10, fontWeight: 600 }}>🎯 What matters most to you?</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {priorities.map(p => (
              <button key={p} onClick={() => setPriority(p)}
                style={{ background: priority === p ? '#F5E642′ : '#0A1628', color: priority === p ? '#0A1628' : '#fff', border: '1px solid #1E3A5F', borderRadius: 20, padding: '6px 14px', cursor: ’pointer', fontSize: 13, fontWeight: priority === p ? 700 : 400 }}>
                {p}
              </button>
            ))}
          </div>
          {priority && <p style={{ color: '#F5E642', fontSize: 13, marginTop: 12, marginBottom: 0 }}>✨ Highlighted criteria below are most critical for: <strong>{priority}</strong></p>}
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {criteria.map((c, i) => {
            const isRecommended = recommended.includes(c.id);
            const isSelected = selected.includes(c.id);
            return (
              <div key={c.id} onClick={() => toggle(c.id)}
                style={{ background: isSelected ? '#1E3A5F' : '#132035', border: isRecommended ? '2px solid #F5E642′ : '2px solid transparent', borderRadius: 12, padding: 16, cursor: ’pointer', transition: 'all 0.15s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 20 }}>{c.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 16 }}>{i + 1}. {c.label}</span>
                  {isRecommended && <span style={{ background: '#F5E642', color: '#0A1628', fontSize: 11, fontWeight: 800, borderRadius: 4, padding: '2px 6px', marginLeft: 'auto' }}>PRIORITY</span>}
                </div>
                {isSelected && <p style={{ color: '#C8D8E8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{c.detail}</p>}
                {!isSelected && <p style={{ color: '#8FA3BF', fontSize: 13, margin: 0 }}>Tap to expand →</p>}
              </div>
            );
          })}
        </div>

        <div style={{ background: '#132035', borderRadius: 12, padding: 20, marginTop: 24 }}>
          <h3 style={{ color: '#F5E642', marginBottom: 12 }}>📋 What to Ask Your Contractor</h3>
          <ul style={{ color: '#C8D8E8', lineHeight: 2, paddingLeft: 20, margin: 0 }}>
            <li>Can you provide a written Manual J load calculation?</li>
            <li>What is the EER rating at 95°F for this system?</li>
            <li>Will you pull permits and schedule the inspection?</li>
            <li>What does your labor warranty cover and for how long?</li>
            <li>Is this thermostat compatible with variable-speed operation?</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
