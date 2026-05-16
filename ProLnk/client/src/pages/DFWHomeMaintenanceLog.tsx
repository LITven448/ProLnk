import { useState } from 'react';

const CATEGORIES = ['HVAC', 'Plumbing', 'Electrical', 'Roofing', 'Foundation'];

const UPCOMING = [
  { task: 'Change HVAC filter', due: 'Jun 2026', category: 'HVAC' },
  { task: 'Inspect roof for hail damage', due: 'Jul 2026', category: 'Roofing' },
  { task: 'Check foundation for cracks', due: 'Aug 2026', category: 'Foundation' },
  { task: 'Flush water heater', due: 'Sep 2026', category: 'Plumbing' },
  { task: 'Test GFCI outlets', due: 'Oct 2026', category: 'Electrical' },
];

const SAMPLE_LOG = [
  { date: '2026-03-10', category: 'HVAC', task: 'Annual tune-up', contractor: 'Cool Air DFW', cost: '$149', notes: 'Replaced capacitor' },
  { date: '2025-11-05', category: 'Plumbing', task: 'Fixed kitchen leak', contractor: 'Metro Plumbing', cost: '$215', notes: 'Replaced P-trap' },
];

export default function DFWHomeMaintenanceLog() {
  const [activeCategory, setActiveCategory] = useState('HVAC');
  const [log, setLog] = useState(SAMPLE_LOG);
  const [form, setForm] = useState({ date: '', task: '', contractor: '', cost: '', notes: '' });
  const [added, setAdded] = useState(false);

  const filtered = log.filter(e => e.category === activeCategory);

  function handleAdd() {
    if (!form.date || !form.task) return;
    setLog(prev => [{ ...form, category: activeCategory }, ...prev]);
    setForm({ date: '', task: '', contractor: '', cost: '', notes: '' });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HOMEOWNER TOOLS</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>🏠 Home Maintenance Log</h1>
        <p style={{ color: '#8CA4C0', marginBottom: 28 }}>Track every repair, service, and upgrade for your DFW home.</p>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{ padding: '8px 18px', borderRadius: 20, border: '2px solid', cursor: 'pointer', fontWeight: 700, fontSize: 14,
                borderColor: activeCategory === cat ? '#F5E642' : '#1E3A5F',
                background: activeCategory === cat ? '#F5E642' : 'transparent',
                color: activeCategory === cat ? '#0A1628' : '#8CA4C0' }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2037', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>➕ Log {activeCategory} Work</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['date','Date','date'],['task','Task / Description','text'],['contractor','Contractor Name','text'],['cost','Cost','text']].map(([key, label, type]) => (
              <div key={key}>
                <div style={{ fontSize: 12, color: '#8CA4C0', marginBottom: 4 }}>{label}</div>
                <input type={type} value={(form as any)[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{ width: '100%', background: '#1E3A5F', border: '1px solid #2A4F7A', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 12, color: '#8CA4C0', marginBottom: 4 }}>Notes</div>
            <input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              style={{ width: '100%', background: '#1E3A5F', border: '1px solid #2A4F7A', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
          </div>
          <button onClick={handleAdd}
            style={{ marginTop: 16, background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
            {added ? '✅ Logged!' : 'Add Entry'}
          </button>
        </div>

        <div style={{ background: '#0F2037', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📋 {activeCategory} History ({filtered.length} entries)</h2>
          {filtered.length === 0 && <p style={{ color: '#8CA4C0' }}>No entries yet. Log your first {activeCategory} service above.</p>}
          {filtered.map((e, i) => (
            <div key={i} style={{ borderBottom: '1px solid #1E3A5F', paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{e.task}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{e.cost}</span>
              </div>
              <div style={{ fontSize: 13, color: '#8CA4C0' }}>{e.date} · {e.contractor}</div>
              {e.notes && <div style={{ fontSize: 13, color: '#A8C4E0', marginTop: 4 }}>📝 {e.notes}</div>}
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2037', borderRadius: 12, padding: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🗓️ Upcoming Maintenance</h2>
          {UPCOMING.map((u, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < UPCOMING.length - 1 ? '1px solid #1E3A5F' : 'none' }}>
              <div>
                <span style={{ fontWeight: 600 }}>{u.task}</span>
                <span style={{ marginLeft: 10, fontSize: 12, background: '#1E3A5F', padding: '2px 8px', borderRadius: 10, color: '#8CA4C0' }}>{u.category}</span>
              </div>
              <span style={{ color: '#F5E642', fontSize: 14, fontWeight: 700 }}>{u.due}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
