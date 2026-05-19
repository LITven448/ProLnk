import { useState } from 'react';

const TASKS = [
  { id: 'hoa', category: 'HOA & Community', label: 'Introduce yourself to HOA board', time: '1–2 hrs', cost: '$0', priority: 'high', note: 'Request CC&Rs, get parking pass, introduce yourself at next meeting' },
  { id: 'oncor', category: 'Utilities', label: 'Set up Oncor electric service', time: '30 min', cost: '$0', priority: 'high', note: 'Oncor delivers power; choose your retail provider (TXU, Reliant, Gexa, etc.) at PowerToChoose.org' },
  { id: 'atmos', category: 'Utilities', label: 'Transfer Atmos Energy gas service', time: '20 min', cost: '$0', priority: 'high', note: 'Call Atmos or go online — required for heat and hot water in most DFW homes' },
  { id: 'water', category: 'Utilities', label: 'Set up city water & trash', time: '20 min', cost: '$0', priority: 'high', note: 'Contact your city (Dallas, Fort Worth, Plano, Frisco, etc.) — not one statewide provider' },
  { id: 'internet', category: 'Utilities', label: 'Schedule internet installation', time: '1 hr + wait', cost: '$0–$150 setup', priority: 'high', note: 'AT&T Fiber or Spectrum most common in DFW; book 1–2 weeks out' },
  { id: 'usps', category: 'Admin', label: 'USPS address change', time: '10 min', cost: '$1.10 (identity verify)', priority: 'high', note: 'Go to usps.com/move — activates mail forwarding for 12 months' },
  { id: 'txdl', category: 'Admin', label: 'Update Texas driver\’s license', time: '1–2 hrs (wait)', cost: '$11', priority: 'high', note: 'Required within 30 days of moving in Texas — visit DPS office or use dlr.dps.texas.gov' },
  { id: 'voter', category: 'Admin', label: 'Update voter registration', time: '10 min', cost: '$0', priority: 'medium', note: 'VoteTexas.gov — must update 30 days before an election to vote at new precinct' },
  { id: 'school', category: 'Family', label: 'School enrollment & district transfer', time: '2–3 hrs', cost: '$0', priority: 'high', note: 'Contact your new ISD (DISD, FWISD, PISD, FISD, etc.) — bring proof of residency + immunization records' },
  { id: 'nextdoor', category: 'Community', label: 'Join Nextdoor for your neighborhood', time: '10 min', cost: '$0', priority: 'low', note: 'Great for local recommendations, lost pets, neighborhood alerts, contractor referrals' },
  { id: 'hvac', category: 'Home Services', label: 'HVAC service + filter check', time: '1–2 hrs', cost: '$80–$150', priority: 'high', note: 'Priority #1 in DFW — service in first 30 days before summer heat hits; change filters monthly in TX' },
  { id: 'pest', category: 'Home Services', label: 'Schedule pest control', time: '1 hr', cost: '$60–$120/quarter', priority: 'high', note: 'Scorpions, roaches, and fire ants are real in DFW — get on quarterly service immediately' },
  { id: 'lawn', category: 'Home Services', label: 'Set up lawn care service', time: '30 min', cost: '$40–$80/visit', priority: 'medium', note: 'DFW lawns need mowing every 1–2 weeks March–October; HOAs often require maintained yards' },
  { id: 'security', category: 'Home Services', label: 'Install or activate home security', time: '1–3 hrs', cost: '$0–$300 setup', priority: 'medium', note: 'Ring, ADT, SimpliSafe all popular in DFW — check if previous system exists in home' },
  { id: 'insurance', category: 'Admin', label: 'Update homeowners insurance', time: '30 min', cost: 'Varies', priority: 'high', note: 'TX has high rates due to hail and storm risk — shop at least 3 quotes; check hail claim history via CLUE report' },
];

const CATEGORIES = [...new Set(TASKS.map(t => t.category))];

export default function DFWNeighborhoodMoveInGuide() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [filter, setFilter] = useState('All');

  const toggle = (id: string) => setCompleted(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const filtered = filter === 'All' ? TASKS : TASKS.filter(t => t.category === filter);
  const pct = Math.round((completed.length / TASKS.length) * 100);

  return (
    <div style={{ backgroundColor: '#F8F9FC', minHeight: '100vh', color: '#1A2233', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#2563EB', letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700 }}>DFW Move-In Series</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0A1628', marginBottom: 8 }}>DFW Neighborhood Move-In Guide</h1>
        <p style={{ color: '#6B7A99', marginBottom: 32, fontSize: 16 }}>Everything to set up in your first 30 days — utilities, admin, services, and community.</p>

        <div style={{ backgroundColor: '#0A1628', borderRadius: 16, padding: 24, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#9BA3B8', fontSize: 13, marginBottom: 6 }}>Move-In Progress</div>
            <div style={{ height: 12, backgroundColor: '#1E2D45', borderRadius: 6, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, backgroundColor: '#F5E642', borderRadius: 6, transition: 'width 0.3s' }} />
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#F5E642' }}>{pct}%</div>
            <div style={{ color: '#9BA3B8', fontSize: 13 }}>{completed.length} of {TASKS.length} done</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
          {['All', ...CATEGORIES].map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} style={{ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13, backgroundColor: filter === cat ? '#0A1628' : '#E8EBF2', color: filter === cat ? '#F5E642' : '#6B7A99' }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(task => {
            const done = completed.includes(task.id);
            return (
              <div key={task.id} onClick={() => toggle(task.id)} style={{ backgroundColor: done ? '#F0FDF4' : '#FFFFFF', borderRadius: 14, padding: 20, border: `1px solid ${done ? '#BBF7D0' : '#E2E8F0'}`, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', backgroundColor: done ? '#22C55E' : '#E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 14, fontWeight: 700, color: done ? '#FFFFFF' : '#9BA3B8' }}>
                  {done ? '✓' : ''}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ fontWeight: 700, color: done ? '#15803D' : '#0A1628', fontSize: 15, textDecoration: done ? 'line-through' : 'none' }}>{task.label}</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span style={{ backgroundColor: task.priority === 'high' ? '#FEF2F2' : task.priority === 'medium' ? '#FFFBEB' : '#F0F9FF', color: task.priority === 'high' ? '#DC2626' : task.priority === 'medium' ? '#D97706' : '#0284C7', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12 }}>{task.priority.toUpperCase()}</span>
                      <span style={{ backgroundColor: '#F1F5F9', color: '#475569', fontSize: 11, padding: '3px 10px', borderRadius: 12 }}>{task.category}</span>
                    </div>
                  </div>
                  <div style={{ color: '#6B7A99', fontSize: 13, marginTop: 4 }}>{task.note}</div>
                  <div style={{ display: 'flex', gap: 20, marginTop: 8 }}>
                    <div style={{ fontSize: 12, color: '#94A3B8' }}>⏱ {task.time}</div>
                    <div style={{ fontSize: 12, color: '#94A3B8' }}>💵 {task.cost}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 32, backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, border: '1px solid #E2E8F0' }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📞 Key DFW Contacts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[['Oncor (Power Delivery)', 'oncor.com / 888-313-4747'], ['Power to Choose (Retail)', 'powertochoose.org'], ['Atmos Energy (Gas)', 'atmosenergy.com / 888-286-6700'], ['USPS Change of Address', 'usps.com/move ($1.10)'], ['TX DPS (Driver\’s License)', 'dlr.dps.texas.gov'], ['Vote Texas (Voter Reg)', 'votetexas.gov']].map(([name, contact]) => (
              <div key={name} style={{ backgroundColor: '#F8F9FC', borderRadius: 10, padding: 14 }}>
                <div style={{ fontWeight: 700, color: '#0A1628', fontSize: 13, marginBottom: 4 }}>{name}</div>
                <div style={{ color: '#2563EB', fontSize: 13 }}>{contact}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
