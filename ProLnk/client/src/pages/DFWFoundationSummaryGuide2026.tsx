import { useState } from 'react';

const concerns = [
  { id: 'cracks', label: '🔍 Seeing Cracks', actions: ['Photograph every crack with a ruler for scale — document today', 'Hairline cracks in drywall near doors: likely seasonal movement, monitor 90 days', 'Cracks wider than 1/4″ or horizontal: call a structural engineer, not a repair company', 'Check if doors stick — sticking doors = differential settlement signal', 'Do not pour any concrete work until foundation is assessed' ] },
  { id: 'water', label: '💧 Drainage Issues', actions: ['Grade soil away from foundation — minimum 6″ drop in 10 ft', 'Extend downspouts 6 ft minimum from foundation', 'French drain may be needed if water pools within 10 ft of slab', 'Avoid over-mulching against foundation — traps moisture against concrete', 'Check gutters twice a year — clogged = water dumps at foundation' ] },
  { id: 'summer', label: '☀️ Summer Drought', actions: ['Water foundation within 18″ of slab daily during July–August', 'Soaker hose on timer is the most consistent solution', 'Check soil moisture 6″ deep — should feel like a wrung sponge', 'Trees within 30 ft: roots pull moisture, may need supplemental watering', 'Do not let soil pull away from foundation edge — fill gaps immediately' ] },
  { id: 'buying', label: '🏠 Buying a Home', actions: ['Always hire a separate structural engineer — not just a general inspector', 'Get repair history from seller — ask specifically about piers and leveling', 'Ask for a transferable warranty if foundation work was done', 'Inspect doors and windows for sticking before and after rain', 'Check Home Health Vault for documented foundation history' ] },
];

const summaryFacts = [
  { icon: '🌿', title: 'Clay Soil = Water Is King', body: 'DFW sits on expansive clay. Dry clay shrinks; wet clay swells. Inconsistent moisture is the #1 cause of foundation movement in Texas.' },
  { icon: '💧', title: 'Water Daily in July & August', body: 'The two hottest months bake DFW soil into concrete. Daily foundation watering during peak drought prevents $8K–$25K in damage.' },
  { icon: '📸', title: 'Document Every Repair', body: 'Documented repairs with engineer sign-off add value at resale. Undocumented repairs raise red flags and kill deals. Use Home Health Vault.' },
  { icon: '🏗️', title: 'Engineer First, Repair Company Second', body: 'Foundation repair companies get paid to recommend repairs. Engineers get paid to be right. Always get an engineer’s assessment first.' },
  { icon: '🌧️', title: 'Drain Away From Foundation', body: 'Every roof downspout should extend 6+ feet away. Every yard should slope away. Water pooling at your foundation = guaranteed future problems.' },
];

export default function DFWFoundationSummaryGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = concerns.find(c => c.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DFW Foundation Complete Summary 2026</h1>
          <p style={{ color: '#8A9BB5', fontSize: 15 }}>Everything about DFW foundation in one page — the stakes are too high to guess</p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>The 5 Foundation Rules Every DFW Owner Must Know</h2>
          {summaryFacts.map((item, i) => (
            <div key={i} style={{ background: '#111D35', border: '1px solid #1E3A5F', borderRadius: 12, padding: 20, marginBottom: 12, display: 'flex', gap: 16 }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ color: '#E8F0FF', fontWeight: 600, marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#8A9BB5', fontSize: 14, lineHeight: 1.6 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>My Foundation Concern → What To Do</h2>
          <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
            {concerns.map(c => (
              <button key={c.id} onClick={() => setSelected(c.id === selected ? null : c.id)}
                style={{ background: selected === c.id ? '#F5E642′ : '#111D35', color: selected === c.id ? '#0A1628' : '#E8F0FF', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 18px', cursor: ’pointer', fontWeight: 600, fontSize: 14 }}>
                {c.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#111D35', border: '1px solid #F5E642', borderRadius: 12, padding: 24 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 16 }}>{active.label} — Action Guide</div>
              {active.actions.map((action, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                  <span style={{ color: '#E8F0FF', fontSize: 14 }}>{action}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40, padding: 24, background: '#111D35', borderRadius: 12, border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Foundation concern? Get a vetted engineer referral.</div>
          <div style={{ color: '#8A9BB5', fontSize: 14 }}>ProLnk connects you with licensed DFW structural pros — not just repair salespeople</div>
        </div>
      </div>
    </div>
  );
}