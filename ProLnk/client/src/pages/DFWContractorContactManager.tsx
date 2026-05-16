import { useState } from 'react';

const TRADES = ['Plumber', 'Electrician', 'HVAC Tech', 'Roofer', 'Foundation', 'Landscaper', 'Painter', 'General Contractor'];

const LICENSE_INFO: Record<string, string> = {
  Plumber: 'Texas State Board of Plumbing Examiners — verify at license.state.tx.us',
  Electrician: 'Texas Dept of Licensing & Regulation (TDLR) — tdlr.texas.gov',
  'HVAC Tech': 'TDLR HVAC license required — tdlr.texas.gov/HVAC',
  Roofer: 'No state license required — check for liability insurance + BBB rating.',
  Foundation: 'Texas Engineering Practice Act applies — look for PE license.',
  Landscaper: 'Irrigators need TCEQ license. General landscapers: no state license.',
  Painter: 'No state license — verify liability insurance + references.',
  'General Contractor': 'No state GC license in TX — check city permit history.',
};

const SAMPLE_CONTACTS = [
  { trade: 'Plumber', company: 'Metro Plumbing DFW', license: 'M-12345', phone: '(972) 555-0101', lastUsed: '2026-03-15', rating: 5, notes: 'Fixed main line leak. Fast, clean.' },
  { trade: 'HVAC Tech', company: 'Cool Air Solutions', license: 'TACLA-67890', phone: '(214) 555-0188', lastUsed: '2026-01-20', rating: 4, notes: 'Annual tune-up. Replaced capacitor.' },
];

export default function DFWContractorContactManager() {
  const [selectedTrade, setSelectedTrade] = useState('Plumber');
  const [contacts, setContacts] = useState(SAMPLE_CONTACTS);
  const [form, setForm] = useState({ company: '', license: '', phone: '', lastUsed: '', rating: '5', notes: '' });
  const [added, setAdded] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const filtered = contacts.filter(c => c.trade === selectedTrade);

  function handleAdd() {
    if (!form.company || !form.phone) return;
    setContacts(prev => [{ trade: selectedTrade, ...form, rating: parseInt(form.rating) }, ...prev]);
    setForm({ company: '', license: '', phone: '', lastUsed: '', rating: '5', notes: '' });
    setAdded(true);
    setShowForm(false);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HOMEOWNER TOOLS</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>📇 Contractor Contact Manager</h1>
        <p style={{ color: '#8CA4C0', marginBottom: 28 }}>Your trusted contractor rolodex — built for DFW homeowners.</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {TRADES.map(t => (
            <button key={t} onClick={() => setSelectedTrade(t)}
              style={{ padding: '7px 14px', borderRadius: 20, border: '2px solid', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                borderColor: selectedTrade === t ? '#F5E642' : '#1E3A5F',
                background: selectedTrade === t ? '#F5E642' : 'transparent',
                color: selectedTrade === t ? '#0A1628' : '#8CA4C0' }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2037', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>🔍 LICENSE VERIFICATION — {selectedTrade}</div>
          <p style={{ color: '#A8C4E0', fontSize: 14, margin: 0 }}>{LICENSE_INFO[selectedTrade]}</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>🏗️ Your {selectedTrade}s ({filtered.length})</h2>
          <button onClick={() => setShowForm(!showForm)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>
            {showForm ? 'Cancel' : '+ Add Contractor'}
          </button>
        </div>

        {added && <div style={{ background: '#22C55E20', border: '1px solid #22C55E', borderRadius: 8, padding: 12, marginBottom: 16, color: '#22C55E', fontWeight: 700 }}>✅ Contractor added!</div>}

        {showForm && (
          <div style={{ background: '#0F2037', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>New {selectedTrade} Contact</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              {[['company','Company Name'],['license','License Number'],['phone','Phone'],['lastUsed','Last Used Date']].map(([key, label]) => (
                <div key={key}>
                  <div style={{ fontSize: 12, color: '#8CA4C0', marginBottom: 4 }}>{label}</div>
                  <input type={key === 'lastUsed' ? 'date' : 'text'} value={(form as any)[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    style={{ width: '100%', background: '#1E3A5F', border: '1px solid #2A4F7A', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#8CA4C0', marginBottom: 4 }}>Rating (1–5)</div>
              <select value={form.rating} onChange={e => setForm(f => ({ ...f, rating: e.target.value }))}
                style={{ background: '#1E3A5F', border: '1px solid #2A4F7A', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14 }}>
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{'⭐'.repeat(n)} ({n})</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: '#8CA4C0', marginBottom: 4 }}>Notes</div>
              <input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                style={{ width: '100%', background: '#1E3A5F', border: '1px solid #2A4F7A', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <button onClick={handleAdd}
              style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
              Save Contact
            </button>
          </div>
        )}

        {filtered.length === 0 && !showForm && (
          <div style={{ background: '#0F2037', borderRadius: 12, padding: 32, textAlign: 'center', color: '#8CA4C0' }}>
            No {selectedTrade}s saved yet. Add your first trusted contractor above.
          </div>
        )}

        {filtered.map((c, i) => (
          <div key={i} style={{ background: '#0F2037', borderRadius: 12, padding: 20, marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 17 }}>{c.company}</div>
                <div style={{ color: '#8CA4C0', fontSize: 13, marginTop: 2 }}>📱 {c.phone}</div>
              </div>
              <div style={{ fontSize: 20 }}>{'⭐'.repeat(c.rating)}</div>
            </div>
            {c.license && <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 4 }}>🪪 License: {c.license}</div>}
            {c.lastUsed && <div style={{ fontSize: 13, color: '#8CA4C0', marginBottom: 4 }}>📅 Last used: {c.lastUsed}</div>}
            {c.notes && <div style={{ fontSize: 14, color: '#A8C4E0', marginTop: 8, fontStyle: 'italic' }}>"{c.notes}"</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
