import { useState } from 'react';

const HOME_SIZES = ['Studio/1BR', '2BR', '3BR', '4BR', '5BR+'];
const DISTANCES = ['Local (under 50 mi)', 'Intrastate (50-500 mi)', 'Interstate (500+ mi)'];
const SEASONS = ['Peak (May–Aug)', 'Off-Peak (Sep–Apr)'];

const BASE_COSTS: Record<string, Record<string, number>> = {
  'Studio/1BR': { 'Local (under 50 mi)': 500, 'Intrastate (50-500 mi)': 1100, 'Interstate (500+ mi)': 2200 },
  '2BR': { 'Local (under 50 mi)': 750, 'Intrastate (50-500 mi)': 1600, 'Interstate (500+ mi)': 3500 },
  '3BR': { 'Local (under 50 mi)': 1000, 'Intrastate (50-500 mi)': 2200, 'Interstate (500+ mi)': 5500 },
  '4BR': { 'Local (under 50 mi)': 1400, 'Intrastate (50-500 mi)': 3200, 'Interstate (500+ mi)': 8000 },
  '5BR+': { 'Local (under 50 mi)': 2000, 'Intrastate (50-500 mi)': 4500, 'Interstate (500+ mi)': 12000 },
};

const CHECKLIST = [
  { days: 30, tasks: ['Hire movers or reserve truck', 'Collect boxes and supplies', 'Begin decluttering', 'Notify employer of address change', 'Schedule utility transfers'] },
  { days: 14, tasks: ['Pack non-essentials (books, décor, off-season clothes)', 'Confirm mover booking', 'Arrange childcare/pet care for move day', 'Update subscriptions and banks'] },
  { days: 7, tasks: ['Pack all rooms except essentials', 'Label every box clearly', 'Defrost freezer', 'Confirm parking at new address', 'Charge devices'] },
  { days: 1, tasks: ['Pack overnight bag', 'Protect floors/doorframes', 'Do final walkthrough', 'Have cash for tips', 'Keep valuables with you'] },
];

export default function DFWMovingCostGuide() {
  const [homeSize, setHomeSize] = useState('');
  const [distance, setDistance] = useState('');
  const [season, setSeason] = useState('');
  const [activeTab, setActiveTab] = useState<'estimate' | 'checklist'>('estimate');

  const baseCost = homeSize && distance ? BASE_COSTS[homeSize][distance] : null;
  const peakMultiplier = season === 'Peak (May–Aug)' ? 1.3 : 1;
  const estimated = baseCost ? Math.round(baseCost * peakMultiplier) : null;
  const diyEstimate = baseCost ? Math.round(baseCost * 0.4 * peakMultiplier) : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1, textTransform: 'uppercase' }}>DFW Moving Guide</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 8 }}>DFW Moving Cost Guide 2026</h1>
        <p style={{ color: '#9BA3B8', marginBottom: 32, fontSize: 16 }}>Everything you need to budget and plan your move in the Dallas-Fort Worth area.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { emoji: '🏡', label: 'Local Move', range: '$400 – $1,200', note: 'Under 50 miles' },
            { emoji: '🚛', label: 'Intrastate Move', range: '$800 – $2,500', note: '50–500 miles in TX' },
            { emoji: '✈️', label: 'Interstate Move', range: '$2,000 – $12,000+', note: 'Crossing state lines' },
            { emoji: '☀️', label: 'Peak Season Bump', range: '+30%', note: 'May through August' },
          ].map(card => (
            <div key={card.label} style={{ backgroundColor: '#131F35', borderRadius: 12, padding: 20, border: '1px solid #1E2D45′ }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.emoji}</div>
              <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>{card.label}</div>
              <div style={{ fontSize: 20, color: '#F5E642', fontWeight: 800, marginBottom: 4 }}>{card.range}</div>
              <div style={{ fontSize: 13, color: '#9BA3B8′ }}>{card.note}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#131F35', borderRadius: 16, padding: 28, marginBottom: 32, border: '1px solid #1E2D45′ }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            {(['estimate', 'checklist'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, backgroundColor: activeTab === tab ? '#F5E642′ : '#1E2D45', color: activeTab === tab ? '#0A1628' : '#9BA3B8' }}>
                {tab === 'estimate' ? '💰 Cost Estimator' : '📋 Move Checklist'}
              </button>
            ))}
          </div>

          {activeTab === 'estimate' && (
            <div>
              <h2 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Get Your Moving Estimate</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
                <div>
                  <label style={{ color: '#9BA3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Home Size</label>
                  <select value={homeSize} onChange={e => setHomeSize(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, backgroundColor: '#0A1628', border: '1px solid #2A3A55', color: '#FFFFFF', fontSize: 14 }}>
                    <option value="">Select size</option>
                    {HOME_SIZES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ color: '#9BA3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Move Distance</label>
                  <select value={distance} onChange={e => setDistance(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, backgroundColor: '#0A1628', border: '1px solid #2A3A55', color: '#FFFFFF', fontSize: 14 }}>
                    <option value="">Select distance</option>
                    {DISTANCES.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ color: '#9BA3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Move Season</label>
                  <select value={season} onChange={e => setSeason(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, backgroundColor: '#0A1628', border: '1px solid #2A3A55', color: '#FFFFFF', fontSize: 14 }}>
                    <option value="">Select season</option>
                    {SEASONS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              {estimated && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, border: '2px solid #F5E642′ }}>
                    <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 4 }}>Full-Service Movers</div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: '#F5E642′ }}>${estimated.toLocaleString()}</div>
                    <div style={{ fontSize: 13, color: '#9BA3B8', marginTop: 4 }}>Estimated total cost</div>
                  </div>
                  <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #2A3A55′ }}>
                    <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 4 }}>DIY Truck Rental</div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: '#FFFFFF' }}>${diyEstimate?.toLocaleString()}</div>
                    <div style={{ fontSize: 13, color: '#9BA3B8', marginTop: 4 }}>Estimated total cost</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'checklist' && (
            <div>
              <h2 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Move Countdown Checklist</h2>
              {CHECKLIST.map(group => (
                <div key={group.days} style={{ marginBottom: 20 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginBottom: 10 }}>⏳ {group.days} Days Before Move</div>
                  {group.tasks.map(task => (
                    <div key={task} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, color: '#CBD2E0', fontSize: 14 }}>
                      <span style={{ color: '#F5E642′ }}>✓</span> {task}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#131F35', borderRadius: 16, padding: 28, marginBottom: 24, border: '1px solid #1E2D45′ }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🚫 What Movers Won't Move</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['Hazardous Materials', 'Paint, propane, chemicals, gasoline, fireworks'], ['High-Value Items', 'Jewelry, cash, passports, irreplaceable documents'], ['Perishables', 'Food, plants (some movers refuse), open bottles'], ['Pets', 'Always transport pets yourself in your vehicle']].map(([title, desc]) => (
              <div key={title} style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4, fontSize: 14 }}>⚠️ {title}</div>
                <div style={{ color: '#9BA3B8', fontSize: 13 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#131F35', borderRadius: 16, padding: 28, border: '1px solid #1E2D45′ }}>
          <h2 style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>💵 Tipping Guide</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[['Small Move', '$20–$40/mover', 'Studio or 1BR local'], ['Standard Move', '$40–$80/mover', '2–3BR or half-day'], ['Large/Long Move', '$80–$120/mover', 'Full day or multi-day']].map(([tier, amount, desc]) => (
              <div key={tier} style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>{tier}</div>
                <div style={{ fontSize: 20, color: '#F5E642', fontWeight: 800, marginBottom: 4 }}>{amount}</div>
                <div style={{ color: '#9BA3B8', fontSize: 13 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
