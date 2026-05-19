import { useState } from 'react';

const homes = [
  { id: 1, address: '4521 Elm Ridge Dr, Plano', price: '$485,000', date: '2026-05-10', pros: 'Open floor plan, updated kitchen', cons: 'Small backyard, busy street', foundation: 'Slab — no visible cracks', hvac: '2019', hoa: '$150/mo', impression: 'Strong contender' },
  { id: 2, address: '812 Magnolia Ln, Frisco', price: '$512,000', date: '2026-05-11', pros: 'Cul-de-sac, large yard, 3-car garage', cons: 'Dated bathrooms, needs paint', foundation: 'Slab — minor crack noted NW corner', hvac: '2015', hoa: 'None', impression: 'Revisit after inspection' },
  { id: 3, address: '233 Creekview Ct, McKinney', price: '$467,000', date: '2026-05-12', pros: 'Great school district, newer roof', cons: 'Smaller bedrooms, no game room', foundation: 'Post-tension slab — looks sound', hvac: '2021', hoa: '$95/mo', impression: 'Best value so far' },
];

export default function DFWHouseHuntingJournal() {
  const [view, setView] = useState<'list' | 'compare'>('list');
  const [selected, setSelected] = useState<number[]>([]);
  const [questions, setQuestions] = useState<Record<number, string>>({});

  const toggle = (id: number) =>
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : prev.length >= 3 ? prev : [...prev, id]
    );

  const compared = homes.filter(h => selected.includes(h.id));

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', color: '#0A1628', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>DFW HOUSE HUNTING JOURNAL</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>🏡 Homes Toured: {homes.length}</h1>
          <p style={{ color: '#94a3b8', margin: '8px 0 0′ }}>Track, compare, and decide with confidence across DFW.</p>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          {(['list', 'compare'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, background: view === v ? '#F5E642′ : '#fff', color: view === v ? '#0A1628' : '#64748b', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
              {v === 'list' ? '📋 All Homes' : '⚖️ Compare Selected'}
            </button>
          ))}
        </div>

        {view === 'list' && homes.map(h => (
          <div key={h.id} style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17 }}>📍 {h.address}</div>
                <div style={{ color: '#64748b', fontSize: 14, marginTop: 4 }}>{h.price} · Toured {h.date}</div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                <input type="checkbox" checked={selected.includes(h.id)} onChange={() => toggle(h.id)} />
                Compare
              </label>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, background: '#0A1628', display: 'inline-block', padding: '2px 8px', borderRadius: 4, marginBottom: 4 }}>PROS</div>
                <div style={{ fontSize: 14, color: '#16a34a' }}>✅ {h.pros}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#0A1628', fontWeight: 700, background: '#fee2e2', display: 'inline-block', padding: '2px 8px', borderRadius: 4, marginBottom: 4 }}>CONS</div>
                <div style={{ fontSize: 14, color: '#dc2626′ }}>⚠️ {h.cons}</div>
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 13, color: '#475569′ }}>
              <span>🏗️ Foundation: {h.foundation}</span>
              <span>❄️ HVAC: {h.hvac}</span>
              <span>🏘️ HOA: {h.hoa}</span>
            </div>
            <div style={{ marginTop: 10, background: '#F9FAFB', borderRadius: 8, padding: '10px 14px', fontSize: 14, fontStyle: 'italic', color: '#334155′ }}>💭 {h.impression}</div>
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>❓ Open questions for agent:</div>
              <input
                value={questions[h.id] || ''}
                onChange={e => setQuestions(p => ({ ...p, [h.id]: e.target.value }))}
                placeholder="What should I ask before making an offer?"
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, boxSizing: 'border-box' }}
              />
            </div>
          </div>
        ))}

        {view === 'compare' && (
          compared.length < 2
            ? <div style={{ textAlign: 'center', padding: 48, color: '#64748b' }}>✅ Select at least 2 homes from the list view to compare side by side.</div>
            : <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                  <thead>
                    <tr style={{ background: '#0A1628', color: '#fff' }}>
                      <th style={{ padding: 14, textAlign: 'left', fontSize: 13 }}>Category</th>
                      {compared.map(h => <th key={h.id} style={{ padding: 14, fontSize: 13 }}>{h.address.split(',')[0]}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {([['Price', 'price'], ['Date Toured', 'date'], ['Foundation', 'foundation'], ['HVAC Age', 'hvac'], ['HOA', 'hoa'], ['Impression', 'impression']] as [string, keyof typeof homes[0]][]).map(([label, key]) => (
                      <tr key={key} style={{ borderBottom: '1px solid #f1f5f9′ }}>
                        <td style={{ padding: 12, fontWeight: 600, fontSize: 13, color: '#475569′ }}>{label}</td>
                        {compared.map(h => <td key={h.id} style={{ padding: 12, fontSize: 14, textAlign: 'center' }}>{h[key]}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ marginTop: 16, padding: 16, background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                  <div style={{ fontWeight: 700, marginBottom: 8 }}>📝 Which to revisit?</div>
                  {compared.map(h => (
                    <div key={h.id} style={{ marginBottom: 8, fontSize: 14 }}>
                      <span style={{ fontWeight: 600 }}>{h.address.split(',')[0]}:</span> {questions[h.id] || 'No open questions logged yet.'}
                    </div>
                  ))}
                </div>
              </div>
        )}
      </div>
    </div>
  );
}
