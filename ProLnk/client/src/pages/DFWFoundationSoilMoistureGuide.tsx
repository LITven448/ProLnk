import { useState } from 'react';

const SEASONS = ['Spring', 'Summer', 'Fall', 'Winter'];
const PERIMETERS = ['< 100 ft', '100-150 ft', '150-200 ft', '200+ ft'];

const schedules: Record<string, { gallons: number; frequency: string; meter: string }> = {
  'Spring-< 100 ft': { gallons: 20, frequency: '3x per week', meter: '55-65%' },
  'Spring-100-150 ft': { gallons: 30, frequency: '3x per week', meter: '55-65%' },
  'Spring-150-200 ft': { gallons: 45, frequency: '3x per week', meter: '55-65%' },
  'Spring-200+ ft': { gallons: 60, frequency: '3x per week', meter: '55-65%' },
  'Summer-< 100 ft': { gallons: 35, frequency: 'Daily', meter: '60-70%' },
  'Summer-100-150 ft': { gallons: 50, frequency: 'Daily', meter: '60-70%' },
  'Summer-150-200 ft': { gallons: 70, frequency: 'Daily', meter: '60-70%' },
  'Summer-200+ ft': { gallons: 95, frequency: 'Daily', meter: '60-70%' },
  'Fall-< 100 ft': { gallons: 20, frequency: '2x per week', meter: '55-65%' },
  'Fall-100-150 ft': { gallons: 30, frequency: '2x per week', meter: '55-65%' },
  'Fall-150-200 ft': { gallons: 45, frequency: '2x per week', meter: '55-65%' },
  'Fall-200+ ft': { gallons: 60, frequency: '2x per week', meter: '55-65%' },
  'Winter-< 100 ft': { gallons: 10, frequency: 'Weekly', meter: '50-60%' },
  'Winter-100-150 ft': { gallons: 15, frequency: 'Weekly', meter: '50-60%' },
  'Winter-150-200 ft': { gallons: 22, frequency: 'Weekly', meter: '50-60%' },
  'Winter-200+ ft': { gallons: 30, frequency: 'Weekly', meter: '50-60%' },
};

export default function DFWFoundationSoilMoistureGuide() {
  const [season, setSeason] = useState('');
  const [perimeter, setPerimeter] = useState('');
  const result = season && perimeter ? schedules[`${season}-${perimeter}`] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '2.5rem' }}>💧</span>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0' }}>DFW Foundation Soil Moisture Guide</h1>
          <p style={{ color: '#9CA3AF', lineHeight: 1.6 }}>
            DFW sits on expansive Blackland Prairie clay. This clay shrinks dramatically when dry and swells when wet — 
            the leading cause of foundation movement in North Texas. The goal is consistency: keep soil at 50–75% of its plastic limit saturation year-round.
          </p>
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid #F5E642' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🔬 The Science</h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7 }}>
            DFW clay has a plastic limit of roughly 25% water content and a liquid limit near 65%. Foundation engineers target 
            50–75% of plastic limit saturation — meaning soil should feel damp but not soggy. A $15–30 soil moisture meter 
            inserted 6–8 inches deep at the drip line gives reliable readings. Target: <strong style={{ color: '#F5E642' }}>40–55% volumetric water content</strong> on most meters.
          </p>
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>📍 Where to Water</h2>
          <ul style={{ color: '#CBD5E1', lineHeight: 2 }}>
            <li>🎯 Place soaker hose 12–18 inches from foundation perimeter</li>
            <li>🌳 Extend 6 ft past drip line of any trees within 20 ft</li>
            <li>⚠️ Never water directly against slab — causes erosion under edge</li>
            <li>🔄 Water all four sides evenly — uneven moisture causes differential movement</li>
          </ul>
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>🗓️ Seasonal Watering Calculator</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ color: '#9CA3AF', display: 'block', marginBottom: 6 }}>Current Season</label>
              <select value={season} onChange={e => setSeason(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, backgroundColor: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F' }}>
                <option value="">Select season</option>
                {SEASONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ color: '#9CA3AF', display: 'block', marginBottom: 6 }}>Foundation Perimeter</label>
              <select value={perimeter} onChange={e => setPerimeter(e.target.value)}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, backgroundColor: '#0A1628', color: '#E8EAF0', border: '1px solid #1E3A5F' }}>
                <option value="">Select perimeter</option>
                {PERIMETERS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          {result && (
            <div style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '1.2rem', border: '1px solid #F5E642' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
                <div><div style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700 }}>{result.gallons} gal</div><div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Per Session</div></div>
                <div><div style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700 }}>{result.frequency}</div><div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Watering Frequency</div></div>
                <div><div style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700 }}>{result.meter}</div><div style={{ color: '#9CA3AF', fontSize: '0.85rem' }}>Meter Target Reading</div></div>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111D35', borderRadius: 12, padding: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>⚡ Quick Tips</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { icon: '🌡️', tip: 'Check soil after 3 days of 95°F+ heat — may need emergency watering' },
              { icon: '🌧️', tip: 'After 1"+ rain, skip scheduled watering but check meter in 48 hrs' },
              { icon: '🔧', tip: 'Soaker hoses beat sprinklers — slow deep penetration beats surface wetting' },
              { icon: '📊', tip: 'Keep a log — consistent patterns reveal drainage and soil anomalies' },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: '#0A1628', borderRadius: 8, padding: '1rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{item.icon}</div>
                <div style={{ color: '#CBD5E1', fontSize: '0.9rem', lineHeight: 1.5 }}>{item.tip}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
