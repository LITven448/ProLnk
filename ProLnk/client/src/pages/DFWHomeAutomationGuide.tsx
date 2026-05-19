import { useState } from 'react';

const AUTOMATION_CATEGORIES = [
  {
    icon: '💡',
    name: 'Lighting',
    cost: '$150–$600',
    benefit: 'Convenience + 10–15% energy savings',
    devices: 'Smart bulbs (Philips Hue, LIFX), smart switches (Lutron Caseta)',
    dfwNote: 'Automate porch lights at sunset — DFW dusk varies 50+ min across seasons',
  },
  {
    icon: '🔒',
    name: 'Locks & Security',
    cost: '$150–$400',
    benefit: 'Keyless entry, guest access, remote lock/unlock',
    devices: 'Schlage Encode, Kwikset Halo, Yale Assure',
    dfwNote: 'Grant contractor access remotely — huge for DFW home service visits',
  },
  {
    icon: '🌡️',
    name: 'Thermostat',
    cost: '$169–$249',
    benefit: '$200–$500/yr savings on DFW energy bills',
    devices: 'Nest, Ecobee, Honeywell T9',
    dfwNote: 'Pre-cool to 72°F before 3pm TOU peak pricing on Oncor grid',
  },
  {
    icon: '🚗',
    name: 'Garage',
    cost: '$30–$150',
    benefit: 'Auto-close on departure, remote access, delivery',
    devices: 'myQ, Tailwind, Chamberlain',
    dfwNote: 'Open garage in DFW summer = +$40/mo AC loss. Auto-close is a must.',
  },
  {
    icon: '💧',
    name: 'Irrigation',
    cost: '$100–$300',
    benefit: 'Save 30–50% on water bills, avoid HOA/city fines',
    devices: 'Rachio 3, RainBird WiFi, Hunter Hydrawise',
    dfwNote: 'DFW water restrictions require ET-based watering — smart controllers are built for this',
  },
  {
    icon: '🏊',
    name: 'Pool',
    cost: '$300–$800',
    benefit: 'Save $600–$1,200/yr on pool energy + evaporation',
    devices: 'Pentair IntelliConnect, Hayward OmniLogic, Jandy AquaLink',
    dfwNote: 'DFW homes with pools save massively with automated covers + variable-speed pumps',
  },
];

const GOAL_OPTIONS = [
  { value: 'energy', label: '⚡ Cut Energy Bills', categories: ['Thermostat', 'Lighting', 'Pool'] },
  { value: 'water', label: '💧 Save Water', categories: ['Irrigation'] },
  { value: 'security', label: '🔒 Improve Security', categories: ['Locks & Security', 'Garage'] },
  { value: 'convenience', label: '🛋️ Maximum Convenience', categories: ['Lighting', 'Locks & Security', 'Garage', 'Thermostat'] },
  { value: 'resale', label: '🏠 Boost Home Value', categories: ['Thermostat', 'Locks & Security', 'Irrigation', 'Pool'] },
];

export default function DFWHomeAutomationGuide() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  function toggleGoal(v: string) {
    setSelectedGoals(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
    setShowResult(false);
  }

  function getRecommendations() {
    const cats = new Set<string>();
    selectedGoals.forEach(g => {
      const opt = GOAL_OPTIONS.find(o => o.value === g);
      opt?.categories.forEach(c => cats.add(c));
    });
    return AUTOMATION_CATEGORIES.filter(c => cats.has(c.name));
  }

  function getTotalCost() {
    const recs = getRecommendations();
    if (recs.length === 0) return '$0';
    const min = recs.reduce((s, r) => s + parseInt(r.cost.replace(/\$|,/g, '').split('–')[0]), 0);
    const max = recs.reduce((s, r) => s + parseInt(r.cost.replace(/\$|,/g, '').split('–')[1]), 0);
    return `$${min.toLocaleString()}–$${max.toLocaleString()}`;
  }

  const recommendations = getRecommendations();

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px' }}>

        <div style={{ marginBottom: 32 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>🤖 DFW HOME AUTOMATION</span>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '16px 0 8px', lineHeight: 1.2 }}>
            DFW Home Automation Guide: What to Automate & Why
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6 }}>
            DFW homeowners have unique automation opportunities — extreme heat, water restrictions, large lots, and pools create automation ROI that's unmatched in other US markets.
          </p>
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#F5E642′ }}>🌞 Why DFW Is the Best Market for Home Automation ROI</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { stat: '$2,400–$4,800', label: 'Average DFW annual electricity bill (vs $1,500 national avg)' },
              { stat: '45–50%', label: 'Of that bill from HVAC alone in summer months' },
              { stat: '$800–$1,600', label: 'Annual pool operation cost before automation savings' },
              { stat: '2x Stage restrictions', label: 'Water restrictions per year on average in DFW suburbs' },
            ].map(item => (
              <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: 16 }}>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 22, marginBottom: 4 }}>{item.stat}</div>
                <div style={{ fontSize: 13, color: '#94A3B8′ }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 24 }}>
          {AUTOMATION_CATEGORIES.map(cat => (
            <div key={cat.name} style={{ background: '#0F2140', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{cat.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{cat.name} Automation</div>
                    <div style={{ fontSize: 13, color: '#34D399', marginTop: 2 }}>{cat.benefit}</div>
                  </div>
                </div>
                <div style={{ background: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700, color: '#F5E642', whiteSpace: 'nowrap' }}>{cat.cost}</div>
              </div>
              <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 8 }}><strong style={{ color: '#E8EDF5′ }}>Top Devices:</strong> {cat.devices}</div>
              <div style={{ background: '#0A1628', borderRadius: 6, padding: '10px 14px', fontSize: 13, color: '#F5E642', borderLeft: '3px solid #F5E642′ }}>
                📍 DFW Tip: {cat.dfwNote}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2140', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🎯 Build Your DFW Automation Priority List</h2>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Select your automation goals (choose all that apply):</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {GOAL_OPTIONS.map(g => (
                <button key={g.value} onClick={() => toggleGoal(g.value)}
                  style={{ padding: '10px 16px', borderRadius: 20, border: `2px solid ${selectedGoals.includes(g.value) ? '#F5E642' : '#1E3A5F'}`, background: selectedGoals.includes(g.value) ? '#F5E642′ : ’transparent', color: selectedGoals.includes(g.value) ? '#0A1628′ : '#E8EDF5', cursor: ’pointer', fontSize: 13, fontWeight: 600 }}>
                  {g.label}
                </button>
              ))}
            </div>
          </div>
          <button onClick={() => setShowResult(true)} disabled={selectedGoals.length === 0}
            style={{ background: selectedGoals.length > 0 ? '#F5E642′ : '#1E3A5F', color: selectedGoals.length > 0 ? '#0A1628' : '#64748B', border: ’none', padding: '12px 32px', borderRadius: 8, fontWeight: 700, fontSize: 16, cursor: selectedGoals.length > 0 ? 'pointer' : 'not-allowed', width: '100%' }}>
            Generate My Automation Plan →
          </button>
          {showResult && recommendations.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#F5E642′ }}>Your Priority Automation List</div>
                <div style={{ background: '#0A1628', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700, color: '#F5E642′ }}>Total: {getTotalCost()}</div>
              </div>
              {recommendations.map((rec, i) => (
                <div key={rec.name} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid #1E3A5F' }}>
                  <div style={{ width: 28, height: 28, background: '#F5E642', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0A1628', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontWeight: 600 }}>{rec.icon} {rec.name}</div>
                    <div style={{ fontSize: 13, color: '#94A3B8′ }}>{rec.cost} · {rec.benefit}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: 32, textAlign: 'center', padding: '24px', background: '#0F2140', borderRadius: 12 }}>
          <div style={{ fontSize: 14, color: '#94A3B8', marginBottom: 8 }}>Ready to install? Find a DFW smart home automation pro today.</div>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>ProLnk matches you with vetted DFW automation installers 🤖</div>
        </div>

      </div>
    </div>
  );
}
