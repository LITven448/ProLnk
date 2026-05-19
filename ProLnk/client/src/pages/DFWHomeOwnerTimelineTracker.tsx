import { useState } from 'react';

const ENTRY_TYPES = ['Purchase', 'Improvement', 'System Replacement', 'Inspection', 'Permit', 'Warranty Issued', 'Insurance Claim', 'Sale Prep'];

interface ValueInfo {
  impact: string;
  docNote: string;
  valueBoost: string;
}

const ENTRY_INFO: Record<string, ValueInfo> = {
  Purchase: { impact: 'Establishes your cost basis for capital gains calculation at sale.', docNote: 'Keep closing disclosure, deed, and title insurance forever.', valueBoost: 'N/A — baseline event' },
  Improvement: { impact: 'Adds to your adjusted cost basis, reducing taxable gain at sale.', docNote: 'Keep receipts, contracts, and before/after photos. IRS requires documentation.', valueBoost: 'Kitchen/bath remodels: 60–80% ROI in DFW market' },
  'System Replacement': { impact: 'New systems are strong selling points. Buyers discount old HVAC/roof.', docNote: 'Keep invoice, warranty card, model/serial number, installer license.', valueBoost: 'New HVAC: $5K–12K buyer appeal. New roof: $8K–20K value' },
  Inspection: { impact: 'Pre-listing inspection can prevent price reductions and deal failures.', docNote: 'Keep report PDF and any repair receipts showing issues were addressed.', valueBoost: 'Pre-listing inspection reduces buyer negotiations by avg 35%' },
  Permit: { impact: 'Unpermitted work = red flag at inspection. Permits prove legal compliance.', docNote: 'Keep permit number and final inspection sign-off. Pull from city records if lost.', valueBoost: 'Permitted additions add full square footage value. Unpermitted: often zero' },
  'Warranty Issued': { impact: 'Transferable warranties are significant selling advantages in DFW.', docNote: 'Keep original warranty document and confirm transferability in writing.', valueBoost: 'Transferable foundation warranty: $3K–8K buyer value perception' },
  'Insurance Claim': { impact: 'Too many claims can affect insurability and resale. Disclose at sale.', docNote: 'Keep claim number, payout amount, repair receipts. TX law requires disclosure.', valueBoost: 'Properly repaired claim with docs: neutral. Hidden: legal liability' },
  'Sale Prep': { impact: 'Documents your intent and timing. Helps track ROI on pre-sale improvements.', docNote: 'Keep contractor quotes, staging invoices, photography receipts.', valueBoost: 'Staged homes sell 17% faster and for 1–5% more in DFW' },
};

const SAMPLE_ENTRIES = [
  { date: '2019-07-15', type: 'Purchase', description: 'Purchased home', cost: '$420,000', notes: 'Conventional loan, 20% down' },
  { date: '2021-09-03', type: 'System Replacement', description: 'New Carrier HVAC 3-ton', cost: '$7,200', notes: '10yr parts warranty, 1yr labor' },
  { date: '2023-04-18', type: 'Improvement', description: 'Kitchen remodel', cost: '$38,000', notes: 'New cabinets, quartz counters, appliances' },
  { date: '2025-05-10', type: 'Inspection', description: 'Annual foundation inspection', cost: '$350', notes: 'No movement detected' },
];

export default function DFWHomeOwnerTimelineTracker() {
  const [selectedType, setSelectedType] = useState('Improvement');
  const [entries, setEntries] = useState(SAMPLE_ENTRIES);
  const [form, setForm] = useState({ date: '', description: '', cost: '', notes: '' });
  const [added, setAdded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const info = ENTRY_INFO[selectedType];

  function handleAdd() {
    if (!form.date || !form.description) return;
    setEntries(prev => [...prev, { ...form, type: selectedType }].sort((a, b) => b.date.localeCompare(a.date)));
    setForm({ date: '', description: '', cost: '', notes: '' });
    setAdded(true);
    setShowForm(false);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HOMEOWNER TOOLS</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>📅 Homeownership Timeline Tracker</h1>
        <p style={{ color: '#8CA4C0', marginBottom: 28 }}>Every major event, improvement, and milestone — documented and organized.</p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {ENTRY_TYPES.map(t => (
            <button key={t} onClick={() => setSelectedType(t)}
              style={{ padding: '7px 14px', borderRadius: 20, border: '2px solid', cursor: 'pointer', fontWeight: 700, fontSize: 12,
                borderColor: selectedType === t ? '#F5E642′ : '#1E3A5F',
                background: selectedType === t ? '#F5E642′ : ’transparent',
                color: selectedType === t ? '#0A1628′ : '#8CA4C0' }}>
              {t}
            </button>
          ))}
        </div>

        <div style={{ background: '#0F2037', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            <div style={{ background: '#1E3A5F', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 11, color: '#8CA4C0', fontWeight: 700, marginBottom: 6 }}>HOME VALUE IMPACT</div>
              <div style={{ fontSize: 13, color: '#A8C4E0', lineHeight: 1.5 }}>{info.impact}</div>
            </div>
            <div style={{ background: '#1E3A5F', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 11, color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>📄 DOCUMENTATION</div>
              <div style={{ fontSize: 13, color: '#A8C4E0', lineHeight: 1.5 }}>{info.docNote}</div>
            </div>
            <div style={{ background: '#1E3A5F', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 11, color: '#22C55E', fontWeight: 700, marginBottom: 6 }}>💰 VALUE BOOST</div>
              <div style={{ fontSize: 13, color: '#A8C4E0', lineHeight: 1.5 }}>{info.valueBoost}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>🕒 Your Timeline ({entries.length} events)</h2>
          <button onClick={() => setShowForm(!showForm)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>
            {showForm ? 'Cancel' : '+ Add Event'}
          </button>
        </div>

        {added && <div style={{ background: '#22C55E20', border: '1px solid #22C55E', borderRadius: 8, padding: 12, marginBottom: 14, color: '#22C55E', fontWeight: 700 }}>✅ Event added to timeline!</div>}

        {showForm && (
          <div style={{ background: '#0F2037', borderRadius: 12, padding: 24, marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, color: '#F5E642′ }}>New {selectedType} Event</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 12, color: '#8CA4C0', marginBottom: 4 }}>Date</div>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  style={{ width: '100%', background: '#1E3A5F', border: '1px solid #2A4F7A', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#8CA4C0', marginBottom: 4 }}>Cost / Value</div>
                <input value={form.cost} onChange={e => setForm(f => ({ ...f, cost: e.target.value }))} placeholder="$0″
                  style={{ width: '100%', background: '#1E3A5F', border: '1px solid #2A4F7A', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#8CA4C0', marginBottom: 4 }}>Description</div>
              <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                style={{ width: '100%', background: '#1E3A5F', border: '1px solid #2A4F7A', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: '#8CA4C0', marginBottom: 4 }}>Notes</div>
              <input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                style={{ width: '100%', background: '#1E3A5F', border: '1px solid #2A4F7A', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <button onClick={handleAdd}
              style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
              Add to Timeline
            </button>
          </div>
        )}

        <div style={{ position: 'relative', paddingLeft: 28 }}>
          <div style={{ position: 'absolute', left: 10, top: 0, bottom: 0, width: 2, background: '#1E3A5F' }} />
          {entries.map((e, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: 18 }}>
              <div style={{ position: 'absolute', left: -24, top: 16, width: 14, height: 14, borderRadius: '50%', background: '#F5E642', border: '3px solid #0A1628′ }} />
              <div style={{ background: '#0F2037', borderRadius: 12, padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <div>
                    <span style={{ fontWeight: 800, fontSize: 15 }}>{e.description}</span>
                    <span style={{ marginLeft: 10, fontSize: 11, background: '#1E3A5F', color: '#8CA4C0', padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>{e.type}</span>
                  </div>
                  {e.cost && <span style={{ color: '#F5E642', fontWeight: 800, fontSize: 15 }}>{e.cost}</span>}
                </div>
                <div style={{ fontSize: 13, color: '#8CA4C0', marginBottom: e.notes ? 6 : 0 }}>{e.date}</div>
                {e.notes && <div style={{ fontSize: 13, color: '#A8C4E0', fontStyle: 'italic' }}>📝 {e.notes}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
