import { useState } from 'react';

const months = [
  { name: 'February', emoji: '🌲', reason: 'Cedar season starts — pollen clogs filters fast', urgency: 'high', merv: 'MERV-11+' },
  { name: 'May', emoji: '☀️', reason: 'Pre-summer critical change — most important of the year', urgency: 'critical', merv: 'MERV-13 ideal' },
  { name: 'July', emoji: '🔥', reason: 'Mid-summer check — AC running 24/7, filter loads up', urgency: 'high', merv: 'MERV-11+' },
  { name: 'September', emoji: '🍂', reason: 'Post-summer recovery — replace before fall allergens', urgency: 'medium', merv: 'MERV-11+' },
  { name: 'November', emoji: '🏠', reason: 'Before heating season — switch to clean filter for furnace', urgency: 'medium', merv: 'MERV-11+' },
];

const filterTypes = ['1-inch standard', '4-inch media', 'Electronic/HEPA', 'Washable'];
const situations = ['Pets in home', 'Allergies/asthma', 'Construction nearby', 'Standard household', 'Vacation home'];

const urgencyColors: Record<string, string> = {
  critical: '#ef4444',
  high: '#F5E642',
  medium: '#4ade80',
};

export default function DFWHVACFilterSchedule2026() {
  const [filterType, setFilterType] = useState('1-inch standard');
  const [situation, setSituation] = useState('Standard household');
  const [expanded, setExpanded] = useState<string | null>(null);

  const extraChanges = situation === 'Pets in home' || situation === 'Allergies/asthma' || situation === 'Construction nearby';
  const isWashable = filterType === 'Washable';

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>❄️🔥</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW HVAC Filter Change Schedule 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>DFW minimum: MERV-11. Cedar + summer heat demand it.</p>
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1rem', fontSize: '1rem' }}>🔧 Your Filter Situation</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Filter Type</label>
              <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem', fontSize: '0.9rem' }}>
                {filterTypes.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Situation</label>
              <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.5rem', fontSize: '0.9rem' }}>
                {situations.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          {isWashable && <p style={{ color: '#F5E642', fontSize: '0.85rem', marginTop: '0.75rem' }}>♻️ Washable filter: rinse monthly during summer, every 6 weeks in cedar season.</p>}
          {extraChanges && !isWashable && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.75rem' }}>⚠️ Add monthly checks June–August. Replace when gray, not on schedule only.</p>}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {months.map(m => (
            <div key={m.name} onClick={() => setExpanded(expanded === m.name ? null : m.name)} style={{ background: '#132040', borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer', borderLeft: `4px solid ${urgencyColors[m.urgency]}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.1rem' }}>{m.emoji} <strong>{m.name}</strong></span>
                <span style={{ background: urgencyColors[m.urgency], color: '#0A1628', fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>{m.urgency.toUpperCase()}</span>
              </div>
              {expanded === m.name && (
                <div style={{ marginTop: '0.75rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                  <p>{m.reason}</p>
                  <p style={{ color: '#F5E642', marginTop: '0.4rem' }}>Recommended: {m.merv}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#132040', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>🏠 <strong style={{ color: '#F5E642' }}>ProLnk Vault</strong> auto-logs every filter change with date, brand, and MERV rating — no spreadsheet needed.</p>
        </div>
      </div>
    </div>
  );
}