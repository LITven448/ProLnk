import { useState } from 'react';

const herbData: Record<string, { herbs: string[]; calendar: string; careTips: string }> = {
  'flavor-ground': {
    herbs: ['🌿 Basil (loves DFW heat — plant May-Aug)', '🌱 Rosemary (perennial in DFW)', '🍃 Oregano (spreads prolifically)', '🌸 Thyme (heat tolerant)'],
    calendar: 'Basil: May–Aug. Rosemary: plant Oct or Mar. Oregano: Mar–Apr start. Thyme: year-round in DFW.',
    careTips: 'Rosemary thrives in DFW alkaline soil — minimal water once established. Basil needs 1 in/week in heat. Pinch basil flowers to extend harvest.',
  },
  'flavor-container': {
    herbs: ['🌿 Basil (12-inch container min)', '🍃 Mint (MUST be contained — spreads aggressively)', '🌱 Chives (compact, perfect in pots)', '🌸 Parsley (slow to bolt in containers)'],
    calendar: 'Mint: any time — keep in pots always. Basil: May–Aug. Chives: Mar–Nov. Parsley: Sept–Apr for best results.',
    careTips: 'Never plant mint in ground in DFW — it will take over. Use 6-8 inch pots for mint. Water containers daily in DFW summer heat.',
  },
  'tea-ground': {
    herbs: ['🌸 Lavender (DFW-hardy varieties: Phenomenal, Hidcote)', '🌿 Lemon Balm (vigorous in DFW)', '🍃 Chamomile (plant Oct for spring blooms)', '🌱 Echinacea (native-friendly)'],
    calendar: 'Lavender: plant March or September. Lemon balm: March–April. Chamomile: Oct–Nov for DFW. Echinacea: spring plant.',
    careTips: 'Lavender: critical — excellent drainage, do not overwater. DFW clay kills lavender fast. Raise beds or use containers. Lemon balm: drought tolerant once established.',
  },
  'tea-container': {
    herbs: ['🌸 Lavender (Terra cotta pot — wicks moisture)', '🌿 Holy Basil (Tulsi) — heat lover', '🍃 Lemon Verbena (perennial if protected)', '🌱 Stevia (DFW summer thrives)'],
    calendar: 'Tulsi: May–Sept. Lemon verbena: Apr–Oct. Stevia: May–Sept. Lavender: Mar–Oct container season.',
    careTips: 'Stevia loves DFW summers. Lemon verbena: bring inside if freeze expected. Tulsi: water 2x/week in peak summer heat.',
  },
};

const goalOptions = ['flavor-ground', 'flavor-container', 'tea-ground', 'tea-container'];
const goalLabels: Record<string, string> = {
  'flavor-ground': 'Culinary Herbs — In-Ground',
  'flavor-container': 'Culinary Herbs — Containers',
  'tea-ground': 'Tea & Wellness Herbs — In-Ground',
  'tea-container': 'Tea & Wellness Herbs — Containers',
};

export default function DFWHerbGardenGuide() {
  const [goal, setGoal] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const result = submitted && goal ? herbData[goal] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌿</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Herb Garden Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW has unique growing conditions — scorching summers, mild winters, alkaline clay. Here's what herbs actually thrive here.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 16 }}>🌡️ DFW Herb Growing Facts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '☀️', label: 'Heat Heroes', val: 'Basil, rosemary, oregano, thyme love DFW summers' },
              { icon: '⚠️', label: 'Mint Warning', val: 'NEVER plant mint in ground — will spread everywhere' },
              { icon: '🌧️', label: 'Lavender Key', val: 'Drainage critical — DFW clay will kill lavender fast' },
              { icon: '📅', label: 'Two Seasons', val: 'Cool herbs (cilantro, parsley) grow Sept–Apr in DFW' },
            ].map((f) => (
              <div key={f.label} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 22 }}>{f.icon}</div>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600 }}>{f.label}</div>
                <div style={{ fontSize: 12, color: '#94a3b8′ }}>{f.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 16 }}>🔍 Find Your Herb Match</h2>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94a3b8′ }}>Select your herb goal and growing space:</label>
          <select value={goal} onChange={(e) => { setGoal(e.target.value); setSubmitted(false); }} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 14, marginBottom: 16 }}>
            <option value=>-- Choose your setup --</option>
            {goalOptions.map((o) => <option key={o} value={o}>{goalLabels[o]}</option>)}
          </select>
          <button onClick={() => setSubmitted(true)} disabled={!goal} style={{ width: '100%', padding: '12px', background: goal ? '#F5E642′ : '#1e3a5f', color: goal ? '#0A1628' : '#4a6080', borderRadius: 8, border: ’none', fontWeight: 700, fontSize: 15, cursor: goal ? 'pointer' : 'not-allowed' }}>
            Show My Herb Recommendations 🌿
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 16 }}>✅ Best Herbs for Your DFW Setup</h2>
            <div style={{ marginBottom: 16 }}>
              {result.herbs.map((h) => <div key={h} style={{ background: '#0A1628', borderRadius: 8, padding: 10, marginBottom: 8, fontSize: 14 }}>{h}</div>)}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>📅 DFW Planting Calendar</div>
              <div style={{ fontSize: 13, color: '#94a3b8′ }}>{result.calendar}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>💡 Care Tips</div>
              <div style={{ fontSize: 13, color: '#94a3b8′ }}>{result.careTips}</div>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', color: '#4a6080', fontSize: 12 }}>
          ProLnk — DFW Home & Garden Intelligence
        </div>
      </div>
    </div>
  );
}
