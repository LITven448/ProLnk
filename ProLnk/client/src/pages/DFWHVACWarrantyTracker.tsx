import { useState } from 'react';

const currentYear = 2026;
const currentMonth = 5;

function addMonths(year: number, month: number, add: number) {
  const d = new Date(year, month - 1 + add, 1);
  return { year: d.getFullYear(), month: d.getMonth() + 1 };
}

function monthsUntil(toYear: number, toMonth: number) {
  return (toYear - currentYear) * 12 + (toMonth - currentMonth);
}

function fmt(year: number, month: number) {
  return new Date(year, month - 1, 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function DFWHVACWarrantyTracker() {
  const [brand, setBrand] = useState('');
  const [installYear, setInstallYear] = useState(2022);
  const [installMonth, setInstallMonth] = useState(6);
  const [registered, setRegistered] = useState(true);
  const [laborYears, setLaborYears] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const partsYears = registered ? 10 : 5;
  const partsEnd = addMonths(installYear, installMonth, partsYears * 12);
  const laborEnd = addMonths(installYear, installMonth, laborYears * 12);
  const compressorEnd = addMonths(installYear, installMonth, (registered ? 10 : 5) * 12);

  const partsMonths = monthsUntil(partsEnd.year, partsEnd.month);
  const laborMonths = monthsUntil(laborEnd.year, laborEnd.month);
  const compressorMonths = monthsUntil(compressorEnd.year, compressorEnd.month);

  const warrantiesData = [
    {
      name: 'Parts Warranty',
      icon: '🔩',
      end: fmt(partsEnd.year, partsEnd.month),
      months: partsMonths,
      detail: `${partsYears} years${registered ? ' (registered — full coverage)' : ' (unregistered — reduced)'}`,
      covers: 'Compressor, coils, heat exchanger, electrical components',
    },
    {
      name: 'Labor Warranty',
      icon: '🔧',
      end: fmt(laborEnd.year, laborEnd.month),
      months: laborMonths,
      detail: `${laborYears} year — installer's workmanship`,
      covers: 'Labor costs to repair installation defects',
    },
    {
      name: 'Compressor Warranty',
      icon: '⚙️',
      end: fmt(compressorEnd.year, compressorEnd.month),
      months: compressorMonths,
      detail: `${partsYears} years — most critical DFW component`,
      covers: 'Full compressor replacement (most expensive DFW failure)',
    },
  ];

  const registrationDeadline = addMonths(installYear, installMonth, 2);
  const regDeadlineMonths = monthsUntil(registrationDeadline.year, registrationDeadline.month);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '32px 24px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8 }}>📋 DFW HVAC TOOLS</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Warranty Tracker</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          Register within 60 days to unlock 10-year parts warranty. Unregistered units get only 5 years.
        </p>

        <div style={{ display: 'grid', gap: 14, marginBottom: 20 }}>
          <div style={{ background: '#111c35', borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>🏷️ Brand (optional)</div>
            <input value={brand} onChange={e => setBrand(e.target.value)} placeholder="e.g. Trane, Carrier, Lennox…"
              style={{ width: '100%', background: '#1e2d4a', border: '1px solid #2d3f5f', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
          </div>

          <div style={{ background: '#111c35', borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>📅 Install Month/Year</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <select value={installMonth} onChange={e => setInstallMonth(Number(e.target.value))}
                style={{ background: '#1e2d4a', border: '1px solid #2d3f5f', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14 }}>
                {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m,i) => (
                  <option key={m} value={i+1}>{m}</option>
                ))}
              </select>
              <select value={installYear} onChange={e => setInstallYear(Number(e.target.value))}
                style={{ background: '#1e2d4a', border: '1px solid #2d3f5f', borderRadius: 8, padding: '10px 12px', color: '#fff', fontSize: 14 }}>
                {Array.from({length:16},(_,i)=>2010+i).map(y=><option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          <div style={{ background: '#111c35', borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 10 }}>✅ Registered within 60 days?</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[true, false].map(v => (
                <button key={String(v)} onClick={() => setRegistered(v)} style={{
                  flex: 1, padding: '10px', borderRadius: 8, border: `2px solid ${registered === v ? '#F5E642' : 'transparent'}`,
                  background: registered === v ? '#1e2d4a' : '#0d1829', color: '#fff', cursor: 'pointer', fontWeight: 700
                }}>{v ? '✅ Yes — 10-yr parts' : '❌ No — 5-yr parts'}</button>
              ))}
            </div>
          </div>

          <div style={{ background: '#111c35', borderRadius: 12, padding: 18 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>🔧 Labor Warranty: <span style={{ color: '#F5E642', fontWeight: 700 }}>{laborYears} year</span></div>
            <input type="range" min={1} max={5} value={laborYears} onChange={e => setLaborYears(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b', marginTop: 4 }}>
              <span>1 yr (standard)</span><span>5 yrs (extended)</span>
            </div>
          </div>
        </div>

        <button onClick={() => setSubmitted(true)} style={{ width: '100%', background: '#F5E642', color: '#0A1628', padding: '14px', borderRadius: 10, fontWeight: 800, fontSize: 16, border: 'none', cursor: 'pointer', marginBottom: 24 }}>
          View Warranty Status 📋
        </button>

        {submitted && (
          <div>
            {warrantiesData.map(w => {
              const expired = w.months <= 0;
              const expiringSoon = w.months > 0 && w.months <= 6;
              const borderColor = expired ? '#ef4444′ : expiringSoon ? '#f97316' : '#22c55e';
              return (
                <div key={w.name} style={{ background: '#111c35', border: `1px solid ${borderColor}33`, borderRadius: 14, padding: 18, marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ fontWeight: 800 }}>{w.icon} {w.name}</div>
                    <div style={{ fontWeight: 700, color: borderColor }}>{expired ? 'EXPIRED' : expiringSoon ? `⚠️ ${w.months} mo left` : `✅ ${w.months} mo left`}</div>
                  </div>
                  <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>Expires: <strong style={{ color: '#fff' }}>{w.end}</strong> — {w.detail}</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>Covers: {w.covers}</div>
                </div>
              );
            })}
            {!registered && regDeadlineMonths > 0 && (
              <div style={{ background: '#2a1a0a', border: '1px solid #f9731633', borderRadius: 12, padding: 16, fontSize: 14 }}>
                ⚠️ Registration deadline: <strong style={{ color: '#F5E642′ }}>{fmt(registrationDeadline.year, registrationDeadline.month)}</strong> ({regDeadlineMonths} months away). Register now to double your parts warranty from 5 to 10 years.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
