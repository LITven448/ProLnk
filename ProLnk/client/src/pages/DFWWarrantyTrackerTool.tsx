import { useState } from 'react';

const WARRANTY_TYPES = ['Appliance', 'HVAC', 'Roof', 'Windows', 'Foundation', 'Home Warranty', 'Builder'];

const COVERAGE_INFO: Record<string, string> = {
  Appliance: 'Parts and labor for manufacturer defects. Does NOT cover normal wear or misuse.',
  HVAC: 'Compressor, heat exchanger, coils. Labor often NOT included after year 1.',
  Roof: 'Shingles against manufacturing defects. Wind/hail requires separate homeowner insurance.',
  Windows: 'Seal failure, glass breakage (if included), frame defects. UV damage excluded.',
  Foundation: 'Structural movement beyond specified tolerances. Drainage issues often excluded.',
  'Home Warranty': 'Major systems + appliances. Read exclusions carefully — pre-existing conditions excluded.',
  Builder: 'Structural defects (10yr), systems (2yr), workmanship (1yr) per Texas law.',
};

const CONTACTS: Record<string, string> = {
  Appliance: 'Manufacturer 800 number on unit or in manual.',
  HVAC: 'Original installing contractor or manufacturer warranty line.',
  Roof: 'Roofing contractor who installed + shingle manufacturer separately.',
  Windows: 'Window manufacturer — keep brand name from original paperwork.',
  Foundation: 'Foundation repair company — get transferable warranty docs at closing.',
  'Home Warranty': 'Home warranty company claims line — open a ticket online or by phone.',
  Builder: 'Builder warranty department — submit in writing via certified mail.',
};

export default function DFWWarrantyTrackerTool() {
  const [type, setType] = useState('HVAC');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [duration, setDuration] = useState('');
  const [result, setResult] = useState<{ expDate: string; daysLeft: number } | null>(null);

  function calculate() {
    if (!purchaseDate || !duration) return;
    const start = new Date(purchaseDate);
    const years = parseFloat(duration);
    const exp = new Date(start);
    exp.setFullYear(exp.getFullYear() + Math.floor(years));
    exp.setMonth(exp.getMonth() + Math.round((years % 1) * 12));
    const today = new Date('2026-05-16');
    const daysLeft = Math.floor((exp.getTime() - today.getTime()) / 86400000);
    setResult({ expDate: exp.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), daysLeft });
  }

  const urgency = result ? (result.daysLeft < 90 ? '#FF4444′ : result.daysLeft < 365 ? '#F5A623' : '#22C55E') : '#F5E642';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW HOMEOWNER TOOLS</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>🛡️ Home Warranty Tracker</h1>
        <p style={{ color: '#8CA4C0', marginBottom: 28 }}>Track every warranty covering your DFW home — never miss an expiration again.</p>

        <div style={{ background: '#0F2037', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>Select Warranty Type</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
            {WARRANTY_TYPES.map(t => (
              <button key={t} onClick={() => { setType(t); setResult(null); }}
                style={{ padding: '8px 16px', borderRadius: 20, border: '2px solid', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                  borderColor: type === t ? '#F5E642′ : '#1E3A5F',
                  background: type === t ? '#F5E642′ : ’transparent',
                  color: type === t ? '#0A1628′ : '#8CA4C0' }}>
                {t}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 12, color: '#8CA4C0', marginBottom: 6 }}>Purchase / Installation Date</div>
              <input type="date" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)}
                style={{ width: '100%', background: '#1E3A5F', border: '1px solid #2A4F7A', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#8CA4C0', marginBottom: 6 }}>Warranty Duration (years)</div>
              <input type="number" min="0.5″ max="25" step="0.5" value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g. 10"
                style={{ width: '100%', background: '#1E3A5F', border: '1px solid #2A4F7A', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>

          <button onClick={calculate}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
            Calculate Expiration
          </button>
        </div>

        {result && (
          <div style={{ background: '#0F2037', borderRadius: 12, padding: 24, marginBottom: 24, border: `2px solid ${urgency}` }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>⏱️ Expiration Countdown</h2>
            <div style={{ fontSize: 32, fontWeight: 900, color: urgency, marginBottom: 8 }}>
              {result.daysLeft > 0 ? `${result.daysLeft.toLocaleString()} days left` : 'EXPIRED'}
            </div>
            <div style={{ color: '#8CA4C0', fontSize: 15 }}>Expires: <span style={{ color: '#fff', fontWeight: 700 }}>{result.expDate}</span></div>
            {result.daysLeft < 365 && result.daysLeft > 0 && (
              <div style={{ marginTop: 12, background: '#1E3A5F', borderRadius: 8, padding: 12, fontSize: 14, color: '#F5A623′ }}>
                ⚠️ Within 1 year — schedule any warranty work now before expiration.
              </div>
            )}
          </div>
        )}

        <div style={{ background: '#0F2037', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>📋 What's Covered: {type}</h2>
          <p style={{ color: '#A8C4E0', lineHeight: 1.7, marginBottom: 16 }}>{COVERAGE_INFO[type]}</p>
          <div style={{ background: '#1E3A5F', borderRadius: 8, padding: 14 }}>
            <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>📞 WHO TO CONTACT</div>
            <p style={{ color: '#A8C4E0', fontSize: 14, margin: 0 }}>{CONTACTS[type]}</p>
          </div>
        </div>

        <div style={{ background: '#0F2037', borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>💡 DFW Warranty Tips</h2>
          {['Foundation warranties are transferable in TX — get docs at closing.', 'Roof warranties void if different contractor does repairs without manufacturer approval.', 'Home warranty plans renew annually — set a calendar reminder 30 days before renewal.', 'Builder warranty: submit issues in writing before 11 months post-closing.'].map((tip, i) => (
            <div key={i} style={{ fontSize: 14, color: '#8CA4C0', padding: '8px 0', borderBottom: i < 3 ? '1px solid #1E3A5F' : 'none' }}>✅ {tip}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
