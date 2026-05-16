import { useState } from 'react';

const TRADE_ITEMS: Record<string, string[]> = {
  'Drywall & Paint': [
    '🔍 No visible seams, tape ridges, or nail pops',
    '🖌️ Paint edges crisp at all trim, ceiling, and wall intersections',
    '🪣 Consistent sheen — no flash spots from touch-up paint',
    '🕳️ All holes patched — outlet, switch, fixture boxes',
    '📐 Corners square and smooth — no cracking at drywall joints',
  ],
  'Tile & Flooring': [
    '📏 Grout lines consistent width throughout',
    '🔷 No hollow spots — tap each tile, should sound solid',
    '🧹 Grout haze cleaned from tile faces',
    '🔗 Transitions installed at all thresholds — no exposed edges',
    '📐 Floor level — no lippage >1/32" between adjacent tiles',
    '🚿 Caulk (not grout) at tub/floor and tub/wall intersections',
  ],
  'Plumbing': [
    '💧 All fixtures operational — run for 5 minutes minimum',
    '🔍 Check under sinks for drips at all supply and drain connections',
    '🚽 Toilets flush fully, fill and shut off completely',
    '🌡️ Hot water at all fixtures within 60 seconds',
    '🧪 No sewer smell — P-traps filled on all drains',
    '💪 Shower pressure matches pre-renovation pressure',
  ],
  'Electrical': [
    '🔌 Test every outlet with a plug tester — confirm hot, neutral, ground',
    '💡 All switches operate correct fixtures',
    '🔐 GFCI outlets trip and reset correctly — test all bathrooms, kitchen, exterior',
    '📦 All junction boxes covered — no open boxes visible',
    '🌡️ Dimmer switches operate smoothly without flicker',
    '⚡ Panel labeled correctly for all new circuits',
  ],
  'HVAC': [
    '❄️ System cools to setpoint within 30 minutes on 90°F day',
    '🌡️ System heats to setpoint within 20 minutes on 40°F day',
    '💨 All vents delivering airflow — no blocked or closed dampers',
    '🔊 No unusual sounds — no rattling, squealing, or banging',
    '🌬️ Filter installed and accessible for future service',
    '📱 Thermostat programmed and Wi-Fi connected (if applicable)',
  ],
  'General / Cleanup': [
    '🗑️ All debris hauled — no dumpster, materials, or scraps remaining',
    '🧹 Floors swept and vacuumed throughout work area',
    '🪟 Windows cleaned — no paint, caulk, or fingerprints',
    '🔧 All tools and contractor equipment removed from property',
    '📋 All permits finaled — city inspection cards signed off',
    '📦 Leftover materials, paint, tile delivered to homeowner',
  ],
};

export default function DFWPunchListGuide() {
  const [project, setProject] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const trades = project ? Object.keys(TRADE_ITEMS) : [];
  const allItems = trades.flatMap(t => TRADE_ITEMS[t].map(i => `${t}::${i}`));
  const checkedCount = allItems.filter(k => checked[k]).length;
  const pct = allItems.length > 0 ? Math.round((checkedCount / allItems.length) * 100) : 0;

  function toggle(key: string) {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>DFW Homeowner Tools</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642', marginBottom: '0.5rem' }}>✅ Final Punch List Guide</h1>
        <p style={{ color: '#9BA3B4', marginBottom: '1rem' }}>Do not release final payment until every item below is resolved and documented.</p>
        <div style={{ background: '#1A2A20', border: '1px solid #2A4A30', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '2rem', color: '#7BC47F', fontSize: '0.9rem' }}>
          💡 Retain 10% of total contract as holdback. Release only after punch list is 100% complete and you have lien waivers in hand.
        </div>

        <div style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <select value={project} onChange={e => setProject(e.target.value)}
            style={{ width: '100%', background: '#0A1628', color: '#E8EAF0', border: '1px solid #2A3A55', borderRadius: 8, padding: '0.75rem', fontSize: '1rem' }}>
            <option value="">— Select your project to load punch list —</option>
            {['Full Remodel', 'Kitchen Only', 'Bathroom Only', 'HVAC Only', 'Flooring Only'].map(p => <option key={p}>{p}</option>)}
          </select>
        </div>

        {project && (
          <>
            <div style={{ background: '#111E35', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#9BA3B4' }}>Punch list progress</span>
              <span style={{ color: pct === 100 ? '#4CAF50' : '#F5E642', fontWeight: 700, fontSize: '1.2rem' }}>{checkedCount}/{allItems.length} — {pct}%</span>
            </div>

            {trades.map(trade => (
              <div key={trade} style={{ background: '#111E35', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem' }}>
                <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>{trade}</h3>
                {TRADE_ITEMS[trade].map(item => {
                  const key = `${trade}::${item}`;
                  return (
                    <label key={key} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid #1E2E45', cursor: 'pointer' }}>
                      <input type="checkbox" checked={!!checked[key]} onChange={() => toggle(key)}
                        style={{ marginTop: 3, accentColor: '#F5E642', width: 16, height: 16 }} />
                      <span style={{ color: checked[key] ? '#4CAF50' : '#C8D0DC' }}>{item}</span>
                    </label>
                  );
                })}
              </div>
            ))}

            {pct === 100 && (
              <div style={{ background: '#1A2A20', border: '1px solid #2A4A30', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉</div>
                <div style={{ color: '#4CAF50', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Punch List Complete</div>
                <div style={{ color: '#9BA3B4' }}>Collect signed lien waivers from contractor and all subcontractors before releasing final payment.</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
