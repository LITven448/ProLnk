import { useState } from 'react';

const docRetention = [
  { category: 'Property tax records (DFW)', years: '7+ years', reason: 'DFW property tax appeals require 5+ years of comparable valuations — keep everything' },
  { category: 'HOA records & communications', years: '10 years', reason: 'Dispute resolution requires history; DFW HOAs are notoriously aggressive' },
  { category: 'Home purchase documents', years: 'Permanent', reason: 'Closing docs, title, deed — store in fireproof safe or bank safe deposit' },
  { category: 'Home improvement receipts', years: 'Until sale + 3', reason: 'Capital gains basis reduction; required for Texas homestead exemption adjustments' },
  { category: 'Insurance policies & claims', years: '10 years', reason: 'Claims history affects future rates; dispute resolution requires documentation' },
  { category: 'Tax returns', years: '7 years', reason: 'IRS statute of limitations; Texas franchise tax audit window' },
  { category: 'Utility bills', years: '2 years', reason: 'Dispute resolution, energy audit baseline, Oncor rebate eligibility' },
  { category: 'Vehicle records', years: '7 years', reason: 'Texas inspection history, title transfers, toll disputes' },
];

const storageSolutions = [
  { name: 'Fireproof File Cabinet', cost: '200–800', best: 'Permanent documents, irreplaceable records', secure: true },
  { name: 'Built-In Bookshelves', cost: '1,500–6,000', best: 'Books, binders, decorative storage', secure: false },
  { name: 'Floating Wall Shelves', cost: '200–800', best: 'Reference materials, frequently accessed binders', secure: false },
  { name: 'Lateral Filing System', cost: '300–1,200', best: 'High-volume active files, legal-size documents', secure: false },
  { name: 'Document Scanner + Cloud', cost: '150–400', best: 'Eliminate paper entirely — scan and shred', secure: true },
  { name: 'Cross-Cut Shredder', cost: '80–300', best: 'HIPAA, financial, legal documents past retention date', secure: true },
  { name: 'Cable Management System', cost: '50–300', best: 'Monitor, printer, charging cables — reduces desk chaos', secure: false },
  { name: 'Locking Desk Drawer Unit', cost: '200–600', best: 'Sensitive documents, access-controlled storage', secure: true },
];

export default function DFWHomeOfficeStorageGuide() {
  const [officeSqft, setOfficeSqft] = useState('');
  const [docVolume, setDocVolume] = useState('moderate');
  const [techItems, setTechItems] = useState('standard');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<{ picks: typeof storageSolutions; estimate: string; tip: string } | null>(null);

  function recommend() {
    const sqft = parseFloat(officeSqft);
    const b = parseFloat(budget);
    if (!sqft || !b) return;

    let picks = [];
    picks.push(storageSolutions[4]); // scanner always
    picks.push(storageSolutions[5]); // shredder always

    if (docVolume === 'heavy') picks.push(storageSolutions[0], storageSolutions[3]);
    else picks.push(storageSolutions[7]);

    if (sqft >= 120 && b >= 2000) picks.push(storageSolutions[1]);
    else picks.push(storageSolutions[2]);

    if (techItems !== 'minimal') picks.push(storageSolutions[6]);

    picks = picks.slice(0, 5);
    const minC = picks.reduce((s, p) => s + parseInt(p.cost.split('–')[0].replace(/,/g, '')), 0);
    const maxC = picks.reduce((s, p) => s + parseInt(p.cost.split('–')[1].replace(/,/g, '')), 0);

    setResult({
      picks,
      estimate: `$${minC.toLocaleString()}–$${maxC.toLocaleString()}`,
      tip: docVolume === 'heavy'
        ? 'Heavy document volume: invest in a dedicated lateral file cabinet + annual shred service (Shred Nations DFW ~$30/box)'
        : 'Scan everything older than 2 years, shred originals — eliminate 80% of physical storage needs',
    });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>DFW HOME ORGANIZATION</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>Home Office Storage Guide — Dallas-Fort Worth 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32, maxWidth: 680 }}>DFW homeowners have unique document retention needs: property tax appeals, HOA disputes, and Texas homestead exemptions require years of meticulous records. This guide builds your complete storage system.</p>

        <div style={{ background: '#0f1a2e', border: '1px solid #F5E642', borderRadius: 12, padding: 20, marginBottom: 40 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>📋 DFW Document Retention Guide — Keep These Records</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #1e3a5f' }}>
                  <th style={{ color: '#94a3b8', textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Document Type</th>
                  <th style={{ color: '#94a3b8', textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Keep For</th>
                  <th style={{ color: '#94a3b8', textAlign: 'left', padding: '8px 12px', fontWeight: 600 }}>Why (DFW-specific)</th>
                </tr>
              </thead>
              <tbody>
                {docRetention.map(d => (
                  <tr key={d.category} style={{ borderBottom: '1px solid #0f1a2e' }}>
                    <td style={{ padding: '10px 12px', color: '#fff', fontWeight: 500 }}>{d.category}</td>
                    <td style={{ padding: '10px 12px', color: '#F5E642', fontWeight: 700, whiteSpace: 'nowrap' }}>{d.years}</td>
                    <td style={{ padding: '10px 12px', color: '#64748b' }}>{d.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 40 }}>
          {storageSolutions.map(s => (
            <div key={s.name} style={{ background: '#0f2040', border: `1px solid ${s.secure ? '#1e4a2f' : '#1e3a5f'}`, borderRadius: 12, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{s.name}</div>
                {s.secure && <div style={{ color: '#22c55e', fontSize: 11 }}>🔒 Secure</div>}
              </div>
              <div style={{ color: '#22c55e', fontSize: 13, marginBottom: 6 }}>${s.cost}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{s.best}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 16, padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🧮 Storage Solution Recommender</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Office size (sq ft)</label>
              <input value={officeSqft} onChange={e => setOfficeSqft(e.target.value)} type="number" placeholder="e.g. 120" style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Document volume</label>
              <select value={docVolume} onChange={e => setDocVolume(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }}>
                <option value="light">Light — minimal paperwork</option>
                <option value="moderate">Moderate — typical household</option>
                <option value="heavy">Heavy — business owner or investor</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Tech equipment</label>
              <select value={techItems} onChange={e => setTechItems(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }}>
                <option value="minimal">Minimal — laptop only</option>
                <option value="standard">Standard — desktop + peripherals</option>
                <option value="heavy">Heavy — dual monitors, server, NAS</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>Budget ($)</label>
              <input value={budget} onChange={e => setBudget(e.target.value)} type="number" placeholder="e.g. 2000" style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={recommend} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Get Recommendation →</button>
          {result && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 20, border: '1px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>✅ Recommended Storage System — Est. {result.estimate}</div>
              {result.picks.map(p => (
                <div key={p.name} style={{ display: 'flex', gap: 12, marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid #0f2040' }}>
                  <div style={{ color: '#22c55e', minWidth: 120, fontSize: 13, fontWeight: 600 }}>${p.cost}</div>
                  <div><div style={{ color: '#fff', fontSize: 13 }}>{p.name}</div><div style={{ color: '#64748b', fontSize: 12 }}>{p.best}</div></div>
                </div>
              ))}
              <div style={{ marginTop: 12, color: '#94a3b8', fontSize: 13 }}>💡 {result.tip}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
