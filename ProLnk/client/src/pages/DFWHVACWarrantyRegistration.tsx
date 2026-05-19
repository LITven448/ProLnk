import { useState } from 'react';

const brands = [
  { name: 'Carrier', window: '60 days', parts10: true, url: 'carrier.com/residential/en/us/products/warranty-registration/', steps: ['Locate model/serial on unit label', 'Visit Carrier warranty portal', 'Enter contractor info + install date', 'Receive email confirmation'] },
  { name: 'Trane', window: '60 days', parts10: true, url: 'trane.com/residential/en/resources/warranty/', steps: ['Find serial number on outdoor unit', 'Go to Trane warranty registration page', 'Enter homeowner + system details', 'Save confirmation number'] },
  { name: 'Lennox', window: '60 days', parts10: true, url: 'lennox.com/owners/register-my-product', steps: ['Locate serial on unit data plate', 'Visit Lennox product registration', 'Fill in system and install info', 'Print/save confirmation email'] },
  { name: 'Rheem', window: '60 days', parts10: true, url: 'rheem.com/warranty-registration/', steps: ['Serial number on unit label', 'Rheem warranty registration portal', 'Enter homeowner and dealer info', 'Download warranty certificate'] },
  { name: 'Goodman', window: '60 days', parts10: true, url: 'goodmanmfg.com/homeowners/warranty-registration', steps: ['Find model/serial on equipment', 'Goodman homeowner registration page', 'Enter all system details', 'Confirm via email receipt'] },
  { name: 'American Standard', window: '60 days', parts10: true, url: 'americanstandardair.com/resources/warranty-registration', steps: ['Serial number on equipment label', 'American Standard registration portal', 'Complete homeowner form', 'Save warranty confirmation'] },
];

const installDates = ['Installed today', 'Less than 30 days ago', '30-60 days ago', 'More than 60 days ago — not registered'];

function getStatus(brand: string, date: string) {
  const b = brands.find(br => br.name === brand);
  if (!b) return null;
  if (date === 'More than 60 days ago — not registered') {
    return { urgent: true, message: 'Registration window has closed for most brands. Call the manufacturer — some allow late registration with proof of install date. Act immediately.', warranty: '5-year parts (unregistered default)', gain: 'You may lose 5 years of parts coverage.' };
  }
  const daysLeft = date === 'Installed today' ? 60 : date === 'Less than 30 days ago' ? '~30-59′ : '~1-30';
  return { urgent: false, message: `Register now at ${b.url}`, warranty: '10-year parts when registered in time', gain: 'Registration adds 5 additional years of parts warranty at no cost.', daysLeft, steps: b.steps };
}

export default function DFWHVACWarrantyRegistration() {
  const [brand, setBrand] = useState('');
  const [date, setDate] = useState('');
  const status = brand && date ? getStatus(brand, date) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>HVAC Warranty Registration Guide for DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 12 }}>Every major brand requires registration within 60 days of installation for the 10-year parts warranty. Without registration you receive 5 years — a costly oversight on a $5,000-12,000 investment.</p>

        <div style={{ background: '#ef444420', border: '1px solid #ef4444', borderRadius: 10, padding: '14px 20px', marginBottom: 32 }}>
          <span style={{ color: '#ef4444', fontWeight: 700 }}>⏰ Critical: </span>
          <span style={{ color: '#fca5a5′ }}>Register within 60 days of DFW installation. Missing this window costs you 5 years of manufacturer parts coverage.</span>
        </div>

        <div style={{ display: 'grid', gap: 10, marginBottom: 40 }}>
          {brands.map(b => (
            <div key={b.name} style={{ background: '#0f1f3d', borderRadius: 10, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{b.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Register within {b.window}</div>
              <div style={{ color: '#22c55e', fontSize: 13 }}>✅ 10-yr parts if registered</div>
              <div style={{ color: '#ef4444', fontSize: 13 }}>5-yr if not</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>📋 Check Your DFW Warranty Status</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8′ }}>HVAC Brand</label>
              <select value={brand} onChange={e => setBrand(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select brand...</option>
                {brands.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#94a3b8′ }}>DFW Installation Date</label>
              <select value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
                <option value=''>Select timeframe...</option>
                {installDates.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          {status && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: `4px solid ${status.urgent ? '#ef4444' : '#F5E642'}` }}>
              <div style={{ color: status.urgent ? '#ef4444′ : '#F5E642', fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{status.urgent ? '🚨 URGENT: Act Now' : '✅ Register Immediately'}</div>
              <div style={{ color: '#94a3b8', marginBottom: 8, fontSize: 14 }}>{status.message}</div>
              <div style={{ marginBottom: 4 }}><span style={{ color: '#94a3b8', fontSize: 13 }}>Coverage: </span><span style={{ color: '#fff' }}>{status.warranty}</span></div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{status.gain}</div>
              {status.steps && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 6 }}>Registration steps:</div>
                  {status.steps.map((s, i) => <div key={i} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 3 }}>{i + 1}. {s}</div>)}
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, color: '#0A1628', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>Need Help With Your DFW HVAC Installation Records?</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>A licensed DFW HVAC contractor can provide install documentation needed for warranty registration.</div>
        </div>
      </div>
    </div>
  );
}
