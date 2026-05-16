import { useState } from 'react';

const comparisons = [
  { feature: 'Ownership', townhome: 'Own unit + land parcel', apartment: 'Rent only', sfHome: 'Own unit + full lot' },
  { feature: 'Shared walls', townhome: '1–2 shared walls', apartment: 'Multiple shared walls', sfHome: 'No shared walls' },
  { feature: 'HOA', townhome: '$100–$350/mo typical DFW', apartment: 'None (in rent)', sfHome: 'Optional, often lower' },
  { feature: 'Appreciation', townhome: 'Strong — 4–6% avg DFW', apartment: 'None (renting)', sfHome: 'Highest — 5–7% avg DFW' },
  { feature: 'Maintenance', townhome: 'HOA handles exterior', apartment: 'Landlord handles all', sfHome: 'Owner handles all' },
];

const dfwTownhomeAreas = [
  { area: 'Frisco / McKinney', price: '$380K–$520K', notes: 'Master-planned, family-oriented, strong schools' },
  { area: 'Uptown / Oak Lawn Dallas', price: '$450K–$700K', notes: 'Urban walkability, luxury finishes, no yard' },
  { area: 'Arlington', price: '$280K–$400K', notes: 'Affordable entry point, near DFW Airport' },
  { area: 'Mansfield / Midlothian', price: '$310K–$430K', notes: 'Growing corridor, newer builds, lower taxes' },
];

export default function DFWTownhouseGuide() {
  const [priority, setPriority] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<null | string>(null);

  function assess() {
    const b = parseInt(budget.replace(/\D/g, ''), 10);
    if (!priority || !budget) return;
    let msg = '';
    if (b < 280000) {
      msg = '⚠️ DFW townhomes typically start at $280K. Consider building savings 6–12 more months, or explore Arlington and Mansfield for entry-level options.';
    } else if (priority === 'urban' && b >= 450000) {
      msg = '🏙️ Uptown Dallas or Oak Lawn townhomes match your urban priority. Expect $450K–$700K with walkability and no yard maintenance.';
    } else if (priority === 'family' && b >= 350000) {
      msg = '👨‍👩‍👧 Frisco or McKinney townhomes fit your family priority — great schools and master-planned communities. Budget $380K–$520K.';
    } else if (priority === 'value') {
      msg = '💰 Arlington or Mansfield offer the best value townhomes in DFW. Strong appreciation with lower entry prices ($280K–$430K).';
    } else {
      msg = '✅ You have solid townhome buying power in DFW. Compare HOA fees carefully — they can add $150–$350/mo to your housing costs.';
    }
    setResult(msg);
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0A1628', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1 }}>DFW REAL ESTATE GUIDE</div>
          <h1 style={{ color: '#fff', fontSize: 28, margin: 0 }}>DFW Townhome Buying Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: 10, fontSize: 15 }}>
            Townhomes are the middle ground — more space than a condo, less upkeep than a single-family home.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '1px solid #e2e8f0', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, margin: '0 0 4px' }}>🏘️ How Townhomes Fit In</h2>
          <p style={{ fontSize: 14, color: '#475569', marginTop: 4 }}>
            DFW townhomes give you ownership + HOA-managed exteriors — you get equity without full maintenance burden. Shared walls (typically 1–2) are the main tradeoff.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '1px solid #e2e8f0', marginBottom: 24, overflowX: 'auto' }}>
          <h2 style={{ fontSize: 18, margin: '0 0 16px' }}>📊 Townhome vs Alternatives</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Feature', 'Townhome 🏘️', 'Apartment 🏢', 'Single-Family 🏡'].map(h => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map(r => (
                <tr key={r.feature} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 600 }}>{r.feature}</td>
                  <td style={{ padding: '10px 12px', color: '#16a34a' }}>{r.townhome}</td>
                  <td style={{ padding: '10px 12px', color: '#475569' }}>{r.apartment}</td>
                  <td style={{ padding: '10px 12px', color: '#475569' }}>{r.sfHome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '1px solid #e2e8f0', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, margin: '0 0 16px' }}>📍 Where DFW Townhomes Are Concentrated</h2>
          {dfwTownhomeAreas.map(a => (
            <div key={a.area} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 12, marginBottom: 12 }}>
              <div style={{ fontWeight: 600 }}>{a.area} <span style={{ color: '#F5E642', background: '#0A1628', borderRadius: 4, padding: '2px 8px', fontSize: 12 }}>{a.price}</span></div>
              <div style={{ fontSize: 13, color: '#475569', marginTop: 4 }}>{a.notes}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '2px solid #F5E642' }}>
          <h2 style={{ fontSize: 18, margin: '0 0 16px' }}>🧭 Townhome Feasibility Check</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Your top priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}>
              <option value="">Select...</option>
              <option value="urban">Urban lifestyle + walkability</option>
              <option value="family">Family-friendly + good schools</option>
              <option value="value">Best value / appreciation</option>
              <option value="space">More space than a condo</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Your budget</label>
            <input type="text" placeholder="e.g. $380,000" value={budget} onChange={e => setBudget(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, boxSizing: 'border-box' }} />
          </div>
          <button onClick={assess}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '12px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 15 }}>
            Check My DFW Townhome Fit
          </button>
          {result && (
            <div style={{ marginTop: 16, background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: 16, fontSize: 14 }}>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
