import { useState } from 'react';

const orchidData: Record<string, { careReqs: string; humiditySolution: string; wateringSchedule: string }> = {
  'phalaenopsis-hvac': {
    careReqs: 'Phalaenopsis (Moth Orchid) — most common DFW home orchid. Bright indirect light (east window ideal). DFW winter HVAC strips humidity to 20-30% — orchids need 50-60%. Keep away from heat vents.',
    humiditySolution: 'Place on humidity tray (pebbles + water below pot — never touching roots). Group orchids together — transpiration raises local humidity. Small humidifier in orchid area most effective. Mist leaves lightly in morning only.',
    wateringSchedule: 'Water once per week: drench thoroughly, let drain completely — never let sit in water. DFW winter: every 10 days (HVAC dries faster but orchid is semi-dormant). Check: stick finger 1 inch into medium — water if dry.',
  },
  'phalaenopsis-humid': {
    careReqs: 'Phalaenopsis in naturally humid DFW home area (bathroom with window, near kitchen). More forgiving environment. Still keep away from AC vents — the cold dry blast damages roots.',
    humiditySolution: 'Bathroom window setup is ideal — shower steam provides natural humidity. No pebble tray needed. Monitor that humidity does not exceed 70% (mold risk). Good air circulation still required.',
    wateringSchedule: 'Every 7-10 days. Humid rooms slow evaporation. Test bark medium — water when top inch is dry. Reduce to every 2 weeks in DFW winter when orchid rests. Fertilize monthly with diluted orchid food (half strength).',
  },
  'cattleya-hvac': {
    careReqs: 'Cattleya orchids need bright light — south or west window in DFW. More dramatic humidity swing tolerance than Phalaenopsis but still stressed by HVAC dry air. Pseudobulbs store water — more drought tolerant.',
    humiditySolution: 'Humidity tray plus grouping is effective. Cattleyas benefit from humidity 40-60%. DFW summer outdoor placement (shade cloth filtered) dramatically improves bloom quality — bring inside when below 55°F.',
    wateringSchedule: 'Water when medium is nearly completely dry — Cattleyas like wet/dry cycles. Typically every 5-7 days in DFW summer, every 10-14 days in winter. Never water pseudobulbs sitting in water. Fertilize every other watering.',
  },
  'dendrobium-hvac': {
    careReqs: 'Dendrobium orchids: diverse genus — most common types love DFW summer heat outdoors. Nobile types need cool dry winter rest to initiate blooms (DFW winters work well). Phalaenopsis-type Dendrobiums: year-round indoor.',
    humiditySolution: 'Nobile Dendrobiums: bring outside May-Sept (60-80% natural humidity). Bring inside before first freeze. Indoor winter: humidity tray plus grouping. Keep at 45-55°F nights in winter to trigger bloom — a cool bedroom works.',
    wateringSchedule: 'Summer (outdoor): water every 2-3 days. Winter rest: water very sparingly every 3-4 weeks — just enough to prevent shriveling. Resume normal watering when new growth emerges in spring.',
  },
};

const typeOptions = ['phalaenopsis-hvac', 'phalaenopsis-humid', 'cattleya-hvac', 'dendrobium-hvac'];
const typeLabels: Record<string, string> = {
  'phalaenopsis-hvac': 'Phalaenopsis (Moth Orchid) — Standard DFW HVAC Home',
  'phalaenopsis-humid': 'Phalaenopsis — Naturally Humid Area (Bathroom/Kitchen)',
  'cattleya-hvac': 'Cattleya — Bright DFW Home',
  'dendrobium-hvac': 'Dendrobium — DFW Home (Seasonal)',
};

export default function DFWOrchidCareGuide() {
  const [orchidType, setOrchidType] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const result = submitted && orchidType ? orchidData[orchidType] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌸</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Orchid Care Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW homes create specific orchid challenges — HVAC drops winter humidity to 20-30% while orchids need 50-60%. Here is how to bridge that gap.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 16 }}>🏠 DFW Home vs. Orchid Needs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '💨', label: 'HVAC Winter', val: 'DFW homes drop to 20-30% RH — orchids need 50-60%' },
              { icon: '🌡️', label: 'Summer AC', val: 'Cold dry AC blast damages roots — keep away from vents' },
              { icon: '☀️', label: 'Light', val: 'DFW east windows = ideal diffused morning light' },
              { icon: '💧', label: 'Water Rule', val: 'Never let roots sit in water — DFW heat + overwater = root rot' },
            ].map((f) => (
              <div key={f.label} style={{ background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <div style={{ fontSize: 22 }}>{f.icon}</div>
                <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600 }}>{f.label}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>{f.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 16 }}>🔍 Find Your Orchid Care Plan</h2>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94a3b8' }}>Select your orchid type and home situation:</label>
          <select value={orchidType} onChange={(e) => { setOrchidType(e.target.value); setSubmitted(false); }} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 14, marginBottom: 16 }}>
            <option value="">-- Choose your orchid situation --</option>
            {typeOptions.map((o) => <option key={o} value={o}>{typeLabels[o]}</option>)}
          </select>
          <button onClick={() => setSubmitted(true)} disabled={!orchidType} style={{ width: '100%', padding: '12px', background: orchidType ? '#F5E642' : '#1e3a5f', color: orchidType ? '#0A1628' : '#4a6080', borderRadius: 8, border: 'none', fontWeight: 700, fontSize: 15, cursor: orchidType ? 'pointer' : 'not-allowed' }}>
            Show My Orchid Care Plan 🌸
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 16 }}>✅ Your DFW Orchid Care Plan</h2>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>🌸 Care Requirements</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{result.careReqs}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>💧 Humidity Solution</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{result.humiditySolution}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>🗓️ Watering Schedule</div>
              <div style={{ fontSize: 13, color: '#94a3b8' }}>{result.wateringSchedule}</div>
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
