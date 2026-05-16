import { useState } from 'react';

const TRADES = ['Plumber', 'Electrician', 'HVAC', 'Roofer', 'General Contractor', 'Painter', 'Landscaper', 'Pool Contractor', 'Pest Control', 'Foundation Repair'];

const CHECKS = {
  Plumber: [{ title: 'TCEQ License Verification', url: 'https://www.tceq.texas.gov/agency/licenses_permits', desc: 'Texas Commission on Environmental Quality — all plumbers must be licensed.', flag: 'License # should start with M (Master) or J (Journeyman). No license = walk away.' },
    { title: 'BBB Business Profile', url: 'https://www.bbb.org/search', desc: 'Check rating, complaint history, and resolution record.', flag: 'More than 3 unresolved complaints in 3 years is a red flag.' },
    { title: 'Google Reviews (500ft)', url: 'https://www.google.com/maps', desc: 'Search business name in Maps to see star rating and recent reviews.', flag: 'Any response pattern of blaming customers or threats shows poor professionalism.' }],
  Electrician: [{ title: 'TDLR License Lookup', url: 'https://www.tdlr.texas.gov/LicenseSearch/', desc: 'Texas Dept of Licensing — all electricians must be TDLR licensed.', flag: 'Only hire Journeyman or Master Electricians for panel and service work.' },
    { title: 'BBB Profile', url: 'https://www.bbb.org/search', desc: 'Rating and complaint resolution.', flag: 'Pattern of electrical permit violations in complaints = significant red flag.' },
    { title: 'Google Maps Reviews', url: 'https://www.google.com/maps', desc: 'Recent reviews and photos.', flag: 'Look for mentions of permits — unlicensed work creates insurance voidance risk.' }],
};

const DEFAULT_CHECKS = [
  { title: 'TDLR License Lookup', url: 'https://www.tdlr.texas.gov/LicenseSearch/', desc: 'Texas Dept of Licensing and Regulation — covers 40+ licensed trades in Texas.', flag: 'No TDLR license found? Request their exact license number before proceeding.' },
  { title: 'BBB Business Profile', url: 'https://www.bbb.org/search', desc: 'Check A-F rating, complaint count, and complaint resolution.', flag: 'D or F rating, or pattern of unresolved complaints, is disqualifying.' },
  { title: 'Google Maps Reviews', url: 'https://www.google.com/maps', desc: 'Real customer reviews, photos of work, and response pattern to complaints.', flag: 'Less than 4.2 stars with under 20 reviews warrants extra scrutiny.' },
];

export default function DFWContractorVerification() {
  const [name, setName] = useState('');
  const [trade, setTrade] = useState('Plumber');
  const [started, setStarted] = useState(false);
  const [checked, setChecked] = useState({});
  const [notes, setNotes] = useState({});

  function start() { if (name) setStarted(true); }

  const checks = CHECKS[trade] || DEFAULT_CHECKS;
  const allChecked = checks.every((_, i) => checked[i]);
  const score = checks.filter((_, i) => checked[i]).length;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🔎</div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#F5E642' }}>DFW Contractor Verification</h1>
          <p style={{ margin: '0.5rem 0 0', color: '#8899bb', fontSize: 14 }}>Verify any DFW contractor before you hire — step-by-step checklist</p>
        </div>
        {!started ? (
          <div style={{ background: '#132035', borderRadius: 12, padding: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#ccc', marginBottom: 6 }}>Contractor Business Name</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder='e.g. DFW Expert Plumbing LLC' style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #2a3a50', background: '#0A1628', color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#ccc', marginBottom: 6 }}>Trade / Service Type</label>
              <select value={trade} onChange={e => setTrade(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1.5px solid #2a3a50', background: '#0A1628', color: '#fff', fontSize: 14 }}>
                {TRADES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <button onClick={start} style={{ width: '100%', background: '#F5E642', color: '#0A1628', padding: '13px', borderRadius: 10, border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>
              🔎 Start Verification Checklist
            </button>
          </div>
        ) : (
          <>
            <div style={{ background: '#132035', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>🔎 {name}</div>
                <div style={{ color: '#8899bb', fontSize: 13 }}>{trade} • DFW Verification</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: score === checks.length ? '#4ade80' : '#F5E642' }}>{score}/{checks.length}</div>
                <div style={{ fontSize: 11, color: '#8899bb' }}>checks done</div>
              </div>
            </div>
            {checks.map((check, i) => (
              <div key={i} style={{ background: checked[i] ? '#0f2a1a' : '#132035', borderRadius: 10, padding: '1.25rem', marginBottom: '0.75rem', border: checked[i] ? '1.5px solid #4ade80' : '1.5px solid #1e3a5c' }}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: checked[i] ? '#4ade80' : '#2a3a50', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 14, fontWeight: 700, color: checked[i] ? '#000' : '#888' }}>{checked[i] ? '✓' : i+1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: '#fff', marginBottom: 4, fontSize: 14 }}>{check.title}</div>
                    <div style={{ fontSize: 13, color: '#8899bb', marginBottom: '0.5rem' }}>{check.desc}</div>
                    <a href={check.url.replace('name', encodeURIComponent(name))} target='_blank' rel='noreferrer' style={{ display: 'inline-block', background: '#1e3a6e', color: '#F5E642', padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, textDecoration: 'none', marginBottom: '0.75rem' }}>🔗 Open {check.title}</a>
                    <div style={{ background: '#1a0a0a', borderRadius: 6, padding: '0.6rem 0.75rem', fontSize: 12, color: '#f87171', marginBottom: '0.75rem' }}>
                      🚩 <strong>Red flag:</strong> {check.flag}
                    </div>
                    <input value={notes[i] || ''} onChange={e => setNotes(n => ({...n, [i]: e.target.value}))} placeholder='Add your notes here...' style={{ width: '100%', padding: '6px 10px', borderRadius: 6, border: '1px solid #2a3a50', background: '#0A1628', color: '#ccc', fontSize: 12, boxSizing: 'border-box', marginBottom: '0.5rem' }} />
                    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: '#ccc' }}>
                      <input type='checkbox' checked={!!checked[i]} onChange={e => setChecked(c => ({...c, [i]: e.target.checked}))} style={{ width: 16, height: 16 }} />
                      Mark this check complete
                    </label>
                  </div>
                </div>
              </div>
            ))}
            {allChecked && (
              <div style={{ background: '#0f2a1a', borderRadius: 12, padding: '1.5rem', border: '2px solid #4ade80', textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>✅</div>
                <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>All Checks Complete</div>
                <div style={{ color: '#8899bb', fontSize: 14 }}>{name} has passed your DFW verification checklist. Trust your notes — and always get everything in writing.</div>
              </div>
            )}
            <button onClick={() => { setStarted(false); setChecked({}); setNotes({}); }} style={{ width: '100%', background: 'none', border: '1px solid #2a3a50', color: '#8899bb', padding: '10px', borderRadius: 10, fontSize: 13, cursor: 'pointer', marginTop: '1rem' }}>
              ← Start New Verification
            </button>
          </>
        )}
      </div>
    </div>
  );
}
