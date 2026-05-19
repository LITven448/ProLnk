import { useState } from 'react';

const seasonalChecklists: Record<string, { label: string; tasks: string[] }> = {
  spring: { label: '🌸 Spring Maintenance (Mar–May)', tasks: ['Foundation inspection after winter freeze cycles', 'HVAC service before summer heat — Corinth averages 100°F+ July/Aug', 'Roof inspection for winter storm damage', 'Irrigation system startup and head calibration', 'Pest control perimeter treatment — fire ants active in March', 'Clay soil drainage check — spring rains stress expansive soil'] },
  summer: { label: '☀️ Summer Maintenance (Jun–Aug)', tasks: ['Foundation watering during drought — clay soil shrink risk', 'HVAC filter monthly due to heat load', 'Lake Lewisville humidity — exterior paint and wood check', 'Attic temperature check — ventilation critical in Corinth summers', 'Pool maintenance if applicable — algae growth peaks July', 'Tree trimming — storm season prep'] },
  fall: { label: '🍂 Fall Maintenance (Sep–Nov)', tasks: ['HVAC switchover service before first cold snap', 'Gutter cleaning — fall leaves clog fast in established areas', 'Foundation drainage divert — prep for winter rains', 'Exterior caulk and weatherstrip inspection', 'Water heater flush and anode rod inspection', 'Lawn aeration before winter dormancy'] },
  winter: { label: '❄️ Winter Maintenance (Dec–Feb)', tasks: ['Pipe freeze protection — Corinth gets hard freezes', 'Insulate outdoor faucets and disconnect hoses', 'Heating system check — furnace inspection November', 'Check attic insulation for cold infiltration', 'Clay soil heave monitor — freeze/thaw cycle cracks slab', 'Emergency contractor contact list — freeze events move fast'] },
};

export default function CorinthHomeownerGuide2026() {
  const [season, setSeason] = useState('');
  const guide = season ? seasonalChecklists[season] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>🏘️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>Corinth TX Homeowner Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15, maxWidth: 560, margin: '0 auto' }}>
            South Denton County's quiet, high-ownership suburb. 1990s–2010s homes, clay soil foundation risk, and lake humidity from nearby Lewisville define Corinth maintenance.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
          {[
            { icon: '🧱', label: 'Clay Soil Risk', desc: 'Expansive clay shrinks in drought, heaves in rain. Foundation top priority.' },
            { icon: '💧', label: 'Lake Proximity', desc: 'Humidity from Lewisville accelerates wood and paint degradation.' },
            { icon: '🏡', label: 'High Ownership', desc: '90%+ owner-occupied. Well-maintained neighborhood, strong comps.' },
            { icon: '📅', label: '1990s–2010s', desc: 'Homes entering mid-life. HVAC and roof replacements common.' },
          ].map((c, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{c.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📆 Select Season for Maintenance Checklist</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[{ v: 'spring', l: '🌸 Spring' }, { v: 'summer', l: '☀️ Summer' }, { v: 'fall', l: '🍂 Fall' }, { v: 'winter', l: '❄️ Winter' }].map(opt => (
              <button key={opt.v} onClick={() => setSeason(opt.v)}
                style={{ background: season === opt.v ? '#F5E642′ : '#1a2f50', color: season === opt.v ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '12px', cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                {opt.l}
              </button>
            ))}
          </div>
        </div>

        {guide ? (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
            <h3 style={{ color: '#F5E642', fontSize: 15, marginBottom: 14 }}>{guide.label}</h3>
            <ul style={{ paddingLeft: 18, margin: 0 }}>
              {guide.tasks.map((t, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 8 }}>{t}</li>)}
            </ul>
          </div>
        ) : (
          <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24, textAlign: 'center', color: '#94a3b8', fontSize: 14 }}>
            Select a season above to get your Corinth seasonal maintenance checklist.
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <h3 style={{ color: '#F5E642', fontSize: 14, marginBottom: 12 }}>🧱 Corinth Foundation Watch — Year-Round</h3>
          {['Water foundation perimeter during drought — 18″ from house, slow drip', 'Check corner cracks in drywall — clay soil movement indicator', 'Ensure gutters divert water 6+ feet from foundation', 'Professional foundation inspection every 3 years recommended'].map((item, i) => (
            <div key={i} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6, paddingLeft: 12, borderLeft: '2px solid #F5E642′ }}>{item}</div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 32 }}>🔗</div>
          <h3 style={{ color: '#0A1628', fontSize: 18, margin: '8px 0 6px' }}>Find Corinth's Best Contractors</h3>
          <p style={{ color: '#1a2f50', fontSize: 13, margin: '0 0 14px' }}>ProLnk matches Corinth homeowners with verified local pros who know clay soil and lake-humidity challenges.</p>
          <button style={{ background: '#0A1628', color: '#F5E642', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Get Free Quotes →</button>
        </div>
      </div>
    </div>
  );
}
