import { useState } from 'react';

const SEASONS = ['Spring (Mar–May)', 'Summer (Jun–Aug)', 'Fall (Sep–Nov)', 'Winter (Dec–Feb)'];
const SOIL_TYPES = ['Black Clay (Expansive)', 'Sandy Loam', 'Mixed (Common DFW Suburb)', 'Caliche-Heavy (West DFW)'];

interface Schedule {
  frequency: string;
  duration: string;
  distance: string;
  note: string;
  droughtAlert: boolean;
}

const SCHEDULES: Record<string, Record<string, Schedule>> = {
  'Spring (Mar–May)': {
    'Black Clay (Expansive)': { frequency: '2x per week', duration: '30 min', distance: '18 inches from foundation', note: 'Spring rain may cover — monitor soil moisture weekly', droughtAlert: false },
    'Sandy Loam': { frequency: '3x per week', duration: '20 min', distance: '12 inches from foundation', note: 'Sandy soil drains fast — increase in dry spells', droughtAlert: false },
    'Mixed (Common DFW Suburb)': { frequency: '2x per week', duration: '25 min', distance: '15 inches from foundation', note: 'Standard spring schedule — adjust after heavy rain', droughtAlert: false },
    'Caliche-Heavy (West DFW)': { frequency: '3x per week', duration: '35 min', distance: '20 inches from foundation', note: 'Caliche restricts drainage — avoid oversaturation', droughtAlert: false },
  },
  'Summer (Jun–Aug)': {
    'Black Clay (Expansive)': { frequency: 'Daily', duration: '45 min', distance: '18 inches from foundation', note: '⚠️ Critical season — clay shrinks fast in 100°F+ heat', droughtAlert: true },
    'Sandy Loam': { frequency: 'Daily', duration: '30 min', distance: '12 inches from foundation', note: 'High evaporation rate — early morning watering recommended', droughtAlert: true },
    'Mixed (Common DFW Suburb)': { frequency: 'Daily', duration: '35 min', distance: '15 inches from foundation', note: 'Most DFW foundation damage occurs June–August', droughtAlert: true },
    'Caliche-Heavy (West DFW)': { frequency: 'Daily', duration: '50 min', distance: '20 inches from foundation', note: 'Slow permeation — longer sessions needed to reach depth', droughtAlert: true },
  },
  'Fall (Sep–Nov)': {
    'Black Clay (Expansive)': { frequency: '2x per week', duration: '30 min', distance: '18 inches from foundation', note: 'Rehydrate slowly after summer — avoid cracking cycles', droughtAlert: false },
    'Sandy Loam': { frequency: '2x per week', duration: '20 min', distance: '12 inches from foundation', note: 'Fall rain typically sufficient — monitor for dry weeks', droughtAlert: false },
    'Mixed (Common DFW Suburb)': { frequency: '2x per week', duration: '25 min', distance: '15 inches from foundation', note: 'Taper schedule as temperatures drop below 70°F', droughtAlert: false },
    'Caliche-Heavy (West DFW)': { frequency: '2x per week', duration: '35 min', distance: '20 inches from foundation', note: 'Fall is transition — maintain until first freeze risk', droughtAlert: false },
  },
  'Winter (Dec–Feb)': {
    'Black Clay (Expansive)': { frequency: '1x per week', duration: '20 min', distance: '18 inches from foundation', note: 'DFW winters are mild — clay still needs moisture maintenance', droughtAlert: false },
    'Sandy Loam': { frequency: '1x per week', duration: '15 min', distance: '12 inches from foundation', note: 'Reduce watering — freeze risk below 32°F', droughtAlert: false },
    'Mixed (Common DFW Suburb)': { frequency: '1x per week', duration: '15 min', distance: '15 inches from foundation', note: 'Suspend during freeze events — resume within 48 hours', droughtAlert: false },
    'Caliche-Heavy (West DFW)': { frequency: '1x per week', duration: '20 min', distance: '20 inches from foundation', note: 'Minimal watering — focus on perimeter drainage', droughtAlert: false },
  },
};

export default function DFWFoundationMoistureCalendar() {
  const [sqft, setSqft] = useState(2400);
  const [soil, setSoil] = useState('Black Clay (Expansive)');
  const [season, setSeason] = useState('Summer (Jun–Aug)');

  const schedule = SCHEDULES[season][soil];
  const perimeter = Math.round(Math.sqrt(sqft) * 4);
  const waterCostPerSession = Math.round(perimeter * 0.018 * 100) / 100;
  const sessionsPerMonth = season.includes('Summer') ? 30 : season.includes('Winter') ? 4 : 8;
  const monthlyCost = Math.round(waterCostPerSession * sessionsPerMonth * 10) / 10;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌊</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: 0 }}>DFW Foundation Moisture Calendar</h1>
          <p style={{ color: '#8899bb', marginTop: '0.5rem' }}>DFW's expansive clay soil is the #1 cause of foundation damage</p>
        </div>

        <div style={{ background: '#132038', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 700, color: '#aab4cc', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Home Size (sq ft)</label>
            <input type="range" min={800} max={6000} step={100} value={sqft}
              onChange={e => setSqft(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
            <div style={{ textAlign: 'center', fontWeight: 700, color: '#F5E642', fontSize: '1.1rem' }}>{sqft.toLocaleString()} sq ft · Est. {perimeter} ft perimeter</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#aab4cc', marginBottom: '0.5rem', fontSize: '0.85rem' }}>DFW Soil Type</label>
              <select value={soil} onChange={e => setSoil(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2a3a5c', background: '#0A1628', color: '#fff', fontSize: '0.85rem' }}>
                {SOIL_TYPES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#aab4cc', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Season</label>
              <select value={season} onChange={e => setSeason(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #2a3a5c', background: '#0A1628', color: '#fff', fontSize: '0.85rem' }}>
                {SEASONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {schedule.droughtAlert && (
          <div style={{ background: '#7b1fa2', borderRadius: 12, padding: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>☀️</span>
            <div>
              <div style={{ fontWeight: 700 }}>DFW Summer Drought Conditions Active</div>
              <div style={{ fontSize: '0.85rem', color: '#e1bee7′ }}>DFW averages 20+ consecutive days above 95°F in summer. Foundation watering is critical — skipping even 3 days can cause clay shrinkage and cracks.</div>
            </div>
          </div>
        )}

        <div style={{ background: '#132038', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: '0 0 1.25rem', fontSize: '1rem', fontWeight: 700, color: '#F5E642′ }}>📅 Recommended Watering Schedule</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ textAlign: 'center', background: '#0A1628', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5E642′ }}>{schedule.frequency}</div>
              <div style={{ fontSize: '0.78rem', color: '#8899bb', marginTop: '0.25rem' }}>Frequency</div>
            </div>
            <div style={{ textAlign: 'center', background: '#0A1628', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5E642′ }}>{schedule.duration}</div>
              <div style={{ fontSize: '0.78rem', color: '#8899bb', marginTop: '0.25rem' }}>Per Session</div>
            </div>
            <div style={{ textAlign: 'center', background: '#0A1628', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F5E642′ }}>{schedule.distance}</div>
              <div style={{ fontSize: '0.78rem', color: '#8899bb', marginTop: '0.25rem' }}>Placement</div>
            </div>
          </div>
          <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '0.9rem', color: '#aab4cc', fontSize: '0.88rem', lineHeight: 1.6 }}>
            💬 {schedule.note}
          </div>
        </div>

        <div style={{ background: '#132038', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: '#8899bb', marginBottom: '0.25rem' }}>Estimated Monthly Water Cost to Maintain Foundation Health</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#F5E642′ }}>${monthlyCost}</div>
          <div style={{ fontSize: '0.8rem', color: '#6677aa' }}>vs. $8,000–$40,000+ for foundation repair</div>
        </div>
        <p style={{ textAlign: 'center', color: '#445577', fontSize: '0.75rem', marginTop: '1.5rem' }}>Consistent soil moisture is cheaper than any repair. Use soaker hoses 6–18 inches from the foundation perimeter.</p>
      </div>
    </div>
  );
}
