import { useState } from 'react';

export default function ProLnkDFW4000PagesMilestone() {
  const [situation, setSituation] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const categories = [
    { icon: '❄️', name: 'HVAC', count: '680+', color: '#3b82f6' },
    { icon: '🏚️', name: 'Foundation', count: '520+', color: '#f97316' },
    { icon: '🏠', name: 'Roofing', count: '490+', color: '#ef4444' },
    { icon: '🔧', name: 'Plumbing', count: '440+', color: '#06b6d4' },
    { icon: '⚡', name: 'Electrical', count: '380+', color: '#F5E642' },
    { icon: '🏙️', name: 'City Guides', count: '320+', color: '#a855f7' },
    { icon: '📅', name: 'Seasonal', count: '280+', color: '#22c55e' },
    { icon: '👷', name: 'Pro Guides', count: '190+', color: '#ec4899' },
  ];

  const situationMap: Record<string, string> = {
    hvac: 'Start with our HVAC Seasonal Schedule 2026 → then explore AC Repair Cost Guides by city (Plano, Frisco, McKinney, Arlington, Fort Worth)',
    foundation: 'Start with DFW Foundation Seasonal Care 2026 → then check your specific city (Dallas, Frisco, Allen, Prosper) for local soil condition guides',
    roof: 'Start with Hail Damage Response Guide → then see Roofing Cost by DFW City and our Storm Chaser Red Flags Guide',
    plumbing: 'Start with DFW Pipe Freeze Prevention Guide → then explore Water Heater Replacement Cost and Drain Cleaning by city',
    electrical: 'Start with DFW Electrical Panel Upgrade Guide → then check code compliance updates and cost guides by county',
    newowner: 'Start with DFW New Homeowner Checklist 2026 → covers all trades, seasonal priorities, and finding vetted pros in your zip code',
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 56 }}>🎉</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '12px 0 8px' }}>4,000+ Pages Milestone</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>ProLnk now hosts the largest DFW homeowner resource library on the internet</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
            <div style={{ background: '#111e35', borderRadius: 10, padding: '14px 24px', textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 900 }}>4,300+</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>Total Pages</div>
            </div>
            <div style={{ background: '#111e35', borderRadius: 10, padding: '14px 24px', textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 900 }}>7</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>DFW Counties</div>
            </div>
            <div style={{ background: '#111e35', borderRadius: 10, padding: '14px 24px', textAlign: 'center' }}>
              <div style={{ color: '#F5E642', fontSize: 28, fontWeight: 900 }}>8</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>Trade Categories</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, marginBottom: 40 }}>
          {categories.map((cat) => (
            <div key={cat.name} style={{ background: '#111e35', borderRadius: 10, padding: 16, textAlign: 'center', borderTop: `3px solid ${cat.color}` }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{cat.icon}</div>
              <div style={{ color: cat.color, fontWeight: 700, fontSize: 14 }}>{cat.name}</div>
              <div style={{ color: '#64748b', fontSize: 12 }}>{cat.count} pages</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111e35', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Find Your Best Starting Page</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>What best describes your situation?</p>
          <select value={situation} onChange={(e) => setSituation(e.target.value)}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 14, marginBottom: 14 }}>
            <option value="">Select your situation...</option>
            <option value="hvac">My AC or heating is having issues</option>
            <option value="foundation">I am worried about my foundation</option>
            <option value="roof">I have roof damage or concerns</option>
            <option value="plumbing">I have plumbing problems</option>
            <option value="electrical">I need electrical work</option>
            <option value="newowner">I am a new DFW homeowner</option>
          </select>
          <button onClick={() => setRecommendation(situationMap[situation] || '')}
            style={{ padding: '10px 20px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            Find My Page
          </button>
          {recommendation && <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: 16, color: '#e2e8f0', fontSize: 14 }}>{recommendation}</div>}
        </div>
      </div>
    </div>
  );
}
