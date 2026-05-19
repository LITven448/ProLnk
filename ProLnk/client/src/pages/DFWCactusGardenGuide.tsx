import { useState } from 'react';

const cactusData: Record<string, { plants: string[]; freezeProtection: string; plantingGuide: string }> = {
  'sunny-dry': {
    plants: ['🌵 Prickly Pear (Opuntia)', '🌿 Blue Agave', '🌸 Claret Cup Cactus', '🪴 Engelmann Prickly Pear'],
    freezeProtection: 'Hardy to 0°F — no protection needed for most years. Cover with frost cloth if temps drop below 15°F.',
    plantingGuide: 'Plant in spring after last frost. Use fast-draining soil mix. Space agaves 6-10 ft apart — they get large.',
  },
  'sunny-moderate': {
    plants: ['🌵 Golden Barrel Cactus', '🌿 Aloe Vera', '🌸 Hedgehog Cactus', '🪴 Sedum (Stonecrop)'],
    freezeProtection: 'Aloe is frost-sensitive — bring containers inside below 32°F. Barrel cactus hardy to 15°F.',
    plantingGuide: 'Plant aloe in raised beds for extra drainage. Golden barrel: full sun required. Sedum: ground cover excels.',
  },
  'partial-dry': {
    plants: ['🌿 Century Plant', '🌸 Desert Willow', '🪴 Hens and Chicks', '🌵 Pincushion Cactus'],
    freezeProtection: 'Century plant hardy — tolerates DFW winters. Hens and chicks are very cold hardy to -20°F.',
    plantingGuide: 'DFW alkaline clay soil benefits from raised beds. Add perlite for drainage. Water monthly in dormancy.',
  },
  'partial-moderate': {
    plants: ['🌿 Agave Parryi', '🌸 Red Yucca', '🪴 Ghost Plant (Graptopetalum)', '🌵 Fishhook Cactus'],
    freezeProtection: 'Red yucca native to Texas — fully hardy. Ghost plant: bring inside below 25°F if in containers.',
    plantingGuide: 'Red yucca blooms attract hummingbirds. Plant ghost plant in terracotta for wicking excess moisture.',
  },
};

const climateOptions = ['sunny-dry', 'sunny-moderate', 'partial-dry', 'partial-moderate'];
const zoneLabels: Record<string, string> = {
  'sunny-dry': 'Full Sun + Dry Yard',
  'sunny-moderate': 'Full Sun + Average Moisture',
  'partial-dry': 'Partial Shade + Dry',
  'partial-moderate': 'Partial Shade + Moderate',
};

export default function DFWCactusGardenGuide() {
  const [zone, setZone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const result = submitted && zone ? cactusData[zone] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🌵</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>DFW Cactus & Succulent Garden Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>DFW's alkaline soil and hot summers are ideal for many cacti and succulents. Find what thrives in your yard.</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 16 }}>🌞 DFW Climate Facts for Cacti</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '🌡️', label: 'Summer Heat', val: '95-105°F — cacti love it' },
              { icon: '❄️', label: 'Winter Risk', val: 'Occasional freezes below 20°F' },
              { icon: '🪨', label: 'Soil pH', val: 'Alkaline clay — add perlite for drainage' },
              { icon: '💧', label: 'Rainfall', val: '37 in/yr but unpredictable — supplement' },
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
          <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 16 }}>🔍 Find Your Cactus Match</h2>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 14, color: '#94a3b8′ }}>Select your yard conditions:</label>
          <select value={zone} onChange={(e) => { setZone(e.target.value); setSubmitted(false); }} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 14, marginBottom: 16 }}>
            <option value=>-- Choose your yard zone --</option>
            {climateOptions.map((o) => <option key={o} value={o}>{zoneLabels[o]}</option>)}
          </select>
          <button onClick={() => setSubmitted(true)} disabled={!zone} style={{ width: '100%', padding: '12px', background: zone ? '#F5E642′ : '#1e3a5f', color: zone ? '#0A1628' : '#4a6080', borderRadius: 8, border: ’none', fontWeight: 700, fontSize: 15, cursor: zone ? 'pointer' : 'not-allowed' }}>
            Show My Recommendations 🌵
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 17, color: '#F5E642', marginBottom: 16 }}>✅ Best Cacti & Succulents for Your Yard</h2>
            <div style={{ marginBottom: 16 }}>
              {result.plants.map((p) => <div key={p} style={{ background: '#0A1628', borderRadius: 8, padding: 10, marginBottom: 8, fontSize: 14 }}>{p}</div>)}
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>❄️ Freeze Protection</div>
              <div style={{ fontSize: 13, color: '#94a3b8′ }}>{result.freezeProtection}</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>🌱 Planting Guide</div>
              <div style={{ fontSize: 13, color: '#94a3b8′ }}>{result.plantingGuide}</div>
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
